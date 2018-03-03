import {broadcast} from "typescript_api_sdk/src/utils/ExpotrtWeexCustomModel";
import {BroadcastViewEvent} from "./BroadcastViewEvent";
import {isString} from "util";

/**
 * 需要接受广播的视图
 */
export default class AcceptBroadcastView {


    constructor() {

    }

    public static registerEvents(events: Array<BroadcastViewEvent>) {
        console.log("---this----")
        console.log(this)
        events.forEach(({category, eventName, success}: BroadcastViewEvent) => {
            broadcast.register(category, eventName, ({data}) => {
                if (isJSONString(data)) {
                    data = JSON.parse(data);
                }
                success.apply(this, data);
            });
        });
    };


}

/**
 * 是否为json字符串
 * @param {string} str
 * @return {boolean}
 */
const isJSONString = (str: string): boolean => {

    if (!isString(str)) {
        return false;
    }

    str = str.replace(/\s/g, '').replace(/\n|\r/, '');

    if (/^\{(.*?)\}$/.test(str))
        return /"(.*?)":(.*?)/g.test(str);

    if (/^\[(.*?)\]$/.test(str)) {
        return str.replace(/^\[/, '')
            .replace(/\]$/, '')
            .replace(/},{/g, '}\n{')
            .split(/\n/)
            .map((s) => {
                return isJSONString(s);
            })
            .reduce(function (prev, curr) {
                return !!curr;
            });
    }

    return false;
}