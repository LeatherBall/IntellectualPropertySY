<template>
	<view class="uni-list">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
			<view class="uni-list-cell-navigate uni-navigate-right uni-media-list ">
				<view class="uni-media-list-logo">
					<image :src="value.img"></image>
				</view>
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top">{{value.title}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">{{value.content}}</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" />
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				status: 'more',
				list: []
			}
		},
		onLoad(param) {
			if (param && param.pageTitle) {
				uni.setNavigationBarTitle({
					title: param.pageTitle
				})
			}
			this.getList();
		},
		onPullDownRefresh() {
			this.getList('refresh');
		},
		onReachBottom() {
			if (this.status != 'noMore') {
				this.getList();
			}
		},
		methods: {
			getList(type) {
				this.status = 'loading';
				setTimeout(() => {
					if (type == 'refresh') {
						this.list = [];
						uni.stopPullDownRefresh();
					}
					for (let i = 0; i < 10; i++) {
						this.list.push({
							title: "幸福",
							content: "能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？",
							img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90"
						});
					}
					this.status = this.list.length > 30 ? 'noMore' : 'more';
				}, 500)
			}
		}
	}
</script>

<style>
</style>
