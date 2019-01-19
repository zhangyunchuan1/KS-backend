<template>
  <div class="Sales">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

    <div class="settle_main">
      <div class="settle_title">
        <div class="title">收货人信息</div>
      </div>
      <div class="settle_table" style="width:80%">
        <div class="settle_search">
          <!-- <el-select placeholder="选择省" clearable filterable v-model="searchObj.province" @change="search">
            <el-option
              v-for="item in cityList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select> -->
          <div>
            <el-cascader
             @change="search"
              clearable
              filterable
              placeholder="选择市"
              :options="searchCityList"
              v-model="searchObj.city"
            ></el-cascader>
          </div>
          <div>
            <el-input placeholder="用户昵称搜索" clearable v-model="searchObj.nickname" class="input-with-select" @change="search">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
        </div>
        <div class="settle_content">
          <el-table :data="tableData" :border="true">
            <el-table-column label="用户ID" align="center" width="100" prop="id" show-overflow-tooltip sortable>
              <template slot-scope="scope">
                <span v-if="scope.row.id">{{scope.row.id}}</span>
                <span v-else class="sortout_color">无</span>
              </template>
            </el-table-column>
            <el-table-column label="用户昵称" align="center" width="200" prop="nickname" show-overflow-tooltip></el-table-column>

            <el-table-column label="收件人姓名" align="center" width="200" sortable show-overflow-tooltip prop="conducts"></el-table-column>

            <el-table-column
              label="省"
              align="center"
              width="100"
              show-overflow-tooltip
              :filters="provinceFilterList"
              :filter-method="filterHandler"
              prop="province_name"
            ></el-table-column>

            <el-table-column
              label="市"
              align="center"
              width="100"
              show-overflow-tooltip
              :filters="cityFilterList"
              :filter-method="filterHandler"
              prop="city_name"
            ></el-table-column>

            <el-table-column label="区" show-overflow-tooltip align="center" width="100" prop="area_name"></el-table-column>

            <el-table-column label="详细地址" show-overflow-tooltip align="center" prop="detail"></el-table-column>

            <el-table-column label="电话号码" show-overflow-tooltip align="center" width="120" prop="telphone"></el-table-column>

            <el-table-column label="操作" fixed="right" align="center" width="100" class-name="settle_scope">
              <template slot-scope="scope">
                <div class="settle_btm">
                  <el-button size="medium " type="text" @click="removeModal(scope.row)">删除</el-button>
                  <el-button size="medium " type="text" @click="modifyModal(scope.row)">修改</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="paging">
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

    <!--删除弹窗-->
    <el-dialog width="470px" custom-class="deleteDialog" :visible.sync="deleteDialog" center>
      <span slot="title" class="deleteDialog_title">
        <i class="iconfont icon-huaban4"></i>
      </span>
      <div class="deleteDialog_box">
        <i class="iconfont icon-warning-circle"></i>
        <p>确定删除吗？</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="remove">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改弹窗-->
    <el-dialog width="500px" custom-class="viewDialog" :visible.sync="modifyVisible">
      <span slot="title" class="viewDialog_title">
        <i class="iconfont icon-edit-square"></i>修改
      </span>
      <div class="view_dialog_box">
        <el-form label-width="100px">
          <el-form-item label="收货人姓名">
            <el-input v-model="modifyObj.conducts"></el-input>
          </el-form-item>

          <el-form-item label="城市">
            <el-select v-model="city" clearable placeholder="请选择" @change="provinceChange">
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select v-model="cities" clearable placeholder="请选择" @change="cityChange">
              <el-option
                v-for="item in citiesData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select v-model="area" clearable placeholder="请选择">
              <el-option
                v-for="item in areaData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="modifyObj.detail"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="modifyObj.telphone"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-row class="row_e">
          <el-button class="btn_deletes" size="small" @click="modifyVisible = false">取消</el-button>
          <el-button type="primary" size="small" class="btn_delete" @click="modify">提交</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import Tools from "@/utils/tools.js";
let tools = new Tools();

