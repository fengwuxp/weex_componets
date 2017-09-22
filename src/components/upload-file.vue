<template>
    <div>
        <div v-if="web" :style="uploadWebStyle">
            <input type="file" v-if="selectedMaxNum<=1"
                   :accept="inputAttr.accept"
                   :style="inputStyle" @change="uploadImage"/>
            <input type="file" v-else multiple="multiple"
                   :accept="inputAttr.accept"
                   :style="inputStyle" @change="uploadImage"/>
        </div>
        <div v-else>
            <image @click="uploadImage" :src="uploadFileTipImage" :style="uploadNativeStyle"></image>
        </div>
    </div>
</template>

<script>
    import ApiReqFactory from '../utils/ApiReqFactory';
    import weexUtils from '../utils/WeexUtils';

    import GlobalConfig from '../config/GlobalConfig';
    import systemService from '../services/system/SystemService';

    const actionSheet = weex.requireModule('actionSheet');
    const photo = weex.requireModule('photo');

    let wxJsUtils = {};
    if (weex.config.env.platform.toLowerCase() === "web") {
        wxJsUtils = require('../utils/WxJSUtils');
    }
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
                const self = this;
                if (weex.config.env.platform.toLowerCase() !== 'web') {
                    //原生环境
                    self.chooseImage();
                    return;
                }
                var ua = window.navigator.userAgent.toLowerCase();
//                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
//                    //微信
//                    this.uploadImageInWx();
//                }else{
//                    //普通浏览器
//                    this.getBase64ToWeb(event);
//                }
                this.getBase64ToWeb(event);
            },
            changeStyleInWeb(urls, options){
                console.log(arguments);
                urls.forEach((url) => {
                    this.uploadWebStyle.backgroundImage = "url(" + url + ")";
                    this.uploadWebStyle.width = options.width + "px";
                    this.uploadWebStyle.height = options.height + "px";
                    this.uploadWebStyle.backgroundSize = options.width + "px" + " " + options.height + "px";
                    this.inputStyle.width = options.width + "px";
                    this.inputStyle.height = options.height + "px";
                });
            },
            uploadImageInWx(){
                //web环境默认为wx
                //调用wx js-sdk上传
                //1.选择图片
                const self = this;
                wxJsUtils.promiseWarp("chooseImage", {
                    count: self.selectedMaxNum, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                }).then((res) => {
                    const promiseList = [];
                    const urls = [];
                    //2.上传
                    res.localIds.forEach(function (localId, i) {
                        const p = wxJsUtils.upload(localId);
                        promiseList[i] = p;
                        p.then(function (url) {
                            urls[urls.length] = {
                                orderNumber: self.orderNumber,
                                url: url
                            };
                        }).catch(function (res) {
                            alert("-->" + JSON.stringify(res));
                        });
                    });
                    let urlMap = {};

                    //所有图片都上传成功后执行 uploadCallback
                    Promise.all(promiseList).then(function () {
                        self.$emit("uploadCallback", {
                            urlMap: urlMap,
                            callback: self.changeStyleInWeb
                        });
                    }, function () {
                        if (urls.length === 0) {
                            //上传失败
                            weexUtils.toast("上传失败!");
                            return;
                        }
                        urlMap[self.type] = urls;
                        self.$emit("uploadCallback", {
                            urlMap: urlMap,
                            callback: self.changeStyleInWeb
                        });
                    });
                }, (res) => {
                    alert("调用微信js-sdk失败，请检查是否处于微信环境");
                });

            },
            getBase64ToWeb(event){
                //在网页上调用的方法
                //console.log(event.target);
                const self = this;
                let files = event.target.files;
                const length = files.length;
                let index = 0;
                // console.log(files);
                //获取文件base64编码数据
                const fileBase64List = [];
                let file = files[index];
                const reader = new FileReader();
                reader.readAsDataURL(files[index]);
                reader.onload = function (e) {
                    index++;
                    self.readerOnLoad(e, file, length, fileBase64List);
                    if (index === files.length) {
                        //调用上传
                        self.uploadByBase64({
                            type: self.type, list: fileBase64List,
                            callback: function (width=200,height=200,urls=[]) {
                                self.changeStyleInWeb(urls,{
                                    width,
                                    height
                                });
                            }
                        });
                        return;
                    }
                    reader.readAsDataURL(files[index]);
                };
            },

            readerOnLoad(event, file, length, fileBase64List){
                let split = file.name.split(".");
                let extName = split[split.length - 1];
                fileBase64List[fileBase64List.length] = {
                    base64Data: event.target.result,
                    extName: extName
                };
            },
            uploadByBase64: function (params) {
                //图片上传
                const self = this;
                const promiseList = [];
                const urlList = [];
                const base64Mapping={
                    jpg:"jpeg",
                  png:"pnj"
                };
                params.list.forEach(function (data) {
                    let extName = data.extName;
                    const s = "data:image/" + base64Mapping[extName.toLowerCase()] + ";base64,";
                    const param = ApiReqFactory.newInstancesReq({
                        base64Data: data.base64Data.replace(s, ""),//由于图片真实的base64字符串编码没有这个前缀，所有需要删除
                        extName: extName
                    });

                    const p = systemService.uploadImage(param);
                    promiseList[promiseList.length] = p;
                    p.then(function (url) {
                        urlList[urlList.length] = url;
                        self.guploadFileTipImage = url;
                    });
                });

                Promise.all(promiseList).then(function () {
                    const map = {};
                    map[self.type] = [{
                        orderNumber: self.orderNumber,
                        url: urlList[0]
                    }];
                    self.$emit("uploadCallback",{
                        urlMap: map,
                        callback: params.callback
                    })
                });

            }
        },
        created(){
            this.web = weex.config.env.platform.toLowerCase() === "web";
        }
    }

</script>

<style>
    .web-upload {

    }
</style>