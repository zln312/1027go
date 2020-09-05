// page/personal-center/pages/my-order/my-order.js
const wxapi = require('../../../../utils/wxapi');

let app = getApp();
let _that, _data, _global;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo')||{},
    orderList:[]
  },

  //获取商户订单列表
  getOrderList: function(){
    let params = {
      storeId:_data.userInfo.storeid,
      userId:_data.userInfo.userid,
      page:1,
      size:999
    }
    wxapi.getUserStoreOrderList(params,'GET').then(res=>{
      if(res.code===200){
      
        if(res.data){
          _that.setData({
            orderList:res.data.resultData
          })
        }else{
          _that.setData({
            orderList:[]
          }) 
        }
        
      }else{
        // console.log(res);
      }
    })
  },

  //确认发货
  viewDetails: function(e){
    let oid = e.currentTarget.dataset.oid;

    let params = {
      orderId:oid,
      status:5
    };
    wxapi.storeUpdateOrderStatus(params,'PUT').then(res=>{
      if(res.code===200){
        _that.getOrderList();
      }else{
        // console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _that = this;
    _data = _that.data;
    _global = app.globalData;

    _that.getOrderList();
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