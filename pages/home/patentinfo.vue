<template>
	<view>
		<view v-if="loadingResult">
			<view class="head">
				<image :src="imgUrl" mode="aspectFill" class="image" @click="previewImage(imgUrl)"></image>
			</view>
			<view class="main-content">
				<view class="title text-xl text-black text-bold">
					{{obj.patentName}}
				</view>
				<view class="price text-red">
					<text class="text-xl text-bold text-price" v-if="obj.price != 0">{{obj.price}}</text>
					<text class="text-xl text-bold" v-else>面议</text>
				</view>
				<view class="tag">
					<text class="light bg-orange text-sm radius" v-if="!!obj.industryNavigation">{{obj.industryNavigation}}</text>
					<text class="light bg-orange text-sm radius" v-if="!!obj.patentTypeStr">{{obj.patentTypeStr}}</text>
					<text class="light bg-orange text-sm radius" v-if="!!obj.patentStatusStr">{{obj.patentStatusStr}}</text>
				</view>
				<view class="row-type">
					<text class="text text-df">专利号：{{obj.patentNum}}</text>
					<text class="text text-df">申请日期：{{obj.createTimeStr}}</text>
					<text class="text text-df">有效期至：{{obj.validityTimeStr}}</text>
				</view>
			</view>
			<view class="detail-content text-df bg-white">
				<view class="title text-lg text-black text-bold">
					专利详情
				</view>
				<u-parse :content="obj.content"></u-parse>
			</view>
			<view class="contact-content bg-white">
				<view class="title text-lg text-black text-bold">
					联系方式
				</view>
				<view v-if="!user">
					<view class="text-df text-grey text-center login">
						登录后可查看联系方式
					</view>
					<view class="text-center">
						<button class="cu-btn round bg-green" @click="login">立即登录</button>
					</view>
				</view>
				<view class="row-type" v-if="!!user">
					<text class="text text-df">专利权人：{{obj.patentee}}</text>
					<text class="text text-df">联系人：{{obj.contacts}}</text>
					<text class="text text-df">联系电话：{{obj.mobileNum}}</text>
					<text class="text text-df">邮箱：{{obj.emaile}}</text>
					<text class="text text-df">地址：{{obj.address}}</text>
				</view>
			</view>
			<view class="rec-content">
				<view class="title text-lg text-center">
					<text class="text">专利相关推荐</text>
				</view>
				<view class="list" v-if="naviObjs && naviObjs.length">
					<view class="pro" v-for="(item, index) in naviObjs" :key="index" @click="showNaviObj" :data-logicid="item.logicId">
						<image :src="item.fileUrl" mode="aspectFill" class="image"></image>
						<view class="name ellipsis text-black text-df">
							{{item.patentName}}
						</view>
						<view class="des text-grey text-sm ellipsis">
							{{item.industryNavigation}}
						</view>
						<view class="price text-orange">
							<text class="text-lg text-price">{{item.price}}</text>
						</view>
					</view>
				</view>
				<view class="text-df text-center text-gray" v-if="!naviObjs || !naviObjs.length">
					暂无相关推荐
				</view>
			</view>
		</view>
		<view v-else class="text-df text-gray text-center hight-center">
			{{loadingMsg}}
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import {
		UserBase
	} from '../../common/userbase.js';
	export default {
		components: {
			uParse
		},
		data() {
			return {
				imgUrl: '',
				logicid: '',
				naviObjs: [], //同行业推荐列表
				obj: {}, //详细信息
				user: null,
				loadingResult: false,
				loadingMsg: '加载中...'
			}
		},
		onLoad(param) {
			this.logicid = param.logicid;
			this.getInfo();
			UserBase.getUser(this.$servicePath, user => {
				this.user = user;
			})
		},
		onShow() {
			UserBase.getUser(this.$servicePath, user => {
				this.user = user;
			})
		},
		methods: {
			getInfo() {
				uni.request({
					method: 'GET',
					url: this.$servicePath + 'patent/mobile/show.xhtml',
					data: {
						logicId: this.logicid
					},
					success: (res) => {
						if (!res.data.resultFlag) {
							this.loadingResult = false;
							this.loadingMsg = res.data.resultMsg;
							return false;
						}
						const obj = res.data.object;
						const baseObj = obj.obj;

						if (baseObj.createTimeStr.length > 10) {
							baseObj.createTimeStr = baseObj.createTimeStr.substring(0, 10);
						}
						if (obj.patentStatusList && obj.patentStatusList.length) {
							obj.patentStatusList.forEach(item => {
								if (item.selectContent == baseObj.patentStatus) {
									baseObj.patentStatusStr = item.selectName;
									return false;
								}
							})
						} else {
							baseObj.patentStatusStr = '';
						}
						if (obj.patentTypeList && obj.patentTypeList.length) {
							obj.patentTypeList.forEach(item => {
								if (item.selectContent == baseObj.patentType) {
									baseObj.patentTypeStr = item.selectName;
									return false;
								}
							})
						} else {
							baseObj.patentTypeStr = '';
						}

						this.naviObjs = obj.naviObjs;
						this.imgUrl = obj.fileUrl;
						this.obj = baseObj;
						this.loadingResult = true;
					}
				})
			},
			showNaviObj(e) {
				const id = e.currentTarget.dataset.logicid;
				uni.navigateTo({
					url: 'patentinfo?logicid=' + id
				})
			},
			login() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			previewImage(url) {
				const urls = new Array(url);
				uni.previewImage({
					current: 0,
					urls: urls
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $bg-color-under;
	}

	.head,
	.main-content,
	.detail-content {
		background: $bg-color-white;
	}

	.head {
		.image {
			width: 100%;
			height: 500upx;
			background-image: url("../../static/noPic.png");
			background-size: 100%;
			background-repeat: no-repeat;
		}
	}

	.main-content {
		padding: 0 $space-size-huge;
		margin-bottom: $space-size-normal;

		.tag {
			.bg-orange {
				padding: $space-size-small $space-size-normal;
			}

			.bg-orange+.bg-orange {
				margin-left: $space-size-normal;
			}
		}
	}

	.row-type .text {
		display: block;
		color: $font-color-sec;
	}

	.detail-content {
		padding: $space-size-huge;
		margin-bottom: $space-size-normal;

		.wxParse {
			color: inherit;
		}

		.title {
			line-height: 2;
		}
	}

	.contact-content {
		padding: $space-size-huge;
		margin-bottom: $space-size-normal;

		.title {
			line-height: 2;
		}

		.login {
			line-height: 2;
		}
	}

	.rec-content {
		padding: $space-size-huge;

		.title {
			line-height: 2;
			margin-bottom: $space-size-normal;

			.text {
				color: $font-color-sec;
				position: relative;

				&::before {
					content: '';
					position: absolute;
					background: $font-color-sec;
					height: 0.5px;
					width: 80upx;
					top: 50%;
					left: 0;
					transform: translateX(-120%);
				}

				&::after {
					content: '';
					position: absolute;
					background: $font-color-sec;
					height: 0.5px;
					width: 80upx;
					top: 50%;
					right: 0;
					transform: translateX(120%);
				}
			}
		}

		.list {
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
					height: 210rpx;
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
		}
	}
	
	.hight-center {
		height: 100vh;
		line-height: 100vh;
	}
</style>
