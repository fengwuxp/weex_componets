<!--单选按钮-->
<template>
    <div :style="radioStyle" @click="clickRadio">
        <image v-if="selected" :style="radioSelectedStyle" :src="radioSelectedIcon"></image>
    </div>
</template>

<script>

    export default {
        name: "radio-button",
        props: {
            defaultSelected: {
                default: false
            },
            radioSelectedIcon: {
                default: ""
            },
            radioStyle: {
                default: {
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#c9c9c9",
                    borderRadius: "51px",
                    width: "51px",
                    height: "51px"
                }
            },
            radioSelectedStyle: {
                default: {
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                    backgroundColor: "#2eaf07"
                }
            },
            value: {
                default: ""
            }
        },
        data() {
            return {
                selected: false
            };
        },
        methods: {
            clickRadio() {
                this.selectedRadio(!this.selected)
            },
            selectedRadio(selected, useCallback = true) {
                if (this.selected === selected) {
                    return;
                }
                this.selected = selected;
                if (useCallback) {
                    this.$emit("change", {
                        selected: this.selected,
                        value: this.value
                    });
                }
            }
        },
        beforeMount() {
            if(this.defaultSelected){
                this.selectedRadio(this.defaultSelected);
            }
        }
    }
</script>

<style scoped>

</style>