/*
* 信鸽推送 前置处理
* */

import {common, msgPush, broadcast} from "wxp_weex_componets/src/utils/ExportWeexModel";


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

    methods: {
        /**
         * 查找当前被点击的消息
         * @param list
         * @return {{}}
         */
        findCurrentClickMsg(list) {
            let message = {};
            list.forEach((item) => {
                if (item.id.indexOf(CLICK_MSG_PREFIX) >= 0) {
                    message = item;
                }
            });
            return message;
        },
        /**
         * 处理推送消息
         */
        handlePushMessage() {
            msgPush.queryMsg((list) => {
                if (list.length === 0) {

                    console.log("消息列表为空");
                    return;
                }
                console.log("接受到的消息");
                console.log(list);
                console.log("---查找当前点击的消息--->")
                let message = this.findCurrentClickMsg(list);
                if (message === null || message === undefined) {
                    console.log("暂无被点击的消息")
                    return;
                }
                console.log(message);
                this.pushMessageHandler({
                    data: JSON.parse(message.data),
                    id: message.id
                }, (messageId) => {
                    console.log("---读取消息--->" + messageId);
                    msgPush.readMsg(messageId, () => {
                        console.log("消息读取成功!");
                    });
                }, message)

            });
        }
    },
    beforeMount() {
        console.log("---注册页面显示--->")
        common.setOnActCallback(() => {
            console.log(arguments);
            console.log("---注册页面显示成功--->");
            this.handlePushMessage();
        });

        //注册信息推信息回调
        broadcast.register("PUSH_MSG_CATEGORY", "NEW_PUSH_MSG", ({data}) => {
            console.log("接收到推送消息事件-> " + JSON.stringify(data));
            //TODO 按照不同的的事件类型处理推送
            this.handlePushMessage();
        });


    }

}