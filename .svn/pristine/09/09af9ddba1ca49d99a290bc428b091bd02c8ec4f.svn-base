/**
 * Created by wuxp on 2017/6/18.
 */
/**
 * 自定义cache 保存对象
 * Created by wuxp on 2017/6/6.
 */
if (weex.config.env.platform.toLowerCase() === 'web') {
    const imageWeexModal = {
        loadImageInfo(url="",width=0,succ=()=>{

        },error=()=>{

        }){
            console.log("web环境暂不支持 imageLoader");
            // if(width===0||url.trim().length===0){
            //     return;
            // }
            // succ();
        }
    };
    console.log("注册自定义模块 image");
    weex.registerModule('image', imageWeexModal);
}