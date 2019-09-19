<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary');
			// App版本检测
			// plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			// 	uni.request({
			// 		url: 'https://store.hcerm.com/app/checkUpdate.xhtml',
			// 		method: 'GET',
			// 		data: {
			// 			version: widgetInfo.version,
			// 			os: plus.os.name,
			// 			appid: plus.runtime.appid,
			// 			name: widgetInfo.name
			// 		},
			// 		success: (res) => {
			// 			const result = JSON.parse(res.data.substring(1, res.data.length - 1));
			// 			const data = result.data;
			// 			if (data.update && data.wgtUrl) {
			// 				uni.downloadFile({
			// 					url: data.wgtUrl,
			// 					success: (wgtRes) => {
			// 						if (wgtRes.statusCode === 200) {
			// 							plus.runtime.install(wgtRes.tempFilePath, {
			// 								force: false
			// 							}, function() {
			// 								console.log('install success...');
			// 								plus.runtime.restart();
			// 							}, function(e) {
			// 								console.error('install fail...');
			// 							});
			// 						}
			// 					}
			// 				});
			// 			} else if (data.update && data.pkgUrl) {
			// 				uni.showModal({
			// 					title: '发现新版本',
			// 					content: '新版本更新内容：\n1.【优化】产品性能。\n2.【修复】文章列表内容错乱问题。',
			// 					confirmText: '马上升级',
			// 					cancelText: '退出',
			// 					success: function(modalRes) {
			// 						if (modalRes.confirm) {
			// 							plus.runtime.openURL(data.pkgUrl);
			// 						} else if (modalRes.cancel) {
			// 							plus.runtime.quit(); 
			// 						}
			// 					}
			// 				})
			// 			}
			// 		}
			// 	});
			// });
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';

	@font-face {
		font-family: 'iconfont';
		src: url('https://at.alicdn.com/t/font_1382986_rt6x2ynbipm.ttf') format('truetype');
	}

	.iconfont {
		font-family: iconfont;
	}

	.uni-tabbar__item.cur .uni-tabbar__icon {
		width: 100upx;
	}

	.uni-tabbar__item.cur .uni-tabbar__label {
		display: none;
	}
</style>
