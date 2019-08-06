<template>
	<div class="popup" :class="playModeVisible? 'showMask' : ''">
	  <mt-popup class="playListSheet" v-model="playListVisible" position="bottom">
	  	<div class="playList-header">
	  	  <div class="playList-mode-btn left" @click="clearablePlayList">清空</div>
          <div class="playList-title">播放列表<span class="playList-count">({{playList.length}}首)</span></div>
          <div class="playList-mode-btn right iconfont my-icon-more" @click="playModeVisible = true"></div>
        </div>

        <ul class="playList" v-if="playList && playList.length > 0">
          <li class="playList-item" v-for="(item, index) in playList" @click="musicChange(item)">
          	<div class="item-name">
          	  <div class="iconfont play-icon" :class="audio.data.sound.id === item.sound.id? 'my-icon-circle-play' : 'small-icon'"></div>
          	  <div class="play-name">{{ item.sound.name }}</div>
          	</div>
          </li>
        </ul>

        <div class="playList-nothing" v-else>什么都没有T T~</div>
	  </mt-popup>

	  <mt-popup class="playModeSheet" v-model="playModeVisible" position="bottom">
	  	 <mt-cell class="playMode-item iconfont" v-for="item in playModeOptions" :title="item.label" :class="{ active: item.value === playMode}" @click.native="changeMode(item.value)">
	  	 	<span :class="item.icon" class="item-icon"></span>
	  	 </mt-cell>
	  </mt-popup>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { ArrayOptions } from '@/utils/playMode'

	export default {
		data() {
			return {
			  playModeOptions: ArrayOptions,
              playListVisible: false,
              playModeVisible: false
			}
		},
		computed: {
			...mapState([
               'playList',
               'audio',
               'playMode'
				])
		},
		methods: {
			...mapMutations([
              'SET_PLAY_LIST',
              'SET_AUDIO_DATA',
              'SET_PLAY_MODE'
				]),
			toggleVisible() {
				this.playListVisible = !this.playListVisible
			},
			clearablePlayList() {
				this.SET_PLAY_LIST([])
				this.SET_AUDIO_DATA(null)
			},
			musicChange(item) {
				this.SET_AUDIO_DATA(item)
			},
			changeMode(val){
				this.playModeVisible = false
				this.SET_PLAY_MODE(val)
			}
		}
	}
	
</script>

<style>
	.popup .v-modal{
		opacity: 0;
	}

	.popup.showMask .v-modal{
		opacity: 0.5;
	}

	.playListSheet{
		width: 100%;
		bottom: 99px;
	}

	.playList-header{
       height: 72px;
       font-size: 20px;
       display: flex;
	   justify-content: space-between;
	   align-items: center;
	   padding: 0 36px;
	   color: #6ed56c;
	}

	.playList-mode-btn.right{
		font-size: 40px;
	}

	.playList-item .play-icon{
		color: #6ed56c;
		font-size: 32px;
		margin: 0 20px;
	}

	.play-name{
		font-size: 26px;
	}

	.playList-item{
		display: flex;
		justify-content: space-between;
		padding: 12px 10px;
	}

	.item-name{
		display: flex;
		align-items: center;
	}

	.small-icon{
		width: 36px;
		height: 36px;
	}

    .playList-nothing{
    	text-align: center;
    	line-height: 50px;
    }

    .playList{
    	max-height: 270px;
    	overflow-y: auto;
    }

    .playModeSheet{
    	width: 100%;
    	z-index: 10000 !important;
    	padding: 16px 0;
    }

    .playMode-item{
    	padding: 0 32px;
    	min-height: 96px;
    	font-size: 36px;
    }

    .item-icon{
       font-size: 36px;
    }

    .playMode-item.active, .playMode-item.active .item-icon{
    	color: #6ed56c;
    }


</style>