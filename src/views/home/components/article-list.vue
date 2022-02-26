<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem v-for="(article, index) in list" :key="index" :article=article></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article.js";
import ArticleItem from '@/components/article-item'
export default {
  components: {
    ArticleItem
  },
  name: "ArticleList",
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 存放数据的容器
      loading: false, // 数据加载的状态
      finished: false, // 数据加载完成的状态
      timestamp: null, // 当前时间戳
      error: false, // 错误的状态
      isRefreshLoading: false, // 下拉刷新的状态
      refreshText: "刷新成功", // 下拉刷新的提示文本
    };
  },
  methods: {
    // 拉到底部，加载更多
    async onLoad() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
        });
        // console.log(data);
        // 模拟发生错误
        // if (Math.random() > 0.5) {
        //   JSON.parse("dddsfsdfsfsdfs");
        // }
        const { results } = data.data;
        this.list.push(...results);
        // 此次获取数据结束
        this.loading = false;
        // 判断获取的数据的长度，如果还有长度，那么就更改时间戳，如果没有长度，那么就结束
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        });
        // 模拟发生错误
        // if (Math.random() > 0.5) {
        //   JSON.parse("dddsfsdfsfsdfs");
        // }
        const { results } = data.data;
        this.list.unshift(...results);
        this.isRefreshLoading = false;
        this.refreshText = `刷新成功，更新了${results.length}条数据`;
      } catch (err) {
        this.refreshText = "刷新失败";
        this.isRefreshLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
