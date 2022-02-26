<template>
  <div class="user-profile">
    <!-- 顶部导航 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 顶部导航 -->
    <!-- 个人信息 -->
    <input type="file" ref="file" hidden @change="onPhotoChange" />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <template v-slot:default>
        <van-image :src="user.photo" fit="cover" round class="avatar" />
      </template>
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirShow = true"
    ></van-cell>
    <!-- 个人信息 -->
    <!-- 修改昵称弹窗 -->
    <van-popup
      :style="{ height: '100%' }"
      v-model="isUpdateNameShow"
      position="bottom"
      class="van-popup"
    >
      <update-name
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      ></update-name>
    </van-popup>
    <!-- 修改昵称弹窗 -->
    <!-- 修改性别弹窗 -->
    <van-popup
      :style="{ height: '50%' }"
      v-model="isUpdateGenderShow"
      position="bottom"
    >
      <update-gender
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
        v-model="user.gender"
      ></update-gender>
    </van-popup>
    <!-- 修改性别弹窗 -->
    <!-- 修改生日弹窗 -->
    <van-popup
      :style="{ height: '50%' }"
      v-model="isUpdateBirShow"
      position="bottom"
    >
      <update-bir
        v-if="isUpdateBirShow"
        @close="isUpdateBirShow = false"
        v-model="user.birthday"
      ></update-bir>
    </van-popup>
    <!-- 修改生日弹窗 -->
    <!-- 修改头像弹窗 -->
    <van-popup
      :style="{ height: '100%' }"
      v-model="isUpdatePhotoShow"
      position="bottom"
    >
      <update-photo
        v-if="isUpdatePhotoShow"
        @close="isUpdatePhotoShow = false"
        :img="img"
        @updateImg="user.photo = $event"
      ></update-photo>
    </van-popup>
    <!-- 修改头像弹窗 -->
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import UpdateName from "./components/update-name";
import UpdateGender from "./components/update-gender";
import UpdateBir from "./components/update-bir.vue";
import UpdatePhoto from "./components/update-photo.vue";
export default {
  name: "UserProfile",
  components: {
    UpdateName,
    UpdateGender,
    UpdateBir,
    UpdatePhoto,
  },
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirShow: false,
      isUpdatePhotoShow: false,
      img: "",
    };
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile();
        // console.log(data);
        this.user = data.data;
      } catch (err) {
        this.$toast("请求数据失败，请稍后再试");
      }
    },
    onPhotoChange() {
      this.isUpdatePhotoShow = true;
      const file = this.$refs.file.files[0];
      this.img = window.URL.createObjectURL(file);
      this.$refs.file.value = "";
    },
  },
  created() {
    this.loadUserProfile();
  },
};
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
