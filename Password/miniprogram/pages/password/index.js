//index.js
const app = getApp();
const AUTH_MODE = 'fingerPrint'
Page({
  data: {
    keyboard:false,
    number:[[1,2,3],[4,5,6],[7,8,9],[0]],
    pass: [null, null, null, null],
    passnum:0,
    userpass:[],
    title:'',
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'user_password',
      success(res) {
        console.log(res.data)
        that.setData({
          title: '',
          userpass: res.data
        })
      },
      fail(res) {
        that.setData({
          title: '请设置登录密码',
        })
        console.log(res)
      }
    })
    if (app.globalData.unlock) {
      wx.redirectTo({
        url: './home/home'
      })
    } else {
      this.startAuth();
    }
  },
  onShow: function () {
    
  },

  //输入密码
  num(e){
    let that = this;
    if (that.data.passnum == 4) {
      return false;
    }
    console.log(typeof e.target.dataset.num);
    let pass = that.data.pass;
    let passnum = that.data.passnum;
    pass.splice(passnum, 1, e.target.dataset.num);
    that.setData({
      pass: pass,
      passnum: passnum + 1 
    }) 
    console.log(that.data.passnum)
    if (that.data.passnum == 4) {
      console.log(that.data.userpass)
      if (that.data.userpass.length !=4 ){
        wx.setStorage({
          key: "user_password",
          data: that.data.pass
        })
        wx.showModal({
          title: '提示',
          content: '忘记密码将无法使用本程序',
          showCancel:false,
          success(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: './home/home'
              })
            } 
          }
        })
      }else{
        if (that.data.pass.toString() == that.data.userpass.toString()) {
          wx.redirectTo({
            url: './home/home'
          })
        }else{
          wx.showToast({
            title: '密码错误',
            icon: 'none',
            duration: 1000
          })
          setTimeout(()=>{
            that.setData({
              pass: [null, null, null, null],
              passnum: 0,
            })
          },1000) 
        }
      }
    }
    console.log(that.data.pass)
  },
  
  //解锁
  startAuth() {
    let that = this;
    const startSoterAuthentication = () => {
      wx.startSoterAuthentication({
        requestAuthModes: [AUTH_MODE],
        challenge: 'password',
        authContent: '抱歉，我们必须验证是机主在操作',
        success: (res) => {
          app.globalData.fingerPrint = true;
          wx.redirectTo({
            url: './home/home'
          })
        },
        fail: (err) => {
          console.error(err)
          wx.showModal({
            title: '提示',
            content: '指纹认证失败',
            confirmText:'重试指纹',
            cancelText:'使用密码',
            success(res) {
              if (res.confirm) {
                that.startAuth();
              } else if (res.cancel) {
                that.setData({
                  keyboard:true
                })
              }
            }
          })
        }
      })
    }
    
    const checkIsEnrolled = () => {
      wx.checkIsSoterEnrolledInDevice({
        checkAuthMode: AUTH_MODE,
        success: (res) => {
          console.log(res)
          if (parseInt(res.isEnrolled) <= 0) {
            wx.showModal({
              title: '错误',
              content: '您暂未录入指纹信息，请录入后重试',
              showCancel: false
            })
            return
          }
          startSoterAuthentication();
        },
        fail: (err) => {
          console.error(err)
        }
      })
    }

    wx.checkIsSupportSoterAuthentication({
      success: (res) => {
        console.log(res)
        checkIsEnrolled()
      },
      fail: (err) => {
        console.error(err)
        that.setData({
          keyboard: true
        })
      }
    })
  },

  
})
