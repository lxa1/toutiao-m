<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell>
      <template v-slot:title><div class="title-text">我的频道</div></template>
      <template>
        <van-button
          type="danger"
          plain
          round
          size="mini"
          class="edit-btn"
          @click="isEdit = !isEdit"
        >
          {{ isEdit ? "完成" : "编辑" }}
        </van-button>
      </template>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="index"
        class="gild-item my-gild"
        @click="onMyChannelClick(channel, index)"
      >
        <!-- 频道文字 -->
        <template v-slot:text>
          <div class="text" :class="{ active: index === active }">
            {{ channel.name }}
          </div>
        </template>
        <!-- 关闭按钮 -->
        <template v-slot:icon>
          <van-icon
            name="close"
            v-show="isEdit && !fixedChannels.includes(channel.id)"
          ></van-icon>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell>
      <template v-slot:title> <div class="title-text">频道推荐</div></template>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        icon="plus"
        class="gild-item recommend-gild"
        @click="onUserChannelClick(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  delUserChannel,
} from "@/api/channel.js";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage.js";
export default {
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fixedChannels: [0],
    };
  },
  name: "ChannelEdit",
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  components: {},
  methods: {
    // 加载全部频道
    async loadAllChannels() {
      try {
        const res = await getAllChannels();
        // console.log(res);
        this.allChannels = res.data.data.channels;
      } catch (err) {
        this.$toast("获取频道数据失败");
      }
    },
    // 点击添加频道到我的频道
    async onUserChannelClick(channel) {
      //   console.log(channel);
      this.myChannels.push(channel);
      if (this.user) {
        // 已登录,上传到服务器
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length,
          });
        } catch (err) {
          this.$toast("发生未知错误");
        }
      } else {
        // 未登录，存储到本地
        setItem("channels", this.myChannels);
      }
    },
    // 点击切换频道，或者删除频道
    onMyChannelClick(channel, index) {
      // 编辑状态
      if (this.isEdit) {
        // 如果是固定的频道，则不允许删除
        if (this.fixedChannels.includes(channel.id)) {
          return false;
        }
        // 删除频道
        this.myChannels.splice(index, 1);
        // 如果删除的频道在激活的频道前面，激活的active减一
        if (index <= this.active) {
          this.$emit("update-active", this.active - 1, true);
        }
        // 将删除后的数据存储
        this.deleteChannel(channel);
      } else {
        // 非编辑状态
        this.$emit("update-active", index, false);
      }
    },
    // 存储删除后的数据
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 已登录，存储到服务器
          await delUserChannel(channel.id)
        } else {
          // 未登录，存储到本地
          setItem("channels", this.myChannels);
        }
      } catch (err) {
        this.$toast("删除数据失败，请稍后再试");
      }
    },
  },
  created() {
    this.loadAllChannels();
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id;
        });
      });
    },
    ...mapState(["user"]),
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.gild-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      border-width: 0px;
      border-radius: 6px;
      white-space: nowrap;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222222;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: static;
      }
    }
  }
  /deep/.recommend-gild {
    .van-grid-item__content {
      flex-direction: row;
      white-space: nowrap;
      .van-icon-plus {
        font-size: 24px;
        margin-right: 5px;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
  /deep/ .my-gild {
    .van-icon-close {
      font-size: 8px;
      position: absolute;
      top: -10px;
      right: -10px;
      z-index: 2;
    }
    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
