// pages/personal/personal.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    name:'',
    menuitems: [
      { text: '个人资料', url: '/pages/personal/pinformation/pinformation', icon: '/pages/personal/3.png', tips: '', arrows: '/pages/personal/5.png' },
      { text: '教员审核', url: '/pages/personal/teacher/teacher', icon: '/pages/personal/2.png', tips: '', arrows: '/pages/personal/5.png' },
     
      { text: ' 发布查询', url: '/pages/personal/fquery/fquery', icon: '/pages/personal/55.png', tips: '', arrows: '/pages/personal/5.png'},
      { text: ' 退 出', url: '/pages/login/login', icon: '/pages/personal/6.png', tips: '' }
    ]

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
    this.setData({
      name: app.appData.userinfo.name,
      username:app.appData.userinfo.username
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