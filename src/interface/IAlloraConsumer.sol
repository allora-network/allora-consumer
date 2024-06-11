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

// ***************************************************************
// * ======================= INTERFACE ========================= *
// ***************************************************************

/**
 * @title Allora Consumer Interface
 */
interface IAlloraConsumer {

    /**
     * @notice Get a verified network inference for a given topic
     * 
     * @param nd The network inference data to verify
     */
    function verifyNetworkInference(
        AlloraConsumerNetworkInferenceData memory nd
    ) external returns (
        uint256 networkInference
    );
  
    /**
     * @notice Get a verified network inference for a given topic without mutating state
     * 
     * @param nd The network inference data to verify
     */
    function verifyNetworkInferenceViewOnly(
        AlloraConsumerNetworkInferenceData calldata nd
    ) external view returns (
        uint256 networkInference
    );

    /**
     * @notice The message that must be signed by the provider to provide valid data
     *   recognized by verifyData
     * 
     * @param networkInference The numerical data to verify
     */
    function getNetworkInferenceMessage(NetworkInferenceData memory networkInference) external view returns (bytes32);

    /**
     * @notice Get the topic data for a given topicId
     * 
     * @param topicId The topicId to get the topic data for
     * @param extraData The extraData to get the topic data for
     * @return topicValue The topic data
     */
    function getTopicValue(uint256 topicId, bytes calldata extraData) external view returns (TopicValue memory);
}
