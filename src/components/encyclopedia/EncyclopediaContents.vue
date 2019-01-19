<template>
  <div class="encyclopediaContents">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

    <div class="encyclopedia_main">
      <div class="encyclopedia_title">
        <div class="title">目录分配情况</div>
      </div>

      <div class="encyclopedia_box">
        <div class="encyclopedia_header">
          <el-radio-group v-model="sectorSelection">
            <el-radio
              @change="changeModel('menu')"
              v-for="menu in menuList"
              :key="menu.id"
              :label="menu"
            >{{menu.name}}</el-radio>
          </el-radio-group>
        </div>

        <div class="encyclopedia_content">
          <el-collapse-transition>
            <div class="encyclopedia_list" v-show="viewFirstLevel">
              <div class="encyclopedia_list_box">
                <div class="encyclopedia_list_title">一级目录</div>
                <el-radio-group v-model="firstLevel">
                  <el-radio
                    @change="changeModel('firstMenu')"
                    v-for="firstMenu in firstMenuList"
                    :key="firstMenu.id"
                    :label="firstMenu"
                  >{{firstMenu.name}}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-collapse-transition>

          <el-collapse-transition>
            <div class="encyclopedia_list" v-show="viewSecondary">
              <div class="encyclopedia_list_box">
                <div class="encyclopedia_list_title">二级目录</div>
                <el-radio-group v-model="secondary">
                  <el-radio
                    @change="changeModel('secondMenu')"
                    v-for="secondMenu in secondMenuList"
                    :key="secondMenu.id"
                    :label="secondMenu"
                  >{{secondMenu.name}}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-collapse-transition>

          <el-collapse-transition>
            <div class="encyclopedia_list" v-show="viewThirdLevel">
              <div class="encyclopedia_list_box">
                <div class="encyclopedia_list_title">三级目录</div>
                <el-radio-group v-model="thirdLevel">
                  <el-radio
                    @change="changeModel('threeMenu')"
                    v-for="threeMenu in threeMenuList"
                    :key="threeMenu.id"
                    :label="threeMenu"
                  >{{threeMenu.name}}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>

      <div class="encyclopedia_table">
        <div class="encyclopedia_header">
          <div class="encyclopedia_left">
            <div class="encyclopedia_list_num">当前目录下总数： {{total}}</div>
            <div class="encyclopedia_left_time">
              <div class="date_item">
                <p class="date_label">开始</p>
                <!-- <el-date-picker
                  @change="handleChangeStartTime"
                  v-model="searchObj.startTime"
                  class="date_picker_1"
                  
                  size="mini"
                  placeholder="选择日期"
                ></el-date-picker> -->
                <el-date-picker
                  type="date"
                  @change="handleChangeStartTime"
                  v-model="searchObj.startTime"
                  size="mini"
                  placeholder="选择开始日期">
                </el-date-picker>
              </div>
              <div class="date_item">
                <p class="date_label">截止</p>
                <el-date-picker
                  @change="handleChangeEndTime"
                  v-model="searchObj.endTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  placeholder="选择截止日期"
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="encyclopedia_search">
            <div>
              <el-input
                placeholder="百科题目搜索"
                v-model="searchObj.titleSearch"
                class="input-with-select"
              >
                <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>

            <div>
              <el-input placeholder="百科ID搜索" v-model="searchObj.idSearch" class="input-with-select">
                <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
        </div>

        <div class="encyclopedia_content">
          <el-table :data="tableData" :border="true">
            <el-table-column label="ID" align="center" width="100" prop="id" 
            sortable
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="百科题目"
              align="center"
              show-overflow-tooltip
              width="180"
              prop="title"
            ></el-table-column>

            <el-table-column
              label="学科板块"
              align="center"
              show-overflow-tooltip
              width="110"
              prop="model"
            ></el-table-column>

            <el-table-column
              label="一级目录"
              align="center"
              show-overflow-tooltip
              width="130"
              prop="firstMenu"
            ></el-table-column>

            <el-table-column
              label="二级目录"
              align="center"
              show-overflow-tooltip
              width="130"
              prop="secondMenu"
            ></el-table-column>

            <el-table-column
              label="三级目录"
              align="center"
              show-overflow-tooltip
              width="130"
              prop="threeMenu"
            ></el-table-column>

            <el-table-column
              label="分配时间"
              align="center"
              show-overflow-tooltip
              width="180"
              prop="created_at"
              sortable
            ></el-table-column>

            <el-table-column label="操作" align="center" class-name="encyclopedia_scope">
              <template slot-scope="scope">
                <div class="encyclopedia_btm">
                  <el-button size="medium " type="text" @click="removeModal(scope.row)">删除</el-button>
                  <el-button size="medium " type="text">预览</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
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

    <!-- 删除弹窗 -->
    <el-dialog :visible.sync="removeVisible" width="300px">
      <div slot="title" class="dialog_delete_head_title">
        <i class="delete_icon"></i>
        <span>删除</span>
      </div>
      <div>
        <img class="boolean_delete" :src="warmImg">
        <p>确定删除吗？</p>
      </div>
      <div slot="footer">
        <el-row class="row_e">
          <el-button class="btn_deletes" size="small" @click="removeVisible = false">取消</el-button>
          <el-button type="primary" size="small" class="btn_delete" @click="remove">提交</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import DeleteModal from "@/components/public/modalDelete";
