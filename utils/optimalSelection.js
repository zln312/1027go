/** 乐优选 */
import {
  initCountDown,
  cancelLogin
} from '../utils/commonTools.js';
const wxapi = require('../utils/wxapi.js');
var storageUtil = require('../utils/storage.js');
var timer = require('../plugins/wxTimer.js');
var userInfo;
let optStartTimer, optEndTimer;
var _this;
let questionid;
let _tim; // SDK 实例通常用 tim 表示
let isOptStart = false, isOptEnd = false;
const data = {

}
/** 初始化优乐选 */
function initOpt(_that, tim, obj, systime) {
  _this = _that;
  _tim = tim;
  userInfo = storageUtil.get('userInfo') || {};
  isOptStart = false;
  isOptEnd = false;
  questionid = obj.questionid;
  console.log('初始化优乐选');
  console.log(obj);
  updatingEffects(-1);
  loadOptimalData(_that, obj, systime);

}
/** 加载答题信息 */
function loadOptimalData(_that, obj, systime) {
  let params = {
    userid: userInfo.userid,
    questionid: questionid,
  }
  wxapi.getOptimalInfo(params, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        console.log(result);
        if (result.state == 2) return; //updatingEffects
        if (result.myanswer =='A'){
          updatingEffects(0);
        } else if (result.myanswer == 'B'){
          updatingEffects(1);
        } else if (result.myanswer == 'C') {
          updatingEffects(2);
        } else if (result.myanswer == 'D') {
          updatingEffects(3);
        }
        console.log('myanswer->' + result.myanswer);
        updateOptView(false, true, result);
        initOptTimer(_that, result, systime);
      } else {
        _that.show(res.msg);
      }
    }).catch(err => {
      console.log('获取乐优选信息失败');
    });
}
/** 答题对话框 */
function answerDialog(titleStr, questionid) {
  wx.showModal({
    title: '题目',
    content: titleStr,
    confirmText: "开始答题",
    cancelText: "取消",
    success: function (res) {
      console.log(res);
      if (res.confirm) {
        startAnsOptimal(questionid);
      } else {
        console.log('用户点击辅助操作')
      }
    }
  });
}
/** 开始答题 */
function startAnsOptimal( questionid) {
  let params = {
    userid: userInfo.userid,
    questionid: questionid,
  }
  wxapi.startAnsOptimal(params, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        console.log(result);
      } else {
        _this.show(res.msg);
      }
    }).catch(err => {
      if(res.code !=401){
        _this.show(res.msg); 
      }
      // if (res.code == 403) {
      //   let promise = _tim.logout();
      //   cancelLogin(promise);
      // }
    });
}

