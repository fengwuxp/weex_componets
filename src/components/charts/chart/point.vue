<template>

</template>

<script>
    export default {
        name: "point",
        methods: {
            draw(chart, props) {
                const {position} = props;

                chart.point().position(position);
            }
        }
    }
</script>

<style scoped>

</style>
