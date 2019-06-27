import { Get,Post,Delete,Put,ApiAxios } from '@/utils/http_factory.js'

//demo
function initData(data,method,url){
  if(method.toUpperCase() === 'DELETE') return '';
  return JSON.stringify(JSON.stringify(data));
}
function initUrl(data,method,url){
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
  ALLOT:'/api-1.0/allot/',
  ALLOT_CONFIRM:'/api-1.0/allot/confirm/',
  BORROW:'/api-1.0/borrow/',
  BORROW_CONFIRM:'/api-1.0/borrow/confirm/',
  GIVEBACK:'/api-1.0/borrow/give-back/',
  GIVEBACK_CONFIRM:'/api-1.0/borrow/give-back-confirm/',
  USER:'/api-1.0/user/',
  ROLE:'/api-1.0/rbac/',
  DEPARTMENT:'/api-1.0/department/',
  UPLOAD:'/api-1.0/upload/',
  ASSET_TYPE:'/api-1.0/asset-class/',
  BACK_CONFIRM:'/api-1.0/cancel-confirm/',
  RECEIVE:'/api-1.0/recipient/'
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
  asset_type:(method,data)=>{
    let res = initPhpApi(data,method,URLS.ASSET_TYPE);
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
  },
  allotconfirm:(method,data)=>{
    let res = initPhpApi(data,method,URLS.ALLOT_CONFIRM);
    return ApiAxios(res.method,res.url,res.data)
  },
  borrow:(method,data)=>{
    let res = initPhpApi(data,method,URLS.BORROW);
    return ApiAxios(res.method,res.url,res.data)
  },
  borrowconfirm:(method,data)=>{
    let res = initPhpApi(data,method,URLS.BORROW_CONFIRM);
    return ApiAxios(res.method,res.url,res.data)
  },
  giveback:(method,data)=>{
    let res = initPhpApi(data,method,URLS.GIVEBACK);
    return ApiAxios(res.method,res.url,res.data)
  },
  givebackconfirm:(method,data)=>{
    let res = initPhpApi(data,method,URLS.GIVEBACK_CONFIRM);
    return ApiAxios(res.method,res.url,res.data)
  },
  user:(method,data)=>{
    let res = initPhpApi(data,method,URLS.USER);
    return ApiAxios(res.method,res.url,res.data)
  },
  role:(method,data)=>{
    let res = initPhpApi(data,method,URLS.ROLE);
    return ApiAxios(res.method,res.url,res.data)
  },
  department:(method,data)=>{
    let res = initPhpApi(data,method,URLS.DEPARTMENT);
    return ApiAxios(res.method,res.url,res.data)
  },
  receive:(method,data)=>{
    let res = initPhpApi(data,method,URLS.RECEIVE);
    return ApiAxios(res.method,res.url,res.data)
  },
  backconfirm:(method,data)=>{
    let res = initPhpApi(data,method,URLS.BACK_CONFIRM);
    return ApiAxios(res.method,res.url,res.data)
  }

}



export default {
	Home,
  Asset
}


