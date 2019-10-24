<template>
	<view class="page">
		<!-- 顶部筛选栏 -->
		<view class="screen">
			<view class="item" @click="sortTime" :class="timeTOP ? 'text-blue' : 'text-black'">
				最新
				<!-- <text class="tag cuIcon-fold"></text> -->
			</view>
			<view class="item" @click="sortPrice" :class="priceTOP ? 'text-blue' : 'text-black'">
				价格
				<!-- <text class="tag cuIcon-unfold"></text> -->
			</view>
			<view class="item" @click="showModal">
				筛选 <text class="tag cuIcon-filter"></text>
			</view>
		</view>
		<!-- 数据列表 -->
		<view class="list">
			<view class="pro-list">
				<view class="pro" v-for="(item, index) in list" :key="index" @click="showInfo" :data-logicid="item.logicId">
					<image :src="item.fileUrl" mode="aspectFill" class="image"></image>
					<view class="name ellipsis text-black text-df">
						{{item.trademarkName}}
					</view>
					<view class="des text-gray text-sm ellipsis">
						{{item.groupType}}
					</view>
					<view class="price text-orange">
						<text class="text-lg text-price" v-if="item.price != 0">{{item.price}}</text>
						<text class="text-lg" v-else>面议</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 下拉加载 -->
		<uni-load-more :status="status" />
		<!-- 筛选窗 -->
		<uni-drawer :visible="showScreen" mode="right" @close="hideModal">
			<scroll-view scroll-y="true" class="screen-window">
				<view>
					<view class="group">
						<view class="name text-df text-black">商标分类</view>
						<view class="selection">
							<view class="opt bg-white ellipsis text-sm" v-for="(item, index) in filterType" :class="typeCheck == index ? 'bg-green light' : ''"
							 @click="handleQuery('type', index, item)" :key="index">
								{{item.selectName}}
							</view>
						</view>
					</view>
					<view class="group">
						<view class="name text-df text-black">组合类型</view>
						<view class="selection">
							<view class="opt bg-white ellipsis text-sm" v-for="(item, index) in filterComb" :class="combCheck == index ? 'bg-green light' : ''"
							 @click="handleQuery('comb', index, item)" :key="index">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	export default {
		components: {
			uniDrawer
		},
		data() {
			return {
				timeTOP: false,
				priceTOP: false,
				showScreen: false,
				filterType: [],
				filterComb: [{
					name: '中文'
				}, {
					name: '英文'
				}, {
					name: '图形'
				}, {
					name: '组合'
				}],
				typeCheck: -1,
				combCheck: -1,
				list: [],
				pageIndex: -1,
				pageSize: 10,
				status: 'more',
				filter: {}
			}
		},
		onLoad() {
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
			sortTime() {
				if (!this.timeTOP) {
					this.timeTOP = true;
					this.priceTOP = false;
					this.filter.timeOrder = 'createTimeDesc';
					this.filter.priceOrder = '';
					this.getList('refresh')
				}
			},
			sortPrice() {
				if (!this.priceTOP) {
					this.priceTOP = true;
					this.timeTOP = false;
					this.filter.priceOrder = 'priceEsc';
					this.filter.timeOrder = '';
					this.getList('refresh')
				}
			},
			showModal() {
				this.showScreen = true;
			},
			hideModal() {
				this.showScreen = false;
			},
			handleQuery(type, index, item) {
				switch (type) {
					case 'type':
						if (index == this.typeCheck) {
							this.typeCheck = -1;
							this.filter.classifySearch = '';
						} else {
							this.typeCheck = index;
							this.filter.classifySearch = item.selectContent;
						}
						break;
					case 'comb':
						if (index == this.combCheck) {
							this.combCheck = -1;
							this.filter.groupTypeSearch = '';
						} else {
							this.combCheck = index;
							this.filter.groupTypeSearch = item.name;
						}
						break;
				}
				this.getList('refresh')
			},
			getList(type) {
				this.status = 'loading';
				if (type == 'refresh') {
					this.pageIndex = -1;
				}
				const param = {
					pageIndex: ++this.pageIndex,
					pageSize: this.pageSize
				}
				if (Object.keys(this.filter).length) {
					Object.assign(param, this.filter)
				}
				uni.request({
					method: 'GET',
					url: this.$servicePath + 'trademark/mobile/trademark.xhtml',
					data: param,
					success: res => {
						const object = res.data.object;
						if (type == 'refresh') {
							this.list = [];
							uni.stopPullDownRefresh();
						}
						if (!this.filterType.length) {
							this.filterType = object.classifyList;
						}
						if (!this.filterComb.length) {
							this.filterComb = object.cydhList;
						}
						this.list.push.apply(this.list, object.presidents.results);
						const count = object.presidents.count;
						this.status = (this.pageIndex + 1) * this.pageSize >= count ? 'noMore' : 'more';
					},
					fail: () => {
						this.status = 'error';
						if (type == 'refresh') {
							this.list = [];
							uni.stopPullDownRefresh();
						}
					}
				})
			},
			showInfo(e) {
				const id = e.currentTarget.dataset.logicid;
				uni.navigateTo({
					url: 'tradeinfo?logicid=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $bg-color-under;
	}

	.screen {
		padding: 0 50upx;
		background: $bg-color-white;
		display: flex;
		justify-content: space-between;
		position: fixed;
		/* #ifdef APP-PLUS */
		top: 0;
		/* #endif */
		left: 0;
		width: 100%;
		z-index: 99;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */

		.item {
			height: 80upx;
			line-height: 80upx;
			font-size: $font-size-normal;

			.tag {
				margin-left: $space-size-small;
			}
		}
	}

	.list {
		padding-top: 80upx;
	}

	.screen-window {
		height: 100vh;
		background: $bg-color-grey;
		padding: 0 7upx 20upx 7upx;

		.group {
			margin-top: 40upx;

			.name {
				padding: 0 5upx;
				margin-bottom: $space-size-large;
			}

			.selection {
				overflow: hidden;

				.opt {
					float: left;
					margin: 7upx;
					width: calc(33.333333% - 14upx);
					text-align: center;
					border-radius: $radius-size-small;
					padding: 14upx 5upx;
				}
			}
		}
	}

	.pro-list {
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

			.image {
				display: block;
				width: 100%;
				height: 440rpx;
				background-image: url("../../static/noPic.png");
				background-size: 100%;
				background-repeat: no-repeat;
			}

			.name {
				padding: 0 $space-size-large;
			}

			.des {
				padding: 0 $space-size-large;
				line-height: 1.4;
			}

			.price {
				margin-top: $space-size-normal;
				padding: 0 $space-size-large;
				font-weight: bold;
				line-height: 2;
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
