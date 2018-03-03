import {supportUMeng} from "../../utils/NativeSupportUtils";
import {umeng} from "../../utils/WeexModelExt";
import {isNullOrUndefined, isString} from "util";

/**
 * 上报页面进入事件到友盟
 * @param {string} pageName
 */
const reportUMengByIntoPage = (pageName: string): void => {
    if (!supportUMeng()) {
        console.log("不支持友盟上报");
        return;
    }
    umeng.beginLogPageView(pageName);
};


/**
 * 上报页面销毁事件到友盟
 * @param {string} pageName
 */
const reportUMengByDestroy = (pageName: string): void => {
    if (!supportUMeng()) {
        console.log("不支持友盟上报");
        return;
    }
    umeng.endLogPageView(pageName);
};

/**
 * 上报自定义事件到友盟
 * @param eventId 事件id
 * @param param   参数
 */
const reportUMengByEvent = (eventId: string, param: string | object): void => {
    if (!supportUMeng()) {
        console.log("不支持友盟上报");
        return;
    }
    if (isNullOrUndefined((param))) {
        umeng.event(eventId);
        return;
    }
    if (isString(param)) {
        umeng.eventAndLabel(eventId, param);
        return;
    }
    umeng.eventAndMap(eventId, param);
};

/**
 * 上报new Account事件到友盟
 * @param {string} accountId
 */
const reportUMengByNewAccount = (accountId: string): void => {
    if (!supportUMeng()) {
        console.log("不支持友盟上报");
        return;
    }
    umeng.newAccount(accountId);
};

export {
    reportUMengByIntoPage,
    reportUMengByDestroy,
    reportUMengByEvent,
    reportUMengByNewAccount
}