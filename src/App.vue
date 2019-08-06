<template>
  <div id="app" :class="audio.data ? 'musicBar-on':'' ">
    <keep-alive>
      <router-view />
    </keep-alive>
    
    <MusicBar />
    <!-- 加载进度条 -->
    <vue-progress-bar></vue-progress-bar>
    
  </div>
</template>

<script>
	import MusicBar from '@/components/MusicBar'

	export default {
      components: {
      	MusicBar
      },
      computed: {
        audio() {
        	return this.$store.state.audio
        }
      }
	}
</script>

<style scoped>
  .musicBar-on{
  	padding-bottom: 96px;
  }
</style>
