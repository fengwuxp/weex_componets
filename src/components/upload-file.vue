<template>
    <div style="position: relative;">
        <image @click="uploadImage"
               :src="uploadFileTipImage"
               :style="uploadNativeStyle"></image>
        <div v-if="uploadStatus===1 && maskText"
             :style="Object.assign({},uploadNativeStyle,maskStyle)"
             class="mask_text">
            <text :style="maskTextStyle" :value="maskText"></text>
        </div>

    </div>
</template>

<script>
    import GlobalApiConfig from "typescript_api_sdk/src/config/GlobalAipConfig";
    import weexUtils from "../utils/WeexUtils";

    const actionSheet = weex.requireModule('actionSheet');
    const photo = weex.requireModule('photo');
    const appMain = weex.requireModule("appMain");

    const nat_camera = weex.requireModule('nat_camera');
    const nat_network_transfer = weex.requireModule('nat_network_transfer');

    //图片服务器地址
    const PIC_SERVICE_URL = GlobalApiConfig.PIC_SERVICE_URL;
    const PIC_SERVICE_DOMAIN = GlobalApiConfig.PIC_SERVICE_DOMAIN;

    export default {
        props: {
            //上传的提示图片
            uploadFileTipImage: {
                type: String,
                default: ""
            },
            //上传区域宽度
            width: {
                type: Number,
                default: 200
            },
            //上传区域高度
            height: {
                type: Number,
                default: 200
            },
            //是否自动上传
            autoUpload: {
                type: Boolean,
                default: true
            },
            //上传的文件类型
            accept: {
                type: String,
                default: "*",
            },
            //可以选择的最大文件数量
            selectedMaxNum: {
                type: Number,
                default: 1
            },
            type: {
                //上传类型用来区分在一个页面有多个文件上传的时候来区分具体回调操作
                type: String,
                default: "upload"
            },
            orderNumber: {
                type: Number,
                default: 0
            },
            //裁图比例
            proportion: {
                type: Array,
                default: [1, 1]
            },
            crop: {
                default: true
            },
            radius: { //圆角大小
                default: 0
            },
            maskText: {
                default: "图片上传中..."
            },
            maskStyle: {
                default: {
                    backgroundColor: "rgba(0,0,0,.4)"
                }
            },
            maskTextStyle: {
                default: {
                    color: "#ffffff",
                    fontSize: 30
                }
            }

        },
        data() {
            const width = this.width;
            const height = this.height;
            let uploadNativeStyle = {
                width: width + "px",
                height: height + "px",
            };
            let ios = weex.config.env.platform.toLowerCase() === "ios";
            return {
                ios,
                uploadNativeStyle,
                //上传状态 0：等待 1:上传中 2：上传成功 -1：上传失败
                uploadStatus: 0
            }
        },
        methods: {
            uploadByNative(filePath) {
                const self = this;
                console.log("上传filePath：" + filePath);
                appMain.showProgressBar(20);
                this.uploadStatus = 1;
                nat_network_transfer.upload({
                    url: PIC_SERVICE_URL,
                    path: filePath
                }, (result) => {
                    console.log("-result-> " + JSON.stringify(result));

                    const {data, ok, progress} = result;
                    console.log(data);
                    console.log(ok);
                    if (progress) {
                        console.log("上传中!");
                        return;
                    }
                    appMain.hideProgressBar();
                    if (!ok) {
                        this.uploadStatus = -1;
                        console.log("上传失败!");
                        return;
                    }
                    if (data == null) {
                        console.log("上传无结果!");
                        return;
                    }
                    this.uploadStatus = 2;
                    const resp = JSON.parse(data);
                    const {url} = resp;
                    const map = {};
                    result = {
                        orderNumber: self.orderNumber,
                        url: PIC_SERVICE_DOMAIN + url
                    }
                    console.log("map->  " + JSON.stringify(map));
                    self.$emit("uploadCallback", {
                        result,
                        type: this.type,
                        callback: function (width = 200, height = 200) {
                            self.uploadNativeStyle = {
                                width: width + "px",
                                height: height + "px"
                            }
                            this.uploadStatus = 0;
                        }
                    });

                });
            },
            chooseImage() {
                //在原生环境下先选择图片
                //http://natjs.com/#/reference/media/image
                const items = [];
                items[0] = {'type': 0, 'message': '拍照'};
                items[1] = {'type': 0, 'message': '从相册取'};
                items[2] = {'type': 1, 'message': '取消'};

                const self = this;
                actionSheet.create({
                    'items': items,
                    'title': '提示',
                    'message': '请选择'
                }, (ret) => {
                    let result = ret.result;
                    console.log("-图片选择或拍照结果-> " + JSON.stringify(ret));
                    if (result !== 'success') {
                        console.log("图片选择或拍照失败");
                        return;
                    }
                    const {message, index} = ret.data;
                    if (index > 1) {
                        console.log("取消");
                        return;
                    }
                    const proportion = {};
                    if (self.proportion.length === 0) {
                        //表示不限制
                    } else {
                        //ios 支持 1：1   4：3   16：9
                        proportion.aspectX = self.proportion[0];
                        proportion.aspectY = self.proportion[1]
                    }
                    const {aspectX, aspectY} = proportion;
                    console.log("是否为拍照--> " + (message === "拍照"))
                    photo.capture(this.booleanConver(index === 0),
                        this.booleanConver(this.crop),
                        {aspectX: aspectX, aspectY: aspectY}, (data) => {
                            console.log("local path-> " + data);
                            if (data === undefined || data === null) {
                                weexUtils.toast("图片选择出现异常!");
                                return;
                            }
                            if (data.toString().toLowerCase().indexOf("p:") === 0) {
                                //表示进度信息
                                appMain.showProgressBar(20);
                            } else {
                                appMain.hideProgressBar();
                                self.uploadByNative(data);
                            }

                        }, (message) => {
                            weexUtils.toast(message);
                        });
                });
            },

            /**
             * 针对Ios下boolean转换失败的处理 返回0 或 1
             * @param flag
             * @return {*}
             */
            booleanConver(flag) {
                if (!this.ios) {
                    return flag;
                }
                return flag ? 1 : 0;
            },
            uploadImage(event) {
                this.chooseImage();
            }
        },
        beforeMount() {
            console.log("this.rudius-> " + this.radius);
            if (this.radius > 0) {
                this.uploadNativeStyle.borderRadius = this.radius + "px";
            }
        }
    }

</script>

<style scoped>
    .mask_text {
        position: absolute;
        justify-content: center;
        align-items: center;
        top:0;
        left: 0;
    }
</style>
