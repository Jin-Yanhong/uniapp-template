<template>
    <view class="pages login">
        <image class="logo" src="../../static/logo.png" mode="aspectFit" />
        <view class="tips">申請獲取以下權限</view>
        <text class="desc">獲得您的公開信息 (昵稱, 頭像等)</text>
        <button v-if="hasInfo" class="loginBtn" @click="handleWxLogin">微信授權登陸</button>
        <button v-else class="loginBtn" open-type="getPhoneNumber" @getphonenumber="getUserPhone">电话号码授權登陸</button>
    </view>
</template>
<script>
import apiUrl from '../../api/apiUrls';
import { httpRequest, setStorageItem, getStorageItem, showToast } from '../../utils';
export default {
    data() {
        return {
            userPhone: '',
            userInfo: {},
            wxLoginData: {},
            hasInfo: true,
        };
    },
    onLoad() {
        this.setStorageItem('isLogin', false);
    },
    methods: {
        handleWxLogin() {
            let _this = this;
            uni.getUserProfile({
                desc: '微信昵称和微信头像只用于展示',
                success: res => {
                    let { avatarUrl, nickName = ' ' } = res.userInfo;
                    setStorageItem('avatarUrl', avatarUrl);
                    setStorageItem('nickName', nickName);
                    uni.login({
                        provider: 'weixin',
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
                                        showToast('用户尚未注册，请点击 电话号码授權登陸 !');
                                        _this.userInfo = {};
                                    }
                                }
                            );
                        },
                    });
                },
                fail: err => {
                    console.log('getUserProfile Error', err);
                },
            });
        },
        getUserPhone(e) {
            let _this = this;
            let nickName = getStorageItem('nickName') ? getStorageItem('nickName') : '微信用户';
            let avatarUrl = getStorageItem('avatarUrl') ? getStorageItem('avatarUrl') : '../../static/image/default-avatar.png';
            if (e.detail.errMsg == 'getPhoneNumber:ok') {
                httpRequest(
                    {
                        url: apiUrl.UserPhone,
                        data: {
                            encryptedData: e.detail.encryptedData,
                            sessionKey: _this.wxLoginData.sessionKey,
                            iv: e.detail.iv,
                            openid: _this.wxLoginData.openid,
                            nickName: nickName,
                            gender: 0,
                            face: avatarUrl,
                        },
                        LoadingVisible: true,
                    },
                    function (result) {
                        _this.setStorage(result);
                    }
                );
            }
        },
        handleRedirect() {
            let _this = this;
            let redirect = _this.getStorageItem('redirect');
            redirect ? (redirect = JSON.parse(redirect)) : '';
            if (redirect) {
                // 如果有重定向页面，去重定向页面
                switch (redirect.type) {
                    case 'switchTab':
                        _this.switchTab('/' + redirect.to);
                        break;
                    case 'redirectTo':
                        _this.redirectTo('/' + redirect.to);
                        break;
                    default:
                        _this.navTo('/' + redirect.to);
                        break;
                }
            } else {
                // 否则去首页
                _this.switchTab('/pages/index/index');
            }
        },
        setStorage(result) {
            result ? '' : (result = {});
            let _this = this;
            let { id = 0 } = result;
            _this.setStorageItem('isLogin', 'true');
            _this.setStorageItem('uid', id);
            _this.showToast('授权成功');
            _this.setStorageItem('userInfo', JSON.stringify(result));
            setTimeout(() => {
                _this.handleRedirect();
            }, 1000);
        },
    },
};
</script>
<style lang="less">
@import './index.less';
</style>