export default {
  name: "ShoppingCart",
  components: {
    BreadCrumb
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "购物统计",
          urls: "/index/mall/shoppingStatistics/shopping-statistics",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "收货人信息",
          urls: "/index/mall/shoppingStatistics/recipient-infomation",
          icon: "icon-home"
        }
      ],
      // 分页
      total: null, //数据总条数
      tableData: [],
      total: 0, // 总条数
      pageSize: 25, // 每页条数
      currentPage: 1, // 当前页
      searchObj: {}, // 搜索对象
      cityList: [], // 城市列表
      city: '', // 选中的城市
      productDialog: false, // 商品列表弹窗
      modifyObj: {}, // 操作对象
      productList: [], // 产品列表
      projectObj: {}, // 操作的商品列表对象
      deleteDialog: false, // 删除弹窗
      modifyVisible: false, // 修改弹窗
      provinceFilterList: [], // 省过滤列表
      cityFilterList: [], // 城市过滤列表
      searchCityList: [], // 搜索的城市列表，精确到市
      citiesData: [],
      cities: "",
      areaData: [],
      area: ""
    };
  },
  created() {
    this.getTableList(null);
    this.getCityList();
  },
  methods: {
    provinceChange() {
      console.log(this.city);
      console.log(this.cityList);
      this.cityList.forEach(item => {
        if (this.city == item.id) {
          this.citiesData = item.child;
          this.cities = '';
          this.area = ''; 
        }
      });
    },
    cityChange() {
      console.log(this.cities)
      this.citiesData.forEach(item => {
        if (this.cities == item.id) {
          this.areaData = item.child;
        }
      });
    },
    //获取板块列表
    async getTableList(param) {
      let params = {
        page: this.currentPage,
        pageSize:25
      };
      if (param) {
        params["nickname"] = param.nickname;
        params["province_id"] = param.province;
        params["city_id"] =
          param.city && param.city.length > 1 ? param.city[1] : null;
      }
      let res = await this.HttpClient.post("/admin/address/index", params);
      let result = dealWithTable(res.data.data.data);
      this.tableData = result.table;
      this.provinceFilterList = result.provinceFilterList;
      this.cityFilterList = result.cityFilterList;
      this.total = res.data.data.total;
    },
    async getCityList() {
      let res = await this.HttpClient.get("/city/getAllCities");
      let result = dealWithCity(res.data.data);
      console.log(result);
      this.cityList = result.cityList;
      this.searchCityList = result.searchCityList;
    },
    async remove() {
      let res = await this.HttpClient.post("/admin/address/destroy", {
        id: this.modifyObj.id
      });
      tools.getApiMessage(res);
      if (res.data.code == "200") this.deleteDialog = false;
      setTimeout(() => {
        this.search();        
      }, 500);
    },
    async modify() {
      let res = await this.HttpClient.post("/admin/address/edit", {
        id: this.modifyObj.id,
        uid: this.modifyObj.uid,
        conducts: this.modifyObj.conducts,
        province_id: this.city,
        city_id: this.cities,
        area_id: this.area,
        detail: this.modifyObj.detail,
        telphone: this.modifyObj.telphone
      });
      tools.getApiMessage(res);
      if (res.data.code == "200") this.modifyVisible = false;
      setTimeout(() => {
        this.search();
      }, 500);
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    removeModal(modifyObj) {
      this.deleteDialog = true;
      this.modifyObj = modifyObj;
    },
    modifyModal(modifyObj) {
      console.log(modifyObj);
      this.modifyVisible = true;
      this.modifyObj = JSON.parse(JSON.stringify(modifyObj));
      this.city = this.modifyObj.province_id;
      this.cityList.forEach(item => {
        if (this.city == item.id) {
          this.citiesData = item.child;
          this.cities = this.modifyObj.city_id;
          this.citiesData.forEach(item => {
        if (this.cities == item.id) {
          this.areaData = item.child;
          this.area = this.modifyObj.area_id;
        }
      });
        }
      });
      
      
    },
    search() {
      this.getTableList(this.searchObj);
    },
    async currentChange(page) {
      this.currentPage = page;
      this.search();
    }
  }
};

