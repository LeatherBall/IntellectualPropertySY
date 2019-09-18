<template>
	<view class="tab-bars">
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap"
			 :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">
				<text class="uni-tab-item-title">{{tab.name}}</text>
			</view>
		</scroll-view>
		<!-- <view class="line-h"></view> -->
		<swiper :current="tabIndex" class="swiper-box" :class="{more: tabBars[tabIndex].place == 'horizontal'}" style="flex: 1;" :duration="300"
		 @change="ontabchange">
			<swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
				<scroll-view class="scroll-v list" scroll-y @scrolltolower="loadMore(index1)" v-if="tab.place == 'vertical'">
					<view v-for="(newsitem,index2) in tab.data" :key="newsitem.id" :class="tab.place" @click="viewItemInfo(tab, $event)">
						<view class="title"><text>{{newsitem.title}}</text></view>
						<view class="time"><text class="iconfont">&#xe604;</text><text class="text">{{newsitem.time}}</text></view>
						<text class="iconfont tip">&#xe75b;</text>
					</view>
					<view class="loading-more" @click="viewItemList(tab, $event)">
						<text class="loading-more-text">{{tab.loadingText}}</text>
					</view>
				</scroll-view>
				<scroll-view class="scroll-v list" scroll-y @scrolltolower="loadMore(index1)" v-if="tab.place == 'horizontal'">
					<view v-for="(newsitem,index2) in tab.data" :key="newsitem.id" :class="tab.place" @click="viewItemInfo(tab, $event)">
						<view class="time"><text class="day">{{newsitem.day}}</text><text class="year">{{newsitem.year}}</text></view>
						<view class="text">
							<view class="title"><text>{{newsitem.title}}</text></view>
							<view class="content">{{newsitem.content}}</view>
						</view>
						<text class="iconfont tip">&#xe75b;</text>
					</view>
					<view class="loading-more" @click="viewItemList(tab, $event)">
						<text class="loading-more-text">{{tab.loadingText}}</text>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'ctHomeBars',
		props: {
			// 页签
			tabBars: {
				type: Array,
				default: function(e) {
					return [];
				}
			},
			// 缓存每页最多
			max_cahe_data: {
				type: Number,
				default: function(e) {
					return 100;
				}
			},
			// 缓存页签数量
			max_cahe_page: {
				type: Number,
				default: function(e) {
					return 3;
				}
			}
		},
		data() {
			return {
				newsList: [],
				cacheTab: [],
				tabIndex: 0,
				scrollInto: "",
				showTips: false,
				navigateFlag: false,
				pulling: false,
				loadingIcon: "data:image/gif;base64,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"
			}
		},
		methods: {
			// 根据tabIndex获取当前分页的数据（数据列表做分页获取，每页3条，点击加载更多追加3条）
			getList(index) {
				let activeTab = this.newsList[index];
				let list = [];
				for (let i = 0; i < 3; i++) {
					list.push({
						id: Math.random(),
						title: '教育部9月3日公布2019年教书育人楷模名单。10位入选教师涵盖高教、职教、基教、幼教、特教等各级各类教育',
						content: '习近平在贺电中说，值此朝鲜民主主义人民共和国成立71周年之际，我谨代表中国共产党、中国政府、中国人民，向委员长同志并通过你，向朝鲜劳动党、朝鲜政府、朝鲜人民致以热烈的祝贺和诚挚的祝愿。',
						time: '2019-09-03',
						year: '2019',
						day: '09-03'
					});
				}
				activeTab.data = activeTab.data.concat(list);
			},
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},
			ontabchange(e) {
				let index = e.target.current || e.detail.current;
				this.switchTab(index);
			},
			switchTab(index) {
				if (this.newsList[index].data.length === 0) {
					this.getList(index);
				}

				if (this.tabIndex === index) {
					return;
				}

				// 缓存 tabId
				if (this.newsList[this.tabIndex].data.length > this.max_cahe_data) {
					let isExist = this.cacheTab.indexOf(this.tabIndex);
					if (isExist < 0) {
						this.cacheTab.push(this.tabIndex);
					}
				}

				this.tabIndex = index;
				this.scrollInto = this.tabBars[index].id;

				// 释放 tabId
				if (this.cacheTab.length > this.max_cahe_page) {
					let cacheIndex = this.cacheTab[0];
					this.clearTabData(cacheIndex);
					this.cacheTab.splice(0, 1);
				}
			},
			clearTabData(e) {
				this.newsList[e].data.length = 0;
				this.newsList[e].loadingText = "更多";
			},
			loadMore(e) {
				setTimeout(() => {
					this.getList(this.tabIndex);
				}, 500)
			},
			viewItemInfo(data, e) {
				uni.navigateTo({
					url: data.infoPage
				});
			},
			viewItemList(data, e) {
				uni.navigateTo({
					url: data.listPage
				});
			}
		},
		created() {
			this.tabBars.forEach(tabBar => {
				this.newsList.push({
					data: [],
					infoPage: tabBar.infoPage,
					listPage: tabBar.listPage,
					place: tabBar.place,
					loadingText: '更多'
				});
			});
			this.getList(0);
		}
	}
