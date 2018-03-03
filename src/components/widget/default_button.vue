<template>
    <div class="default_button_container" :style="containerStyle"
         v-on:touchstart="touchstart"
         v-on:touchend="touchend"
         @click="buttonClick">
        <text class="button_default" :style="textStyle">{{text}}</text>
    </div>
</template>
<script>
    import buttonLock from "../../mixins/ButtonLock";

    export default {
        mixins: [buttonLock],
        props: {
            text: {default: ""},
            containerStyle: {
                default: {
                    backgroundColor: "#48B34F"
                }
            },
            textStyle: {
                default: {
                    fontSize: "36px",
                    padding: "25px 15px 20px 15px",
                    color: "#ffffff"
                }
            }
        },
        data() {
            return {
                key: new Date().getTime()
            }
        },
        methods: {
            buttonClick() {
                if (this.buttonIsLock(this.key)) {
                    return;
                }
                this.$emit("clickButton");
            },
            touchstart() {
                let backgroundColor = this.containerStyle.backgroundColor;
                backgroundColor = backgroundColor.replace("#", "#AF");
                this.containerStyle.backgroundColor = backgroundColor;
            },
            touchend() {
                this.containerStyle.backgroundColor = this.containerStyle.backgroundColor.replace("#AF", "#");
            }
        },
        created() {

        }
    }
</script>
<style lang="sass" scoped>
    @import "../../assets/widget/button"
</style>