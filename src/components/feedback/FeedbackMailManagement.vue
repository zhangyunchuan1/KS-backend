<template>
  <div class="feedback_connection">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

    <div class="feedback_main">
      <div class="feedback_title">
        <div class="title">邮件模板管理</div>
      </div>

      <div class="feedback_header">
        <div>现有模板</div>
        <el-button @click="addButton(null,2)">添加新模板</el-button>
      </div>

      <div class="feedback_content">
        <div class="feedback_type_list">
          <div class="feedback_type" v-for="item in mailData" :key="item.id">
            <div class="feedback_type_name" @click="handleModify(item,2)">{{item.name}}</div>
            <el-button type="danger" @click="deleteButton(item.id)">删除</el-button>
          </div>
        </div>
        <div v-if="mailData.length<=0">暂无模板</div>
      </div>
    </div>

    <!--新增反馈类型-->
    <el-dialog :visible.sync="addVisible" width="800px" custom-class="mail_visible">
      <div slot="title" class="dialog_head_title">
        <i class="iconfont icon-faxian examine_icon"></i>
        <!-- <span>新模板</span> -->
      </div>
      <div class="mail_content">
        <div class="mail_title">模板名称</div>
        <div class="mail_input">
          <el-input v-model="templateTitle"></el-input>
        </div>
      </div>
      <div class="mail_content">
        <div class="mail_title">内容编辑</div>
        <div class="mail_edit">
          <i class="iconfont icon-huaban4"></i>
          <div class="mail_edit_body">
            <el-upload
                id="xx"
                class="avatar-uploader up_content"
                :action="$uploadPath"
                :data="contentUpData"
                name="file"
                :show-file-list="false"
                :on-success="handleContentSuccess"
                :before-upload="beforeContentUpload">
            </el-upload>
            <quill-editor
                v-model="content"
                :options="editorOption"
                ref="myQuillEditor"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event,5000)">
            </quill-editor>
            <!-- <quill-editor
              v-model="mailContent"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
            </quill-editor> -->
          </div>
          <!-- <div class="mail_basic_info">
            <div class="basic_info_item">
              <span>邮箱：</span>
              <el-input v-model="mailbox"></el-input>
            </div>
            <div class="basic_info_item">
              <span>TEL: </span>
              <el-input v-model="phone"></el-input>
            </div>
            <div class="basic_info_item">
              <span>地址：</span>
              <el-input v-model="adress"></el-input>
            </div>
            <div class="basic_info_item">
              <span>邮编: </span>
              <el-input v-model="zipCode"></el-input>
            </div>
          </div> -->
        </div>
      </div>
      <div class="user_footer" slot="footer">
        <el-row>
          <el-button class="btn_foot" @click="addVisible = false">取消</el-button>
          <el-button type="primary" class="btn_foot" @click="saveTemplate">保存</el-button>
        </el-row>
      </div>
    </el-dialog>

    <!--删除确认框-->
    <delete-modal ref="delete" @doDelete="confirmDelete"></delete-modal>
  </div>
</template>

<script>
/*************富文本**************/
// region
  import {quillEditor} from 'vue-quill-editor'
  import * as Quill from 'quill'  //引入编辑器
  import moment from 'moment'

  //quill图片可拖拽改变大小
  import ImageResize from 'quill-image-resize-module';

  Quill.register('modules/imageResize', ImageResize);

  //quill图片可拖拽上传
  import {ImageDrop} from 'quill-image-drop-module';

  Quill.register('modules/imageDrop', ImageDrop);

  // 自定义字体大小
  let fontSize = ['10px', '12px', '14px', '16px', '18px', '20px'];
  let Size = Quill.import('attributors/style/size');
  Size.whitelist = fontSize;
  Quill.register(Size, true);

  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif'];
  var Font = Quill.import('formats/font');
  Font.whitelist = fonts; //将字体加入到白名单

  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

  Quill.register('modules/ImageExtend', ImageExtend)

  var toolbarOptions = [
    ['italic', 'underline', 'strike', 'bold'],
    ['blockquote', 'code-block'],
    // [{'header':1},{'header':2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],
    [{'size': fontSize}],
    // [{'header':[1,2,3,4,5,6,false]}],
    [{'color': []}],
    // [{'font':fonts}],
    [{'align': []}],
    // ['clear'],
    ['image']
  ];
  //endregion
  /*************************************/

import BreadCrumb from '@/components/public/BreadCrumb';
import DeleteModal from '@/components/public/modalDelete';

