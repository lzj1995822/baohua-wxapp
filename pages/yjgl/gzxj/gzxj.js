import StringUtils from '../../../utils/StringUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    polyline: [{
      points: [],
      color: "#67F75A",
      width: 5
    }],
    //标识上一次定位点，用于判断用户是否在移动
    lastPoint: {
      latitude: null,
      longitude: null,
    },
    isStart: false
  },
  onLoad() {
    wx.getLocation({
      success: res => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
      fail: res => {
        console.log(res)
      }
    })

  },
  start() {
    this.drawPolyline()
    this.interval = setInterval(() => {
      this.drawPolyline()
    }, 30000) //20秒获取一次点位
    this.setData({
      isStart: true
    })
  },
  stop() {
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.setData({
      isStart: false
    })
  },
  //获取当前位置，并将点塞到 polyline ，让小程序刷新路线
  drawPolyline() {
    wx.getLocation({
      success: res => {
        //判断当前点距离上一次位置的距离，如果大于10m,则塞入该点
        if (this.isMoving(res.latitude, res.longitude)) {
          this.data.polyline[0].points.push({
            longitude: res.longitude,
            latitude: res.latitude
          })
          this.setData({
            polyline: this.data.polyline
          })
        }
        console.log(this.data.polyline[0].points)
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  //判断用户是否在移动
  //规定移动距离大于10m，表示在动
  //并且把当前点设为 lastpoint
  isMoving(newLongitude, newLatitude) {
    let oldLatitude = this.data.lastPoint.latitude
    let oldLongitude = this.data.lastPoint.longitude
    this.data.lastPoint.latitude = newLatitude
    this.data.lastPoint.longitude = newLongitude
    //这里oldLatitude和oldLongitude为空表示是第一次比较，为空则塞进去
    if (StringUtils.isBlank(oldLatitude) ||
      StringUtils.isBlank(oldLongitude) ||
      this.getDistance(oldLatitude, oldLongitude, newLatitude, newLongitude) > 10) {
      return true
    }
  },
  //返回两个经纬度点的距离(m)
  getDistance(oldLatitude, oldLongitude, newLatitude, newLongitude) {
    var radLat1 = oldLatitude * Math.PI / 180.0;
    var radLat2 = newLatitude * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = oldLongitude * Math.PI / 180.0 - newLongitude * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378137.0; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    //console.log(s)
    return s;
  }

})