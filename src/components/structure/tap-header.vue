<template>
    <div>
        <div v-if="ios" class="ios_top" :style="iosTopStyle"></div>
        <div class="header" :style="style">
            <div @click="clickBackButton" :style="style" class="left-back" v-if="isShow">
                <image class="back" :src="backIconUrl"></image>
            </div>
            <div class="tap-list">
                <text class="left_tap_item"
                      :style="tabs[0].style"
                      @click="changeTap">{{tabs[0].text}}</text>
                <text class="right_tap_item"
                      :style="tabs[1].style"
                      @click="changeTap">{{tabs[1].text}}</text>
            </div>
            <image v-if="useRight==='image'" @click="clickRight"
                   :src="rightContent"
                   :style="rightContentStyle"
                   class="right-icon"></image>
            <text v-if="useRight==='text'" @click="clickRight"
                  class="right-text" :style="rightContentStyle">{{rightContent}}
            </text>
        </div>
    </div>
</template>

<script>
    import weexUtils from "../../utils/WeexUtils";

    export default {
        name: "app-tap-header",
        props: {
            backIconUrl: {default: weexUtils.getResourcesURL("images/buyer/back_icon.png", weex)},
            isShow: {default: true},
            title: {default: ''},
            rightContent: {default: ""},
            useRight: {default: "image"},
            headerStyle: {default: {}},
            headerIosTopStyle: {default: {}},
            headerRightImageStyle: {default: {}},
            tabs:{default:[]},
            tabSelectedIndex:{default:0}
        },
        data(){
            return {
                style: {
                    height: "100px",
                    backgroundColor: "#F4F4F4",
                    borderBottomColor: "#E2E2E2"
                },
                iosTopStyle: {
                    height: "28px",
                    backgroundColor: "#F4F4F4"
                },
                rightContentStyle:{},
                ios: false
            }
        },
        methods: {
            clickBackButton: function () {
                this.$emit("backPage");
            },
            clickText(){
                this.$emit("clickHeaderText");
            },
            clickRight(){
                this.$emit("clickHeaderRightText");
            },
            changeTap(){
                this.$emit("tabChange");
            }
        },
        created(){
            this.ios = weex.config.env.platform.toLowerCase() === "ios";
            this.style = Object.assign(this.style, this.headerStyle);
            this.iosTopStyle = Object.assign(this.iosTopStyle, this.headerIosTopStyle);
            this.rightContentStyle = Object.assign(this.rightContentStyle, this.headerRightImageStyle);
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
        font-size: 36px;
        border-bottom-width: 1px;
        border-bottom-style: solid;

    }

    .back {
        width: 40px;
        height: 40px;
    }

    .left-back {
        position: absolute;
        width: 100px;
        justify-content: center;
        align-items: center;
        left: 0;
        top: 0;
    }

    .tap-list {
        height: 60px;
        border-width: 1px;
        border-color: #43B453;
        border-style: solid;
        border-radius: 20px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .left_tap_item {
        font-size: 30px;
        height: 58px;
        padding-left: 15px;
        padding-right: 15px;
        line-height: 58px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }

    .right_tap_item {
        font-size: 30px;
        height: 58px;
        padding-left: 15px;
        padding-right: 15px;
        line-height: 58px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .right-icon {
        position: absolute;
        right: 25px;
        top: 30px;
        width: 40px;
        height: 40px;
    }

    .right-text {
        position: absolute;
        right: 15px;
        top: 32px;
        font-size: 32px;
        color: #ffffff;
    }

</style>