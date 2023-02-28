// 网络请求
import apiUrl from '../api/apiUrls';
import { getListOrLoadMore, navTypeList, RequestBaseUrl } from '../app';

export function isLogin() {
	let isLogionFlag = JSON.parse(getStorageItem('isLogin')) || false;
	return isLogionFlag;
}

/**
 * @description 网络请求
 * @param { string } options.url  请求参数 请求地址
 * @param { string } options.method  请求参数 请求方法
 * @param { object } options.data  请求参数 请求体数据
 * @param { object } options.header  请求参数 自定义请求头
 * @param { boolean } options.LoadingVisible  是否显示loading
 * @param { function } callback  成功回调函数
 * @param { function } errCallback  需要单独处理的失败回调函数
 */
export function httpRequest(options, callback, errCallback = null) {
	let { url, method = 'get', data = {}, header = {}, LoadingVisible = false } = options;
	if (LoadingVisible) {
		showLoading();
	}
	let resObj = {
		code: {
			success: 20000,
			userNotAuthorized: 50004,
			userErr: 50003,
			notFound: 404,
		},
		msg: 'msg',
	};
	let defaultOptions = {
		data: {},
		header: {},
	};
	// Object.assign(target, source) target 为合并后的对象，该方法返回合并后的对象，如果有同名属性，会被覆盖
	// 合并全局 data 数据
	Object.assign(data, defaultOptions.data);
	// 合并全局 data 数据
	Object.assign(header, defaultOptions.header);
	new Promise((resolve, reject) => {
		uni.request({
			url: RequestBaseUrl + url,
			method: method,
			data: data,
			header: header,
			success: res => {
				let data = res.data;
				let code = res.data.code;
				if (LoadingVisible) {
					hideLoading();
				}
				switch (code) {
					case resObj.code.success:
						resolve(data.data);
						break;
					case resObj.code.userNotAuthorized:
						showToast('用户未登录');
						navTo('/pages/login');
						reject(data['msg']);
						break;
					case resObj.code.notFound:
						showToast('请求地址不正确');
						reject(data['msg']);
						break;
					default:
						showToast('未知错误');
						reject(data['msg']);
						break;
				}
			},
			fail: err => {
				if (LoadingVisible) {
					hideLoading();
				}
				reject('httpRequest Failed', { url, method, data, header }, err);
			},
		});
	})
		.then(res => {
			callback(res);
		})
		.catch(err => {
			console.log('httpRequest Error', { url, method, data, header }, err);
			if (err?.code === resObj.code.userErr) {
				let { __route__ } = getCurrentPages()[0];
				uni.clearStorageSync();
				uni.reLaunch({
					url: '/' + __route__,
					fail(err) {
						console.log('reLaunch Error', err);
					},
				});
			}
			if (errCallback) {
				errCallback(err);
			}
		});
}

/**
 * @description 通用文件上传
 * @param { object } options.data  请求参数 自定义请求体参数
 * @param { object } options.header  请求参数 自定义请求头
 * @param { boolean } options.LoadingVisible  是否显示loading
 * @param { function } callback  成功回调函数
 */
export function fileUpload(options, callback) {
	let { data = {}, header = {}, LoadingVisible = false } = options;
	let defaultOptions = {
		data: {},
		header: {},
		method: 'post',
	};
	// 合并全局 data 数据
	Object.assign(data, defaultOptions.data);
	// 合并全局 header 数据
	Object.assign(header, defaultOptions.header);
	uni.chooseImage({
		count: 1,
		crop: {
			quality: 100,
			width: 300,
			height: 300,
			resize: true,
		},
		success: result => {
			if (LoadingVisible) {
				showLoading();
			}
			new Promise((resolve, reject) => {
				uni.uploadFile({
					url: RequestBaseUrl + apiUrl.FileUpload,
					filePath: result.tempFilePaths[0],
					name: 'file',
					header: header,
					formData: {
						...data,
					},
					success: res => {
						if (LoadingVisible) {
							hideLoading();
						}
						let data = JSON.parse(res.data);
						if (data.code === 0) {
							resolve(data);
						} else {
							reject();
						}
					},
					fail: err => {
						if (LoadingVisible) {
							hideLoading();
						}
						reject(err);
					},
				});
			})
				.then(result => {
					callback(result);
				})
				.catch(err => {
					console.log('fileUpload Failed :', err);
				});
		},
		fail: err => {
			console.log('chooseImage Failed :', err);
		},
	});
}
/**
 *
 * @param { string } navType 页面路由切换方式
 */
export function handleRedirect(urlPath, navType = navTypeList.navTo) {
	let data = JSON.stringify({
		type: navType,
		to: urlPath,
	});
	confirmModal(
		'提示',
		'您尚未登录，是否現在登录？',
		function () {
			setStorageItem('redirect', data);
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/login/index',
					fail: err => {
						console.log('handleRedirect Error', err, {
							urlStr,
						});
					},
				});
			}, 200);
		},
		function () {
			// showToast('用戶取消了登錄！');
		},
	);
}

