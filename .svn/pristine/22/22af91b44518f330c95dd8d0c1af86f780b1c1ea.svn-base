var storageUtil = require('../../utils/storage.js');
const wxapi = require('../../utils/wxapi.js');
import drawQrcode from '../../utils/weapp.qrcode.js'
import config from '../../utils/config.js'
import {
  calcTimeHeader,
  js_detail_date_time,
  fileterNickName,
} from '../../utils/util.js'
var userInfo = storageUtil.get('userInfo');
let _that, _data, orderid;
let app = getApp();
let collageData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultLogo: app.globalData.PAGE_CONFIG.defaultLogo,
    collageObj: {},
    orderDetails: {},
    preferential: '',
    inputValue: '1',
    totalPrices: '',
    enable: false,
    isHidenInf: false,
    phoneNum: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    _that = this;
    _data = _that.data;
    userInfo = storageUtil.get('userInfo');
    new app.ToastPannel();
    wx.setNavigationBarTitle({
      title: '拼团购详情' //页面标题为路由参数
    });
    wx.setNavigationBarColor({
      frontColor: '#fff',
    });
    collageData = JSON.parse(decodeURIComponent(options.obj)); //直播间信息 
    let isHidenInf = true;
    if (collageData.state == 0) {
      isHidenInf = true;
    } else {
      isHidenInf = false;
    }
    _that.setData({
      isHidenInf: isHidenInf,
      phoneNum: fileterNickName(userInfo.phone)
    });

    _that.updateView(collageData);
    _that.draw();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (collageData.state == 1 || collageData.state == 3) {
      _that.getOrdersDetail(collageData.orderid);
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let bondamount = parseFloat(collageData.bondamount);
    let totalamount = parseFloat(collageData.totalamount); //单价
    _that.updateInputView(1, 1 * bondamount, 1 * totalamount);
  },
  /** 获取订单详情 */
  getOrdersDetail: function(orderid) {
    let params = {
      orderid: orderid,
      userid: userInfo.userid,
    }
    wxapi.getOrderDetailInf(params, 'POST')
      .then(res => {
        if (res.code == 200) {
          let obj = res.data;
          obj[0].updatetime = js_detail_date_time(obj[0].updatetime / 1000);
          _that.updateOrdersView(obj[0], Math.abs(obj[0].allprice))
        } else {
          _that.show(res.msg);
        }
      }).catch(err => {
        _that.show('获取订单详情失败');
      });
  },

  collageAddTap: function(e) {
    if (_data.enable) {
      return;
    }
    let dlgValue = parseInt(_data.inputDlgValue);
    let bondamount = parseFloat(collageData.bondamount);
    let totalamount = parseFloat(collageData.totalamount); //单价
    let total = parseInt(collageData.total)
    dlgValue += 1;
    if (dlgValue > total) {
      _that.show('已超过可购数量');
      return;
    }
    _that.updateInputView(dlgValue, dlgValue * bondamount, dlgValue * totalamount);
  },
  collageSubTap: function(e) {
    if (_data.enable) {
      return;
    }
    let dlgValue = parseInt(_data.inputDlgValue);
    let bondamount = parseFloat(collageData.bondamount);
    let totalamount = parseFloat(collageData.totalamount); //单价
    if (dlgValue > 1) {
      dlgValue -= 1;
      _that.updateInputView(dlgValue, dlgValue * bondamount, dlgValue * totalamount);
    }
  },

  collageShoppingTap: function(e) {
    let dlgValue = parseInt(_data.inputDlgValue);
    wx.showLoading({
      title: '加载中...',
    })
    let params = {
      userid: userInfo.userid,
      collageid: collageData.collageid,
      number: dlgValue
    }
    wxapi.buyGoodsCollage(params, 'POST')
      .then(res => {
        if (res.code == 200) {
          let result = res.data;
          orderid = result.orderId;
          // console.log(result);
          _that.orderPayment(orderid);
        }
        if (res.code == 403) {
          var pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          var prevPage = pages[pages.length - 2];
          wx.navigateBack({
            delta: 1,
            success: function() {
              prevPage.onPullDownRefresh();
            }
          })
        } else {
          _that.show(res.msg);
        }
      }).catch(err => {
        // console.log('购买拼团商品失败');
      });
  },

  /** 订单支付 */
  orderPayment: function(orderId) {
    let params = {
      userid: userInfo.userid,
      openid: userInfo.openid,
      orderid: orderId
    }
    wxapi.getPayOrderInf(params, 'POST')
      .then(res => {
        if (res.code == 200) {
          let result = res.data;
          // console.log(result);
          let payMessage = JSON.parse(result.payMessage);
          _that.requestPay(payMessage);
        } else {
          _that.show(res.msg);
        }
      }).catch(err => {
        // console.log('购买拼团商品失败');
      });
  },
  /** 执行微信支付 */
  requestPay: function(payMessage) {
    wx.requestPayment({
      'timeStamp': payMessage.timeStamp,
      'nonceStr': payMessage.nonceStr,
      'package': payMessage.package,
      'signType': payMessage.signType,
      'paySign': payMessage.paySign,
      'success': function(res) {
        var result = res.data;
        // console.log(res);
        _that.show( '支付成功');
        var pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
        var prevPage = pages[pages.length - 2];
        wx.navigateBack({
          delta: 1,
          success: function () {
            prevPage.onPullDownRefresh();
          }
        })
      },
      'fail': function(res) {
        _that.show('支付失败');
      },
      'complete': function(res) {}
    })
  },

  updateInputView: function(value, bondamount, totalPrices) {
    let prices = totalPrices - bondamount;
    _that.setData({
      inputDlgValue: value,
      preferential: bondamount,
      totalPrices: prices.toFixed(2)
    })
  },
  updateOrdersView: function(orderDetails, totalamount) {
    _that.setData({
      orderDetails: orderDetails,
      totalamount: totalamount
    })
  },
  inputDlgChange(e) {
    _that.updateInputView(e.detail.value);
  },
  draw() {
    drawQrcode({
      width: 160,
      height: 160,
      x: 0,
      y: 0,
      canvasId: 'myQrcode',
      typeNumber: 10,
      text: collageData.collageid,
      callback(e) {
        // console.log('e: ', e)
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  updateView: function(obj) {
    _that.setData({
      collageObj: obj,
    });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})