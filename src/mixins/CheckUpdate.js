/**
 * 检查更新
 */
import {appUpdate, common} from "typescript_api_sdk/src/utils/ExpotrtWeexCustomModel";
import ApiReqFactory from "typescript_api_sdk/src/utils/ApiReqFactory";

export default {
    methods: {
        /**
         * 检测更新(仅支持安卓端)
         * @param appCode
         */
        checkApkUpdate(appCode) {
            if (this.ios) {
                return;
            }
            console.log("准备检查更新!");
            // if(showTips){
            //     weexUtis.toast("版本检查中...");
            // }
            common.getAppVersionInfo(({versionCode, versionName, packageName}) => {
                console.log("当前版本-> " + versionCode);

                this.getAppVersionByServer(appCode,versionCode, (data) => {
                    let resp = {
                        code: 0,
                        data,
                        message: ""
                    };
                    appUpdate.checkVersion(resp, () => {
                        console.log("检查更新调用成功!");
                    }, () => {
                        console.log("检查更新调用失败!");
                    });
                });
            }, () => {
                console.log("获取版本信息失败!");
            });

        },
        /**
         * 从服务端获取版本号
         * @param appCode
         * @param versionCode
         * @param callback
         */
        getAppVersionByServer(appCode,versionCode, callback) {
            let req = ApiReqFactory.newInstancesReq({
                appCode,
                //platformType: this.ios ? this.PlatformType.IOS.name : this.PlatformType.ANDROID.name,
                platformType: "ANDROID",
                currVersionCode: parseInt(versionCode)
            });

            this.appService.checkAppVersion(req).then((data) => {
                // console.log(JSON.stringify(data));
                callback(data);

            }).catch(({message}) => {
                console.log(message ? message : "检查更新查询失败!");
            });
        }
    }
}