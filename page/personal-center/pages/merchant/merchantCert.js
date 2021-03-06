import * as iconBase64Map from '../../../../utils/imageBase64.js'
import config from '../../../../utils/config.js'
const wxapi = require('../../../../utils/wxapi.js');
import {
  showToast,
  throttle,
  cleanCache
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
    submit: {
      contactor:'',
      contactphone:'',
      storename:'',
      maingoods:'',
      address:'',
    },
    doorImgPath:[],
    botImg1Path:[],
    botImg2Path:[],
    subState: false,
    isUpdate:0,
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
     title: '商家认证'//页面标题为路由参数
   })
   wx.setNavigationBarColor({
     frontColor: '#fff',
   })   
   _that.setData({
     userInfo: wx.getStorageSync('userInfo') || {},
   }) 

    _that.checkUpdate();
  },

  userNameInput:function(e){
    var contactor = 'submit.contactor';
   
    _that.setData({
      [contactor]: e.detail.value
    })
    _that.checkStatu();
  },

  phoneNumInput: function(e){
    var contactphone = 'submit.contactphone';
    _that.setData({
      [contactphone]: e.detail.value
    });
    _that.checkStatu();
  },

  shopNameInput: function (e){
    var storename = 'submit.storename';
    _that.setData({
      [storename]: e.detail.value
    });
    _that.checkStatu();
  },

  maingoodsInput: function (e){
    var maingoods = 'submit.maingoods';
    _that.setData({
      [maingoods]: e.detail.value
    });
    _that.checkStatu();
  },
  addressInput: function (e) {
    var address = 'submit.address';
    _that.setData({
      [address]: e.detail.value
    });
    _that.checkStatu();
  },

  //选择图片
  topChooseTap: function(){
    wx.chooseImage({
      count:1,
      success: function(res) {
        _that.setData({
          doorImgPath:res.tempFilePaths
        })
        var filep = res.tempFilePaths[0];
        wx.uploadFile({
          url: config.uploadImg,
          filePath: filep,
          name: 'file',
          success: function(res){
            _that.checkStatu();
            var imageUrl = JSON.parse(res.data).data;
            var newPath = _that.data.doorImgPath;
            newPath.push(imageUrl);
            _that.setData({
              doorImgPath: newPath
            })
            _that.checkStatu();
          }
        })
      },
    })
  },
  //选择上传许可证图片
  //1、营业执照
  botChooseTap1: function () {
    wx.chooseImage({
      count: 1,
      success: function (res) {
        _that.setData({
          botImg1Path: res.tempFilePaths
        });

        var filep = res.tempFilePaths[0];
        wx.uploadFile({
          url: config.uploadImg,
          filePath: filep,
          name: 'file',
          success: function (res) {
            _that.checkStatu();
            var imageUrl = JSON.parse(res.data).data;
            var newPath = _that.data.botImg1Path;
            newPath.push(imageUrl);
            _that.setData({
              botImg1Path: newPath
            })
            _that.checkStatu();
          }
        })
       

      },
    })
  },
  
  //2、卫生许可证
  botChooseTap2: function () {
    wx.chooseImage({
      count: 1,
      success: function (res) {
        _that.setData({
          botImg2Path: res.tempFilePaths
        })
        var filep = res.tempFilePaths[0];
        wx.uploadFile({
          url: config.uploadImg,
          filePath: filep,
          name: 'file',
          success: function (res) {
            var imageUrl = JSON.parse(res.data).data;
            var newPath = _that.data.botImg2Path;
            newPath.push(imageUrl);
            _that.setData({
              botImg2Path: newPath
            })
            _that.checkStatu();
          }
        })
      },
    })
  
  },

  checkStatu: function(){
    var state = 0;
    var submitDate = _that.data.submit;
    for (var index in submitDate) {
      if (submitDate[index] != "") {
        state += 1;
      }
    }
    if (_that.data.doorImgPath.length===2){
       state+=1;
    };
    if (_that.data.botImg1Path.length === 2) {
      state += 1;
    };
    if (_that.data.botImg2Path.length === 2) {
      state += 1;
    };
    if(state===8){
      _that.setData({
        subState: true
      })
    }else{
      _that.setData({
        subState: false
      })
    }
  },

  uploadImg: function (filep){
    wx.uploadFile({
      url: config.uploadImg,
      filePath: filep,
      name: 'file',
      success: function (res) {
        var imageUrl = res.data.data;
        var newPath = (_that.data.doorImgPath).push(imageUrl);
        _that.setData({
          doorImgPath: newPath
        })
      }
    })

  },
  //检查是否为修改商家信息
  checkUpdate: function(){
    let userInfo = wx.getStorageSync('userInfo');
    let storeid = userInfo.storeid;
    let uid = userInfo.userid;
    if (storeid){
      _that.setData({
        isUpdate:1
      })
      
      _that.updateMerchat(uid, storeid);
    }else{
      return;
    }
  },

  //未通过审核，获取商家详细信息
  updateMerchat: function (uid,storeid){
    let params = {
      userid:uid,
      storeid: storeid,
    }
    wxapi.getUserStoreById(params,'POST').then(res=>{
      if(res.code==200){
        var images = res.data.image;
        var imageList= images.split(',');
        _that.setData({
          submit: {
            contactor: res.data.contactor,
            contactphone: res.data.contactphone,
            storename: res.data.storename,
            maingoods: res.data.maingoods,
            address: res.data.address,
          },
          doorImgPath: [imageList[0], imageList[0]],
          botImg1Path: [imageList[1], imageList[1]],
          botImg2Path: [imageList[2], imageList[2]],
        })
        _that.checkStatu();
      }
    })

  },


  subTap: function(){
    let userId = _data.userInfo.userid;
    let storid = _data.userInfo.storeid;
    let inputDate = _data.submit;
    let topImg = _data.doorImgPath[1];
    let bot1Img = _data.botImg1Path[1];
    let bot2Img = _data.botImg2Path[1];
    var images = topImg+','+bot1Img+','+bot2Img;
    
    let params={
      storeid: storid,
      userid: userId,
      storename: inputDate.storename,
      maingoods: inputDate.maingoods,
      contactor: inputDate.contactor,
      contactphone: inputDate.contactphone,
      address: inputDate.address,
      image: images,
    };
    // console.log(params);
    if (_data.isUpdate === 0){
      wxapi.addUserStore(params, "POST").then(res => {
        if (res.code == 200) {
          _that.setData({
            subState: false
          })
          wx.showToast({
            title: '提交成功，该审核期为3个工作日',
            icon: 'none'
          })
          var userinfo = _data.userInfo;
          userinfo.storeid = res.data;
          wx.setStorageSync("userInfo", userinfo);
        
          setTimeout(function () {
            wx.redirectTo({
              url: '/page/personal-center/pages/persion-center/persion-center',
            }) 
          }, 2000)

        } else {
          // console.log(res);
          // console.log(res.msg);
        }
      })
    }else{
      wxapi.updateHomeUserStore(params, "POST").then(res => {
        if (res.code == 200) {
          _that.setData({
            subState: false
          })
          // console.log('商家修改成功');
          // console.log(res);
          wx.showToast({
            title: '提交成功，该审核期为3个工作日',
            icon: 'none'
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '/page/personal-center/pages/persion-center/persion-center',
            })
          }, 2000)

        } else {
          // console.log(res);
          // console.log(res.msg);
        }
      })
    }

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