<template>
	<view>
		<view class="article-item" v-for="(article, index) in list" :key="index" @click="viewDetails(article.logicId)">
			<view class="wrapper">
				<view class="title">
					<view class="text ellipsis">{{article.title}}</view>
				</view>
				<view class="content">
					<image :src="article.img" mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content ellipsis-three">{{article.content}}</view>
						<view class="time"><text class="iconfont clock">&#xe604;</text>{{article.time}}</view>
					</view>
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
							logicId: '162300393225',
							title: "无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。",
							content: "折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！",
							time: '2019-9-20 13:13',
							img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						});
					}
					this.status = this.list.length > 30 ? 'noMore' : 'more';
				}, 500)
			},
			viewDetails(id) {
				console.log(id)
				uni.navigateTo({
					url: 'detail?id=' + id
				});
			}
		}
	}
</script>

<style lang="scss">
	.article-item {
		overflow: hidden;
		/* #ifdef APP-PLUS */
		border-bottom: $border-style-basic;
		/* #endif */
		
		/* #ifdef H5 MP-WEIXIN */
		border-bottom: $border-style-basic-h5;
		/* #endif */
	}

	.article-item .wrapper {
		padding-bottom: $space-size-large;
		margin: 0;
		background-color: $bg-color-white;
		overflow: hidden;
	}

	.article-item .wrapper .title {
		padding: 0 $space-size-large;
	}

	.article-item .wrapper .title .text {
		font-size: $font-size-large;
		font-weight: 900;
		color: $font-color-base;
		line-height: 70upx;
	}

	.article-item .wrapper .content {
		display: flex;
		padding: 0 $space-size-large;
	}

	.article-item .wrapper .content image {
		width: 240upx;
		height: 6.4em;
		margin-right: $space-size-large;
		border-radius: $radius-size-small;
	}

	.article-item .wrapper .content .desc {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.content .desc .text-content {
		font-size: $font-size-normal;
		color: #888;
		height: 4.8em;
		overflow: hidden;
		line-height: 1.6;
	}

	.content .desc .time {
		font-size: $font-size-small;
		color: $font-color-grey;
	}

	.content .desc .time .clock {
		font-size: $font-size-normal;
		margin-right: $space-size-small;
	}
</style>
