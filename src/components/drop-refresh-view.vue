<!--下拉刷新视图-->
<template>
    <scroller class="flex_cell"
              :loadmoreoffset="loadmoreoffset"
              @scroll="viewScroll"
              @loadmore="loadmore"
              show-scrollbar="false">
        <refresh class="flex_row"
                 :style="refreshContainerStyle"
                 @refresh="viewRefresh"
                 @pullingdown="viewOnPullingDown"
                 :display="showRefresh ? 'show' : 'hide'">
            <div v-if="userIndicator==='default'"
                 class="flex_row flex_v_center"
                 :style="refreshContentStyle">
                <image :src="images[currentAnimationFrame]" :style="imageStyle"></image>
                <div style="margin-left: 5px;">
                    <text class="loading_text" v-if="refreshTitle.length>0">{{refreshTitle}}</text>
                    <text class="loading_text" v-if="tipStatus===false">{{pullDownTipText}}</text>
                    <text class="loading_text" v-if="tipStatus">{{refreshTipText}}</text>
                </div>
            </div>
            <div v-if="userIndicator==='indicator'"
                 class="flex_row flex_v_center"
                 :style="refreshContentStyle">
                <text class="loading_text" :value="refreshTitle"></text>
                <loading-indicator color="red" :style="indicatorStyle"></loading-indicator>
            </div>
            <slot v-if="userIndicator==='custom'" name="refresh-view"></slot>
        </refresh>
        <slot></slot>
    </scroller>
</template>
<script>
    import {timer} from "typescript_api_sdk/src/utils/ExportWeexSdkModel";
    import weexUtils from "../utils/WeexUtils";

    export default {
        //mixins: [tabbarPage],
        props: {
            imageStyle: {
                default: {
                    width: "60px",
                    height: "60px"
                }
            },
            refreshContainerStyle: {
                default: {
                    width: "750px",
                    justifyContent:"center"
                }
            },
            refreshContentStyle: {
                default: {}
            },
            //刷新动画图片数组长度
            imagesLength: {
                default: 5
            },
            refreshTitle: {default: ""},
            pullDownTipText: {default: "松开后刷新"},
            refreshTipText: {default: "正在加载中"},
            frameTimes: {default: 130},
            loadmoreoffset: {default: 120},
            headerHeight: {default: 0},
            indicatorStyle: {
                width: "60px",
                height: "60px",
                color: "red"
            },
            userIndicator: {default: "default"} //使用默认的动画效果
        },
        data() {
            return {
                images: [],
                showRefresh: false,
                tipStatus: false,
                animationFrameHandler: null,
                currentAnimationFrame: 0, //当前下拉刷新动画的帧
            }
        },
        methods: {
            /**
             * 下拉刷新动画帧控制
             **/
            viewRefreshAnimation() {
                console.log("开始执行动画刷新!--> " + this.currentAnimationFrame);
                timer.setTimeout(this.animationFrameHandler, this.frameTimes);
            },
            viewOnPullingDown() {
                //开始动画
            },
            viewRefresh() {
                this.showRefresh = true;
                this.tipStatus = true;
                this.viewRefreshAnimation(true);
                this.$emit("refreshPage", () => {
                    this.refreshEnd();
                });
            },
            refreshEnd() {
                timer.setTimeout(() => {
                    //结束动画
                    //this.viewRefreshAnimation();
                    this.showRefresh = false;
                    timer.setTimeout(() => {
                        this.tipStatus = false;
                    }, 200);
                }, 500);
            },
            loadmore() {
                this.$emit("loadmore");
            },
            viewScroll(event) {
                //页面滚动时调用的方法
                this.$emit("pageScroller", event);
            }
        },
        created() {
            const imagesLength = this.imagesLength;
            const images = []
            for (let i = 0; i < imagesLength; i++) {
                images[i] = weexUtils.getResourcesURL("images/animation/pull_to_refresh_people_" + i + ".png");
            }
            this.images = images;
            this.animationFrameHandler = () => {
                console.log("this.currentAnimationFrame-->  " + this.currentAnimationFrame);
                if (this.currentAnimationFrame < imagesLength) {
                    this.currentAnimationFrame++;
                } else {
                    this.currentAnimationFrame = 0;
                }
                if (this.showRefresh) {
                    this.viewRefreshAnimation();
                }
            };

        }
    }
</script>
<style scoped>

    .flex_v_center {
        align-items: center;
    }

    .flex_row {
        flex-direction: row;
    }

    .flex_cell {
        flex: 1;
    }

    .loading_text {
        font-size: 30px;
        color: #9c9c9c;
        text-align: center;
        padding-left: 10px;
    }
</style>