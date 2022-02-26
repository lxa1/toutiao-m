<template>
  <div class="my-container">
    <!-- 头部个人信息 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="text">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round class="right-btn" to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <!-- 关注\粉丝收藏个数等 -->
      <div class="data-stats">
        <div class="data-item">
          <div class="count">{{userInfo.art_count}}</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.follow_count}}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.fans_count}}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.like_count}}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>
    <!-- 头部登陆注册 -->
    <div class="header" v-else>
      <img
        src="@/assets/mobile.png"
        alt=""
        class="mobile-img"
        @click="$router.push('/login')"
      />
      <span class="text">登录 / 注册</span>
    </div>

    <!-- 收藏/历史导航 -->
    <van-grid class="gild-class" :column-num="2" clickable>
      <van-grid-item class="gild-item">
        <template v-slot:icon>
          <i class="iconfont icon-shoucang"></i>
        </template>
        <template v-slot:text>
          <span class="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="gild-item">
        <template v-slot:icon>
          <i class="iconfont icon-lishi"></i>
        </template>
        <template v-slot:text>
          <span class="text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 消息通知\小智同学 -->
    <div class="cell">
      <van-cell title="消息通知" is-link class="cell-item" center clickable />
      <van-cell title="小智同学" is-link class="cell-item" center clickable />
      <van-cell
        title="退出登录"
        class="logout-cell"
        center
        clickable
        v-if="user"
        @click="onLogout"
      ></van-cell>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user.js";
export default {
  name: "MyIndex",
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: "确定要退出吗?",
        })
        .then(() => {
          this.$store.commit("setUser", null);
        })
        .catch(() => {});
    },
    async loadUserInfo() {
      if (this.user) {
        try {
          const { data } = await getUserInfo();
          console.log(data);
          this.userInfo = data.data;
        } catch (err) {
          this.$toast("发生未知错误,请稍后再试");
        }
      }
    },
  },
  created() {
    this.loadUserInfo();
  },
};
</script>

<style lang='less' scoped>
.my-container {
  .header {
    display: flex;
    height: 366px;
    background-image: url("~@/assets/banner.png");
    background-size: cover;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
  .user-info {
    .base-info {
      display: flex;
      height: 231px;
      width: 100%;
      padding: 81px 32px 18px;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        justify-content: center;
        .text {
          font-size: 30px;
        }
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 22px;
          border: 4px solid #fff;
        }
      }
      .right {
        font-size: 20px;
        .right-btn {
          width: 116px;
          height: 33px;
        }
      }
    }
    .data-stats {
      display: flex;
      width: 100%;
      color: #fff;
      .data-item {
        display: flex;
        height: 135px;
        flex: 1;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .gild-class {
    .gild-item {
      i.iconfont {
        font-size: 45px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
    margin-bottom: 9px;
  }
  .cell {
    .cell-item {
      height: 100px;
      font-size: 30px;
    }
    .logout-cell {
      margin-top: 9px;
      height: 104px;
      font-size: 30px;
      color: #d86262;
    }
    .logout-cell .van-cell__title {
      text-align: center;
    }
  }
}
</style>
