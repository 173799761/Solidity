## Course5

##### 关于The graph



用hosted Service免费网络

###### 安装命令

```bash
npm install -g @graphprotocol/graph-cli@0.46.1-alpha-20230411140719-f3c5e56
```

###### 初始化工程

```bash
graph init --product hosted-service uniepicltd/crowdfunding
```

###### AUTHENTICATED THROUGH CLI

```bash
graph auth --product hosted-service accessToken
```



schema.graphql 定义想要的数据格式



subgraph.yaml  配置要索引的合约文件 以及 索引的合约事件以及事件对应的handler



src/crowd-funding.ts  handler实现的地方

###### buld

```bash
npm run build
```

###### DEPLOY SUBGRAPH

```bash
graph deploy --product hosted-service uniepicltd/crowdfunding
```

###### 部署后的地址



https://thegraph.com/explorer/subgraph/uniepicltd/crowdfunding

##### 其他资料

- [Dune数据分析平台](https://sixdegreelab.gitbook.io/mastering-chain-analytics/)

- [Thegraph Doc](https://thegraph.com/docs/en/cookbook/quick-start/)

  



