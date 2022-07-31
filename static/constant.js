export const genderList = [
	{
		label: '未知',
		value: '0',
	},
	{
		label: '男',
		value: '1',
	},
	{
		label: '女',
		value: '2',
	},
];

export const ticketOrCoupons = [
	{
		label: '折扣券',
		value: '1',
	},
	{
		label: '優惠券',
		value: '2',
	},
];
export const ticketOrCouponsType = {
	ticket: 1,
	coupons: 2,
};

export const ticketAndCouponsStatus = [
	{
		label: '待領取',
		value: '1',
		class: 'btn-success',
	},
	{
		label: '已領取',
		value: '2',
		class: 'btn-danger',
	},
];
export const ticketAndCouponsStatusType = {
	toGet: 1,
	hasGet: 2,
};

export const myTicketAndCouponsStatus = [
	{
		class: 'btn-success',
		label: '已使用',
		value: '1',
	},
	{
		class: 'btn-danger',
		label: '待使用',
		value: '2',
	},
	{
		class: 'btn-warning',
		label: '已拒絕',
		value: '3',
	},
];

export const myTicketAndCouponsStatusType = {
	hasUsed: 1,
	toUse: 2,
	hasTejected: 3,
};

export const InsureStatus = [
	{
		label: '已通過',
		value: '1',
		class: 'passed',
	},
	{
		label: '已拒絕',
		value: '3',
		class: 'rejected',
	},
	{
		label: '待驗證',
		value: '2',
		class: 'toVerify',
	},
];
export const ticketVerifyStatus = [
	{
		label: '已核銷',
		value: 1,
		class: 'hasVerified',
	},
	{
		label: '待核銷',
		value: 2,
		class: 'noVerified',
	},
];
export const ticketVerifyStatusType = {
	hasVerified: 1,
	toVerified: 2,
};

export const orderStatus = [
	{
		label: '待領取',
		value: 1,
		class: 'hasVerified',
	},
	{
		label: '已領取',
		value: 2,
		class: 'noVerified',
	},
	{
		label: '已結束',
		value: 3,
		class: 'noVerified',
	},
];

export const ticketAndCouponsUsedState = {
	isUsed: 1,
	hasNotUsed: 2,
};

export const User = {
	isVip: 1,
	isShopPassChecked: 1,
};

export const Activity = {
	isSignedUp: 1,
	isNotSignedUp: 0,
	isRunning: 1,
	isFinished: 3,
};
export function formValidation(schoolList, degreeList) {
	return [
		{ name: 'name', checkType: 'string', checkRule: '1,16', errorMsg: '請檢查姓名' },
		{ name: 'idNumber', checkType: 'reg', checkRule: /^[0-9]{17}(X|\d)$/, errorMsg: '請檢查身份證號碼' },
		{ name: 'gender', checkType: 'in', checkRule: '1,2', errorMsg: '請選擇性別' },
		{ name: 'school', checkType: 'in', checkRule: schoolList, errorMsg: '請檢查就讀學校' },
		{ name: 'degree', checkType: 'in', checkRule: degreeList, errorMsg: '請檢查學位' },
		{ name: 'email', checkType: 'email', errorMsg: '請檢查郵箱地址' },
		{ name: 'weixin', checkType: 'notnull', errorMsg: '請檢查微信號' },
		{ name: 'phone', checkType: 'phoneno', errorMsg: '請檢查手機號碼' },
		{ name: 'emergencyPhone', checkType: 'phoneno', errorMsg: '請檢查緊急聯繫方式' },
	];
}
export const fieldsLength = {
	title: 12,
	discount: 3,
	desc: 200,
	name: 12,
	idNumber: 18,
	email: 20,
	weixin: 20,
	phone: 11,
	emergencyPhone: 11,
};
