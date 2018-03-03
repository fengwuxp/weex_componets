import {InAppPay, PermissionCheck} from "./index";
import {weexModule} from "typescript_api_sdk/src/utils/ExportWeexSdkModel.js";


const inAppPay: InAppPay = weexModule.requireModule("inAppPay");

const permissionCheck: PermissionCheck = weexModule.requireModule("permissionCheck");

export {
    inAppPay,
    permissionCheck
}