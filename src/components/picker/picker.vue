<!--选择器-->
<template>
    <div>
        <div class="mask_select" @click="close"></div>
        <transition name="fade">
            <div class="area_ctrl" v-if="show">
                <div class="area_btn_box">
                    <text class="area_btn larea_cancel" @click="close">取消</text>
                    <text class="area_btn larea_finish" @click="finish">确定</text>
                </div>
                <div class="area_roll_mask">
                    <div class="area_roll">
                        <div>
                            <div top="0" class="gear area_province"
                                 data-areatype="area_province"
                                 data-type="provs"
                                 :data-len="pData1.length"
                                 val="5"
                                 @touchstart="gearTouchStart"
                                 @touchmove="gearTouchMove"
                                 @touchend="gearTouchEnd">
                                <text class="tooth" v-for="(item,i) in pData1" :key="i">{{item.text}}</text>
                            </div>
                            <div class="area_grid"></div>
                        </div>
                        <div v-if="selectData.columns > 1">
                            <div class="gear area_city" top="0" data-areatype="area_city" data-type="city"
                                 :data-len="pData2.length"
                                 @touchstart="gearTouchStart"
                                 @touchmove="gearTouchMove"
                                 @touchend="gearTouchEnd"
                                 val="5">
                                <text class="tooth" v-for="(item,i) in pData2" :key="i">{{item.text}}</text>
                            </div>
                            <div class="area_grid">
                            </div>
                        </div>
                        <div v-if="selectData.columns > 2">
                            <div class="gear area_county" top="0"
                                 data-areatype="area_county"
                                 :data-len="pData3.length"
                                 @touchstart="gearTouchStart"
                                 @touchmove="gearTouchMove"
                                 @touchend="gearTouchEnd"
                                 val="5">
                                <text class="tooth" v-for="(item,i) in pData3" :key="i">{{item.text}}</text>
                            </div>
                            <div class="area_grid"></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            selectData: {
                type: Object,
                default: {}
            },
            defValue: {
                type: Object,
                default: {
                    select1: '',
                    select2: '',
                    select3: ''
                }
            }
        },
        data() {
            return {
                pData1: [],
                pData2: [],
                pData3: [],
                selects: {
                    select1: '',
                    select2: '',
                    select3: ''
                },
                noData: false
            }
        },
        methods: {
            close: function (e) {
                this.show = false;
                this.$emit('cancel');
                this.removeElement();
            },
            finish: function (e) {
                this.$emit('confirm', this.selects)
                this.removeElement();
            },
            removeElement() {
                setTimeout(() => {
                    this.$el.parentNode.removeChild(this.$el);
                }, 400)
            },
            gearTouchStart(e) {
                let target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                clearInterval(target["int_" + target.id]);
                target["old_" + target.id] = e.targetTouches[0].screenY;
                target["o_t_" + target.id] = (
                    new Date()).getTime();
                let top = target.getAttribute('top');
                if (top) {
                    target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
                } else {
                    target["o_d_" + target.id] = 0;
                }
                target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
            },
            //手指移动
            gearTouchMove(e) {
                // e.preventDefault();
                let target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                target["new_" + target.id] = e.targetTouches[0].screenY;
                target["n_t_" + target.id] = (
                    new Date()).getTime();
                let f = (
                    target["new_" + target.id] - target["old_" + target.id]) * 30 / window.innerHeight;
                target["pos_" + target.id] = target["o_d_" + target.id] + f;
                target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
                target.setAttribute('top', target["pos_" + target.id] + 'em');
                if (e.targetTouches[0].screenY < 1) {
                    gearTouchEnd(e);
                }
            },
            gearTouchEnd(e) {
                // e.preventDefault();
                let target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break;
                    }
                }
                let flag = (target["new_" + target.id] - target["old_" + target.id]) / (
                    target["n_t_" + target.id] - target["o_t_" + target.id]);
                if (Math.abs(flag) <= 0.2) {
                    target["spd_" + target.id] = (
                        flag < 0 ? -0.08 : 0.08);
                } else {
                    if (Math.abs(flag) <= 0.5) {
                        target["spd_" + target.id] = (
                            flag < 0 ? -0.16 : 0.16);
                    } else {
                        target["spd_" + target.id] = flag / 2;
                    }
                }
                if (!target["pos_" + target.id]) {
                    target["pos_" + target.id] = 0;
                }
                this.rollGear(target);
            },
            rollGear(target) {
                let _this = this
                let d = 0;
                let stopGear = false;

                function setDuration() {
                    target.style.webkitTransitionDuration = target.style.transitionDuration = '200ms';
                    stopGear = true;
                }

                clearInterval(target["int_" + target.id]);
                target["int_" + target.id] = setInterval(function () {
                    let pos = target["pos_" + target.id];
                    let speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
                    pos += speed;
                    if (Math.abs(speed) > 0.1) {
                    } else {
                        let b = Math.round(pos / 2) * 2;
                        pos = b;
                        setDuration();
                    }
                    if (pos > 0) {
                        pos = 0;
                        setDuration();
                    }
                    let minTop = -(
                        target.dataset.len - 1) * 2;
                    if (pos < minTop) {
                        pos = minTop;
                        setDuration();
                    }
                    if (stopGear) {
                        let gearVal = Math.abs(pos) / 2;
                        _this.setGear(target, gearVal);
                        clearInterval(target["int_" + target.id]);
                    }
                    target["pos_" + target.id] = pos;
                    target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
                    target.setAttribute('top', pos + 'em');
                    d++;
                }, 30);
            },
            setGear(target, val) {
                let _self = this
                let endVal = Math.round(val);
                let type = target.getAttribute('data-type')
                // 不是联级
                if (!this.selectData.link) {
                    if (type === 'provs') {
                        _self.selects.select1 = _self.pData1[endVal]
                    } else if (type === 'city') {
                        _self.selects.select2 = _self.pData2[endVal]
                    } else {
                        _self.selects.select3 = _self.pData3[endVal]
                    }
                } else {
                    if (type === 'provs') {
                        _self.selects.select1 = _self.pData1[endVal]
                        _self.resetData2(endVal)
                        if (this.selectData.columns === 3) {
                            _self.resetData3(0)
                        }
                    } else if (type === 'city' && this.selectData.columns === 2) {
                        this.selects.select2 = this.pData2[endVal]
                    } else if (type === 'city' && this.selectData.columns === 3) {
                        _self.resetData3(endVal)
                        this.selects.select2 = this.pData2[endVal]
                    } else if (this.selectData.columns === 3) {
                        this.selects.select3 = this.pData3[endVal]
                    }
                }
            },
            resetData2(endVal) {
                let city = document.querySelector('.area_city')
                if (this.selectData.pData2[this.pData1[endVal].value]) {
                    this.pData2 = this.selectData.pData2[this.pData1[endVal].value]
                } else {
                    this.pData2 = []
                }
                this.selects.select2 = this.pData2[0]
                city.setAttribute('top', 0);
                city.style["-webkit-transform"] = 'translate3d(0, 0, 0)';
            },
            resetData3(endVal) {
                let county = document.querySelector('.area_county')
                if (this.pData2.length > 0 && this.pData2[endVal]) {
                    this.pData3 = this.selectData.pData3[this.pData2[endVal].value]
                } else {
                    this.pData3 = []
                }
                this.selects.select3 = this.pData3[0]
                county.setAttribute('top', 0);
                county.style["-webkit-transform"] = 'translate3d(0, 0, 0)';
            },
            init() {
                //TODO 回显逻辑
                if (!this.selectData.link) {
                    this.pData1 = this.selectData.pData1;
                    this.pData2 = this.selectData.pData2;
                    this.pData3 = this.selectData.pData3;
                } else {
                    this.pData1 = this.selectData.pData1;
                    this.pData2 = this.selectData.pData2[this.pData1[0].value]
                    if (this.selectData.columns === 3) {
                        this.pData3 = this.selectData.pData3[this.pData2[0].value]
                    }
                }
                this.selects.select1 = this.pData1[0]
                if (this.selectData.columns === 2) {
                    this.selects.select2 = this.pData2[0]
                } else if (this.selectData.columns === 3) {
                    this.selects.select2 = this.pData2[0]
                    this.selects.select3 = this.pData3[0]
                }

            }
        },
        created() {
            this.init()
        },
        watch: {
            selectData: {
                handler: function () {
                    this.init()
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    .mask_select {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3)
    }

    .area_ctrl {
        font-size: 12px;
        vertical-align: middle;
        background-color: #d5d8df;
        color: #000;
        margin: 0;
        height: auto;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 9901;
        overflow: hidden;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: .3s;
    }

    .fade-enter,
    .fade-leave-to {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0)
    }

    .area_roll {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        height: auto;
        overflow: hidden;
        background-color: transparent;
        -webkit-mask: -webkit-gradient(linear, 0% 50%, 0% 100%, from(#debb47), to(rgba(36, 142, 36, 0)));
        -webkit-mask: -webkit-linear-gradient(top, #debb47 50%, rgba(36, 142, 36, 0))
    }

    .area_roll > div {
        font-size: 1.6em;
        height: 10em;
        float: left;
        background-color: transparent;
        position: relative;
        overflow: hidden;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1
    }

    .area_roll > div .gear {
        width: 100%;
        float: left;
        position: absolute;
        z-index: 9902;
        margin-top: 4em
    }

    .area_roll_mask {
        -webkit-mask: -webkit-gradient(linear, 0% 40%, 0% 0%, from(#debb47), to(rgba(36, 142, 36, 0)));
        -webkit-mask: -webkit-linear-gradient(bottom, #debb47 50%, rgba(36, 142, 36, 0));
        padding: 0
    }

    .area_grid {
        position: relative;
        top: 4em;
        width: 100%;
        height: 2em;
        margin: 0;
        box-sizing: border-box;
        z-index: 0;
        border-top: 1px solid #abaeb5;
        border-bottom: 1px solid #abaeb5
    }

    .area_roll > div:nth-child(3) .area_grid > div {
        left: 42%
    }

    .area_btn {
        color: #0575f2;
        /*font-size: 14px;*/
        line-height: 1em;
        text-align: center;
        padding: .8em 1em
    }

    .area_btn_box:before,
    .area_btn_box:after {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        display: block;
        background-color: #96979b;
        z-index: 15;
        -webkit-transform: scaleY(0.33);
        transform: scaleY(0.33)
    }

    .area_btn_box {
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: stretch;
        -webkit-align-items: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        background-color: #f1f2f4;
        position: relative;
        flex-direction: row;
    }

    .area_btn_box:before {
        left: 0;
        top: 0;
        -webkit-transform-origin: 50% 20%;
        transform-origin: 50% 20%
    }

    .area_btn_box:after {
        left: 0;
        bottom: 0;
        -webkit-transform-origin: 50% 70%;
        transform-origin: 50% 70%
    }

    .tooth {
        height: 2em;
        line-height: 2em;
        text-align: center;
        line-clamp: 1;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
    }
</style>
