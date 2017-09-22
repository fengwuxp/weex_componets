<template>
    <scroller show-scrollbar="false">
        <slot></slot>
    </scroller>
</template>

<script>
    import weexUtils from "../../utils/WeexUtils";
    export default{
        props: {
            removeHeight: {default: 0}
        },
        data(){
            return {
                appBodyStyle: {
                    height: 0
                }
            }
        },
        methods: {},
        created(){
            let height = weex.config.env.deviceHeight;
            if (this.removeHeight === 0) {
                height = height - 210;
            } else {
                height = height - this.removeHeight;
            }
            height = parseInt(height * 750.0 / weex.config.env.deviceWidth);
            this.appBodyStyle.height = height + "px";
        }
    }
</script>
