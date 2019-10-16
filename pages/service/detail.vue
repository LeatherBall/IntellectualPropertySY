<template>
	<view>
		<view class="banner">
			<image src="http://www.syftzip.com/TradeArea//files/TEST/2019-09-06/1567755992417839.jpg" mode="center" class="image"></image>
			<view class="desc">
				<text class="title">知识产权教学课堂</text>
				<text class="time">发布时间：2019-09-06 15:48:21</text>
			</view>
		</view>
		<view class="dept">
			<view class="tt">
				组织单位：自贸区
			</view>
			<view class="tt">
				培训分类： 企业管理培训
			</view>
			<view class="tt">
				有 效 期：2019-09-02 15:45 至 2020-10-12 15:45
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
		<!-- <view class="button-bottom">
			<button type="primary">在线学习</button>
		</view> -->
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{
			uParse
		},
		data() {
			return {
				htmlNodes: '"<p>&nbsp;</p><p style="text-align: left; text-indent: 28px;"><span style="font-family: 宋体; font-size: 14px; font-weight: normal;">2018<span style="font-family: 宋体;">年</span><span style="font-family: Times New Roman;">11</span><span style="font-family: 宋体;">月</span><span style="font-family: Times New Roman;">16</span><span style="font-family: 宋体;">日，沈阳市城市规划展示馆与辽宁城市建设职业技术学院联合开展了馆校共建活动。沈阳市城市规划展示馆的讲解员为建筑工程系的</span><span style="font-family: Times New Roman;">120</span><span style="font-family: 宋体;">名同学带去了一堂别开生面的城市历史规划课。</span></span></p><p style="text-align: left; text-indent: 28px;"><span style="font-family: 宋体; font-size: 14px; font-weight: normal;"><span style="font-family: 宋体;">本次共建活动是城市规划展示馆首次走进高等院校，为大学生们讲述沈阳的历史和文化。课上，展示馆讲解员以城市建设为主线，讲述了沈阳不同时期的历史文化和城市建筑特色，并从实际出发，对沈阳振兴发展战略规划、沈阳城市总体规划、一河两岸发展等进行了详细地介绍和解读。</span></span></p><p style="text-align: left; text-indent: 28px;"><span style="font-family: 宋体; font-size: 14px; font-weight: normal;"><span style="font-family: 宋体;">讲解员生动的讲解得到全体师生一致好评。辽宁城市建设职业技术学院建筑工程系党总支书记罗爽表示：规划展示馆的授课内容与建筑工程专业所学的知识十分契合，不同的视角和丰富的内容让学生们的专业知识得到了进一步的拓展和延伸。十分感谢规划展示馆能够举办这样有意义的活动，让学生们坐在课堂里就能接受到更多知识，切身感受城市规划的意义和魅力，激发了学生们学习的动力和主动投身到城市建设的热情。</span></span></p><p style="text-align: left; text-indent: 28px;"><span style="font-family: 宋体; font-size: 14px; font-weight: normal;"><span style="font-family: 宋体;">课程结束后，辽宁城市建设职业技术学院建筑工程系党总支书记罗爽为展示馆讲解员刘欣颁发了</span>“校外辅导员”聘书，沈阳市城市规划展示馆副馆长张军为曾在展示馆八周年馆庆活动中参加志愿服务的<span style="font-family: Times New Roman;">11</span><span style="font-family: 宋体;">名同学颁发了活动纪念证书。</span></span></p><p style="text-align: left; text-indent: 28px;"><span style="font-family: 宋体; font-size: 14px; font-weight: normal;"><span style="font-family: 宋体;">规划展示馆在</span>2016<span style="font-family: 宋体;">年开始了“规划走进校园”活动，将规划展示馆搬进学生课堂，普及规划知识。活动开展至今，展示馆先后走进了铁路第五小学、勋望小学、鸭绿江小学、法库县实验小学等多所中小学进行义务宣讲。本次与城市建设职业技术学院的共建活动是展示馆首次将走进校园活动扩展到高等院校，这对于展示馆更好地发挥爱国主义教育基地和社会科学普及基地作用，惠及更多学生团体有着积极的意义。 </span></span></p><p style="text-align: left; text-indent: 28px;"><span style="font-family: 宋体; font-size: 14px; font-weight: normal;">&nbsp;</span></p><p><img src="http://zrzyj.shenyang.gov.cn/files/ueditor/GTZYJ/jsp/upload/image/20181121/1542786359979039509.jpg" title="20181116图片600.jpg" alt="20181116图片600.jpg"/></p>"'
			};
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
					url: 'https://unidemo.dcloud.net.cn/api/news/36kr/5254997',
					success: (data) => {
						if (data.statusCode == 200) {
						}
					}
				});
			}
		},
		onShow() {
			this.getDetail();
		}
	}
</script>

<style lang="scss">
	page {
		background: $bg-color-white;
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
		padding: $space-size-huge;
		color: $font-color-sec;
	}

	.detail {
		border-top: 0.5px solid #eee;
		padding: $space-size-huge;

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