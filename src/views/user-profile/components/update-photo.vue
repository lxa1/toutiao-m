<template>
  <div class="update-photo">
    <img :src="img" alt="" class="photo" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onUpdatePhoto">完成</div>
    </div>
  </div>
</template>

<script>
import { editUserPhoto } from "@/api/user";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  name: "UpdatePhoto",
  data() {
    return {
      cropper: "",
    };
  },
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },
  methods: {
    onUpdatePhoto() {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        this.onUpdateImg(blob);
      });
    },
    async onUpdateImg(blob) {
      try {
        this.$toast.loading({
          message: "提交中",
          forbidClick: true,
          duration: 0,
        });
        const formData = new FormData();
        formData.append("photo", blob);
        const { data } = await editUserPhoto(formData);
        console.log(data);
        this.$emit("updateImg", data.data.photo);
        this.$toast.success("修改头像成功");
        this.$emit("close");
      } catch (err) {
        this.$toast("修改头像失败，请稍后再试");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .photo {
    max-width: 100%;
  }
  .toolbar {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      color: #fff;
    }
  }
}
</style>
