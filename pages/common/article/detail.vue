<template>
	<view>
		<view v-show="show">
			<view class="dept">
				<view class="desc text-black-light">
					<view class="title text-xxl text-bold">{{obj.title}}</view>
				</view>
				<view class="tt text-black-light">
					<view class="time"><text class="cuIcon-time"></text>{{obj.createTimeStr}}</view>
					<view>来源：{{obj.source}}</view>
				</view>
			</view>
			<view class="detail">
				<!-- <view class="title">文章详情</view> -->
				<view class="content skeleton-rect">
					<u-parse :content="htmlNodes" @preview="preview" @navigate="navigate"></u-parse>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue';
	import {
		FileIcon,
		FileView,
		FileBase
	} from '../../../components/File-Tools/src/filetools.js';
	export default {
		components: {
			uParse
		},
		data() {
			return {
				htmlNodes: '',
				obj: {},
				res: {},
				show: false,
				showSkeleton: true
			}
		},
		onLoad(e) {
			var logicId = e.logicId;
			this.logicId = logicId;
			this.getDetail();
		},
		methods: {
			preview(src, e) {
				// do something
			},
			navigate(href, e) {
				// do something
				uni.showLoading({
					title: '下载中'
				});
				uni.downloadFile({
					url: href, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							uni.showToast({
								icon: 'success',
								position: 'bottom',
								title: '下载成功'
							});
							uni.hideLoading();
							var filePath = res.tempFilePath;
							uni.openDocument({
								filePath: filePath,
								success: function(res) {
									console.log('打开文档成功');
								}
							});
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '下载失败'
						});
						uni.hideLoading();
					}
				});
			},
			downloadFile() {
				// do something
				uni.showLoading({
					title: '下载中'
				});
				uni.downloadFile({
					url: this.res.otherURL, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							uni.showToast({
								icon: 'success',
								position: 'bottom',
								title: '下载成功'
							});
							uni.hideLoading();
							var filePath = res.tempFilePath;
							uni.openDocument({
								filePath: filePath,
								success: function(res) {
									console.log('打开文档成功');
								}
							});
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '下载失败'
						});
						uni.hideLoading();
					}
				});
			},
			getDetail() {
				uni.request({
					url: this.$servicePath + 'article/mobile/show.xhtml',
					data: {
						logicId: this.logicId
					},
					success: (data) => {
						var res = data.data;
						this.show = true;
						this.obj = res.object.articleObj;
						this.htmlNodes = this.obj.content;
						if (this.htmlNodes == "") {
							this.htmlNodes = "暂无文章详情"
						}
						this.showSkeleton = false;
					}
				});
			}
		},
		onShow() {}
	}
</script>

<style lang="scss">
	.file {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}

	.base-data-file {
		width: calc(100% - 80rpx);
		min-height: 64rpx;
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

	.base-data-file .title {
		height: auto;
		line-height: 32rpx;
		margin-bottom: 6rpx;
		text-align: justify;
	}

	.base-data-file .down {
		line-height: 1;
	}

	.dept {
		padding: 20rpx 30rpx;

		.desc {
			.title {
				line-height: 1.4;
				padding: $space-size-large 0;
			}
		}

		.tt {
			// display: flex;
			// justify-content: space-between;

			.time text {
				margin-right: $space-size-normal;
				line-height: 1.4;
			}
		}
	}

	.detail {
		border-top: 0.5px solid #eee;
		padding: 20rpx 30rpx;

		.title {
			font-size: $font-size-huge;
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

	.highlight {
		color: #0081ff;
		text-decoration: underline;
	}
</style>
