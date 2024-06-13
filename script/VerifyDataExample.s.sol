// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import '../lib/forge-std/src/Script.sol';

import { AlloraConsumer } from '../src/AlloraConsumer.sol';
import { IAggregator } from '../src/interface/IAggregator.sol';
import { IFeeHandler } from '../src/interface/IFeeHandler.sol';
import { 
  NetworkInferenceData, 
  AlloraConsumerNetworkInferenceData
} from '../src/interface/IAlloraConsumer.sol';
import { ECDSA } from '../lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol';

// run with 
// forge script ./script/VerifyNetworkInferenceDataExample.s.sol:VerifyNetworkInferenceDataExample --rpc-url <rpc url> --etherscan-api-key <etherscan api key> --broadcast --verify -vvvv

contract VerifyNetworkInferenceDataExample is Script {

    AlloraConsumer alloraConsumer = AlloraConsumer(0x238D0abD53fC68fAfa0CCD860446e381b400b5Be);

    function run() public virtual {
        uint256 scriptRunnerPrivateKey = vm.envUint('SCRIPT_RUNNER_PRIVATE_KEY');
        address scriptRunner = vm.addr(scriptRunnerPrivateKey);

        vm.startBroadcast(scriptRunnerPrivateKey);
        console.log('Broadcast started by %s', scriptRunner);

        uint256[] memory numericValues = new uint256[](1);
        numericValues[0] = 123456789012345678;


        uint256[] memory confidenceIntervals = new uint256[](2);
        confidenceIntervals[0] = 15870000000000000000;
        confidenceIntervals[1] = 97720000000000000000;

        uint256[] memory confidenceIntervalValues = new uint256[](2);
        confidenceIntervalValues[0] = 1000000000000000000;
        confidenceIntervalValues[1] = 2000000000000000000;

        NetworkInferenceData memory networkInferenceData = NetworkInferenceData({
            networkInference: 123456789012345678,
            confidenceIntervals: confidenceIntervals,
            confidenceIntervalValues: confidenceIntervalValues,
            topicId: 1,
            timestamp: block.timestamp - 5 minutes,
            extraData: ''
        });

        bytes32 message = alloraConsumer.getNetworkInferenceMessage(networkInferenceData);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(
            scriptRunnerPrivateKey, 
            ECDSA.toEthSignedMessageHash(message)
        );

        alloraConsumer.verifyNetworkInference(AlloraConsumerNetworkInferenceData({
            signature: abi.encodePacked(r, s, v),
            networkInference: networkInferenceData,
            extraData: ''
        }));

        vm.stopBroadcast();
    }

    function _bytes32ToString(bytes32 _bytes32) internal pure returns (string memory) {
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
}
