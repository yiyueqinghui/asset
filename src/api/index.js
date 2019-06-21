import { Get,Post,Delete,Put,ApiAxios } from '@/utils/http_factory.js'

//demo
function initData(data,method,url){
  if(method.toUpperCase() === 'DELETE') return '';
  return JSON.stringify(JSON.stringify(data));
}
function initUrl(data,method,url){
  // if(method.toUpperCase() == 'PUT' || method.toUpperCase() == 'DELETE') url += data.id;
  // return url;
  if(method.toUpperCase() == 'PUT' || method.toUpperCase() == 'DELETE'){
    if(method.toUpperCase() == 'PUT'){
      data._method="PUT"
      method = "POST"
    }
    if(method.toUpperCase() == 'DELETE'){
      data._method="DELETE"
      method = "POST"
    }
  }
  return url;
}

function initPhpApi(data,method,url){
  // if(method.toUpperCase() == 'PUT' || method.toUpperCase() == 'DELETE') url += data.id;
  // return url;
  console.log(method + "======" + JSON.stringify(data));
  if(method.toUpperCase() == 'PUT' || method.toUpperCase() == 'DELETE' || method.toUpperCase() == 'POST'){
    if(method.toUpperCase() == 'POST'){
      data._method=""
      method = "POST"
    }
    if(method.toUpperCase() == 'PUT'){
      data._method="PUT"
      method = "POST"
    }
    if(method.toUpperCase() == 'DELETE'){
      data._method="DELETE"
      method = "POST"
    }
  }
  console.log(method);
  return {method, data, url};
}

const URLS = {
  ICP:'/api/vera/icp/',
  CAR:'/api-1.0/vehicle/',
  ASSET:'/api-1.0/asset/',
  INVOICE:'/api-1.0/invoice/',
  BRAND:'/api-1.0/trademark/',
  WORKPLACE:'/api-1.0/workplace/',
  ALLOT:'/api-1.0/allot/'
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
    let res = initPhpApi(data,method,URLS.CAR);
    return ApiAxios(res.method,res.url,res.data)
  },
  storage:(method,data)=>{
    // console.log('method===' + method)
    let res = initPhpApi(data,method,URLS.ASSET);
    return ApiAxios(res.method,res.url,res.data)
  },
  invoice:(method,data)=>{
    let res = initPhpApi(data,method,URLS.INVOICE);
    return ApiAxios(res.method,res.url,res.data)
  },
  brand:(method,data)=>{
    let res = initPhpApi(data,method,URLS.BRAND);
    return ApiAxios(res.method,res.url,res.data)
  },
  workplace:(method,data)=>{
    let res = initPhpApi(data,method,URLS.WORKPLACE);
    return ApiAxios(res.method,res.url,res.data)
  },
  allot:(method,data)=>{
    let res = initPhpApi(data,method,URLS.ALLOT);
    return ApiAxios(res.method,res.url,res.data)
  }

}



export default {
	Home,
  Asset
}


