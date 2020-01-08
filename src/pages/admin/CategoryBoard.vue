<template>
  <div id="category-board-container">
    <div id="category-tabel-top-actions">
      <el-button 
        type="primary" 
        icon="el-icon-edit" 
        round
        @click="categoryDialogFormVisible = true">新建分类</el-button>
      <el-dialog title="新建分类" :visible.sync="categoryDialogFormVisible" v-loading.fullscreen.lock="fullscreenLoading">
        <el-form :model="newCategoryform">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="newCategoryform.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类描述" :label-width="formLabelWidth">
            <el-input v-model="newCategoryform.description" autocomplete="off" type="textarea" rows="3"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="categoryDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitNewCategory()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div id="tabel-container">
      <el-table
        :data="tableData">
        <el-table-column
          label="编号"
          prop="id">
        </el-table-column>
        <el-table-column
          label="名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="description">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <label>操作</label>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      categoryDialogFormVisible: false,
      newCategoryform: {
        name: '',
        description: ''
      },
      fullscreenLoading: false,
      formLabelWidth: '120px'
    }
  },
  created () {
    this.$axios.get('/category/all').then(res => {
      this.tableData = res.data;
    }).catch(error => {
      console.error(error);
    });
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    submitNewCategory() {
      this.fullscreenLoading = true;
      console.log(this.newCategoryform);
    }
  }
}
</script>

<style lang="less" scoped>
#category-board-container {
  width: 100%;
  #category-tabel-top-actions{
    max-width: 1200px;
    margin: 10px auto;
  }
  #tabel-container {
    max-width: 1200px;
    margin: 10px auto;
  }
}
</style>
