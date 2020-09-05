// pages/red_paper/index.js
import config from '../../utils/config.js'
const wxapi = require('../../utils/wxapi.js');

let app = getApp()
let _that, _data;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputAmountValue:'',
    inputNumValue:'',
    inputTextValue: "恭喜发财，大吉大利",
    amount:'',
    onLineNum:0,
    enable:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    _that = this;
    _data = _that.data;
    let userid = options.userid;
    let roomid = options.roomid;  
    let data = {
      userid: userid,
      roomid: roomid,
    }
    wxapi.getOnLineNumInf(data, 'POST')
      .then(res => {
        let result = res.data;
        if(res.code == 200){
          _that.updateView(result.onLine, _data.inputAmountValue, _data.amount, _data.inputNumValue, _data.inputTextValue);
        }else{
          showToast('text', res.msg, 1500);
        }
      }).catch(err => {
      });
  },

  /**
     * 金额输入事件
     */
  inputAmountChange(e) {
    let _that = this;
    let _data = _that.data;
    let total = e.detail.value;
    let red_pecket_num = _data.inputNumValue;
    if(total!=''&&red_pecket_num!=''){
      _that.setData({
        enable:false
      })
    }
    _that.updateView(_data.onLineNum, total, total, _data.inputNumValue, _data.inputTextValue);
  },

  /**
   * 红包个数输入事件
   */
  inputNumChange(e) {
    let _that = this;
    let _data = _that.data;
    let total = _data.inputAmountValue;
    let red_pecket_num = e.detail.value;
    if (total != '' && red_pecket_num != '') {
      _that.setData({
        enable: false
      })
    }
    _that.updateView(_data.onLineNum, _data.inputAmountValue, _data.amount, red_pecket_num, _data.inputTextValue);
  },

  /** 祝福语/留言 */
  inputwordsChange(e){
    let _that = this;
    let _data = _that.data;
    let red_pecket_num = e.detail.value;
    _that.updateView(_data.onLineNum, _data.inputAmountValue, _data.amount, _data.inputNumValue, red_pecket_num);
  },
  updateView: function (onLineNum, amountValue, amount, iptValue, inputTxValue) {
    _that.setData({
      onLineNum: onLineNum,
      inputAmountValue: amountValue,
      amount: amount,
      inputNumValue: iptValue,
      inputTextValue: inputTxValue
    })
  },  
  amountBtn:function(){
    var _that = this;
    var _data = _that.data;
   
    if (_data.inputAmountValue == ''){
      _that.openToast("请输入红包金额");
      return;
    }
    if (_data.inputNumValue == '') {
      _that.openToast("请输入红包个数");
      return;
    }
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];  
    prevPage.setData({//直接给上移页面赋值
      redAmount: _data.inputAmountValue,
      redNumPeople: _data.inputNumValue,
      redLabel: _data.inputTextValue
    });
    wx.navigateBack({
      delta: 1,
      success: function () {
        prevPage.sendRedBag(); 
      }
    })
  },
  openToast: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 1000
    });
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