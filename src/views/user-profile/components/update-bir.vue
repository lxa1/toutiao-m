<template>
  <div class="update-bir">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onUpdateBir"
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";
import dayjs from "dayjs";
export default {
  name: "UpdateBir",
  data() {
    return {
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onUpdateBir() {
      const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
      try {
        this.$toast.loading({
          message: "提交中",
          forbidClick: true,
          duration: 0,
        });
        await editUserProfile({
          birthday: currentDate,
        });
        // console.log(data);
        this.$emit("input", currentDate);
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
</style>
