import {
  showToast,
  checkNetWork
} from '../utils/util.js'
import {
  verifyLogin,
  verifyPhoneNum,
} from '../utils/commonTools.js';
const wxapi = require('../utils/wxapi.js');

const data = {
  payMessage:''
}
/** 获取秒杀支付报文 */
function getPayMessage(_that, params, success, fail){
  wxapi.getPayOrderInf(params, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        success(result);
        let payMessage = JSON.parse(result.payMessage);
        requestPay(payMessage);
      } else {
        fail(res);
        showToast('text', res.msg, 1500);
      }
    }).catch(err => {
      showToast('error', '支付失败', 1500);
    });
}
/** 执行微信支付 */
function requestPay(payMessage){
  console.log(payMessage)
  wx.requestPayment({
    'timeStamp': payMessage.timeStamp,
    'nonceStr': payMessage.nonceStr,
    'package': payMessage.package,
    'signType': payMessage.signType,
    'paySign': payMessage.paySign,
    'success': function (res) {
      var result = res.data;
      console.log(result);
      showToast('success', '支付成功', 1500);
    },
    'fail': function (res) {
      showToast('error', '支付失败', 1500);
    },
    'complete': function (res) {
      console.log(res);
    }
  })
}

module.exports = {
  payData: data,
  getPayMessage: getPayMessage,
  requestPay: requestPay,
}

