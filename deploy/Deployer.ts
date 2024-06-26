// SPDX-License-Identifier: BUSL-1.1

import fs from 'fs'
import { ContractTransaction, Wallet, JsonRpcProvider, ethers } from 'ethers'
import { execSync, exec } from 'child_process'
import * as dotenv from 'dotenv';
import axios from 'axios'

type deploymentRecord = {[contractId in string]: string}

type PromiseType<T> = T extends Promise<infer U> ? U : T;

type contractInfoMap = { 
  [contractName: string]: { 
    path: string 
    libraries?: string[]
  }
}

const chainIdToNetworkName: {[chainId in number]: string} = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  42: 'kovan',
  11155111: 'sepolia'
}

class Deployer <contractInfo extends contractInfoMap>{
  deploymentRecordPath: string
  rpcUrl: string
  privateKey: string
  wallet: Wallet
  contractInfoMap!: contractInfo
  etherscanApiKey: string
  chainId: number

  deploymentRecord: deploymentRecord = {}

  constructor(contractInfoMap: contractInfo) {
    dotenv.config()

    this.contractInfoMap = contractInfoMap

    this.deploymentRecordPath = `${__dirname}/deployments/${Deployer.getEnvVariable('deploymentName')}.json`
    this.rpcUrl = Deployer.getEnvVariable('rpcUrl')
    this.privateKey = Deployer.getEnvVariable('privateKey')
    this.etherscanApiKey = Deployer.getEnvVariable('etherscanApiKey')
    this.chainId = parseInt(Deployer.getEnvVariable('chainId'))

    this.wallet = new Wallet(this.privateKey, new JsonRpcProvider(this.rpcUrl))

    if (fs.existsSync(this.deploymentRecordPath)) {
      this.deploymentRecord = JSON.parse(fs.readFileSync(this.deploymentRecordPath, 'utf8')) as deploymentRecord
    } else {
      this.initializeData()
    }
  }

  // ================ Internal =================
  private writeDeploymentRecord = () => fs.writeFileSync(this.deploymentRecordPath, JSON.stringify(this.deploymentRecord))

  private initializeData = () => {
    this.deploymentRecord = {}
    this.writeDeploymentRecord()
  }

  private setDeployedContractAddress = (contractName: string, address: string) => {
    this.deploymentRecord[contractName] = address
    this.writeDeploymentRecord()
  }

  // ================ External =================
  public getDeployedContractAddress = (contractName: string): string | null => {
    return this.deploymentRecord.hasOwnProperty(contractName) ? this.deploymentRecord[contractName] : null
  }

  public clearDeployedContractAddresses = () => {
    this.initializeData()
  }

  public deploy = async<contractName extends keyof contractInfo>(
    contractName: contractName,
    args: string[],
    constructorInterface: string
  ): Promise<string> => {
    const contractId = `${this.contractInfoMap[contractName].path}:${String(contractName)}`
    const existingContractAddress = this.getDeployedContractAddress(String(contractName))

    const verify = async (contractAddress: string) => {
      console.info(`⏳ verifying ${String(contractName)}...`)
      // const encodedArgs = this.contractInfoMap[contractName].factory.interface.encodeDeploy(args)
      // await this.verifyContractUntilSuccess(contractAddress, contractId, this.etherscanApiKey, encodedArgs)
      await this.verifyContractUntilSuccess(contractAddress, contractId, this.etherscanApiKey, args, constructorInterface)
      console.info(`✅ VERIFIED ${contractId.split(':')[1]}`)
    }

    let contractAddress = ''
    if (existingContractAddress !== null) {
      console.info(`✅ ${String(contractName)} already deployed at ${existingContractAddress}`)
      contractAddress = existingContractAddress

      if (await this.isContractVerified(contractAddress)) {
        console.info(`✅ ${String(contractName)} already verified`)
      } else {
        await verify(contractAddress)
      }

      // return this.contractInfoMap[contractName].factory.attach(contractAddress) as returnType
      return contractAddress
    }

    console.info(`⏳ deploying ${String(contractName)}...`)

    // const contractInstance = await this.contractInfoMap[contractName].factory.deploy(...args)
    // contractAddress = await contractInstance.getAddress()
    contractAddress = await this.deployContract(contractId, args)
    console.log({contractAddress})

    this.setDeployedContractAddress(String(contractName), contractAddress)
    console.info(`✅ DEPLOYED ${String(contractName)} to: ${contractAddress}`)

    await verify(contractAddress)

    return contractAddress
    // return this.contractInfoMap[contractName].factory.attach(contractAddress) as returnType
  }

