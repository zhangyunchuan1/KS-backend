<template>
  <div class="videoModify">
    <div class="videoModify_header">如何修改一个视频 - 修改</div>

    <div class="videoModify_main">
      <div class="videoModify_List">
        <div class="list_title">标题</div>
        <div class="list_input">
          <el-input v-model="modifyData.title"></el-input>
        </div>
      </div>

      <div class="videoModify_List">
        <div class="list_title">封面图片</div>
        <div class="list_input list_upload">
          <el-upload
            class="videoModify_uploader"
            action=""
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="videoModify_img">
            <i v-else class="el-icon-plus videoModify-icon"></i>
          </el-upload>
          <p>(图片比例4:3，大小不超过1M)</p>
        </div>
      </div>

      <div class="videoModify_List">
        <div class="list_title">视频详情</div>
        <div class="list_input list_textarea">
          <!-- <el-input type="textarea" v-html="modifyData.description"></el-input> -->
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


          <!-- <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="modifyData.description"
          ></el-input> -->
        </div>
      </div>

      <div class="videoModify_List">
        <div class="list_title">标签</div>
        <div class="list_input list_tags">
          <div class="tags" v-for="(item,index) in modifyData.label" :key="index">
            <div @click="handleModify(item,index,'a')">{{item.name}}</div>
            <p>
              <i class="iconfont icon-minus" @click="handleDeleteTag(item,index)"></i>
            </p>
          </div>
        </div>
      </div>

      <div class="videoModify_List">
        <div class="list_title list_title_margin">使用零件、软件</div>
        <div class="list_input list_tags_link">
          <div class="tags_link" v-for="(item,index) in modifyData.source" :key="index">
            <div class="tags">
              <div @click="handleModify(item,index,'b')">{{item.source_name}}</div>
            </div>
            <div class="tags">
              <div @click="handleModify(item,index,'c')">{{item.link}}</div>
              <p>
                <i class="iconfont icon-minus" @click="handleDeleteSource(item,index)"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="videoModify_List">
        <div class="list_title">是否为教学视频</div>
        <div class="list_input list_switch">
          <el-switch
            v-model="modifyData.is_course"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChangeCourse"
          ></el-switch>
        </div>
      </div>

      <div class="videoModify_List">
        <div class="list_title">附件</div>
        <div class="list_input list_upload list_upload_txt">
          <el-upload
            class="upload-demo"
            action="http://test.kslab.com/api/article/null"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :before-upload="beforeUploadAttachment"
            :on-exceed="handleExceed"
            :file-list="modifyData.attachment">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">不超过500kb</div>
          </el-upload>
        </div>
      </div>
    </div>

    <div class="bottom">
      <el-button @click="handleCancelModify">取 消</el-button>
      <el-button type="primary" @click="handleSaveAll">保 存</el-button>
    </div>

    <el-dialog custom-class="modifyDialog" :visible.sync="modifyVisible" width="400px">
      <span slot="title" class="modifyVisible_title">
        <i class="iconfont icon-edit-square"></i>修改
      </span>
      <div class="modifyVisible">
        <p>新名称/新链接：</p>
        <div>
          <el-input v-model="newName"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveName">保 存</el-button>
      </span>
    </el-dialog>
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
  name: "VideoModify",
  data() {
    return {
      /*********************************************************/
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
      /**********************************************************************************************/

      id: "", //文章全局id
      imageUrl: "",
      tags: [], //标签列表
      oldTags: [],
      name: "", //修改标签名称
      tag_id: "", //修改标签id
      part: [], //零件列表
      modifyVisible: false, // 修改弹框
      modifyObj: {}, //当前修改对象
      modifyIndex: null, //修改的index
      modifyType: null, //当前修改的类型
      isCourse: null, //是否为教程

      image_path: "",

      teachingBtm: false, // 教学视频开关

      // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      // fileList:[],
      modifyData: {}, //修改信息
      newName: "", //新名称
      modifyImgUrl:'', //修改后的图片地址，半路径，用于上传
      
    };
  },
  created() {
    this.getVideoInfo(this.$route.query.id);
  },
  methods: {
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
        if (removeHTMLTag(lengthcontent).length < 2000) {
          this.modifyData.description = this.content;
        } else {
          this.$message.error('字数超过限制');
        }
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


    //删除零件链接
    handleDeleteSource(i, index) {
      console.log(i);
      this.HttpClient.form("/admin/source/del", {
        tag_id: i.source_id,
        relation_id: this.$route.query.video_id
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          this.modifyData.source.splice(index, 1);
        }
      });
    },
    //删除标签
    handleDeleteTag(i, index) {
      console.log(i, this.$route.query.video_id, this.modifyData.label);
      this.HttpClient.form("/admin/tags/del", {
        tag_id: i.tag_id,
        relation_id: this.$route.query.video_id
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          this.modifyData.label.splice(index, 1);
        }
      });
    },
    //上传附件
    beforeUploadAttachment(file) {
      console.log(file);
      this.HttpClient.form("/admin/uploadOneFile", {
        files: file
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          this.modifyData.attachment.push({
            name: file.name,
            path: res.data.path.substr(25),
            status: "success",
            uid: file.uid
          });
        }
      });
    },
    //保存所有
    handleSaveAll() {
        //处理上传封面图片格式
        // this.modifyData.cover = this.imageUrl;
        // let resa = this.modifyData.cover.indexOf('http');
        // if(resa !== -1){
          // this.modifyData.cover = this.imageUrl.substring(25)
        // }
        console.log(this.modifyData)
        // 处理上传附件格式
        let attr = [];
        for(let i in this.modifyData.attachment){
          attr.push({
            name:this.modifyData.attachment[i].name,
            path:this.modifyData.attachment[i].path,
          })
        }
      // console.log(
      //   this.modifyData.title,
      //   JSON.stringify(this.modifyData.cover),
      //   this.modifyData.description,
      //   this.modifyData.label,
      //   this.modifyData.source,
      //   this.modifyData.is_course,
      //   attr
      // );
      if (this.modifyData.is_course) {
        this.isCourse = 1;
      } else {
        this.isCourse = 0;
      }
      console.log(JSON.stringify(this.modifyData.attachment));
      this.HttpClient.post("/admin/videos/edit", {
        id: this.$route.query.id,
        title: this.modifyData.title,
        cover: this.modifyData.cover,
        is_course: this.isCourse,
        description: this.modifyData.description,
        attachment: attr
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.$router.go(-1);
          }, 500);
        }
      });
    },
    //保存新名字
    handleSaveName() {
      console.log(this.modifyType, this.modifyObj);
      if (this.modifyType === "a") {
        //修改标签
        this.HttpClient.form("/admin/tags/edit", {
          tag_id: this.modifyObj.tag_id,
          name: this.newName,
          relation_id: this.$route.query.video_id
        }).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.modifyData.label[this.modifyIndex].name = this.newName;
          }
        });
      } else if (this.modifyType === "b") {
        //修改零件名称
        this.HttpClient.form("/admin/source/edit", {
          source_id: this.modifyObj.source_id,
          name: this.newName,
          relation_id: this.$route.query.video_id,
          type: 3,
          link: this.modifyObj.link
        }).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.modifyData.source[this.modifyIndex].source_name = this.newName;
          }
        });
      } else if (this.modifyType === "c") {
        //修改地址
        this.HttpClient.form("/admin/source/edit", {
          source_id: this.modifyObj.source_id,
          name: this.modifyObj.name,
          relation_id: this.$route.query.video_id,
          type: 3,
          link: this.newName
        }).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.modifyData.source[this.modifyIndex].link = this.newName;
          }
        });
      }
      this.modifyVisible = false;
    },
    // 是否教程
    handleChangeCourse() {
      console.log(this.modifyData.is_course);
    },
    //修改标签
    handleModify(i, index, sign) {
      console.log(i);
      this.modifyObj = i;
      this.modifyIndex = index;
      this.modifyType = sign;
      if (sign === "a") {
        console.log("修改标签");
        this.newName = i.name;
      } else if (sign === "b") {
        console.log("修改零件");
        this.newName = i.source_name;
      } else if (sign === "c") {
        console.log("修改地址");
        this.newName = i.link;
      }
      this.modifyVisible = true;
    },
    //获取视频详细信息
    getVideoInfo(id) {
      this.HttpClient.post("/admin/videos/getInfo", {
        id: id
      }).then(res => {
        console.log(res);
        this.modifyData = res.data.data;
        this.content = this.modifyData.description ;
        // 处理图片
        this.modifyData.cover = JSON.parse(this.modifyData.cover);
        this.imageUrl = this.Tools.handleImg(this.modifyData.cover[0].path);
        // 处理附件格式
        if (this.modifyData.attachment !== null) {
          console.log("chuli");
          this.modifyData.attachment =  JSON.parse(this.modifyData.attachment);
        } else {
          this.modifyData.attachment = [];
        }
        // 处理教程
        this.isCourse = this.modifyData.is_course;
        if (this.modifyData.is_course === 1) {
          this.modifyData.is_course = true;
        } else {
          this.modifyData.is_course = false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    //图片上传
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 10;
      if (isJPG) {
        if (isLt5M) {
          this.HttpClient.form("/admin/uploadOneImage", {
            images: file
          }).then(res => {
            console.log(res);
            if (res.data.code === 200) {
              this.imageUrl = res.data.path;
              this.modifyData.cover = [];
              this.modifyData.cover.push({
                name:file.name,
                path:res.data.path
              })
              this.$message.success(res.data.msg);
              // this.modifyData.cover[0].name = file.name;
              // this.modifyData.cover = res.data.path;
            }
          });
        } else {
          this.$message.error("上传图片大小不能超过 5MB!");
        }
      } else {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
    },

    handleRemove(file) {
      console.log(file);
      console.log(this.modifyData.attachment);
      for (let i in this.modifyData.attachment) {
        if (file.uid === this.modifyData.attachment[i].uid) {
          this.modifyData.attachment.splice(i, 1);
        }
      }
      console.log(this.modifyData.attachment);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files) {
      // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //处理富文本
    removeHTMLTag(html) {
      var htmlTagReg = /<(\/)?[^>].*?>/g;
      return html.replace(htmlTagReg, "");
    },
    //取消修改
    handleCancelModify() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less">
.videoModify::-webkit-scrollbar {
  display: none;
}
.videoModify {
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
  background: #fff;
  height: calc(100vh - 70px);
  width: calc(100vw - 240px);
  border-radius: 2px;
  overflow-y: auto;

  /*头部*/
  .videoModify_header {
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
  .videoModify_main {
    padding: 30px 40px;
    /*列表*/
    .videoModify_List:not(:last-child) {
      margin-bottom: 25px;
    }
    .videoModify_List {
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
      }
      .list_textarea {
        width: 750px;
      }
      /*上传框*/
      .list_upload {
        display: flex;
        align-items: flex-end;
        /*封面图片上传*/
        .videoModify_uploader {
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
          .videoModify-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .videoModify_img {
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
          // margin-right: 0px;
        }
        .tags {
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-right: 10px;
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
      .list_tags_link {
        align-items: center;
        .tags_link {
          display: flex;
          margin-bottom: 10px;
        }
        .tags:not(:last-child) {
          // margin-right: 15px;
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

      /*教学按钮*/
      .list_switch {
        display: flex;
        align-items: center;
        height: 40px;
      }

      /*附件上传*/
      .list_upload_txt {
        border: 1px solid #dedede;
        box-sizing: border-box;
        padding: 20px;
      }
    }
  }

  /*底部按钮*/
  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    .el-button {
      margin: 0 10px;
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

