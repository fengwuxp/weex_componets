/*
* 信鸽推送 前置处理
* */


import {common, msgPush, broadcast} from "typescript_api_sdk/src/utils/ExpotrtWeexCustomModel";


/**
 * 被点击的消息id前缀
 * @type {string}
 */
const CLICK_MSG_PREFIX = "onClick_";

/**
 * 未被点击的消息id前缀
 * @type {string}
 */
const COMMON_MSG_PREFIX = "onText_";

export default {

    data() {
        return {
            isUseBroadCastMessage: false  //是否使用来自广播的消息推送
        }
    },
    methods: {
        /**
         * 查找当前被点击的消息
         * @param list
         * @return {{}}
         */
        findCurrentClickMsg(list) {
            let message: any = null;
            list.some((item: any) => {
                if (item.id.indexOf(CLICK_MSG_PREFIX) >= 0) {
                    message = item;
                    return true;
                }
                return false;
            });
            return message;
        },
        /**
         * 处理推送消息
         */
        handlePushMessage() {
            msgPush.queryMsg((list) => {
                if (this.ios) {
                    //ios需要手动转换一次
                    list = JSON.parse(list);
                }
                console.log(list.length)
                if (list.length === 0) {
                    console.log("消息列表为空");
                    return;
                }
                console.log("---查找当前点击的消息--->");
                let message = this.findCurrentClickMsg(list);

                if (message === null || message === undefined) {
                    console.log("暂无被点击的消息");
                    return;
                }
                console.log("---当前点击的消息--->：" + message.id);
                let data = JSON.parse(message.data);

                this.pushMessageHandle({
                    data,
                    id: message.id
                }, (messageId) => {
                    console.log("---读取消息--->" + messageId);
                    msgPush.readMsg(messageId + "", () => {
                        console.log("消息读取成功!");
                    });
                }, message);

            });
        }
    },
    beforeMount() {
        common.setOnActCallback(() => {
            console.log("---注册页面显示成功--->");
            this.handlePushMessage();
        });

        if (this.isUseBroadCastMessage) {
            //注册信息推信息回调
            broadcast.register("PUSH_MSG_CATEGORY", "NEW_PUSH_MSG", ({data}) => {
                console.log("接收到推送消息事件-> " + JSON.stringify(data));
                this.handlePushMessage();
            });
        }


    }

}