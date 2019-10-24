// miniprogram/pages/password/cloud/cloud.js
const app = getApp();
const sign = require("../../../utils/sign.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    passwordCiphertext: false,
    userAutomaticCloud: false,
    modal: false,
    focus:false,
  },
  //授权
  onGetUserInfo: function (e) {
    var that = this;
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        hasUserInfo: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      app.globalData.userInfo = e.detail.userInfo
      wx.showToast({
        title: '正在更新',
        icon: 'loading',
        duration: 60 * 1000,
        mask: true
      })
      app.getUserSet().then(res => {
        wx.hideToast()
        that.onShow()
      })
    }
  },

  //弹出修改登陆密码
  binduser_password() {
    let that = this;
    that.setData({
      modal: true,
      focus: true,
      modalinput: '',
      modalobj: {
        title: '设置登陆密码',
        placeholder: '请输入4位登陆密码',
        maxlength: 4,
        type: 'number',
        bindtap: 'user_password',
        bindtaptext: '确定'
      }
    })
  },
  //修改登陆密码
  user_password() {
    var that = this;
    let pass = that.data.modalinput.split('');
    if (pass.length != 4) {
      wx: wx.showToast({
        title: '--请检查位数--',
        icon: 'none'
      })
    } else {
      console.log(pass)
      wx.setStorage({
        key: "user_password",
        data: pass
      })
      this.hidemodal()
      wx.showToast({
        title: '修改成功',
        icon: 'none'
      })
    }
  },

  //显示密文
  ciphertext(){
    let that = this;
    that.setData({
      passwordCiphertext: !that.data.passwordCiphertext
    })
    
    let data = {
      passwordCiphertext: that.data.passwordCiphertext,
      userAutomaticCloud: that.data.userAutomaticCloud
    }
    console.log(data)
    wx.setStorage({
      key: "userSet",
      data: data
    })
    app.globalData.userSet.passwordCiphertext = that.data.passwordCiphertext;
  },
  //弹出自动上传
  automaticCloud(){
    if (!this.data.hasUserInfo) {
      wx.showToast({
        title: '请先点击头像授权~~',
        icon: 'none',
      })
      return false;
    }
    let that = this
    console.log(that.data.userAutomaticCloud)
    if (that.data.userAutomaticCloud){
      that.autoCloud();
      return false;
    }
    that.setData({
      modal: true,
      focus: true,
      modalinput: '',
      modalobj: {
        title: '开启自动上传',
        placeholder: '请设置6位云端密码',
        type: 'text',
        maxlength: 6,
        bindtap: 'autoCloud',
        bindtaptext: '开启'
      }
    })
  },
  //自动上传
  autoCloud(){
    var that = this;
    let key = that.data.modalinput;
    
    let pass = that.data.modalinput;
    if (!that.data.userAutomaticCloud){
      if (key.length != 6) {
        wx: wx.showToast({
          title: '--请检查位数--',
          icon: 'none'
        })
        return false;
      }
      wx.setStorage({
        key: "passwordCloud",
        data: pass
      })
      console.log(9999999999);
    }else(
      wx.removeStorage({
        key: 'passwordCloud',
        success(res) {
          console.log(99988899999);
        }
      })
    )
    that.setData({
      userAutomaticCloud: !that.data.userAutomaticCloud,
      modal:false
    })
    wx.setStorage({
      key: "userSet",
      data: {
        passwordCiphertext: that.data.passwordCiphertext,
        userAutomaticCloud: that.data.userAutomaticCloud
      }
    })
    app.globalData.userSet.userAutomaticCloud = that.data.userAutomaticCloud;
  },
  //弹出手动本地上传
  bindUploadCloud(){
    let that = this;
    if (!this.data.hasUserInfo) {
      wx.showToast({
        title: '请先点击头像授权~~',
        icon: 'none',
      })
      return false;
    }
    that.setData({
      modal:true,
      focus: true,
      modalinput: '',
      modalobj:{
        title:'上传到云端',
        placeholder:'请设置6位云端密码',
        type:'text',
        maxlength:6,
        bindtap:'uploadCloud',
        bindtaptext:'上传'
      }
    })
  },
  //手动本地上传
  uploadCloud() {
    let key = this.data.modalinput;
    if( key.length != 6 ){
      wx: wx.showToast({
        title: '--请检查位数--',
        icon: 'none'
      })
      return false;
    }
    wx: wx.showToast({
      title: '上传中~',
      icon: 'loading'
    })
    app.uploadCloud(sign.encrypt(JSON.stringify(app.globalData.password), key)).then(res => {
      this.hidemodal()
      if(res){
        wx:wx.showToast({
          title: '上传成功',
          icon: 'success'
        })
      }else{
        wx: wx.showToast({
          title: '上传失败',
          image: '../images/err.png'
        })
      }
    })
  },
  //弹出下载到本地
  bindDownCloud(){
    let that = this;
    if (!this.data.hasUserInfo) {
      wx.showToast({
        title: '请先点击头像授权~~',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    that.setData({
      modal: true,
      focus: true,
      modalinput: '',
      modalobj: {
        title: '恢复到本地',
        placeholder: '请输入6位云端密码',
        maxlength: 6,
        type: 'text',
        bindtap: 'downCloud',
        bindtaptext: '恢复'
      }
    })
  },
  //下载到本地
  downCloud(){
    let that = this;
    let key = that.data.modalinput;
    if (key.length != 6) {
      wx: wx.showToast({
        title: '--请检查位数--',
        icon: 'none'
      })
      return false;
    }
    that.hidemodal();
    wx: wx.showToast({
      title: '恢复中~',
      icon: 'loading'
    })
    wx.cloud.callFunction({
      name: 'downCloud',
      data: {},
      success: res => {
        let pass = sign.decrypt(res.result.password, key);
        if(!pass){
          wx:wx.showToast({
            title: '解密失败',
            image: '../images/err.png'
          })
        }else{
          app.globalData.password = JSON.parse(pass)
          console.log(JSON.parse(pass))
          wx.setStorage({
            key: "password",
            data: app.globalData.password
          })

          wx:wx.showToast({
            title: '恢复成功',
            icon: 'success'
          })
        }
      }
    })
  },
  //获取模态窗输入的信息
  bindmodalinput(e){
    console.log(e.detail.value)
    this.setData({
      modalinput: e.detail.value,
    })
  },
  
  //清除云端账号信息
  bindDeleteCloud(){
    wx:wx.showModal({
      title: '提示',
      content: '清除后数据无法恢复',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '清除',
      confirmColor: '',
      success: function(res) {
        if (res.confirm) {
          wx: wx.showToast({
            title: '清除中~',
            icon: 'loading'
          })
          app.uploadCloud(null).then(result => {
            if (result) {
              wx: wx.showToast({
                title: '清除成功',
                icon: 'success'
              })
            } else {
              wx: wx.showToast({
                title: '清除失败',
                image: '../images/err.png'
              })
            }
          })
        }
      }
    })
  },

  //清除本地缓存账号信息
  bindDeleteLocal(){
    wx: wx.showModal({
      title: '提示',
      content: '清除后数据无法恢复',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '清除',
      confirmColor: '',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'password',
            success(res) {
              app.globalData.password = []
              wx: wx.showToast({
                title: '清除成功',
                icon: 'success'
              })
            }
          })
        }
      }
    })
  },
  //取消模态窗
  hidemodal(){
    this.setData({
      modal: false,
      focus: false
    })
  },
  //挑选皮肤
  bgcolorSet(){
    if (!this.data.hasUserInfo){
      wx.showToast({
        title: '请先点击头像授权~~',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.navigateTo({
      url: '../bgColor/bgColor',
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        avatarUrl: app.globalData.userInfo.avatarUrl,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          avatarUrl: res.userInfo.avatarUrl,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            avatarUrl: res.userInfo.avatarUrl,
            hasUserInfo: true
          })
        }
      })
    }
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
      passwordCiphertext: app.globalData.userSet.passwordCiphertext,
      userAutomaticCloud: app.globalData.userSet.userAutomaticCloud
    })
    console.log(this.data)
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