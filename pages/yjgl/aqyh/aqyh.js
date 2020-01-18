// pages/zhcg-cgwt/zhcg-cgwt.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    list: null,
    list1: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: app.globalData.domain + 'Hidden/getHiddenList',
      method: 'post',
      data: { "pageSize": "10", "start": "0", "state": "01" },
      success: res => {
        console.log("待处理数据")
        console.log(res.data)
        this.setData({
          list: this.list = res.data.rows
        })
        fail: res => {
          console.log(res)
        }
      }
    });
    wx.request({
      url: app.globalData.domain + 'Hidden/getHiddenList',
      method: 'post',
      data: { "pageSize": "10", "start": "0", "state": "02" },
      success: res => {
        console.log("已处理数据")
        console.log(res.data)
        this.setData({
          list1: this.list1 = res.data.rows
        })
        fail: res => {
          console.log(res)
        }
      }
    })
  },
  /**
   * 滑动切换tab
   */
  bindChange: function (e) {
    var that = this;

    that.setData({
      currentTab: e.detail.current
    });
  },
  /**
   * 点击tab切换
   */
  switchNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})