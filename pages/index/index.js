//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    newsInfList: []
  },
  onLoad(e) {
    this.getNewsInfList()
  },
  getNewsInfList() {
    wx.request({
      url: app.globalData.domain + 'newsInf/getNewsInfList',
      method: 'post',
      data: {
        depName: '超级管理员',
        pageSize: 3,
        start: 0
      },
      success: res => {
        console.log("1111111111111111111111")
        console.log(res.data)
        let newsInfListTmp = res.data.responseData //将long类型的日期类型转成日期字符串
        let newsInfList = newsInfListTmp.map((value) => {
          value.createTimeStr = new Date(value.createTime).toLocaleDateString()
          return value
        })
        if (res.data.ok) {
          this.setData({
            newsInfList: newsInfList
          })
          console.log(this.data.newsInfList)
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  }
})