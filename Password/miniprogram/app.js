//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    //登录   获取  openId, sessionKey, unionId
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log(res)
        this.globalData.openid = res.result.openid
      }
    })

    //获取用户设置
    this.getUserSet = async () => {
      const result = await new Promise((resolve, reject) => {
        console.log(44444)
        wx.cloud.callFunction({
          name: 'getUserSet',
          data: {},
          success: res => {
            resolve(true)
            if (res.result) {
              getApp().globalData.userSet.bgColor = res.result.bgColor;
              getApp().globalData.userSet.fontColor = res.result.fontColor;
            }
          }
        })
      })
      return result; 
    } 
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.getUserSet()
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.setStorage({
                key: "hasUserInfo",
                data: true
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        console.log(e)
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
         	this.globalData.Custom = capsule;
        	this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
        	this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
    //更新云端账号
    this.uploadCloud = async (pass) => {
      const result = await new Promise((resolve, reject) => {
        wx.cloud.callFunction({
          name: 'uploadCloud',
          data: { password: pass },
          success: res => {
            if (res.result.stats.updated == 1) {
              resolve(true)
            } else {
              resolve(false)
            }
          }
        })
      })
      return result;
    } 
    wx.getStorage({
      key: 'userSet',
      success:res => {
        console.log(res)
        this.globalData.userSet.passwordCiphertext = res.data.passwordCiphertext;
        this.globalData.userSet.userAutomaticCloud = res.data.userAutomaticCloud;
      },
      fail: res=>{
        console.log(res)
        this.globalData.userSet.passwordCiphertext = false;
        this.globalData.userSet.userAutomaticCloud = false;
      }
    })
  },

  globalData: {
    userInfo: null,
    version: "1.0.4",
    userSet: {
      passwordCiphertext:false,
      userAutomaticCloud:false,
      bgColor: 'bg-black',
      fontColor: 'font-black'
    }
  }
})