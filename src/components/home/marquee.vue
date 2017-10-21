<template>
    <div class="marquee-wrap"
         :style="marqueeStyle"
         onappear="appeared"
         ondisappear="disappeared">
        <div ref="anim" class="anim">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import {animation} from "wxp_weex_componets/src/utils/ExportWeexModel";

    export default {
        props: {
            duration: {default: 500},
            interval: {default: 3000},
            step: {default: 70},
            count: {default: 0},
            index: {default: 1},
            marqueeStyle: {default: {}}
        },
        data() {
            return {
                outOfView: false
            }
        },
        mounted() {
//
//            let b = this.interval > 0
//                && this.step > 0
//                && this.duration > 0;

            this.$nextTick(()=>{
                this.nextTick();
            })
        },
        methods: {
            /**
             * nextTick
             **/
            nextTick: function () {
                if (this.outOfView) {
                    this.nextTick();
                } else {
                    this.animation(() => {
                        this.nextTick()
                    });
                }
            },
            /**
             * 滚动动画
             * @param callback
             */
            animation: function (callback = () => {
            }) {
                const self = this;
                let offset = -self.step * self.index;
                let anim = self.$refs['anim'];
                animation.transition(anim, {
                    styles: {
                        transform: 'translateY(' + String(offset) + 'px) translateZ(0)'
                    },
                    timingFunction: 'ease',
                    duration: self.duration,
                    delay: self.interval
                }, () => {
                    self.index = (self.index + 1) % (self.count);
                    self.$emit('change', {
                        index: self.index,
                        count: self.count
                    });
                    callback();
                });
            },
            appeared: function () {
                this.outOfView = false;
            },
            disappeared: function () {
                this.outOfView = true;
            }
        },
        beforeMount(){

        }
    }
</script>

<style>
    .marquee-wrap {
        overflow: hidden;
        position: relative;
    }

    .anim {
        flex: 1;
        flex-direction: column;
        position: absolute;
        transform: translateY(0) translateZ(0);
    }
</style>

