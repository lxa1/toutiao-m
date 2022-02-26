<template>
  <div class="article-item">
    <van-cell :to="{
      name:'article',
      params: {
        articleId: article.art_id
      }
    }">
      <template v-slot:title>
        <div class="title van-multi-ellipsis--l2">{{ article.title }}</div>
      </template>
      <template v-slot:label>
        <div class="label">
          <div class="cover-wrap" v-if="article.cover.type === 3">
            <div
              class="cover-item"
              v-for="(img, index) in article.cover.images"
              :key="index"
            >
              <van-image fit="cover" :src="rep(img)" class="cover-item-img" />
            </div>
          </div>
          <div class="label-info-wrap">
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}评论</span>
            <span>{{ article.pubdate | relativeTime}}</span>
          </div>
        </div>
      </template>
      <template v-slot:default v-if="article.cover.type === 1">
        <van-image
          class="cover-right"
          fit="cover"
          :src="rep(article.cover.images[0])"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    rep(img) {
      return img.replace('http://localhost:8000/', 'http://toutiao.itheima.net/')
    }
  }
};
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    padding-left: 25px;
    .cover-right {
      width: 232px;
      height: 146px;
    }
  }
  .label-info-wrap span {
    font-size: 23px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    margin:31px 0;
    .cover-item {
      flex:1;
      width: 232px;
      height: 146px;
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-item-img {
        width: 232px;
        height: 146px;
      }
    }
  }
}
</style>
