import config from '../utils/config.js'
/**
 * promise化wx接口
 */
function wxPromisify(functionName, params) {
  return new Promise((resolve, reject) => {
    wx[functionName]({
      ...params,
      success: res => resolve(res),
      fail: res => reject(res)
    });
  });
}
/**
 * promise化API接口
 */
function wxApiPromisify(path, method, params) {
  // console.log(path,method,params)
  return new Promise((resolve, reject) => {

    wx.request({
      url: path,
      data: params,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: method,
      success: ({
        statusCode,
        data
      }) => {
        if (statusCode >= 200 && statusCode < 300) {
          resolve(data)
        } else {
          reject({
            ...data,
            message: data.message || data.msg || '服务器开小差了',
          })
        }
      },
      fail: err => {
        reject(err)
      },
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}
/**
 * 登录
 */
function login(params = {}) {
  return wxPromisify('login', params);
}

/**
 * 获取用户信息
 */
function getUserInfo(params = {}) {
  return wxPromisify('getUserInfo', params);
}

/**
 * 获取用户权限
 */
function getSetting(params = {}) {
  return wxPromisify('getSetting', params);
}
/** 验证登录是否过期 */
function checkSession(params = {}){
  return wxPromisify('checkSession', params);
}
/**
 * 获取微信openid
 */
function getApiAuthInfo(params = {}, method) {
  return wxApiPromisify(config.wxAuthInfoUrl, method, params);
}
/**
 * 获取用户信息
 */
function getApiLoginInf(params = {}, method) {
  return wxApiPromisify(config.loginUrl, method, params);
}
/**
 * 加载直播房间信息
 * */
function getApiLiveRoomInf(params = {}, method){
  return wxApiPromisify(config.queryliveRommUrl, method, params);
}
/**
 * 秒杀商品
 */
function getApiSecondsKillInf(params = {}, method) {
  return wxApiPromisify(config.secKillDataUrl, method, params);
}
/**
 * 秒杀一元拍
 */
function getGoodsAuctionListInf(params = {}, method) {
  return wxApiPromisify(config.auctionDataUrl, method, params);
}
/**房间在线人数 */
function getOnLineNumInf(params = {}, method) {
  return wxApiPromisify(config.onLineNumUrl, method, params);
}
/**查询用户保证金 */
function getUserBondInf(params = {}, method) {
  return wxApiPromisify(config.queryUserBondUrl, method, params);
}
/**充值保证金 */
function getAddUserBondInf(params = {}, method) {
  return wxApiPromisify(config.rechargeUrl, method, params);
}
/**用户参与秒杀活动 */
function getJoinSecKillInf(params = {}, method) {
  return wxApiPromisify(config.joinSecKillUrl, method, params);
}
/**用户参与秒拍活动 */
function getJoinAutionInf(params = {}, method) {
  return wxApiPromisify(config.joinAutionUrl, method, params);
}
/**支付 */
function getPayOrderInf(params = {}, method) {
  return wxApiPromisify(config.payOrderUrl, method, params);
}
/**用户排行榜查询 */
function getUserRankingInf(params = {}, method) {
  return wxApiPromisify(config.userRankingUrl, method, params);
}
/**获取直播秒杀信息 */
function getSecKillInf(params = {}, method) {
  return wxApiPromisify(config.secKillInfUrl, method, params);
}
/**发红包 */
function getAddRedPacket(params = {}, method) {
  return wxApiPromisify(config.addRedPacketUrl, method, params);
}
/**红包详情 */
function getAddRedPacketInf(params = {}, method) {
  return wxApiPromisify(config.getRedPacketInfUrl, method, params);
}
/**抢红包 */
function getJoinRedPacket(params = {}, method) {
  return wxApiPromisify(config.joinRedPacketUrl, method, params);
}

/**直播间点赞 */
function giveThumbsUp(params = {}, method) {
  return wxApiPromisify(config.giveThumbsUpUrl, method, params);
}
/**取消直播间点赞 */
function cancelGiveThumbsUp(params = {}, method) {
  return wxApiPromisify(config.cancelThumbsUpUrl, method, params);
}
/**公众号用户数量 */
function getOfficialAccNum(params = {}, method) {
  return wxApiPromisify(config.officialAccUrl, method, params);
}
/**领取红包详情 */
function getRedPakcetDetail(params = {}, method) {
  return wxApiPromisify(config.getRedPakcetDetailUrl, method, params);
}
/** 开始秒拍 */
function getStartGoodsAuction(params = {}, method) {
  return wxApiPromisify(config.getStartGoodsAuctionUrl, method, params);
}
/** 获取秒拍信息 */
function getAuctoinInf(params = {}, method) {
  return wxApiPromisify(config.getAuctoinInfUrl, method, params);
}
/** 查询秒拍最高拍卖信息 */
function getAuctionMaxPrice(params = {}, method) {
  return wxApiPromisify(config.getAuctionMaxPriceUrl, method, params);
}
/**
 * 用户查询购物车
 */
function getOrderListInf(params = {}, method) {
  return wxApiPromisify(config.getOrderListUrl, method, params);
}
/** 订单详情 */
function getOrderDetailInf(params = {}, method) {
  return wxApiPromisify(config.getOrderDetailUrl, method, params);
}
/** 获取钱包余额 */
function getMyWalletInf(params = {}, method) {
  return wxApiPromisify(config.getMyWalletUrl, method, params);
}
/** 获取钱包明细 */
function getMyWalletDetailInf(params = {}, method) {
  return wxApiPromisify(config.getMyWalletDetailUrl, method, params);
}
/**提现到微信 */
function getwalletToCashOfWx(params = {}, method) {
  return wxApiPromisify(config.getwalletToCashOfWxUrl, method, params);
}
/**获取用户账号信息 */
function getAuccoutInf(params = {}, method) {
  return wxApiPromisify(config.getAuccoutInfUrl, method, params);
}
/** 获取用户秒杀记录*/
function getSkillRecord(params = {}, method) {
  return wxApiPromisify(config.getSkillListUrl, method, params);
}
/** 获取用户秒拍记录*/
function getAuctionRecord(params = {}, method) {
  return wxApiPromisify(config.getAuctionListUrl, method, params);
}
/** 添加银行卡*/
function getAddBank(params = {}, method) {
  return wxApiPromisify(config.getAddUserBankUrl, method, params);
}
/** 删除银行卡*/
function getDeleteBank(params = {}, method) {
  return wxApiPromisify(config.getDeleteBankUrl, method, params);
}
/** 获取银行卡列表*/
function getBankList(params = {}, method) {
  return wxApiPromisify(config.getBankListUrl, method, params);
}

/** */
function getWalletToOfBank(params = {}, method) {
  return wxApiPromisify(config.walletToCashOfBankUrl, method, params);
}
/**用户红包记录 */
function getRedPakcetRecord(params = {}, method) {
  return wxApiPromisify(config.redPakcetRecordUrl, method, params);
}
/** 获取当前直播间活动 */
function getCurrentActInf(params = {}, method) {
  return wxApiPromisify(config.currentActUrl, method, params);
}
/** 拉去历史消息 */
function getRoomHisMsg(params = {}, method) {
  return wxApiPromisify(config.getRoomHisMsgUrl, method, params);
}
/** 获取验证码  */
function getVerifyCode(params = {}, method) {
  return wxApiPromisify(config.getVerifyCodeUrl, method, params);
}
/** 验证手机号 */
function getVerifyPhone(params = {}, method) {
  return wxApiPromisify(config.verifyPhoneCodeUrl, method, params);
}
/** 验证手机号  */
function getRecCount(params = {}, method) {
  return wxApiPromisify(config.recommendCountUrl, method, params);
}
/** 查询用户是否存在 */
function checkUserExist(params = {}, method) {
  return wxApiPromisify(config.checkUserExistUrl, method, params);
}

/** 获取乐优选信息 */
function getOptimalInfo(params = {}, method) {
  return wxApiPromisify(config.getOptimalUrl, method, params);
}

/** 开始答题 */
function startAnsOptimal(params = {}, method) {
  return wxApiPromisify(config.answerOptimalUrl, method, params);
}
/** 参与答题 */
function joinAnswerOpt(params = {}, method) {
  return wxApiPromisify(config.joinAnswerOptUrl, method, params);
}
/** 取消参与答题 */
function cancelJoinAnswerOpt(params = {}, method) {
  return wxApiPromisify(config.cancelJoinAnswerOptUrl, method, params);
}
/** 答题结果列表 */
function getAnsResults(params = {}, method) {
  return wxApiPromisify(config.answerResultsUrl, method, params);
}
/** 提现to微信 */
function getWithdrawDeposit(params = {}, method) {
  return wxApiPromisify(config.withdrawDepositUrl, method, params);
}
/** 获取乐优选活动答题获胜者列表 */
function getQuestionWinner(params = {}, method) {
  return wxApiPromisify(config.questionWinnerUrl, method, params);
}

/** 放弃秒杀 */
function giveUpPayment(params = {}, method) {
  return wxApiPromisify(config.giveUpPaymentUrl, method, params);
}
/** 获取拼团详情 */
function getGoodsCollageInfo(params = {}, method) {
  return wxApiPromisify(config.getGoodsCollageInfoUrl, method, params);
}


/** 获取拼团列表 */
function getCollageList(params = {}, method) {
  return wxApiPromisify(config.getCollageListUrl, method, params);
}
/** 用户参与拼团 */
function joinCollage(params = {}, method) {
  return wxApiPromisify(config.joinCollageUrl, method, params);
}
/** 获取拼团砍价详情列表 */
function getCollageDetail(params = {}, method) {
  return wxApiPromisify(config.getCollageDetailUrl, method, params);
}
/** 用户购买拼团商品 */
function buyGoodsCollage(params = {}, method) {
  return wxApiPromisify(config.buyGoodsCollageUrl, method, params);
}
/** 获取加盟商消息 */
function getStoreInfo(params = {}, method) {
  return wxApiPromisify(config.getStoreInfoUrl, method, params);
}
/** 加盟商登陆 */
function getStoreLogin(params = {}, method) {
  return wxApiPromisify(config.storeLoginByCodeUrl, method, params);
}
/** 加盟商验证码 */
function getStoreLoginCode(params = {}, method) {
  return wxApiPromisify(config.getStoreLoginCodeUrl, method, params);
}
/** 拼团核销 */
function setCollageConsumed(params = {}, method) {
  return wxApiPromisify(config.setCollageConsumedUrl, method, params);
}
/** 秒杀核销 */
function setGoodskillConsumed(params = {}, method) {
  return wxApiPromisify(config.setGoodskillConsumedUrl, method, params);
}
/** 内容审核 */
function getCheckDirtyWord(params = {}, method) {
  return wxApiPromisify(config.checkDirtyWordUrl, method, params);
}
 
/** 获取banner列表 */
function getBannerList(params = {}, method) {
  return wxApiPromisify(config.getBannerListUrl, method, params);
}  

/** 商家认证 */
function addUserStore(params = {}, method) {
  return wxApiPromisify(config.addUserStoreUrl, method, params);
} 
/** 商家数据 */
function getUserStoreDetail(params = {}, method) {
  return wxApiPromisify(config.getUserStoreDetailUrl, method, params);
}  
/** 商家数据 */
function getUserStoreById(params = {}, method) {
  return wxApiPromisify(config.getUserStoreByIdUrl, method, params);
} 
/** 商家数据 */
function updateHomeUserStore(params = {}, method) {
  return wxApiPromisify(config.updateHomeUserStoreUrl, method, params);
} 

// 商家提现
function storeWithdrawCash(params = {}, method) {
  return wxApiPromisify(config.storeWithdrawCashUrl, method, params);
} 

//商户-我的订单
function getUserStoreOrderList(params = {}, method) {
  return wxApiPromisify(config.getUserStoreOrderListUrl, method, params);
} 

//商户-确认发货
function storeUpdateOrderStatus(params = {}, method) {
  return wxApiPromisify(config.storeUpdateOrderStatusUrl, method, params);
} 

//商户-退款列表
function getUserRefundList(params = {}, method) {
  return wxApiPromisify(config.getUserRefundListUrl, method, params);
}





/** 收货地址 */
function receivingAddressList(params = {}, method = 'GET') {
  return wxApiPromisify(config.receivingAddressList, method, params);
} 
/** 详细 */
function receivingAddressDetailed(params = {}, method = 'GET') {
  return wxApiPromisify(config.receivingAddressDetailed, method, params);
} 
/** 新增 */
function receivingAddresspost(params = {}, method = 'POST') {
  return wxApiPromisify(config.receivingAddresspost, method, params);
} 
/** 编辑 */
function receivingAddressput(params = {}, method = 'PUT') {
  return wxApiPromisify(config.receivingAddressput, method, params);
} 
/** 删除 */
function receivingAddressDel(params = {}, method = 'DELETE') {
  return wxApiPromisify(config.receivingAddressDel, method, params);
} 

 /**获取运费 */
 function getcalOrderPrice(params = {}, method = 'DELETE') {
  return wxApiPromisify(config.calOrderPriceUrl, method, params);
} 

/** 用户 订单详细/退款 */
/**确认收货 */
function userUpdateOrderStatusUrl(params = {}, method = 'PUT') {
  return wxApiPromisify(config.userUpdateOrderStatusUrl, method, params);
} 
/** 申请退款 */
function addUserAfterSaleUrl(params = {}, method = 'POST') {
  return wxApiPromisify(config.addUserAfterSaleUrl, method, params);
} 
/** 用户修改退款申请 */
function updateUserAfterSaleUrl(params = {}, method = 'PUT') {
  return wxApiPromisify(config.updateUserAfterSaleUrl, method, params);
} 
/** 用户/商户-退款详情 */
function getUserAfterSaleDetailUrl(params = {}, method = 'GET') {
  return wxApiPromisify(config.getUserAfterSaleDetailUrl, method, params);
} 
/** 用户/商户-修改退款状态 */
function updateUserAfterSaleStatusUrl(params = {}, method = 'PUT') {
  return wxApiPromisify(config.updateUserAfterSaleStatusUrl, method, params);
} 



module.exports = {
  login,
  getUserInfo,
  getSetting,
  getApiAuthInfo,
  getApiLoginInf,
  getApiLiveRoomInf,
  getApiSecondsKillInf,
  getGoodsAuctionListInf,
  getOnLineNumInf,
  getUserBondInf,
  getAddUserBondInf,
  getJoinSecKillInf,
  getJoinAutionInf,
  getPayOrderInf,
  getUserRankingInf,
  getSecKillInf,
  getAddRedPacket,
  getAddRedPacketInf,
  getJoinRedPacket,
  giveThumbsUp,
  cancelGiveThumbsUp,
  getOfficialAccNum,
  getRedPakcetDetail,
  getStartGoodsAuction,
  getAuctionMaxPrice,
  getOrderListInf, 
  getOrderDetailInf, 
  getMyWalletInf, 
  getMyWalletDetailInf, 
  getwalletToCashOfWx,
  getAuctoinInf,
  getWalletToOfBank,
  getBankList,
  getAuctionRecord,
  getAddBank,
  getDeleteBank,
  getSkillRecord,
  getAuccoutInf,
  getRedPakcetRecord,
  getCurrentActInf,
  getRoomHisMsg,
  getVerifyCode,
  getVerifyPhone,
  getRecCount,
  checkSession,
  checkUserExist,
  getOptimalInfo,
  startAnsOptimal,
  getAnsResults,
  joinAnswerOpt,
  cancelJoinAnswerOpt,
  getWithdrawDeposit,
  getQuestionWinner,

  getCollageList,
  getCollageDetail,
  getGoodsCollageInfo,
  giveUpPayment,
  joinCollage,
  getCollageDetail,
  buyGoodsCollage,
  getStoreInfo,
  getStoreLogin,
  getStoreLoginCode,
  setCollageConsumed,
  setGoodskillConsumed,
  getCheckDirtyWord,
  getBannerList,
  addUserStore,
  getUserStoreDetail,
  getUserStoreById,
  updateHomeUserStore,

  receivingAddressList,
  receivingAddressDetailed,
  receivingAddresspost,
  receivingAddressput,
  receivingAddressDel,

  storeWithdrawCash,

  userUpdateOrderStatusUrl,
  addUserAfterSaleUrl,
  updateUserAfterSaleUrl,
  getUserAfterSaleDetailUrl,
  updateUserAfterSaleStatusUrl,

  getcalOrderPrice,
  getUserStoreOrderList,
  storeUpdateOrderStatus,
  getUserRefundList
}




