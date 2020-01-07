<template>
  <el-container id="admin-container">
    <el-menu class="el-menu-vertical"
      :collapse="isCollapse"
      >
      <el-menu-item v-for="item in menuOptions" :key="item.id" class="menu-item" index="item.id" @click="menuSelect(item.name)">
        <i :class="[item.iconClass, 'menu-icon']"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
    <el-container class="admin-body">
      <el-header class="admin-header">
        <i :class="[isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left', 'toggle-collapse-icon']" @click="toggleCollapse()"></i>
        <div class="directory-ref">
          <span>{{curMenuTitle}}</span>
        </div>
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
      isCollapse: false,
      curMenuTitle: 'Admin',
      menuOptions: [
        {
          id: 1,
          name: 'Article Writer',
          title: '文章管理',
          iconClass: 'el-icon-document'
        },
        {
          id: 2,
          name: 'Category Management',
          title: '分类管理',
          iconClass: 'el-icon-set-up'
        }
      ]
    }
  },
  methods: {
    toggleCollapse: function () {
      this.isCollapse = !this.isCollapse;
    },
    menuSelect: function (routeName) {
      this.$router.push({name: routeName});
      this.menuOptions.forEach(item => {
        if (item.name === routeName) {
          this.curMenuTitle = item.title;
        }
      });
    }
  }
}
</script>

<style lang="less">
html, body, #app {
  height: 100%;
}
.el-header {
  padding: 0px;
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
      z-index: 100;
      box-shadow: 2px 0px 5px rgba(0,0,0,0.2);
      .toggle-collapse-icon {
        float: left;
        height: 45px;
        width: 60px;
        text-align: center;
        font-size: 30px;
        padding-top: 15px;
        border-right: solid 1px #e6e6e6;
        cursor: pointer;
      }
      .directory-ref {
        float: left;
        padding-top: 18px;
        padding-left: 16px;
        span {
          font-size:16px;
          color:dodgerblue;
        }
      }
    }
    .admin-main {
      padding: 0px;
    }
  }
}
</style>
