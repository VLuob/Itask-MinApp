// pages/user/user.js
const {
  _Post,
  _Get
} = require('../../utils/request')
const API = require('../../utils/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    th: app.globalData.statusBarHeight,
    gender: "",
    userinfo: {}
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
  onShow: async function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    var usersId = wx.getStorageSync("id")
    if (usersId !== "") {
      let res = await _Post(API.myInfo, {
        usersId
      })
      let {
        code,
        data
      } = res
      if (code === 200) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        if (data.gender === 0) {
          this.setData({
            gender: "男"
          })
        } else {
          this.setData({
            gender: "女"
          })
        }
        this.setData({
          userinfo: data
        })
      }
    } else {
      wx.showModal({
        title: '您还未登录点击确定登录',
        showCancel: true, //是否显示取消按钮
        cancelText: "取消", //默认是“取消”
        confirmText: "确定", //默认是“确定”
        success: function(res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
            wx.showToast({
              title: '已取消',
              icon: "none",
              duration: 1500
            })
            wx.stopPullDownRefresh()
          } else {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        },
      })
    }

  },
  logoutChange: function() {
    wx.clearStorage()
    this.setData({
      userinfo: "",
      gender: ""
    })
    wx.switchTab({
      url: '../index/index',
    })
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
    wx.showLoading({
      title: 'Loading...',
    })
    this.onShow()
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