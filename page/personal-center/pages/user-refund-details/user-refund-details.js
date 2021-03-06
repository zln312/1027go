// page/personal-center/pages/user-refund-details/user-refund-details.js
const wxapi = require('../../../../utils/wxapi.js');
let storageUtil = require('../../../../utils/storage.js');
let app = getApp();
var userInfo = storageUtil.get('userInfo');
let _that, _data
Page({
  data: {
    afterSalesId: '',
    orderId: '',
    afterSalesStatus: 'true',
    status:1,
    show:false
  },
  onLoad: function (options) {
   
    this.data.afterSalesId=options.id
    this.getUserAfterSaleDetail(options.id)
  },
  onShow: function () {
    
  },
  // 退款详细
  getUserAfterSaleDetail: function (id) {
    wx.showLoading({
      title: '加载中',
    })
    let params = {
      id: id
    };
    wxapi.getUserAfterSaleDetailUrl(params).then(res => {
      if (res.code == 200) {
        let data = res.data
        let afterSalesStatus // 退款状态
        let problem // 退款原因
        if (+data.status === 1) {
          afterSalesStatus = true
        } else {
          afterSalesStatus = false
        }
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
        var images = data.image.split(",") || [];
        this.setData({
          orderId: data.oid,
          afterSalesStatus: afterSalesStatus,
          refuseDetail: data.refuseDetail,
          photourl: data.photoUrl,
          goodsName: data.goodsName,
          problem: problem,
          refundMoney: data.refundMoney || 0,
          createAt: this.renderTime(data.createAt),
          deadline: data.deadline,
          refundExplain: data.refundExplain,
          image: images,
          refuseRefundTimes: +data.refuseRefundTimes,
          status: data.status,
          imageSize:images.length,
          show:true
          //refuseRefundTimes: 0
        },function(){
          wx.hideLoading();
        })
      } else {
        wx.hideLoading();
      }
    })
  },
  // 撤销申请
  cancellationApplication(e) {
    let _this = this
    let type = e.currentTarget.dataset.type;
    let content = ''
    if (type == 3) {
      content = '确认撤销退款申请'
    } else {
      content = '客服介入订单将冻结,由客服人员进行人工处理,确认进行客服介入吗？'
    }
    wx.showModal({
      content: content,
      success(res) {
        if (res.confirm) {
          let params = {
            id: _this.data.afterSalesId,
            status: +type,
            userId: userInfo.userid,
            refuseDetail: ''
          };
          wxapi.updateUserAfterSaleStatusUrl(params).then(res => {
            if (res.code == 200) {
              wx.navigateBack()
            } else if(res.code == 403) {
              wx.showToast({
                title: "订单以冻结",
                icon: 'none',
                duration: 2000
              })
             // wx.navigateBack()
            } else {
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  // 修改申请
  modificationApplication() {
    wx.navigateTo({
      url: `/page/personal-center/pages/user-refund-edit/user-refund-edit?id=${this.data.afterSalesId}&edit=1`
    })
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
  // 处理时间
  renderTime(date) {
    var dataStr = date.replace(/T/g, ' ').split('.')[0];
    var idata = dataStr.replace(/-/g, '/');
    var date = new Date(+new Date(idata) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return date;
  },
})