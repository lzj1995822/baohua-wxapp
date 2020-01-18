const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remember: false,
    //缓存中账号密码
    username: null,
    password: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onShow() {
    wx.getStorage({
      key: 'accountInfo',
      success: res => {
        let accountInfo = res.data
        if (accountInfo) {
          let accountInfoArr = accountInfo.split('&')
          this.setData({
            username: accountInfoArr[0],
            password: accountInfoArr[1],
            remember: true
          })
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  checkForm(username, password) {
    if (username && password) {
      return true
    } else {
      wx.showToast({
        title: '请填写账号密码！',
        icon: 'none'
      })
    }
  },
  login(e) {
    let username = e.detail.value.username
    let password = e.detail.value.password
    if (!this.checkForm(username, password)) {
      return
    }
    wx.request({
      url: app.globalData.domain+'user/login',
      method: "post",
      data: {
        uicode: password,
        uiloginname: username
      },
      success: res => {
        console.log(res)
        if (res.data.result) {
          app.globalData.userInfo = res.data.obj.user
          if (this.data.remember) {
            wx.setStorage({
              key: 'accountInfo',
              data: username + '&' + password,
            })
          }
          this.navigateToByMCCaption(res.data.obj.user)
        } else {
          wx.showToast({
            title: '账号密码错误',
            icon: 'none'
          })
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  // http://122.97.218.162:28887/characterUserinfoController/getMenuTreeByUserId/649
  getMenuTreeByUserId(userId) {
    wx.request({
      url: app.globalData.domain + 'characterUserinfoController/getMenuTreeByUserId/' + userId,
      success: res => {
        //console.log(res.data.datalevel)
        let datalevelStr = res.data.datalevel
        let datalevel = JSON.parse(datalevelStr)
        //hasPermission值为1的数组项
        let hasPermissionDatalevel = datalevel.filter((value, index) => {
          if (value.hasPermission == 1)
            return true
        })
        console.log(hasPermissionDatalevel)
        if (hasPermissionDatalevel.length > 1) { //超级管理员
          wx.navigateTo({
            url: '/pages/index/index'
          })
        } else if (hasPermissionDatalevel.length == 0) { //空白权限
          wx.showToast({
            title: '空白权限，前先去申请权限',
          })
        } else {

          if (hasPermissionDatalevel[0].mCCaption.includes("城管")) {
            wx.navigateTo({
              url: '/pages/zhcg/index/index'
            })
          } else if (hasPermissionDatalevel[0].mCCaption.includes("环卫")) {
            wx.navigateTo({
              url: '/pages/zhhw/index/index'
            })
          } else if (hasPermissionDatalevel[0].mCCaption.includes("党建") || hasPermissionDatalevel[0]              .mCCaption.includes("先锋")) {
            wx.navigateTo({
              url: '/pages/bhxf/index/index'
            })
          } else if (hasPermissionDatalevel[0].mCCaption.includes("村建")) {
            wx.navigateTo({
              url: '/pages/zhcj/index/index'
            })
          } else if (hasPermissionDatalevel[0].mCCaption.includes("应急")) {
            wx.navigateTo({
              url: '/pages/yjgl/index/index'
            })
          } else if (hasPermissionDatalevel[0].mCCaption.includes("政务")) {
            wx.navigateTo({
              url: '/pages/zwgl/index/index'
            })
          } else if (hasPermissionDatalevel[0].mCCaption.includes("工程")) {
            wx.navigateTo({
              url: '/pages/zdgc/index/index'
            })
          } else if (hasPermissionDatalevel[0].mCCaption.includes("综治")) {
            wx.navigateTo({
              url: '/pages/zzwg/index/index'
            })
          }
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  navigateToByMCCaption(userInfo) {
    //const datalevel = JSON.parse(datalevelStr)
    if (userInfo.uisubordinatedepartment.includes("综治")) {
      this.getMenuTreeByUserId(userInfo.uicode);
    } else if (userInfo.uisubordinatedepartment.includes("工程")) {
      wx.navigateTo({
        url: '/pages/zdgc/index/index'
      })
    } else if (userInfo.uisubordinatedepartment.includes("志愿") || userInfo.uisubordinatedepartment.includes("党建") || userInfo.uisubordinatedepartment.includes("先锋")) {
      wx.navigateTo({
        url: '/pages/bhxf/index/index'
      })
    } else {
      this.getMenuTreeByUserId(userInfo.id);
    }
  },
  clickRemember() {
    this.setData({
      remember: !this.data.remember
    })
  }
})