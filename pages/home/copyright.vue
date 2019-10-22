<template>
	<view class="page">
		<!-- 顶部筛选栏 -->
		<view class="screen">
			<view class="item" @click="sortTime" :class="timeTOP ? 'text-blue' : 'text-black'">
				最新 <!-- <text class="tag cuIcon-fold"></text> -->
			</view>
			<view class="item" @click="sortPrice" :class="priceTOP ? 'text-blue' : 'text-black'">
				价格 <!-- <text class="tag cuIcon-unfold"></text> -->
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
						{{item.copyrightname}}
					</view>
					<view class="des text-gray text-sm ellipsis">
						{{item.classifyStr}}
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
			<view class="screen-window">
				<view class="group">
					<view class="name text-df text-black">版权类型</view>
					<view class="selection">
						<view class="opt bg-white ellipsis text-sm" v-for="(item, index) in classifyList" :class="classifyCheck == index ? 'bg-green light' : ''"
						 @click="handleQuery('classify', index, item)" :key="index">
							{{item.selectName}}
						</view>
					</view>
				</view>
				<view class="group">
					<view class="name text-df text-black">授权范围</view>
					<view class="selection">
						<view class="opt bg-white ellipsis text-sm" v-for="(item, index) in authorizeRangeList" :class="authorizeRangeCheck == index ? 'bg-green light' : ''"
						 @click="handleQuery('authorizeRange', index, item)" :key="index">
							{{item.selectName}}
						</view>
					</view>
				</view>
			</view>
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
				classifyList: [],
				authorizeRangeList: [],
				classifyCheck: -1,
				authorizeRangeCheck: -1,
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
					this.getList('refresh')
				}
			},
			sortPrice() {
				 if (!this.priceTOP) {
					 this.priceTOP = true;
					 this.timeTOP = false;
					 this.filter.priceOrder	= 'priceEsc';
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
					case 'classify':
						if (index == this.classifyCheck) {
							this.classifyCheck = -1;
							this.filter.classifySearch = '';
						} else {
							this.classifyCheck = index;
							this.filter.classifySearch = item.selectContent;
						}
						break;
					case 'authorizeRange':
						if (index == this.authorizeRangeCheck) {
							this.authorizeRangeCheck = -1;
							this.filter.authorizeRangeSearch = '';
						} else {
							this.authorizeRangeCheck = index;
							this.filter.authorizeRangeSearch = item.selectContent;
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
					url: this.$servicePath + 'copyright/mobile/copyright.xhtml',
					data: param,
					success: res => {
						const object = res.data.object;
						if (type == 'refresh') {
							this.list = [];
							uni.stopPullDownRefresh();
						}
						if (!this.classifyList.length) {
							this.classifyList = object.classifyList;
						}
						if (!this.authorizeRangeList.length) {
							this.authorizeRangeList = object.authorizeRangeList;
						}
						object.presidents.results.forEach(item => {
							object.classifyList.forEach(cla => {
								if (item.classify == cla.selectContent) {
									item.classifyStr = cla.selectName;
									return false;
								}
							})
							this.list.push(item);
						})
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
					url: 'copyrightinfo?logicid=' + id
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
		top: calc(var(--status-bar-height) + 44px);
		left: 0;
		width: 100%;
		z-index: 99;

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
		background: $bg-color-grey;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		padding: 50upx 7upx 20upx 7upx;

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
