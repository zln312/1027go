// import config from '../../utils/config.js';
import TIM from 'tim-wx-sdk';
import COS from "cos-wx-sdk-v5";
const util = require('../../utils/util.js');
const wxapi = require('../../utils/wxapi.js');
var storageUtil = require('../../utils/storage.js');
var timer = require('../../plugins/wxTimer.js');
var eventUtils = require("../../utils/EventUtils.js");
const liveTools = require('../../utils/livePlayerTools.js');
const advertTools = require('../../utils/advertTools.js');
var fierce = null; //需要一个值来处理
let app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

var wxTimer1, wxTimer2, wxTimer3;

import {
  showToast,
  objectIsNull,
  throttle,
  isArrayEmpty,
  fileterNickName,
  startHttp
} from '../../utils/util.js';
import {
  commonData,
  verifyLogin,
  verifyPhoneNum,
  initGiveThumbsUp,
  updateOnLineNum,
  loginAuthEvent,
  checkLiveRoomAct,
  initCountDown,
  getOnLineNumOfpeople,
  loadInvitationList,
  sortBy,
  cancelLogin,
  getOfficialAccNum,
  updateAllowView
} from '../../utils/commonTools.js';
import {
  updateSkillReq,
  timingUpdateSkill,
  joinSkillAct,
  secKillDlgSuccess,
  secSkillPayDailog
} from '../../utils/limitedSecKillJs.js'; // 秒杀工具类
import {
  getPayMessage,
  requestPay
} from '../../utils/wxPayJs.js'; // 支付工具类
import {
  sendRedEnvelopes
} from '../../utils/SendRedDvlpesJs.js'; // 支付工具类
import {
  optData,
  initOpt,
  clearOptTimeInterval,
  ansJoinOptTap,
  ansMoreOptTap,
  updateOptInfo,
} from '../../utils/optimalSelection.js'; // 乐优选
import {
  joinCollage,
  initCollage,
  collageListTap,
  clearCollageTimeInterval
} from '../../utils/collageShopping.js'; // 拼团购
import {
  ordinaryConvertMsgtoHtml,
  handleHistoryData,
  parsingAdvertData,
  ordinaryCustomMsgtoHtml,
  updateScrollTo,
  parsingSkillData,
  geMemberProfile,
} from '../../utils/TIMUtils.js'; // 聊天类工具类

var msgTotal = [];
let RATE = wx.getSystemInfoSync().screenHeight / wx.getSystemInfoSync().screenWidth;
let _that, _data, _global;
let livingRoomInf = {},
  videoContext = {}; //直播信息
let lastmsgseq = 0;
let redid, usersig, userid, avChatRoomId, userInfo;
let areaPadding = 0,
  collageHeight = 8;
