<template>
    <div class="productPreview">
      <!--主体内容-->
      <div class="productPreview_main">
        <!--标题-->
        <div class="title">
          <p>商品预览</p>
        </div>

        <div class="productPreview_content">
          <div class="productPreview_list">
            <div class="list_title">商品名称</div>
            <div class="list_main">{{productInfo.title}}</div>
          </div>
          <div class="productPreview_list">
            <div class="list_title">商品编号</div>
            <div class="list_main">{{productInfo.asin}}</div>
          </div>

          <div class="productPreview_box">
            <div class="productPreview_list">
              <div class="list_title">单价</div>
              <div class="list_main">{{productInfo.price}}</div>
            </div>

            <div class="productPreview_list">
              <div class="list_title">库存数量</div>
              <div class="list_main">{{productInfo.stock}}</div>
            </div>
          </div>


          <!-- <div class="productPreview_list">
            <div class="list_title">标签</div>
            <div class="list_main" v-for="item in productInfo.tags" :key="item.tag_id">{{item.name}}</div>
          </div> -->

          <div class="productPreview_list">
            <div class="list_title">轮播图</div>
            <div class="list_swiper">
              <div class="list_swiper_img">
                <div v-for="(item,index) in productInfo.show_picture" :key="index">
                  <img :src="Tools.handleImg(item.path)" alt="">
                </div>
                
              </div>
            </div>
          </div>

          <div class="productPreview_list">
            <div class="list_title">视频</div>
            <div class="list_video">
              <video controls :src="Tools.handleImg(productInfo.video[0].path)"></video>
            </div>
          </div>

          <div class="productPreview_list richText">
            <div class="list_title">商品详情</div>
            <!-- <div class="list_textarea">{{productInfo.description}}</div> -->
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
                v-model="productInfo.description"
                :options="editorOption"
                ref="myQuillEditor"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event,5000)">
            </quill-editor>
          </div>

          <div class="productPreview_list">
            <div class="list_title">附件</div>
            <div class="list_upload">
              <p v-for="(item,index) in productInfo.attachment" :key="index"><a :href="Tools.handleImg(item.path)+'?attname='"><i class="iconfont icon-wenjian"></i>{{item.name}}<i class="xiaz el-icon-download"></i></a></p>
            </div>
          </div>
        </div>

        <div class="cloneProductPreview_box">
          <el-button type="primary" class="cloneProductPreview" @click="$router.go(-1)">返回</el-button>
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
  export default {
    name: "ProductPreview",
    data(){
        return {
            productInfo:{},
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
        }
    },
    methods:{
        //获取商品信息
        getProductInfo(){
            this.HttpClient.get('/admin/marketProduct/edit',{product_id:this.$route.query.id})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.productInfo=res.data.data;
                        if(!this.productInfo.video){
                          this.productInfo.video = ['',''];
                        }
                    }
                })
        },
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
        this.getProductInfo()
    }
  }
</script>

<style lang="less">
  .productPreview::-webkit-scrollbar {display:none}
  .productPreview{
    text-align: left;
    background: white;
    margin: 10px 10px 0 10px;
    height: calc(100vh - 70px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    box-sizing: border-box;
    padding: 20px 40px;
    overflow-y: auto;

    .title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 0;
      margin-bottom: 30px;
      border-bottom: 1px solid #dedede;
    }
    .productPreview_content{
      .richText{
                height: 192px;
                .quill-editor{
                    width: 750px;
                    border: 1px solid #bfbfbf;
                }
                .ql-toolbar.ql-snow{
                    border-left:none;
                    border-right:none;
                }
                .ql-container.ql-snow{
                    border-left:none;
                    border-right:none;
                    border-bottom:none;
                    height:150px;
                }
            }
      .productPreview_list{
        display: flex;
        align-items: flex-start;
        margin: 20px 0;

        .list_title{
          text-align: center;
          width: 120px;
          height: 40px;
          line-height: 40px;
          background: #15bafe;
          color: #fff;
          margin-right: 20px;
        }

        /*标签*/
        .list_main{
          height: 40px;
          line-height: 40px;
          border: 1px solid #dedede;
          padding: 0 30px;
          box-sizing: border-box;
          margin-right: 30px;
          font-size: 14px;
          color: #666;
        }
        /*轮播*/
        .list_swiper{
          box-sizing: border-box;
          // height: 220px;
          border: 1px dashed #dedede;
          padding: 10px;
          width: 700px;
          overflow-y: hidden;
          overflow-x: auto;
          white-space:nowrap;

          .list_swiper_img:not(:last-child){
            margin-right: 20px;
          }
          .list_swiper_img{
            // flex: 1;
            // height: 100%;
            // width: 200px;
            // display: inline-block;
            // overflow: hidden;
            display: flex;
            img{
              width: 100%;
            }
          }
        }

        .list_textarea{
          width: 700px;
          min-height: 220px;
          box-sizing: border-box;
          padding: 15px;
          border: 1px solid #dedede;
        }

        /*附件*/
        .list_upload{
          box-sizing: border-box;
          padding: 15px;
          border: 1px solid #dedede;
          width: 700px;
          min-height:40px;
          p{
            position: relative;
            margin-bottom: 10px;
            i{
              font-size: 20px;
              margin-right: 15px;
            }
            a{
              font-size: 14px;
              width: 668px;
              display: block;
            }
            .xiaz{
              position: absolute;
              right:0px;
              bottom:0px;
            }
          }
          p:hover{
            background: #dee1e2;
          }
          // li:not(:last-child){
          //   margin-bottom: 10px;
          // }
          // li{
          //   list-style:none;
          //   i{
          //     margin-right: 10px;
          //   }
          // }
        }

        /*视频*/
        .list_video{
          width: 700px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          box-sizing: border-box;
          padding: 10px;
          border: 1px dashed #dedede;
          video{
            width: 100%;
          }
        }
      }

      .productPreview_box{
        display: flex;
        align-items: center;
      }

    }
    .cloneProductPreview_box{
      display: flex;
      justify-content: center;
    }
  }
</style>
