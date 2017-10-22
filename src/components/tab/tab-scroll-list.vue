<template>
    <div class="flex_cell">
        <tab-item-scroll-header
                v-if="useHeader"
                ref="tab_item_eader"
                :items="items"
                :defaultStyle="defaultStyle"
                :selectedStyle="selectedStyle"
                :selectedIndex="selectedIndex"
                @changeTabItem="changeTabItem"
                @changeTabIndex="changeTabIndex"></tab-item-scroll-header>
        <div v-if="web"
             class="flex_cell view_wrapper">
            <div v-for="(item,i) in tabList"
                 class="flex_cell"
                 :style="item.webStyle">
                <slot :name="'tab_item'+i"></slot>
            </div>
        </div>
        <!--<div v-if="!web"-->
        <!--class="view_wrapper flex_cell">-->
        <!--<embed class="view_content"-->
        <!--v-for="(item,i) in tabList"-->
        <!--:src="item.src"-->
        <!--:style="item.style"-->
        <!--type="weex"></embed>-->
        <!--</div>-->
        <slider v-if="!web"
                :infinite="false"
                :index="selectedIndex"
                @change="changeSlider"
                class="view_wrapper flex_cell">
            <embed v-for="(item,i) in tabList"
                   :key="i"
                   class="view_content"
                   :src="item.src"
                   :style="item.style"
                   type="weex"></embed>
        </slider>
    </div>
</template>
<script>
    import TabItemScrollHeader from "./tab-item-scroll-header.vue";

    const defWebStyle = {display: "block", height: "100%"};
    const hideWebStyle = {display: "none", height: "100%"};
    const defStyle = {visibility: "visible"};
    const hideStyle = {visibility: "hidden"};

    export default {
        components: {TabItemScrollHeader},
        mixins: [],
        props: {
            tabList: {default: []},
            items: {default: []},
            defaultStyle: {
                default: {
                    container: {
                        backgroundColor: "#e6e6e6",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        borderBottomWidth: "0px",
                        borderBottomColor: "green",
                        borderBottomStyle: "solid"
                    },
                    text: {
                        fontSize: "32px",
                        color: "#303030"
                    }
                },
            },
            selectedStyle: {
                default: {
                    container: {
                        backgroundColor: "#ffffff",
                        paddingTop: "20px",
                        paddingBottom: "15px",
                        borderBottomWidth: "5px",
                        borderBottomColor: "green",
                        borderBottomStyle: "solid"
                    },
                    text: {
                        fontSize: "32px",
                        color: "#303030"
                    }
                }
            },
            useHeader: {default: true},
            selectedIndex: {default: 0}
        },
        data() {
            let web = weex.config.env.platform.toLowerCase() === "web";
            //web=false;
            return {
                web,
                removeHeight: 180,
                infinite: false
            };
        },
        methods: {
            changeTabItem({currentIndex, index}) {
                if (this.web) {
                    this.tabList[this.selectedIndex].webStyle = hideWebStyle;
                    this.tabList[index].webStyle = defWebStyle;
                } else {
                    this.tabList[this.selectedIndex].style = hideStyle;
                    this.tabList[index].style = defStyle;
                }
                this.tabList = Object.assign([], this.tabList);
                this.changeTabIndex({currentIndex, index})
            },
            changeTabIndex({currentIndex, index}) {
                this.selectedIndex = index;
            },
            /**
             * 改变slider
             * @param index
             */
            changeSlider({index}) {
                this.$refs['tab_item_eader'].changeTab(index);
                console.log("使用ref调用");
            }
        },
        beforeMount() {
            //初始化数据
            this.tabList.forEach((item, i) => {
                if (this.selectedIndex === i) {
                    item.webStyle = defWebStyle;
                    item.style = defStyle;
                } else {
                    item.webStyle = hideWebStyle;
                    item.style = hideStyle
                }
            });
            let index = parseInt(this.selectedIndex);
            this.changeTabItem({currentIndex: 0, index});
        }

    }
</script>
<style scoped>
    .flex_cell {
        flex: 1;
    }

    .view_wrapper {
        justify-content: flex-end;
    }

    .view_content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>