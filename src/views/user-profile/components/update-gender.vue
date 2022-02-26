<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      :default-index="value"
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";
export default {
  name: "UpdateGender",
  data() {
    return {
      columns: ["男", "女"],
    };
  },
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    async onConfirm(value, index) {
      try {
        this.$toast.loading({
          message: "提交中",
          forbidClick: true,
          duration: 0,
        });
        await editUserProfile({
          gender: index,
        });
        // console.log(data);
        this.$emit("input", index);
        this.$toast.success("修改成功");
        this.$emit("close");
      } catch (err) {
        this.$toast("修改失败，请稍后重试");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.update-gender {
  @picker-confirm-action-color: rgb(19, 19, 235);
  @picker-cancel-action-color: rgb(27, 27, 250);
}
</style>
