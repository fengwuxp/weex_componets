import {isNullOrUndefined, isString} from "util";
import {storage, modal, timer} from "typescript_api_sdk/src/utils/ExportWeexSdkModel";
import {cache} from "typescript_api_sdk/src/utils/ExpotrtWeexCustomModel";
import GlobalApiConfig from "typescript_api_sdk/src/config/GlobalAipConfig";
import {getViewHeaderHeight, DEFAULT_FOOTER_HEIGHT} from "./FlexViewUtils";
import StringToHexUtil from "typescript_api_sdk/src/codec/StringToHexUtil";
import {DEFAULT_PARAM_KEY_NAME} from "../mixins/ConstKey";
import {FlexViewConfig} from "../components/FlexViewConfig";
import commonUtils from "./CommonUtils";
import {WeexAlertOptions} from "weex/src/sdk/model/modal";
import "typescript_api_sdk/src/api/PromiseExt";

/**
 * 工具类
 */
class WeexUtils {

    constructor() {

    }


    /**
     * 获取js路径
     * @param {string} uri
     * @param {any} params 参数
     * @return {string} js url
     */
    getJSPath(uri: string = "", params: any = {}): string {
        let queryKeyword: string = "";
        for (let key in params) {
            queryKeyword += key + "=" + params[key] + "&"
        }
        if (queryKeyword.trim().length > 0) {
            queryKeyword = queryKeyword.substr(0, queryKeyword.length - 1);
            queryKeyword = StringToHexUtil.encode(queryKeyword);
            uri += ("?" + DEFAULT_PARAM_KEY_NAME + "=" + queryKeyword);
        }
        return this.getBasePath() + uri;
    }

    /**
     * 获取资源url路径
     * @param uri
     * @return {string} 资源url
     */
    getResourcesURL(uri: String): string {
        //return GlobalConfig.DOMAIN + uri + "?123";
        const basePath = this.getBasePath().replace(GlobalApiConfig.WEB_DEPLOYMENT_DIRECTORY + "/", "");
        return basePath + uri;//+ "?t_=" + new Date().getTime();
    }

    /**
     * 获取base path
     * @return {string} weexURL路径
     */
    getBasePath(): string {
        const bundleUrl = weex.config.bundleUrl;
        //console.log("-bundleUrl->"+bundleUrl);
        let nativeBase;
        let isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;
        let isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf(GlobalApiConfig.IOS_PROJECT_NAME) > 0;
        if (isAndroidAssets) {
            nativeBase = 'file://assets/js/';
        } else if (isiOSAssets) {
            nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf(GlobalApiConfig.IOS_PROJECT_NAME + '/')) + GlobalApiConfig.IOS_PROJECT_NAME + "/bundlejs/";
        } else {
            let host = GlobalApiConfig.BASE_DOMAIN + '/weex/' + GlobalApiConfig.WEB_DEPLOYMENT_DIRECTORY + '/';
            nativeBase = 'http://' + host;
        }

