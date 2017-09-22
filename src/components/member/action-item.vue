<!--个人中心页面操作项-->
<template>
    <div @click="clickTriggerAction" class="flex_row action-item flex_center">
        <image :src="icon" class="image_50"></image>
        <div class="action-item-text flex_row flex_cell flex_center" :style="itemStyle">
            <div class="flex_row flex_cell flex_between">
                <text class="text_default">{{text}}</text>
                <div class="flex_row flex_v_center" v-if="rightText.length>0">
                    <text class="text_ff9800" v-if="rightImportantText.length>0">{{rightImportantText}}</text>
                    <text class="text_666">{{rightText}}</text>
                </div>
            </div>
            <image :src="rightIcon" class="image_36"></image>
        </div>
    </div>
</template>
<script>
    import weexUtils from '../../utils/WeexUtils';
    export default {
        props:{
            icon:{default:""},  //左侧图标
            text:{default:""},  //文本
            rightIcon:{default: weexUtils.getResourcesURL("images/right_icon.png", weex)},  //右侧图片
            rightText:{default:""},  //右侧文本
            rightImportantText:{default:""}, //右侧重点提示文本
            itemCode:{default:""},
            itemStyle:{default:{}}     //样式
        },
        methods:{
            /**
             * 点击触发的时间
             */
            clickTriggerAction(){
                this.$emit("clickAction",{
                    text:this.text,
                    code:this.itemCode
                });
            }
        }
    }
</script>
<style lang="sass" scoped>
    @import "../../assets/base/flex.scss";
    @import "../../assets/base/text.scss";
    @import "../../assets/base/margin_common.scss";
</style>
<style scoped>
    .action-item{
        background-color: #ffffff;
        padding: 0 0 0 20px;
    }
    .action-item-text{
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 28px;
        padding-bottom: 28px;
    }

    .image_50{
        width: 50px;
        height:50px;
    }
    .image_36{
        width: 36px;
        height:36px;
    }
</style>