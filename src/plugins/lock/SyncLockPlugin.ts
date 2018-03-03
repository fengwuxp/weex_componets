import {LockExecutePlugin} from "./LockExecutePlugin";

/**
 * 使用 async wait同步锁执行Promise
 */
export default class SyncLockPlugin implements LockExecutePlugin {

    /**
     * promise执行器
     */
    private executor: Promise<any>;


    private constructor(executor: Promise<any>) {
        this.executor = executor;
    }

    lock(obj: any): LockExecutePlugin {
        return null;
    }

    execute(executor: any): LockExecutePlugin {
        return null;
    }

    unLock(): LockExecutePlugin {
        return null;
    }
}