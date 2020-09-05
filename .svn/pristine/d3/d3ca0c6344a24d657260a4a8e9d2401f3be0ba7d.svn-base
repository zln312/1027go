import * as iconBase64Map from '../../../../utils/imageBase64.js'
import config from '../../../../utils/config.js'
const wxapi = require('../../../../utils/wxapi.js');
import {
  showToast,
  throttle,
  cleanCache,
  js_date_time
} from '../../../../utils/util.js';
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
let userid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: storageUtil.get('userInfo') || {},
    accountInf: {
      secondskillamount: 0,
      goodscollageamount: 0,
      questionactivityamount: 0,
      redpacketamount: 0,
    },
    authcode:'',
    audit:'',
    orderList:[],
    billList:[]
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
    //缓存地址
    _that.getBillList(2);
    _that.getBillList(3);
    wx.setNavigationBarTitle({
      title: '个人中心' //页面标题为路由参数
    })
    // wx.setNavigationBarColor({
    //   frontColor: '#fff',
    // })
    _that.setData({
      userInfo: wx.getStorageSync('userInfo') || {},
    })
    wx.getStorageSync('activtyAccount');
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
    let storeid = _data.userInfo.storeid;
    _that.getUserStore(storeid);
    _that.getAddressList();

  },
  /**
   * 活动累计
   */
  getActivteCount: function (e) {
    let userInfo = wx.getStorageSync('userInfo');
    let params = {
      userid: userInfo.userid
    }
    wxapi.getAuccoutInf(params, 'POST').
    then(res => {
      if (res.code = 200) {
        if (res.data != null) {
          this.setData({
            accountInf: {
              secondskillamount: res.data.secondskillamount,
              goodscollageamount: res.data.goodscollageamount,
              questionactivityamount: res.data.questionactivityamount,
              redpacketamount: res.data.redpacketamount,
            }
          })
        }
      } else {
        this.onShow('获取账户信息失败');
      }
    })
  },

 

  /**
   * 商家信息详情
   */
  getUserStore: function (storeid) {
    let userid = _data.userInfo.userid;
    let params = {
      userid: userid,
      storeid: storeid
    }
    wxapi.getUserStoreById(params, 'POST').then(res => {
      if (res.code == 200) {
        wx.setStorageSync('storename', res.data.storename);
        wx.setStorageSync('authcode', res.data.authcode);
        _data.authcode = res.data.authcode,
        _data.audit = res.data.audit
      } else {
        // console.log(res.msg);
      }
    })
   
  },
 

  /**
   * 
   * @param {*} e 
   * 获取地址
   */
  getAddressList: function(){
    wxapi.receivingAddressList({
			userid: _data.userInfo.userid
		}).then(res => {
			if (res.code == 200) {
        let addressList = res.data.addressList || []
        wx.setStorageSync('addressList', addressList);
			} else {
      }
     _that.getAllOrderList();
		})
  },

  /**预加载
   * 查询用户所有订单
   */
  getAllOrderList: function(){
    let params = {
      userid: _data.userInfo.userid,
      pageNum: 1,
      pageSize: 30,
    };
    wxapi.getOrderListInf(params, 'POST').then(res => {
      if (res.code == 200) {
        _that.data.orderList = res.data;
      } else {
      }
    })
  },

 /**预加载
   * 查询用户所有订单
   */
 
  getBillList: function (state) {
    //0未支付 1取消 2已支付 3已消费 4已作废
    var billList = _data.billList;
    let params = {
      userid: _data.userInfo.userid,
      pageNum: 1,
      pageSize: 30,
      state: state
    };
    wxapi.getOrderListInf(params, 'POST').then(res => {
      if (res.code == 200) {
        var one = {};
        res.data.forEach(e => {
          let price = e.payPrice; // 订单价格
          if (e.originType != 4) {
            one = {
              id: e.orderid,
              imgUrl: (e.goodsimage + ",").split(",")[0],
              goodsname: e.maingoods,
              time: js_date_time(e.createtime),
              isopt: 0,
              price: -price,
            }
            billList.push(one);
          }
        })
        if(billList[0]){
         _data.billList = billList;
        }
      } 
    })
  },
  /**
   * 商家中心 merchant-centre
   */
  merchantCentreTap: function (e) {
    wx.navigateTo({
      url: '/page/personal-center/pages/merchant-centre/merchant-centre',
    })
  },
  /**
   * 我的账单
   */
  myBillTap: function (e) {
    let bills = JSON.stringify(_data.billList);
    wx.navigateTo({
      url: `/page/personal-center/pages/my-bill/myBill?bills=${bills}`,
    })
  },
  /** 我的余额 */
  myBalanceTap: function (e) {
    wx.navigateTo({
      url: '/page/personal-center/pages/my_balance/my_balance',
    })
  },
  /** 我的订单 */
  myOrderTap: function (e) {
    let orderList = JSON.stringify(_data.orderList);
    wx.navigateTo({
      url: `/page/personal-center/pages/my-order-list/orderList?orderList=${orderList}`,
    })
  },
  /** 收获地址 */
  optTap: function (e) {
    wx.navigateTo({
      url: '../receiving-address-list/receiving-address-list',
    })
  },
  /** 条款 */
  legalProvisionsTap: function (e) {
    wx.navigateTo({
      url: '/page/personal-center/pages/clause-page/clause-page',
    })
  },
  /** 联系客服 */
  contactCustomServiceTap: function (e) {
    wx.navigateTo({
      url: '/page/personal-center/pages/custom-service/customService',
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