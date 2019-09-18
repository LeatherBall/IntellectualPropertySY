<template>
	<view class="page">
		<view class="home-banner">
			<uni-swiper-dot :info="hannerList" :current="homeBarCurrent" :dotsStyles="homeBardotsStyles" mode="long" field="content">
				<swiper :autoplay="true" class="swiper-box" @change="homeBarChange">
					<swiper-item class="wrapper" v-for="(banner, index) in hannerList" :key="index">
						<image :src="banner.img" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="main-wrapper">
			<view class="home-grid">
				<ct-module-menu :menus="gridList"></ct-module-menu>
			</view>
			<view class="uni-swiper-msg">
				<view class="uni-swiper-msg-text">
					<text>通知公告</text>
				</view>
				<swiper vertical="true" autoplay="true" circular="true" interval="3000">
					<swiper-item v-for="(item, index) in msgList" :key="index">
						<navigator class="home-msg">
							{{item.text}}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="tb1Current" :values="bars1" style-type="text" active-color="#12866a" @clickItem="clickTB1Item" />
			</view>
			<view class="content home-bars">
				<view v-for="(tab, index) in bars1" v-show="tb1Current === index" :key="index">
					<view class="box vertical" v-for="(newsitem, indexitem) in tabBars1Data" :key="newsitem.id">
						<view class="time">
							<text class="day">{{newsitem.day}}</text>
							<text class="year">{{newsitem.year}}</text>
						</view>
						<view class="text">
							<view class="title"><text>{{newsitem.title}}</text></view>
							<view class="detail">{{newsitem.content}}</view>
						</view>
						<text class="iconfont tip">&#xe75b;</text>
					</view>
					<view class="loading-more">
						<text class="loading-more-text">更多</text>
					</view>
				</view>
			</view>
			<view class="line-h"></view>
			<!-- <ct-home-bars :tabBars="tabBars1"></ct-home-bars> -->
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="tb2Current" :values="bars2" style-type="text" active-color="#12866a" @clickItem="clickTB2Item" />
			</view>
			<view class="content home-bars">
				<view v-for="(tab, index) in bars2" v-show="tb2Current === index" :key="index">
					<view class="box horizontal" v-for="(newsitem, indexitem) in tabBars2Data" :key="newsitem.id">
						<view class="time">
							<text class="day">{{newsitem.day}}</text>
							<text class="year">{{newsitem.year}}</text>
						</view>
						<view class="text">
							<view class="title"><text>{{newsitem.title}}</text></view>
							<view class="detail">{{newsitem.content}}</view>
						</view>
						<text class="iconfont tip">&#xe75b;</text>
					</view>
					<view class="loading-more">
						<text class="loading-more-text">更多</text>
					</view>
				</view>
			</view>
			<!-- <ct-home-bars :tabBars="tabBars2"></ct-home-bars> -->
			<view class="line-h"></view>
			<view class="plate">
				<view class="item" v-for="(plate, index) in plateList" :key="index">
					<image :src="plate.img" class="image"></image>
					<view class="name">
						<text>{{plate.name}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import ctModuleMenu from '@/components/ct-module-menu/ct-module-menu.vue'
	import ctHomeBars from '@/components/ct-home-bars/ct-home-bars.vue'
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'

	export default {
		components: {
			uniGrid,
			uniGridItem,
			ctModuleMenu,
			ctHomeBars,
			uniSwiperDot,
			uniSegmentedControl
		},
		data() {
			return {
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
						page: '../common/article/list?pageTitle=新闻动态'
					},
					{
						img: '../../static/icon/shenbaozhinan.png',
						name: '申报指南',
						page: '../common/article/list?pageTitle=申报指南'
					},
					{
						img: '../../static/icon/zhuanlichaxun.png',
						name: '专利查询',
						page: ''
					},
					{
						img: '../../static/icon/shangbiaochaxun.png',
						name: '商标查询',
						page: ''
					},
					{
						img: '../../static/icon/banquanchaxun.png',
						name: '版权查询',
						page: ''
					},
					{
						img: '../../static/icon/zhengcefagui.png',
						name: '政策法规',
						page: '../common/article/list?pageTitle=政策法规'
					},
					{
						img: '../../static/icon/peixunfuwu.png',
						name: '培训服务',
						page: ''
					},
					{
						img: '../../static/icon/zhuanlishenbao.png',
						name: '专利申报',
						page: ''
					},
					{
						img: '../../static/icon/shangbiaoshenbao.png',
						name: '商标申报',
						page: ''
					},
					{
						img: '../../static/icon/banquanshenbao.png',
						name: '版权申报',
						page: ''
					},
					{
						img: '../../static/icon/banquanshenbao.png',
						name: '英雄联盟',
						page: ''
					}
				],
				msgList: [{
						text: '交通运输部科学研究院联合百度地图最新发布了《2019年国庆节假期出行预测报告》'
					},
					{
						text: '国务院新闻办公室9月3日举行新闻发布会，发表《中国的核安全》白皮书，这是中国发表的首部核安全白皮书'
					},
					{
						text: '8月20日,中央纪委国家监委网站公布了新疆维吾尔自治区纪委监委通报的5起为被错告诬告党员干部澄清正名典型案例'
					},
					{
						text: '教育部9月3日公布2019年教书育人楷模名单。10位入选教师涵盖高教、职教、基教、幼教、特教等各级各类教育'
					}
				],
				tabBars1: [{
					id: 'xinwendongtai',
					name: '新闻动态',
					infoPage: '',
					listPage: '../common/article/list?pageTitle=新闻动态',
					place: 'vertical'
				}],
				tb1Current: 0,
				bars1: ['新闻动态'],
				tabBars1Data:[{
					id: Math.random(),
					title: '教育部9月3日公布2019年教书育人楷模名单。10位入选教师涵盖高教、职教、基教、幼教、特教等各级各类教育',
					content: '习近平在贺电中说，值此朝鲜民主主义人民共和国成立71周年之际，我谨代表中国共产党、中国政府、中国人民，向委员长同志并通过你，向朝鲜劳动党、朝鲜政府、朝鲜人民致以热烈的祝贺和诚挚的祝愿。',
					time: '2019-09-03',
					year: '2019',
					day: '09-03'
				}, {
					id: Math.random(),
					title: '教育部9月3日公布2019年教书育人楷模名单。10位入选教师涵盖高教、职教、基教、幼教、特教等各级各类教育',
					content: '习近平在贺电中说，值此朝鲜民主主义人民共和国成立71周年之际，我谨代表中国共产党、中国政府、中国人民，向委员长同志并通过你，向朝鲜劳动党、朝鲜政府、朝鲜人民致以热烈的祝贺和诚挚的祝愿。',
					time: '2019-09-03',
					year: '2019',
					day: '09-03'
				}, {
					id: Math.random(),
					title: '教育部9月3日公布2019年教书育人楷模名单。10位入选教师涵盖高教、职教、基教、幼教、特教等各级各类教育',
					content: '习近平在贺电中说，值此朝鲜民主主义人民共和国成立71周年之际，我谨代表中国共产党、中国政府、中国人民，向委员长同志并通过你，向朝鲜劳动党、朝鲜政府、朝鲜人民致以热烈的祝贺和诚挚的祝愿。',
					time: '2019-09-03',
					year: '2019',
					day: '09-03'
				}],
				tb2Current: 0,
				bars2: ['专利转让', '商标转让', '版权转让'],
				tabBars2Data: [{
					id: Math.random(),
					title: '教育部9月3日公布2019年教书育人楷模名单。10位入选教师涵盖高教、职教、基教、幼教、特教等各级各类教育',
					content: '习近平在贺电中说，值此朝鲜民主主义人民共和国成立71周年之际，我谨代表中国共产党、中国政府、中国人民，向委员长同志并通过你，向朝鲜劳动党、朝鲜政府、朝鲜人民致以热烈的祝贺和诚挚的祝愿。',
					time: '2019-09-03',
					year: '2019',
					day: '09-03'
				}, {
					id: Math.random(),
					title: '教育部9月3日公布2019年教书育人楷模名单。10位入选教师涵盖高教、职教、基教、幼教、特教等各级各类教育',
					content: '习近平在贺电中说，值此朝鲜民主主义人民共和国成立71周年之际，我谨代表中国共产党、中国政府、中国人民，向委员长同志并通过你，向朝鲜劳动党、朝鲜政府、朝鲜人民致以热烈的祝贺和诚挚的祝愿。',
					time: '2019-09-03',
					year: '2019',
					day: '09-03'
				}, {
					id: Math.random(),
					title: '教育部9月3日公布2019年教书育人楷模名单。10位入选教师涵盖高教、职教、基教、幼教、特教等各级各类教育',
					content: '习近平在贺电中说，值此朝鲜民主主义人民共和国成立71周年之际，我谨代表中国共产党、中国政府、中国人民，向委员长同志并通过你，向朝鲜劳动党、朝鲜政府、朝鲜人民致以热烈的祝贺和诚挚的祝愿。',
					time: '2019-09-03',
					year: '2019',
					day: '09-03'
				}],
				plateList: [{
						img: '../../static/zhuanlisq.jpg',
						name: '在线专利申请',
						page: ''
					},
					{
						img: '../../static/shangbiaosq.jpg',
						name: '在线商标申请',
						page: ''
					},
					{
						img: '../../static/banquansq.jpg',
						name: '在线版权申请',
						page: ''
					},
					{
						img: '../../static/dilibiaozhisq.jpg',
						name: '在线地理杂志申请',
						page: ''
					}
				]
			}
		},
		onLoad() {},
		methods: {
			gridInfo(e) {

			},
			homeBarChange(e) {
				this.homeBarCurrent = e.detail.current;
			},
			clickTB2Item(index) {
				if (this.tb2Current !== index) {
					this.tb2Current = index
				}
			}
		},
		computed: {

		}
	}
