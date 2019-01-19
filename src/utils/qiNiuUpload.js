import * as qiniu from 'qiniu-js'
import qiNiuToken from './qiNiuToken';
import Tools from "./tools";

let config = {
  useCdnDomain: true,   //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
  region: qiniu.region.z2    // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
};

const observable =(file) =>{
  let putExtra = {
    fname: Tools.GetNumber()+'/'+file.name,  //文件原文件名
    params: {}, //用来放置自定义变量
    mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
  };
  const key = Tools.GetNumber()+'/'+file.name; // 上传后文件资源名以设置的 key 为主，如果 key 为 null 或者 undefined，则文件资源名会以 hash 值作为资源名。
  return qiniu.upload(file, key, qiNiuToken.getQiNiuToken({saveKey:file.name}), putExtra, config);
};

export default {
  install (Vue) {
    Vue.prototype.$observable = observable;
  }
}

/*使用*/
/*let observable = this.$observable(file)
observable.subscribe({
  next(res){
    console.log('next',res)
  },
  error(err){
    console.log('error',err)
  },
  complete(res) {
    console.log('complete', res)
  }
})*/




