export default (params)=>{

    //加载中
    uni.showLoading({
        title: "加载中",
        mask: true,
    })

    return new Promise((resolve,reject)=>{
        
        uni.request({
            ...params,

            success(res){
                resolve(res.data)
            },
            fail(error){
                reject(error)
            },

            complete(){
                uni.hideLoading()
            }

        });


    })
}












