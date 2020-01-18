import StringUtils from '../../../utils/StringUtils.js'
import {
  uploadFile,
  uploadFiles
} from '../../../utils/uploadFile.js'
const app = getApp()
Page({

  /**"miaoshu":
   * 页面的初始数据
   */
  data: {
    categoryPicker: [
      ['事件', '部件'],
      ['暴露垃圾', '占道经营', '车辆乱停放', '市容环境类', '宣传广告类', '施工管理类', '突发事件类', '街面秩序类', '拓展事件类', '其它']
    ],
    categoryPickerIndex: [],
    chosenCategory: null,
    areaPicker: ['宝华村', '宝华花园', '仓头村', '凤坛村', '和平村', '华山村', '栏江村', '栗庄村', '铜山村', '新城社区', '智慧园区'],
    areaPickerIndex: null,
    address: '',
    photoUrls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseCategoryColumn(e) {
    //console.log(e.detail.column)
    if (e.detail.column == 1) {
      return
    }
    switch (e.detail.value) {
      case 0:
        this.data.categoryPicker[1] = ['暴露垃圾', '占道经营', '车辆乱停放', '市容环境类', '宣传广告类', '施工管理类', '突发事件类', '街面秩序类', '拓展事件类', '其它']
        break
      case 1:
        this.data.categoryPicker[1] = ['公共设施类', '道路交通类', '市容环境类', '园林绿化类', '房屋土地类', '拓展部件类', '其他设施类']
        break
    }
    this.setData({
      categoryPicker: this.data.categoryPicker
    })
  },
  chooseCategory(e) {
    //console.log(e.detail.value)
    this.data.chosenCategory = this.data.categoryPicker[0][e.detail.value[0]] + ' ' + this.data.categoryPicker[1][e.detail.value[1]]
    this.setData({
      categoryPickerIndex: e.detail.value,
      chosenCategory: this.data.chosenCategory
    })
  },
  chooseArea(e) {
    this.setData({
      areaPickerIndex: e.detail.value
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
    wx.getLocation({
      success: res => {
        this.data.latitude = res.latitude
        this.data.longitude = res.longitude
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
  },
  checkBlank(toSubmitObj) {
    let checkBlankResult = StringUtils.isNotBlank(toSubmitObj.miaoshu) &&
      this.data.photoUrls.length != 0 &&
      StringUtils.isNotBlank(this.data.chosenCategory) &&
      StringUtils.isNotBlank(this.data.areaPickerIndex) &&
      StringUtils.isNotBlank(this.data.address)
    return checkBlankResult
  },
  formCheck(toSubmitObj) {
    let errMsg = ''
    //判断每个元素是否为空
    if (!this.checkBlank(toSubmitObj)) {
      errMsg = '请将表单信息补充完整'
    }
    if (StringUtils.isNotBlank(errMsg)) {
      wx.showToast({
        title: errMsg,
        icon: 'none'
      })
      return
    }
    return true
  },
  formSubmit(e) {
    let toSubmitObj = e.detail.value
    toSubmitObj.categories = this.data.chosenCategory.split(' ')[0]
    toSubmitObj.countrysideId = this.data.areaPickerIndex
    toSubmitObj.address = this.data.address
    toSubmitObj.address = this.data.address
    toSubmitObj.people = app.globalData.userInfo.uirealname
    toSubmitObj.phone = ""
    toSubmitObj.photo = ""
    toSubmitObj.smallcategories = this.data.chosenCategory.split(' ')[1]
    toSubmitObj.source = "智慧环卫"
    toSubmitObj.x = this.data.latitude
    toSubmitObj.y = this.data.longitude
    console.log("上报数据toSubmitObj")
    console.log(toSubmitObj)
    if (!this.formCheck(toSubmitObj)) {
      return
    }
    wx.request({
      url: app.globalData.domain + '/CountrysideProblem/addCountrysideProblem',
      data: toSubmitObj,
      method: 'post',
      success: res => {
        console.log("数据res.data")
        console.log(res.data)
      },
      fail: res => {
        console.log(res)
      }
    })


  }
})