// pages/zhcg-cgsb/zhcg-cgsb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyPicker: ['宝捷润滑油镇江有限公司', '句容市宝玉兰制衣有限公司', '句容市宝华镇宝龙纸品加工厂'],
    areaPickerIndex: null,
    categoryPicker: ['生产经营单位资质证照类隐患','安全生产管理机构及人员类隐患'
    ],
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
  chooseCompany(e) {
    this.setData({
      companyPickerIndex: e.detail.value
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
    if(that.data.photoUrls.length > 9){
      wx.showToast({
        title: '最多添加九张',
        icons:'none'
      })
    }
    let canAddNum = 9 - that.data.photoUrls.length
    wx.chooseImage({
      count: canAddNum, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        that.data.photoUrls=that.data.photoUrls.concat(res.tempFilePaths)
        that.setData({
          photoUrls: that.data.photoUrls
        })
      }
    });
  },
  deleteImage(e) {
    this.data.photoUrls.splice(e.target.dataset.index,1)
    this.setData({
      photoUrls: this.data.photoUrls
    })
  }
})