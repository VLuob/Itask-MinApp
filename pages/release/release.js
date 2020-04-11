// pages/release/release.js
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
    records: [], //我的发布列表数据
    th: app.globalData.statusBarHeight,
    h: app.globalData.screenHeight,
  },
  touchChange: function(e) {
    let records = e.currentTarget.dataset.records
    wx.navigateTo({
      url: '../project/project?records=' + JSON.stringify(records.id)
    })
    console.log(records)
  },
  back: function() {
    wx.navigateBack({
      delta: 1
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
  onShow: async function() {
    var id = wx.getStorageSync("id")
    if (id !== "") {
      let param = {
        page: "1",
        pageCount: "999",
        type: "3",
        usersId: id
      }
      let res = await _Post(API.getList, param)
      let {
        code,
        data
      } = res
      wx.setStorageSync("code", code)
      if (wx.getStorageSync("code") === 200) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        this.setData({
          records: data.records,
        })
      } else if (wx.getStorageSync("code") === 14033) {
        wx.setStorageSync("token", res.data)
        wx.showToast({
          title: '身份验证过期,下拉刷新即可',
          icon: "none",
          duration: 2000
        })
      } else {
        wx.navigateTo({
          url: '../login/login',
        })
      }
    }

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
    if (wx.getStorageSync("id") !== "") {
      wx.showLoading({
        title: 'Loading...',
        icon: "loading"
      })
      this.onShow()
    } else {
      wx.stopPullDownRefresh()
    }
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