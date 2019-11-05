<template>
  <div class="booklist-container">
    <!-- 顶部子分类导航栏 -->
    <div class="sub-cate-area">
      <div class="sub-cate-group" ref="subCateGroup">

        <div class="sub-cate-item" v-for="item in minor" :key="item" @click="changeMinor(item)">
          <span>{{item}}</span>
        </div>

      </div>

      <div>
        <button></button>
      </div>
    </div>

    <!-- 书籍列表详情 -->
    <div class="booklist-area" id="booklist">

      <div class="book-item" v-for="book in books" :key="book._id" @click="toBookInfo(book._id)">
        <!-- 书籍封面 -->
        <div class="book-cover">
          <img :src="'http://statics.zhuishushenqi.com' + book.cover" alt="">
        </div>
        <!-- 书籍信息 -->
        <div class="book-info">
          <p class="book-title">{{book.title}}</p>
          <p class="book-desc">{{book.shortIntro}}</p>
          <span class="book-author">作者:{{book.author}}</span>
          <div class="cate-hot">
            <span class="book-cate">{{book.minorCate}}</span>
            <span class="book-hot">{{book.latelyFollower | toWan}}人气</span>
          </div>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        gender: this.$route.params.gender,
        majorName: this.$route.params.major,
        minor: ['全部'],
        books: [],
        minorName: ''
      }
    },
    methods: {
      changeMinor(minorName) {
        var subCateGroup = this.$refs.subCateGroup.children
        var index = this.minor.indexOf(minorName)
        for (var i = 0; i < subCateGroup.length; i++) {
          subCateGroup[i].children[0].className = ''
        }
        subCateGroup[index].children[0].className = 'active'

        if (minorName === '全部') minorName = ''
        const loading = this.$loading({
          lock: true,
          text: '书籍加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
        })
        this.$http.get(`/category-info?gender=${this.gender}&type=hot&major=${this.majorName}&minor=${minorName}&start=0&limit=10`)
          .then(res => {
            this.books = JSON.parse(JSON.stringify(res.data.books))
          })
          .then(() => {
            loading.close()
          })
      },
      //跳转书本详情页面
      toBookInfo(bookID) {
        this.$router.push(`/bookinfo/${bookID}`)
      },

    },
    created() {

    },
    mounted() {
      var subCateGroup = this.$refs.subCateGroup.children
      subCateGroup[0].children[0].className = 'active'

      const loading = this.$loading({
        lock: true,
        text: '书籍加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)',
      })

      //获取子分类
      this.$http.get('/sub-categories')
        .then(res => {
          var data = res.data[this.gender]
          data.forEach(item => {
            if (item.major === this.majorName) {
              this.minor = this.minor.concat(item.mins)
            }
          })
        })
      //获取分类相关书籍
      this.$http.get(`/category-info?gender=${this.gender}&type=hot&major=${this.majorName}&minor=&start=0&limit=10`)
        .then(res => {
          this.books = JSON.parse(JSON.stringify(res.data.books))
        })
        .then(() => {
          loading.close()
        })

      // var booklist = document.getElementById('booklist')
      // booklist.addEventListener('scroll', function () {
      //   console.log(booklist.scrollTop)
      // })

    }
  }
</script>

<style scoped>
  .booklist-container {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .sub-cate-area {
    width: 100%;
    height: 3.6rem;
    border-bottom: .1rem solid #F56C6C;
    overflow: scroll;
    white-space: nowrap;
  }

  .sub-cate-item {
    display: inline-block;
    line-height: 3.6rem;
    margin: 0 .8rem;
  }

  .sub-cate-item span {
    display: inline-block;
    width: 100%;
    position: relative;
    font-size: 1.4rem;
    font-weight: bold;
    color: rgba(245, 108, 108, 0.58);
  }

  .sub-cate-item span.active {
    color: #F56C6C;
  }

  .sub-cate-item span.active::after {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-width: 1rem;
    border-style: dashed dashed solid dashed; /*通过画虚线的方式隐藏其余三边*/
    border-color: transparent transparent #F56C6C transparent;
    overflow: hidden;
  }

  .booklist-area {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .book-item {
    box-sizing: border-box;
    border-bottom: .1rem solid rgba(0, 0, 0, 0.2);
    height: 12rem;
    padding: 1rem 0;
    display: flex;
  }

  .book-cover {
    display: inline-block;
    width: 7.6rem;
    height: 100%;
    margin: 0 1rem;
  }

  .book-cover img {
    width: 100%;
    height: 100%;
  }

  .book-info {
    display: inline-block;
    height: 100%;
    flex: 1;
    margin-right: 1rem;
    position: relative;
  }

  .book-title {
    font-size: 1.6rem;
    font-weight: bold;
    /*设置文本溢出显示省略号*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .book-desc {
    display: block;
    margin-top: .5rem;
    height: 4.8rem;
    font-size: 1.2rem;
    line-height: 1.6rem;
    text-indent: 2rem;
    color: rgba(0, 0, 0, 0.5);
    /*设置文本溢出显示省略号*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .book-author {
    display: block;
    position: absolute;
    bottom: .5rem;
    left: .5rem;
    color: rgba(0, 0, 0, 0.5);
  }

  .cate-hot {
    position: absolute;
    bottom: .5rem;
    right: .5rem;
  }

  .book-cate {
    color: rgba(0, 0, 0, 0.5);
  }

  .book-hot {
    margin-left: 1rem;
    color: #ff5300;
  }

</style>