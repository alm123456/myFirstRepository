// pages/order/order.js
// pages/order/order.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{ name: '已发布', index:0},{ name: '进行中', index: 1 }, { name: '已完成', index: 2 }],
    text:[],
    text2:[],
    text3:[],
    account:'',
    accounttest:'',
    id:'',
    account2:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },

  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },

  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },

  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },

  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.doingShow()
        break
      case 2:
        that.waitPayShow()
        break
     
    }
  },

  doingShow: function(){
    this.setData({
      account: app.appData.userinfo.username
    })
    var that = this
    wx.request({
      url: 'http://localhost:8080/order/selectById',
      data: {
        account: this.data.account,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let text = []
        if (res.data.code == 200) {
          console.log(res.data.data);
          for (var i = 0; i < res.data.data.length; i++) {
            text[i] = {
              account1: res.data.data[i].account,
              account2: res.data.data[i].order[0].account,
              id: res.data.data[i].order[0].id,
              title: res.data.data[i].title,
              subject: res.data.data[i].course,
              level: res.data.data[i].level,
              money: res.data.data[i].money,
              time: res.data.data[i].time,
              address: res.data.data[i].address,
              grade_name: res.data.data[i].grade
            }
          }

          that.setData({
            text2: text
          })
        }
        else {
          let text = []
          that.setData({
            text2: text
          })
          wx.showToast({

            title: '无进行中的订单信息',

            icon: 'none',

            duration: 2000//持续的时间

          })
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },

  alreadyShow: function () {
    this.setData({
      account: app.appData.userinfo.username
    })
    var that = this
    wx.request({
      url: 'http://localhost:8080/order/selectFromId',
      data: {
        account:that.data.account,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let text = []
        if (res.data.code == 200) {
          console.log(res.data.data);
          for (var i = 0; i < res.data.data.length; i++) {
            text[i] = {
              account1: res.data.data[i].account,
              account2: res.data.data[i].order[0].account,
              id: res.data.data[i].order[0].id,
              title: res.data.data[i].title,
              subject: res.data.data[i].course,
              level: res.data.data[i].level,
              money: res.data.data[i].money,
              time: res.data.data[i].time,
              address: res.data.data[i].address,
              grade_name: res.data.data[i].grade
            }}
           
          that.setData({
            text: text
          })
        }
        else {
          let text = []
          that.setData({
            text: text
          })
          wx.showToast({

            title: '无进行中的订单信息',

            icon: 'none',

            duration: 2000//持续的时间

          })
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  waitPayShow: function () {
    this.setData({
      account: app.appData.userinfo.username
    })
    var that = this
    wx.request({
      url: 'http://localhost:8080/order/selectFinshOrder',
      data: {
        account: this.data.account,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let text = []
        if (res.data.code == 200) {
          console.log(res.data.data);
          for (var i = 0; i < res.data.data.length; i++) {
            text[i] = {
              account1: res.data.data[i].account,
              account2: res.data.data[i].order[0].account,
              id: res.data.data[i].order[0].id,
              title: res.data.data[i].title,
              subject: res.data.data[i].course,
              level: res.data.data[i].level,
              money: res.data.data[i].money,
              time: res.data.data[i].time,
              address: res.data.data[i].address,
              grade_name: res.data.data[i].grade
            }
            console.log(i);
            console.log(res.data.data[i].cardid);

          }
          that.setData({
            text3: text
          })
        }
        else {
          let text = []
          that.setData({
            text3: text
          })
          wx.showToast({

            title: '无完成的订单信息',

            icon: 'none',

            duration: 2000//持续的时间

          })
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  goToDE: function (event) {
    let value = event.currentTarget.dataset.value
    console.log("value：" + value)
    var that=this
    wx.request({
      url: 'http://localhost:8080/order/deleteOrder',
      data: {
        id: value,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data);
          wx.showToast({

            title: '取消成功',

            icon: 'succeed',

            duration: 2000//持续的时间

          })
          that.orderShow()

        }
        else {
          wx.showToast({

            title: '修改失败',

            icon: 'none',

            duration: 2000//持续的时间

          })
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
        wx.showToast({

          title: '请求超时',

          icon: 'none',

          duration: 2000//持续的时间

        })
      }
    })},
  goToOK: function (event) {
    let value = event.currentTarget.dataset.value
    console.log("value：" + value)
    
let that=this
    wx.request({
      url: 'http://localhost:8080/order/updateOrder',
      data: {
        id: value,
        status:2,
        
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data);
          wx.showToast({

            title: '已完成',

            icon: 'succeed',

            duration: 2000//持续的时间

          })
          that.alreadyShow()

        }
        else {
          wx.showToast({

            title: '修改失败',

            icon: 'none',

            duration: 2000//持续的时间

          })
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
        wx.showToast({

          title: '请求超时',

          icon: 'none',

          duration: 2000//持续的时间

        })
      }
    })},
})
