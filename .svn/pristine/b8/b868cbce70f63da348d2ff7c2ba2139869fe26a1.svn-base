/**
 * Created by wuxp on 2017/5/6.
 */


/**
 * Api客户端请求接口
 */
export abstract class ApiClientInterface<T> {


    constructor() {
    }



    /**
     * post请求
     * @param option
     */
    abstract post(option: T) :any;


    /**
     * get请求
     * @param option
     */
    abstract get  (option: T): any;

    /**
     * 抓取数据
     * @param option
     */
    abstract fetch  (option: T): any;

    /**
     * 分发
     * @param serviceHandler  分发的服务对象  数组中的第一个参数
     * @param serviceMethod   分发的服务方法  数组中的第二个参数
     * 其他参数是接口传入的参数
     *
     */
    abstract dispatch(params:Array<any>):Object;


    /**
     * 获取实例对象
     */
    newInstancesImpl = (impl:Object) => {
        return
    }

}