import PAGE_CONFIG from '../common/pageConfig.js'
import emojimap from './emojimap.js'
import {
  getPinyin
} from './pinyin.js'
const app = getApp()
var emoji = emojimap.emojiList.emoji

function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTime(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 验证数据长度有效性
 */
function checkStringLength(str, max, min) {
  if (str && str.toString().length <= max && stfr.toString().length >= min) {
    return true
  } else {
    return false
  }
}
/**
 * 首字母大写
 */
function firstLetterUpper(str) {
  let temp = ''.concat(String.fromCodePoint(str[0].toLowerCase().charCodeAt() - 32), str.substr(1))
  console.log(temp)
  return temp
}

/**
 * 检测字符串类型
 * str: 传入待验证的字符串
 * type: 检测类型
 *       string-number : 仅限字母、数字
 *       string-number-hanzi : 仅限中文、字母、汉字
 */
function validStringType(str, type) {
  switch (type) {
    case 'string-number':
      return /^[A-Za-z0-9]+$/.test(str)
    case 'string-number-hanzi':
      return /^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(str)
    case 'email':
      return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str)
    case 'phone':
      return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(str)
    default:
      break
  }
}
/**
 * 字符串数组排序：包含中文字符
 */
function sortStringArray(srcArr) {
  return srcArr.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', {
    sensitivity: 'base'
  }))
}

/**
 * post 方法，接受params参数对象
 */
function post(params) {
  let url = params.url,
    header = params.header || {},
    data = params.data;

  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      header: header,
      method: 'POST',
      success: function (data, statusCode, header) {
        resolve({
          data,
          statusCode,
          header
        })
      },
      fail: function () {
        reject('请求失败，请重试！')
      }
    })
  })
}
/**
 * 封装toast
 */
function showToast(type, text, obj) {
  let param = {
    duration: (obj && obj.duration) || 1500,
    mask: (obj && obj.isMask) || false
  };
  if (text.length > 5) {
    text = text.slice(0, 5) + '\n' + text.slice(5);
  }
  switch (type) {
    case 'text': {
      param['title'] = text || ''
      param['icon'] = 'none'
      break
    }
    case 'loading': {
      param['title'] = text || ''
      param['icon'] = 'loading'
      break
    }
    case 'success': {
      param['title'] = text || ''
      param['icon'] = 'success'
      break
    }
    case 'error': {
      param['title'] = text || ''
      param['image'] = '/images/emoji.png'
      break
    }
    default: {
      break
    }
  }
  wx.showToast(param)
}

/**
 * 深度克隆friendCata
 */
function deepClone(data) {
  let des = {}
  for (let cataKey in data) {
    let desArr = data[cataKey]

    des[cataKey] = []
    desArr.map(item => {
      let temp = {}
      for (let key in item) {
        temp[key] = item[key]
      }
      des[cataKey].push(temp)
    })
  }
  return des
}
/**
 * 计算在线 状态
 * [account,clientType,custom:{1:{net_state:1,online_state:0}},idClient,idServer,serverConfig,time,type,value]
 */
