// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    let res = await db.collection('userSet').where({
      _openid: wxContext.OPENID // 填入当前用户 openid
    }).field({
      password: true
    }).get();
    return res.data[0]
  } catch (e) {
    console.error(e)
  }
}