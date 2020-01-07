<template>
  <div id="article-writer-container">
    <div class="editor">
      <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"> -->
      <input
        class="editor-input editor-title"
        v-model="title"
        placeholder="请输入标题" />
      <textarea
        class="editor-input editor-text"
        type="text"
        rows="30"
        placeholder="请输入内容"
        v-model="text" />
      <el-select v-model="selectedCategory" placeholder="请选择" class="editor-input">
        <el-option
          v-for="item in categoires"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-row class="editor-commit-actions editor-input">
        <el-button type="primary" @click="publish()">发布文章</el-button>
      </el-row>
      <!-- </el-form> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleWriter',
  data () {
    return {
      title: '',
      text: '',
      selectedCategory: '',
      categoires: []
    }
  },
  created () {
    this.$axios.get('/category/all').then(res => {
      this.categoires = res.data;
    }).catch(error => {
      console.error(error);
    });

    const articleId = this.$route.query.articleId;
    if (articleId) {
      this.$axios.get(`/article/${articleId}`).then(res => {
        this.title = res.data.title;
        this.text = res.data.text;
        this.selectedCategory = res.data.categoryId;
      }).catch(error => {
        console.error(error);
      });
    }
  },
  methods: {
    publish: function() {
      this.$axios.post('/article', {
        title: this.title,
        categoryId: this.selectedCategory,
        text: this.text
      }).then(res => {
        this.categoires = res.data;
        console.log(this.categoires);
      }).catch(error => {
        console.error(error);
      });
    }
  }
}
</script>

<style lang="less" scoped>
#article-writer-container {
  width: 100%;
  padding-bottom: 60px;
  .editor {
    width: 900px;
    margin: 0 auto;
    .editor-input {
      margin-top: 15px;
      outline: none;
    }
    .editor-title {
      border: none;
      border-bottom: 1px solid rgba(0,0,0,0.2);
      border-radius: 0px;
      padding: 10px;
      font-size: 16px;
      width: 98%;
    }
    .editor-text {
      width: 98%;
      padding: 9px;
      font-size: 16px;
    }
    .editor-commit-actions {
      margin-top: 16px;
    }
  }
}
</style>
