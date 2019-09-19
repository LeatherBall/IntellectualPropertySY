/**
 * 字符串校验
 * @param {Object} str 校验目标
 * @param {Object} reg 校验规则
 */
function checkRegExp(str, reg) {
	var exp = '',
		message = '';
	if (reg == 'carNo') {
		exp = '^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$';
		message = '请输入正确的车牌号码';
	} else if (reg == 'number') {
		exp = '^[0-9]+$';
		message = '不正确，请输入整数';
	} else if (reg == 'idCard') {
		exp = '^[0-9xX]{0,18}$';
		message = '请输入正确的身份证号';
	} else if (reg == 'mobile') {
		exp = '^1[3456789]\\d{9}$';
		message = '请输入正确的手机号码';
	} else if (reg == 'allPhone') {
		exp = '^(([48]00\\d{7})|(0\\d{2,3}-\\d{7,8})|(1[34578]\\d{9})|(\\d{5}))$';
		// exp = '^/0\\d{2}-\\d{7,8}/$';
		message = '请输入正确的座机或手机号码';
	} else if (reg == 'smsCode') {
		exp = '^[0-9]{6}$';
		message = '请输入 6 位短信验证码';
	} else if (reg == 'password') {
		exp = '^[0-9a-zA-Z]{6,20}$';
		message = '请输入 6-20 位字母或数字';
	} else if (reg == 'email') {
		exp = '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$';
		message = '请输入正确邮箱';
	} else if (reg == 'point') {
		exp = '^(\\+)?\\d+(\\.\\d+)?$';
		message = '请输入正数和最多一个小数点';
	} else if (reg == 'pointOne') {
		exp = '^(\\d+|\\d+\\.\\d)$';
		message = '请输入正数和小数点后一位';
	} else if (reg == 'char') {
		exp = '^.{0,20}$';
		message = '过长，请输入少于 20 位字符';
	} else if (reg == 'varchar') {
		exp = '^.{0,200}$';
		message = '过长，请输入少于 200 位字符';
	} else if (reg == 'blob') {
		exp = '^.{0,4000}$';
		message = '过长，请输入少于 4000 位字符';
	} else if (reg == 'float') {
		exp = '(^[0-9]+$)|(^0.[0-9]{1,2}$)|(^[0-9]+.[0-9]{1,2}$)';
		message = '不正确，请输入正整数或小数(至多两位小数)';
	}
	return {
		flag: new RegExp(exp).test(str),
		message: message
	};
}

/**
 * 检测APP版本
 * @param {Object} isManual 是否为手动检测（如：用户在设置中点击检查最新版本）
 * @param {Function} onSuccess
 * @param {Functino} onError
 */
function checkAppVersion(isManual, onSuccess, onError) {
	if (isManual) {
		uni.showLoading({
			title: '正在获取最新版本'
		})
	}
	plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
		uni.request({
			url: 'https://store.hcerm.com/app/checkUpdate.xhtml',
			method: 'GET',
			data: {
				version: widgetInfo.version,
				os: plus.os.name,
				appid: plus.runtime.appid,
				name: widgetInfo.name
			},
			success: (res) => {
				if (res.data.status == 200) {
					if (isManual) {
						uni.hideLoading()
					}
					const result = JSON.parse(res.data.substring(1, res.data.length - 1));
					const data = result.data;
					//content是版本更新内容 \n换行
					const resultObj = {};
					if (data.update && data.pkgUrl) {
						resultObj.upgradeType = 'pkg'
						resultObj.upgradeContent = data.content
						resultObj.upgradeUrl = data.pkgUrl
					} else if (data.update && data.wgtUrl) {
						resultObj.upgradeType = 'wgt'
						resultObj.upgradeContent = data.content
						resultObj.upgradeUrl = data.wgtUrl
					} else if (isManual) {
						uni.showToast({
							icon: 'none',
							title: '当前已是最新版本',
							position: 'bottom'
						})
					}
					onSuccess && onSuccess(resultObj);
				} else {
					onError && onError(res);
				}
			},
			fail: (error) => {
				onError && onError(error);
			}
		});
	});
}

/**
 * 日期工具类
 */
var DateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},

	/**
	 * 格式化日期格式
	 * @param {Object} date Date对象
	 * @param {Object} fmt 格式化模板 传空时默认：yyyy-MM-dd hh:mm
	 */
	format: function(date, fmt) {
		fmt = fmt || 'yyyy-MM-dd hh:mm';
		var o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};

		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	
	/**
	 * 将指定毫秒转换成博客时间
	 * @param {Object} milliseconds 毫秒
	 */
	humanize: function(milliseconds) {
		var viewTime = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				viewTime = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return viewTime || '刚刚';
	},
};

module.exports = {
	checkRegExp: checkRegExp,
	checkAppVersion: checkAppVersion,
	DateUtils: DateUtils
}
