<template>
	<view class="pages mine pageContentWidth">
		<!-- 用户信息 -->
		<view class="info isMumberTrue">
			<image class="userInfoBg" :src="ImageBaseUrl + (user.isMember ? 'image/ismember-yes-bg.png' : 'image/ismember-no-bg.png')"> </image>
			<view class="details flexLayout">
				<view class="top flexLayout">
					<view class="left flexLayout">
						<view class="avatar">
							<image class="avatarImg" v-if="isLogin && user.avatar" mode="scaleToFill" :src="user.avatar"></image>
							<image class="avatarImg" v-else mode="aspectFit" :src="defaultInfo.avatarUrl"></image>
						</view>
						<!-- TODO: 用户未登錄 占位操作-->
						<view v-if="isLogin">
							<view v-if="user.isMember" class="userName flexLayout">
								<text class="name textEllipsis">{{ user.name || user.nickname || defaultInfo.nickName }}</text>
								<view class="memberMark"> V I P </view>
							</view>
							<view v-else class="userName">
								<text class="name textEllipsis">{{ user.name || user.nickname || defaultInfo.nickName }}</text>
								<view class="isNotMember">非会员</view>
							</view>
							<view style="font-size: 24rpx; color: #faeee0" v-if="user.isMember && user.school">{{ user.school }}</view>
						</view>
						<view v-else @click="navTo('/pages/other/index', false, navTypeList.navTo)">
							<view class="userName">
								<text class="name">未登录</text>
								<view class="isNotMember">XXX</view>
								<!-- 默认头像 -->
							</view>
						</view>
					</view>
					<view class="right" v-if="!user.isMember">
						<image class="image" :src="ImageBaseUrl + 'image/mine-join-mumber-btn.png'" mode="scaleToFill" />
						<view class="rightBtn isNotMember" @click="navTo('/pages/other/index', false, navTypeList.navTo)">XXX</view>
					</view>
				</view>
				<view class="bottom flexLayout">
					<view class="left">
						<view>XXX</view>
						<view class="serialNumber" v-if="user.ordernum"> No.1234567 </view>
					</view>
					<view class="right">
						<view class="settings" @click="navTo('/pages/other/index', false, navTypeList.navTo)">
							<image :src="ImageBaseUrl + 'image/settings.png'"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 用户卡片 -->
			<view class="card flexLayout boxShadow" :style="{ backgroundColor: user.isMember ? '#fef1e0' : '#e2f7f4' }">
				<view @click="navTo('/pages/other/index?type=1', true, navTypeList.navTo)">
					<text class="count">{{ user.ticketNum || 0 }}</text>
					<text class="name">XX</text>
				</view>
				<view @click="navTo('/pages/other/index?type=2', true, navTypeList.navTo)">
					<text class="count">{{ user.activityNum || 0 }}</text>
					<text class="name">XX</text>
				</view>
			</view>
		</view>
		<!-- 用户功能导航 -->
		<view class="navList flexLayout">
			<view class="navItem" v-for="(item, index) in navList" :key="index" @click="showToast('Taped!')">
				<image class="image" :src="ImageBaseUrl + item.icon" mode="heightFix"></image>
				<text class="title">{{ item.text }}</text>
			</view>
			<view class="navItem" @click="logOut" v-if="isLogin">
				<image class="image" src="../../static/logOut.svg" mode="heightFix"></image>
				<text class="title">退出登录</text>
			</view>
		</view>
	</view>
</template>
<script>
import apiUrl from "../../api/apiUrls";
import { User } from "../../static/constant";
import { confirmModal, getStorageItem, isLogin, showToast } from "../../utils";
export default {
	data() {
		return {
			ImageBaseUrl: this.GlobalImageBaseUrl,
			user: {
				isMember: false,
				isMerchant: false,
				isPassChecked: false,
				nickname: "",
				uid: "",
			},
			defaultInfo: {},
			isLogin: false,
			msgCount: 4,
			navList: [{ icon: "tabIcon/tab-activity-active.png", isMerchantFeature: false, text: "导航1" }],
		};
	},
	onShow() {
		// this.handleShow();
	},
	onPullDownRefresh() {
		let _this = this;
		this.startRefresh(function () {
			_this.handleShow();
		});
	},
	methods: {
		getUserInfo() {
			let _this = this;
			this.httpRequest(
				{
					url: apiUrl.UserInfo,
				},
				function (res) {
					_this.setUserData(res);
					_this.setStorageItem("userInfo", JSON.stringify(res));
				}
			);
		},
		setUserData(res) {
			res.shop ? "" : (res.shop = { audit: undefined });
			// 深度结构
			let {
				isvip: isMember,
				shop: { audit: isPassChecked },
				id: uid,
				nickname,
				name,
				school,
				face: avatar,
				actnum,
				cardnum,
			} = res;
			this.user.isMember = isMember == User.isVip ? true : false;
			this.user.isMerchant = isPassChecked == User.isShopPassChecked ? true : false;
			this.user.isPassChecked = isPassChecked == 1 ? false : true;
			this.user.uid = uid;
			this.user.activityNum = actnum;
			this.user.ticketNum = cardnum;
			this.user.nickname = nickname;
			this.user.name = name;
			this.user.school = school;
			this.user.avatar = avatar;
			this.$forceUpdate();
		},
		logOut() {
			confirmModal(
				"提示",
				"是否退出登录？",
				function () {
					uni.clearStorageSync();
					let { __route__ } = getCurrentPages()[0];
					uni.reLaunch({
						url: "/" + __route__,
						fail(err) {
							console.log("reLaunch Error", err);
						},
					});
				},
				function () {
					showToast("已取消退出！");
				}
			);
		},
		handleShow() {
			this.isLogin = isLogin();
			this.defaultInfo.avatarUrl = getStorageItem("avatarUrl") ? getStorageItem("avatarUrl") : "../../static/image/default-avatar.png";
			this.defaultInfo.nickName = getStorageItem("nickName") ? getStorageItem("nickName") : "微信用户";
			if (isLogin()) {
				this.getUserInfo();
			}
		},
	},
};
</script>
<style lang="less">
@import "./index.less";
</style>
