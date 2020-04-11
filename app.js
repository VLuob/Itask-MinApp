//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  globalData: {
    userInfo: null,
    id: '',
    yh: "",
    h: ""
  },
  onShow: function(options) {
    var that = this
    var res = wx.getSystemInfoSync()
    var yh = parseInt(that.globalData.statusBarHeight = res.statusBarHeight * 2)
    var h = parseInt(that.globalData.screenHeight = res.screenHeight)
  },
})