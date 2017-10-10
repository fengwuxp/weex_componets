<!--查看大图-->
<template>
    <div class="view_container flex_center" :style="viewStyle">
        <app-header class="w_750"
                    :backIconUrl="backIconUrl"
                    :title="title"
                    @backPage="close"></app-header>
        <div class="flex_cell w_750" style="margin-top: 80px;"
             v-if="list.length>0">
            <slider :style="containerStyle"
                    :index="initIndex"
                    @change="change"
                    v-if="show">
                <div class="flex_cell w_750 flex_center"
                     v-for="(item,i) in list"
                     :key="i">
                    <image v-if="item.show"
                           :src="item.src"
                           :style="item.style"></image>
                </div>
            </slider>
            <text class="text_white">{{pictureTip}}</text>
        </div>
        <div class="picture-footer w_750"
             :style="footerStyle"
             v-if="texts.length>0">
            <slot slot="picture-footer"></slot>
        </div>
    </div>
</template>
<script>
    import AppHeader from "wxp_weex_componets/src/components/structure/app-header.vue";

    import {imageLoader} from "wxp_weex_componets/src/utils/ExportWeexModel";
    import weexUtils from "wxp_weex_componets/src/utils/WeexUtils";

    export default {
        components: {AppHeader},
        props: {
            viewStyle:{
                default:{
                    left:"10000px"
                }
            },
            images: {default: []},
            texts: {default: []},
            maxHeight: {default: 1000},
            maxWidth: {default: 750},
            containerStyle: {
                default: {
                    width: "750px"
                }
            },
            backIconUrl: {default: weexUtils.getResourcesURL("images/arrow_returns_icon.png", weex)},
            title: {default: "查看大图"},
            footerStyle: {},
            initIndex: {default: 0},
            currentPicture: {default: ""}
        },
        data() {
            return {
                list: [],
                show: false,
                pictureTip: ""
            }
        },
        methods: {
            change({index}) {
                if (!index) {
                    index = 0;
                }
                this.setTipText(index);
            },
            /**
             * 初始化该页面的图片数据
             * @param $pictures 该页面的图片组件的ref实例
             */
            initData($pictures=[]){
                console.log($pictures);
                let pictures = [];
                $pictures.forEach((item, i) => {
                    pictures[i] = item.src;
                });
                this.images = pictures;
                this.init();
            },
            init(){
                if(this.images.length===0){
                    return;
                }
                this.containerStyle.height = this.maxHeight + "px";
                let list = [];
                this.images.forEach((item) => {
                    list[list.length] = {
                        src: item,
                        style: {},
                        show: false
                    }
                });
                this.setIndex(this.currentPicture);
                this.list = list;
                this.loadImage(this.initIndex);
                this.list.forEach((item, i) => {
                    if (this.initIndex === i) {
                        return;
                    }
                    this.loadImage(i);
                });
            },
            setTipText(index) {
                this.pictureTip = (index + 1) + "/" + this.images.length;
                console.log("this.pictureTip-> " + this.pictureTip);
            },
            showView(status){
                if(status){
                    this.viewStyle.left="0px";
                }else {
                    this.viewStyle.left="10000px";
                }
            },
            setIndex(src) {
                //判断是第几张图片
                this.images.some((item, i) => {
                    if (item === src) {
                        this.initIndex = i;
                        return true;
                    }
                    return false;
                });
                this.setTipText(this.initIndex);
            },
            setStyle({imageWidth, imageHeight}, i) {

                let width = imageWidth, height, proportion;

                proportion = imageWidth / this.maxWidth;
                height = imageHeight / proportion;

                //高度超过最大高度
                if (height > this.maxHeight) {
                    height = this.maxHeight;
                }

                //重新计算宽度
                proportion = imageHeight / height;
                width = imageWidth / proportion;

                this.list[i].style = Object.assign(this.list[i].style, {
                    width: width + "px",
                    height: height + "px"
                });
                this.list[i].show = true;
                if (!this.show) {
                    this.show = true;
                }
                console.log(this.list[i].style);
            },
            loadImage(i) {
                let src = this.list[i].src;
                imageLoader.loadImageInfo(src, 750, (map) => {
                    const {reqWidth, reqHeight} = map;
                    this.setStyle({
                        imageWidth: reqWidth,
                        imageHeight: reqHeight
                    }, i);
                    console.log("获取图片高度!-> " + JSON.stringify(map));
                }, (msg) => {
                    console.log("获取图片高度失败!-> " + msg);
                });
            },
            close() {
                //关闭当前页面
                console.log("关闭当前页面");
                this.$emit("close");
            }
        },
        beforeMount() {
            this.init();
        }
    }
</script>
<style scoped>
    .view_container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #000000;
    }

    .flex_cell {
        flex: 1;
        width: 750px;
    }

    .flex_center {
        justify-content: center;
        align-items: center;
    }

    .w_750 {
        width: 750px;
    }

    .picture-footer {
        justify-content: flex-end;
    }

    .text_white {
        margin-top: 25px;
        font-size: 32px;
        color: #ffffff;
        text-align: right;
        padding-right: 40px;
    }
</style>