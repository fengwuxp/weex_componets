import AcceptBroadcastView from "../../view/broadcast/AcceptBroadcastView";
import {BroadcastViewEvent} from "../../view/broadcast/BroadcastViewEvent";


/**
 * 需要注册广播的mixins
 */
export default {

    mounted() {
        const events: Array<BroadcastViewEvent> = [];
        const onMessage = this.onMessage;
        for (const key in onMessage) {
            const event: Object = onMessage[key];
            for (const eventName in event) {
                let category = key;//.toString().toUpperCase();
                console.log("-注册的事件->" + category + " " + eventName);
                events.push({
                    category,
                    eventName,
                    success: event[eventName]
                });
            }
        }

        console.log("-注册的事件个数-> " + events.length);
        //初始化事件队列
        AcceptBroadcastView.registerEvents.apply(this, [events]);
    }
}