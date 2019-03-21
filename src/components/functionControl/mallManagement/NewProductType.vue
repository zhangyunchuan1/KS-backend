<template>
  <div class="NewprodutType">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="productbox">
      <div class="headerbox">新增产品类型</div>
      <div class="product_header">
        <div class="chooseType">添加</div>
        <el-input placeholder="产品类别名称" v-model="productName" clearable style="width:30%"></el-input>
      </div>
      <div class="product_header">
        <div class="chooseType chooseType1">上传展示图片</div>
        <el-upload
          class="avatar-uploader"
          action="/"
          :show-file-list="false"
          :before-upload="imageUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="product_header">
        <div class="chooseType">自定义</div>
      </div>
      <div class="product_header">
        <div class="product_header">
          <div class="chooseType">选择框</div>
          <el-button type="primary" @click="addName">添加</el-button>
        </div>
      </div>
      <div class="product_header">
        <div style="width:100%">
          <!-- 选择框 -->
          <div>
            <div>
              <el-card class="box-card" style="margin-bottom:20px;">
                <div slot="header" class="clearfix">
                  <span>选择框属性</span>
                </div>
                <el-tag
                  type="success"
                  v-for="(item,index) in titleSuccessTags"
                  :key="index"
                >{{item}}</el-tag>
              </el-card>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>选择框</span>
                </div>
                <el-radio-group v-model="selectTypeotitle" size="small">
                  <el-radio
                    @change="changeTitleFn(item)"
                    :label="item"
                    v-for="(item,index) in titleTags"
                    :key="index"
                    border
                  >
                    {{item}}
                    <el-button icon="el-icon-delete" @click="deletetypeTitle(item)"></el-button>
                  </el-radio>
                </el-radio-group>
              </el-card>
              <!-- </div>
              <div class="product_header">-->
              <div v-if="isshowchosebox">
                <el-card class="box-card">
                  <div class="smallbox">
                    <div class="chooseType">类型</div>
                    <el-radio-group v-model="typeListModel" size="small">
                      <el-radio
                        @change="changetypeModel(item)"
                        :label="item.type"
                        v-for="(item,index) in typeList"
                        :key="index"
                        border
                      >{{item.name}}</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="smallbox">
                    <div class="chooseType">是否必填</div>
                    <el-radio-group v-model="selectisnotitle" size="small">
                      <el-radio
                        @change="changeisnoModel(item)"
                        :label="item.type"
                        v-for="(item,index) in ifwordList"
                        :key="index"
                        border
                      >{{item.name}}</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="smallbox">
                    <div class="chooseType chooseType1">用户是否可搜索</div>
                    <el-radio-group v-model="selectSearchtitle" size="small">
                      <el-radio
                        @change="changesearchModel(item)"
                        :label="item.type"
                        v-for="(item,index) in choseSearchList"
                        :key="index"
                        border
                      >{{item.name}}</el-radio>
                    </el-radio-group>
                  </div>
                  <div>
                    <div class="product_header">
                      <div class="chooseType">现有选项</div>
                      <el-input
                        placeholder="请输入内容"
                        v-model="productType"
                        clearable
                        style="width:30%"
                      ></el-input>
                      <ul v-if="this.optionsChoseData.length!==0 && this.isshowchosedata">
                        <li
                          v-for="(item,index) in optionsChoseData"
                          :key="index"
                          @click="choseSuretype(item.name)"
                        >{{item.name}}</li>
                      </ul>

                      <el-button type="primary" icon="el-icon-plus" @click="addproductTitle"></el-button>
                    </div>
                    <div class="product_header">
                      <el-card class="box-card">
                        <el-tag
                          v-for="tag in tags"
                          :key="tag"
                          closable
                          type
                          @close="deleteInforFn(tag)"
                        >{{tag}}</el-tag>
                      </el-card>
                    </div>
                  </div>
                </el-card>
                <div class="product_header" style="margin-top:20px;">
                  <el-button>取消</el-button>
                  <el-button type="primary" @click="sureSavechoseFn">确定</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 数字区间 -->
      <!-- <div v-if="isshowbigbox"> -->
      <div class="product_header" style="margin-top:50px;">
        <div style="width:100%">
          <div class="product_header">
            <el-checkbox label="数字区间" border></el-checkbox>
            <el-button type="primary" @click="addNumName">添加</el-button>
          </div>
        </div>
      </div>
      <div>
        <div class="product_header">
          <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>数字区间属性</span>
              </div>
              <el-tag
                type="success"
                v-for="(item,index) in numSuccessTags"
                :key="index"
              >{{item}}</el-tag>
          </el-card>
        </div>
      </div>
      

      <!-- 数字区间 -->
      <div>
        <div>
          <div class="product_header">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>数字区间</span>
              </div>
              <el-radio-group v-model="selectNumTypeotitle" size="small">
                <el-radio
                  @change="changeboxNumModel"
                  :label="item"
                  v-for="(item,index) in titleNumTags"
                  :key="index"
                  border
                >
                  {{item.name}}
                  <el-button icon="el-icon-delete" @click="deletetypeNumTitle(item)"></el-button>
                </el-radio>
              </el-radio-group>
            </el-card>
          </div>

          <div class="product_header" v-if="isshowNumchosebox">
            <div class="product_header"></div>
            <el-card class="box-card">
              <div class="smallbox">
                <div class="chooseType">类型</div>
                <el-radio-group v-model="typeNumListModel" size="small">
                  <el-radio
                    @change="changeNumtypeModel(item)"
                    :label="item.type"
                    v-for="(item,index) in typeNumList"
                    :key="index"
                    border
                  >{{item.name}}</el-radio>
                </el-radio-group>
              </div>
              <div class="smallbox">
                <div class="chooseType">是否必填</div>
                <el-radio-group v-model="selectNumcontent" size="small">
                  <el-radio
                    @change="changeNumisModel(item)"
                    :label="item.type"
                    v-for="(item,index) in ifwordList"
                    :key="index"
                    border
                  >{{item.name}}</el-radio>
                </el-radio-group>
              </div>
              <div class="smallbox">
                <div class="chooseType chooseType1">用户是否可搜索</div>
                <el-radio-group v-model="numSearchtitle" size="small">
                  <el-radio
                    @change="changenumModel(item)"
                    :label="item.type"
                    v-for="(item,index) in numSearchList"
                    :key="index"
                    border
                  >{{item.name}}</el-radio>
                </el-radio-group>
              </div>

              <div class="product_header">
                <el-button>取消</el-button>
                <el-button type="primary" @click="sureSaveNumFn">确定</el-button>
              </div>
            </el-card>
          </div>
        </div>
        <div class="product_header" style="margin-top:50px;">
          <el-button>取消</el-button>
          <el-button type="primary" @click="surechoseNumboxFn">确定添加</el-button>
        </div>
      </div>

      <!-- 选择框弹框 -->
      <el-dialog title="添加选择框" :visible.sync="isshowAddtitle" width="30%" center>
        <div style="margin-bottom:10px">
          <el-tag type="info">属性名称：</el-tag>
          <el-select v-model="inputTitle" placeholder="请选择">
            <el-option
              v-for="item in selectData"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isshowAddtitle = false">取 消</el-button>
          <el-button type="primary" @click="sureSelectFn">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 数字区间弹框 -->
      <el-dialog title="添加数字区间" :visible.sync="centerDialogVisible" width="30%" center>
        <div style="margin-bottom:10px">
          <el-tag type="info">属性名称：</el-tag>
          <el-select v-model="propertyValue" placeholder="请选择" @change="changeproValue">
            <el-option
              v-for="item in propertyOptions"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <div>
          <el-tag type="info">单位：</el-tag>
          <el-select v-model="unitValue" placeholder="请选择">
            <el-option
              v-for="item in unitOptions"
              :key="item.id"
              :label="item.unit"
              :value="item.unit"
            ></el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureNumFn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "NewProductType",
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
          name: "新增产品类型",
          urls: "/index/functionControl/mallManagement/new-product-type",
          icon: "icon-home"
        }
      ],
      
      numSuccessTags:[],//数字区间确认属性
      titleSuccessTags: [], //选择框确认属性
      isshowchosedata: true,
      optionsChoseData: [], //选择框模糊搜索数据
      // isshowbigbox: false, //显示确定取消
      // typeID: null, //选中ID
      // menuList: [], //选择产品类型
      // selectVideotitle: "", //选中的产品类型
      selectchoseboxtitle: false, //选择框
      // selectNumtitle: false, //数字区间
      productName: "", //产品类别名称
      productType: "", //现有选项
      tags: [], //添加的现有选项
      //   menuEditList: ["选择框", "数字区间"], //自定义选项
      isshowAddtitle: false, //添加标题
      inputTitle: "", //添加的标题内容
      titleTags: [], //添加的标题内容列表
      chosewordtype: null, //选择框单选多选类型
      chosefill: null, //选择框是否选填
      selectTypeotitle: "", //当前选中的标题内容
      titleClick: false,
      typeList: [{ type: 1, name: "单选" }, { type: 2, name: "多选" }], //类型
      typeListModel: "", //选中类型
      ifwordList: [{ type: 0, name: "必填" }, { type: 1, name: "选填" }], //是否必填列表
      choseSearchList: [
        { type: 0, name: "不能搜索" },
        { type: 1, name: "可以搜索" }
      ], //是否可以搜索
      selectSearchtitle: "", //选择框是否搜索
      selectisnotitle: "", //选择框是否必填
      isshowchosebox: false, //是否显示选择框

      isshowNumchosebox: false, //是否显示数字区间
      titleNumTags: [], //数字区间填写内容
      selectNumTypeotitle: "", //
      typeNumList: [
        { type: 3, name: "整数" },
        { type: 4, name: "一位小数" },
        { type: 5, name: "两位小数" }
      ], //数字区间填写类型
      numSearchtitle: "",
      numSearchList: [
        { type: 0, name: "不能搜索" },
        { type: 1, name: "可以搜索" }
      ], //是否可以搜索
      typeNumListModel: "", //数字区间选中类型
      selectNumcontent: null, //数字区间是否必填
      //   图片上传
      imageUrl: "",

      // 选择框名称数据
      selectData: [],

      // 属性数组
      // showpropertyArray:[],
      propertyArray: [],
      //   弹框
      centerDialogVisible: false,
      // 属性名称
      propertyOptions: [],
      propertyValue: "",
      // 单位
      unitOptions: [],
      unitValue: ""
    };
  },
  mounted() {},
  watch: {
    productType() {
      if(this.productType !== ''){
        this.HttpClient.post("/admin/category/checkValue", {
          value_name: this.productType
        }).then(res => {
          console.log(res.data);
          if (res.data.code === 200) {
            this.optionsChoseData = res.data.data;
            this.isshowchosedata = true;
          }
        });
      }else{
        this.isshowchosedata = false;
      }
      
    }
  },
  methods: {
    // 获取选择框列表
    getNumname() {
      this.HttpClient.get("/admin/selectBox").then(res => {
        if (res.data.code == 200) {
          console.log(res)
          this.selectData = res.data.data.data;
        }
      });
    },
    // 选择框下拉选择
    choseSuretype(name) {
      this.productType = name;
      this.isshowchosedata = false;
      // console.log(this.productType)
      this.addproductTitle();
    },
    // 获取属性名称列表
    getpropertyOptions() {
      this.HttpClient.post("/admin/numInterval/getName").then(res => {
        console.log(res);
        this.propertyOptions = res.data.data;
      });
    },
    // 获取单位列表
    getnuitlist() {
      let params = {
        name: this.propertyValue
      };
      this.HttpClient.post("/admin/numInterval/getListByName", params).then(
        res => {
          console.log(res.data.data);
          this.unitOptions = res.data.data;
        }
      );
    },
    // 调用新增接口
    getaddlist() {
      let params = {
        name: this.productName,
        image: this.imageUrl,
        property_array: this.propertyArray
      };
      console.log(params);
      // this.HttpClient.post("/admin/category/create", params).then(res => {
      //   if (res.data.code === 200) {
      //     this.$message.success(res.data.msg);
      //     setTimeout(() => {
      //       this.$router.push({path:"/index/functionControl/mallManagement/product-catalog-assignment"})
      //     }, 500);
      //   } else {
      //     this.$message.warning(res.data.msg);
      //   }
      // });
    },
    // 选择框选择
    changeTitleFn(val) {
      this.isshowchosebox = !this.isshowchosebox;
      this.selectTypeotitle = val;
    },
    // 数字区间弹框数据获取
    changeproValue() {
      this.getnuitlist();
    },
    // 选择框确定
    sureSavechoseFn() {
      var obj = [];
      // var obj1 = {};
      var propertyID = "";
      this.selectData.forEach(item => {
        // console.log(this.selectTypeotitle)
        if (item.name == this.selectTypeotitle) {
          propertyID = item.property_id;
        }
      });
      obj["property_id"] = propertyID;
      obj["name"] = this.selectTypeotitle;
      obj["rule"] = this.chosewordtype;
      obj["selective"] = this.chosefill;
      obj["search"] = this.selectSearchtitle;
      obj["values"] = this.tags;
      obj["quantity"] = this.tags.length;
      obj["type"] = 0;
      this.propertyArray.push(obj);
      console.log(this.selectTypeotitle);
      this.titleSuccessTags.push(this.selectTypeotitle);
      setTimeout(() => {
        this.typeListModel = "";
        this.selectisnotitle = "";
        this.selectSearchtitle = "";
        this.selectTypeotitle = "";
        this.tags = [];
        this.titleTags = [];
      }, 500);
      this.$message.success("操作成功");
      this.isshowchosebox = false;
      console.log(this.propertyArray);
      // console.log(this.showpropertyArray);
    },
    // 数字区间确定
    sureSaveNumFn() {
      var obj = [];
      var arr = [];
      arr.push(this.unitValue);
      console.log(this.selectNumTypeotitle)
      console.log(this.propertyValue)
      console.log(arr)
      this.isshowNumchosebox = false;
      obj["property_id"] = this.selectNumTypeotitle.proid;
      obj["name"] = this.propertyValue;
      obj["rule"] = this.typeNumListModel;
      obj["selective"] = this.selectNumcontent;
      obj["search"] = this.numSearchtitle;
      obj["values"] = arr;
      obj["quantity"] = arr.length;
      obj["type"] = 1;
      this.propertyArray.push(obj);
      console.log(this.selectNumTypeotitle)
      this.numSuccessTags.push(this.selectNumTypeotitle.name);
      setTimeout(() => {
        this.typeNumListModel = "";
        this.selectNumcontent = "";
        this.numSearchtitle = "";
      }, 500);
      this.$message.success("操作成功");
      setTimeout(() => {
          this.propertyValue = '';
          this.unitValue = '';
          this.selectNumTypeotitle = "";
          this.titleNumTags = [];
      }, 200);
      
      // console.log
      console.log(this.propertyArray);
    },
    addNumName() {
      this.centerDialogVisible = true;
      this.centerDialogVisible = true;
      this.getpropertyOptions();
    },
    // 数字区间选中内容
    changeboxNumModel() {
      console.log(this.selectNumTypeotitle)
      // this.selectNumTypeotitle = val;
      this.isshowNumchosebox = true;
    },
    // 类型
    changetypeModel(val) {
      this.chosewordtype = val.type;
    },
    // 是否必填
    changeisnoModel(val) {
      this.chosefill = val.type;
    },
    // 是否可以搜索
    changesearchModel(val) {
      this.selectSearchtitle = val.type;
    },
    changenumModel(val) {
      this.numSearchtitle = val.type;
    },
    // 数字内容类型
    changeNumtypeModel(val) {
      this.typeNumListModel = val.type;
    },
    // 数字类型是否必填
    changeNumisModel(val) {
      this.selectNumcontent = val.type;
    },
    // 添加自定义选项

    //图片上传
    imageUpload(file) {
      this.HttpClient.form("/admin/uploadOneImage", { images: file }).then(
        res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.imageUrl = res.data.path;
          }
        }
      );
    },
    // 添加现有选项
    addproductTitle() {
      if (this.productType == "") {
        this.$message.warning("现有选项属性不得为空！");
      } else {
        this.tags.push(this.productType);
        this.productType = "";
      }
    },
    // 显示添加标题输入框
    addName() {
      this.isshowAddtitle = true;
      this.getNumname();
    },
    sureSelectFn() {
      this.isshowAddtitle = false;
      this.titleTags.push(this.inputTitle);
      this.inputTitle = "";
    },
    // 点击选择当前选中的标题内容
    choseType(val) {
      this.titleClick = true;
    },
    // 删除标题输入框列表
    deletetypeTitle(val) {
      this.titleTags.forEach((e, i) => {
        if (e == val) {
          this.titleTags.splice(i, 1);
          this.isshowchosebox = false;
          this.typeListModel = '';
          this.selectisnotitle = '';
          this.selectSearchtitle = '';
          this.tags = [];
          this.selectTypeotitle = '';
        }
      });
    },
    // 删除数字区间输入内容列表
    deletetypeNumTitle(val) {
      this.titleNumTags.forEach((e, i) => {
        if (e == val) {
          this.titleNumTags.splice(i, 1);
        }
      });
    },
    // 选择框现有选项删除
    deleteInforFn(val) {
      this.tags.forEach((e, i) => {
        if (val === e) {
          this.tags.splice(i, 1);
        }
      });
    },
    // 数字区间弹框确定
    sureNumFn() {
      if(this.unitValue == '' || this.propertyValue == ''){
        this.$message.warning('数字区间属性不能为空！')
      }else{
        this.centerDialogVisible = false;
        var str = this.propertyValue + "(" + this.unitValue + ")";
        var obj = {};
        obj.name = str;
        var proid = "";
        this.unitOptions.forEach(item => {
          if (this.unitValue == item.unit) {
            proid = item.property_id;
          }
        });
        obj.proid = proid;
        // this.numarr.push()
        this.titleNumTags.push(obj);
        
        console.log(this.titleNumTags);
      }
    },
    // 确定
    surechoseNumboxFn() {
      this.getaddlist();
    }
  }
};
</script>

