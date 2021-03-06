//app.js
//import requestIntercept from '/utils/requestIntercept.js'
import { ToastPannel } from './components/appToast/appToast'
import PAGE_CONFIG from './common/pageConfig.js'
import {
  cancelLogin,
} from '/utils/commonTools.js';
const wxapi = require('/utils/wxapi.js');
import {
  checkNetWork
} from '/utils/util.js';
 
import TIM from 'tim-wx-sdk';
import COS from "cos-wx-sdk-v5";
var options = {
  SDKAppID: 1400229935 // 接入时需要将0替换为您的即时通信应用的 SDKAppID  1400252892  
};
let tim = TIM.create(options); // SDK 实例通常用 tim 表示
tim.setLogLevel(0);
tim.registerPlugin({ 'cos-wx-sdk': COS });

const app = getApp();
App({
  ToastPannel,
  onLaunch: function() {
    
    // 展示本地存储能力
    let _that = this
    let _data = _that.data;
    let _global = _that.globalData;
    _global.worker = wx.createWorker('/workers/request/index.js');
    wx.setStorageSync('logs', logs)
    // 打开调试
    wx.setEnableDebug({
      enableDebug:false
    })
   
    // 注册请求拦截器
    //wxp.intercept('request', requestIntercept);
    //this.checkIsIPhoneX();
    wx.getSystemInfo({
      success(res) {
        _global.model= res.model;
        _global.pixelRatio = res.pixelRatio;
        _global.windowWidth = res.windowWidth;
        _global.windowHeight = res.windowHeight;
        _global.version = res.version;
        _global.platform = res.platform;
      }
    });
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    

    // 监听事件，如：
    tim.on(TIM.EVENT.SDK_READY, function (event) {
      // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
      // event.name - TIM.EVENT.SDK_READY
      _global.worker.postMessage({
        type: TIM.EVENT.SDK_READY,
        msg:'',
       
      });
    });
    tim.on(TIM.EVENT.SDK_NOT_READY, function (event) {
      // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
      // event.name - TIM.EVENT.SDK_NOT_READY
      _global.worker.postMessage({
        type: TIM.EVENT.SDK_NOT_READY,
        msg: '初始化失败, 请重新登陆',
        flag:0
      });
    });
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (event) {
      // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
      let data = event.data;
      let type = data.type;
      if (type == TIM.TYPES.MSG_GRP_TIP || type == TIM.TYPES.MSG_GRP_SYS_NOTICE ) {
        return;
      }   
      _global.worker.postMessage({
        type: TIM.EVENT.MESSAGE_RECEIVED,
        message: data
      });
    });
    tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, function (event) {
      // 收到新的群系统通知
      // event.name - TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED
      // event.data.type - 群系统通知的类型，详情请参见 GroupSystemNoticePayload 的 <a href="https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/Message.html#.GroupSystemNoticePayload"> operationType 枚举值说明</a>
      // event.data.message - Message 对象，可将 event.data.message.content 渲染到到页面
    });

    tim.on(TIM.EVENT.ERROR, function (event) {
      // 收到 SDK 发生错误通知，可以获取错误码和错误信息
      // event.name - TIM.EVENT.ERROR
      if (event.data.code !== 2800 && event.data.code !== 2999) {
        // wx.showToast({
        //   title: event.data.message,
        //   icon: 'none',
        //   duration: 1500
        // })
        _global.worker.postMessage({
          type: TIM.EVENT.ERROR,
          msg: '初始化失败, 请重新登陆'
        });
        // setTimeout(() => {
        //   _global.worker.postMessage({
        //     type: TIM.EVENT.ERROR,
        //     msg: '初始化失败, 请重新登陆'
        //   });
        // }, 1500)      
      }
    });
    tim.on(TIM.EVENT.KICKED_OUT, function (event) {
      // 收到被踢下线通知
      // event.name - TIM.EVENT.KICKED_OUT
      // event.data.type - 被踢下线的原因，例如 TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多账号登录被踢
      wx.showToast({
        title: '您已经下线，重新登陆中...',
        icon: 'none',
        duration: 1500
      })
      setTimeout(() => {
        cancelLogin();
      }, 1500)  
    });
  },
  

  globalData: {
    code: null,
    userInfo: null,
    systemInfo: null,
    openid: null,
    unionid: null,
    session_key: null,
    expires_in: null,
    model:null,
    pixelRatio:null,
    windowWidth:null,
    windowHeight:null,
    version:null,
    platform:null,
    setting: {},
    screenHeight: wx.getSystemInfoSync().windowHeight,
    screenWidth: wx.getSystemInfoSync().windowWidth,
    PAGE_CONFIG,
    isIPX: false, // 当前设备是否为 iPhone X
    netStatus:null,
    worker:null,
    tim:tim
  }
})

