<template>
  <div id="category-board-container">
    <div id="category-tabel-top-actions">
      <el-row>
        <el-button
          type="primary"
          icon="el-icon-edit"
          round
          @click="handleNew()">新建分类</el-button>
        <el-button
          type="primary"
          icon="el-icon-refresh"
          round
          @click="getCategories()">刷新</el-button>
      </el-row>

      <el-dialog class="category-form-dialog" @closed="resetCategoryForm" :title="formTitle" :visible.sync="categoryDialogFormVisible" v-loading.fullscreen.lock="fullscreenLoading">
        <el-form :model="categoryform" :rules="categoryformRule" ref="categoryformRef">
          <el-input v-model="categoryform.id" autocomplete="off" type="hidden" v-if="!editorForNew"></el-input>
          <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="categoryform.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类描述" :label-width="formLabelWidth" prop="description">
            <el-input v-model="categoryform.description" autocomplete="off" type="textarea" rows="3"></el-input>
          </el-form-item>
        </el-form>
        <el-alert
          v-if="categorySubmitError"
          title="提交失败，请重试！"
          type="error"
          :closable="false">
        </el-alert>
        <div slot="footer">
          <el-button @click="categoryDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitCategory()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div id="tabel-container">
      <el-table
        :data="categoryList">
        <el-table-column
          type="index"
          width="50">
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
              v-if="scope.row.defaultCategory !== 'Y'"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              v-if="scope.row.defaultCategory !== 'Y'"
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
      editorForNew: false,
      formTitle: '新建分类',
      categoryList: [],
      categoryform: {
        id: '',
        name: '',
        description: ''
      },
      categoryformRule: {
        name: [
          { required: true, message: '*必填项'}
        ]
      },
      categoryDialogFormVisible: false,
      fullscreenLoading: false,
      categorySubmitError: false,
      formLabelWidth: '80px'
    }
  },
  created () {
    this.getCategories();
  },
  methods: {
    getCategories () {
      this.$axios.get('/category/all').then( res => {
        this.categoryList = res.data;
      }).catch(error => {

      });
    },
    handleEdit(index, row) {
      console.log(row);
      this.categoryDialogFormVisible = true;
      this.editorForNew = false;
      this.categoryform.id = row.id;
      this.categoryform.name = row.name;
      this.categoryform.description = row.description;
    },
    handleDelete(index, row) {
      this.$axios.delete(`/category/${row.id}`).then( res => {
        if (res.status == 200) {
          this.getCategories();
        }
      });
    },
    handleNew () {
      this.categoryDialogFormVisible = true;
      this.editorForNew = true;
    },
    submitCategory() {
      this.$refs['categoryformRef'].validate( valid => {
        if (valid) {
          let categoryPromise = null;
          this.fullscreenLoading = true;
          if (this.editorForNew) {
            this.categoryform.id = '',
            categoryPromise = this.$axios.post('/category', JSON.stringify(this.categoryform));
          } else {
            categoryPromise = this.$axios.put('/category', JSON.stringify(this.categoryform));
          }
          categoryPromise.then(res => {
            if (res.status == 200) {
              this.categoryDialogFormVisible = false;
              this.categorySubmitError = false;
              this.getCategories();
            }
          }).catch(e => {
            this.categorySubmitError = true;
          }).finally(() => {
            this.fullscreenLoading = false;
          });
        }
      });
    },
    resetCategoryForm () {
      this.$refs['categoryformRef'].resetFields();
      this.categorySubmitError = false;
    }
  },
  watch: {
    editorForNew(newv, oldv) {
      this.formTitle = newv ? '新建分类' : '编辑分类';
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
