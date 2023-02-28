<template>
	<!-- 列表页面容器加上 Listpage 样式  -->
	<view class="pages pageContentWidth Listpage">
		<view class="item" v-for="item in List" :item="item" :key="item.full">
			<image :src="item" mode="widthFit" />
		</view>
		<EmptyData :dataLength="Number(List.length)" :hasNextPage="hasNextPage" />
	</view>
</template>
<script>
import apiUrl from '../../api/apiUrls';
import { getListOrLoadMore, pageNum, pageSize } from '../../app';
import EmptyData from '../../components/EmptyData';
import { listHttpRequest, reachBottom, startRefresh } from '../../utils';
export default {
	components: {
		EmptyData,
	},
	data() {
		return {
			List: [],
		};
	},
	onLoad() {
		this.getList(pageSize, pageNum);
	},
	onPullDownRefresh() {
		let _this = this;
		startRefresh(function () {
			_this.getList(pageSize, pageNum);
		});
	},
	onReachBottom() {
		let _this = this;
		reachBottom({
			url: apiUrl.List,
			_this,
			pageSize: _this.pageSize,
			pageNum: _this.pageNum,
		});
	},
	methods: {
		getList(pageSize, pageNum) {
			let _this = this;
			listHttpRequest({
				url: apiUrl.List,
				_this,
				pageSize,
				pageNum,
				type: getListOrLoadMore.getList,
			});
		},
	},
};
</script>

<style lang="less">
.item {
	margin: 20rpx auto;
	padding: 20rpx 0;
	border-bottom: 2rpx solid #ccc;
}
</style>
