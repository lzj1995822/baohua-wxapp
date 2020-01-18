let WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getNewsInf(options.id, app.globalData.userInfo.uisubordinatedepartment)
  },
  parseFromHtml(bindName, data) {
    /**
     * WxParse.wxParse(bindName , type, data, target,imagePadding)
     * 1.bindName绑定的数据名(必填)
     * 2.type可以为html或者md(必填)
     * 3.data为传入的具体数据(必填)
     * 4.target为Page对象,一般为this(必填)
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
     */
    let that = this;
    WxParse.wxParse(bindName, 'html', data, that, 5);
  },
  getNewsInf(newsId, depName) {
    let requestData = null
    if (depName == '超级管理员' || depName == '宝华镇') {
      requestData = {
        newsId: newsId
      }
    } else {
      requestData = {
        newsId: newsId,
        depName: depName
      }
    }
    wx.request({
      url: app.globalData.domain + 'newsInf/getNewsInf',
      method: 'post',
      data: requestData,
      success: res => {
        console.log(res.data)
        if (res.data.ok) {
          let newsTmp = res.data.responseData
          if (newsTmp && newsTmp.createTime)
            newsTmp.createTimeStr = new Date(newsTmp.createTime).toLocaleDateString()
          this.setData({
            news: newsTmp
          })
          if (newsTmp && newsTmp.content)
            this.parseFromHtml('content', newsTmp.content)
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  }
})