import Tools from "@/utils/tools.js";
let tools = new Tools();

export default {
  name: "EncyclopediaContents",
  components: {
    BreadCrumb,
    DeleteModal
  },
  data() {
    return {
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
          name: "目录分配情况",
          urls: "/index/encyclopedia/encyclopediaContents",
          icon: "icon-home"
        }
      ],
      warmImg: require("../../assets/image/warm.png"),

      searchObj: {}, // 搜索对象
      modifyObj: {}, // 修改对象
      removeVisible: false, // 删除弹窗的判断条件

      currentPage: 1, //当前页
      pageSize: 25, //每页显示数量
      total: 0, // 目录总数

      sectorSelection: '', // 学科板块选择
      firstLevel: null, // 一级目录
      secondary: null, // 二级目录
      thirdLevel: null, // 三级目录

      menuList: [], // 模块列表
      firstMenuList: [], // 一级目录
      secondMenuList: [], // 二级目录
      threeMenuList: [], // 三级目录

      muneIdObj: {
        muneId: "",
        id: 0
      }, // 选中的模块ID
      firstMuneIdObj: {
        firstMuneId: "",
        id: 0
      }, // 选中的一级目录ID
      secondMuneIdObj: {
        secondMuneId: "",
        id: 0
      }, // 选中的二级目录ID
      threeMuneIdObj: {
        threeMuneId: "",
        id: 0
      }, // 选中的三级目录ID

      viewFirstLevel: false, // 一级目录
      viewSecondary: false, //二级目录
      viewThirdLevel: false, //三级目录

      // 表格
      tableData: []
    };
  },
  created() {
    this.getTableList(null);
    this.getModelList();
  },
  methods: {
    handleChangeStartTime(){
      console.log(this.searchObj.startTime);
      this.getTableList(this.searchObj);
    },
    handleChangeEndTime(){
      console.log(this.searchObj.endTime);
      this.getTableList(this.searchObj);
    },
    cloneContents() {
      this.viewFirstLevel = false;
      this.viewSecondary = false;
      this.viewThirdLevel = false;
    },

    filterPlate(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterSecondary(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    removeModal(modifyObj) {
      this.removeVisible = true;
      this.modifyObj = modifyObj;
      console.log("modifyObj:", this.modifyObj);
    },
    search() {
      this.getTableList(this.searchObj);
      console.log("searchObj:", this.searchObj);
    },
    async remove() {
      console.log(this.modifyObj);
      let res = await this.HttpClient.post("/admin/menuRelationship/destroy", {
        menu_id: this.modifyObj.menu_id,
        relation_id: this.modifyObj.encyclopedia_id
      });
      tools.getApiMessage(res);
      this.removeVisible = false;
      setTimeout(() => {
        this.search();
      }, 500);
    },
    async currentChange(page) {
      this.currentPage = page;
      this.search();
    },
    async changeModel(value) {
      if (value === "menu") { //板块搜索
        this.viewFirstLevel = true;
        console.log(this.sectorSelection);
        this.searchObj.menu_id = this.sectorSelection.menu_id;
        this.search()
        await this.getFirstMenuList();
      } else if (value === "firstMenu") { //一级菜单搜索
        this.viewSecondary = true;
        console.log(this.firstLevel);
        this.searchObj.menu_id = this.firstLevel.menu_id;
        this.search()
        await this.getSecondMenuList();
      } else if (value === "secondMenu") { //二级菜单搜索
        console.log(this.secondary);
        this.searchObj.menu_id = this.secondary.menu_id;
        this.search()
        this.viewThirdLevel = true;
        await this.getThreeMenuList();
      } else if(value === "threeMenu"){ //三级菜单搜索
        console.log(this.thirdLevel);
        this.searchObj.menu_id = this.thirdLevel.menu_id;
        this.search()
      }
      console.log("sectorSelection:", this.sectorSelection);
    },
    async getTableList(param) {
      let params = {
        page: this.currentPage,
      };
      if (param) {
        params["start_time"] = param.startTime;
        params["end_time"] = param.endTime;
        params["id"] = param.idSearch;
        params["title"] = param.titleSearch;
        params["menu_id"] = param.menu_id;
      }
      let res = await this.HttpClient.post(
        "/admin/encyclopedias/getListByMajorMenuId",
        params
      );
      this.tableData = dealWithTable(res.data.data.data);
      // this.sectorSelection = this.tableData[0];
      console.log("tableData:", this.tableData);
      this.total = res.data.data.total;
    },
    async getModelList() {
      let res = await this.HttpClient.post("/admin/menu/getList", {
        menu_type: 3
      });
      let result = dealWith(res.data.data);
      this.menuList = result.menuList;
      if (this.menuList[0]) {
        this.muneId = this.menuList[0].menu_id;
        this.pid = this.muneId;
      }
    },
    // 获取一级目录
    async getFirstMenuList() {
      let res = await this.HttpClient.post("/admin/menu/getOneChild", {
        menu_id: this.sectorSelection.menu_id,
        menu_type: 3
      });
      this.firstMenuList = res.data.data.child;
      // 二三级目录设为空
      this.secondMenuList = [];
      this.threeMenuList = [];
    },
    // // 获取二级目录
    async getSecondMenuList() {
      let res = await this.HttpClient.post("/admin/menu/getOneChild", {
        menu_id: this.firstLevel.menu_id,
        menu_type: 3
      });
      this.secondMenuList = res.data.data.child;
      // 三级目录设为空
      this.threeMenuList = [];
    },
    // // 获取三级目录
    async getThreeMenuList() {
      let res = await this.HttpClient.post("/admin/menu/getOneChild", {
        menu_id: this.secondary.menu_id,
        menu_type: 3
      });
      this.threeMenuList = res.data.data.child;
    }
  }
};

// 表格的数据处理
function dealWithTable(table) {
  let newTable = [];
  if (table && table.length > 0) {
    for (let i in table) {
      let array = table[i];
      array["model"] = "";
      array["firstMenu"] = "";
      array["secondMenu"] = "";
      array["threeMenu"] = "";
      // 遍历目录
      if (array.menu && array.menu.length > 0) {
        for (let j in array.menu) {
          if (array.menu[j].type == "0") {
            array["model"] = array.menu[j].name;
          } else if (array.menu[j].type == "1") {
            if (array["firstMenu"] == "") {
              array["firstMenu"] = array.menu[j].name;
            }
            // array["firstMenu"] += array.menu[j].name;
          } else if (array.menu[j].type == "2") {
            if (array["secondMenu"] == "") {
              array["secondMenu"] = array.menu[j].name;
            }
            // array["secondMenu"] += array.menu[j].name;
          } else if (array.menu[j].type == "3") {
            if (array["threeMenu"] == "") {
              array["threeMenu"] = array.menu[j].name;
            }
            // array["threeMenu"] += array.menu[j].name;
          }
        }
      }
      newTable.push(array);
    }
  }
  return newTable;
}

// 目录列表
function dealWith(modelList) {
  let menuList = [
    {
      name: "全部",
      id: 0,
      menu_id: 0
    }
  ];
  if (modelList) {
    for (let i in modelList) {
      if (modelList[i].type == "0") {
        menuList.push(modelList[i]);
      }
    }
  }
  return {
    menuList: menuList
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
.encyclopediaContents {
  .bread {
    margin: 10px;
  }
  .encyclopedia_main::-webkit-scrollbar {
    display: none;
  }
  .encyclopedia_main {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;

    .encyclopedia_title {
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

    .encyclopedia_box {
      padding: 0 40px;
      margin: 20px 0;
      /*目录选择*/
      .encyclopedia_header {
        display: flex;
        align-items: center;
        padding-bottom: 15px;
        border-bottom: 1px solid #dedede;
        margin-bottom: 20px;

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

      .encyclopedia_content {
        .encyclopedia_list:nth-child(2) {
          border-left-color: #4dacff;
          .encyclopedia_list_title {
            background: #4dacff;
          }
          .el-radio.is-checked {
            background: #4dacff;
          }
        }

        .encyclopedia_list:nth-child(3) {
          border-left-color: #26c6da;
          .encyclopedia_list_title {
            background: #26c6da;
          }
          .el-radio.is-checked {
            background: #26c6da;
          }
        }

        .encyclopedia_list {
          border-bottom: 1px solid #dedede;
          padding-bottom: 15px;
          margin-bottom: 20px;
          .encyclopedia_list_box {
            text-align: left;
            border-left: 3px solid #15bafe;
            border-radius: 4px;
            padding-top: 10px;
          }
          .encyclopedia_list_title {
            display: inline-block;
            width: 120px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            background: #15bafe;
            color: #fff;
            border-radius: 4px;
            margin-left: 10px;
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
            box-sizing: border-box;
            min-width: 120px;
            padding: 0 20px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #dedede;
            border-radius: 4px;
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
    }

    .encyclopedia_table {
      /*头部*/
      .encyclopedia_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30px 25px;

        .encyclopedia_left {
          display: flex;
          align-items: center;
          .encyclopedia_list_num {
            display: flex;
            background: #15bafe;
            color: #fff;
            justify-content: center;
            align-items: center;
            height: 35px;
            padding: 0 15px;
            margin-right: 20px;
            font-size: 14px;
          }

          .encyclopedia_left_time {
            display: flex;
            align-items: center;
            .date_item {
              display: flex;
              border: 1px solid #dcdfe6;
              border-radius: 5px;
              margin-right: 20px;
              .el-input__inner {
                border: none !important;
              }
              .date_label {
                color: #808080;
                font-size: 12px;
                height: 28px;
                line-height: 28px;
                margin-left: 10px;
              }
              .date_picker_1 {
                width: 140px;
              }
            }
          }
        }

        /*搜索框*/
        .encyclopedia_search {
          display: flex;
          align-items: center;
          > div {
            margin-left: 30px;
          }
        }
      }

      /*表格*/
      .encyclopedia_content {
        padding: 0 30px;

        .el-table {
          thead {
            color: #fff;
            th,
            tr {
              background-color: #15bafe;
            }
          }
        }

        /*操作按钮*/
        .encyclopedia_scope {
          padding: 0;
          .cell {
            line-height: unset;
            .encyclopedia_btm {
              display: flex;
              align-items: center;
              div:not(:last-child) {
                border-right: 1px solid #ebeef5;
              }
              div {
                min-height: 47px;
                height: 100%;
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
