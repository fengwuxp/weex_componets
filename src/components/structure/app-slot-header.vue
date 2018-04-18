<template>
    <div>
        <div v-if="ios" class="ios_top" :style="iosTopStyle"></div>
        <div class="header" :style="style">
            <div  v-if="backIconUrl" @click="clickBackButton" :style="backStyle" class="left-back">
                <image class="back" :src="backIconUrl"></image>
                <text v-if="leftText" :style="leftTextStyle">{{leftText}}</text>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import weexUtils from "../../utils/WeexUtils";
    import GlobalApiConfig from "typescript_api_sdk/src/config/GlobalAipConfig";
    import {getIosTopHeight, DEFAULT_HEADER_HEIGHT} from "../../utils/FlexViewUtils";

    const appHeaderConfig = GlobalApiConfig.APP_HEADER_CONFIG;

    export default {
        name: "app-slot-header",
        props: {
            title: {
                default: ""
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
            iconStyle: {
                default: {}
            },
            icon: {
                default: {}
            },
            searchTextStyle: {
                default: {}
            },
            searchText: {}
        },
        data() {
            let result = appHeaderConfig.data;
            result.ios = false;
            return Object.assign({
                backStyle: {height: DEFAULT_HEADER_HEIGHT },
            }, result);
        },
        methods: {
            clickBackButton: function () {
                this.$emit("backPage");
            }
        },
        created() {
            this.ios = weex.config.env.platform.toLowerCase() === "ios";
            this.style = Object.assign({
                paddingRight: 20
            }, this.style, this.headerStyle);
            this.backStyle = Object.assign(this.backStyle, this.leftStyle);
            if (this.style.height) {
                this.backStyle.height = this.style.height;
            }
            this.iosTopStyle = Object.assign({}, this.iosTopStyle, {
                height: getIosTopHeight()
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

    .left-back {
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .back {
        width: 40px;
        height: 40px;
    }
</style>
