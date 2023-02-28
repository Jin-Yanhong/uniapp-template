<template>
	<view class="pages index">
		这套框架封装了

		<view class="feature">
			<view class="item">isLogin</view> <br />
			<view class="item">httpRequest</view> <br />
			<view class="item">fileUpload</view> <br />
			<view class="item">handleRedirect</view> <br />
			<view class="item">navTo</view> <br />
			<view class="item">switchTab</view> <br />
			<view class="item">redirectTo</view> <br />
			<view class="item">navBack</view> <br />
			<view class="item">showToast</view> <br />
			<view class="item">showLoading</view> <br />
			<view class="item">hideLoading</view> <br />
			<view class="item">confirmModal</view> <br />
			<view class="item">startRefresh</view> <br />
			<view class="item">stopRefresh</view> <br />
			<view class="item">reachBottom</view> <br />
			<view class="item">pageShare</view> <br />
			<view class="item">listHttpRequest</view> <br />
			<view class="item">getDictData</view> <br />
			<view class="item">setStorageItem</view> <br />
			<view class="item">getStorageItem</view> <br />
			<view class="item">removeStorageItem</view> <br />
			<view class="item">dateFormater</view> <br />
			<view class="item">fieldTranslate</view> <br />
		</view>

		等功能，具体使用见文档注释，不定期更新。欢迎使用，有问题提 issue。
	</view>
</template>

<script>
export default {
	data() {
		return {
			ImageBaseUrl: this.GlobalImageBaseUrl,
		};
	},
};
</script>
<style lang="less">
@import './index.less';
</style>
