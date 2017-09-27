<!--回到顶部-->
<template>
    <image v-if="show" :src="backTopIcon" :style="backStyle" @click="backTop"></image>
</template>
<script>
    import weexUtils from "wxp_weex_componets/src/utils/WeexUtils";
    import {dom} from "wxp_weex_componets/src/utils/ExportWeexModel"

    export default {
        props:{
            backTopIcon:{default:weexUtils.getResourcesURL("images/back_top_icon.png",weex)},
            backStyle:{
                default:{
                    width:"60px",
                    height:"60px",
                    position:"fixed",
                }
            },
            position:{
                default:{
                    right:"40px",
                    bottom:"150px"
                }
            },
            show:{default:false}
        },
        data(){
          return {
          }
        },
        methods:{
            backTop(){
                let el = this.$parent.$refs['top_position'];
                dom.scrollToElement(el);
                this.$emit("backTop");
                this.show = false;
            },
            change(contentOffset){
                const {y} = contentOffset;
                if (y < 100) {
                    this.show = true;
                } else {
                    this.show = false;
                }
            }
        },
        beforeMount(){
            this.backStyle=Object.assign(this.backStyle,this.position);
        }
    }
</script>
<style scoped></style>