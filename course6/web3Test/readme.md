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



###### 增发

```javascript
  //doMint 增发
    const doMintBtn = document.querySelector('.doMint')
    doMintBtn.addEventListener('click', async function () {
        console.log('click doMintBtn')
        console.log(burnAddr.innerHTML)
        const burnAddrStr = burnAddr.innerHTML
        const mintAmountInputTxt = document.querySelector('.mintAmount')
        console.log(mintAmountInputTxt.value)
        const mintEth = +mintAmountInputTxt.value
        const mintWei = web3.utils.toWei(mintEth.toString())
        console.log(mintWei)
        if(constractInstance == null){
            alert('请先执行第二部操作，以构造合约实例')
        }
        let transferData = constractInstance.methods.mint(accAddr,mintWei).encodeABI();
        console.log(transferData)

        const transferDataSpan = document.querySelector('.navMint .transferData')
        transferDataSpan.innerHTML = transferData

        let estimateGas = await web3.eth.estimateGas({
            to:contractAddr,
            data:transferData,
            from:accAddr,
            value:'0x0'
        });
        console.log(estimateGas)
        const estimateGasSpan = document.querySelector('.navMint .estimateGas')
        estimateGasSpan.innerHTML = estimateGas

        let gasPrice = await web3.eth.getGasPrice()
        console.log(gasPrice)
        const gasPriceSpan = document.querySelector('.navMint .gasPrice')
        gasPriceSpan.innerHTML = web3.utils.fromWei(gasPrice,'gwei')

        let nonce = await web3.eth.getTransactionCount(accAddr)
        console.log(nonce)
        const nonceSpan = document.querySelector('.navMint .nonce')
        nonceSpan.innerHTML = nonce

        const nonceHexSpan = document.querySelector('.navMint .nonceHex')
        console.log(nonceHexSpan)
        console.log(web3.utils.toHex(nonce))
        nonceHexSpan.innerHTML = `${web3.utils.toHex(nonce)}`

        let rawTrans = {
            from:accAddr, 
            to:contractAddr,
            nonce:web3.utils.toHex(nonce),
            gasPrice:gasPrice,
            gas:estimateGas * 2,
            value:'0x0',
            data:transferData,
            chainId:chainId
        }

        const rawTransSpan = document.querySelector('.navMint .rawTrans')
        console.log(rawTransSpan)
        console.log(rawTrans)
        console.log(JSON.stringify(rawTrans))
        rawTransSpan.innerHTML = JSON.stringify(rawTrans)

        web3.eth.sendTransaction(rawTrans).on("transactionHash",function(hash){
            console.log("txtHash:",hash)
            const txHashSpan = document.querySelector('.navMint .txHash')
            txHashSpan.innerHTML = hash
        });


    })
```

执行结果

