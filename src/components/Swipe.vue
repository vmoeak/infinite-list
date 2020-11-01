<template>
    <div class="swipe" @touchstart="onTouchStart"  @touchend="onTouchEnd">
        <transition-group name="list" tag="div" class="swipe-group">
            <div class='swipe-item'
                 ref="listItem"
                 v-for="(item, index) in list"
                 :key="index"
                 v-show="n === index"
                 :style="{ width: width + 'px', height: height + 'px'}"
                 :class="{reverse: reverse}"
            >
                {{index + 1}}
                <img :src="item">
            </div>
        </transition-group>
        <div class="indicator-container" v-show="showIndicators">
            <div class="indicator"
                v-for="(item, index) in list"
                :key='index'
                :class="{'indicator-active': n===index}">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Swipe',
    props: {
        list: {
            type: Array,
            default() {
                return ['../../imgs/logo.png', '../../imgs/2.jpeg', '../../imgs/3.jpeg', '../../imgs/4.jpeg'];
            },
        },
        autoplay: {
            type: Number,
            default: 3000
        },
        duration: {
            type: Number,
            default: 4000
        },
        initialSwipe: {
            type: Number,
            default: 0
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        loop: {
            type: Boolean,
            default: true
        },
        showIndicators: {
            type: Boolean,
            default: true
        },
        stopPropagation: {
            type: Boolean,
            default: false
        },
        lazyRender: {
            type: Boolean,
            default: false
        },
        indicatorColor: {
            type: String,
            default: '#1989fa'
        }
    },
    data() {
        return {
            n: this.initialSwipe,
            timer: null,
            startTouch: null,
            reverse: false
        };
    },
    watch: {
        loop(val) {
            if (val) {
                this.stop();
                this.go(this.autoplay);
            }
            else {
                this.stop();
            }
        },
        initialSwipe(val) {
            this.n = val;
        }
    },
    mounted() {
        if (this.loop) {
            this.go(this.autoplay);
        }
    },
    methods: {
        changeIndex() {
            this.n++;
            if (this.n > this.list.length - 1) {
                this.n = 0;
            }
        },
        stop() {
            clearInterval(this.timer);
            this.timer = null;
        },
        go(autoplay) {
            this.timer = setInterval(() => {
                this.changeIndex();
            }, autoplay);
        },
        onTouchStart(e) {
            this.stop();
            console.log('touch.......')
            console.log(e);
            if (e.touches.length > 1) {
                return;
            }
            console.log('after if')
            this.startTouch = e.touches[0];
            // e.cancelBubble = true;
        },
        // onTouchMove(e) {
        //     if (e.touches.length > 1) {
        //         return;
        //     }
        //     let startX = this.startTouch.clientX;
        //     let deltaX = e.touches[0].clientX - startX;
        //     console.log(deltaX, 'deltax999999999999');
        //     this.$refs.listItem[this.n].style.transform = `translateX(${deltaX}px)`
        //     if (deltaX > 0) {
        //         console.log('enter --n 99999')
        //         this.$refs.listItem[this.n - 1].style.display = 'block';
        //         this.$refs.listItem[this.n - 1].style.position = 'absolute';
        //     }
        //     else {
        //         console.log('enter ++n 99999')
        //         this.$refs.listItem[this.n + 1].style.display = 'block';
        //         this.$refs.listItem[this.n + 1].style.position = 'absolute';
        //     }
        //     // this.$refs.listItem[this.n - 1].style.display = 'block';
        //     // this.$refs.listItem[this.n - 1].style.position = 'absolute';
        //     // this.$refs.listItem[this.n + 1].style.display = 'block';
        // },
        onTouchEnd(e) {
            console.log('onTouchEnd')
            let endTouch = e.changedTouches[0];
            let {clientX: x1, clientY: y1} = this.startTouch;
            let {clientX: x2, clientY: y2} = endTouch;
            let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            let deltaY = Math.abs(y2 - y1);
            let rate = distance / deltaY;
            if (rate > 2) {
                if (x2 > x1) {
                    this.n--;
                    if (this.n < 0) {
                        this.n = this.list.length - 1;
                    }
                    this.reverse = true;
                }
                else {
                    this.n++;
                    if (this.n > this.list.length - 1) {
                        this.n = 0;
                    }
                    this.reverse = false;
                }
            }
            this.$nextTick(() => {
                // this.go(this.autoplay);
            });
        }
    },
};
</script>

<style scoped>
.swipe {
    cursor: grab;
    position: relative;
    width: 400px;
    height: 400px;
    overflow: hidden;
}

.swipe-group {
    width: 100%;
    height: 100%;
}

.swipe-group .swipe-item {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #66c6f2;
    color: pink;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
}

.swipe-group .swipe-item:nth-child(even) {
    background-color: black;
}

.swipe-item img {
    width: 100%;
}

.indicator {
    width: 6px;
    height: 6px;
    background-color: #ebedf0;
    border-radius: 100%;
    margin-right: 6px;
}

.indicator-active {
    background-color: pink;
}

.indicator-container {
    display: flex;
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
}

/* .list-enter-to {
    transition: all 1s ease;
    transform: translateX(0);
}

.list-leave-active {
    transition: all 1s ease;
    transform: translateX(-100%);
}

.list-enter {
    transform: translateX(100%);
}

.list-leave {
    transform: translateX(0);
} */
.list-enter-active, .list-leave-active {
    transition: all 0.5s;
}

.list-enter {
    transform: translateX(100%);
}

.list-enter.reverse {
    transform: translateX(-100%);
}

.list-leave-to {
    transform: translateX(-100%);
}

.list-leave-to.reverse {
    transform: translateX(100%);
}
</style>

