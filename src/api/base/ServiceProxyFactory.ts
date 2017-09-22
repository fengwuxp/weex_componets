import {isFunction} from "util";
import ServiceProxy from "./ServiceProxy";
import {ReqMethod} from "./ReqMethod";
import {DataType} from "./DataType";

/**
 * 代理服务工厂，将一个服务对象包裹，抛出一个新对象 (由于es5不支持proxy对象的降级实现)
 * Created by wuxp on 2017/5/17.
 */
const api: any = ServiceProxy.newInstanceApiClientImpl();

export default class ServiceProxyFactory {


    /**
     * 获取一个代理服务对象的实例
     * @param targetService  目标服务对象
     * @return {{}}
     */
    static newProxyInstances(targetService: any): any {
        const proxy = {};
        // for (let key in targetService) {
        //     if (!isFunction(targetService[key])) {
        //         continue;
        //     }
        //     proxy[key as string] = function () {
        //         return api.dispatch([targetService, key, ...arguments]);
        //     }
        // }

//         value:属性的值
//         writable:如果为false，属性的值就不能被重写,只能为只读了
//         configurable:总开关，一旦为false，就不能再设置他的（value，writable，configurable）
//         enumerable:是否能在for...in循环中遍历出来或在Object.keys中列举出来。

        for (const key in targetService) {
            if (!isFunction(targetService[key])) {
                continue;
            }
            Object.defineProperty(proxy, key, {
                set: function (val) {
                    throw new Error("proxy service 无法设置新的属性");
                },
                get: function () {
                    arguments[1] = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { useProgressBar: true };
                    arguments[2]  = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ReqMethod.POST;
                    arguments[3]  = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DataType.JSON;

                    return function () {
                        return api.dispatch([targetService, key, ...arguments]);
                    }
                }
            });
        }

        return proxy;
    }
}
