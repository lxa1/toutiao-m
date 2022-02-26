<template>
  <div class="comment-reply">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      :title="comment.reply_count ? `${comment.reply_count}条回复` : '暂无回复'"
    >
      <template v-slot:left>
        <van-icon name="cross" @click="$emit('reply-close')" />
      </template>
    </van-nav-bar>
    <!-- 顶部导航栏 -->
    <div class="scroll-warp">
      <!-- 评论项 -->
      <comment-item :comment="comment"></comment-item>
      <!-- 评论项 -->
      <van-cell title="全部回复"></van-cell>
      <!-- 评论回复 -->
      <comment-list
        :source="comment.com_id"
        type="c"
        :list="commentList"
      ></comment-list>
      <!-- 评论回复 -->
    </div>
    <!-- 底部写评论 -->
    <div class="post-warp">
      <van-button class="post-btn" round size="small" @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- 底部写评论 -->
    <!-- 评论弹窗 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        :artId="comment.com_id"
        @post-success="onPostSuccess"
      ></comment-post>
    </van-popup>
    <!-- 评论弹窗 -->
  </div>
</template>

<script>
import CommentItem from "./comment-item";
import CommentList from "./comment-list";
import CommentPost from "./comment-post";
export default {
  name: "CommentReply",
  data() {
    return {
      isPostShow: false,
      commentList: [],
    };
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onPostSuccess(val) {
      // 更新回复数量
      // 关闭弹窗
      // 将最新数据添加到列表当中
      this.comment.reply_count++;
      this.isPostShow = false;
      this.commentList.unshift(val.new_obj);
    },
  },
};
</script>

<style lang="less" scoped>
.scroll-warp {
  position: fixed;
  top: 92px;
  right: 0;
  left: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-warp {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
