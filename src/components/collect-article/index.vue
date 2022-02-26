<template>
  <van-icon
    :color="value ? '#ffa500' : '#777'"
    :name="value ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { addCollect, deleteCollect } from "@/api/article";
export default {
  name: "CollectArticle",
  data() {
    return {
      loading: false,
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    user_id: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          await deleteCollect(this.user_id)
        } else {
          await addCollect(this.user_id)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏成功')
      } catch (err) {
        this.$toast('收藏失败，请稍后再试')
      }
      this.loading = false
    },
  },
};
</script>

<style lang="less" scoped>
</style>
