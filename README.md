# uniapp-project

## Project setup
```
npm install
```


# 要点笔记
1.  将时间戳改为距离现在多少天多少年
```import moment  from "moment"
    moment.locale("zh-cn")//设置moent 的语言为中文
    let time = moment(1596522654000).fromNow()
    console.log(time);//输出多少天/月/年 前
```

2. 将时间戳改为 年月日 
```
    let month = moment(这里输入时间戳).format("MM")
    let day = moment(这里输入时间戳).format("DD")
    //得到一个月份，一个日（就是时间戳的日期是多少号）
```
3. aspectFill 图片尺寸渲染模式
```
    mode="aspectFill"
    height: 240rpx;//固定高度，然后完整填充图片，完整显示图片
```
4. ```onLoad(options)``` 页面参数获取
    页面加载完毕时，options 参数包含当前页面的id值等相关信息

5. ```height: calc(100vh - 36px);```
    需要注意的是这里的减号两边需要空格空出来才能生效

6. 在弹性盒子上使用 scroll-view 需要添加 enable-flex 属性以使 flex 布局生效。 

7. 在video中，因为视频的尺寸会有一定的宽高，所以视频在播放时会有一个等比例的拉伸
    当容器比视频的比例较大时，容器与video标签会有一段空白的距离。
    这里情况的解决办法为：在video标签中添加属性和值即可
    ```objectFit =" fill " ```，翻译为：对象适合：填充完整


## 2020-8-13，23：56,整套课程、项目学习编写完毕。




