<template>
  <div class="bookstore-container">
    <!-- 顶部轮播图部分 -->
    <div class="carousel-area">
      <el-carousel indicator-position="none" height="10rem" arrow="never">
        <el-carousel-item>
          <img src="../assets/images/img1.jpg" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/images/img2.jpg" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/images/img3.jpg" alt="">
        </el-carousel-item>

      </el-carousel>
    </div>

    <!-- 中间菜单部分 -->
    <div class="menu">
      <div class="menu-content">
        <router-link class="menu-item" to="/category" tag="div">
          <div class="menu-item-content">
            <span class="el-icon-menu"></span>
            <p class="menu-type">分类</p>
          </div>
        </router-link>

        <router-link class="menu-item" to="/rank" tag="div">
          <div class="menu-item-content">
            <span class="el-icon-s-data"></span>
            <p class="menu-type">排行</p>
          </div>
        </router-link>

        <router-link class="menu-item" to="/bookgroup" tag="div">
          <div class="menu-item-content">
            <span class="el-icon-s-order"></span>
            <p class="menu-type">书单</p>
          </div>
        </router-link>


        <router-link class="menu-item" to="/search" tag="div">
          <div class="menu-item-content">
            <span class="el-icon-search"></span>
            <p class="menu-type">搜索</p>
          </div>
        </router-link>

      </div>


    </div>

  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {}
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style scoped>
  .el-carousel__item {
    width: 100%;
  }

  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .bookstore-container {
    padding: 0 1rem;
  }

  .carousel-area {
    margin: 1rem 0;
  }

  .menu {
    width: 100%;
    text-align: center;
  }

  .menu-content {
    width: 30rem;
    height: 30rem;
    display: inline-block;
  }

  .menu-item {
    width: 40%;
    height: 40%;
    display: inline-block;
    background-color: rgba(255, 255, 255, 0);
    text-align: center;
    position: relative;
    border: .4rem solid #909399;
    border-radius: 2rem;
    margin: 1rem 1rem;
  }

  .menu-item-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .menu-item:first-child {
    color: #409EFF;
  }

  .menu-item:nth-child(2) {
    color: #67C23A;
  }

  .menu-item:nth-child(3) {
    color: #E6A23C;
  }

  .menu-item:last-child {
    color: #F56C6C;
  }

  .menu-item-content span {
    font-size: 4rem;
  }

  .menu-item-content p {
    font-size: 2rem;
  }
</style>