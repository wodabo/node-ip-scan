const ips = require('./formartip')
const config = {
    ips:ips,    //导入的ip
    port:8083, //扫描的端口
    timeOut:2000, // 连接超时
    speed:255,  //速度， 最大支持1000
    isOpenBrowser:false, //符合条件的IP是否自动打开ip
}
console.log(ips);
module.exports = config