![](https://uniepicweb.s3.ap-southeast-1.amazonaws.com/solidity/3.1.png)





生成 txHash 0x7bad58c2395f85846be61d7947f29bdf081301faf8a4b58eed9198a756a9af54

https://goerli.etherscan.io/tx/0x7bad58c2395f85846be61d7947f29bdf081301faf8a4b58eed9198a756a9af54



![](https://uniepicweb.s3.ap-southeast-1.amazonaws.com/solidity/3.2.png)





###### 销毁

```javascript
        //doBurn 销毁
    const doBurnBtn = document.querySelector('.doBurn')
    doBurnBtn.addEventListener('click', async function () {
        console.log('click doBurnBtn')
        
        const burnAmountInputTxt = document.querySelector('.burnAmount')
        console.log(burnAmountInputTxt.value)
       // const mintEth = +burnAmountInputTxt.value
        const mintWei = burnAmountInputTxt.value
        console.log(mintWei)
        if(constractInstance == null){
            alert('请先执行第二部操作，以构造合约实例')
        }
        let transferData = constractInstance.methods.burn(mintWei).encodeABI();
        console.log(transferData)

        const transferDataSpan = document.querySelector('.navBurn .transferData')
        transferDataSpan.innerHTML = transferData

        let estimateGas = await web3.eth.estimateGas({
            to:contractAddr,
            data:transferData,
            from:accAddr,
            value:'0x0'
        });
        console.log(estimateGas)
        const estimateGasSpan = document.querySelector('.navBurn .estimateGas')
        estimateGasSpan.innerHTML = estimateGas

        let gasPrice = await web3.eth.getGasPrice()
        console.log(gasPrice)
        const gasPriceSpan = document.querySelector('.navBurn .gasPrice')
        gasPriceSpan.innerHTML = web3.utils.fromWei(gasPrice,'gwei')

        let nonce = await web3.eth.getTransactionCount(accAddr)
        console.log(nonce)
        const nonceSpan = document.querySelector('.navBurn .nonce')
        nonceSpan.innerHTML = nonce

        const nonceHexSpan = document.querySelector('.navBurn .nonceHex')
        console.log(nonceHexSpan)
        console.log(web3.utils.toHex(nonce))
        nonceHexSpan.innerHTML = `${web3.utils.toHex(nonce)}`

        let rawTrans = {
            from:accAddr, 
            to:contractAddr,
            nonce:web3.utils.toHex(nonce),
            gasPrice:gasPrice,
            gas:estimateGas * 2,
            value:'0x0',
            data:transferData,
            chainId:chainId
        }

        const rawTransSpan = document.querySelector('.navBurn .rawTrans')
        console.log(rawTransSpan)
        console.log(rawTrans)
        console.log(JSON.stringify(rawTrans))
        rawTransSpan.innerHTML = JSON.stringify(rawTrans)

        web3.eth.sendTransaction(rawTrans).on("transactionHash",function(hash){
            console.log("txtHash:",hash)
            const txHashSpan = document.querySelector('.navBurn .txHash')
            txHashSpan.innerHTML = hash
        });
    })
```



结果如图



txHash:0x9d6ac0414b9ca276647df2a4e8498023f43bf87e4f279a972555632227fe4142

https://goerli.etherscan.io/tx/0x9d6ac0414b9ca276647df2a4e8498023f43bf87e4f279a972555632227fe4142



弹出metamask 确认



![](https://uniepicweb.s3.ap-southeast-1.amazonaws.com/solidity/4.1.png)





产生txHash



![](https://uniepicweb.s3.ap-southeast-1.amazonaws.com/solidity/4.2.png)



https://goerli.etherscan.io/tx/0x9d6ac0414b9ca276647df2a4e8498023f43bf87e4f279a972555632227fe4142



![](https://uniepicweb.s3.ap-southeast-1.amazonaws.com/solidity/4.3.png)



###### 剩余页面布局代码



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>course 6</title>
   
    <link href="css/main.css" rel="stylesheet">
    <script type="text/javascript" src="js/web3.min.js"></script>
</head>

<body>
    <h1 style="text-align: center;">Course 6</h1>
    <h3>1.连接metamask<span class="h1Mark">通过metamask构造web3web3实例类</span></h3>
    <button class="doConnect">connect wallet</button> 
    <ul class="nav">
        <li><span class="chainIdlbl">chainId :</span> <span class="chainId"></span></li>
        <li><span class="blockNumberlbl">blockNumber :</span> <span class="blockNumber"></span></li>
        <li><span class="blockTimestamplbl">blockTimestamp :</span> <span class="blockTimestamp"></span></li>
        <li><span class="accAddrlbl">accAddr :</span> <span class="accAddr"></span></li>
        <li><span class="accBalancelbl">accBalance (单位:<span style="color: red;">Wei</span>):</span> <span class="accBalance"></span></li>
        <li><span class="accBalanceFromWeilbl">accBalanceFromWei(单位:<span style="color: red;">ETH</span>) :</span> <span class="accBalanceFromWei"></span></li>
    </ul>
    <hr>
    <h3>2.读取Goerli测试网上之前部署的ERC20ext合约<span class="h1Mark">通过rpc构造web3实例类</span></h3>
        <div>
            <button class="doRead">读取合约</button> 
            <span class="accBalanceFromWeilbl">请输入合约地址 :</span><input type="text" class ="erc20ExtAddrLbl" value="0x6b42075063f3e4d12e415e41199396b8a438cc70" style="width: 315px;">
            <ul class="nav">
                <li><span class="tokenSymbollbl">tokenSymbol :</span> <span class="tokenSymbol"></span></li>
                <li><span class="tokenTotalSupplylbl">tokenTotalSupply :</span> <span class="tokenTotalSupply"></span></li>
            </ul> 
        </div>
        <div>
            <button class="doUserBalance">获取指定账户代币数量</button>
            <span class="userMetaMaskAddrlbl">请输入账户钱包地址 :</span><input type="text" class ="userMetaMaskAddr" value="" style="width: 315px;">
            <ul class="nav">
                <li><span class="userTokenAmountlbl">userTokenAmount :</span> <span class="userTokenAmount"></span></li>                
            </ul> 
        </div>
        <hr>
        <h3>3.ERC20ext合约<span class="h1Mark">增发mint接口，要求是合约创建者才能调用</span></h3>
            <button class="doMint">增发</button>
            <span class="mintMetaMaskAddrlbl">请输入账户钱包地址 :</span><input type="text" class ="mintMetaMaskAddr" value="" style="width: 315px;">
            <span class="mintAmountlbl">请输入mint数量 (单位:<span style="color: red;">ETH</span>):</span><input type="text" class ="mintAmount" value="10" style="width: 50px;">
            <ul class="navMint">
                <li><span class="estimateGaslbl">estimateGas :</span> <span class="estimateGas"></span></li>
                <li><span class="gasPricelbl">gasPrice :</span> <span class="gasPrice"></span></li>
                <li><span class="txHashlbl">txHash :</span> <span class="txHash" style="color: red;"></span></li>
                <li><span class="noncelbl">nonce :</span> <span class="nonce"></span></li>
                <li><span class="nonceHexlbl">nonceHex :</span> <span class="nonceHex"></span></li>
                <li><span class="transferDatalbl">transferData :</span> <span class="transferData"></span></li>
                <li><span class="rawTranslbl">rawTrans :</span> <span class="rawTrans"></span></li>
            </ul>
        <hr>
        <h3>4.ERC20ext合约<span class="h1Mark">销毁burn接口</span></h3>
            <button class="doBurn">销毁</button>
            <div class="burnAddrlbl">销毁账户地址:<span class="burnAddr"></span></div>
            <span class="burnlbl">请输入销毁数量(单位:<span style="color: red;">Wei</span>) :</span><input type="text" class ="burnAmount" value="2" style="width: 50px;">
            <ul class="navBurn">
                <li><span class="estimateGaslbl">estimateGas :</span> <span class="estimateGas"></span></li>
                <li><span class="gasPricelbl">gasPrice :</span> <span class="gasPrice"></span></li>
                <li><span class="txHashlbl">txHash :</span> <span class="txHash" style="color: red;"></span></li>
                <li><span class="noncelbl">nonce :</span> <span class="nonce"></span></li>
                <li><span class="nonceHexlbl">nonceHex :</span> <span class="nonceHex"></span></li>
                <li><span class="transferDatalbl">transferData :</span> <span class="transferData"></span></li>
                <li><span class="rawTranslbl">rawTrans :</span> <span class="rawTrans"></span></li>
            </ul>
        <div id="footer">&nbsp;© Glen 郭梁</div>
</body>
</html>
```





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



