<template>
  <el-container id="admin-container">
    <el-menu class="el-menu-vertical"
      :collapse="isCollapse"
      >
      <el-menu-item v-for="item in menuOptions" :key="item.id" class="menu-item aside-menu-item" :index="item.id" @click="menuSelect(item.name)">
        <i :class="[item.iconClass, 'menu-icon']"></i>
        <span slot="title">{{routerMap[item.name]}}</span>
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
        <transition name="slide" mode="out-in">
          <router-view></router-view>
      </transition>
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
          id: '0',
          name: 'Home Board',
          iconClass: 'el-icon-s-home'
        },
        {
          id: '1',
          name: 'Article Board',
          iconClass: 'el-icon-document'
        },
        {
          id: '2',
          name: 'Category Board',
          iconClass: 'el-icon-set-up'
        }
      ],
      routerMap: {
        'Home Board': '首页',
        'Article Board': '文章管理',
        'Category Board': '分类管理',
        'Article Writer': '写作'
      }
    }
  },
  methods: {
    toggleCollapse: function () {
      this.isCollapse = !this.isCollapse;
    },
    menuSelect: function (routeName) {
      this.$router.push({name: routeName}).catch(err => {});
    }
  },
  watch: {
    '$route': function(value) {
      this.curMenuTitle = this.routerMap[value.name];
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
.el-menu-vertical {
  background-color: #304156;
}
.slide-enter-active,
.slide-leave-active
 {
  transition: all 0.4s ease-out;
}
.slide-enter {
  opacity: 0;
  transform: translateX(-10%);
}
.slide-enter-to {
  opacity: 1;
}
.slide-leave {
  opacity: 1;
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(10%);
}
#admin-container {
  height: 100%;
  .el-menu-vertical {
    overflow: auto;
    height: 100%;
    .aside-menu-item.is-active {
      color: dodgerblue!important;
      i {
        color: dodgerblue;
      }
    }
    .aside-menu-item {
      color: #fff;
      background-color: #304156;
      &:hover {
        background-color: #12181f;
      }
      i {
        color: #fff;
      }
    }
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
  }
  .admin-body {
    .admin-header {
      z-index: 100;
      box-shadow: 2px 0px 5px rgba(0,0,0,0.2);
      .toggle-collapse-icon {
        float: left;
        height: 40px;
        width: 60px;
        text-align: center;
        font-size: 20px;
        padding-top: 20px;
        border-right: solid 1px #e6e6e6;
        cursor: pointer;
      }
      .directory-ref {
        float: left;
        padding-top: 18px;
        padding-left: 16px;
        span {
          font-size:16px;
          color:#777777;
        }
      }
    }
    .admin-main {
      padding: 0px;
      overflow-x: hidden;
    }
  }
}
</style>
