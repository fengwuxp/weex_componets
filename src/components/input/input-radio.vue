<!--单选按钮模拟-->
<template>
    <div class="flex_row">
        <div class="flex_row flex_center"
             :style="radioStyle"
             v-for="(item,i) in items"
             @click="changeRadio(i)"
             :key="i">
            <div class="radio_icon flex_center">
                <div class="radio_selected" v-if="selected===i"></div>
            </div>
            <text class="radio_text">{{item.text}}</text>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            items: {
                default: [
                ]
            },
            selected: {
                default: 0
            },
            radioStyle: {
               default:{
                   marginRight: "15px"
               }
            }
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            changeRadio(i) {
                if(i===this.selected){
                    return;
                }
                this.selected=i;
                this.$emit("change",{
                    value:this.items[i].value,
                    index:i
                })
            }
        },
        beforeMount() {

        }
    }
</script>
<style scoped>
    .flex_row {
        flex-direction: row;
    }

    .radio_icon {
        width: 35px;
        height: 35px;
        border-width: 4px;
        border-style: solid;
        border-color: green;
        border-radius: 35px;
    }
    .radio_selected {
        width: 15px;
        height: 15px;
        border-radius:15px;
        background-color: green;
    }
    .radio_text {
        font-size: 32px;
        color: #303030;
        margin-left: 7px;
    }

    .flex_center {
        justify-content: center;
        align-items: center;
    }

</style>