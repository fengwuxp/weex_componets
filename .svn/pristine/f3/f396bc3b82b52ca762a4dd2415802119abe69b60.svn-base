<template>
    <div class="flex_cell">
        <tab-item-header ref="tab_item_eader"
                         v-if="useHeader"
                         :items="items"
                         :defaultStyle="defaultStyle"
                         :selectedStyle="selectedStyle"
                         :selectedIndex="selectedIndex"
                         @changeTabItem="changeTabItem"
                         @changeTabIndex="changeTabIndex"
        ></tab-item-header>
        <div v-if="web"
             v-for="(item,i) in tabList"
             class="flex_cell"
             :style="item.webStyle">
            <slot :name="'tab_item'+i"></slot>
        </div>
        <div v-if="!web" class="view_wrapper">
            <embed class="view_content"
                   v-for="(item,i) in tabList"
                   :src="item.src"
                   :style="item.style"
                   type="weex"></embed>
        </div>
    </div>
</template>
<script>
    import TabItemHeader from "./tab-item-header.vue";
    export default {
        components: {TabItemHeader},
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
            selectedIndex: {default:0}
        },
        data() {
            return {
                web: weex.config.env.platform.toLowerCase() === "web",
                removeHeight: 180,
                infinite: false
            };
        },
        methods: {
            changeTabItem({currentIndex, index}) {
                if (this.web) {
                    this.tabList[this.selectedIndex].webStyle = {display: "none"};
                    this.tabList[index].webStyle = {display: "block"};
                } else {
                    this.tabList[this.selectedIndex].style = {visibility: "hidden"};
                    this.tabList[index].style = {visibility: "visible"};
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
                    item.webStyle = {display: "block"};
                    item.style = {visibility: "visible"};
                } else {
                    item.webStyle = {display: "none"};
                    item.style = {visibility: "hidden"};
                }
                //  item.style={ visibility: "visible"};
            });
            let index=parseInt(this.selectedIndex);
            this.changeTabItem({currentIndex:0, index});
        }

    }
</script>
<style>
    .flex_cell {
        flex: 1;
    }

    .view_wrapper {
        position: absolute;
        top: 78px;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .view_content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>