<template>
  <el-container id="admin-container">
    <el-menu class="el-menu-vertical"
      :collapse="isCollapse"
      >
        <el-menu-item class="menu-item" index="1" @click="menuSelect('Article Writer')">
          <i class="el-icon-document menu-icon"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item class="menu-item" index="2" @click="menuSelect('Category Management')">
          <i class="el-icon-set-up menu-icon"></i>
          <span slot="title">分类管理</span>
        </el-menu-item>
    </el-menu>
    <el-container class="admin-body">
      <el-header class="admin-header">
        <button @click="toggleCollapse()">Collapse</button>
      </el-header>
      <el-main class="admin-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    toggleCollapse: function () {
      this.isCollapse = !this.isCollapse;
    },
    menuSelect: function (routeName) {
      this.$router.push({name: routeName});
    }
  }
}
</script>

<style lang="less">
html, body, #app {
  height: 100%;
}
#admin-container {
  height: 100%;
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    overflow: auto;
    height: 100%;
  }
  .admin-body {
    .admin-header {
      box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
    }
    .admin-main {
      padding: 0px;
    }
  }
}
</style>
