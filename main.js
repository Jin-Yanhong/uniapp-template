// 引用全局 Less
import Vue from "vue";
import { hasNextPage, ImageBaseUrl, navTypeList, pageNum, pageSize } from "./app.js";
import App from "./App.vue";
import "./style/globel.less";
import { confirmModal, dateFormater, fieldTranslate, getDateTime, httpRequest, navBack, navTo, redirectTo, showToast, switchTab } from "./utils";
Vue.config.productionTip = false;
// 根实例常量
Vue.prototype.GlobalImageBaseUrl = ImageBaseUrl;
Vue.prototype.pageSize = pageSize;
Vue.prototype.pageNum = pageNum;
Vue.prototype.hasNextPage = hasNextPage;
Vue.prototype.navTypeList = navTypeList;
// 根实例方法
Vue.prototype.httpRequest = httpRequest;
Vue.prototype.navTo = navTo;
Vue.prototype.switchTab = switchTab;
Vue.prototype.redirectTo = redirectTo;
Vue.prototype.navBack = navBack;
Vue.prototype.showToast = showToast;
Vue.prototype.confirmModal = confirmModal;
Vue.prototype.dateFormater = dateFormater;
Vue.prototype.fieldTranslate = fieldTranslate;
Vue.prototype.getDateTime = getDateTime;
App.mpType = "app";
const app = new Vue({
	...App,
});
app.$mount();
