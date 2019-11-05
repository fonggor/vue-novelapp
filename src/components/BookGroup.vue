<template>
  <div class="bookgroup-container">
    <div class="top-nav" ref="nav">
      <div class="nav-item active" @click="changeTab(0)">推荐</div>
      <div class="nav-item" @click="changeTab(1)">男频</div>
      <div class="nav-item" @click="changeTab(2)">女频</div>
    </div>

    <div class="group-list">
      <div class="group-item" v-for="item in groupList" :key="item._id">
        <div class="group-info">
          <p class="info-title">{{item.title}}</p>
          <p class="info-desc">{{item.desc}}</p>
          <p class="info-count">
            <span class="book-count">{{item.bookCount}}本</span>
            <span class="collector-count">{{item.collectorCount | toWan}}收藏</span>
          </p>
        </div>

        <div class="group-cover">
          <div class="front-cover">
            <img :src="'http://statics.zhuishushenqi.com'+item.covers[0]" alt="">
          </div>
          <div class="left-cover">
            <img :src="'http://statics.zhuishushenqi.com'+item.covers[1]" alt="">
          </div>
          <div class="right-cover">
            <img :src="'http://statics.zhuishushenqi.com'+item.covers[2]" alt="">
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
        groupList: [],
        tabIndex: 0
      }
    },
    methods: {
      changeTab(num) {
        this.getLists(num)
        var nav = this.$refs.nav.children
        for (var i = 0; i < nav.length; i++) {
          nav[i].className = 'nav-item'
        }
        nav[num].className = 'nav-item active'
      },
      getLists(tabIndex) {
        const loading = this.$loading({
          lock: true,
          text: '书籍加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
        })

        if (tabIndex === 0) {
          this.$http.get('/booklists?sort=collectorCount&duration=last-seven-days&start=0')
            .then(res => {
              this.groupList = res.data.bookLists
            })
            .then(() => {
              loading.close()
            })
        } else if (tabIndex === 1) {
          this.$http.get('/booklists?gender=male&sort=collectorCount&duration=all')
            .then(res => {
              this.groupList = res.data.bookLists
            })
            .then(() => {
              loading.close()
            })
        } else if (tabIndex === 2) {
          this.$http.get('/booklists?gender=female&sort=collectorCount&duration=all')
            .then(res => {
              this.groupList = res.data.bookLists
            })
            .then(() => {
              loading.close()
            })
        }
      }
    },
    mounted() {
      this.getLists(0)
    }
  }
</script>

<style scoped>
  .bookgroup-container {
    height: 100%;
  }

  .top-nav {
    display: flex;
    height: 3.6rem;
  }

  .nav-item {
    flex: 1;
    height: 3.6rem;
    line-height: 3.6rem;
    text-align: center;
    font-size: 1.4rem;
    color: #909399;
    border-bottom: .2rem solid rgba(144, 147, 153, 0.3);
  }

  .nav-item.active {
    border-bottom: .2rem solid #F56C6C;
    color: #F56C6C;
  }

  .group-item {
    display: flex;
    box-sizing: border-box;
    height: 10rem;
    padding: 1rem;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .group-info {
    flex: 1;
    position: relative;
  }


  .group-cover {
    width: 14rem;
    position: relative;
  }

  .group-cover img {
    height: 100%;
    width: 100%;
  }

  .front-cover {
    width: 6rem;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99
  }

  .left-cover {
    width: 5rem;
    height: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-120%) translateY(-50%);
    z-index: 98;
  }

  .right-cover {
    width: 5rem;
    height: 80%;
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translateX(120%) translateY(-50%);
    z-index: 98;
  }

  .info-title {
    font-size: 1.4rem;
    font-weight: bold;
    /*设置文本溢出显示省略号*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .info-desc {
    margin: .5rem 0;
    /*设置文本溢出显示省略号*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .info-count, .info-desc {
    color: rgba(0, 0, 0, .6);
    font-size: 1.2rem;
  }

  .info-count {
    position: absolute;
    bottom: .2rem;
  }

  .book-count {
    padding-right: 0.5rem;
    border-right: 1px solid #cccccc;
  }

  .collector-count {
    margin-left: .5rem;
  }
</style>