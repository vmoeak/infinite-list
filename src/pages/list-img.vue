<template>
    <div class='swipe-img'>
        <swipe  @transtionend="getNum" v-if="list.length > 0">
            <slide v-for="(item, index) in list" :key="index">
                <img :src="item.img" />
            </slide>
        </swipe>
    </div>
</template>

<script>
import Swipe from "@/components/NewSwipe";
import Slide from "@/components/Slide";

export default {
    name: "ListImg",
    components: {
        swipe: Swipe,
        slide: Slide,
    },
    data() {
        return {
            list: [
                {
                    img:
                        "https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360",
                },
                {
                    img:
                        "https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360",
                },
                {
                    img:
                        "https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360",
                },
                {
                    img: "https://i.ibb.co/ChbqB4w/3.jpg",
                },
            ],
        };
    },
    methods: {
        getNum(i) {
            console.log("当前滑到了第", i, "个");
        },
    },
};
</script>

<style scoped>
.swipe-img {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
}
</style>
