<!--原生 自定义 slider-->
<template>
    <div class="slider_wrapper" :style="containerStyle">
        <div class="slider_container"
             v-on:touchstart="slideStart"
             v-on:touchend="slideEnd"
             v-on:touchmove="slideMove"
             :style="slierStyle">
            <div v-for="(item,i) in items"
                 class="slider_item"
                 :ref="'item_'+i"
                 :style="item.style">
                <slot :name="'slider_item_'+i"></slot>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        props: {
            showIndex: {default: 0},
            width: {
                default: 750
            },
            height: {
                default: ""
            },
            size: {
                defualt: 0
            }
        },
        data() {
            let deviceWidth = weex.config.env.deviceWidth;
            let rpx = deviceWidth / 750.0;
            return {
                coordinate: {
                    startX: 0,
                    endX: 0
                },
                containerStyle: {
                    width: "750px",
                },
                slierStyle: {
                    left: "0px",
                    right: "0px",
                    top: "0px",
                    bottom: "0px"
                },
                rpx,
                currentIndex: 0,
                minLeft: 0,
                items: []
            }
        },
        methods: {
            slideStart({changedTouches}) {
                const {screenX} = changedTouches[0];
                let left = this.coordinateConversion(screenX);
                this.coordinate.startX = left;
            },
            slideMove({changedTouches}) {
                this.setCoordinate(changedTouches[0]);
                let num = this.coordinate.endX - this.coordinate.startX;
                this.moveSlider(num);
            },
            slideEnd({changedTouches}) {
                this.setCoordinate(changedTouches[0]);
                let num = this.coordinate.endX - this.coordinate.startX;
                let minDistance = this.width / 3;
                let index = this.currentIndex;
                if (num > 0) {
                    //向右滑动
                    if (num >= minDistance) {
                        //移动超过三分之一
                        index = index - 1;
                    }
                } else {
                    //向左滑动
                    if (num <= -minDistance) {
                        //移动超过三分之一
                        index = index + 1;
                    }
                }
                this.changeTab(index);
            },
            /**
             * 改变slider tab
             **/
            changeTab(index) {
                if (index < 0) {
                    index = 0;
                }
                if (index > this.size) {
                    index = this.size;
                }
                let changeNum = this.currentIndex - index;
                let num = changeNum * this.width;
                this.moveSlider(num);
                if (this.currentIndex !== index) {
                    this.currentIndex = index;
                    this.$emit("changeSlider", {index: index});
                }
            },
            moveSlider(num) {
                let left = -this.currentIndex * this.width;

                left += parseInt(num);
                if (left > 0) {
                    left = 0;
                }
                if (left < this.minLeft) {
                    left = this.minLeft;
                }
                this.slierStyle.left = left + "px";
            },

            setCoordinate({screenX}) {
                let left = this.coordinateConversion(screenX);
                this.coordinate.endX = left;
            },

            /**
             * 坐标换算
             */
            coordinateConversion(val) {

                return val / this.rpx;
            }
        },
        beforeMount() {
            let length = this.size

            for (let i = 0; i < length; i++) {
                let item = {
                    style:{}
                };
                item.style.width = this.width + "px";
                item.style.left = i * this.width + "px";
                item.style.top = "0px";
                this.items[i] = item;
            }
            console.log(this.items)

            this.containerStyle.width = this.width + "px";
            if (this.height) {
                this.containerStyle.height = this.height + "px";
            } else {
                this.containerStyle.flex = "1";
            }

            this.slierStyle.width = this.width * length + "px";
            this.minLeft = -(length - 1) * this.width;
            if (this.showIndex !== 0) {
                this.changeTab(this.showIndex);
            }
        }
    }
</script>
<style scoped>
    .slider_wrapper {
        position: relative;
    }

    .slider_container {
        position: absolute;
    }

    .slider_item {
        position: absolute;
    }
</style>