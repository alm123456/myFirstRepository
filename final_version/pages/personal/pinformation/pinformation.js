// pages/personal/pinformation/pinformation.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    username:'',
    name:'',
    sex:'',
    address:'',
    email:'',

  },
  goTo1: function () {
    wx.switchTab({
      url: '/pages/personal/personal',
    })
  },
  goToPChange: function () {
    wx.navigateTo({
      url: '/pages/personal/pinformation/pchange/pchange',
    })
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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

        if(res.data.code==200){
        console.log(res.data);
          that.setData({
          name: res.data.data.name,
          sex: res.data.data.sex,
          age: res.data.data.age,
          address: res.data.data.address,
          email: res.data.data.mailbox
        })}
        else {
          wx.showToast({

            title: '查询失败',

            icon: 'none',

            duration: 2000//持续的时间

          })}
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})