function updateMultiPortStatus(data) {
  if (data.account) {
    let account = data.account
    let multiPortStatus = ''

    function getMultiPortStatus(customType, custom) {
      // 服务器下推多端事件标记的特定序号对应值
      var netState = {
        0: '',
        1: 'Wifi',
        2: 'WWAN',
        3: '2G',
        4: '3G',
        5: '4G'
      }
      var onlineState = {
        0: '在线',
        1: '忙碌',
        2: '离开'
      }

      var custom = custom || {}
      if (customType !== 0) {
        // 有serverConfig.online属性，已被赋值端名称
        custom = custom[customType]
      } else if (custom[4]) {
        custom = custom[4]
        multiPortStatus = '电脑'
      } else if (custom[2]) {
        custom = custom[2]
        multiPortStatus = 'iOS'
      } else if (custom[1]) {
        custom = custom[1]
        multiPortStatus = 'Android'
      } else if (custom[16]) {
        custom = custom[16]
        multiPortStatus = 'Web'
      } else if (custom[64]) {
        custom = custom[64]
        multiPortStatus = 'Mac'
      }
      if (custom) {
        custom = JSON.parse(custom)
        if (typeof custom['net_state'] === 'number') {
          var tempNetState = netState[custom['net_state']]
          if (tempNetState) {
            multiPortStatus += ('[' + tempNetState + ']')
          }
        }
        if (typeof custom['online_state'] === 'number') {
          multiPortStatus += onlineState[custom['online_state']]
        } else {
          multiPortStatus += '在线'
        }
      }
      return multiPortStatus
    }
    // demo自定义多端登录同步事件
    if (+data.type === 1) {
      if (+data.value === 1 || +data.value === 2 || +data.value === 3 || +data.value === 10001) {
        var serverConfig = JSON.parse(data.serverConfig)
        var customType = 0
        multiPortStatus = ''
        // 优先判断serverConfig字段
        if (serverConfig.online) {
          if (serverConfig.online.indexOf(4) >= 0) {
            multiPortStatus = '电脑'
            customType = 4
          } else if (serverConfig.online.indexOf(2) >= 0) {
            multiPortStatus = 'iOS'
            customType = 2
          } else if (serverConfig.online.indexOf(1) >= 0) {
            multiPortStatus = 'Android'
            customType = 1
          } else if (serverConfig.online.indexOf(16) >= 0) {
            multiPortStatus = 'Web'
            customType = 16
          } else if (serverConfig.online.indexOf(64) >= 0) {
            multiPortStatus = 'Mac'
            customType = 64
          }
        }
        if (data.custom && (Object.keys(data.custom).length > 0)) {
          var portStatus = getMultiPortStatus(customType, data.custom)
          // 如果serverConfig里有属性而custom里没有对应属性值
          if ((multiPortStatus !== '') && (portStatus === '')) {
            multiPortStatus += '在线'
          } else {
            multiPortStatus = portStatus
            // multiPortStatus += portStatus
          }
        } else if (customType !== 0) {
          multiPortStatus += '在线'
        } else {
          multiPortStatus = '离线'
        }
        return multiPortStatus
      }
    }
  }
  return '离线'
}
/**
 * 校验并补全字段
 */
function correctData(obj) {
  obj = obj || {}
  let temp = {}
  temp['account'] = obj['account']
  temp['nick'] = obj['nick']
  temp['avatar'] = obj['avatar'] || PAGE_CONFIG.defaultUserLogo
  temp['gender'] = obj['gender'] || '未设置'
  temp['birth'] = obj['birth'] || '未设置'
  temp['tel'] = obj['tel'] || '未设置'
  temp['email'] = obj['email'] || '未设置'
  temp['sign'] = obj['sign'] || '未设置'
  temp['alias'] = obj['alias'] || '未设置'
  temp['remark'] = obj['remark'] || '未设置'
  return temp
}
/**
 * 生成富文本节点
 */
function generateRichTextNode(text) {
  let tempStr = text
  let richTextNode = []
  let leftBracketIndex = tempStr.indexOf('[')
  let rightBracketIndex = tempStr.indexOf(']')
  let countOfWord = 0
  Array.from(tempStr).map(item => {
    if (item != '[' && item != ']') {
      countOfWord++
    }
  })
  if (leftBracketIndex == -1 || rightBracketIndex == -1 || countOfWord == 0) { //没有emoji
    richTextNode.push({
      type: 'text',
      text: tempStr
    })
    return richTextNode
  }
  while (tempStr.length != 0) {
    leftBracketIndex = tempStr.indexOf('[')
    rightBracketIndex = tempStr.indexOf(']')
    if (leftBracketIndex == 0) { // 开头是[
      rightBracketIndex = tempStr.indexOf(']')
      if (rightBracketIndex == -1) {
        richTextNode.push({
          type: 'text',
          text: tempStr
        })
        tempStr = ''
      } else {
        let emojiName = tempStr.slice(0, rightBracketIndex + 1)
        if (emoji[emojiName]) { // 有效emoji
          richTextNode.push({
            name: 'img',
            attrs: {
              width: '30rpx',
              height: '30rpx',
              src: emoji[emojiName].img
            }
          })
        } else { //无效emoji
          richTextNode.push({
            type: 'text',
            text: emojiName
          })
        }
        tempStr = tempStr.substring(rightBracketIndex + 1, tempStr.length)
      }
    } else { // 开头不是[
      if (leftBracketIndex == -1) { // 最后全是文字
        richTextNode.push({
          type: 'text',
          text: tempStr.slice(0, tempStr.length)
        })
        tempStr = ''
      } else {
        richTextNode.push({
          type: 'text',
          text: tempStr.slice(0, leftBracketIndex)
        })
        tempStr = tempStr.substring(leftBracketIndex, tempStr.length + 1)
      }
    }
  }
  return richTextNode
}
/**
 * 输出猜拳图片对象，用于生成富文本图片节点
 */
