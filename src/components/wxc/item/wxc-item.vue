<template>
    <div class="wxc-item"
         @click="itemClicked">
        <image :src="image" class="item-image" resize="cover"></image>
        <div class="category-tag"
             v-if="categoryTag">
            <text class="tag-text">{{categoryTag}}</text>
        </div>

        <div class="image-desc"
             v-if="imageText"
             :style="{backgroundColor: 'rgba(0, 0, 0,' + (imageDescOpacity) + ')' }">
            <text class="image-text">{{imageText}}</text>
        </div>
        <div class="item-content">
            <text :class="['item-text', titleLineCount==1 && 'one-line']"
                  :value="title">
            </text>
           <div class="bottom_content flex_cell">
               <div style="justify-content: flex-end;">
                   <div class="price-num">
                       <image v-if="priceIcon" style="width: 30px;height: 30px;" :src="priceIcon"></image>
                       <text v-if="priceIcon" class="price">{{price}}</text>
                       <text v-if="!priceIcon" class="price">&#65509;{{price}}</text>
                       <text class="postfix" v-if="postfix">起</text>
                       <text v-if="originPrice" class="origin-price" :value="'￥'+originPrice"></text>
                   </div>
               </div>
               <div class="bottom_right flex_cell">
                   <text v-if="bottomDesc" class="right_text" :value="bottomDesc"></text>
                   <image v-if="bottomTag" class="right_icon" :src="bottomTag"></image>
               </div>
           </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            image: {
                default: ""
            },
            categoryTag: {
                default: ""
            },
            imageText: {
                default: ""
            },
            imageDescOpacity: {
                default: 0.3
            },
            titleLineCount:{
                default:2
            },
            title:{
                default:""
            },
            originPrice:{
                default:""
            },
            price:{
                default:""
            },
            postfix:{
                default:false
            },
            bottomDesc:{
                default:""
            },
            bottomTag:{
                default:""
            },
            index:{
                default:""
            },
            priceIcon:{
                default:""
            }
        },
        methods:{
            itemClicked(){
                this.$emit('wxcItemGoodClick', { index: this.index });
            }
        }
    }
</script>
<style lang="sass" scoped>
    @import "./wxc-item.scss";
</style>
<style scoped>
    .flex_cell{
        flex: 1;
    }
    .bottom_content{
        flex-direction: row;
        padding-left: 12px;
    }
    .bottom_right{
        flex: 1;
        justify-content: flex-end;
        align-items: flex-end;
        padding-right: 12px;
    }
    .right_text{
        font-size: 22px;
        color: rgb(165, 165, 165);
        text-align: right;
    }
    .right_icon{
        width: 110px;
        height: 40px;
    }
    .origin-price{
        color: rgb(165, 165, 165);
        font-size: 18px;
        text-decoration: line-through;
    }
</style>