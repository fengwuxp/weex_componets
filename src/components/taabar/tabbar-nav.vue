<!--tabbar nav-->
<template>
    <div>
        <div class="bottom_nav_container" :style="navItemContainerStyle">
            <image v-if="navItemBgImage"
                   class="nav_bg"
                   :src="navItemBgImage"
                   :style="navItemBgImageStyle"></image>
            <div v-for="(item,index) in pageItems"
                 :style="navItemStyle"
                 class="nav-item" @click="bottomNavOnclick(index)">
                <image v-if="item.showType===NavShowType.DEFAULT" :style="navIconStyle" :src="item.icon"></image>
                <text v-if="item.showType===NavShowType.DEFAULT" class="nav-item-text" :style="item.textColor"
                      :value="item.text"></text>
                <text class="number-icon"
                      :style="numberIconStyle"
                      v-if="item.number && item.showType===NavShowType.DEFAULT"
                      :value="item.number>99?'...':item.number"></text>
            </div>
        </div>
        <image v-if="pageItems[2].showType===NavShowType.BIG_ICON"
               :style="centerIconStyle"
               @click="bottomNavOnclick(2)"
               :src="pageItems[2].icon"></image>
        <div v-if="iosX" :style="iphoneXBottmomStyle"></div>
    </div>
</template>

<script>

    import {isIphoneX, IPHONEX_BOTTOM_HEIGHT} from "../../utils/FlexViewUtils";
    import {NavItemType} from "./NavItemType";
    import {NavShowType} from "./NavShowType";
    import DefaultNavProps from "./DefaultNavProps";

    /**
     * 原生下的页面样式
     * @param isSelected
     * @returns {*}
     */
    const getNativeEmbedStyle = (isSelected) => {
        if (isSelected) {
            return {
                visibility: "visible"
            }
        } else {
            return {
                visibility: "hidden"
            }
        }
    };


    export default {
        name: "tabbar-nav",
        props: {
            ...DefaultNavProps
        },
        data() {
            const iosX = isIphoneX();
            const iphoneXBottmomStyle = {
                width: "750px",
                height: IPHONEX_BOTTOM_HEIGHT + "px",
                backgroundColor: "transparent"
            };

            if (iosX) {
                this.centerIconStyle.bottom = (this.centerIconStyle.bottom + IPHONEX_BOTTOM_HEIGHT) + "px";
            }

            return {
                currentViewIndex: 0,
                NavItemType,
                NavShowType,
                iosX,
                iphoneXBottmomStyle

            };
        },
        methods: {
            bottomNavOnclick(index) {
                let targetItem = this.pageItems[index];

                let isChange = index !== this.currentViewIndex;

                if (targetItem.targetType === NavItemType.FUNCTION) {
                    //目标是一个函数
                    if (targetItem.showType === NavShowType.BIG_ICON && isChange) {
                        this.pageItems = this.getNavItems(index);
                    }
                } else {
                    if (isChange) {
                        this.pageItems = this.getNavItems(index);
                    }
                }
                this.$emit("changeNav", {index, targetType: targetItem.targetType});

            },
            /**
             * 获取导航item
             * @param selectedIndex 当前选中item
             **/
            getNavItems(selectedIndex) {
                let list = [];
                this.pageItems.forEach((item, i) => {
                    let isSelected = i === selectedIndex;
                    if (isSelected) {
                        item.textColor = {color: this.itemSelectedColor};
                    } else {
                        item.textColor = {color: this.itemDefaultColor};
                    }
                    item.icon = this.getNavIcon(item.icon, isSelected);
                    item.style = getNativeEmbedStyle(isSelected);

                    list[i] = item;//Object.assign({},item);
                });
                this.currentViewIndex = selectedIndex;

                return list;
            }
        },
        beforeMount() {
            this.getNavItems(this.defaultViewIndex);
        }
    }
</script>

<style scoped>
    .bottom_nav_container {
        flex-direction: row;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 2px;
        background-color: transparent;

    }

    .nav-item {
        flex: 1;
        justify-content: flex-end;
        align-items: center;
    }

    .nav-item-text {
        font-size: 24px;
        line-height: 28px;
    }

    .nav_bg {
        flex: 1;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .number-icon {
        width: 40px;
        height: 40px;
        font-size: 22px;
        border-radius: 40px;
        background-color: red;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        font-weight: 700;
        position: absolute;
    }
</style>
