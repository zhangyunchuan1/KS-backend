import * as axios from "axios";
import cfg from '../../config/app';
import qs from 'qs';
import ElementUI from 'element-ui'
console.log(ElementUI)
export class HttpClient {

    static get(url, param, hearders){
        return this.http("GET", url, param, hearders);
    }

    static post(url, param, hearders){
        return this.http("POST", url, param, hearders);
    }

    static delete(url, param, headers) {
        return this.http('DELETE', url, param, headers);
    }

    /******
     * form表单post请求
     * @param url
     * @param param
     * @returns {Promise<any>}
     */
    static async form(url, param) {
        return await new Promise((resolve, reject) =>{
            let token = window.localStorage.getItem('token');
            /*console.log(token)*/
            const instance=axios.create({
                withCredentials: false,
                baseURL:cfg.urls + cfg.api,
                headers: {'Authorization': token? 'Bearer '+token : ''}
            });
            let form = new FormData();
            let key=Object.keys(param);
            key.map(item=>{
                form.append(item, param[item]);
            });
            instance.post(url, form).then(res =>{
                if(res.status === 200) {
                    resolve(res);
                }else {
                    reject(res);
                }
            })
        });
    }
    static async ajax(url, param) {
        return await new Promise((resolve, reject) =>{
          const instance=axios.create({
            withCredentials: false,
            baseURL: url,
          });
          instance.get(url, param).then(res =>{
            if(res.status === 200) {
              resolve(res);
            }else {
              reject(res);
            }
          })
        });
    }
    /**
     * HttpClient工具类
     * @param type 请求方法 string
     * @param url 请求地址 string
     * @param param 请求参数 json
     * @param headers json
     * @returns {*}
     */
    static http(type, url, param={}, headers={}){
        //拼接api前缀
        url = cfg.urls + cfg.api + url;

        //添加auth_key
        let token = window.localStorage.getItem('token');
        // console.log(token);
        headers['Authorization'] = token? 'Bearer '+token : '';
        // /*
        // *请求拦截器
        // */
        // axios.interceptors.request.use(config=>{
        //     console.log(config)
        //     return config;
        // },error => {
        //     return Promise.reject(error);
        // });
   
        //响应拦截
        axios.interceptors.response.use(function (response) {
            //登录超时或者未登录
            if (response.data.code === 1345){
                window.location.href='/login'; 
            }else if(response.data.code === 1352){  //没有权限
                ElementUI.Message({
                    type: '',
                    duration:2000,
                    center: true,
                    dangerouslyUseHTMLString: true,
                    message: '<div style="text-align:center"><i class="el-icon-warning" style="font-size:40px;text-align:center"></i></div><p style="margin:10px;color:#e6a23c">您暂无权限，请联系管理员。</p>'
                })
            }else if(response.data.code === '300'){  //没有分配角色
                ElementUI.Message({
                    type: '',
                    duration:2000,
                    center: true,
                    dangerouslyUseHTMLString: true,
                    message: '<div style="text-align:center"><i class="el-icon-warning" style="font-size:40px;text-align:center"></i></div><p style="margin:10px;color:#e6a23c">您还未分配角色，请联系管理员。</p>'
                })
            }
            return response;
        }, function (error) {
            return Promise.reject(error);
            
        });

        return axios({
            method: type,
            url: url,
            params: type === 'GET' ? param:type ==='DELETE'?param:'',
            data: qs.stringify(param),
            headers:headers,
            async:true,
        });
    }
}
