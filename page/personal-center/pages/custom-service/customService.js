import * as iconBase64Map from '../../../../utils/imageBase64.js'
import config from '../../../../utils/config.js'
const wxapi = require('../../../../utils/wxapi.js');
import {
  showToast,
  throttle,
  cleanCache
} from '../../../../utils/util.js'
import {
  commonData,
  cancelLogin,
  sortBy
} from '../../../../utils/commonTools.js';
import TIM from 'tim-wx-sdk';
import COS from "cos-wx-sdk-v5";
var storageUtil = require('../../../../utils/storage.js');

let app = getApp();
let _that, _data, _global;
let userid;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: storageUtil.get('userInfo') || {},
    accountInf:{},
    hotService:'188-8500-8184',
    customWx:'zhibogo003',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _that = this;
    _data = _that.data;
   userid = options.userid;
   _global = app.globalData;
   new app.ToastPannel();

   wx.setNavigationBarTitle({
     title: '联系客服'//页面标题为路由参数
   })
   wx.setNavigationBarColor({
     frontColor: '#fff',
   })   
   _that.setData({
     userInfo: wx.getStorageSync('userInfo') || {},
   }) 
  },

  callCustom: function(e){

  console.log(e);
  console.log("打电话啊");
    wx.showModal({
      content: '188-8500-8184',
      confirmText:'呼叫',
      success(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '188-8500-8184',
          })
          console.log('用户点击确定')
        }}
  
  })
  },

  copyWx: function(){
    wx.setClipboardData({
      
      data:_data.customWx, 
      success:()=> {
        wx.showToast({
          title:'客服微信已复制',
          icon:'none'
        })

      }
  
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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