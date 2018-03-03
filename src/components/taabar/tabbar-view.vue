<!--tabbar view 且底部导航带背景图片-->
<template>
    <div class="flex_cell default_bg_color">
        <div class="flex_cell" v-if="web">
            <div v-for="(item,i ) in pageItems"
                 v-if="item.targetType===NavItemType.VIEW"
                 v-show="i===currentViewIndex"
                 class="flex_cell">
                <slot :name="'view_'+i"></slot>
            </div>
        </div>
        <div class="flex_cell"
             v-else>
            <embed class="view_content"
                   v-for="(item,index) in pageItems"
                   v-if="item.targetType===NavItemType.VIEW"
                   :key="index"
                   :style="item.style"
                   :src="item.url"
                   type="weex"></embed>
        </div>
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
    import FlexView from "../../components/flex-view.vue";
    import {isIphoneX, IPHONEX_BOTTOM_HEIGHT} from "../../utils/FlexViewUtils";

    import {NavItemType} from "./NavItemType";
    import {NavShowType} from "./NavShowType";

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
        //组件
        components: {FlexView},

        //属性
        props: {
            /**
             * 页面列表
             **/
            pageItems: {
                default: {}
            },
            /**
             * 默认选中的视图
             **/
            defaultViewIndex: {
                default: 0
            },
            web: {default: false},

            /**
             * 导航item选中颜色
             **/
            itemSelectedColor: {
                default: "#66af3d"
            },
            /**
             * 导航item默认颜色
             **/
            itemDefaultColor: {
                default: "#929292"
            },
            /**
             * 导航栏样式
             **/
            navItemContainerStyle: {
                default() {
                    return {
                        backgroundColor: "#ffffff",
                        height: "100px",
                        borderWidth: "1px",
                        borderColor: "#e6e6e6",
                        borderStyle: "sloid"
                    };
                }
            },
            /**
             * 导航栏背景图
             **/
            navItemBgImage: {
                default: ""
            },
            /**
             * 导航栏背景图样式
             **/
            navItemBgImageStyle: {
                default: {
                    height: "100px",
                    top: "0"
                }
            },
            /**
             * 居中iconStyle
             **/
            centerIconStyle: {
                default: {
                    height: "120px",
                    width: "120px",
                    position: "absolute",
                    left: "315px",
                    bottom: 15
                }
            },

            /**
             * 导航项样式
             **/
            navItemStyl: {
                default: {}
            },
            /**
             * 导航图片样式
             **/
            navIconStyle: {
                default: {
                    height: "40px",
                    width: "40px",
                    marginBottom: "9px"
                }
            },
            numberIconStyle: {
                default: {
                    right: "48px",
                    top: "-8px"
                }
            },
            /**
             * 获取导航icon的方法
             **/
            getNavIcon: {
                default: function () {
                    return (icon, isSelected) => {
                        if (isSelected) {
                            return icon.replace("nav/", "nav/activate_");
                        } else {
                            return icon.replace("nav/activate_", "nav/");
                        }
                    }
                }
            }
        },
        //初始化数据
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
        //方法列表
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
                this.$emit("changePage", {index, targetType: targetItem.targetType});

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

        /*
        * 在挂载开始之前被调用
        * */
        beforeMount() {
            this.getNavItems(this.defaultViewIndex);
        }
    }
</script>
<style scoped>
    .view_content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .flex_cell {
        flex: 1;
    }

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