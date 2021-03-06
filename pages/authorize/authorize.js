// pages/authorize/authorize.js
import config from '../../utils/config.js'
const wxapi = require('../../utils/wxapi.js');
var storageUtil = require('../../utils/storage.js');
import TIM from 'tim-wx-sdk';
import COS from "cos-wx-sdk-v5";
import {
  showToast,
  throttle,
  utf16toEntities,
} from '../../utils/util.js'

let tim, phoneNum;
var userInfo = storageUtil.get('userInfo') || {};
const app = getApp();
var _that, _data, _global;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    livingRoomInf: [],
    disabled: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _that = this;
    _data = _that.data;
    _global = app.globalData;
    new app.ToastPannel();
    tim = _global.tim;
    _global.worker.onMessage(function (res) {
      if (res.data.type == TIM.EVENT.SDK_NOT_READY) {

        _global.worker.postMessage({
          type: TIM.EVENT.SDK_NOT_READY,
          msg: '初始化失败, 请重新登陆',
          flag: 0
        });
      } else if (res.data.type == TIM.EVENT.SDK_READY) {
        _global.worker.postMessage({
          type: TIM.EVENT.SDK_READY,
          msg: ''
        });
      } else if (res.data.type == TIM.EVENT.MESSAGE_RECEIVED) {
        _global.worker.postMessage({
          type: TIM.EVENT.MESSAGE_RECEIVED,
          msg: res
        });
      }
    });
  },
  bindGetUserInfo: throttle(function (e) {
    if (e.detail.userInfo) {
      _that.handlBtn(true);
      wx.showLoading({
        title: '加载中...'
      });
      wx.clearStorage();
      _that.initLoginHandle();
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  }, 1000),
  handlBtn: function (disabled) {
    this.setData({
      disabled: disabled
    })
  },
  /** 初始化登陆信息 */
  initLoginHandle: function () {
    let _global = app.globalData;
    wxapi.login()
      .then(res => {
        global.code = res.code;
        wx.showLoading({
          title: '加载中...'
        });
        return wxapi.getUserInfo();
      }).then(res => {
        // console.log('授权登陆');
        // console.log(res);
        _global.userInfo = res.userInfo;
        let params = {
          code: global.code,
          encryptedData: res.encryptedData,
          iv: res.iv
        }
        // console.log('temp1->' + res.encryptedData);
        // console.log('temp2->' + res.iv);
        return wxapi.getApiAuthInfo(params, 'GET');
      }).then(res => {
        if (res.code == 200) {
          let obj = res.data;
          _global.openid = obj.openid;
          _global.unionid = obj.unionid;
          _global.session_key = obj.session_key;
          _global.expires_in = Date.now() + res.expires_in;
          wx.showLoading({
            title: '加载中...'
          });
          _that.landAccount();
        } else {
          _that.handlBtn(false);
          _that.show(res.msg);
        }
      }).catch(err => {
        _that.handlBtn(false);
        _that.show('登陆失败');
      });
  },
  // /** 获取手机号 */
  // getPhoneNumber(e) {
  //   console.log(e);
  //   wx.showLoading({
  //     title: '加载中...'
  //   });
  //   wx.hideLoading();
  //   if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //未授权
  //     phoneNum = '-1';
  //   } else {
  //     var encryptedData = e.detail.encryptedData;
  //     var iv = e.detail.iv;
  //     wx.checkSession({
  //       success() {
  //         //session_key 未过期，并且在本生命周期一直有效
  //         let params = {
  //           iv: iv,
  //           encryptedData: encryptedData,
  //           code: global.code
  //         }
  //         wxapi.getApiAuthInfo(params, 'GET')
  //           .then((res) => {
  //               console.log("解密成功")
  //               let data = JSON.parse(res.data.userinfo)
  //               phone = data.phoneNumber;
  //               console.log(phone);
  //             },
  //             (err) => {
  //               console.log("解密失败");
  //               console.log(res);
  //             })

  //       },
  //       fail() {
  //         // session_key 已经失效，需要重新执行登录流程
  //         wxapi.login() //重新登录
  //       }
  //     })


  //   }
  // },
  /** 登陆账号 */
  landAccount: function () {
    let _global = app.globalData;
    let data = {
      wxid: _global.unionid,
    }
    wxapi.checkUserExist(data, 'POST')
      .then(res => {
        // console.log(res);
        if (res.code == 200) {
          let result = res.data;
          _that.getLiveRoomList(result);
        } else {
          _that.registerAccount();
        }
      }).catch(err => {
        // showToast('text', '查询用户失败', 1500);
        _that.handlBtn(false);
        _that.show('查询用户失败');
      });
  },
  /** 创建账号 */
  registerAccount: function () {
    // console.log('创建账号');
    let _global = app.globalData;
    let userInfo = _global.userInfo
    wx.showLoading({
      title: '加载中...'
    });
    let data = {
      wxid: _global.unionid,
      nickname: utf16toEntities(userInfo.nickName),
      avatarurl: userInfo.avatarUrl,
      province: userInfo.province,
      gender: userInfo.gender,
      city: userInfo.city,
      country: userInfo.country,
      phone: '-1',
      password: '-1',
      model: _global.model,
      pixelRatio: _global.pixelRatio,
      windowWidth: _global.windowWidth,
      windowHeight: _global.windowHeight,
      version: _global.version,
      platform: _global.platform,
    };
    wxapi.getApiLoginInf(data, 'POST')
      .then(res => {
        if (res.code == 200) {
          // console.log(res);
          let result = res.data;
          _that.getLiveRoomList(result);
        } else {
          _that.show(res.msg);
        }
      }).catch(err => {
        _that.handlBtn(false);
        showToast('error', '注册失败', 1500);
      });
  },
  /**
   * 获取房间信息
   */
  getLiveRoomList: function (result) {
    let data = {
      pageNum: 1,
      pageSize: 10,
    }
    wx.showLoading({
      title: '加载中...'
    });
    wxapi.getApiLiveRoomInf(data, 'POST')
      .then(res => {
        if (res.code == 200) {
          let obj = res.data;
          let item = obj[0];
          _that.storeUserInfo(item, result, item.roomid);
        } else {
          _that.handlBtn(false);
          _that.show(res.msg);
        }
      }).catch(err => {
        _that.handlBtn(false);
        _that.show('加载失败');
      });
  },
  /** 初始化IM */
  initIM: function (obj, userid, usersig) {
    let str = encodeURIComponent(JSON.stringify(obj));
    let userSigStr = encodeURIComponent(JSON.stringify(usersig));
    _global.tim.login({
      userID: userid,
      userSig: usersig
    }).then(function (imResponse) {
      let userSigStr = encodeURIComponent(JSON.stringify(usersig));
      wx.reLaunch({
        url: '/pages/live-room-chat/index?key=' + str + '&userid=' + userid + '&usersig=' + userSigStr
      })
    }).catch(function (imError) {
      // console.warn('login error:', imError); // 登录失败的相关信息
    });

  },
  /** 保存userInfo */
  storeUserInfo: function (item, result, roomid) {
    let _global = app.globalData;
    let userInf = {
      roomid: roomid,
      openid: _global.openid,
      unionid: _global.unionid,
      session_key: _global.session_key,
      expires_in: _global.expires_in,
      userid: result.userid,
      storeid: result.storeid,
      wxid: result.wxid,
      gender: result.gender,
      phone: result.phone,
      nickname: result.nickname,
      avatarurl: result.avatarurl,
      province: result.province,
      city: result.city,
      country: result.country,
      createtime: result.createtime,
      bondstate: result.bondstate,
      bondamount: result.bondamount,
      userSig: result.userSig,
      usertype: result.usertype,

    };
    storageUtil.put('userInfo', userInf, 60 * 60 * 24 * 7); //缓存一天
    // console.log(storageUtil.get('userInfo'));
    _that.initIM(item, result.userid, result.userSig);
  },

  cancelLogin: function (e) {
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    _global.worker.postMessage({
      type: 'cancel',
      msg: ''
    });
    wx.navigateBack({
      delta: 1,
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