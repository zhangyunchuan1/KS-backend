<template>
  <div class="producttypeListTitle">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="video_titlebox">
      <div class="videopage_title">
        <div class="title">产品类型解释</div>
      </div>
      <div class="productbox">
        <div class="product_header">
          <div class="choseType">选择</div>
          <el-radio-group v-model="selectVideotitle" size="small">
              <el-radio
              @change="changeproTypeModel()"
              label=""
              border
            >全部</el-radio>
            <el-radio
              @change="changeproTypeModel()"
              :label="item.menu_id"
              v-for="(item,index) in menuList"
              :key="index"
              border
            >{{item.name}}</el-radio>
          </el-radio-group>
        </div>
        <div class="product_header">
          <!-- 搜索 -->
          <div class="search">
            <el-input placeholder="搜索产品类型ID" v-model="searchID" @keyup.13.native="searchIDfn()" clearable @clear="searchIDfn()">
                <el-button slot="append" icon="el-icon-search" @click="searchIDfn()"></el-button>
            </el-input>
          </div>
          <div class="search">
            <el-select v-model="explainValue" clearable placeholder="请选择产品解释"  @change="searchIDfn">
                <el-option
                v-for="item in explainData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </div>
        </div>
        <!-- 表格列表 -->
        <div class="product_header">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="产品类型ID" sortable></el-table-column>
            <el-table-column prop="name" label="产品类型名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="image" label="图片" width="120">
              <template slot-scope="scope">
                <img :src="Tools.handleImg(scope.row.image)" alt class="productImg">
              </template>
            </el-table-column>
            <el-table-column prop="created_at" show-overflow-tooltip label="创建时间" width="180"></el-table-column>
            <el-table-column show-overflow-tooltip label="产品状态">
              <template slot-scope="scope">
                <span>{{scope.row.status == 1?'正常':scope.row.status == 0?'禁用':''}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="description" show-overflow-tooltip label="产品解释">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.has_description == 0"
                  class="sortout_color"
                >无</span>
                <span v-if="scope.row.has_description == 1">有</span>
              </template>
            </el-table-column>
            <el-table-column prop="view_num" show-overflow-tooltip label="解释点击次数"></el-table-column>
            <el-table-column label="操作" align="center" width="350" class-name="mallReview_scope">
              <template slot-scope="scope">
                <div class="mallReview_btm">
                  <el-button type="primary" plain size="mini" v-if="scope.row.description == null || scope.row.description == ''" @click="addExplainFn(scope.row)">添加解释</el-button>
                  <el-button
                    type="primary"
                    plain
                    size="mini"
                    v-if="scope.row.description"
                    @click="modifyExplainFn(scope.row)"
                  >修改解释</el-button>
                  <el-button
                    type="primary"
                    plain
                    size="mini"
                    @click="hancleCheckProperty(scope.row)"
                  >查看属性值</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination
            v-if="total"
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 查看属性值弹框 -->
    <div>
      <el-dialog :title="row.name" :visible.sync="isShowProperty" width="30%" center>
        <div class="showinfo">
          <div>
            <el-radio v-model="selectNum" label="1" border @change="changesSelectFn">选择框</el-radio>
            <el-radio v-model="selectNum" label="2" border @change="changesSelectFn">数字区间</el-radio>
            <el-radio v-model="selectNum" label="3" border @change="changesSelectFn">商家自填框</el-radio>
          </div>
          <div class="boxsh" v-for="(item,index) in selectNumchoseData" :key="index">
            <div>
              <el-tag type="warning">{{item.property_name}}</el-tag>
              <div style="margin-top:10px;" v-if="selectNum == '1'">
                <el-tag v-for="(e,i) in item.values" :key="i">{{e.value}}</el-tag>
              </div>
              <div style="margin-top:10px;" v-if="selectNum == '2'">
                <el-tag>{{item.unit_cn+'('+item.unit+')'}}</el-tag>
              </div>
            </div>
            <div style="margin-top:10px;" v-if="selectNum !== '3'">
              <el-tag
                type="success"
              >{{item.rule == 1?'单选':item.rule == 2?'多选':item.rule == 3?'整数':item.rule == 4?'一位小数':item.rule == 5?'两位小数':''}}</el-tag>
              <el-tag type="success">{{item.selective == 0?'必填':item.selective == 1?'选填':''}}</el-tag>
              <el-tag type="success">{{item.selective == 0?'不可搜索':item.selective == 1?'可以搜索':''}}</el-tag>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 添加解释 -->
    <div>
      <el-dialog title="添加解释" :visible.sync="isShowaddExplain" width="900" center>
        <div class="mail_edit">
          <div class="mail_edit_body">
            <el-upload
              id="xx"
              class="avatar-uploader up_content"
              :action="$uploadPath"
              :data="contentUpData"
              name="file"
              :show-file-list="false"
              :on-success="handleContentSuccess"
              :before-upload="beforeContentUpload"
            ></el-upload>
            <quill-editor
              v-model="content"
              :options="editorOption"
              ref="myQuillEditor"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event,5000)"
            ></quill-editor>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowaddExplain = false">取 消</el-button>
          <el-button type="primary" @click="sureSubmitExplain">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 修改解释 -->
    <div>
      <el-dialog title="修改解释" :visible.sync="isShowmodifyExplain" width="900" center>
        <div class="mail_edit">
          <div class="mail_edit_body">
            <el-upload
              id="xx"
              class="avatar-uploader up_content"
              :action="$uploadPath"
              :data="contentUpData"
              name="file"
              :show-file-list="false"
              :on-success="handlemodifyContentSuccess"
              :before-upload="beforemodifyContentUpload"
            ></el-upload>
            <quill-editor
              v-model="modifycontent"
              :options="editorOption"
              ref="myQuillEditor"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onmodifyEditorChange($event,5000)"
            ></quill-editor>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowmodifyExplain = false">取 消</el-button>
          <el-button type="primary" @click="sureModifyExplain">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/*************富文本**************/
