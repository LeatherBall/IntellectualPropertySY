<template>
  <!-- 最外层的view绑定了js中定义的宽、高以及背景颜色 -->
  <view
    v-if="showLoad"
    :style="{
        'width': systemInfo.width+'px',
        'height': systemInfo.height+'px',
        'background-color': bgcolor,
        'position': 'absolute',
        'left':'0',
        'top':'0',
        'z-index':'9998',
        'overflow': 'hidden'
    }"
    :animation="animationData" 
  >
    <!-- 循环，遍历绘制矩形节点，宽高参照js获取到的节点宽高，以绝对定位的方式定位 -->
    <view
      v-for="(item,key) in skeletonRectLists"
      :key="key"
      :class="{'chiaroscuro':loading == 'chiaroscuro'}"
      :style="{
        'width': item.width+'px',
        'height': item.height+'px',
        'background-color': '#E3E3E3',
        'position': 'absolute',
        'left': item.left+'px',
        'top': item.top+'px'
      }"
    ></view>
    <!-- 循环，遍历绘制矩形节点，宽高参照js获取到的节点宽高，以绝对定位的方式定位 -->
    <view
      v-for="(item,key) in skeletonCircleLists"
      :key="key"
      :class="{chiaroscuro:loading == 'chiaroscuro'}"
      :style="{
        'width': item.width+'px',
        'height': item.height+'px',
        'background-color':'#E3E3E3',
        'border-radius': item.width+'px',
        'position':'absolute',
        'left': item.left+'px',
        'top': item.top+'px'
      }"
    ></view>
    <view class="spinbox" v-if="loading == 'spin'">
      <view class="spin"></view>
    </view>
  </view>
</template>
<script>
var animation = uni.createAnimation({
  duration: 800,
  timingFunction: "ease"
});
export default {
  props: {
    bgcolor: {
      type: String,
      default: ""
    },
    show:{
        type:Boolean,
        default:false
    },
    // 渲染的根节点的类名
    selector: {
      type: String,
      default: "skeleton"
    },
    // 加载动画
    loading: {
      type: String,
      default: "spin"
    }
  },
  data() {
    return {
      animationData: {},
      animation: {},
      loadingAni: ["spin", "chiaroscuro"],
      showLoad:false,
      systemInfo: {},
      skeletonRectLists: [],
      skeletonCircleLists: []
    };
  },
  watch:{
    show(){
        if(!this.show){
            this.animation.opacity(0).step({ duration: 800 });
            this.animationData = this.animation.export();
            setTimeout(()=>{
                this.showLoad = false;
            },500)
        }
        else{
            this.showLoad = true;
        }
    }
  },
  methods: {
    rectHandle: function() {
      const that = this;

      //绘制不带样式的节点
      // 选择所有 .skeleton-rect的节点
      uni
        .createSelectorQuery()
        .selectAll(`.${this.selector}-rect`)
        .boundingClientRect()
        .exec(function(res) {
          // 保存数据，一维数组是节点，二维数组是节点的信息
          that.skeletonRectLists = res[0];
        });
    },
    radiusHandle: function() {
      const that = this;
      // 同样地选择所有的 .skeleton-radius节点
      uni
        .createSelectorQuery()
        .selectAll(`.${this.selector}-radius`)
        .boundingClientRect()
        .exec(function(res) {
          that.skeletonCircleLists = res[0];
        });
    }
  },
  onReady() {
    this.animation = animation;
     this.showLoad = this.show;
    //默认的首屏宽高，防止内容闪现
    const systemInfo = uni.getSystemInfoSync();
    // 获取系统的信息，作为skeleton的宽和高
    const that = this;
    that.systemInfo = {
      width: systemInfo.windowWidth,
      height: systemInfo.windowHeight
    };
    that.loading = that.loadingAni.includes(that.loading)
      ? that.loading
      : "spin";
    uni
      .createSelectorQuery()
      .selectAll(`.${that.selector}`)
      .boundingClientRect()
      .exec(function(res) {
        that.systemInfo.height = res[0][0].height + res[0][0].top;
      });

    //绘制矩形
    that.rectHandle();

    //绘制圆形
    that.radiusHandle();
  }
};
</script>
