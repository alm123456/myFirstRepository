// pages/personal/pinformation/pchange/pchange.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      username:'',
      password:'',
      name:'',
      sex:'',
      address:'',
      email:'',
      age:'',
      permission: 1,
      school: '',
      etBack: '',
      no:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  nameInput: function (event) {
    this.setData({ name: event.detail.value }),
      console.log(event)
  },
  sexInput: function (event) {
    this.setData({ sex: event.detail.value }),
      console.log(event)
  },
  addressInput: function (event) {
    this.setData({ address: event.detail.value }),
      console.log(event)
  },
  emailInput: function (event) {
    this.setData({ email: event.detail.value }),
      console.log(event)
  },
  ageInput: function (event) {
    this.setData({ age: event.detail.value }),
      console.log(event)
  },
  goTo11:function(){
    wx.navigateTo({
      url: '/pages/personal/pinformation/pinformation',
    }),
      wx.showToast({

        title: '成功',

        icon: 'success',

        duration: 2000//持续的时间

      })
  },
  goToText:function(){
    
    wx.request({
      url: 'http://localhost:8080/user/updateUser',
      data: {
        account: this.data.username,
        password:this.data.password,
        name: this.data.name,
        sex: this.data.sex,
        address: this.data.address,
        mailbox: this.data.email,
        age:this.data.age,
        permission:this.data.permission,
        school: this.data.school,
        etBack: this.data.etBack,
        no:this.data.no,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data.code==200){
        console.log(res.data);
        wx.showToast({

          title: '修改成功',

          icon: 'succeed',

          duration: 2000//持续的时间

        })
        wx.navigateTo({
          
          url: '/pages/personal/pinformation/pinformation',
        })}
        else{
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
  goToPChange: function () {
    wx.navigateTo({
      url: '/pages/personal/pinformation/pinformation',
    })
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
      password: app.appData.userinfo.password,
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
              email: res.data.data.mailbox,
              permission: res.data.data.permission,
              school: res.data.data.school,
              etBack: res.data.data.etBack,
              no: res.data.data.no,
            })
          }
          else {
            wx.showToast({

              title: '无个人信息',

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