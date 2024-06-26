// SPDX-License-Identifier: BUSL-1.1
import Deployer from './Deployer'

import { AlloraConsumer__factory } from '../types/factories/AlloraConsumer__factory'

const contractInfoMap = {
  'AlloraConsumer': {
    path: 'src/AlloraConsumer.sol',
    factory: new AlloraConsumer__factory()
  },
}

const ADMIN = '0xA62c64Ec38d4b280192acE99ddFee60768C51562'

const deploy = async () => {
  const deployer = new Deployer(contractInfoMap)

  console.log("deploying")

  await deployer.deploy('AlloraConsumer', [{ owner: ADMIN }])
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })