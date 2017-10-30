import {ReqMethod} from "../base/ReqMethod";
import {isFunction, isNullOrUndefined, isString, isUndefined} from "util";
import * as md5 from "md5";
import {WeexStreamOption} from "../option/WeexStreamOption";
import requestURLIsNeedToken from "../option/NotTokenURLConfig";
import {DataType} from "../base/DataType";
import {ApiClientInterface} from "../base/ApiClientInterface";
import ApiConfig from "../base/ApiConfig";
import {stream, appMain, weexModule} from "../../utils/ExportWeexModel.js";
import weexUtils from "../../utils/WeexUtils";
import memberUtils from "../../../../../src/utils/MemberUtils";

import GlobalApiConfig from "../config/GlobalAipConfig";

const IS_WEB = weexModule.config.env.platform.toLowerCase() === "web";

/**
 * 请求服务端的api统一接口失效
 */
class ApiClientWeex extends ApiClientInterface<WeexStreamOption> {

    /**
     * weex 请求对象
     */
    private readonly client = stream;

    /**
     * @param client WEEX 中的steam对象
     */
    constructor() {
        super();
    }

    /**
     * post请求
     *
     */
    post(option: WeexStreamOption) {
        option.method = ReqMethod.POST;
        return this.fetch(option);
    }


    /**
     * get请求
     */
    get(option: WeexStreamOption) {
        option.method = ReqMethod.GET;
        return this.fetch(option);
    }


    /**
     * 获取数据
     * @param option
     * 默认 Content-Type 是 ‘application/x-www-form-urlencoded’。
     * 如果你需要通过 POST json ， 你需要将 Content-Type 设为 ‘application/json’。
     */
    fetch(option: WeexStreamOption): any {

        if (GlobalApiConfig.GLOBAL_USER_DATA_TYPE_JSONP && IS_WEB) {
            //全局开启jsonp
            option.type = DataType.JSONP;
        }


        //添加查询参数的处理
        let queryPrams = option.queryPrams;
        if (!isNullOrUndefined(queryPrams) && Object.keys(queryPrams).length > 0) {
            if (option.url.indexOf("?") >= 0) {
                option.url += "&";
            } else {
                option.url += "?"
            }
            for (let key in queryPrams) {
                option.url += key + "=" + queryPrams[key];
            }
        }

        option.data = isUndefined(option.data) ? {} : option.data;

        const sign = this.sign(option.signFields, option.data);  //获取签名字符串

        // console.log(" ReqMethod--> " + ReqMethod[option.method])
        // console.log(" DataType--> " + DataType[option.type])

        if (option.method === ReqMethod.POST || option.type === DataType.JSONP) {
            option.data['sign'] = sign;      //签名字符串
            if (option.type === DataType.JSONP) {
                if (option.url.indexOf("?") >= 0) {
                    option.url += "&";
                } else {
                    option.url += "?"
                }
                option.url += "data=" + JSON.stringify(option.data);
                option.url = encodeURI(option.url as string);   //URL encode
                option.method = ReqMethod.GET;    //如果是jsonp请求，强制设置为get方式提交
                option.data = null;
            } else if (option.method === ReqMethod.POST) {
                if (option.headers == null) {
                    option.headers = {};
                }
                option.headers['Content-Type'] = "application/json;charset=UTF-8";
            }
        } else if (option.method === ReqMethod.GET) {
            let queryString = null;   //查询字符串
            if (option.url.indexOf("?") >= 0) {
                queryString = "&";
            } else {
                queryString = "?";
            }
            queryString += "clientId=" + option.data['clientId'];
            queryString += this.joinParamByReq(option.data);
            option.url += queryString;
            option.url += "&sign=" + sign;   //签名字符串
            option.data = null;
            option.url += "&data=" + JSON.stringify(option.data);  //URL encode
        }

        //console.log("请求url--> " + option.url);
        // console.log("请求method--> " + ReqMethod[option.method]);
        //console.log("请求headers--> " + JSON.stringify(option.headers));
        //console.log("请求params--> " + JSON.stringify(option.data));
        // console.log("请求的结果数据类型：" + DataType[option.type].toLowerCase());

        option.type = isUndefined(option.type) ? DataType.JSON : option.type;


        //WEEX stream对象 https://weex.apache.org/cn/references/modules/stream.html
        let headers = option.headers;

        let method = ReqMethod[option.method];
        this.client.fetch({
            method,               //请求方法get post
            url: option.url,                      //请求url
            type: "json", //DataType[option.type].toLowerCase(),                    //响应类型, json,text 或是 jsonp {在原生实现中其实与 json 相同)
            headers: headers,             //headers HTTP 请求头
            body: (option.data == null || method === "GET") ? null : JSON.stringify(option.data)     //参数仅支持 string 类型的参数，请勿直接传递 JSON，必须先将其转为字符串。请求不支持 body 方式传递参数，请使用 url 传参。
        }, function (response) {
            // console.log(response);
            /**
             * 响应结果回调，回调函数将收到如下的 response 对象：
             * status {number}：返回的状态码
             * ok {boolean}：如果状态码在 200~299 之间就为真
             * statusText {string}：状态描述文本
             * data {Object | string}: 返回的数据，如果请求类型是 json 和 jsonp，则它就是一个 object ，如果不是，则它就是一个 string。
             * headers {Object}：响应头
             */
            if (!response.ok) {
                //请求没有正确响应
                console.error("响应状态码：" + response.status + " 状态描述：" + response.statusText);
                return;
            }
            // console.log("响应信息："+JSON.stringify(response));
            option.callBack(response.data, response.headers);
        }, function (resp) {
            //console.log(resp);
            /**
             * 关于请求状态的回调。 这个回调函数将在请求完成后就被调用:
             * readyState {number}：当前状态state:’1’: 请求连接中opened:’2’: 返回响应头中received:’3’: 正在加载返回数据
             * status {number}：响应状态码.
             * length {number}：已经接受到的数据长度. 你可以从响应头中获取总长度
             * statusText {string}：状态文本
             * headers {Object}：响应头
             */

            if (!isFunction(option.progressCallback)) {
               // console.warn("未提供 progressCallback回调");
                return;
            }
            option.progressCallback(resp);
        });
    }


