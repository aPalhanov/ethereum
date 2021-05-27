// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DeedMultiPayouts {
  address public lawyer;
  address payable public beneficiary;
  uint public earliest;
  uint public amount;
  uint constant public PAYOUTS = 10;
  uint constant public INTERVAL = 10;
  uint public paidPayouts;
  
  constructor(
    address _lawyer,
    address payable _beneficiary,
    uint fromNow)
    payable
     {
        lawyer = _lawyer;
        beneficiary = _beneficiary;
        earliest = block.timestamp + fromNow;
        amount = msg.value / PAYOUTS;
    }
  
  function withdraw() public {
    //require(msg.sender == beneficiary, 'beneficiary only');
    require(msg.sender == lawyer, 'lawyer only');
    require(block.timestamp >= earliest, 'too early');
    require(paidPayouts < PAYOUTS, 'no payout left');
    
    /*
    beneficiary.transfer(amount);
    paidPayouts += 1;
*/

    
    uint elligiblePayouts = (block.timestamp - earliest) / INTERVAL;  //1619510605 - 1619510665 = -6
    uint duePayouts = elligiblePayouts - paidPayouts; //-6 - 0 = -6
    duePayouts = duePayouts + paidPayouts > PAYOUTS ? PAYOUTS - paidPayouts : duePayouts; // -6 + 0 > 10 ? 10 - 0 : -6
    paidPayouts += duePayouts;
    beneficiary.transfer(duePayouts * amount);
  
     }
}
