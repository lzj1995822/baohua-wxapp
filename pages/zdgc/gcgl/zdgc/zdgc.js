// pages/zhcg-cgwt/zhcg-cgwt.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    list: null,
    id:50
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //根据id获取项目详情
    wx.request({
      url: app.globalData.domain + 'keyproBuild/getKeyproBuildInfo/'+this.data.id,
      method: 'Get',
      success: res => {
        console.log("重点详情数据")
        console.log(res.data.obj.pro)
        this.setData({
          list: this.list = res.data.obj.pro
        })   
        fail: res => {
          console.log(res)
        }
      }
    })
  },
})