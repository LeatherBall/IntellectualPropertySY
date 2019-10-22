<template>
	<view>
		<view class="article bg-white" v-for="article in list" :key="article.id" @click="showInfo(article.ext6)">
			<view class="title ellipsis-two text-lg text-black">{{article.title}}</view>
			<view class="time text-sm"><text class="iconfont clock text-sm">&#xe604;</text>{{article.createTimeStr}}</view>
		</view>
		<uni-load-more :status="status" />
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		getArticleList
	} from '../../../common/util.js'
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				status: 'more',
				columnId: '',
				pageIndex: -1,
				pageSize: 20,
				list: []
			}
		},
		onLoad(param) {
			uni.setNavigationBarTitle({
				title: param.pageTitle
			})
			this.columnId = param.columnId;
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
				if (type == 'refresh') {
					this.pageIndex = -1;
				}
				getArticleList({
					pageIndex: ++this.pageIndex,
					pageSize: this.pageSize,
					columnId: this.columnId,
					ip: this.$servicePath
				}, res => {
					if (res.resultFlag) {
						if (type == 'refresh') {
							this.list = [];
							uni.stopPullDownRefresh();
						}
						this.list.push.apply(this.list, res.object.presidents.results);
						const count = res.object.presidents.count;
						this.status = (this.pageIndex + 1) * this.pageSize >= count ? 'noMore' : 'more';
					}
				}, () => {
					if (type == 'refresh') {
						this.list = [];
						uni.stopPullDownRefresh();
					}
					this.status = 'error';
				})
			},
			showInfo(url) {
				// #ifdef APP-PLUS
				plus.runtime.openWeb(url);
				// #endif
				
				// #ifdef H5
				window.open(url);
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $bg-color-under;
	}
	.article {
		padding: $space-size-large;
		
		.title {
			line-height: 1.5;
		}
		
		.time {
			margin-top: $space-size-small;
			.clock {
				margin-right: $space-size-normal;
			}
		}
	}
	
	.article + .article {
		border-top: $border-style-basic;
	}
</style>
