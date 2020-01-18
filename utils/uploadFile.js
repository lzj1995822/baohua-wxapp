const app = getApp()
const uploadFile = path => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: app.globalData.domain + '/file/wxfileUpload',
      filePath: path,
      header: {
        "Content-Type": "multipart/form-data"
      },
      name: 'fileName',
      success: res => {
        console.log(res)
        try {
          resolve(JSON.parse(res.data).obj)
        } catch (err) {
          reject(err)
        }
      },
      fail: res => {
        reject(res)
      }
    })
  })
}
const uploadFiles = pathArr => {
  return Promise.all([
    pathArr.forEach((value) => {
      this.uploadFile(value)
    })
  ])
}
export{
  uploadFile, uploadFiles
}