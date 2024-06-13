// SPDX-License-Identifier: BUSL-1.1

import { AlloraConsumer__factory } from '../types/factories/AlloraConsumer__factory'
import { AlloraConsumer } from '../types/AlloraConsumer';
import { ethers, BigNumberish, BytesLike } from 'ethers';
import * as dotenv from 'dotenv';

// to run: ts-node script/verifyDataExample.ts

const ALLORA_CONSUMER_NAME = 'AlloraConsumer'
const ALLORA_CONSUMER_VERSION = 1
const ALLORA_CONSUMER_ADDRESS = '0xBEd9F9B7509288fCfe4d49F761C625C832e6264A'
const ALLORA_CONSUMER_CHAIN_ID = 11155111

type NetworkInferenceDataStruct = {
  topicId: BigNumberish
  timestamp: BigNumberish
  networkInference: BigNumberish
  confidenceIntervalLowerBound: BigNumberish
  confidenceIntervalUpperBound: BigNumberish
  extraData: BytesLike
};

// hex string of the format '0xf9a0b2c3...'
const hexStringToByteArray = (rawHexString: string) => {
  const hexString = rawHexString.substring(2);
  const chunkedArray: string[] = []
  for (let i = 0; i < hexString.length; i += 2) {
    chunkedArray.push(hexString.substring(i, i + 2));
  }
  const bytesOfMessage = chunkedArray.map(chunk => parseInt(chunk, 16));
  return new Uint8Array(bytesOfMessage);
}

const constructMessageLocally = async (
  networkInference: NetworkInferenceDataStruct, 
  config: {
    chainId: number,
    alloraConsumerAddress: string,
  }
) => {
  const keccak = ethers.keccak256
  const coder = new ethers.AbiCoder()
  const toBytes = ethers.toUtf8Bytes

  const { chainId, alloraConsumerAddress } = config

  const numericDataTypehash = keccak(toBytes('NumericData(uint256 topicId,uint256 timestamp,bytes extraData,uint256[] numericValues)'))

  const domainSeparator = keccak(coder.encode(
    ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
    [
      keccak(toBytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')),
      keccak(toBytes(ALLORA_CONSUMER_NAME)),
      keccak(toBytes(ALLORA_CONSUMER_VERSION.toString())),
      chainId.toString(),
      alloraConsumerAddress,
    ]
  ))

  const intermediateHash = keccak(coder.encode(
    ['bytes32', 'uint256', 'uint256', 'bytes', 'bytes'],
    [
      numericDataTypehash,
      networkInference.networkInference,
      networkInference.timestamp, 
      networkInference.topicId, 
      networkInference.confidenceIntervalLowerBound,
      networkInference.confidenceIntervalUpperBound,
      networkInference.extraData,
    ]
  ))

  return keccak(
    ethers.solidityPacked(
      ['bytes1', 'bytes1', 'bytes32', 'bytes32'],
      ['0x19', '0x01', domainSeparator, intermediateHash]
    )
  )
}

const signMessageLocally = async (
  numericData: NetworkInferenceDataStruct, 
  config: {
    chainId: number
    alloraConsumerAddress: string
    privateKey: string
  }
) => {
  const { chainId, alloraConsumerAddress, privateKey } = config
  const wallet = new ethers.Wallet(privateKey)

  const message = await constructMessageLocally(
    numericData, 
    { chainId, alloraConsumerAddress }
  )
  const messageBytes = hexStringToByteArray(message)

  return await wallet.signMessage(messageBytes)
}

const run = async () => {
  dotenv.config()

  const privateKey = getEnvVariable('privateKey')
  const rpcUrl = getEnvVariable('rpcUrl')

  const provider = new ethers.JsonRpcProvider(rpcUrl)
  const wallet = new ethers.Wallet(privateKey, provider)

  const alloraConsumer = (new AlloraConsumer__factory()).attach(ALLORA_CONSUMER_ADDRESS).connect(wallet) as AlloraConsumer

  const networkInferenceData: NetworkInferenceDataStruct = {
    topicId: 1,
    timestamp: Math.floor(Date.now() / 1000) - (60 * 5),
    extraData: ethers.toUtf8Bytes(''),
    networkInference:             '123456789012345678',
    confidenceIntervalLowerBound: '10000000000000000',
    confidenceIntervalUpperBound: '1000000000000000000',
  }

  console.info('verifying networkInferenceData')
  console.info({networkInferenceData})

  const message = await alloraConsumer.getNetworkInferenceMessage(networkInferenceData)
  const messageBytes = hexStringToByteArray(message)

  // sign the message with the private key
  const signature = await wallet.signMessage(messageBytes)
  const localSignature = await signMessageLocally(networkInferenceData, { 
    chainId: ALLORA_CONSUMER_CHAIN_ID,
    alloraConsumerAddress: ALLORA_CONSUMER_ADDRESS, 
    privateKey 
  })

  console.log({signature, localSignature})

  if (signature !== localSignature) {
    throw new Error('local signature does not match remote. Check chainId.')
  }

  const tx = await alloraConsumer.verifyNetworkInference({
    networkInference: networkInferenceData, 
    signature: signature,
    extraData: ethers.toUtf8Bytes(''),
  })
  console.info('tx hash:', tx.hash) 
  console.info('Awaiting tx confirmation...')

  const result = await tx.wait()

  console.info('tx receipt:', result)
}

const getEnvVariable = (name: string) => {
  const envVar = process.env[name]
  if (envVar === undefined) {
    throw new Error(`Environment variable ${name} not defined.`)
  }
  return envVar
}

const main = async () => {
  console.info('STARTING')
  await run()
  console.info('COMPLETE')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('ERROR')
    console.error(error)
    process.exit(1)
  })