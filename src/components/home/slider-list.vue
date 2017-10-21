<template>
    <div>
        <slider class="slider_container"
                :style="style"
                :auto-play="autoPlay"
                :interval="interval"
                :infinite="infinite"
                @change="change"
                v-if="show">
            <image v-for="(item,i) in imageList"
                   class="slider_image"
                   :style="style"
                   :src="item.content"
                   :key="i"
                   @click="clickImage(i)"
            ></image>
            <indicator class="slider_indicator"
                       style=""
            ></indicator>
        </slider>

    </div>
</template>
<script>
    import {imageLoader} from "wxp_weex_componets/src/utils/ExportWeexModel";
    import callNative from "wxp_weex_componets/src/mixins/CallNative";
    import mixins from "wxp_weex_componets/src/mixins/index";
    import memberSession from "../../mixins/MemberSession";

    export default{
        mixins:[callNative,memberSession,mixins],
        props: {
            imageList: {default: {}},
            web: {default: false},
            autoPlay: {default: false},
            interval: {default: 3000},
            infinite: {default: false}
        },
        data(){
            return {
                style: {
                    height: "360px"
                },
                show: false
            };
        },
        methods: {
            clickImage(i){
                let item = this.imageList[i];
                const {actionType,actionValue,needLogin}=item;
                this.openActivity({
                    actionType:actionType,
                    actionValue: actionValue,
                    needLogin:needLogin
                });

            },
            change(){

            }
        },
        created(){
            if (this.web) {
                this.show = true;
            }
            imageLoader.loadImageInfo(this.imageList[0].content, 750, (map) => {
                   const {reqWidth, reqHeight}=map;
                    this.show = true;
                    this.style = {
                        height: reqHeight + "px"
                    };
                    console.log("获取图片高度!-> "+JSON.stringify(map));
                },
                (msg) => {
                    console.log("获取图片高度失败!-> "+msg);
                });
        }

    }
</script>
<style scoped>
    .slider_container {
        width: 750px;
        position: relative;
    }

    .slider_image {
        flex: 1;
    }
    .slider_indicator {
        position: absolute;
        itemColor: #ffffff;
        itemSelectedColor: #FEC343;
        itemSize: 10px;
        width: 750px;
        height: 20px;
        bottom: 20px;
    }
</style>