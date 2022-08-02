<template>
    <view class="pages pageContentWidth Listpage">
        <!-- 列表页面 class 要加上 Listpage  -->
        <view class="item" v-for="item in List" :item="item" :key="item.full">
            <image :src="item.full" mode="widthFit" />
        </view>
        <EmptyData :dataLength="Number(List.length)" :hasNextPage="hasNextPage" />
    </view>
</template>
<script>
import apiUrl from '../../api/apiUrls';
import EmptyData from '../../components/EmptyData';
import { getListOrLoadMore, pageSize, pageNum } from '../../app';
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