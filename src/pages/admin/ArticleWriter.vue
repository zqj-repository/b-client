<template>
  <div id="article-writer-container">
    <div class="editor">
      <input
        class="input editor-title"
        v-model="title"
        placeholder="请输入标题" />

      <textarea
        class="input editor-text"
        type="text"
        rows="30"
        placeholder="请输入内容"
        v-model="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleWriter',
  data () {
    return {
      title: '',
      text: ''
    }
  }
}
</script>

<style lang="less" scoped>
#article-writer-container {
  width: 100%;
  .editor {
    width: 900px;
    margin: 0 auto;
    .input {
      margin-top: 15px;
      width: 100%;
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
  }
}
</style>
