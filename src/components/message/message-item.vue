<template>
    <div class="list_item">
        <div class="date_time">
            <text class="def-font-style">{{time}}</text>
        </div>
        <div class="content">
            <text class="def-font-style" lines="2" style=" lines: 2;text-overflow:ellipsis;">{{message}}</text>
        </div>
        <div class="delete_button" @click="deleteItem">
            <image style="width: 40px;height: 40px;"
                   src="data:image/png;base64,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"></image>
        </div>
    </div>
</template>

<script>
    export default{
        props: {
            time: {default: ""},
            message: {default: ""},
            orderNumber:{default:-1},
            url: {default: ""}
        },
        data(){
            return {
            }
        },
        methods: {
            deleteItem: function () {
              this.$emit("deleteMessage",this.orderNumber)
            }
        }
    }
</script>

<style scoped>
    .list_item {
        flex-direction: row;
        align-items: center;
        background-color: #ffffff;
        border-bottom: solid 1px #e6e6e6;
        padding-left: 10px;
        padding-right: 10px;
    }

    .def-font-style {
        font-size: 32px;
        color: #3f3c3c;
    }

    .date_time {
        width: 170px;
        justify-content: flex-start;
    }

    .content {
        width: 520px;
        color: #555;
        justify-content: center;
        padding: 25px;
    }

    .delete_button {
        width: 40px;
        align-items: center;
        text-align: center;
        justify-content: flex-end;
    }
</style>


