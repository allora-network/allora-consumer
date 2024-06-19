// SPDX-License-Identifier: BUSL-1.1

import { AlloraConsumer__factory } from '../types/factories/AlloraConsumer__factory'
import { AlloraConsumer } from '../types/AlloraConsumer';
import { ethers, BigNumberish, BytesLike } from 'ethers';
import * as dotenv from 'dotenv';

// to run: ts-node script/verifyDataExample.ts

const ALLORA_CONSUMER_NAME = 'AlloraConsumer'
const ALLORA_CONSUMER_VERSION = 1
const ALLORA_CONSUMER_ADDRESS = '0x5360229031C64a2deBb94a0886350B52a4c2F659'
const ALLORA_CONSUMER_CHAIN_ID = 11155111

type NetworkInferenceDataStruct = {
  networkInference: BigNumberish
  confidenceIntervals: BigNumberish[]
  confidenceIntervalValues: BigNumberish[]
  timestamp: BigNumberish
  topicId: BigNumberish
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

  const networkInferenceTypehash = keccak(toBytes("NetworkInferenceData(uint256 networkInference,uint256 timestamp,uint256 topicId,bytes extraData,uint256[] confidenceIntervals,uint256[] confidenceIntervalValues)"))

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
    ['bytes32', 'uint256', 'uint256', 'uint256', 'bytes', 'uint256[]', 'uint256[]'],
    [
      networkInferenceTypehash,
      networkInference.networkInference,
      networkInference.timestamp, 
      networkInference.topicId, 
      networkInference.extraData,
      networkInference.confidenceIntervals,
      networkInference.confidenceIntervalValues,
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
    signerPrivateKey: string
  }
) => {
  const { chainId, alloraConsumerAddress, signerPrivateKey } = config
  const wallet = new ethers.Wallet(signerPrivateKey)

  const localMessage = await constructMessageLocally(
    numericData, 
    { chainId, alloraConsumerAddress }
  )
  console.log({localMessage})
  const messageBytes = hexStringToByteArray(localMessage)

  return await wallet.signMessage(messageBytes)
}

const run = async () => {
  dotenv.config()


  const signerPrivateKey = getEnvVariable('backendSignerPrivateKey')
  const senderPrivateKey = getEnvVariable('privateKey')

  const rpcUrl = getEnvVariable('rpcUrl')
  const provider = new ethers.JsonRpcProvider(rpcUrl)

  const signerWallet = new ethers.Wallet(signerPrivateKey, provider)
  const senderWallet = new ethers.Wallet(senderPrivateKey, provider)

  console.log({privateKey: signerPrivateKey})
  console.log({walletAddress: signerWallet.address})

  const alloraConsumer = (new AlloraConsumer__factory()).attach(ALLORA_CONSUMER_ADDRESS).connect(senderWallet) as AlloraConsumer

  const networkInferenceData: NetworkInferenceDataStruct = {
    topicId: 1,
    timestamp: 1718762000,
    extraData: ethers.toUtf8Bytes(''),
    networkInference: '123000000000000000000',
    confidenceIntervals: ['456000000000000000000'],
    confidenceIntervalValues: ['789000000000000000000'],
  }

  console.info('verifying networkInferenceData')
  console.info({networkInferenceData})

  const messageFromRemoteContract = await alloraConsumer.getNetworkInferenceMessage(networkInferenceData)
  console.log({messageFromRemoteContract})
  const messageBytes = hexStringToByteArray(messageFromRemoteContract)

  // sign the message with the private key
  const signature = await signerWallet.signMessage(messageBytes)
  const localSignature = await signMessageLocally(networkInferenceData, { 
    chainId: ALLORA_CONSUMER_CHAIN_ID,
    alloraConsumerAddress: ALLORA_CONSUMER_ADDRESS, 
    signerPrivateKey: signerPrivateKey 
  })

  console.log({signature, localSignature})

  if (signature !== localSignature) {
    throw new Error('local signature does not match remote. Check chainId.')
  }

  const tx = await alloraConsumer.verifyNetworkInference({
    signature: signature,
    networkInference: networkInferenceData, 
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
  .catch(error => {
    console.error('ERROR')
    console.error(error)
    process.exit(1)
  })