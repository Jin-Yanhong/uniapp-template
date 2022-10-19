<template>
    <view class="pages otherPage">
        <view>路径参数</view>
        <view>
            <text v-for="(item, name, index) in options" :key="index">{{ name }}:{{ item }} </text>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            options: {},
        };
    },
    onLoad(options) {
        this.options = options;
    },
    methods: {
        //
    },
};
</script>
<style lang="less">
@import './index.less';
</style>
