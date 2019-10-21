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
						image: '../../static/image/t2_03.png',
						url: 'http://cpquery.cnipa.gov.cn/'
					},{
						image: '../../static/image/t2_06.png',
						url: 'http://wsjs.saic.gov.cn/?SVVVdE0o=KGmhcakkaZHkaZHka0ExbesZFAi6etCP27OgNPzHVc9qqWW'
					},{
						image: '../../static/image/t2_08.png',
						url: 'http://www.ccopyright.com.cn/'
					},{
						image: '../../static/image/t2_10.png',
						url: 'http://www.cgi.gov.cn/Products/List/'
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
