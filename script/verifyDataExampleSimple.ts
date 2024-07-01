// SPDX-License-Identifier: BUSL-1.1

import { AlloraConsumer__factory } from '../types/factories/AlloraConsumer__factory'
import { AlloraConsumer } from '../types/AlloraConsumer';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

// to run: ts-node script/verifyDataExampleSimple.ts

const ALLORA_CONSUMER_ADDRESS = '0x8E45fbef38DaC54e32AfB27AC8cBab30E6818ce6'

const run = async () => {
  dotenv.config()

  const senderPrivateKey = getEnvVariable('privateKey')
  const signerPrivateKey = getEnvVariable('backendSignerPrivateKey')
  const rpcUrl = getEnvVariable('rpcUrl')

  const provider = new ethers.JsonRpcProvider(rpcUrl)

  const senderWallet = new ethers.Wallet(senderPrivateKey, provider)
  const signerWallet = new ethers.Wallet(senderPrivateKey, provider)
  console.log({backendSigner: signerWallet.address})

  const alloraConsumer = 
    (new AlloraConsumer__factory())
      .attach(ALLORA_CONSUMER_ADDRESS)
      .connect(senderWallet) as AlloraConsumer

  const tx = await alloraConsumer.verifyNetworkInference({
    signature: '0xa0ca0e46c70be68d4e2967d495e9f48f80c711132cd706749bfc8980c801b8975878f49cede91e33a0e4ae4cb2aa6e5d624963404f13739da371934c63263f701c',
      networkInference: {
      topicId: 1,
      timestamp: 1719864404,
      extraData: ethers.toUtf8Bytes(''),
      networkInference: '3365485208027959000000',
      confidenceIntervalPercentiles:[],
      confidenceIntervalValues:[],
    }, 
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