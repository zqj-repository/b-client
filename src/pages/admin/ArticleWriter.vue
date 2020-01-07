<template>
  <div id="article-writer-container">
    <div class="editor">
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
      <el-select v-model="value" placeholder="请选择" class="editor-input">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-row class="editor-commit-actions editor-input">
        <el-button type="primary">发发发发</el-button>
      </el-row>
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
      options: [
        {
          value: 1,
          label: '分类1'
        }
      ]
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
