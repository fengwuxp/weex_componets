<!--fade in 视图 配和 FadeIn mixins使用 ，用以解决weex视图渲染时出现抖动的情况-->
<template>
    <div :style="viewStyle">
        <slot></slot>
    </div>
</template>
<script>
    import fadeIn from '../mixins/FadeIn';
    export default {
        mixins: [fadeIn]
    }
</script>
