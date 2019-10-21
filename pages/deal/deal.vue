<template>
	<view class="container">
		<image :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" :src="item.image" mode="" class="image" v-for="(item,index) in elements" :key="index" :data-url="item.url"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				elements: [{
						image: '../../static/image/t3_03.png',
						url: ''
					},{
						image: '../../static/image/t3_06.png',
						url: ''
					},{
						image: '../../static/image/t3_08.png',
						url: ''
					}
				]
			};
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