</script>

<style lang="scss">
	.tabs {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #ffffff;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}

	.scroll-h {
		width: 730upx;
		height: 80upx;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		// /* flex-wrap: nowrap; */
		border-bottom: $border-style-basic;
	}

	.line-h {
		height: 1upx;
		background-color: #cccccc;
	}

	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		padding-left: 34upx;
		padding-right: 34upx;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 30upx;
		height: 80upx;
		line-height: 80upx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	.uni-tab-item-title-active .uni-tab-item-title {
		font-weight: bold;
		color: #333;
	}

	.swiper-box {
		flex: 1;
		height: 468upx;
	}

	.swiper-box.more {
		height: 520upx;
	}

	.swiper-item {
		flex: 1;
	}

	.scroll-v {
		flex: 1;
		/* #ifndef MP-ALIPAY */
		flex-direction: column;
		/* #endif */
		width: 730upx;
	}

	.loading-more {
		align-items: center;
		justify-content: center;
		padding-top: $space-size-normal;
		padding-bottom: $space-size-normal;
		text-align: center;
	}

	.loading-more:active {
		background: $bg-color-active;
	}

	.loading-more-text {
		font-size: $font-size-normal;
		color: $font-color-grey;
	}

	.vertical,
	.horizontal {
		position: relative;
		padding: $space-size-large 0;
		margin: 0 $space-size-large;
		box-sizing: border-box;
		width: 720upx;
		border-bottom: 0.5px dashed #D9D9D9;
	}

	.vertical:active,
	.horizontal:active {
		background: $bg-color-active;
	}

	.vertical .title {
		width: 660upx;
		font-size: $font-size-normal;
		color: $font-color-base;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.vertical .time .iconfont {
		display: inline-block;
		font-size: $font-size-large;
		color: $font-color-orange;
		margin-right: $space-size-normal;
	}

	.vertical .time .text {
		font-size: $font-size-small;
		color: $font-color-grey;
	}

	.vertical .tip,
	.horizontal .tip {
		position: absolute;
		right: $space-size-large;
		top: 50%;
		transform: translateY(-50%);
		font-size: $font-size-normal;
		color: $font-color-grey;
	}

	.horizontal {
		display: flex;
		align-items: center;
	}

	.horizontal .title {
		width: 520upx;
		font-size: $font-size-normal;
		color: $font-color-base;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.horizontal .text {
		overflow: hidden;
		width: 590upx;
	}

	.horizontal .time {
		width: 120upx;
		margin-right: $space-size-large;
		height: 100upx;
		background: $bg-color-blue;
		color: $font-color-inverse;
		border-radius: $radius-size-small;
	}

	.horizontal:nth-child(2) .time {
		background: $bg-color-green;
	}

	.horizontal:nth-child(3) .time {
		background: $bg-color-pink;
	}

	.horizontal .time .day,
	.horizontal .time .year {
		display: block;
		text-align: center;
		height: 50upx;
	}

	.horizontal .time .day {
		font-size: $font-size-normal;
		line-height: 50upx;
		font-weight: bold;
	}

	.horizontal .time .year {
		font-size: $font-size-small;
		line-height: 40upx;
	}

	.horizontal .text .content {
		width: 520upx;
		margin-top: $space-size-small;
		font-size: $font-size-small;
		color: $font-color-grey;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 1.5;
	}
</style>
