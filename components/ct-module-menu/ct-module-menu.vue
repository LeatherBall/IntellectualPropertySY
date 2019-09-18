<template>
	<view class="ct-module-menu">
		<uni-swiper-dot :info="info" :current="current" :dotsStyles="dotsStyles" mode="long" field="content">
			<swiper :duration="300" class="swiper" @change="change">
				<swiper-item v-for="(item, index) in pages" :key="index" class="swiper-slide">
					<view class="swiper-item">
						<uni-grid :column="5" :show-border="false" :square="false" class="grid">
							<uni-grid-item v-for="(menu, index2) in menusForPage[index]" :key="menu.name" class="grid-item">
								<image class="image" :src="menu.img" mode="aspectFill" @tap="handleClick(menu.page, $event)" />
								<text class="text">{{menu.name}}</text>
							</uni-grid-item>
						</uni-grid>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
	import uniGrid from '../uni-grid/uni-grid.vue';
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"

	export default {
		components: {
			uniGrid,
			uniGridItem,
			uniSwiperDot
		},
		name: 'ctModuleMenu',
		props: {
			menus: {
				type: Array,
				default: function(e) {
					return []
				}
			}
		},
		data() {
			return {
				pages: 0,
				current: 0,
				menusForPage: {},
				dotsStyles: {
					backgroundColor: '#999',
					border: 'none',
					color: '#21b994',
					selectedBackgroundColor: '#21b994',
					selectedBorder: 'none',
					bottom: 10,
					width: 4,
					height: 2
				}
			};
		},
		created() {
			const menusLength = this.menus.length;
			this.pages = menusLength % 10 === 0 ? menusLength / 10 : Number.parseInt(menusLength / 10) + 1;
			for (let i = 0; i < this.pages; i++) {
				this.menusForPage[i] = [];
				for (let j = i * 10; j < (i + 1) * 10; j++) {
					if (j === menusLength)
						break;
					this.menusForPage[i].push(this.menus[j]);
				}
			}
		},
		computed: {
			info() {
				return new Array(this.pages);
			}
		},
		methods: {
			handleClick(page) {
				uni.navigateTo({
					url: page
				});
			},
			change(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style lang="scss">
	.ct-module-menu,
	.swiper,
	.swiper-slide,
	.swiper-item,
	.grid {
		width: 100%;
	}

	.ct-module-menu {
		height: auto;
	}

	.swiper {
		height: 380upx;
	}

	.image {
		width: 100upx;
		height: 100upx;
	}

	.text {
		margin-top: 10upx;
		font-size: $uni-font-size-base;
		color: $uni-text-color;
	}
</style>
