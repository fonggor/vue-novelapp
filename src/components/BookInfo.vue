<template>
  <div class="bookinfo-container" v-show="boxFlag">
    <!-- 顶部介绍 -->
    <div class="top-part">
      <div class="book-cover">
        <img :src="'http://statics.zhuishushenqi.com' + bookInfo.cover" alt="">
      </div>
      <div class="book-detail">
        <p class="book-name">{{bookInfo.title}}</p>
        <p>
          <span class="book-author"><span class="el-icon-user-solid"></span>{{bookInfo.author}}</span>
          <span class="book-from"><span class="el-icon-location-outline"></span>{{bookInfo.copyright}}</span>
        </p>
        <p>
          <span class="book-words"><span class="el-icon-edit"></span>{{bookInfo.wordCount | toWan}}字</span>
          <span class="book-serial" v-show="bookInfo.isSerial">连载中</span>
          <span class="book-serial" v-show="!bookInfo.isSerial">已完结</span>
        </p>

      </div>

      <div class="add-button">
        <span>加入书架</span>
      </div>
    </div>

    <!-- 人气及评分部分 -->
    <div class="popularity-part">
      <!-- 左侧评分 -->
      <div class="grade">
        <!-- 评分及星星 -->
        <div class="star-rate">
          <span class="rate-num">{{Math.floor(bookInfo.rating.score * 10) / 10}}</span>
          <ul class="star-group" ref="starGroup">
            <li class="color-yellow"><span class="el-icon-star-on"></span></li>
            <li><span class="el-icon-star-on"></span></li>
            <li><span class="el-icon-star-on"></span></li>
            <li><span class="el-icon-star-on"></span></li>
            <li><span class="el-icon-star-on"></span></li>
          </ul>
        </div>
        <p class="star-people">{{bookInfo.rating.tip}}<span class="el-icon-arrow-right"></span></p>
      </div>

      <!--右侧具体热度 -->
      <div class="pop-detail">
        <div class="retention">
          <p class="retention-ratio">{{bookInfo.retentionRatio}}%</p>
          <span>读者留存</span>
        </div>

        <div class="lately-follower">
          <p class="lately-follower-num">{{bookInfo.latelyFollower | toWan}}</p>
          <span>7日人气</span>
        </div>

        <div class="total-follower">
          <p class="total-follower-num">{{bookInfo.totalFollower | toWan}}</p>
          <span>累计人气</span>
        </div>
      </div>
    </div>

    <!-- 中间简介部分 -->
    <div class="intro-part">
      <p class="intro-title">简介</p>
      <!-- 小说相关标签 -->
      <div class="tags">
        <ul class="tags-group">
          <li v-for="item in bookInfo.tags" :key="item">{{item}}</li>
        </ul>
      </div>
      <!-- 内容介绍 -->
      <div class="short-desc" @click="openDesc">
        <p class="short-desc-content hide" ref="shortDesc">{{bookInfo.longIntro}}</p>
      </div>
      <!-- 目录章节 -->
      <div class="catalog">
        <span class="catalog-title">目录</span>
        <div class="update-info">
          <span class="update-time" v-if="bookInfo.isSerial">{{bookInfo.updated | timeAgo}}</span>
          <span class="update-time" v-if="!bookInfo.isSerial">已完结</span>
          <span class="last-chapter">{{bookInfo.lastChapter}}</span>
          <span class="el-icon-arrow-right"></span>
        </div>
      </div>
    </div>

    <!-- 热门短评部分 -->
    <div class="short-comment">
      <p class="short-comment-title">热门短评</p>

      <!-- 短评滚动展示部分 -->
      <el-carousel height="10rem" direction="vertical" :autoplay="true" :interval="1000" indicator-position="none">
        <el-carousel-item v-for="item in comments.slice(0,5)" :key="item.author._id">
          <!-- 评论人信息 -->
          <div class="user-info">
            <div class="avatar">
              <img :src="'http://statics.zhuishushenqi.com' + item.author.avatar" alt="">
            </div>
            <span class="nickname">{{item.author.nickname}}</span>
            <span class="user-level">Lv {{item.author.lv}}</span>
          </div>
          <ul class="user-star-group">
            <li class="color-yellow" v-for="count in item.rating" :key="count"><span class="el-icon-star-on"></span>
            </li>
          </ul>
          <p class="comment-content">
            {{item.content}}</p>
        </el-carousel-item>
      </el-carousel>

      <!-- 查看全部短评部分 -->
      <div class="check-all-short">
        <span>查看全部短评{{this.comments.length}}条</span>
      </div>
    </div>

    <!-- 底部小说版权信息 -->
    <div class="copyright">
      <p class="copyright-title">图书信息</p>
      <p class="copyright-content">版权：{{bookInfo.copyrightInfo}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bookID: this.$route.params.id,
        bookInfo: {
          rating: {}
        },
        comments: [],
        descFlag: false,
        boxFlag: false
      }
    },
    methods: {
      ratingStarCount() {
        var starCount = Math.floor(this.bookInfo.rating.score / 2)
        var starGroup = this.$refs.starGroup.children
        for (var i = 0; i < starCount; i++) {
          starGroup[i].className = 'color-yellow'
        }
      },
      openDesc() {
        this.descFlag = !this.descFlag
        if (!this.descFlag) {
          this.$refs.shortDesc.className = 'short-desc-content hide'
        } else {
          this.$refs.shortDesc.className = 'short-desc-content'
        }
      }
    },
    mounted() {
      const loading = this.$loading({
        lock: true,
        text: '小说信息加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)',
      })


      this.$nextTick(() => {
        //获取书籍相关信息
        this.$http.get(`/book-info/${this.bookID}`)
          .then(res => {
            this.bookInfo = JSON.parse(JSON.stringify(res.data))
          })
          .then(() => {
            this.ratingStarCount()
            loading.close()
            this.boxFlag = true
          })

        //获取书籍短评
        this.$http.get(`/book/short-reviews?book=${this.bookID}`)
          .then(res => {
            this.comments = JSON.parse(JSON.stringify(res.data.docs))
          })
      })

    },
    filters: {
      'timeAgo': function (stringTime) {
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        var month = day * 30;

        var time1 = new Date().getTime()//当前的时间戳
        var time2 = Date.parse(new Date(stringTime))//指定时间的时间戳
        var time = time1 - time2

        var result = null
        if (time < 0) {
          return
        } else if (time / month >= 1) {
          result = "" + parseInt(time / month) + "个月前"
        } else if (time / week >= 1) {
          result = "" + parseInt(time / week) + "周前"
        } else if (time / day >= 1) {
          result = "" + parseInt(time / day) + "天前"
        } else if (time / hour >= 1) {
          result = "" + parseInt(time / hour) + "小时前"
        } else if (time / minute >= 1) {
          result = "" + parseInt(time / minute) + "分钟前"
        } else {
          result = "刚刚"
        }
        return result
      }
    }
  }
