// pages/newtask/newtask.js
const {
  _Post,
  _Get
} = require('../../utils/request')
var util = require('../../utils/util.js');
const API = require('../../utils/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    th: app.globalData.statusBarHeight,
    h: app.globalData.screenHeight,
    childrenname: ['请选择'],
    data: {
      id: null,
      usersId: wx.getStorageSync("id"),
      participantId: wx.getStorageSync("id"),
      title: "",
      label: "",
      labelColor: "DC4C41",
      createDate: "",
      createName: "",
      titleImg: "",
      participantName: wx.getStorageSync("name"),
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
      childs: [{
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
        childs: [{
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
        }],
      }]
    },
    imgs: [], //用户上传图片
    show: true, //照片默认图片
    picture: "",
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
    var that = this;
    var height = wx.getSystemInfoSync().windowHeight;
    var data = this.data.data
    var childs = data.childs
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
  delChange: function(e) { //二级删除
    var data = this.data.data
    var childs = data.childs
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    childs.splice(index, 1)
    this.setData({
      data
    })
  },
  addChildchange: function(e) { //三级添加
    let that = this
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
    childs[index].childs.splice(childindex, 1)
    this.setData({
      data
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
  nameChange(e) { //二级负责人
    var index2 = e.detail.value
    let nameval = this.data.childrenname[index2]
    let index = e.currentTarget.dataset.index;
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
    var name1val = this.data.childrenname[index1]
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
    console.log(1)
    var records = this.data.data

    var title = this.data.title
    var label = this.data.label
    var taskdate = this.data.taskdate

    var name = this.data.name
    var titleval = this.data.titleval
    var task1date = this.data.task1date

    var name1val = this.data.name1val
    var title1val = this.data.title1val
    var task2date = this.data.task2date
if(wx.getStorageSync("id")!==""){
    if (title === undefined && label === undefined && taskdate === undefined) {
      wx.showToast({
        title: '一级任务，标签，完成时间不能为空',
        icon: "none"
      })
    } else if (name === undefined && titleval === undefined && task1date === undefined) {
      wx.showToast({
        title: '二级任务，负责人，完成时间不能为空',
        icon: "none"
      })
    } else if (name1val === undefined && title1val === undefined && task2date === undefined) {
      wx.showToast({
        title: '三级任务，负责人，完成时间不能为空',
        icon: "none"
      })
    } else {

      let res = await _Post(API.createTask, records)
      let {
        code,
        data
      } = res
      console.log(data, res)
      wx.setStorageSync("code", code)
      if (wx.getStorageSync("code") === 200) {
        wx.showToast({
          title: '创建成功',
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
    }
    }else{
      wx.showToast({
        title: '您还未登录,登录后体验完整功能',
        icon:"none"
      })
    }
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
    var name = wx.getStorageSync("name")
    var childrenname = this.data.childrenname
    if (name !== "") {
      childrenname.push(name)
      this.setData({
        childrenname
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