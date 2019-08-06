<template>
	<div class="banner">
     <mt-swipe :auto="4000">
       <mt-swipe-item v-for="item in list">
       	  <router-link :to="{ path: 'detail', query: { id: item.sound.id }}">
       	  	<img :src="item.sound.pic_640">
       	  </router-link>
       </mt-swipe-item>
     </mt-swipe>
   </div>
</template>

<script>
	export default {
		name: 'banner',
		props: {
			list: Array,
			default() {
				return []
			},
			required: true
		}
	}
	
</script>

<style scoped>
.banner{
  padding:20px 20px 0;
  height: 300px;
  background-color: #e8e8e8;
}

.banner a{
	display: block;
}

.banner img {
  width: 100%;
}
</style>