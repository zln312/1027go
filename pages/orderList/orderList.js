// pages/optSelection/opt.js
var storageUtil = require('../../utils/storage.js');
const wxapi = require('../../utils/wxapi.js');
import config from '../../utils/config.js'
import {
  js_date_time
} from '../../utils/util.js'
let app = getApp();
let _that, _data, userid;
var userInfo;
var pageNum = 1;
var pageSize = 10;
var isLoading = -1;

let index;
let nomore = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultLogo: app.globalData.PAGE_CONFIG.defaultLogo,
    refreshing: false,
    detailsList: [],
    isHideLoadMore: true,
    defaultUserLogo: app.globalData.PAGE_CONFIG.defaultUserLogo,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _that = this;
    _data = _that.data;
    userInfo = storageUtil.get('userInfo');
    new app.ToastPannel();
    userid = options.userid;
    wx.setNavigationBarTitle({
      title: '我的订单'//页面标题为路由参数
    })
    wx.setNavigationBarColor({
      frontColor: '#fff',
    })   
  },
  /**
    * 生命周期函数--监听页面初次渲染完成
    */
  onReady: function () {
    _that.onPullDownRefresh();
  },

  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {

  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    _that.updateDataView([], true);
    pageNum = 1;
    isLoading = 0;
    _that.loadOptimalData(1, 10);
  },

  //加载更多
  onReachBottom: function () {
    isLoading = 1;
    if (nomore) {
      _that.updateDataView(_data.detailsList, false);
      _that.loadOptimalData(pageNum, pageSize);
    }
  },

  loadOptimalData: function (pageNum, pageSize) {
    let userid = userInfo.userid;
    let data = {
      userid: userid,
      pageNum: pageNum,
      pageSize: pageSize,
    }
    wxapi.getCollageList(data, 'POST')
      .then(res => {
        let result = res.data;
        if (res.code == 200) {
          switch (isLoading) {
            case 0:
              _that.setListData(true, result.resultData);
              break
            case 1:
              _that.setListData(false, result.resultData);
              break;
          }
        } else {
          _that.errorHandler(isLoading);
          _that.show(res.msg);
        }
      }).catch(err => {
        _that.errorHandler(isLoading);
      });
  },
  errorHandler: function (isLoading) {
    switch (isLoading) {
      case 0:
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        break
      case 1:
        let mList = _data.detailsList;
        _that.updateDataView(mList, true);
        break;
    }
  },
  setListData: function (refreshing, result) {
    let tempArr = [];
    for (var i = 0; i < result.length; i++) {
      let elem = result[i];
      elem.periods = js_date_time(elem.endtime / 1000);
      tempArr.push(elem);
    }
    pageNum += 1;
    if (refreshing) {
      setTimeout(function () {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        _that.updateDataView(tempArr, true);
      }, 1000);
    } else {
      let temp = _data.detailsList;
      temp = temp.concat(tempArr);
      if (result.length < 10) {
        _that.show('没有更多数据');
        nomore = false;
      }
      setTimeout(() => {
        _that.updateDataView(temp, true);
      }, 1000);
    }
  },

  updateDataView: function (mList, isHideMore) {
    _that.setData({
      detailsList: mList,
      isHideLoadMore: isHideMore
    });
  },

  collageShoppingTap: function (e) {
    let index = e.target.dataset.index;
    let mList = _data.detailsList;
    let item = mList[index];
    if (item.state == 2) {
      _that.show('该期团购商品已过期');
      return;
    }
    let str = encodeURIComponent(JSON.stringify(item));
    wx.navigateTo({
      url: '/pages/collageShoppingDetail/collageShoppingDetail?obj=' + str
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