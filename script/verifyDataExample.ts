// SPDX-License-Identifier: BUSL-1.1

import { AlloraConsumer__factory } from '../types/factories/AlloraConsumer__factory'
import { AlloraConsumer } from '../types/AlloraConsumer';
import { ethers, BigNumberish, BytesLike } from 'ethers';
import * as dotenv from 'dotenv';

// to run: ts-node script/verifyDataExample.ts

const ALLORA_CONSUMER_NAME = 'AlloraConsumer'
const ALLORA_CONSUMER_VERSION = 1
const ALLORA_CONSUMER_ADDRESS = '0x8E45fbef38DaC54e32AfB27AC8cBab30E6818ce6'
const ALLORA_CONSUMER_CHAIN_ID = 11155111

type NetworkInferenceDataStruct = {
  networkInference: BigNumberish
  confidenceIntervalPercentiles: BigNumberish[]
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

  const networkInferenceTypehash = keccak(toBytes("NetworkInferenceData(uint256 networkInference,uint256 timestamp,uint256 topicId,bytes extraData,uint256[] confidenceIntervalPercentiles,uint256[] confidenceIntervalValues)"))

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
      networkInference.confidenceIntervalPercentiles,
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

  const alloraConsumer = 
    (new AlloraConsumer__factory())
      .attach(ALLORA_CONSUMER_ADDRESS)
      .connect(senderWallet) as AlloraConsumer


  const remoteSignature = "0x6a53bbb80598dc2b580263221db161c7ea2e90d93047f727870a062553314859149c1281aa1c7070b3ef9ff28f335a175e972f45374e6c729f57414ff2dbe43b1b"

  const networkInferenceData: NetworkInferenceDataStruct = {
    topicId: 9,
    timestamp: 1719866147,
    extraData: ethers.toUtf8Bytes(''),
    networkInference: '3365485208027959000000',
    confidenceIntervalPercentiles:[
      // '2280000000000000000',
      // '15870000000000000000',
      // '50000000000000000000',
      // '84130000000000000000',
      // '97720000000000000000'
    ],
    confidenceIntervalValues:[
      // '3016256807053656000000',
      // '3029849059956295000000',
      // '3049738780726754000000',
      // '3148682039955208400000',
      // '3278333171848616500000'
    ],
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

  console.log({signature, localSignature, remoteSignature})

  if (signature !== localSignature) {
    throw new Error('local signature does not match. Check chainId.')
  }

  if (signature !== remoteSignature) {
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