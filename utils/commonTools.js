import {
  fileterNickName
} from '../utils/util.js'
import config from '../utils/config.js'
const wxapi = require('../utils/wxapi.js');
var storageUtil = require('../utils/storage.js');
const data = {
  allowInf: { //关注信息
    onLineNum: 0,
    isAllow: false, //是否关注
    icon_allow: '/images/paid_attention_1.png',
  },

}
/** 验证手机号 */
function verifyPhoneNum() {
  let userInfo = storageUtil.get('userInfo');
  let phoneNum = userInfo.phone;
  if (phoneNum == '-1') {
    return true;
  } else {
    return false;
  }
}

/** 登陆验证 */
function verifyLogin(userInfo) {
  if (JSON.stringify(userInfo) != '{}') {
    return false;
  } else {
    return true;
  }
}

/** 初始化点赞信息 */
function initGiveThumbsUp(_that, isdianzan, thumbsNum) {
  let _data = _that.data;
  let thumbs_up = _data.give_thumbs_up;

  if (thumbs_up.count != undefined) {
    thumbsNum = thumbs_up.count;
  } else {
    if (!thumbsNum && typeof(thumbsNum) != "undefined" && thumbsNum != 0) {
      thumbsNum = 0;
    }
  }

  if (0 == isdianzan) {
    thumbs_up.image = '../../images/give_thumbs_up_1.png';
    thumbs_up.text = '取消';
    thumbsNum += 1;
    thumbs_up.count = thumbsNum;
    updateThumbsUpView(_that, thumbs_up);
  } else {
    thumbs_up.image = '../../images/give_thumbs_up.png';
    thumbs_up.text = '+1';
    if (thumbsNum > 0) {
      thumbsNum -= 1;
    }
    thumbs_up.count = thumbsNum;
    updateThumbsUpView(_that, thumbs_up)
  }
}

function updateThumbsUpView(_that, obj) {
  _that.setData({
    give_thumbs_up: obj
  });
}
/**更新在线人数 */
function updateOnLineNum(_that, obj, isdianzan) {
  let _data = _that.data;
  let allowInf = _data.allowInf;
  allowInf.onLineNum = obj.onLine;
  allowInf.isAllow = false;
  allowInf.icon_allow = '/images/paid_attention_1.png';

  let thumbs_up = _data.give_thumbs_up;
  thumbs_up.count = obj.dianzanacount;
  if (0 == isdianzan) {
    thumbs_up.image = '../../images/give_thumbs_up_1.png';
  } else {
    thumbs_up.image = '../../images/give_thumbs_up.png';
  }
  updateThumbsUpView(_that, thumbs_up);
  updateAllowView(_that, allowInf);
}
/** 登陆验证 */
function loginAuthEvent() {
  wx.navigateTo({
    url: '/pages/authorize/authorize',
  })
}

function vlidateMsgTimer(currentTimer, subValue, msgTotal) {
  let length = msgTotal.length;
  let lastTimer = msgTotal[length - 2].time;
  let subTimer = currentTimer - lastTimer;
  if (subTimer > 0 && subTimer < subValue) {
    return false;
  } else {
    return true;
  }
}