</script>

<style scoped>
  .color-yellow {
    color: gold;
  }

  .top-part {
    box-sizing: border-box;
    height: 14rem;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 1rem 0;
    display: flex;
    position: relative;
  }

  .book-cover {
    height: 100%;
    width: 9.2rem;
    margin: 0 2rem 0 1rem;
  }

  .book-cover img {
    width: 100%;
    height: 100%;
  }

  .book-detail {
    height: 100%;
    width: 25rem;
    flex: 1;
  }

  .book-name {
    margin-top: 1rem;
    font-size: 2rem;
    letter-spacing: .2rem;
    font-weight: bold;
    color: #ffffff;
    /*设置文本溢出显示省略号*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .book-author {
    display: inline-block;
    font-size: 1.4rem;
    font-weight: bold;
    color: #fffd1e;
    margin: 1rem 1rem 1rem 0;
  }

  .book-from {
    font-size: 1.2rem;
    color: #d1d1d1;
  }

  .book-words {
    font-size: 1.4rem;
    color: #fffd1e;
    margin: 1rem 1rem 1rem 0;
  }

  .book-serial {
    font-size: 1.2rem;
    color: #F56C6C;
  }

  .add-button {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    background-color: #ffffff;
    width: 6rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    border: .2rem solid #F56C6C;
    border-radius: 2.5rem;
    color: #F56C6C;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .popularity-part {
    box-sizing: border-box;
    height: 7.6rem;
    background: #ffffff;
    padding: 2rem 0;
    display: flex;
  }

  .grade {
    display: inline-block;
    width: 10rem;
    height: 100%;
    margin: 0 0 0 2rem;
    vertical-align: top;
  }

  .rate-num {
    font-size: 1.6rem;
    font-weight: bold;
    color: #909399;
  }

  .star-group {
    display: inline-block;
    margin-left: .5rem;
  }

  .star-group li {
    display: inline-block;
    font-size: 1.4rem;
  }

  .star-people {
    font-size: 1rem;
    color: #909399;
  }

  .pop-detail {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    color: #909399;
  }

  .pop-detail span {
    font-size: 1.2rem;
  }

  .retention-ratio, .lately-follower-num, .total-follower-num {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .intro-part {
    box-sizing: border-box;
    margin-top: 1rem;
    padding: 1rem;
    background-color: #ffffff;
    position: relative;
  }

  .intro-title {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: .5rem;
  }

  .tags-group li {
    display: inline-block;
    font-size: 1.2rem;
    margin: .5rem 1rem 0 0;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.09);
    color: rgba(0, 0, 0, 0.4);
    padding: 0 .5rem;
  }

  .short-desc {
    margin-top: 1rem;
  }

  .open-desc {
    display: block;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.4);
    text-align: right;
    font-size: 1.2rem;
    margin-right: .5rem;
  }

  .open-desc.hide {
    display: none;
  }

  .short-desc-content {
    font-size: 1.2rem;
    letter-spacing: .1rem;
    margin-bottom: 2rem;
  }

  .short-desc-content.hide {
    /*设置文本溢出显示省略号*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }


  .catalog-title {
    font-size: 1.4rem;
    position: absolute;
    left: 1rem;
    bottom: .5rem;
  }

  .update-time {
    font-weight: bold;
    color: rgba(255, 0, 0, .8);
    margin-right: 1rem;
    vertical-align: bottom;
  }

  .update-info {
    font-size: 1.2rem;
    position: absolute;
    right: 1rem;
    bottom: .5rem;
  }

  .last-chapter {
    display: inline-block;
    width: 13rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
  }

  .short-comment {
    box-sizing: border-box;
    padding: 0 1rem;
    margin-top: 1rem;
    background-color: #ffffff;
  }

  .short-comment-title {
    display: block;
    height: 3.6rem;
    font-size: 1.6rem;
    line-height: 3.6rem;
    font-weight: bold;
  }

  .check-all-short span {
    display: block;
    text-align: center;
    color: rgba(255, 0, 0, .8);
    font-size: 1.4rem;
    height: 3.6rem;
    line-height: 3.6rem;
  }

  .user-info {
    height: 2.5rem;
    line-height: 2.5rem;
    margin: .5rem 0 .2rem 0;
  }

  .avatar {
    display: inline-block;
    vertical-align: top;
  }

  .avatar img {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: 1px solid #000000;
  }

  .nickname {
    display: inline-block;
    font-size: 1.4rem;
    font-weight: bold;
    margin: 0 1rem;
  }

  .user-level {
    display: inline-block;
    font-size: 1rem;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.09);
    color: rgba(0, 0, 0, 0.4);
    padding: 0 .5rem;
  }

  .user-star-group li {
    display: inline-block;
    font-size: 1.2rem;
  }

  .comment-content {
    display: block;
    height: 4rem;
    font-size: 1.4rem;
    /*设置文本溢出显示省略号*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .copyright {
    box-sizing: border-box;
    background-color: #ffffff;
    margin-top: 1rem;
    padding: 1rem;
  }

  .copyright-title {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .copyright-content {
    margin-top: .5rem;
    font-size: 1.2rem;
  }
</style>