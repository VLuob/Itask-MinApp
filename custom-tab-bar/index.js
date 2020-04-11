Component({
  data: {
    selected: 0,
    color: "#666",
    selectedColor: "#dc4c41",
    "list": [
      {
        "selectedIconPath": "/images/tasktab.png",
        "iconPath": "/images/untasktab.png",
        "pagePath": "/pages/index/index",
        "text": "首页"
      },
      {
        "selectedIconPath": "/images/usertab.png",
        "iconPath": "/images/unusertab.png",
        "pagePath": "/pages/user/user",
        "text": "我的"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})