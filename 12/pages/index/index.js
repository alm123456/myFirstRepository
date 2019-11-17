//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: [],
    account: '',
    service:'',
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['', '英语', '数学', '语文', '化学', '物理', '生物', '政治', '历史', '地理'], //下拉列表的数据
    index: 0, //选择的下拉列 表下标,
    permission:'',
    accounttest:'',
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show,
    });
  },
  // 点击下拉列表
  optionTap(e) {
    var Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show,
    });
    this.setData({
      service: this.data.selectData[this.data.index]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goTo1: function () {
    this.setData({
      service:this.data.selectData[this.data.index]
    })
    },
  goToService:function(){

    var that = this
    wx.request({
      url: 'http://localhost:8080/card/queryCard',
      data: {
        course:this.data.service,
        flag:2,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let text = []
        if (res.data.code == 200) {
          console.log(res.data.data);
          for (var i = 0; i < res.data.data.length; i++) {
            text[i] = {
              cardid: res.data.data[i].cardid,
              title: res.data.data[i].title,
              subject: res.data.data[i].course,
              level: res.data.data[i].level,
              money: res.data.data[i].money,
              time: res.data.data[i].time,
              address: res.data.data[i].address,
              request: res.data.data[i].demand,
              grade_name: res.data.data[i].grade
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
            text: text
          })
          wx.showToast({

            title: '无发布信息',

            icon: 'none',

            duration: 2000//持续的时间

          })
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
    wx.navigateTo({
      url: '/pages/index/index',
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
  goTocatch: function (event) {
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
              permission: res.data.data.permission,
            })

            let value = event.currentTarget.dataset.value
            console.log("value：" + value)
            var that = this
            wx.request({
              url: 'http://localhost:8080/card/selectCardByAccount',
              data: {
                cardid: value,

              },
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                if (res.data.code == 200) {
                  console.log(res.data.data);
                  
                  that.setData({
                    accounttest: res.data.data.account
                  })
                }
                else {
                  wx.showToast({

                    title: 'error',

                    icon: 'none',

                    duration: 2000//持续的时间

                  })
                }
              },
              fail: function (res) {
                console.log("--------fail--------");
              }
            })
            if (account == accounttest) {
              wx.showToast({

                title: '不能接取自己发布的家教信息',

                icon: 'none',

                duration: 2000//持续的时间

              })
            }
          else {
            if (res.data.data.permission == 3) {
              wx.request({
                url: 'http://localhost:8080/card/updateCardAndOrder',
                data: {
                  cardid: value,
                  account: that.data.account,
                  status: 1,

                },
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  if (res.data.code == 200) {
                    console.log(res.data);
                    wx.showToast({

                      title: '接取成功',

                      icon: 'succeed',

                      duration: 2000//持续的时间

                    })
                    that.onShow();
                  }
                  else {
                    wx.showToast({

                      title: '接取失败',

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
            }
            else {
              wx.showToast({

                title: '未进行教员审核',

                icon: 'none',

                duration: 2000//持续的时间

              })
            }
          }

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
  onShow: function () {
    this.setData({
      service:'',
      account: app.appData.userinfo.username
    })
    var that = this
    wx.request({
      url: 'http://localhost:8080/card/queryCard',
      data: {
        course:'',
        flag:1,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let text = []
        if (res.data.code == 200) {
          console.log(res.data.data);
          for (var i = 0; i < res.data.data.length; i++) {
            text[i] = {
              cardid: res.data.data[i].cardid,
              title: res.data.data[i].title,
              subject: res.data.data[i].course,
              level: res.data.data[i].level,
              money: res.data.data[i].money,
              time: res.data.data[i].time,
              address: res.data.data[i].address,
              request: res.data.data[i].demand,
              grade_name: res.data.data[i].grade
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
            text: text
          })
          wx.showToast({

            title: '无发布信息',

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