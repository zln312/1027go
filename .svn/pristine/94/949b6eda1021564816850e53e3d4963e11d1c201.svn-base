

const wxapi = require('../utils/wxapi.js');

const data = {
  isSkillAdvert:true,
  skillStatusText: '点击\n秒杀',
}
/** 更新秒杀数据 */
function updateSkillReq(_that, params, success, fail){
  wxapi.getSecKillInf(params, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        success(result);
      } else {
        fail(res);
      }
    }).catch(err => {
      console.log('更新秒杀数据失败');
    });
}
/** 定时更新秒杀数据 */
function timingUpdateSkill(_that, params, success, fail){
  wxapi.getSecKillInf(params, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        success(result);
      } else {
        fail(res);
      }
    }).catch(err => {
      console.log('定时更新秒杀数据');
    });
}

function joinSkillAct(_that, params, success, fail){
  wxapi.getJoinSecKillInf(params, 'POST')
    .then(res => {
      if (200 == res.code) {
        let result = res.data;
        success(result);
      } else {
        fail(res);
        wx.hideLoading();
      
      }
    }).catch(err => {
      wx.hideLoading();
      console.log('参与秒杀活动');
    });
}

function secKillDlgSuccess(message, success){
  wx.showModal({
    content: message,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        success();
      }
    }
  });
}
/** secSkillPayDailog */
function secSkillPayDailog(message, success){
  wx.showModal({
    title: '提示框',
    content: message,
    confirmText: "付款",
    cancelText: "稍后",
    success: function (res) {
      console.log(res);
      if (res.confirm) {
         success(); 
      } else {
        console.log('用户点击辅助操作')
      }
    }
  });
}
module.exports = {
  skillData: data,
  updateSkillReq: updateSkillReq,
  timingUpdateSkill: timingUpdateSkill,
  joinSkillAct: joinSkillAct,
  secKillDlgSuccess: secKillDlgSuccess,
  secSkillPayDailog: secSkillPayDailog
}