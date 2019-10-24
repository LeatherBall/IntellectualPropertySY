<template>
	<div>
		<view class="welcome">
			<view class="pass cu-tag line-black round" @click="pass">
				跳过<text>{{time}}</text>
			</view>
			<image src="../../static/welcome.jpg" mode="widthFix" class="image"></image>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				time: 3
			}
		},
		onShow() {
			const sit = setInterval(() => {
				--this.time;
				if (this.time === 0) {
					clearInterval(sit)
					this.pass();
				}
			}, 1000);
		},
		methods: {
			pass() {
				uni.setStorage({
					key: 'launchFlag',
					data: true,
				});
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style>
	.welcome {
		position: relative;
		width: 750upx;
		height: 100vh;
	}

	.image {
		width: 100%;
		height: 100%;
	}

	.pass {
		position: absolute;
		top: 50upx;
		right: 50upx;
		z-index: 2;
	}

	.pass text {
		margin-left: 5upx;
	}
</style>
