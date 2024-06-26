// SPDX-License-Identifier: BUSL-1.1
import Deployer from './Deployer'
import { ethers } from 'ethers'

// import { EvenFeeHandler__factory } from '../types/factories/EvenFeeHandler__factory'
// import { MedianAggregator__factory } from '../types/factories/MedianAggregator__factory'
// import { AlloraConsumer__factory } from '../types/factories/AlloraConsumer__factory'

const contractInfoMap = {
  'AlloraConsumer': {
    path: 'src/AlloraConsumer.sol',
    // factory: new AlloraConsumer__factory()
  },
}

const ADMIN = '0xA62c64Ec38d4b280192acE99ddFee60768C51562'

const deploy = async () => {
  const deployer = new Deployer(contractInfoMap)

  const constructorInterface = "constructor(string)"

  const AlloraConsumer = await deployer.deploy('AlloraConsumer', [ADMIN], constructorInterface )
  console.log({AlloraConsumer})
}


deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })