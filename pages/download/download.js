// pages/download/download.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  back: function() {
    console.log(1)
    wx.navigateBack({
      delta: 1,
      th: app.globalData.statusBarHeight
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '邀请你加入iTasks兼具任务委派分工和任务协同办公的新潮App！',
      path: '/pages/index/index',
      success: function(res) {}
    }
  }
})