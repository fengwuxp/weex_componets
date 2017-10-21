<template>
    <div class="icon-list-container" :style="containerStyle">
        <div class="icon-list-rows"
              v-for="(itemList,row) in list">
            <div class="icon-item flex_center"
                 v-for="(item,i) in itemList"
                 :key="item.id"
                 :style="item.style"
                 @click="clickIcon(row,i)">
                <image class="icon-item-image" :src="item.content"></image>
                <text class="icon-item-text">{{item.name}}</text>
            </div>
        </div>
    </div>
</template>
<script>
    import callNative from "wxp_weex_componets/src/mixins/CallNative";
    import mixins from "wxp_weex_componets/src/mixins/index";
    import memberSession from "../../mixins/MemberSession";

    export default{
        mixins:[callNative,mixins,memberSession],
        props: {
            items: {default: {}},
            uiFloor: {default: {}},
            web: {default: false}
        },
        data(){
            return {
                list: [],
                containerStyle:{}
            }
        },
        methods: {
            clickIcon(row, i){
                let item = this.list[row][i];
                const {actionType,actionValue,needLogin}=item;
                this.openActivity({
                    actionType:actionType,
                    actionValue: actionValue,
                    needLogin:needLogin
                });
            }
        },
        created(){
            const list = [];
            const {showLine, margin} = this.uiFloor;
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
            this.items.forEach((item, i) => {
                let style={};
                if(showLine){
                    style={
                        borderRightWidth:"1px",
                        borderRightColor:"#e6e6e6",
                        borderRightStyle:"solid"
                    }
                }
                item.style=style;
                if (i % 5 === 0) {
                    list[list.length] = [];
                }
                let len = list.length - 1;
                list[len][list[len].length] = item;
            });
            this.list = list;
        }
    }
</script>

<style scoped>
    .flex_center{
        justify-content: center;
        align-items: center;
    }
    .icon-list-container {
        flex: 1;
        background-color: #ffffff;
    }
    .icon-list-rows{
        flex-direction: row;
        flex: 1;
    }
    .icon-item {
        flex: 1;
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .icon-item-image {
        width: 55px;
        height: 55px;
        margin-bottom: 15px;
    }

    .icon-item-text {
        width: 150px;
        text-align: center;
        color: #3c3c3c;
        font-size: 28px;
    }

</style>