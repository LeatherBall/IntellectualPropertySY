<template>
	<view class="container">
		<image :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" :src="item.image" mode="" class="image" @click="openUrl" v-for="(item,index) in elements" :key="index" :data-url="item.url"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				elements: [{
						image: '../../static/image/t1_03.png',
						url: 'http://cponline.sipo.gov.cn/'
					},{
						image: '../../static/image/t1_06.png',
						url: 'http://wssq.saic.gov.cn:9080/tmsve/'
					},{
						image: '../../static/image/t1_08.png',
						url: 'http://apply.ccopyright.com.cn/cpcc/column_list_bqdj.jsp'
					},{
						image: '../../static/image/t1_10.png',
						url: 'http://www.cgi.gov.cn/Home/Default/'
					}
				]
			};
		},
		methods:{
			openUrl(e) {
				var url = e.currentTarget.dataset.url;
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
