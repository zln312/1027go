const wxapi = require("../utils/wxapi.js");

const counts={
  goodsAuction: 20,
  goodsCollage: 120,
  questionActivity: 22,
  redPacket: 100
};

function account(params){
  
  wxapi.getSkillRecord(params,'POST').
  then(res=> {
    if(res.code==200){
      let result = res.data;
      // console.log(result);
      console.log(res);
      success(res);
    }else{
      fail(res);
    }
  }).catch(err=>{
    console.log('用户秒拍记录获取失败');
  })
}


module.exports = {
  counts:counts,
  account:account,
  }