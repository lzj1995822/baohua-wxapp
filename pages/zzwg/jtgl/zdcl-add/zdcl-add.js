// pages/zzwl/jtgl/zdcl-add/zdcl-add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoUrls: [], 
    typePicker: ['重型普通半挂车', '重型厢式半挂车', '重型罐式半挂车', '重型普通货车', '重型厢式货车', '重型罐式货车'
      , '重型集装厢车', '重型特殊结构货车', '大型普通客车', '中型普通客车', '小型普通客车','小型越野客车', '轿车'
    , '重型半挂牵引车', '中型半挂牵引车', '大型专项作业车','中型专项作业车', '其他'],
    typePickerIndex:null,
    areaPicker: ['宝华村', '宝华花园', '仓头村', '凤坛村', '和平村', '华山村', '栏江村', '栗庄村', '铜山村', '新城社区', '智慧园区'],
    areaPickerIndex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseType(e){
    this.setData({
      typePickerIndex:e.detail.value
    })
  },
  chooseArea(e) {
    this.setData({
      areaPickerIndex: e.detail.value
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