let timestamp, tim, lineCount = 0;
let isEmojiFlag = false;
var isRefresh = false;
let hideInput = true;
var iptLoginInData = {
  iptDisabled: false,
  placeholder: '请输入文字', //文本框输入内容
  left: 0,
  center: 'center',
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultUserLogo: app.globalData.PAGE_CONFIG.defaultUserLogo,
    defaultLogo: app.globalData.PAGE_CONFIG.defaultLogo,
    tabs: ["互动间", "乐优选", "限时秒", "拼团购", "我的"],
    live_player_attr: {},
    activeIndex: 0,
    playing: false,
    playUrl: "", //播放器拉流  
    images: [],
    indicatorDots: true,
    // 滑动方向是否为纵向
    vertical: false,
    // 自动切换
    autoplay: true,
    // 采用衔接滑动
    circular: true,
    // 自动切换时间间隔2s
    interval: 2000,
    // 滑动动画时长0.5s
    duration: 500,
    // 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    previousMargin: 0,
    // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    nextMargin: 0,
    contentH: 54,
    refreshing: false,
    focusFlag: false, //控制输入框失去焦点与否
    emojiFlag: false, //emoji键盘标志位
    fooerHeight: 96,
    key_height: 20, // 键盘高度
    bottomHeight: 0,
    footerParam: {
      hideSend: true,
      iptWidth: 80,
      align: 'center',
    },
    hideInput: false,
    areaPadding: 0,
    messageArr: [],
    msgData: [],
    inputValue: '',
    // 乐优选倒计时功能参数
    question_endTime: null,
    question_nowTime: null,
    question_countDown: true,
    //乐优选选择答案
    answer_color: null,
    myanswer: "",
    // 秒杀倒计时功能参数
    secondsKill_endTime: null,
    secondsKill_nowTime: null,
    secondsKill_countDown: true,
    secondsKill_text: "距离开始",
    question_text: "距离开始",
    question_starttime: "",
    secondsKill_starttime: "",
    isStart: false,
    goodsUrl: "",

    wxTimerList: {},
    question_end: false,
    isImpeach: false,
    lastMsgTime: 0,

    isFullScreen: false,

    collageDetail: {}, //拼团购详情
    pricelist: [],
    wxTimerList: {},
    collage_nowTime: "",
    collage_endTime: "",
    collage_starttime: "",
    showModal: false,
    ticket_input: 1,
    join_or_buy: "",
    img_show: false,
    process: "",
    current_price: "",
    current_img: "",
    goodsUrl: "",
    collage_text: "距离开始",
    collage_interval: "",
    timeColor1: 'white',
    timeColor2: 'white',
    timeColor3: 'white',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _that = this;
    _data = _that.data;
    _global = app.globalData;
    tim = _global.tim;
    _that.initLiveRoomData();
    let contentH;
    if (_global.windowHeight > 750) {
      contentH = 55;
    } else if (_global.windowHeight >= 540 && _global.windowHeight <= 750) {
      contentH = 53;
    } else {
      contentH = 51;
    }
    if (verifyLogin(userInfo)) {
      wx.navigateTo({
        url: '/pages/authorize/authorize',
      })
      return;
    }
    if (!verifyLogin(userInfo)) {
      usersig = JSON.parse(decodeURIComponent(options.usersig));
      userid = options.userid;
    }
    let chatRoom = JSON.parse(decodeURIComponent(options.key));
    livingRoomInf = chatRoom;
    avChatRoomId = chatRoom.roomid;
    _that.initIM(avChatRoomId); //初始化IM通信
    let adphotolist = chatRoom.adphotolist;
    let array = adphotolist.split(",");
    _that.setData({
      allowInf: commonData.allowInf,
      //images: array, //直播广告列表
      playUrl: livingRoomInf.zhibourl,
      live_player_attr: liveTools.data.attr,
      messageArr: [],
      areaPadding: areaPadding,
      contentH: contentH
    });
    getOfficialAccNum(_that, userid);
    _that.getScroViewHight();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    _that.getBannerList();

    // _that.updataTab(0, 0, 114);
    _that.onPlayClick();
    wx.setKeepScreenOn({
      keepScreenOn: true,
    });
    _that.updateIptView(false, false, 0, 96, '', 0);
    if (verifyLogin(userInfo)) {
      hideInput = true;
    } else {
      hideInput = false;
    }
    _that.setData({
      hideInput: hideInput,
    });
    if (_data.activeIndex == 4) {
      _that.setData({
        activeIndex: 0
      })
    }

    this.getActivityInfo(); //获取当前直播间活动信息
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.onKeyboardHeightChange(res => {
      const pages = getCurrentPages();
      if (res.height > _data.key_height) {
        _that.setData({
          key_height: res.height,
        });
      }
    })
  },


  /** 初始化房间数据 */
  initLiveRoomData: function () {
    userInfo = storageUtil.get('userInfo') || {};
    new app.ToastPannel();
    eventUtils.register(_that, "recvSysMsg");
    videoContext = wx.createLivePlayerContext("video-livePlayer");
    if (_global.platform == "ios") {
      areaPadding = 0;
    } else if (_global.platform == "android") {
      areaPadding = 0;
    } else {
      areaPadding = 0;
    }
  },

  /** 直播操作 */
  onPlayClick: function () {
    videoContext.stop();
    videoContext.play();
  },
  onPlayLiving: function (url) {
    if (url.indexOf("rtmp:") == 0) {} else if (url.indexOf("https:") == 0 || url.indexOf("http:") == 0) {
      if (url.indexOf(".flv") != -1) {}
    } else {
      _that.show('播放地址不合法，目前仅支持rtmp,flv方式!');
    }
    videoContext.play();
  },

  onPlayError: function (e) {

  },

  /*
   * 初始化云通讯
   */
  initIM: function (avChatRoomId) {
    console.log("初始化云通讯==>>>>");
    _that.joinChatRoom(avChatRoomId);
    _global.worker.onMessage(function (res) {
      console.log("sdk的状态==》》",res.data.type)
      //收到消息
      if (res.data.type == TIM.EVENT.MESSAGE_RECEIVED) {
        let data = res.data.message;     
        msgTotal.push(Object.assign({}, data[0]));
        _that.receiveMessage(data[0]);

      } else
        //没有sdk准备的特殊操作，下面有错误的规范操作
        if (res.data.type == TIM.EVENT.SDK_NOT_READY) {
          if (res.data.flag == 1) return;
          if (verifyLogin(userInfo)) {
            return;
          }
        } else
          //SDK到了
          if (res.data.type == TIM.EVENT.SDK_READY) {
            _that.joinChatRoom(avChatRoomId);
          } else
            // 出问题了
            if (res.data.type == TIM.EVENT.SDK_NOT_READY || TIM.EVENT.ERROR || TIM.EVENT.KICKED_OUT) {
              if (verifyLogin(userInfo)) {
                return;
              }
            }
    });
  },

  /** 加入聊天室 */
  joinChatRoom: function (avChatRoomId) {
    console.log("加入聊天室》》》》");
    _global.tim.joinGroup({
      groupID: avChatRoomId,
      type: TIM.TYPES.GRP_AVCHATROOM
    }).then(function (imResponse) {
      console.log("imResponse.data.status>>==》》",imResponse.data.status);
      switch (imResponse.data.status) {
        case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL:
          break; // 等待管理员同意
        case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加入成功

          if (imResponse.data.hasOwnProperty("group")) {
            let groupInf = imResponse.data.group;
            if (typeof (groupInf) != "undefined") {
              lastmsgseq = groupInf.nextMessageSeq - 1;
              if (!verifyLogin(userInfo)) {

                _that.getMessageListData(10, lastmsgseq);
              }
            }
          }
          break;
      }
    }).catch(function (imError) {
      cancelLogin();

    });
  },





  /** 解析消息 */
  receiveMessage: function (data) {
    let type = data.type;

    if (type == TIM.TYPES.MSG_TEXT) {
      isRefresh = true

      _that.parseContentMsg(data);
    } else if (type == TIM.TYPES.MSG_IMAGE) {


    } else if (type == TIM.TYPES.MSG_SOUND) {

    } else if (type == TIM.TYPES.MSG_FILE) {

    } else if (type == TIM.TYPES.MSG_GRP_TIP) {
      getOnLineNumOfpeople(_that, userid, livingRoomInf.roomid, livingRoomInf.isdianzan);
    } else if (type == TIM.TYPES.MSG_GRP_SYS_NOTICE) {

    } else if (type == TIM.TYPES.MSG_CUSTOM) {
      isRefresh = true;
      _that.parsePayloadMsg(data);
    }
  },
  /** 自定义消息 */
  parsePayloadMsg: function (data) {
    let tempArr = _data.messageArr;
    let strToObj = JSON.parse(data.payload.data);
    let code = strToObj.code;
    // let systime = strToObj.systime;

    switch (code) {
      case 10004:
        _that.handleRedPacket(strToObj.data, data);

        break;
      case 10000: //在线人数

        break;
      case 10001: //秒杀信息
        wx.setStorageSync('secondskillid', strToObj.data.secondskillid)
        this.getSecondsKill(strToObj.data.secondskillid)
        timestamp = (new Date()).valueOf();
        break;
      case 10003: //直播地址切换
        _that.liveAddrSwitching(strToObj.data);
        break;
      case 20001: //点赞
        break;
      case 20002: //贴图表情
        _that.parseContentMsg(data);
        break;
      case 20003: //秒杀消息

        break;
      case 10005: //互动间广告
        let time = data.time;
        tempArr.push(parsingAdvertData(_that, strToObj.data, time));
        if (tempArr.length > 1) {
          tempArr.sort(sortBy('time'), false);
        }
        updateScrollTo(_that, tempArr, isRefresh, RATE);
        break;
      case 10006: // 乐优选
        wx.setStorageSync('questionid', strToObj.data.questionid)
        this.getQuestionActivity(strToObj.data.questionid);
        timestamp = (new Date()).valueOf();
        break;
      case 10007:

        break;
      case 10008: //拼团购

        wx.setStorageSync('collageid', strToObj.data.collageid)
        this.getCollageDetail(strToObj.data.collageid);
        timestamp = (new Date()).valueOf();
        break;
      case 10009:

        // console.log("10009消息发来了！！！");
        break;

      case 10011:


        // console.log("秒杀库存更新！！！");
        // console.log(strToObj.data);
        _that.setData({
          'secondsKill_data.residualquantity': strToObj.data.residualQuantity
        })

        break;

      case 10012:

        // console.log("拼团活动库存更新！！！");
        // console.log(strToObj.data);
        _that.setData({
          'collageDetail.surplusnumber': strToObj.data.residualQuantity
        })
        break;

      case 10013:

        // console.log("拼团活动票数支付成功库存更新！！！");
        // console.log(strToObj.data.residualQuantity);
        let num = strToObj.data.residualQuantity
        _that.setData({
          'collageDetail.totalVotes': num
        })
        let arr = this.data.pricelist
        for (let i = 0; i < arr.length; i++) {
          if (num < +arr[i].number) {
            this.setData({
              current_price: i == 0 ? this.data.collageDetail.totalamount : +arr[i - 1].price
            })
            break;
          } else if (num >= +arr[arr.length - 1].number) {
            this.setData({
              current_price: arr[arr.length - 1].price
            })
          }
        }

        this.data.process = (num / _data.pricelist[_data.pricelist.length - 1].number) * 100;
        this.data.process = this.data.process < 20 ? "" : this.data.process;
        this.data.process = this.data.process > 100 ? 100 : this.data.process;
        this.setData({
          process: Math.round(this.data.process)
        })
        break;
    }

  },
  /** 直播地址切换 */
  liveAddrSwitching: function (obj) {

    // console.log("拉流切换：" + obj.playurl);
    _that.setData({
      playUrl: obj.playurl
    }, function () {
      videoContext.stop({
        success: function () {

          // console.log("stop成功！！！");
        },
        fail: function () {
          // console.log("stop失败！！！");
        }
      });
      videoContext.play();
    })
  },
  /** 处理红包消息 */
  handleRedPacket: function (strToObj, data) {
    // console.log('处理红包消息');
    let memberData = wx.getStorageSync(strToObj.userid) || {};
    if (JSON.stringify(memberData) != '{}') {
      strToObj.avatar = memberData.avatar;
      strToObj.nick = memberData.nick;
      _that.addRedPacketToList(strToObj, data);
    } else {
      try {
        geMemberProfile(_that, _global.tim, [strToObj.userid],
          function success(result) {
            // console.log(result);
            let item = result[0];
            strToObj.avatar = item.avatar;
            strToObj.nick = item.nick;
            wx.setStorageSync(strToObj.userid, {
              avatar: item.avatar,
              nick: item.nick,
            }); //存储userInfo 
            _that.addRedPacketToList(strToObj, data);
          },
          function fail(res) {
            // console.log(res);
          })
      } catch (e) {
        cancelLogin();
      }
    }
  },
  /** 添加红包数据到数组 */
  addRedPacketToList: function (strToObj, data) {
    // console.log('添加红包数据到数组');
    let tempArr = _data.messageArr;
    tempArr.push(ordinaryCustomMsgtoHtml(strToObj, data));
    if (tempArr.length > 1) {
      tempArr.sort(sortBy('time'), false);
    }
    updateScrollTo(_that, tempArr, isRefresh, RATE);
  },
  /** 处理历史消息 */
  messgeHisHandler: function (item) {
    // console.log('处理历史消息');
    // console.log(item.MsgSeq);
    // console.log(fierce);
    if (fierce == item.MsgSeq) {
      return
    } else {
      fierce = item.MsgSeq
    }
    let msgBody = item.MsgBody[0];
    let type = msgBody.MsgType;
    isRefresh = false;
    if (type == TIM.TYPES.MSG_TEXT) {
      let data = {
        from: item.From_Account,
        time: item.MsgTimeStamp,
        sequence: item.MsgSeq,
        payload: {
          text: msgBody.MsgContent.Text
        }
      }
      _that.parseContentMsg(data);
    } else if (type == TIM.TYPES.MSG_CUSTOM) {
      let data = {
        from: item.From_Account,
        time: item.MsgTimeStamp,
        sequence: item.MsgSeq,
        payload: {
          data: msgBody.MsgContent.Data
        }
      };
      let strToObj = JSON.parse(data.payload.data);
      let code = strToObj.code;
      strToObj
      if (code == 10002 || code == 10003 || code == 10001 || code == 10006 || code == 1008) {
        return;
      }
      _that.parsePayloadMsg(data);
    }
  },
  /** 刷新历史记录 */
  refreshData: function () {
    // console.log(userInfo);
    // console.log(verifyLogin(userInfo));
    if (verifyLogin(userInfo)) {
      setTimeout(() => {
        _that.updateMsgView(_that, false);
      }, 400);
      _that.updateMsgView(_that, true);
      wx.navigateTo({
        url: '/pages/authorize/authorize',
      })
      return;
    } else {
      _that.updateMsgView(_that, true);
      // console.log(lastmsgseq);

      if (lastmsgseq > 10) {
        lastmsgseq -= 10;
      }
      _that.getMessageListData(10, lastmsgseq);
    }
  },
  /** 处理历史消息 */
  getMessageListData: function (msgnumber, lastmsgseq) {
    // console.log('lastmsgseq->' + lastmsgseq);
    let data = {
      userid: userInfo.userid,
      roomid: livingRoomInf.roomid,
      msgnumber: msgnumber,
      lastmsgseq: lastmsgseq
    }
    handleHistoryData(_that, data,
      function success(result) {
        let strToObj = JSON.parse(result);
        // console.log(strToObj);
        try {
          let msgHisArr = strToObj.RspMsgList;
          for (let i = 0; i < msgHisArr.length; i++) {
            let item = msgHisArr[i];
            if (item.From_Account != "@TIM#SYSTEM") {
              _that.messgeHisHandler(item);
            }
          }
        } catch (e) {

        }
      },
      function fail(res) {
        if (res.code == 403) {
          cancelLogin();
        }
      });
    setTimeout(() => {
      _that.updateMsgView(_that, false);
    }, 1000);

  },
  updateMsgView: function (_that, isRefresh) {
    _that.setData({
      refreshing: isRefresh,
    });
  },
  /** 解析文本消息 */
  parseContentMsg: function (data) {
    // console.log(data);
    
    let tempArr = _data.messageArr;
    let memberData = wx.getStorageSync(data.from) || {};
    // console.log(memberData);

    if (JSON.stringify(memberData) != '{}') {
      tempArr.push(ordinaryConvertMsgtoHtml(memberData, data));
      if (tempArr.length > 1) {
        tempArr.sort(sortBy('time'), false);
      }
      updateScrollTo(_that, tempArr, isRefresh, RATE);
    } else {
      try {
        geMemberProfile(_that, _global.tim, [data.from],
          function success(result) {
            // console.log(result);
            let item = result[0];
            wx.setStorageSync(data.from, {
              avatar: item.avatar,
              nick: item.nick,
            });
            tempArr.push(ordinaryConvertMsgtoHtml({
              avatar: item.avatar,
              nick: item.nick,
            }, data));
            if (tempArr.length > 1) {
              tempArr.sort(sortBy('time'), false);
            }
            updateScrollTo(_that, tempArr, isRefresh, RATE);
          },
          function fail(res) {
            // console.log(res);
          })
      } catch (e) {
        cancelLogin();
      }
    }
  },























  // 获取Banner图
  getBannerList: function () {
    let params = '';
    var bannerImgList = [];
    var bannerList = [];
    wxapi.getBannerList(params, 'get').
    then(res => {
      if (res.code == 200) {
        // console.log(res);
        bannerList = res.data.bannerList;
        bannerList.forEach(e => {
          bannerImgList.push(e.image);
        });
        _that.setData({
          images: bannerImgList
        })
      } else {
        _that.showToast(res.message);
      }
    })
  },
  // tab切换
  tabClick: function (e) {
    // console.log(e);
    let index = e.currentTarget.id;
    let menuBottom = 114;
    if (index == 0) {
      menuBottom = 114;
    } else if (index == 1) {
      menuBottom = 16;
      if (verifyLogin(userInfo)) {
        wx.navigateTo({
          url: '/pages/authorize/authorize',
        })
        return;
      }
    } else if (index == 2) {
      menuBottom = 16;
      if (verifyLogin(userInfo)) {
        wx.navigateTo({
          url: '/pages/authorize/authorize',
        })
        return;
      }
    } else if (index == 3) {
      menuBottom = 16;
      if (verifyLogin(userInfo)) {
        wx.navigateTo({
          url: '/pages/authorize/authorize',
        })
        return;
      }
    } else if (index == 4) {
      menuBottom = 16;
      if (verifyLogin(userInfo)) {
        wx.navigateTo({
          url: '/pages/authorize/authorize',
        })
        return;
      }
      // _that.setData({
      //   activeIndex:0
      // })
      wx.navigateTo({
        url: '/page/personal-center/pages/persion-center/persion-center',
      })
    }
    _that.updateIptView(false, false, 0, 96, '', 0);
    _that.updataTab(e.currentTarget.offsetLeft, e.currentTarget.id, menuBottom);
  },
  /** 初始化tab */
  updataTab: function (offsetLeft, id, menuBottom) {
    _that.setData({
      sliderOffset: offsetLeft,
      activeIndex: id,
      menuBottom: menuBottom,
    });
  },




  /** 登陆验证event */
  sendInputTap: function () {
    loginAuthEvent();
  },
  /**
   * 失去焦点
   */
  inputBlur(e) {
    // console.log(this.data.key_height);
    this.setData({
      key_height: 0
    })
    if (this.data.key_height === 281 && !this.data.emojiFlag) {
      this.setData({
        key_height: 0
      })
    }
  },
  /**
   * 获取焦点
   */
  inputFocus(e) {
    let value = e.detail.value;
    let iptParam;
    if (value.length > 0 && value.length < 20) {
      iptParam = {
        hideSend: false,
        iptWidth: 80,
        align: 'center',
      };
    } else {
      iptParam = {
        hideSend: true,
        iptWidth: 80,
        align: 'center',
      };
    }
    _that.updateIptChangeView(_data.key_height, _data.fooerHeight, e.detail.value, iptParam);
    _that.updateIptView(false, true, _data.key_height, _data.fooerHeight, _data.inputValue, 0);
  },
  // 输入文字
  inputChange(e) {
    let value = e.detail.value;
    if (value.length == 0) {
      let iptParam = {
        hideSend: true,
        iptWidth: 80,
        align: 'center',
      };
      _that.updateIptChangeView(_data.key_height, _data.fooerHeight, e.detail.value, iptParam);
    } else if (value.length > 0 && value.length < 10) {
      let iptParam = {
        hideSend: false,
        iptWidth: 80,
        align: 'center',
      };
      _that.updateIptChangeView(_data.key_height, _data.fooerHeight, e.detail.value, iptParam);
    } else {
      if (value.length < 70) {
        _that.updateIptChangeView(_data.key_height, _data.fooerHeight, e.detail.value, _data.footerParam);
      } else {
        _that.updateIptChangeView(_data.key_height, _data.fooerHeight, value.slice(0, 70), _data.footerParam);
        _that.show('最多可输入70个文字');
      }
    }
  },
  /** 输入文本高度改变 */
  inputHeightChange(e) {
    if (!_data.inputValue) return;
    let count = e.detail.lineCount;
    let fooerHeight = _data.fooerHeight;
    let iptParam;
    if (count > 1) {
      lineCount = 96 * (count / 10) * 2;
      iptParam = {
        hideSend: false,
        iptWidth: 80,
        align: 'flex-end',
      };
    } else {
      lineCount = 0;
      iptParam = {
        hideSend: true,
        iptWidth: 80,
        align: 'center',
      };
    }
    let footerValue = 96 + lineCount;
    _that.updateIptChangeView(_data.key_height, footerValue, _data.inputValue, iptParam);
  },


  /** 输入文本高度改变 */
  updateIptChangeView: function (isKeyH, isFooter, inputValue, footerParam) {
    _that.setData({
      key_height: isKeyH,
      fooerHeight: isFooter,
      inputValue: inputValue,
      footerParam: footerParam
    })
  },






  /**
   * 发送文本
   */
  inputSend(e) {
    let content;
    if (e.detail) {
      content = e.detail.value;
    } else {
      content = e;
    }
    // console.log('发送文本->' + content);
    if (content == '') {
      _that.show('发送的消息不能为空');
    }
    _that.checkSendDirtyWord(content);
    // _that.updateIptView(false, false, 0, 96, '', _data.inputValue);
    // console.log(_data.inputValue);
    _that.updateIptView(false, false, 0, 96, '', 0);
  },
  checkSendDirtyWord: function (content) {
    let params = {
      word: content,
    }
    wxapi.getCheckDirtyWord(params, 'POST')
      .then(res => {
        if (res.code == 200) {
          // console.log(res);
          if (res.data.isDirty == 1) {
            _that.show('请使用文明用语、拒绝广告');
            return;
          }
          let message = tim.createTextMessage({
            to: avChatRoomId,
            conversationType: TIM.TYPES.CONV_GROUP,
            payload: {
              text: content
            }
          });
          let promise = tim.sendMessage(message);
          promise.then(function (imResponse) {
            // console.log('发送成功');
            // console.log(imResponse);
            isRefresh = true;
            _that.parseContentMsg(imResponse.data.message);
            _that.initInputStatusView();
            // console.log(_data.messageArr);

          }).catch(function (imError) {
            // console.warn('sendMessage error:', imError);
            _that.show(imError);
          });
        } else {
          _that.show(res.msg);
        }
      }).catch(err => {
        // console.log('发送失败，请重试');
      });
  },
  /**发送文本按钮 */
  sendContent(e) {
    let text = e.currentTarget.dataset.value;
    if (text == '') {
      _that.show('发送内容不能为空');
      return;
    }
    if (verifyLogin(userInfo)) {
      wx.navigateTo({
        url: '/pages/authorize/authorize',
      })
      return;
    }
    _that.inputSend(text);
  },















  /**
   * emoji点击发送
   */
  emojiSend(e) {
    let val = _data.inputValue;
    _that.inputSend(val)
  },
  /**
   * emoji组件回调
   */
  emojiCLick(e) {
    // console.log('emojiCLick');
    let val = e.detail;
    // 单击删除按钮，，删除emoji
    if (val == '[删除]') {
      let lastIndex = this.data.inputValue.lastIndexOf('[')
      if (lastIndex != -1) {
        let tempValue = this.data.inputValue.slice(0, lastIndex);
        _that.updateIptView(_data.emojiFlag, false, _data.key_height, _data.fooerHeight, tempValue, 42);
      }
      return
    }
    if (val[0] == '[') { // emoji
      let emojValue = _data.inputValue + val;
      _that.updateIptView(_data.emojiFlag, false, _data.key_height, _data.fooerHeight, emojValue, 42);
    } else {
      this.sendBigEmoji(val)
    }
  },
  /**
   * 发送大的emoji:实际上是type=3的自定义消息
   */
  sendBigEmoji(val) {
    wx.showLoading({
      title: '发送中...',
    })
    let catalog = ''
    if (val[0] === 'a') {
      catalog = 'ajmd'
    } else if (val[0] === 'x') {
      catalog = 'xxy'
    } else if (val[0] === 'l') {
      catalog = 'lt'
    }
    let content = {
      code: 20002,
      type: 3,
      data: {
        catalog,
        chartlet: val,
        subType: 3,
      }
    }
    let str = JSON.stringify(content);
    _that.sendCustomMsgJson(str, '贴图表情');
    _that.initInputStatusView();
    _that.updateIptView(false, false, 0, 96, '', 0);
  },
  /** 发送自定义消息文本 */
  sendCustomMsgJson: function (msg_body, desc) {
    var _that = this;
    var _data = _that.data;
    let message = tim.createCustomMessage({
      to: avChatRoomId,
      conversationType: TIM.TYPES.CONV_GROUP,
      payload: {
        data: msg_body,
        description: desc
      }
    });
    isRefresh = true;
    let promise = tim.sendMessage(message);
    promise.then(function (imResponse) {
      wx.hideLoading();
      // console.log(imResponse);
      _that.parseContentMsg(imResponse.data.message);
    }).catch(function (imError) {
      wx.hideLoading();
      // console.warn('sendMessage error:', imError);
    });
  },
  /**
   * 切换出emoji键盘
   */
  toggleEmoji() {
    if (verifyLogin(userInfo)) {
      wx.navigateTo({
        url: '/pages/authorize/authorize',
      })
      return;
    }
    if (!_data.emojiFlag) {
      _that.updateIptView(!_data.emojiFlag, false,
        _data.key_height, _data.fooerHeight, _data.inputValue, 42);
    } else {
      _that.updateIptView(!_data.emojiFlag, false,
        _data.key_height, _data.fooerHeight, _data.inputValue, 0);
    }
  },
  /**
   * 阻止事件冒泡空函数
   */
  stopEventPropagation() {},
  //
  updateRedPacketView: function (isPacket, entity, index, tempArr) {
    _that.setData({
      isRed_packet: isPacket,
      red_packet_entity: entity,
      red_packet_index: index,
      messageArr: tempArr,
    })
  },
  /**
   * 收起所有输入框
   */
  chatingWrapperClick(e) {
    this.foldInputArea()
  },
  /**
   * 收起键盘
   */
  foldInputArea() {
    _that.updateIptView(false, false, _data.key_height, _data.fooerHeight, _data.inputValue, 0);
  },



  // emojiFlag  表情选择框显示
  updateIptView: function (isEmoj, isFoucus, isKeyH, isFooter, inputValue, bt) {
    _that.setData({
      emojiFlag: isEmoj,
      focusFlag: isFoucus,
      key_height: isKeyH,
      fooerHeight: isFooter,
      inputValue: inputValue,
      bottomHeight: bt
    })
  },
  // 输入栏
  initInputStatusView: function () {
    let iptParam = {
      hideSend: true,
      iptWidth: 90,
      align: 'center',
    };
    _that.setData({
      footerParam: iptParam,
      inputValue: '',
    })
  },


  /** 领取红包 */
  getRedEnvelopes: function (e) {
    // console.log('领取红包->' + e.currentTarget.dataset.index);
    let red_index = e.currentTarget.dataset.index;
    if (verifyLogin(userInfo)) {
      wx.navigateTo({
        url: '/pages/authorize/authorize',
      })
      return;
    }
    let userid = userInfo.userid;
    let messageArr = _data.messageArr || [];
    // console.log(messageArr);

    let item = messageArr[red_index];
    redid = item.redid;
    let data = {
      userid: userid,
      redid: redid
    }
    wxapi.getAddRedPacketInf(data, 'POST')
      .then(res => {
        let result = res.data;
        // console.log(res);
        if (res.code == 200) {
          _that.updateRedPacketView(true, result[0], red_index, messageArr);
        } else if (res.code == 401 || res.code == 402) {
          item.packetColor = '#fce1c3';
          item.red_packet_img = '../../images/packet_1.png';
          let objResult, amount;
          if (res.code == 402) {
            item.get_red = '已抢光';
            objResult = result[0];
            amount = -1;
          } else {
            objResult = result;
            amount = objResult.amount;
            item.get_red = '已领取';
          }
          let userid = objResult.userid;
          redid = objResult.redid;
          let red_packet_entity = {
            nickname: fileterNickName(objResult.nickname),
            avatarurl: objResult.avatarurl,
            blessingword: objResult.blessingword,
            surplusnumber: objResult.surplusnumber,
            number: objResult.number,
            totalamount: objResult.totalamount
          };
          let str = encodeURIComponent(JSON.stringify(red_packet_entity));
          wx.navigateTo({
            url: '/pages/red_packet_detail/red_detail?amount=' + amount + '&userid=' + userid + '&redid=' + redid + '&key=' + str
          })
          item.font_color = '#ffffff';
          item.isRedPacket = true;
          messageArr[red_index] = item;
          _that.updateRedPacketView(
            _data.isRed_packet,
            _data.red_packet_entity,
            _data.red_packet_index,
            messageArr);
        } else {
          _that.show(res.msg);
        }
      }).catch(err => {
        _that.show('抢红包错误');
      });
  },

  /** 拆红包 */
  openRedPacket: function (e) {
    let red_packet_index = e.currentTarget.dataset.index;
    // console.log('red_packet_index->' + red_packet_index);
    let userid = userInfo.userid;
    let tempArr = _data.messageArr || [];
    if (tempArr.length > 0) {
      let item = tempArr[red_packet_index];
      redid = item.redid;
      let data = {
        userid: userid,
        redid: redid
      }
      wx.showLoading({
        title: '加载中...',
      })
      wxapi.getJoinRedPacket(data, 'POST')
        .then(res => {
          if (res.code == 200) {
            let result = res.data;
            // console.log('result->' + result);
            let item = tempArr[red_packet_index];
            item.packetColor = '#fce1c3';
            item.red_packet_img = '../../images/packet_1.png';
            item.get_red = '已领取';
            item.font_color = '#ffffff';
            item.isRedPacket = true;
            tempArr[red_packet_index] = item;
            _that.openRedPacketView(tempArr);
            let amount = res.data;
            let red_packet_entity = _data.red_packet_entity;
            let str = encodeURIComponent(JSON.stringify(red_packet_entity));
            wx.navigateTo({
              url: '/pages/red_packet_detail/red_detail?amount=' + amount +
                '&userid=' + userid + '&redid=' + item.redid + '&key=' + str
            })
          } else if (res.code == 403) {
            _that.show(res.msg);
            item.packetColor = '#fce1c3';
            item.red_packet_img = '../../images/packet_1.png';
            item.get_red = '已抢光';
            item.font_color = '#ffffff';
            item.isRedPacket = true;
            tempArr[red_packet_index] = item;
            _that.openRedPacketView(tempArr);
          }
          _that.hideRedPModal();
        }).catch(err => {
          if (err.code == 403) {
            _that.show(res.msg);
            // console.log('result->' + result);
            let item = tempArr[red_packet_index];
            item.packetColor = '#fce1c3';
            item.red_packet_img = '../../images/packet_1.png';
            item.get_red = '已抢光';
            item.font_color = '#ffffff';
            item.isRedPacket = true;
            tempArr[red_packet_index] = item;
            _that.openRedPacketView(tempArr);
          } else {
            _that.show('网络异常，请再次重试');
          }
          _that.hideRedPModal();
        });
    }
  },
  openRedPacketView: function (tempArr) {
    _that.setData({
      messageArr: tempArr,
    })
  },


  /** 进入直播间获取当前秒杀、乐优选信息 */
  getActivityInfo() {
    // console.log("进入直播间获取当前秒杀、乐优选信息");

    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) return;
    let params = {
      userid: userInfo.userid,
      roomid: userInfo.roomid
    }
    wxapi.getCurrentActInf(params, "POST")
      .then(res => {
        // console.log(res);

        if (res.code === 200) {
          let secondskillid = wx.getStorageSync('secondskillid') || "";
          let questionid = wx.getStorageSync('questionid') || "";
          let collageid = wx.getStorageSync('collageid') || "";

          if (res.data.goodsSecondsKill !== null) {
            wx.setStorageSync('secondskillid', res.data.goodsSecondsKill.secondskillid);
            this.getSecondsKill(res.data.goodsSecondsKill.secondskillid);
          } else if (secondskillid) {
            this.getSecondsKill(secondskillid);
          };

          if (res.data.questionActivity !== null) {
            wx.setStorageSync('questionid', res.data.questionActivity.questionid)
            this.getQuestionActivity(res.data.questionActivity.questionid);
          } else if (questionid) {
            this.getQuestionActivity(questionid);
          };

          if (res.data.goodsCollage !== null) {
            wx.setStorageSync('collageid', res.data.goodsCollage.collageid)
            this.getCollageDetail(res.data.goodsCollage.collageid);
          } else if (collageid) {
            this.getCollageDetail(collageid);
          };
        } else {
          this.showToast(res.msg)
        }
      })
  },



  /** 获取当前乐优选信息 */
  getQuestionActivity(questionid) {
    // console.log("获取当前乐优选信息");
    this.setData({
      answer_color: "",
      myanswer: "",
      question_end: false,
      wxTimerList: {},
      question_text: "距离开始",
    })
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo.userid || !questionid) return;
    let params = {
      userid: userInfo.userid,
      questionid: questionid
    }
    wxapi.getOptimalInfo(params, "POST")
      .then(res => {
        // console.log("答题", res);
        if (res.code === 200) {
          // console.log("=================================1353");
          let resData = {
            ...res.data
          };
          resData.starttime = util.timestampToTime(+resData.starttime);
          resData.endtime = util.timestampToTime(+resData.endtime);
          this.setData({
            questionActivity_data: resData,
            question_nowTime: +res.systime,
            question_endTime: +res.data.endtime,
            question_starttime: +res.data.starttime,
          })
          if (this.data.questionActivity_data.myanswer) {
            this.setData({
              answer_color: this.data.questionActivity_data.myanswer,
              myanswer: this.data.questionActivity_data.myanswer
            })
          }
          if (+res.systime >= +res.data.endtime) {
            this.setData({
              question_end: true
            })
          } else {
            this.setData({
              question_end: false
            })
          }
          let question_cutdown = this.data.question_starttime - this.data.question_nowTime;

          if (question_cutdown > 0) {
            this.setData({
              isStart: false,
              timeColor1: 'red'
            })
            let time_cutdown = util.time_tranform(question_cutdown);
            if (wxTimer1) wxTimer1.stop();
            wxTimer1 = null;
            wxTimer1 = new timer({
              beginTime: time_cutdown,
              name: 'wxTimer1',
              complete: () => {

              }
            })
            wxTimer1.start(this);

            setTimeout(() => {
              this.question_countDown(question_cutdown); //倒计时
            }, question_cutdown)
          } else {
            this.question_countDown(0); //倒计时
          }
        } else {
          this.showToast(res.msg)
        }
      })
  },
  // 乐优选倒计时
  question_countDown: function (question_cutdown) {
    this.setData({
      isStart: true,
    })
    var question_nowTime = this.data.question_nowTime + question_cutdown; //服务器时间（时间戳）
    var question_endTime = new Date(this.data.question_endTime).getTime(); //结束时间（时间戳）
    var time = (question_endTime - question_nowTime); //距离结束的毫秒数
    let time_cutdown = util.time_tranform(time);
    if (time > 0) {
      this.setData({
        timeColor1: 'white'
      })
    }
    if (wxTimer1) {
      this.setData({
        question_text: "距离结束",
      })
      wxTimer1.stop();
    }
    wxTimer1 = null;
    wxTimer1 = new timer({
      beginTime: time_cutdown,
      name: 'wxTimer1',
      complete: () => {
        if (!this.data.myanswer) return;
        if (this.data.myanswer === this.data.questionActivity_data.realanswer) {
          this.showToast("恭喜答题正确,奖品已发至我的订单")
        } else {
          this.showToast("很遗憾！答题错误")
        }
        this.setData({
          question_end: true,
        })
      }
    })
    wxTimer1.start(this);
  },
  /** 乐优选答题 */
  question_answer(e) {
    if (!wx.getStorageSync('questionid')) {
      this.showToast("暂无有奖问答活动")
      return;
    }
    if (!this.data.isStart) {
      this.showToast("有奖问答还未开始")
      return;
    }
    if (this.data.question_end) {
      this.showToast("有奖问答已经结束")
      return;
    }
 
    let userInfo = wx.getStorageSync('userInfo');
    let questionid = wx.getStorageSync('questionid');
    let myanswer = this.data.myanswer;
    let sel_answer = e.currentTarget.dataset.answer;
    if (myanswer) {
      //修改答案
      if (myanswer != sel_answer) {
        this.setData({
          answer_color: sel_answer
        })
        let params = {
          userid: userInfo.userid,
          questionid: questionid,
          answer: myanswer
        }

        wxapi.cancelJoinAnswerOpt(params, "POST")
          .then(res => {
            return new Promise(resolve => {
              resolve(res)
            });
          })
          .then(resp => {
            if (resp.code === 200) {
              let params = {
                userid: userInfo.userid,
                questionid: questionid,
                answer: sel_answer
              }
              wxapi.joinAnswerOpt(params, "POST")
                .then(res => {
                  if (res.code === 200) {
                    this.setData({
                      myanswer: sel_answer
                    })
                  }
                })
            } else {
              this.showToast(resp.msg)
            }
          })
      }
    } else {
      //首次答题
      if (!this.data.answer_color) {
        this.setData({
          answer_color: sel_answer
        })
        let params = {
          userid: userInfo.userid,
          questionid: questionid,
          answer: sel_answer
        }
        wxapi.joinAnswerOpt(params, "POST")
          .then(res => {
            if (res.code == 200) {
              this.setData({
                myanswer: sel_answer
              })
              wx.hideLoading()
            } else {
              this.showToast(res.msg)
            }
          })
      }
    }
  },


  /** 获取当前限时秒信息 */
  getSecondsKill(secondskillid) {

    _that.setData({
      secondsKill_text: "距离开始"
    })

    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo.userid || !secondskillid) return;
    let params = {
      userid: userInfo.userid,
      secondskillid: secondskillid,
      roomid: userInfo.roomid
    }
    wxapi.getSecKillInf(params, "POST")
      .then(res => {

        if (res.code === 200) {
          let resData = {
            ...res.data
          };
          resData.starttime = util.timestampToTime(+resData.starttime);
          resData.endtime = util.timestampToTime(+resData.endtime);
          wx.setStorageSync('secondsKill_deliverType', res.data.deliverytype);
          this.setData({
            secondsKill_data: resData,
            secondsKill_nowTime: +res.systime,
            secondsKill_endTime: +res.data.endtime,
            secondsKill_starttime: +res.data.starttime,
          })


          let secondsKill_cutdown = this.data.secondsKill_starttime - this.data.secondsKill_nowTime;
          if (secondsKill_cutdown > 0) {
            this.setData({
              timeColor2: 'red'
            })

            let time_cutdown = util.time_tranform(secondsKill_cutdown);
            if (wxTimer2) wxTimer2.stop();
            wxTimer2 = null;
            wxTimer2 = new timer({
              beginTime: time_cutdown,
              name: 'wxTimer2',
              complete: () => {}
            })
            wxTimer2.start(this);

            setTimeout(() => {
              this.secondskillid_countDown(secondsKill_cutdown); //倒计时
            }, secondsKill_cutdown)
          } else {

            this.secondskillid_countDown(0);; //倒计时
          }
        } else {
          this.showToast(res.msg)
        }
      })
  },
  // 限时秒倒计时
  secondskillid_countDown: function (secondsKill_cutdown) {
    var secondsKill_nowTime = this.data.secondsKill_nowTime + secondsKill_cutdown; //服务器时间（时间戳）
    var secondsKill_endTime = new Date(this.data.secondsKill_endTime).getTime(); //结束时间（时间戳）
    var time = (secondsKill_endTime - secondsKill_nowTime); //距离结束的毫秒数
    let time_cutdown = util.time_tranform(time);
    if (time > 0) {
      this.setData({
        timeColor2: 'white'
      })
    }
    if (wxTimer2) {
      _that.setData({
        secondsKill_text: "距离结束"
      })
      wxTimer2.stop();
    }
    wxTimer2 = null;
    wxTimer2 = new timer({
      beginTime: time_cutdown,
      name: 'wxTimer2',
      complete: () => {}
    })
    wxTimer2.start(this);
  },
  /** 参与秒杀 */
  goBuySecondsKillGoods() {
    if (!wx.getStorageSync('secondskillid')) {
      this.showToast("暂无商品秒杀活动")
      return;
    }
    let userInfo = wx.getStorageSync('userInfo');
    let secondskillid = wx.getStorageSync('secondskillid');
    let params = {
      userid: userInfo.userid,
      secondskillid: secondskillid,
      roomid: userInfo.roomid
    }
    wxapi.getJoinSecKillInf(params, "POST")
      .then(res => {
        if (res.code === 200 || res.code == 402) {
          wx.navigateTo({
            url: `../order-pay/order-pay?orderid=${res.data}`,
          })
        } else {
          this.showToast(res.msg)
        }
      })
  },


  /** 获取拼团购详情 */
  getCollageDetail(collageid) {
    this.setData({
      collage_text: "距离开始"
    })
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo.userid || !collageid) return;
    let params = {
      userid: userInfo.userid,
      collageid: collageid,
    }
    if (collageid)
      wxapi.getGoodsCollageInfo(params, "POST")
      .then(res => {

        if (res.code === 200) {
          this.data.process = (res.data.totalVotes / res.data.pricelist[res.data.pricelist.length - 1].number) * 100;
          this.data.process = this.data.process < 20 ? "" : this.data.process;
          this.data.process = this.data.process > 100 ? 100 : this.data.process;
          this.setData({
            // process: this.data.process
            process: Math.round(this.data.process)
          })
          wx.setStorageSync('gc_deliverType', res.data.deliverytype);
          let resData = {
            ...res
          };
          resData.data.pricelist.shift();
          // let photourl = this.img_transform(res.data.photourl);

          this.setData({
            collageDetail: resData.data,
            pricelist: resData.data.pricelist,
            price_last: resData.data.pricelist[resData.data.pricelist.length - 1].price,
            collage_nowTime: +resData.systime,
            collage_endTime: +resData.data.endtime,
            collage_starttime: +resData.data.starttime,
          })

          let arr = this.data.pricelist
          for (let i = 0; i < arr.length; i++) {
            if (this.data.collageDetail.totalVotes < +arr[i].number) {
              this.setData({
                current_price: i == 0 ? this.data.collageDetail.totalamount : +arr[i - 1].price
              })
              break;
            } else if (this.data.collageDetail.totalVotes >= +arr[arr.length - 1].number) {
              this.setData({
                current_price: arr[arr.length - 1].price
              })
            }
          }
          let collage_cutdown = this.data.collage_starttime - this.data.collage_nowTime;
          if (collage_cutdown > 0) {
            let time_cutdown = util.time_tranform(collage_cutdown);
            this.setData({
              join_or_buy: "",
              timeColor3: 'red'
            })
            if (wxTimer3) wxTimer3.stop();
            wxTimer3 = null;
            wxTimer3 = new timer({
              beginTime: time_cutdown,
              name: 'wxTimer3',
              complete: () => {

              }
            })
            wxTimer3.start(this);

            setTimeout(() => {
              this.collage_cutdown(collage_cutdown); //倒计时
            }, collage_cutdown)
          } else {
            this.collage_cutdown(0); //倒计时
          }
        } else {
          this.showToast(res.msg)
        }
      })
  },
  //拼团购倒计时
  collage_cutdown: function (collage_cutdown) {
    this.setData({
      join_or_buy: "立即参与",
    })
    var collage_nowTime = this.data.collage_nowTime + collage_cutdown; //服务器时间（时间戳）
    var collage_endTime = new Date(this.data.collage_endTime).getTime(); //结束时间（时间戳）
    var time = (collage_endTime - collage_nowTime); //距离结束的毫秒数
    if (time > 0) {
      this.setData({
        timeColor3: 'white'
      })
    }
    let time_cutdown = util.time_tranform(time);
    if (time_cutdown === "00:00:00") {
      this.setData({
        join_or_buy: "立即购买",
        showModal: false
      })
    }

    if (wxTimer3) {
      this.setData({
        collage_text: "距离结束"
      })
      wxTimer3.stop();
    }
    wxTimer3 = null;
    wxTimer3 = new timer({
      beginTime: time_cutdown,
      name: 'wxTimer3',
      complete: () => {
        this.setData({
          join_or_buy: "立即购买",
          showModal: false
        })
      }
    })
    wxTimer3.start(this);
  },
  //用户参与拼团or购买商品
  join_now: throttle(function () {
    if (this.data.join_or_buy === "立即参与") {
      this.data.showModal = !this.data.showModal;
      this.setData({
        showModal: this.data.showModal
      })
    } else {
      this.goBuy()
    }
  }, 2000),

  join_no() {
    this.showToast('拼团购活动暂未开启')
  },
  //用户参与拼团
  join_colllage() {
    let userInfo = wx.getStorageSync('userInfo');
    if (this.data.ticket_input > 99 || this.data.ticket_input < 1) {
      this.showToast("购买数量限制为1-99")
      return
    }
    let params = {
      userid: userInfo.userid,
      collageid: wx.getStorageSync('collageid'),
      number: this.data.ticket_input,
      openid: userInfo.openid,
    }
    wxapi.joinCollage(params, "POST")
      .then(res => {
        if (res.code === 200) {
          let payMessage = JSON.parse(res.data.payMessage);
          wx.requestPayment({
            timeStamp: payMessage.timeStamp,
            nonceStr: payMessage.nonceStr,
            package: payMessage.package,
            signType: 'MD5',
            paySign: payMessage.paySign,
            success: res => {
              if (res.errMsg === "requestPayment:ok") {
                this.showToast("支付成功")
                this.setData({
                  showModal: false
                })
                this.getCollageDetail(wx.getStorageSync('collageid'));
              }
            }
          })
        } else {
          this.showToast(res.msg)
        }
      })
  },
  //用户购买拼团商品
  goBuy() {
    if (!wx.getStorageSync('collageid')) {
      this.showToast("暂无拼团活动")
      return;
    }

    wx.navigateTo({
      url: `../order-pay/order-pay?type=2`,
    })
  },

  //票数输入框
  ticket_input(e) {
    this.setData({
      ticket_input: e.detail.value
    })
  },

  //票数选择
  ticket_sel(e) {
    this.setData({
      ticket_input: e.target.dataset.num
    })
  },

  //减号监听
  ticket_reduce() {
    if (this.data.ticket_input <= 0) return;
    this.data.ticket_input = +this.data.ticket_input - 1
    this.setData({
      ticket_input: this.data.ticket_input
    })
  },

  //加号监听
  ticket_add() {
    this.data.ticket_input = +this.data.ticket_input + 1
    this.setData({
      ticket_input: this.data.ticket_input
    })
  },

  //点击图片放大展示
  img_click(e) {
    let i = e.currentTarget.dataset.index;
    if (i !== undefined || i !== null) {
      this.setData({
        current_img: this.data.photourl[i]
      })
    }
    this.data.img_show = !this.data.img_show;
    this.setData({
      img_show: this.data.img_show
    })
  },

  //图片字符串转数组
  img_transform(imgs) {
    if (imgs.includes(",")) {
      return imgs.split(',');
    } else {
      let imglist = [];
      imglist.push(imgs)
      return imglist
    }
  },


  /** 红包 */
  togglehb: throttle(function () {
    if (verifyLogin(userInfo)) {
      wx.navigateTo({
        url: '/pages/authorize/authorize',
      })
      return;
    }
    let userid = userInfo.userid;
    let roomid = livingRoomInf.roomid
    wx.navigateTo({
      url: '/pages/red_paper/index?userid=' + userid + '&roomid=' + roomid,
    })
  }, 1000),
  /** 发送红包消息 */
  sendRedBag: function () {
    if (verifyLogin(userInfo)) {
      return;
    }
    let userid = userInfo.userid;
    let openid = _global.openid;
    let roomid = livingRoomInf.roomid
    isRefresh = true;
    let data = {
      userid: userid,
      roomid: roomid,
      totalamount: _data.redAmount,
      number: _data.redNumPeople,
      redtype: 1,
      blessingword: _data.redLabel,
      openid: openid,
    }
    sendRedEnvelopes(_that, data,
      function success(result) {
        let payMessage = JSON.parse(result.payMessage);
        requestPay(payMessage);
      },
      function fail(res) {
        secKillDlgSuccess(res.msg, function success() {})
      });
  },

  updateCollageDlgView: function (isShow, isRed_packet, selectKillPro) {
    _that.setData({
      isRed_packet: isRed_packet,
    })
  },
  /** 隐藏红包对话框 */
  hideRedPModal: function () {
    _that.updateCollageDlgView(_data.isStartCollageShow, false, _data.selectKillPro);
  },

  onRedPacketCancel: function () {
    this.hideRedPModal();
  },

  /**显示提示信息 */
  showToast(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1000
    })
  },
 

  /**
   * 横屏
   */
  landscapeClick: function () {
    if (!_data.isFullScreen) {
      videoContext.requestFullScreen({
        direction: 90
      });
    } else {
      videoContext.exitFullScreen();
    }
  },

  fullChange: function (e) {
    var isfull = e.detail.fullScreen;
    _that.setData({
      isFullScreen: isfull,
    })
  },


  impeachSwitch: function () {
    if (_data.isImpeach) {
      var msgList = _data.messageArr;
      var lastMsg = msgList[msgList.length - 1] || {};
      _that.setData({
        isImpeach: false,
        lastMsgTime: lastMsg.time || 0,
      })
    } else {
      _that.setData({
        isImpeach: true,
      })
    }
  },


  updatePlayView: function (playUrl, isplaying) {
    _that.setData({
      playUrl: playUrl,
      playing: isplaying
    })
  },
  onPlayEvent: function (e) {
    if (e.detail.code == -2301) {
      // _that.show('拉流多次失败');
      // console.log("-2301:++拉流多次失败！！！");
      _that.setData({
        playing: false
      })
    }
    if (e.detail.code == 2004) {
      // console.log("2004:++播放开始！！！");
      _that.setData({
        playing: true
      })
    }
    if (e.detail.code == 2001) {
      // console.log("2001:++已经连接服务器");
    }
    if (e.detail.code == 2002) {
      // console.log("2002:++已经连接 RTMP 服务器,开始拉流");
    }

    if (e.detail.code == 2003) {
      // console.log("2003:++网络接收到首个视频数据包(IDR)");
    }
    if (e.detail.code == 2104) {
      // console.log("2104:++网络来包不稳：可能是下行带宽不足，或由于主播端出流不均匀");
    }
    if (e.detail.code == 2105) {
      // console.log("2105:++当前视频播放出现卡顿");
    }
    if (e.detail.code == 2106) {
      // console.log("2106:++硬解启动失败，采用软解");
    }
    if (e.detail.code == 2107) {
      // console.log("2107:++当前视频帧不连续，可能丢帧");
    }
    if (e.detail.code == 2108) {
      // console.log("2108:++当前流硬解第一个I帧失败，SDK自动切软解");
    }
    if (e.detail.code == 3001) {
      // console.log("3001:++RTMP -DNS解析失败");
    }
    if (e.detail.code == 3002) {
      // console.log("3002:++RTMP服务器连接失败");
    }
    if (e.detail.code == 3003) {
      // console.log("3003:RTMP服务器握手失败");
    }
    if (e.detail.code == 3005) {
      // console.log("3005:RTMP 读/写失败");
    }

  },

  getScroViewHight() {

    //获取屏幕高度
    let winHeight = wx.getSystemInfoSync().windowHeight;
    let winWidth = wx.getSystemInfoSync().windowWidth;
    let rpx = 750 / winWidth;
    let scroH = winHeight * 0.58 - 80 / rpx;
    this.setData({
      scroH: Math.round(scroH)
    })
  }

})