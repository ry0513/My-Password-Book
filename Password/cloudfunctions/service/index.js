const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('-------------------')
  console.log(event);
  console.log('-------------------')
  let res = {
    touser: wxContext.OPENID,
  };
  if (event.MsgType == 'event'){
    res.msgtype = 'text',
    res.text = {
      content: '有什么问题呢？请回复序号：\n1.我想知道云端什么时候开放\n2.我想获得小程序开源代码\n3.我想获得小程序码\n4.我来打酱油\n5.其他问题\n6.我有很多的建议'
    }
  } 
  else if(event.MsgType == 'image' ){
    res.msgtype = 'text',
    res.text = {
      content: '你给我发图，我也看不懂，咱能不能打字聊呢'
    }
  }
  else if (event.MsgType == 'text') {
    switch (event.Content) {
      case '菜单':
        res.msgtype = 'text',
        res.text = {
          content: '有什么问题呢？请回复序号：\n1.我想知道云端什么时候开放\n2.我想获得小程序开源代码\n3.我想获得小程序码\n4.我来打酱油\n5.其他问题\n6.我有很多的建议'
        }
        break;
      case "1":
        res.msgtype = 'text',
        res.text = {
          content: '云端正在开放中~预计最近就会开放哦~'
        }
        break;
      case "2":
        res.msgtype = 'text',
        res.text = {
          content: '源码正在制作中，预计2019/09/30日发布在github上'
        }
        break;
      case "3":
        res.msgtype = 'text',
        res.text = {
          content: '我也想获得，怎么办呀'
        }
        break;
      case "4":
        res.msgtype = 'text',
        res.text = {
          content: '三元一斤，十元三斤，少年你买多少？'
        }
        break;
      case "5":
        res.msgtype = 'text',
        res.text = {
          content: '其他问题？当然是联系我喽\nQQ:1057284280'
        }
        break;
      case "6":
        res.msgtype = 'text',
        res.text = {
          content: '目前请右转输入序号5，谢谢'
        }
        break;
      default:
        res.msgtype = 'text',
        res.text = {
          content: '这是个进水的不智能客服，仅可以提供菜单列表，请回复菜单，以获取服务，谢谢'
        }
    }
  }
  await cloud.openapi.customerServiceMessage.send(res)
  return 'success'
}