// 表格数据处理
function dealWithTable(table) {
  let provinceFilterList = [];
  let cityFilterList = [];
  if (table && table.length > 0) {
    for (let i in table) {
      provinceFilterList.push(table[i].province_name);
      cityFilterList.push((table[i]["city"] = table[i].city_name));
    }
  }
  provinceFilterList = [...new Set(provinceFilterList)];
  cityFilterList = [...new Set(cityFilterList)];

  for (let i in provinceFilterList) {
    provinceFilterList[i] = {
      text: provinceFilterList[i],
      value: provinceFilterList[i]
    };
  }

  for (let i in cityFilterList) {
    cityFilterList[i] = {
      text: cityFilterList[i],
      value: cityFilterList[i]
    };
  }

  return {
    table: table,
    provinceFilterList: provinceFilterList,
    cityFilterList: cityFilterList
  };
}

// 城市列表转换为element对应数据格式
function dealWithCity(cityList) {
  let searchCityList = [];
  if (cityList && cityList.length > 0) {
    for (let i in cityList) {
      cityList[i].value = cityList[i].id;
      cityList[i].label = cityList[i].name;
      if (cityList[i].child && cityList[i].child.length > 0) {
        cityList[i]["children"] = dealWithCity(cityList[i].child);
      }

      searchCityList.push({
        value: cityList[i].id,
        label: cityList[i].label
      });
      if (cityList[i].child && cityList[i].child.length > 0) {
        let list = cityList[i].child;
        let array = [];
        for (let j in list) {
          array.push({
            value: list[j].id,
            label: list[j].label
          });
        }
        searchCityList[i]["children"] = array;
      }
    }
  }
  return {
    cityList: cityList,
    searchCityList: searchCityList
  };
}
</script>

