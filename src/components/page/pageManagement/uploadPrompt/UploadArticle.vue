<template>
  <div class="uploadArticle">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="uploadArticle_main">
      <!--标题-->
      <div class="title">
        <p>上传文章</p>
      </div>
      <div class="content">
        <div class="content_header">
          <p>板块选择：</p>
          <el-radio-group v-model="plateRadio" @change="handleChangePlate">
            <el-radio border v-for="(item,index) in plateList" :label="index" :key="index" @change="handleSelect(item)">{{item.name}}</el-radio>
          </el-radio-group>
        </div>

        <div class="content_box">

          <div class="edit-box">
            <quill-editor
                  v-model="content"
                  :options="editorOption"
                  ref="myQuillEditor"
                  @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                  @change="onEditorChange($event,5000)">
              </quill-editor>
            <!-- <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input> -->
          </div>
        </div>

        <div class="content_btm">
          <el-button type="primary"  @click="handleSave">保 存</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
/*************富文本**************/
// region
  import {quillEditor} from 'vue-quill-editor'
  import * as Quill from 'quill'  //引入编辑器
  import moment from 'moment'


  // 自定义字体大小
  let fontSize = ['10px', '12px', '14px', '16px', '18px', '20px'];
  let Size = Quill.import('attributors/style/size');
  Size.whitelist = fontSize;
  Quill.register(Size, true);

  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif'];
  var Font = Quill.import('formats/font');
  Font.whitelist = fonts; //将字体加入到白名单

  import {container, QuillWatch} from 'quill-image-extend-module'

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
    // ['image']
  ];
  //endregion
  /*************************************/
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "UploadArticle",
    components: {
      BreadCrumb
    },
    data() {
      return {
        // 面包屑
        breadData: [
          {
            id: 1,
            name: "页面",
            urls: "/index/page/Page",
            icon: "icon-home"
          }, {
            id: 2,
            name: "页面管理",
            urls: "/index/page/pageManagement/PageManagement",
            icon: "icon-home"
          }, {
            id: 3,
            name: "上传提示",
            urls: "/index/page/pageManagement/uploadPrompt/UploadPrompt",
            icon: "icon-home"
          }, {
            id: 4,
            name: "上传文章",
            urls: "/index/page/pageManagement/uploadPrompt/UploadArticle",
            icon: "icon-home"
          }
        ],

        plateRadio:0,  // 板块选择
        plateList:[],   //板块列表
        // textarea:'',
        currentObj:{},
        editorOption:{ // 富文本编辑器配置
          modules:{
            toolbar:{
              container: toolbarOptions,
            },
            
          }
        },
        contentUpData: {}, // 上传参数
        content: '', // 富文本编辑内容
      }
    },

    mounted(){
      this.getProductTips();
    },
    methods:{
      // /**************************文档编辑器*******************/
    //   // region

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
      // endregion
      handleSelect(i){
        console.log(i);
        this.currentObj = i;
        this.content = i.content;
      },
      //切换板块
      handleChangePlate(){
      },
      //保存修改
      handleSave(){
        console.log(this.content)
        this.HttpClient.post('/admin/tips/edit',{
            id:this.currentObj.id, 
            name:this.currentObj.name,
            content:this.content,
            type:'upload_article',
        })
        .then(res=>{
            console.log(res);
            if(res.data.code === 200){
                this.$message.success(res.data.msg);
                setTimeout(() => {
                    this.getProductTips();
                }, 500);
            }
        })
      },
      //获取商品提示列表
      getProductTips(){
        this.HttpClient.post('/admin/tips/getlists',{
            type:'upload_article'
        })
        .then(res=>{
            console.log(res);
            this.plateList = res.data.data;
            this.content = this.plateList[this.plateRadio].content;
            this.currentObj = this.plateList[this.plateRadio];
        })
      },
    }
  }
</script>

<style lang="less">
  .uploadArticle{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .uploadArticle_main::-webkit-scrollbar {
      display: none;
    }
    .uploadArticle_main {
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        border-bottom: 2px solid #f2f2f2;
        padding: 0 40px;
        font-size: 20px;
        color: #222;
      }

      .content {
        box-sizing: border-box;
        padding: 30px 40px;
        .content_header{
          display: flex;
          align-items: center;
          .el-radio-group{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .el-radio{
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0 15px;
              .el-radio__input{
                display: none;
              }
              .el-radio__label{
                padding: 0;
              }
            }
            .el-radio.is-checked{
              background: #15bafe;
              border-color: #15bafe;
              .el-radio__label{
                color: #fff;
              }
            }
          }
        }

        .content_box{
          .edit-box{
            width: 50%;
            height: 400px;
            margin-top: 30px;
            .el-textarea__inner{
                width: 750px;
                height: 200px;
            }
            .quill-editor{
              height: 340px;
            }
          }
        }

        .content_btm{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-top: 20px;
          margin-left: 675px;
        }

      }
    }
  }
</style>
