<template>
	<view v-if="dataLength == 0" class="EmptyData">
		<view class="Empty" style="height: 100%">
			<image class="image" src="../../static/noData.svg" mode="aspectFit" />
			<text class="text">沒有数据</text>
		</view>
	</view>
	<view v-else-if="dataLength > 0 && hasNextPage == false" class="noMore" style="height: 60rpx">
		<text class="before"></text>
		<text class="text">没有更多</text>
		<text class="after"></text>
	</view>
</template>
<script>
export default {
	name: 'EmptyData',
	data() {
		return {
			ImageBaseUrl: this.GlobalImageBaseUrl,
		};
	},
	props: {
		dataLength: {
			default: 0,
			type: Number,
		},
		hasNextPage: {
			default: true,
			type: Boolean,
		},
	},
};
</script>
<style lang="less">
// 引用全局 Less
@import '../../style/variable.less';
.EmptyData {
	color: #ccc;
	text-align: center;
	width: 90%;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	.Empty {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.image {
			width: 160rpx;
			height: 160rpx;
		}
	}
}
.noMore {
	margin: 40rpx 0;
	width: 100%;
	height: 40rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #ccc;
	.before {
		display: inline-block;
		width: calc(50% - 100rpx);
		height: 4rpx;
		background: #eee;
	}
	.after {
		display: inline-block;
		width: calc(50% - 100rpx);
		height: 4rpx;
		background: #eee;
	}
}
</style>
