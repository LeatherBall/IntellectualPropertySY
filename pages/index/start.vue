<template>
	<view class="launch"></view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			this.loadExecution()
		},
		methods: {
			// 首次打开APP时展示引导页
			loadExecution() {
				try {
					// const value = uni.getStorageSync('launchFlag');
					const value = true;
					if (value) {
						uni.switchTab({
							url: '/pages/index/index'
						});
					} else {
						uni.setStorage({
							key: 'launchFlag',
							data: true
						});
						uni.redirectTo({
							url: '/pages/index/welcome'
						});
					}
				} catch (e) {
					uni.setStorage({
						key: 'launchFlag',
						data: true
					});
					uni.redirectTo({
						url: '/pages/index/welcome'
					});
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #eeeeee;
	}
	.launch {
		background-color: #eeeeee;
	}
</style>
