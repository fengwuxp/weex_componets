<template>
    <wx-canvas ref="wx_canvas"
               :canvasData="data"
               :canvasConfig="config"
               :canvasStyle="chartStyle">
        <slot></slot>
    </wx-canvas>
</template>

<script>
    import WxCanvas from "../canvas/wx-canvas";
    import {timer} from "typescript_api_sdk/src/utils/ExportWeexSdkModel";
    import {isWeb} from "typescript_api_sdk/src/utils/WeexEnvUtil";
    import {findDOMNode} from "../WeexDomUtils";
    import GM from 'g2-mobile';


    if (isWeb()) {
        GM.Global.pixelRatio = 2;
    }

    let g2Chart = null;

    export default {
        name: "wx-chart",
        components: {
            WxCanvas
        },
        props: {
            chartStyle: {
                default: {}
            },
            data: {
                default: {}
            },
            config: {
                default: {}
            }
        },
        data() {
            // console.log("--------chartData------",this);
            // console.log("--------chartData------",this.data);
            // console.log("--------chartConfig------",this.config);
            return {
                chartInstance: null,
                chart: null
            };
        },
        mounted() {
            timer.setTimeout(() => {
                this.chartInstance = this.$refs['wx_canvas'];
                const context = this.chartInstance.getContext();
                this.draw(context);
            }, 200);
        },
        methods: {
            draw(context) {
                const {data, config} = this;
                const el = findDOMNode(this.chartInstance);
                let children = this.chartInstance.$children[0].$children;
                if (!children) {
                    return;
                }
                // console.log("---------el------", this.chartInstance.ref, el);
                // console.log("---------GM------", GM);
                // console.log("---------context------", context);
                context.render();
                const chart = new GM.Chart({
                    el,
                    context
                });
                console.log("---------chart------", chart);
                g2Chart = chart;
                g2Chart.source(data, config);
                g2Chart.axis(false);

                this.renderChildren(context);
            },
            renderChildren(context) {
                let children = this.chartInstance.$children[0].$children;

                if (children && !Array.isArray(children)) {
                    children = [children];
                }
                children.forEach((item) => {
                    if (item.draw) {
                        item.draw(g2Chart, item);
                    }
                });

                g2Chart.render();
            }
        }
    }
</script>

<style scoped>

</style>
