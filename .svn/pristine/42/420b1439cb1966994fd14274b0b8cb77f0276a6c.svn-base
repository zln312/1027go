import {
  showToast,
  checkNetWork,
  generateBigEmojiImageFile,
  generateRichTextNode,
  generateImageNode,
  calcTimeHeader,
  utf16toEntities,
  uncodeUtf16,
  fileterNickName,
  deteleObject
} from '../utils/util.js'
import {
  verifyLogin,
  verifyPhoneNum,
  sortBy
} from '../utils/commonTools.js';
const wxapi = require('../utils/wxapi.js');
import TIM from 'tim-wx-sdk';
import COS from "cos-wx-sdk-v5";

const data = {

};
/** 参与直播间互动 */
function joinChatRoomHandler(_that, isInput, isLogin, iptObj) {
  _that.setData({
    hideInput: isInput,
    hideLoginIpt: isLogin,
  })
}

/** 处理历史记录 */
function handleHistoryData(_that, params, success, fail) {
  wxapi.getRoomHisMsg(params, 'POST')
    .then(res => {
      if (res.code == 200) {
        let result = res.data;
        success(result);
      } else {
        fail(res);
      }
    }).catch(err => {
      console.log('拉取历史消息失败')
    });
}
/**解析普通消息 */
function ordinaryConvertMsgtoHtml(elem, receMsg) {
  if (receMsg.payload.hasOwnProperty("data")) {
    let strToObj = JSON.parse(receMsg.payload.data);
    let subType = strToObj.data.subType;
    if (subType == 1) { //点赞消息
      return Object.assign({}, {
        displayTimeHeader: calcTimeHeader(receMsg.time),
        content: uncodeUtf16(strToObj.data.text),
        subType: strToObj.data.subType,
        time: receMsg.time,
        sequence: receMsg.sequence,
        fromAccountHeadurl: elem.avatar,
        fromAccountNick: fileterNickName(elem.nick),
      });
    } else if (subType == 3) {
      let content = strToObj.data;
      let specifiedObject = {
        nodes: generateImageNode(generateBigEmojiImageFile(content))
      }
      return Object.assign({}, {
        type: 'custom',
        displayTimeHeader: calcTimeHeader(receMsg.time),
        sendOrReceive: 'receive',
        fromAccountHeadurl: elem.avatar,
        fromAccountNick: uncodeUtf16(fileterNickName(elem.nick)),
        time: receMsg.time,
        sequence: receMsg.sequence,
      }, specifiedObject);
    }
  } else {
    let specifiedObject = {
      nodes: generateRichTextNode(receMsg.payload.text)
    }
    return Object.assign({}, {
      type: 'text',
      displayTimeHeader: calcTimeHeader(receMsg.time),
      sendOrReceive: 'receive',
      fromAccountHeadurl: elem.avatar,
      fromAccountNick: uncodeUtf16(fileterNickName(elem.nick)),
      time: receMsg.time,
      d_time:parseInt(receMsg.time/100),
      sequence: receMsg.sequence,
      content: receMsg.payload.text,
      impeachment:{
        top:  Math.ceil(Math.random() * 80),
        time: Math.ceil(Math.random() * 5 +5),
        color: lightColorGen(),
        date:parseInt(Date.parse(new Date())/100000),
      }
    }, specifiedObject);
  }
}
 
/**
 * @function lightColorGen - 亮色生成器
 * @param { Number } minLight - 最低亮度，在[0, 100]区间
 * @returns { String } 颜色
 */
function lightColorGen(){
  var minLight = 59;
  var mH = 360;  // 色相环角度范围
  var mS = 100;  // 饱和度范围
  var mL = 100 - minLight;  // 亮度范围
  var H = mH * Math.random();
  var S = mS * Math.random();
  var L = minLight + (mL * Math.random());
  return 'HSL('+H+','+S+'%,'+ L+'%)';
}


/** 群提示消息 */
function parseGroupTipContent(_that, payload, usersList) {
  let _data = _that.data;
  switch (payload.operationType) {
    case TIM.TYPES.GRP_TIP_MBR_JOIN:
      // return `群成员：${payload.userIDList.join(',')}，加入群组`
      if (usersList.length > 1) {
        return `${usersList.join(',')}加入直播间`
      } else {
        return `${usersList[0]}加入直播间`
      }
    case TIM.TYPES.GRP_TIP_MBR_QUIT:
      return `群成员：${usersList.join(',')}，退出群组`
    case TIM.TYPES.GRP_TIP_MBR_KICKED_OUT:
      return `群成员：${usersList.join(',')}，被${payload.operatorID}踢出群组`
    case TIM.TYPES.GRP_TIP_MBR_SET_ADMIN:
      return `群成员：${usersList.join(',')}，成为管理员`
    case TIM.TYPES.GRP_TIP_MBR_CANCELED_ADMIN:
      return `群成员：${usersList.join(',')}，被撤销管理员`
    default:
      return '[群提示消息]'
  }
}
/** 解析系统提示消息 */
function jsonConvertMsgtoHtml(_that, elem, message) {
  let _data = _that.data;
  return Object.assign({}, {
    displayTimeHeader: calcTimeHeader(elem.time),
    content: uncodeUtf16(message),
    subType: 2,
    time: elem.time,
    sequence: elem.sequence
  });
}

