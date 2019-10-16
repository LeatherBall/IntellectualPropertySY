<template>
	<view>
		<view class="pro-list">
			<view class="sub-list">
				<view class="pro" v-for="(item, index) in products" :key="index" @click="showInfo">
					<image src="../../static/zhuanlisq.jpg" mode="widthFix" class="image"></image>
					<view class="name ellipsis-two">
						企业忙转型，专利来“看家”
					</view>
					<view class="factory ellipsis">
						知识产权培训
					</view>
				</view>
			</view>
			<view class="sub-list">
				<view class="pro" v-for="(item, index) in products" :key="index" @click="showInfo">
					<image src="../../static/zhuanlisq.jpg" mode="widthFix" class="image"></image>
					<view class="name ellipsis-two">
						企业忙转型，专利来“看家”
					</view>
					<view class="factory ellipsis">
						知识产权培训
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				products: []
			};
		},
		methods: {
			showInfo() {
				uni.navigateTo({
					url: 'detail'
				})
			}
		},
		onShow() {
			uni.request({
				method: 'GET',
				url: this.$servicePath + 'online/mobile/online.xhtml',
				data: {
				},
				success: (res) => {
					if (res.data.resultFlag) {
						
						this.products = new Array(20);
							
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.data.resultMsg
						});
					}
				},
				fail: (res) => {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '登录失败，请稍后再试'
					})
				},
				complete: () => {
					this.isRotate = false;
				}
			})
		}
	}
</script>

<style lang="scss">
	page {
		background: $bg-color-under;
	}

	.pro-list {
		display: flex;
		margin: $space-size-huge;

		.sub-list {
			flex-basis: 50%;

			.pro {
				background: $bg-color-white;
				border-radius: $radius-size-normal;
				overflow: hidden;
				margin-bottom: $space-size-huge;

				.image {
					display: block;
					width: 100%;

				}

				.name {
					font-size: $font-size-normal;
					color: $font-color-base;
					padding: $space-size-normal;
					line-height: 1.5;
				}

				.factory {
					padding: $space-size-normal;
					font-size: $font-size-small;
					color: $font-color-grey;
				}
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
