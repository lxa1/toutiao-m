<template>
  <div class="search-history">
    <van-cell title="搜索历史" value="内容">
      <template v-if="isDeleteShow">
        <span @click="$emit('clearHistory')">全部删除</span>&nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </template>
      <template v-else>
        <van-icon name="delete-o" @click="isDeleteShow = true"/>
      </template>
    </van-cell>
    <van-cell
      :title="value"
      v-for="(value, index) in searchHistories"
      :key="index"
      @click="onHistoryClick(value)"
    >
      <template>
        <van-icon name="close" v-if="isDeleteShow" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    searchHistories: {
      type: Array,
    },
  },
  data() {
    return {
      isDeleteShow: false,
    };
  },
  methods: {
    onHistoryClick(val) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(val, 1)
      } else {
        this.$emit('hisSearch', val)
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
