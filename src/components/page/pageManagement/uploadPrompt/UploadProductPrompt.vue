<template>
  <div class="uploadProductPrompt">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="uploadProductPrompt_main">
      <!--标题-->
      <div class="title">
        <p>上传商品提示</p>
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
            <!-- <div id="editor">
              <p></p>
            </div> -->
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

          <div class="content_btm">
            <el-button type="primary" @click="handleSave">保 存</el-button>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
/*************富文本**************/
    import {quillEditor} from 'vue-quill-editor'
    import * as Quill from 'quill'  //引入编辑器

    //quill图片可拖拽改变大小
    import ImageResize from 'quill-image-resize-module';

    Quill.register('modules/imageResize', ImageResize);

    //quill图片可拖拽上传
    import {ImageDrop} from 'quill-image-drop-module';

    Quill.register('modules/imageDrop', ImageDrop);
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    Quill.register('modules/ImageExtend', ImageExtend);

    var toolbarOptions = [
        ['italic', 'underline', 'strike', 'bold'],
        ['blockquote', 'code-block'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{'direction': 'rtl'}],
        [{'color': []}],
        [{'align': []}],
        ['image','link']
    ];
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "UploadProductPrompt",
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
            name: "上传商品提示",
            urls: "/index/page/pageManagement/uploadPrompt/UploadProductPrompt",
            icon: "icon-home"
          }
        ],

        plateRadio:0,  // 板块选择
        plateList:[],   //板块列表
        // textarea:'',
        currentObj:{},

        editorOption: {
                    modules: {
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                'image': function (value) {// 劫持原来的图片点击按钮事件
                                    console.log(value);
                                    if (value) {
                                        document.querySelector('#editorImg').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        },
                        imageDrop: true,
                        imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'none',
                                color: 'white'
                            },
                            modules: ['Resize', 'DisplaySize', 'Toolbar']
                        },
                        ImageExtend: {
                            loading: true,
                            name: 'img',
                            size: 1,
                            action: '',
                            response: (res) => {
                                return res.info
                            },
                            headers: (xhr) => {
                                // xhr.setRequestHeader('myHeader','myValue')
                            },  //设置请求头部
                            sizeError: () => {
                                this.$message.error('图片大小超过限制10M')
                            },  // 图片超过大小的回调
                            start: () => {
                            }, //this.ImgStart(),//() => {},  //自定义开始上传触发事件
                            end: () => {
                            },  //自定义上传结束触发的事件，无论成功或者失败
                            error: () => {
                            },  //上传失败触发的事件
                            success: () => {
                            },  //上传成功触发的事件
                            change: (xhr, formData) => {
                                // xhr.setRequestHeader('myHeader','myValue')
                                // formData.append('token', 'myToken')
                            } //每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
                        },
                    }
                },//富文本配置
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
            type:'upload_product',
        })
        .then(res=>{
            console.log(res);
            if(res.data.code === 200){
                this.$message.success(res.data.msg);
                setTimeout(() => {
                    this.getProductTips();
                    this.content = '';
                }, 500);
            }
        })
      },
      //获取商品提示列表
      getProductTips(){
        this.HttpClient.post('/admin/tips/getlists',{
            type:'upload_product'
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
  .uploadProductPrompt{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .uploadProductPrompt_main::-webkit-scrollbar {
      display: none;
    }
    .uploadProductPrompt_main {
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
