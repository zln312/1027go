/** 拼团购 */
import {
  showToast,
} from '../utils/util.js'
import {
  initCountDown,
} from '../utils/commonTools.js';
const wxapi = require('../utils/wxapi.js');
var storageUtil = require('../utils/storage.js');
var timer = require('../plugins/wxTimer.js');
var userInfo;
let clgStartTimer, clgEndTimer;
var _context;
let _tim; // SDK 实例通常用 tim 表示
let isOptStart = false, isCollageEnd= false;
let collageid;
let collagePeopleList = [],
  collageStateList = [],
  discountList = [];
const data = {

}

function initCollage(_that, tim, obj, systime) {
  _context = _that;
  _tim = tim;
  collagePeopleList = [];
  collageStateList = [];
  discountList = [];
  isCollageEnd = false;
  isOptStart = false;
  console.log('初始化拼团');
  console.log(obj);
  userInfo = storageUtil.get('userInfo') || {};
  getCollageDetail(obj, systime);
}
/** 获取拼团详情 */
function getCollageDetail(obj, systime) {
  let params = {
    userid: userInfo.userid,
    collageid: obj.collageid,
  }
  wxapi.getGoodsCollageInfo(params, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        console.log(result);
        if (result.state == 2){
          return;
        }
        collageid = result.collageid;
          _context.setData({
            collageData: result,
            isStartCollage: true
          });
          initCollageData(result);
        initStartTiming(result, systime);
      } else {
        _that.show(res.msg);
      }
    }).catch(err => {
      console.log('获取拼团购信息失败');
    });
}
/** 初始化拼团购内容 */
function initCollageData(result) {
  let tariffList = result.pricelist;
  let collageStateList = [];
  let groupsTotal = result.total;
  // let groupsTotal = 900;
  let selectIndex = filterCollageData(tariffList, groupsTotal);
  for (let i = 0; i < tariffList.length; i++) {
    let item = tariffList[i];
    let collageItem = {};
    if (i == selectIndex) {
      item.status = true;
      collageItem.status = true;
      collageItem.count = groupsTotal;
    } else {
      item.status = false;
      collageItem.status = false;
      collageItem.count = '';
    }
    collageStateList.push(collageItem);
  }

  _context.setData({
    tariffList: tariffList,
    collageStateList: collageStateList
  });
}

function filterCollageData(tariffList, groupsTotal) {
  let index = 0;
  let length = tariffList.length;
  groupsTotal = parseInt(groupsTotal);
  if (groupsTotal == 0 || groupsTotal <= tariffList[0].number) {
    return index;
  }
  for (let i = 0; i < tariffList.length; i++) {
  
    if (i < length - 1) {
      if (groupsTotal > tariffList[i].number && groupsTotal <= tariffList[i + 1].number) {
        index = i+1;
        break;
     }
    }else{
      index = length - 1;
    } 
   
    // if(i == length -2) {
    //   index = length - 1;
    //   break;
    // }
  }
  console.log('item->' + index);
  return index;
}

/** 初始化开始计时定时器 */
function initStartTiming(obj, systime) {
  let startT = obj.starttime;
  //let timestamp = (new Date()).valueOf();
  let startTimer = initCountDown(systime, startT);
  console.log('startTimer->' + startTimer);
  if (clgStartTimer != undefined) {
    clgStartTimer.stop();
  }    
  if (startTimer == 20001) { //已经开始《结束计时》
    //let timestamp = (new Date()).valueOf();
    let subValue = Math.floor(systime - obj.starttime);
    updateCollageView(false);
    if (subValue / 1000 <= obj.seconds) {
      isOptStart = true;
      let surplus = obj.seconds - subValue / 1000;
      let endTimer = initCountDown(systime, systime + surplus * 1000);
      initEndTiming(endTimer);
    } else { // 结束计时 已经完成
      initEndTiming(20001);
    }
  } else {
    clgStartTimer = new timer({
      beginTime: startTimer,
      name: 'clgSTimer',
      complete: function() {
        clgStartTimer.stop();
      //  let timestamp = (new Date()).valueOf();
        let endTimer = initCountDown(systime, systime + obj.seconds * 1000);
        console.log('endTimer->' + endTimer + ":seconds->" + obj.seconds);
        isOptStart = true;
        updateCollageView(false);
        initEndTiming(endTimer);
      }
    });
    clgStartTimer.start(_context);
  }
}

