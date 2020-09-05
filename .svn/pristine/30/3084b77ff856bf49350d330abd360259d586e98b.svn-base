// page/personal-center/pages/merchant-refund-edit/merchant-refund-edit.js
const wxapi = require('../../../../utils/wxapi');

let app = getApp();
let _that, _data, _global;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo')||{},
     detail:{},
     textLength:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _that = this;
    _data = _that.data;
    _global = app.globalData;
    let detail = JSON.parse(decodeURIComponent(options.data));

    _that.setData({
      detail:detail
    })


  },

  bindFormSubmit: function(e){
    var text = e.detail.value.textarea;
   
    if(text.length<5){
      wx.showToast({
        title: '至少输入5个字啦',
        icon:'none'
      })
      return;
    }
    _that.updateRefund(6,text);

  },

  inputBind: function(e){
    let value = e.detail.value;
    var str = value.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, ""); 
   let length =  str.length;
   _that.setData({
    textLength:length,
    textValue:str
  })

  },


  //变更退款状态
  updateRefund: function(status,refuseDetail){
    let params = {
      id : _data.detail.id,
      status:status,
      userId:_data.userInfo.userid,
      refuseDetail:refuseDetail
    }

    wxapi.updateUserAfterSaleStatusUrl(params,'PUT').then(res=>{
      if(res.code===200){
        wx.navigateBack({
         delta:2
        })
      }else{
        wx.showToast({
          title:res.msg,
          icon:"none"
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