<style lang="less">
.dialog_delete_head_title {
  height: 16px;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
  text-align: left;
  font-size: 15px;
}
.Sales {
  /*分页*/
  .paging {
    margin: 20px 0;
    text-align: center;
  }
  .bread {
    margin: 10px;
  }
  .settle_main::-webkit-scrollbar {
    display: none;
  }
  .settle_main {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;

    .settle_title {
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
    .settle_box {
      padding: 0 40px;
      margin: 20px 0;
      /*目录选择*/
      .settle_header {
        display: flex;
        align-items: center;
        padding-bottom: 15px;
        border-bottom: 1px solid #dedede;
        margin-bottom: 20px;
        .settle_header_title {
          width: 120px;
          height: 40px;
          align-items: center;
          border: 1px solid #60f133;
          line-height: 40px;
          background: #60f133;
          color: #fff;
        }
        .el-radio-group {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }
        .el-radio.is-checked {
          background: #15bafe;
          border-color: #15bafe;
        }
        .el-radio__input.is-checked + .el-radio__label {
          color: #fff;
        }
        .el-radio {
          width: 120px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #dedede;
          margin: 10px;
          .el-radio__input {
            display: none;
          }
          .el-radio__label {
            padding: 0;
          }
        }
      }
    }

    .settle_table {
      /*搜索框*/
      .settle_search {
        display: flex;
        justify-content: flex-end;
        padding: 30px 40px;
        > div {
          margin-left: 30px;
        }
      }
      .settle_content {
        margin: 20px 0;
        padding: 0 40px;
        .el-table {
          thead {
            color: #fff;
            th,
            tr {
              background-color: #15bafe;
            }
          }
        }
      }
    }
  }

  /*预览、修改弹窗*/
  .viewDialog {
    .viewDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        font-size: 20px;
        color: #15bafe;
      }
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .view_dialog_box {
      text-align: left;
      > p {
        font-size: 14px;
        color: #000;
        margin-bottom: 15px;
      }
      .el-form-item__content{
          display: flex;
      }
      .modify_content {
        margin-bottom: 20px;
      }
      .view_content {
        height: 200px;
        overflow: auto;
        border: 1px solid #dedede;
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 15px;
      }
      .view_upload {
        overflow: auto;
        border: 1px solid #dedede;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        .view_upload_img {
          width: 100px;
          height: 100px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 5px;
          cursor: pointer;
          img {
            width: 100%;
          }
        }
      }
      .el-icon-plus {
        transform: translate(0, -15px);
      }
      .up_img_item {
        display: -webkit-box;
        height: 150px;
        margin-left: 10px;
        margin-top: 10px;
        margin-right: 10px;
        flex-wrap: wrap;
        .el-upload-list--picture-card .el-upload-list__item {
          overflow: hidden;
          background-color: #fff;
          border: 1px solid #c0ccda;
          border-radius: 6px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 100px;
          height: 100px;
          margin: 0 8px 8px 0;
          display: inline-block;
        }
        .el-upload--picture-card {
          background-color: #fbfdff;
          border: 1px dashed #c0ccda;
          border-radius: 6px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 100px;
          height: 100px;
          line-height: 146px;
          vertical-align: top;
        }
      }
    }

    .view_upload_bigImg {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }

  // 删除弹窗
  .deleteDialog {
    .img_contents {
      height: 170px;
      // width: 330px;
      border: 1px solid #f2f2f2;
      border-radius: 3px;
      margin: 20px 0;
      .img_contain {
        margin: 0 10px;
        display: flex;
        flex-wrap: wrap;
        height: 160px;
        overflow-y: auto;
        width: calc(100% - 20px);
        .img_3 {
          width: 100%;
          height: 100%;
        }
        .img_item1 {
          width: 150px;
          margin-right: 5%;
          height: 150px;
          margin-top: 10px;
        }
        .img_item2 {
          width: 30%;
          height: 150px;
          margin-top: 10px;
        }
        .modal_img {
          width: 100%;
          height: 150px;
          background: rgba(0, 0, 0, 0.4);
          position: relative;
          margin-top: -152px;
          text-align: center;
          opacity: 0;
          .modal_icon {
            position: relative;
            font-size: 18px;
            top: calc(50% - 12px);
            color: white;
          }
        }
        .modal_img:hover {
          opacity: 1;
        }
      }
    }
    .comment-contant {
      border: 1px solid #bfbfbf;
      height: 80px;
      margin-top: 20px;
    }
    .comment-contant-more {
      border: 1px solid #bfbfbf;
      height: 250px;
      overflow-y: scroll;
      margin-top: 20px;
    }
    .more-box {
      text-align: right;
      .more {
        color: #bfbfbf;
        cursor: pointer;
        color: #15bafe;
      }
    }

    .deleteDialog_title {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        color: #15bafe;
      }
    }
    .deleteDialog_box {
      text-align: center;
      i {
        font-size: 80px;
        color: #15bafe;
      }
      p {
        font-size: 14px;
        color: #000;
        margin-top: 20px;
      }
    }
  }

  .product_dialog {
    .el-dialog__body {
      padding-top: 20px;
      border-top: 1px solid #ccc;
    }
    .product_dialog_title {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
      .product_account {
        margin-left: 700px;
        border: 1px solid #15bafe;
        background-color: #15bafe;
        border-radius: 4px;
        padding: 5px;
      }
      .product_user {
        border-radius: 4px;
        margin-left: 10px;
        border: 1px solid #ccc;
        padding: 5px 15px;
      }
    }
    .product_dialog_main {
      .el-table {
        thead {
          color: #fff;
          th,
          tr {
            background-color: #15bafe;
          }
        }
        tbody {
          tr {
            .cell {
              .product_list {
                width: 100%;
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                justify-content: flex-start;
                overflow: hidden;

                .product_list_item {
                  width: 118px;
                  height: 40px;
                  line-height: 40px;
                  color: #fff;
                  background: #15bafe;
                  overflow: hidden;
                  box-sizing: border-box;
                  margin-right: 10px;
                }
                .product_list_item:last-child {
                  margin-right: 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

