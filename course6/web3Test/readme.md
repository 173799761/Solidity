## Course6

##### web3.js api的使用



###### 安装 http-server ,开启http服务



安装

```bash
npm i -g http-server
```

开启

```
http-server
```



如下图:

![](https://uniepicweb.s3.ap-southeast-1.amazonaws.com/solidity/httpserver.png)

###### **ERC20合约地址**

https://goerli.etherscan.io/address/0x6b42075063f3e4d12e415e41199396b8a438cc70



源码地址：

https://github.com/173799761/Solidity/tree/main/course4/erc20Ext





###### 连接钱包，获取钱包信息



```javascript
    connBtn.addEventListener('click', async function () {
        console.log('click connect wallet btn')
        if (window.ethereum) {
            try {
                await window.ethereum.enable()
                web3 = new Web3(window.ethereum)
            } catch (error) {
                console.log("error", error)
            }
        } else if (window.web3) {
                web3 = new Web3(ethereum);
        } else {
            window.location.href = "https://metamask.io/download/";
            return;
        }

        chainId = await web3.eth.getChainId()
        console.log(`chainId is ${chainId}`)
        chainIdDiv.innerHTML = `${chainId}`

        blockNumber = await web3.eth.getBlockNumber()
        blockNumberDiv.innerHTML = `${blockNumber}`

        let block = await web3.eth.getBlock(blockNumber)
        blockTimestamp = block.timestamp
        blockTimestampDiv.innerHTML = `${blockTimestamp}`


        let accounts = await web3.eth.getAccounts()
        console.log(accounts)
        accAddr = accounts[0]
        accAddrDiv.innerHTML = `${accAddr}`

        accBalance = await web3.eth.getBalance(accAddr)
        accBalanceDiv.innerHTML = `${accBalance}`
        accBalanceFromWeiDiv.innerHTML = `${web3.utils.fromWei(accBalance)}`

        userMetaMaskAddrInputText.value = `${accAddr}`
        userMetaMaskAddrInputText.style.color = 'red'

        burnAddr.innerHTML = `${accAddr}`
        burnAddr.style.color = 'red'

        mintMetaMaskAddrInputText.value = `${accAddr}`
        mintMetaMaskAddrInputText.style.color = 'red'
        
    })
```

运行结果如图:





![](https://uniepicweb.s3.ap-southeast-1.amazonaws.com/solidity/metamask.png)





###### 获取合约代表信息

```javascript
    const url = 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
    web3 = new Web3(new Web3.providers.HttpProvider(url));
    let constractInstance = null 

    const readBtn = document.querySelector('.doRead')

    readBtn.addEventListener('click', async function () {
        console.log('click readBtn')
        const erc20ExtAddrLbl = document.querySelector('.erc20ExtAddrLbl')
        console.log(erc20ExtAddrLbl.value)
        const contractAddr = erc20ExtAddrLbl.value
        if(contractAddr.trim().length == 0){
            alert('合约地址不能为空！！！');
        }
        console.log('开始创建合约实例')



        constractInstance = new web3.eth.Contract(erc20Abi,contractAddr)
        console.log(constractInstance)

        let tokenSymbol = await constractInstance.methods.symbol().call();
        let tokenTotalSupply = await constractInstance.methods.totalSupply().call();
        console.log(tokenSymbol)
        console.log(tokenTotalSupply)



        const tokenSymbolDiv = document.querySelector('.tokenSymbol')
        const tokenTotalSupplyDiv = document.querySelector('.tokenTotalSupply')
        const balanceDiv = document.querySelector('.userTokenAmount')
        tokenSymbolDiv.innerHTML = tokenSymbol
        tokenTotalSupplyDiv.innerHTML = tokenTotalSupply
       
    })
```



运行结果



![](https://uniepicweb.s3.ap-southeast-1.amazonaws.com/solidity/contractinfo.png)



###### 其他资料

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



