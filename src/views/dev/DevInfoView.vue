<!--开信息页面-->
<template>
    <flex-view :view="view" class="default_bg_color">
        <app-header slot="app-header" @backPage="back" :title="headerTitle"></app-header>
        <div slot="app-body" class="flex_cell">
            <div class="flex_center">
                <text class="text_default " value="本页面由开发者查看使用"></text>
            </div>
            <div class="flex_row bg_white padding_20 border_bottom margin_top_20">
                <text class="text_default" value="环境"></text>
                <text class="text_default flex_cell text_right" :value="jsEnv"></text>
            </div>
            <div class="flex_row bg_white padding_20 border_bottom">
                <text class="text_default" value="JS模式"></text>
                <text class="text_default flex_cell text_right" :value="jsModel"></text>
            </div>
        </div>
    </flex-view>
</template>
<script>
    import FlexView from "../../components/flex-view.vue";
    import AppHeader from "../../components/structure/app-header.vue";

    import weexUtils from "../../utils/WeexUtils";
    import mixins from '../../mixins/index';

    const jsEnv = process.env.NODE_ENV === "dev" ? "开发测试" : "正式";

    export default {
        //组件
        components: {AppHeader, FlexView},
        //混入
        mixins: [mixins],
        //属性
        props: {
            headerTitle: {default: "开发信息"}
        },
        //初始化数据
        data() {
            let view = weexUtils.getViewConfig({
                bodyIsCenter: false,
                bodyPadding: false
            });
            let jsModel = "本地";
            if (/^(http:\/\/|https:\/\/)/.test(weex.config.bundleUrl)) {
                jsModel = "远程";
            }
            return {
                view,
                jsEnv,
                jsModel
            };
        },
        //方法列表
        methods: {},

        /*
        * 在挂载开始之前被调用
        * */
        beforeMount() {

        },
        /**
         * 实例已经创建完成之后被调用。
         * 在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算，watch/event 事件回调。
         * 然而，挂载阶段还没开始，$el 属性目前不可见。
         */
        created() {

        }
    }
</script>
<style lang="sass" scoped>
    @import "../../assets/base/flex.scss";
    @import "../../assets/base/border.scss";
    @import "../../assets/base/text.scss";
    @import "../../assets/base/margin_common.scss";
    @import "../../assets/base/padding_common.scss";
    @import "../../assets/config/color.scss";
</style>
<style scoped>

</style>
