<template>
  <div class="productcatalogAssignment">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="video_titlebox">
      <div class="videopage_title">
        <div class="title">产品目录分配</div>
      </div>
      <div style="display:flex;">
      <div class="productbox">
        <div class="product_header">
          <div class="choseType">选择</div>
          <el-radio-group v-model="selectVideotitle" size="small">
            <el-radio
              @change="changeproTypeModel(item)"
              :label="item.name"
              v-for="(item,index) in menuList"
              :key="index"
              border
            >{{item.name}}</el-radio>
          </el-radio-group>
        </div>
        <div class="product_header">
          <div class="selects">
            <el-select v-model="value" placeholder="一级目录" @change="changefirstValue()">
              <el-option
                v-for="item in options"
                :key="item.menu_id"
                :label="item.name"
                :value="item.menu_id"
              ></el-option>
            </el-select>
            <el-select v-model="secondValue" placeholder="二级目录" @change="changesecondValue()">
              <el-option
                v-for="item in secondOptions"
                :key="item.menu_id"
                :label="item.name"
                :value="item.menu_id"
              ></el-option>
            </el-select>
            <el-select v-model="thirdValue" placeholder="三级目录" @change="changethirdValue()">
              <el-option
                v-for="item in thirdOptions"
                :key="item.menu_id"
                :label="item.name"
                :value="item.menu_id"
              ></el-option>
            </el-select>
          </div>
        </div>

        <!-- 目录下列表 -->
        <div class="listtable">
          <div class="product_header">
            <!-- <div class="imgAndwordBox" v-for="(item,index) in productData" :key="index"> -->
            <div class="productlistbox">
              <p style="text-align:left">现包含产品类型</p>
              <div style="text-align:left;margin-top:10px">
                <el-radio
                  @change="changeProduct(item)"
                  v-model="selectproductNum"
                  :label="item.id"
                  border
                  size="medium"
                  v-for="item in productData"
                  :key="item.name"
                >
                  {{item.name}}
                  <el-button icon="el-icon-delete" @click="deleteProduct(item.id)"></el-button>
                </el-radio>
              </div>
              <!-- <div class="block">
                <el-pagination
                  v-if="totalpage"
                  layout="prev, pager, next"
                  :total="totalpage"
                  :page-size="pageSize"
                  @current-change="currentpageChange"
                ></el-pagination>
              </div>-->
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
      <div class="productbox">
        <div class="product_header">
          <div class="product_header_search">
            <el-input placeholder="请输入产品类型" v-model="productType" clearable @change="searchProductType"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="searchProductType">搜索</el-button>
          </div>
          <div class="product_header_search">
            <el-input placeholder="请输入产品ID" v-model="productID" clearable @change="searchProductID"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="searchProductID">搜索</el-button>
          </div>
        </div>
        
        <!-- 图文列表 -->
        <div class="listtable">
          <div class="product_header">
            <div class="imgAndwordBox" v-for="(item,index) in listData" :key="index">
              <div class="imgbox">
                <img :src="Tools.handleImg(item.image)" class="image">
              </div>
              <div style="padding: 14px;margin-top:5px">
                <p class="imglist">{{item.name}}</p>
                <el-button type="text" class="button" @click="addList(item)">添加</el-button>
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
      </div>
      </div>

      <!-- 数字区间和选择器弹框 -->
      <div>
        <el-dialog title="选择框和数字区间" :visible.sync="centerDialogVisible" width="30%" center>
          <div class="showinfo">
            <div>
              <el-radio v-model="selectNum" label="1" border @change="changesSelectFn">选择框</el-radio>
              <el-radio v-model="selectNum" label="2" border @change="changesSelectFn">数字区间</el-radio>
            </div>
            <div style="margin-top:10px;" v-for="(item,index) in selectNumchoseData" :key="index">
              <div>
                <el-tag type="warning">{{item.property_name}}</el-tag>
                <el-tag
                  type="success"
                >{{item.rule == 1?'单选':item.rule == 2?'多选':item.rule == 3?'整数':item.rule == 4?'一位小数':item.rule == 5?'两位小数':''}}</el-tag>
              </div>
              <div style="margin-top:10px;" v-if="selectNum == 1">
                <el-tag v-for="(e,i) in item.values" :key="i">{{e.value}}</el-tag>
              </div>
              <div style="margin-top:10px;" v-if="selectNum == 2">
                <el-tag>{{item.unit_cn+'('+item.unit+')'}}</el-tag>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "ProductCatalogAssignment",
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
          name: "产品目录分配",
          urls:
            "/index/functionControl/mallManagement/product-catalog-assignment",
          icon: "icon-home"
        }
      ],

      //   类型选择
      selectVideotitle: "", //选中的类型
      selectVideotitleid: "", //选中的类型ID
      menuList: [], //类型数据

      //   联级选择器
      // datalevel: 1,
      options: [], //一级目录菜单
      value: "", //选中的一级目录菜单
      secondOptions: [], //二级目录菜单
      secondValue: "", //选中的二级目录
      thirdOptions: [], //三级目录菜单
      thirdValue: "", //选中的三级目录

      //   列表数据
      listData: [],

      //   目录列表
      productData: [],
      selectproductNum: "", //点击选中的现包含产品
      selectData: {}, //选中的产品信息
      selectNumchoseData: [], //数字区间或者选择框数据

      // 搜索
      productType: "", //产品类型
      productID: "", //产品ID

      //   弹框
      centerDialogVisible: false,
      selectNum: "1", //选择框和数字区间二选一

      // 分页
      currentPage: 1, // 当前页
      pageSize: 20, // 每页显示数量
      total: 0 // 数据总条数

      //   totalpage: 0
    };
  },
  mounted() {
    this.getTypelist();
    
    this.getselectOptionFn(1, "", "", this.datalevel);
  },
  methods: {
    // 获取选择类型
    getTypelist() {
      let params = {
        menu_type: 1,
        type: 0
      };
      this.HttpClient.post("/admin/menu/getList", params).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.menuList = res.data.data;
          // this.selectVideotitle = this.menuList[1].menu_id;
          // console.log(this.menuList[1].menu_id)
          this.getlistData();
        }
      });
    },
    // 获取图文列表
    getlistData() {
      let params = {
        size: this.pageSize,
        page: this.currentPage,
        hasProperty: false,
        // folder: this.selectVideotitleid,
        // menu_1:this.value,
        // menu_2:this.secondValue,
        // menu_3:this.thirdValue,
        id: this.productID,
        name: this.productType
      };
      this.HttpClient.post("/admin/category/lists", params).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.listData = res.data.data.data;
          this.total = res.data.data.total;
        }
      });
    },

    // this.productData = res.data.data.data;
    // this.totalpage = res.data.data.total;
    // 获取联动选择器
    getselectOptionFn(floder, menuid, lastid, datalevel) {
      let params = {
        isFolder: floder,
        menu_id: menuid,
        last_menu: lastid
      };
      console.log(params);
      this.HttpClient.post("/shop/menu/getOneChild", params).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          if (lastid == "") {
            if (datalevel === 0) {
              this.options = res.data.data.child;
            } else if (datalevel == 1) {
              this.secondOptions = res.data.data.child;
            } else if (datalevel == 2) {
              this.thirdOptions = res.data.data.child;
            }
          } else if(datalevel == 3){
            this.productData = res.data.data;
          }
        }
      });
    },
    // 一级目录改变
    changefirstValue() {
      console.log(this.value);
      this.datalevel = 2;
      this.secondValue = "";
      this.thirdValue = "";
      this.productData = [];
      this.getselectOptionFn(0, this.value, "",1);  
      // this.getlistData();
    },
    // 二级目录改变
    changesecondValue() {
      console.log(this.secondValue);
      this.datalevel = 3;
      this.thirdValue = "";
      this.productData = [];
      this.getselectOptionFn(0, this.secondValue, "",2);
      // this.getlistData();
    },
    // 三级目录改变
    changethirdValue() {
      console.log(this.thirdValue);
      this.getselectOptionFn(0, 0, this.thirdValue,3);
      // this.getlistData();
    },
    // 选择
    changeproTypeModel(item) {
      console.log(item);
      this.selectVideotitleid = item.menu_id;
      this.value = '';
      this.secondValue = '';
      this.thirdValue = '';
      this.getselectOptionFn(0, this.selectVideotitleid, "",0);  //选择板块获取一级目录
      // this.getlistData();
    },
    // id搜索
    searchProductID() {
      this.getlistData();
      // this.productID = "";
    },
    // 产品类型搜索
    searchProductType() {
      this.getlistData();
      // this.productType = "";
    },
    // 添加
    addList(item) {
      if(this.thirdValue){
          let params = {
            menu_id: this.thirdValue,
            relation_id: item.id,
            type: 2,
            relation_type: 10
          };
          this.HttpClient.post("/admin/menuRelationship/create", params).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                setTimeout(() => {
                  this.getselectOptionFn(0, 0, this.thirdValue, this.datalevel);
                }, 500);
              }else{
                this.$message.error(res.data.msg);
              }
            }
          );
      }else{
        this.$message.error('请选择三级目录')
      }
      
    },
    // 弹框数字区间和选择框选择
    changesSelectFn() {
      if (this.selectNum == 1) {
        this.selectNumchoseData = this.selectData.property_select;
      } else if (this.selectNum == 2) {
        this.selectNumchoseData = this.selectData.property_num;
      }
    },
    // 选中目录下某产品类型
    changeProduct(item) {
      this.selectNum = "1";
      this.centerDialogVisible = true;
      this.HttpClient.get("/admin/category/edit", { id: item.id }).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          var selectarr = [];
          var numtarr = [];
          res.data.data.property.forEach((e, i) => {
            if (e.rule == 1 || e.rule == 2) {
              selectarr.push(e);
            } else if (e.rule == 3 || e.rule == 4 || e.rule == 5) {
              numtarr.push(e);
            }
          });
          this.selectData.property_select = selectarr;
          this.selectNumchoseData = selectarr;
          this.selectData.property_num = numtarr;
        }
      });
    },
    // 删除目录下的产品
    deleteProduct(id) {
      let params = {
        menu_id: this.thirdValue,
        relation_id: id
      };
      this.HttpClient.post("/admin/menuRelationship/destroy", params).then(
        res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            setTimeout(() => {
              this.getselectOptionFn(0, 0, this.thirdValue, this.datalevel);
            }, 500);
          }
        }
      );
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistData();
    }
    // 目录列表分页
    // currentpageChange(p) {
    //   this.currentPage = p;
    // }
  }
};
</script>