function generateFingerGuessImageFile(value) {
  let file = {
    w: 50,
    h: 50,
    url: ''
  }
  switch (value) {
    case 1:
      file.url = 'http://yx-web.nos.netease.com/webdoc/h5/im/play-1.png'
      break
    case 2:
      file.url = 'http://yx-web.nos.netease.com/webdoc/h5/im/play-2.png'
      break
    case 3:
      file.url = 'http://yx-web.nos.netease.com/webdoc/h5/im/play-3.png'
      break
    default:
      break
  }
  return file
}
/**
 * 输出贴图表情对象，用于生成富文本图片节点
 * content:"{"type":3,"data":{"catalog":"ajmd","chartlet":"ajmd010"}}"
 */
function generateBigEmojiImageFile(content) {
  let prefix = 'http://yx-web.nosdn.127.net/webdoc/h5/emoji/'
  let file = {
    w: 100,
    h: 100,
    url: ''
  }
  file.url = `${prefix}${content.catalog}/${content.chartlet}.png`
  return file
}
/**
 * 处理图片富文本节点
 */
function generateImageNode(file) {
  // console.log(file)
  let width = 0,
    height = 0
  if (file.w > 250) {
    width = 200
    height = file.h / (file.w / 200)
  } else {
    width = file.w
    height = file.h
  }
  let richTextNode = []
  richTextNode.push({
    name: 'img',
    attrs: {
      width: `${width}rpx`,
      height: `${height}rpx`,
      src: file.url
    }
  })
  return richTextNode
}
/**
 * 单击用户头像，查询并跳转到指定页面
 * friendsCard: 好友名片map；
 * account: 账户，用于判断是否是好友，跳转指定页面；
 * isPush: 新页面是跳转方式，true为压栈，false为重定向
 */
function clickLogoJumpToCard(friendsCard, account, isPush) {
  let app = getApp()
  let friendsAccountArr = Object.keys(friendsCard)
  if (friendsAccountArr.indexOf(account) !== -1) {
    if (isPush === true) {
      wx.navigateTo({
        url: '/partials/personcard/personcard?account=' + account,
      })
    } else {
      wx.redirectTo({
        url: '/partials/personcard/personcard?account=' + account,
      })
    }

  } else {
    app.globalData.nim.getUser({
      account: account,
      done: function (err, user) {
        if (err) {
          console.log(err)
          return
        }
        if (isPush === true) {
          wx.navigateTo({
            url: '/partials/strangercard/strangercard?account=' + user.account,
          })
        } else {
          wx.redirectTo({
            url: '/partials/strangercard/strangercard?account=' + user.account,
          })
        }

      }
    })
  }
}
/**
 * 获取格式化后的好友列表
 * friendCard: 好友列表（含名片信息）
 * 获得 friendCata 、 cataHeader
 */
