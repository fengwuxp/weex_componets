/**
 * 自定义location 保存对象
 * Created by wuxp on 2017/6/6.
 */
if (weex.config.env.platform.toLowerCase() === 'web') {
    const locationModal = {

        /**
         * 获取我的位置信息
         * @param succ 成功回调  {"district":"街道","address":"详细地址","latitude":123.99,"longitude":36.99}
         * @param fail 失败回调
         */
        getMyLocation(flag,succ = () => {
        }, fail = () => {
        }){
            console.log("浏览器暂不支持改方法");
            succ({
                district:"杨桥西路298号",
                address:"福州市鼓楼区杨桥西路298号",
                areaCode:300,
                latitude:123.1,
                longitude:55.23
            })
        },
    };
    console.log("注册自定义模块 location");
    weex.registerModule('location', locationModal);
}