/**
 * 信鸽推送
 * Created by wuxp on 2017/7/10.
 */
if (weex.config.env.platform.toLowerCase() === 'web') {
    const MessagagePush = {
        /**
         * APP只有在完成信鸽的启动与注册后才可以信鸽SDK提供push服务，在这之前请确保配置AccessId和AccessKey。
         * <p>
         * 信鸽主要配置参数：
         * AccessId
         * AccessKey
         * @param
         */
        config(params = {AccessId: "", AccessKey: ""}){
            console.log(params);
        },
        /**
         * 注册
         * @param accountId 当前登录用户的userId
         * @param success
         * @param failure
         */
        registerMsgPush(accountId, success = () => {}, failure = () => {}){
            console.log(accountId);
        },

        /**
         * 查询消息
         * @param callback
         */
        queryMsg(callback=()=>{}){
            console.log("web环境暂不支持 queryMsg");
        },
        /**
         * 读取消息
         * @param msgId  消息
         * @param callback
         */
        readMsg(msgId,callback=()=>{}){
            console.log("web环境暂不支持 readMsg");
        }
    };
    console.log("注册自定义模块 msgPush");
    console.log(MessagagePush);
    weex.registerModule('msgPush', MessagagePush);
}