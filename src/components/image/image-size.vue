<!--扩展weex的image能力 加入自适应布局功能-->
<template>
    <image v-if="show" :src="src" :style="style"></image>
</template>
<script>
    import {imageLoader} from "wxp_weex_componets/src/utils/ExportWeexModel";

    export default {
        props: {
            width: {default: -1},   //期望宽度   -1表示自适应
            height: {default: -1},  //期望高度
            proportion: {default: -1},
            style: {
                default: {}
            },
            src: {default: ""},
            maxWidth: {
                default: 750
            }
        },
        data() {
            let web = weex.config.env.platform.toLowerCase() === "web";
            return {
                web,
                show: false
            };
        },
        methods: {

            //固定比例
            fixedProportion() {

            },
            setStyle({imageWidth, imageHeight}) {
                console.log(this.style);

                if (imageWidth === -1 && imageHeight === -1) {
                    //wbe端
                    this.show = true;
                    return;
                }

                if (this.width === -1 && this.height === -1) {
                    //自适应
                    if (imageHeight > this.maxWidth) {
                        //图片宽度超过最大允许宽度
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
                this.style = Object.assign(this.style, {
                    width: width + "px",
                    height: height + "px"
                });
                this.show = true;
                console.log(this.style);
            }
        },
        beforeMount() {
//            if (this.src.trim().length === 0) {
//                return;
//            }
            this.width = parseInt(this.width);
            if (this.width > this.maxWidth) {
                //最大宽度
                this.width = this.maxWidth;
            }
            //console.log(JSON.stringify(this.style));
            imageLoader.loadImageInfo(this.src, this.width, (map) => {
                const {reqWidth, reqHeight} = map;
                this.setStyle({
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
<style scoped>
    .weex-image {
        flex: 1;
    }
</style>