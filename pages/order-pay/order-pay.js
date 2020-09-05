const wxapi = require('../../utils/wxapi.js');
var storageUtil = require('../../utils/storage.js');
let app = getApp();
let _that, _data, _global;
let userid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: storageUtil.get('userInfo') || {},
    orderid: "", //订单id,
    orderDetail: {}, //订单详情
    my_balance: "", //余额
    rule_sel: true,
    balance_plenty: false,
    clo_input: 1,
    goodsUrl: "",
    current_price: 0,
    goodsName: "",
    num_dis: true,
    balance:0,
    collageDetail: {},
    pricelist: [],
    delivery_type: 1, //0自取 1邮寄
    address_detail: {
      // name:'张大大',
      // phone:'13337374381',
      // address:'贵州省 贵阳市 云岩区 延中社区服务中心 右拐100米电视台门卫室'
    },
    pay_type: 0, //0余额支付 1微信支付
    allprice: 0,
    carriage: 0, //运费
    able_balance: 0, //0 余额充足 2余额不足
    isInCarriage: 0, //0不包含运费 1包含运费
    limit_delivery:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _that = this;
    _data = _that.data;
    userid = options.userid;
    _global = app.globalData;
    if (options.orderid) {
      console.log("=====秒杀订单=====");
      console.log("订单号",options.orderid);
      let de_type = wx.getStorageSync('secondsKill_deliverType');
      console.log("秒杀订单的邮寄方式："+de_type);
      if(de_type!=2){
        console.log("秒杀订单有限制，不可自选！");
        this.setData({
          delivery_type:de_type,
          limit_delivery:true
        })
      }
      //优化前
      // this.setData({
      //   orderid: options.orderid,
      // },function(){
      //   this.getOrderDetail();
      // })
      
      //优化后
      _data.orderid = options.orderid;
      this.getOrderDetail();

      console.log("getOrderDetail");
    } else {
      let de_type = wx.getStorageSync('gc_deliverType');
      console.log("拼团订单的邮寄方式："+de_type);
      if(de_type!=2){
        console.log("拼团订单有限制，不可自选！");
        this.setData({
          delivery_type:de_type,
          limit_delivery:true
        })
      }
        this.getCollageDetail();
    }

    new app.ToastPannel();

    wx.setNavigationBarTitle({
      title: '支付' //页面标题为路由参数
    })
   
   

    //优化后
    _data.userInfo = wx.getStorageSync('userInfo') || {},
    this.getMyWalletDetail();

  },

  goPay1(){
    if (!_data.address_detail.id) {
      _that.tipAddAddress();
      return;
    }
    if(_data.pay_type==0){
      wx.showModal({
        content: '确定使用余额支付？',
        success(res){
          if(res.confirm){
            console.log('确定');
            _that.goPay();
          }else if(res.cancel){
            return;
          }
        }
      })
    }else{
      _that.goPay();
    }
  },

  /**订单支付*/
  goPay() {
    let userInfo = wx.getStorageSync('userInfo');
    if (this.data.orderid) {
      let params = {
        userId: userInfo.userid,
        openId: userInfo.openid,
        orderId: _data.orderid,
        addressId:_data.address_detail.id,
        quantity:_data.clo_input,
        unitPrice:_data.current_price,
        postage:_data.carriage,
        deliveryType:_data.delivery_type,
        buyType:_data.pay_type==0?'balancePay':'wxPay'
      }
      _that.wxRequest(params);
    } else {
     let params = {
       userid:userInfo.userid,
       collageid:wx.getStorageSync('collageid'),
       number:_data.clo_input
     }
      wxapi.buyGoodsCollage(params, "POST")
        .then(res => {
          if (res.code === 200) {
            return res
          } else if (res.code === 402) {
            wx.showToast({
              title: "您已提交过一次购买订单，请完成支付",
              icon: 'none',
              duration: 1000
            })
            return res;
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
            return;
          }
        })
        .then(res => {
          if (res) {
            let params = {
              userId: _data.userInfo.userid,
              openId: _data.userInfo.openid,
              orderId: res.data,
              addressId:_data.address_detail.id,
              quantity:_data.clo_input,
              unitPrice:_data.current_price,
              postage:_data.carriage,
              deliveryType:_data.delivery_type,
              buyType:_data.pay_type===0?'balancePay':'wxPay'
            }
            this.wxRequest(params);
          }
        })
    }
  },


  onShow: function () {
    // _that.addCarriage();
    // if(_data.limit_delivery&&_data.delivery_type==0){
    // _that.isEnableBalance();
    // return;
    // }
    _that.getAddressList();
    _that.isEnableBalance();
  },

  //微信支付
  wxRequest(params) {
    wxapi.getPayOrderInf(params, "POST")
      .then(res => {
        if (res.code === 200) {
          if(!res.data.payMessage){
            if(res.data){
              wx.showToast({
                title: '余额支付成功',
                icon:'none',
                duration:2000,
                success: function(){
                  setTimeout(function(){
                    wx.navigateBack()
                  },2000)
                }
              })
            }
            return;
          }
          let payMessage = JSON.parse(res.data.payMessage);
          wx.requestPayment({
            timeStamp: payMessage.timeStamp,
            nonceStr: payMessage.nonceStr,
            package: payMessage.package,
            signType: 'MD5',
            paySign: payMessage.paySign,
            success: res => {
              if (res.errMsg === "requestPayment:ok") {
                wx.showToast({
                  title: '支付成功',
                  icon: 'none'
                })
                wx.navigateBack();
              }
            }
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
  },

  /** 获取钱包余额 */
  getMyWalletDetail() {
    let userInfo = wx.getStorageSync('userInfo');
    let params = {
      userid: userInfo.userid,
    }
    wxapi.getMyWalletInf(params, "POST")
      .then(res => {
        if (res.code === 200) {
          //优化后
          if (this.data.my_balance > this.data.allprice) {
            this.setData({
              balance_plenty: true,
              my_balance: res.data.enableamount
            })
          }else{
            this.setData({
              my_balance: res.data.enableamount
            })
          }   
        } else(
          this.showToast(res.msg)
        )
      })
  },

  /** 获取拼团购详情 */
  getCollageDetail() {
    let userInfo = wx.getStorageSync('userInfo');
    let params = {
      userid: userInfo.userid,
      collageid: wx.getStorageSync('collageid')
    }
    wxapi.getGoodsCollageInfo(params, "POST")
      .then(res => {
        if (res.code === 200) {
          let resData = {
            ...res
          };
          resData.data.pricelist.shift();
          this.setData({
            collageDetail: resData.data,
            pricelist: resData.data.pricelist,
            goodsName: resData.data.goodsname,
            goodsUrl: resData.data.photourl
          })
          let arr = this.data.pricelist
          for (let i = 0; i < arr.length; i++) {
            if (this.data.collageDetail.totalVotes < +arr[i].number) {
            var current_price= (i == 0 ? this.data.collageDetail.totalamount : +arr[i - 1].price);
              this.setData({
                current_price: current_price,
                allprice:current_price
              },function(){
                //处理运费
               _that.addCarriage();
            })
              break;
            } else if (this.data.collageDetail.totalVotes >= +arr[arr.length - 1].number) {
              this.setData({
                current_price: arr[arr.length - 1].price,
                allprice:arr[arr.length - 1].price
              },function(){
                  //处理运费
                 _that.addCarriage();
              })
            }
          }
        } else {
          this.showToast(res.msg)
        }
      })
  },

  //图片字符串转数组
  img_transform(imgs) {
    return imgs.split(',');
  },

  /**获取订单详情*/
  getOrderDetail() {
    let userInfo = wx.getStorageSync('userInfo');
    let params = {
      userid: userInfo.userid,
      orderid: _data.orderid,
    }
    wxapi.getOrderDetailInf(params, "GET")
      .then(res => {
        if (res.code === 200) {
          this.setData({
            current_price: res.data[0].price,
            goodsName: res.data[0].goodsName,
          })
          _that.addCarriage();
          if (res.data[0].photourl.includes(',')) {
            let goodsUrlList = this.img_transform(res.data[0].photourl);
            this.setData({
              goodsUrl: goodsUrlList[0]
            })
          } else {
            this.setData({
              goodsUrl: res.data[0].photourl
            })
          }
        } else {
          this.showToast(res.msg)
        }
      })
  },

  //使用规则选中状态
  rule_sel(e) {
    this.data.rule_sel = !this.data.rule_sel
    this.setData({
      rule_sel: this.data.rule_sel
    })
  },

  //跳转规则说明
  go_rule() {
    wx.navigateTo({
      url: '/page/personal-center/pages/serviecRegulations/serviecRegulations',
    })
  },

  //份数选择
  clo_input(e) {
    this.setData({
      clo_input: +e.detail.value
    })
  },

  /**显示提示信息 */
  showToast(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1000
    })
  },

  /**自取 */
  selfTap: function () {
    _that.setData({
      delivery_type: 0
    },function(){
      _that.addCarriage();
    })
  },

  /**快递 */
  expressTap: function () {
    _that.setData({
      delivery_type: 1
    },function(){
      _that.addCarriage();
    })

  },

  /**选择微信支付 */
  wxpayTap: function () {
    _that.setData({
      pay_type: 1
    })
  },
  /**选择余额支付 */
  balancepayTap: function () {
    _that.setData({
      pay_type: 0
    })
  },

  add_col: function () {
    let clo = _data.clo_input;
    _that.setData({
      clo_input: clo + 1,
    })
    _that.addCarriage();
  },

  delete_col: function () {
    let clo = _data.clo_input;
    if (clo === 1) {
      return;
    }
    _that.setData({
      clo_input: clo - 1,
    })
    _that.addCarriage();
  },

  /**
   * 获取用户收货地址
   */
  getAddressList: function () {
    let userInfo = wx.getStorageSync('userInfo');
    wxapi.receivingAddressList({
      userid: userInfo.userid
    }).then(res => {
      if (res.code == 200) {
        var defAddress;
        var addressList = res.data.addressList;
        if(!addressList){
          _that.setData({
            address_detail:{},
            carriage:0
          })
          wx.showModal({
            title: '提示',
            content:'尚未填写收货地址，请前往填写',
            success(res){
              if(res.confirm){
                _that.addAddressTap();
              }else if(res.cancel){
              }
            }
          })
          return;
        }
        for (var i = 0; i < addressList.length; i++) {
          var addre = addressList[i];
          if (addre.defAddress === 1) {
            defAddress = addre;
            break;
          }
          if (addressList.length - 1 === i) {
            defAddress = addressList[0]
          }
        }
        var address = defAddress.city + ' ' + defAddress.district + ' ' + defAddress.detail
        this.setData({
          address_detail: {
            name: defAddress.name,
            phone: defAddress.phone,
            address: address,
            id: defAddress.id
          }
        },function(){
          _that.addCarriage();
        })
      } else if (res.code == 403) {
      } else {
      }
    })

  },
  /**
   * 添加收获地址
   */
  addAddressTap: function () {
    wx.navigateTo({
      url: '/page/personal-center/pages/receiving-address/receiving-address',
    })
  },
  /**
   * 修改收货地址
   */
  updateAddressTap: function (e) {
    // let id = e.currentTarget.dataset.id;
    // let url = `?type=1&id=${id}`;
    // 编辑
    wx.navigateTo({
      url: '/page/personal-center/pages/receiving-address-list/receiving-address-list?path=orderpay'
    })
  },

  /**
   * 弹窗填写地址
   */
  tipAddAddress: function () {
    wx.showModal({
      title: '提示',
      content: '尚未填写收货地址,请前往填写',
      success(res) {
        if (res.confirm) {
          _that.addAddressTap();
        } else if (res.cancel) {
        }
      }
    })
  },

  /**
   * 计算余额是否充足
   */
  isEnableBalance: function () {
    var balance = parseInt(_data.my_balance);
      
    var allprice = parseInt(_data.allprice);
    
    if (balance < allprice) {
      _that.setData({
        pay_type: 1,
        able_balance: 2
      })
    }else{
      _that.setData({
        able_balance: 0
      })
    }
  },

 
  /**
   * 获取运费
   */
  addCarriage: function(){
 
    if(!_data.address_detail.id){
      _that.setData({
        carriage:0,
        allprice:_data.clo_input * _data.current_price
       },function(){
        _that.isEnableBalance();
       })
       return;
    }
    let userInfo = wx.getStorageSync('userInfo');
     let params = {
      unitPrice : _data.current_price,
       userId :userInfo.userid,
       addressId: _data.address_detail.id,
       quantity : _data.clo_input,
       deliveryType:_data.delivery_type
     }
     wxapi.getcalOrderPrice(params,'PUT').then(res=>{
       if(res.code===200){
         _that.setData({
          carriage:res.data.postage,
          allprice:(res.data.totalPrice).toFixed(2)
         })
         _that.isEnableBalance();
       }else{
       }
     })
  },

})