<template>
  <div class="login-container">
    <!-- 登录导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- 登录导航栏 -->
    <!-- form表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <!-- 手机号 -->
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <template v-slot:left-icon>
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <!-- 手机号 -->

      <!-- 验证码 -->
      <van-field
        name="验证码"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <template v-slot:left-icon>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            :time="1000 * 60"
            v-if="isCountDownShow"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <!-- 倒计时 -->
          <van-button
            size="small"
            type="primary"
            class="send-sms-btn"
            @click="onSendSms"
            native-type="button"
            v-else
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <!-- 验证码 -->
      <!-- 提交按钮 -->
      <div class="login-btn-warp">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 提交按钮 -->
    <!-- form表单 -->
  </div>
</template>

<script>
import { login, getSmsCode } from "@/api/user.js";
export default {
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      // 表单规则
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|4|5|9]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      // 倒计时
      isCountDownShow: false,
    };
  },
  methods: {
    // 提交表单
    async onSubmit() {
      // 登录状态提示（加载中）
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0,
      });
      const user = this.user;
      // 判断是否登录成功，更新状态提示
      try {
        const { data } = await login(user);
        this.$store.commit("setUser", data.data);
        this.$toast.success("登陆成功");
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("登陆失败");
        } else {
          this.$toast.fail("发生未知错误");
        }
        console.log(err);
      }
    },
    // 获取验证码
    async onSendSms() {
      // 校验手机号
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err);
      }
      // 发送验证码
      try {
        await getSmsCode(this.user.mobile);
        this.$toast("发送成功");
        // 验证通过，并且发送成功,显示倒计时
        this.isCountDownShow = true;
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast("操作过于频繁，请稍后再试");
        } else {
          this.$toast("发生错误，请稍后再试");
        }
        // console.log("错误", err);
      }
    },
  },
};
</script>

<style lang="less" scope>
.login-container {
  .iconfont {
    font-size: 37px;
    color: #666666;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    background-color: #ededed;
    color: #666666;
    font-size: 22px;
    line-height: 46px;
    border: none;
    border-radius: 23px;
  }
  .login-btn-warp {
    padding: 53px 33px;
    .van-button {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
