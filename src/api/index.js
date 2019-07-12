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
  STAFF:'/api-1.0/staff',
  STAFF_CANCEL:'/api-1.0/staff/cancel',
  STAFF_CHECK:'/api-1.0/staff/check',
  ICP:'/api-1.0/icp/',
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
  BACK:'/api-1.0/cancel-confirm/',
  RECEIVE:'/api-1.0/recipient/',
  CARD:'/api-1.0/access-card/',
  MAINTENANCE:'/api-1.0/maintenance/',
  RENT:'/api-1.0/lease/',
  OCR:'/api-1.0/ocr/',

  ORG:'/api-1.0/department/',
  GRANT:'/api-1.0/rbac/perms/',
  RBACGRANT:'/api-1.0/rbac/grant/',

}



const Home = {
	detail:(data)=>{ return	Get('/api/1.0/page/flight',data) },
  getToken:(data)=>{ return Post('/Token',data,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})},
  staff:(method,data)=>{
    let res = initPhpApi(data,method,URLS.STAFF);
    return ApiAxios(res.method,res.url,res.data);
  },
  staffCancel:(method,data)=>{
    let res = initPhpApi(data,method,URLS.STAFF_CANCEL);
    return ApiAxios(res.method,res.url,res.data);
  },
  staffCheck:(method,data)=>{
    let res = initPhpApi(data,method,URLS.STAFF_CHECK);
    return ApiAxios(res.method,res.url,res.data);
  },
}
const Asset = {
  icp:(method,data)=>{
    let res = initPhpApi(data,method,URLS.ICP);
    return ApiAxios(res.method,res.url,res.data)
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
  back:(method,data)=>{
    let res = initPhpApi(data,method,URLS.BACK);
    return ApiAxios(res.method,res.url,res.data)
  },
  card:(method,data)=>{
    let res = initPhpApi(data,method,URLS.CARD);
    return ApiAxios(res.method,res.url,res.data)
  },
  maintenance:(method,data)=>{
    let res = initPhpApi(data,method,URLS.MAINTENANCE);
    return ApiAxios(res.method,res.url,res.data)
  },
  rent:(method,data)=>{
    let res = initPhpApi(data,method,URLS.RENT);
    return ApiAxios(res.method,res.url,res.data)
  },
  ocr:(method,data)=>{
    let res = initPhpApi(data,method,URLS.OCR);
    return ApiAxios(res.method,res.url,res.data)
  }
}

const System = {
  org:(method,data)=>{
    let res = initPhpApi(data,method,URLS.ORG);
    return ApiAxios(res.method,res.url,res.data)
  },
  grant:(method,data)=>{
    let res = initPhpApi(data,method,URLS.GRANT);
    return ApiAxios(res.method,res.url,res.data)
  },
  rbacGrant:(method,data)=>{
    let res = initPhpApi(data,method,URLS.RBACGRANT);
    return ApiAxios(res.method,res.url,res.data)
  },

}



export default {
	Home,
  Asset,
  System
}


