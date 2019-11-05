<template>
  <div class="rank-container">
    <div class="top-nav" ref="gender">
      <div class="gender-nav tab-active" @click="changeGender(0)">
        男频
      </div>
      <div class="gender-nav" @click="changeGender(1)">
        女频
      </div>
    </div>

    <div class="main-box">
      <div class="side-nav">
        <!-- 频道榜单 -->
        <ul class="rank-group" v-if="genderFlag">
          <li class="rank-item" v-for="(rank,liIndex) in rankInfo.slice(0,9)" :key="rank._id"
              @click="getRank(rank._id,liIndex)"
              ref="rankGroup">
            {{rank.shortTitle}}
          </li>
        </ul>

      </div>

      <!-- 书籍列表 -->
      <div class="book-list">

        <div class="list-item" v-for="(book,index) in bookList" :key="index" @click="toBookInfo(book._id)">
          <div class="book-cover">
            <img :src="'http://statics.zhuishushenqi.com' + book.cover" alt="">
          </div>
          <div class="book-info">
            <p class="book-title">{{index + 1}}.{{book.title}}</p>
            <p class="book-desc">{{book.shortIntro}}</p>
            <span class="book-author">{{book.author}}</span>
            <span class="book-cate">{{book.minorCate}}</span>
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
        allRank: {},
        rankInfo: [],
        genderFlag: true,
        bookList: {}
      }
    },
    methods: {
      changeGender(gender) {
        if (gender === 0) {
          this.$refs.gender.children[gender].className = 'gender-nav tab-active'
          this.$refs.gender.children[1].className = 'gender-nav'
          this.rankInfo = this.allRank.male
        } else if (gender === 1) {
          this.$refs.gender.children[gender].className = 'gender-nav tab-active'
          this.$refs.gender.children[0].className = 'gender-nav'
          this.rankInfo = this.allRank.female
        }
        this.getRank(this.rankInfo[0]._id, 0)
      },
      getRank(rankID, liIndex) {
        const loading = this.$loading({
          lock: true,
          text: '书籍加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
        })

        this.$http.get(`/rank/${rankID}`)
          .then(res => {
            this.bookList = JSON.parse(JSON.stringify(res.data.ranking.books))
          })
          .then(() => {
            var rankGroup = this.$refs.rankGroup
            for (var i = 0; i < rankGroup.length; i++) {
              rankGroup[i].className = 'rank-item'
            }
            rankGroup[liIndex].className = 'rank-item active'
            loading.close()
          })
      },
      toBookInfo(bookID) {
        this.$router.push(`/bookinfo/${bookID}`)
      }
    },
    mounted() {
      //获取所有排行榜信息
      this.$http.get('/rank-category')
        .then(res => {
          this.allRank = res.data
          this.rankInfo = this.allRank.male
        })
        .then(() => {
          this.getRank(this.rankInfo[0]._id, 0)
        })

    }
  }
</script>

<style scoped>
  .rank-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .top-nav {
    height: 3.6rem;
  }

  .gender-nav {
    display: inline-block;
    width: 50%;
    height: 3.6rem;
    line-height: 3.6rem;
    text-align: center;
    font-size: 1.6rem;
    color: #909399;
    border-bottom: .2rem solid rgba(144, 147, 153, 0.3);
  }

  .tab-active {
    box-sizing: border-box;
    border-bottom: .2rem solid #F56C6C;
    color: #F56C6C;
  }

  .main-box {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .side-nav {
    background-color: #ffffff;
    border-right: .1rem solid rgba(0, 0, 0, 0.2);
    width: 8rem;
  }


  .book-list {
    background-color: #ffffff;
    flex: 1;
    overflow-y: scroll;
  }


  .rank-group {
    width: 8rem;
  }

  .rank-item {
    box-sizing: border-box;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    border-bottom: .1rem solid rgba(144, 147, 153, 0.33);
    font-size: 1.4rem;
    color: rgba(0, 0, 0, 0.3);;
  }

  .rank-item.active {
    color: #F56C6C;
  }

  .list-item {
    box-sizing: border-box;
    height: 10rem;
    display: flex;
    padding: 1rem;
  }

  .book-cover {
    background-color: #ffffff;
    width: 6rem;
    margin-right: 1rem;
  }

  .book-cover img {
    width: 100%;
    height: 100%;
  }

  .book-info {
    flex: 1;
    position: relative;
  }

  .book-title {
    font-size: 1.4rem;
    /*设置文本溢出显示省略号*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .book-desc {
    font-size: 1.2rem;
    margin-top: .5rem;
    color: rgba(0, 0, 0, .6);
    /*设置文本溢出显示省略号*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .book-author {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    color: rgba(0, 0, 0, .4);
  }

  .book-cate {
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    color: rgba(0, 0, 0, .6);
    background-color: rgba(0, 0, 0, .1);
    padding: .2rem .5rem;
    border-radius: 2.5rem;
  }
</style>