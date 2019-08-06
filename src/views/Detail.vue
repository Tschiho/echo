<template>
	<div class="detail">
		<div class="detail-container" v-if="audio.data">
		  <div class="detail-creater">
		  	<div class="creater-left">
		  		<img class="avator" :src="audio.data.sound.user.avatar_50"  />
		  		<span>{{ audio.data.sound.user.name }}</span>
		  	</div>
		  	<div class="creater-right">
		  		<span>粉丝</span>
		  		<span class="fan-num">{{ audio.data.sound.user.followed_count }}</span>
		  	</div>
		  </div>

		  <div class="detail-cover">
		    <img class="cover-img" :src="audio.data.sound.pic_500" />
		    <div class="danmu" @click="SET_AUDIO_PLAY(!audio.play)"></div>
		    <div class="progress-bar">
		    	<div class="progress-time">{{ audio.currentTime | formatSecond }}/{{ audio.duration | formatSecond }}</div>	    	
		    	<div class="progress-line" :style="{width: audio_progress + '%'}"></div>
		    	<input class="progress-slider" :value="audio_progress" type="range" step="0.1" max="100" min="0" @input="handleSeek" @touchend="endSeek"/>
		    </div>

		    <div class="control">
		      <div class="control-btn" :class="audio.play? 'pause' : 'play'" @click="SET_AUDIO_PLAY(!audio.play)"></div>
		      <div class="control-info">
		      	<div class="info-tit">{{ audio.data.sound.name }}</div>
		      	<div class="info-desc"><span style="color: #7dd97f;">{{ audio.data.sound.user.name }}</span>发布在<span style="color: #7dd97f;">{{ audio.data.sound.channel.name }}</span>频道</div>
		      </div>
		    </div>		    		    
		  </div>

          <div class="detail-info">
              <div class="info-left">
                <span class="iconfont my-icon-play sm-icon"></span>
                <span class="sm-word">{{ audio.data.sound.view_count }}</span>
                <span class="iconfont my-icon-like sm-icon"></span>
                <span class="sm-word">{{ audio.data.sound.like_count }} 喜欢</span>
              </div>
              <div class="info-right">
                <span class="iconfont my-icon-bell the-bell"></span>
                <span>设为手机铃声</span>
              </div>    
            </div>

            <div class="detail-lyric">
                
            </div>

          <div class="detail-other">
                <div class="other-tit"><span>相关推荐</span></div>
                <div class="other-rec">
                    <MusicList :list="recList"></MusicList>
                </div>
            </div>	
		</div>
	</div>
 
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
	import MusicList from '@/components/MusicList'
	import { getDetail, getOther } from '@/api'
	import { debounce } from '@/utils'

	export default {
		name: 'detail',
		components: {
          MusicList,
          tmpCurrentTime: 0
		},
		created(){
           this.getMusicDetail()
           this.getMusic()
		},
		data() {
			return {
              recList: null,
              percent: 0
			}
		},
		watch: {
          '$route' (to, from) {
          	 if(this.$route.path.includes('detail')){
          	 	this.getMusicDetail()
          	 	//this.getMusic()
          	 }
          }
		},
		computed: {
			...mapState([
             'audio'   
		    ]),
		    ...mapGetters([
		    	'audio_progress',
                'change'
		    	])
		},
        filters: {
            formatSecond: function(val) {
              const time = Math.round(val)
              let m = Math.floor(time / 60)
              let s = Math.floor(time % 60)

              m = m< 10? `0${m}` : `${m}`
              s = s< 10? `0${s}` : `${s}`

              return `${m}:${s}`
            }
        },
		methods: {
            ...mapMutations([
              'SET_AUDIO_DATA',
              'SET_AUDIO_PLAY',
              'SET_CHANGE_FLAG',
              'SET_AUDIO_CURRENT_TIME'
                ]),
			getMusicDetail() {
				const id = this.$route.query.id
				getDetail(id).then(({data}) => {
					//this.detail = data.data
                    this.SET_AUDIO_DATA(data.data)
				})
			},
			getMusic() {
				getOther().then(({data}) => {
					this.recList = data.data
				})
			},
            handleSeek(evt) {       
              this.SET_CHANGE_FLAG(true)
              
              //console.log(evt.target.value)
              const val = evt.target.value
              const time = this.audio.ele.duration * val / 100
              this.tmpCurrentTime = time
              this.SET_AUDIO_CURRENT_TIME(time)
    
            },
            endSeek(evt) {
              this.audio.ele.currentTime = this.tmpCurrentTime
              this.SET_CHANGE_FLAG(false)
                
            }
			
		}
	}
