// miniprogram/pages/password/about/about.js
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    version:app.globalData.version
  },
  //帮助
  help(){
    wx.navigateTo({
      url: '../help/help',
    })
  },

  //联系作者
  me(){
    wx.showModal({
      title: '联系作者',
      content: 'QQ:1057284280',
      showCancel: false
    })
  },
  
  //版本信息
  edition(){
    wx.navigateTo({
      url: '../edition/edition',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      bgColor: app.globalData.userSet.bgColor
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})