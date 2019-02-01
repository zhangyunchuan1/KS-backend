<template>
  <div class="producttypeListTitle">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="video_titlebox">
      <div class="videopage_title">
        <div class="title">产品类型列表</div>
      </div>
      <div class="productbox">
        <!-- <div class="product_header"> -->
          <!-- <div class="choseType">选择</div> -->
          <!-- <el-radio-group v-model="selectVideotitle" size="small"> -->
            <!-- <el-radio -->
              <!-- @change="changeproTypeModel(item)" -->
              <!-- :label="item.name" -->
              <!-- v-for="(item,index) in menuList" -->
              <!-- :key="index" -->
              <!-- border -->
            <!-- >{{item.name}}</el-radio> -->
          <!-- </el-radio-group> -->
        <!-- </div> -->
        <div class="product_header">
          <!-- 搜索 -->
          <div class="search">
            <el-input placeholder="ID搜索" v-model="searchID" clearable @change="searchIDfn"></el-input>
            <el-button type="primary" @click="searchIDfn">搜索</el-button>
          </div>
          <div class="search">
            <el-input placeholder="名称搜索" v-model="searchName" clearable @change="searchIDfn"></el-input>
            <el-button type="primary" @click="searchNamefn">搜索</el-button>
          </div>
        </div>
        <!-- 表格列表 -->
        <div class="product_header">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="产品类型ID" sortable></el-table-column>
            <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="image" label="展示图片" width="120">
              <template slot-scope="scope">
                <img :src="Tools.handleImg(scope.row.image)" alt class="productImg">
              </template>
            </el-table-column>
            <el-table-column prop="product_count" show-overflow-tooltip label="当前类型下的产品数量"></el-table-column>
            <el-table-column prop="created_at" show-overflow-tooltip label="创建时间" width="180"></el-table-column>
            <el-table-column
              label="操作"
              align="center"
              class-name="mallReview_scope">
              <template slot-scope="scope">
                <div class="mallReview_btm">
                  <el-button type="text" @click="hancleCheckProperty(scope.row)">查看属性值</el-button>
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
        <el-dialog title="选择框和数字区间" :visible.sync="isShowProperty" width="30%" center>
          <div class="showinfo">
            <div>
              <el-radio v-model="selectNum" label="1" border @change="changesSelectFn">选择框</el-radio>
              <el-radio v-model="selectNum" label="2" border @change="changesSelectFn">数字区间</el-radio>
            </div>
            <div class="boxsh" v-for="(item,index) in selectNumchoseData" :key="index">
              <div>
                <el-tag type="warning">{{item.property_name}}</el-tag>
                <el-tag
                  type="success"
                >{{item.rule == 1?'单选':item.rule == 2?'多选':item.rule == 3?'整数':item.rule == 4?'一位小数':item.rule == 5?'两位小数':''}}</el-tag>
                <el-tag type="success">{{item.selective == 0?'必填':item.selective == 1?'选填':''}}</el-tag>
                <el-tag type="success">{{item.selective == 0?'不可搜索':item.selective == 1?'可以搜索':''}}</el-tag>
              </div>
              <div style="margin-top:10px;" v-if="selectNum == '1'">
                <el-tag v-for="(e,i) in item.values" :key="i">{{e.value}}</el-tag>
              </div>
              <div style="margin-top:10px;" v-if="selectNum == '2'">
                <el-tag>{{item.unit_cn+'('+item.unit+')'}}</el-tag>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    <!-- <el-dialog
      :visible.sync="isShowProperty"
      width="500px"
      custom-class="property-dialog"
    >
      <div class="title">{{row.name}}</div>
      <div class="item" v-for="(item, index) in properties" :key="index">
        <span>{{item.property_name}}
          (
            <i class="rule" v-if="item.rule === 1">单选</i>
            <i class="rule" v-if="item.rule === 2">多选</i>
            <i class="rule" v-if="item.rule === 3">整数</i>
            <i class="rule" v-if="item.rule === 4">小数</i>
          )</span>
          <template v-if="Array.isArray(item.values)">
            <ul class="property-lists">
              <li v-for="(key, index) in item.values" :key="index">{{key.value}}</li>
            </ul>
          </template>
          <template v-else>
            <p>{{item.values}}</p>
          </template>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
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
          urls:
            "/index/functionControl/mallManagement/mall-management",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "产品类型列表",
          urls: "/index/functionControl/mallManagement/product-type-list",
          icon: "icon-home"
        }
      ],

      //   类型选择
      selectVideotitle: "", //选中的类型
      selectVideotitleid: "", //选中的类型ID
      menuList: [], //类型数据

      //   联级选择器
      datalevel: 1,

      //   搜索
      searchID: "", //ID搜索
      searchName: "", //名称搜索
      
      isShowProperty: false,      // 是否显示查看属性值弹框
      selectNum: '1', //选择框和数字区间二选一
      selectNumchoseData:[],

      //   表格数据
      tableData: [],
      row: {},    // 表格当前行数据
      properties: [],   // 商品属性列表

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  mounted() {
    this.getTypelist()
    this.getlistDataFn()
  },
  methods: {
    // 弹框数字区间和选择框选择
    changesSelectFn() {
      if (this.selectNum == '1') {
        // this.selectNumchoseData = this.selectData.property_select;
        console.log(this.properties)
        this.selectNumchoseData = [];
        this.properties.forEach(item =>{
          
          if(item.rule === 1){
            console.log(item.property_name)
            this.selectNumchoseData.push(item)
          }else if(item.rule === 2){
            console.log(item.property_name)
            this.selectNumchoseData.push(item)
          }
        })
        console.log(this.selectNumchoseData)
      } else if (this.selectNum == '2') {
        console.log(this.properties)
        this.selectNumchoseData = [];
        this.properties.forEach(item =>{
          if(item.rule !== 1 && item.rule !== 2){
            this.selectNumchoseData.push(item)
          }
        })
        console.log(this.selectNumchoseData)
        // this.selectNumchoseData = this.selectData.property_num;
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
          this.menuList = res.data.data
        }
      });
    },
    // 获取产品类型列表
    getlistDataFn() {
      let params = {
        size: this.pageSize,
        page: this.currentPage,
        hasProperty: true,
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
        }
      });
    },
    // ID搜索
    searchIDfn(){
        this.getlistDataFn()
        // this.searchID = ''
    },
    // 名称搜索
    searchNamefn(){
        this.getlistDataFn()
        // this.searchName = ''
    },
    
    // 选择类型
    // changeproTypeModel(val) {
    //   this.selectVideotitleid = val.menu_id;
    //   this.getlistDataFn()
    // },

    // 查看属性值
    async hancleCheckProperty (row) {
      this.row = row
      let res = await this.HttpClient.post('/admin/category/getPropertyWithCate', {id: row.id})
      let data = await res.data
      if (data.code === 200) {
        this.isShowProperty = true
        this.properties = data.data
      }
      this.selectNum = '1';
      this.selectNumchoseData = [];
      this.properties.forEach(item =>{
        if(item.rule === 1 || item.rule === 2){
          this.selectNumchoseData.push(item)
        }
      })
      console.log(data.data)
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
  .showinfo{
    .boxsh{
        margin-top: 10px;
        padding: 4px;
        box-shadow: 5px 5px 45px #b4bfc3;
        border-radius: 5px;
    }
    .el-radio__input{
      display: none;
    }
    .el-tag{
      margin-right: 10px;
    }
  }
}
li {
  list-style: none;
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
    display: block;
    margin-bottom: 8px;
    color: #333;
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
      border: 1px solid #70AD47;
    }
  }
}
</style>
