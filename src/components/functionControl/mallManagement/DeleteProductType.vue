<template>
  <div class="DeleteProductType">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="video_titlebox">
      <div class="videopage_title">
        <div class="title">删除产品类型</div>
      </div>
      <div class="productbox">
        <div class="product_header">
          <!-- 搜索 -->
          <div class="search">
            <!-- <el-input placeholder="ID搜索" v-model="searchID" clearable></el-input>
            <el-button icon="el-icon-search" @click="searchIDfn"></el-button> -->
            <el-input placeholder="ID搜索" v-model="searchID" @keyup.13.native="searchIDfn()" clearable @clear="searchIDfn()">
                <el-button slot="append" icon="el-icon-search" @click="searchIDfn()"></el-button>
            </el-input>
          </div>
          <div class="search">
            <!-- <el-input placeholder="名称搜索" v-model="searchName" clearable></el-input>
            <el-button icon="el-icon-search" @click="searchNamefn"></el-button> -->
            <el-input placeholder="名称搜索" v-model="searchName" @keyup.13.native="searchNamefn()" clearable @clear="searchNamefn()">
                <el-button slot="append" icon="el-icon-search" @click="searchNamefn()"></el-button>
            </el-input>
          </div>
        </div>
        <!-- 表格列表 -->
        <div class="product_header" style="width: 80%">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="产品类型ID" width="100" sortable></el-table-column>
            <el-table-column prop="name" type="text" label="名称"></el-table-column>
            <el-table-column prop="image" label="展示图片" width="220">
              <template slot-scope="scope">
                <img :src="Tools.handleImg(scope.row.image)" alt class="productImg">
              </template>
            </el-table-column>
            <el-table-column prop="product_count" label="当前类型下的产品数量"></el-table-column>
            <el-table-column prop="created_at" label="创建时间" width="180" sortable></el-table-column>
            <el-table-column prop="status" label="状态" width="180">
                <template slot-scope="scope">
                <span v-if="scope.row.status == 1">启用</span>
                <span v-else class="sortout_color">禁用</span>
                <!-- <span v-if="scope.row.status == 1">禁用</span> -->
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text">{{scope.row.status == 1?'禁用':'启用'}}</el-button>
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
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "DeleteProductType",
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
          name: "删除产品类型",
          urls: "/index/functionControl/mallManagement/delete-product-type",
          icon: "icon-home"
        }
      ],

      //   类型选择
      selectVideotitle: "", //选中的类型
      selectVideotitleid: "", //选中的类型ID
      menuList: [], //类型数据

      //   联级选择器
      datalevel: 1,
      options: [], //一级目录菜单
      value: "", //选中的一级目录菜单
      secondOptions: [], //二级目录菜单
      secondValue: "", //选中的二级目录
      thirdOptions: [], //三级目录菜单
      thirdValue: "", //选中的三级目录

      //   搜索
      searchID: "", //ID搜索
      searchName: "", //名称搜索

      //   排序
      sorttimeValue: "desc",

      //   表格数据
      tableData: [],

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  mounted() {
    // this.getTypelist();
    this.getlistDataFn();
    this.getselectOptionFn(true, "", "", this.datalevel);
  },
  methods: {
    // 获取选择类型
    getTypelist() {
      let params = {
        menu_type: 1,
        type: 0
      };
      this.HttpClient.post("/admin/menu/getList", params).then(res => {
        if (res.data.code === 200) {
          this.menuList = res.data.data;
        //   console.log(this.menuList);
        }
      });
    },
    // 获取产品类型列表
    getlistDataFn() {
      let params = {
        size: this.pageSize,
        page: this.currentPage,
        // hasProperty: false,
        folder: this.selectVideotitleid,
        menu_1: this.value,
        menu_2: this.secondValue,
        menu_3: this.thirdValue,
        id: this.searchID,
        name: this.searchName,
        order_time: this.sorttimeValue
      };
      this.HttpClient.post("/admin/category/lists", params).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        //   console.log(this.tableData);
        }
      });
    },
    // ID搜索
    searchIDfn() {
      this.getlistDataFn();
      this.searchID = "";
    },
    // 名称搜索
    searchNamefn() {
      this.getlistDataFn();
      this.searchName = "";
    },
    // 获取联动选择器
    getselectOptionFn(floder, menuid, lastid, datalevel) {
      let params = {
        isFolder: floder,
        menu_id: menuid,
        last_menu: lastid
      };
      this.HttpClient.post("/shop/menu/getOneChild", params).then(res => {
        // console.log(res.data.data);
        if (res.data.code == 200) {
          if (datalevel == 1) {
            this.options = res.data.data;
          } else if (datalevel == 2) {
            this.secondOptions = res.data.data.child;
            console.log(this.secondOptions);
          } else if (datalevel == 3) {
            this.thirdOptions = res.data.data.child;
            // console.log(this.thirdOptions);
          }
        }
      });
    },
    // 一级目录改变
    changefirstValue() {
    //   console.log(this.value);
      this.datalevel = 2;
      this.secondValue = "";
      this.getselectOptionFn(0, this.value, "", this.datalevel);
    //   this.getlistDataFn();
    },
    // 二级目录改变
    changesecondValue() {
      this.datalevel = 3;
      this.thirdValue = "";
      this.getselectOptionFn(0, this.secondValue, 0, this.datalevel);
    //   this.getlistDataFn();
    },
    // 三级目录改变
    changethirdValue() {
    //   console.log(this.thirdValue);
      this.getlistDataFn();
    },
    // 选择类型
    changeproTypeModel(val) {
    //   console.log(val);
      this.selectVideotitleid = val.menu_id;
      this.getlistDataFn();
    },
    // 点击表格操作
    handleClick(row){
        // console.log(row)
        this.HttpClient.post('/admin/category/changeStatus',{id:row.id,status:row.status==1?0:1}).then(res => {
            // console.log(res.data)
            if(res.data.code == 200){
                this.$message.success(res.data.msg)
                setTimeout(() => {
                    this.getlistDataFn()
                }, 1000);
            }
        })
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistData();
    }
  }
};
</script>

<style lang="less">
.DeleteProductType {
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
}
</style>
