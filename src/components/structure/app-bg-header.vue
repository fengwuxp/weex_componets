<!--带有背景图的顶部导航-->
<template>
    <div class="header_container" :style="containerStyle">
        <image :src="bgImageURL" class="bg_all" :style="bgImageStyle"></image>
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
    import GlobalApiConfig from "../../api/config/GlobalAipConfig";

    const appHeaderConfig = GlobalApiConfig.APP_HEADER_CONFIG;

    export default {
        name: "app-header",
        props: {
            headerHeight: {
                default: 100
            },
            title: {default: ''},
            titleStyle: {
                default: appHeaderConfig.titleStyle
            },
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
            iosTopStyle: {
                default: {
                    height: "28px",
                    backgroundColor: "transparent"
                }
            },
            backIconUrl: {default: weexUtils.getResourcesURL(appHeaderConfig.backImage, weex)},
            backStyle: {
                default: {
                    width: "40px",
                    height: "40px",
                }
            },
            bgImageStyle: {
                default: {}
            },
            bgImageURL: {default: weexUtils.getResourcesURL(appHeaderConfig.bagImageURL, weex)},
            rightTextStyle: {
                default: {
                    right: "15px",
                    fontSize: "32px",
                    color: ": #ffffff"
                }
            },
            rightIconStyle: {
                default: {
                    right: "20px",
                    top: "20px",
                    width: " 60px",
                    height: "60px"
                }
            }
        },
        data() {
            let ios = weex.config.env.platform.toLowerCase() === 'ios';

            return {
                headerStyle: {},
                containerStyle: {},
                ios,
                iosTop: 28
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
            let height = this.headerHeight;
            if (this.ios) {
                height += this.iosTop;
                this.bgImageURL = this.bgImageURL.replace("bg", "ios-bg");
            }
            this.containerStyle = {
                height: height + "px"
            };
            this.headerStyle.height = this.headerHeight + "px";
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