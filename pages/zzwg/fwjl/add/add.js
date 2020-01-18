// pages/zzwl/jtgl/zdcl-add/zdcl-add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoUrls: [],
    servicerPicker:['李海金','王义金','王素玲'],
    servicerPickerIndex:null,
    serviceObjectPicker: ['吴自力', '王伟虎', '范本旺'],
    serviceObjectPickerIndex: null,
    date:null,
    time:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseServicer(e){
    this.setData({
      servicerPickerIndex:e.detail.value
    })
  },
  chooseServiceObject(e) {
    this.setData({
      serviceObjectPickerIndex: e.detail.value
    })
  },
  chooseDate(e) {
    this.setData({
      date: e.detail.value
    })
  },
  chooseTime(e) {
    this.setData({
      time: e.detail.value
    })
  },
  chooseImage() {
    var that = this
    if (that.data.photoUrls.length > 9) {
      wx.showToast({
        title: '最多添加九张',
        icons: 'none'
      })
    }
    let canAddNum = 9 - that.data.photoUrls.length
    wx.chooseImage({
      count: canAddNum, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        that.data.photoUrls = that.data.photoUrls.concat(res.tempFilePaths)
        that.setData({
          photoUrls: that.data.photoUrls
        })
      }
    });
  },
  deleteImage(e) {
    this.data.photoUrls.splice(e.target.dataset.index, 1)
    this.setData({
      photoUrls: this.data.photoUrls
    })
  }
})