function getFormatFriendList(friendCard, defaultUserLogo, excludeList) {
  excludeList = excludeList || []
  let friendCardMap = friendCard // key为account，value为该人信息
  let accountArr = Object.keys(friendCardMap) // accounts数组
  let accountMapNick = {} // 存储account映射nickPinyin，方便依据account查找friendCata
  let orderedFriendsCard = [] // 渲染列表常用数据，[{nick: 'test', account: 'nihwo', avatar: 'path', isBlack}]
  // 循环遍历
  accountArr.map(account => {
    if (excludeList.indexOf(account) !== -1) {
      return
    }
    let card = friendCardMap[account]
    // 没有account说明是非好友情况下拉黑
    if (!card.account || card.isFriend == false) {
      return
    }

    let nickPinyin = getPinyin(card.nick, '').toUpperCase()
    let renderCard = {
      'avatar': card.avatar || defaultUserLogo,
      'account': card.account,
      'nick': card.nick,
      'nickPinyin': nickPinyin,
      'status': card.status,
      'isBlack': card.isBlack || false
    }
    // 存储account映射nickPinyin，方便依据account查找friendCata
    accountMapNick[card.account] = nickPinyin
    //刷新视图对象
    orderedFriendsCard.push(renderCard)
  })

  // 排序
  let newOrder = orderedFriendsCard.sort((a, b) => {
    return a.nickPinyin.localeCompare(b.nickPinyin)
  })
  // 数据分类
  let result = {}
  newOrder.map((item, index) => {
    let firstLetter = item.nickPinyin[0]
    if (!firstLetter || !/^[A-Za-z]*$/.test(firstLetter)) { // 非字母
      firstLetter = '#'
    }
    if (!result[firstLetter]) {
      result[firstLetter] = []
    }
    result[firstLetter].push(item)
  })

  // 将#类放置最后
  let tempKeys = Object.keys(result)
  if (tempKeys[0] == '#') {
    tempKeys.push(tempKeys.shift())
  }
  return {
    friendCata: result,
    cataHeader: tempKeys
  }
}
/**
 * 计算多人情况下推拉流组件位置以及宽高
 */
function calculateMeetingPosition(newUserList = [], oldUserList = [], config) {
  config = config || {}
  let containerSize = app.globalData.videoContainerSize // 外部容器大小
  let totalCount = newUserList.length + oldUserList.length // 内部所有video的个数
  let resultUserList = oldUserList.concat(newUserList) // 返回的结果集
  let width = containerSize.width / 3
  let height = width
  const spaceWidth = 5 // 画面间的间隔
  switch (totalCount) {
    case 1: {
      resultUserList[0].config = {
        x: 0,
        y: 0,
        width,
        height
      }
      break
    }
    case 2: {
      resultUserList[0].config = {
        x: 0,
        y: 0,
        width,
        height
      }
      resultUserList[1].config = {
        x: width,
        y: 0,
        width,
        height
      }
      break
    }
    case 3: {
      resultUserList[0].config = {
        x: 0,
        y: 0,
        width,
        height
      }
      resultUserList[1].config = {
        x: width,
        y: 0,
        width,
        height
      }
      resultUserList[2].config = {
        x: width * 2,
        y: 0,
        width,
        height
      }
      break
    }
    case 4: {
      resultUserList[0].config = {
        x: 0,
        y: 0,
        width,
        height
      }
      resultUserList[1].config = {
        x: width,
        y: 0,
        width,
        height
      }
      resultUserList[2].config = {
        x: width * 2,
        y: 0,
        width,
        height
      }
      resultUserList[3].config = {
        x: 0,
        y: height,
        width,
        height
      }
      break
    }
    case 5: {
      resultUserList[0].config = {
        x: 0,
        y: 0,
        width,
        height
      }
      resultUserList[1].config = {
        x: width,
        y: 0,
        width,
        height
      }
      resultUserList[2].config = {
        x: width * 2,
        y: 0,
        width,
        height
      }
      resultUserList[3].config = {
        x: 0,
        y: height,
        width,
        height
      }
      resultUserList[4].config = {
        x: width,
        y: height,
        width,
        height
      }
      break
    }
    case 6: {
      resultUserList[0].config = {
        x: 0,
        y: 0,
        width,
        height
      }
      resultUserList[1].config = {
        x: width,
        y: 0,
        width,
        height
      }
      resultUserList[2].config = {
        x: width * 2,
        y: 0,
        width,
        height
      }
      resultUserList[3].config = {
        x: 0,
        y: height,
        width,
        height
      }
      resultUserList[4].config = {
        x: width,
        y: height,
        width,
        height
      }
      resultUserList[5].config = {
        x: width * 2,
        y: height,
        width,
        height
      }
      break
    }
    case 7: {
      resultUserList[0].config = {
        x: 0,
        y: 0,
        width,
        height
      }
      resultUserList[1].config = {
        x: width,
        y: 0,
        width,
        height
      }
      resultUserList[2].config = {
        x: width * 2,
        y: 0,
        width,
        height
      }
      resultUserList[3].config = {
        x: 0,
        y: height,
        width,
        height
      }
      resultUserList[4].config = {
        x: width,
        y: height,
        width,
        height
      }
      resultUserList[5].config = {
        x: width * 2,
        y: height,
        width,
        height
      }
      resultUserList[6].config = {
        x: 0,
        y: height * 2,
        width,
        height
      }
      break
    }
    case 8: {
      resultUserList[0].config = {
        x: 0,
        y: 0,
        width,
        height
      }
      resultUserList[1].config = {
        x: width,
        y: 0,
        width,
        height
      }
      resultUserList[2].config = {
        x: width * 2,
        y: 0,
        width,
        height
      }
      resultUserList[3].config = {
        x: 0,
        y: height,
        width,
        height
      }
      resultUserList[4].config = {
        x: width,
        y: height,
        width,
        height
      }
      resultUserList[5].config = {
        x: width * 2,
        y: height,
        width,
        height
      }
      resultUserList[6].config = {
        x: 0,
        y: height * 2,
        width,
        height
      }
      resultUserList[7].config = {
        x: width,
        y: height * 2,
        width,
        height
      }
      break
    }
    case 9: {
      resultUserList[0].config = {
        x: 0,
        y: 0,
        width,
        height
      }
      resultUserList[1].config = {
        x: width,
        y: 0,
        width,
        height
      }
      resultUserList[2].config = {
        x: width * 2,
        y: 0,
        width,
        height
      }
      resultUserList[3].config = {
        x: 0,
        y: height,
        width,
        height
      }
      resultUserList[4].config = {
        x: width,
        y: height,
        width,
        height
      }
      resultUserList[5].config = {
        x: width * 2,
        y: height,
        width,
        height
      }
      resultUserList[6].config = {
        x: 0,
        y: height * 2,
        width,
        height
      }
      resultUserList[7].config = {
        x: width,
        y: height * 2,
        width,
        height
      }
      resultUserList[8].config = {
        x: width * 2,
        y: height * 2,
        width,
        height
      }
      break
    }
  }
  return resultUserList
}