/** 结束计时 */
function initEndTiming(endTimer) {
  console.log('collageendTimer->' + endTimer);
  if (endTimer == 20001) {
    endTimer = '00:00:00';
  }
  if (clgEndTimer != undefined) {
    clgEndTimer.stop();
  }  
  clgEndTimer = new timer({
    beginTime: endTimer,
    name: 'clgEndTimer',
    complete: function() {
      clgEndTimer.stop();
      isCollageEnd = true;
      collageEndDialog('拼团结束，谢谢您的再次参与！');
    },
    interval: 2,
    intervalFn: function() {
      updateOnlineCollage();
    }
  });
  clgEndTimer.start(_context);
}

/** 更新在线拼团数据 */
function updateOnlineCollage() {
  let params = {
    userid: userInfo.userid,
    collageid: collageid,
  }
  wxapi.getGoodsCollageInfo(params, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        _context.setData({
          collageData: result,
        });
        initCollageData(result);
      }
    }).catch(err => {
      console.log('获取拼团购信息失败');
    });
}
/** 更新view */
function updateCollageView(isStartCollage) {
  _context.setData({
    isStartCollage: isStartCollage,
  });
}
/** 我要参团 */
function joinCollage(collageid, dlgValue, _that) {
  if (isOptStart == false) {
    _context.show('活动未开始');
    return;
  }
  if (isCollageEnd) {
    _context.show('活动已结束');
    return;
  }
  let params = {
    userid: userInfo.userid,
    collageid: collageid,
    openid: userInfo.openid,
    number: dlgValue
  }
  wxapi.joinCollage(params, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        let payMessage = JSON.parse(result.payMessage);
        requestPay(payMessage, _that);
      } else {
        _context.show(res.msg);
      }
    }).catch(err => {
      console.log('获取拼团购信息失败');
    });
}

/** 执行微信支付 */
function requestPay(payMessage, _that) {
  updateCollagePayView(_that, true);
  wx.requestPayment({
    'timeStamp': payMessage.timeStamp,
    'nonceStr': payMessage.nonceStr,
    'package': payMessage.package,
    'signType': payMessage.signType,
    'paySign': payMessage.paySign,
    'success': function(res) {
      var result = res.data;
      console.log(res);
      showToast('success', '支付成功', 1500);
      updateCollagePayView(_that, false);
    },
    'fail': function(res) {
      showToast('error', '支付失败', 1500);
      updateCollagePayView(_that, false);
    },
    'complete': function(res) {}
  })
}

function updateCollagePayView(_that, isPay){
  _that.setData({
    isCollagePay:isPay
  })
}

/**拼团结束对话框 */
function collageEndDialog(message){
  wx.showModal({
    title: '提示框',
    content: message,
    confirmText: "查看",
    cancelText: "取消",
    success: function (res) {
      if (res.confirm) {
        let userid = userInfo.userid;
        wx.navigateTo({
          url: '/pages/collageShopping/collageShoppingList?userid=' + userid,
        })
      } else {
        console.log('用户点击辅助操作')
      }
    }
  });
}
/** 拼团列表 */
function collageListTap(index){
  let userid = userInfo.userid;
  wx.navigateTo({
    url: '/pages/collageList/collageList?userid=' + userid + '&collageid=' + collageid,
  })
}
function clearCollageTimeInterval(){
  if (clgStartTimer != undefined) {
    clgStartTimer.stop();
  }
  if (clgEndTimer != undefined) {
    clgEndTimer.stop();
  }
}
module.exports = {
  collageData: data,
  initCollage: initCollage,
  joinCollage: joinCollage,
  collageListTap: collageListTap,
  clearCollageTimeInterval:clearCollageTimeInterval
}