//index.js
//获取应用实例
const {
  _Post,
  _Get
} = require('../../utils/request')
var util = require('../../utils/util.js');
const API = require('../../utils/api')

const app = getApp()
Page({
  data: {
    records: [],
    task: [{
        id: "0",
        name: "扫一扫",
        img: "/images/qrcode.png"
      }, {
        id: "1",
        name: "加入项目",
        img: "/images/taskicon.png"
      },
      {
        id: "2",
        name: "新建项目",
        img: "/images/newly.png"
      },
      {
        id: "3",
        name: "下载APP",
        img: "/images/downloadicon.png"
      }
    ],
    showModel: false, //下拉框开关
    showModal: false, //背景遮罩开关
    modal: false, //邀请码开关
    addmodal: false, //加入项目开关
    th: app.globalData.statusBarHeight,
    h: app.globalData.screenHeight,
    name: [{
      title: "未完成",
      img: "/images/unsuccess.png"
    }, {
      title: "已完成",
      img: "/images/success.png"
    }, {
      title: "我的发布",
      img: "/images/release.png"
    }, {
      title: "任务列表",
      img: "/images/task.png"
    }],

  },

  closewindow: function() {
    this.setData({
      showModel: false,
      showModal: false,
      modal: false,
      addmodal: false
    })
  },
  showChange: function() {
    var showModel = this.data.showModel
    var records = this.data.records
    if (showModel === false) {
      this.setData({
        showModel: true
      })
    } else {
      this.setData({
        showModel: false
      })
    }
  },

  getScancodeChange: function() {
    this.setData({
      showModel: false,
    })
    var that = this
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        console.log(result)
        wx.request({
          url: result,
          header: {
            Authorization: wx.getStorageSync("token"),
          },
          success(res) {
            var data = res.data.data

            if (res.statusCode === 200) {
              that.setData({
                showModal: true, //背景遮罩开关
                addmodal: true,
                data: data,
                inviteCode: data.inviteCode,
              })
            }
          }
        })
      }
    })

  },
  okChange: async function(e) {
    var inviteCode = e.detail.value['invitationcode']
    if (wx.getStorageSync("id") !== "") {
      if (inviteCode !== "") {
        var that = this
        let res = await _Get(API.findByInviteCode + inviteCode)
        let {
          code,
          data
        } = res
        if (code === 200) {
          this.setData({
            modal: false,
            addmodal: true,
            data: data,
            inviteCode: inviteCode
          })
        } else if (code === 14041) {
          console.log(code)
          wx.showToast({
            title: res.message,
            icon: "none",
            duration: 1500
          })

          setTimeout(function() {
            that.setData({
              showModal: false,
              modal: false,
            })
          }, 1500)
        }
      } else {
        wx.showToast({
          title: '邀请码不能为空',
          icon: "none",
          duration: 1500
        })
      }
    } else {
      wx.showToast({
        title: '请先登录之后再点击加入',
        icon: "none",
        duration: 1500
      })
    }
    console.log(inviteCode)
  },
  openChange: function() {
    this.setData({
      showModel: false, //下拉框开关
      modal: true,
      showModal: true,
    })
  },
  joinChange: async function() {
    var usersId = wx.getStorageSync("id")
    var taskId = this.data.data.id
    var inviteCode = this.data.inviteCode
    var param = {
      usersId,
      taskId,
      inviteCode
    }
    let res = await _Post(API.joinByInviteCode, param)
    if (res.code === 200) {
      this.setData({
        addmodal: false,
        showModal: false
      })
      wx.showToast({
        title: '加入成功',
        icon: "none",
        duration: 1500
      })
      this.onShow()
    } else if (res.code === 1101) {
      wx.showToast({
        title: '已是项目成员，请不要重复加入',
        icon: "none",
        duration: 1500
      })
      this.setData({
        addmodal: false,
        showModal: false
      })
    } else if (res.code === 16005) {
      wx.showToast({
        title: res.message,
        icon: "none",
        duration: 1500
      })
      this.setData({
        addmodal: false,
        showModal: false
      })
    }
  },
  closeChange: function() {
    this.setData({
      addmodal: false,
      showModal: false
    })
  },
  touchChange: function(e) {
    let {
      title
    } = e.currentTarget.dataset.item
    console.log(title)
    if (title == "未完成") {
      wx.navigateTo({
        url: '../uncomplete/uncomplete',
      })
    } else if (title == "已完成") {
      wx.navigateTo({
        url: '../complete/complete',
      })
    } else if (title == "我的发布") {
      wx.navigateTo({
        url: '../release/release',
      })
    } else if (title == "任务列表") {
      wx.navigateTo({
        url: '../tasklist/tasklist',
      })
    } else {
      wx.navigateTo({
        url: '',
      })
    }
  },
  addChange: function() { //下载app
    this.setData({
      showModel: false,
    })
    wx.navigateTo({
      url: '../download/download',
    })
  },
  newtaskChange: function() { //新建任务
    this.setData({
      showModel: false,
    })
    wx.navigateTo({
      url: '../newtask/newtask',
    })
  },
  onLoad: function() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? +(date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? +date.getDate() : date.getDate();
    console.log(M, D);
    this.setData({
      M,
      D
    })
  },

  touchChange1: function(e) {
    let records = e.currentTarget.dataset.records
    wx.navigateTo({
      url: '../project/project?records=' + JSON.stringify(records.id)
    })
    console.log(records.id)
  },
  onShow: async function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    let token = wx.getStorageSync("token")
    let id = wx.getStorageSync("id")

    if (id !== "") {
      let param = {
        page: "1",
        pageCount: "999",
        type: "6",
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
        var records = this.data.records
        this.setData({
          records: data.records,
        })
        console.log(data.records)
      } else if (wx.getStorageSync("code") === 14033) {
        wx.setStorageSync("token", res.data)
        wx.showToast({
          title: '身份验证过期,下拉刷新即可',
          icon: "none",
          duration: 2000
        })
      }
    } else {
      this.setData({
        records: ""
      })
    }

  },
  onPullDownRefresh: function() {
    var to = wx.getStorageSync("to")
    if (to !== "getPhoneNumber:ok") {
      var that = this
      wx.showModal({
        title: '您还未登录点击确定登录',
        showCancel: true, //是否显示取消按钮
        cancelText: "取消", //默认是“取消”
        confirmText: "确定", //默认是“确定”
        success: function(res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
            wx.stopPullDownRefresh()
            wx.showToast({
              title: '已取消',
              icon: "none",
              duration: 1500
            })
          } else {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        },
      })
    } else {
      wx.showLoading({
        title: 'Loading...',
        icon: "loading"
      })
      this.onShow()
    }
  },
  onShareAppMessage: function() {
    return {
      title: '邀请你加入iTasks兼具任务委派分工和任务协同办公的新潮App！',
      path: '/pages/index/index',
      success: function(res) {}
    }
  }
})