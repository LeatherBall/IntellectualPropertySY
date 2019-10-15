/**
 * 用户基本信息
 */
let USEROBJ;

const KEY = '$user';

/**
 * 缓存用户信息
 * @param {Object} user
 */
const cacheUserToStorage = function(user) {
	uni.setStorageSync(KEY, user);
};

/**
 * 从缓存中获取用户信息
 */
const getUserFromStorage = function() {
	return uni.getStorageSync(KEY) || {};
}

/**
 * 清除缓存中的用户信息
 */
const clearUserFromStorage = function() {
	uni.removeStorageSync(KEY);
}

const UserBase = {
	/**
	 * 设置用户信息
	 * @param {Object} user
	 */
	setUser: function(user, password) {
		if (user) {
			const userObj = user.userObj;
			const userExtObj = user.userExtObj;
			const newUser = {
				userName: userObj.userName, //单位/自然人姓名
				userType: userExtObj.userType, //用户类型 0 为单位 1为自然人
				documentTypeStr: userExtObj.documentTypeStr, //证件类型
				certificateNum: userExtObj.certificateNum, //证件号码
				address: userExtObj.addressSsx + userExtObj.addressJd, //地址
				zipCode: userExtObj.zipCode, //邮编
				userLoginName: userExtObj.userLoginName, //企业/用户账号
				contacts: userExtObj.contacts, //联系人
				userEmail: userObj.userEmail, //电子邮箱
				userMobile: userExtObj.userMobile, //手机号码
				teleNum: userExtObj.teleNum, //座机号码
				password: password //密码
			};
			USEROBJ = newUser;
			cacheUserToStorage(newUser);
		}
	},

	/**
	 * 获取用户信息
	 * @param {Object} path 服务器地址
	 * @param {Object} callback 方法回调 返回用户信息
	 */
	getUser: function(path, callback) {
		if (USEROBJ && Object.keys(USEROBJ).length) {
			callback(USEROBJ);
			return;
		}
		const user = getUserFromStorage();
		if (user && Object.keys(user).length) {
			// 如果缓存中有用户信息而全局对象中没有，则进行自动登录
			uni.request({
				method: 'GET',
				url: path + 'user/mobile/userLogin.xhtml',
				data: {
					userLoginName: user.userLoginName,
					userPassword: user.password
				},
				success: (res) => {
					if (res.data.resultFlag) {
						this.setUser(res.data.object, user.password);
						callback(USEROBJ);
					} else {
						clearUserFromStorage();
						callback(null);
					}
				},
				fail: (res) => {
					clearUserFromStorage();
					rcallback(null);
				}
			})
		}
	}
}

module.exports = {
	UserBase: UserBase
}
