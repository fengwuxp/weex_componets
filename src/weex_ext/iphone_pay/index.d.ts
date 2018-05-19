/**
 * ios支付订单类型
 */
import {WeexModule} from "weex";

export interface IphonePayOrder {
    order_sn: string;
    member_id: string;
    product_id: string
}


/**
 * ios 支付
 */
export interface InAppPay extends WeexModule{

    // 返回：Map={result:"",result_desc:""}
// //参数不正确
// #define IAP_ERR_INPUT_PARAMS @"-95"
// //支付校验失败
// #define IAP_ERR_VERIFY @"-96"
// //产品无效
// #define IAP_ERR_PRODUCT_INVALID @"-97"
// //从AppStore请求产品信息失败
// #define IAP_ERR_PRODUCT @"-98"
// //缓存订单失败
// #define IAP_ERR_CACHE @"-99"
// //支付失败
// #define IAP_ERR_TRANSCATION @"-1"
// //支付成功
// #define IAP_OK_VERIFY @"0"

    /**
     * 支付
     * @param {IphonePayOrder} order 订单信息
     * @param {Function} callback
     */
    inAppPurchases(order: IphonePayOrder, callback: Function): void;
}

/**
 * 权限检查
 */
export interface PermissionCheck extends WeexModule{
    /**
     * 是否有通知权限
     * @param {Function} callback 回调是会传入 boolean结果
     */
    hasAPNS(callback: Function): void;

    /**
     * 跳转设置界面
     * @param {Function} succ 成功回调
     * @param {Function} error 失败回调
     */
    settingAPNS(succ: Function, error: Function): void;
}

