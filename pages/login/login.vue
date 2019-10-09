<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="username" type="text" maxlength="11" placeholder="用户名"></wInput>
				<wInput v-model="password" type="password" maxlength="11" placeholder="密码"></wInput>
			</view>
			<wButton text="登 录" :rotate="isRotate" @click.native="startLogin()"></wButton>

			<!-- 底部信息 -->
			<!-- 			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view> -->
		</view>
	</view>
</template>

<script>
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import context from '../../common/context';
	import {
		checkRegExp,
		DateUtils
	} from '../../common/util.js'

	export default {
		data() {
			return {
				logoImage: '../../static/logo.png',
				username: '', //用户/电话
				password: '', //密码
				isRotate: false, //是否加载旋转
			};
		},
		components: {
			wInput,
			wButton,
		},
		methods: {
			startLogin() {
				if (this.isRotate) {
					return false;
				}

				this.isRotate = true;

				if (this.username.length == "") {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '用户名不能为空'
					});
					this.isRotate = false;
					return;
				}
				if (this.password.length == '') {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '密码不能为空'
					});
					this.isRotate = false;
					return;
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* margin-top: 128upx; */
	}

	/* 头部 logo */
	.header {
		width: 161upx;
		height: 161upx;
		box-shadow: 0upx 0upx 60upx 0upx rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		background-color: #000000;
		margin-top: 128upx;
		margin-bottom: 72upx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161upx;
		height: 161upx;
		border-radius: 50%;
	}

	/* 主体 */
	.main {
		display: flex;
		flex-direction: column;
		padding-left: 70upx;
		padding-right: 70upx;
	}

	.tips {
		color: #999999;
		font-size: 28upx;
		margin-top: 64upx;
		margin-left: 48upx;
	}

	/* 其他登录方式 */
	.other_login {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 256upx;
		text-align: center;
	}

	.login_icon {
		border: none;
		font-size: 64upx;
		margin: 0 64upx 0 64upx;
		color: rgba(0, 0, 0, 0.7)
	}

	.wechat_color {
		color: #83DC42;
	}

	.weibo_color {
		color: #F9221D;
	}

	.github_color {
		color: #24292E;
	}

	/* 底部 */
	.footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: rgba(0, 0, 0, 0.7);
		text-align: center;
		height: 40upx;
		line-height: 40upx;
		position: absolute;
		width: 100%;
		bottom: 50upx;
	}

	.footer text {
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>
