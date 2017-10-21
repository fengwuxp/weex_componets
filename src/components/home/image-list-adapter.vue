<template>
    <div v-if="show">
        <div class="flex_row flex_cell" v-if="rows===1" :style="containerStyle">
            <div v-for="(item,i) in items"
                 :key="i"
                 :style="item.style">
                <image :src="item.content"
                       @click="openPage(i)"
                       :style="item.imageStyle"
                       class="flex_cell"
                ></image>
            </div>
        </div>
        <div v-if="rows>1" v-for="(itemList,row) in list">
            <div class="flex_row" :style="containerStyle">
                <div v-for="(item,i) in items"
                     :key="i"
                     :style="item.style">
                    <image :src="item.content"
                           @click="openPage(i)"
                           :style="item.imageStyle"
                           class="flex_cell"
                    ></image>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {imageLoader} from "wxp_weex_componets/src/utils/ExportWeexModel";
    import callNative from "wxp_weex_componets/src/mixins/CallNative";
    import mixins from "wxp_weex_componets/src/mixins/index";
    import memberSession from "../../mixins/MemberSession";

    export default{
        mixins: [callNative, mixins],
        props: {
            items: {default: {}},
            uiFloor: {default: {}},
            web: {default: false},
        },
        data(){
            const typeList = {
                THE_ONE_COLUMN: {
                    columns: 1,
                    rows: 1
                },
                THE_TWO_COLUMN: {
                    columns: 2,
                    rows: 1
                },
                THE_THREE_COLUMN: {
                    columns: 3,
                    rows: 1
                },
                THE_FOUR_COLUMN: {
                    columns: 4,
                    rows: 1
                },
                TWO_ROW_TWO_COLUMN: {
                    columns: 2,
                    rows: 2
                },
                INDEFINITE_TERM_GOODS: {
                    columns: 2,
                    rows: 2
                }
            }
            return {
                typeList,
                style: {
                    height: "360px"
                },
                containerStyle: {},
                show: false,
                list: [],
                rows: 1
            }
        },
        methods: {
            openPage(row, i = -1){
                let item;
                if (i = -1) {
                    item = this.items[row];
                } else {
                    item = this.items[row][i];
                }
                const {actionType,actionValue,needLogin}=item;
                this.openActivity({
                    actionType:actionType,
                    actionValue: actionValue,
                    needLogin:needLogin
                });
            },
            setStyle(reqWidth, reqHeight, columns){
                const {showLine, margin} = this.uiFloor;
                let styleRightBorder = {};
                if (showLine) {
                    //分割线
                    styleRightBorder = {
                        borderRightWidth: "1px",
                        borderRightColor: this.borderColor,
                        borderRightStyle: "solid",
                    };
                    this.containerStyle = {
                        borderBottomWidth: "1px",
                        borderBottomColor: this.borderColor,
                        borderBottomStyle: "solid"
                    }
                }

                if (margin !== null && margin.trim().length > 0) {
                    //margin处理
                    const marginAttrs = ["marginTop", "marginRight", "marginBottom", "marginLeft"];
                    const s = margin.split(" ");
                    s.forEach((val, i) => {
                        if (val.trim().length === 0) {
                            return;
                        }
                        this.containerStyle[marginAttrs[i]] = val.indexOf("px") >= 0 ? val : val + "px";
                    });
                }

                switch (columns) {
                    case 1:
                        reqWidth = 749;
                        break;
                    case 2:
                        reqWidth = 374;
                        break;
                    case 3:
                        reqWidth = 249;
                        break;
                    case 4:
                        reqWidth = 184;
                        break;
                    default:
                        console.log("未处理的列数: " + columns);
                }
                const len = this.items.length;
                this.items.forEach((item, index) => {
                    if (len === index + 1) {
                        styleRightBorder = {};
                        reqWidth+=1;
                    }
                    item.style = Object.assign({}, {height: reqHeight + "px"}, styleRightBorder);
                    item.imageStyle={height: reqHeight + "px",width:reqWidth+"px"};
                });
            },
            countRows(){
                if (this.rows <= 1) {
                    return;
                }
                const list = [];
                this.items.forEach((item, i) => {
                    if (i % 2 === 0) {
                        list[list.length] = [];
                    }
                    let len = list.length - 1;
                    list[len][list[len].length] = item;
                });
                this.list = list;
            }
        },
        created(){
            const {componentType} = this.uiFloor;
            let typeList = this.typeList[componentType];
            if (typeList === undefined) {
                return;
            }
            const {columns, rows} = typeList;
            this.rows = rows;
            let width = (750 - columns) / columns; //parseInt();
            console.log("--预计图片宽度--> " + width);
            if (this.web) {
                // this.style ={height: 360 + "px",maxWidth:width+"px"};
                this.setStyle(width, 360, columns);
                this.countRows();
                this.show = true;
                return;
            }
            imageLoader.loadImageInfo(this.items[0].content, width, (map) => {
                const {reqWidth, reqHeight} = map;
                this.show = true;
                //this.style ={height: reqHeight + "px",maxWidth:reqWidth+"px"};
                this.setStyle(reqWidth, reqHeight, columns);
                this.countRows();
                console.log("获取图片高度!-> " + JSON.stringify(map));
            }, (msg) => {
                console.log("获取图片高度失败!-> " + msg);
            });
        }
    }
</script>
<style scoped>
    .flex_row {
        flex-direction: row;
    }

    .flex_cell {
        flex: 1
    }

</style>