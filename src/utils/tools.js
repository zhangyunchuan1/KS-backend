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
}