function shareApp() {
  if (verifyLogin()) {
    return {
      title: '1027直播go',
      path: '/pages/advert/advert?userid=',
      imageUrl: 'https://1027go-1259506832.cos.ap-chengdu.myqcloud.com/share_logo.png'
    }
  } else {
    let userInfo = storageUtil.get('userInfo') || {};
    let userid = userInfo.userid;
    return {
      title: '1027直播go',
      path: '/pages/advert/advert?userid=' + userid,
      imageUrl: 'https://1027go-1259506832.cos.ap-chengdu.myqcloud.com/share_logo.png'
    }
  }
}
/** 直播间活动检测 */
function checkLiveRoomAct(_that, params, success, fail) {
  wxapi.getCurrentActInf(params, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        success(res);
      } else {
        fail(res);
      }
    }).catch(err => {
    });
}
/** 初始化开始倒计时间 */
function initCountDown(currentTimer, timer) {
  let usedTime = Math.floor(timer - currentTimer); //两个时间戳相差的毫秒数
  if (usedTime <= 0) {
    return 20001;
  }
  let days = Math.floor(usedTime / (24 * 3600 * 1000));
  let leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000));
  let leave3 = leave2 % (60 * 1000);
  let second = Math.floor(leave3 / 1000);
  // if (hours > 0) {
  //   return '00:05:00';
  // } else {
  //   return '00:' + minutes + ':' + second;
  // }
  return '00:' + minutes + ':' + second;
}
/** 获取在线人数 */
function getOnLineNumOfpeople(_that, userid, roomid, isdianzan) {
  let _data = _that.data;
  let data = {
    userid: userid,
    roomid: roomid,
  }
  wxapi.getOnLineNumInf(data, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        let allowInf = _data.allowInf;
        allowInf.onLineNum = result.onLine;
        allowInf.isAllow = false;
        allowInf.icon_allow = '/images/paid_attention_1.png';
        updateAllowView(_that, allowInf);

        let thumbs_up = _data.give_thumbs_up;
        thumbs_up.count = result.dianzanacount;
        if (0 == isdianzan) {
          thumbs_up.image = '../../images/give_thumbs_up_1.png';
        } else {
          thumbs_up.image = '../../images/give_thumbs_up.png';
        }
        updateThumbsUpView(_that, thumbs_up);

      }
    }).catch(err => {
    })
}
/** 更新关注信息view */
function updateAllowView(_that, allowInf) {
  _that.setData({
    allowInf: allowInf,
  })
}
/** 获取公众号关注人数 */
function getOfficialAccNum(_that, userid) {
  let _data = _that.data;
  let data = {
    userid: userid,
  }
  wxapi.getOfficialAccNum(data, 'POST')
    .then(res => {
      if (res.code == 200) {
        
        let result = res.data;
        let allowInf = _data.allowInf;
        allowInf.total = result.total;
        updateAllowView(_that, allowInf)
      }
    }).catch(err => {
    });
}
/** 加载邀请榜 */
function loadInvitationList(_that) {
  let userRankingData = {
    rankingType: 0,
    num: 11,
  }
  wxapi.getUserRankingInf(userRankingData, 'POST')
    .then(res => {
      if (res.code == 200) {
        var result = res.data;
        var tempArr = [];
        for (var i in result) {
          let item = result[i];
          item.nickname = fileterNickName(item.nickname);
          tempArr.push(item);
        }
        _that.setData({
          invitList: result,
        })
      } else {
      }
    }).catch(err => {
    });
}

/**数组根据数组对象中的某个属性值进行排序的方法 
 * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
 * @param attr 排序的属性 如number属性
 * @param rev true表示升序排列，false降序排序
 * */
function sortBy(attr, rev) {
  //第二个参数没有传递 默认升序排列
  if (rev == undefined) {
    rev = 1;
  } else {
    rev = (rev) ? 1 : -1;
  }
  return function(a, b) {
    a = a[attr];
    b = b[attr];
    if (a < b) {
      return rev * -1;
    }
    if (a > b) {
      return rev * 1;
    }
    return 0;
  }
}
/** 退出登陆 */
function cancelLogin(promise) {
  storageUtil.clear();
  // promise.then(function(imResponse) {
  //   console.log(imResponse.data); // 登出成功
  // }).catch(function(imError) {
  //   console.warn('logout error:', imError);
  // });
  wx.redirectTo({
    url: '/pages/authorize/authorize'
  })
}
/** getAccessToken */
function getAccessTokenData(success, fail) {
  let data = {
    grant_type: 'client_credential',
    appid: config.appid,
    secret: config.secret
  }
  wxapi.getAccessToken(data, 'GET')
    .then(res => {
      //console.log(res);
      success(res);
    }).catch(err => {
    });
}
module.exports = {
  commonData: data,
  verifyPhoneNum: verifyPhoneNum,
  verifyLogin: verifyLogin,
  initGiveThumbsUp: initGiveThumbsUp,
  updateOnLineNum: updateOnLineNum,
  loginAuthEvent: loginAuthEvent,
  vlidateMsgTimer: vlidateMsgTimer,
  shareApp: shareApp,
  checkLiveRoomAct: checkLiveRoomAct,
  initCountDown: initCountDown,
  getOnLineNumOfpeople: getOnLineNumOfpeople,
  loadInvitationList: loadInvitationList,
  sortBy: sortBy,
  cancelLogin: cancelLogin,
  getAccessTokenData: getAccessTokenData,
  getOfficialAccNum: getOfficialAccNum,
  updateAllowView: updateAllowView
}