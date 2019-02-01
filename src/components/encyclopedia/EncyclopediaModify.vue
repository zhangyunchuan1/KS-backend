<template>
  <div class="encyclopediaData">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="encyclopediaData_main">
      <!--标题-->
      <div class="title">
        <p>百科修改</p>
      </div>
      <!--内容-->
      <div class="encyclopediaData_content">
        <div class="encyclopedia_content_item">
          <div class="encyclopedia_title">标题</div>
          <div class="encyclopedia_body">
            <el-input class="recipient_email" v-model="encyclopediaInfo.title"></el-input>
          </div>
        </div>
        <div class="encyclopedia_content_item">
          <div class="encyclopedia_title">封面图片</div>
          <div class="encyclopedia_body">
            <el-upload
              class="articleModify_uploader"
              action="/"
              :show-file-list="false"
              :on-success="handleCoverSuccess"
              :before-upload="beforeCoverUpload"
            >
              <!-- <img
                v-if="encyclopediaInfo.cover"
                :src="(encyclopediaInfo.cover.indexOf('http')!==-1?encyclopediaInfo.cover+'?':Tools.handleImg(encyclopediaInfo.cover)+(encyclopediaInfo.cover.indexOf('mp4')!==-1?'|':'?'))+'imageView2/1/w/100/h/100'"
                class="articleModify_img"
              > -->
              <img
                v-if="encyclopediaInfo.cover"
                :src="Tools.handleImg(encyclopediaInfo.cover[0].path)"
                class="articleModify_img"
              >
              <i v-else class="el-icon-plus articleModify-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="encyclopedia_content_item encyclopedia_content_items">
          <div class="encyclopedia_title">简介</div>
          <div class="encyclopedia_body">
            <div class="encyclopedia_textarea">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 10 }"
                class="recipient_email"
                v-model="encyclopediaInfo.description"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="encyclopedia_content_item">
          <div class="encyclopedia_title">一级目录</div>
          <div class="encyclopedia_body">
            <div
              class="encyclopedia_first_catalogue"
              v-for="(item,index) in firstCatalogue"
              :key="index">
              <div
                class="encyclopedia_catalogue"
                :class="{'is_active':item.id===firstId}"
                :key="item.id"
                @click="firstClick(item.id,index)"
              >{{item.name}}</div>
              <el-button type="info" @click="catalogueModify(item.catalog_id,item.content,item.name,true)" class="el-icon-edit"></el-button>
            </div>
          </div>
        </div>
        <div class="encyclopedia_content_item" v-if="firstId">
          <div class="encyclopedia_title">二级目录</div>
          <div class="encyclopedia_body">
            <div
              class="encyclopedia_first_catalogue"
              v-for="(item,index) in secondCatalogue"
              :key="index"
            >
              <div
                class="encyclopedia_catalogue"
                :class="{'is_active':item.id===secondId}"
                :key="item.id"
                @click="secondClick(item.id)"
              >{{item.name}}</div>
              <el-button type="info" @click="catalogueModify(item.catalog_id,item.content,item.name,false)" class="el-icon-edit"></el-button>
            </div>
          </div>
        </div>
        <div class="encyclopedia_content_item">
          <div class="encyclopedia_title">标签</div>
          <div class="encyclopedia_body">
            <div class="encyclopedia_first_catalogue" v-for="(item,index) in tags" :key="index">
              <div
                class="encyclopedia_catalogue"
                :key="item.id"
                @click="tagClick(item)"
              >{{item.name}}</div>
              <el-button type="danger" @click="deleteTag(item.tag_id)" class="el-icon-delete"></el-button>
            </div>
          </div>
        </div>
        <div class="encyclopedia_content_item" v-if="parts&&parts.length>0">
          <div class="encyclopedia_title">文献</div>
          <div class="encyclopedia_body">
            <div class="encyclopedia_first_catalogue" v-for="(item,index) in parts" :key="index">
              <div
                class="encyclopedia_catalogue"
                :class="{'is_active':partIndex===index}"
                :key="item.source_id"
                @click="partClick(index)"
              >{{item.source_name}}</div>
              <el-button type="info" @click="z(item,index,)" class="el-icon-edit modify"></el-button>
              <el-button type="danger" @click="deletePart(item.source_id)" class="el-icon-delete"></el-button>
            </div>
          </div>
        </div>
        <div class="encyclopedia_content_item" v-if="parts&&parts.length>0">
          <div class="encyclopedia_title">对应链接</div>
          <div class="encyclopedia_body">
            <el-input class="recipient_email" v-model="parts[partIndex].link" @change="linkModify"></el-input>
          </div>
        </div>
        <div class="encyclopedia_content_item">
          <div class="encyclopedia_title">当前所属子目录</div>
          <div class="encyclopedia_body">
            <!-- <el-input class="recipient_email" v-model="parts[partIndex].link" @change="linkModify"></el-input> -->
            <el-select v-model="secondValue" placeholder="建模" @change="secondChangeFn">
              <el-option
                v-for="item in secondData"
                :key="item.menu_id"
                :label="item.name"
                :value="item.menu_id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <el-button @click="cancelModify">取消</el-button>
      <el-button type="primary" @click="confirmModify">修改</el-button>
    </div>

    <!--目录修改弹窗-->
    <el-dialog custom-class="catalogueModify" :visible.sync="catalogueVisible" width="800px">
      <span slot="title" class="modifyVisible_title">
        <i class="iconfont icon-edit-square"></i>目录修改
      </span>
      <div class="modifyVisible">
        <div class="catalogue_name">新名称：</div>
        <div>
          <el-input v-model="newCatalogueName"></el-input>
        </div>
      </div>
      <div class="modifyVisible">
        <div class="catalogue_name">内容：</div>
        <div class="catalogue_content">       
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
            :autosize="{ minRows: 2, maxRows: 10 }"
            v-model="newCatalogueContent"
          ></el-input> -->
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="catalogueVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCatalogue">保 存</el-button>
      </span>
    </el-dialog>

    <!--标签修改弹窗-->
    <el-dialog custom-class="modifyDialog" :visible.sync="modifyVisible" width="400px">
      <span slot="title" class="modifyVisible_title">
        <i class="iconfont icon-edit-square"></i>修改
      </span>
      <div class="modifyVisible">
        <p>新名称：</p>
        <div>
          <el-input v-model="newName"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTag">保 存</el-button>
      </span>
    </el-dialog>

    <!--删除弹窗-->
    <delete-modal ref="delete" @doDelete="confirmDelete"></delete-modal>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import DeleteModal from "@/components/public/modalDelete";

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

