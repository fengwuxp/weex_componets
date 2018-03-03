<!--右边带插槽的header-->
<template>
    <div class="header_container">
        <image v-if="bgImageURL" :src="bgImageURL" class="bg_all" :style="bgImageStyle"></image>
        <div v-if="ios" :style="iosTopStyle"></div>
        <div class="header" :style="style">
            <div @click="clickBackButton"
                 :style="backStyle"
                 class="left-back"
                 v-if="backIconUrl">
                <image class="back" :src="backIconUrl"></image>
                <text v-if="leftText" :style="leftTextStyle">{{leftText}}</text>
            </div>
            <text v-if="title.length>0"
                  :style="titleStyle"
                  @click="clickText"
                  :value="title"></text>
            <div class="right-content" :style="headerRightStyle">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import weexUtils from "../../utils/WeexUtils";
    import GlobalApiConfig from "typescript_api_sdk/src/config/GlobalAipConfig";
    import {getIosTopHeight, isIos, DEFAULT_HEADER_HEIGHT} from "../../utils/FlexViewUtils";

    const appHeaderConfig = GlobalApiConfig.APP_HEADER_CONFIG;

    const bagImageURL = appHeaderConfig.bagImageURL ? appHeaderConfig.bagImageURL : "";

    export default {
        name: "app-header",
        props: {
            title: {
                default: ""
            },
            titleStyle: {
                default: Object.assign({fontSize: 36}, appHeaderConfig.data.titleStyle)
            },
            leftText: {default: ""},
            leftTextStyle: {
                default: {
                    fontSize: 32,
                    color: "#ffffff"
                }
            },
            leftStyle: {
                default: {
                    width: 100
                }
            },
            backIconUrl: {default: weexUtils.getResourcesURL(appHeaderConfig.backImage)},
            bgImageStyle: {
                default: {}
            },
            bgImageURL: {default: weexUtils.getResourcesURL(bagImageURL)},
            headerStyle: {default: {}},
            headerIosTopStyle: {default: {}},
            headerTitleStyle: {default: {}},
            headerRightStyle: {default: {}}
        },
        data() {
            let {style} = appHeaderConfig.data;
            return Object.assign({
                ios: isIos(),
                backStyle: {height: DEFAULT_HEADER_HEIGHT},
                style,
                iosTopStyle: Object.assign({
                    height: getIosTopHeight(),
                }, appHeaderConfig.data.iosTopStyle)
            });
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
            }
        },
        beforeMouont() {
            this.style = Object.assign({}, this.style, this.headerStyle);
            this.backStyle = Object.assign(this.backStyle, this.leftStyle);
            if (this.style.height) {
                this.backStyle.height = this.style.height;
            }
            this.titleStyle = Object.assign(this.titleStyle, this.headerTitleStyle);
            this.iosTopStyle = Object.assign({}, this.iosTopStyle, this.headerIosTopStyle);
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

    .right-content {
        position: absolute;
    }
    .bg_all {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

</style>