/**
 * @description 页面重定向 使用绝对路径
 * @param { string } urlStr 目标页面路径
 * @param { boolean } isNeedLogin 目标页面是否需要登录
 * @param { string } navType 目标页面导航类型
 */
export function navTo(urlStr, isNeedLogin = false, navType = navTypeList.navTo) {
	let isLoginUrl = urlStr == '/pages/login/index';
	if (isLoginUrl) {
		let data = JSON.stringify({
			type: navType,
			to: urlStr,
		});
		setStorageItem('redirect', data);
		uni.navigateTo({
			url: urlStr,
			fail: err => {
				console.log('navigateTo Error', err, {
					urlStr,
				});
			},
		});
		return;
	}
	if (isNeedLogin == true && isLogin() == false) {
		handleRedirect(urlStr, navType);
	} else {
		uni.navigateTo({
			url: urlStr,
			fail: err => {
				console.log('navigateTo Error', err, {
					urlStr,
				});
			},
		});
	}
}

/**
 * @description tab页面切换
 * @param { string } urlStr 目标页面路径
 * @param { boolean } isNeedLogin 目标页面是否需要登录
 * @param { string } navType 目标页面导航类型
 */
export function switchTab(urlStr, isNeedLogin = false, navType = navTypeList.switchTab) {
	if (isNeedLogin == true && isLogin() == false) {
		handleRedirect(urlStr, navType);
	} else {
		uni.switchTab({
			url: urlStr,
			fail: err => {
				console.log('switchTab Error', err, {
					urlStr,
				});
			},
		});
	}
}

/**
 * @description 页面重定向
 * @param { string } urlStr 目标页面路径
 * @param { boolean } isNeedLogin 目标页面是否需要登录
 * @param { string } navType 目标页面导航类型
 */
export function redirectTo(urlStr, isNeedLogin = false, navType = navTypeList.redirectTo) {
	if (isNeedLogin == true && isLogin() == false) {
		handleRedirect(urlStr, navType);
	} else {
		uni.redirectTo({
			url: urlStr,
			fail: err => {
				console.log('redirectTo', err, {
					urlStr,
				});
			},
		});
	}
}
// 返回某一级页面
export function navBack(delta = 1, animationType = 'pop-in', duration = 300) {
	uni.navigateBack({
		delta: delta,
		animationType: animationType,
		animationDuration: duration,
	});
}
// 显示悬浮轻提示
export function showToast(title = '', icon = 'none', duration = 2000, mask = 'false') {
	uni.showToast({
		title: title,
		icon: icon,
		duration: duration,
		mask,
	});
}
// 显示 loading 动画
export function showLoading(title = '加载中', mask = false) {
	uni.showLoading({
		title,
		mask,
	});
}
// 隐藏 loading 动画
export function hideLoading() {
	uni.hideLoading();
}
/**
 * @description 弹出确认框
 * @param { string } text 提示标题
 * @param { string } content 提示内容
 * @param { function } resolveCallback 确认的回调
 * @param { function } rejectCallback 取消的回调
 */
export function confirmModal(text, content, resolveCallback, rejectCallback) {
	uni.showModal({
		title: `${text}`,
		content: `${content}`,
		success: function (res) {
			if (res.confirm) {
				resolveCallback();
			} else if (res.cancel) {
				rejectCallback();
			}
		},
	});
}
/**
 * @description 下拉刷新
 * @param { function } resolveCallback 确认的回调
 * @param { function } rejectCallback 取消的回调
 */
export function startRefresh(Callback, delay = 500) {
	Callback();
	setTimeout(() => {
		stopRefresh();
	}, delay);
}
/**
 * 停止下拉刷新
 */
function stopRefresh() {
	uni.stopPullDownRefresh();
}
/**
 *
 * @param { string } url 请求路径
 * @param { object } _this 当前 vue 实例
 * @param { string } fieldName.listField 列字段
 * @param { string } fieldName.hasNextPage 是否有下一页字段
 * @param { string } fieldName.pageSize 页尺寸字段
 * @param { string } fieldName.pageNum 当前页字段
 * @param { number } pageSize 请求页尺寸
 * @param { number } pageNum 请求当前页
 * @param { function } callback 请求成功回调函数
 */
export function reachBottom({ url, _this, fieldName = {}, data = {}, LoadingVisible = true, pageSize = 10, pageNum = 1 }, callback = null) {
	// 是否还有下一页
	let { hasNextPage = 'hasNextPage' } = fieldName;

	if (_this[hasNextPage]) {
		// 到达底部当前页 +1
		pageNum += 1;
		// 然后发起新的请求
		listHttpRequest({ url, _this, fieldName, data, type: getListOrLoadMore.loadMore, LoadingVisible, pageSize, pageNum }, (callback = null));
	}
}

