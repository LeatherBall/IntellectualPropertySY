<template>
	<view>
		<view class="pro-list">
			<view class="sub-list">
				<view class="pro" v-for="(item, index) in products" :key="index" v-if="index%2==0" @click="showInfo" :data-logicid="item.logicId">
					<image :src="item.fileUrl" mode="widthFix" class="image"></image>
					<view class="name ellipsis-two">
						{{item.trainName}}
					</view>
					<view class="factory ellipsis">
						{{item.trainType}}
					</view>
				</view>
			</view>
			<view class="sub-list">
				<view class="pro" v-for="(item, index) in products" :key="index" v-if="index%2==1" @click="showInfo" :data-logicid="item.logicId">
					<image :src="item.fileUrl" mode="widthFix" class="image"></image>
					<view class="name ellipsis-two">
						{{item.trainName}}
					</view>
					<view class="factory ellipsis">
						{{item.trainType}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				hasMore: true,
				page: 0,
				products: []
			};
		},
		onLoad(e) {
			this.getList(0);
		},
		onPullDownRefresh() {
			console.log('refresh');
			var that = this;
			that.products = [],
				that.hasMore = true,
				that.page = 0,
				that.getList(0);
			uni.stopPullDownRefresh();
		},

		onReachBottom() {
			var that = this;
			if (!that.hasMore) return
			// Do something when page reach bottom.
			that.getList(that.page)
		},
		methods: {
			getList(page) {
				uni.request({
					url: this.$servicePath + 'online/mobile/online.xhtml',
					method: 'GET',
					dataType: 'jsonp',
					data: {
						pageIndex: page,
						pageSize: 10
					},
					success: (res) => {
						this.page = ++page;
						var res = JSON.parse(res.data);
						var list = res.object.presidents.results;
						var typeList = res.object.sinSelList;
						var arr = this.products;
						if (list.length >= 10) {
							this.hasMore = true;
						} else {
							this.hasMore = false;
						}
						if (res.object.totalcount == 0) {
							this.length = 0
						} else {
							this.length = 1
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
						}
						this.products = arr;
					}
				});
			},
			showInfo(e) {
				var logicId = e.currentTarget.dataset.logicid;
				uni.navigateTo({
					url: 'detail?logicId='+logicId
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
		display: flex;
		margin: $space-size-huge;

		.sub-list {
			flex-basis: 50%;

			.pro {
				background: $bg-color-white;
				border-radius: $radius-size-normal;
				overflow: hidden;
				margin-bottom: $space-size-huge;

				.image {
					display: block;
					width: 100%;
					background-image: url("../../static/noPic.png");
					background-size: 100%;
					background-repeat: no-repeat;
				}

				.name {
					font-size: $font-size-normal;
					color: $font-color-base;
					padding: $space-size-normal;
					line-height: 1.5;
				}

				.factory {
					padding: $space-size-normal;
					font-size: $font-size-small;
					color: $font-color-grey;
				}
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
