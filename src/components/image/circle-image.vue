<!--圆角图片-->
<template>
    <div>
        <image v-if="!android" @click="click" :src="src" :style="style"></image>
        <!--CircleImage由安卓客户端实现-->
        <CircleImage v-if="android" @click="click" :src="src" :radius="radius" :style="style"></CircleImage>
    </div>
</template>
<script>
    export default {
        props: {
            src: {default: ""},
            width: {default: 0},
            imageStyle: {default: {}},
            radius: {default: ""}
        },
        data() {
            let android = weex.config.env.platform.toLowerCase() === "android";
            return {
                android,
                style: {}
            }
        },
        methods: {
            click() {
                this.$emit("clickImage", this.src);
            }
        },
        beforeMount() {
            let radius = this.width / 2;
//            if (this.radius === "") {
//                this.radius = radius;
//            }
            this.style = Object.assign(this.imageStyle, {
                width: this.width + "px",
                height: this.width + "px",
                borderRadius: radius + "px"
            });
        }
    }
</script>