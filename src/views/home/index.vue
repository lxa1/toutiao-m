<template>
  <div class="home-container">
    <!-- 搜索导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <template v-slot:title>
        <van-button
          class="search-btn"
          type="info"
          size="small"
          round
          icon="search"
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 标签导航 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab
        :title="channel.name"
        v-for="channel in channelList"
        :key="channel.id"
      >
        <article-list :channel="channel" />
      </van-tab>
      <!-- 汉堡包弹出层按钮 -->
      <template v-slot:nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="isChannelEditShow = true">
          <i class="iconfont icon-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- 标签导航修改弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <!-- 频道列表组件 -->
      <channel-edit
        :myChannels="channelList"
        :active="active"
        @update-active="onUpdateActive"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user.js";
import ArticleList from "./components/article-list.vue";
import ChannelEdit from "./components/channel-edit.vue";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage.js";
export default {
  name: "HomeIndex",
  data() {
    return {
      active: 0,
      channelList: [],
      isChannelEditShow: false,
    };
  },
  created() {
    this.loadChannel();
  },
  methods: {
    // 请求用户频道
    async loadChannel() {
      try {
        if (this.user) {
          // 已登录，从服务器获取数据
          const { data } = await getUserChannels();
          // console.log(data);
          this.channelList = data.data.channels;
        } else {
          // 未登录，获取本地数据
          const localChannel = getItem("channels");
          if (localChannel) { // 如果本地数据存在，就用本地数据
            this.channelList = localChannel;
          } else { // 如果本地数据不存在，那么就发请求使用默认数据
            const { data } = await getUserChannels();
            // console.log(data);
            this.channelList = data.data.channels;
          }
        }
      } catch (err) {
        this.$toast("请求数据失败");
      }
    },
    // 修改active的值
    onUpdateActive(index, isOpen) {
      this.active = index;
      this.isChannelEditShow = isOpen;
    },
  },
  components: {
    ArticleList,
    ChannelEdit,
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang='less' scoped>
.home-container {
  padding-bottom: 100px;
  padding-top: 174px;
  .page-nav-bar {
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      .van-icon {
        font-size: 32px;
      }
      .van-button__text {
        font-size: 28px;
      }
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      .van-tabs__line {
        width: 31px;
        height: 6px;
        background-color: #3296fa;
        bottom: 39px;
      }
      .van-tab {
        border-right: 1px solid #edeff3;
        min-width: 200px;
        font-size: 30px;
        color: #777777;
      }
      .van-tab--active {
        color: #333333;
      }
      .hamburger-btn {
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 66px;
        height: 82px;
        background-color: #fff;
        opacity: 0.902;
        .iconfont {
          font-size: 33px;
        }
        &:before {
          content: "";
          position: absolute;
          left: 0;
          width: 1px;
          height: 100%;
          background-image: url("~@/assets/gradient-gray-line.png");
          background-size: contain;
        }
      }
      .placeholder {
        flex-shrink: 0;
        width: 66px;
        height: 82px;
      }
    }
  }
}
</style>
