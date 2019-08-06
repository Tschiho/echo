<template>
  <div class="home" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
   <MusicBanner :list="bannerlist"></MusicBanner>
   
   <div class="main-content">
     <div class="title">echo每日推荐</div>
     <div class="playAll iconfont" @click="playAll">
     	<div class="icon-play my-icon-arrow"></div>
     	<div class="play-text">一键播放</div>
     </div>
   </div>
   
   <MusicList :list="musicList"></MusicList>

   <BottomTip :loading="tipsType"></bottomTip>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations } from 'vuex'
import MusicBanner from '@/components/MusicBanner.vue'
import MusicList from '@/components/MusicList.vue'
import BottomTip from '@/components/BottomTip.vue'
import { getBanner, getList } from '@/api'
import playMode from '@/utils/playMode'

export default {
  name: 'home',
  components: {
    MusicBanner,
    MusicList,
    BottomTip
  },
  data() {
  	return {
  	  page: 1,
      bannerlist: [],
      musicList: [],
      loading: false,
      tipsType: 'loading'
  	}
  },
  created() {
  	this.getBannerData()
  	this.getMusicList()
  },
  methods: {
  	...mapMutations([
       'SET_PLAY_LIST',
       'SET_PLAY_MODE',
       'SET_AUDIO_DATA'
  		]),
    getBannerData() {
      getBanner().then(({data}) => {
      	this.bannerlist = data.data
      })
    },
    getMusicList() {
    	//this.$loading.open()
    	return getList(this.page).then(({data}) => {
    		if(data.data.length){
    			this.musicList = [...this.musicList, ...data.data]
    			this.page++;
    		}else{
    			this.tipsType = 'empty'
    		}

    		//this.$loading.close()
    		
    	})
    },
    loadMore() {
    	if(this.tipsType != 'empty'){
          this.loading = true
		  this.getMusicList().then(() => {
			this.loading = false
			
		  })
    	}
		
		
	},
	playAll() {
      this.SET_PLAY_LIST(this.musicList)

      this.SET_PLAY_MODE(playMode.listRepeat.value)
      this.SET_AUDIO_DATA(this.musicList[0])
	}
  }
}
</script>

<style scoped>
.main-content{
	background-color: #fff;
	position: relative;
}

.main-content .title{
  width: 240px;
  height: 52px;
  line-height: 52px;
  color: #639e5e;
  background-color: #d6ffd6;
  margin: 40px auto;
  font-size: 14px;
  text-align: center;
  border-radius: 26px;
}

.playAll{
  position: absolute;
  left: 0;
  top: 120px;
  z-index: 10;
  display: flex;
  width: 212px;
  height: 56px;
  justify-content: center;
  align-items: center;
  color: #6ed56c;
  background-color: #6ed56c;
  border-radius: 32px;
}

.icon-play{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 12px;
}

.play-text{
	color: #fff;
}
</style>
