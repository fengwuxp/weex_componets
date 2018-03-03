import {debounce} from "typescript_api_sdk/src/utils/DebounceUtil";
import weexUtils from "../../utils/WeexUtils";

//点击次数
let MAX_CLICK_COUNT: number = 3;

const DEV_VIEW_URL: string = "/dev_view";

/**
 * 打开开发者页面
 */
export default {
    methods:{
        openDevInfoView() {
            if (MAX_CLICK_COUNT) {
                MAX_CLICK_COUNT--;
                weexUtils.toast(`再点击${MAX_CLICK_COUNT}次打开开发者页面`, null, 1);
            }
            this.jumpDevView(DEV_VIEW_URL);
        },
        jumpDevView:debounce(2000,function(url){
            console.log(url);
            if (MAX_CLICK_COUNT === 0) {
                this.jump(url);
            }
            MAX_CLICK_COUNT = 3;
        })
    }
}