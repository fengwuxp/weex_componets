import {ReqMethod} from "./ReqMethod";
import {isUndefined} from "util";
import {DataType} from "./DataType";

import  GlobalApiConfig from "../config/GlobalAipConfig";
/**
 * API服务接口配置对象
 * Created by wuxp on 2017/5/4.
 */
export default class ApiConfig {


    /**
     * 请求url
     */
    private _url: String;

    /**
     * 参与签名的字段数组
     * @dataType {Array}
     * @private
     */
    private _signFields: Array<String> = [];

    /**
     * 请求方法
     */
    private _method: ReqMethod;

    /**
     * 结果数据类型
     */
    private _dataType: DataType;

    /**
     * @param url 请求url
     * @param _signFields  需要签名的key
     * @param method 请求的方式
     */
    constructor(url: String, signFields: Array<String>, method: ReqMethod = ReqMethod.POST, dataType: DataType = DataType.JSON) {
        this._url = url;
        this._signFields = signFields;
        this._method = method;
        this._dataType = dataType;
    }

    get url(): String {
        return this._url;
    }


    get signFields(): Array<String> {
        return this._signFields;
    }

    set signFields(value: Array<String>) {
        this._signFields = value;
    }

    get method(): ReqMethod {
        return this._method;
    }

    set method(value: ReqMethod) {
        this._method = value;
    }


    get dataType(): DataType {
        return this._dataType;
    }

    set dataType(value: DataType) {
        this._dataType = value;
    }

    /**
     * 创建一个实例
     * @param url        请求url
     * @param signFields 需要签名的字段属性
     * @param method     请求方式
     * @param dataType   结果数据类型
     */
    public static newInstance(url: String, signFields?: Array<String>, method?: ReqMethod, dataType?: DataType) {
        if (url.indexOf(GlobalApiConfig.API_BASE_URL) < 0) {
            url = GlobalApiConfig.API_BASE_URL + url;
        }
        return new ApiConfig(url, isUndefined(signFields) ? new Array<String>() : signFields, method,dataType);
    }
}