function dealMsg(msg, store, app) {
  let account = msg.from
  if (msg.type === 'deleteMsg') {
    store.dispatch({
      type: 'RawMessageList_OppositeRecall_Msg',
      payload: msg
    })
  } else if (msg.type === 'addFriend') { //第三方将自己加到好友列表
    app.globalData.nim.subscribeEvent({
      type: 1, // 订阅用户登录状态事件
      accounts: [account],
      sync: true,
      done: function (err, obj) {
        console.log(err, obj)
      }
    })
    app.globalData.nim.getUser({
      account: account,
      done: function (err, user) {
        if (err) {
          console.log('onSysMsg: getUser: ', err)
          return
        }
        store.dispatch({
          type: 'Notification_Opposite_AddFriend',
          payload: {
            msg,
            desc: `添加好友-${msg.from}添加你为好友`
          }
        })
        store.dispatch({
          type: 'FriendCard_Add_Friend',
          payload: user
        })
      }
    })
  } else if (msg.type === 'deleteFriend') {
    store.dispatch({
      type: 'Notification_Opposite_DeleteFriend',
      payload: {
        msg,
        desc: `删除好友-${msg.from}已将你从他的好友列表中移除`
      }
    })
    store.dispatch({
      type: 'FriendCard_Delete_By_Account',
      payload: account
    })
  } else if (msg.type === 'teamInvite') { // category:"team"
    store.dispatch({
      type: 'Notification_Team_Invite',
      payload: {
        msg,
        desc: `${msg.from}邀请你入群“${msg.attach.team.name}”`
      }
    })
  } else if (msg.type === 'applyTeam') { // category:"team"
    store.dispatch({
      type: 'Notification_Team_Apply',
      payload: {
        msg,
        desc: `${msg.from}申请加入`
      }
    })
  }
}
//直播时间倒计时
function living_date_time(unixtime) {
  var dateTime = new Date(parseInt(unixtime) * 1000)
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString()); //typescript转换写法

  var curYear = now.getFullYear();
  var curMonth = now.getMonth() + 1;
  var curDay = now.getDate();
  var curHour = now.getHours();
  var curMinute = now.getMinutes();
  var curSecond = now.getSeconds();

  var countDownHour = Math.abs((curYear - year) * 12 * 24) + Math.abs((curMonth - month) * 24) + Math.abs(curHour - hour);
  var countDouwnMinute;
  if (minute > curMinute) {
    countDouwnMinute = Math.abs(curMinute - minute);
  } else {
    countDownHour -= 1;
    countDouwnMinute = 60 - curMinute + minute;
  }
  var countDouwnSecond;
  if (second > curSecond) {
    countDouwnSecond = Math.abs(curSecond - second);
  } else {
    countDouwnSecond -= 1;
    countDouwnSecond = 60 - curSecond + second;
  }
  var timeSpanStr = countDownHour + ':' + countDouwnMinute + ':' + countDouwnSecond;
  var timeSpanStr1 = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  //console.log("currentTime->" + timeSpanStr);
  return timeSpanStr;
}
// util.js
//时间戳转换成日期时间
function js_date_time(unixtime) {
  var dateTime = new Date(parseInt(unixtime) * 1000)
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString()); //typescript转换写法
  var milliseconds = now_new - dateTime;
  var timeSpanStr = year + '' + month + '' + day + '' + hour + '' + minute;
  return timeSpanStr;
}

