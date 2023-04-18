## Course2



##### web3.js api的使用



安装 http-server

```bash
npm i -g http-server
```

##### **ERC20合约地址**



https://goerli.etherscan.io/address/0x6b42075063f3e4d12e415e41199396b8a438cc70



###### `to : 0x4717baf57d1a8ab7ef22aa5801d23a38c7bd2558 `

合约地址





###### `value : 0 `

往智能合约里冲ETH的具体数量，此处为0 即没有往合约里冲ETH





###### `Nonce: 2  `

代表账户下当前交易顺序值 按照每笔交易递增 作用

1. 是为了防止重放攻击

2. 配合加速交易和取消交易，提升gasPrice值

   

   

###### `Gas Price : 30.389039435 Gwei (0.000000030389039435 ETH)  `

每个gas对应的价格  





###### `GasLimit `: 

这笔交易执行的gas上限





###### `chainId ：5   `

Goerli 测试网网络编号





###### `Transaction Fee:0.00132873036025594 ETH$0`  

手续费 计算规则为

43724 （  Usage by Txn 使用部分 ） *( 27.889039435 Gwei (Base)  +  2.5 Gwei(Max Priority 矿工小费) ) = 1328730.3602559401Gwei



`Burnt: 0.00121942036025594 ETH ($0.00)`

燃烧 即被销毁的部分 

27.889039435 Gwei (Gas Fees.Base)  * 43,724 （  Usage by Txn 使用部分 ）= 1219420.3602559401 Gwei



###### `Txn Savings: 0.00082137162653414 ETH ($0.00)`

退回部分

49.17441192 Gwei（Gas Fees.Max） - (27.889039435 Gwei (Gas Fees.Base) + 2.5 Gwei(Max Priority 矿工小费)  ) =  18.785372484999996Gwei

18.785372484999996Gwei * 43724 （  Usage by Txn 使用部分 ）= 821371.6265341399Gwei





##### ABI编码

###### `Input Data`

```solidity
Function: store(uint256 num) ***

MethodID: 0x6057361d
[0]:  0000000000000000000000000000000000000000000000000000000000000001
```

```solidity
0x6057361d0000000000000000000000000000000000000000000000000000000000000001
```

###### `Contract ABI`

```solidity
[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]
```

###### [decoder](https://calldata-decoder.apoorv.xyz/)

Output

```solidity
{
  "name": "store",
  "params": [
    {
      "name": "num",
      "value": "1",
      "type": "uint256"
    }
  ]
}
```

###### `MethodID 方法的Hash算法前4个字节`

Input type[text]

```bash
store(uint256)
```



Keccak-256 Hash

```bash
6057361d629ce5836ce14fac087ef5517d39207e48ea16a89a53ddf8f64a3605
```



##### 单位

###### 以太币单位

1 wei == 1, 1gwei == 1e9 ,1 ether = 1e18

###### 时间单位

秒是默认单位



##### 其他资料

- [关于EIP1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md)
- [关于ABI](https://docs.soliditylang.org/en/develop/abi-spec.html)
- [关于以太坊状态数据结构](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [web3.js类库文档](https://web3js.readthedocs.io/en/v1.2.11/index.html)
- [web3.js类库文档（中文）](http://cw.hubwiz.com/card/c/web3.js-1.0/)
- [ethers API 文档](https://docs.ethers.org/v6/)
- [calldata-decoder](https://calldata-decoder.apoorv.xyz/)
- [Keccak-256 online](https://emn178.github.io/online-tools/keccak_256.html)
- [EVM cods](https://www.evm.codes/?fork=merge)
- [ChainList](https://chainlist.org/)
- [TinTinFQA](https://tintinland1.notion.site/FQA-7d986a045ad24743ba8218fe2983943b)



