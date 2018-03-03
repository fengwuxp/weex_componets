import {navigator, weexModule} from "typescript_api_sdk/src/utils/ExportWeexSdkModel";
//导入原生路由配置
import nativeRoute from '../../../../src/router/RouterNativeMaps';

//vue router
import vueRouter from '../../../../router/RouterIndex';

import {isIos, isWeb} from "typescript_api_sdk/src/utils/WeexEnvUtil";
import weexGetPathUtils from "../utils/WeexGetPathUtils";
import weexUtils from "../utils/WeexUtils";
import commonUtils from "../utils/CommonUtils";
import MemberSessionManager from "../../../../../src/session/MemberSessionManagerImpl";

import StringToHexUtil from "typescript_api_sdk/src/codec/StringToHexUtil";
import {DEFAULT_PARAM_KEY_NAME} from "../mixins/ConstKey";

const IS_WEB: boolean = isWeb();
const IS_IOS: boolean = isIos();
let newNavigator: any = navigator;
if (IS_IOS) {
    //IOS使用自定义的导航模块
    newNavigator = weexModule.requireModule("nav");
}

/**
 * weex 路由处理者
 */
export default class WeexRouterHandler {


    constructor() {
    }


    public jump = (url = "", params = {}, isPopSelf = false, callback = () => {
    }): void => {
        if (IS_WEB) {

            let routerKey = url.split("?")[0].substr(1, url.length);
            let route = nativeRoute[routerKey];   //尝试从路由配置中获取
            console.log(route);
            console.log(url);
            let gotoURL = "";
            if (commonUtils.isNullOrUndefined(route)) {
                //未获取到改配置，则通过工具类获取该js的地址
                gotoURL = weexGetPathUtils.getNativeGoToURL(url, weex);
                route = {
                    path: "",
                    meta: {}
                };
            } else {
                let baseURL = this.getBasePath();  //获取根目录地址
                gotoURL = baseURL + route.url;
            }
            const {main, requireAuth} = Object.assign({main: false, requireAuth: false}, route.meta);
            if (requireAuth) {
                //需要登陆 检查登陆
                MemberSessionManager.getCurrentLoginMember().catch(() => {
                    //未登录 跳到登陆页面
                    this.jump("/login?redirect=" + url);
                });
                return;
            }

            this.openWeexByNative(gotoURL, main, params, callback);
            if (isPopSelf && IS_IOS) {
                //清除自己的堆栈，防止点击返回时回到该页面
                console.log("清除自己的堆栈，防止点击返回时回到该页面");
                newNavigator.pop({
                    animated: true
                });
            }
        } else {
            if (commonUtils.isNullOrUndefined(vueRouter)) {
                console.log("vue-router 未实例化!");
                return;
            }
            if (url.indexOf("/") !== 0) {
                //不是绝对地址
                url = weexGetPathUtils.getWebGoToURL();
            }
            if (commonUtils.isNullOrUndefined(params)) {
                vueRouter.push(url);
            } else {
                console.log(params);
                vueRouter.push({path: url, query: params});
            }
        }
    };

    back=()=>{
        if (this.web) {
            this.$router.back();
        } else {
            this.newNavigator.pop({animated: true}, () => {
                if (commonUtils.isNullOrUndefined(callback) || callback.constructor !== Function) {
                    return;
                }
                callback();
            });
        }
    }

    /**
     * 打开weex页面 在原生下
     * @param url
     * @param {boolean} main
     * @param {{}} params
     * @param {() => void} callback
     */
    public openWeexByNative(url, main = false, params = {}, callback = (): void => {
    }) {
        let i: number = 0;
        //构建参数
        let queryString: string = "";
        for (let key in params) {
            queryString += key + "=" + params[key] + "&";
            i++;
        }

        queryString = queryString.substr(0, queryString.length - 1);

        if (queryString.trim().length > 0 && commonUtils.isNullOrUndefined(params['weex_refresh'])) {

            //转为16进制数据
            queryString = StringToHexUtil.encode(queryString);
            console.log("转为16进制数据编码后-> " + queryString);
            queryString = DEFAULT_PARAM_KEY_NAME + "=" + queryString;
        } else {
            //TODO
        }


        if (url.indexOf("?") < 0) {
            url += "?";
        }
        url += queryString;

        let gotoURL = "weex://" + packageName + (main ? "/main/" : "/page/") + url;
        newNavigator.push({
            url: gotoURL,
            animated: "true"
        }, event => {
            callback(event);
        });
    };


    /**
     * 获取参数
     * @param keys 参数的名称列表 例如 ["id","name"]
     * @param useQuery 是否使用查询字符串参数
     * @return {*}
     */
    public getParams = (keys, useQuery = true): any => {
        let params: any = {};
        let length: number = keys.length;
        if (IS_WEB) {
            const bundleUrl: string = weexModule.config.bundleUrl;
            let queryStr: string = bundleUrl.split("?")[1];  //获取查询字符串

            if (!commonUtils.hasText(queryStr)) {
                //如果不存在查询字符串则直接返回
                return "";
            }

            let _pString: string = queryStr.split("&")[0];  //获取第一个参数
            if (!commonUtils.hasText(_pString)) {
                return "";
            }

            //是否被hex处理过
            let isDecode: boolean = _pString.indexOf(DEFAULT_PARAM_KEY_NAME) >= 0;

            if (isDecode) {
                //获取实际被处理过的16进制的参数
                _pString = _pString.split("=")[1];
                if (commonUtils.hasText(queryStr)) {
                    //16进制转10进制
                    queryStr = StringToHexUtil.decode(_pString);
                    console.log("16进制转10进制-> " + _pString);
                }
            }
            let list: Array<string> = queryStr.split("&");
            list.forEach((item) => {
                let p = item.split("=");
                params[p[0]] = p[1];
            });
            console.log("参数-->" + JSON.stringify(params));

        } else {
            if (length > 1 || useQuery === true) {
                keys.forEach((key) => {
                    //多个参数使用query对象传递
                    params[key] = vueRouter.query[key];
                });
            } else {
                params[keys[0]] = vueRouter.params[keys[0]];
            }
        }
        if (length === 1) {
            return params[keys[0]];
        }
        return params;
    };

    /**
     * 获取跟路径
     * @param {string} uri
     * @return {string}
     */
    public getBasePath = (uri: string = null): string => {
        let basePath = weexUtils.getBasePath();
        if (uri === null) {
            return basePath;
        } else {
            return basePath + uri;
        }
    };
}