#### 安装运行环境
- [random names]https://randominfo.cn/random-names
- 首先安装好node最新的lts版本  https://nodejs.org/en/

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
找到根目录下(和index.js同级)的ip.txt文本， 添加需要扫描的ip段， 格式如下
```
    183.128.0.0   183.159.255.255
    115.224.0.0   115.239.255.255
    123.152.0.0   123.159.255.255
```


#### 运行项目

```node
npm run start
```

