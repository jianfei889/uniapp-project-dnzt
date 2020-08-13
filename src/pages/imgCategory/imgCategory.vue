<template>
<view>

    <view class="imgCategory_wrap">
        
        <view class="home_tab">

            <!-- 顶部导航栏标题，包括搜索图标 -->
            <view class="home_tab_title">
                <view class="title_inner">
                    <uni-segmented-control :current="current" :values="items.map(v=>v.title)" @clickItem="onClickItem" style-type="text" active-color="#ff6700"></uni-segmented-control>
                </view>
                <view class="iconfont iconsearch"></view>
            </view>

            <!-- 内容 -->
            <!-- 在弹性盒子上使用 scroll-view 需要设置 enable-flex 属性以使 flex 布局生效。  -->
            <scroll-view enable-flex scroll-y 
                class="home_tab_content"
                @scrolltolower="handleScrollToLower"
             >
                <view class="cate_item"
                    v-for="item in data"
                    :key="item.id"
                 >
                    <img :src="item.thumb" alt="" mode="widthFix">
                </view>
            </scroll-view >

        </view>
        

    </view>

</view>
</template>

<script>

import {uniSegmentedControl} from "@dcloudio/uni-ui"


export default {
    data() {
        return {
            items: [
                {title:"最新",order:"new"},
                {title:"热门",order:"hot"}
            ],
            current: 0,
            params:{
                limit:30,
                skip:0,
                order:'new'
            },
            id:0,
            data:[],//页面显示信息
            hasMore:true
           
        };
    },

    methods: {
        //分段器，点击选中事件，点击切换tab标题之后重新发送请求获取并渲染数据
        onClickItem(e) {

            /* 
            1.点击标题时，切换标题
            2.根据被点击的标题去切换order 分类排序（也就是tab栏内容）
            3.重新发送请求
            [ 注 ] e.currentIndex 为点击的元素的索引
            */
           if (this.current !== e.currentIndex) {
               //如果点击切换tab栏时，把tab栏的选中换成另一个
               this.current = e.currentIndex;
            }else{
                //如果点击的是已经选中的标题时，什么事都不用做
                return 
            }

            // e.currentIndex 为被点击的tab 标题
           this.params.order = this.items[e.currentIndex].order
           this.params.skip = 0//点击切换tab栏时把原本tab栏的skip值清空为零，原本的skip不带去新的skip中
           this.data = []//因为原本的tab栏与新的tab栏公用一个数据，所以切换时清空之前的再赋值新的数据
           this.getList()

        },

        getList(){
            this.request({
                url:`http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
                data:this.params
            })
            .then(res=>{
                // console.log(res);
                if(res.res.vertical.length===0){
                    this.hasMore = false
                    uni.showToast({
                        title: '暂且没有更多数据了！',
                        icon:"none"
                    });
                    return
                }
                this.data = [...this.data,...res.res.vertical]
                
            })
        },

        //加载下一页数据
        handleScrollToLower(){
            //需要在 hasMore 为 true 的情况下才能加载下一页
            if(this.hasMore){
                this.params.skip+=this.params.limit
                this.getList()
            }else{
                uni.showToast({
                    title: '没有更多数据了',
                    icon:"none"
                });
            }
        }
       
        
    },

    onLoad(options){
        this.id = options.id
        this.getList()
    },

    components:{
        uniSegmentedControl
    },


    }
</script>


<style scoped  lang="scss">

     .home_tab{
        

        .home_tab_title{
            position: relative;

            .title_inner{
                width: 60%;
                margin: 0 auto;
            }
            .iconsearch{
                position: absolute;
                top:50%;
                transform: translateY(-50%);
                right:5%;
            }
            
        }

        .home_tab_content{
            display: flex;
            flex-wrap: wrap;
            //
            height: calc(100vh - 36px);

            .cate_item{
                width: 33.3%;
                border: 5rpx solid #FFF;

            }
        }   

    }
   

</style>