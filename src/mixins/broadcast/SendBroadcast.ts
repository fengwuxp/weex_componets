import {broadcast} from "typescript_api_sdk/src/utils/ExpotrtWeexCustomModel";
import {isFunction, isNullOrUndefined} from "util";
import {R_CATEGORY, R_EVENT_NAME} from '../../const/EventParamKey';

//固定广播方法名称
const sendBroadcastName: string = "sendAutoCreateBroadcastName";

/**
 * 创建发送广播的函数
 * @param {string}category
 * @param {string}eventName
 * @return {Function}
 */
const createSendFunction = (category: string, eventName: string): Function => {
    return function (data: any) {
        console.log("发送广播-> " + category + " " + eventName);
        broadcast.send(category, eventName, data);
    }
};

/**
 * 需要发送广播的mixins
 */
export default {


    methods: {
        /**
         * 发送来自外部调用自动生成的广播名称生成的广播事件
         * @return {string}
         */
        sendAutoCreateBroadcastEvent(data: any): string {
            if (isNullOrUndefined(this[sendBroadcastName])) {
                return;
            }
            return this[sendBroadcastName](data);
        }
    },
    mounted() {
        const sendMessage: Array<Object> = this.sendMessage;

        //生成方法
        for (const key in sendMessage) {
            const event: Object = sendMessage[key];
            for (const eventName in event) {
                const item = event[eventName];
                let fnName: string = "";
                if (isFunction(item)) {
                    fnName = item();
                } else {
                    fnName = key + "_" + eventName;
                }
                console.log("在页面上注册事件-> " + fnName);
                let category: string = key;//fnName === sendBroadcastName ? key : key.toUpperCase();
                this[fnName] = createSendFunction(category, eventName);
            }

        }
    },
    created() {

        const params = this.getParams([R_CATEGORY, R_EVENT_NAME]);
        if (!isNullOrUndefined(params.R_CATEGORY) && !isNullOrUndefined(params.R_EVENT_NAME)) {
            console.log("自动注册来自外部传入的广播-> ");
            console.log(params);
            //注册来自外部的传入的广播名称
            this.sendMessage[params[R_CATEGORY]] = {};
            this.sendMessage[params[R_CATEGORY]][params[R_EVENT_NAME]] = () => {
                return sendBroadcastName;
            };
        }

    }
}