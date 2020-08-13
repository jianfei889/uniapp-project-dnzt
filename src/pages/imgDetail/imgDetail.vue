<template>
<view>

    <!-- 图片详情的作者信息 -->
    <view class='user_info' v-if="imgDetail.user.avatar">
        <view class='user_icon'>
            <img :src="imgDetail.user.avatar" alt="" mode="widthFix">
        </view>
        <view class='user_desc'>
            <view class='user_name'>{{imgDetail.user.name}}</view>
            <view class='user_time'>{{imgDetail.cnTime}}</view>
        </view>
    </view>

    <!-- 高清图片 -->
    <view class='high_img'>
        <swiper-action @swiperAction="swiperAction">
            <img :src="imgDetail.thumb" alt="" mode="widthFix" class="high_img_show">
        </swiper-action>
    </view>

    <!-- 点赞 -->
    <view class='user_rank'>
        <view class='rank'>
            <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
        </view>
        <view class='collect'>
            <text class="iconfont iconshoucang">收藏</text>
        </view>
    </view>

    <!-- 专辑 -->
    <view class='album_wrap' v-if="album.length">
        <view class='album_title'>相关</view>
        
        <view class='album_list'>
            <!-- 由于接口没有返回数据，所以这里的数据是经过改动后的假数据。但是图片是伪真数据
            <view class="album_item"
                v-for="item in album"
                :key="item.id"
             >
                <view class='album_cover'>
                    <img :src="item.cover" mode="widthFix" alt="">
                </view>
                
                <view class='album_info'>
                    <view class='album_info_text'>专辑</view>
                    <view class='album_info_name'>{{item.name}}</view>
                </view>

            </view>
            -->
            <view class="item">
                <view class='album_cover'>
                    <!-- <img src="https://publish-pic-cpu.baidu.com/1f4cca66-fa4c-43e2-84b4-d3cfb3136c6f.png@q_90,w_450|f_webp" mode="widthFix" alt=""> -->
                    <img :src="imgDetail.newThumb" alt="" >
                </view>
                
                <view class='album_info'>
                    <view class='album_info_text'>专辑</view>
                    <view class='album_info_name'>Lorem ipsumectatiskjkwlsdlsd</view>
                    <view class="iconfont iconiconfontjiantou4"></view>
                </view>
            </view>

        </view>
    </view>

    <!-- 最热评论 -->
    <view class="comment_hot">
        <view class="hot_title">
            <view style="font-size:35rpx;font-weight:570;text-align:center;border:5rpx solid red;margin:20rpx 0;">以下评论数据为模板数据，等待接口填充</view>
            <text class="iconfont iconhot1"></text>
            <text class="hot_text">最热评论</text>
        </view>
        <view class="hot_list">
            <!-- 评论列表，头像，昵称，发布日期。内容，点赞数。
                因为api接口没有数据，所以使用模板数据填充
            <view class="comment_item"
                v-for="item in hot"
                :key="item.id"
             >
                <view class="comment_user">
                    <view class="user_icon">
                        <img :src="item.user.avatar" alt="">
                    </view>
                    <view class="name">
                        <view class="user_nickname">{{item.user.name}}</view> 
                        <view class="user_time">{{item.atime}}</view> 
                    </view>
                    <view class="userBadge">
                        <img alt="" 
                            v-for="item2 in item.user.title" 
                            :key="item2.icon"
                            :src="item2.icon" 
                         >
                    </view>
                </view>
                   
                <view class="comment_desc"> 
                    <view class="comment_content"></view>
                    <view class="comment_comment_like"></view>
                </view>
            </view>
        -->
            <view class="comment_item"
                v-for="(item,index) in hotComment"
                :key="index"
             >
                <view class="comment_user">
                    <view class="user_icon">
                        <!-- 头像 -->
                        <img :src="item.cover" alt="">
                    </view>
                    
                    <view class="name">
                        <view class="user_nickname">{{item.name}}</view> 
                        <view class="user_time">发布时间：{{hotTime}}</view> 
                    </view>
                    <view class="userBadge">
                        <!-- 点赞数 -->
                        <text class="iconfont icondianzan">999</text>
                    </view>
                </view>
                   
                <view class="comment_desc"> 
                    <view class="comment_content">
                        <text >
                            {{item.content}}
                        </text>
                    </view>
                </view>
            </view>


        </view>
    </view>
    

    <!-- 最新评论 -->
    <view class="comment_new">
        <view class="new_title">
            <text class="iconfont iconpinglun"></text>
            <text class="new_text">最新评论</text>
        </view>
        <view class="new_list">
            
            <view class="comment_item"
                v-for="(item,index) in newComment"
                :key="index"
             >
                <view class="comment_user">
                    <view class="user_icon">
                        <!-- 头像 -->
                        <img :src="item.cover" alt="">
                    </view>
                    <view class="name">
                        <view class="user_nickname">{{item.name}}</view> 
                        <view class="user_time">发布时间：{{newTime}}</view> 
                    </view>
                    <view class="userBadge">
                        <!-- 点赞数 -->
                        <text class="iconfont icondianzan">99</text>
                    </view>
                </view>
                   
                <view class="comment_desc"> 
                    <view class="comment_content">
                        <text >
                           {{item.content}}
                        </text>
                    </view>
                </view>
            </view>


        </view>
    </view>

    <!-- 下载图片 -->
    <view class="download">
        <view class="download_btn" @click="download">
            下载图片
        </view>
    </view>



