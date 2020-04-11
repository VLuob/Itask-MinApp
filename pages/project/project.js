// pages/project/project.js
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
    childs: [], //子任务
    data: {}, //父任务
    th: app.globalData.statusBarHeight,
    usersId: wx.getStorageSync("id"),
    h: app.globalData.screenHeight
  },
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let taskId = JSON.parse(options.records)
    this.setData({
      taskId,
    })
  },
  updateChange: function(e) {
    console.log(e)
    var usersId = wx.getStorageSync("id")
    var data = this.data.data
    console.log(data.participantId, usersId)
    if (usersId === data.creator) {
      let taskId = this.data.taskId
      wx.navigateTo({
        url: '../update/update?taskId=' + taskId,
      })
    } else {
      wx.showToast({
        title: '您没有权限编辑此任务',
        icon: "none"
      })
    }
  },
  touchChange: function(e) { //二级任务修改状态
    let index = e.currentTarget.dataset.index
    let item = e.currentTarget.dataset.item
    let mainTaskId = this.data.data.id
    let childs = this.data.childs
    let usersId = wx.getStorageSync("id")
    let taskId = item.id
    let that = this
    var participantId = JSON.parse(childs[index].participantId)
    if (usersId === participantId) {
      let param = {
        mainTaskId,
        usersId,
        taskId
      }
      if (childs[index].state === 2) {
        wx.showToast({
          title: '任务已经完成无法再次修改',
          icon: "none",
          duration: 1500
        })
      } else {
        wx.showModal({
          title: '确定需要修改',
          content: '此操作不可逆',
          success: function(res) {
            if (res.cancel) {
              wx.showToast({
                title: '已取消',
                icon: "none",
                duration: 1500
              })
            } else if (res.confirm) {
              if (childs[index].state === 1) {
                childs[index].state = 2
                wx.showToast({
                  title: '修改成功',
                  icon: "none",
                  duration: 1500
                })
                let res = _Post(API.updateState, param)
                that.setData({
                  childs: childs,
                  index: e.currentTarget.dataset.index,
                })
                setTimeout(function() {
                  that.onShow()
                }, 200)
              }
            }
          }
        })
      }
    } else {
      wx.showToast({
        title: '您没有权限设置此任务',
        icon: "none",
        duration: 1500
      })
    }
  },
  click: function(e) { //三级任务修改状态
    var index = e.currentTarget.dataset.key
    var item = e.currentTarget.dataset.item
    let usersId = wx.getStorageSync("id")
    var mainTaskId = this.data.data.id
    var taskId = item.id
    let participantId = JSON.parse(item.participantId)
    var that = this
    if (participantId === usersId) {
      let param = {
        mainTaskId,
        usersId,
        taskId
      }
      if (item.state === 2) {
        wx.showToast({
          title: '任务已经完成无法再次修改',
          icon: "none",
          duration: 1500
        })
      } else {
        wx.showModal({
          title: '确定需要修改',
          content: '此操作不可逆',
          success: function(res) {
            if (res.cancel) {
              wx.showToast({
                title: '已取消',
                icon: "none",
                duration: 1500
              })
            } else if (res.confirm) {
              if (item.state === 1) {
                item.state = 2
                wx.showToast({
                  title: '修改成功',
                  icon: "none",
                  duration: 1500
                })
                let res = _Post(API.updateState, param)
                setTimeout(function() {
                  that.onShow()
                }, 200)
              }
            }
          }
        })
      }
    } else {
      wx.showToast({
        title: '您没有权限设置此任务',
        icon: "none",
        duration: 1500
      })
    }
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
    let taskId = this.data.taskId
    let usersId = wx.getStorageSync("id")
    let param = {
      taskId,
      usersId
    }
    let res = await _Post(API.findAllByParentId, param)
    let {
      code,
      data
    } = res
    wx.setStorageSync("code", code)
    if (wx.getStorageSync("code") === 200) {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      var childs = data.childs
      this.setData({
        data: data,
        childs: childs,
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
    console.log(11)
    wx.showLoading({
      title: 'Loading...',
      icon: "loading"
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