const Context = {
	/**
	 * 服务器地址
	 */
	serviceRealPath: "http://app.yuwoyuwo.com:80/FishFamily/",

	/**
	 * 存放用户登录实体
	 */
	USEROBJ: null,

	/**
	 * 当前租户编码
	 */
	ORGANCODE: 'LNSY',

	/**
	 * 缓存用户信息
	 * @param {Object} user
	 */
	cacheUserToStorage: function(user) {
		uni.setStorageSync('0x1', user);
		console.log('cache user information success');
	},

	/**
	 * 从缓存中获取用户信息
	 */
	getUserFromStorage: function() {
		return uni.getStorageSync('0x1') || {};
	},

	/**
	 * 清除缓存中的用户信息
	 */
	clearUserFromStorage: function() {
		uni.removeStorageSync('0x1');
		console.log('clear user information success');
	}
}

module.exports = {
	Context: Context
}
