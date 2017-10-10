<!--工作台 item-->
<template>
    <div class="workbench-item flex_center flex_cell" @click="clickItem">
        <image :src="icon" class="image_60"></image>
        <text class="text-item margin_top_20">{{text}}</text>
    </div>
</template>
<script>
    export default {
        props:{
            icon:{default:""},
            text:{default:""}
        },
        methods:{
            clickItem(){
                this.$emit("clickItem",{
                    text:this.text
                });
            }
        }
    }
</script>

<style scoped>

    .flex_center {
        justify-content: center;
        align-items: center;
    }
    .flex_cell{
        flex: 1;
    }

    .text-item {
        font-size: 30px;
        color: #303030;
    }
    .image_60 {
        width: 60px;
        height: 60px;
    }

    .margin_top_20 {
        margin-top: 20px;
    }

    .workbench-item{
        height: 180px;
    }

</style>