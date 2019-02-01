<template>
  <div class="productmanagementBox">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="productbox">
      <div class="headerbox">修改产品类型</div>
      <div class="product_header">
        <el-input placeholder="请输入产品类型" v-model="productType" clearable></el-input>
        <el-button type="primary" @click="searchProductType" style="margin-right:20px;">搜索</el-button>
        <el-input placeholder="请输入产品ID" v-model="productID" clearable></el-input>
        <el-button type="primary" @click="searchProductID">搜索</el-button>
      </div>
      <!-- 列表 -->
      <div>
        <div class="product_header">
          <div class="imgAndwordBox" v-for="(item,index) in listData" :key="index">
            <div class="imgbox">
              <img :src="Tools.handleImg(item.image)" class="image">
            </div>
            <div style="padding: 14px;">
              <p>{{item.name}}</p>
              <el-button type="primary" class="el-icon-edit" @click="amendList(item)"></el-button>
            </div>
          </div>
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

      <!-- 修改弹框 -->
      <div>
        <el-dialog title="修改" :visible.sync="centerDialogVisible" width="900px" center>
          <div class="productname">
            <span>属性名称：</span><el-input placeholder="请输入内容" v-model="amendname" clearable style="width:30%;"></el-input>
          </div>
          <div class="productname">
            <span>图片：</span><div style="display:flex;margin-top:10px;">
              <el-upload
                class="avatar-uploader"
                action="/"
                :show-file-list="false"
                :before-upload="imageUpload"
              >
                <img v-if="imgurl == ''" :src="Tools.handleImg(typeImage)" class="avatar">
                <img v-else :src="imgurl" class="avatar">
              </el-upload>
          </div>

            <div style="display:flex">
              <!-- 选择框 -->
              <div style="width:50%">
                <div class="product_header">
                  <div class="titlebox">选择框</div>
                  <div class="customTitle">
                    <el-button type="primary" icon="el-icon-plus" @click="addtypeTitle"></el-button>
                  </div>
                </div>
                <div class="product_header">
                  <el-card class="box-card">
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
                  <!-- 新增 -->
                  <el-card class="box-card">
                    <el-radio-group v-model="selectnewTypeotitle" size="small">
                      <el-radio
                        @change="changenewTitlenewFn(item)"
                        :label="item"
                        v-for="(item,index) in newtitleTags"
                        :key="index"
                        border
                      >
                        {{item}}
                        <el-button icon="el-icon-delete" @click="deletetypenewTitle(item)"></el-button>
                      </el-radio>
                    </el-radio-group>
                  </el-card>
                </div>
                <div class="product_header">
                  <el-card class="box-card">
                    <div v-if="isshownewData">
                      <div class="smallbox">
                        <div class="choseType">类型</div>
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
                        <div class="choseType">是否必填</div>
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
                        <div class="choseType" style="width:130px;">用户是否可以搜索</div>
                        <el-radio-group v-model="selectissearch" size="small">
                          <el-radio
                            @change="changesearchModel(item)"
                            :label="item.type"
                            v-for="(item,index) in searchchoseList"
                            :key="index"
                            border
                          >{{item.name}}</el-radio>
                        </el-radio-group>
                      </div>
                      <div class="smallbox">

                      <div class="product_header nowchoseType">
                        <div class="choseType">现有选项</div>
                        <el-input
                          placeholder="请输入内容"
                          v-model="productchoseType"
                          clearable
                          style="width:65%"
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
                      
                    </div>
                    <div class="product_header">
                        <el-card class="box-card">
                          <el-tag
                            v-for="(tag,index) in tags"
                            :key="index"
                            closable
                            type
                            @close="deleteInforFn(tag)"
                          >{{tag.value || tag}}</el-tag>
                        </el-card>
                        <span
                          slot="footer"
                          class="dialog-footer"
                          style="margin-left:40%;margin-top:20px;"
                        >
                          <!-- <el-button @click="NumcenterDialogVisible = false">取 消</el-button> -->
                          
                        </span>
                      </div>
                    </div>
                  </el-card>
                  <el-button type="primary" @click="sureSavechoseFn" style="margin-top:10px;">确定修改选择框</el-button>
                </div>
              </div>
              <!-- 数字区间 -->
              <div style="width:50%">
                <div class="product_header">
                  <div class="titlebox">数字区间</div>
                  <div class="customTitle">
                    <el-button type="primary" icon="el-icon-plus" @click="addNumbox"></el-button>
                  </div>
                </div>
                <div class="product_header">
                  <el-card class="box-card">
                    <el-radio-group v-model="selectNumTypeotitle" size="small">
                      <el-radio
                        @change="changeNumTitleFn(item)"
                        :label="item"
                        v-for="(item,index) in titleNumTags"
                        :key="index"
                        border
                      >
                        {{item}}
                        <el-button icon="el-icon-delete" @click="deleteNumTitle(item)"></el-button>
                      </el-radio>
                    </el-radio-group>
                  </el-card>
                  <!-- 新增 -->
                  <el-card class="box-card">
                    <el-radio-group v-model="selectNumnewTypeotitle" size="small">
                      <el-radio
                        @change="changenewNumTitleFn(item)"
                        :label="item"
                        v-for="(item,index) in titlenewNumTags"
                        :key="index"
                        border
                      >
                        {{item}}
                        <el-button icon="el-icon-delete" @click="deleteNumnewTitle(item)"></el-button>
                      </el-radio>
                    </el-radio-group>
                  </el-card>
                </div>
                <div class="product_header">
                  <el-card class="box-card">
                    <div v-if="isshowNumtype">
                      <div class="smallbox">
                        <div class="choseType">类型</div>
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
                        <div class="choseType">是否必填</div>
                        <el-radio-group v-model="selectisNumtitle" size="small">
                          <el-radio
                            @change="changeisNumModel(item)"
                            :label="item.type"
                            v-for="(item,index) in ifwordList"
                            :key="index"
                            border
                          >{{item.name}}</el-radio>
                        </el-radio-group>
                      </div>
                      <div class="smallbox">
                        <div class="choseType" style="width:130px">用户是否可以搜索</div>
                        <el-radio-group v-model="selectnumsearch" size="small">
                          <el-radio
                            @change="changenumSearchModel(item)"
                            :label="item.type"
                            v-for="(item,index) in searchnumList"
                            :key="index"
                            border
                          >{{item.name}}</el-radio>
                        </el-radio-group>
                      </div>
                    </div>
                  </el-card>
                </div>

                <!-- <div class="product_header">
                  <span
                    slot="footer"
                    class="dialog-footer"
                    style="margin-left:40%;margin-top:20px;"
                  > -->
                    <!-- <el-button @click="NumcenterDialogVisible = false">取 消</el-button> -->
                    <el-button type="primary" @click="sureSaveNumFn">确定修改数字区间</el-button>
                  <!-- </span>
                </div> -->
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureModifyProductFn">提交修改</el-button>
          </span>
        </el-dialog>


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
        <el-dialog title="添加数字区间" :visible.sync="NumcenterDialogVisible" width="30%" center>
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
            <el-button @click="NumcenterDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureNumFn">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "ModifyProductType",
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
          name: "修改产品类型",
          urls: "/index/functionControl/mallManagement/modify-product-type",
          icon: "icon-home"
        }
      ],
      //   列表数据
      listData: [],
      productamendID: null, //修改的产品ID

      //   类型选择
      // selectVideotitle: "", //选中的类型
      // selectVideotitleid: "", //选中的类型ID
      // menuList: [], //类型数据

      //   搜索框
      productType: "", //输入的产品类型
      productID: null, //输入的产品ID

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0, // 数据总条数

      //   修改弹框
      centerDialogVisible: false,
      amendname: "", //修改名
      imgurl: "", //图片
      isshowoldimg: true,
      amenddata: [],

      //   图片上传
      // imageUrl: "",
      typeImage:'',

      //   选择框
      valueChoseData:[],
      isshowchosedata:true,
      optionsChoseData:[],//选择框模糊搜索数据
      isshowAddtitle:false,
      selectData:[],//选择框属性
      inputTitleID:'',
      arrData: [],
      propertyID:'',
      selectTypeotitle: "", //当前选中的标题内容
      titleTags: [], //添加的标题内容列表
      typeListModel: "", //选中类型
      typeListModelID: "", //选中类型id
      typeList: [{ type: 1, name: "单选" }, { type: 2, name: "多选" }], //类型
      ifwordList: [{ type: 0, name: "必填" }, { type: 1, name: "选填" }], //是否必填列表
      searchchoseList: [{ type: 0, name: "不能搜索" }, { type: 1, name: "可以搜索" }], //是否必填列表
      selectissearch:'',
      selectisnotitle: "", //选择框是否必填
      selectisnotitleID: "", //选择框是否必填id
      tags: [], //添加的现有选项/属性值
      tagvalue: {}, //当前选中的属性值
      inputTitle: "", //添加内容input
      productchoseType: "", //现有选项输入框内容
      //   选项框新增
      selectnewTypeotitle: "", //当前选中的标题内容
      newtitleTags: [], //标题内容列表
      isshownewData: false,

      // 数字区间
      numarrData: [],
      NumcenterDialogVisible: false, //显示数字区间弹框
      typeNumListModel: "", //选中的数字区间类型
      typeNumListModelID: "", //选中的数字区间类型
      typeNumList: [
        { type: 3, name: "整数" },
        { type: 4, name: "一位小数" },
        { type: 5, name: "两位小数" }
      ], //数字区间类型列表
      selectnumsearch:'',
      searchnumList: [{ type: 0, name: "不能搜索" }, { type: 1, name: "可以搜索" }], //是否可搜索列表
      selectNumTypeotitle: "", //选中的数字区间内容
      selectNumTypeotitleID: "", //选中的数字区间内容
      titleNumTags: [], //数字区间添加的内容列表
      selectisNumtitle: "", //数字区间是否必填选项
      // 属性名称
      propertyOptions: [],
      propertyValue: "",
      // 单位
      unitOptions: [],
      unitValue: "",

      //   数字区间新增
      isshowNumtype: false,
      selectNumnewTypeotitle: "",
      titlenewNumTags: []
    };
  },
  watch:{
    productchoseType() {
      this.HttpClient.post("/admin/category/checkValue", {
        value_name: this.productchoseType
      }).then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.optionsChoseData = res.data.data;
          this.isshowchosedata = true;
        }
      });
    },
    centerDialogVisible(){
      if(this.centerDialogVisible == false){
        this.amendname = '';
        this.imgurl = '';
        this.selectTypeotitle = '';
        this.typeListModel = '';
        this.selectisnotitle = '';
        this.selectissearch = '';
        this.tags = [];
        this.selectNumTypeotitle = '';
        this.selectNumnewTypeotitle = '';
        this.titlenewNumTags = [];
        this.typeNumListModel = '';
        this.selectisNumtitle = '';
        this.selectnumsearch = '';
        this.newtitleTags = [];
        this.selectnewTypeotitle = '';
        this.isshownewData = false;
        this.isshowNumtype = false;
      }
    }
  },
  mounted() {
    // this.getTypelist();
    this.getlistData();
  },
  methods: {
    // 获取选择框列表
    getNumname() {
      this.HttpClient.get("/admin/selectBox").then(res => {
        if (res.data.code == 200) {
          this.selectData = res.data.data.data;
          console.log(this.selectData)
        }
      });
    },
    // 获取图文列表
    getlistData() {
      let params = {
        size: this.pageSize,
        page: this.currentPage,
        hasProperty: true,
        // folder: this.selectVideotitleid,
        id: this.productID,
        name: this.productType,
        order_time:'desc'
      };
      // console.log(params);
      this.HttpClient.post("/admin/category/lists", params).then(res => {
        if (res.data.code === 200) {
          this.listData = res.data.data.data;
          console.log(this.listData);
          this.total = res.data.data.total;
        }
      });
    },
    // 搜索产品类型
    searchProductType() {
      console.log(this.productType);
      this.getlistData();
    },
    // 搜索产品id
    searchProductID() {
      this.getlistData();
    },
    // 点击修改
    amendList(item) {
      this.centerDialogVisible = true;
      this.productamendID = item.id;

      this.getamendinfoFn();
    },
    // 获取当前修改产品的信息
    getamendinfoFn() {
      this.HttpClient.get("/admin/category/edit", {
        id: this.productamendID
      }).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data);
          var obj = res.data.data;
          this.amenddata = res.data.data;
          this.amendname = obj.name;
          // this.imgurl = obj.image;
          this.typeImage = obj.image.replace('http://cdn.kushualab.com/','')
          // console.log(obj);
          var chosearr = [];
          var numarr = [];
          obj.property.forEach(item => {
            if (item.rule == 1 || item.rule == 2) {
              chosearr.push(item);
            } else {
              numarr.push(item);
            }
          });
          this.arrData = chosearr;
          this.numarrData = numarr;
          var arr1 = [];
          var arr2 = [];
          chosearr.forEach(item => {
            arr1.push(item.property_name);
          });
          numarr.forEach(item => {
            arr2.push(item.property_name);
          });
          this.titleTags = arr1;
          this.titleNumTags = arr2;
          console.log(this.titleTags);
          console.log(this.numarrData);
        }
      });
    },
    // 选择框选中属性
    changeTitleFn(val) {
      this.selectnewTypeotitle = "";
      this.tags = [];
      this.isshownewData = true;
      this.arrData.forEach(item => {
        if (item.property_name == val) {
          this.tags = item.values;
          this.tagvalue = item;
          this.typeListModel = item.rule;
          this.propertyID = item.property_id
          this.selectisnotitle = item.selective;
          this.selectissearch = item.search;
        }
      });
    },
    // 数字区间选中属性
    changeNumTitleFn(val) {
      this.isshowNumtype = true;
      console.log(val);
      console.log(this.numarrData)
      this.numarrData.forEach(item => {
        if (item.property_name == val) {
          console.log(item)
          this.typeNumListModel = item.rule;
          this.selectisNumtitle = item.selective;
          this.selectnumsearch = item.search;
        }
      });
    },
    // 新增数字区间属性
    changenewNumTitleFn(val) {
      console.log('12345676')
      this.isshowNumtype = true;
      this.selectNumnewTypeotitle = val;
    },
    // 新增内容
    changenewTitlenewFn(item) {
      this.selectTypeotitle = '';
      this.typeListModel = '';
      this.selectisnotitle = '';
      this.selectissearch = '';
      // this.selectTypeotitle = item;
      this.tags = [];
      //   this.selectTypeotitle = "";
      this.isshownewData = true;
    },
    // 图片上传
    imageUpload(file) {
      // console.log(file);
      this.HttpClient.form("/admin/uploadOneImage", { images: file }).then(
        res => {
          // console.log(res.data.path);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.imgurl = res.data.path;
            // this.imgurl = res.data.path.replace('http://cdn.kushualab.com/','');
            // console.log(this.imgurl)
            this.isshowoldimg = false;
          }
        }
      );
    },
    // 选择框下拉选择
    choseSuretype(name) {
      this.productchoseType = name;
      this.isshowchosedata = false;
      this.addproductTitle();
    },
    // 添加选择框现有选项
    addproductTitle() {
      // if (this.isshownewData) {
      //   //   var obj = {};
      //   //   obj.value = this.productchoseType;
      //   // this.tags.push(obj);
      console.log(this.tags)
      if(this.productchoseType == ''){
        this.$message.success('属性不能为空！')
      }else{
        this.tags.push(this.productchoseType);
        this.productchoseType = "";
        this.isshowchosedata = false;
      }
        
      // } else {
      //   let params = {
      //     property_id: this.tagvalue.property_id,
      //     value: this.productchoseType
      //   };
      //   this.HttpClient.post("/admin/category/propertyValue", params).then(
      //     res => {
      //       console.log(res.data);
      //       if (res.data.code == 200) {
      //         this.$message.success(res.data.msg);
      //         this.tags.push(this.productchoseType);
      //         this.productchoseType = "";
      //         // setTimeout(() => {
      //         //   this.getamendinfoFn()
      //         // }, 500);
      //       }
      //     }
      //   );
      // }
      console.log(this.tags)
      // var arr = [];
      // this.tags.forEach(item => {
      //   arr.push(item.value)
      // })
      // arr.push(this.productchoseType);
      // this.valueChoseData = arr;
      // console.log(arr);
    },
    // 选择框是否必填
    changeisnoModel(val) {
      this.selectisnotitleID = val.type;
    },
    // 选择框单选多选
    changetypeModel(val) {
      console.log(val);
      this.typeListModelID = val.type;
    },
    // 选择框是否可以搜索
    changesearchModel(val){
      console.log(val)
      this.selectissearch = val.type;
    },
    // 数字区间是否可以搜索
    changenumSearchModel(val){
      console.log(val)
      this.selectnumsearch = val.type;
    },
    // 显示input框
    addtypeTitle() {
      this.isshowAddtitle = true;
      this.getNumname();
    }, 
    // 选择框弹窗点击确定
    sureSelectFn(){
      if(this.inputTitle !== ''){
        this.newtitleTags.push(this.inputTitle);
        
        this.selectData.forEach(item => {
          if(item.name === this.inputTitle){
            this.inputTitleID = item.property_id;
          }
        })
        this.isshowAddtitle = true;
        this.inputTitle = "";
        this.isshowAddtitle = false;
      }else{
        this.$message.warning('请选择选择框属性！')
      }
    },
    // 删除标题输入框列表
    deletetypeTitle(val) {
      // console.log(this.arrData);
      // console.log(val)
      this.amenddata.property.forEach((item,index) => {
        if (item.property_name == val) {
          this.amenddata.property.splice(index,1)
        }
      });
      // console.log(this.arrData)
      console.log(this.amenddata)
      this.titleTags.forEach((item,index) => {
        if(item == val){
          this.titleTags.splice(index,1)
        }
      })
    },
    deletetypenewTitle(val) {
      this.newtitleTags.forEach((e, i) => {
        if (e == val) {
          this.newtitleTags.splice(i, 1);
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
    // 显示数字区间弹框
    addNumbox() {
      this.NumcenterDialogVisible = true;
      if (this.NumcenterDialogVisible) {
        this.getpropertyOptions();
      }
    },
    // 数字区间弹框数据获取
    changeproValue() {
      this.getnuitlist();
    },
    // 数字区间
    changeNumtypeModel(val) {
      this.typeNumListModelID = val.type;
    },
    // 获取属性名称列表
    getpropertyOptions() {
      this.HttpClient.post("/admin/numInterval/getName").then(res => {
        console.log(res);
        this.propertyOptions = res.data.data;
      });
    },
    // 数字区间是否必填选项
    changeisNumModel(val) {
      this.selectNumTypeotitleID = val.type;
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
    // 数字区间弹框确定
    sureNumFn() {
      this.NumcenterDialogVisible = false;
      var str = this.propertyValue + "(" + this.unitValue + ")";
      this.titlenewNumTags.push(str);
    },
    // 删除数字区间添加的内容列表
    deleteNumTitle(val) {
      this.isshowNumtype = false;
      var id = "";
      this.numarrData.forEach(item => {
        console.log(item);
        if (item.property_name == val) {
          id = item.property_id;
        }
      });
      this.HttpClient.delete(`/admin/category/property/${id}`).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.titleNumTags.forEach((e, i) => {
            if (val === e) {
              this.titleNumTags.splice(i, 1);
            }
          });
        }
      });
    },
    // 删除新增框内数字区间属性
    deleteNumnewTitle(val) {
      // this.isshowNumtype = true;
      console.log(this.titlenewNumTags);
      this.titlenewNumTags.forEach((e, i) => {
        if (e == val) {
          this.titlenewNumTags.splice(i, 1);
        }
      });
    },
    // 确定保存数字区间
    sureSaveNumFn() {
      // console.log(this.amenddata)
      if(this.selectNumTypeotitle !== ''){
        this.amenddata.property.forEach((item,index) => {
          console.log(item)
          if(item.property_name == this.selectNumTypeotitle){
              item.rule = this.typeNumListModel;
              item.selective = this.selectisNumtitle;
              item.search = this.selectnumsearch;
              // item.values = this.amenddata;
              // item.quantity = this.tags.length;
              item.type = 1;
          }
        })
      }else if(this.selectNumnewTypeotitle !== ''){
        var obj = {};
        obj.property_id = this.inputTitleID;
        obj.name = this.selectnewTypeotitle;
        obj.rule = this.typeListModel;
        obj.selective = this.selectisnotitle;
        obj.search = this.selectissearch;
        // obj.values = this.tags;
        // obj.quantity = this.tags.length;
        obj.type = 1;
        this.amenddata.property.push(obj);
      }
      setTimeout(() => {
        this.$message.success('操作成功！')
      }, 200);
      console.log(this.amenddata)
    },
    // 确定保存选项框新增属性
    sureSavechoseFn() {
      if(this.selectTypeotitle !== ''){
        this.amenddata.property.forEach((item,index) => {
          if(item.property_name == this.selectTypeotitle){
              item.rule = this.typeListModel;
              item.selective = this.selectisnotitle;
              item.search = this.selectissearch;
              item.values = this.tags;
              item.quantity = this.tags.length;
              item.type = 0;
          }
        })
      }else if(this.selectnewTypeotitle !== ''){
        console.log(this.selectnewTypeotitle)
        var obj = {};
        obj.property_id = this.inputTitleID;
        obj.property_name = this.selectnewTypeotitle;
        obj.rule = this.typeListModel;
        obj.selective = this.selectisnotitle;
        obj.search = this.selectissearch;
        obj.values = this.tags;
        obj.quantity = this.tags.length;
        obj.type = 0;
        this.amenddata.property.push(obj);
      }
      setTimeout(() => {
        this.$message.success('操作成功！')
      }, 200);
    },
    // 保存修改
    sureModifyProductFn(){
      this.amenddata.property.forEach(item => {
        var valuearr = [];
        delete item.category_id;
        delete item.category_name;
        delete item.created_at;
        delete item.id;
        delete item.unit;
        delete item.unit_cn;
        delete item.updated_at;
        delete item.status;
        if(item.values !== null){
          item.values.forEach(e => {
            // console.log(e)
            if(e.value){
              valuearr.push(e.value)
            }else{
              valuearr.push(e)
            }
          })
          item.values = valuearr;
        }
      })
      let params = {
        id:this.amenddata.id,
        name:this.amendname,
        image:this.imgurl == ''?'http://cdn.kushualab.com/' + this.typeImage:this.imgurl,
        property_array:this.amenddata.property
      };
      console.log(params)
      console.log(this.amenddata)
      this.HttpClient.post('/admin/category/edit',params).then(res => {
        // console.log(res.data)
        if(res.data.code === 200){
          this.centerDialogVisible = false;
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getlistData();
            this.amendname = '';
            this.imgurl = '';
            this.selectTypeotitle = '';
            this.typeListModel = '';
            this.selectisnotitle = '';
            this.selectissearch = '';
            this.tags = [];
            this.selectNumTypeotitle = '';
            this.selectNumnewTypeotitle = '';
            this.titlenewNumTags = [];
            this.typeNumListModel = '';
            this.selectisNumtitle = '';
            this.selectnumsearch = '';
            this.newtitleTags = [];
            this.selectnewTypeotitle = '';
          }, 1000);
        }
      })
    },
    // sureSaveFn() {
    //   console.log(this.amenddata);
    //   let params = {
    //     id: this.amenddata.id,
    //     name: this.amendname,
    //     image: this.imageUrl
    //   };
    //   this.HttpClient.post("/admin/category/edit", params).then(res => {
    //     console.log(res.data);
    //     if (res.data.code == 200) {
    //       this.$message.success(res.data.msg);
    //       setTimeout(() => {
    //         this.getlistData();
    //       }, 500);
    //     }
    //   });
    // },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistData();
    }
  }
};
</script>

