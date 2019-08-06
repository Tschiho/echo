<template>
  <div class="bt-container">
  	  <div class="ltp" v-if="loading == 'loading'">
  	    <mt-spinner type="fading-circle" :size="20" color="#639e5e"></mt-spinner>
  	    <span class="tip" >加载中...</span>
  	  </div>
  	  
  	  <div v-else-if="loading == 'empty'">
  	  	<span class="tip">我也是有底线的~~</span>
  	  </div>

  </div>
</template>

<script>
	export default {
		name: 'bottomTip',
		props: {
			loading: String,
			required: true
		}
	}
</script>

<style scoped>
	.bt-container{
		display: flex;
		justify-content: center;
		margin: 20px 0;
	}

	.ltp{
		display: flex;
	}

	.tip{
		margin-left: 20px;
		color: #999;
	}
</style>