        return nativeBase;
    };

    /**
     * 获取页面配置
     * @param view
     */
    getViewConfig(view: FlexViewConfig = {}): FlexViewConfig {

        const config: FlexViewConfig = {
            bodyScroll: false,
            bodyPadding: true,
            bodyIsCenter: true,
            bodyBackgroundColor: "#f2f2f2",
            useHeader: true,
            useFooter: true,
            headerHeight: getViewHeaderHeight(),
            footerHeight: DEFAULT_FOOTER_HEIGHT,
            scrollerStyle: {flex: "1"}
        };

        return Object.assign(config, view);
    }


    /**
     * 移除对象
     * @param key
     */
    removeItem = (key: string): Promise<Function> => {
        return new Promise((resolve: Function = () => {
        }, reject: Function = () => {
        }) => {
            const result = cache.removeCache(key);
            if (key !== null) {
                resolve(result);
            } else {
                reject();
            }
        })
    };

    /**
     * 保证对象到storage中
     * @param key
     * @param data
     * @param expireTime
     * @param needExpireTime
     */
    setItem = (key: string, data: any, expireTime?: number, needExpireTime: boolean = false): Promise<Function> => {
        const self = this;
        return new Promise((resolve: Function = () => {
        }, reject: Function = () => {
        }) => {
            const store = {};
            if (commonUtils.isEmptyObject(data)) {
                data = "";
            }
            if (needExpireTime) {
                Object.assign(store, {
                    data: data,
                    expire: isNullOrUndefined(expireTime) ? null : self.getMaxExpireTime(expireTime) //超时时间
                });
            } else {
                Object.assign(store, {
                    data: data
                });
            }
            console.log("设置数据--> " + JSON.stringify(store));
            const result = cache.setCache(key, JSON.stringify(store));
            if (store !== null) {
                resolve(result);
            } else {
                reject();
            }
        });

    };

    /**
     * 获取storage 中的对象
     * @param key  获取存储值的key
     * @param verification 自定义验证方法
     * return {Promise}
     */
    getItem = (key: string, verification: Function = (): Boolean => {
        return true;
    }): Promise<Function> => {

        return new Promise(function (resolve: Function = () => {
        }, reject: Function = () => {
        }) {
            //console.log("--获取的key--> " + key);
            cache.getCache(key, (data) => {
                // console.log("获取到的数据--> " + isNullOrUndefined(data));
                if (commonUtils.isEmptyObject(data)) {
                    reject();
                    return;
                }
                let item = JSON.parse(data);
                //存在超时时间
                let existExpire: boolean = item.hasOwnProperty("expire");
                if (existExpire && item.expire < new Date().getTime()) {
                    //如果超时了 移除
                    storage.removeItem(key);
                    reject();
                    return;
                }

                if (item.hasOwnProperty("data") && existExpire && commonUtils.isEmptyObject(item.data)) {
                    reject();
                } else {
                    let result = item.data;
                    if (commonUtils.isEmptyObject(result)) {
                        result = item;
                    }
                    if (verification(result)) {
                        resolve(result);
                    } else {
                        reject();
                    }
                }


            });
        });
    };


    /**
     * toast
     * @param message  消息
     * @param callback 回调
     * @param times    提示的时间长度 单位:秒
     */
    toast = (message: string, callback: Function = () => {
    }, times: number = 2) => {
        modal.toast({message: message, duration: times});
        if (callback == null) {
            return;
        }
        timer.setTimeout(callback, times * 1000);
    };

    /**
     * 警告框
     * @param options
     * @param callback
     */
    alert = (options: any = {}, callback) => {
        if (isString(options)) {
            options = {message: options}
        }
        let weexOptions:WeexAlertOptions= Object.assign({
            message: "",
            duration: 1,
            okTitle: "确认",
            cancelTitle: "取消"
        }, options);
        modal.alert(weexOptions, callback)
    };

    /**
     * 带确认的对话框
     * @param options 配置详情
     * @param confirm 确认回调
     * @param cancel  取消回调
     */
    confirm = (options: any = {}, confirm = () => {
    }, cancel = () => {
    }) => {
        if (isString(options)) {
            options = {message: options}
        }
        options = Object.assign({
            message: "",
            duration: 1,
            okTitle: "确认",
            cancelTitle: "取消"
        }, options);
        modal.confirm(options, (result) => {
            if (result === options.okTitle) {
                confirm();
            } else {
                cancel();
            }
        });
    };

    /**
     * 带输入框的对话框
     * @param options 配置详情
     * @param confirm 确认回调
     * @param cancel  取消回调
     */
    prompt = (options: any = {}, confirm = (data) => {
    }, cancel = (data) => {
    }) => {
        if (isString(options)) {
            options = {message: options}
        }
        options = Object.assign({
            message: "",
            duration: .3,
            okTitle: "确认",
            cancelTitle: "取消"
        }, options);
        modal.prompt(options, ({result, data}) => {
            if (result === options.okTitle) {
                confirm(data);
            } else {
                cancel(data);
            }
        });
    };

    /**
     * 获取最大保存有效时间
     * @return {number}
     */
    private getMaxExpireTime = (expireTime: number): number => {
        return new Date().getTime() + expireTime;
    }

}

const weexUtils = new WeexUtils();
export default weexUtils;
