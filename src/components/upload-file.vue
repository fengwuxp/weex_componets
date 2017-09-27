<template>
    <div>
        <image @click="uploadImage" :src="uploadFileTipImage" :style="uploadNativeStyle"></image>
    </div>
</template>

<script>
    import GlobalConfig from '../../../../src/config/GlobalConfig';
    const actionSheet = weex.requireModule('actionSheet');
    const photo = weex.requireModule('photo');

    const nat_camera = weex.requireModule('nat_camera');
    const nat_network_transfer = weex.requireModule('nat_network_transfer');

    //图片服务器地址
    const picServiceURL = GlobalConfig.PIC_SERVICE_URL + "/common/picService/formUpload";

    export default{
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
            }
        },
        data(){
            const width = this.width;
            const height = this.height;
            const uploadFileTipImage = "url(" + this.uploadFileTipImage + ")";
            let inputAttr = {};
            inputAttr['accept'] = this.accept;
            return {
                uploadWebStyle: {
                    width: width + "px",
                    height: height + "px",
                    backgroundSize: width + "px" + " " + height + "px",
                    backgroundImage: uploadFileTipImage
                },
                uploadNativeStyle: {
                    width: width + "px",
                    height: height + "px",
                },
                inputStyle: {
                    width: width + "px",
                    height: height + "px",
                    opacity: 0
                },
                inputAttr: inputAttr,
                // fileBase64List: [],
                web: false
            }
        },
        methods: {
            uploadByNative(filePath){
                const self = this;
                nat_network_transfer.upload({
                    url: picServiceURL,
                    path: filePath
                }, (result) => {

                    console.log("-data-> " + JSON.stringify(data));

                    const {data, ok} = result;
                    if (data == null) {
                        console.log("上传中!");
                        return;
                    }
                    if (!ok) {
                        console.log("上传失败!");
                        return;
                    }
                    const resp = JSON.parse(data);
                    const {url} = resp;
                    const map = {};
                    map[self.type] = [{
                        orderNumber: self.orderNumber,
                        url: GlobalConfig.PIC_SERVICE_URL + "/" + url
                    }];
                    console.log("map->  " + JSON.stringify(map));
                    self.$emit("uploadCallback", {
                        urlMap: map,
                        callback: function (width = 200, height = 200) {
                            self.uploadNativeStyle = {
                                width: width + "px",
                                height: height + "px"
                            }
                        }
                    });

                });
            },
            chooseImage(){
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
                    if (result === 'success') {
                        const {value, index} = ret.data;
                        const proportion = {};
                        if (self.proportion.length === 0) {
                            //表示不限制
                        } else {
                            proportion.aspectX = self.proportion[0];
                            proportion.aspectY = self.proportion[1]
                        }
                        const {aspectX, aspectY} = proportion;
                        if (index === 0) {
                            photo.captureImage(true, {aspectX: aspectX, aspectY: aspectY}, ({result, path}) => {
                                console.log("result-> " + result)
                                console.log("path-> " + path)
                                console.log("-参数-> " + JSON.stringify(arguments));
                                if (result) {
                                    self.uploadByNative(path);
                                }
                            });
                        } else if (index === 1) {
                            photo.captureImage(false, {aspectX: aspectX, aspectY: aspectY}, ({result, path}) => {
                                console.log("result-> " + result)
                                console.log("path-> " + path)
                                console.log("-参数->" + JSON.stringify(arguments));
                                if (result) {
                                    self.uploadByNative(path);
                                }
                            });
                        }
                    }

                });
            },
            uploadImage(event){
                this.chooseImage();
            }
        },
        created(){
        }
    }

</script>

<style scoped>

</style>