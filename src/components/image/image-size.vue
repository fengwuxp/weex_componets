<!--扩展weex的image能力 加入自适应布局功能-->
<template>
    <image v-if="show" @load="imageLoad" @click="click" :src="src" :style="style"></image>
</template>
<script>
    import {imageLoader} from "typescript_api_sdk/src/utils/ExpotrtWeexCustomModel";

    export default {
        props: {
            width: {default: -1},      //期望宽度   -1表示自适应
            height: {default: -1},     //期望高度
            proportion: {default: -1}, //默认图片比例 -1表示自适应
            style: {
                default: {}
            },
            src: {default: ""},
            maxWidth: {
                default: 750
            }
        },
        data() {
            return {
                show: false
            };
        },
        methods: {
            click() {
                this.$emit("imageClick", this.src);
            },
            //固定比例
            fixedProportion() {
                //TODO 图片按照固定比例显示
            },
            /**
             * 设置图片大小
             * @param imageWidth
             * @param imageHeight
             */
            setSize({imageWidth, imageHeight}) {
                let autoWidth = this.height === -1;
                let autoHeihgt = this.width === -1;
                if (autoWidth && autoHeihgt) {
                    //自适应
                    if (imageWidth <= this.maxWidth) {
                        this.width = imageWidth;
                    } else {
                        this.width = this.maxWidth;
                    }
                }
                let width, height, proportion;
                if (autoWidth) {
                    //指定宽度 高度自适应
                    proportion = imageWidth / this.width;
                    width = this.width;
                    height = imageHeight / proportion;
                }else if (autoHeihgt) {
                    //指定高度，宽度自适应
                    proportion = imageHeight / this.height;
                    height = this.height;
                    height = imageWidth / proportion;
                }
                if (!autoHeihgt && !autoWidth) {
                    //强行指定高度
                    width = this.width;
                    height = this.height;
                }
                this.setStyle({
                    width: width + "px",
                    height: height + "px"
                });
                this.$emit("onLoad", {
                    width,
                    height
                });
            },
            /**
             * 设置图片样式
             * @param style
             */
            setStyle(style) {
                this.style ={...this.style,...style};
                this.show = true;
                console.log("图片样式-> " + JSON.stringify(this.style));
            },
            imageLoad({size, success}) {
                const {
                    naturalWidth,
                    naturalHeight
                } = size;
                if (naturalWidth === -1 || naturalHeight === -1) {
                    return;
                }
                this.setSize({
                    imageWidth: naturalWidth,
                    imageHeight: naturalHeight
                });
            }
        },
        beforeMount() {
            this.width=parseInt(this.width);
            this.height=parseInt(this.height);
            imageLoader.loadImageInfo(this.src, this.width === -1 ? this.maxWidth : this.width,
                (map) => {
                    const {reqWidth, reqHeight} = map;
                    this.setSize({
                        imageWidth: reqWidth,
                        imageHeight: reqHeight
                    });
                    console.log("获取图片高度!-> " + JSON.stringify(map));
                }, (msg) => {
                    console.log("获取图片高度失败!-> " + msg);
                });
        }
    }
</script>
