// pages/zhcg-cgsb/zhcg-cgsb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryPicker: ['扬尘管控', '车辆冲洗', '环境保护', '违建管理', '农民工工资清欠'],
    categoryPickerIndex: null,
    address: '',
    photoUrls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseCategory(e) {
    this.setData({
      categoryPickerIndex: e.detail.value
    })
  },
  chooseAddress(e) {
    wx.chooseLocation({
      success: res => {
        this.setData({
          address: res.address
        })
      },
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