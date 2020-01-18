const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    a0: null,
    a1:null,
    a3: null,
    b0:null,
    b1: null,
    b3: null,
    c0: null,
    c1: null,
    c3: null,
    d0: null,
    d1: null,
    d3: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: app.globalData.domain + 'work/getWorkList',
      method: 'post',
      data: { "pageSize": 10, "start": 0, "type": "2" },
      success: res => {
        console.log("政策数据")
        console.log(res.data.rows)
        this.setData({
          a0: this.a0 = "关于妥善处理赴省集体访的通知",
          a1: this.a1 = res.data.rows[0].source[0].createTime,
          a3: this.a3 = app.globalData.domain + 'file/'+ res.data.rows[0].source[0].fileUrl,

          b0: this.b0 = "关于启动迎接党的十九大啊信访信息的通知",
          b1: this.b1 = res.data.rows[1].source[0].createTime,
          b3: this.b3 = app.globalData.domain + 'file/' + res.data.rows[1].source[0].fileUrl,

          c0: this.c0 = "关于推进全市矛盾纠纷排查处理的通知",
          c1: this.c1 = res.data.rows[2].source[0].createTime,
          c3: this.c3 = app.globalData.domain + 'file/' + res.data.rows[2].source[0].fileUrl,

          d0: this.d0 = "关于接受第十四批助保人员的申请通知",
          d1: this.d1 = res.data.rows[3].source[0].createTime,
          d3: this.d3 = app.globalData.domain + 'file/' + res.data.rows[3].source[0].fileUrl,
        })
        fail: res => {
          console.log(res)
        }
      }
    })
  },
  a (){
   
  },
})