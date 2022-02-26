<template>
  <div class="update-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onUpdateName"
    />
    <!-- 输入框 -->
    <div class="field">
      <van-field
        v-model.trim="name"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";
export default {
  name: "UpdateName",
  data() {
    return {
      name: this.value,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onUpdateName() {
      try {
        this.$toast.loading({
          message: "提交中",
          forbidClick: true,
          duration: 0,
        });
        if (this.name.length === 0) {
          this.$toast("昵称不能为空");
          return;
        }
        await editUserProfile({
          name: this.name,
        });
        // console.log(data);
        this.$emit("input", this.name);
        this.$toast.success("修改成功");
        this.$emit("close");
      } catch (err) {
        this.$toast("修改失败，请稍后再试");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.update-name {
  .field {
    padding: 15px;
  }
}
</style>
