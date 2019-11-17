// pages/login/login.js
const app = getApp()    // 在index.js的Page函数外获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
username:'',
password:'',
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

  //静态测试
  loginBtnClick: function () {
    if (this.data.username == '' || this.data.password == '') {
      wx.showToast({

        title: '账号或密码为空',

        icon: 'none',

        duration: 2000//持续的时间

      })
    } 
    else if(this.data.username==111&&this.data.password==111){
      wx.navigateTo({ url: '/pages/admin/admin', })
      app.appData.userinfo = {
        username: this.data.username, password: this.data.password,
      };
    }
    else {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if (regPos.test(this.data.username) || regNeg.test(this.data.username)) {
        console.log(app.app)
        if (this.data.username.length == 11) {
          app.appData.userinfo = { username: this.data.username, password: this.data.password }
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
        else {
          wx.showToast({

            title: '手机号长度错误',

            icon: 'none',

            duration: 2000//持续的时间

          })
        }
      }
      else {
        this.setData({ username: '' }),
          wx.showToast({

            title: '手机号码格式错误',

            icon: 'none',

            duration: 2000//持续的时间

          })
      }
    }

  },
  
  goToIndex: function () {
    if (this.data.username == '' || this.data.password == '') {
      wx.showToast({

        title: '账号或密码为空',

        icon: 'none',

        duration: 2000//持续的时间

      })
    }else{
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(this.data.username) || regNeg.test(this.data.username)) {
      console.log(app.app)
      if (this.data.username.length == 11) {
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
            if(res.data.code==200&&res.data.data.permission!=0){
            console.log(res.data.data);
              app.appData.userinfo = {
                username: res.data.data.account, password: res.data.data.password, name: res.data.data.name,};
            wx.switchTab({ url: '/pages/index/index', })}
            else if(res.data.code==200&&res.data.data.permission==0){
              console.log(res.data.data);
              app.appData.userinfo = {
                username: res.data.data.account, password: res.data.data.password, name: res.data.data.name,
              };
              wx.navigateTo({ url: '/pages/admin/admin', })
            }
            else {
              console.log(res.data.code);
              wx.showToast({

                title: '账号或密码错误，登陆失败',

                icon: 'none',

                duration: 2000//持续的时间

              })}
          },
          fail: function (res) {
            console.log("--------fail--------");
            wx.showToast({

              title: '登录超时',

              icon: 'none',

              duration: 2000//持续的时间

            })
          }
        })
      }
      else {
        wx.showToast({

          title: '手机号长度错误',

          icon: 'none',

          duration: 2000//持续的时间

        })
      }
    }
    else {
      this.setData({ username: '' }),
      wx.showToast({

        title: '手机号码格式错误',

        icon: 'none',

        duration: 2000//持续的时间

      })
    }}
    
  },

  goToRegister: function () {
    wx.navigateTo({
      url: '/pages/login/register/register',
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
    
    app.appData.userinfo = { username: '', password: '',name:'', }
   
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