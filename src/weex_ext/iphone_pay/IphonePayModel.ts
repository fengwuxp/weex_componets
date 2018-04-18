import {InAppPay, PermissionCheck} from "./index";


const inAppPay: InAppPay = weex.requireModule("inAppPay");

const permissionCheck: PermissionCheck = weex.requireModule("permissionCheck");

export {
    inAppPay,
    permissionCheck
}
