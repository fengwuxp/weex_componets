if (process.env.IS_WEB) {
    require("../weex_ext/WeiXinPayModel");
    require("../weex_ext/ALiPayModel");
    require("../weex_ext/ShareModel");
    require("../weex_ext/WheelPickerModel");
    require("../weex_ext/UMengAnalyticalModule");
}

const aliPay = weex.requireModule("aliPay");
const weixinPay = weex.requireModule("weixinPay");
const share = weex.requireModule("share");
const wheelPicker = weex.requireModule("wheelPicker");
const umeng = weex.requireModule("umeng");

export {
    aliPay,
    weixinPay,
    share,
    wheelPicker,
    umeng
};