/** 解析自定义toHtml*/
function ordinaryCustomMsgtoHtml(strToObj, item) {
  return Object.assign({}, {
    type: 'red-packet',
    displayTimeHeader: calcTimeHeader(item.time),
    sendOrReceive: 'receive',
    fromAccountHeadurl: strToObj.avatarurl,
    fromAccountNick: uncodeUtf16(fileterNickName(strToObj.nickname)),
    time: item.time,
    isRedPacket: false,
    red_packet_img: '../../images/packet.png',
    packetColor: '#fa9d3d',
    font_color: '#ffdd00',
    get_red: '点按领取',
    content: strToObj.blessingword,
    redid: strToObj.redid,
    userid: strToObj.userid,
    subType: strToObj.subType
  });
}

/** 解析广告消息 */
function parsingAdvertData(_that, item, time) {
  let _data = _that.data;
  return Object.assign({}, {
    displayTimeHeader: calcTimeHeader(time),
    photourl: item.photourl,
    id: item.id,
    linkurl: item.linkurl,
    userid: item.userid,
    title: item.title,
    // title: '广告标题',
    subType: 4,
    time: time,
  });
}

function updateScrollTo(_that, tempArr, isRefresh, rate) {
  _that.setData({
    messageArr: deteleObject(tempArr),
  })
  if (isRefresh) {
    _that.selectComponent('#recordWrapper').scrollToBottomComponent(tempArr.length * rate);
  }
}
/** 解析秒杀数据信息 */
function parsingSkillData(_that, item, subType) {
  let _data = _that.data;
  let timestamp = (new Date()).valueOf();
  return Object.assign({}, {
    displayTimeHeader: calcTimeHeader(timestamp / 1000),
    goodsname: item.goodsname,
    photourl: item.photourl,
    secondskillid: item.secondskillid,
    starttime: calcTimeHeader(item.starttime / 1000),
    subType: subType,
    time: timestamp / 1000,
  });
}
/** 解析拍卖数据信息 */
function parsingAcutionData(_that, item, subType) {
  let _data = _that.data;
  let timestamp = (new Date()).valueOf();
  return Object.assign({}, {
    displayTimeHeader: calcTimeHeader(timestamp / 1000),
    goodsname: item.goodsname,
    photourl: item.photourl,
    auctionid: item.auctionid,
    starttime: calcTimeHeader(item.starttime / 1000),
    subType: subType,
    time: timestamp / 1000,
  });
}
/** 根据userid 获取成员信息 */
function geMemberProfile(_that, tim, userIDList, success, fail) {
  // let promise =  tim.getUserProfile({ userIDList: userIDList});
  try {
    tim.getUserProfile({
      userIDList: userIDList
    }).then(function(imResponse) {
      // console.log(imResponse.data); // 存储用户资料的数组 - [Profile]
      success(imResponse.data);
    }).catch(function(imError) {
      console.warn('getUserProfile error:', imError); // 获取其他用户资料失败的相关信息
      fail(imError);
    });
  } catch (e) {

  }
}
/** 退出直播间 */
function quitRoom(promise) {
  promise.then(function(imResponse) {
    console.log('退出直播间');
    console.log(imResponse.data.group); // 删除后的群组信息
    console.log(imResponse.data.userIDList); // 被删除的群成员的 userID 列表
  }).catch(function(imError) {
    console.warn('deleteGroupMember error:', imError); // 错误信息
  });
}
module.exports = {
  timData: data,
  joinChatRoomHandler: joinChatRoomHandler,
  ordinaryConvertMsgtoHtml: ordinaryConvertMsgtoHtml,
  handleHistoryData: handleHistoryData,
  parseGroupTipContent: parseGroupTipContent,
  parsingAdvertData: parsingAdvertData,
  jsonConvertMsgtoHtml: jsonConvertMsgtoHtml,
  ordinaryCustomMsgtoHtml: ordinaryCustomMsgtoHtml,
  updateScrollTo: updateScrollTo,
  parsingSkillData: parsingSkillData,
  parsingAcutionData: parsingAcutionData,
  geMemberProfile: geMemberProfile,
  quitRoom: quitRoom
}