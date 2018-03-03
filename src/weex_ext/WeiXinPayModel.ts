/**
 * 自定义videoPlayer 保存对象
 * Created by wuxp on 2017/6/6.
 */
import {weexModule} from "typescript_api_sdk/src/utils/ExportWeexSdkModel.js";

if (weexModule.config.env.platform.toLowerCase() === 'web') {

    const weixinPay = {
        pay() {
            console.log("web端暂不支持");
        }
    };
    console.log("注册自定义模块 weixinPay");
    weexModule.registerModule('weixinPay', weixinPay);
}