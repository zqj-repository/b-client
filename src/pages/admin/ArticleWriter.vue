<template>
  <div id="article-writer-container">
    <el-dialog class="post-success-dialog" :visible.sync="postDialogFormVisible" :close-on-click-modal="false" :show-close="false">
      <div slot="title">
        <el-link type="primary" href="/#/admin/article-management">&lt;管理文章</el-link>
      </div>
      <div class="post-success-details">
        <span>{{article.title}}</span>
        <p>{{article.text}}</p>
      </div>
      <el-row slot="footer" type="flex" justify="center" class="post-success-dialog-row">
        <el-col class="post-success-action" :span="6"><el-link type="success"><i class="el-icon-circle-check"></i> 发布成功并查看文章</el-link></el-col>
        <el-col class="post-success-action" :span="3"><el-link type="primary" @click="postDialogFormVisible = false">再写一篇</el-link></el-col>
        <el-col class="post-success-action" :span="3"><el-link type="primary" @click="postDialogFormVisible = false">再写一篇</el-link></el-col>
      </el-row>
    </el-dialog>
    <div class="editor">
      <el-form :model="article" :rules="rules" ref="articleForm" class="articleForm">
        <el-input
            class="editor-input editor-title"
            v-model="article.id"
            type="hidden"
            v-if="!editorForNew" />
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
        <el-form-item prop="categoryId">
          <el-select v-model="article.categoryId" placeholder="请选择" class="editor-input">
            <el-option
              v-for="item in categoires"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row class="editor-commit-actions editor-input">
          <el-button type="primary" @click="publish()" :loading="publishLoading">发布文章</el-button>
        </el-row>
      </el-form>
    </div>
    <div class="preview-box">
      <span class="preview-title"> {{article.title}}</span>
      <div class="preview-text typeset" v-html="previewText">
        
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked';

export default {
  name: 'ArticleWriter',
  data () {
    return {
      article: {
        id: '',
        title: '',
        text: '',
        categoryId: ''
      },
      categoires: [],
      rules: {
        title: [
          { required: true, message: '*必填项' }
        ],
        categoryId: [
          { required: true, message: '*必选项' }
        ]
      },
      editorForNew: true,
      publishLoading: false,
      postDialogFormVisible: false,
      previewText: ''
    }
  },
  created () {
    this.$axios.get('/category/all').then( res => {
      this.categoires = res.data;
    }).catch(error => {
      console.error(error);
    });

    const articleId = this.$route.query.articleId;
    if (articleId) {
      this.article.id = articleId;
      this.editorForNew = false;
      this.$axios.get(`/article/${articleId}`).then( res => {
        this.article.title = res.data.title;
        this.article.text = res.data.text;
        this.article.categoryId = res.data.categoryId;
      }).catch(error => {
        console.error(error);
      });
    } else {
      this.editorForNew = true;
    }
  },
  methods: {
    publish () {
      this.postDialogFormVisible = true;
      // this.publishLoading = true;
      // this.$refs['articleForm'].validate(valid => {
      //   if (valid) {
      //     let articlePromise = null;
      //     if (this.editorForNew) {
      //       articlePromise = this.$axios.post('/article', JSON.stringify(this.article));
      //     } else {
      //       articlePromise = this.$axios.put('/article', JSON.stringify(this.article));
      //     }
      //     articlePromise.then(res => {
      //       this.categoires = res.data;
      //       alert('success');
      //       this.$router.push({name: 'Article List'});
      //     }).catch(error => {

      //     });
      //   }
      // });
    }
  },
  watch: {
    'article.text' () {
      this.previewText = marked(this.article.text);
    }
  }
}
</script>

<style lang="less" scoped>
#article-writer-container {
  width: 100%;
  padding-bottom: 60px;
  .editor {
    width: 50%;
    margin: 20px 1%;
    min-width: 500px;
    float: left;
    .editor-text {
      width: 100%;
      font-size: 16px;
    }
    .editor-commit-actions {
      margin-top: 16px;
    }
  }
  .preview-box {
    width: 46%;
    float: left;
    padding: 0px 1%;
    font-size: 16px;
    .preview-title {
      display: block;
      margin-top: 34px;
      height: 20px;
      text-align: bottom;
      font-size: 20px;
      font-weight: bold;
    }
    .preview-text {
      overflow-y: scroll;
      margin-top: 30px;
      max-height: 700px;
    font-size: 20px;
    }
  }
  .post-success-action {
    text-align: center;
  }
  .post-success-details {
    background-color: #F5F6F7;
    padding: 6px;
    span {
      font-size: 18px;
      color: #474747;
      margin-bottom: 8px;
    }
    p {
      font-size: 14px;
      color: #999999;
      letter-spacing: 1px;
      margin: 8px 0;
    }
  }
}
</style>
