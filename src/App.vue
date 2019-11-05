<template>
  <div id="app">

    <!-- 页面容器 -->
    <div class="page-container">

      <!-- 顶部信息 -->
      <div class="app-header">
        <!-- 返回按钮 -->
        <div class="header-back" @click="goBack">
          <span class="el-icon-arrow-left"></span>
        </div>

        <!-- app名字 -->
        <div class="header-name">
          <p>小说APP</p>
        </div>

        <!-- 搜索图标 -->
        <div class="header-search" @click="toSearch">
          <span class="el-icon-search"></span>
        </div>
      </div>

      <!-- 中间内容 -->
      <div class="app-content">
        <router-view></router-view>

      </div>

      <!-- 底部导航 -->
      <div class="app-nav" ref="nav">
        <div class="nav-item" @click="goToNav(1)">
          <span class="el-icon-reading"></span>
          <p>书架</p>
        </div>
        <div class="nav-item" @click="goToNav(2)">
          <span class="el-icon-goods"></span>
          <p>书城</p>
        </div>
        <div class="nav-item" @click="goToNav(3)">
          <span class="el-icon-user"></span>
          <p>我的</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'app',
    data() {
      return {}
    },
    methods: {
      goToNav(index) {
        var navGroups = this.$refs.nav.children
        for (var i = 0; i < navGroups.length; i++) {
          navGroups[i].style.color = ''
        }
        navGroups[index - 1].style.color = '#F56C6C'
        if (index === 1) {
          this.$router.push('/bookshelf')
        } else if (index === 2) {
          this.$router.push('/bookstore')
        } else if (index === 3) {
          this.$router.push('/personal')
        }
      },
      goBack() {
        this.$router.go(-1)
      },
      toSearch() {
        this.$router.push('/search')
      }
    },

    mounted() {
      var navGroups = this.$refs.nav.children
      if (this.$route.path === '/bookshelf') {
        for (var i = 0; i < navGroups.length; i++) {
          navGroups[i].style.color = ''
        }
        navGroups[0].style.color = '#F56C6C'
      } else if (this.$route.path === '/personal') {
        for (var i = 0; i < navGroups.length; i++) {
          navGroups[i].style.color = ''
        }
        navGroups[2].style.color = '#F56C6C'
      } else {
        for (var i = 0; i < navGroups.length; i++) {
          navGroups[i].style.color = ''
        }
        navGroups[1].style.color = '#F56C6C'
      }
    }
  }
</script>

<style>
  [v-cloak] { /*解决第一次进入页面时出现代码等待渲染的情况*/
    display: none !important;
  }

  .main-enter {
    opacity: 0;
    transform: translateX(10rem);
  }

  .main-leave-to {
    opacity: 0;
    transform: translateX(-10rem);
  }

  .main-enter-active,
  .main-leave-active {
    position: absolute;
    transition: all 0.6s linear;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    font-size: 10px;
    max-width: 780px;
    height: 100%;
    margin: 0 auto;

  }

  body {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /*隐藏滚动条*/
  ::-webkit-scrollbar {
    display: none;
  }

  ul, li {
    list-style: none;
  }

  #app, .page-container {
    height: 100%;
  }

  .page-container {
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 207, 12, 0.06);
  }

  .app-header {
    height: 4.95rem;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    border-bottom: .1rem solid #909399;
  }

  .header-name {
    display: inline-block;
    height: 4.95rem;
    width: 24rem;
    text-align: center;
  }

  .header-name p {
    display: inline;
    line-height: 4.95rem;
    font-size: 1.6rem;
  }

  .header-back, .header-search {
    display: inline-block;
    height: 4.95rem;
    width: 6.6rem;
    text-align: center;
    line-height: 4.95rem;
    font-size: 1.6rem;
    font-weight: bold;
  }

  .app-content {
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    position: relative;
  }

  .app-nav {
    height: 4.95rem;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    border-top: .1rem solid #909399;
  }

  .nav-item {
    height: 100%;
    text-align: center;
    flex: 1;
  }

  .nav-item span {
    font-size: 2.0rem;
    font-weight: bolder;
    margin: .3rem 0;
  }

  .nav-item p {
    font-size: 1.2rem;
    font-weight: bolder;
  }
</style>
