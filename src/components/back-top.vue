<!--回到顶部-->
<template>
    <image :src="backTopIcon" :style="backStyle" @click="backTop"></image>
</template>
<script>
    import weexUtils from "../utils/WeexUtils";
    import {dom} from "typescript_api_sdk/src/utils/ExportWeexSdkModel";

    const defStyle = {
        right: "35px",
        bottom: "120px"
    }
    const hideStyle = {
        right: "-135px",
        bottom: "120px"
    }
    export default {
        props: {
            backTopIcon: {default: weexUtils.getResourcesURL("images/back_top_icon.png")},
            backStyle: {
                default: {
                    width: "80px",
                    height: "80px",
                    position: "fixed",
                    ...hideStyle
                }
            }
        },
        data() {
            return {}
        },
        methods: {
            backTop() {
                this.$emit("backTop");
            },
            change(contentOffset) {
                const {y} = contentOffset;
                if ((y + 100) < 0) {
                    this.backStyle = Object.assign(this.backStyle, defStyle);
                } else {
                    this.backStyle = Object.assign(this.backStyle, hideStyle);
                }
            }
        },
        beforeMount() {
            // this.backStyle = Object.assign(this.backStyle);
        }
    }
</script>
<style scoped></style>