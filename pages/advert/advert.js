// pages/advert/advert.js
import config from '../../utils/config.js'
const wxapi = require('../../utils/wxapi.js');
var timer = require('../../plugins/wxTimer.js');
var storageUtil = require('../../utils/storage.js');
import TIM from 'tim-wx-sdk';
import COS from "cos-wx-sdk-v5";
var options = {
  SDKAppID: 1400229935 // 接入时需要将0替换为您的即时通信应用的 SDKAppID  1400252892  
};
let tim = TIM.create(options); // SDK 实例通常用 tim 表示
tim.setLogLevel(0);
tim.registerPlugin({
  'cos-wx-sdk': COS
});
import {
  showToast,
} from '../../utils/util.js'

const app = getApp();
let _that, _data, _global;
// let videoUrl = 'https://1027go-1259506832.cos.ap-chengdu.myqcloud.com/1027laucher.mp4';
let videoContext;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    enable: true,
    wxTimerList: {}, //定时器数组
    hidenVideo: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    _that = this;
    _data = _that.data;
    _global = app.globalData;
    new app.ToastPannel();
    videoContext = wx.createVideoContext('myVideo');
    if (typeof(options.userid) != "undefined") { // 统计邀请榜
      _that.getRecommendCount(options.userid);
    }
    let userInfo = storageUtil.get('userInfo') || {};
    if (JSON.stringify(userInfo) != '{}') {
      _global.openid = userInfo.openid;
      _global.unionid = userInfo.unionid;
      _global.session_key = userInfo.session_key;
      _global.expires_in = userInfo.expires_in;
    }
 
    _global.worker.onMessage(function(res) {
      const pages = getCurrentPages();
      if (this === pages[pages.length - 1]) {
        if (res.type == TIM.EVENT.SDK_READY) {
          _that.show(res.msg);
        } else {
          _that.show(res.msg);
        }      
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    _global.worker.onMessage(function(res) {
      if (res.data.type == TIM.EVENT.SDK_NOT_READY) {
        _global.worker.postMessage({
          type: TIM.EVENT.SDK_NOT_READY,
          msg: '初始化失败, 请重新登陆',
          flag: 0
        });
      } else if (res.data.type == TIM.EVENT.SDK_READY) {
        _global.worker.postMessage({
          type: TIM.EVENT.SDK_READY,
          msg: ''
        });
      } else if (res.data.type == TIM.EVENT.MESSAGE_RECEIVED) {
        _global.worker.postMessage({
          type: TIM.EVENT.MESSAGE_RECEIVED,
          msg: res
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showShareMenu();
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType;
        if (networkType == 'none' || networkType == 'unknown') {
          _that.show('当前无网络或信号差');
          _that.cancelWx();
        }
      }
    })
  },
  bindfullscreenchange:function(){
    _that.updateAdvertView(true);
  },
  /** 播放结束 */
  playBindended: function() {
     _that.updateAdvertView(true);
     _that.landAccount();
  },
  bindprogress:function(e){
  },
  /** 播放错误 */
  playBinderror: function() {
    _that.updateAdvertView(true); 
    _that.landAccount();
  },
  bindtimeupdate: function(e) {
    _that.updateAdvertView(false);
  },
  updateAdvertView: function(hidenVideo) {
    _that.setData({
      hidenVideo: hidenVideo
    })
  },
  launchAppError: function(e) {
    // console.log(e);
  },
  /** 登陆账号 */
  landAccount: function() {
    let userInfo = storageUtil.get('userInfo') || {};
    // console.log(userInfo);
    if (JSON.stringify(userInfo) != '{}') {
      let data = {
        wxid: userInfo.wxid,
      }
      wxapi.checkUserExist(data, 'POST')
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            let result = res.data;
            _that.getLiveRoomList(result, res.code);
          } else {
            storageUtil.clear();
            _that.getLiveRoomList(-1, null);
          }
        }).catch(err => {
          storageUtil.clear();
          _that.getLiveRoomList(-1, null);
        });
    } else {
      storageUtil.clear();
      _that.getLiveRoomList(-1, null);
    }
  },

  /**
   * 获取房间信息
   */
  getLiveRoomList: function(result, code) {
    let data = {
      pageNum: 1, // usertype: 0, //0：普通；1：游客
      pageSize: 10,
    }
    wxapi.getApiLiveRoomInf(data, 'POST')
      .then(res => {
        // console.log(res);
        if (res.code == 200) {
          let obj = res.data;
          // console.log(obj);
          _that.initIM(result, obj[0], code);
        } else {
          _that.cancelWx();
          _that.show(res.msg);
        }
      }).catch(err => {
        _that.cancelWx();
        _that.show("直播间加载失败");
      });
  },
  /** 初始化IM */
  initIM: function(result, obj, code) {
    let roomid = obj.roomid;
    let userid, usersig;
    let str = encodeURIComponent(JSON.stringify(obj));
    if(result == -1){
      storageUtil.clear();
      wx.reLaunch({
        url: '/pages/live-room-chat/index?key=' + str
      });
      return;
    }
      _that.storeUserInfo(result, obj.roomid);
      let userInfo = storageUtil.get('userInfo') || {};
      userid = userInfo.userid;
      usersig = userInfo.userSig;
      let promise = _global.tim.login({
        userID: userid,
        userSig: usersig
      });
      promise.then(function(imResponse) {
        let userSigStr = encodeURIComponent(JSON.stringify(usersig));
        wx.reLaunch({
          url: '/pages/live-room-chat/index?key=' + str + '&userid=' + userid + '&usersig=' + userSigStr
        })
      }).catch(function(imError) {
        // console.warn('login error:', imError); // 登录失败的相关信息
      });
  },
  /** 保存userInfo */
  storeUserInfo: function(result, roomid) {
    let userInf = {
      openid: _global.openid,
      unionid: _global.unionid,
      roomid: roomid,
      session_key: _global.session_key,
      expires_in: _global.expires_in,
      userid: result.userid,
      storeid: result.storeid,
      wxid: result.wxid,
      gender: result.gender,
      phone: result.phone,
      nickname: result.nickname,
      avatarurl: result.avatarurl,
      province: result.province,
      city: result.city,
      country: result.country,
      createtime: result.createtime,
      bondstate: result.bondstate,
      bondamount: result.bondamount,
      userSig: result.userSig,
      usertype: result.usertype,
    };
    storageUtil.put('userInfo', userInf, 60 * 60 * 24 * 7); //存储userInfo   
  },

  /** 推广统计天数 */
  getRecommendCount: function(userid) {
    let _that = this;
    let _data = _that.data;
    let timestamp = (new Date()).valueOf();
    let data = {
      recommender: userid,
      noncestr: timestamp,
    }
    wxapi.getRecCount(data, 'POST')
      .then(res => {
        // showToast('success', res, 1500);
      }).catch(err => {
        // showToast('error', res, 1500);
      });
  },
  cancelWx: function() {
    let _that = this;
    let _data = _that.data;
    _that.setData({
      enable: false
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})