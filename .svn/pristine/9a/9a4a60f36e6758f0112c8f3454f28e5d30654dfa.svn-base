// pages/opt_winning/opt_winning.js
var storageUtil = require('../../utils/storage.js');
const wxapi = require('../../utils/wxapi.js');
import {
  calcTimeHeader,
  js_date_time,
  living_date_time
} from '../../utils/util.js'
let app = getApp();
var userInfo;
var pageNum = 1;
var pageSize = 10;
var isLoading = -1;
let _that, _data, userid;
let index;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refreshing: false,
    nomore: true,
    detailsList: [],
    isHideLoadMore: true,
    defaultUserLogo: app.globalData.PAGE_CONFIG.defaultUserLogo,
    deafultScanHttp:'https://1027go-1259506832.cos.ap-chengdu.myqcloud.com/wx1027.jpg'
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '乐优选-中奖列表'//页面标题为路由参数
    })
    wx.setNavigationBarColor({
      frontColor: '#fff',
    }) 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    _that.onPullDownRefresh();
  },
  listTapClick: function (e) {
    let index = e.currentTarget.dataset.index;
    let item = _data.detailsList[index];
    let obj = encodeURIComponent(JSON.stringify(item));
    wx.navigateTo({
      url: '/pages/opt_winning_detail/opt_winning_detail?obj=' + obj + '&userid=' + userid
    })
  },    
  //下拉刷新
  onPullDownRefresh: function () {
    console.log('下拉刷新')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    _that.updateListView(_data.isHideLoadMore, [], _data.nomore);    
    pageNum = 1;
    isLoading = 0;
    _that.loadOptimalData(1, 10);
  },
  //加载更多
  onReachBottom: function () {
    console.log('加载更多')
    isLoading = 1;
    if(_data.nomore){
      _that.updateListView(false, _data.detailsList, _data.nomore);   
      _that.loadOptimalData(pageNum, pageSize);
      setTimeout(() => {
        _that.updateListView(true, _data.detailsList, _data.nomore);   
      }, 1000)
    }
  },

  loadOptimalData: function (pageNum, pageSize) {
    let userid = userInfo.userid;
    let data = {
      userid: userid,
      pageNum: pageNum,
      pageSize: pageSize,
    }
    wxapi.getQuestionWinner(data, 'POST')
      .then(res => {
        let result = res.data;
        console.log(res);
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
        _that.updateListView(true, _data.detailsList, _data.nomore); 
        break;
    }
  },
  setListData: function (refreshing, result) {
    console.log(result);
    let tempArr = [];
    for (var i in result) {
      let elem = result[i];
      let updatetime = elem.updatetime/1000;
      elem.updatetime = js_date_time(updatetime);
      elem.wintime = calcTimeHeader(updatetime);
      tempArr.push(elem);
    }
    pageNum += 1;
    if (refreshing) {
      setTimeout(function () {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        _that.updateListView(_data.isHideLoadMore, result, _data.nomore);   
      }, 1000);
    } else {
      let temp = _data.detailsList;
      temp = temp.concat(tempArr);
      if (result.length < 10) {
        _that.show('没有更多数据');
        _that.updateListView(_data.isHideLoadMore, _data.detailsList, false); 
      } 
      setTimeout(() => {
        _that.updateListView(true, temp, _data.nomore);
      }, 1000);
    }
  },
  updateListView: function (isMore, mList, nomore) {
    _that.setData({
      isHideLoadMore: isMore,
      detailsList: mList,
      nomore: nomore
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})