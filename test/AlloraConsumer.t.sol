// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Test.sol";
import { ECDSA } from "../lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";
import { AlloraConsumer, AlloraConsumerConstructorArgs } from "../src/AlloraConsumer.sol";
import { 
    NetworkInferenceData, 
    AlloraConsumerNetworkInferenceData
} from "../src/interface/IAlloraConsumer.sol";
import { AverageAggregator } from "../src/aggregator/AverageAggregator.sol";
import { MedianAggregator } from "../src/aggregator/MedianAggregator.sol";
import { IAggregator } from "../src/interface/IAggregator.sol";
import { IFeeHandler } from "../src/interface/IFeeHandler.sol";


contract AlloraConsumerTest is Test {

    IAggregator aggregator;
    AlloraConsumer alloraConsumer;

    address admin = address(100);
    address protocolFeeReceiver = address(101);
    address topicOwner = address(102);

    uint256 signer0pk = 0x1000;
    uint256 signer1pk = 0x1001;
    uint256 signer2pk = 0x1002;

    address signer0;
    address signer1;
    address signer2;

    address[] oneValidSigner;
    address[] twoValidSigners;
    address[] threeValidSigners;
    address[] emptyValidSigners;


    function setUp() public {
        vm.warp(1 hours);

        aggregator = new AverageAggregator();
        alloraConsumer = new AlloraConsumer(AlloraConsumerConstructorArgs({
            owner: admin,
            aggregator: aggregator
        }));

        signer0 = vm.addr(signer0pk);
        signer1 = vm.addr(signer1pk);
        signer2 = vm.addr(signer2pk);

        oneValidSigner = new address[](1);
        oneValidSigner[0] = signer0;

        twoValidSigners = new address[](2);
        twoValidSigners[0] = signer0;
        twoValidSigners[1] = signer1;

        threeValidSigners = new address[](3);
        threeValidSigners[0] = signer0;
        threeValidSigners[1] = signer1;
        threeValidSigners[2] = signer2;
    }

    // ***************************************************************
    // * ===================== FUNCTIONALITY ======================= *
    // ***************************************************************
    function test_cantCallVerifyDataWhenContractSwitchedOff() public {
        vm.startPrank(admin);
        alloraConsumer.turnOffConsumer();
        
        AlloraConsumerNetworkInferenceData memory nd = _packageAndSignNetworkInferenceData(_dummyNetworkInferenceData(), signer0pk);
        vm.expectRevert(abi.encodeWithSignature("AlloraConsumerNotSwitchedOn()"));
        alloraConsumer.verifyNetworkInference(nd);
    }

    function test_canCallVerifyDataWithValidSignature() public {
        vm.startPrank(admin);
        alloraConsumer.addDataProvider(signer0);
        vm.stopPrank();

        AlloraConsumerNetworkInferenceData memory alloraNd = _packageAndSignNetworkInferenceData(_dummyNetworkInferenceData(), signer0pk);  
        alloraConsumer.verifyNetworkInference(alloraNd);
    }

    function test_valueIsSavedWhenCallingVerifyDataWithValidSignature() public {
        vm.startPrank(admin);
        alloraConsumer.addDataProvider(signer0);
        vm.stopPrank();

        uint48 timestamp = 1672527600;
        vm.warp(timestamp);

        NetworkInferenceData memory nd = _dummyNetworkInferenceData();
        nd.timestamp = uint64(block.timestamp - 1 minutes);

        AlloraConsumerNetworkInferenceData memory alloraNd = _packageAndSignNetworkInferenceData(nd, signer0pk);

        uint256 recentValueTime0 = alloraConsumer.getTopicValue(1, '').recentValueTime;
        uint256 recentValue0 = alloraConsumer.getTopicValue(1, '').recentValue;

        alloraConsumer.verifyNetworkInference(alloraNd);

        uint256 recentValueTime1 = alloraConsumer.getTopicValue(1, '').recentValueTime;
        uint256 recentValue1 = alloraConsumer.getTopicValue(1, '').recentValue;

        assertEq(recentValue0, 0);
        assertEq(recentValueTime0, 0);

        assertEq(recentValue1, nd.networkInference);
        assertEq(recentValueTime1, timestamp);
    }


    function test_cantCallVerifyDataWithFutureTime() public {
        vm.startPrank(admin);
        alloraConsumer.addDataProvider(signer0);
        vm.stopPrank();

        NetworkInferenceData memory nd = _dummyNetworkInferenceData();
        nd.timestamp = uint64(block.timestamp + 1 minutes);

        AlloraConsumerNetworkInferenceData memory alloraNd = _packageAndSignNetworkInferenceData(nd, signer0pk);

        vm.expectRevert(abi.encodeWithSignature("AlloraConsumerInvalidDataTime()"));
        alloraConsumer.verifyNetworkInference(alloraNd);
    }


    function test_cantCallVerifyDataWithExpiredTime() public {
        vm.startPrank(admin);
        alloraConsumer.updatePastDataValiditySeconds(30 minutes);
        vm.stopPrank();

        NetworkInferenceData memory nd = _dummyNetworkInferenceData();
        nd.timestamp = uint64((block.timestamp - alloraConsumer.pastDataValiditySeconds()) - 1);

        AlloraConsumerNetworkInferenceData memory alloraNd = _packageAndSignNetworkInferenceData(nd, signer0pk);

        vm.expectRevert(abi.encodeWithSignature("AlloraConsumerInvalidDataTime()"));
        alloraConsumer.verifyNetworkInference(alloraNd);
    }

    function test_cantCallVerifyDataWithInvalidDataProvider() public {
        AlloraConsumerNetworkInferenceData memory alloraNd = _packageAndSignNetworkInferenceData(_dummyNetworkInferenceData(), signer0pk);  
        vm.expectRevert(abi.encodeWithSignature("AlloraConsumerInvalidDataProvider()"));
        alloraConsumer.verifyNetworkInference(alloraNd);
    }

    function test_viewAndNonViewFunctionsGiveSameResult() public {
        vm.startPrank(admin);
        alloraConsumer.addDataProvider(signer0);
        alloraConsumer.addDataProvider(signer1);
        vm.stopPrank();

        NetworkInferenceData memory nd = _dummyNetworkInferenceData();

        AlloraConsumerNetworkInferenceData memory alloraNd = _packageAndSignNetworkInferenceData(nd, signer0pk);

        uint256 numericValue = alloraConsumer.verifyNetworkInference(alloraNd);
        uint256 numericValueView = alloraConsumer.verifyNetworkInferenceViewOnly(alloraNd);
        assertEq(numericValue, 2 ether);
        assertEq(numericValue, numericValueView);
    }

    function test_valueIsSavedWhenCallingVerifyDataWithMultipleValidSignatures() public {
        vm.startPrank(admin);
        alloraConsumer.addDataProvider(signer0);
        alloraConsumer.addDataProvider(signer1);
        vm.stopPrank();

        NetworkInferenceData memory nd = _dummyNetworkInferenceData();

        AlloraConsumerNetworkInferenceData memory alloraNd = _packageAndSignNetworkInferenceData(nd, signer0pk);
        
        uint256 recentValue0 = alloraConsumer.getTopicValue(1, '').recentValue;

        alloraConsumer.verifyNetworkInference(alloraNd);

        uint256 recentValue1 = alloraConsumer.getTopicValue(1, '').recentValue;

        assertEq(recentValue0, 0);
        assertEq(recentValue1, 2 ether);
    }

    function test_valueIsSavedWhenCallingVerifyDataWithExtraDataSet() public {
        vm.startPrank(admin);
        alloraConsumer.addDataProvider(signer0);
        alloraConsumer.addDataProvider(signer1);
        vm.stopPrank();

        NetworkInferenceData memory nd = _dummyNetworkInferenceData();
        nd.extraData = '123';

        AlloraConsumerNetworkInferenceData memory alloraNd = _packageAndSignNetworkInferenceData(nd, signer0pk);
        
        uint256 recentValueEmptyExtraData0 = alloraConsumer.getTopicValue(1, '').recentValue;
        uint256 recentValue0 = alloraConsumer.getTopicValue(1, '123').recentValue;

        alloraConsumer.verifyNetworkInference(alloraNd);

        uint256 recentValueEmptyExtraData1 = alloraConsumer.getTopicValue(1, '').recentValue;
        uint256 recentValue1 = alloraConsumer.getTopicValue(1, '123').recentValue;

        assertEq(recentValueEmptyExtraData0, 0);
        assertEq(recentValueEmptyExtraData1, 0);
        assertEq(recentValue0, 0);
        assertEq(recentValue1, 2 ether);
    }

    // ***************************************************************
    // * ================= INTERNAL HELPERS ======================== *
    // ***************************************************************
    function _dummyNetworkInferenceData() internal pure returns (NetworkInferenceData memory) {
        return NetworkInferenceData({
            networkInference: 123456789012345678,
            topicId: 1,
            timestamp: 1,
            extraData: ''
        });
    }

    function _signNetworkInferenceData(
        NetworkInferenceData memory networkInferenceData,
        uint256 signerPk
    ) internal view returns (bytes memory signature) {
        bytes32 message = alloraConsumer.getNetworkInferenceMessage(networkInferenceData);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(
            signerPk, 
            ECDSA.toEthSignedMessageHash(message)
        );
        signature = abi.encodePacked(r, s, v);
    }

    function _packageNetworkInferenceData(
        NetworkInferenceData memory networkInferenceData,
        bytes memory signature
    ) internal pure returns (AlloraConsumerNetworkInferenceData memory) {

        return AlloraConsumerNetworkInferenceData({
            networkInferenceData: networkInferenceData,
            signature: signature,
            extraData: ''
        });
    }

    function _packageAndSignNetworkInferenceData(
        NetworkInferenceData memory networkInferenceData,
        uint256 signerPk
    ) internal view returns (AlloraConsumerNetworkInferenceData memory) {
        return _packageNetworkInferenceData(
            networkInferenceData, 
            _signNetworkInferenceData(networkInferenceData, signerPk)
        );
    }
}