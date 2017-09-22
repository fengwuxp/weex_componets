/**
 * Created by wuxp on 2017/5/6.
 */
import {ApiClientInterface} from "./ApiClientInterface";
import {WeexStreamOption} from "../option/WeexStreamOption";
import ApiClientWeex from "../impl/ApiClientWeex";


/**
 * 服务代理
 */
export default class ServiceProxy {

    /**
     *
     * @param client       用于请求数据的客户端对象，非必填
     * @param handler      接口对象
     * @return {ServiceProxy} 返回代理对象
     */
    constructor(client: any = null) {

        const api = ServiceProxy.newInstanceApiClientImpl();
        const serviceImpl = this;
        return new Proxy({}, {
            get: function (target, serviceMethod, receiver) {
                return function () {
                    return api.dispatch([serviceImpl, serviceMethod, ...arguments]);
                }
            },
            set: function (target, key, value, receiver) {
                throw new Error("接口不允许设置值!");
            }
        });
    }
    /**
     * 返回当前激活的apiClient的实现
     * @return {ApiClientFetch}
     */
   public static newInstanceApiClientImpl():ApiClientInterface<WeexStreamOption> {

        return new ApiClientWeex();
    }

}

