import { Get,Post,Delete,Put,ApiAxios } from '@/utils/http_factory.js'

//demo
function initData(data,method,url){
  if(method.toUpperCase() === 'DELETE') return '';
  return JSON.stringify(JSON.stringify(data));
}
function initUrl(data,method,url){
  if(method.toUpperCase() == 'PUT' || method.toUpperCase() == 'DELETE') url += data.id;
  return url;
}
const ICP_URL = '/api/vera/icp/';



const Home = {
	detail:(data)=>{ return	Get('/api/1.0/page/flight',data) },
  getToken:(data)=>{ return Post('/Token',data,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})},
  icp:(data)=>{return Post('/api/vera/icp/',data)}
}
const Asset = {
  icp:(method,data)=>{
    let url = initUrl(data,method,ICP_URL);
    data = initData(data,method,ICP_URL);
    return ApiAxios(method,url,data)
  }
}



export default {
	Home,
  Asset
}


