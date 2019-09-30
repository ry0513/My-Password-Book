// miniprogram/pages/password/bgColor/bgColor.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ColorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
    ],
    GradualColorList: [{
      title: '魅红',
      name: '#f43f3b - #ec008c',
      bg: 'bg-gradual-red',
      font: 'font-gradual-red'
    },
    {
      title: '鎏金',
      name: '#ff9700 - #ed1c24',
      bg: 'bg-gradual-orange',
      font: 'font-gradual-orange'
    },
    {
      title: '翠柳',
      name: '#39b54a - #8dc63f',
      bg: 'bg-gradual-green',
      font: 'font-gradual-green'
    },
    {
      title: '靛青',
      name: '#0081ff - #1cbbb4',
      bg: 'bg-gradual-blue',
      font: 'font-gradual-blue'
    },
    {
      title: '惑紫',
      name: '#9000ff - #5e00ff',
      bg: 'bg-gradual-purple',
      font: 'font-gradual-purple'
    },
    {
      title: '霞彩',
      name: '#ec008c - #6739b6',
      bg: 'bg-gradual-pink',
      font: 'font-gradual-pink'
    },]
  },

  bindtapColorList(e){
    console.log(e.target.dataset.index)
    let bgColor = 'bg-' + this.data.ColorList[e.target.dataset.index].name;
    let fontColor = 'font-' + this.data.ColorList[e.target.dataset.index].name;
    this.bgColorUp(bgColor, fontColor)
  },
  bindtapGradualColorList(e){
    console.log(e.target.dataset.index)
    let bgColor = this.data.GradualColorList[e.target.dataset.index].bg;
    let fontColor = this.data.GradualColorList[e.target.dataset.index].font;
    this.bgColorUp(bgColor, fontColor)
  },
  bgColorUp(bgColor,fontColor){
    let that = this;
    wx.cloud.callFunction({
      name: 'bgColor',
      data: { 
        bgColor: bgColor,
        fontColor: fontColor 
      },
      success: res => {
        console.log(res)
        if (res.result.stats.updated == 1){
          wx.showToast({
            icon: 'none',
            title: '恭喜！更改外观成功~'
          })
          app.globalData.userSet.bgColor = bgColor;
          app.globalData.userSet.fontColor = fontColor;
          that.onShow()
        }else{
          wx.showToast({
            icon: 'none',
            title: '更改外观失败，未知原因'
          })
        }
      }
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
      bgColor: app.globalData.userSet.bgColor,
      fontColor: app.globalData.userSet.fontColor
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
  onShareAppMessage: function () {

  }
})