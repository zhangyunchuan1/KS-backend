<template>
  <div class="upload_rich_text_content" :class="{'show_more':showMoreContent}">
    <label>
      <input id="richInput" @change.stop="handleUploadFile($event)" type="file" style="display: none"/>
    </label>
    <quill-editor
      class="upload_rich_text"
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      maxlength="1000"
      @change="handleEditorChange($event, maxLength)">
    </quill-editor>
    <span class="content_length">{{currentLength}}/{{maxLength}}</span>
      <div class="show_more_content_button" @click="showMoreContent=!showMoreContent">
          <span class="button_txt">{{showMoreContent?'收起':'展开'}}</span>
          <i class="icon icon-down" :class="{'show_more':showMoreContent}"></i>
      </div>
  </div>
</template>

<script>

  // region
  import {quillEditor} from 'vue-quill-editor'
  import * as Quill from 'quill'  //引入编辑器
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
    // [{'size': fontSize}],
    // [{'header':[1,2,3,4,5,6,false]}],
    [{'color': []}],
    // [{'font':fonts}],
    [{'align': []}],
    // ['clear'],
    ['image','link']
  ];
  // endregion

  export default {
    name: "uploadRichText",
    props: {
      maxLength: {
        type: Number,
        default: () => 1000
      },
      richText: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        editorOption: {
          modules: {
            toolbar: {
              container: toolbarOptions,
              handlers: {
                // 'image': function () {  // 劫持原来的图片点击按钮事件
                //     QuillWatch.emit(this.quill.id)
                // }
                'image': function (value) {
                  if (value) {
                    document.getElementById('richInput').click()
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
                this.$message.error('图片大小超过限制1M')
              },  // 图片超过大小的回调
              start: () => {}, //this.ImgStart(),//() => {},  //自定义开始上传触发事件
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
        },
        theme: 'snow',
        content: '', // 文本内容
        editImageSize: 0, // 上传图片个数
        currentLength: 0, // 当前字数
        beforeContent: '', // 超出字数前的content
          showMoreContent:false,// 展示更多内容
      }
    },
    watch: {
      richText: {
        handler(newVal) {
          if(newVal) {
            this.content = newVal;
          }
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      /****
       * 2019/1/25/025
       * author ZhengXuDong
       * function 图片上传
       * @param event
       */
      handleUploadFile(event) {
        if(this.editImageSize.length > 7) {
          this.$message.warning('最多上传8张图片！');
        }else {
          const file = event.target.files[0];
          const isLimit = file.size / 1024 / 1024 <= 10;
          const fileType = (file.name.split('.')[1]).toLowerCase();
          const fileTypeStr = 'jpg,png,jpeg,tiff,tif,gif';
          if(fileTypeStr.indexOf(fileType) < 0) {
            this.$message.error('图片格式错误');
            return false;
          }
          if (!isLimit) {
            this.$message.error(`图片大小不能超过 5MB!`);
            return false;
          }
          let observable = this.$observable(file);
          let self = this;
          observable.subscribe({
            next(res){
              // console.log('next',res);
            },
            error(err){
              console.log('error',err);
              self.$message.error('上传失败');
            },
            complete(res) {
              console.log('complete', res);
              const path = self.$imagePath + res.key;
              let quill = self.$refs.myQuillEditor.quill;
              let length = quill.getSelection().index;
              quill.insertEmbed(length, 'image', path)
              quill.setSelection(length + 1)
            }
          });
        }
        event.target.value = '';
      },
      /****
       * 2019/1/25/025
       * author ZhengXuDong
       * function 富文本编辑改变事件
       * @param event
       * @param maxLength
       */
      handleEditorChange(event, maxLength) {
        this.currentLength = event.text.length - 1;
        const data = this.Tools.getEditorImageAndLength(this.content);
        this.editImageSize = data.imgArray.length;
        if(this.currentLength <= 1000) {
          this.beforeContent = this.content;
        }else {
          setTimeout(() =>{
            this.content = this.beforeContent
          },1)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .upload_rich_text_content {
    /*height: 486px;*/
    position: relative;
    /deep/.upload_rich_text {

        .ql-container.ql-snow{
            height: 450px;
        }
    }
    .content_length {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size:14px;
      font-family:ArialNova sans-serif;
      color:rgba(200,202,204,1);
      letter-spacing:2px;
    }
      .show_more_content_button{
          width:50px;
          height:24px;
          line-height:24px;
          text-align:center;
          cursor:pointer;
          border:1px solid #E1E3E6;
          box-sizing:border-box;
          float:right;
          user-select:none;
          margin-top:5px;

          .button_txt{
              color:#C8CACC;
              font-size:12px;
          }
          .icon-down{
              color:#C8CACC;
              font-size:12px;

              &.show_more{
                  transform: rotate(180deg);
              }
          }
      }

      &.show_more{
          /deep/.quill-editor{
              .ql-container.ql-snow{
                  height:800px;
              }
          }
      }
  }
</style>
