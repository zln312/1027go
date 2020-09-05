import * as iconBase64Map from '../../../../utils/imageBase64.js'
import config from '../../../../utils/config.js'
const wxapi = require('../../../../utils/wxapi.js');
import {
  showToast,
  throttle,
  cleanCache,
  js_date_time,
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
    billList: [],
    isShow:false,
    show:false
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
      title: '账单' //页面标题为路由参数
    })
    wx.setNavigationBarColor({
      frontColor: '#fff',
    })

 
    _that.setData({
      userInfo: wx.getStorageSync('userInfo') || {},
    })
      wx.showLoading({
        title: '加载中',
      })
      _that.getBillList();
      
  },
  /**
   * 查询用户账单
   */
  getBillList: function (state,show) {
    //0未支付 1取消 2已支付 3已消费 4已作废
    var billList = _data.billList;
    let params = {
      userid: _data.userInfo.userid,
      pageNum: 1,
      pageSize: 999,
      state: ''
    };
    wxapi.getOrderListInf(params, 'POST').then(res => {
      if (res.code == 200) {
        var one = {};
        res.data.forEach(e => {
          let price = e.payPrice; // 订单价格
          if ((e.originType != 4)&&(e.status!=0||1||8)) {
            one = {
              id: e.orderid,
              imgUrl: (e.goodsimage + ",").split(",")[0],
              goodsname: e.maingoods,
              time: _that.js_date_time(e.createtime),
              isopt: 0,
              price: -price,
              origninType:e.originType
            }
            billList.push(one);
          }
        })
        if(billList[0]){
          _that.setData({
            billList: billList,
            show:show
          })
        }else{
          _that.setData({
            isShow:false,
            show:show
          })
        }
      
      } else {
        // console.log(res.msg);
      }
    })
  },
  orderStatus(state) {
    let value = ''
    let invalid = true
    switch (+state) {
      case 0:
        value = '未支付' //
        invalid = true
        break;
      case 1:
        value = '取消' // 
        invalid = true
        break;
      case 2:
        value = '待发货' // 需核销订单  快递-待发货   未使用 / 待发货
        invalid = false
        break;
      case 3:
        value = '交易成功' // 已核销
        invalid = true
        break;
      case 4:
        value = '超过有效期' //超过有效期
        invalid = true
        break;
      case 5:
        value = '已发货' // 快递-已发货
        invalid = false
        break;
      case 6:
        value = '交易成功' // 快递确认收货
        invalid = true
        break;
      case 7:
        value = '退款' // 退款
        invalid = false
        break;
      case 8:
        value = '退款成功' // 退款成功
        invalid = true
        break;
    }
    return {
      text: value,
      invalid: invalid
    }
  },
  js_date_time: function (unixtime) {
    var dateTime = new Date(parseInt(unixtime))
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = Date.parse(now.toDateString()); //typescript转换写法
    var milliseconds = now_new - dateTime;
    var timeSpanStr = year + '-' + two(month) + '-' + two(day) + '   ' + two(hour) + ':' + two(minute);
    function two(number) {
      if (number < 10) {
        number = "0" + number;
      }
      return number;
    }

    return timeSpanStr;
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