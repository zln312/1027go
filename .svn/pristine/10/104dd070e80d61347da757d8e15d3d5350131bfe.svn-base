import {
  showToast,
  checkNetWork,
  plusXing,
  fileterNickName
} from '../utils/util.js'
const wxapi = require('../utils/wxapi.js');

const data = {
 
}
/** 发送红包 */
function sendRedEnvelopes(_that, params, success, fail){
  wxapi.getAddRedPacket(params, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        success(result);
        console.log(res);
      } else{
        fail(res);
      }
    }).catch(err => {
      showToast('error', '发送红包失败', 1500);
    }); 
}

module.exports = {
  redPacketData: data,
  sendRedEnvelopes: sendRedEnvelopes
}