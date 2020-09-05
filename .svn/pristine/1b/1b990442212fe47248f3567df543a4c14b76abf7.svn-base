var storageUtil = require('../../../../utils/storage.js');
const wxapi = require('../../../../utils/wxapi.js');
import drawQrcode from '../../../../utils/weapp.qrcode.js'

var userInfo = storageUtil.get('userInfo');
let _that, _data, userid;
let app = getApp();

Page({
  data: {
    defaultLogo: app.globalData.PAGE_CONFIG.defaultLogo,
    id: '',
    type: '',
    orderMsg: {
      photourl: '',
      goodsname: '',
      price: '',
      createtime: '',
      validitytime: '',
    },
    merchant: {
      storename: '',
      address: ''
    },
    opt_orderid: '',
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    _that = this;
    _data = _that.data;
    userInfo = storageUtil.get('userInfo');
    wx.setNavigationBarTitle({
      title: '商品详情' //页面标题为路由参数
    });

    let id = options.id;
    let type = +options.type;
    _that.setData({
      id: id,
      type: type
    })
  },
  // 生命周期函数--监听页面显示
  onShow: function () {
    if (_data.type == 4) {
      _that.getSkillOrderDetil();
    } else {
      _that.getOrderDetail()

    }
  },



  /**优乐选订单 */
  getSkillOrderDetil: function () {
    let params = {
      userid: userInfo.userid,
      questionid: _data.id
    }
    wxapi.getOptimalInfo(params, 'POST').then(res => {
      if (res.code == 200) {
        var ord = res.data;
        _that.setData({
          orderMsg: {
            photourl: (ord.photourl + ',').split(',')[0],
            goodsname: ord.goodsname,
            price: '',
            realprice: '',
            number: ord.number,
            createtime: _that.js_date_time(ord.updatetime),
            validitytime: _that.js_date_time(Number(ord.updatetime) + 7 * 24 * 60 * 60 * 1000),
            termvValidityStart: _that.convertTimestamps(Number(ord.updatetime))[1],
            termvValidityEnd: _that.convertTimestamps(Number(ord.updatetime) + 7 * 24 * 60 * 60 * 1000)[1], 
           

          },
          merchant: {
            storename: ord.storename,
            address: ord.deliveryaddress
          },
          id: ord.orderId
        });
        _that.draw('giftQrcode');
      } else {
        // console.log(res.msg);
      }
    })
  },
  /**其他订单 */
  getOrderDetail: function () {
    let params = {
      userid: userInfo.userid,
      orderid: _data.id
    }
    wxapi.getOrderDetailInf(params, "GET").then(res => {
      if (res.code == 200) {
        var ord = res.data[0];
        _that.setData({
          orderMsg: {
            photourl: ord.photourl,
            goodsname: ord.goodsName,
            price: ord.price,
            allprice: ord.allprice,
            quantity: ord.quantity,
            postage: ord.postage || 0,
            payprice: ord.payprice,
            createtime: _that.convertTimestamps(ord.updatetime)[0],
            paytime: _that.convertTimestamps(ord.paytime)[0],
            termvValidityStart: _that.convertTimestamps(ord.updatetime)[1],
            termvValidityEnd: _that.convertTimestamps(Number(ord.updatetime) + 7 * 24 * 60 * 60 * 1000)[1],  
            orderid: ord.orderid,
            deliverytype: +ord.deliverytype,
            cancelRefundTimes: +ord.cancelRefundTimes,
            //cancelRefundTimes: 1

           validitytime: ord.origintype != 3 ? _that.renderTime(ord.validitytime) : _that.convertTimestamps(Number(ord.updatetime) + 7 * 24 * 60 * 60 * 1000)[1],
           status:ord.state
          },
          merchant: {
            storename: ord.storename,
            address: ord.address
          },
        })
        _that.draw('selfAccessQrcode');
      } else {
        // console.log(res.msg);
      }
    })
  },
 // 二维码
 draw(canvasId, width, height) {
   var obj = {
     id: _data.id,
     type: _data.type
   }
   drawQrcode({
     width: 150,
     height: 150,
     x: 0,
     y: 0,
     canvasId: canvasId,
     typeNumber: 10,
     text: JSON.stringify(obj),
     callback(e) {
      //  console.log('e: ', e)
     }
   })
 },

  // 收货
  confirmReceipt() {
    let params = {
      userId: userInfo.userid,
      orderId: _data.id,
      status: 6
    }
    wxapi.userUpdateOrderStatusUrl(params).then(res => {
      if (res.code == 200) {
        // console.log(res.data);
        wx.navigateBack()
      } else {
        // console.log(res.msg);
      }
    })
  },
  // 退款
  refund(){
    wx.navigateTo({
      url: `/page/personal-center/pages/user-refund-edit/user-refund-edit?id=${this.data.id}&edit=0`, 
    })
  },




  renderTime(date) {
    var dataStr = date.replace(/T/g, ' ').split('.')[0];
    var idata = dataStr.replace(/-/g, '/');
    var date = new Date(+new Date(idata) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return date.split(" ")[0];
  },
  // 日期转换
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
    var timeSpanStr = year + '-' + two(month) + '-' + two(day) + ' ' + two(hour) + ':' + two(minute) + ':' + two(second);

    function two(number) {
      if (number < 10) {
        number = "0" + number;
      }
      return number;
    }
    return timeSpanStr;
  },

  //根据毫秒数获取日期
  convertTimestamps: function (msec) {
    let datetime = new Date(msec);
    let year = datetime.getFullYear();
    let month = ('0' + (datetime.getMonth() + 1)).slice(-2);
    let date = ('0' + datetime.getDate()).slice(-2);
    let hour = ('0' + datetime.getHours()).slice(-2);;
    let minute = ('0' + datetime.getMinutes()).slice(-2);;
    let second = ('0' + datetime.getSeconds()).slice(-2);;
    let result1 = `${year}-${month}-${date} ${hour}:${minute}:${second}`
    let result2 = `${year}-${month}-${date}`
    return [result1, result2]
  },


  
  // 联系商家
  contactCerchants() {
    wx.showModal({
      content: '18374657444',
      confirmText: '呼叫',
      confirmColor: 'rgba(49, 50, 51, 1)',
      success(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '18374657444',
          })
        }
      }
    })
  },
})