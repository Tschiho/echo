<template>
  <div class="rec-wrap">
  	<ul class="rec-list clx">
  	  <li class="rec-item" v-for="(item, index) in list" :key="index">
  	  	<router-link :to="{ path: 'detail', query: {id: item.sound.id }}">
  	  	  <div class="pic"><img :src="item.sound.pic_500"/></div>
  	  	  <div class="iconfont my-icon-hot item-fire" v-if="item.sound.is_hot" :class="item.sound.is_hot | hotClass"></div>
          <div class="title">{{ item.sound.name}}</div>
          <div class="other">
        	<span class="channel-name">{{ item.sound.channel.name}}</span>
        	<span class="channel-label">频道</span>
          </div> 
  	  	</router-link>
           
      </li>	
  	</ul>
    
  </div>
</template>

<script>
	export default {
		name: 'music-list',
		props: {
			list: Array,
            default() {
            	return []
            },
            required: true
		},
		filters: {
			hotClass(value) {
              if(!value) return;

              switch(value) {
              	case 1: 
              	  return 'hot-red'
              	case 3:
              	  return 'hot-yellow'
              	case 4:
              	  return 'hot-blue'
              }
			}
		}
	}
</script>

<style scoped>
.rec-wrap{
	padding:0 10px;
}

.rec-list{
	
}

.rec-item{
   width: 50%;
   float: left;
   padding: 0 10px;
   margin-bottom: 14px;
   box-sizing: border-box;
   position: relative;
}

.rec-item .pic img{
	width: 100%;
}

.title{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: #555;
	font-size: 20px;
	margin:4px 0 10px;
}

.other{
  font-size: 16px;
  display: flex;
}

.channel-name{
  color: #7dd97f;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.channel-label{
  font-size: 16px;
  color: #999;
}

.item-fire{
  position: absolute;
  top: 40px;
  right: 40px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 30px;
  background-color: #fff;
  border-radius: 100%;
}

.hot-red{
	color: #ed3d57
}

.hot-yellow{
  color: #f3993e;
}

.hot-blue{
	color: #3a94f7;
}


</style>