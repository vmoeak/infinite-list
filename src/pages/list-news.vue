<template>
    <div>
        <!--标题-->
        <p class="header">
            <router-link class="btn-left" to="/">
                返回
            </router-link>
            <span>list</span>
        </p>
        <!--滑动区域-->
        <list v-model="loading" :list="list" :finished="finished" @load="onLoad" />
    </div>
</template>

<script>
import List from '@/components/List';

export default {
    name: 'ListNews',
    components: {
        list: List,
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
            this.loading = true;
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
