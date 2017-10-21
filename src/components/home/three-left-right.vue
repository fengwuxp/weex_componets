<template>
    <div class="flex_row" :style="containerStyle" v-if="show">
        <div :style="borderRightStyle">
            <image v-for="(item,i) in images.left"
                   class="flex_cell"
                   :src="item.content"
                   :key="item.id"
                   :style="item.style"
                   @click="openPage('left',i)"
            ></image>
        </div>
        <div class="flex_cell">
            <image v-for="(item,i) in images.right"
                   class="flex_cell"
                   :src="item.content"
                   :key="item.id"
                   :style="item.style"
                   @click="openPage('right',i)"
            ></image>
        </div>
    </div>
</template>
<script>
    import {imageLoader} from "wxp_weex_componets/src/utils/ExportWeexModel";
    import callNative from "wxp_weex_componets/src/mixins/CallNative";
    import mixins from "wxp_weex_componets/src/mixins/index";
    import memberSession from "../../mixins/MemberSession";

    export default{
        mixins:[callNative,memberSession,mixins],
        props: {
            items: {default: []},
            uiFloor: {default: {}},
            web: {default: false}
        },
        data(){
            return {
                images: {
                    left: [],
                    right: []
                },
                style: {
                    left: {},
                    right: {},
                },
                containerStyle: {},
                borderRightStyle: {},
                show: false
            };
        },
        methods: {
            openPage(key, i){
                let item = this.images[key][i];
                const {actionType,actionValue,needLogin}=item;
                this.openActivity({
                    actionType:actionType,
                    actionValue: actionValue,
                    needLogin:needLogin
                });
            },
            setStyle(reqWidth=375,reqHeight = 360){
                const {showLine, margin} = this.uiFloor;
                if(showLine){
                    reqWidth=reqWidth-1;
                }
                this.divideLeftRight(reqWidth,reqHeight,showLine);

                let borderRight = {};
                let borderBottom = {};
                if (showLine) {
                    //分割线
                    borderRight = {
                        borderRightWidth: "1px",
                        borderColor: this.borderColor,
                        borderRightStyle: "solid",
                    };
                    borderBottom = {
                        borderBottomWidth: "1px",
                        borderColor: this.borderColor,
                        borderBottomStyle: "solid"
                    }
                    this.borderRightStyle = Object.assign({
                        width:(reqWidth+1)+"px"
                    },borderRight);;
                    this.containerStyle =borderBottom;
                }
                if (margin !== null && margin.trim().length > 0) {
                    //margin处理
                    const marginAttrs = ["marginTop", "marginRight", "marginBottom", "marginLeft"];
                    const s = margin.split(" ");
                    s.forEach((val, i) => {
                        if(val.trim().length===0){
                            return;
                        }
                        this.containerStyle[marginAttrs[i]] = val.indexOf("px") >= 0 ? val : val + "px";
                    });
                }


                this.images.left.forEach((item, i) => {
                    if (i + 1 === this.images.left.length) {
                        item.style = Object.assign({}, this.style.left);
                    } else {
                        item.style = Object.assign({}, this.style.left, borderBottom);
                    }

                });

                this.images.right.forEach((item, i) => {
                    if (i + 1 === this.images.right.length) {
                        item.style = Object.assign({}, this.style.right);
                    } else {
                        item.style = Object.assign({}, this.style.right, borderBottom);
                    }
                });
            },
            divideLeftRight(reqWidth,reqHeight,showLine){
                const {componentType} = this.uiFloor;
                let isLeft = componentType === "LEFT_ONE_RIGHT_TWO";
                if (isLeft) {
                    this.style.left = {
                        height: reqHeight + "px",
                        width:reqWidth+"px"
                    };
                    this.style.right = {
                        height: reqHeight / 2 + "px",
                        width:reqWidth+"px"
                    };
                    this.images.left = [this.items[0]];
                    this.images.right = [this.items[1], this.items[2]];
                } else {
                    this.style.left = {
                        height: reqHeight / 2 + "px",
                        width:reqWidth+"px"
                    };
                    this.style.right = {
                        height: reqHeight + "px",
                        width:reqWidth+"px"
                    };
                    this.images.left = [this.items[1], this.items[2]];
                    this.images.right = [this.items[0]];
                }
            }
        },
        created(){
            if (this.web) {
                this.show = true;
                this.setStyle(375,360);
                return;
            }

            let width = 750 / 2;
            imageLoader.loadImageInfo(this.items[0].content, width, ({reqWidth, reqHeight}) => {
                    this.show = true;
                    this.setStyle(reqWidth,reqHeight);
                },
                (msg) => {
                    console.log("获取图片高度失败!-> " + msg);
                });
        }
    }
</script>
<style scoped>
    .flex_row {
        flex-direction: row
    }
    .flex_cell {
        flex: 1;
    }
</style>