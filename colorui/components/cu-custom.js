const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    isToMine: {
      type: [Boolean],
      value: false
    },
    bgColor:{
      type:[String],
      value:'white'
    },
    fontColor:{
      type: [String],
      value: 'black'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toBack() {
      wx.navigateBack({
        delta: 1
      });
    },
    toMine(){
      wx.navigateTo({
        url: '/pages/mine/mine',
      })
    }
  }
})