const app = getApp()
let WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    if (id)
      this.activityDetail(id)
  },
  activityDetail(id) {
    wx.request({
      url: app.globalData.domain + '/dyjf/getZyzHdCg/' + id,
      success: res => {
        console.log(res.data)
        let itemTmp = res.data.obj
        itemTmp.createTimeStr = new Date(itemTmp.createTime).toLocaleDateString()
        this.setData({
          item: itemTmp
        })
        WxParse.wxParse('nr', 'html', itemTmp.nr, this, 5);
      },
      fail: res => {
        console.log(res)
      }
    })
  }
})