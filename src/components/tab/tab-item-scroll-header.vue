<!--tab item scroll-头部-->
<template>
    <scroller class="flex_row flex_center"
              :style="scrollStyle"
              show-scrollbar="false"
              scroll-direction="horizontal">
        <div class="flex_center"
             v-for="(item,i) in items"
             :key="i"
             :ref="'item_header_'+i"
             @click="changeTab(i)"
             :style="item.style">
            <text :style="item.textStyle">{{item.text}}</text>
        </div>
    </scroller>
</template>
<script>
    import {dom} from "wxp_weex_componets/src/utils/ExportWeexModel";

    export default {
        props: {
            items: {default: []},
            scrollStyle: {
                default: {
                    height: "80px",
                    justifyContent: "flex-start",
                    width: "750px",
                    paddingLeft:"20px",
                    paddingRight:"20px"
                }
            },
            defaultStyle: {
                default: {
                    container: {
                        backgroundColor: "#ffffff",
                        flex: "1"
                    },
                    text: {
                        fontSize: "32px",
                        color: "#303030"
                    }
                }
            },
            selectedStyle: {
                default: {
                    container: {
                        backgroundColor: "green"
                    },
                    text: {
                        fontSize: "32px",
                        color: "#FFFFFF"
                    }
                }
            },
            selectedIndex: {default: 0}
        },
        data() {
            return {};
        },
        methods: {
            //点击改变tab项
            changeTab(i) {
                if (this.selectedIndex === i) {
                    return;
                }
                this.changeStyle(this.selectedIndex, i);
                this.$emit("changeTabItem", {
                    currentIndex: this.selectedIndex,
                    index: i,
                });

                if (this.items.length > 5) {
                    let targetIndex = (i === 0 || i === this.items.length - 1) ? i : i - 1;
                    const el = this.$refs['item_header_' + targetIndex][0];
                    dom.scrollToElement(el);
                }
            },
            /**
             *
             * @param selected 当前选择中的
             * @param next 下一个选中的
             */
            changeStyle(selected, next) {
                this.items[next].style = Object.assign({}, this.selectedStyle.container);
                this.items[next].textStyle = Object.assign({}, this.selectedStyle.text);
                this.items[selected].style = Object.assign({}, this.defaultStyle.container);
                this.items[selected].textStyle = Object.assign({}, this.defaultStyle.text);
                this.items = Object.assign([], this.items);
            }
        },
        beforeMount() {
            this.items.forEach((item, i) => {
                if (i === this.selectedIndex) {
                    item.style = Object.assign({}, this.selectedStyle.container);
                    item.textStyle = Object.assign({}, this.selectedStyle.text);
                } else {
                    item.style = Object.assign({}, this.defaultStyle.container);
                    item.textStyle = Object.assign({}, this.defaultStyle.text);
                }
            });
        }
    }
</script>
<style scoped>
    .flex_row {
        flex-direction: row;
    }

    .flex_center {
        justify-content: center;
        align-items: center;
    }
</style>