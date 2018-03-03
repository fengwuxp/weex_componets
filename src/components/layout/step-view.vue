<!--需要步骤的view-->
<template>
    <flex-view :view="view">
        <slot slot="app-header"></slot>
        <slot v-for="i in maxStep" v-if="i===step" slot="app-body"></slot>
        <slot slot="app-footer"></slot>
    </flex-view>
</template>

<script>
    import FlexView from "../flex-view";

    export default {
        components: {FlexView},
        props: {
            view: {
                default: {}
            },
            /**
             * 初始步骤
             **/
            initStep: {
                default: 1
            },
            /**
             * 最大步骤数
             **/
            maxStep: {
                default: 0
            }
        },
        data() {
            return {
                step: 0
            }
        },
        methods: {
            /**
             * 设置view
             * @param index
             */
            setViewIndex(index = 0) {
                if (index > this.maxStep) {
                    index = this.maxStep;
                }
                this.step = index;
            },
            /**
             * 到下一个view
             */
            nextView() {
                if (this.step === this.maxStep) {
                    return;
                }
                this.step++;
            },
            /**
             * 上一步
             */
            prevView() {
                if (this.step === 1) {
                    return;
                }
                this.step--;
            }
        },
        beforeMount() {
            this.setViewIndex(this.initStep);
        }
    }
</script>
<style scoped>

</style>