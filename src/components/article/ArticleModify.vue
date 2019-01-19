<template>
  <div class="articleModify">
    <div class="articleModify_header">{{articleData.title}} - 修改</div>

    <div class="articleModify_main">
      <div class="articleModify_List">
        <div class="list_title">标题</div>
        <div class="list_input">
          <el-input v-model="articleData.title"></el-input>
        </div>
      </div>

      <div class="articleModify_List">
        <div class="list_title">封面图片</div>
        <div class="list_input list_upload">
          <el-upload
            class="articleModify_uploader"
            action="/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="articleData.image_path"
              :src="Tools.handleImg(articleData.image_path)"
              class="articleModify_img"
            >
            <i v-else class="el-icon-plus articleModify-icon"></i>
          </el-upload>
          <p>(图片比例4:3，大小不超过1M)</p>
        </div>
      </div>

      <div class="articleModify_List">
        <div class="list_title">简介</div>
        <div class="list_input list_textarea">
          <el-input type="textarea" :rows="5" resize="none" v-model="articleData.profile"></el-input>
        </div>
      </div>

      <div class="articleModify_List">
        <div class="list_title">详细内容</div>
        <div class="list_input list_textarea">
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
            </div>
          </div>
          <!-- <el-input type="textarea" :rows="5" resize="none" v-model="articleData.content"></el-input> -->
        </div>
      </div>

      <div class="articleModify_List">
        <div class="list_title">标签</div>
        <div class="list_input list_tags">
          <div class="tags" v-for="(item,index) in tags" :key="index">
            <div @click="updateButton(item.tag_id)">{{item.name}}</div>
            <p @click="deleteTags(index,item.tag_id)">
              <i class="iconfont icon-minus"></i>
            </p>
          </div>
        </div>
      </div>

      <!-- <div class="articleModify_List">
        <div class="list_title list_title_margin">使用零件、软件</div>
        <div class="list_input list_tags">
          <div class="tags" v-for="(item,index) in part" :key="index">
            <div @click="updatePart(item.source_id)">{{item.source_name}}</div>
            <p @click="deletePart(item.source_id)">
              <i class="iconfont icon-minus"></i>
            </p>
          </div>
        </div>
      </div>

      <div class="articleModify_List">
        <div class="list_title">对应链接</div>
        <div class="list_input list_tags">
          <div class="tags" v-for="(item,index) in part" :key="index">
            <div>{{item.link}}</div>
            <p>
              <i class="iconfont icon-minus"></i>
            </p>
          </div>
        </div>
      </div> -->
    </div>

    <el-dialog custom-class="modifyDialog" :visible.sync="modifyVisible" width="400px">
      <span slot="title" class="modifyVisible_title">
        <i class="iconfont icon-edit-square"></i>修改
      </span>
      <div class="modifyVisible">
        <p>新名称：</p>
        <div>
          <el-input v-model="name"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTag">保 存</el-button>
      </span>
    </el-dialog>
    <el-button type="primary" @click="submitArticle">修改</el-button>
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
  name: "ArticleModify",
  data() {
    return {
      id: "", //文章全局id
      imageUrl: "",
      tags: [], //标签列表
      name: "", //修改标签名称
      tag_id: "", //修改标签id
      part: [], //零件列表
      link:'',//对应链接
      modifyVisible: false, // 修改弹框
      articleData: {
        id: "",
        title: "",
        image_path: "",
        profile: "",
        content: "",
        category_id: "",
        status:1
      }, //文章详细数据
      editorOption:{ // 富文本编辑器配置
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
        },
        contentUpData: {}, // 上传参数
        content: '', // 富文本编辑内容
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt1M = file.size / 1024;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }
      console.log(file)
      this.HttpClient.form('/admin/uploadOneImage',{images:file}).then(res => {
        console.log(res.data)
        if(res.data.code === 200){
          this.$message.success(res.data.msg)
          this.articleData.image_path = res.data.path.replace('http://cdn.kushualab.com/','');
          console.log(this.articleData)
          setTimeout(() => {
            this.HttpClient.post("/admin/article/edit", this.articleData).then(res => {
                console.log(res);
                if (res.data.code === 200) {
                  this.$message.success(res.data.msg);
                } else {
                  this.$message.error(res.data.msg);
                }
              }
            );
          }, 500);
        }
      })
      // return isJPG && isLt1M;
    },

    //获取文章详情
    getArticleDetails() {
      this.HttpClient.post("/admin/article/getInfo", {
        id: this.$route.query.id
      }).then(res => {
        console.log(res);
        let { code, data } = res.data;
        if (code === 200) {
          this.articleData.title = data.title;
          this.articleData.image_path = data.image_path;
          this.articleData.profile = data.profile;
          this.articleData.content = data.content;
          this.content = data.content;
          this.articleData.category_id = data.category_id;
          this.tags = data.label;
          this.part = data.source;
        }
      });
    },

    //修改标签按钮事件
    updateButton(id) {
      this.modifyVisible = true;
      this.tag_id = id;
    },

    //修改标签
    updateTag() {
      this.modifyVisible = false;
      this.HttpClient.post("/admin/tags/edit", {
        relation_id: this.id,
        name: this.name,
        tag_id: this.tag_id
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getArticleDetails();
          }, 500);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 删除标签
    deleteTags(index, id) {
      this.HttpClient.post("/admin/tags/del", {
        relation_id: this.id,
        tag_id: id
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success("删除成功");
          this.tags.splice(index, 1);
        } else {
          this.$message.error("删除成功");
        }
      });
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
    //修改零件
    updatePart(id) {
      this.modifyVisible = false;
    },
    //删除零件
    deletePart() {},
    //提交修改
    submitArticle() {
      this.HttpClient.post("/admin/article/edit", this.articleData).then(
        res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            setTimeout(() => {
              this.$router.go(-1)
            }, 500);
          } else {
            this.$message.error(res.data.msg);
          }
        }
      );
    }
  },
  created() {
    this.articleData.id = this.$route.query.id;
    this.id = this.$route.query.articleId;
    console.log(this.id);
    this.getArticleDetails();
  }
};
</script>

