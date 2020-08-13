<template>
    <view class="" hover-class="none" hover-stop-propagation="false">
        

    <!-- scroll 滑动 list内容 -->
        <scroll-view class="album_scroll" scroll-y @scrolltolower="handleToLower">


            <!-- 轮播图 -->
            <view class='album_swiper'>
                <swiper autoplay="1000" indicator-dots circular>
                    <swiper-item
                    v-for="item in banner"
                    :key="item.id"
                    >
                        <img :src="item.thumb" alt="" mode="widthFix">
                    </swiper-item>
                </swiper>
                
            </view>

            
            <view class='album_list'>
                <navigator class='album_item'
                    v-for="item in album"
                    :key="item.id"
                    :url="`/pages/album/album?id=${item.id}`"
                >
                <view class='album_img'>
                    <img :src="item.cover" alt="" mode="aspectFill">
                </view>

                <view class='album_info'>
                    <view class='album_name'>{{item.name}}</view>
                    <view class='album_desc'>{{item.desc}}</view>
                    <view class='album_btn'>
                        <view class='album_attention'>+关注</view>
                    </view>
                </view>

                </navigator>
            </view>


        </scroll-view>

    </view>
</template>

<script>



    export default {

        data(){
            return {
                parsms:{
                    limit:10,
                    order:"new",
                    skip:0
                },
                banner:[],
                album:[],
                hasMore:true
            }
        },
      
        mounted(){
            //修改页面的标题
            uni.setNavigationBarTitle({ title: '专辑'});

            this.getList()
        },

        methods:{

            getList(){
                //获取接口数据
                this.request({
                    url:"http://157.122.54.189:9088/image/v1/wallpaper/album",
                    data:this.parsms
                })
                .then(res=>{
                    
                    if(this.banner.length==0){
                        this.banner = res.res.banner
                    }
                    if(res.res.album==0){
                        this.hasMore = false
                        uni.showToast({
                            title: '没有更多数据了。',
                            icon: 'none',
                        });
                        return ;
                    }

                    this.album = [...this.album,...res.res.album]
                    
                })
            },


            handleToLower(){
                if(this.hasMore){
                    this.parsms.skip+=this.parsms.limit//跳过的条数
                    this.getList()
                }else{
                    uni.showToast({
                        title: '已经没有数据了!',
                        icon: 'none',
                    });
                }
                
            }
            
        }

    }
</script>


<style scoped lang="scss">

    //专辑滑动区域
    .album_scroll{
        height: calc(100vh - 36px);
    }

    //专辑轮播图
    .album_swiper{
        //原图宽高为：640*284 ==(比例约等于) 2.3：1
        //使图片在各个机型上自适应。这里做出用比例得来的高度
        //屏幕高度为375px, 所以自适应的屏幕高度等于750rpx。
        // 轮播图的高度 = 屏幕宽度(750rpx) / 图片比例（640/284）


        swiper{
            height: calc(750rpx/2.3);

            img{
                height: 100%;
            }
        }
    }


    // 专辑列表
    .album_list{
        padding: 10rpx 3rpx;

        .album_item{
            display: flex;
            overflow: hidden;
            padding: 10rpx 0;
            border: 1px solid #ededed;

            .album_img{
                flex: 1;
                padding: 10rpx 0 10rpx 10rpx;
                img{
                    width: 200rpx;
                    height: 170rpx;
                }
            }

            .album_info{
                padding: 10rpx 0;
                flex: 2;

                .album_name{
                    font-size: 28rpx;
                    font-weight: 560;
                    padding: 8rpx 0;
                    color: #000;
                }

                .album_desc{
                    padding:8rpx 0;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                }

                .album_btn{
                    padding: 10rpx 4rpx;
                    display: flex;
                    justify-content: flex-end;
                    
                    .album_attention{
                        padding: 7rpx 15rpx 7rpx 0;
                        color: $color;
                        border:1px solid $color;
                        width: 102rpx;
                        font-weight: 570;
                        text-align: center;
                    }
                    
                }
            }
        }
    }



</style>