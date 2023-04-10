// pages/login/login.js

// 登录流程
// 1、收集表单项数据
// 2、前端验证
//    a、验证用户信息（账号密码）是否合法
//    b、前端验证不通过提示用户，不需要发送请求给后端
//    c、前端验证通过，发请求（携带账号，密码）给服务器端
// 3、后端验证
//    a、验证用户是否存在
//    b、用户不存在直接返回，告诉前端用户不存在
//    c、用户存在需要验证密码是否正确
//    d、密码不正确返回前端提示密码不正确
//    e、密码正确返回前端数据，提示用户登录成功（会携带用户的相关信息）

import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: '', // 邮箱号
    password: '', // 密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 表单项内容发生改变的回调
  handleInput(event) {
    let type = event.currentTarget.id;
    console.log(event.detail.value);
    this.setData({
      [type]: event.detail.value
    })
  },
  // // 登录的回调
  async login() {
    // 收集表单项数据
    let {
      email,
      password
    } = this.data;
    // 前端验证
    if (!email.trim()) {
      //提示用户
      wx.showToast({
        title: '邮箱号不能为空!',
        icon: 'none'
      })
      return;
    }

    // 正则表单式
    let emailReg = /^[\w-]+(\.[\w-]+)*@163\.com$/;
    if (!emailReg.test(email)) {
      //提示用户
      wx.showToast({
        title: '邮箱号格式不正确!',
        icon: 'none'
      })
      return;
    }

    if (!password.trim()) {
      //提示用户
      wx.showToast({
        title: '密码不能为空!',
        icon: 'none'
      })
      return;
    }

    // 后端验证
    let result = await request('/login', {
      email,
      password,
      isLogin: true
    })
    console.log(result);
    if (result.code === 200) {
      wx.showToast({
        title: '登陆成功'
      })

      // 将用户的信息存储至本地
      wx.setStorageSync('userInfo', JSON.stringify(result.profile));
      wx.setStorageSync('userId', result.profile.userId)

      // 跳转至个人中心personal页面
      wx.reLaunch({
        url: '/pages/index/index'
      });
    } else if (result.code === 502) {
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '登录失败，请重新登录!',
        icon: 'none'
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
