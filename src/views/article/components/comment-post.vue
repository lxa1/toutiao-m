<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { PostComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    artId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  // 接收祖代组件传递的依赖
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost() {
      // 登录状态提示（加载中）
      this.$toast.loading({
        message: "发布中",
        forbidClick: true,
        duration: 0,
      });
      try {
        const { data } = await PostComment({
          target: this.artId, // 文章或者评论id
          content: this.message,
          art_id: this.articleId ? this.articleId : null// 在回复评论的时候，需要传递文章id，在评论文章的时候，可以不传递文章id
        })
        // console.log(data);
        // 清空文本框数据
        // 关闭弹出层
        // 将评论加载到顶部
        this.message = ""
        this.$emit('post-success', data.data)
        this.$toast.success('评论成功')
      } catch (err) {
        this.$toast.fail('评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
