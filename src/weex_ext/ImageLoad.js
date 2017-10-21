/**
 * Created by wuxp on 2017/6/18.
 */
/**
 * 自定义cache 保存对象
 * Created by wuxp on 2017/6/6.
 */
if (weex.config.env.platform.toLowerCase() === 'web') {
    const imageWeexModal = {

        /**
         * 加载图片信息
         * @param url 图片url
         * @param width 预期图片宽度
         * @param succ 成功回调
         * @param error 失败回调
         */
        loadImageInfo(url = "", width = -1, succ = () => {

        }, error = () => {

        }) {
            //console.log("web环境暂不支持 imageLoader");
            // if(width===0||url.trim().length===0){
            //     return;
            // }
            succ({reqWidth: width, reqHeight: Math.round(Math.random() * width + 500)});
        }
    };
    console.log("注册自定义模块 image");
    weex.registerModule('image', imageWeexModal);
}