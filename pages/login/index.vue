<template>
	<view class="pages login">
		<view class="logo" style="line-height: 240rpx; text-align: center; color: #fff">Logo</view>
		<!-- TODO: this is your logo -->
		<!-- <image class="logo" src="../../static/logo.png" mode="aspectFit"></image> -->
		<view class="tips">申请获取以下权限</view>
		<text class="desc">获取您的公开信息 （昵称，头像等）</text>
		<button v-if="hasInfo" class="loginBtn" @click="handleWxLogin">微信授权登录</button>
		<button v-else class="loginBtn" open-type="getPhoneNumber" @getphonenumber="getUserPhone">电话号码授权登录</button>
	</view>
</template>
<script>
import apiUrl from "../../api/apiUrls";
import { getStorageItem, httpRequest, setStorageItem, showToast } from "../../utils";

export default {
	data() {
		return {
			userPhone: "",
			userInfo: {},
			wxLoginData: {},
			hasInfo: false,
		};
	},
	onLoad() {
		setStorageItem("isLogin", false);
	},
	methods: {
		handleWxLogin() {
			let _this = this;
			uni.getUserProfile({
				desc: "微信昵称和微信头像只用于展示",
				success: res => {
					let { avatarUrl, nickName = " " } = res.userInfo;
					setStorageItem("avatarUrl", avatarUrl);
					setStorageItem("nickName", nickName);
					uni.login({
						provider: "weixin",
						success: loginRes => {
							httpRequest(
								{
									url: apiUrl.wxlogin,
									data: {
										code: loginRes.code,
									},
									LoadingVisible: true,
								},
								function (res) {
									_this.wxLoginData = res;
									if (res.userinfo) {
										_this.setStorage(res.userinfo);
									} else {
										_this.hasInfo = false;
										showToast("用户尚未注册，请使用电话号码授权登录 !");
										_this.userInfo = {};
									}
								}
							);
						},
					});
				},
				fail: err => {
					console.log("getUserProfile Error", err);
				},
			});
		},
		getUserPhone(e) {
			let _this = this;
			if (e.detail.errMsg == "getPhoneNumber:ok") {
				httpRequest(
					{
						url: apiUrl.wxGetPhone,
						data: {
							code: e.detail.code,
						},
						LoadingVisible: true,
					},
					function (result) {
						if (result.errcode === 0) {
							_this.setStorage(result.phone_info.phoneNumber);
						} else {
							showToast(result.errmsg);
						}
					}
				);
			}
		},
		handleRedirect() {
			let _this = this;
			let redirect = getStorageItem("redirect");
			redirect ? (redirect = JSON.parse(redirect)) : "";
			if (redirect) {
				_this.redirectTo(redirect.to);
			} else {
				// 否则去首页
				_this.switchTab("/pages/index/index");
			}
		},
		setStorage(result) {
			result ? "" : (result = {});
			let _this = this;
			setStorageItem("isLogin", "true");
			showToast("授权成功");
			setStorageItem("phoneNumber", JSON.stringify(result));
			setTimeout(() => {
				_this.handleRedirect();
			}, 1000);
		},
	},
};
</script>
<style lang="less">
@import "./index.less";
</style>
