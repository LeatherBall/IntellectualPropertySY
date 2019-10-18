<template>
	<view class="page">
		<!-- 顶部筛选栏 -->
		<view class="screen">
			<view class="item" @click="sortTime">
				最新 <text class="tag" :class="timeTOP ? 'cuIcon-unfold' : 'cuIcon-fold'"></text>
			</view>
			<view class="item" @click="sortPrice">
				价格 <text class="tag" :class="priceTOP ? 'cuIcon-unfold' : 'cuIcon-fold'"></text>
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
						{{item.patentName}}
					</view>
					<view class="des text-grey text-sm ellipsis">
						{{item.industryNavigation}}
					</view>
					<view class="price text-orange">
						<text class="iconfont text-xs">&#xe600;</text>
						<text class="text-lg">{{item.price}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 下拉加载 -->
		<uni-load-more :status="status" />
		<!-- 筛选窗 -->
		<uni-drawer :visible="showScreen" mode="right" @close="hideModal()">
			<view class="screen-window">
				<view class="group">
					<view class="name text-df text-black">专利类型</view>
					<view class="selection">
						<view class="opt bg-white ellipsis text-xs" v-for="(item, index) in filterType" :class="item.checked ? 'bg-green light' : ''"
						 @click="handleQuery('type', index, item)" :key="index">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="group">
					<view class="name text-df text-black">所属行业</view>
					<view class="selection">
						<view class="opt bg-white ellipsis text-xs" v-for="(item, index) in filterTrade" :class="item.checked ? 'bg-green light' : ''"
						 @click="handleQuery('trade', index, item)" :key="index">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="group">
					<view class="name text-df text-black">专利状态</view>
					<view class="selection">
						<view class="opt bg-white ellipsis text-xs" v-for="(item, index) in filterStatus" :class="item.checked ? 'bg-green light' : ''"
						 @click="handleQuery('status', index, item)" :key="index">
							{{item.name}}
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
				timeTOP: true,
				priceTOP: true,
				showScreen: false,
				filterType: [{
					name: '发明专利',
					checked: false
				}, {
					name: '实用新型',
					checked: false
				}, {
					name: '发明专利',
					checked: false
				}],
				filterTrade: [{
					name: '人类生活必须',
					checked: false
				}, {
					name: '作业;运输',
					checked: false
				}, {
					name: '化学;冶金',
					checked: false
				}, {
					name: '纺织;造纸',
					checked: false
				}, {
					name: '固定建筑物',
					checked: false
				}, {
					name: '机械工程;照明;加热',
					checked: false
				}, {
					name: '物理',
					checked: false
				}, {
					name: '电学',
					checked: false
				}],
				filterStatus: [{
					name: '已下证',
					checked: false
				}, {
					name: '已下证',
					checked: false
				}],
				list: [],
				pageIndex: -1,
				pageSize: 10,
				status: 'more',
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
				this.timeTOP = !this.timeTOP;
			},
			sortPrice() {
				this.priceTOP = !this.priceTOP;
			},
			showModal() {
				this.showScreen = true;
			},
			hideModal() {
				this.showScreen = false;
			},
			handleQuery(type, index, item) {
				if (type == 'type') {
					this.filterType.forEach((item, i) => {
						if (i != index) {
							item.checked = false;
						}
					})
					this.filterType[index].checked = !this.filterType[index].checked;
				} else if (type == 'trade') {
					this.filterTrade.forEach((item, i) => {
						if (i != index) {
							item.checked = false;
						}
					})
					this.filterTrade[index].checked = !this.filterTrade[index].checked;
				} else {
					this.filterStatus.forEach((item, i) => {
						if (i != index) {
							item.checked = false;
						}
					})
					this.filterStatus[index].checked = !this.filterStatus[index].checked;
				}
			},
			getList(type) {
				this.status = 'loading';
				if (type == 'refresh') {
					this.pageIndex = -1;
				}
				uni.request({
					method: 'GET',
					url: this.$servicePath + 'patent/mobile/patent.xhtml',
					data: {
						pageIndex: ++this.pageIndex,
						pageSize: this.pageSize
					},
					success: res => {
						if (type == 'refresh') {
							this.list = [];
							uni.stopPullDownRefresh();
						}
						this.list.push.apply(this.list, res.data.object.presidents.results);
						const count = res.data.object.presidents.count;
						this.status = (this.pageIndex + 1) * this.pageSize >= count ? 'noMore' : 'more';
					}
				})
			},
			showInfo(e) {
				const id = e.currentTarget.dataset.logicid;
				uni.navigateTo({
					url: 'patentinfo?logicid=' + id
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
		top: 44px;
		left: 0;
		width: 100%;
		z-index: 99;

		.item {
			height: 80upx;
			line-height: 80upx;
			font-size: $font-size-normal;
			color: $font-color-base;

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
