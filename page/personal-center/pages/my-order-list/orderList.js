
const wxapi = require('../../../../utils/wxapi.js');
let storageUtil = require('../../../../utils/storage.js');
let app = getApp();
let _that, _data ,userid,_global

Page({
  data: {
    userInfo: storageUtil.get('userInfo') || {},
    tabs: ["有效订单", "已失效订单"],
    activeIndex: 0,
    refreshing: false,
    nomore: false,
    detailsList: [],
    unDetailsList:[],
    isShow:false
  },
  onLoad: function (options) {
    _that = this;
    _data = _that.data;
   userid = options.userid;
   _global = app.globalData;

   let orders_op = JSON.parse(options.orderList);
   if(orders_op.length>0){
    _that.sortByOrderList(orders_op);
   }
   new app.ToastPannel();

   wx.setNavigationBarTitle({
     title: '我的订单'//页面标题为路由参数
   }) 
   
   _that.setData({
     userInfo: wx.getStorageSync('userInfo') || {},
   }) 
   
 
  },
  onShow: function () {
     wx.showLoading({
       title: '加载中',
     })
     _that.getAllOrderList();
  },

  // tab按钮
  tabClick: function(e) {
    let index = e.currentTarget.id;

    if (index == 0) {} else if (index == 1) {}

    _that.updataTab(e.currentTarget.offsetLeft, e.currentTarget.id, 0);
  },
  /** 初始化tab */
  updataTab: function(offsetLeft, id, menuBottom) {
    _that.setData({
      sliderOffset: offsetLeft,
      activeIndex: id,
      menuBottom: menuBottom,
    });
  },

  /**
   * 查询用户所有订单
   */
  getAllOrderList: function(){
    let params = {
      userid: _data.userInfo.userid,
      pageNum: 1,
      pageSize: 999,
    };
    wxapi.getOrderListInf(params, 'POST').then(res => {
      if (res.code == 200) {
        _that.sortByOrderList(res.data);
      } else {
        // console.log('查询账单失败');
      }
    })
  },
  /**
   * 订单分类
   */
  sortByOrderList: function(list){
    // console.log(list)
    let usefulList = [];
    let uselessList = [];
    let one = {};
        list.forEach(e=>{
          let oid = e.orderid; // 订单id
          let qid = e.originId; // 赠品id
          let imgUrl =  (e.goodsimage+",").split(",")[0]; // 商品图片
          let goodsname = e.maingoods; // 商品名称
          let time = _that.js_date_time(e.createtime); // 订单时间
          let deliverytype = e.deliverytype // 0自取1邮寄
          let type = e.originType // 0正常购买 1秒杀 2秒拍 4乐优选
          let price = e.payPrice; // 订单价格
          let status = +e.status;  // 订单状态 // 0未支付 1取消 2已支付 3已消费 4已作废 5已发货 6已收货 7退款中
          let afterSaleId = e.afterSaleId // 收货订单
          let orderStatus = _that.orderStatus(status)
          //优乐选订单
          if(type==4){
            one = {
              id : qid,
              imgUrl: imgUrl,
              goodsname: goodsname,
              time: time,
              isopt: 1, // 赠品
              type: type,
              price: price,
              status: status,
              afterSaleId: afterSaleId,
              statusText: status === 2? "未使用" : orderStatus.text
            }
            //优乐选有效订单
            if(!orderStatus.invalid){
              one.invalid = true
               usefulList.push(one);
            }else{
            //优乐选失效订单
              one.statusText = status === 2? "未使用" : orderStatus.text
              one.invalid = false
              uselessList.push(one);
            }
          }else {
            //其他普通订单
            if(deliverytype === 0 && status === 2){
              orderStatus.text = "未使用"
            }
            one = {
              id: oid,
              imgUrl:imgUrl,
              goodsname: goodsname,
              time: _that.js_date_time(e.createtime),
              time: time,
              isopt: 0, // 普通订单
              type: type,
              price: price,
              status: status,
              afterSaleId: afterSaleId,
              statusText: orderStatus.text
            }
            if(!orderStatus.invalid){
              one.invalid = true
              usefulList.push(one);
            }else{
              one.statusText = orderStatus.text
              one.invalid = false
              uselessList.push(one);
            }
          }
        })
        // console.log(usefulList)
        // console.log(uselessList)
        _that.setData({
          detailsList: usefulList,
          unDetailsList: uselessList
        },function(){
          wx.hideLoading();
        })
  },
  // 详细页
  codeTap: function (e) {
    let obj = e.currentTarget.dataset['obj'];
    if (obj.status === 7) {
      wx.navigateTo({
        url: `/page/personal-center/pages/user-refund-details/user-refund-details?id=${obj.afterSaleId}`
      })
    } else {
      wx.navigateTo({
        url: '/page/personal-center/pages/skill-record-details/skill-record-details?id=' + obj.id + '&type=' + obj.type
      })
    }
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
    let dateTime = new Date(parseInt(unixtime))
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    let day = dateTime.getDate();
    let hour = dateTime.getHours();
    let minute = dateTime.getMinutes();
    let second = dateTime.getSeconds();
    let now = new Date();
    let now_new = Date.parse(now.toDateString());  //typescript转换写法
    let milliseconds = now_new - dateTime;
    let timeSpanStr = year + '-' + two(month) + '-' + two(day) + '   ' + two(hour) + ':' + two(minute);
    function two(number){
      if(number<10){
        number="0"+number;
      }
      return number;
    }
    return timeSpanStr;
  }
})