<!--带背景图片的flex view-->
<template>
    <div class="app" :style="viewStyle">
        <image :src="bgSrc" class="bg_image"></image>
        <div class="bg_image ">
            <div class="app_header" :style="headerStyle" v-if="view.useHeader">
                <slot name="app-header"></slot>
            </div>
            <scroller v-if="view.bodyScroll"
                      show-scrollbar="false"
                      :style="view.scrollerStyle">
                <slot name="app-body"></slot>
            </scroller>
            <div class="app_body "
                 :style="bodyStyle" v-else>
                <slot name="app-body"></slot>
            </div>
            <div class="app_footer "
                 :style="footerStyle" v-if="view.useFooter">
                <slot name="app-footer"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    import fadeIn from '../mixins/FadeIn';
    import weexUtils from "../utils/WeexUtils";
    import {DEFAULT_FOOTER_HEIGHT, DEFAULT_HEADER_HEIGHT, getViewFooterStyle} from "../utils/FlexViewUtils";
    import GlobalApiConfig from "typescript_api_sdk/src/config/GlobalAipConfig";

    //背景图片配置
    const APP_VIEW_BG_IMAGE = GlobalApiConfig.APP_VIEW_BG_IMAGE;

    export default {
        mixins: [fadeIn],
        props: {
            view: {
                type: Object,
                default: function () {
                    return {
                        viewStyle: {flex: "1"},
                        bodyScroll: false,   //页面主体是否可以滚动
                        bodyPadding: true,   //页面主体是否需要左右padding (默认20)
                        bodyIsCenter: true,  //页面主体内容是否居中(水平和垂直)
                        bodyBackgroundColor: "transparent", //页面主体背景色
                        useHeader: true,     //是否使用页面头部
                        useFooter: true,     //是否使用页面底部
                        headerHeight: DEFAULT_HEADER_HEIGHT, //页面头部高度
                        footerHeight: DEFAULT_FOOTER_HEIGHT,   //页面底部高度
                        scrollerStyle: {flex: "1"}
                    }
                }
            },
            bgSrc: {
                default: weexUtils.getResourcesURL(APP_VIEW_BG_IMAGE)
            }
        },
        data() {
            const {headerHeight, footerHeight, bodyBackgroundColor, bodyPadding, bodyIsCenter} = this.view;
            const headerStyle = {
                height: headerHeight + "px"
            };
            const footerStyle = Object.assign({
                ...getViewFooterStyle(footerHeight),
                backgroundColor: bodyBackgroundColor,
            });

            const bodyStyle = {
                backgroundColor: bodyBackgroundColor,
            };
            if (bodyPadding) {
                bodyStyle.paddingLeft = "20px";
                bodyStyle.paddingRight = "20px";
            }
            if (bodyIsCenter) {
                bodyStyle.justifyContent = "center";
                bodyStyle.alignItems = "center";

            }
            return {
                headerStyle,
                bodyStyle,
                footerStyle
            }
        }
    }
</script>
<style scoped>
    .app {
        flex-direction: column;
    }

    .app_header {
        justify-content: flex-start;
    }

    .app_body {
        flex: 1;
        flex-direction: column;
    }

    .app_footer {
        justify-content: flex-end;
    }

    .bg_image {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>