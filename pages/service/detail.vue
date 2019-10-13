<template>
	<view>
		<view class="banner">
			<image src="http://www.syftzip.com/TradeArea//files/TEST/2019-09-06/1567755992417839.jpg" mode="center" class="image"></image>
			<view class="desc">
				<text class="title">知识产权教学课堂</text>
				<text class="time">发布时间：2019-09-06 15:48:21</text>
			</view>
		</view>
		<view class="dept">
			<view class="tt">
				组织单位：自贸区
			</view>
			<view class="tt">
				培训分类： 企业管理培训
			</view>
			<view class="tt">
				有 效 期：2019-09-02 15:45 至 2020-10-12 15:45
			</view>
		</view>
		<view class="detail">
			<view class="title">
				培训详情
			</view>
			<view class="content">
				<rich-text :nodes="htmlNodes"></rich-text>
			</view>
		</view>
		<view class="button-bottom">
			<button type="primary">在线学习</button>
		</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		components: {},
		data() {
			return {
				htmlNodes: []
			};
		},
		methods: {
			getDetail() {
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news/36kr/5254997',
					success: (data) => {
						if (data.statusCode == 200) {
							var htmlString = data.data.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
							this.htmlNodes = htmlParser(htmlString);
						}
					}
				});
			}
		},
		onShow() {
			this.getDetail();
		}
	}
</script>

<style lang="scss">
	page {
		background: $bg-color-under;
	}

	.banner {
		position: relative;
		height: 500upx;

		.image {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}

		.desc {
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 2;
			width: 100%;
			background: $bg-color-mask;
			color: $font-color-inverse;

			text {
				display: block;
				padding: 0 $space-size-huge;
			}

			.title {
				font-size: $font-size-huge;
				font-weight: bold;
				max-height: 200upx;
				overflow-x: hidden;
				overflow-y: auto;
			}
		}
	}

	.dept {
		padding: $space-size-huge;
		color: $font-color-sec;
	}

	.detail {
		border-top: 0.5px solid #eee;
		padding: $space-size-huge;

		.title {
			font-size: $font-size-large;
			margin-bottom: $space-size-normal;
			font-weight: bold;
		}

		.content {
			color: $font-color-base;
			padding-bottom: 78px;
		}
	}

	.button-bottom {
		position: fixed;
		padding: 0 8px 8px;
		bottom: 0;
		left: 0;
		width: 100%;
		background: $bg-color-under;
	}
</style>