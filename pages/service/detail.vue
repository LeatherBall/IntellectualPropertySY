<template>
	<view>
		<view class="banner">
			<video v-if="res.isType=='video'" class="image" id="myVideo" :src="res.mp4video" @error="videoErrorCallback"
			 controls></video>
			<image v-else src="http://www.syftzip.com/TradeArea//files/TEST/2019-09-06/1567755992417839.jpg" mode="center" class="image"></image>
		</view>
		<view class="dept">
			<view class="desc">
				<text class="title">{{obj.trainName}}</text>
				<text class="time">{{obj.createTimeStr}}</text>
			</view>
			<view class="tt">
				组织单位：{{obj.trainorg}}
			</view>
			<view class="tt">
				培训分类：{{obj.trainType}}
			</view>
			<view class="tt">
				有 效 期：{{obj.starttimeStr}} 至 {{obj.endtimeStr}}
			</view>
		</view>
		<view class="detail">
			<view class="title">
				培训详情
			</view>
			<view class="content">
				<u-parse :content="htmlNodes" @preview="preview" @navigate="navigate"></u-parse>
			</view>
		</view>
		<!-- <view class="button-bottom">
			<button type="primary">在线学习</button>
		</view> -->
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				htmlNodes: '',
				obj: {},
				res: {}
			}
		},
		onLoad(e) {
			var logicId = e.logicId;
			this.logicId = logicId;
			this.getDetail();
			this.getOnline();
		},
		methods: {
			preview(src, e) {
				// do something
			},
			navigate(href, e) {
				// do something
				console.log(href)
				uni.downloadFile({
					url: href, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
							uni.showToast({
								icon: 'success',
								position: 'bottom',
								title: '下载成功'
							});
						}
					}
				});
			},
			getDetail() {
				uni.request({
					url: this.$servicePath + 'online/mobile/show.xhtml',
					data: {
						logicId: this.logicId
					},
					success: (data) => {
						var res = data.data;
						console.log(res);
						this.obj = res.object.obj;
						var sinSelList = res.object.sinSelList
						this.obj.createTimeStr = this.obj.createTimeStr.substring(0, 10)
						this.htmlNodes = res.object.obj.content;
						if (this.htmlNodes == "") {
							this.htmlNodes = "暂无培训详情"
						}
						for (var j = 0; j < sinSelList.length; j++) {
							if (this.obj.trainType == sinSelList[j].selectOrder) {
								this.obj.trainType = sinSelList[j].selectName
							}
						}
					}
				});
			},
			getOnline() {
				uni.request({
					url: this.$servicePath + 'online/mobile/onlineLearningQt.xhtml',
					data: {
						logicId: this.logicId
					},
					success: (data) => {
						var res = data.data;
						console.log(res);
						this.res = res.object
					}
				});
			}
		},
		onShow() {}
	}
</script>

<style lang="scss">
	page {
		background: $bg-color-white;
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
		padding: 20rpx 30rpx;
		color: $font-color-sec;

		.desc {
			z-index: 2;
			width: 100%;

			text {
				display: block;
			}

			.title {
				font-size: $font-size-huge;
				font-weight: bold;
				overflow-x: hidden;
				overflow-y: auto;
			}
		}
	}

	.detail {
		border-top: 0.5px solid #eee;
		padding: 20rpx 30rpx;

		.title {
			font-size: $font-size-large;
			margin-bottom: $space-size-normal;
			font-weight: bold;
		}

		.content {
			color: $font-color-base;
			// padding-bottom: 78px;
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
