// pages/update/update.js
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
    usersId: wx.getStorageSync("id"),
    h: app.globalData.screenHeight,
    childrenname: [], //2候选人
    childrenname1: [], //3候选人
    imgs: [], //用户上传图片
    show: true, //照片默认图片
    picture: "",
    scrollTop: 0, //控制上滑距离
    windowHeight: 0, //页面高度

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let taskId = options.taskId
    console.log(taskId)
    this.setData({
      taskId,
    })
  },
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  timeChange: function(e) { //一级时间
    this.setData({
      taskdate: e.detail.value,
      [`data.createDate`]: e.detail.value
    })
  },
  timechildChange: function(e) { //二级时间
    var time1val = e.detail.value
    var index = e.currentTarget.dataset.index
    console.log(time1val, index)
    this.setData({
      task1date: e.detail.value,
      [`data.childs[${index}].createDate`]: time1val
    })
  },
  timechildrenChange: function(e) { //三级时间
    var time2val = e.detail.value
    let index = e.currentTarget.dataset.index;
    var childindex = e.currentTarget.dataset.childindex
    this.setData({
      task2date: e.detail.value,
      [`data.childs[${index}].childs[${childindex}].createDate`]: time2val,
    })
  },
  addChange: function(e) { //二级添加
    var data = this.data.data
    var childs = data.childs
    var that = this;
    var height = wx.getSystemInfoSync().windowHeight;
    childs.push(child = {
      id: null,
      usersId: wx.getStorageSync("id"),
      participantId: wx.getStorageSync("id"),
      title: "",
      createDate: "",
      createName: "",
      titleImg: "",
      participantName: "",
      invite: "1",
      mainTaskId: "",
      content: "",
      state: 1,
      ifDelete: 0,
      ifEdit: 0,
      invite: 1,
      parentId: "",
      description: "",
      ifView: 0,
      hot: 0,
      remark: "",
      creator: wx.getStorageSync("id"),
      childs: [],
    })
    this.setData({
      data,
      open: true
    })
    wx.createSelectorQuery().select('#page').boundingClientRect(function(rect) {
      if (rect) {
        that.setData({
          windowHeight: height * 3,
          scrollTop: rect.height * 3
        })
      }
    }).exec()
  },
  delChange: async function(e) { //二级删除
    var data = this.data.data
    var childs = data.childs
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var taskId = item.id
    var usersId = wx.getStorageSync("id")
    var that = this
    wx.showModal({
      title: '确定需要删除',
      showCancel: true, //是否显示取消按钮
      cancelText: "取消", //默认是“取消”
      confirmText: "删除", //默认是“确定”
      confirmColor: '#DC4C41',
      success: async function(res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
          wx.showToast({
            title: '已取消',
            icon: "none",
            duration: 1500
          })
          wx.stopPullDownRefresh()
        } else if (res.confirm) {
          let param = {
            taskId,
            usersId
          }
          if (taskId !== null) {
            let res = await _Post(API.deleteList, param)
            if (res.code !== 200) {
              wx.showToast({
                title: '删除失败',
                icon: "none"
              })
              console.log(res)
            }
          }
          childs.splice(index, 1)
          that.setData({
            data
          })
        }
      },
    })
  },
  addChildchange: function(e) { //三级添加
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var data = this.data.data
    var childs = data.childs
    childs[index].childs.push({
      id: null,
      usersId: wx.getStorageSync("id"),
      participantId: wx.getStorageSync("id"),
      title: "",
      createDate: "",
      createName: "",
      titleImg: "",
      participantName: "",
      invite: "1",
      mainTaskId: "",
      content: "",
      state: 1,
      ifDelete: 0,
      ifEdit: 0,
      invite: 1,
      parentId: "",
      description: "",
      ifView: 0,
      hot: 0,
      remark: "",
      creator: wx.getStorageSync("id"),
    })
    let that = this
    that.setData({
      data
    })
    var height = wx.getSystemInfoSync().windowHeight;
    wx.createSelectorQuery().select('#page').boundingClientRect(function(rect) {
      if (rect) {
        that.setData({
          windowHeight: height * 3,
          scrollTop: rect.height * 3
        })
      }
    }).exec()
  },
  del: function(e) { //三级删除
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var childindex = e.currentTarget.dataset.childindex
    var data = this.data.data
    var childs = data.childs
    var taskId = item.id
    var usersId = wx.getStorageSync("id")
    var that = this
    wx.showModal({
      title: '确定需要删除',
      showCancel: true, //是否显示取消按钮
      cancelText: "取消", //默认是“取消”
      confirmText: "删除", //默认是“确定”
      confirmColor: '#DC4C41',
      success: async function(res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
          wx.showToast({
            title: '已取消',
            icon: "none",
            duration: 1500
          })
          wx.stopPullDownRefresh()
        } else if (res.confirm) {
          let param = {
            taskId,
            usersId
          }
          if (taskId !== null) {
            let res = await _Post(API.deleteList, param)
            if (res.code !== 200) {
              wx.showToast({
                title: '删除失败',
                icon: "none"
              })
              console.log(res)
            }
          }
          childs[index].childs.splice(childindex, 1)
          that.setData({
            data
          })
        }
      },
    })
  },
  titleFChange(e) { //一级标题
    let title = e.detail.value
    this.setData({
      title: title,
      [`data.title`]: title
    })
  },
  labelFChange(e) { //一级标签
    let label = e.detail.value
    this.setData({
      label: label,
      [`data.label`]: label
    })
  },
  titleChange1(e) { //二级标题
    let titleval = e.detail.value
    let index = e.currentTarget.dataset.index;
    this.setData({
      titleval: titleval,
      [`data.childs[${index}].title`]: titleval
    })
  },
  //二级负责人候选
  people: async function(e) {
    var item = e.currentTarget.dataset.item
    var childrenname = this.data.childrenname
    var taskId = item.id
    if (taskId !== null) {
      var res = await _Post(API.findByTaskId, {
        taskId
      })
      let {
        code,
        data
      } = res
      if (code === 200) {
        if (data.length === 0) {
          childrenname.push(wx.getStorageSync("name"))
          this.setData({
            childrenname,
          })
        } else {
          for (var i = 0; i < data.length; i++) {
            if (childrenname[i] !== data[i].userName) {
              childrenname.push(data)
            }
            this.setData({
              childrenname
            })
          }
        }
      }
    } else {
      childrenname.push(wx.getStorageSync("name"))
      this.setData({
        childrenname,
      })
    }
  },
  people1: async function(e) { //三级候选人
    var item = e.currentTarget.dataset.item
    var childrenname1 = this.data.childrenname1
    var taskId = item.id
    if (taskId !== null) {
      var res = await _Post(API.findByTaskId, {
        taskId
      })
      let {
        code,
        data
      } = res
      if (code === 200) {
        if (data.length === 0) {
          childrenname1.push(wx.getStorageSync("name"))
          this.setData({
            childrenname1,
          })
        } else {
          for (var i = 0; i < data.length; i++) {
            var childrenname1 = this.data.childrenname1
            childrenname1.push(data[i].userName)
            this.setData({
              childrenname1
            })
          }
        }
      }
    } else {
      childrenname1.push(wx.getStorageSync("name"))
      this.setData({
        childrenname1,
      })
    }
  },
  nameChange(e) { //二级负责人
    var index2 = e.detail.value
    let nameval = this.data.childrenname[index2]
    let index = e.currentTarget.dataset.index;
    var item = e.currentTarget.dataset.item
    console.log(item)
    this.setData({
      nameval: nameval,
      [`data.childs[${index}].participantName`]: nameval
    })
  },
  titleChange(e) { //三级标题
    let title1val = e.detail.value
    let index = e.currentTarget.dataset.index;
    var childindex = e.currentTarget.dataset.childindex
    var data = this.data.data
    var childs = data.childs
    this.setData({
      title1val: title1val,
      [`data.childs[${index}].childs[${childindex}].title`]: title1val,
    })
  },
  namechildChange(e) { //三级负责人
    var index1 = e.detail.value
    var name1val = this.data.childrenname1[index1]
    let index = e.currentTarget.dataset.index;
    var childindex = e.currentTarget.dataset.childindex
    this.setData({
      name1val: name1val,
      [`data.childs[${index}].childs[${childindex}].participantName`]: name1val,
    })
  },
  // 上传图片
  chooseImg: function(e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 1) {
      this.setData({
        lenMore: 1,
        show: false
      });
      setTimeout(function() {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        const fs = wx.getFileSystemManager()
        var imgs = that.data.imgs;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 1) {
            that.setData({
              imgs: imgs,
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
            fs.readFile({
              filePath: tempFilePaths[0],
              encoding: 'base64',
              success: async function(data) {
                if (data.errMsg == 'readFile:ok')
                  that.setData({
                    picture: data.data
                  })
                var picture = that.data.picture
                var usersId = wx.getStorageSync("id")
                var param = {
                  picture,
                  usersId
                }
                let res = await _Post(API.uploadPic, param)
                if (res.code === 200) {
                  that.setData({
                    [`data.titleImg`]: res.data
                  })
                }
              }
            })
          }
        }
        that.setData({
          imgs: imgs,
          show: false
        });
      }
    });
  },
  // 预览图片
  previewImg: function(e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  // 删除图片
  deleteImg: function(e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      show: true,
      imgs: imgs,
      [`picture`]: "",
      [`data.titleImg`]: ""
    });
  },
  taskSubChange: async function(e) {
    var records = this.data.data
    let res = await _Post(API.createTask, records)
    let {
      code,
      data
    } = res
    console.log(data, res)
    wx.setStorageSync("code", code)
    if (wx.getStorageSync("code") === 200) {
      wx.showToast({
        title: '修改成功',
        icon: "none",
        duration: 1500
      })
      wx.switchTab({
        url: '../index/index',
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
      var obj = {
        usersId: wx.getStorageSync("id")
      }
      var data1 = {
        ...data,
        ...obj
      }
      console.log(data1)
      this.setData({
        data: data1,
        img: data.titleImg
      })
    } else if (wx.getStorageSync("code") === 14033) {
      wx.setStorageSync("token", res.data)
      wx.showToast({
        title: '登录失败,下拉刷新即可',
        icon: "none",
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
      wx.showToast({
        title: '登录失败,请重新登录',
        icon: "none",
        duration: 2000
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