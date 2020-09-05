
import {
  showToast,
} from '../../utils/util.js'
import config from '../../utils/config.js'
const wxapi = require('../../utils/wxapi.js');

let app = getApp();
let _that, _data;
let userid, redid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    amount:'0.00',
    defaultUserLogo: app.globalData.PAGE_CONFIG.defaultUserLogo,
    red_packet_entity:{},
    userid:'',
    redid: '',
    gradEnveList:[],
    maxValue:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _that = this;
    _data = _that.data;
    wx.setNavigationBarTitle({
      title: '红包详情'//页面标题为路由参数
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#f25542',
    })
    var entity = JSON.parse(decodeURIComponent(options.key));
    userid = options.userid,
    redid= options.redid,
    _that.setData({
      amount: options.amount,
      red_packet_entity:entity,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     _that = this;
     _data = _that.data;
    wx.showLoading({
      title: '加载中...',
    })
    let data = {
      userid: userid,
      redid: redid,
    }
    wxapi.getRedPakcetDetail(data, 'POST')
      .then(res => {
        let result = res.data;
        let tempArr = res.data;
        let arr = [];
        if (result.length >1){
          for (let i =0; i< result.length; i++) {
            let item = result[i];
            arr.push(item.amount);
          }
          var maxValue = Math.max.apply(null, arr);
          let elem ;
          for (let i = 0; i < result.length; i++) {
              elem = result[i];
            if (maxValue == elem.amount) {
              tempArr.splice(i, 1);
              tempArr.splice(0, 0 ,elem);
              break;
            }
          }
        }
        _that.setData({
          gradEnveList: tempArr,
          maxValue: maxValue
        })   
      }).catch(err => {
        showToast('error', '网络异常，请再次重试', 1500);
      });
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