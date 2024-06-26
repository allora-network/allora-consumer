// SPDX-License-Identifier: BUSL-1.1
import Deployer from './Deployer'
import { ethers } from 'ethers'

const contractInfoMap = {
  'AlloraConsumer': {
    path: 'src/AlloraConsumer.sol',
  },
}

const ADMIN = '0xA62c64Ec38d4b280192acE99ddFee60768C51562'

const deploy = async () => {
  const deployer = new Deployer(contractInfoMap)

  const constructorInterface = "constructor(string)"

  const AlloraConsumer = await deployer.deploy('AlloraConsumer', [ADMIN], constructorInterface )
}


deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })