import TIM from 'tim-wx-sdk';
import COS from "cos-wx-sdk-v5";
let options = {
  SDKAppID: 1400229935 // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
let tim = TIM.create(options); // SDK 实例通常用 tim 表示
// 注册 COS SDK 插件
tim.registerPlugin({ 'cos-wx-sdk': COS });
function parseGroupTipContent(payload) {
  switch (payload.operationType) {
    case TIM.TYPES.GRP_TIP_MBR_JOIN:
      return `群成员：${payload.userIDList.join(',')}，加入群组`
    case TIM.TYPES.GRP_TIP_MBR_QUIT:
      return `群成员：${payload.userIDList.join(',')}，退出群组`
    case TIM.TYPES.GRP_TIP_MBR_KICKED_OUT:
      return `群成员：${payload.userIDList.join(',')}，被${payload.operatorID}踢出群组`
    case TIM.TYPES.GRP_TIP_MBR_SET_ADMIN:
      return `群成员：${payload.userIDList.join(',')}，成为管理员`
    case TIM.TYPES.GRP_TIP_MBR_CANCELED_ADMIN:
      return `群成员：${payload.userIDList.join(',')}，被撤销管理员`
    default:
      return '[群提示消息]'
  }
}
module.exports = {
  parseGroupTipContent

}