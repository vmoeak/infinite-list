
<template>
    <div class="swipe_slide">
        <slot />
    </div>
</template>
<script>
export default {
    methods: {
    },
};
</script>
<style>
.swipe_slide {
    width: 100%;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    z-index: 10;
    min-height: 100px;
}
.swipe_slide img {
    display: block;
    width: 400px;
}
</style>