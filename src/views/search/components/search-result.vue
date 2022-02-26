<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="加载失败,请点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from "@/api/search";
export default {
  name: "SearchResult",
  props: {
    searchText: {
      type: String,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页码
      per_page: 20, // 每页数量
      error: false
    };
  },
  methods: {
    async onLoad() {
      try {
        // 请求数据
        const { data } = await getSearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText,
        });
        // console.log(data);
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsawwww')
        // }
        const { results } = data.data;
        // 将数据加入到列表当中
        this.list.push(...results);
        // 此次请求完成,更改请求状态
        this.loading = false;
        // 判断数据是否加载完毕
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true
        this.loading = false
        this.$toast("获取数据失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
