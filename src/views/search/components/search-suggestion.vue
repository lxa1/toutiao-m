<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(value, index) in suggestions"
      :key="index"
      @click="$emit('search', value)"
    >
      <template v-slot:title>
        <div v-html="heightLight(value)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      suggestions: [],
    };
  },
  props: {
    searchText: {
      type: String,
    },
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value);
      }, 500),
      immediate: true,
    },
  },
  methods: {
    // 搜索建议的请求
    async loadSearchSuggestions(value) {
      try {
        const { data } = await getSearchSuggestions(value);
        // console.log(data);
        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast("获取数据失败");
      }
    },
    // 搜索高亮
    heightLight(value) {
      if (value) {
        const reg = new RegExp(this.searchText, "gi");
        return value.replace(
          reg,
          `<span class="active">${this.searchText}</span>`
        );
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/span.active {
    color: #3296fa;
  }
}
</style>
