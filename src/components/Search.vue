<template>
  <div class="search-container">
    <div class="search-area">
      <input class="search-text" type="text" v-model="keywords">
      <span class="search-button" @click="getsearchResults(keywords)">搜索</span>
    </div>

    <div class="hot-things" v-show="showFlag">
      <div class="hot-words">
        <p>搜索热词</p>
        <div class="tag-group">
          <span class="tag-item" v-for="tag in hotwords.slice(0,13)" :key="tag.word"
                @click="getsearchResults(tag.word)">{{tag.word}}</span>
        </div>
      </div>

      <div class="recommend">
        <p>热门推荐</p>
        <div class="book-group">
          <div class="recommend-item" v-for="book in hotbooks.slice(0,6)" :key="book" @click="getsearchResults(book)">
            <span class="el-icon-notebook-2"></span>&nbsp;
            <span>{{book}}</span>
          </div>

        </div>

      </div>

      <div class="search-history" v-show="hisFlag">
        <p>搜索历史</p>
        <div class="his-group">

          <div class="his-item" v-for="(word,index) in historyWords" :key="word">
            <span>{{word}}</span>
            <span class="el-icon-close" @click="deleteHis(index)"></span>
          </div>

        </div>

        <div class="delete-all" @click="deleteAll">
          <span class="el-icon-delete"></span>
          <span>删除所有历史</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        hotwords: [],
        hotbooks: [],
        historyWords: [],
        showFlag: false,
        hisFlag: false,
        keywords: ''
      }
    },
    methods: {
      getsearchResults(keyword) {
        //判断是否输入了东西
        if (keyword === '') {
          this.$message('请输入需要搜索的关键字')
          return false
        }

        this.historyWords.forEach((item, index) => {
          if (item === keyword) {
            this.historyWords.splice(index, 1)
          }
        })

        this.historyWords.unshift(keyword)

        localStorage.setItem('historyWords', JSON.stringify(this.historyWords))

        this.$router.push(`/searchresult/${keyword}`)
      },
      deleteHis(index) {
        this.historyWords.splice(index, 1)
        localStorage.setItem('historyWords', JSON.stringify(this.historyWords))
      },
      deleteAll() {
        this.historyWords.splice(0)
        localStorage.setItem('historyWords', JSON.stringify(this.historyWords))
      }
    },
    mounted() {
      this.$http.all([this.$http.get('search-hotwords'), this.$http.get('hot-books')])
        .then(results => {
          this.hotwords = results[0].data.searchHotWords
          this.hotbooks = results[1].data.hotWords
        })
        .then(() => {
          this.showFlag = true
        })

      this.historyWords = JSON.parse(localStorage.getItem('historyWords')) || []
    },
    watch: {
      historyWords: function () {
        if (this.historyWords.length !== 0) {
          this.hisFlag = true
        } else {
          this.hisFlag = false
        }
      }
    }
  }
</script>

<style scoped>
  .search-area {

    text-align: center;
    margin-top: 1rem;
    box-sizing: border-box;
  }

  .search-text {
    display: inline-block;
    width: 20rem;
    height: 2.6rem;
    border: none;
    outline: none;
    border-radius: .5rem;
    background-color: rgba(0, 0, 0, .1);
    text-indent: .5rem;
    line-height: 2.6rem;
    font-size: 1.2rem;
  }

  .search-button {
    display: inline-block;
    height: 2.6rem;
    line-height: 2.6rem;
    margin-left: 1rem;
    color: #F56C6C;
    font-weight: bold;
    font-size: 1.6rem;
  }

  .hot-words {
    box-sizing: border-box;
    margin-top: 2rem;
    height: 14rem;
    background-color: #ffffff;
    padding: 1rem;
    border-bottom: 1px solid #909399;
  }

  .hot-words p {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .tag-group {
    margin-top: 1rem;
  }

  .tag-item {
    display: inline-block;
    font-size: 1.2rem;
    margin: .5rem .5rem .5rem 0;
    padding: 0 .8rem;
    border: .1rem solid rgba(0, 0, 0, .6);
    border-radius: 2.5rem;
  }

  .recommend {
    box-sizing: border-box;
    height: 14rem;
    background-color: #ffffff;
    padding: 1rem;
    border-bottom: 1px solid #909399;
  }

  .recommend p {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .book-group {
    margin-top: 1rem;
  }

  .recommend-item {
    display: inline-block;
    width: 45%;
    font-size: 1.4rem;
    height: 2rem;
    line-height: 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 1rem .5rem 0;
  }

  .search-history {
    box-sizing: border-box;
    background-color: #ffffff;
    padding: 1rem;
    border-bottom: 1px solid #909399;
  }

  .search-history p {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .his-group {
    margin-top: 1rem;
  }

  .his-item {
    font-size: 1.4rem;
    display: flex;
    justify-content: space-between;
  }

  .delete-all {
    margin-top: .5rem;
    color: #F56C6C;
    text-align: center;
    font-size: 1.4rem;
  }
</style>