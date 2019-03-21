import moment from 'moment'
import * as cfg from "../../config/app";
import { Message } from 'element-ui';
export default class Utils {
  //获取唯一值
  static GetNumber() {
    return moment().format('YYYYMMDDHHmmssS')
  }
  //格式化图片
  static handleImg(url) {
    return cfg.imageUrl+url;
  }
  //格式化时间
  static GetDate(date) {
    //console.log(date,this.commitDetail);
    let str = '';
    let res = moment(date).format('YYYY-MM-DD HH:mm:ss');
    const dates =  moment(res,'YYYY-MM-DD HH:mm:ss').valueOf();
    const years = moment().diff(moment(dates),'years');
    const months = moment().diff(moment(dates),'months');
    const days = moment().diff(moment(dates),'days');
    const hours = moment().diff(moment(dates),'hours');
    const minutes = moment().diff(moment(dates),'minutes');

    //console.log(years,' ',months,' ',days,' ',hours+ ' '+minutes)
    if(minutes === 0) {
      str = 0 + '分钟';
    }else if(minutes>0 && minutes<60){
      str = minutes + '分钟';
    }else if(minutes>=60 && minutes<60*24){
      str = hours + '小时';
    }else if(minutes>=60*24 && minutes<60*24*30){
      str = days + '天';
    }else if(minutes>=60*24*30 && minutes<60*24*30*12){
      str = months + '月'
    }else if(minutes>=60*24*30*12){
      str = years + '年'
    }
    return str;
  }
  //计算两个时间的间隔天数
  static getDateDiff(endDate){
    console.log(endDate);
    let myDate = new Date();//获取系统当前时间
    let nowTime = myDate.getTime();     
    let endTime = new Date(endDate).getTime();     
    let dates = Math.abs((nowTime - endTime))/(1000*60*60*24); 
    console.log(dates);    
    return  dates;    
    
  }
  static arrayRemoval(arr){
    let result = [];
    let obj = {};
    for(let i =0; i<arr.length; i++){
       if(!obj[arr[i].key]){
          result.push(arr[i]);
          obj[arr[i].key] = true;
      }
    }
    return result; 
  }
  // 手机号码正则
  static regPhone(phone) {
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
      return '请输入正确的手机号码'
    }
  }

  // 后端返回消息提示
  getApiMessage(res) {
    if(res.data.code == '200') {
      return Message.success(res.data.msg);
    }else{
      return Message.error(res.data.msg);
    }
  }
  // 通过状态的数据处理
  dealWithStatus(status) {
    let statusName = '';
    if(status == '0') {
      statusName = '删除';
    }else if(status == '1') {
      statusName = '已通过';
    }else if(status == '2') {
      statusName = '待审核';
    }else if(status == '3') {
      statusName = '未通过';
    }else if(status == '4') {
      statusName = '下架';
    }
    return statusName;
  }
  // 富文本编辑器计算长度和图片个数
  static getEditorImageAndLength(str) {
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let arr = str.match(imgReg);  // arr 为包含所有img标签的数组
    let imgArray = [];
    if(arr) {
      for (var i = 0; i < arr.length; i++) {
        var src = arr[i].match(srcReg);
        imgArray.push(src[1]);
        // 获取图片地址
        // console.log('图片地址'+(i+1)+'：'+src[1]);
      }
      arr.map((item,index) =>{
        str = str.replace(item,'')
      });
    }
    return {str: str, imgArray: imgArray}
  }
  static CheckIsChinese(val){    
    　let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    　if(reg.test(val)){
        console.log('*不能存在汉字！');
        return true;
      }else{
        console.log('没有汉字！');
        return true;
      }   
  }
  static getQuillOpotion(){
   return { // 富文本编辑器配置
      modules:{
        toolbar:{
          container: toolbarOptions,
          handlers: {
            'image': function (value) {  // 劫持原来的图片点击按钮事件
              if (value) {
                document.querySelector('#xx input').click()
              } else {
                this.quill.format('image', false);
              }
            }
          }
        },
        imageDrop:true,
        imageResize: {
          displayStyles: {
            backgroundColor: 'black',
            border: 'none',
            color: 'white'
          },
          modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
        },
        ImageExtend: {
          loading: true,
          name: 'img',
          size:1,
          action: '',
          response: (res) => {
            return res.info
          },
          headers: (xhr) => {
            // xhr.setRequestHeader('myHeader','myValue')
          },  //设置请求头部
          sizeError: () => {
            this.$message.error('图片大小超过限制1M')
          },  // 图片超过大小的回调
          start: () => {},  //自定义开始上传触发事件
          end: () => {},  //自定义上传结束触发的事件，无论成功或者失败
          error: () => {},  //上传失败触发的事件
          success: () => {},  //上传成功触发的事件
          change: (xhr, formData) => {
            // xhr.setRequestHeader('myHeader','myValue')
            // formData.append('token', 'myToken')
          } //每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
        },
      }
    }
  }
  //资源路径是否为全路径
  static judgeFullPath(path){
    if(path){
      let str = path.substring(0,7);
      console.log(str)
      if(str === 'https:/'){
        return path
      }else if(str === 'http://'){
        return path
      }else{
        let url = this.handleImg(path);
        return url
      }
    }
  }
  /**
   * 上传文件类型限制
   * str : 文件上传名称
   * type : 文件限制的类型 数组 例： ['doc','jpg']
   * author:ZhangYunChuan
   * 
  */
  static fileLimit(type,str){
    console.log(str);
    let flashbackStr =  str.split('').reverse().join('');
    let index = flashbackStr.indexOf(".");
    let newStr = flashbackStr.substring(0,index);
    let identification = newStr.split('').reverse().join('');
    console.log(identification);
    if(type.indexOf(identification) > -1){
      console.log('true')
      return true
    }else{
      console.log('false')
      return false
    }
  }
  /**
   * 图片类型限制
   * file : 文件上传名称
   * author:ZhangYunChuan
  */
  static pictureLimit(file){
    let fileTypes = ['image/jpeg','image/jpg','image/png','image/tiff','image/tif'];
    console.log(fileTypes.indexOf(file.type))
    if(fileTypes.indexOf(file.type) != -1){
      console.log('true');
      return true;
    }else{
      return false;
    }
  }
  static isChinese(temp){
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");  //中文
    let p=/^\w+$/;  //字母或数字
    if(reg.test(temp)){
      return true;
    }else if(p.test(temp)){
      return false;
    }
  }
  static findElem (arrayToSearch,attr,val){
    for (let i=0;i<arrayToSearch.length;i++){
        if(arrayToSearch[i][attr].indexOf(val)!==-1){
            return i;
        }
    }
    return -1;
  }
  /****
   * 2019/3/7
   * author ZhangYunChuan
   * function 根据关键字获取最后一个值
   * @param str
   * @param key
   */
  static getLastStringByKeyWord(str, key) {
    return str.split(key)[str.split(key).length - 1];
  }
  //获取唯一值
  static GetNumber() {
    return moment().format('YYYYMMDDHHmmssS');
  }
  //是否是图片
  static isPic(url){
    console.log(url)
    let format = ["jpg", "jpeg", "png","bmp",'tiff','tif'];
    let invertedStr = url.split('').reverse().join('');  //字符串倒叙
    let index = invertedStr.indexOf(".");
    // console.log('.位置',index)
    // console.log('倒叙字符',invertedStr)
    let newStr = invertedStr.substring(0,index);
    let identification = newStr.split('').reverse().join('');
    console.log('最后取字符',identification)
    if(format.indexOf(identification) > -1){
        console.log('true')
        return true
    }else{
        return false
        console.log('false')
    }
  }
  // 去掉富文本标签
  static removeTAG(str,len){
    return str.replace(/<[^>]+>/g, "");
  }
  // 去掉前后空格
  static trim(str) {
    str = str.replace(/\s+/g, '');
    return str;
  }
  //时间0的补全
  static add0(m){
    return m<10?'0'+m:m 
  }
  static format(shijianchuo){
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(Number(shijianchuo)*1000);
    console.log(time,shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    console.log(y,m,d,h,mm,s)
    return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
  }
}

