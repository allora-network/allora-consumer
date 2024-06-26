/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IAlloraConsumer,
  IAlloraConsumerInterface,
} from "../IAlloraConsumer";

const _abi = [
  {
    type: "function",
    name: "getNetworkInferenceMessage",
    inputs: [
      {
        name: "networkInferenceData",
        type: "tuple",
        internalType: "struct NetworkInferenceData",
        components: [
          {
            name: "networkInference",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "confidenceIntervalPercentiles",
            type: "uint256[]",
            internalType: "uint256[]",
          },
          {
            name: "confidenceIntervalValues",
            type: "uint256[]",
            internalType: "uint256[]",
          },
          {
            name: "timestamp",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "topicId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTopicValue",
    inputs: [
      {
        name: "topicId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "extraData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "topicValue",
        type: "tuple",
        internalType: "struct TopicValue",
        components: [
          {
            name: "recentValue",
            type: "uint192",
            internalType: "uint192",
          },
          {
            name: "recentValueTime",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "confidenceIntervalPercentiles",
            type: "uint256[]",
            internalType: "uint256[]",
          },
          {
            name: "confidenceIntervalValues",
            type: "uint256[]",
            internalType: "uint256[]",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "verifyNetworkInference",
    inputs: [
      {
        name: "nd",
        type: "tuple",
        internalType: "struct AlloraConsumerNetworkInferenceData",
        components: [
          {
            name: "signature",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "networkInference",
            type: "tuple",
            internalType: "struct NetworkInferenceData",
            components: [
              {
                name: "networkInference",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "confidenceIntervalPercentiles",
                type: "uint256[]",
                internalType: "uint256[]",
              },
              {
                name: "confidenceIntervalValues",
                type: "uint256[]",
                internalType: "uint256[]",
              },
              {
                name: "timestamp",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "topicId",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "extraData",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "networkInference",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "confidenceIntervalPercentiles",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "confidenceIntervalValues",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "dataProvider",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "verifyNetworkInferenceViewOnly",
    inputs: [
      {
        name: "nd",
        type: "tuple",
        internalType: "struct AlloraConsumerNetworkInferenceData",
        components: [
          {
            name: "signature",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "networkInference",
            type: "tuple",
            internalType: "struct NetworkInferenceData",
            components: [
              {
                name: "networkInference",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "confidenceIntervalPercentiles",
                type: "uint256[]",
                internalType: "uint256[]",
              },
              {
                name: "confidenceIntervalValues",
                type: "uint256[]",
                internalType: "uint256[]",
              },
              {
                name: "timestamp",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "topicId",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "extraData",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "networkInference",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "confidenceIntervalPercentiles",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "confidenceIntervalValues",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "dataProvider",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
] as const;

export class IAlloraConsumer__factory {
  static readonly abi = _abi;
  static createInterface(): IAlloraConsumerInterface {
    return new Interface(_abi) as IAlloraConsumerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IAlloraConsumer {
    return new Contract(address, _abi, runner) as unknown as IAlloraConsumer;
  }
}
