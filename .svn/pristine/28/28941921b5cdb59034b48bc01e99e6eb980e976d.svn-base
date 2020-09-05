// pages/verifyMobile/verify-mobile.js
import config from '../../utils/config.js'
const wxapi = require('../../utils/wxapi.js');
var storageUtil = require('../../utils/storage.js');
var userInfo;
let app = getApp();
import {
  throttle
} from '../../utils/util.js'
var timer = require('../../plugins/wxTimer.js');
var mxTimer; //验证码倒计时
let second = 60;
var userInfo = storageUtil.get('userInfo');
let phoneNum = '';
let _that, _data, userid, navType;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ajxtrue: false,
    blurIdeNum: '',
    wxTimerList: {}, //定时器数组
    identifyValue: '获取验证码',
    enable: false, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    _that = this;
    _data = _that.data;
    userid = options.userid;
    navType = options.navType;
    new app.ToastPannel();
    wx.setNavigationBarTitle({
      title: '商户登陆' //页面标题为路由参数
    })
    wx.setNavigationBarColor({
      frontColor: '#fff',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  // 手机号验证
  blurPhone: function (e) {
    phoneNum = e.detail.value;
    if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
      _that.updateView(false, _data.blurIdeNum, _data.identifyValue, _data.enable);
      if (phoneNum.length >= 11) {
        _that.show('手机号有误');
      }
    } else {
      _that.updateView(true, _data.blurIdeNum, _data.identifyValue, _data.enable);
    }
  },
  //手机验证码
  blurIdentify: function (e) {
    let blurIdeNum = e.detail.value;
    _that.updateView(_data.ajxtrue, blurIdeNum, _data.identifyValue, _data.enable);
  },

  /** 验证码请求 */
  loadIdentifyData: function () {
    if (!_data.ajxtrue) {
      _that.show('手机号错误');
      return;
    }
    if (mxTimer != undefined) {
      mxTimer.stop();
    }
    _that.updateView(_data.ajxtrue, _data.blurIdeNum, _data.identifyValue, true);
    mxTimer = new timer({
      beginTime: '00:01:00',
      name: 'startTimer',
      complete: function () {
        mxTimer.stop();
        second = 60;
        _that.updateView(_data.ajxtrue, _data.blurIdeNum, _data.identifyValue, false);
      }
    });
    let data = {
      phone: phoneNum,
    }
    wxapi.getStoreLoginCode(data, 'POST')
      .then(res => {
        if (res.code == 200) {
          _that.updateView(_data.ajxtrue, _data.blurIdeNum, _data.identifyValue, true);
          mxTimer.start(_that);
        }
        _that.show(res.msg);
      }).catch(err => {
        _that.show('获取验证码失败');
      });
  },
  updateView: function (ajxtrue, blurIdeNum, identifyValue, enable) {
    _that.setData({
      ajxtrue: ajxtrue,
      blurIdeNum: blurIdeNum,
      identifyValue: identifyValue,
      enable: enable
    });
  },
  // 表单提交
  formSubmit(e) {
    let val = e.detail.value;
    let ajxtrue = this.data.ajxtrue;    
    if (_data.blurIdeNum.length == 0) {
      _that.show("验证码不能为空");
      return;
    }
    if (ajxtrue == true) {
      //表单提交进行
      let data = {
        phone: phoneNum,
        code: _data.blurIdeNum
      }
      wxapi.getStoreLogin(data, 'POST')
        .then(res => {
          if (res.code == 200) {
            userInfo.usertype = 3;
            storageUtil.put('userInfo', userInfo, 60 * 60 * 24 * 7); //缓存一天
            storageUtil.put('storeInfo', res.data, 60 * 60 * 24 * 7); //缓存一天
            wx.redirectTo({
              url: '/pages/mercht_landing_details/mercht_landing_details?userid=' + userid + '&navType=' + navType,
            })             
          } else {
            _that.show(res.msg);
          }
        }).catch(err => {
          _that.show('登陆失败');
        });
    } else {
      _that.show('手机号有误');
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (mxTimer != undefined) {
      mxTimer.stop();
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})