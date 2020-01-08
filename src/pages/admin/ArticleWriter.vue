<template>
  <div id="article-writer-container">
    <div class="editor">
      <el-form :model="article" :rules="rules" ref="articleForm" class="articleForm">
        <el-form-item prop="title">
          <el-input
            class="editor-input editor-title"
            v-model="article.title"
            maxlength="50"
            show-word-limit
            placeholder="请输入标题" />
        </el-form-item>
        <el-form-item prop="text">
          <el-input
            class="editor-input editor-text"
            type="textarea"
            maxlength="12000"
            rows="30"
            show-word-limit
            placeholder="请输入内容"
            v-model="article.text" />
        </el-form-item>
        <el-form-item prop="selectedCategory">
          <el-select v-model="article.selectedCategory" placeholder="请选择" class="editor-input">
            <el-option
              v-for="item in categoires"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row class="editor-commit-actions editor-input">
          <el-button type="primary" @click="publish()">发布文章</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleWriter',
  data () {
    return {
      article: {
        title: '',
        text: '',
        selectedCategory: ''
      },
      categoires: [],
      rules: {
        title: [
          { required: true, message: '*必填项' }
        ],
        selectedCategory: [
          { required: true, message: '*必选项'}
        ]
      }
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
        this.article.title = res.data.title;
        this.article.text = res.data.text;
        this.article.selectedCategory = res.data.categoryId;
      }).catch(error => {
        console.error(error);
      });
    }
  },
  methods: {
    publish: function() {
      this.$refs['articleForm'].validate(valid => {
        console.log(valid);
        if (valid) {
          alert('submit');
        }
      });
      this.$axios.post('/article', {
        title: this.article.title,
        categoryId: this.article.selectedCategory,
        text: this.article.text
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
    margin: 20px auto;
    // .editor-input {
    //   margin-top: 15px;
    //   outline: none;
    // }
    // .editor-title {
    //   border: none;
    //   border-bottom: 1px solid rgba(0,0,0,0.2);
    //   border-radius: 0px;
    //   padding: 10px;
    //   font-size: 16px;
    //   width: 98%;
    // }
    .editor-text {
      width: 100%;
      font-size: 16px;
    }
    .editor-commit-actions {
      margin-top: 16px;
    }
  }
}
</style>
