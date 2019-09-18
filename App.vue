<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
