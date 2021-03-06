// page/personal-center/pages/receiving-address-list/receiving-address-list.js

const wxapi = require('../../../../utils/wxapi.js');
let app = getApp();

Page({
	data: {
		addressList: [],
		path: ''
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (options.path === 'orderpay') {
			this.setData({
				path: 'orderpay'
			})
		}
		let addressList = wx.getStorageSync('addressList');
		this.setData({
			addressList: addressList || []
		})
		wx.setNavigationBarTitle({
			title: '我的收货地址' //页面标题为路由参数
		})
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		let userInfo = wx.getStorageSync('userInfo')
		wxapi.receivingAddressList({
			userid: userInfo.userid
		}).then(res => {
			if (res.code == 200) {
				this.setData({
					addressList: res.data.addressList || []
				})
			} else {
				// console.log('地址列表失败');
			}
		})
	},
	//支付页面过来的
	pathOrderTap: function (e) {
		let detail = e.currentTarget.dataset.detail
		detail.defAddress = 1
		let params = detail;
		wxapi.receivingAddressput(params).then(res => {
			if (res.code == 200) {
				wx.navigateBack()
			} else {
				// console.log('编辑失败');
			}
		})
	},
	// 查看、编辑
	addAddress(e) {
		let type = e.currentTarget.dataset.type
		let id = e.currentTarget.dataset.id
		let url = `?type=${type}&id=${id}`
		switch (+type) {
			case 0:
				// 新增
				wx.navigateTo({
					url: '/page/personal-center/pages/receiving-address/receiving-address' + url
				})
				break;
			case 1:
				// 编辑
				wx.navigateTo({
					url: '/page/personal-center/pages/receiving-address/receiving-address' + url
				})
				break;
		}
	}
})
