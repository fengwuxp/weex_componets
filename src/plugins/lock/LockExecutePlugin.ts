import {UIPlugin} from "../UIPlugin";


/**
 * 锁定执行插件
 */
export interface LockExecutePlugin extends UIPlugin {

    /**
     * 锁定的对象
     * @param obj
     *  @return {LockExecutePlugin}
     */
    lock(obj: any): LockExecutePlugin;

    /**
     * 执行
     * @param executor
     * @return {LockExecutePlugin}
     */
    execute(executor: any): LockExecutePlugin;


    /**
     * 解锁
     * @return {LockExecutePlugin}
     */
    unLock(): LockExecutePlugin;

}