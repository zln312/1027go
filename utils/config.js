//const host = '47.96.121.249:8085'
// const host = 'https://www.rraak.cn'
const host = 'https://weixin.1027go.com'
// const host = 'http://localhost:8085'
// const host = 'http://120.92.4.89:8091'
const wxHost = 'https://api.weixin.qq.com'


const config = {
  // 下面的地址配合云端 Server 工作
  host,
  // 登录地址，用于建立会话
  wxAuthInfoUrl: `${host}/liveserver/getWxAuthInfo`,//  获取微信openid
  loginUrl: `${host}/liveserver/login`,//登陆
  queryliveRommUrl: `${host}/liveserver/getLiveRoomList`,//查询直播信息
  userRankingUrl: `${host}/liveserver/getUserRankingCount`,//用户排行榜查询
  auctionDataUrl: `${host}/liveserver/getGoodsAuctionListByRoomid`,//获取一元拍数据
  secKillDataUrl: `${host}/liveserver/getSecondsKillListByRoomid`,///获取限时秒数据
  onLineNumUrl: `${host}/liveserver/getRoomOnLineUserCount`,//房间在线人数
  queryUserBondUrl: `${host}/liveserver/getUserBondInfo`,//查询用户保证金
  rechargeUrl: `${host}/liveserver/addUserBond`,//充值保证金
  joinSecKillUrl: `${host}/liveserver/joinRoomidSecondsKill`,//用户参与秒杀活动
  joinAutionUrl: `${host}/liveserver/joinRoomidGoodsAuction`,//用户参与秒拍活动
  payOrderUrl: `${host}/liveserver/payOrder`,//支付
  secKillInfUrl: `${host}/liveserver/getSecondsKillInfo`,//获取直播秒杀信息
  addRedPacketUrl: `${host}/liveserver/addRedPacket`,//添加红包
  getRedPacketInfUrl: `${host}/liveserver/getRedPacketInfo`,//红包详情
  joinRedPacketUrl: `${host}/liveserver/joinRedPacket`,//抢红包  
  giveThumbsUpUrl: `${host}/liveserver/dianZanForRoom`,//直播间点赞 
  cancelThumbsUpUrl: `${host}/liveserver/cancelDianZanForRoom`,//取消直播间点赞 
  officialAccUrl: `${host}/liveserver/getPublicUserCount`,//公众号用户数量
  getRedPakcetDetailUrl: `${host}/liveserver/getRedPakcetDetail`,//本次红包拼手气详情
  getStartGoodsAuctionUrl: `${host}/liveserver/startGoodsAuction`,//开始秒拍
  getAuctoinInfUrl: `${host}/liveserver/getGoodsAuctionInfo`,//获取秒拍信息 
  getAuctionMaxPriceUrl: `${host}/liveserver/getGoodsAuctionMaxPrice`,//查询秒拍最高拍卖信息
  getOrderListUrl: `${host}/liveserver/getOrderList`,//用户查询购物车
  getOrderDetailUrl: `${host}/liveserver/getOrderDetail`,//订单详情
  getMyWalletUrl: `${host}/liveserver/getMyWalletInfo`,//查询钱包余额
  getMyWalletDetailUrl: `${host}/liveserver/getMyWalletDetail`,//查询用户钱包明细列表  
  getwalletToCashOfWxUrl: `${host}/liveserver/walletToCashOfWx`,//提现到微信 
  getAuccoutInfUrl: `${host}/liveserver/getUserInfo`,//获取用户账号信息
  getSkillListUrl: `${host}/liveserver/getMySecondsKillList`,//获取用户秒杀记录
  getAuctionListUrl: `${host}/liveserver/getMyGoodsAuctionList`,//获取用户秒拍记录 
  getAddUserBankUrl: `${host}/liveserver/addUserBank`,//添加银行卡
  getDeleteBankUrl: `${host}/liveserver/deleteUserBank`,//删除银行卡 
  getBankListUrl: `${host}/liveserver/getUserBankList`,//获取银行卡列表
  walletToCashOfBankUrl: `${host}/liveserver/walletToCashOfBank`,// 钱包提现到银行卡
  redPakcetRecordUrl: `${host}/liveserver/getMyRedPakcetDetail`,// 查询用户红包记录
  currentActUrl: `${host}/liveserver/getCurrentActivityByRoomid`,// 获取当前活动
  getRoomHisMsgUrl: `${host}/liveserver/getRoomHistoryMsg`,
  getVerifyCodeUrl: `${host}/liveserver/getVerifyCode`,//  获取验证码
  verifyPhoneCodeUrl: `${host}/liveserver/verifyPhoneCode`,//  验证手机号  checkUserExist   
  recommendCountUrl: `${host}/liveserver/recommendCount`,//
  checkUserExistUrl: `${host}/liveserver/checkUserExist`,//查询用户是否存在
  getOptimalUrl: `${host}/liveserver/getRoomQuestionActivityInfo`, // 获取乐优选信息
  answerOptimalUrl: `${host}/liveserver/startRoomQuestionActivity`, // 开始答题  
  joinAnswerOptUrl: `${host}/liveserver/answerRoomQuestionActivity`, // 参与答题 
  cancelJoinAnswerOptUrl: `${host}/liveserver/cancelAnswerRoomQuestionActivity`, // 取消参与答题   
  answerResultsUrl: `${host}/liveserver/getRoomQuestionActivityDetail`, // 答题结果列表
  withdrawDepositUrl: `${host}/liveserver/walletToCashOfWx`, // 提现to微信
  questionWinnerUrl: `${host}/liveserver/getMyRoomQuestionActivityWinList`, // 提现to微信
  giveUpPaymentUrl: `${host}/liveserver/giveUpGoodskill`, // 放弃秒杀、
  getGoodsCollageInfoUrl: `${host}/liveserver/getGoodsCollageInfo`, // 拼团详情
  getCollageListUrl: `${host}/liveserver/getMyGoodsCollageList`, // 获取拼团列表
  joinCollageUrl: `${host}/liveserver/joinGoodsCollage`, // 用户参与拼团
  getCollageDetailUrl: `${host}/liveserver/getGoodsCollageDetail`, // 获取拼团砍价详情列表
  buyGoodsCollageUrl: `${host}/liveserver/buyGoodsCollage`, // 用户购买拼团商品
  getStoreInfoUrl: `${host}/liveserver/getStoreInfo`, // 获取加盟商信息
  storeLoginByCodeUrl: `${host}/liveserver/storeLoginByCode`, // 加盟商登陆
  getStoreLoginCodeUrl: `${host}/liveserver/getStoreLoginCode`, // 加盟商登陆验证码
  setCollageConsumedUrl: `${host}/liveserver/setCollageConsumed`, // 拼团核销
  setGoodskillConsumedUrl: `${host}/liveserver/setGoodskillConsumed`, // 秒杀核销
  checkDirtyWordUrl: `${host}/liveserver/checkDirtyWord`, // 内容审核
  getBannerListUrl: `${host}/liveserver/a/banner/list`,   //获取banner列表
  uploadImg: `${host}/liveserver/upload`,   //上传图片
  addUserStoreUrl: `${host}/liveserver/addUserStore`,   //商家认证请求
  getUserStoreDetailUrl: `${host}/liveserver/getUserStoreStatistics`,   //商家数据统计
  getUserStoreByIdUrl: `${host}/liveserver/getUserStoreById`, //商家信息详情
  updateHomeUserStoreUrl: `${host}/liveserver/updateHomeUserStore`, //编辑商家信息

  receivingAddressList: `${host}/liveserver/getUserAddressList`, // 收货地址
  receivingAddressDetailed: `${host}/liveserver/getUserAddressDetail`, // 详细
  receivingAddresspost: `${host}/liveserver/addUserAddress`, // 新增
  receivingAddressput: `${host}/liveserver/updateUserAddress`, // 编辑
  receivingAddressDel: `${host}/liveserver/deleteUserAddress`, // 删除

  storeWithdrawCashUrl: `${host}/liveserver/storeWithdrawCash`, //商家提现
  calOrderPriceUrl: `${host}/liveserver/calOrderPrice`,//计算价格及运费

  userUpdateOrderStatusUrl: `${host}/liveserver/userUpdateOrderStatus`, //用户-确认收货
  addUserAfterSaleUrl: `${host}/liveserver/addUserAfterSale`, //用户-申请退款
  updateUserAfterSaleUrl: `${host}/liveserver/updateUserAfterSale`, //用户-用户修改退款申请
  getUserAfterSaleDetailUrl: `${host}/liveserver/getUserAfterSaleDetail`, //用户/商户-退款详情  
  updateUserAfterSaleStatusUrl: `${host}/liveserver/updateUserAfterSaleStatus`, //用户/商户-修改退款状态

  getUserStoreOrderListUrl:`${host}/liveserver/getUserStoreOrderList`, //商户-我的订单  updateUserAfterSaleStatusUrl

  storeUpdateOrderStatusUrl:`${host}/liveserver/storeUpdateOrderStatus`, //商户-我的订单

  
  getUserRefundListUrl:`${host}/liveserver/getUserRefundList`, //商户-退款列表

  sdkappid: '1400229935', // 填入创建腾讯云通讯应用获取到的 sdkappid
  // appid: "wx13af41ebf7d01815",
  // secret: "61c97a80511c9a5b00331c862a918b80",
  appid: "wx60ea1e4bb697f067",
  secret: "f89dc5ea40549b77247d728818a90c23",
}
module.exports = config