<style lang="less">
.articleModify::-webkit-scrollbar {
  display: none;
}
.articleModify {
  margin-left: 10px;
  margin-top: 10px;
  background: #fff;
  height: calc(100vh - 70px);
  width: calc(100vw - 240px);
  border-radius: 2px;
  overflow-y: auto;
  /*头部*/
  .articleModify_header {
    border-bottom: 2px solid #f2f2f2;
    display: flex;
    align-items: center;
    height: 70px;
    padding-left: 40px;
    font-size: 20px;
    color: #222;
    overflow: auto;
  }
  /*主体内容*/
  .articleModify_main {
    padding: 30px 40px;
    /*列表*/
    .articleModify_List:not(:last-child) {
      margin-bottom: 25px;
    }
    .articleModify_List {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      /*标题*/
      .list_title {
        font-size: 14px;
        color: #fff;
        background: #15bafe;
        padding: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        min-width: 80px;
        margin-right: 40px;
      }
      /*长标题*/
      .list_title_margin {
        margin-right: 22px;
      }
      /*输入框*/
      .list_input {
        /*input样式*/
        .el-input__inner {
          border-radius: 0;
        }
        /*textarea样式*/
        .el-textarea__inner {
          border-radius: 0;
        }
        .mail_edit {
          position: relative;
          // width: 100%;
          min-width: 750px;
          min-height: 300px;
          margin-top: 15px;
          border: 1px solid #ccc;
          text-align: left;
          .icon-huaban4 {
            margin: 5px 0 0 5px;
            font-size: 20px;
            color: #15bafe;
            position: relative;
            top: 8px;
          }
          .mail_edit_body {
            // margin-top: 15px;
            // height: 192px;

            //富文本
            .ql-toolbar.ql-snow {
              border-left: none;
              border-right: none;
            }
            .ql-container.ql-snow {
              border-left: none;
              border-right: none;
              border-bottom: none;
              // height: 217px;
            }
          }
        }
      }
      .list_textarea {
        width: 750px;
      }
      /*上传框*/
      .list_upload {
        display: flex;
        align-items: flex-end;
        /*封面图片上传*/
        .articleModify_uploader {
          margin-right: 20px;
          .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .el-upload:hover {
            border-color: #409eff;
          }
          .articleModify-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .articleModify_img {
            width: 178px;
            height: 178px;
            display: block;
          }
        }
        > p {
          font-size: 12px;
          color: #999;
        }
      }
      /*tags*/
      .list_tags {
        display: flex;
        align-items: center;
        .tags:not(:last-child) {
          margin-right: 15px;
        }
        .tags {
          display: flex;
          align-items: center;
          cursor: pointer;
          div {
            display: flex;
            align-items: center;
            height: 38px;
            padding: 0 20px;
            border: 1px solid #dcdfe6;
            border-right: none;
            font-size: 14px;
            color: #999;
          }
          p {
            background: red;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            height: 40px;
            width: 35px;
          }
        }
      }
    }
  }

  /*修改弹框*/
  .modifyDialog {
    .modifyVisible_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
      }
    }
    .modifyVisible {
      display: flex;
      align-items: center;
    }
  }
}
</style>
