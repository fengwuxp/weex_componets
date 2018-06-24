<template>

</template>
<script>
    export default {
        name: "axis",
        props:{
            label:{
                default:{}
            },
            name:{
                default:{}
            }
        },
        data(){
            return{};
        },
        methods:{
            draw (chart, props)  {
                const {name = '', label = {
                    fontSize: 14
                }, grid} = props;

                chart.axis(name, {
                    label: label,
                    grid
                });
            }
        }
    }
</script>

<style scoped>

</style>
