// page/personal-center/pages/receiving-address/receiving-address.js

const wxapi = require('../../../../utils/wxapi.js');

let app = getApp();
let updateValueTextState = true;
let updateValueNumberState = true;
let updateValueTextareaState = true;
Page({
	data: {
		id: '',
		type: 0,
		display: true, //显示哪个组件输入phone
		disable: false, //删除的禁用
		params: {
			uid: '',
			name: '',
			phone: '请点击获取手机号',
			province: '北京市',
			city: '北京市',
			district: '东城区',
			detail: '',
			defAddress: 0,
		},
		addressListLength: null,
		defaultAddressImage: ['/images/address/image02.png', '/images/address/image03.png'],
		region: ["北京市", "北京市", "东城区"],
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let id = options.id
		let type = +options.type
		this.setData({
			id: id,
			type: type,
		})
		wx.setNavigationBarTitle({
			title: '新建收货地址' //页面标题为路由参数
		})
		this.receivingAddress()
		this.receivingAddressDetailed()
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		let userInfo = wx.getStorageSync('userInfo')
		this.setData({
			['params.uid']: userInfo.userid
		})
	},
	// 获取列表
	receivingAddress() {
		let userInfo = wx.getStorageSync('userInfo')
		wxapi.receivingAddressList({
			userid: userInfo.userid
		}).then(res => {
			if (res.msg == "查询成功") {
				this.setData({
					addressListLength: res.data.addressList.length,
					display: true,
				})
			} else {
				this.setData({
					display: false,
				})
			}
		})
	},
	// 获取 地址详细
	receivingAddressDetailed() {
		wxapi.receivingAddressDetailed({
			id: this.data.id
		}).then(res => {
			if (res.code == 200) {
				// console.log(res.data);
				this.setData({
					region: [res.data.province, res.data.city, res.data.district],
					['params.name']: res.data.name,
					['params.phone']: res.data.phone,
					['params.province']: res.data.province,
					['params.city']: res.data.city,
					['params.district']: res.data.district,
					['params.detail']: res.data.detail,
					['params.defAddress']: res.data.defAddress
				})
			} else {
				// console.log('地址列表失败');
			}
		})
	},
	// 数据绑定
	// 收货人
	updateValueText(e) {
		let value = e.detail.value.slice(0, 25)
		if (e.detail.value.length > 25 && updateValueTextState) {
			updateValueTextState = false
			this.modalDialogDox('收货人姓名长度为2-25个字符', false).then(() => {
				updateValueTextState = true
			}, () => {
				updateValueTextState = true
			})
		}
		this.setData({
			['params.name']: value,
		})
	},
	// 手机号
	updateValueNumber(e) {
		let value = e.detail.value.slice(0, 11)
		if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(e.detail.value)) && e.detail.value.length > 11 && updateValueNumberState) {
			updateValueNumberState = false
			this.modalDialogDox('请填写正确的11位手机号码', false).then(() => {
				updateValueNumberState = true
			}, () => {
				updateValueNumberState = true
			})
		}
		this.setData({
			['params.phone']: value
		})
	},
	/** 获取手机号 */
	getPhoneNumber(e) {
		wx.showLoading({
			title: '加载中...'
		});
		wx.hideLoading();
		if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //未授权
			return;
		} else {
			var encryptedData = e.detail.encryptedData;
			var iv = e.detail.iv;
			wxapi.login()
				.then((res) => {
					let params = {
						iv: iv,
						encryptedData: encryptedData,
						code: res.code
					}
					wxapi.getApiAuthInfo(params, 'GET')
						.then((res) => {
							// console.log("解密成功")
							let data = JSON.parse(res.data.userinfo)
							this.setData({
								['params.phone']: data.phoneNumber,
							})
						}, (err) => {
							// console.log("解密失败");
							// console.log(res);
						})
				}, (err) => {

				})
		}
	},
	// 省 市 区
	bindRegionChange(e) {
		this.setData({
			region: e.detail.value,
			['params.province']: e.detail.value[0],
			['params.city']: e.detail.value[1],
			['params.district']: e.detail.value[2],
		})
	},
	// 详细地址
	updateValueTextarea(e) {
		let value = e.detail.value.slice(0, 100)
		if (e.detail.value.length > 100 && updateValueTextareaState) {
			updateValueTextareaState = false
			// value = e.detail.value.slice(0,25)
			this.modalDialogDox('详细地址长度为5-100个字符之间', false).then(() => {
				updateValueTextareaState = true
			}, () => {
				updateValueTextareaState = true
			})
		}
		this.setData({
			['params.detail']: value
		})
	},
	// 设为默认地址
	defaultAddress() {
		this.setData({
			['params.defAddress']: this.data.params.defAddress === 0 ? 1 : 0
		})
		console.log(this.data.params.defAddress)
	},
	// 提交
	submission() {
		let params = this.data.params
		if (params.name.length < 2 || params.name.length > 25) {
			this.modalDialogDox('收货人姓名长度为2-25个字符', false)
			return
		}
		if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(params.phone)) || params.phone.length > 11 || params.phone.length < 11) {
			this.modalDialogDox('请填写正确的11位手机号码', false)
			return
		}
		if (params.detail.length > 100 || params.detail.length < 5) {
			this.modalDialogDox('详细地址长度为5-100个字符之间', false)
			return
		}
		if (this.data.type) {
			params.id = this.data.id
			wxapi.receivingAddressput(params).then(res => {
				if (res.code == 200) {
					wx.navigateBack()
				} else {}
			})
		} else {
			wxapi.receivingAddresspost(params).then(res => {
				if (res.code == 200) {
					wx.navigateBack()
				} else {}
			})
		}
	},
	// 删除
	deleteAddress() {
		let _that = this
		if (this.data.disable == true) {
			return
		} else {
			let _this = this
			let content = this.data.addressListLength === 1 ? "删除后，购买商品需要重新设置地址，是否确认删除" : "确认删除该地址吗？"
			_that.setData({
				disable: true
			})
			setTimeout(function () {
				_that.setData({
					disable: false
				})
			}, 500)
			wx.showModal({
				content: content,
				success(res) {
					if (res.confirm) {
						wxapi.receivingAddressDel({
							id: _this.data.id
						}).then(res => {
							if (res.code == 200) {
								wx.navigateBack()
							} else {
								_that.setData({
									disable: false
								})
							}
						})
					} else if (res.cancel) {}
				}
			})
		}

	},

	// 模态框 
	modalDialogDox(content, showCancel) {
		return new Promise((resolve, reject) => {
			wx.showModal({
				//title: '提示',
				content: content,
				showCancel: showCancel,
				success(res) {
					if (res.confirm) {
						resolve(res);
					} else if (res.cancel) {
						reject(res)
					}
				}
			})
		});
	}
})