export default {
  name: "FeedbackMailManagement",
  data(){
    return {
      breadData: [
        {
          id: 1,
          name: '提出意见',
          urls: '/index/feedback/feedback',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '邮件管理模板',
          urls: '/index/feedback/feedback-mail-management',
          icon: 'icon-home'
        }
      ],// 面包屑
      editorOption: {
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
      },// 富文本工具栏
      contentUpData: {}, // 上传参数
      content: '', // 富文本编辑内容
      addVisible:false,// 新增弹窗
      mailData:[],// 邮件模板列表
      templateTitle:'',// 新模板名称,
      mailContent:'',// 模板内容
      operationType:null,  //操作类型
      modifyInfo:null,  //修改前的模板信息
      // mailbox:'',  //邮箱
      // phone:'',  //电话
      // adress:'',  //地址
      // zipCode:'',
      
    }
  },
  components:{
    BreadCrumb,
    DeleteModal
  },
  methods:{
    handleModify(i,type){
      console.log(i)
      this.addVisible = true;
      this.modifyInfo  = i;
      this.templateTitle = i.name;
      this.content = i.content;
      this.operationType = type;
    },
    // 获取模板列表
    getMailList () {
      this.HttpClient.post('/admin/templates/getList',{type:2})
        .then(res => {
          console.log(res.data)
          const { code, data: { data } } = res.data
          if (code === 200) {
            this.mailData = data
          }
        })
    },
    //确认删除
    confirmDelete(bool){
      if(bool){
        this.HttpClient.post('/admin/templates/destroy',{id:this.id})
          .then(res=>{
            if(res.data.code===200){
              this.$message.success(res.data.msg);
              setTimeout(()=>{
                this.getMailList()
              },500)
            }else{
              this.$message.error(res.data.msg)
            }
          })
      }
    },
    //新增模板
    saveTemplate(){
      console.log(this.operationType)
      if(this.operationType === 1){   //新增模板
        this.HttpClient.post('/admin/templates/create',{type:2,name:this.templateTitle,content:this.content})
        .then(res=>{
          console.log(res);
          const { code, msg } = res.data
          if (code === 200) {
            this.$message.success(msg)
            this.addVisible = false;
            this.templateTitle = ''
            this.content = ''
            setTimeout(() => {
              this.getMailList()
            }, 500)
          } else {
            this.$message.success(msg)
          }
        })
      }else if(this.operationType === 2){  //修改模板
        this.HttpClient.post('/admin/templates/edit',{id:this.modifyInfo.id,name:this.templateTitle,content:this.content,type:2})
        .then(res=>{
          console.log(res);
          if(res.data.code === 200){
            this.$message.success(res.data.msg)
            this.addVisible = false;
            this.templateTitle = '';
            this.content  = '';
            setTimeout(() => {
              this.getMailList()
            }, 500)
          }
        })
      }
    },
    //添加模板按钮事件
    addButton(){
      this.addVisible=true;
      this.templateTitle = '';
      this.content = '';
      this.operationType = 1;
    },
    //删除按钮事件
    deleteButton(id){
      this.id=id;
      this.$refs.delete.deleteDialog=true;
    },
    /*************富文本***************/
    /**编辑器**/
      onEditorBlur() {//失去焦点事件
      },
      onEditorFocus() {//获得焦点事件
      },
      onEditorChange(e, decimalNum) {//内容改变事件
        //this.content = event.html
        console.log(this.content)
        let lengthcontent = this.content;
        function removeHTMLTag(str) {
          //var str;
          str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
          str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
          str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
          str = str.replace(/ /ig, '');//去掉
          return str;
        }
        console.log(removeHTMLTag(lengthcontent).length)
        e.quill.deleteText(decimalNum, 1);//保留 strValue 的 前 decimalNum 位字符，
        this.$emit('Quescthon', this.content)
        console.log(this.content);
        const data = this.Tools.getEditorImageAndLength(this.content);
        this.editImageSize = data.imgArray.length;
        console.log(this.modifyData)
        // if (removeHTMLTag(lengthcontent).length < 2000) {
        //   this.modifyData.description = this.content;
        // } else {
        //   this.$message.error('字数超过限制');
        // }
      },
      /****
       * 2019/1/4/004
       * author ZhengXuDong
       * function 富文本上传
       * @param file
       */
      beforeContentUpload(file) {
        // console.log(this.editImageSize)
        // if(this.editImageSize >= 8) {
        //   this.$message.error('图片不能超过8张');
        //   return false;
        // }
        const sizeLimit = file.size / 1024 / 1024 < 10;
        const fileType = file.name.split('.')[1];
        const fileTypeStr = 'jpg,png,jpeg,tiff,tif';
        if(fileTypeStr.indexOf(fileType) < 0) {
          this.$message.error('图片类型只能为'+ fileTypeStr);
          return false;
        }
        if (!sizeLimit) {
          this.$message.error('上传图片大小不能超过 5MB!');
          return false;
        }
        let self = this;
        let render = new FileReader();
        render.readAsDataURL(file);
        return new Promise((resolve,reject) =>{
          render.onload = function () {
            self.contentUpData.token = self.$getQiNiuToken({saveKey:file.name});
            resolve(true)
          };
        });
      },
      /****
       * 2019/1/4/004
       * author ZhengXuDong
       * function 上传描述图片成功,将图片链接加入到文档中
       * @param res
       * @param file
       * @param fileList
       */
      handleContentSuccess(res, file, fileList) {
        console.log(res, file, fileList)
        let quill = this.$refs.myQuillEditor.quill;
        let length = quill.getSelection().index;
        quill.insertEmbed(length, 'image', this.$imagePath + file.response.key)
        quill.setSelection(length + 1)
      },
      // endregion
  },
  created(){
    this.getMailList()
  }
}
</script>

