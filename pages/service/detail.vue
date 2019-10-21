<template>
	<view>
		<view class="banner" v-if="res.isType!='other'">
			<video v-if="res.isType=='video'" class="image" id="myVideo" :src="res.mp4video" @error="videoErrorCallback"
			 controls></video>
			<image v-else src="../../static/noContainer.jpg" mode="center" class="image"></image>
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
		<view class="file" v-if="res.isType=='other'">
			<p style="font-weight: bold;">附件</p>
			<div class="add" opt="file">
				<div class="base-data-file"> <img src="../../components/File-Tools/images/xlsx.png">
					<p class="title" style="height: auto">1570868227690785.xlsx</p>
					<p><i class="iconfont icon-ziliaoiconx"></i>2.55 MB</p>
				</div>
			</div>
		</view>
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
	
	.file{
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.file p {
		font-size: 32rpx;
		margin-bottom: 10rpx;
		// font-weight: bold;
	}

	.base-data-file {
		width: calc(100% - 80rpx);
		min-height:  64rpx;
		padding-left: 80rpx;
		position: relative;
	}

	.base-data-file+.base-data-file {
		margin-top: 16rpx;
	}

	.base-data-file img {
		width: 64rpx !important;
		height: 64rpx !important;
		position: absolute;
		left: 0;
		top: 0;
		right: auto;
		object-fit: cover;
		border-radius: 0;
	}

	.base-data-file .file-cover {
		width: 64rpx !important;
		height: 64rpx !important;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
		object-fit: cover;
	}

	.base-data-file p {
		height: 26rpx;
		line-height: 26rpx;
		font-size: 28rpx;
		color: #7d7d7d;
	}

	.base-data-file p i {
		margin-right: 6rpx;
	}

	.base-data-file .title {
		height: auto;
		line-height: 32rpx;
		margin-bottom: 6rpx;
		text-align: justify;
		font-size: var(--fonts-c) !important;
		/*color: var(--color-o);*/
		padding: unset !important;
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
