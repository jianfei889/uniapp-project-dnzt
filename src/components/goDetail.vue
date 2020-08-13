<template>
<view>

    <view class='' @click="handleClick">
        <slot></slot>
    </view>

</view>
</template>

<script>


export default {
    data() {
        return {
           
        };
    },

    methods: {
       handleClick(){
           // 1.将数据缓存下拉
           getApp().globalData.imgList = this.list
           getApp().globalData.imgIndex = this.index
            //2.实现点击跳转页面
            uni.navigateTo({
                url: '/pages/imgDetail/imgDetail',
            })

        }
    },

    props:[
        'list','index'
    ]

    
    


    }
</script>


<style scoped>

   

</style>