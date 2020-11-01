<template>
    <div class="swipe_content" @touchmove="fn" :style="{ width: width + 'px', height: height + 'px'}">
        <div
            ref="swiper"
            class="swipe_item"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
        >
            <slot />
        </div>

        <div v-if="showIndicator" class="swipe_indicator">
            <div
                v-for="(tag, $index) in slidesLength"
                :class="{ swipe_show_bgcolor: index - 1 === $index }"
                :style="{background: indicatorColor}"
                class="swipe_indicator_item"
                :key="$index"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            slidesLength: 1,
            widthDom: 0,
            auto: true,
            slideing: true,
            timer: null,
            dom: {},
            startTouch: 0,
            distanceX: 0,
            translateX: 0,
            index: this.initialSwipe,
            interval: null
        };
    },
    props: {
        // 自动轮播间隔
        autoPlay: {
            type: Number,
            default: 2500,
        },
        // 一次滑动需要走多久
        duration: {
            default: 500,
        },
        //初始位置索引
        initialSwipe: {
            type: Number,
            default: 2
        },
        width: {
            type: Number,
            default: 400,
        },
        height: {
            type: Number,
            default: 400
        },
        loop: {
            type: Boolean,
            default: false
        },
        showIndicator: {
            type: Boolean,
            default: true,
        },
        stopPropagation: {
            type: Boolean,
            default: true
        },
        indicatorColor: {
            type: String,
            default: '#1989fa'
        }
    },
    mounted() {
        setTimeout(() => {
            // 复制第一个和最后一个dom
            this.cloneDom();
            this.dom.transform = `translate3d(${
                this.widthDom * -this.index
            }px, 0px, 0px)`;
            if (this.loop) {
                this.setTime();
            }
            else {
                this.loopOnce();
            }
        }, 50);
    },
    methods: {
        onTouchStart(e) {
            if (this.slideing) {
                this.clearTimeOut();
                clearInterval(this.interval);
                this.translateX = this.getTranslateX();
                this.startTouch = e.touches[e.touches.length - 1].clientX;
            }
        },
        onTouchMove(e) {
            if (this.slideing && this.startTouch != -1) {
                // this.clearTimeOut();
                this.distanceX =
                    e.touches[e.touches.length - 1].clientX - this.startTouch;
                this.setTranslateX(this.distanceX + this.translateX);
            }
        },
        onTouchEnd() {
            if (this.slideing && this.startTouch != -1) {
                // this.clearTimeOut();
                this.index -= Math.round(this.distanceX / this.widthDom);
                this.swipe("touch");
            }
        },
        setTranslateX(num) {
            this.dom.transform = `translate3d(${num}px, 0px, 0px)`;
        },
        getTranslateX() {
            let strTransform = this.dom.transform;
            strTransform = strTransform.substring(12);
            let translateX = strTransform.match(/(\S*)px/)[1];
            console.log(translateX, "匹配后的x  9999999");
            return Number(translateX);
        },
        fn(e) {
            if (this.stopPropagation) {
                e.cancelBubble = true;
            }
        },
        swipe(type) {
            this.slideing = false;
            this.dom.transition = type == "touch" ? "10ms" : this.duration + "ms";
            this.setTranslateX(this.index * -1 * this.widthDom);
            this.distanceX = 0;
            this.startTouch = -1;
            if (this.loop) {
                this.setTime();
            }
            this.swiperDom.ontransitionend = () => {
                console.log('Transition ended');
                this.dom.transition = "0s";
                if (this.index >= this.slidesLength + 1) {
                    this.index = 1;
                    this.setTranslateX(this.index * -1 * this.widthDom);
                }
                if (this.index <= 0) {
                    this.index = this.slidesLength;
                    this.setTranslateX(this.index * -1 * this.widthDom);
                }
                this.$emit("transtionend", this.index - 1);
                this.auto = true;
                this.slideing = true;
            };
        },
        setTime() {
            this.timer = setTimeout(() => {
                if (this.auto) {
                    this.index++;
                    this.swipe();
                } else {
                    clearTimeout(this.timer);
                }
            }, this.autoPlay);
        },
        cloneDom() {
            let SlideDom = this.$refs.swiper.getElementsByClassName(
                "swipe_slide"
            );
            this.slidesLength = SlideDom.length;
            if (this.slidesLength > 1) {
                // 复制第一个元素
                let cloneDomFirst = SlideDom[0].cloneNode(true);
                // 复制最后一个元素
                let cloneDomEnd = SlideDom[this.slidesLength - 1].cloneNode(
                    true
                );
                this.$refs.swiper.insertBefore(cloneDomEnd, SlideDom[0]);
                this.$refs.swiper.appendChild(cloneDomFirst);
                this.widthDom = this.$refs.swiper.offsetWidth;
                this.dom = this.$refs.swiper.style;
                this.swiperDom = this.$refs.swiper;
            }
        },
        clearTimeOut() {
            this.auto = false;
            clearTimeout(this.timer);
            this.timer = null;
        },
        loopOnce () {
            let runTime = 0;
            this.interval = setInterval(() => {
                this.index++;
                this.swipe();
                runTime++;
                if (runTime === this.slidesLength) {
                    clearInterval(this.interval);
                }
            }, this.autoPlay)
        }
    },
};
</script>

<style>
.swipe_content {
    position: relative;
    z-index: 1;
    overflow: hidden;
    border: 1px solid red;
}
.swipe_item {
    width: 100%;
    display: flex;
    transition-duration: 0s linear;
}
.swipe_indicator {
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
    background: 0 0;
}
.swipe_indicator_item {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 1px 7px;
    cursor: pointer;
    border-radius: 100%;
    background: #aaa;
}
.swipe_show_bgcolor {
    background: #0fc37c !important;
}
</style>