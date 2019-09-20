<template>
	<view class="page">
		<view class="img-view">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"></image>
		</view>
		<view class="content">
			<view class="time">
				发表于 18小时前
			</view>
			<view class="title">
				无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。
			</view>
			<view class="detail">
				<rich-text :nodes="content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '中国台湾网9月20日讯 据台湾“东森新闻云”报道，继所罗门群岛与台湾断交后，传出另一“邦交”、太平洋国家基里巴斯也将跟台湾“断交”，最快在本周内就会宣布。' +
				'根据台媒报道，基里巴斯最近与中国大陆互动频繁，打算以突袭方式宣布建交，如果依照基里巴斯规划来看，最快在本周内就会宣布，甚至还会比所罗门还早一步跟中国大陆建交。 ' +
				'对此消息，台湾“国安会”以及台湾外事主管部门高层已经启动紧急因应，美方也已经派人赶赴基里巴斯，协助台湾“大使馆”人员与该国高层沟通。' +
				'蔡英文在今年3月的“海洋民主之旅”，本来打算前往基里巴斯，却在最后临时喊卡，当时就引起各界忧心邦交动摇。<br>' +
				'对此台湾外事主管部门解释，蔡英文办公室方面考量3月29日是蔡主持春祭“国殇大典”，是非常重要的仪式，所以才会重新调整出访的日期。不过，由于基里巴斯总统也兼任南太平洋大学校长，在该时间内，要在斐济主持毕业典礼，因此无法在国内，另外在行程上也牵涉太多宾客，导致时间无法更动，最后双方才达成理解，决定另安排去访的相关事宜。' +
				'中国台湾网9月20日讯 据台湾“东森新闻云”报道，继所罗门群岛与台湾断交后，传出另一“邦交”、太平洋国家基里巴斯也将跟台湾“断交”，最快在本周内就会宣布。' +
				'根据台媒报道，基里巴斯最近与中国大陆互动频繁，打算以突袭方式宣布建交，如果依照基里巴斯规划来看，最快在本周内就会宣布，甚至还会比所罗门还早一步跟中国大陆建交。' +
				'对此消息，台湾“国安会”以及台湾外事主管部门高层已经启动紧急因应，美方也已经派人赶赴基里巴斯，协助台湾“大使馆”人员与该国高层沟通。' +
				'蔡英文在今年3月的“海洋民主之旅”，本来打算前往基里巴斯，却在最后临时喊卡，当时就引起各界忧心邦交动摇。' +
				'对此台湾外事主管部门解释，蔡英文办公室方面考量3月29日是蔡主持春祭“国殇大典”，是非常重要的仪式，所以才会重新调整出访的日期。不过，由于基里巴斯总统也兼任南太平洋大学校长，在该时间内，要在斐济主持毕业典礼，因此无法在国内，另外在行程上也牵涉太多宾客，导致时间无法更动，最后双方才达成理解，决定另安排去访的相关事宜。'
			}
		}
	}
</script>

<style lang="scss">
	.img-view {
		width: 750upx;
		height: 500upx;
	}

	.img-view image {
		width: 100%;
		height: 100%;
	}

	.content {
		padding: $space-size-normal;
	}

	.content .title {
		font-size: $font-size-huge;
		font-weight: 900;
		padding: $space-size-large 0;
		color: $font-color-base;
	}

	.content .time {
		font-size: $font-size-normal;
		margin-top: $space-size-large;
		color: $font-color-grey;
	}

	.content .detail {
		font-size: $font-size-normal;
		color: $font-color-base;
	}
</style>
