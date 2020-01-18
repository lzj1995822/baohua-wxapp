// pages/zhcg-cgwt/zhcg-cgwt.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    list:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.domain + 'api/trafficAccident/getTrafficAccidentForNetGrid?page=0&pageSize=100',
      method: 'post',
      success: res => {
        console.log("交通事故数据")
        console.log(res.data.data.vos)
        this.setData({
          list: this.list = res.data.data.vos
        })
        fail: res => {
          console.log(res)
        }
      }
    })
  },
  //根据id获取项目详情
  zdgcxq(){
    // wx.request({
    //   url: app.globalData.domain + 'keyproBuild/getKeyproBuildInfo/' + res.data.rows.id,
    //   method: 'post',
    //   data: { "key": "", "pageSize": 10, "start": 0 },
    //   success: res => {
    //     console.log("工程管理数据")
    //     console.log(res.data.rows)
    //     this.setData({
    //       list: this.list = res.data.rows
    //     })
    //     fail: res => {
    //       console.log(res)
    //     }
    //   }
    // })
    wx.navigateTo({
      url: '../zdgc/zdgc',
    })
    console.log('一次点击事件！！！')
  }
})