/**
 *  这个mixins 是为了解决视图渲染时出现抖动等问题，使用视图默认隐藏的策略，在
 *  组件实例被挂载后在显示
 */
import {timer} from "../utils/ExportWeexModel";

export default {
    data() {
        let opacity = this.web ? 1 : 0;
        return {
            viewStyle: {
                opacity: opacity
            }
        }
    },
    methods: {
        showView(opacity) {
            if (opacity === 1) {
                return;
            }
            opacity += 0.15;
            timer.setTimeout(() => {
                this.viewStyle = {opacity: opacity};
                this.showView(opacity);
            }, 20);
        }
    },
    mounted() {
        this.showView(0.1);
        // const purchaseView = this.$refs['viewport'];
        // animation.transition(purchaseView, {
        //     styles: {
        //         opacity: 1,
        //     },
        //     timingFunction: 'ease',
        //     duration: 20,
        //     delay: 0
        // }, () => {
        //     console.log("动画完成!")
        // })
    },
}