// pages/zdgc/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isToMine: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.isAdmin) {//不是由管理员首页跳转过来的显示个人中心
      this.setData({
        isToMine: false
      })
    }
  }
})