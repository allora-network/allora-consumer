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
  const rpcUrl = getEnvVariable('rpcUrl')

  const provider = new ethers.JsonRpcProvider(rpcUrl)
  const senderWallet = new ethers.Wallet(senderPrivateKey, provider)

  const alloraConsumer = 
    (new AlloraConsumer__factory())
      .attach(ALLORA_CONSUMER_ADDRESS)
      .connect(senderWallet) as AlloraConsumer

  const tx = await alloraConsumer.verifyNetworkInference({
    signature: '0x99b8b75f875a9ecc09fc499073656407458d464edeceb384686dba990ed785d841e6510b578d253a6e19a20503d1ec1e3c38b4c60980ff3b4df9ce3335ebd3851b',
      networkInference: {
      topicId: 9,
      timestamp: 1719866777,
      extraData: ethers.toUtf8Bytes(''),
      networkInference: '3365485208027959000000',
      confidenceIntervalPercentiles:[
        '2280000000000000000',
        '15870000000000000000',
        '50000000000000000000',
        '84130000000000000000',
        '97720000000000000000'
      ],
      confidenceIntervalValues:[
        '3016256807053656000000',
        '3029849059956295000000',
        '3049738780726754000000',
        '3148682039955208400000',
        '3278333171848616500000'
      ],
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