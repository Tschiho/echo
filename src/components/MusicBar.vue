<template>
  <div class="musicBar" v-if="audio_data">
  	<div class="musicBar__content">
  	  <audio autoplay="autoplay" id="audio" :src="audio_data.sound.source"></audio>
  	  <img class="music-cover" :src="audio_data.sound.pic_500"/>
  	  <router-link class="info-wrp" :to="{ path: 'detail', query: { id: audio_data.sound.id }}">
	  	<div class="music-info">
	  	  <div class="music-name">{{audio_data.sound.name}}</div>
	  	  <div class="singer-name">{{ audio_data.sound.user.name }}</div>
	  	</div>
  	  </router-link>
  	  <div class="music-control">
  	  	<div class="iconfont my-icon-menu" @click="$refs.popup.toggleVisible()"></div>
  	  	<div class="iconfont" :class="audio_play? 'my-icon-pause' : 'my-icon-arrow'" @click="SET_AUDIO_PLAY(!audio_play)"></div>
  	  	<div class="iconfont my-icon-next" @click="nextPlay"></div>
  	  	
  	  </div>
  	</div>

  	<div class="progress-bar">
  		<div class="bar-inner" :style="{ width: audio_progress + '%'}"></div>
  	</div>

  	<appPopup ref="popup" v-if="audio_data"/>
  	
  </div>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	import appPopup from '@/components/Popup'
	export default {
		name: 'music-bar',
		data() {
			return {}
		},
		components: {
			appPopup
		},
		computed: {
          ...mapState({
          	audio_ele: state => state.audio.ele,
          	audio_data: state => state.audio.data,
          	audio_play: state => state.audio.play
          }),
          ...mapState([
            'playMode',
            'playList'
          	]),
          ...mapGetters([
            'audio_progress',
            'change'
          	])
		},
		watch: {
          audio_data(val) {
            if(val){
            	this.$nextTick(function(){
            	   this.AddToPlayList(val)
                   this.audioInit()

            	})
            }
          },
          audio_play(val){
             val? this.audio_ele.play() : this.audio_ele.pause()           
          }
		},
		methods: {
		  ...mapMutations([
		  	 'SET_AUDIO_DATA',
             'SET_PLAY_LIST',
             'SET_AUDIO_ELE',
             'SET_AUDIO_DURATION',
             'SET_AUDIO_CURRENT_TIME',
             'SET_AUDIO_PLAY',
             'SET_CHANGE_FLAG'
		  ]),
          audioInit() {
            let _audio = this.$el.querySelector('#audio');
            this.SET_AUDIO_ELE(_audio)
           
            _audio.oncanplay = () => {
              let promise = _audio.play()
              if(promise !== undefined){
                promise.then(() => {
                  _audio.play() 
                }).catch(() => {
                  alert('请点击播放按钮!');
                })           
              }

              this.SET_AUDIO_DURATION(_audio.duration)
          }

              _audio.ontimeupdate = () => {
                if(!this.change){
                    this.SET_AUDIO_CURRENT_TIME(_audio.currentTime)
                }
              	
              }

	            _audio.onplay = () => {
	              this.SET_AUDIO_PLAY(true)
	            }

	            _audio.onpause = () => {
	            	this.SET_AUDIO_PLAY(false)
	            }

	            _audio.onended = () => {
	               //this.SET_AUDIO_PLAY(false)

	               switch(this.playMode) {
	               	  case 'random':
	               	    this.randomPlay()
                        break
                      case 'singleRepeat':
                        this.singleRepeatPlay()
                        break
                       case 'listRepeat':
                        this.playInOrder()
                        break
                        default:
                          this.playInOrder()
                          
	               }
	            }
            },
            playInOrder(){

            	if(this.playList.length > 1){
            		const index = this.playList.findIndex((ele) => {
            			return this.audio_data.sound.id == ele.sound.id
            		})
                    
                    if(index > -1 && this.playMode === 'default' && index !== this.playList.length - 1){
                       this.SET_AUDIO_DATA(this.playList[index+1])
                    }

            		if(index > -1 && this.playMode === 'listRepeat'){
            			let nextIndex = index == this.playList.length - 1? 0 : index + 1
            			this.SET_AUDIO_DATA(this.playList[nextIndex])
            		}

            	}
            	
            },
            randomPlay() {
              const index = ~~(Math.random() * this.playList.length)
              
              //const isCurr = this.playList[index].sound.id === this.audio_data.sound.id
              
              this.SET_AUDIO_DATA(this.playList[index])
              
              

            },

            singleRepeatPlay() {
            	this.audio_ele.load()
            	this.audio_ele.play()
            },
            nextPlay() {
            	switch(this.playMode) {
	               	  case 'random':
	               	    this.randomPlay()
                        break
                       case 'listRepeat':
                        this.playInOrder()
                        break
                       default:
                          this.playInOrder()
	               }
            },
          AddToPlayList(item) {
            let isExist = false

            if(this.playList.find(n => n.sound.id === item.sound.id)){
            	isExist = true
            }

            if(!isExist){
              this.playList.unshift(item)
              this.SET_PLAY_LIST(this.playList)
            }
          }
		}
	}
</script>

<style scoped>
	.musicBar{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;	
	}

	.musicBar__content{
		height: 96px;
		background: #fff;
		display: flex;
		padding:0 12px;
		position: relative;
		z-index: 9999;
		justify-content: space-around;
		align-items: center;
	}

	.music-cover{
		width: 68px;
		height: 68px;
	}

	.music-info{
		flex: 1;
		padding: 0 15px;
		overflow: hidden;
		font-size: 28px;
	}

	.info-wrp{
		overflow: hidden;
		color: #555;
	}

	.music-name{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.music-control{
		display: flex;
	}

	.music-control > div{
		width: 64px;
		height: 64px;
		text-align: center;
		line-height: 64px;
		font-size: 44px;
		color: #555;
		border-radius: 50%;
		border: 1px solid #555;
		margin: 0 16px;
	}

	.progress-bar{
		height: 1px;
		background-color: hsla(0,0%,100%,.9)
	}

	.bar-inner{
		height: 100%;
		background-color: #6ed56c;
	}


</style>