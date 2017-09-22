/**
 * Created by wuxp on 2017/5/6.
 */

import {ReqMethod} from "../base/ReqMethod";
import {DataType} from "../base/DataType";
/**
 * weex stream请求参数对象
 */
export interface WeexStreamOption {

    /**
     * 请求url
     */
    url?: String;

    /**
     * 查询参数
     */
    queryPrams?:Object;

    /**
     * 请求方法
     */
    method?: ReqMethod;

    /**
     * 结果数据类型
     */
    type?: DataType;

    /**
     * 请求头
     */
    headers?: Object;

    /**
     * 请求参数，请求需要
     */
    data?: Object;

    /**
     * 参与签名的参数列表
     */
    signFields?: Array<String>;

    /**
     * 响应回调
     */
    callBack?: Function;

    /**
     * 关于请求状态的回调。 这个回调函数将在请求完成后就被调用:
     */
    progressCallback?: Function;

    /**
     * 使用进度提示条
     */
    useProgressBar:Boolean;



    // constructor(useProgressBar:Boolean=true,progressCallback?: Function, method?: ReqMethod, type?: DataType) {
    //     this.progressCallback = progressCallback;
    //     this.method = method;
    //     this.type = type;
    //     this.useProgressBar=useProgressBar;
    //
    // }
}