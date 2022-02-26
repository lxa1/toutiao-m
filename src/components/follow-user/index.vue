<template>
  <van-button
    class="follow-btn"
    round
    size="small"
    v-if="is_followed"
    @click="onFollow"
    :loading="loading"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="loading"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";
export default {
  model: {
    prop: "is_followed",
    event: "update-follow"
  },
  name: 'FollowUser',
  data() {
    return {
      loading: false
    }
  },
  props: {
    is_followed: {
      type: Boolean,
      required: true,
    },
    user_id: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onFollow() {
      this.loading = true; // 开启加载
      try {
        if (this.is_followed === true) {
          await deleteFollow(this.user_id);
        } else {
          await addFollow(this.user_id);
        }
        this.$emit('update-follow', !this.is_followed)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.loading = false;
          return this.$toast("不能关注自己");
        }
        this.$toast("操作失败，请稍后再试");
      }
      this.loading = false; // 关闭加载状态
    },
  },
};
</script>
<style lang="less" scoped>
</style>
