// pages/zzwl/jtgl/zdcl-add/zdcl-add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoUrls: [],
    naturePicker: ['个体性事件', '重大群体性事件', '一般群体性事件'],
    naturePickerIndex: null,
    typePicker: ['婚恋家庭纠纷', '邻里纠纷', '人格权纠纷', '物权相关纠纷', '侵权相关纠纷', '合同及相关纠纷', '劳动人事争议', '金融借贷纠纷', '土地及资源权属纠纷', '其他民商事纠纷', '城乡建设发展纠纷', '涉民政纠纷', '其他行政执法纠纷', '涉法涉诉纠纷', '涉组织涉纪检纠纷', '涉民族宗教纠纷', '其他'],
    typePickerIndex: null,
    date:null,
    time: null,
    areaPicker: ['宝华村', '宝华花园', '仓头村', '凤坛村', '和平村', '华山村', '栏江村', '栗庄村', '铜山村', '新城社区', '智慧园区'],
    areaPickerIndex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  chooseNature(e) {
    this.setData({
      naturePickerIndex: e.detail.value
    })
  },
  chooseType(e) {
    this.setData({
      typePickerIndex: e.detail.value
    })
  },
  chooseDate(e){
    this.setData({
      date:e.detail.value
    })
  },
  chooseTime(e) {
    this.setData({
      time: e.detail.value
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