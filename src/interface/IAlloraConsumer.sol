// SPDX-License-Identifier: BUSL-1.1

import { IAggregator } from '../interface/IAggregator.sol';


pragma solidity ^0.8.0;

// ***************************************************************
// * ========================= STRUCTS ========================= *
// ***************************************************************

struct TopicValue {
    uint192 recentValue;
    uint64 recentValueTime;
    uint256 recentConfidenceIntervalLowerBound;
    uint256 recentConfidenceIntervalUpperBound;
}

struct NetworkInferenceData {
    uint256 networkInference;
    uint256 timestamp;
    uint256 topicId;
    uint256 confidenceIntervalLowerBound;
    uint256 confidenceIntervalUpperBound;
    bytes extraData;
}

struct AlloraConsumerNetworkInferenceData {
    bytes signature;
    NetworkInferenceData networkInference;
    bytes extraData;
}

// ***************************************************************
// * ======================= INTERFACE ========================= *
// ***************************************************************

/**
 * @title Allora Consumer Interface
 */
interface IAlloraConsumer {

    /**
     * @notice Verify network inference and confidence interval for a given topic
     * 
     * @param nd The network inference and confidence interval data to verify
     */
    function verifyNetworkInference(
        AlloraConsumerNetworkInferenceData memory nd
    ) external returns (
        uint256 networkInference, 
        uint256 confidenceIntervalLowerBound,
        uint256 confidenceIntervalUpperBound,
        address aggregator
    );

    /**
     * @notice Verify network inference for a given topic without mutating state
     * 
     * @param nd The network inference data to verify
     */
    function verifyNetworkInferenceViewOnly(
        AlloraConsumerNetworkInferenceData memory nd
    ) external view returns (
        uint256 networkInference, 
        uint256 confidenceIntervalLowerBound,
        uint256 confidenceIntervalUpperBound,
        address dataProvider
    );

    /**
     * @notice The message that must be signed by the provider to provide valid data
     *   recognized by verifyData
     * 
     * @param networkInferenceData The numerical data to verify
     */
    function getNetworkInferenceMessage(
        NetworkInferenceData memory networkInferenceData
    ) external view returns (bytes32);

    /**
     * @notice Get the inference and confidence interval for a given topicId
     * 
     * @param topicId The topicId to get the inference and confidence interval for
     * @param extraData The extraData to get the inference and confidence interval for
     * @return topicValue The topic data
     */
    function getTopicValue(uint256 topicId, bytes calldata extraData) external view returns (TopicValue memory);
}
