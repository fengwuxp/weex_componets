<template>
    <div>
        <div v-if="ios" class="ios_top" :style="iosTopStyle"></div>
        <div class="header" :style="style">
            <div @click="clickBackButton" :style="backStyle" class="left-back" v-if="backIconUrl">
                <image class="back" :src="backIconUrl"></image>
                <text v-if="leftText" :style="leftTextStyle">{{leftText}}</text>
            </div>
            <div class="tap-list">
                <text class="tap_item"
                      :style="tabs[0].style"
                      @click="changeTap(0)" :value="tabs[0].text">
                </text>
                <text class="tap_item"
                      :style="tabs[1].style"
                      @click="changeTap(1)" :value="tabs[1].text">
                </text>
            </div>
            <image v-if="rightIcon.length>0"
                   class="right-content"
                   @click="clickRight"
                   :style="rightIconStyle"
                   :src="rightIcon">
            </image>
        </div>
    </div>
</template>

<script>
    import weexUtils from "../../utils/WeexUtils";
    import GlobalApiConfig from "typescript_api_sdk/src/config/GlobalAipConfig";
    import {isIos,getIosTopHeight} from "../../utils/FlexViewUtils";

    const appHeaderConfig = GlobalApiConfig.APP_HEADER_CONFIG;

    export default {
        name: "app-header",
        props: {
            tabs: {default: []},
            tabSelectedIndex: {default: 0},
            rightText: {default: ""},
            rightIcon: {default: ""},
            leftText: {default: ""},
            leftTextStyle: {
                default: {
                    fontSize: "32px",
                    color: "#ffffff"
                }
            },
            leftStyle: {
                default: {
                    width: "100px"
                }
            },
            backIconUrl: {default: weexUtils.getResourcesURL(appHeaderConfig.backImage)},
            headerStyle: {default: {}},
            headerIosTopStyle: {default: {}},
            headerTitleStyle: {default: {}},
            headerRightStyle: {default: {}}
        },
        data() {
            let result = appHeaderConfig.data;
            result.ios = isIos();
            return Object.assign({
                backStyle: {height: "100px"},
                rightTextStyle: {
                    right: "15px",
                    fontSize: "32px",
                    top: "34",
                    lineHeight:"32px",
                    height:"32px",
                    color: "#ffffff"
                },
                rightIconStyle: {
                    right: "22px",
                    top: "22px",
                    width: " 56px",
                    height: "56px"
                }
            }, result);
        },
        methods: {
            clickBackButton: function () {
                this.$emit("backPage");
            },
            clickText() {
                this.$emit("clickHeaderText");
            },
            clickRight() {
                this.$emit("clickHeaderRightText");
            },
            changeTap(index) {
                this.$emit("tabChange",index);
            }
        },
        created() {
            this.style = Object.assign({}, this.style, this.headerStyle);
            this.backStyle = Object.assign(this.backStyle, this.leftStyle);
            if (this.style.height) {
                this.backStyle.height = this.style.height;
            }

            this.titleStyle = Object.assign({fontSize:"36px"}, this.titleStyle, this.headerTitleStyle);
            if (this.rightText.length > 0) {
                this.rightTextStyle = Object.assign({}, this.rightTextStyle, this.headerRightStyle);
            } else {
                this.rightIconStyle = Object.assign({}, this.rightIconStyle, this.headerRightStyle);
            }

            this.iosTopStyle = Object.assign({}, this.iosTopStyle, {
                height:getIosTopHeight()+"px"
            }, this.headerIosTopStyle);
        }
    }
</script>

<style scoped>
    .ios_top {
        flex: 1;
    }

    .header {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;

    }

    .back {
        width: 40px;
        height: 40px;
    }

    .left-back {
        flex-direction: row;
        position: absolute;
        justify-content: center;
        align-items: center;
        left: 0;
        top: 0;
    }


    .tap-list {
        height: 60px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .tap_item {
        font-size: 30px;
        height: 58px;
        line-height: 58px;

        padding-left: 15px;
        padding-right: 15px;

    }

    .right-content {
        position: absolute;
    }

</style>