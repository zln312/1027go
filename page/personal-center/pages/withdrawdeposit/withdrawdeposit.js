import config from '../../../../utils/config.js'
const wxapi = require('../../../../utils/wxapi.js');
var storageUtil = require('../../../../utils/storage.js');
import {
  number_format
} from '../../../../utils/util.js';
let userInfo;
let app = getApp();
let _that, _data,blance;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: '到账微信', value: '0', checked: true},
      // { name: '到账银行卡', value: '1', checked: false }
    ],
    walletData:{},
    isCard:false,
    isCardHiden:true,
    inputValue: '',
    focusFlag: true, //控制输入框失去焦点与否
    disabled:true,
    blanceTotal:0,
    tip:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     _that = this;
     _data = _that.data;
     
    
     
    new app.ToastPannel();
    userInfo = storageUtil.get('userInfo') || {};
    let walletData =  decodeURIComponent(options.wallet); //直播间信息 
    wx.setNavigationBarTitle({
      title: '提现' //页面标题为路由参数
    })
    wx.setNavigationBarColor({
      frontColor: '#fff',
    })
    _that.setData({
      blanceTotal: options.blance
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
  radioChange: function (e) {
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    let isCardHiden = true;
    if (0 == e.detail.value){
      isCardHiden = true;
    }else{
      isCardHiden = false;
    }
    this.setData({
      radioItems: radioItems,
      isCardHiden: isCardHiden
    });
  },

  withdrawDeptTap:function(){
    this.setData({
      inputValue: _data.blanceTotal,
      disabled:false
    })
  },
  inputChange(e) {
    let value = e.detail.value;
    var tip = 0;
    let total = _data.blanceTotal;
    if (Number(value) > Number(total) ){
       tip=1;
    }
    
    let disabled = _data.disabled;
    if(value.length >0){
      disabled = false;
    }else{
      disabled = true;
    }
    this.setData({
      tip: tip,
      disabled: disabled,
    inputValue: value,

    })
  },
  /** 提现 */
  submitTap:function(){
    let value = _data.inputValue;
    let _global = app.globalData;
    let totalamount =  _data.blanceTotal;
    if (Number(value) < 50){
      wx.showToast({
        title: '最低提现金额50元',
        icon:'none'
      })
      return;
    } else if (Number(value) > Number(totalamount)){
      wx.showToast({
        title: '超出本次可提现金额',
        icon:'none'
      })
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    let data = {
      userid: userInfo.userid,
      amount: value,
      openid: _global.openid
    }
    wxapi.getWithdrawDeposit(data, 'POST')
      .then(res => {
        if(res.code == 200){
          _that.show(res.msg);
          let bondamount = Math.abs(totalamount - value);
          userInfo.bondamount = number_format(bondamount,2);
          storageUtil.put('userInfo', userInfo, 60 * 60 * 24*7);
        
          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
              success: function () {
              }
            })
          }, 2000)
        
        }else{
          wx.showToast({
            title: '提现失败，请稍后尝试',
            icon:'none'
          })
        }
      
      }).catch(err => {
        _that.show('提现失败，请稍后尝试');
      });
  },
  /**
     * 获取焦点
     */
  inputFocus(e) {
    this.setData({
      focusFlag: true,
    })
  },
  /**
   * 失去焦点
   */
  inputBlur() {
    this.setData({
      focusFlag: false,
    })
  },
  /**
     * 发送文本
     */
  inputSend(e) {
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