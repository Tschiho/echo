import Vue from 'vue'
import Vuex from 'vuex'
import playMode from '@/utils/playMode'
import { SET_AUDIO_DATA, SET_AUDIO_PLAY, SET_AUDIO_DURATION, SET_AUDIO_CURRENT_TIME, SET_PLAY_MODE, SET_PLAY_LIST, SET_AUDIO_ELE, 
   SET_CHANGE_FLAG, SET_CHANGE_TIME} from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audio: {
      ele: null,
      data: null,
      play: false,
      duration: 0,
      currentTime: 0
    },
    playMode: playMode.default.value,
    playList: [],
    tmpCurrentTime: 0,
    change: false //播放时间还是更改时间
  },
  getters: {
    audio_progress: state => {
      return (state.audio.currentTime / state.audio.duration * 100 ).toFixed(2)
    },
    change: state => {
      return state.change
    },
    tmp_CurrentTime: state => {
      return state.tmpCurrentTime
    }
  },
  mutations: {
    [SET_AUDIO_ELE](state, val){
      state.audio.ele = val
    },
    [SET_AUDIO_DATA](state, val){
      state.audio.data = val
    },
    [SET_AUDIO_PLAY](state, val){
      state.audio.play = val
    },
    [SET_AUDIO_DURATION](state, val) {
    	state.audio.duration = val
    },
    [SET_AUDIO_CURRENT_TIME](state, val){
    	state.audio.currentTime = val
    },
    [SET_PLAY_MODE](state, val) {
      state.playMode = val
    },
    [SET_PLAY_LIST](state,val){
      state.playList = val.slice()
    },
    [SET_CHANGE_FLAG](state, val){
      state.change = val
    },
    [SET_CHANGE_TIME](state, val){
      state.tmpCurrentTime = val
    }

  },
  actions: {
  
  }
})
