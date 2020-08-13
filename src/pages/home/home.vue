<template>
    <view class="container" >
        

        <view class="home_tab">

            <!-- 顶部导航栏标题，包括搜索图标 -->
            <view class="home_tab_title">
                <view class="title_inner">
                    <uni-segmented-control :current="current" :values="items.map(v=>v.title)" @clickItem="onClickItem" style-type="text" active-color="#ff6700"></uni-segmented-control>
                </view>
                <view class="iconfont iconsearch"></view>
            </view>

            <!-- 内容 -->
            <view class="home_tab_content">
                <view v-if="current === 0">
                    <recommend >  </recommend>
                </view>
                <view v-if="current === 1">
                    <category >  </category>
                </view>
                <view v-if="current === 2">
                    <homeNew >  </homeNew>
                </view>
                <view v-if="current === 3">
                    <album >  </album>
                </view>
            </view>

        </view>


        


    </view>

</template>

<script>


import album from "./home-album/album.vue"
import homeNew from "./home-new/homeNew.vue"
import category from "./home-category/category.vue"
import recommend from "./home-recommend/recommend.vue"


// import {uniBadge} from '@dcloudio/uni-ui'

import {uniSegmentedControl} from "@dcloudio/uni-ui"




export default {
    data() {
        return {
            items: [
                {title:"推荐"},
                {title:"分类"},
                {title:"最新"},
                {title:"专辑"},
            ],
            current: 0
        };
    },

    methods: {
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        }


    },

    components:{
        album,homeNew,category,recommend,
        // uniBadge
        uniSegmentedControl
    },

    onLoad(){

        /* this.request({
            url:"http://157.122.54.189:9088/image/v3/homepage/vertical"
        })
        .then(res=>{
            console.log(res.data);
        })*/
 









        // 1.原生小程序中的api使用方法
        /* wx.request({
            url:'http://157.122.54.189:9088/image/v3/homepage/vertical',
            success: (result)=>{
                console.log(result);
            }
        }); */
        
        //uni-api
        /* uni.request({
            url:'http://157.122.54.189:9088/image/v3/homepage/vertical',
        })
        .then(res=>{
            console.log(res);
            
        }) */
     


    }


    }
</script>


<style lang="scss" scoped>

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


    }
   

</style>