/**
 *
 * @param { string } url 请求路径
 * @param { object } _this 当前 vue 实例
 * @param { string } fieldName.listField 列字段
 * @param { string } fieldName.hasNextPage 是否有下一页字段
 * @param { string } fieldName.pageSize 页尺寸字段
 * @param { string } fieldName.pageNum 当前页字段
 * @param { string } type 数据加载类型 加载更多 或 刷新数据
 * @param { string } data 额外的查询参数
 * @param { function } callback 请求成功回调函数
 * @param { number } pageSize 请求页尺寸
 * @param { number } pageNum 请求当前页
 * @returns
 */
export function listHttpRequest({ url, _this, fieldName = {}, data = {}, type = getListOrLoadMore.getList, LoadingVisible = true, pageSize = 10, pageNum = 1 }, callback = null) {
	// 设置默认值，页面里面可以省去一些不必要的参数

	let { hasNextPageField = 'hasNextPage', ListField = 'List', pageNumField = 'pageNum', pageSizeField = 'pageSize' } = fieldName;
	_this[pageSizeField] = pageSize;
	_this[pageNumField] = pageNum;
	_this[hasNextPageField] = true;
	_this.$forceUpdate();
	httpRequest(
		{
			url,
			data: {
				pageSize: pageSize,
				pageNum: pageNum,
				// 接收额外的查询参数
				...data,
			},
			LoadingVisible: LoadingVisible,
		},
		function (res) {
			let hasNextPage = res.length < pageSize ? false : true;
			if (type == getListOrLoadMore.loadMore) {
				// 加载更多
				_this[ListField] = [..._this[ListField], ...res];
			} else if (type == getListOrLoadMore.getList) {
				// 下拉刷新
				_this[ListField] = [...res];
			}
			_this[hasNextPage] = hasNextPage;
			_this.$forceUpdate();
			if (callback) {
				callback(hasNextPage, res);
			}
		},
	);
}
/**
 * @description 获取字典数据
 * @param {*} titleId 待查字典类型 id
 * @param {*} Callback 请求成功数据的回调
 */
export function getDictData(titleId, Callback) {
	httpRequest(
		{
			url: apiUrl.DataDict,
			data: {
				tid: titleId,
			},
		},
		function (res) {
			Callback(res);
		},
	);
}
/**
 *
 * @param { string } key 存储数据的 key
 * @param { string } value 存储数据的 value
 * @returns
 */
export function setStorageItem(key, value) {
	uni.setStorage({
		key: key,
		data: value,
		fail: error => {
			console.log('setStorageSync Error :', error);
		},
	});
}
/**
 *
 * @param { string } key 存储数据的 key
 * @returns
 */
export function getStorageItem(key) {
	let value = uni.getStorageSync(key);
	return value ? value : false;
}
/**
 *
 * @param { string } key 存储数据的 key
 * @returns
 */
export function removeStorageItem(key) {
	uni.removeStorage({
		key: key,
		fail: err => {
			console.log('removeStorage Error', err);
		},
	});
}
/**
 *
 * @param {string | number} timestamp 需要转化的时间戳
 * @param { string } timestamp 需要转化的时间戳
 * @returns
 */
export function dateFormater(time, pattern) {
	let datetime = new Date(time).toJSON();
	new Date(+new Date(datetime) + 8 * 3600 * 1000)
		.toISOString()
		.replace(/T/g, ' ')
		.replace(/\.[\d]{3}Z/, '');
	if (arguments.length === 0 || !time) {
		return null;
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
	let date;
	if (typeof time === 'object') {
		date = time;
	} else {
		if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
			time = parseInt(time);
		} else if (typeof time === 'string') {
			time = time.replace(new RegExp(/-/gm), '/');
		}
		if (typeof time === 'number' && time.toString().length === 10) {
			time = time * 1000;
		}
		date = new Date(time);
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay(),
	};
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key];
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value];
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value;
		}
		return value || 0;
	});
	return time_str;
}
export function getDateTime(timestamp) {
	let date = new Date(timestamp * 1000);
	let dateStr = date.getFullYear() + '年/' + (date.getMonth() + 1) + '月' + date.getDay() + '日 ' + (date.getHours() > 10 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes());
	return dateStr;
}
/**
 * @description 字段值解释翻译
 * @param { array } collection 对照数据
 * @param { string } value 待翻译的值
 * @param { string } collectionField 待翻译的字段 默认 'value'
 * @param { string } collectionLabel 目标值的字段 默认 'label'
 * @returns
 */
export function fieldTranslate(collection, value, collectionField = 'value', collectionLabel = 'label') {
	if (collection && value && toString(value).length) {
		if (Object.prototype.toString.call(collection) === '[object Array]') {
			let checked = collection.find(ele => {
				return ele[collectionField] == value;
			});
			let tips = (checked && checked[collectionLabel]) || '解释错误';
			return tips;
		} else {
			console.log('Field Translate Error：类型必须为 Array');
			return '';
		}
	} else {
		console.log('Field Translate Error：数据字段集合、为必须参数!');
		return '';
	}
}