<style lang="less">
.feedback_connection {
  .bread {
    margin: 10px;
  }
  .feedback_main::-webkit-scrollbar {display:none}
  .feedback_main {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;

    .feedback_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      border-bottom: 2px solid #f2f2f2;
      padding: 0 40px;

      .title {
        font-size: 20px;
        color: #222;
      }
    }

    /*头部*/
    .feedback_header{
      display: flex;
      align-items: center;
      padding: 30px 25px;
      div{
        margin-right: 20px;
      }

    }

    .feedback_content{
      padding-left:30px;
      min-height:250px;
      .feedback_type_list{
        display:flex;
        flex-wrap:wrap;
        align-items:center;
        justify-content:flex-start;

        .feedback_type{
          // width:150px;
          display:flex;
          justify-content:flex-start;
          font-size:14px;
          margin-right:15px;
          margin-bottom:10px;

          .feedback_type_name{
            width:100%;
            padding: 0 5px;
            line-height:40px;
            // color:#fff;
            // background:#15bafe;
            /*padding:5px 10px;*/
            border: 1px solid #dedede;
              border-top-left-radius:3px;
              border-bottom-left-radius:3px;
            box-sizing:border-box;
          }
          .el-button{
            // color:#fff;
            // background:red;
            padding:12px 8px;
            // border:1px solid red;
            border-top-left-radius:0;
            border-bottom-left-radius:0;
          }
          // .el-button:active{
          //   border-color:#15bafe;
          // }
        }
      }
    }
  }

  //新增模板弹窗
  .mail_visible{
    .dialog_head_title{
      text-align: start;
      font-size: 14px;
      border-bottom: 1px solid #f2f2f2;
      padding-bottom: 10px;
    }
    .mail_content{
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      justify-content: flex-start;
      text-align:center;
      margin-bottom:15px;

      .mail_title{
        width:15%;
        height:40px;
        line-height:40px;
        color:#fff;
        background:#15bafe;
        margin-right:10px;
      }
      .mail_body{
        width:80%;
        height:40px;
        line-height:40px;
        border:1px solid #15bafe;
        border-radius:3px;
        box-sizing:border-box;
      }
      .mail_select{
        width:80%;
        height:40px;
        display:flex;
        justify-content:flex-start;
        .el-radio-button__orig-radio:checked+.el-radio-button__inner{
          background-color:#15bafe;
          border-color:#15bafe;
        }
      }
      .mail_input{
        width:80%;
        .el-input__inner:focus{
          border-color:#15bafe;
        }
      }
      .mail_edit{
        position:relative;
        width:100%;
        min-height:300px;
        margin-top:15px;
        border:1px solid #ccc;
        text-align:left;
        .icon-huaban4{
          font-size:20px;
          color:#15bafe;
          position: relative;
          top: 15px;
          padding-left: 10px;
        }
        .mail_edit_body{
                        // margin-top:15px;
                        // height:192px;

                        //富文本
                        .ql-toolbar.ql-snow{
                            border-left:none;
                            border-right:none;
                        }
                        .ql-container.ql-snow{
                            border-left:none;
                            border-right:none;
                            border-bottom:none;
                            min-height:250px;
                            overflow-y: auto;
                            padding-bottom: 60px;
                        }
                    }
        .mail_basic_info{
                        position:absolute;
                        bottom:0;
                        left:0;
                        width:65%;
                        display:flex;
                        flex-wrap:wrap;
                        align-items:center;
                        justify-content:flex-start;

                        .basic_info_item{
                            display: flex;
                            justify-content:space-between;
                            color:#fff;
                            font-size:14px;
                            background:#15bafe;
                            padding:2px 10px;
                            border:1px solid #ccc;
                            box-sizing:border-box;
                        }
                        .basic_info_item:first-child{
                            width:50%;
                            span{
                              width: 53px;
                              line-height: 30px;
                            }
                            .el-input__inner{
                              width: 180px;
                              height: 30px;
                            }
                        }
                        .basic_info_item:nth-child(2){
                            width:50%;
                            padding:2px 10px;
                            span{
                              width: 53px;
                              line-height: 30px;
                            }
                            .el-input__inner{
                              width: 180px;
                              height: 30px;
                            }
                        }
                        .basic_info_item:nth-child(3){
                            width:60%;
                            span{
                              width: 53px;
                              line-height: 30px;
                            }
                            .el-input__inner{
                              width: 231px;
                              height: 30px;
                            }
                        }
                        .basic_info_item:last-child{
                            width:40%;
                            span{
                              width: 53px;
                              line-height: 30px;
                            }
                            .el-input__inner{
                              width: 143px;
                              height: 30px;
                            }
                        }
                    }
      }
    }
  }
}
</style>