export default {
  name: "EncyclopediaModify",
  components: {
    BreadCrumb,
    DeleteModal
  },
  data() {
    return {
      /*********************************************************/
      editorOption:this.Tools.getQuillOpotion,
      // editorOption:{ // 富文本编辑器配置
      //     modules:{
      //       toolbar:{
      //         container: toolbarOptions,
      //         handlers: {
      //           'image': function (value) {  // 劫持原来的图片点击按钮事件
      //             if (value) {
      //               document.querySelector('#xx input').click()
      //             } else {
      //               this.quill.format('image', false);
      //             }
      //           }
      //         }
      //       },
      //       imageDrop:true,
      //       imageResize: {
      //         displayStyles: {
      //           backgroundColor: 'black',
      //           border: 'none',
      //           color: 'white'
      //         },
      //         modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
      //       },
      //       ImageExtend: {
      //         loading: true,
      //         name: 'img',
      //         size:1,
      //         action: '',
      //         response: (res) => {
      //           return res.info
      //         },
      //         headers: (xhr) => {
      //           // xhr.setRequestHeader('myHeader','myValue')
      //         },  //设置请求头部
      //         sizeError: () => {
      //           this.$message.error('图片大小超过限制1M')
      //         },  // 图片超过大小的回调
      //         start: () => {},  //自定义开始上传触发事件
      //         end: () => {},  //自定义上传结束触发的事件，无论成功或者失败
      //         error: () => {},  //上传失败触发的事件
      //         success: () => {},  //上传成功触发的事件
      //         change: (xhr, formData) => {
      //           // xhr.setRequestHeader('myHeader','myValue')
      //           // formData.append('token', 'myToken')
      //         } //每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
      //       },
      //     }
      //   },
      /**********************************************************************************************/

      // 面包屑
      breadData: [
        {
          id: 1,
          name: "百科",
          urls: "/index/encyclopedia/encyclopedia",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "百科数据",
          urls: "/index/encyclopedia/encyclopediaData",
          icon: "icon-home"
        }
      ],
      catalogueVisible: false, // 目录修改弹窗
      modifyVisible: false, // 标签/零件修改弹窗
      encyclopediaInfo: {
        id: "", // 百科id
        title: "", // 百科题目
        cover: "", // 封面图
        description: "" // 描述
      }, // 百科信息
      firstCatalogue: [], // 一级目录
      secondCatalogue: [], // 二级目录
      tags: [], // 标签
      parts: [{ link: "", source_name: "", source_id: "" }], // 零件
      firstId: "", // 一级目录选中id
      secondId: "", // 二级目录选中id
      secondCatalogueSelect: "", // 二级目录选中值
      isFirst: true, // 是否为一级目录修改
      catalogueId: "", // 目录修改id
      newCatalogueName: "", // 新目录名
      newCatalogueContent: "", // 新目录内容
      isTagModify: true, // 是否为标签修改
      tagId: "", // 标签id
      newName: "", // 新标签名
      partId: "", // 零件id
      partIndex: 0, // 零件选中下标
      partLink: "", // 零件链接
      encyclopediaID:'',//百科全局ID
      secondData: [], //当前所属子目录数据
      secondoldValue: "", //建模
      secondValue: "", //建模
      contentUpData: {}, // 上传参数
      content: '', // 富文本编辑内容
    };
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
          /*this.a.description = this.content;*/
          // const xxx = this.content
          this.newCatalogueContent = this.content;
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




    //获取百科信息
    getEncyclopediaInfo() {
      this.HttpClient.post("/admin/encyclopedias/getInfo", {
        id: this.$route.query.id
      }).then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          console.log(res.data.data);
          this.encyclopediaInfo = res.data.data;
          // this.encyclopediaInfo.cover = JSON.parse(res.data.data.cover).path;
          let { id, title, cover, description, menu, label, source} = res.data.data;
          // this.encyclopediaInfo.id = id;
          // this.encyclopediaInfo.title = title;
          // // this.encyclopediaInfo.cover = JSON.parse(cover);
          // this.encyclopediaInfo.description = description;
          this.firstCatalogue = Object.values(menu);
          console.log(Object.values(menu));
          this.tags = label;
          this.parts = source;
          console.log(this.parts);
          this.secondoldValue = res.data.data.category.menu_1_id;
          this.encyclopediaID = res.data.data.encyclopedia_id;
          this.getchildTypelist(res.data.data.category.folder_id);
        }
      });
    },
    // 获取所属子目录
    getchildTypelist(id){
      let params = {
        menu_id:id,
        menu_type:2,
        type:1
      }
      this.HttpClient.post('/admin/menu/getOneChild',params).then(res => {
        console.log(res.data)
        if(res.data.code == 200){
          this.secondData = res.data.data.child
        }
      })
    },
    // 改变所属子目录
    secondChangeFn(){
      console.log(this.secondoldValue,this.secondValue,this.encyclopediaID);
      
      // this.HttpClient.post('/admin/menuRelationship/destroy',{menu_id:this.secondoldValue,relation_id:this.encyclopediaID}).then(res=>{
      //   console.log(res.data)
      //   if(res.data.code == 200){
      //     let params = {
      //       menu_id:this.secondValue,
      //       relation_id:this.encyclopediaID,
      //       type:0,
      //       relation_type:8
      //     }
      //     this.HttpClient.post('/admin/menuRelationship/create',params).then(res => {
      //       console.log(res.data)
      //       if(res.data.code == 200){
      //         this.$message.success(res.data.msg)
      //       }
      //     })
      //   }else{
      //     this.$message.error(res.data.msg);
      //   }
      // })
    },
    //上传成功
    handleCoverSuccess() {},
    //上传前
    beforeCoverUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt1M = file.size / 1024 / 1024 <= 5;
      console.log(file);
      console.log(file.size / 1024 / 1024);
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      } else {
        this.HttpClient.form("/admin/uploadOneImage", { images: file }).then(
          res => {
            console.log(res);
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.encyclopediaInfo.cover[0].path = res.data.path.substring(25);
              // res.data.path.slice(res.data.path.indexOf('images'))
            } else {
              this.$message.error(res.data.msg);
            }
          }
        );
      }
      return isJPG && isLt1M;
    },
    //一级目录点击事件
    firstClick(id, index) {
      this.firstId = id;
      console.log(this.firstCatalogue);
      this.secondCatalogue = this.firstCatalogue[index].child;
      console.log(this.secondCatalogue);
    },
    //二级目录点击事件
    secondClick(id) {
      this.secondId = id;
    },
    //目录修改事件
    catalogueModify(id, content, name, bool) {
      this.catalogueId = id;
      this.isFirst = bool;
      this.newCatalogueName = name;
      this.content = content;
      this.catalogueVisible = true;
    },
    //目录修改
    updateCatalogue() {
      this.newCatalogueContent = this.content;
      console.log(this.newCatalogueContent)
      this.HttpClient.post("/admin/encyclopedias/editMenu", {
        catalog_id: this.catalogueId,
        name: this.newCatalogueName,
        content: this.newCatalogueContent
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          if (this.isFirst) {
            this.firstCatalogue.map(item => {
              if (item.catalog_id === this.catalogueId) {
                item.name = this.newCatalogueName;
              }
            });
          } else {
            this.secondCatalogue.map(item => {
              if (item.catalog_id === this.catalogueId) {
                item.name = this.newCatalogueName;
              }
            });
          }
          this.newCatalogueName = "";
          this.newCatalogueContent = "";
          this.catalogueVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //标签点击事件
    tagClick(i) {
      this.tagId = i.tag_id;
      console.log(i)
      this.newName = i.name;
      this.isTagModify = true;
      this.modifyVisible = true;
    },
    //删除标签
    deleteTag(id) {
      this.tagId = id;
      this.$refs.delete.deleteDialog = true;
    },
    //确认删除
    confirmDelete(bool) {
      if (bool) {
        this.HttpClient.post("/admin/tags/del", {
          tag_id: this.tagId,
          relation_id: this.$route.query.aid
        }).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.tags.map((item, index) => {
              if (item.tag_id === this.tagId) {
                this.tags.splice(index, 1);
              }
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    //标签/零件修改
    updateTag() {
      if (this.isTagModify) {
        this.HttpClient.post("/admin/tags/edit", {
          tag_id: this.tagId,
          name: this.newName,
          relation_id: this.$route.query.aid
        }).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.modifyVisible = false;
            this.tags.map(item => {
              if (item.tag_id === this.tagId) {
                item.name = this.newName;
              }
            });
            this.newName = "";
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        this.HttpClient.post("/admin/source/edit", {
          name: this.newName,
          source_id: this.partId,
          relation_id: this.$route.query.aid,
          link: this.partLink,
          type: 2
        }).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.modifyVisible = false;
            this.parts.map(item => {
              if (item.source_id === this.partId) {
                item.source_name = this.newName;
              }
            });
            this.newName = "";
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    //零件点击事件
    partClick(index) {
      this.partIndex = index;
    },
    //零件修改
    z(i, index) {
      this.partId = i.source_id;
      console.log(i)
      this.newName = i.source_name;
      this.partIndex = index;
      this.partLink = i.link;
      this.modifyVisible = true;
      this.isTagModify = false;
    },
    //零件链接修改
    linkModify() {
      let obj = this.parts[this.partIndex];
      let parameters = {
        name: obj.source_name,
        source_id: obj.source_id,
        relation_id: this.$route.query.aid,
        link: obj.link,
        type: 2
      };
      this.HttpClient.post("/admin/source/edit", parameters).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //零件删除
    deletePart(id) {
      this.HttpClient.post("/admin/source/del", {
        tag_id: id,
        relation_id: this.$route.query.aid
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          this.parts.map((item, index) => {
            if (item.source_id === id) {
              this.parts.splice(index, 1);
            }
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //取消修改
    cancelModify() {
      this.$router.go(-1);
    },
    //确认修改
    confirmModify() {
      console.log(this.encyclopediaInfo)
      this.HttpClient.post("/admin/encyclopedias/edit",{
        id:this.encyclopediaInfo.id,
        title:this.encyclopediaInfo.title,
        cover:this.Tools.handleImg(this.encyclopediaInfo.cover[0].path),
        description:this.encyclopediaInfo.description,
        category_id:this.secondValue,
      })
      .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            setTimeout(() => {
              this.$router.go(-1);
            }, 500);
          } else {
            this.$message.error(res.data.msg);
          }
      });
    }
  },
  created() {
    this.getEncyclopediaInfo();
  }
};
</script>

<style lang="less">
.encyclopediaData {
  .bread {
    margin: 10px;
  }
  .encyclopediaData_main::-webkit-scrollbar {
    display: none;
  }
  .encyclopediaData_main {
    background: white;
    margin: 10px 10px 0 10px;
    height: calc(100vh - 150px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    padding-bottom: 50px;
    overflow-y: auto;

    /*标题*/

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 40px;
      margin-bottom: 30px;
      border-bottom: 1px solid #dedede;
    }

    /*主体*/
    .encyclopediaData_content {
      text-align: left;
      padding: 0 40px;

      .encyclopedia_content_item {
        display: flex;
        // flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 15px;
        // .el-input--suffix .el-input__inner {
        //   background: orange;
        //   color: #000;
        // }
        .encyclopedia_title {
          width: 120px;
          height: 40px;
          color: #fff;
          line-height: 40px;
          text-align: center;
          margin-right: 10px;
          background: #15bafe;
          border-radius: 3px;
        }
        .encyclopedia_body {
          // width:500px;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          .encyclopedia_first_catalogue {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-right: 10px;

            .encyclopedia_catalogue {
              min-width: 100px;
              height: 40px;
              font-size: 14px;
              line-height: 40px;
              text-align: center;
              border: 1px solid #ccc;
              box-sizing: border-box;
              border-top-left-radius: 3px;
              border-bottom-left-radius: 3px;
              cursor: pointer;
            }
            .encyclopedia_catalogue:hover {
              color: #15bafe;
              border-color: #15bafe;
            }
            .encyclopedia_catalogue:active {
              color: #fff;
              border-color: #15bafe;
              background: #15bafe;
            }
            .encyclopedia_catalogue.is_active {
              color: #fff;
              border-color: #15bafe;
              background: #15bafe;
            }
            .el-button {
              width: 37px;
              color: #fff;
              font-size: 14px;
              padding: 12px 4px;
              // border: 1px solid #f55959;
              border-left: none;
              // background: #f55959;
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
            }
            .el-button:active {
              border-color: #ccc;
            }
            .el-button + .el-button {
              margin-left: 0;
            }
            .modify {
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
              border-right: 1px solid #aaa;
            }
          }
        }
      }
      .encyclopedia_content_items {
        .encyclopedia_body {
          width: 100%;
          margin-top: 15px;

          .encyclopedia_textarea {
            width: 610px;
          }
        }
      }
    }
  }

  /*目录修改弹窗*/
  .catalogueModify {
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
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 15px;

      .catalogue_name {
        width: 100px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        background: #15bafe;
        border-radius: 3px;
        box-sizing: border-box;
        margin-right: 10px;
      }
      .catalogue_content {
        width: 100%;
        margin-top: 15px;
      }
    }
  }

  /*标签修改弹窗*/
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
