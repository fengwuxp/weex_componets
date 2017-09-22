/**
 * Created by wuxp on 2017/5/9.
 */

import {ApiReq} from "../api/base/ApiReq";
import {ApiQueryReq} from "../api/base/ApiQueryReq";

class ReqImpl extends ApiReq {

    constructor() {
        super();
    }
}

class QueryReqImpl extends ApiQueryReq {

    constructor() {
        super();
    }
}

class ApiReqFactory {


    constructor() {

    }

    /**
     * 获取一个请求req对象
     * @param params 是一个对象列表
     */
    newInstancesReq = <T extends ApiReq>(...params): T=> {
        let reqImpl = new ReqImpl();
        return  Object.assign({}, reqImpl, ...params) as T;
    };
    /**
     * 获取一个查询req对象
     *@param params 是一个对象列表
     */
    newInstancesQueryReq =<T extends ApiQueryReq>(...params): T=> {
        let reqImpl = new QueryReqImpl();
        return Object.assign({}, reqImpl, ...params) as T;
    }
}
const apiReqFactory = new ApiReqFactory();

export default apiReqFactory;