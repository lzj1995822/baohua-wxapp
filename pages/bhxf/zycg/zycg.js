const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getZyzHdAppYjs()
  },
  getZyzHdAppYjs() {
    wx.request({
      url: app.globalData.domain + '/dyjf/getZyzHdAppYjs',
      method: 'post',
      data: {
        "start": 0,
        "pageSize": 10
      },
      success: ({ data }) => {
        console.log(data)
        this.setData({
          list: data.rows
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  }
})