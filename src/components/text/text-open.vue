<!--可以收起 展开的文本-->
<template>
    <div>
        <text class="text_content"
              :lines="textLines"
              :style="style"
              :value="text"></text>
        <div class="flex_v_end margin_top_15" v-if="show">
            <text :style="openStyle"
                  @click="changeTextShow"
                  :value="openText"></text>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            text: {default: ""},
            lines: {default: 4},
            style: {
                default: {
                    color: "#303030",
                    lineHeight: "46px",
                    fontSize: "28px",
                    textOverflow: "ellipsis",
                    lines: 4
                }
            },
            openStyle: {
                default: {
                    color: "#303030",
                    fontSize: "28px",
                }
            },
            textWidth: {default: 710},
            openText: {default: "展开 ▼"}
        },
        data() {
            return {
                textLines: 4,
                show: false
            }
        },
        methods: {
            changeTextShow() {
                console.log(this.textLines);
                if (this.textLines > 0) {
                    this.textLines = 0;
                    this.openText = "收起 ▲";

                    this.style.textOverflow = "";
                    this.style.lines = this.textLines;
                } else {
                    this.textLines = this.lines;
                    this.openText = "展开 ▼";

                    this.style.textOverflow = "ellipsis";
                    this.style.lines = this.textLines;
                }
            },
        },
        beforeMount() {
            //粗略计算文本行数
            let length = this.text.length;
            let fontSize = parseInt(this.style.fontSize.replace("px", ""));
            if (length > this.textWidth / fontSize * this.lines) {
                this.show = true;
            }
            console.log(" this.show-> "+ this.show);

            this.textLines = this.lines;
            this.style.lines = this.lines;
        }
    }
</script>
<style scoped>
    .flex_v_end {
        align-items: flex-end;
    }

    .margin_top_15 {
        margin-top: 15px;
    }
</style>
