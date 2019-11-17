// pages/release/release.js
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    cardid:'',
    select: false,
    title:'',
    subject:'',
    level:'',
    money:'',
    time:'',
    address:'',
    request:'',
    grade_name: '',
    account:'',

    grades: ['小学', '初中', '高中',

    ]

  },
  bindShowMsg() {
    this.setData({

      select: !this.data.select

    })

  },/**

* 已选下拉框 */

  mySelect(e) {

    console.log(e); var name = e.currentTarget.dataset.name
    this.setData({

      grade_name: name,
      grade_name0:name,

      select: false

    })

  },

  titleInput: function (event) {
    this.setData({ title: event.detail.value }),
      console.log(event)
  },
  subjectInput: function (event) {
    this.setData({ subject: event.detail.value }),
      console.log(event)
  }, 
  levelInput: function (event) {
    this.setData({ level: event.detail.value }),
      console.log(event)
  },
  //判断是否为数字的方法
  moneyInput: function (event) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数

    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(event.detail.value) || regNeg.test(event.detail.value)) {
      this.setData({ money: event.detail.value }),
        console.log(event)
    }
    
    else{
      this.setData({ money: '' }),
        console.log(event)
      wx.showToast({

        title: '薪酬格式错误',

        icon: 'none',

        duration: 2000//持续的时间

      })
    }
  },
  timeInput: function (event) {
    this.setData({ time: event.detail.value }),
      console.log(event)
  },
  addressInput: function (event) {
    this.setData({ address: event.detail.value }),
      console.log(event)
  },
  requestInput: function (event) {
    this.setData({ request: event.detail.value }),
      console.log(event)
  },
  fabu: function () {
    var that = this
    //判断是否为空
    if (this.data.title == '' ||
      this.data.subject == '' ||
      this.data.level == '' ||
      this.data.money == '' ||
      this.data.time == '' ||
      this.data.address == '' ||
      this.data.grade_name == '') {
      wx.showToast({

        title: '存在输入为空或格式错误！',

        icon: 'none',

        duration: 2000//持续的时间

      })
    }
    else {
      
    wx.showModal({

      title: '提示',

      content: '是否发布',

      success: function (res) {

        if (res.confirm) {//这里是点击了确定以后

          console.log('用户点击确定');
          wx.request({
            url: 'http://localhost:8080/card/addCard',
            data: {
              title: that.data.title,
              course: that.data.subject,
              grade: that.data.grade_name,
              level: that.data.level,
              money: that.data.money,
              time: that.data.time,
              address:that.data.address,
              demand: that.data.request,
              account: that.data.account,
              cardid:'',
              status:0,
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data);
              wx.showToast({

                title: '发布成功',

                icon: 'success',

                duration: 2000//持续的时间

              }),
                that.setData({
                  select: false,
                  title0: '',
                  subject0: '',
                  level0: '',
                  money0: '',
                  time0: '',
                  address0: '',
                  request0: '',
                  grade_name0: '--请选择--',
                  title: '',
                  subject: '',
                  level: '',
                  money: '',
                  time: '',
                  address: '',
                  request: '',
                  grade_name: '',

                })

            },
            fail: function (res) {
              console.log("--------fail--------");
            }
          })

        } else {//这里是点击了取消以后

          console.log('用户点击取消')

        }

      }

    })
    }  
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
      account: app.appData.userinfo.username,
      select: false,
      title0: '',
      subject0: '',
      level0: '',
      money0: '',
      time0: '',
      address0: '',
      request0: '',
      grade_name0: '--请选择--',
    title: '',
    subject: '',
    level: '',
    money: '',
    time: '',
    address: '',
    request: '',
    grade_name: '',

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