    /**
     * 分发
     * @param serviceHandler  分发的服务对象  数组中的第一个参数
     * @param serviceMethod   分发的服务方法  数组中的第二个参数
     * 其他参数是接口传入的参数
     */
    dispatch(): Promise<Function> {

        const paramList = arguments[0];  //获取参数列表
        const serviceHandler = paramList[0];
        const serviceMethod = paramList[1];
        const config = serviceHandler[serviceMethod]() as ApiConfig;  //获取配置
        if (isUndefined(config)) {
            throw new Error("请求的方法: " + serviceMethod.toString() + " 未定义");
        }


        const params = isUndefined(paramList[2]) ? {} : paramList[2];
        const options = isUndefined(paramList[3]) ? {useProgressBar: true} as WeexStreamOption : paramList[3] as WeexStreamOption;
        const reqMethod = isString(paramList[4]) ? ReqMethod[paramList[4].toUpperCase()] : paramList[4] as ReqMethod;      //请求方法
        const resultDataType = isString(paramList[5]) ? DataType[paramList[5].toUpperCase()] : paramList[5] as DataType;  //结果数据类型

        return new Promise((resolve: Function = () => {
        }, reject: Function = () => {
        }) => {
            options.url = config.url;                 //请求的url
            options.signFields = config.signFields;   //参与签名的请求参数
            //这个写法是为了在调用方法的时候 可以覆盖默认的配置
            options.method = isUndefined(reqMethod) ? config.method : reqMethod as ReqMethod;        //请求方法 post、get
            options.type = isUndefined(resultDataType) ? config.dataType : resultDataType as DataType;  //结果数类型
            options.callBack = function (resp) {
                //  console.log("api接口" + config.url + " 返回数据->:");
                // console.log(JSON.stringify(resp));
                if (options.useProgressBar) {
                    //console.log("隐藏加载进度条-> hideProgressBar");
                    appMain.hideProgressBar();  //隐藏加载进度条
                }
                if (resp.code === 0) {
                    resolve(resp.data);
                } else {
                    reject(resp);
                }
            };
            options.data = params;

            //判断是否需要登陆
            const isNeedToken = requestURLIsNeedToken(config.url);
            console.log("是否需要token-> " + isNeedToken);
            if (!isNeedToken) {
                this.request(reject, options);
            } else {
                memberUtils.getCurrentLoginMember().then((memberInfo) => {
                    let token = memberInfo['token'];
                    if (isNullOrUndefined(token)) {
                        throw new Error("获取token失败!");
                    }
                    if (token.length > 0) {
                        options.url += "?token=" + token;
                    }
                    this.request(reject, options);
                }).catch((e) => {
                    console.log(e);
                    //weexUtils.toast("用户信息获取失败!");
                });
            }
        });
    }

    /**
     * 请求
     * @param reject
     * @param options
     */
    private request = (reject: Function, options: WeexStreamOption) => {
        const api = this;
        //获取网络
        appMain.getNetworkType((result) => {
            if (result === 0) {
                weexUtils.toast("网络不可用，请检查网络!");
                reject();
                return;
            }
            let method = ReqMethod[options.method];
            if (options.useProgressBar) {
                appMain.showProgressBar(10, () => {
                });  //显示加载进度条
            }
            api[method.toLowerCase()](options);
        });
    }


    /**
     * 将一个对象转换成url参数字符串
     * @param req
     * @return {string}
     */
    private joinParamByReq(req: Object): String {

        let result = "";
        for (let key in req) {
            result += "&" + key + "=" + req[key];
        }
        result = result.substr(0, result.length - 1);

        return result;
    }

    /**
     * ap请求时签名
     * @param fields
     * @param params
     * @return {string}
     */
    private sign = (fields: Array<String>, params: any): String => {

        if (isNullOrUndefined(fields)) {
            return "";
        }
        let value = "";
        //console.log("参与排序的参数列表: " + JSON.stringify(fields.sort()));
        fields.sort().forEach(function (item) {
            let param = params[item.toString()];
            if (isNullOrUndefined(param) || (isString(param) && param.trim().length === 0)) {
                // console.warn("参与签名的参数：" + item + " 未传入!");
                throw new Error("参与签名的参数：" + item + " 未传入或值无效!");
            }
            value += item + "=" + param + "&";
        });
        value += "clientId=" + params.clientId + "&clientSecret=" + GlobalApiConfig.CLIENT_SECRET;
        value += "&timestamp=" + params.timestamp;  //加入时间戳参与签名
        const sign = md5(value);

        return sign;
    }
}

export default ApiClientWeex;