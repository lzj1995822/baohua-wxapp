const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  logout(){
    app.globalData.userInfo = null
    this.setData({
      userInfo:null
    })
    wx.navigateTo({
      url: '/pages/login/login'
    })
    wx.setStorage({
      key: 'accountInfo',
      data: null
    })
  }
})