function js_detail_date_time(unixtime) {
  var dateTime = new Date(parseInt(unixtime) * 1000)
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString()); //typescript转换写法
  var milliseconds = now_new - dateTime;
  var timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  return timeSpanStr;
}

function timestampToTime(timestamp) {
  // var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
  // return Y+M+D;
}
/**
 * 输入Unix时间戳，返回指定时间格式
 */
function calcTimeHeader(time) {
  // 格式化传入时间
  let date = new Date(parseInt(time) * 1000)
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  // 获取当前时间
  let currentDate = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth(),
    currentDay = currentDate.getDate()
  // 计算是否是同一天
  if (currentYear == year && currentMonth == month && currentDay == day) { //同一天直接返回
    if (hour > 12 && hour < 20) {
      return `下午 ${hour}:${minute < 10 ? '0' + minute : minute}`
    } else if (hour >= 20) {
      return `晚上 ${hour}:${minute < 10 ? '0' + minute : minute}`
    } else if (hour >= 0 && hour < 7) {
      return `凌晨 ${hour}:${minute < 10 ? '0' + minute : minute}`
    } else {
      return `上午 ${hour}:${minute < 10 ? '0' + minute : minute}`
    }
  }
  // 计算是否是昨天
  let yesterday = new Date(currentDate - 24 * 3600 * 1000)
  if (year == yesterday.getFullYear() && month == yesterday.getMonth && day == yesterday.getDate()) { //昨天
    return `昨天 ${hour}:${minute < 10 ? '0' + minute : minute}`
  } else {
    return `${year}-${month + 1}-${day} ${hour}:${minute < 10 ? '0' + minute : minute}`
  }
}

