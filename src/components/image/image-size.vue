<!--扩展weex的image能力 加入自适应布局功能-->
<template>
    <image v-if="show" @click="click" :src="src" :style="style"></image>
</template>
<script>
    import {imageLoader} from "../../utils/ExportWeexModel";

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
            // let web = weex.config.env.platform.toLowerCase() === "web";
            return {
                //web,
                show: false
            };
        },
        methods: {
            click() {
                console.log("cliek -> ")
                this.$emit("imageClick",this.src);
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
                if (this.width === -1 && this.height === -1) {
                    //自适应
                    if (imageWidth <= this.maxWidth) {
                        this.width = imageWidth;
                    }else {
                        this.width = this.maxWidth;
                    }
                }
                let width, height, proportion;
                if (this.height === -1) {
                    //指定宽度 高度自适应
                    proportion = imageWidth / this.width;
                    width = this.width;
                    height = imageHeight / proportion;
                } else if (this.width === -1) {
                    //指定高度，宽度自适应
                    proportion = imageHeight / this.height;
                    height = this.height;
                    height = imageWidth / proportion;
                } else {
                    //强行指定高度
                    width = this.width;
                    height = this.height;
                }
                this.setStyle({
                    width: width + "px",
                    height: height + "px"
                });
            },
            /**
             * 设置图片样式
             * @param style
             */
            setStyle(style) {
                this.style = Object.assign(this.style, style);
                this.show = true;
                console.log("图片样式-> " + JSON.stringify(this.style));
            }
        },
        beforeMount() {
            this.width = parseInt(this.width);
            this.maxWidth=parseInt(this.maxWidth)
            if (this.width > this.maxWidth) {
                //最大宽度
                this.width = this.maxWidth;
            }
            this.height = parseInt(this.height);
            if (this.width > 0 && this.height > 0) {
                this.setStyle({
                    width: this.width + "px",
                    height: this.height + "px"
                });
                return;
            }
            imageLoader.loadImageInfo(this.src, this.width, (map) => {
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