<style lang="less">
.productcatalogAssignment {
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
      width: 50%;
      padding: 30px;
      box-sizing: border-box;
      .product_header {
        .product_header_search{
          margin-right: 15px;
          .el-input {
            width: 69%;
          }
          .productlistbox {
            border: 1px solid #dedede;
            width: 100%;
            padding: 10px;
            .el-button {
              padding: 0px;
              border: none;
            }
            .el-tag {
              margin: 0 5px;
            }
          }
          .search {
            width: 15%;
            padding-left: 10px;
            display: flex;
          }
        }
        display: flex;
        margin-bottom: 10px;
        flex-wrap: wrap;
        .productlistbox {
          border: 1px solid #dedede;
          width: 100%;
          padding: 10px;
          .el-button {
            padding: 0px;
            border: none;
          }
          .el-tag {
            margin: 0 5px;
          }
        }
        .imgAndwordBox {
          border: 1px solid #dedede;
          margin: 20px;
          .imglist{
            font-size: 14px;
            color: #636679;
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .imgbox {
            width: 100px;
            height: 100px;
            overflow: hidden;
            border-bottom: 1px solid #bfbfbf;
            img {
              width: 100px;
              // height: 100px;
            }
          }
          div {
            padding: 0 !important;
          }
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
        .selects {
          .el-input {
            width: 100%;
          }
        }
        .el-input {
          width: 20%;
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
          background: #15bafe;
          color: #fff;
        }
      }
    }
    .showinfo {
      padding: 10px;
      border: 1px solid #dededd;
      .el-radio__input {
        display: none;
      }
    }
  }
}
</style>
