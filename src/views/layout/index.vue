<template>
  <div class="layout-container">
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 路由出口 -->
    <van-tabbar v-model="active" class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <template v-slot:icon>
          <i class="iconfont icon-shouye"></i>
        </template>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/da">
        <template v-slot:icon>
          <i class="iconfont icon-wenda"></i>
        </template>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template v-slot:icon>
          <i class="iconfont icon-shipin"></i>
        </template>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template v-slot:icon>
          <i class="iconfont icon-wode"></i>
        </template>
        <span>{{ $store.state.user ? "我的" : "未登录" }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang='less' scoped>
.layout-tabbar {
  .iconfont {
    font-size: 40px;
  }
  span {
    font-size: 20px;
  }
}
</style>
