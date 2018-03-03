import {BroadcastViewEventType} from "./BroadcastViewEventType";

/**
 * 页面广播事件定义
 */
export interface BroadcastViewEvent {

    /**
     * 事件分类
     */
    category: BroadcastViewEventType | string;

    /**
     * 事件名称
     */
    eventName: string;

    success: Function;

    error?: Function;
}