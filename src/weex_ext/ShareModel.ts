/**
 * 自定义videoPlayer 保存对象
 * Created by wuxp on 2017/6/6.
 */
import {weexModule} from "typescript_api_sdk/src/utils/ExportWeexSdkModel.js";

if (weexModule.config.env.platform.toLowerCase() === 'web') {

    const share = {
        /**
         *
         * @param type     分享平台
         * @param content  分享内容
         * @param succ     成功回调
         * @param error    失败回调
         */
        shareSignPlatform(type,content,succ,error){
            console.log("web端暂不支持");
        }
    };
    console.log("注册自定义模块 share");
    weexModule.registerModule('share', share);
}