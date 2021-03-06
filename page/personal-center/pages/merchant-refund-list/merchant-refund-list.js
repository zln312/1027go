// page/personal-center/pages/merchant-refund-list/merchant-refund-list.js
// page/personal-center/pages/user-refund-details/user-refund-details.js

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


  //获取退款订单列表
  getRefundList: function(){
    let params = {
      storeId:_data.userInfo.storeid,
      userId:_data.userInfo.userid,
      page:1,
      size:999
    }
    wxapi.getUserRefundList(params,'GET').then(res=>{
      if(res.code===200){
        if(!res.data.resultData){
           return;
        }
        let list = res.data.resultData;
        _that.setData({
          orderList:list
        },function(){
          wx.hideLoading();
        })
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
    // _that.getRefundList();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    _that.getRefundList();

  },
  // 查看详细
  viewDetails(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/page/personal-center/pages/merchant-refund-details/merchant-refund-details`+'?id='+id
    })
  }

})