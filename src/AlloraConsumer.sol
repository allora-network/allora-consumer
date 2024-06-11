// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.13;


import { IAggregator } from './interface/IAggregator.sol';
import { IFeeHandler } from './interface/IFeeHandler.sol';
import { 
  IAlloraConsumer, 
  TopicValue, 
  NetworkInferenceData,
  AlloraConsumerNetworkInferenceData 
} from './interface/IAlloraConsumer.sol';
import { ECDSA } from "../lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";
import { Math } from "../lib/openzeppelin-contracts/contracts/utils/math/Math.sol";
import { Ownable2Step } from "../lib/openzeppelin-contracts/contracts/access/Ownable2Step.sol";
import { EIP712 } from "../lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol";

struct AlloraConsumerConstructorArgs {
    address owner;
    IAggregator aggregator;
}


contract AlloraConsumer is IAlloraConsumer, Ownable2Step, EIP712 {

    /// @dev The value for each topic
    mapping(uint256 topicId => mapping(bytes extraData => TopicValue)) public topicValue;

    /// @dev Whether the AlloraConsumer contract is switched on and usable
    bool public switchedOn = true;

    /// @dev The valid data providers
    mapping(address dataProvider => bool) public validDataProvider;

    /// @dev The typehash for the numeric data
    bytes32 public constant NUMERIC_DATA_TYPEHASH = keccak256(
        "NumericData(uint256 topicId,uint256 timestamp,bytes extraData,uint256[] numericValues)"
    );

    /// @dev The aggregator to use for aggregating numeric data
    IAggregator public aggregator;

    /// @dev The number of seconds data is valid for 
    uint48 public pastDataValiditySeconds = 1 hours;
  
    uint48 public futureDataValiditySeconds = 5 minutes;

    /// @dev The constructor
    constructor(AlloraConsumerConstructorArgs memory args) 
        EIP712("AlloraConsumer", "1") 
    {
        _transferOwnership(args.owner);

        aggregator = args.aggregator;
    }

    // ***************************************************************
    // * ========================= EVENTS ========================== *
    // ***************************************************************

    // main interface events
    event AlloraConsumerVerifiedData(uint256 topicId, uint256 numericData, address dataProvider, bytes extraData);
    event AlloraConsumerVerifiedNetworkInferenceData(uint256 networkInference, uint256 timestamp, uint256 topicId, bytes extraData);

    // allora consumer admin updates
    event AlloraConsumerAdminTurnedOff();
    event AlloraConsumerAdminTurnedOn();
    event AlloraConsumerOwnerAddedDataProvider(address dataProvider);
    event AlloraConsumerOwnerRemovedDataProvider(address dataProvider);
    event AlloraConsumerOwnerUpdatedFutureDataValiditySeconds(uint48 futureDataValiditySeconds);
    event AlloraConsumerOwnerUpdatedPastDataValiditySeconds(uint48 pastDataValiditySeconds);
    event AlloraConsumerOwnerUpdatedAggregator(IAggregator aggregator);

    // ***************************************************************
    // * ========================= ERRORS ========================== *
    // ***************************************************************

    // verification errors
    error AlloraConsumerNotSwitchedOn();
    error AlloraConsumerNoDataProvided();
    error AlloraConsumerInvalidDataTime();
    error AlloraConsumerInvalidDataProvider();

    // parameter update errors
    error AlloraConsumerInvalidAggregator();
    error AlloraConsumerInvalidDataValiditySeconds();

    // casting errors
    error SafeCastOverflowedUintDowncast(uint8 bits, uint256 value);

    // ***************************************************************
    // * ================== USER INTERFACE ========================= *
    // ***************************************************************

    ///@inheritdoc IAlloraConsumer
    function verifyNetworkInference(
        AlloraConsumerNetworkInferenceData memory nd
    ) external override returns (
        uint256 networkInference
    ) {
        (networkInference, ) = _verifyNetworkInferenceData(nd);

        topicValue[nd.networkInferenceData.topicId][nd.networkInferenceData.extraData] = TopicValue({
            recentValue: _toUint192(networkInference),
            recentValueTime: _toUint64(block.timestamp)
        });

        emit AlloraConsumerVerifiedNetworkInferenceData(
            networkInference, 
            nd.networkInferenceData.timestamp, 
            nd.networkInferenceData.topicId, 
            nd.networkInferenceData.extraData
        );
    }

    ///@inheritdoc IAlloraConsumer
    function verifyNetworkInferenceViewOnly(
        AlloraConsumerNetworkInferenceData memory nd
    ) external view override returns (
        uint256 networkInference
    ) {
        (networkInference, ) = _verifyNetworkInferenceData(nd);
    }

    function _verifyNetworkInferenceData(
        AlloraConsumerNetworkInferenceData memory nd
    ) internal view returns (
        uint256 networkInference, 
        address dataProvider
    ) {
        if (!switchedOn) {
            revert AlloraConsumerNotSwitchedOn();
        }

        if (
            block.timestamp < nd.networkInferenceData.timestamp - pastDataValiditySeconds ||
            nd.networkInferenceData.timestamp + futureDataValiditySeconds < block.timestamp
        ) {
            revert AlloraConsumerInvalidDataTime();
        }

        dataProvider = ECDSA.recover(
            ECDSA.toEthSignedMessageHash(getNetworkInferenceMessage(nd.networkInferenceData)), 
            nd.signature
        );

        if (!_isOwnerOrValidDataProvider(dataProvider)) {
            revert AlloraConsumerInvalidDataProvider();
        }

        networkInference = nd.networkInferenceData.networkInference;
    }

    // ***************************************************************
    // * ===================== VIEW FUNCTIONS ====================== *
    // ***************************************************************

    /**
     * @notice The message that must be signed by the provider to provide valid data
     *   recognized by verifyNetworkInference
     * 
     * @param networkInference The numerical data to verify
     */
    function getNetworkInferenceMessage(NetworkInferenceData memory networkInference) public view override returns (bytes32) {
        return _hashTypedDataV4(keccak256(abi.encode(
            NUMERIC_DATA_TYPEHASH,
            networkInference.networkInference,
            networkInference.timestamp,
            networkInference.topicId,
            networkInference.extraData
        )));
    }

    /**
     * @notice Get the topic data for a given topicId
     * 
     * @param topicId The topicId to get the topic data for
     * @param extraData The extraData to get the topic data for
     * @return topicValue The topic data
     */
    function getTopicValue(
        uint256 topicId, 
        bytes calldata extraData
    ) external view override returns (TopicValue memory) {
        return topicValue[topicId][extraData];
    }

    // ***************************************************************
    // * ========================= ADMIN =========================== *
    // ***************************************************************
    /**
     * @notice Admin function to switch off the consumer contract
     */
    function turnOffConsumer() external onlyOwner {
        switchedOn = false;

        emit AlloraConsumerAdminTurnedOff();
    }

    /**
     * @notice Admin function to switch on the consumer contract
     */
    function turnOnConsumer() external onlyOwner {
        switchedOn = true;

        emit AlloraConsumerAdminTurnedOn();
    }

    /**
     * @notice Topic owner function to update the number of seconds into the future data is valid for
     * 
     * @param _futureDataValiditySeconds The number of seconds data is valid for
     */
    function updateFutureDataValiditySeconds(
        uint48 _futureDataValiditySeconds
    ) external onlyOwner {
        if (_futureDataValiditySeconds == 0) { 
            revert AlloraConsumerInvalidDataValiditySeconds();
        }

        futureDataValiditySeconds = _futureDataValiditySeconds;

        emit AlloraConsumerOwnerUpdatedFutureDataValiditySeconds(futureDataValiditySeconds);
    }

    /**
     * @notice Topic owner function to update the number of seconds into the past data is valid for
     * 
     * @param _pastDataValiditySeconds The number of seconds data is valid for
     */
    function updatePastDataValiditySeconds(
        uint48 _pastDataValiditySeconds
    ) external onlyOwner {
        if (_pastDataValiditySeconds == 0) {
            revert AlloraConsumerInvalidDataValiditySeconds();
        }

        pastDataValiditySeconds = _pastDataValiditySeconds;

        emit AlloraConsumerOwnerUpdatedPastDataValiditySeconds(pastDataValiditySeconds);
    }

    /**
     * @notice Topic owner function to update the aggregator to use for aggregating numeric data
     * 
     * @param _aggregator The aggregator to use for aggregating numeric data
     */
    function updateAggregator(IAggregator _aggregator) external onlyOwner {
        if (address(_aggregator) == address(0)) {
            revert AlloraConsumerInvalidAggregator();
        }

        aggregator = _aggregator;

        emit AlloraConsumerOwnerUpdatedAggregator(aggregator);
    }

    /**
     * @notice Topic owner function to add a data provider
     * 
     * @param dataProvider The data provider to add
     */
    function addDataProvider(address dataProvider) external onlyOwner {
        validDataProvider[dataProvider] = true;

        emit AlloraConsumerOwnerAddedDataProvider(dataProvider);
    }

    /**
     * @notice Topic owner function to remove a data provider
     * 
     * @param dataProvider the data provider to remove
     */
    function removeDataProvider(address dataProvider) external onlyOwner {
        validDataProvider[dataProvider] = false;

        emit AlloraConsumerOwnerRemovedDataProvider(dataProvider);
    }

    // ***************************************************************
    // * ==================== INTERNAL HELPERS ===================== *
    // ***************************************************************
    /**
     * @notice Check if the data provider is valid or the owner
     * 
     * @param dataProvider The data provider to check
     * @return Whether the data provider is valid or the owner
     */
    function _isOwnerOrValidDataProvider(address dataProvider) internal view returns (bool) {
        return dataProvider == owner() || validDataProvider[dataProvider];
    }

    /**
     * @dev Returns the downcasted uint192 from uint256, reverting on
     * overflow (when the input is greater than largest uint192).
     *
     * Counterpart to Solidity's `uint192` operator.
     *
     * Requirements:
     *
     * - input must fit into 192 bits
     */
    function _toUint192(uint256 value) internal pure returns (uint192) {
        if (value > type(uint192).max) {
            revert SafeCastOverflowedUintDowncast(192, value);
        }
        return uint192(value);
    }

    /**
     * @dev Returns the downcasted uint64 from uint256, reverting on
     * overflow (when the input is greater than largest uint64).
     *
     * Counterpart to Solidity's `uint64` operator.
     *
     * Requirements:
     *
     * - input must fit into 64 bits
     */
    function _toUint64(uint256 value) internal pure returns (uint64) {
        if (value > type(uint64).max) {
            revert SafeCastOverflowedUintDowncast(64, value);
        }
        return uint64(value);
    }
}
