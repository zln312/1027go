// page/personal-center/pages/merchant-refund-details/merchant-refund-details.js
const wxapi = require('../../../../utils/wxapi');
import {
  renderTime
} from '../../../../utils/util.js';
let app = getApp();
let _that, _data, _global;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo')||{},
    problem:'',
    id:0,
    detail:{

    },
    images:[],
    show:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _that = this;
    _data = _that.data;
    _global = app.globalData;
    let id =options.id;
    _that.setData({
      id:id,
      creatAt:0
    })
    _that.getUserAfterSaleDetail(_data.id);
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
  },

  //获取订单详情
  getUserAfterSaleDetail: function(id){
    let params = {
      id : id
    }

    wxapi.getUserAfterSaleDetailUrl(params,'GET').then(res=>{
   
      if(res.code===200){
        let p= res.data.problem;
        var pStr = '';
        switch (p) {
          case 1:
            pStr = '协商一致退款'
            break;
          case 2:
            pStr = '买错/买多/不想要'
            break;
          case 3:
            pStr = '商家未按时间发货'
            break;  
          case 4:
            pStr= '缺货'
            break;
          default:
            pStr= '其他'
            break;
        }

      
        let imageList = (res.data.image).split(',');
        let creatat= res.data.createAt;
        _that.setData({
          detail:res.data,
          problem : pStr,
          images:imageList,
          imagesLength:imageList.length,
          creatAt: renderTime(creatat),
          show:true
        },function(){
          wx.hideLoading();
        })
      }else{
        wx.hideLoading();
      }
    })
    //wxapi请求获取订单详情
    

  },

  // 拒绝退款
  refuseRefund() {
    let img = _data.detail.photoUrl;
    let name = _data.detail.goodsName;
    let id = _data.detail.id;
    let params = {
      img:img,
      name:name,
      id:id
    }
    let params_json = encodeURIComponent(JSON.stringify(params));
    
    wx.navigateTo({
      url: `/page/personal-center/pages/merchant-refund-explain/merchant-refund-explain?data=${params_json}`
    })
  },
  // 同意退款
  agreeRefund() {
    _that.updateRefund(2,'');
  },

  //变更退款状态
  updateRefund: function(status,refuseDetail){
    let params = {
      id : _data.id,
      status:status,
      userId:_data.userInfo.userid,
      refuseDetail:refuseDetail
    }

    wxapi.updateUserAfterSaleStatusUrl(params,'PUT').then(res=>{
      if(res.code===200){
        wx.navigateBack({
          delta:1
         })
      }else{
        wx.showToast({
          title:res.msg,
          icon:"none"
        }) 
      }
    })

  }

})