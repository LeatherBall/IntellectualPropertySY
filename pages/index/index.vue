<template>
	<view class="page">
		<view class="home-banner">
			<image src="../../static/bn2.jpg" mode="aspectFill" class="banner-image"></image>
			<!-- <uni-swiper-dot :info="hannerList" :current="homeBarCurrent" :dotsStyles="homeBardotsStyles" mode="long" field="content">
				<swiper :autoplay="true" :circular="true" class="swiper-box" @change="homeBarChange">
					<swiper-item class="wrapper" v-for="(banner, index) in hannerList" :key="index">
						<image :src="banner.img" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</uni-swiper-dot> -->
		</view>

		<view class="main-wrapper">
			<view class="home-grid">
				<ct-module-menu :menus="gridList"></ct-module-menu>
			</view>

			<view class="uni-swiper-msg">
				<view class="uni-swiper-msg-text">
					<text>通知公告</text>
				</view>
				<swiper vertical="true" autoplay="true" circular="true" interval="3000" class="scroll-msg">
					<swiper-item v-for="item in msgList" :key="item.logicId" @click="openUrl(item.ext6,item.logicId)">
						<view class="home-msg text-df">
							{{item.title}}
						</view>
					</swiper-item>
				</swiper>
				<view class="more text-df" @click="noticeMore">更多</view>
			</view>

			<!-- 新闻动态 -->
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="tb1Current" :values="bars1" style-type="text" active-color="#12866a" @clickItem="clickTB1Item"
				 text-align="left" />
			</view>
			<view class="content home-bars" v-if="newsLoad">
				<view v-for="(tab, index) in bars1" v-show="tb1Current === index" :key="index">
					<view class="box vertical" v-for="newsitem in tabBars1Data" :key="newsitem.logicId" @click="openUrl(newsitem.ext6,newsitem.logicId)">
						<view class="title"><text>{{newsitem.title}}</text></view>
						<view class="time"><text class="iconfont clock">&#xe604;</text><text class="text">{{newsitem.createTimeStr}}</text></view>
						<uni-icons type="arrowright" class="tip" color="#999999" size="20"></uni-icons>
					</view>
					<view class="loading-more" v-show="newsCount > 3" @click="newsMore">
						<text class="loading-more-text">更多</text>
					</view>
				</view>
			</view>
			<!-- 新闻动态站位骨架 -->
			<view class="content home-bars stance-news" v-if="!newsLoad">
				<view v-for="(tab, index) in bars1" v-show="tb1Current === index" :key="index">
					<view class="stance vertical" v-for="index in 3" :key="index">
						<view class="title"></view>
						<view class="time"></view>
					</view>
				</view>
			</view>

			<view class="line-h"></view>

			<!-- 专利、商标、版权转让 -->
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="tb2Current" :values="bars2" style-type="text" active-color="#12866a" @clickItem="clickTB2Item"
				 text-align="left" />
			</view>
			<view class="content home-bars" v-if="patentLoad && trademarkLoad && copyrightLoad">
				<view v-for="(tab, index) in bars2En" v-show="tb2Current === index" :key="index">
					<view class="box horizontal" v-for="newsitem in tabBars2Data[tab]" :key="newsitem.logicId" @click="showTransItem(tab, newsitem.logicId)">
						<view class="time">
							<text class="day">{{newsitem.day}}</text>
							<text class="year">{{newsitem.year}}</text>
						</view>
						<view class="text">
							<view class="title"><text>{{newsitem.title}}</text></view>
							<view class="detail">
								<u-parse :content="newsitem.content"></u-parse>
							</view>
						</view>
						<uni-icons type="arrowright" class="tip" color="#999999" size="20"></uni-icons>
					</view>
					<view class="loading-more" v-show="listCount[tab + 'Count'] > 3" @click="showTransList(tab)">
						<text class="loading-more-text">更多</text>
					</view>
				</view>
			</view>
			<!-- 专利、商标、版权转让 站位骨架-->
			<view class="content home-bars stance-news" v-if="!patentLoad || !trademarkLoad || !copyrightLoad">
				<view v-for="index in 3" class="stance horizontal" :key="index">
					<view class="time"></view>
					<view class="text">
						<view class="title"></view>
						<view class="detail"></view>
					</view>
				</view>
			</view>

			<view class="line-h"></view>

			<view class="plate">
				<view class="item" v-for="(plate, index) in plateList" :key="index" @click="openUrl(plate.page,'')">
					<image :src="plate.img" class="image"></image>
					<view class="name">
						<text>{{plate.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view>
			<yomol-upgrade :type="upgradeType" :url="upgradeUrl" :content="upgradeContent" ref="yomolUpgrade"></yomol-upgrade>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import ctModuleMenu from '@/components/ct-module-menu/ct-module-menu.vue'
	import ctHomeBars from '@/components/ct-home-bars/ct-home-bars.vue'
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	import yomolUpgrade from '@/components/app-version-detection/yomol-upgrade/yomol-upgrade.vue'
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import {
		UserBase
	} from '../../common/userbase.js';
	import {
		checkAppVersion,
		getArticleList
	} from '../../common/util.js';

	export default {
		components: {
			uniGrid,
			uniGridItem,
			ctModuleMenu,
			ctHomeBars,
			uniSwiperDot,
			uniSegmentedControl,
			yomolUpgrade,
			uParse
		},
		data() {
			return {
				// 用户是否已登录
				isLogin: false,
				homeBarCurrent: 0,
				homeBardotsStyles: {
					backgroundColor: 'rgba(255, 255, 255, 0.5)',
					border: 'none',
					color: '#fff',
					selectedBackgroundColor: '#fff',
					selectedBorder: 'none',
					bottom: 20
				},
				hannerList: [{
						img: '../../static/bn1.jpg'
					},
					{
						img: '../../static/bn2.jpg'
					}
				],
				gridList: [{
						img: '../../static/icon/xinwendongtai.png',
						name: '新闻动态',
						page: '../common/article/list?pageTitle=新闻动态&columnId=155540151100326'
					},
					// {
					// 	img: '../../static/icon/shenbaozhinan.png',
					// 	name: '申报指南',
					// 	page: ''
					// },
					{
						img: '../../static/icon/zhuanlichaxun.png',
						name: '专利查询',
						page: 'http://cpquery.cnipa.gov.cn/'
					},
					{
						img: '../../static/icon/shangbiaochaxun.png',
						name: '商标查询',
						page: 'http://wsjs.saic.gov.cn/?SVVVdE0o=KGmhcakkaZHkaZHka0ExbesZFAi6etCP27OgNPzHVc9qqWW'
					},
					{
						img: '../../static/icon/banquanchaxun.png',
						name: '版权查询',
						page: 'http://www.ccopyright.com.cn/'
					},
					{
						img: '../../static/icon/zhengcefagui.png',
						name: '政策法规',
						page: '../common/article/list?pageTitle=政策法规&columnId=155539987892882'
					},
					// {
					// 	img: '../../static/icon/peixunfuwu.png',
					// 	name: '培训服务',
					// 	page: ''
					// },
					{
						img: '../../static/icon/zhuanlishenbao.png',
						name: '专利申报',
						page: 'http://cponline.sipo.gov.cn/'
					},
					{
						img: '../../static/icon/shangbiaoshenbao.png',
						name: '商标申报',
						page: 'http://wssq.saic.gov.cn:9080/tmsve/'
					},
					{
						img: '../../static/icon/banquanshenbao.png',
						name: '版权登记',
						page: 'http://apply.ccopyright.com.cn/cpcc/column_list_bqdj.jsp'
					}
				],
				msgList: [],
				tb1Current: 0,
				bars1: ['新闻动态'],
				tabBars1Data: [],
				tb2Current: 0,
				bars2: ['专利转让', '商标转让', '版权转让'],
				bars2En: ['patent', 'trademark', 'copyright'],
				bars2Flag: false,
				tabBars2Data: {},
				// 首页专利转让、商标转让、版权转让列表中的文章数量（数量超过3时显示更多）
				listCount: {
					patentCount: 0,
					trademarkCount: 0,
					copyrightCount: 0
				},
				newsLoad: false,
				patentLoad: false,
				trademarkLoad: false,
				copyrightLoad: false,
				plateList: [{
						img: '../../static/zhuanlisq.jpg',
						name: '在线专利申请',
						page: 'http://cponline.sipo.gov.cn/'
					},
					{
						img: '../../static/shangbiaosq.jpg',
						name: '在线商标申请',
						page: 'http://wssq.saic.gov.cn:9080/tmsve/'
					},
					{
						img: '../../static/banquansq.jpg',
						name: '在线版权申请',
						page: 'http://apply.ccopyright.com.cn/cpcc/column_list_bqdj.jsp'
					},
					{
						img: '../../static/dilibiaozhisq.jpg',
						name: '在线地理杂志申请',
						page: 'http://www.cgi.gov.cn/Home/Default/'
					}
				],
				// APP检测更新相关
				upgradeType: '',
				upgradeContent: '',
				upgradeUrl: ''
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			checkAppVersion(false, (res) => {
				this.upgradeType = res.upgradeType;
				this.upgradeContent = res.upgradeContent;
				this.upgradeUrl = res.upgradeUrl;
				this.$refs.yomolUpgrade.show();
			}, (error) => {
				console.error(error);
			});
			// #endif

			this.getNotice();
			this.getNews();
			this.getTransferList();
		},
		onShow() {
			this.checkUserInfo();
		},
		onNavigationBarButtonTap() {
			const page = this.isLogin ? '../mine/userinfo' : '../login/login';
			uni.navigateTo({
				url: page
			})
		},
		onPullDownRefresh() {
			this.getNotice();
			this.getNews();
			this.getTransferList('refresh');
		},
		methods: {
			homeBarChange(e) {
				this.homeBarCurrent = e.detail.current;
			},
			clickTB1Item(index) {
				if (this.tb1Current !== index) {
					this.tb1Current = index;
				}
			},
			clickTB2Item(index) {
				if (this.tb2Current !== index) {
					this.tb2Current = index
				}
			},
			checkUserInfo() {
				UserBase.getUser(this.$servicePath, user => {
					// #ifdef APP-PLUS
					const style = !!user ? {
						text: '账户'
					} : {
						text: '登录'
					}
					const webView = this.$mp.page.$getAppWebview();
					webView.setTitleNViewButtonStyle(0, style);
					// #endif

					// #ifdef H5
					const dom = document.querySelectorAll(".uni-btn-icon")[1];
					dom.innerHTML = !!user ? '<i class="uni-icon uni-icon-contact"></i>' : '登录';
					// #endif
					this.isLogin = !!user;
				});
			},
			// 获取通知公告
			getNotice() {
				getArticleList({
					ip: this.$servicePath,
					columnId: '155540151100315',
					pageSize: 5
				}, (res) => {
					if (res.resultFlag) {
						this.msgList = res.object.presidents.results;
					}
				})
			},
			// 获取新闻动态
			getNews() {
				getArticleList({
					ip: this.$servicePath,
					columnId: '155540151100326',
					pageSize: 3
				}, res => {
					if (res.resultFlag) {
						const list = res.object.presidents.results;
						list.forEach(item => {
							item.createTimeStr = item.createTimeStr ? item.createTimeStr.replace(/\//g, '-') : '- -';
						})
						this.tabBars1Data = list;
						this.newsCount = res.object.presidents.count;
						this.newsLoad = true;
					}
				})
			},
			// 获取装让信息列表
			getTransferList(type) {
				// 专利转让列表 patent
				uni.request({
					method: 'GET',
					url: this.$servicePath + 'patent/mobile/patent.xhtml',
					data: {
						pageIndex: 0,
						pageSize: 3
					},
					success: (res) => {
						const list = res.data.object.presidents.results;
						list.forEach(itemData => {
							itemData.title = itemData.patentName;
							const date = itemData.createTimeStr;
							if (date) {
								itemData.year = date.substring(0, 4);
								itemData.day = date.substring(5, 10);
							}
						})
						this.tabBars2Data.patent = list;
						this.listCount.patentCount = res.data.object.presidents.count;
						this.patentLoad = true;
					}
				})
				// 版权转让列表 copyright
				uni.request({
					method: 'GET',
					url: this.$servicePath + 'copyright/mobile/copyright.xhtml',
					data: {
						pageIndex: 0,
						pageSize: 3
					},
					success: (res) => {
						const list = res.data.object.presidents.results;
						list.forEach(itemData => {
							itemData.title = itemData.copyrightname;
							const date = itemData.createTimeStr;
							if (date) {
								itemData.year = date.substring(0, 4);
								itemData.day = date.substring(5, 10);
							}
						})
						this.tabBars2Data.copyright = list;
						this.listCount.copyrightCount = res.data.object.presidents.count;
						this.copyrightLoad = true;
					}
				})
				// 商标转让列表 trademark
				uni.request({
					method: 'GET',
					url: this.$servicePath + 'trademark/mobile/trademark.xhtml',
					data: {
						pageIndex: 0,
						pageSize: 3
					},
					success: (res) => {
						const list = res.data.object.presidents.results;
						list.forEach(itemData => {
							itemData.title = itemData.trademarkName;
							const date = itemData.createTimeStr;
							if (date) {
								itemData.year = date.substring(0, 4);
								itemData.day = date.substring(5, 10);
							}
						})
						this.tabBars2Data.trademark = list;
						this.listCount.trademarkCount = res.data.object.presidents.count;
						this.trademarkLoad = true;

						if (type == 'refresh') {
							uni.stopPullDownRefresh();
						}
					},
					fail: () => {
						if (type == 'refresh') {
							uni.stopPullDownRefresh();
							uni.showToast({
								title: '内容获取失败',
								position: 'bottom',
								icon: 'none'
							})
						}
					}
				})
			},
			openUrl(url, logicId) {
				if (url) {
					// #ifdef APP-PLUS
					plus.runtime.openWeb(url);
					// 外部应用打开
					// plus.runtime.openURL(url)
					// #endif

					// #ifdef H5
					window.open(url);
					// #endif
				} else {
					uni.navigateTo({
						url: '../common/article/detail?logicId=' + logicId
					})
				}
			},
			newsMore() {
				uni.navigateTo({
					url: '../common/article/list?pageTitle=新闻动态&columnId=155540151100326'
				})
			},
			noticeMore() {
				uni.navigateTo({
					url: '../common/article/list?pageTitle=通知公告&columnId=155540151100315'
				})
			},
			showTransItem(tab, id) {
				let page;
				if (tab == 'patent') {
					page = '../home/patentinfo?logicid=' + id;
				} else if (tab == 'trademark') {
					page = '../home/tradeinfo?logicid=' + id;
				} else {
					page = '../home/copyrightinfo?logicid=' + id;
				}
				uni.navigateTo({
					url: page
				})
			},
			showTransList(tab) {
				let page;
				if (tab == 'patent') {
					page = '../home/patent';
				} else if (tab == 'trademark') {
					page = '../home/trade';
				} else {
					page = '../home/copyright';
				}
				uni.navigateTo({
					url: page
				})
			}
		}
	}
</script>
<style lang="scss">
	.page {
		background: $theme-color-b;
		padding-bottom: $space-size-normal;
		box-sizing: border-box;
	}

	.better-scroll-wrapper {
		height: calc(100% - 96px);
		overflow: hidden;
	}

	.home-search {
		position: relative;
		background: $theme-color-a;
		color: $font-color-inverse;
		font-size: $font-size-normal;
		padding: $space-size-normal $space-size-large;
		box-sizing: border-box;
	}

	.home-search .search {
		position: absolute;
		right: 15upx;
		top: 50%;
		color: $font-color-inverse;
		font-size: 46upx;
		transform: translateY(-50%);
	}

	.home-banner {
		width: 100%;
		position: relative;
		z-index: 1;
	}

	.banner-image {
		width: 100%;
		height: 300rpx;
	}

	.home-banner .wrapper,
	.home-banner .wrapper image {
		width: 100%;
		height: 100%;
	}

	.home-banner .swiper-box {
		height: 150px;
	}

	.main-wrapper {
		margin-left: $space-size-normal;
		margin-right: $space-size-normal;
		margin-top: -10px;
		margin-bottom: 0;
		background: $bg-color-white;
		border-radius: $radius-size-small;
		position: relative;
		z-index: 3;
	}

	.home-grid image {
		width: 80upx;
		height: 80upx;
	}

	.home-grid .text {
		font-size: $font-size-small;
	}

	.uni-swiper-msg {
		background: $bg-color-grey;
		margin: $space-size-small 0;
		padding: $space-size-large;
		box-sizing: border-box;

		.scroll-msg {
			margin: 0 20rpx;

			.home-msg {
				white-space: nowrap;
			}
		}

		.uni-swiper-msg-icon {
			margin: 0 $space-size-small;
		}

		.uni-swiper-msg-text {
			font-weight: bold;
			text-align: center;
			font-size: $font-size-normal;
			white-space: nowrap;
			margin-right: 16upx;
		}

		.more {
			white-space: nowrap;
			color: $font-color-base;
			padding-left: $space-size-huge;
			position: relative;
			margin-left: 6upx;

			&::before {
				position: absolute;
				content: '';
				width: 1px;
				height: 20upx;
				top: 50%;
				transform: translateY(-50%);
				left: 0;
				background: $font-color-grey;
			}
		}

		.home-msg {
			width: 100%;
			color: $font-color-grey;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.line-h {
		background: $bg-color-grey;
		height: 10upx;
	}

	.plate {
		overflow: hidden;
		padding: $space-size-large;
		box-sizing: border-box;
		padding-bottom: 0;
	}

	.plate .item {
		position: relative;
		float: left;
		width: calc(50% - 7.5upx);
		height: 200upx;
		margin-bottom: $space-size-large;
	}

	.plate .item .image {
		width: 100%;
		height: 100%;
	}

	.plate .item .name {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		text-align: center;
		background: $bg-color-mask;
		color: $font-color-inverse;
		font-size: $font-size-normal;
		line-height: 2;
	}

	.plate .item:nth-child(odd) {
		margin-right: 7.5upx;
	}

	.plate .item:nth-child(even) {
		margin-left: 7.5upx;
	}

	.uni-common-mt {
		margin-top: $space-size-normal;
		border-bottom: $border-style-basic;
		width: 100%;
		box-sizing: border-box;
	}

	.home-bars .box {
		position: relative;
		padding: $space-size-large 0;
		margin: 0 $space-size-large 0 $space-size-huge;
		box-sizing: border-box;
		width: calc(100% - 30upx);
		// border-bottom: 0.5px dashed #D9D9D9;
	}

	.home-bars .box+.box {
		border-top: $border-style-basic;
	}

	.home-bars .box.horizontal {
		display: flex;
		align-items: center;
	}

	.home-bars .box:active {
		background: $bg-color-active;
	}

	.home-bars .box .tip {
		position: absolute;
		right: $space-size-large;
		top: 50%;
		transform: translateY(-50%);
		font-size: $font-size-normal;
		color: $font-color-grey;
	}

	.home-bars .box.horizontal .title {
		width: 86%;
		font-size: $font-size-normal;
		color: $font-color-base;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.home-bars .box.horizontal .text {
		overflow: hidden;
		width: 86%;
	}

	.home-bars .box.horizontal .time {
		width: 120upx;
		margin-right: $space-size-large;
		height: 100upx;
		background: $bg-color-blue;
		color: $font-color-inverse;
		border-radius: $radius-size-small;
	}

	.home-bars .box.horizontal:nth-child(2) .time {
		background: $bg-color-green;
	}

	.home-bars .box.horizontal:nth-child(3) .time {
		background: $bg-color-pink;
	}

	.home-bars .box.horizontal .time .day,
	.home-bars .box.horizontal .time .year {
		display: block;
		text-align: center;
		height: 50upx;
	}

	.home-bars .box.horizontal .time .day {
		font-size: $font-size-large;
		line-height: 50upx;
		font-weight: bold;
	}

	.home-bars .box.horizontal .time .year {
		font-size: $font-size-small;
		line-height: 40upx;
	}

	.home-bars .box.horizontal .text .detail {
		width: 86%;
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

		.wxParse {
			color: $font-color-grey;
			overflow: hidden;
		}
	}

	.home-bars .loading-more {
		align-items: center;
		justify-content: center;
		padding-top: $space-size-normal;
		padding-bottom: $space-size-normal;
		text-align: center;
		border-top: $border-style-basic;
	}

	.home-bars .loading-more:active {
		background: $bg-color-active;
	}

	.home-bars .loading-more-text {
		font-size: $font-size-normal;
		color: $font-color-grey;
	}

	.home-bars .vertical .title {
		width: 86%;
		font-size: $font-size-normal;
		color: $font-color-base;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.home-bars .vertical .time .clock {
		display: inline-block;
		font-size: $font-size-large;
		color: $font-color-orange;
		margin-right: $space-size-normal;
	}

	.home-bars .vertical .time .text {
		font-size: $font-size-small;
		color: $font-color-grey;
	}

	.stance-news {
		.stance {
			padding: $space-size-huge;
			// border-bottom: 0.5px dashed #D9D9D9;

			&.vertical {
				.title {
					height: 32upx;
					border-radius: 32upx;
					width: 80%;
					background: $bg-color-grey;
				}

				.time {
					margin-top: $space-size-huge;
					height: 26upx;
					border-radius: 26upx;
					background: $bg-color-grey;
					width: 60%;
				}
			}

			&.horizontal {
				display: flex;
				align-items: center;

				.time {
					width: 100upx;
					margin-right: $space-size-large;
					height: 100upx;
					background: $bg-color-grey;
					border-radius: $radius-size-complete;
				}

				.text {
					width: 86%;

					.title {
						height: 32upx;
						border-radius: 32upx;
						background: $bg-color-grey;
					}

					.detail {
						margin-top: $space-size-huge;
						height: 26upx;
						border-radius: 26upx;
						background: $bg-color-grey;
						width: 80%;
					}
				}
			}
		}
	}
</style>
