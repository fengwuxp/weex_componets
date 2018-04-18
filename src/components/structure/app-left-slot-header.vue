<!--带有背景图的 左侧为slot的 顶部导航-->
<template>
    <div class="header_container">
        <image v-if="bgImageURL" :src="bgImageURL" class="bg_all" :style="bgImageStyle"></image>
        <div v-if="ios" :style="iosTopStyle"></div>
        <div class="header" :style="style">
            <div :style="leftStyle"
                 class="left-back">
                <slot></slot>
            </div>
            <text v-if="title.length>0"
                  class="title"
                  :style="titleStyle"
                  @click="clickText"
                  :value="title">
            </text>
            <text v-if="rightText.length>0"
                  class="right-content"
                  @click="clickRight"
                  :style="rightTextStyle"
                  :value="rightText">
            </text>
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
    import {isIos, getIosTopHeight, getViewHeaderHeight} from "../../utils/FlexViewUtils";

    const appHeaderConfig = GlobalApiConfig.APP_HEADER_CONFIG;

    const bgImageURL = appHeaderConfig.bgImageURL ? appHeaderConfig.bgImageURL : "";

    export default {
        name: "app-header",
        props: {
            title: {default: ""},
            rightText: {default: ""},
            rightIcon: {default: ""},
            leftStyle: {
                default: {}
            },
            titleStyle: {
                default: Object.assign({fontSize: 36}, appHeaderConfig.data.titleStyle)
            },
            rightTextStyle: Object.assign({
                right: 15,
                fontSize: 32,
                top: 34,
                lineHeight: 32,
                height: 32,
                color: "#ffffff"
            }, appHeaderConfig.data.rightTextStyle),
            rightIconStyle: {
                default: {
                    right: 20,
                    top: 25,
                    width: 50,
                    height: 50
                }
            },
            bgImageStyle: {
                default: {}
            },
            bgImageURL: {default: weexUtils.getResourcesURL(bgImageURL)},
            headerIosTopStyle: {default: {}},
        },
        data() {
            let ios = isIos();
            const {style} = appHeaderConfig.data;
            return {
                headerStyle: {},
                ios,
                style,
                iosTopStyle: Object.assign({
                    height: getIosTopHeight()
                }, appHeaderConfig.data.iosTopStyle),
            }
        },
        methods: {

            clickText() {
                this.$emit("clickHeaderText");
            },
            clickRight() {
                this.$emit("clickHeaderRight");
            }
        },
        beforeMount() {
            if (this.ios) {
                this.bgImageURL = this.bgImageURL.replace("bg", "ios-bg");
            }
        }
    }
</script>

<style scoped>
    .header_container {
        position: relative;
    }

    .header {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .bg_all {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .left-back {
        flex-direction: row;
        position: absolute;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        bottom: 0;
    }

    .right-content {
        position: absolute;
    }

</style>
