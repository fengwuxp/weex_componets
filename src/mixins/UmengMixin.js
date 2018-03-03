import {reportUMengByDestroy, reportUMengByIntoPage} from "../third/umeng/UmengReportUtils"
import {weexModule} from "typescript_api_sdk/src/utils/ExportWeexSdkModel";
import commonUtils from "../utils/CommonUtils";
import weexUtils from "../utils/WeexUtils";

const getCurrentPageSign = (headerTitle) => {
    const bundleUrl = weexModule.config.bundleUrl;
    const basePath = weexUtils.getBasePath();
    let uri = bundleUrl.replace(basePath, "").split("?")[0];
    if (commonUtils.isNullOrUndefined(headerTitle)) {
        return uri
    }
    return uri + " " + headerTitle;
};

export default {

    methods: {

        /**
         * 友盟页面进入上报
         */
        reportUMengByIntoPage() {
            reportUMengByIntoPage(getCurrentPageSign(this.headerTitle));
            this.$emit("onResume");
        },

        /**
         * 友盟页面离开上报
         */
        reportUMengByDestroy() {
            reportUMengByDestroy(getCurrentPageSign(this.headerTitle));
            this.$emit("onPause");
        }
    }
}