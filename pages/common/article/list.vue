<template>
	<view class="uni-list">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
			<view class="uni-list-cell-navigate uni-navigate-right uni-media-list ">
				<view class="uni-media-list-logo">
					<image v-if="showImg" :src="value.img"></image>
				</view>
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top">{{value.title}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">{{value.content}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'media-list',
				showImg: false,
				list: [{
						title: "幸福",
						content: "能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？",
						img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90"
					},
					{
						title: "木屋",
						content: "想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖。",
						img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90"
					},
					{
						title: "CBD",
						content: "烤炉模式的城，到黄昏，如同打翻的调色盘一般。",
						img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90"
					}
				]
			}
		},
		onLoad(param) {
			setTimeout(() => {
				this.showImg = true;
			}, 400)
			if (param && param.pageTitle) {
				uni.setNavigationBarTitle({
					title: param.pageTitle
				})
			}
		}
	}
</script>

<style>
</style>
