<template>

    <view class="" hover-class="none" hover-stop-propagation="false">
        最新
    </view>

</template>

<script>



    export default {
      
        mounted(){
            //修改页面的标题
            uni.setNavigationBarTitle({
                title: '最新',
            });
        }

    }
</script>


<style scoped>



</style>