// region
import { quillEditor } from "vue-quill-editor";
import * as Quill from "quill"; //引入编辑器
import moment from "moment";

//quill图片可拖拽改变大小
import ImageResize from "quill-image-resize-module";

Quill.register("modules/imageResize", ImageResize);

//quill图片可拖拽上传
import { ImageDrop } from "quill-image-drop-module";

Quill.register("modules/imageDrop", ImageDrop);

// 自定义字体大小
let fontSize = ["10px", "12px", "14px", "16px", "18px", "20px"];
let Size = Quill.import("attributors/style/size");
Size.whitelist = fontSize;
Quill.register(Size, true);

var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif"
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts; //将字体加入到白名单

import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";

Quill.register("modules/ImageExtend", ImageExtend);

var toolbarOptions = [
  ["italic", "underline", "strike", "bold"],
  ["blockquote", "code-block"],
  // [{'header':1},{'header':2}],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: fontSize }],
  // [{'header':[1,2,3,4,5,6,false]}],
  [{ color: [] }],
  // [{'font':fonts}],
  [{ align: [] }],
  // ['clear'],
  ["image"]
];
//endregion
/*************************************/
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "ProductTypeList",
  components: {
    BreadCrumb
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "功能控制",
          urls: "/index/functionControl",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "商城菜单管理",
          urls: "/index/functionControl/mallManagement/mall-management",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "产品类型解释",
          urls: "/index/functionControl/mallManagement/product-type-explain",
          icon: "icon-home"
        }
      ],

      explainData: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '有'
        }, {
          value: '2',
          label: '无'
        }],
        explainValue: '',

      //   类型选择
      selectVideotitle: "", //选中的类型
      selectVideotitleid: "", //选中的类型ID
      menuList: [], //类型数据

      //   联级选择器
      datalevel: 1,

      //   搜索
      searchID: "", //ID搜索
      searchName: "", //名称搜索

      isShowProperty: false, // 是否显示查看属性值弹框
      selectNum: "1", //选择框和数字区间二选一
      selectNumchoseData: [],

      //   添加解释
      isShowaddExplain: false, //添加解释弹框是否显示
      // 修改解释
      isShowmodifyExplain: false, //修改解释弹框是否显示

      //   表格数据
      tableData: [],
      row: {}, // 表格当前行数据
      properties: [], // 商品属性列表

      editorOption: {
        // 富文本编辑器配置
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                // 劫持原来的图片点击按钮事件
                if (value) {
                  document.querySelector("#xx input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          },
          ImageExtend: {
            loading: true,
            name: "img",
            size: 1,
            action: "",
            response: res => {
              return res.info;
            },
            headers: xhr => {
              // xhr.setRequestHeader('myHeader','myValue')
            }, //设置请求头部
            sizeError: () => {
              this.$message.error("图片大小超过限制1M");
            }, // 图片超过大小的回调
            start: () => {}, //自定义开始上传触发事件
            end: () => {}, //自定义上传结束触发的事件，无论成功或者失败
            error: () => {}, //上传失败触发的事件
            success: () => {}, //上传成功触发的事件
            change: (xhr, formData) => {
              // xhr.setRequestHeader('myHeader','myValue')
              // formData.append('token', 'myToken')
            } //每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          }
        }
      },
      contentUpData: {}, // 上传参数
      content: "", // 富文本编辑内容
      modifycontent: "", //修改解释

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  mounted() {
    this.getTypelist();
    this.getlistDataFn();
  },
  methods: {
    // 弹框数字区间和选择框选择
    changesSelectFn() {
      if (this.selectNum == "1") {
        // this.selectNumchoseData = this.selectData.property_select;
        console.log(this.properties);
        this.selectNumchoseData = [];
        this.properties.forEach(item => {
          if (item.rule === 1) {
            console.log(item.property_name);
            this.selectNumchoseData.push(item);
          } else if (item.rule === 2) {
            console.log(item.property_name);
            this.selectNumchoseData.push(item);
          }
        });
        console.log(this.selectNumchoseData);
      } else if (this.selectNum == "2") {
        console.log(this.properties);
        this.selectNumchoseData = [];
        this.properties.forEach(item => {
          if (item.rule !== 1 && item.rule !== 2) {
            this.selectNumchoseData.push(item);
          }
        });
        console.log(this.selectNumchoseData);
        // this.selectNumchoseData = this.selectData.property_num;
      } else if (this.selectNum == "3") {
      }
    },
    // 获取选择类型
    getTypelist() {
      let params = {
        menu_type: 1,
        type: 0
      };
      this.HttpClient.post("/admin/menu/getList", params).then(res => {
        if (res.data.code === 200) {
          this.menuList = res.data.data;
        }
      });
    },
    // 获取产品类型列表
    getlistDataFn() {
      let params = {
        size: this.pageSize,
        page: this.currentPage,
        hasProperty: true,
        folder: this.selectVideotitle,
        id: this.searchID,
        name: this.searchName,
        order_time: this.sorttimeValue,
        hasDescription:this.explainValue
      };
      this.HttpClient.post("/admin/category/lists", params).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        }
      });
    },
    // ID搜索
    searchIDfn() {
      this.getlistDataFn();
      // this.searchID = ''
    },
    // 名称搜索
    searchNamefn() {
      this.getlistDataFn();
      // this.searchName = ''
    },

    // 选择类型
    changeproTypeModel() {
    //   this.selectVideotitleid = val.menu_id;
      this.getlistDataFn();
    },

    // 查看属性值
    async hancleCheckProperty(row) {
      this.row = row;
      let res = await this.HttpClient.post(
        "/admin/category/getPropertyWithCate",
        { id: row.id }
      );
      let data = await res.data;
      if (data.code === 200) {
        this.isShowProperty = true;
        this.properties = data.data;
      }
      this.selectNum = "1";
      this.selectNumchoseData = [];
      this.properties.forEach(item => {
        if (item.rule === 1 || item.rule === 2) {
          this.selectNumchoseData.push(item);
        }
      });
      console.log(data.data);
    },
    // 添加解释
    addExplainFn(row) {
      console.log(row);
      this.row = row;
      this.isShowaddExplain = true;
    },
    // 修改解释
    modifyExplainFn(row){
      this.modifycontent = row.description;
      this.isShowmodifyExplain = true;
      this.HttpClient.get('/admin/category/edit',{id:row.id}).then(res => {
          console.log(res.data.data)
          if(res.data.code == 200){
              this.row = res.data.data;
          }
      })
    },

    // 确定提交添加解释
    sureSubmitExplain() {
      console.log(this.row);
      this.HttpClient.post("/admin/category/editDescription", {
        id: this.row.id,
        description: this.content
      }).then(res => {
        if (res.data.code === 200) {
          console.log(res.data);
          this.$message.success(res.data.msg);
          this.isShowaddExplain = false;
          setTimeout(() => {
            this.getlistDataFn();
          }, 500);
        }
      });
    },

    // 确定修改解释
    sureModifyExplain() {
      let params = {
          id:this.row.id,
          name:this.row.name,
          image:'http://cdn.kushualab.com/' + this.row.image,
          description:this.modifycontent,
          property_array:this.row.property
      }
      this.HttpClient.post('/admin/category/edit',params).then(res => {
          console.log(res.data)
          if(res.data.code == 200){
              this.$message.success(res.data.msg);
              this.isShowmodifyExplain = false;
              setTimeout(() => {
                  this.getlistDataFn();
              }, 500);
          }
      })
    },

    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistDataFn();
    },
    // /**************************文档编辑器*******************/
    //   // region

    /**编辑器**/
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange(e, decimalNum) {
      //内容改变事件
      //this.content = event.html
      console.log(this.content);
      let lengthcontent = this.content;
      // console.log(this.removeHTMLTag(lengthcontent).length);
      // this.articleData.word_num = this.removeHTMLTag(lengthcontent).length;
      e.quill.deleteText(decimalNum, 1); //保留 strValue 的 前 decimalNum 位字符，
      this.$emit("Quescthon", this.content);
      console.log(this.content);
      const data = this.Tools.getEditorImageAndLength(this.content);
      this.editImageSize = data.imgArray.length;
      console.log(this.modifyData);
      // if (this.removeHTMLTag(lengthcontent).length < 2000) {
      //   this.articleData.content = this.content;
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
      const fileType = file.name.split(".")[1];
      const fileTypeStr = "jpg,png,jpeg,tiff,tif";
      if (fileTypeStr.indexOf(fileType) < 0) {
        this.$message.error("图片类型只能为" + fileTypeStr);
        return false;
      }
      if (!sizeLimit) {
        this.$message.error("上传图片大小不能超过 5MB!");
        return false;
      }
      let self = this;
      let render = new FileReader();
      render.readAsDataURL(file);
      return new Promise((resolve, reject) => {
        render.onload = function() {
          self.contentUpData.token = self.$getQiNiuToken({
            saveKey: file.name
          });
          resolve(true);
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
      console.log(res, file, fileList);
      let quill = this.$refs.myQuillEditor.quill;
      let length = quill.getSelection().index;
      quill.insertEmbed(length, "image", this.$imagePath + file.response.key);
      quill.setSelection(length + 1);
    },
    // endregion

    // /**************************文档编辑器*******************/
    //   // region

    /**编辑器**/
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onmodifyEditorChange(e, decimalNum) {
      //内容改变事件
      //this.content = event.html
      console.log(this.modifycontent);
      let lengthcontent = this.modifycontent;
      // console.log(this.removeHTMLTag(lengthcontent).length);
      // this.articleData.word_num = this.removeHTMLTag(lengthcontent).length;
      e.quill.deleteText(decimalNum, 1); //保留 strValue 的 前 decimalNum 位字符，
      this.$emit("Quescthon", this.modifycontent);
      console.log(this.modifycontent);
      const data = this.Tools.getEditorImageAndLength(this.modifycontent);
      this.editImageSize = data.imgArray.length;
      console.log(this.modifyData);
      // if (this.removeHTMLTag(lengthcontent).length < 2000) {
      //   this.articleData.content = this.content;
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
    beforemodifyContentUpload(file) {
      // console.log(this.editImageSize)
      // if(this.editImageSize >= 8) {
      //   this.$message.error('图片不能超过8张');
      //   return false;
      // }
      const sizeLimit = file.size / 1024 / 1024 < 10;
      const fileType = file.name.split(".")[1];
      const fileTypeStr = "jpg,png,jpeg,tiff,tif";
      if (fileTypeStr.indexOf(fileType) < 0) {
        this.$message.error("图片类型只能为" + fileTypeStr);
        return false;
      }
      if (!sizeLimit) {
        this.$message.error("上传图片大小不能超过 5MB!");
        return false;
      }
      let self = this;
      let render = new FileReader();
      render.readAsDataURL(file);
      return new Promise((resolve, reject) => {
        render.onload = function() {
          self.contentUpData.token = self.$getQiNiuToken({
            saveKey: file.name
          });
          resolve(true);
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
    handlemodifyContentSuccess(res, file, fileList) {
      console.log(res, file, fileList);
      let quill = this.$refs.myQuillEditor.quill;
      let length = quill.getSelection().index;
      quill.insertEmbed(length, "image", this.$imagePath + file.response.key);
      quill.setSelection(length + 1);
    }
    // endregion
  }
};
</script>

<style lang="less">
.producttypeListTitle {
  .bread {
    margin: 10px;
  }
  .video_titlebox {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;
    .videopage_title {
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
    .productbox {
      padding: 20px;
      box-sizing: border-box;
      .product_header {
        display: flex;
        margin-bottom: 10px;
        flex-wrap: wrap;
        .cell {
          .el-tag {
            margin-bottom: 10px;
          }
        }
        .productImg {
          width: 100px;
        }
        .el-table th > .cell {
          text-align: center;
        }
        .el-button--primary {
          margin-left: 10px;
        }
        .search {
          width: 15%;
          padding-left: 10px;
          display: flex;
        }
        .el-radio__input {
          display: none;
        }
        .el-radio__input.is-checked + .el-radio__label {
          padding-left: 5px;
        }
        .choseType {
          width: 60px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          border: 1px solid #dedede;
          border-radius: 4px;
          font-size: 14px;
          margin-right: 10px;
        }
      }
    }
  }
  .showinfo {
    .boxsh {
      margin-top: 10px;
      padding: 4px;
      box-shadow: 5px 5px 45px #b4bfc3;
      border-radius: 5px;
    }
    .el-radio__input {
      display: none;
    }
    .el-tag {
      margin-right: 10px;
    }
  }
}
li {
  list-style: none;
}
.ql-container {
  height: 200px;
}
/* 属性值 弹窗 */
.property-dialog {
  text-align: left;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 15px;
  }
  .title {
    color: #000;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .item {
    margin-bottom: 10px;
  }
  span {
    // display: block;
    // margin-bottom: 8px;
    // color: #333;
  }
  .rule {
    font-size: 12px;
    color: red;
  }
  .property-lists {
    display: flex;
    align-items: center;
    li {
      padding: 2px 6px;
      margin-right: 10px;
      font-size: 12px;
      border: 1px solid #70ad47;
    }
  }
}
</style>
