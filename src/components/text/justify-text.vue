<template>
    <div class="justify">
        <text v-for="text in textList"
              :style="textStyle"
              :value="text"
        ></text>
    </div>

</template>

<script>
    export default {
        name: "justify-text",
        props:{
            value:{
                default:""
            },
            textStyle:{
                default:{
                    fontSize:32,
                    color:"#030303"
                }
            }
        },
        data(){

            return {
                textList:this.value.split("")
            }
        }
    }
</script>

<style scoped>
    .justify{
        justify-content: space-between;
        flex-direction: row;
    }
</style>