</script>
<style lang="scss">
	.page {
		background: $theme-color-b;
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

	.home-banner .wrapper,
	.home-banner .wrapper image {
		width: 100%;
		height: 100%;
	}

	.home-banner .swiper-box {
		height: 150px;
	}

	.main-wrapper {
		margin: $space-size-normal;
		margin-top: -10px;
		background: $bg-color-white;
		border-radius: $radius-size-normal $radius-size-normal 0 0;
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
		padding: $space-size-large $space-size-normal;
		box-sizing: border-box;
	}

	.uni-swiper-msg-icon {
		margin: 0 $space-size-small;
	}

	.uni-swiper-msg-text {
		width: 200upx;
		margin-right: $space-size-normal;
		font-weight: bold;
		text-align: center;
		font-size: $font-size-normal;
	}

	.home-msg {
		width: 100%;
		color: $font-color-grey;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.line-h {
		background: $bg-color-grey;
		height: 10upx;
	}

	.plate {
		overflow: hidden;
		padding: $space-size-large;
		box-sizing: border-box;
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
		border-bottom: 0.5px solid #D9D9D9;
	}

	.home-bars .box {
		position: relative;
		padding: $space-size-large 0;
		margin: 0 $space-size-large;
		box-sizing: border-box;
		width: 720upx;
		border-bottom: 0.5px dashed #D9D9D9;
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
		width: 520upx;
		font-size: $font-size-normal;
		color: $font-color-base;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.home-bars .box.horizontal .text {
		overflow: hidden;
		width: 590upx;
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
		font-size: $font-size-normal;
		line-height: 50upx;
		font-weight: bold;
	}

	.home-bars .box.horizontal .time .year {
		font-size: $font-size-small;
		line-height: 40upx;
	}

	.home-bars .box.horizontal .text .detail {
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

	.home-bars .loading-more {
		align-items: center;
		justify-content: center;
		padding-top: $space-size-normal;
		padding-bottom: $space-size-normal;
		text-align: center;
	}

	.home-bars .loading-more:active {
		background: $bg-color-active;
	}

	.home-bars .loading-more-text {
		font-size: $font-size-normal;
		color: $font-color-grey;
	}
</style>
