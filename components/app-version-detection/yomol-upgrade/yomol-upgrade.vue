<template>
	<view v-if="visible" class="mark">
		<view class="view">
			<text class="title">{{title}}</text>
			<view class="tip">新版更新内容</view>
			<scroll-view class="scroll" scroll-y>
				<view class="item" v-for="(item,index) in contents" :key="index">
					{{item}}
				</view>
			</scroll-view>
			<view v-if="!downloading" class="btns">
				<image class="icon" src="../upgrade.png"></image>
				<view class="sure" @click="onSureClick()">马上升级</view>
			</view>
			<cmd-progress v-else class="progress" type="circle" stroke-color="#C40000" :percent="progress"></cmd-progress>
		</view>
	</view>
</template>

<script>
	import cmdProgress from '../cmd-progress/cmd-progress.vue'
	export default {
		components: {
			cmdProgress
		},
		data() {
			return {
				visible: false,
				progress: 0,
				contents: [],
				downloading: false,
				success: true
			}
		},
		props: {
			type: {
				type: String,
				default: 'pkg'
			},
			url: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '发现新版本'
			},
			content: {
				type: String,
				default: ""
			}
		},
		watch: {
			content() {
				var strs = this.content.split('\\n')
				for (var i = 0; i < strs.length; i++) {
					this.contents.push(strs[i])
				}
			}
		},
		methods: {
			show() {
				setTimeout(() => {
					if (this.success) {
						this.visible = true
					}
				}, 100);
			},
			hide() {
				setTimeout(() => {
					this.visible = false
				}, 100);
			},
			onCancelClick() {
				this.hide()
			},
			onSureClick() {
				var platform = uni.getSystemInfoSync().platform
				if (platform == 'ios' && this.type == 'pkg') {
					plus.runtime.openURL(this.url);
				} else {
					this.downloading = true
					var downloadTask = uni.downloadFile({
						url: this.url,
						success: (downloadResult) => {
							this.hide()
							if (downloadResult.statusCode === 200) {
								plus.runtime.install(downloadResult.tempFilePath, {
									force: false
								}, function() {
									plus.runtime.restart();
								}, (e) => {
									console.error(e);
									this.success = false
									uni.showToast({
										title: '安装升级包失败',
										icon: 'none'
									})
								});
							}
						}
					});
					downloadTask.onProgressUpdate((e) => {
						this.progress = e.progress
					})
				}
			}
		},
	}
</script>

<style>
	.mark {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.view {
		width: 80vw;
		height: 70vw;
		background-color: white;
		border-radius: 15upx;
		display: flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: center;
	}

	.title {
		margin-top: 20upx;
		color: #C40000;
		font-weight: bold;
		font-size: 38upx;
		text-align: center;
	}

	.tip {
		margin-top: 20upx;
		margin-left: 30upx;
		align-self: flex-start;
		font-size: 32upx;
		font-weight: 600;
		color: black;
	}

	.scroll {
		width: 100%;
		height: 300upx;
		display: flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.item {
		margin-left: 50upx;
		text-align: left;
		font-size: 30upx;
	}

	.btns {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		margin-bottom: 10upx;
	}

	.icon {
		width: 45upx;
		height: 45upx;
		margin-right: 10upx;
	}

	.sure {
		padding: 10upx 0;
		text-align: center;
		color: #C40000;
		font-size: 30upx;
		font-weight: 500;
	}

	.progress {
		margin-bottom: 20upx;
	}
</style>
