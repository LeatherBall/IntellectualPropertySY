<template>
	<view class="container">
		<image src="../../static/image/t1_03.png" mode="" class="image" @click="openUrl('http://cponline.sipo.gov.cn/')"></image>
		<image src="../../static/image/t1_06.png" mode="" class="image" @click="openUrl('http://wssq.saic.gov.cn:9080/tmsve/')"></image>
		<image src="../../static/image/t1_08.png" mode="" class="image" @click="openUrl('http://apply.ccopyright.com.cn/cpcc/column_list_bqdj.jsp')"></image>
		<image src="../../static/image/t1_10.png" mode="" class="image" @click="openUrl('http://www.cgi.gov.cn/Home/Default/')"></image>
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
