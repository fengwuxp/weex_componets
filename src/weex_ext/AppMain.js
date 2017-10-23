/**
 * Created by wuxp on 2017/6/9.
 */
if (weex.config.env.platform.toLowerCase() === 'web') {
    const appMainModule = {

        /**
         * 显示加载进度
         * @param autoHideSeconds
         * @param callback
         */
        showProgressBar(autoHideSeconds, callback) {

            console.log("进度开始!")
        },
        /**
         * 隐藏加载进度
         */
        hideProgressBar() {
            console.log("进度结束!")
        },
        /**
         * 获取网络类型
         * @param callback
         */
        getNetworkType(callback = () => {
        }) {
            console.log("web环境暂不支持 getNetworkType");
            callback(true);
        },
        /**
         * 打开原生页面
         * @param actionType  动作类型
         * @param params      参数
         * @param succ
         * @param error
         */
        openActivity(actionType, params = {}, succ = () => {
        }, error = () => {
        }) {
            console.log("这里是web端!，不处理openActivity方法!");
        },

        /**
         * 获取登录用户
         */
        getLoginUser(params, callback, failFn) {
            console.log("浏览器暂使用模拟数据");
            callback({id: 152});
        },

        /**
         * 跳转到个人中心
         * @param success
         * @param failre
         */
        toMine(success = () => {
        }, failre = () => {
        }) {
            console.log("浏览器暂不支持改方法");
        },

        /**
         * 跳转到购物车
         * @param success
         * @param failre
         */
        toCart(success = () => {
        }, failre = () => {
        }) {
            console.log("浏览器暂不支持改方法");
        },

        /**
         * 跳转到分类
         * @param success
         * @param failre
         */
        toCategory(success = () => {
        }, failre = () => {
        }) {
            console.log("浏览器暂不支持改方法");
        },

        /**
         * 跳转到首页
         * @param success
         * @param failre
         */
        toHome(success = () => {
        }, failre = () => {
        }) {
            console.log("浏览器暂不支持改方法");
        },

        /**
         * 跳转到订单
         * @param success
         * @param failre
         */
        toOrder(success = () => {
        }, failre = () => {
        }) {
            console.log("浏览器暂不支持改方法");
        },

        /**
         * 分享
         * @param params type:[@"APP", @"STORE", @"GOODS"] resId: APP为空，STORE店铺id GOODS商品id 均为字符串
         * @param success
         * @param failre
         */
        share(params = {}, success = () => {
        }, failre = () => {
        }) {
            console.log("浏览器暂不支持改方法");
        },

        /**
         * 拨打电话
         * @param flag 是否立即呼出
         * @param mobilePhone 手机号码
         * @param succ
         * @param failre
         */
        callPhone(flag, mobilePhone, succ = () => {
        }, failre = () => {
        }) {
            console.log("浏览器暂不支持改方法");
        }

    };
    console.log("注册自定义模块 appMainModule");
    weex.registerModule('appMain', appMainModule);
}