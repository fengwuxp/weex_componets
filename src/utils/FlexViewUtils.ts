import {isIos, isIphoneX} from "typescript_api_sdk/src/utils/WeexEnvUtil";

/**
 * ios 顶部高度
 * @type {number}
 */
const IOS_TOP_HEIGHT: number = 32;

/**
 * iphonex 顶部高度
 * @type {number}
 */
const IPHONEX_TOP_HEIGHT: number = 52;

/**
 * iphonex 底部需要增加的高度
 * @type {number}
 */
const IPHONEX_BOTTOM_HEIGHT: number = 68;

/**
 * 默认顶部高度
 * @type {number}
 */
const DEFAULT_HEADER_HEIGHT: number = 100;

/**
 * 默认底部高度
 * @type {number}
 */
const DEFAULT_FOOTER_HEIGHT: number = 83;


/**
 * 获取 iphone x的页面底部样式
 * @param height 底部高度
 * @return {*}
 */
const getViewFooterStyle = (height: number = DEFAULT_FOOTER_HEIGHT): Object => {
    let style: any = {height: height + 'px'};
    if (isIphoneX()) {
        //iphone x
        style.height = (height + IPHONEX_BOTTOM_HEIGHT) + 'px';
        style.paddingBottom = IPHONEX_BOTTOM_HEIGHT + "px";
        console.log("iphone x bottom padding-bottom --> " + IPHONEX_BOTTOM_HEIGHT);
    }
    return style;
};

/**
 * 获取页面头部高度
 * @return {number}
 */
const getViewHeaderHeight = (): number => {
    let height = DEFAULT_HEADER_HEIGHT;
    if (isIos()) {
        if (isIphoneX()) {
            //iphone x
            height += IPHONEX_TOP_HEIGHT;
            console.log("iphone x  header height--> " + height);
        } else {
            height += IOS_TOP_HEIGHT;
        }
    }
    return height;
};

/**
 * 获取ios顶部高度
 * @return {number}
 */
const getIosTopHeight = (): number => {
    if (!isIos()) {
        return 0;
    }
    if (isIphoneX()) {
        return IPHONEX_TOP_HEIGHT;
    } else {
        return IOS_TOP_HEIGHT;
    }
};

export {
    DEFAULT_HEADER_HEIGHT,
    DEFAULT_FOOTER_HEIGHT,
    IOS_TOP_HEIGHT,
    IPHONEX_TOP_HEIGHT,
    IPHONEX_BOTTOM_HEIGHT,
    isIos,
    isIphoneX,
    getViewHeaderHeight,
    getViewFooterStyle,
    getIosTopHeight
}
