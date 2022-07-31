<template>
    <view class="pages pageContentWidth Listpage">
        <!-- 列表页面 class 要加上 Listpage  -->
        <view class="item" v-for="item in List" :item="item" :key="item.url">
            <image :src="item.url" mode="widthFit" />
            <view>{{ item.copyright }}</view>
            <view>{{ item.title }}</view>
        </view>
        <EmptyData :dataLength="Number(List.length)" :hasNextPage="hasNextPage" />
    </view>
</template>
<script>
import apiUrl from '../../api/apiUrls';
import { getDataListType, pageSize, pageNum } from '../../app';
import EmptyData from '../../components/EmptyData';
import { Activity } from '../../static/constant';
import { listHttpRequest, reachBottom } from '../../utils';
export default {
    components: {
        EmptyData,
    },
    data() {
        return {
            List: [],
            dataLength: 0,
            hasNextPage: true,
            Activity: Activity,
        };
    },
    onLoad() {
        this.getList(pageSize, pageNum);
    },
    onPullDownRefresh() {
        let _this = this;
        _this.startRefresh(function () {
            _this.getList(pageSize, pageNum);
        });
    },
    onReachBottom() {
        let _this = this;
        reachBottom(
            apiUrl.List,
            _this,
            {
                listField: 'List',
                hasNextPage: 'hasNextPage',
                pageSize: 'pageSize',
                pageNum: 'pageNum',
            },
            _this.pageSize,
            _this.pageNum,
            {
                type: getDataListType.loadMore,
            },
            function (res, hasNextPage) {
                _this.hasNextPage = hasNextPage;
                _this.dataLength = _this.List.length;
            }
        );
    },
    methods: {
        getList(pageSize, pageNum) {
            let _this = this;
            listHttpRequest(
                apiUrl.List,
                this,
                {
                    listField: 'List',
                    hasNextPage: 'hasNextPage',
                    pageSize: 'pageSize',
                    pageNum: 'pageNum',
                },
                pageSize,
                pageNum,
                {
                    type: getDataListType.getList,
                },
                function (res, hasNextPage) {
                    _this.hasNextPage = hasNextPage;
                    _this.dataLength = _this.List.length;
                }
            );
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