</script>

<style scoped>
input[type=range] {
-webkit-appearance: none; /* 隐藏滑块，以便自定义滑块样式 */
background-color: transparent;
}

input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                cursor: default;
                top: -5px;
                height: 30px;
                width: 12px;
                background: #6ed56c;
            }
	.detail-creater{
	  padding: 0 30px;
	  height: 110px;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}

	.creater-left{
		display: flex;
	    align-items: center;
	}

	.creater-right > span{
		font-size: 14px;
	}

	.fan-num{
		color: #00ae05;
		margin-left: 12px;
	}

	.detail-cover{
		width: 100%;
		height: 750px;
		position: relative;
	}

	.avator{
		width: 72px;
		height: 72px;
		border-radius: 50%;
		border: 1px solid #eee;
		margin-right: 12px;
	}

	.danmu{
		width: 100%;
		height: 600px;
		position: absolute;
    	top: 0;
    	left: 0;
	}

    .cover-img{
    	width: 100%;
    	height: 100%;
    	object-fit: cover;
    }

    .progress-bar{
    	width: 100%;
    	height: 30px;
    	background-color: rgba(0,0,0,.2);
    	position: absolute;
    	bottom: 120px;
    }

    .progress-time{
    	margin-left: 20px;
    	color: #fff;
    	font-size: 20px;
    }

    .progress-line{
    	-webkit-appearance: none;
    	position: absolute;
    	top: 0;
    	left: 0;
    	height: 100%;
    	background: rgba(110,213,108,.2);
    }

    .progress-slider{
    	position: absolute;
    	left: 0;
    	top:0;
    	width: 100%;
    	height: 100%;
    	
    }

    .control-btn{
    	width: 76px;
    	height: 76px;
    	border-radius: 50%;
    	margin-right: 24px;
    }

    .control-btn.play{
    	background: url(../assets/img/play.png);
    	background-size: cover;
    }

    .control-btn.pause{
        background: url(../assets/img/pause.png);
        background-size: cover;
    }

    .control{
    	position: absolute;
    	bottom: 0;
    	left: 0;
    	width: 100%;
    	height: 120px;
    	background-color: rgba(0,0,0,.5);
    	padding: 0 24px;
    	display: flex;
    	align-items: center;
    	box-sizing: border-box;
    }

    .control-info{
    	color: #fff;
    }

    .info-tit{
    	font-size:28px;
    }

    .info-desc{
    	font-size: 20px;
    	margin-top: 10px;
    }

    .detail-info{
    	display: flex;
    	justify-content: space-between;
    	align-items: center;
    	padding: 0 32px;
    	height: 90px;
    	border-bottom: 1px solid #f4f4f4;
    }

    .info-left{
    	flex: 1;
    	display: flex;
    	align-items: center;    	
    	
    }

    .sm-word{
    	font-size: 20px;
    }

    .info-left span:nth-child(2){
    	margin-right: 16px;
    }

    .sm-icon{
    	margin-right: 12px; 
    }

    .info-right{
    	color: #7dd97f;
    }

    .the-bell{
    	display: inline-block;
    	transform: rotate(-15deg);
    	font-size: 40px;
    	vertical-align: middle;
    }

    .info-right span:last-child{
    	font-size: 20px;
    }

    .other-tit{
    	text-align: center;
    	padding: 24px 0 40px;
    	
    }

    .other-tit span{
    	padding-bottom: 10px;
    	color: rgb(110, 213, 108);
    	border-bottom: 1px solid rgb(110, 213, 108);
    	font-size: 24px;
    }

</style>
