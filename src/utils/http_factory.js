import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

//axios  https://www.npmjs.com/package/axios
let http = axios.create({
  baseURL: process.env.API_ROOT,
  timeout:1000*6,
  withCredentials: false,
  transformRequest: [],     //请求之前,修改request数据
  transformResponse:[],      //响应之后,修改response数据
  headers:{
    // "Authorization":"Bearer "+localStorage.getItem('token')
    "Authorization":"Bearer api_token_admin"

  }
});

//请求拦截器
http.interceptors.request.use(function (config) {
  // console.log(config);
  return config;
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
    http(config).then(res=>{
      if(res.status < 300 && res.status >= 200){
        let code = res.data.code;
        if(code == 1){
          return resolve(res.data);
        }else{

          let msg = res.data.errors;
            if(typeof msg == "undefined"){
            msg = res.data.message;
          }

          Message({
            message:msg,
            type:'warning'
          })
        }
      }else{
        let retStatus = res.status;
        if(typeof retStatus == "undefined"){
          res = res.response;
        }

        let retcode = res.data.code;
        if(retcode != 1){
          let msg = res.data.errors;
          if(typeof msg == "undefined"){
            msg = res.data.message;
          }
          Message({
            message:msg,
            type:'warning'
          })
        }
        return;
      }
    }).catch(res=>{
      Message({
        message:"请求失败",
        type:'warning'
      })
      return reject(res);
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
