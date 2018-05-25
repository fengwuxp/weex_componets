import {LockExecutePlugin} from "./LockExecutePlugin";
import {isNullOrUndefined} from "util";
import UUIDUtil from "../../utils/UUIDUtil";


interface LockItem {
    /**
     * 最后执行时间单位毫秒
     */
    lastExecuteTimes: number;
}

interface LockKey {
    [propName: string]: LockItem;
}

const LOCK_KEYS: LockKey = {};

/**
 * 定时锁执行执行器
 * 用控制用户频繁点击按钮
 */
export default class TimerLockPlugin implements LockExecutePlugin {


    /**
     * 最新执行间隔时间
     */
    private times: number;

    /**
     * 当前key
     */
    private key: string;


    private constructor(times) {
        this.times = times;
        let key:string = UUIDUtil.guid();
        this.lock(key);
    }

    /**
     * 创建一个定时锁执行器
     * @param times 最小间隔执行时间
     * @return {TimerLockPlugin}
     */
    public static newInstance(times: number = 1000): TimerLockPlugin {

        return new TimerLockPlugin(times);
    }

    lock(key: string): TimerLockPlugin {
        this.key = key;

        if (isNullOrUndefined(LOCK_KEYS[this.key])) {
            //初始化
            this.setLockStatus();
        }

        return this;
    }

    execute(executor: Function): TimerLockPlugin {
        if (this.isLock()) {
            console.log("lock ing...");
            return this;
        }
        //设置最后执行时间
        this.setLockStatus(new Date().getTime());
        //执行
        executor();

        return this;
    }

    unLock(): TimerLockPlugin {
        this.setLockStatus();
        return this;
    }

    /**
     * 是否处于锁定状态
     * @return {boolean}
     */
    private isLock(): boolean {
        const currentTimes: number = new Date().getTime();
        return currentTimes - this.getLastExecutorTimes() <= this.times;

    }

    /**
     * 获最后执行时间
     * @return {number}
     */
    private getLastExecutorTimes(): number {
        return LOCK_KEYS[this.key].lastExecuteTimes;
    }

    /**
     * 设置
     * @param {-1} lastExecuteTimes
     */
    private setLockStatus(lastExecuteTimes: number = -1) {
        return LOCK_KEYS[this.key] = {
            lastExecuteTimes
        }
    }

}
