<template>
	<view class="cu-list menu">
		<view class="cu-item">
			<view class="content">
				<text class="text-grey">{{username}}</text>
			</view>
			<view class="action">
				<text class="text-grey text-df">{{user.userName}}</text>
			</view>
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-grey">证件类型</text>
			</view>
			<view class="action">
				<text class="text-grey text-df">{{user.documentTypeStr}}</text>
			</view>
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-grey">证件号码</text>
			</view>
			<view class="action">
				<text class="text-grey text-df">{{user.证件号码}}</text>
			</view>
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-grey">地址</text>
			</view>
			<view class="action">
				<text class="text-grey text-df">{{user.address}}</text>
			</view>
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-grey">邮编</text>
			</view>
			<view class="action">
				<text class="text-grey text-df">{{user.zipCode}}</text>
			</view>
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-grey">{{useraccount}}</text>
			</view>
			<view class="action">
				<text class="text-grey text-df">{{user.userLoginName}}</text>
			</view>
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-grey">联系人</text>
			</view>
			<view class="action">
				<text class="text-grey text-df">{{user.contacts}}</text>
			</view>
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-grey">电子邮箱</text>
			</view>
			<view class="action">
				<text class="text-grey text-df">{{user.userEmail}}</text>
			</view>
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-grey">手机号码</text>
			</view>
			<view class="action">
				<text class="text-grey text-df">{{user.userMobile}}</text>
			</view>
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-grey">座机号码</text>
			</view>
			<view class="action">
				<text class="text-grey text-df">{{user.teleNum}}</text>
			</view>
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-grey">姓名</text>
			</view>
			<view class="action">
				<text class="text-grey text-df"></text>
			</view>
		</view>
		<view class="padding-button">
			<button type="warn" class="" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {
		UserBase
	} from '../../common/userbase.js'
	export default {
		data() {
			return {
				username: '',
				useraccount: '',
				user: {}
			};
		},
		onShow() {
			UserBase.getUser(this.$servicePath, user => {
				this.user = user;
				if (user.userType == 1) {
					this.username = '自然人姓名';
					this.useraccount = '用户账号';
				} else {
					this.username = '单位名';
					this.useraccount = '企业账号';
				}
			})
		},
		methods: {
			logout() {
				uni.showModal({
					title: '',
					content: '确认退出账号吗？',
					confirmText: '确认退出',
					success: (res) => {
						if (res.confirm) {
							UserBase.setUser(null);
							uni.navigateBack();
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $bg-color-under;
	}
</style>
