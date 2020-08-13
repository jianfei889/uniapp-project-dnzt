<template>
<view>

    <view class='container'
        @touchstart="touchStart"
        @touchend="touchEnd"
     >
        触屏事件
    </view>

</view>
</template>

<script>

/* 
    1.给容器绑定两个事件，touchstart，touchstart
    2.用户按下屏幕事件
        1.记录用户按下屏幕的时间， Date.now() ，返回的是一个时间戳 ，为：1970-1-1 到现在的毫秒数
        2.记录用户按下屏幕的横纵坐标，
    3.用户离开屏幕事件
        1.记录用户离开屏幕的时间 Date.now()
        2.记录用户离开屏幕的坐标 下，y
        3.根据两个时间，做运算判断用户按下屏幕时长是否合法
        4.根据两对坐标 ，判断距离是否合法。（合法：判断滑动的方向，不合法：return不再往下执行）
*/
   

export default {
    data() {
        return {
           //按下的时间
           startTime:0,
           startX:0,
           startY:0,
           endTime:0,
           endX:0,
           endY:0,
        };
    },

    methods: {
        //2.用户按下屏幕事件
       touchStart(event){
        //    console.log("手指按下开始");
        //    console.log(event.changedTouches[0].clientX);
        //    console.log(event.changedTouches[0].clientY);
           
           this.startTime = Date.now()  //记录用户按下屏幕的时间， Date.now() ，返回的是一个时间戳 ，为：1970-1-1 到现在的毫秒数
           this.startX = event.changedTouches[0].clientX
           this.startY = event.changedTouches[0].clientY
           

       },
       touchEnd(event){
        //    console.log("按下结束");
        //    console.log(event.changedTouches[0].clientX);
        //    console.log(event.changedTouches[0].clientY);

        this.endTime = Date.now()   //记录用户按下屏幕的时间， Date.now() ，返回的是一个时间戳 ，为：1970-1-1 到现在的毫秒数
        this.endX = event.changedTouches[0].clientX
        this.endY = event.changedTouches[0].clientY

        //根据两个时间，做运算判断用户按下屏幕时长是否合法
        if(this.endTime - this.startTime>1000){
            return
        }

        let direction = ""

        //根据两对坐标 ，判断距离是否合法。（合法：判断滑动的方向，不合法：return不再往下执行）
        //距离要加上绝对值
        if(Math.abs(this.endX-this.startX)>10){
            //滑动方向的判断
            direction = this.endX-this.startX>0?'right':"left"
        }else{
            return
        }

        //加入用户通过层层操作筛选后到了这里。那么就是操作合法。可以下一步执行
        console.log(direction);
        



       }


    },

    components:{
        
    },


    }
</script>


<style scoped lang="scss">

    .container{
        width: 100%;
        height: 500rpx;
        background-color: cyan;
    }
   

</style>