</view>
</template>

<script>

   import moment  from "moment"
   //设置moent 的语言为中文
   moment.locale("zh-cn")

   import {swiperAction} from "@/components/swiperAction"



export default {
    data() {
        return {
            //包含用户头像等信息
           imgDetail:{},
           album:[],//专辑数据，数组
           hot:[],//热门评论
           commeten:[],//最新评论
           hotTime:"",//热门评论发布时间
           newTime:"",//最新评论发布时间
           //图片的索引
           imgIndex:0,

           //自己定义的假数据，因为没有接口数据，所以先自己写。
           hotComment:[
               {
               name:"黑胡子",
               content:"人们的梦想，是不会结束的!",
               cover:"https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=686421209,1755635822&fm=26&gp=0.jpg"
               },
               {
               name:"多佛朗明哥",
               content:"海贼是邪恶？海军是正义？那种观念早已被改写过无数次了。不知何为和平的小鬼们和不知何为战争的小鬼们的价值观是不同的。只有立于顶点之人才可以定义善恶。现在这个地方就是中立的。正义会获胜？那是当然的了，只有胜者才是正义！",
               cover:"https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=553997264,3213965334&fm=26&gp=0.jpg"
               }
           ],
           newComment:[
               {
               name:"雷利",
               content:"也许这个世界上并没有偶然，有的只是必然，”缘“不紧不慢地悄然形成，不知所措才是人生。每个人来到这个世界上都有他特定的使命，也许并不是所有的事情都是偶然，在未知的未来中探索才是最值得我们应该追求的。！",
               cover:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3296904571,3917182969&fm=26&gp=0.jpg"
               },
              {
               name:"沙克洛克·达尔",
               content:"所谓理想，只是同时拥有实力的人才能说的现实。",
               cover:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597170850137&di=cd625876924ef3415cf0ac382165a901&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140221%2Fbki-20140221044007-1150730494.jpg"
               }
           ]
        };
    },

    methods: {
        //需要一个索引值去执行该方法，之后获取页面信息后渲染出来
       getComments(id){
           this.request({
               url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`,
           })
           .then(res=>{
            //    console.log(res);
                this.album = res.res.album
                this.hot = res.res.hot
                this.commeten = res.res.commeten

                this.hotTime = moment(1597129239000).fromNow()
                this.newTime = moment(1597129239000).fromNow()
            
               
           })
       },

       //滑动事件
       swiperAction(e){
        //    console.log(e);//可以从 e 当中获取用户滑动的方向
        // 1.用户左滑，下一页，imgIndex 索引 ++
        // 2.用户右滑，上一页，imgIndex 索引 --
        // 3.判断数组是否到达最后最前一张
        // 4.当左滑（下一页）时, e.direction === "left", this.imgIndex<imgList.length-1
        // 5.当右滑（上一页）时, e.direction === "right", this.imgIndex>0

        const {imgList} = getApp().globalData

        if(e.direction === "left"&&this.imgIndex<imgList.length-1){
            //左滑，下一页
            this.imgIndex++
            this.getData()
        }else if(e.direction === "right"&&this.imgIndex>0){
            //右滑动，上一页
            this.imgIndex--
            this.getData()
        }else{
            uni.showToast({
                title: '没有数据了',
                icon: 'none',
            });
        }


           
       },

       //给当前页面赋值
        getData(){//最后再拿到id值后传参id值去调用 getComments方法重新获取页面信息。

           const {imgList} = getApp().globalData

            //给当前页面赋值，获得当前图片的对象形式（时间图片等信息）
            this.imgDetail = imgList[this.imgIndex]
            this.imgDetail.newThumb = this.imgDetail.img+this.imgDetail.rule.replace('$<Height>',360)

            //时间格式化的操作
            //this.imgDetail.atime 的时间单位是秒，而moment 计算时间的单位是毫秒，所以需要*1000 换算成毫秒
            this.imgDetail.cnTime = moment(this.imgDetail.atime*1000).fromNow()
            
            //获取图片详情的id
            this.getComments(this.imgDetail.id)
        },

        //下载图片
        async download(){
            // uni.downloadFile
            // uni.saveImageToPhotosAlbum

            //0.提示用户下载中
            await uni.showLoading({
                title: '下载中'
            });

         // 1.将远程文件下载到小程序的内存中(就是临时目录)
          let download = await  uni.downloadFile({ url: this.imgDetail.img  })
          const tempFilePath = download[1]
         //  2.将小程序内存中的临时文件下载到系统磁盘中
            const result2 = await uni.saveImageToPhotosAlbum({ filePath: download.tempFilePath });
            // console.log(result2);
         
         //0.提示用户下载中
         uni.hideLoading();

         //3.提示用户下载成功
           await uni.showToast({
                title: '下载成功',
                duration: 1000
            });
        }

    },

    components:{
        swiperAction
    },

    onLoad(){
        // console.log(getApp().globalData);
        const {imgIndex} = getApp().globalData

        this.imgIndex = imgIndex//图片的索引值

        this.getData()
        
        
    },

   
    }
</script>


<style scoped lang="scss">

    //作者信息，头像名称，发布时间
    .user_info{
        display: flex;
        padding:20rpx;

        .user_icon{
            padding: 0 20rpx;

            img{
                width: 88rpx;
                border-radius: 50%;
            }

        }

        .user_desc{
            padding-left: 15rpx;

            .user_name{
                color:#000;
                font-weight: 580;

            }
            .user_time{
                color: darkgray;    
                padding: 10rpx 0;
            }

        }
    }

    //高清图片的展示
    .high_img{
            display: flex;
            justify-content: center;
            align-items: center;
            margin:15rpx 0;
        .high_img_show{
            width:670rpx;
            
        }
    }
    

    //点赞收藏
    .user_rank{
        display: flex;
        height: 80rpx;
        color: #000;
        border-bottom:5rpx solid #eee;
        border-top:5rpx solid #eee;

        .rank{
            flex: 1;

            display: flex;
            // 水平居中
            justify-content: center;
            // 垂直居中
            align-items: center;

            text{

            }
        }

        .collect{
            flex:1;
            display: flex;
            // 水平居中
            justify-content: center;
            // 垂直居中
            align-items: center;

            text{

            }
        }
    }

    //专辑
    .album_wrap{
        padding: 20rpx;
        border-bottom:8rpx solid #eee;


        .album_title{
            padding-top: 10rpx 0;

        }
        .album_list{

            .item{
                display: flex;
                padding: 10rpx 0;
                .album_cover{
                    flex: 1;

                    img{
                        width: 174rpx;
                        height: 102rpx;;
                    }
                }

                .album_info{
                    flex:3;
                    padding-left: 20rpx;
                    position: relative;

                    .album_info_text{
                        width: 100rpx;
                        height: 50rp;
                        color: #fff;
                        background-color: $color;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                    }
                    .album_info_name{
                        padding: 10rpx 0;
                        color: #888;

                    }
                    .iconfont{
                        font-size: 40rpx;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        right: 30rpx;
                        color: #000;
                    }
                }
            }
        }
        
    }

    //最热评论
   .comment_hot{
       padding: 10rpx 15rpx;

       .hot_title{
           padding: 15rpx;

            .iconfont{
                color: red;
                font-size: 36rpx;
            }
            .hot_text{  
                font-weight: 600;
                font-size: 36rpx;
                color:#666;
                margin-left: 10rpx;
            }
       }
       .hot_list{


           .comment_item{
               border-bottom: 8rpx solid #ededed;
               padding-top: 25rpx;
               
               //用户信息
               .comment_user{
                    display: flex;
                   .user_icon{
                       width: 15%;
                       display: flex;
                       align-items: center;
                       justify-content: center;
                       img{
                        width: 90%;
                        height: 70rpx;
                       }
                   }
                   .name{
                       flex: 1;
                       .user_nickname{
                        color:$color;
                        font-weight: 600;
                       }
                       .user_time{
                           color: #ccc;
                           font-size: 24rpx;
                           padding: 5rpx;
                       }
                   }
                   .userBadge{
                       padding-left: 8rpx;
                       img{
                        width: 40rpx;
                        height: 40rpx;
                       }
                   }
               }

                //用户评论
               .comment_desc{
                   display: flex;
                   padding: 20rpx 0;

                   .comment_content{
                       flex: 1;
                       padding-left: 15%;
                       color: #000;
                       font-weight: 600;
                       text{

                       }
                   }
               }
           }
       }
   }
   
  
    //最新评论
   .comment_new{
       padding: 10rpx 15rpx;

       .new_title{
           padding: 15rpx;

            .iconfont{
                color: red;
                font-size: 36rpx;
            }
            .new_text{  
                font-weight: 600;
                font-size: 36rpx;
                color:#666;
                margin-left: 10rpx;
            }
       }
       .new_list{


           .comment_item{
               border-bottom: 8rpx solid #ededed;
               padding-top: 20rpx;
               
               //用户信息
               .comment_user{
                    display: flex;
                   .user_icon{
                       width: 15%;
                       display: flex;
                       align-items: center;
                       justify-content: center;
                       img{
                        width: 90%;
                        height: 70rpx;
                       }
                   }
                   .name{
                       flex: 1;
                       .user_nickname{
                        color:$color;
                        font-weight: 600;
                       }
                       .user_time{
                           color: #ccc;
                           font-size: 24rpx;
                           padding: 5rpx;
                       }
                   }
                   .userBadge{
                       padding-left: 8rpx;
                       img{
                        width: 40rpx;
                        height: 40rpx;
                       }
                   }
               }

                //用户评论
               .comment_desc{
                   display: flex;
                   padding: 20rpx 0;

                   .comment_content{
                       flex: 1;
                       padding-left: 15%;
                       color: #000;
                       font-weight: 600;
                       text{

                       }
                   }
               }
           }
       }
   }

    //下载图片
    .download{
        height: 120rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .download_btn{
            width: 90%;
            height: 85%;
            color:#FFF;
            background-color: $color;
            font-size:45rpx;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }




</style>