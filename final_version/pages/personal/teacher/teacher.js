// pages/teacher/teacher.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
    etBack:'',
    school:'',
    permission:'',
    permissiontext:'',
    no:'',
  },

  goToPteacher:function(){
    wx.navigateTo({
      url: '/pages/personal/teacher/pteacher/pteacher',
    })
  },
  goTo1: function () {
    wx.switchTab({
      url: '/pages/personal/personal',
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

          if (res.data.code == 200) {
            console.log(res.data);
            that.setData({
              etBack: res.data.data.etBack,
              school: res.data.data.school,
              permission: res.data.data.permission,
              no:res.data.data.no,
            })
            if (res.data.data.permission == 1) {
              that.setData({
                permissiontext: '未审核',
              })}
            else if (res.data.data.permission == 2) {
              that.setData({
                permissiontext: '审核中',
              })
            }
            else if (res.data.data.permission == 3) {
              that.setData({
                permissiontext: '审核通过',
              })
            }
          }
          else {
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