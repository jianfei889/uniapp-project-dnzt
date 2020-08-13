<template>
<view class="container">

    <img :src="videoObj.img" class="bgImg" alt="">

    <!-- 播放器工具栏，声音、转发 -->
    <view class="video_tool">
        <!-- <view class="iconfont iconshengyin"></view> -->
        <view :class="['iconfont',muted?'iconjingyin':'iconshengyin']" @click="handleMuted"></view>
        <view class="iconfont iconzhuanfa">
            <button open-type="share"></button>
        </view>
    </view>
    <!-- 视频播放 -->
    <view class="video_wrap">
        <!-- autoplay,自动播放属性,属性为true时执行功能 -->
        <!-- muted，静音属性，属性为ftrue时静音 -->
        <video :src="videoObj.video" objectFit="fill" :muted="muted"></video>
    </view>
    
    <!-- 下载开始 -->
    <view class="download">
        <view class="download_btn" @click="download">下载高清</view>
    </view>


</view>
</template>

<script>

   

export default {
    data() {
        return {
           videoObj:{},
           //是否静音
           muted:false
        };
    },

    methods: {
        //开关声音的图标切换
       handleMuted(){
           this.muted = !this.muted
       },
       async download(){
            
            //弹窗提示
           await uni.showLoading({
               title: '文件下载中'
           });

           //1. 将文件存储到小程序的临时目录下
                //注意这里的返回值中，首先它是一个数组，然后它第0个元素为状态码，第一个元素才是我们要的数据
                const {tempFilePath} = ( await uni.downloadFile({url: this.videoObj.video, }) )[1]
            //2.将临时文件保存到本地目录
                await uni.saveVideoToPhotosAlbum({
                    filePath: tempFilePath,
                })

            //弹窗提示
            uni.hideLoading();
            uni.showToast({title: '下载成功',icon:"none"});
       }
    },


    components:{
        
    },
    onLoad(){
        // console.log(getApp().globalData.video);
        this.videoObj = getApp().globalData.video
    }


    }
</script>


<style scoped lang="scss">

    .container{
        position: relative;
        //背景图片
        .bgImg{
            position: absolute;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            filter:blur(16px)
        }
        
        //工具栏，静音，转发
        .video_tool{
            height: 80rpx;
            display: flex;
            //右边对齐
            justify-content: flex-end;

            .iconfont{
                width: 80rpx;
                color:#fff;
                font-size: 40rpx;
                background-color: rgba($color: #000000, $alpha: .3);
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50rpx;
                margin-right: 30rpx;
            }

            .iconzhuanfa{
                position: relative;
                button{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50rpx;
                    opacity: 0;
                }
            }
            
        }

        //视频播放
        .video_wrap{
            display: flex;
            justify-content: center;
            margin-top: 15rpx;

            video{
                width: 432rpx;
                height: 720rpx;
            }
        }

        //下载
        .download{
            display: flex;
            justify-content: center;
            margin-top: 30rpx;
            .download_btn{
                width: 360rpx;
                height: 80rpx;
                border-radius: 40rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 30rpx;
                font-weight: 580;
                color:#fff;
                background-color: rgba($color:#999, $alpha: .3);
                border: 5rpx solid #fff;
            }
        }
    }
   


</style>