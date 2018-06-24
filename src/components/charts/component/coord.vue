<template>

</template>

<script>
    export default {
        name: "coord",
        methods: {
            draw(chart, props) {
                const {type = 'rect', transposed, inner} = props;

                chart.coord(type, {
                    transposed,
                    inner
                });
            }
        }
    }
</script>

<style scoped>

</style>
