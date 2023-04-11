## Course4

##### 关于truffle

###### 安装命令

```bash
npm i -g truffle
```

###### 版本号

```bash
truffle version
```

###### 初始化工程

```
truffle init
truffle unbox  //会自动生成一些示例合约代码，Migration脚本和测试js文件
```



新版本不在自动生成Migration.sol和测试js文件



官方答复



![](https://uniepicweb.s3.ap-southeast-1.amazonaws.com/solidity/truffle_init_update.jpg)





GPT3.5回复

![](https://uniepicweb.s3.ap-southeast-1.amazonaws.com/solidity/gtp.png)



需要手动 

安装*@truffle/hdwallet-provider*



export privateKey = ""



npm init

npm install @truffle/hdwallet-provider --save



truffle migrate --network rinkeby



truffle migrate --network development



truffle migrate --network development --reset  强制部署



本地模拟的以太坊环境



npm install @openzeppelin/contracts --save



foundry



https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts



https://github.com/Akagi201/crowd-funding/blob/master/test/CrowdFunding.t.sol



https://github.com/linghuccc/upgradable



hardhat的话, 可以用connect, foundry用prank



改了三个地方
一个是solidity版本,  所有的src/test/script里面的我都改成了^0.8.17

第二个是把address(0x1)改掉, 参考这里https://github.com/foundry-rs/foundry/issues/2943

第三个, 是改testContribute
    function testContribute() public {
        crowdfunding.createCampaign(payable(user), 100, 100);
        crowdfunding.contribute{value: 10}(0);
        (address payable beneficiary, uint256 goal, uint256 deadline, uint256 amountRaised, bool closed) = crowdfunding.campaigns(0);
        assertEq(amountRaised, 10);
    }



forge test没问题





因为你的set是写合约，这笔交易还没被打包你就获取size了，你需要再await set获取tx，然后await tx.wait()



const tx = await IMapping.set(address, value);
await tx.wait();



nvm use --lts  最新的长期支持版本



最方便的还是在config配置，然后用命令验证，或者用truffle-flattener合并成一个文件去etherscan验证

##### 其他资料

- [Truffle](https://trufflesuite.com/truffle/)

- [Truffle Doc](https://learnblockchain.cn/docs/truffle/)

- [第四课FAQ](https://tintinland1.notion.site/FAQ-9c05538a3d6a49438485eeae58df47f7)

- [Ganache](https://trufflesuite.com/ganache/)

- [OpenZeppelin](https://www.openzeppelin.com/contracts)

- [OpenZeppelin Github](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts)

- [测试工具Mocha](https://mochajs.org/)

- [Mocha Github](https://github.com/mochajs/mocha)

- [Hardhat](https://hardhat.org/)

  



