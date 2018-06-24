<!-- 操作列表 -->
<template>
    <wxc-popup popup-color="rgba(255,255,255,0)"
               ref="wxc_prop"
               :show="isShow"
               @wxcPopupOverlayClicked="popupOverlayBottomClick"
               pos="bottom"
               :height="popupHeight">
        <div class="flex_cell flex_h_center padding_20">
            <div class="bg_white action_items">
                <div v-for="(item,i) in items"
                     :class="getClassNames(i)"
                     @click="clickAction(i)"
                     :key="i">
                    <text class="item_text" :value="item"></text>
                </div>
            </div>
            <text @click="wxcOverlayBodyClicking" class="text_cancel bg_white padding_20" value="取消"></text>
        </div>
    </wxc-popup>
</template>

<script>
    import WxcPopup from '../wxc/popup/index';

    export default {
        name: "action-sheet",
        props: {
            /**
             * 操作项列表，建议不要超过5个
             */
            items: {default: []}
        },
        components: {
            WxcPopup
        },
        data() {
            return {
                isShow: false,
                popupHeight: this.getPopupHeight()
            };
        },
        methods: {
            openBottomPopup(isBottomShow = true) {
                this.isShow = isBottomShow;
            },
            //非状态组件，需要在这里关闭
            popupOverlayBottomClick() {
                this.openBottomPopup(false);
            },
            wxcOverlayBodyClicking() {
                this.$refs['wxc_prop'].wxcOverlayBodyClicking();
            },
            getClassNames(i) {
                let classNames = ["action_item", "flex_center", "padding_20"];
                if (i < this.items.length - 1) {
                    classNames.push("border_bottom");
                }
                return classNames;
            },
            clickAction(index) {
                this.$emit("actionSheetItemClick", {
                    index,
                    item: this.items[index]
                });
                this.wxcOverlayBodyClicking();
            },
            getPopupHeight() {
                let length = this.items.length;
                return 132 + length * 92 + length - 1;
            },
            pushAction(item) {
                this.items.push(item);
                this.popupHeight = this.getPopupHeight();
            }
        }
    }
</script>
<style lang="sass" scoped>
    @import "../../assets/base/flex.scss";
    @import "../../assets/base/padding_common.scss";
    @import "../../assets/base/border.scss";
</style>
<style scoped>

    .text_cancel {
        font-size: 32px;
        color: #0e8dec;
        text-align: center;
        border-radius: 15px;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .action_items {
        border-radius: 15px;
    }

    .item_text {
        font-size: 32px;
        color: #303030;
    }

    .action_item {

    }

</style>
