<!--下拉刷新视图-->
<template>
    <!--<div style="flex:1;">-->
    <!---->
    <!--<slot name="drop-no-scroller"></slot>-->
    <!--</div>-->
    <scroller :style="listStyle"
              :loadmoreoffset="loadmoreoffset"
              @scroll="viewScroll"
              @loadmore="loadmore"
              show-scrollbar="false">
        <refresh class="flex_row" :style="refreshContainerStyle"
                 @refresh="viewRefresh"
                 @pullingdown="viewOnPullingDown"
                 :display="showRefresh ? 'show' : 'hide'">
            <div class="flex_row flex_v_center" :style="refreshContentStyle">
                <image :src="images[currentAnimationFrame]" :style="imageStyle"></image>
                <div v-if="refreshTitle.length>0 && pullDownTipText.length>0 ">
                    <text class="loading_text" v-if="refreshTitle.length>0">{{refreshTitle}}</text>
                    <text class="loading_text" v-if="tipStatus===false">{{pullDownTipText}}</text>
                    <text class="loading_text" v-if="tipStatus">{{refreshTipText}}</text>
                </div>
            </div>
        </refresh>
        <slot></slot>
    </scroller>
</template>
<script>
    import tabbarPage from '../mixins/TabbarPage';
    import {timer} from "../utils/ExportWeexModel";
    import weexUtils from "../utils/WeexUtils";

    export default {
        mixins: [tabbarPage],
        props: {
            imageStyle: {
                default: {
                    width: "224px",
                    height: "126px"
                }
            },
            refreshContainerStyle: {
                default: {
                    width: "750px"
                }
            },
            refreshContentStyle:{
                default: {
                    paddingLeft:"100px"
                }
            },
            images: { default: [
                weexUtils.getResourcesURL("images/animation/pull_to_refresh_people_0.png", weex),
                weexUtils.getResourcesURL("images/animation/pull_to_refresh_people_1.png", weex),
                weexUtils.getResourcesURL("images/animation/pull_to_refresh_people_2.png", weex),
                weexUtils.getResourcesURL("images/animation/pull_to_refresh_people_3.png", weex),
                weexUtils.getResourcesURL("images/animation/pull_to_refresh_people_4.png", weex),
                weexUtils.getResourcesURL("images/animation/pull_to_refresh_people_5.png", weex)
            ]},
            refreshTitle: {default: ""},
            pullDownTipText: {default: "松开后刷新"},
            refreshTipText: {default: "正在加载中"},
            frameTimes: {default: 130},
            loadmoreoffset:{default:120},
            headerHeight: {default: 0}
        },
        data() {
            return {
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
            refreshEnd(){
                timer.setTimeout(() => {
                    //结束动画
                    //this.viewRefreshAnimation();
                    this.showRefresh = false;
                    timer.setTimeout(() => {
                        this.tipStatus = false;
                    }, 200);
                }, 500);
            },
            loadmore(){
                this.$emit("loadmore");
            },
            viewScroll(event) {
                //页面滚动时调用的方法
                this.$emit("pageScroller", event);
            }
        },
        created() {
            const imagesLength = this.images.length;
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

    .loading_text {
        font-size: 30px;
        color: #9c9c9c;
        text-align: center;
        padding-left: 10px;
    }
</style>