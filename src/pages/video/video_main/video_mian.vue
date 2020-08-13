<template>
<view>

    <scroll-view scroll-y enable-flex class='video_main' @scrolltolower="handleToLower">
        <view class="video_item"
            v-for="(item,i) in videowp"
            :key="i"
            @click="handleGoVideo(item)"
         >
            <image :src="item.img" mode="widthFix" />
        </view>
    </scroll-view>

</view>
</template>

<script>

   

export default {
    data() {
        return {
           videowp:[],
           hasMore:true
        };
    },
    //接收父组件传送过来的数据
    props:{
        urlobj:Object
    },

    mounted(){

        this.getList()
    },

    watch:{
        urlobj(){
            //清空数组，因为videowp 是需要改变的，所以清空之前的再接收新数据渲染新页面
            this.videowp = []
            
            //因为skip跳过条数这里，每次tab栏切换都会发送新数据，发送的新数据里面已经存有skip把skip变为零了
            //点击标题时父子组件发送数据过来子组件（自身），然后watch 属性改变，再之后watch调用getList()在赋值urlobj
            //所以skip就有最新值，然后skip就不用赋值。

            this.getList()
            
        }
    },

    methods: {
       getList(){
           this.request({
               url:this.urlobj.url,
               data:this.urlobj.params
           })
           .then(resule=>{
               if(resule.res.videowp.length===0){
                   this.hasMore = false
                   uni.showToast({
                       title: '暂且没有更多数据了',
                       icon:"none"
                   });
                   return 
               }

                //数组叠加
                this.videowp = [...this.videowp,...resule.res.videowp]
           })
       }, 

        //触底分页事件
       handleToLower(){
           if(this.hasMore){
               this.urlobj.params.skip+=this.urlobj.params.limit
               this.getList()
           }else{
               uni.showToast({
                   title: '暂且没有更多数据了',
                   icon:"none"
               });
           }
       },

       //点击跳转到视频详情
       handleGoVideo(item){
           //1. 将数据存储到全局共享中
            getApp().globalData.video = item
            //2. 页面跳转
            uni.navigateTo({
                 url: '/pages/videoPlay/videoPlay'
            });
       }

       

    },

    components:{
        
    }


    }
</script>


<style scoped lang="scss">

    .video_main{
        height: calc(100vh - 36px);
        padding-top: 20rpx;
        display: flex;
        flex-wrap: wrap;
        .video_item{
            width: 33.3%;
            border: 5rpx solid #fff;

            image{

            }
        }
    }
   

</style>