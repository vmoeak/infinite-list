<template>
  <div ref="infiniteScrollList" class="scroll-list" @scroll="onScroll">
    <ul class="news-list">
      <li v-for="(news, index) in newArr" :key="index">
        <p class="new-title">{{news.title}}</p>
        <p class="new-content">{{news.content}}</p>
      </li>
    </ul>
    <div class="scroll-upwarp">
      <div v-if="finished" class="upwarp-tip">{{completedText}}</div>
      <div v-if="onLoading" class="scroll-loading">
        <div class="upwarp-progress scroll-rotate"></div>
        <div class="upwarp-tip">{{loadingText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'InfiniteList',
    model: {
        prop: 'onLoading',
        event: 'change'
    },
    finished: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Number,
      default: 0,
    },
    mounted() {
        this.scrollList = this.$refs.infiniteScrollList;
        this.getData = this.throttle(() => {
            this.$emit('change', true);
            this.$emit('load');
        }, 1000);
        this.getData();
    },
    // 防抖
    debounce(fn, wait) {
      let timer = null;
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fn.apply(this, arguments);
        }, wait);
      };
    },
    // 节流
    throttle(fn, gapTime) {
      let lastTime = null;
      let nowTime = null;
      return () => {
        nowTime = Date.now();
        if (!lastTime || nowTime - lastTime > gapTime) {
          fn.apply(this, arguments);
          lastTime = nowTime;
        }
      };
    },
  },
};
</script>

<style scoped>
.scroll-list {
  width: 100%;
  overflow-y: auto;
  position: fixed;
  top: 44px;
  bottom: 0;
}

.news-list {
  margin: 0;
  padding: 0;
}

.news-list li {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.news-list .new-content {
  font-size: 14px;
  margin-top: 10px;
  color: #666;
}

.scroll-upwarp {
  min-height: 30px;
  padding: 25px 0 0 10px;
  display: flex;
  justify-content: center;
}

.scroll-loading {
  display: flex;
  justify-content: center;
}

/* 上拉加载--提示文本 */
.scroll-upwarp .upwarp-tip {
  margin-left: 8px;
  font-size: 12px;
  color: #808080;
}

/* 上拉加载--旋转进度条 */
.scroll-upwarp .upwarp-progress {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #808080;
  border-bottom-color: transparent;
}

/* 旋转动画 */
.scroll-rotate {
  animation: rotate 0.6s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
