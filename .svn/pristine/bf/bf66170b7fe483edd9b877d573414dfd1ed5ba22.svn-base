// pages/optSelection/opt.js
var storageUtil = require('../../utils/storage.js');
const wxapi = require('../../utils/wxapi.js');
import config from '../../utils/config.js'
var storageUtil = require('../../utils/storage.js');
let app = getApp();
let _that, _data;
let userid, navType;
let userInfo, storeInfo;

import {
  fileterNickName,
  js_date_time
} from '../../utils/util.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    _that = this;
    _data = _that.data;
    userInfo = storageUtil.get('userInfo') || {};
    storeInfo = storageUtil.get('storeInfo') || {};
    userid = options.userid;
    navType = options.navType;
    new app.ToastPannel();
    wx.setNavigationBarTitle({
      title: '订单核销' //页面标题为路由参数
    })
    wx.setNavigationBarColor({
      frontColor: '#fff',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    _that.getTenantInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  /** 获取商户信息 */
  getTenantInfo: function() {
    let params = {
      storeid: storeInfo.storeid
    }
    wxapi.getStoreInfo(params, 'POST')
      .then(res => {
        if (res.code == 200) {
          storageUtil.put('storeInfo', res.data, 60 * 60 * 24 * 7); //缓存一天
        } else {
          _that.onShow(res.msg);
        }
      }).catch(err => {
        console.log('获取商户信息失败');
      });
  },

  skillOrderTap: function() {
    _that.scanResult(0);

  },
  collageOrderTap: function() {
    that.scanResult(1);
  },
  optOrderTap: function() {
    // that.scanResult(2);
    _that.show('暂未开放，敬请期待');
  },
  /** 扫码结果 */
  scanResult: function(type) {
    wx.scanCode({
      success: (res) => {
        console.log("扫码类型：" + type + ":结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path);
        if (type == 0) {
          _that.getSkillOrderResult(res.result);
        } else if (type == 1) {
          _that.getcollageOrderResult(res.result);
        } else if (type == 2) {
          _that.getOptOrderResult(res.result);
        }
      },
      fail: (res) => {
        _that.show('扫码失败，请稍后尝试');
      },
      complete: (res) => {}
    })
  },
  getSkillOrderResult: function(orderId) {
    wx.showLoading({
      title: '加载中...',
    })
    let params = {
      orderid: orderId,
      authcode: storeInfo.authcode
    }
    wxapi.setGoodskillConsumed(params, 'POST')
      .then(res => {
        _that.show(res.msg);
        if (res.code == 200) { 
          wx.navigateBack({
            delta: 1
          })
        } 
      }).catch(err => {
        _that.show('核销失败，请稍后尝试');
      });
  },
  getcollageOrderResult: function(orderId) {
    wx.showLoading({
      title: '加载中...',
    })
    let params = {
      consumeid: orderId,
      authcode: storeInfo.authcode
    }
    wxapi.setCollageConsumed(params, 'POST')
      .then(res => {
        _that.onShow(res.msg);
        if (res.code == 200) {
          wx.navigateBack({
            delta: 1
          })
        } 
      }).catch(err => {
        _that.show('核销失败，请稍后尝试');
      });
  },
  getOptOrderResult: function(orderId) {
   
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

  }
})