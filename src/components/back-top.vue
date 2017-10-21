<!--回到顶部-->
<template>
    <image v-if="show" :src="backTopIcon" :style="backStyle" @click="backTop"></image>
</template>
<script>
    import weexUtils from "../utils/WeexUtils";
    import {dom} from "../utils/ExportWeexModel"

    export default {
        props: {
            backTopIcon: {default: weexUtils.getResourcesURL("images/back_top_icon.png", weex)},
            backStyle: {
                default: {
                    width: "80px",
                    height: "80px",
                    position: "fixed",
                }
            },
            position: {
                default: {
                    right: "35px",
                    bottom: "120px"
                }
            },
            show: {default: false}
        },
        data() {
            return {}
        },
        methods: {
            backTop() {
                let el = this.$parent.$refs['top_position'];
                dom.scrollToElement(el);
                this.$emit("backTop");
            },
            change(contentOffset) {
                const {y} = contentOffset;
                this.show = (y + 100) < 0;
            }
        },
        beforeMount() {
            this.backStyle = Object.assign(this.backStyle, this.position);
        }
    }
</script>
<style scoped></style>