<template>
    <div class="flex_row" :style="containerStyle">
        <div class="flex_cell" :style="borderRightStyle">
            <image class="flex_cell"
                   :src="images.left[0].content"
                   :style="images.left[0].style"
                   @click="openPage('left',0)"
            ></image>
        </div>
        <div class="flex_cell" :style="borderRightStyle">
            <div v-for="(item,i) in images.center"
                 :key="item.id"
                 :style="item.style">
                <image class="flex_cell"
                       :src="item.content"
                       @click="openPage('center',i)"
                ></image>
            </div>
        </div>
        <div class="flex_cell">
            <div v-for="(item,i) in images.center"
                 :key="item.id"
                 :style="item.style">
                <image class="flex_cell"
                       :src="item.content"
                       @click="openPage('right',i)"
                ></image>
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
            items: {default: []},
            uiFloor: {default: {}},
            web: {default: false}
        },
        data(){
            return {
                images: {
                    left: [],
                    center: [],
                    right: []
                },
                containerStyle: {},
                borderRightStyle: {},
                borderBottomStyle:{},
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
            setStyle(reqWidth = 250, reqHeight = 360){
                const {showLine, margin} = this.uiFloor;
                if (showLine) {
                    reqWidth-=1;
                    reqHeight-=2;
                    //分割线
                    this.borderRightStyle = {
                        borderRightWidth: "1px",
                        borderRightColor: this.borderColor,
                        borderRightStyle: "solid",
                    };
                    this.borderBottomStyle = {
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
                this.containerStyle=Object.assign( this.containerStyle,this.borderBottomStyle);
                this.images.left=[Object.assign(this.items[0],{style:{height:(reqHeight+1)+"px",width:reqWidth+"px"}})];

                let style={height:reqHeight/2+"px",width:reqWidth+"px"};

                this.images.center=[
                    Object.assign(this.items[1],{style:Object.assign(this.borderBottomStyle,style)}),
                    Object.assign( this.items[2],{style})
                ];
                this.images.right=[
                    Object.assign(this.items[3],{style:Object.assign(this.borderBottomStyle,style)}),
                    Object.assign( this.items[4],{style})
                ];
            }
        },
        created(){
            if (this.web) {
                this.show = true;
                this.setStyle(250, 360);
                return;
            }

            let width = 250;
            imageLoader.loadImageInfo(this.items[0].content, width, ({reqWidth, reqHeight}) => {
                    this.show = true;
                    this.setStyle(reqWidth, reqHeight);
                }, (msg) => {
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