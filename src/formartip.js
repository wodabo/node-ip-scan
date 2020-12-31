const fs = require("fs")
const path = require('path');

const regSpace = /\s+/g      //匹配空格
const regN = /\r\n/g      //匹配回车
let ips = ''

try{
    ips = fs.readFileSync(path.join(__dirname,'../ip.txt')).toString()
    ips = ips.replace(regN,',')
    ips = ips.replace(regSpace, '----')
    ips = ips.split(',')
    ips = ips.map((item)=>{
        if(item){
            let temp = item.split('----')
            temp[0] = temp[0].split('.')
            temp[1] = temp[1].split('.')
            return temp
        }else{
            return null
        }
    })
    ips = ips.filter(item=>item)
}catch(err){
    console.log(err);
}
console.log(ips);
module.exports = ips