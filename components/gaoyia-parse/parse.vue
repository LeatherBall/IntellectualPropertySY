<!--**
 * forked from：https://github.com/F-loat/mpvue-wxParse
 *
 * github地址: https://github.com/dcloudio/uParse
 *
 * for: uni-app框架下 富文本解析
 * 
 * 优化 by gaoyia@qq.com  https://github.com/gaoyia/parse
 */-->

<template>
	<!--基础元素-->
	<div :class="parseName+' '+className" v-if="!loading" :style="'user-select:' + userSelect">
		<block v-for="(node, index) of nodes" :key="index"><wxParseTemplate :node="node" /></block>
	</div>
</template>

<script>
import HtmlToJson from './libs/html2json';
import wxParseTemplate from './components/wxParseTemplate0';

export default {
	name: 'wxParse',
	props: {
		// user-select:none;
		userSelect:{
			type:String,
			default:'text'//none |text| all | element
		},
		imgOptions:{
			type:Object,
			default:function(){
				return {
					loop: false,
					indicator:'number',
					longPressActions:false
					// longPressActions: {
					// 	 itemList: ['发送给朋友', '保存图片', '收藏'],
					// 		success: function (res) {
					// 			console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					// 		},
					// 		fail: function (res) {
					// 			console.log(res.errMsg);
					// 		}    
					// 	}
					// }
				}
			}
		},
		parseName:{
			type:String,
			default:'wxParse'
		},
		loading: {
			type: Boolean,
			default: false
		},
		className: {
			type: String,
			default: 'wxParse'
		},
		content: {
			type: String,
			default: ''
		},
		noData: {
			type: String,
			default: '<div style="color: #bbb;">加载中...</div>'
		},
		startHandler: {
			type: Function,
			default() {
				return node => {
					node.attr.class = null;
					node.attr.style = null;
				};
			}
		},
		endHandler: {
			type: Function,
			default: null
		},
		charsHandler: {
			type: Function,
			default: null
		},
		imageProp: {
			type: Object,
			default() {
				return {
					mode: 'aspectFit',
					padding: 0,
					lazyLoad: false,
					domain: ''
				};
			}
		}
	},
	components: {
		wxParseTemplate
	},
	data() {
		return {
			imageUrls: [],
			wxParseWidth:{
				value:0
			}
		};
	},
	computed: {
		nodes() {
			const { content, noData, imageProp, startHandler, endHandler, charsHandler } = this;
			const parseData = content || noData;
			const customHandler = {
				start: startHandler,
				end: endHandler,
				chars: charsHandler
			};
			const results = HtmlToJson(parseData, customHandler, imageProp, this);
			this.imageUrls = results.imageUrls;
			return results.nodes;
		}
	},
	mounted() {
		let that = this
		let name = this.parseName
		this.getWidth(name).then(function(data){
			that.wxParseWidth.value = data;
			
		})
	},
	methods: {
		getWidth(name) {
				//得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery()
						.in(this)
						.select('.'+name)
						.fields(
							{
								size: true,
								scrollOffset: true
							},
							data => {
								res(data.width);
							}
						)
						.exec();
				});
			
		},
		navigate(href, $event) {
			this.$emit('navigate', href, $event);
		},
		preview(src, $event) {
			if (!this.imageUrls.length) return;
			uni.previewImage({
				current: src,
				urls: this.imageUrls,
				loop: this.imgOptions.loop,
				indicator: this.imgOptions.indicator,
				longPressActions: this.imgOptions.longPressActions
			});
			this.$emit('preview', src, $event);
		},
		removeImageUrl(src) {
			const { imageUrls } = this;
			imageUrls.splice(imageUrls.indexOf(src), 1);
		}
	},
	// 父组件中提供
	provide() {
		return {
			parseWidth: this.wxParseWidth
			// 提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。
		};
	}
};
</script>