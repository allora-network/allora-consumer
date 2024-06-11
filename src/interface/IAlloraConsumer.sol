// SPDX-License-Identifier: BUSL-1.1

import { IAggregator } from '../interface/IAggregator.sol';


pragma solidity ^0.8.0;

// ***************************************************************
// * ========================= STRUCTS ========================= *
// ***************************************************************

struct TopicValue { 
    uint192 recentValue;
    uint64 recentValueTime;
}

struct TopicValueAndInterval {
    uint192 recentValue;
    uint64 recentValueTime;
    uint256 recentConfidenceIntervalLowerBound;
    uint256 recentConfidenceIntervalUpperBound;
}

struct NetworkInferenceData {
    uint256 networkInference;
    uint256 timestamp;
    uint256 topicId;
    bytes extraData;
}

struct AlloraConsumerNetworkInferenceData {
    bytes signature;
    NetworkInferenceData networkInferenceData;
    bytes extraData;
}

struct NetworkInferenceAndConfidenceIntervalData {
    uint256 networkInference;
    uint256 timestamp;
    uint256 topicId;
    uint256 confidenceIntervalLowerBound;
    uint256 confidenceIntervalUpperBound;
    bytes extraData;
}

struct AlloraConsumerNetworkInferenceAndConfidenceIntervalData {
    bytes signature;
    NetworkInferenceAndConfidenceIntervalData networkInferenceAndInterval;
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
     * @notice Verify network inference for a given topic
     * 
     * @param nd The network inference data to verify
     */
    function verifyNetworkInference(
        AlloraConsumerNetworkInferenceData memory nd
    ) external returns (
        uint256 networkInference,
        address dataProvider
    );
  
    /**
     * @notice Verify network inference for a given topic without mutating state
     * 
     * @param nd The network inference data to verify
     */
    function verifyNetworkInferenceViewOnly(
        AlloraConsumerNetworkInferenceData calldata nd
    ) external view returns (
        uint256 networkInference,
        address dataProvider
    );

    /**
     * @notice Verify network inference and confidence interval for a given topic
     * 
     * @param nd The network inference and confidence interval data to verify
     */
    function verifyNetworkInferenceAndConfidenceInterval(
        AlloraConsumerNetworkInferenceAndConfidenceIntervalData memory nd
    ) external returns (
        uint256 networkInference, 
        uint256 confidenceIntervalLowerBound,
        uint256 confidenceIntervalUpperBound,
        address aggregator
    );

    /**
     * @notice The message that must be signed by the provider to provide valid data
     *   recognized by verifyData
     * 
     * @param networkInference The numerical data to verify
     */
    function getNetworkInferenceMessage(NetworkInferenceData memory networkInference) external view returns (bytes32);

    /**
     * @notice The message that must be signed by the provider to provide valid data
     *   recognized by verifyData
     * 
     * @param networkInferenceAndConfidenceIntervalData The numerical data to verify
     */
    function getNetworkInferenceAndConfidenceIntervalMessage(
        NetworkInferenceAndConfidenceIntervalData memory networkInferenceAndConfidenceIntervalData
    ) external view returns (bytes32);

    /**
     * @notice Get the topic data for a given topicId
     * 
     * @param topicId The topicId to get the topic data for
     * @param extraData The extraData to get the topic data for
     * @return topicValue The topic data
     */
    function getTopicValue(uint256 topicId, bytes calldata extraData) external view returns (TopicValue memory);
}
