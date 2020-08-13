<template>
<view class="container">
        
    <navigator class="cate_item"
        v-for="item in category"
        :key="item.id"
        :url="`/pages/imgCategory/imgCategory?id=${item.id}`"
     >
        <img :src="item.cover" mode="aspectFill" alt="" >
        <view class="cate_name">{{item.name}}</view>
    </navigator>

</view>
</template>

<script>



    export default {

        data(){
            return {
                category:[]
            }
        },


        methods:{
            getList(){
                this.request({
                    url:"http://157.122.54.189:9088/image/v1/vertical/category"
                })
                .then(res=>{
                    this.category = res.res.category
                    
                })
            }
        },
        


        
        //组件加载完毕时触发的事件
        mounted(){
            //修改页面的标题
            uni.setNavigationBarTitle({
                title: '分类',
            });
            this.getList()


        }

    }
</script>


<style scoped lang="scss">


    .container{
        display: flex;
        flex-wrap: wrap;

        .cate_item{
            // display: flex;
            width: 33.33%;
            border:5rpx solid #fff;
            position: relative;

            img{
                // 固定高度，然后完整填充图片，完成显示图片
                height: 240rpx;

            }
            .cate_name{
                position: absolute;
                width: 100%;
                height: 50rpx;
                bottom:0;
                left:0;
                font-size: 30rpx;
                font-weight: 570;
                color:#fff;

                display: flex;
                align-items: center;
                padding-left: 20rpx;

                // css3的渐变，文字后面有一层白色渐变色背景
                background-image: linear-gradient(to right top,rgba(0,0,0,.3),rgba(0,0,0,0));

            }
        }

    }


</style>