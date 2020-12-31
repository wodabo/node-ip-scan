const net = require('net'), socket = net.Socket;
const open = require('child_process');
const fs = require("fs")
const path = require('path');
const config = require('./config')
const time = new Date().getTime()  //用于文件名
// 配置目标ip段
let strIP = [],endIP=[]
let deep = 0
let curConnec = 0   //当前线程
// const start = true   //启动和暂停 

async function scan(){
    console.log('开始扫描' + deep);
    while(strIP.join('.') !== endIP.join('.')){
        // if(!start)continue
        await sleep(1);
        const ip = strIP.join('.')
        testPort(config.port, ip,
            (port,status)=>{
                curConnec = curConnec - 1
                if(status){
                    config.isOpenBrowser && open.exec('start http://' + ip + ':' + port); //自动打开网页
                    try{
                        fs.appendFile(path.join(__dirname,`../ips/ips.${time}.txt`), `${ip}:${port}\n`, function (err) {  // 追加数据
                            if (err){
                                console.log(err);
                            }else{
                                console.log(`${ip}:${port}`);
                            }
                        })
                    }catch(err){
                        console.log(err);
                    }
                }
        })
    }
    deep = deep + 1
    config.ips[deep] && init() 
}

function ipAdd(str, end){
    str[3] = 1*str[3]+1
    if(str[3] > 255){
        str[3] = 0
        str[2] = 1*str[2] + 1
        if(str[2] > 255){
            str[2] = 0
            str[1] = 1*str[1] + 1

            if(str[1] > 255){
                str[1] = 0
                str[0] = 1*str[0] + 1
            }
        }
    }
}
function init(){
    if(config.ips.length>0){
        strIP = config.ips[deep][0]
        endIP = config.ips[deep][1]
    }
    scan()
}
// 端口扫描检测方法
function testPort(port,host,cb){
    if(curConnec >= config.speed)return
    curConnec = curConnec + 1
    ipAdd(strIP,endIP)
    var nsk = new socket();
    nsk.setTimeout(config.timeOut||3000);//设置连接超时时间
    nsk.on('connect',function(){//连接状态
        nsk.destroy();//销毁
        nsk=null
        cb(port,true);
    })
    .on('timeout',function(){//连接超时
        nsk.destroy();
        nsk = null
        cb(port,false);
    })
    .on('error',function(){//连接错误
        nsk.destroy();
        nsk = null
        cb(port,false);
    });
    nsk.connect(port,host);//执行连接
};
// 睡眠函数
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
module.exports = {
    init
}