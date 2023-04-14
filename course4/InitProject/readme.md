





## 通过 truffle init 来初始化的项目

##### 1.truffle init 初始化项目

```bash
truffle init
```

2.安装 dotenv，配置privateKey和infuraId

```bash
npm i dotenv
```



truffle-config.js 引入 dotenv

```bash
 require("dotenv").config();
 const { MNEMONIC, PROJECT_ID } = process.env;
```



赋值privateKey和infuraId

```bash
 const privateKey = process.env.privateKey;
 const infuraId = process.env.infuraId;
```



##### 2.配置测试网络



export privateKey = "xxxxx"

export infuraId =  "xxxxx"

```bash
    goerli: {
      provider: () => new HDWalletProvider(privateKey, `https://goerli.infura.io/v3/${infuraId}`),
      network_id: 5,       // Goerli's id
      gas: 10000000,
      gasPrice:  1500000000,    // Skip dry run before migrations? (default: false for public nets )
    },
```

本地



```bash
   development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
```



##### 3.配置编译器版本和setting

```bash
  compilers: {
    solc: {
      version: "0.8.18",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
       evmVersion: "london"
      }
    }
  },
```

##### 4.安装 HDWalletProvider



创建package.json

```bash
npm init
```

安装hdwallet-provider 通过--save参数将hdwallet-provider 添加到 package.json 的 dependencies 依赖中,`安装时候需要科学上网`

```bash
npm install @truffle/hdwallet-provider --save
```

5.安装



5.部署合约



测试网

```bash
truffle migrate --network goerli
```

本地

```bash
truffle migrate --network development
```



开源合约

开源协议选择 MIT





openzeppelin安装

```bash
npm install @openzeppelin/contracts --save
```







