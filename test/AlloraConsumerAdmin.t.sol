// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Test.sol";
import { ECDSA } from "../lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";
import { AlloraConsumer } from "../src/AlloraConsumer.sol";
import { EvenFeeHandler, EvenFeeHandlerConstructorArgs } from "../src/feeHandler/EvenFeeHandler.sol";
import { IAggregator } from "../src/interface/IAggregator.sol";
import { IFeeHandler } from "../src/interface/IFeeHandler.sol";

contract AlloraConsumerAdmin is Test {

    EvenFeeHandler public evenFeeHandler;
    AlloraConsumer alloraConsumer;

    address admin = address(100);
    address protocolFeeReceiver = address(101);
    address protocolFeeReceiver2 = address(102);

    address imposter = address(200);
    address newDataProvider = address(201);
    IAggregator dummyAggregator = IAggregator(address(202));
    IFeeHandler dummyFeeHandler = IFeeHandler(address(202));

    uint256 signer0pk = 0x1000;
    uint256 signer1pk = 0x1001;
    uint256 signer2pk = 0x1002;

    address signer0;
    address signer1;
    address signer2;

    address[] oneValidProvider;
    address[] twoValidProvider;
    address[] threeValidProviders;

    function setUp() public {
        vm.warp(1 hours);

        alloraConsumer = new AlloraConsumer(admin);

        signer0 = vm.addr(signer0pk);
        signer1 = vm.addr(signer1pk);
        signer2 = vm.addr(signer2pk);

        oneValidProvider = new address[](1);
        oneValidProvider[0] = signer0;

        twoValidProvider = new address[](2);
        twoValidProvider[0] = signer0;
        twoValidProvider[1] = signer1;

        threeValidProviders = new address[](3);
        threeValidProviders[0] = signer0;
        threeValidProviders[1] = signer1;
        threeValidProviders[2] = signer2;
    }

    // ***************************************************************
    // * ========= UPDATE FUTURE DATA VALIDITY SECONDS ============= *
    // ***************************************************************

    function test_imposterCantUpdateFutureDataValiditySeconds() public {
        vm.startPrank(imposter);

        vm.expectRevert("Ownable: caller is not the owner");
        alloraConsumer.updateFutureDataValiditySeconds(3 minutes);
    }

    function test_ownerCanUpdateFutureDataValiditySeconds() public {
        vm.startPrank(admin);

        assertFalse(alloraConsumer.futureDataValiditySeconds() == 3 minutes);

        alloraConsumer.updateFutureDataValiditySeconds(3 minutes);

        assertEq(alloraConsumer.futureDataValiditySeconds(), 3 minutes);
    }

    // ***************************************************************
    // * ========== UPDATE PAST DATA VALIDITY SECONDS ============== *
    // ***************************************************************

    function test_imposterCantUpdatePastDataValiditySeconds() public {
        vm.startPrank(imposter);

        vm.expectRevert("Ownable: caller is not the owner");
        alloraConsumer.updatePastDataValiditySeconds(3 minutes);
    }

    function test_ownerCanUpdatePastDataValiditySeconds() public {
        vm.startPrank(admin);

        assertFalse(alloraConsumer.pastDataValiditySeconds() == 3 minutes);

        alloraConsumer.updatePastDataValiditySeconds(3 minutes);

        assertEq(alloraConsumer.pastDataValiditySeconds(), 3 minutes);
    }

    // ***************************************************************
    // * ==================== ADD DATA PROVIDER ==================== *
    // ***************************************************************

    function test_imposterCantAddDataProvider() public {
        vm.startPrank(imposter);

        vm.expectRevert("Ownable: caller is not the owner");
        alloraConsumer.addDataProvider(imposter);
    }

    function test_ownerCanAddDataProvider() public {
        vm.startPrank(admin);

        assertEq(alloraConsumer.validDataProvider(newDataProvider), false);

        alloraConsumer.addDataProvider(newDataProvider);

        assertEq(alloraConsumer.validDataProvider(newDataProvider), true);
    }

    // ***************************************************************
    // * ================== REMOVE DATA PROVIDER =================== *
    // ***************************************************************

    function test_imposterCantRemoveDataProvider() public {
        vm.startPrank(imposter);

        vm.expectRevert("Ownable: caller is not the owner");
        alloraConsumer.removeDataProvider(imposter);
    }

    function test_ownerCanRemoveDataProvider() public {
        vm.startPrank(admin);

        alloraConsumer.addDataProvider(newDataProvider);

        assertEq(alloraConsumer.validDataProvider(newDataProvider), true);

        alloraConsumer.removeDataProvider(newDataProvider);

        assertEq(alloraConsumer.validDataProvider(newDataProvider), false);
    }

    // ***************************************************************
    // * ================== TURN OFF CONSUMER ======================== *
    // ***************************************************************

    function test_imposterCantTurnOffConsumer() public {
        vm.startPrank(imposter);

        vm.expectRevert('Ownable: caller is not the owner');
        alloraConsumer.turnOffConsumer();
    }

    function test_ownerCanTurnOffConsumer() public {
        vm.startPrank(admin);

        assertEq(alloraConsumer.switchedOn(), true);

        alloraConsumer.turnOffConsumer();

        assertEq(alloraConsumer.switchedOn(), false);
    }

    // ***************************************************************
    // * ================== TURN ON CONSUMER ======================= *
    // ***************************************************************

    function test_imposterCantTurnOnConsumer() public {
        vm.startPrank(imposter);

        vm.expectRevert('Ownable: caller is not the owner');
        alloraConsumer.turnOnConsumer();
    }

    function test_ownerCanTurnOnConsumer() public {
        vm.startPrank(admin);
        alloraConsumer.turnOffConsumer();

        assertEq(alloraConsumer.switchedOn(), false);

        alloraConsumer.turnOnConsumer();

        assertEq(alloraConsumer.switchedOn(), true);
    }
}
