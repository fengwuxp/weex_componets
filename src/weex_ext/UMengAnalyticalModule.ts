import {weexModule} from "typescript_api_sdk/src/utils/ExportWeexSdkModel.js";

/**
 * 友盟
 */
if (weexModule.config.env.platform.toLowerCase() === 'web') {

    const umeng = {
        /**
         * 进入页面
         * @param {string} pageName
         */
        beginLogPageView(pageName: string) {
            console.log(pageName);
        },


        /**
         * 离开页面
         * @param {string} pageName
         */
        endLogPageView(pageName: string) {
            console.log(pageName);
        },

        /**
         * 新注册用户
         * @param {string} accountId
         */
        newAccount(accountId: string) {
            console.log("新注册用户");
        },
        /**
         * 自定义事件
         * @param {string} eventId
         */
        event(eventId: string) {
            console.log("web端暂不支持");
        },

        /**
         * 自定义事件
         * @param {string} eventId
         * @param {string} label
         */
        eventAndLabel(eventId: string, label: string) {
            console.log("web端暂不支持");
        },
        /**
         * 自定义事件
         * @param {string} eventId
         * @param {Object} params
         */
        eventAndMap(eventId: string, params: object) {
            console.log("web端暂不支持");
        }
    };
    console.log("注册自定义模块 umeng");
    weexModule.registerModule('umeng', umeng);
}