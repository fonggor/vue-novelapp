<template>
  <div class="search-detail-container">
    <!-- 搜索提示 -->
    <div class="keyword">
      <span>搜索关键词：{{keyword}}</span>
    </div>


    <!-- 书籍列表 -->
    <div class="booklist-area" id="booklist">

      <div class="book-item" v-for="book in bookList" @click="toBookInfo(book._id)">
        <!-- 书籍封面 -->
        <div class="book-cover">
          <img :src="'http://statics.zhuishushenqi.com' + book.cover" alt="">
        </div>
        <!-- 书籍信息 -->
        <div class="book-info">
          <p class="book-title">{{book.title}}</p>
          <p class="book-desc">{{book.shortIntro}}</p>
          <div class="other-info">
            <span class="book-author">作者:{{book.author}}</span>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "SearchDetail",
    data() {
      return {
        keyword: this.$route.params.keyword,
        bookList: []
      }
    },
    methods: {
      toBookInfo(bookID) {
        this.$router.push(`/bookinfo/${bookID}`)
      }
    },
    mounted() {
      const loading = this.$loading({
        lock: true,
        text: '搜索中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)',
      })

      this.$http.get(`search?keyword=${this.keyword}`)
        .then(res => {
          this.bookList = res.data.books
        })
        .then(() => {
          loading.close()
        })
    }
  }
</script>

<style scoped>
  .search-detail-container {
    height: 100%;
  }

  .keyword {
    font-size: 1.4rem;
    font-weight: bold;
    margin: .5rem 0;
  }

  .book-item {
    box-sizing: border-box;
    border-bottom: .1rem solid rgba(0, 0, 0, 0.2);
    height: 12rem;
    padding: 1rem;
    display: flex;
    background-color: #ffffff;
  }

  .book-cover {
    width: 7.6rem;
    height: 100%;
  }

  .book-cover img {
    width: 100%;
    height: 100%;
  }

  .book-info {
    margin-left: 1rem;
    flex: 1;
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
    margin-top: .5rem;
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.5);
    /*设置文本溢出显示省略号*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .other-info {
    color: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
  }
</style>