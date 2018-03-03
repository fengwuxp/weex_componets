import {weexModule} from "typescript_api_sdk/src/utils/ExportWeexSdkModel.js";

import "../weex_ext/WeiXinPayModel";
import "../weex_ext/ALiPayModel";
import "../weex_ext/ShareModel";
import "../weex_ext/WheelPickerModel";
import "../weex_ext/UMengAnalyticalModule";

const aliPay = weexModule.requireModule("aliPay");
const weixinPay = weexModule.requireModule("weixinPay");
const share = weexModule.requireModule("share");
const wheelPicker = weexModule.requireModule("wheelPicker");
const umeng = weexModule.requireModule("umeng");

export {
    aliPay,
    weixinPay,
    share,
    wheelPicker,
    umeng
};