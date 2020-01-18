const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    list: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.domain + 'dyjf/getZyzHdApp',
      method: 'post',
      data: { "page": 1, "pageSize": 10 },
      success: res => {
        console.log("志愿活动数据")
        console.log(res.data.rows)
        this.setData({
          list: this.list = res.data.rows
        })
        fail: res => {
          console.log(res)
        }
      }
    })
  },
  //根据id获取项目详情
  zdgcxq() {

    wx.navigateTo({
      url: '../zdgc/zdgc',
    })
    console.log('一次点击事件！！！')
  }
})