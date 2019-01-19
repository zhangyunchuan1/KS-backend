import cfg from '../../config/app';
import axios from 'axios';
import stores from 'storejs';
import qs from 'qs';

// 创建axios默认请求
axios.defaults.baseURL = cfg.urls;
//配置超时时间
axios.defaults.timeout = 100000;
// 配置请求拦截
axios.interceptors.request.use(config =>{
  let userInfo = stores.get('user');
  config.headers['Authorized-Key'] = userInfo? userInfo.authorized_key : userInfo;
  return config;
});
// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
/**
 * get请求
 * @method get
 * @param url
 * @param params
 * @param headers
 */
let get = function(url, params, headers) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params,headers)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
/**
 * post请求
 * @method post
 * @param url
 * @param data
 * @param headers
 */
let post = function(url, data, headers) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, headers)
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export default { get, post };
