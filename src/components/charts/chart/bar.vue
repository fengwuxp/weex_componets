<template>

</template>

<script>
    export default {
        name: "bar",
        methods: {
            draw(chart, props) {
                const {position, color, setColorCallback, shape, style} = props;

                let bar = chart.interval();

                color && bar.color(color, setColorCallback);
                position && bar.position(position);
            }
        }
    }
</script>

<style scoped>

</style>
