import {InAppPay, PermissionCheck} from "./index";


const inAppPay: InAppPay = weex.requireModule<InAppPay>("inAppPay");

const permissionCheck: PermissionCheck = weex.requireModule<PermissionCheck>("permissionCheck") ;
export {
    inAppPay,
    permissionCheck
}
