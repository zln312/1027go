import {
  showToast,
} from '../utils/util.js'

const data = {
  images: [],
  skill_images: [
    'https://longyuebi-1258158335.cos.ap-chengdu.myqcloud.com/1027_image/default-advert.jpg'
  ], //秒杀广告位
  aution_images: [
    'https://longyuebi-1258158335.cos.ap-chengdu.myqcloud.com/1027_image/default-advert.jpg'
  ], //秒杀广告位  
  // "http://img.zcool.cn/community/014056564bd8596ac7251c94eb5559.jpg",
  // "http://img.zcool.cn/community/01e03b58047e96a84a0e282b09e8fc.jpg",
  // "http://pic.90sjimg.com/back_pic/00/00/69/40/d678a42886e0232aaea0d6e69e9b1945.jpg",  
  // 是否显示面板指示点
  params:{
    indicatorDots: true,
    // 滑动方向是否为纵向
    vertical: false,
    // 自动切换
    autoplay: true,
    // 采用衔接滑动
    circular: true,
    // 自动切换时间间隔2s
    interval: 2000,
    // 滑动动画时长0.5s
    duration: 500,
    // 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    previousMargin: 0,
    // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    nextMargin: 0,
  },
}

module.exports = {
  data: data   // 对外暴露的变量名叫myDataPost,对应着内部的dataPost对象   
}