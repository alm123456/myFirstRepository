// pages/login/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
    passwordtest:'',
    name:'',
    sex:'',
    address:'',
    email:'',
    permission:1,
    school:'',
    etBack:'',
    age:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  usernameInput: function (event) {
    this.setData({ username: event.detail.value }),
      console.log(event)
  },
  pwdInput: function (event) {
    this.setData({ password: event.detail.value }),
      console.log(event)
  }, 
  pwdtestInput: function (event) {
    this.setData({ passwordtest: event.detail.value }),
      console.log(event)
  }, 
  nameInput: function (event) {
    this.setData({ name: event.detail.value }),
      console.log(event)
  },
  sexInput: function (event) {
    this.setData({ sex: event.detail.value }),
      console.log(event)
  },
  ageInput: function (event) {
    this.setData({ age: event.detail.value }),
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
  goToText: function () {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (this.data.username == '' || this.data.password == '' || this.data.passwordtest == '' ||this.data.name == '' || this.data.sex == '' ||
      this.data.address == '' || this.data.email == '') {
        wx.showToast({

          title: '存在信息为空',

          icon: 'none',

          duration: 2000//持续的时间

        })}
    else if (this.data.username.length != 11) {
      wx.showToast({

        title: '手机号码长度错误',

        icon: 'none',

        duration: 2000//持续的时间

      })
    } 
    else if(this.data.password!=this.data.passwordtest) {    
      wx.showToast({
        title: '两次输入密码不一致',
        icon: 'none',
        duration: 2000//持续的时间
      })
        }
    else if (regPos.test(this.data.username) || regNeg.test(this.data.username)) {
    wx.request({
      url: 'http://localhost:8080/user/register',
      data: {
        account: this.data.username,
        password: this.data.password,
        name: this.data.name,
        sex: this.data.sex,
        address: this.data.address,
        mailbox: this.data.email,
        permission: this.data.permission,
        school: this.data.school,
        etBack: this.data.etBack,
        age: this.data.age,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data.code==200){
        console.log(res.data);
          wx.showToast({
            title: '注册成功',
            icon: 'succeed',
            duration: 2000//持续的时间
          })
        wx.navigateTo({
          
          url: '/pages/login/login',
        })}
        else{
          wx.showToast({
            title: '该手机号已被注册',
            icon: 'none',
            duration: 2000//持续的时间
          })
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })}
    else{
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
  }, 
  goToLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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