<!--带有背景图的顶部导航-->
<template>
    <div class="header_container" :style="containerStyle">
        <image v-if="bgImageURL" :src="bgImageURL" class="bg_all" :style="bgImageStyle"></image>
        <div v-if="ios" :style="iosTopStyle"></div>
        <div class="header" :style="headerStyle">
            <div @click="clickBackButton"
                 :style="leftStyle"
                 class="left-back"
                 v-if="backIconUrl.length>0">
                <image :style="backStyle"
                       :src="backIconUrl"></image>
                <text v-if="leftText.length>0"
                      :style="leftTextStyle"
                      :value="leftText"></text>
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
    import {isIos, DEFAULT_HEADER_HEIGHT, getIosTopHeight, getViewHeaderHeight} from "../../utils/FlexViewUtils";

    const appHeaderConfig = GlobalApiConfig.APP_HEADER_CONFIG;

    export default {
        name: "app-header",
        props: {
            title: {default: ''},
            titleStyle: {
                default: appHeaderConfig.titleStyle
            },
            rightText: {default: ""},
            rightIcon: {default: ""},
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
            iosTopStyle: {
                default: {
                    height: getIosTopHeight(),
                    backgroundColor: "transparent"
                }
            },
            backIconUrl: {default: weexUtils.getResourcesURL(appHeaderConfig.backImage)},
            backStyle: {
                default: {
                    width: 40,
                    height: 40,
                }
            },
            bgImageStyle: {
                default: {}
            },
            bgImageURL: {default: weexUtils.getResourcesURL(appHeaderConfig.bgImageURL)},
            rightTextStyle: {
                right: 15,
                fontSize: 32,
                top: 34,
                lineHeight: 32,
                height: 32,
                color: "#ffffff"
            },
            rightIconStyle: {
                default: {
                    right: 20,
                    top: 25,
                    width: 50,
                    height: 50
                }
            }
        },
        data() {
            let ios = isIos();
            return {
                headerStyle: {
                    height: DEFAULT_HEADER_HEIGHT
                },
                containerStyle: {},
                ios
            }
        },
        methods: {
            clickBackButton: function () {
                this.$emit("backPage");
            },
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

    .bg_all {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .header {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
        font-size: 36px;
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
