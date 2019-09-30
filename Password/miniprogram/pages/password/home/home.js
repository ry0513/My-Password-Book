//index.js
const app = getApp();
Page({
  data: {
    list: [],
    version: app.globalData.version
  },
  //添加密码
  addpassword() {
    wx.navigateTo({
      url: '../add/add',
    })
  },

  //弹出操作菜单
  menu(e) {
    let that = this;
    let system = wx.getSystemInfoSync()
    let itemList = ['编辑', '删除']
    if (/android/i.test(system.platform)) {
      itemList.push('取消')
    }
    wx.showActionSheet({
      itemList,
      success(res) {
        console.log(res.tapIndex);
        if (res.tapIndex === 0) {
          that.update(e.target.dataset.index)
        } else if (res.tapIndex === 1) {
          that.delete(e.target.dataset.index)
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  //修改
  update(num) {
    wx.navigateTo({
      url: '../update/update?data=' + JSON.stringify(app.globalData.password[num]) + '&passwordnum=' + num,
    })
  },

  //删除
  delete(num) {
    let that = this;
    that.setData({
      moda: false
    })
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      confirmColor: '#ce0532',
      success(res) {
        if (res.confirm) {
          app.globalData.password.splice(that.data.num, 1);
          wx.setStorage({
            key: "password",
            data: app.globalData.password
          });
          that.onShow();
        } else if (res.cancel) {

        }
      }
    })
  },

  //设置
  setting() {
    wx.navigateTo({
      url: '../setting/setting',
    })
  },

  //其他
  about(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  copyname(e){
    wx.setClipboardData({
      data: e.target.dataset.copy,
      success(res) {

      }
    })
  },

  //复制账号
  copynicename(e){
    wx.setClipboardData({
      data: e.target.dataset.copy,
      success(res) {
        
      }
    })
  },
  //复制密码
  copypassword(e){
    wx.setClipboardData({
      data: e.target.dataset.copy,
      success(res) {
        
      }
    })
  },

  //模糊搜索
  bindinput(e){
    let keyWord = e.detail.value;
    let arr = [];
    for (var i = 0; i < app.globalData.password.length; i++) {
      //如果字符串中不包含目标字符会返回-1
      if (app.globalData.password[i].name.indexOf(keyWord) >= 0) {
        arr.push(app.globalData.password[i]);
      }
    }
    this.setData({
      list:arr
    })
    console.log(arr)
  },
  onLoad: function () {
    let that = this;
    const updateManager = wx.getUpdateManager()
    wx.getStorage({
      key: 'version',
      success(res) {
        if (res.data != app.globalData.version){
          wx.showModal({
            title: '新版本' + that.data.version + '来袭',
            content: '点击版本号查看更新日志',
            showCancel:false,
            success(res) {
              if (res.confirm) {
                wx.setStorage({
                  key: "version",
                  data: app.globalData.version
                })
              } 
            }
          })
        }
      },
      fail(res) {
        wx.showModal({
          title: '新版本' + that.data.version + '来袭',
          content: '点击版本号查看更新日志',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.setStorage({
                key: "version",
                data: app.globalData.version
              })
            }
          }
        })
      }
    })
    wx.getStorage({
      key: 'password',
      success(res) {
        console.log(res.data)
        app.globalData.password = res.data;
        that.setData({
          list: app.globalData.password
        })
      },
      fail(res) {
        app.globalData.password = [];
      }
    })
  },
  onShow: function () {
    this.setData({
      list: app.globalData.password,
      bgColor: app.globalData.userSet.bgColor,
      passwordCiphertext: app.globalData.userSet.passwordCiphertext
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '小雁南殇的密码本本',
      path: 'pages/password/index',
      imageUrl: '../images/fx.jpg',
    }
  }

})