/** 初始化定时器 */
function initOptTimer(_that, obj, systime) {
  let startTimer = obj.starttime;
// let timestamp = (new Date()).valueOf();
  let statTimer = initCountDown(systime, startTimer);
  let usedTime = Math.floor(startTimer - systime); //两个时间戳相差的毫秒数
  console.log('start->' + startTimer + ":timestamp:" + systime + ":差值->" + usedTime);
  ansOptStartTimer(statTimer, obj, systime);

}
/** 答题开始计时 */
function ansOptStartTimer(startTimer, obj, systime) {
  console.log('lyxstartTimer->' + startTimer);
  if (optStartTimer != undefined) {
    optStartTimer.stop();
  }     
  if (startTimer == 20001) {
  //  let timestamp = (new Date()).valueOf();
    let subValue = Math.floor(systime - obj.starttime);
    updateOptView(false, false, obj);
    if (subValue / 1000 <= obj.seconds) {
      let surplus = obj.seconds - subValue / 1000;
      let endTimer = initCountDown(systime, systime + surplus * 1000);
      isOptStart = true;
      ansOptEndTiming(endTimer);
    } else {
      ansOptEndTiming(20001);
    }
  } else {
    optStartTimer = new timer({
      beginTime: startTimer,
      name: 'optSTimer',
      complete: function() {
        optStartTimer.stop();
      //  let timestamp = (new Date()).valueOf();
        let endTimer = initCountDown(systime, systime + obj.seconds * 1000);
        isOptStart = true;
        ansOptEndTiming(endTimer);
        updateOptView(false, false, obj);
      }
    });
    optStartTimer.start(_this);
  }
}
/** 答题结束计时 */
function ansOptEndTiming(endTimer, obj){
  console.log('endTimer->' + endTimer);
  if (endTimer == 20001) {
    endTimer = '00:00:00';
    isOptEnd =  false;
    updateOptView(true, false, {});
  }
  if (optEndTimer != undefined) {
    optEndTimer.stop();
  }   
  optEndTimer = new timer({
    beginTime: endTimer,
    name: 'optEndTimer',
    complete: function () {
      optEndTimer.stop();
      isOptEnd = true;
    }
  });
  optEndTimer.start(_this);  
}
function updateOptView(isOpt, isOptTimer, result){
  _this.setData({
    isOpt: isOpt,
    isOptTimer: isOptTimer,
    optData: result,
  });
}
/** 乐优选点击事件 */
function ansJoinOptTap( index){
  if (isOptStart == false){
    _this.show('答题暂未开始');
    return;
  }

  let optData = _this.data.optData;
  let questionid = optData.questionid;
  console.log('myanswer->' + optData.myanswer + ':index->' + index);
  if (index == 0) {
    if (optData.myanswer == 'A') {
      return;
    }
   // joinAnsOptimal(questionid, 'A', index);
    if(optData.myanswer != ''){
      cancelJoinAnsOPtimal(questionid, optData.myanswer, 'A', -1, index);
    }else{
      joinAnsOptimal(questionid, 'A', index);
    }
  } else if (index == 1) {
    if (optData.myanswer == 'B') {
      return;
    }
    //joinAnsOptimal(questionid, 'B', index);
    if (optData.myanswer != '') {
      cancelJoinAnsOPtimal(questionid, optData.myanswer,'B', -1, index);
    } else {
      joinAnsOptimal(questionid, 'B', index);
    }
  } else if (index == 2) {
    if (optData.myanswer == 'C') {
      return;
    }
    //joinAnsOptimal(questionid, 'C', index);
    if (optData.myanswer != '') {
      cancelJoinAnsOPtimal(questionid, optData.myanswer,'C', -1, index);
    } else {
      joinAnsOptimal(questionid, 'C', index);
    }
  } else if (index == 3) {
    if (optData.myanswer == 'D') {
      return;
    }
    //joinAnsOptimal(questionid, 'D', index);
    if (optData.myanswer != '') {
      cancelJoinAnsOPtimal(questionid, optData.myanswer,'D', -1, index);
    } else {
      joinAnsOptimal(questionid, 'D', index);
    }
  }
}
function ansMoreOptTap(answer, index) {
  if (isOptStart == false) {
    _this.show('答题暂未开始');
    return;
  }
  let optData = _this.data.optData;
  let title;
  if (index == 0) {
    title = '选项A'
  } else if (index == 1) {
    title = '选项B'
  } else if (index == 2) {
    title = '选项C'
  } else if (index == 3) {
    title = '选项D'
  }
  wx.navigateTo({
    url: '/pages/optSelection/optimal-select-list?answer=' + answer
      + '&deliveryaddress=' + optData.deliveryaddress
      + '&index=' + index
      + '&questionid=' + optData.questionid
      + '&userid=' + userInfo.userid + '&title=' + title,
  })
}
/** 取消答题 */
function cancelJoinAnsOPtimal(questionid, answer, pitchOn, index, pitchOnIndex) {
  let params = {
    userid: userInfo.userid,
    questionid: questionid,
    answer: answer
  }
  // wx.showLoading({
  //   title: '加载中...',
  // })
  let optData = _this.data.optData;
  wxapi.cancelJoinAnswerOpt(params, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        optData.myanswer = '';
        _this.setData({  
          optData: optData,
        });
        updatingEffects(index);
        joinAnsOptimal(questionid, pitchOn, pitchOnIndex);
      }
      if (isOptEnd) {
        _this.show(res.msg);
      }
    }).catch(err => {
      console.log('取消答题失败');
    });
}
/** 参与答题*/
function joinAnsOptimal(questionid, answer, index) {
  let params = {
    userid: userInfo.userid,
    questionid: questionid,
    answer: answer
  }
  wx.showLoading({
    title: '加载中...',
  })
  let optData = _this.data.optData;
  wxapi.joinAnswerOpt(params, 'POST')
    .then(res => {
      if (res.code == 200) {
      //  let result = res.data;
        optData.myanswer = answer;
        _this.setData({
          optData: optData,
        });
        updatingEffects(index);
      }
      _this.show(res.msg);
    }).catch(err => {
      console.log('参与答题失败');
    });
}
/** 更新答题效果 */
function updatingEffects(index){
  let optDataBg = _this.data.optDataBg;
  for (var i in optDataBg) {
    if (i == index) {
      optDataBg[index] = '#FF8F00';
    } else {
      optDataBg[i] = '#1e313e';
    }
  }
  _this.setData({
    optDataBg: optDataBg
  });
} 
/**获取乐优选活动答题结果列表 */
function ansResultsList(_that, pageNum, pageSize, answer) {
  let params = {
    userid: userInfo.userid,
    questionid: questionid,
    pageNum: pageNum,
    pageSize: pageSize,
    answer: answer
  }
  wxapi.getAnsResults(params, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        console.log(result);
      } else {
        _that.show(res.msg);
      }
    }).catch(err => {
      console.log('参与答题失败');
    });
}
function clearOptTimeInterval(){
  if (optStartTimer != undefined) {
    optStartTimer.stop();
  }
  if (optEndTimer != undefined) {
    optEndTimer.stop();
  }
}
/**
  * 更新乐优选信息
  */
function updateOptInfo(_that, obj) {
  let _data = _that.data;
  let answer = obj.answer;
  let optData = _data.optData;
  if (answer == 'A') {
    optData.answerACount = obj.answercount;
  } else if (answer == 'B') {
    optData.answerBCount = obj.answercount;
  } else if (answer == 'C') {
    optData.answerCCount = obj.answercount;
  } else if (answer == 'D') {
    optData.answerDCount = obj.answercount;
  }
  _this.setData({
    optData: optData
  })
}
module.exports = {
  optData: data,
  initOpt: initOpt,
  loadOptimalData: loadOptimalData,
  startAnsOptimal: startAnsOptimal,
  clearOptTimeInterval: clearOptTimeInterval,
  ansJoinOptTap: ansJoinOptTap,
  ansMoreOptTap: ansMoreOptTap,
  updateOptInfo: updateOptInfo
}