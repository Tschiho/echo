import axios from 'axios';
import app from '../main';

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 20000
})

instance.interceptors.request.use(function(config){
  app.$Progress.start()
  return config
}, function(error){
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
   app.$Progress.finish()
   return response
}, error => Promise.reject(error))

const getBanner = async function(){
  const res = await instance.get('/banner')
  return res
}

const getList =async function(page){
  const res = instance.get(`/list?page=${page}`)
  return res
	
}

const getDetail = async function(id){
	const res = await instance.get(`/detail?id=${id}`)
	return res
}

const getOther = async function(){
	const res = await instance.get('/other')
	return res
}

export { getBanner, getList, getDetail, getOther }