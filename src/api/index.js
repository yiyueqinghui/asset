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
const URLS = {
  ICP:'/api/vera/icp/',
  CAR:'/api/vera/car/',
  ASSET:'/api/vera/item/',
  INVOICE:'/api/vera/invoice/'

}



const Home = {
	detail:(data)=>{ return	Get('/api/1.0/page/flight',data) },
  getToken:(data)=>{ return Post('/Token',data,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})}
}
const Asset = {
  icp:(method,data)=>{
    let url = initUrl(data,method,URLS.ICP);
    data = initData(data,method,URLS.ICP);
    return ApiAxios(method,url,data)
  },
  car:(method,data)=>{
    let url = initUrl(data,method,URLS.CAR);
    data = initData(data,method,URLS.CAR);
    return ApiAxios(method,url,data)
  },
  storage:(method,data)=>{
    let url = initUrl(data,method,URLS.ASSET);
    data = initData(data,method,URLS.ASSET);
    return ApiAxios(method,url,data)
  },
  invoice:(method,data)=>{
    let url = initUrl(data,method,URLS.INVOICE);
    data = initData(data,method,URLS.INVOICE);
    return ApiAxios(method,url,data)
  }

}



export default {
	Home,
  Asset
}


