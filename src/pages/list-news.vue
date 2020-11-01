<template>
  <div>
    <!--标题-->
    <!-- <p class="header">
      <router-link class="btn-left" to="/">返回</router-link>
      <span>list</span>
    </p>-->
    <!--滑动区域-->
    <!-- <list v-model="loading" :list="list" :finished="finished" @load="onLoad" /> -->
    <swipe ref="swiper" @transtionend="getNum" v-if="list.length>0">
      <slide v-for="(item,index) in list" :key="index">
        <img :src="item.img" />
      </slide>
    </swipe>
  </div>
</template>

<script>
// import List from "@/components/List";
import Swipe from "@/components/Swipe";
import Slide from "@/components/Slide";

export default {
  name: "ListNews",
  components: {
    // list: List,
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
          img: "../../public/images/1.png",
        },
      ],
      //   loading: false,
      //   finished: false,
    };
  },
  methods: {
    getNum(i) {
      this.$toast(`==当前滑到了第${i}个`, 400);
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
        };
    },
    methods: {
        onLoad() {
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push({title: '【标题】', content: '内容内容内容内容内容内容内容内容内容内容'});
                }
                this.loading = false;
                if (this.list.length >= 40) {
                    this.finished = true;
                }
            }, 1000);
        }
    }
};
</script>

<style scoped>
.header {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-bottom: 1px solid #eee;
}

.header .btn-left {
  position: absolute;
  top: 0;
  left: 0;
  padding: 12px;
  line-height: 22px;
  text-decoration: none;
}
</style>
