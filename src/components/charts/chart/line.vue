<template>

</template>

<script>
    export default {
        name: "line",
        props:{
            position:{
                default:""
            },
            inner:{
                default:""
            },
            shape:{
                default:""
            }
        },
        data(){
            return{};
        },
        methods: {
            draw(chart, props) {
                const {position, color, setColorCallback, shape, size} = props;

                let line = chart.line();

                console.log("--------position--------",position);
                console.log("--------color--------",color);
                console.log("--------shape--------",shape);
                console.log("--------size--------",size);
                position && line.position(position);
                color && line.color(color);
                size && line.size(size);
                shape && line.shape(shape);
            }
        }
    }
</script>

<style scoped>

</style>
