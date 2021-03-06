// page/personal-center/pages/user-refund-edit/user-refund-edit.js
import config from '../../../../utils/config.js'
var storageUtil = require('../../../../utils/storage.js');
const wxapi = require('../../../../utils/wxapi.js');
var userInfo = storageUtil.get('userInfo');
let app = getApp();
Page({
  data: {
    orderMsg: {
      photourl: '',
      goodsname: '',
      price: '',
      postage: '',
      deliverytype: '',
    },
    merchant: {
      storename: '',
      address: ''
    },
    pictureUpload: [{
      example: true,
      picturesLinking: null,
      tempFilePaths: null
    }],
    orderId: '',
    afterSalesId: '',
    problem: '',
    refundExplain: '',
    image: [],
    userId: '',
    refundExplainNumberWords: 0,
    problemText: '请选择',
    reasonForRefund: false,
    imgLength:0
  },

  onLoad: function (options) {
    userInfo = storageUtil.get('userInfo');
    let edit = +options.edit
    if (edit) {
      // console.log("编辑")
      this.setData({
        afterSalesId: options.id
      })
      this.getUserAfterSaleDetail()
    } else {
      // console.log("创建")
      this.setData({
        orderId: options.id
      })
      this.getOrderDetail()
    }
    this.setData({
      edit: edit
    })
  },
  onShow: function () {

  },
  /**订单详细*/
  getOrderDetail: function () {
    let params = {
      userid: userInfo.userid,
      orderid: this.data.orderId
    }
    wxapi.getOrderDetailInf(params, "GET").then(res => {
      if (res.code == 200) {
        var ord = res.data[0];
        this.setData({
          orderMsg: {
            photourl: ord.photourl,
            goodsname: ord.goodsName,
            price: ord.price,
            postage: +ord.postage || 0,
            deliverytype: +ord.deliverytype,
            allprice: ord.payprice
          },
          merchant: {
            storename: ord.storename,
            address: ord.address
          },
        })
      } else {
        // console.log(res.msg);
      }
    })
  },
  // 退款详细
  getUserAfterSaleDetail: function () {
    let params = {
      id: +this.data.afterSalesId
    };
    wxapi.getUserAfterSaleDetailUrl(params).then(res => {
      if (res.code == 200) {
        let data = res.data
        let problem // 退款原因
        let pictureUpload = []
        let image = data.image.split(",")
        switch (+data.problem) {
          case 1:
            problem = '协商一致退款'
            break;
          case 2:
            problem = '买错/买多/不想要'
            break;
          case 3:
            problem = '商家未按时间发货'
            break;
          case 4:
            problem = '缺货'
            break;
          case 5:
            problem = '其他'
            break;
        }
        for(let i of image){
          pictureUpload.push({
            example: false,
            tempFilePaths: i
          })
        }
        this.setData({
          orderId: data.oid, // 售后单 id
          problemText: problem,
          refundExplain: data.refundExplain, // 退款说明
          refundExplainNumberWords: data.refundExplain.length,
          pictureUpload: pictureUpload, // 退款图片 
          image: image,
          status: data.status,
          problem: +data.problem, // 退款原因
          problem_num:data.problem,
          orderMsg: {
            photourl: data.photoUrl, // 商品图片
            goodsname: data.goodsName, // 商品名称
            allprice: data.refundMoney || 0, // 退款金额 
          }
        })
      } else {
        // console.log('查询账单失败');
      }
    })
  },
  // 退款原因
  reasonForRefundShow() {
    this.setData({
      reasonForRefund: this.data.reasonForRefund ? false : true
    })
  },
  reasonForRefund(e) {
    let data = e.currentTarget.dataset
    this.setData({
      problem: data.value,
      problemText: data.content,
      reasonForRefund: this.data.reasonForRefund ? false : true
    })
  },
  // 退款说明
  refundInstructions(e) {
    let value = e.detail.value
    var str = value.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, "");   
    this.setData({
      refundExplain: str,
      refundExplainNumberWords: str.length
    })
  },
  // 选择图片
  pictureUpload: function (e) {
    let _that = this
    let index = e.currentTarget.dataset.index
    let doorImgPath = ''
    if(_that.data.image.length==3){
      return;
    }
    wx.chooseImage({
      count: 1,
      success: function (res) {
        doorImgPath = res.tempFilePaths[0];
        // console.log('临时路径', doorImgPath)
        wx.uploadFile({
          url: config.uploadImg,
          filePath: doorImgPath,
          name: 'file',
          success: function (res) {
            _that.setData({
              [`pictureUpload[${index}].tempFilePaths`]: doorImgPath,
              [`pictureUpload[${index}].example`]: false,
            })
            var imageUrl = JSON.parse(res.data).data;
            let pictureUpload = _that.data.pictureUpload
            let image = _that.data.image
            if(image.length>index){
              image[index] = imageUrl;
            }else{
              image.push(imageUrl);
            }
            
            if (pictureUpload.length < 3) {
              pictureUpload.push({
                example: true,
                tempFilePaths: null,
              });
            }
            _that.setData({
              pictureUpload: pictureUpload,
              image: image,
              imgLength:image.length
            })
          }
        })
      },
    })
  },
  // 删除图片
  deletePicture: function (e) {
    let index = e.currentTarget.dataset.index
    let pictureUpload = this.data.pictureUpload
    let image = this.data.image
    let state = true
    pictureUpload.splice(index, 1)
    image.splice(index, 1)

    pictureUpload.forEach((element, index) => {
      if (element.example) {
        state = false
      }
    })
    if (pictureUpload.length < 3 && state) {
      pictureUpload.push({
        example: true,
        tempFilePaths: null
      });
    }
    this.setData({
      pictureUpload: pictureUpload,
      image: image,
      imgLength:image.length
    })
  },
  /**提交**/
  addUserAfterSaleUrl: function () {
    if(!this.data.problem){
      wx.showToast({
        title: '请选择退款原因',
        icon:'none'
      })
      return;
    }
    let params = {
      problem: +this.data.problem,
      refundExplain: this.data.refundExplain,
      image: this.data.image.toString(),
    }
    if (this.data.edit) {
       params.id = parseInt(this.data.afterSalesId)
      wxapi.updateUserAfterSaleUrl(params).then(res => {
        if (res.code == 200) {
          wx.navigateBack({
            delta: 2
          })
        } else {
        }
      })
    } else {
      params.oid= this.data.orderId,
      params.userId = userInfo.userid
      wxapi.addUserAfterSaleUrl(params).then(res => {
        if (res.code == 200) {
          wx.navigateBack({
            delta: 2
          })
        } else {
        }
      })
    }
  },
})
