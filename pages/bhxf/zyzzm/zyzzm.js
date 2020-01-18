const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partisanPicker: ['群众', '少先队员', '共青团员', '党员'],
    partisanPickerIndex: -1,
    educationPicker: ['小学', '中学', '高中', '专科', '本科', '硕士', '博士'],
    educationPickerIndex: -1,
    photoUrls: [],
    px: [] //技能证书
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  cjdwInput(e){
    this.data.cjdw = e.detail.value.join(";")
  },
  choosePartisan(e) {
    this.setData({
      partisanPickerIndex: e.detail.value
    })
  },
  chooseCertificateDate(e) {
    this.setData({
      certificateDate: e.detail.value
    })

  },
  pxdwInput(e) {
    this.setData({
      pxdw: e.detail.value
    })

  },
  zsmcInput(e) {
    this.setData({
      zsmc: e.detail.value
    })

  },
  addPX() {
    if (!this.data.certificateDate) {
      wx.showToast({
        title: '请先选择日期',
        icon: 'none'
      })
      return
    }
    if (!this.data.pxdw) {
      wx.showToast({
        title: '请先填写培训单位',
        icon: 'none'
      })
      return
    }
    if (!this.data.zsmc) {
      wx.showToast({
        title: '请先填写证书名称',
        icon: 'none'
      })
      return
    }
    this.data.px.push({
      sj: this.data.certificateDate,
      pxdw: this.data.pxdw,
      zsmc: this.data.zsmc
    })
    this.setData({
      px: this.data.px,
      certificateDate: null,
      pxdw: null,
      zsmc: null

    })
    wx.showToast({
      title: '添加成功'
    })

  },
  deletePX(e) {
    this.data.px.splice(e.target.dataset.index, 1)
    this.setData({
      px: this.data.px
    })
  },
  chooseEducation(e) {
    this.setData({
      educationPickerIndex: e.detail.value
    })
  },


  chooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: res => {
        
        this.setData({
          photoUrls: res.tempFilePaths
        })

      }
    });
  },
  deleteImage() {
    this.setData({
      photoUrls: []
    })
  },
  check(toSubmitObjTmp) {
    return true
  },
  submit(e) {
    console.log(e.detail.value)
    let toSubmitObj = e.detail.value
    if (!this.check(toSubmitObj))
      return
    //出生年月由身份证推算出来
    toSubmitObj.csny = toSubmitObj.sfz ? toSubmitObj.sfz.substring(6, 10) + "-" + toSubmitObj.sfz.substring(10, 12) : ''
    toSubmitObj.createId = app.globalData.userInfo ? app.globalData.userInfo.uibooth : ""
    toSubmitObj.px = this.data.px
    toSubmitObj.cjdw = this.data.cjdw
    toSubmitObj.xl = this.data.educationPicker[this.data.educationPickerIndex]
    toSubmitObj.zzmm = this.data.partisanPicker[this.data.partisanPickerIndex]
   
    //上传图片
    if (this.data.photoUrls.length == 0){//头像没选，不上传
      return
    }
    wx.uploadFile({
      url: app.globalData.domain + 'file/wxfileUpload',
      filePath: this.data.photoUrls[0],
      header: {
        "Content-Type": "multipart/form-data"
      },
      name: 'fileName',
      success: res => {
        console.log(res.data)
        toSubmitObj.tx = JSON.parse(res.data).obj
        console.log(toSubmitObj)
        wx.request({
          url: app.globalData.domain + 'dyjf/addZyz',
          method: 'post',
          data: toSubmitObj,
          success: res => {
            console.log(res.data)
            if (res.data.result) {
              wx.showToast({
                title: '提交成功'
              })
              setTimeout(() => {
                wx.navigateBack({})
              }, 1000)
            } else {
              if (res.data.message) {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none'
                })
              }
            }
          },
          fail: res => {
            console.log(res)
          }
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  }
})