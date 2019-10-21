<template>
	<view class="container">
		<image src="../../static/image/t2_03.png" mode="" class="image" @click="openUrl('http://cpquery.cnipa.gov.cn/')"></image>
		<image src="../../static/image/t2_06.png" mode="" class="image" @click="openUrl('http://wsjs.saic.gov.cn/?SVVVdE0o=KGmhcakkaZHkaZHka0ExbesZFAi6etCP27OgNPzHVc9qqWW')"></image>
		<image src="../../static/image/t2_08.png" mode="" class="image" @click="openUrl('http://www.ccopyright.com.cn/')"></image>
		<image src="../../static/image/t2_10.png" mode="" class="image" @click="openUrl('http://www.cgi.gov.cn/Products/List/')"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods:{
			openUrl(url) {
				// #ifdef APP-PLUS
				plus.runtime.openWeb(url);
				// #endif
			
				// #ifdef H5
				window.open(url);
				// #endif
			},
		}
	}
</script>

<style lang="scss">
	.container{
		width: 100%;
		height: 100%;
		padding: 45rpx;
		box-sizing: border-box;
	}
	.image{
		width: 660rpx;
		height: 151rpx;
		margin-bottom: 20rpx;
	}
</style>
