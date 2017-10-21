/**
 * 自定义photo
 * Created by wuxp on 2017/6/6.
 */
if (weex.config.env.platform.toLowerCase() === 'web') {

    const photoModal={
        captureImage(){
            console.log("web端暂不支持");
        },
        /**
         *
         * @param urls 图片url 数组
         * @param index 当前显示下标
         * @param succ
         * @param error
         */
        showAtlas(urls,index,succ=()=>{},error=()=>{}){
            console.log("web端暂不支持");
        }
    };
    console.log("注册自定义模块 photo");
    weex.registerModule('photo', photoModal);
}