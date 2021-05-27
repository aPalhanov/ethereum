const DeedMultiPayouts = artifacts.require('DeedMultiPayouts');

contract('DeedMultiPayouts', (accounts) => {
  let deedMultiPayouts = null;
  before(async () => {
    deedMultiPayouts = await DeedMultiPayouts.deployed();
  });

  it('should withdraw for all payouts (1)', async () => {
    for(let i = 0; i < 4; i++) {
      const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      //console.log(await web3.eth.getBalance(accounts[1]));
      await new Promise(resolve => setTimeout(resolve, 1000));
      await deedMultiPayouts.withdraw({from: accounts[0]});
      const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      
      assert(finalBalance.sub(initialBalance).toNumber() === 25);
    }
  });

  /*
  it('Should withdraw', async () => {
    const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
    await new Promise(resolve => setTimeout(resolve, 5000)); 
    await deed.withdraw({from: accounts[0]});
    const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
    assert(finalBalance.sub(initialBalance).toNumber() === 100);
  });
*/

  it('should withdraw for all payouts (2)', async () => {
    const deedMultiPayouts = await DeedMultiPayouts.new(
      accounts[0], 
      accounts[1], 
      1, 
      {value: 100}
    );
    for(let i = 0; i < 2; i++) {
      const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      await new Promise(resolve => setTimeout(resolve, 2000));
      await deedMultiPayouts.withdraw({from: accounts[0]});
      const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      assert(finalBalance.sub(initialBalance).toNumber() === 50);
    }
  });

  it('should NOT withdraw if no payout left', async () => {
    try {
      await deedMultiPayouts.withdraw({from: accounts[0]});
    } catch (e) {
      assert(e.message.includes('no payout left'));
      return;
    }
    assert(false);
  });

  it('should NOT withdraw if too early', async () => {
    const deedMultiPayouts = await DeedMultiPayouts.new(
      accounts[0], 
      accounts[1], 
      5, 
      {value: 100}
    );
    try {
      await deedMultiPayouts.withdraw({from: accounts[0]});
    } catch(e) {
      assert(e.message.includes('too early'));
      return;
    }
    assert(false);
  });


/* it('Should NOT withdraw if too early', async () => {
    const deed = await Deed.new(
      accounts[0], 
      accounts[1], 
      5, 
      {value: 100}
    );
    try { 
      await deed.withdraw({from: accounts[0]});
    } catch(e) {
      assert(e.message.includes('too early'));
      return;
    }
    assert(false);
  });*/

  it('should NOT withdraw if caller is not lawyer', async () => {
    const deedMultiPayouts = await DeedMultiPayouts.new(
      accounts[0], 
      accounts[1], 
      5, 
      {value: 100}
    );
    try {
      await deedMultiPayouts.withdraw({from: accounts[1]});
    } catch(e) {
      assert(e.message.includes('lawyer only'));
      return;
    }
    assert(false);
  });














});



