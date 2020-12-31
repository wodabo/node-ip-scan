#### 安装运行环境

- 首先安装好node 的版本， https://nodejs.org/en/   安装最新的lts版本

#### 修改配置文件

```javascript
const config = {
    ips:ips,    //导入的ip
    port:8083, //扫描的端口
    timeOut:2000, // 连接超时
    speed:255,  //速度， 最大支持1000
    isOpenBrowser:false, //符合条件的IP是否自动打开ip
}
```

#### 运行项目

```node
npm run start
```

