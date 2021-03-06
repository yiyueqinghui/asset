import axios from 'axios';
import qs from 'qs';
import { Message,Loading} from 'element-ui';

//axios  https://www.npmjs.com/package/axios
function getToken(){
  let token = localStorage.getItem('token');
  console.log(token);
  while(token==null){
    token = localStorage.getItem('token');
  }
  console.log(token);
  return token;
}
// getToken();
let http = axios.create({
  baseURL: process.env.API_ROOT,
  timeout:1000*6,
  withCredentials: false,
  transformRequest: [],     //请求之前,修改request数据
  transformResponse:[],      //响应之后,修改response数据
  headers:{
    // "Authorization":"Bearer "+localStorage.getItem('token')
  }
});

//请求拦截器
http.interceptors.request.use(function (config) {
  let url = config.url.replace(config.baseURL,'');
  if(url === '/Token'){
    return config;
  }else{
    let token = localStorage.getItem('token');
    while(token==='null'){
      token = localStorage.getItem('token');
    }
    config.headers['Authorization'] = "Bearer "+token;
    return config;
  }
}, function (error) {
  return Promise.reject(error);
});

//响应拦截器
http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return error;
});


// 深度合并对象
function deepObjectMerge(FirstOBJ, SecondOBJ) {
    for (var key in SecondOBJ) {
        FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ?
            deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
    }
    return FirstOBJ;
}

function ApiAxios(method, url, params,config){
  if(config){
    if(config.headers['Content-Type'] === 'application/x-www-form-urlencoded'){
      params = qs.stringify(params);
      console.log('urlencoded');
    }
  }

	let default_config = {
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    headers:{
      "Content-Type":"application/json;charset=UTF-8"
    }
  };
  if(typeof config == 'undefined') config = {};
  config = deepObjectMerge(default_config,config);

  return new Promise((resolve,reject)=>{
    let loadingInstance = Loading.service({ fullscreen: true });
    http(config).then(res=>{
      if(res.status < 300 && res.status >= 200){
        return resolve(res.data);
      }else{
        Message({
          message:res.err,
          type:'warning'
        })
        return;
      }
    }).catch(err=>{
      Message({
        message:'请求失败',
        type:'warning'
      })
      return reject(res);
    }).finally(()=>{
      loadingInstance.close();
    })
  })
}



function Get(url, params,config){
  return ApiAxios('GET', url, params,config)
}
function Post(url, params,config){
  return ApiAxios('POST', url, params,config)
}
function Put(url, params,config){
  return ApiAxios('PUT', url, params,config)
}
function Delete(url, params,config){
  return ApiAxios('Delete', url, params,config)
}

export{
  Get,
  Post,
  Put,
  Delete,
  ApiAxios

}
