// pages/admin/admin.js
const app = getApp()
Page({
username:'',
  /**
   * 页面的初始数据
   */
  data: {
    currtab:0,
    swipertab: [ { name: '教员审核管理', index: 0 }, { name: '个人信息', index: 1 }],
    text: [],
    name: '',
    sex: '',
    age: '',
    address: '',
    email: '',
    account:'',
    password:'',
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
  waitPayShow1: function () {
    this.setData({
      text :[{
        account: 11111111,
        name: 'alm',
        school: '',
        etBack: '',
        no: '',
      },
        {
          account: 11111111,
          name: 'alm',
          school: '',
          etBack: '',
          no: '',
        }]})
  },
  goTotext1: function (event) {
    let value = event.currentTarget.dataset.value
    console.log("value：" + value)},

  waitPayShow: function () {
    var that = this
    wx.request({
      url: 'http://localhost:8080/user/selectUserList',
      data: {
        permission: 2,
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
              account: res.data.data[i].account,
              name: res.data.data[i].name,
              school: res.data.data[i].school,
              etBack: res.data.data[i].etBack,
              no: res.data.data[i].no,
            }
            console.log(i);
            console.log(res.data.data[i].cardid);

          }
          that.setData({
            text: text
          })
        }
        else {
          let text = []
          that.setData({
            text: text})
          
          wx.showToast({

            title: '无审核信息',

            icon: 'none',

            duration: 2000//持续的时间

          })
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    }) },
  goTOlogin: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
},
  goToDE:function(event){
    var that=this
    let value = event.currentTarget.dataset.value
    console.log("value：" + value)
    wx.request({
      url: 'http://localhost:8080/user/updateUserPer',
      data: {
        account: value,
        flag: 2,

      },
     
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data);
          wx.showToast({

            title: '不通过成功',

            icon: 'succeed',

            duration: 2000//持续的时间

          })
          that.waitPayShow()

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
    })
  },
  goTotext: function (event) {
    var that=this
    let value = event.currentTarget.dataset.value
    console.log("value：" + value)
    wx.request({
      url: 'http://localhost:8080/user/updateUserPer',
      data: {
        account: value,
        flag:1,
        
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data);
          wx.showToast({

            title: '已通过',

            icon: 'succeed',

            duration: 2000//持续的时间

          })
          that.waitPayShow()
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
    })
  },
 


  onShow:function(){
    this.setData({ username: app.appData.userinfo.username,})
    var that = this
    this.setData({
      username: app.appData.userinfo.username,
      password: app.appData.userinfo.password
    }),
      wx.request({
        url: 'http://localhost:8080/user/login',
        data: {
          account: this.data.username,
          password: this.data.password
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {

          if (res.data.code == 200) {
            console.log(res.data);
            that.setData({
              name: res.data.data.name,
              sex: res.data.data.sex,
              age: res.data.data.age,
              address: res.data.data.address,
              email: res.data.data.mailbox
            })
          }
          else {
            that.setData({
              name: '',
              sex: '',
              age: '',
              address: '',
              email: ''
            })
            wx.showToast({

              title: '查询失败',

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
  goTOlogin: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })},
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
   
  goTo1: function () {
    wx.navigateTo({
      url: '/pages/admin/xg/xg',
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
        that.waitPayShow()
        break
      case 1:
        that.lostShow()
        break
    }
  },



  lostShow: function () {
    this.setData({
      lostOrder: [{ name: "英语讲课", money: "122" }],
    })
  },


})
