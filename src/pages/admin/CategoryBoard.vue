<template>
  <div id="category-board-container">
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
      tableData: []
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
    }
  }
}
</script>

<style lang="less" scoped>
#category-board-container {
  width: 100%;
  #tabel-container {
    max-width: 1200px;
    margin: 30px auto;
  }
}
</style>
