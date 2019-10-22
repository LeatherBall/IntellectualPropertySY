<template>
	<view>
		<view class="pro-list">
			<view class="pro" v-for="(item, index) in products" :key="index" @click="showInfo" :data-logicid="item.logicId">
				<image :src="item.fileUrl" mode="widthFix" class="image"></image>
				<view class="name ellipsis-two">
					{{item.trainName}}
				</view>
				<view class="factory ellipsis">
					{{item.trainType}}
				</view>
			</view>
		</view>
		<!-- 下拉加载 -->
		<uni-load-more :status="status" />
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				page: -1,
				products: [],
				status: 'more',
			};
		},
		onLoad(e) {
			this.getList();
		},
		onPullDownRefresh() {
			this.getList('refresh');
		},
		onReachBottom() {
			if (this.status != 'noMore') {
				this.getList()
			}
		},
		methods: {
			getList(type) {
				this.status = 'loading';
				if (type == 'refresh') {
					this.page = -1;
				}
				uni.request({
					url: this.$servicePath + 'online/mobile/online.xhtml',
					method: 'GET',
					data: {
						pageIndex: ++this.page,
						pageSize: 10
					},
					success: (res) => {
						if (type == 'refresh') {
							this.products = [];
							uni.stopPullDownRefresh();
						}
						var res = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
						var list = res.object.presidents.results;
						var typeList = res.object.sinSelList;
						var arr = this.products;
						
						for (var i = 0; i < list.length; i++) {
							if (list[i].fileUrl != '') {
								list[i].fileUrl = this.$servicePath + list[i].fileUrl;
							}
							for (var j = 0; j < typeList.length; j++) {
								if (list[i].trainType == typeList[j].selectOrder) {
									list[i].trainType = typeList[j].selectName
								}
							}
							list[i].createTimeStr = list[i].createTimeStr.substring(0, 10)
							arr.push(list[i])
						}
						
						this.products = arr;
						const count = res.object.presidents.count;
						this.status = (this.page + 1) * 10 >= count ? 'noMore' : 'more';
					},
					fail: () => {
						if (type == 'refresh') {
							this.products = [];
							uni.stopPullDownRefresh();
						}
						this.status = 'error';
					}
				});
			},
			showInfo(e) {
				var logicId = e.currentTarget.dataset.logicid;
				uni.navigateTo({
					url: 'detail?logicId=' + logicId
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $bg-color-under;
	}

	.pro-list {
		// display: flex;
		margin: $space-size-huge $space-size-normal;
		overflow: hidden;

		.pro {
			width: calc(50% - 20rpx);
			margin: 0 10rpx;
			float: left;
			background: $bg-color-white;
			border-radius: $radius-size-normal;
			overflow: hidden;
			margin-bottom: $space-size-huge;
			height: 606rpx;

			.image {
				display: block;
				width: 100%;
				height: 440rpx;
				background-image: url("../../static/noPic.png");
				background-size: 100%;
				background-repeat: no-repeat;
			}

			.name {
				font-size: $font-size-normal;
				color: $font-color-base;
				padding: $space-size-normal;
				line-height: 1.5;
				height: 104rpx;
			}

			.factory {
				padding: $space-size-normal;
				font-size: $font-size-small;
				color: $font-color-grey;
				height: 62rpx;
			}

		}

		.sub-list:first-child {
			margin-right: $space-size-normal;
		}

		.sub-list:last-child {
			margin-left: $space-size-normal;
		}
	}
</style>
