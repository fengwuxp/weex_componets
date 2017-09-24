<!--带有背景图的顶部导航-->
<template>
    <div class="header_container" :style="containerStyle">
        <image :src="bgImageURL" class="bg_all" :style="bgImageStyle"></image>
        <div class="header" :style="headerStyle">
            <div @click="clickBackButton"
                 :style="leftStyle"
                 class="left-back"
                 v-if="backIconUrl.length>0">
                <image class="back"
                       :src="backIconUrl"></image>
                <text v-if="leftText.length>0"
                      :style="leftTextStyle"
                      :value="leftText"></text>
            </div>
            <text class="title"
                  :style="titleStyle"
                  @click="clickText"
                  :value="title">
            </text>
            <text v-if="rightText.length>0"
                  @click="clickRight"
                  class="right-text"
                  :style="rightStyle"
                  :value="rightText">
            </text>
            <image v-if="rightIcon.length>0"
                   @click="clickRight"
                   :style="rightStyle"
                   :src="rightIcon"
                   class="right-icon"></image>
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
            backIconUrl: {default: weexUtils.getResourcesURL(appHeaderConfig.backImage, weex)},
            bgImageStyle: {
                default: {}
            },
            bgImageURL: {default: weexUtils.getResourcesURL(appHeaderConfig.bagImageURL, weex)}
        },
        data() {
            let ios = weex.config.env.platform.toLowerCase() === 'ios';

            return {
                headerStyle: {},
                containerStyle: {},
                ios,
                iosTop:28
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
        created() {
            let height = this.headerHeight;
            if (this.ios) {
                height += this.iosTop;
                this.headerStyle = {
                    paddingTop:this.iosTop+"px"
                }
            }
            this.containerStyle = {
                height: height+"px"
            };
            this.headerStyle = {
                height: height+"px",
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
        bottom: 0;
    }

    .right-text {
        position: absolute;
        right: 15px;
        font-size: 32px;
        color: #ffffff;
    }

    .right-icon {
        position: absolute;
        right: 25px;
        top: 25px;
        width: 50px;
        height: 50px;
    }

</style>