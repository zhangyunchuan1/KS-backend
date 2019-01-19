import CryptoJS from 'crypto-js';
import * as cfg from "../../config/app";
import Tools from "./tools";
import {HttpClient} from "./HttpUtils";

const uploadPath = cfg.uploadPath;
const imagePath = cfg.imageUrl;

/****
 * 将utf16转换为utf8
 * @param str
 * @returns {string}
 */
const utf16to8 = (str) =>{
  let out, i, len , c;
  out = '';
  len = str.length;
  for(i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    }else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }
  }
  return out;
};

const utf8to16 = (str) =>{
  let out, i, len, c;
  let char2, char3;
  out = '';
  len = str.length;
  i = 0;
  while (i < len) {
    c = str.charCodeAt(i++);
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += str.charAt(i - 1);
        break;
      case 12:
      case 13:
        // 110x xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx 10xx xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
        break;
    }
  }
  return out;
};


let base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
let base64DecodeChars = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];

/****
 * base64加密
 * @param str
 * @returns {string}
 */
const base64encode = (str) =>{
  let out, i, len;
  let c1, c2, c3;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i === len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i === len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
};

/****
 * base64解密
 * @param str
 */
const base64decode = (str) =>{
  let c1, c2, c3, c4;
  let i, len, out;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c1 === -1);
    if (c1 === -1) break;
    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c2 === -1);
    if (c2 === -1) break;
    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if (c3 === 61) return out;
      c3 = base64DecodeChars[c3];
    } while (i < len && c3 === -1);
    if (c3 === -1) break;
    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if (c4 === 61) return out;
      c4 = base64DecodeChars[c4];
    } while (i < len && c4 === -1);
    if (c4 === -1) break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return out;
};

const safe64 = (base64) =>{
  base64 = base64.replace(/\+/g, "-");
  base64 = base64.replace(/\//g, "_");
  return base64;
};

const getQiNiuToken = ({saveKey}) =>{
  console.log(1111111111,saveKey)
  let policy = {};
  let accessKey = cfg.accessKey;
  let secretKey = cfg.secretKey;
  let bucketName = cfg.bucketName;
  let deadline = Math.round(new Date().getTime() / 1000) + 3600;
  policy.scope = bucketName;
  policy.deadline = deadline;
  const entry = `${bucketName}:${saveKey}`;
  let encode = '|saveas/'+base64encode(entry);
  policy.persistentOps = 'avthumb/mp4/ss/1/t/5'+encode;
  policy.persistentNotifyUrl = 'http://test.kslab.com/api/article/null'
  console.log(policy.persistentOps)
  if(saveKey) {
    policy.saveKey = Tools.GetNumber()+'/'+ saveKey;
  }
  //SETP 2
  let put_policy = JSON.stringify(policy);
  //SETP 3
  let encoded = base64encode(utf16to8(put_policy));
  //SETP 4
  let hash = CryptoJS.HmacSHA1(encoded, secretKey);
  let encoded_signed = hash.toString(CryptoJS.enc.Base64);
  //SETP 5
  return accessKey + ":" + safe64(encoded_signed) + ":" + encoded;
};

/****
 * 2019/1/3/003
 * author ZhengXuDong
 * function 视屏剪切
 * @param path 路径
 * @param start 开始时间
 * @param end 截止时间
 */
const shearVideo = (path, start, end) => {
  const param = {
    path: path,
    startTime: start,
    endTime: end
  };
  HttpClient.post('/shortVideo', param)
    .then(res =>{
      if(res.data.code === 200) {
        return true;
      }
    })
};

export default {
  install (Vue) {
    Vue.prototype.$getQiNiuToken = getQiNiuToken;
    Vue.prototype.$uploadPath = uploadPath;
    Vue.prototype.$imagePath = imagePath;
    Vue.prototype.$shearVideo = shearVideo;
  },
  getQiNiuToken
}


