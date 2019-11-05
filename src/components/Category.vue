<template>
  <div class="category-container">
    <!-- 侧边主类型栏 -->
    <div class="side-nav">
      <ul class="cate-group" ref="cateGroup">
        <li class="cate-active" @click="changeCate(0)">男生</li>
        <li @click="changeCate(1)">女生</li>
      </ul>
    </div>

    <!-- 主要分类 -->
    <div class="main-category">
      <!-- 男生分类 -->
      <div class="main-cate-group" v-show="!cateFlag">
        <div class="main-cate-group-item" v-for="item in category.male" :key="item.name">
          <div class="item-info" @click="toBookGroup('male',item.name)">
            <p class="cate-name">{{item.name}}</p>
            <p class="cate-count">{{item.bookCount}}本</p>
          </div>
        </div>
      </div>

      <!-- 女生分类 -->
      <div class="main-cate-group" v-show="cateFlag">
        <div class="main-cate-group-item" v-for="item in category.female" :key="item.name">
          <div class="item-info" @click="toBookGroup('female',item.name)">
            <p class="cate-name">{{item.name}}</p>
            <p class="cate-count">{{item.bookCount}}本</p>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "Category",
    data() {
      return {
        category: {},
        cateFlag: false
      }
    },
    methods: {
      changeCate(index) {
        var cateItems = this.$refs.cateGroup.children
        for (var i = 0; i < cateItems.length; i++) {
          cateItems[i].className = ''
        }
        cateItems[index].className = 'cate-active'
        if (index === 0) {
          this.cateFlag = false
        } else if (index === 1) {
          this.cateFlag = true
        }
      },
      toBookGroup(gender, cateName) {
        this.$router.push(`/booklist/${gender}/${cateName}`)
      }
    },
    created() {
      const loading = this.$loading({
        lock: true,
        text: '分类整理中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)',
      })
      this.$http.get('/categories')
        .then(res => {
          this.category = res.data
        })
        .then(() => {
          loading.close()
        })
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .category-container {
    height: 100%;
    display: flex;
  }

  .side-nav {
    flex: 2;
    height: 100%;
    background-color: rgba(255, 5, 23, 0.56);
  }

  .cate-group li {
    display: block;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    border-bottom: .1rem solid #ffffff;
    font-size: 1.6rem;
    font-weight: bolder;
    color: #ffffff;
  }

  .cate-group li.cate-active {
    color: #ffec03;
    position: relative;
  }

  .cate-group li.cate-active::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-width: 1rem;
    border-style: dashed dashed dashed solid; /*通过画虚线的方式隐藏其余三边*/
    border-color: transparent transparent transparent rgba(255, 5, 23, 0.56);
    overflow: hidden;
    position: absolute;
    left: 100%;
    top: 1rem;
  }

  .main-category {
    flex: 6;
    height: 100%;
    padding: 0 1rem;
  }

  .main-cate-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 2rem;
  }

  .main-cate-group-item {
    display: inline-block;
    width: 44%;
    height: 5rem;
    margin: 1rem 0;
    position: relative;
    font-weight: bold;
    border: .2rem solid #909399;
    border-radius: 2.5rem;
  }

  .item-info {
    display: inline-block;
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    color: rgba(144, 147, 153, 0.64);
  }

  .cate-name {
    font-size: 1.6rem;
  }

</style>