function plusXing(str, frontLen, endLen) {
  var len = str.length - frontLen - endLen;
  var xing = '';
  for (var i = 0; i < len; i++) {
    xing += '*';
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}
/** 对象是否为空 */
function objectIsNull(object) {
  if (Object.keys(object).length === 0) {
    return false // 如果为空,返回false
  }
  return true // 如果不为空，则会执行到这一步，返回true 
}
/** 防多次点击 */
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null
  // 返回新的函数
  return function () {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments) //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}
/**数组是否为空 */
function isArrayEmpty(value) {
  return (Array.isArray(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
}
/** 将表情转为字符*/
function utf16toEntities(str) {
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则 
  str = str.replace(patt, function (char) {
    var H, L, code;
    if (char.length === 2) {
      H = char.charCodeAt(0); // 取出高位 
      L = char.charCodeAt(1); // 取出低位 
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法 
      return "&#" + code + ";";
    } else {
      return char;
    }
  });
  return str;
}
/**将字符转为表情: */
function uncodeUtf16(str) {
  var reg = /\&#.*?;/g;
  var result = str.replace(reg, function (char) {
    var H, L, code;
    if (char.length == 9) {
      code = parseInt(char.match(/[0-9]+/g));
      H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
      L = (code - 0x10000) % 0x400 + 0xDC00;
      return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
    } else {
      return char;
    }
  });
  return result;
}
/** 过滤昵称 */
function fileterNickName(nickname) {
  let length = nickname.length;
  if (length > 10) {
    let temp = nickname.substring(0, 2) + '**' + nickname.slice(-2);
    return temp;
  } else {
    return nickname;
  }
}

// 处理带T的时间格式
function renderTime(date) {
  var dataStr = date.replace(/T/g, ' ').split('.')[0];
  var idata = dataStr.replace(/-/g, '/');
  var date = new Date(+new Date(idata) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  return date;
}

/** 清空缓存 */
function cleanCache() {
  wx.clearStorage();
  wx.setStorageSync('userInfo', {}); //存储userInfo 
}
/** 去掉数组对象重复 */
function deteleObject(obj) {
  var uniques = [];
  var stringify = {};
  for (var i = 0; i < obj.length; i++) {
    var keys = Object.keys(obj[i]);
    keys.sort(function (a, b) {
      return (Number(a) - Number(b));
    });
    var str = '';
    for (var j = 0; j < keys.length; j++) {
      if (keys[j] != 'impeachment') {
        str += JSON.stringify(keys[j]);
        str += JSON.stringify(obj[i][keys[j]]);
      }
    }
    if (!stringify.hasOwnProperty(str)) {
      uniques.push(obj[i]);
      stringify[str] = true;
    }
  }
  uniques = uniques;
  return uniques;
}

function number_format(number, decimals, dec_point, thousands_sep) {
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

function startHttp(str) {
  return str.indexOf("rtmp");
}
//小于10的格式化函数（0变成02）
function timeFormat(param) {
  return param < 10 ? '0' + param : param;
}
//小于0的格式化函数（不会出现负数）
function timeFormin(param) {
  return param < 0 ? 0 : param;
}
//时间戳转换倒计时时间
function time_tranform(time) {
  let hou = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + parseInt(time / (1000 * 60 * 60 * 24)) * 24;
  let min = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
  let sec = parseInt((time % (1000 * 60)) / 1000);
  hou = this.timeFormat(this.timeFormin(hou)),
    min = this.timeFormat(this.timeFormin(min)),
    sec = this.timeFormat(this.timeFormin(sec))
  let time_cutdown = hou + ":" + min + ":" + sec;
  console.log(time_cutdown);
  return time_cutdown;
}
//获取本周周一零点、周天结束时间点、今天0点、今天结束点
function four_time() {
  var nowTemp = new Date(); //当前时间
  var oneDayLong = 24 * 60 * 60 * 1000; //一天的毫秒数
  var c_time = nowTemp.getTime(); //当前时间的毫秒时间
  var c_day = nowTemp.getDay() || 7; //当前时间的星期几
  var m_time = c_time - (c_day - 1) * oneDayLong; //当前周一的毫秒时间
  var monday = new Date(m_time); //设置周一时间对象
  var SundayTime = c_time + (7 - c_day) * oneDayLong; //显示周日

  //获取当天0点
  let day_start = new Date(new Date(new Date().getTime()).setHours(0, 0, 0, 0));

  //本周一零点
  let week_start = new Date(new Date(new Date(monday).getTime()).setHours(0, 0, 0, 0));

  //获取当天23:59:59
  let day_end = new Date(new Date(new Date().getTime()).setHours(23, 59, 59, 0));

  //获取周天的23:59:59
  let week_end = new Date(new Date(new Date(SundayTime).getTime()).setHours(23, 59, 59, 0));

  var list = [Number(week_start), Number(week_end), Number(day_start), Number(day_end)];
  return list;
}
module.exports = {
  living_date_time,
  calculateMeetingPosition,
  formatDate,
  formatTime,
  formatNumber,
  post,
  firstLetterUpper,
  checkStringLength,
  validStringType,
  sortStringArray,
  calcTimeHeader,
  showToast,
  updateMultiPortStatus,
  correctData,
  deepClone,
  clickLogoJumpToCard,
  generateRichTextNode,
  generateFingerGuessImageFile,
  generateBigEmojiImageFile,
  generateImageNode,
  getFormatFriendList,
  dealMsg,
  plusXing,
  objectIsNull,
  throttle,
  isArrayEmpty,
  utf16toEntities,
  uncodeUtf16,
  fileterNickName,
  cleanCache,
  deteleObject,
  number_format,
  js_date_time,
  startHttp,
  js_detail_date_time,
  timestampToTime,
  timeFormat,
  timeFormin,
  time_tranform,
  four_time,
  renderTime
}