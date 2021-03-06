import * as iconBase64Map from '../../../../utils/imageBase64.js'
import config from '../../../../utils/config.js'
const wxapi = require('../../../../utils/wxapi.js');
import {
  showToast,
  throttle,
  cleanCache,
  four_time,
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

  canvasIdErrorCallback: function (e) {
    // console.error(e.detail.errMsg)
  },

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: storageUtil.get('userInfo') || {},
    canvasContent: '',
    canvasData:[],
    conRpx : 1,
    payDate:{},
    state:0,
    storename:'',
    nick:''
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
      title: '商家中心' //页面标题为路由参数
    })
    wx.setNavigationBarColor({
      frontColor: '#fff',
    })
    _that.setData({
      userInfo: wx.getStorageSync('userInfo') || {},
      
    })
    
   
  
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
    this.initDraw(_data.canData);
    _that.setData({
      storename:wx.getStorageSync('storename'),
      nick:wx.getStorageSync('userInfo').nickname
    })
  
    _that.getStoreStatue();
    wx.getSystemInfo({
      success: function (res) {
        _that.setData({
          conRpx: (res.windowWidth / 375).toFixed(4)

        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    _that.getStoreStatue();
    // console.log(_data.payDate);
  
  },

  // 初始化画布绘图
  initDraw: function (canvasData) {
    if(canvasData==undefined||canvasData.length==0){
      canvasData=[0,0,0,0,0,0,0];
    }
    let rpx = _data.conRpx;
    
    let canvasid = 'can';
    //创建canvas上下文
    let ctx = wx.createCanvasContext(canvasid);
    _that.setData({
      canvasContent: ctx
    })
    //格栅总高度
    let y_height = 160 * rpx;

    let x_left = 60 * rpx;
    let x_rigth = 330 * rpx;
    let y = 200 * rpx;
    let data = canvasData;

    let name_data = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    let width = 16 * rpx;
    let radius = 2;
    var maxDate = Math.max.apply(null, data);
    var rec = (y_height / maxDate);

    //绘制rank分级线

    this.getRank(y_height, maxDate,y);

    //绘制柱状图


    let add = (x_rigth - x_left) / (data.length - 1);
    var index = 0;
    data.forEach(v => {
      if(v!=0){
        this.drawColumn(width, v * rec, radius, x_left, y);
      }
     
      this.markDataSort(x_left - 6 * rpx, y + 20 * rpx, name_data[index]);
      index += 1;
      x_left = x_left + add;
    });
    ctx.draw();
  },


  // 绘制柱状图
  drawColumn: function (col_width, col_height, col_radius, start_x, start_y) {
    let ctx = this.data.canvasContent;

    // 移动的点
    var mp = {
      x: start_x,
      y: start_y
    }

    var pi = Math.PI;

    ctx.beginPath(mp.x, mp.y);

    ctx.setFillStyle('#3399FF');
    ctx.setStrokeStyle('#3399FF');

    mp.x = mp.x + col_width - 2 * col_radius;
    ctx.lineTo(mp.x, mp.y);
    ctx.stroke();


    mp.y = mp.y - col_radius;
    ctx.moveTo(mp.x, mp.y);
    ctx.arc(mp.x, mp.y, col_radius, pi / 2, 0, true);

    mp.x = mp.x + col_radius;
    mp.y = mp.y - col_height + 2 * col_radius;
    ctx.lineTo(mp.x, mp.y);

    mp.x = mp.x - col_radius;
    ctx.moveTo(mp.x, mp.y);
    ctx.arc(mp.x, mp.y, col_radius, 0, -pi / 2, true);

    mp.x = mp.x - col_width + 2 * col_radius;
    mp.y = mp.y - col_radius;
    ctx.lineTo(mp.x, mp.y);
    var r_y = mp.y;
    mp.y = mp.y + col_radius;
    ctx.moveTo(mp.x, mp.y);
    ctx.arc(mp.x, mp.y, col_radius, -pi / 2, -pi, true);

    mp.x = mp.x - col_radius;
    mp.y = mp.y + col_height - 2 * col_radius;
    ctx.lineTo(mp.x, mp.y);

    mp.x = mp.x + col_radius;
    ctx.arc(mp.x, mp.y, col_radius, -pi, -pi * 1.5, true);

    mp.x = mp.x + col_width - 2 * col_radius;
    mp.y = mp.y + col_radius;
    ctx.lineTo(mp.x, mp.y);


    ctx.setFillStyle('#3399FF');
    // 适配安卓（菜鸡的二次填充）
    ctx.fillRect(start_x, r_y, col_width - 2 * col_radius, col_height);
    ctx.fillRect(start_x - col_radius, r_y + col_radius, col_width, col_height - col_radius * 2);

    ctx.fill();
    ctx.stroke();


  },



  // 求图表rank
  getRank: function (y_heigth, maxDate,y) {
    var rankNum = Math.ceil(y_heigth / 4);
    var rankList = [y, y - rankNum, y - 2 * rankNum, y - 3 * rankNum, y - 4 * rankNum];

    if(maxDate!=0&&maxDate / 4<1 ){
      var add = (maxDate / 4).toFixed(2);
      
    }else{
      var add = parseInt(maxDate / 4);
    }
    if(add==0.00){
      add=0;
    }
    var nameList = [0, add, 2 * add, 3 * add, maxDate];
    var i = 0;
    rankList.forEach(e => {
      this.drawBackground(e);
      this.markRankName(e - 3, nameList[i]);
      i += 1;
    })
  },

  //画rank分级线
  drawBackground: function (e) {
    let rpx = _data.conRpx;
    let ctx = this.data.canvasContent;
    let start_x = 20 * rpx;
    let start_y = e;
    let end_x = 350 * rpx;
    ctx.moveTo(start_x, start_y);
    ctx.setStrokeStyle('#F0F2F5');
    ctx.lineTo(end_x, start_y);
    ctx.stroke();
  },

  //标记分级线名称(单位)
  markRankName: function (e, name) {
    let rpx = _data.conRpx;
    let ctx = this.data.canvasContent;
    let maxData = 200;
    let s_x = 15 * rpx;
    let s_y = e ;
    ctx.setFillStyle('#939699');
    ctx.setFontSize(12 * rpx);
    ctx.fillText(parseFloat(name).toFixed(2) , s_x, s_y);
   
  },

  //标记数据分类
  markDataSort: function (x, y, name) {
    let rpx = _data.conRpx;
    let ctx = this.data.canvasContent;
    ctx.setFontSize(12 * rpx);
    ctx.setFillStyle('#939699');
    ctx.fillText(name, x, y);
  },     



  //生成从minNum到maxNum的随机数
    randomNum: function(minNum, maxNum){
    switch(arguments.length) { 
        case 1:
    return parseInt(Math.random() * minNum + 1, 10);
    break;
    case 2:
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    break;
    default: 
                return 0;
    break;
  } 
},

  certification: function(){
   wx.navigateTo({
     url: '../merchant/merchantCert',
   })
  },



  /**
   * 认证状态
   */
  getStoreStatue:function(){
    let storeId = _data.userInfo.storeid;
    
    if (storeId!=''){
      // storeid不为空，查看认证状态
      _that.setData({
        state:1
      })
      _that.getUserStoreDetail();
    }else{
      // console.log('storeId为空，用户未认证');
    }

  },

  //商家数据查询
  getUserStoreDetail: function () {
    var list = four_time();
    let storeId = _data.userInfo.storeid;
    let params = {
      storeid : storeId,
      startTime : list[0],
      endTime:list[1],
      todayStartTime:list[2],
      todayEndTime:list[3]
    }
    wxapi.getUserStoreDetail(params,'GET').then(res=>{
      if(res.code==200){
        let x,y
        if (res.data.todayPay== null) {
          y = '0.00';
        }else {
          y=res.data.todayPay.toFixed(2);
        }
        _that.setData({
          payDate: {
            audit:res.data.audit,
            statisticsList:res.data.statisticsList,
            todayPay:y,
            totalmoney:res.data.totalmoney.toFixed(2),
          }
        })
        var canData =[];
        var data = res.data.statisticsList;
        data.forEach(e=>{
            canData.push(e[1]);
        })
        var first = canData.shift();
        canData.push(first);
         this.initDraw(canData);
       //放入商家本周收款
        _that.setData({
          canvasData: canData
        })
      }else{
        // console.log(res.msg);
      }
    })


  },

  withdrawTap: function() {
   wx.showModal({
    content: '是否将商户余额全部提现到个人余额，提现审核周期为3-7个工作日',
    success(res) {
      if(res.confirm){
        _that.withdraw();
      }else if(res.cancel){
      }
    }
   })
  },

  withdraw: function() {
    let userInfo = _data.userInfo;
    let storeid  = userInfo.storeid;
    let amount = _data.payDate.totalmoney;
    let params = {
      storeId: storeid,
      amount:amount
    }
   wxapi.storeWithdrawCash(params,'POST').then(res=>{
     if(res.code===200){
      _that.getUserStoreDetail();
      wx.showToast({
        title:'提现成功',
        icon:'none'
      },2000)

     }else{
       wx.showToast({
         title: res.msg,
         icon:'none'
       },2000)
     }

   })
  },
  // 退款/售后
  refundAfterSale() {
    wx.navigateTo({
      url: `/page/personal-center/pages/merchant-refund-list/merchant-refund-list`
    })
  },
  // 我的订单
  myOrder() {
    wx.navigateTo({
      url: `/page/personal-center/pages/my-order-merchant-list/my-order-merchant-list`
    })
  },
   //商户扫码
   scane: function () {
    //判断用户是否为商户
    if (_data.payDate.audit !=20) {
      wx.showToast({
        title: '尚未商户认证无法使用',
        icon: 'none',
        duration: 3000
      })
      return;
    } 
    let storeid = _data.userInfo.storeid;
      
    //进行扫码核销订单
        wx.scanCode({
          success(res) {
            var obj = JSON.parse(res.result);
            var id = obj.id;
            var type = obj.type;
           var authcode = wx.getStorageSync('authcode');
            _that.setGoodsConsumed(id,type,authcode);
          },
          fail(res){
            // console.log(res);
          }
        });
  },
 

   /**
   * 核销订单
   */
  setGoodsConsumed: function(id,type,authcode){
    let params = {
      orderid: id,
      originType:type,
      authcode:authcode
    }
    wxapi.setGoodskillConsumed(params,'POST').then(res=>{
      if(res.code==200){
        // console.log(res.data);
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1000
        })
        return;
      }else{
        // console.log(res);
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
})



