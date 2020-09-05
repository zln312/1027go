var storageUtil = require('../../utils/storage.js');
const wxapi = require('../../utils/wxapi.js');
import drawQrcode from '../../utils/weapp.qrcode.js'
import config from '../../utils/config.js'
import {
  calcTimeHeader,
  living_date_time,
  fileterNickName,
} from '../../utils/util.js'
var userInfo = storageUtil.get('userInfo');
let _that, _data, userid;
let app = getApp();
let item;
let id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultLogo: app.globalData.PAGE_CONFIG.defaultLogo,
    item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _that = this;
    _data = _that.data;
    item =  decodeURIComponent(options.obj); //直播间信息 
    console.log(item);
    id = options.id;
    userid = options.userid;
    userInfo = storageUtil.get('userInfo');
    new app.ToastPannel();
    wx.setNavigationBarTitle({
      title: '中奖详情'//页面标题为路由参数
    });
    wx.setNavigationBarColor({
      frontColor: '#fff',
    });
    _that.updateView(item);  
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
    _that.draw();
  },
  updateView: function (item) {
    _that.setData({
      item: item,
      id:id,
    })
  },

  draw() {
    drawQrcode({
      width: 160,
      height: 160,
      x: 0,
      y: 0,
      canvasId: 'myQrcode',
      typeNumber: 10,
      text: id,
      callback(e) {
        console.log('e: ', e)
      }
    })
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