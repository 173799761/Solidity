const ERC20Ext = artifacts.require("ERC20Ext");
contract("ERC20Ext",accounts => {
    it("mint token",async() => {
        const instance = await ERC20Ext.deployed();

        let feeRatio = 100;
        let burnRatio = 50;
        let feeAddress = accounts[2];
        await instance.set(feeRatio,burnRatio,feeAddress);

        let account = accounts[0];
        let amount = 100000000000000;
        await instance.mint(account, amount);
        const account_one_balance = await instance.balanceOf.call(account);
        assert.equal(account_one_balance.toNumber(),amount);

        let burnAmount = 10000000000000;
        await instance.burn(burnAmount);
        const account_one_balance_burn = await instance.balanceOf.call(account);
        assert.equal(account_one_balance_burn.toNumber(),amount-burnAmount);

        
        let receiver = accounts[3];
        let transferAmount = 10000000000000;
        await instance.transfer(receiver ,transferAmount);
        const account_one_balance_transfer = await instance.balanceOf.call(receiver);
        transferAmount = transferAmount-(transferAmount*feeRatio/1000)-(transferAmount*burnRatio/1000);
        assert.equal(account_one_balance_transfer.toNumber(),transferAmount);

    })
})