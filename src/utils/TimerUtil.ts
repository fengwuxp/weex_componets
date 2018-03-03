import {timer} from "typescript_api_sdk/src/utils/ExportWeexSdkModel";
import {isFunction} from "util";

/**
 * 定时器
 */
interface TimerDown {

    /**
     * 倒计时总次数
     */
    total: number,

    /**
     * 每倒计时一次执行的回调，最后一次倒计时不会执行
     */
    callback: Function,

    /**
     * 倒计时结束执行的回调
     */
    endAction: Function,


    /**
     * 倒计时步长 单位毫秒
     */
    times: number,

    /**
     * 提前结束的函数
     */
    stopFn?: Function
}

/**
 * timer util
 */
class TimerUtil {

    /**
     * 倒计时
     * @param {TimerDown} timerDown
     * @return {Timer}
     */
    public static countDown = (timerDown: TimerDown) => {

        if (isFunction(timerDown.stopFn) && timerDown.stopFn()) {
            //提前结束
            console.log("定时器提前结束!");
            return;
        }
        timerDown.callback(timerDown.total);
        timer.setTimeout(() => {
            timerDown.total--;
            if (timerDown.total <= 0) {
                timerDown.endAction();
                return;
            }
            TimerUtil.countDown(timerDown);
        }, timerDown.times);
    };


}

export default TimerUtil;
