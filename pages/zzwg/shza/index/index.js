const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    list: null,
    list1: null,
    list2: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: app.globalData.domain + 'api/SSEvent/getSSEventForNetGrid?page=1&pageSize=10',
      method: 'post',
      success: res => {
        console.log("治安事件数据")
        console.log(res.data)
        this.setData({
          list: this.list = res.data.data.vos
        })
        fail: res => {
          console.log(res)
        }
      }
    });
    wx.request({
      url: app.globalData.domain + 'api/Nonpublic/getNonPublicEconomyOrgInfo?page=1&pageSize=10',
      method: 'post',
      success: res => {
        console.log("物流企业数据")
        console.log(res.data)
        this.setData({
          list1: this.list1 = res.data.data.nonPublicEconomyOrgInfo
        })
        fail: res => {
          console.log(res)
        }
      }
    });
    wx.request({
      url: app.globalData.domain + 'api/Nonpublic/getNonPublicEconomyOrgInfo?page=1&pageSize=10',
      method: 'post',
      success: res => {
        console.log("重点企业数据")
        console.log(res.data)
        this.setData({
          list2: this.list2 = res.data.data.nonPublicEconomyOrgInfo
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