<style lang='less'>
.NewprodutType .productbox .product_header .avatar {
  height: auto !important;
}
.NewprodutType {
  .bread {
    margin: 10px;
  }
  .productbox {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
    .headerbox {
      border-bottom: 1px solid #dedede;
      text-align: left;
      padding: 10px 0;
      margin-bottom: 30px;
    }
    .product_header {
      display: flex;
      margin-bottom: 10px;
      position: relative;
      ul {
        padding: 5px 11px;
        border: 1px solid #dedede;
        border-radius: 4px;
        background: #fff;
        position: absolute;
        top: 40px;
        left: 88px;
        z-index: 5;
        min-width: 27%;
        height: 54px;
        overflow-y: scroll;
        li {
          padding: 0 5px;
          font-size: 14px;
          color: #606266;
          cursor: pointer;
          margin-bottom: 5px;
        }
        li:hover {
          background: #f6f6f8;
        }
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
      .smallbox {
        display: flex;
        margin-bottom: 10px;
      }
      .chooseType {
        width: 76px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #dedede;
        border-radius: 4px;
        font-size: 14px;
        margin-right: 10px;
      }
      .chooseType1 {
        width: 120px;
      }
      .el-radio__input {
        display: none;
      }
      .el-checkbox__input {
        display: none;
      }
      .el-radio__label {
        padding-left: 5px;
        .el-button {
          padding: 0 10px;
          border: none;
        }
      }
      .el-input {
        // width: 30%;
        .el-input__inner {
          height: 34px;
        }
      }
      .el-button {
        padding: 8px 20px;
        margin-left: 10px;
      }
      .el-card {
        width: 50%;
        text-align: left;
        .el-tag {
          margin: 0 5px 5px 0;
          cursor: pointer;
        }
      }
      .customTitle {
        .el-input {
          width: 60%;
        }
      }
    }
  }
}
</style>
