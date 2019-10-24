<template>
	<view>
		<view class="title text-xl text-black text-bold">
			中国（辽宁）自贸试验区沈阳片区知识产权公共服务平台操作指南
		</view>
		<view class="des text-black">
			知识产权公共服务平台分为平台首页、信息发布、信息查询服务、知识产权申报、知识产权交易、培训服务和用户中心七部分。
		</view>
		<view class="text-black text-bold">
			一、用户注册
		</view>
		<view class="item text-black">
			在平台右上方点击『注册』按钮，跳转到用户注册页面。用户注册分为法人注册和个人注册两种，填写注册信息后点击『提交』按钮，用户注册信息提交至平台方审核。
		</view>
		<view class="text-black text-bold">
			二、用户登录	
		</view>
		<view class="item text-black">
			在平台右上方点击『登录』按钮，跳转到用户登录页面，输入用户名、密码和验证码，点击『立刻登录』按钮，即可进入系统。
		</view>
		<view class="text-black text-bold">
			三、信息发布
		</view>
		<view class="item text-black">
			在平台首页，点击【信息发布】菜单，进入信息发布页面，包括通知公告，热门资讯，政策法规，新闻动态，申报指南等等，点击文章标题，进入到文章详情页。
		</view>
		<view class="text-black text-bold">
			四、信息查询服务
		</view>
		<view class="item text-black">
			在平台首页，鼠标悬停在【信息查询服务】菜单，会显示专利查询、商标查询、版权查询、原产地地理标志查询子菜单，点击子菜单会跳转到相应的信息查询页面，可进行信息查询。
		</view>
		<view class="text-black text-bold">
			五、知识产权申报
		</view>
		<view class="item text-black">
			在平台首页，鼠标悬停在【知识产权申报】菜单，会显示专利申报、商标申报、版权登记、原产地地理标志认证子菜单，点击子菜单会跳转到相应的知识产权申报页面，可进行知识产权申报。
		</view>
		<view class="text-black text-bold">
			六、知识产权交易
		</view>
		<view class="item text-black">
			在平台首页，鼠标悬停在【知识产权交易】菜单，会显示专利转让、商标转让、版权转让子菜单，点击子菜单会跳转到相应的知识产权转让页面，可进行知识产权交易信息查询。
		</view>
		<view class="text-black text-bold">
			七、培训服务
		</view>
		<view class="item text-black">
			在平台首页，点击【培训服务】菜单，进入在线培训页面，可查看培训视频和培训文档进行学习。
		</view>
		<view class="text-black text-bold">
			八、用户中心
		</view>
		<view class="item text-black">
			用户登录后，在平台右上方点击『用户中心』按钮，跳转到用户个人中心，可进行账户信息维护、账户安全设置、知识产权转让登记等。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}, 
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {
		padding: $space-size-huge;
	}
	
	.title, .des {
		margin-bottom: $space-size-large;
	}
	
	.item {
		padding-left: $space-size-huge;
	}
</style>
