// SPDX-License-Identifier: BUSL-1.1

import { AlloraConsumer__factory } from '../types/factories/AlloraConsumer__factory'
import { AlloraConsumer } from '../types/AlloraConsumer'
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import sepoliaAddresses from '../deploy/deployments/sepolia.json'

const TARGET_TOPIC_ID = 1
const DUMMY_PRIVATE_KEY = '0x0123456789012345678901234567890123456789012345678901234567890123'


const run = async () => {
  dotenv.config()

  const provider = new ethers.JsonRpcProvider(getEnvVariable('rpcUrl'))
  const wallet = new ethers.Wallet(DUMMY_PRIVATE_KEY, provider)

  const alloraConsumer = (new AlloraConsumer__factory()).attach(sepoliaAddresses.AlloraConsumer).connect(wallet) as AlloraConsumer
  const { recentValue, recentValueTime } = await alloraConsumer.getTopicValue(TARGET_TOPIC_ID, '0x')
  console.info({
    value: recentValue,
    timestamp: recentValueTime,
  })
}

const getEnvVariable = (name: string) => {
  const envVar = process.env[name]
  if (envVar === undefined) {
    throw new Error(`Environment variable ${name} not defined.`)
  }
  return envVar
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })