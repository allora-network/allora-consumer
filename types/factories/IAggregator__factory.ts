/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type { IAggregator, IAggregatorInterface } from "../IAggregator";

const _abi = [
  {
    type: "function",
    name: "aggregate",
    inputs: [
      {
        name: "values",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "extraData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
] as const;

export class IAggregator__factory {
  static readonly abi = _abi;
  static createInterface(): IAggregatorInterface {
    return new Interface(_abi) as IAggregatorInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IAggregator {
    return new Contract(address, _abi, runner) as unknown as IAggregator;
  }
}