#引入组件大家都知道的
#import MSkeleton from './components/skeleton/skeleton';


#具体用法

#参数 selector 下面需要骨架的样式开头
#参数 show 决定显示或隐藏 
#参数 loading 目前没什么但是不能少，，(等下个版本在更新)
#需要一个名为skeleton的view内容全写在下面
#圆形的骨架需要加上skeleton-radius样式
#矩形的则需要加上skeleton-rect样式

<template>
  <div>
    <m-skeleton selector="skeleton" loading="spin" :show="showSkeleton"></m-skeleton>
    <view class="container skeleton">
        <view class="userinfo">
            <!-- 要渲染的圆形节点，加上 .skeleton-radius -->
            <image class="userinfo-avatar skeleton-radius" :src="img" mode="aspectFill"></image>
            <!-- 要渲染的矩形节点，加上 .skeleton-rect -->
            <text class="userinfo-nickname skeleton-rect">{{userInfo.nickName}}</text>
        </view>
    
        <view class="usermotto">
            <text class="user-motto skeleton-rect">{{motto}}</text>
        </view>
    </view>
  </div> 
</template>
<script>
export default {
  data() {
    return {
      showSkeleton: true,
      motto: 1111,
      userInfo:{
        nickName:"nickName"
      },
      img:'http://img5.imgtn.bdimg.com/it/u=2754780702,3253667337&fm=26&gp=0.jpg',
      opacity:1
    };
  },
  onLoad(){
    setTimeout(()=>{
        this.showSkeleton = false;
    },1000)
  },
  methods:{
      
  },
};
</script>
<style>
.userinfo{
  display: flex;
  flex-direction: column;
}
.userinfo-avatar{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  left: 20px;
  margin-left: 20px;
  object-fit: contain
}
.userinfo-nickname{
  margin: 20px;
}
</style>
 