import {isWeb} from "typescript_api_sdk/src/utils/WeexEnvUtil";


/**
 * 自定义videoPlayer 保存对象
 * Created by wuxp on 2017/6/6.
 */

if (isWeb()) {

    const aliPay = {
        pay() {
            console.log("web端暂不支持");
        },
        auth() {
            console.log("web端暂不支持");
        }
    };
    console.log("注册自定义模块 aliPay");
    weex.registerModule('aliPay', aliPay);
}
