<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/" class="search-form" >
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
        background="#3296fa"
      />
    </form>
    <!-- 搜索框 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText"/>
    <!-- 搜索结果 -->

    <!-- 搜索建议 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
     />
    <!-- 搜索建议 -->

    <!-- 搜索历史 -->
    <search-history v-else :searchHistories="searchHistories"
    @hisSearch="onSearch"
    @clearHistory="onClearHistory"/>
    <!-- 搜索历史 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: "SearchPage",
  data() {
    return {
      searchText: "", // 搜索的词
      isResultShow: false, // 搜索结果的展示状态
      searchHistories: getItem('search-histories') || []
    };
  },
  methods: {
    onSearch(val) {
      this.searchText = val
      // console.log(val);
      this.isResultShow = true
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
    },
    onCancel() {
      // console.log('cancel');
      this.$router.back()
    },
    onFocus() {
      this.isResultShow = false
    },
    onClearHistory() {
      this.searchHistories = []
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  watch: {
    searchHistories(val) {
      setItem('search-histories', val)
    }
  }
};
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color:#fff;
  }
  .search-form {
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