  private isContractVerified = async(contractAddress: string): Promise<boolean> => {
    try {
      const apiUrl = 
        this.chainId === 1
          ? 'https://api.etherscan.io/api'
          : `https://api-${chainIdToNetworkName[this.chainId]}.etherscan.io/api`

      const response = await axios.get(
        `${apiUrl}?module=contract&action=getabi&address=${contractAddress}&apikey=${this.etherscanApiKey}`
      )

      console.log({response: response.data})
      
      // If true, contract ABI is available, which means the contract is verified
      return response.data.status === '1' && response.data.message === 'OK'
    } catch (error) {
      console.error('Error checking contract verification:', error)
      return false
    }
  }

  private deployContract = async(
    contractId: string,
    args: string[]
  ): Promise<string> => {
    return new Promise((resolve, _) => {
      const command = [
        `forge create`,
        `--constructor-args ${args.join('  ')}`,
        `--rpc-url ${this.rpcUrl}`,
        `--private-key ${this.privateKey}`,
        `${contractId}`
      ]

      const attemptDeploy = () => {
        exec(command.join(' '), (error, stdout, stderr) => {
          if (error) {
            console.error(`Retrying after verification error: ${error}`)
            setTimeout(attemptDeploy, 1000) // Try again after 1 second
            return
          }

          // Check if the output indicates success
          const deployAddressMarker = 'Deployed to: '
          if (stdout.includes(deployAddressMarker)) {
            console.log({stdout})
            const deployAddressMarkerEnd = stdout.indexOf(deployAddressMarker) + deployAddressMarker.length
            return resolve(stdout.substring(deployAddressMarkerEnd, deployAddressMarkerEnd + 42))
          } 

          // stdout contains the output of the command
          if (stderr) {
            console.error(`stderr: ${stderr}`)
          }

          setTimeout(attemptDeploy, 1000) // Try again after 1 second
        })
      }
      attemptDeploy()
    })
  }

  private verifyContractUntilSuccess = async(
    address: string,
    contractId: string,
    apiKey: string,
    args: string[],
    constructorInterface: string
  ) => {
    const constructorArgs = await this.getConstructorArgs(args, constructorInterface)
    console.log({constructorArgs})
    return new Promise((resolve, _) => {
      const command = [
        `forge verify-contract ${address} ${contractId}`,
        `--chain ${this.chainId}`,
        `--etherscan-api-key ${apiKey}`,
        `--constructor-args ${constructorArgs})`
      ]

      const attemptVerification = () => {
        exec(command.join(' '), (error, stdout, stderr) => {
          if (error) {
            console.error(`Retrying after verification error: ${error}`)
            setTimeout(attemptVerification, 1000) // Try again after 1 second
            return
          }

          // Check if the output indicates success
          if (stdout.includes("OK") || stdout.includes("is already verified")) {
            resolve('OK')
            return
          } 

          // stdout contains the output of the command
          if (stderr) {
            console.error(`stderr: ${stderr}`)
          }

          setTimeout(attemptVerification, 1000) // Try again after 1 second
        })
      }
      attemptVerification();
    });
  }

  private getConstructorArgs = (args: string[], argsInterface: string): Promise<string> => {
    return new Promise((resolve, _) => {
      const command: string[] = [
        `cast abi-encode`,
        `"${argsInterface}"`,
        args.join(' ')
      ]

        exec(command.join(' '), (error, stdout, stderr) => {
          if (error) {
            console.error(`Cast (${command.join(' ')}) failed: ${error}`)
            return
          }

          // Check if the output indicates success
          if (stdout.includes("OK") || stdout.includes("is already verified")) {
            resolve('OK')
            return
          } 

          // stdout contains the output of the command
          if (stderr) {
            console.error(`stderr: ${stderr}`)
          }
        })
    });

  }

  public call = async (
    callName: string,
    call: Promise<ContractTransaction>,
    callAlreadyComplete: () => Promise<boolean>
  ) => {
    if (await callAlreadyComplete()) {
      console.info(`☑️  ${callName} already complete`)
    } else {
    console.info(`⏳ executing ${callName}...`)
      const result = await call
      console.info(`✅ ${callName} complete`)
      return result
    }
  }

  public getDeployerAddress = () => this.wallet.address

  // ================ Static Helper =================
  static getOptionalEnvVariable = (name: string): string | undefined => process.env[name]

  static getEnvVariable = (name: string) => {
    const envVar = this.getOptionalEnvVariable(name)
    if (envVar === undefined) {
      throw new Error(`Environment variable ${name} not defined.`)
    }
    return envVar
  }
}

export default Deployer