<style lang="less">
.productmanagementBox {
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
      flex-wrap: wrap;
      .dialog-footer {
        .el-button {
          padding: 5px !important;
        }
      }
      .titlebox {
        border: 1px solid #dedede;
        height: 34px;
        line-height: 34px;
        padding: 2px 10px;
        border-radius: 4px;
      }
      .smallbox {
        display: flex;
        margin-bottom: 10px;
      }
      .el-radio__input {
        display: none;
      }
      .el-radio__label {
        padding-left: 6px;
      }
      .el-input {
        width: 15%;
      }
      .el-card {
        width: 90%;
        .el-card__body {
          .el-button {
            padding: 0;
            border: none;
          }
        }
      }
      .customTitle {
        padding: 0px 0 0 10px;
        .el-input {
          width: 60%;
        }
      }
      .choseType {
        width: 60px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #dedede;
        border-radius: 4px;
        font-size: 12px;
        margin-right: 10px;
        color:#fff;
        background: #409eff;
      }
      .imgAndwordBox {
        border: 1px solid #dedede;
        margin: 20px;
        p{
          font-size: 14px;
          color: #636679;
          width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .el-button--primary{
          width: 100%;
          border-radius: 0px;
        }
        .imgbox {
          width: 100px;
          height: 100px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
        div {
          padding: 0 !important;
        }
      }
    }
    .nowchoseType {
      position: relative;
      .el-input {
        width: 60%;
        .el-input__inner{
          height: 34px;
          border-bottom-right-radius: 0px;
          border-top-right-radius: 0px;
        }
      }
      .el-button {
        padding: 10px 15px !important;
        border-bottom-left-radius: 0px;
        border-top-left-radius: 0px;
      }
      ul{
        position: absolute;
        top: 42px;
        left: 72px;
        background: #fff;
        padding: 5px 15px;
        height: 100px;
        min-width: 185px;
        overflow-y: scroll;
        border: 1px solid #dedede;
        border-radius: 4px;
        z-index: 5;
        li{
          padding: 2px 5px;
          margin-bottom: 5px;
          cursor: pointer;
          list-style:none;
        }
        li:hover{
          background: #f4f4f7;
        }
      }
    }
    .productimage {
      width: 178px;
      height: 178px;
      border: 1px solid #dedede;
      margin-right: 20px;
      img {
        width: 178px;
        // height: 178px;
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
      // height: 178px;
      display: block;
    }
  }
}
</style>
