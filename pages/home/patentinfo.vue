<template>
	<view>
		<view class="head">
			<image :src="imgUrl" mode="aspectFill" class="image"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: '',
				logicid: ''
			}
		},
		onLoad(param) {
			this.logicid = param.logicid;
			this.getInfo();
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
						console.log(res.data)
						this.imgUrl = res.data.object.fileUrl;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.head {
		.image {
			width: 100%;
			height: 500upx;
			background-image: url("../../static/noPic.png");
			background-size: 100%;
			background-repeat: no-repeat;
		}
	}
</style>
