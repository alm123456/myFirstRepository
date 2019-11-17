// pages/personal/fquery/fquery.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:[],
    account: '',
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
    account: app.appData.userinfo.username
    })
    var that=this
        wx.request({
          url: 'http://localhost:8080/card/selectCardByAccount',
          data: {
            account:this.data.account,
            
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
                  cardid : res.data.data[i].cardid,
                  title : res.data.data[i].title,
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