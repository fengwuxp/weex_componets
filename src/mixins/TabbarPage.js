/**
 * Created by wuxp on 2017/6/2.
 */
import {dom} from "../utils/ExportWeexModel";

export default {
    data() {
        const env = weex.config.env;
        let deviceWidth = env.deviceWidth;
        let defWidth = 750.0;  //默认宽度
        let rpx = deviceWidth / defWidth;
        return {
            ref: "viewport",
            rpx,
            web: env.platform.toLowerCase() === "web",
            listStyle: {}
        }
    },
    methods: {
        getPageHeight(height = 100) {
            dom.getComponentRect(this.ref, ({result, size}) => {
                let contentHeight = size.height && result > 0 ? ((size.height * this.rpx)) : weex.config.env.deviceHeight;
                let number = contentHeight - height; //220;
                number = parseInt(number / this.rpx);
                this.listStyle.height = (number) + "px";
            });
        },
        getHeightByDeviceHeight(height) {
            return new Promise((reslove, rejcet) => {
                dom.getComponentRect(this.ref, ({result, size}) => {
                    let contentHeight = size.height && result > 0 ? ((size.height * this.rpx)) : weex.config.env.deviceHeight;
                    let number = contentHeight - height; //220;
                    number = parseInt(number / this.rpx);
                    reslove(number);

                });

            });
        }
    },
    created() {
        if (this.web) {
            this.getPageHeight(!(this['headerHeight'] === null || this['headerHeight'] === undefined) ? this['headerHeight'] : 100);
        } else {
            this.listStyle = {
                flex: "1"
            }
        }
    }

}