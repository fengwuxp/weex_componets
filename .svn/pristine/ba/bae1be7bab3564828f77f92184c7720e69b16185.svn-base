/**
 *  这个mixins 是为了解决视图渲染时出现抖动等问题，使用视图默认隐藏的策略，在
 *  组件实例被挂载后在显示
 */
//import {animation} from "../utils/ExportWeexModel";

export default {
    data(){
        let opacity = this.web ? 1 : 0;
        return {
            viewStyle: {
                opacity: opacity
            }
        }
    },
    mounted() {
        this.viewStyle={ opacity: 1};
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