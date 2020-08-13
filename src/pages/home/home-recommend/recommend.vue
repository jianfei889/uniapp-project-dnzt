<template>
<scroll-view scroll-y class="recommend_scroll" @scrolltolower="tolower" v-if="recommends.length>0">
    
    <!-- 推荐，图片 -->
    <view class="recommend_wrap" >
        <navigator class="recommend_item"
            v-for="item in recommends"
            :key="item.id"
            :url="`/pages/album/album?id=${item.target}`"
         >
         
         <!-- url="/pages/album/album?id=5e5cf679e7bce739db1281e4" -->
            <image class="" :src="item.thumb"  mode="widthFix"></image>
        </navigator>
    </view>

    <!-- 标题 -->
    <view class="month_wrap"> 
       <view class="month_title">
           <view class="title_left">
               <view class="left_month">
                   <text >{{monthes.DD}}</text>
                    &nbsp;/{{monthes.MM}} 月
               </view>
               <view class="left_text">
                   {{monthes.title}}
               </view>
           </view>
           <view class="title_right">更多></view>
       </view>
    </view>
    

    <!-- 内容 -->
    <view class="content">
        <view class="item"
        v-for="(item,index) in monthes.items"
        :key="item.id"
         >  
            <go-detail :list="monthes.items" :index="index">
                <img :src="item.thumb+item.rule.replace('$<Height>',360)" alt="" mode="aspectFill">
            </go-detail>
            
        </view>
    </view>
    
    <!-- 热门 -->
    <view class='hots_wrap'>
        <view class='hots_title'>
            <text >热门</text>
        </view>
        <view class='hots_content'>
            <view class='hot_item'
                v-for="(item,index) in hots"
                :key="item.id"
             >
                <go-detail :list="hots" :index="index">
                    <img :src="item.thumb" mode="widthFix" alt="">
                </go-detail>
            </view>
        </view>
    </view>




</scroll-view>
</template>

<script>

import moment from "moment"
import goDetail from "../../../components/goDetail"

    export default {

        data(){
            return({
                recommends:[],//推荐
                monthes:{},//标题+内容
                hots:[],
                params:{//请求的参数
                    limit:12,
                    order:"hot",
                    skip:0
                },
                hasMore:true,//是否还有下一页数据

            })
        },
        components:{
            goDetail
        },
      
      mounted(){
           
         this.getList()
            //修改页面的标题
            uni.setNavigationBarTitle({
                title: '推荐',
            });

      },


      methods:{
          getList(){
            this.request({
                url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
                data: this.params
            })
            .then(res=>{
                

                //判断还有没有下一页数据
                    if(res.res.vertical.length===0){
                        this.hasMore = false
                        return 
                    }

                //banner 和 title month 是只需要执行一次就获得而且不会变化的。
                    //所以只需要执行一次就可以。多次执行会消耗性能
                    //这里可以判断 banner 的 推荐 是否有数据长度来执行。
                if(this.recommends.length===0){
                    //推荐
                    this.recommends = res.res.homepage[1].items

                    // console.log(res.res.homepage[1].items);
                    

                    // 月份
                    this.monthes = res.res.homepage[2]
                    this.monthes.MM = moment(this.monthes.stime).format("MM")
                    this.monthes.DD = moment(this.monthes.stime).format("DD")

                }

                //获取热门数据列表
                    // this.hots = res.res.vertical

                // 滑动到底部翻页时，新旧数据叠加
                this.hots = [...this.hots,...res.res.vertical] 
                

            })
          
          },

          tolower(){
              /* 
                1. 当滑动条触底时，修改参数，skit+=limit 
                  skit = (第一页时跳过0条数据。第二页时跳过前面的30条。第三页时跳过60条)
                2. 重新发送请求，gtList()
                3. 请求回来后，hots 获得的数据应该叠加起来。
              */
             

            if(this.hasMore){
                console.log('下一页');
                
                this.params.skip+=this.params.limit
                
                this.getList()
             }else{
                 //没有下一页时，弹窗提示用户
                 uni.showToast({
                     title: '没有下一页数据了',
                     icon: 'none'
                 })
             }
             
          }

      }


    }
</script>


<style lang="scss" scoped>


    .recommend_scroll{
        height: calc(100vh - 9.6vw);
    }


    //推荐板块
    .recommend_wrap{
        display: flex;
        flex-wrap: wrap;

        .recommend_item{
            width: 50%;
            border:5rpx solid #fff;
        }
    }

    //标题
    .month_wrap{
        padding: 20rpx 15rpx 20rpx 15rpx;

        .month_title{
            display: flex;
            justify-content: space-between;

            .title_left{
                display: flex;
                

                .left_month{
                    color:$color;
                    font-size:30rpx;

                    text{
                        font-size:47rpx;
                        font-weight: 560;
                    }
                }
                .left_text{
                    font-size: 34rpx;
                    padding-left: 18rpx;
                    font-weight: 560;
                    padding-top:8rpx;
                }

            }
            .title_right{
                color:$color;
                font-size: 38rpx;
                font-weight: 560;
            }

        }


    }

    //内容
    .content{
        display: flex;
        flex-wrap: wrap;

        .item{
            width: 33.3%;
            border:5rpx solid #fff;
        }

    }
    
    //热门
    .hots_wrap{

        .hots_title{
            padding:18rpx 12rpx;

            text{
                font-size:38rpx;
                font-weight: 580;
                color: $color;
                border-left:8rpx solid $color;
                padding-left: 20rpx;
            }

        }

        .hots_content{
            display: flex;
            flex-wrap: wrap;

            .hot_item{
                width: 33.33%;
                border:5rpx solid #fff;

                img{

                }
            }

        }
    }

    



</style>



