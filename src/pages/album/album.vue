<template>
<view class="container">

    <view class='album_bg'>
        <img :src="album.cover" alt="" mode="widthFix">
        <view class='album_info'>
            <view class='album_name'>{{album.name}}</view>
            <view class='album_btn'>关注专辑</view>
        </view>
    </view>


    <view class='album_author'>
        <view class='author_info'>
            <img :src="album.user.avatar" alt="" mode="widthFix">
            <view class='author_name'>{{album.user.name}}</view>
        </view>
        <view class='author_desc' >
            <text>{{album.desc}}</text>
        </view>
    </view>

    <!-- list 图片有值时渲染图片，没数据时显示提示文字 -->
    <!-- 这里用 list.length 这个数据做判断，这里的list.length 是后台的名字写成length，不是长度 -->
    <view class='album_list' v-if="list.length">
        <view class='list_item'
            v-for="(item,index) in list"
            :key="item.id"
         >
         <go-detail :list="list" :index="index">
            <img  :src="item.thumb+item.rule.replace('$<Height>',360)" alt="">
        </go-detail>
        
        </view>
    </view>

    <view class='album_list_null' v-else>
        <view class="list_null_toast">暂且没有图片数据</view>
    </view>


</view>
</template>

<script>

   import goDetail from "@/components/goDetail"

export default {
    data() {
        return {
           params:{
               limit:12,
                order:'new',
                skip:0,
                
                //first，第一次请求时写1，请求返回包括头部对象信息
                //之后改为0就可以忽略头部的信息，然后分页多次请求时不用请求头部的
                //改为0时返回的信息是列表信息
                first:1
           },
           id:-1,
           album:{},
           list:[],
           hasMore:true
        };
    },

    methods: {
       getList(){
           this.request({
               url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
                data:this.params
           })
           .then(result=>{
            //    console.log(result);
               
               if(Object.keys(this.album).length===0){
                   this.album = result.res.album
               }

                if(result.res.wallpaper.length===0){
                    this.hasMore=false
                    uni.showToast({
                        title: '没有更多的图片数据了',
                        icon: 'none',
                    });
                    return
                }
               this.list = [...this.list,...result.res.wallpaper]
               
               
           })
       }
    },

    components:{
        goDetail
    },

    onLoad(options){
        this.id = options.id
        
        // this.id = "5d5f8e45e7bce75ae7fb8278"

        this.getList()
    },

    // 页面触底 上拉加载下一页事件
    onReachBottom(){
        if(this.hasMore){
            
            this.params.first=0

            this.params.skip +=this.params.limit
            this.getList()
        }else{
            uni.showToast({
                title: '没有更多数据了。',
                icon: 'none',
            });
        }
         
    }


    }
</script>


<style scoped lang="scss">

    .album_bg{
        position: relative;

        .album_info{
            position: absolute;
            width: 100%;
            bottom:0;
            right:0;
            background-color:  #000;
            background-color: rgba(255,255,255,0.5);
            display: flex;
            justify-content: space-between;
            height: 80rpx;
            // line-height 垂直
            align-items: center;

            .album_name{
                padding-left: 15rpx;
                font-size: 28rpx;
                color: #000;
                font-weight: 580;
            }
            .album_btn{
                background-color: $color;
                margin-right: 15rpx;
                color: white;
                width: 152rpx;
                height: 50rpx;
                display: flex;
                //水平居中
                justify-content: center;
                // 垂直居中
                align-items: center ;
            }
        }
    }

    .album_author{
        padding: 30rpx 15rpx;

        .author_info{
            display: flex;
            padding-bottom: 30rpx;
            

            img{
                width: 60rpx;
            }

            .author_name{
                display: flex;
                align-items: center;
                justify-content: center;
                color: #000;
                font-weight: 580;
                padding-left: 30rpx;
                font-size: 30rpx;
            }

        }

        .author_desc{
                color: #000;
                font-weight: 520;
                font-size: 30rpx;

        }
    }


    .list_null_toast{
        padding-top:100rpx;
        font-size: 32rpx;
        font-weight: 580;
        text-align: center;
    }

    .album_list{
        display: flex;
        flex-wrap: wrap;

        .list_item{
            width: 33.3333%;
            border:1px solid #fff;

            img{
                width: 100%;
                height: 180rpx;
                border:1px solid #fff;
            }
        }
    }

   

</style>