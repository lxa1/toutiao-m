<template>
  <van-icon
    :color="value === 1 ? '#ffa500' : '#777'"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
    :loading="loading"
  />
</template>

<script>
import { addLike, deleteLike } from "@/api/article";
export default {
  name: "LikeArticle",
  props: {
    value: {
      type: Number,
      required: true,
    },
    user_id: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onLike() {
      this.loading = true;
      let state = -1
      try {
        if (this.value === -1) {
          // 未点赞，点击点赞
          await addLike(this.user_id)
          state = 1
        } else {
          // 已点赞，点击取消点赞
          await deleteLike(this.user_id)
        }
        this.$emit('input', state)
        this.$toast.success(state === 1 ? '点赞成功' : '取消点赞成功')
      } catch (err) {
        this.$toast("点赞失败");
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
