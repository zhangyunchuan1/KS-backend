<template>
  <div class="wordsManagement">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="wordsManagement_main">
      <!--标题-->
      <div class="title">
        <p>词汇管理</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_data">
            <p>当前总词汇</p>
            <span>{{total}}</span>
          </div>
          <el-button type="primary" @click="addWordsDialog = true">添加新词汇</el-button>
        </div>

        <div class="content_table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            :border="true"
          >
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column label="ID" align="center" width="90" prop="id" sortable></el-table-column>

            <el-table-column
              label="词汇"
              align="center"
              width="150"
              show-overflow-tooltip
              prop="key_words"
            ></el-table-column>

            <el-table-column
              label="类型选择"
              align="center"
              width="140"
              show-overflow-tooltip
              prop="type"
              :filters="arrData"
              :filter-method="filterHandler"
            >
              <template slot-scope="scope">
                <span
                  v-for="(item,index) in typeData"
                  :key="index"
                  v-if="scope.row.type == item.type_id"
                >{{item.type_name}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="状态选择"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="status"
              :filters="[{text:'启用',value:1},{text:'禁用',value:0}]"
              :filter-method="filterStatusHandler"
            >
              <template slot-scope="scope">
                <span>{{scope.row.status == 1?'启用':scope.row.status == 0?'禁用':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="创建时间排列"
              align="center"
              show-overflow-tooltip
              width="180"
              prop="created_at"
              sortable
            ></el-table-column>

            <el-table-column label="操作" align="center" width="140" class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="changeWordstatus(scope.row)">{{scope.row.status == 1?'禁用':scope.row.status == 0?'启用':''}}</el-button>
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

    <!--添加新词汇弹窗-->
    <el-dialog width="350px" custom-class="addWordsDialog" :visible.sync="addWordsDialog">
      <span slot="title" class="addWordsDialog_title">
        <i class="iconfont icon-plus-circle"></i>添加新词汇
      </span>
      <div class="addWordsDialog_box">
        <div class="words">
          <p>词汇</p>
          <el-input placeholder="输入新词汇" v-model='inputValue' clearable></el-input>
        </div>

        <div class="type">
          <p>类别</p>
          <el-select v-model="typeRadio" clearable placeholder="请选择">
            <el-option
              v-for="item in typeData"
              :key="item.type_id"
              :label="item.type_name"
              :value="item.type_id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addWordsDialog = false">关 闭</el-button>
        <el-button type="primary" @click="saveWordsFn">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "WordsManagement",
  components: {
    BreadCrumb
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "页面",
          urls: "/index/page/Page",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "敏感词汇管理",
          urls: "/index/page/sensitiveWords/SensitiveWords",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "词汇管理",
          urls: "/index/page/sensitiveWords/wordsManagement/WordsManagement",
          icon: "icon-home"
        }
      ],

      tableData: [],
      typeData: [], //敏感词类型数据
      arrData: [],

      multipleSelection: [],

      addWordsDialog: false,

      typeRadio: null,//添加词汇的类型
      inputValue:'',//添加的词汇
      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  mounted() {
    this.getlistData();
  },
  methods: {
    getlistData() {
      let params = {
        type: "",
        page: this.currentPage,
        pagSize: this.pageSize
      };
      this.HttpClient.post("/admin/sensitiveWord/index", params).then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          this.tableData = res.data.data.data;
          this.total = res.data.data.count;
        }
      });
      this.gettypelist();
    },
    // 获取词汇类型列表
    gettypelist() {
      this.HttpClient.post("/admin/sensitiveType/index").then(res => {
        if (res.data.code == 200) {
          this.typeData = res.data.data;
          this.typeData.forEach(item => {
            var obj = {};
            obj.text = item.type_name;
            obj.value = item.type_id;
            this.arrData.push(obj);
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistData();
    },
    // 保存新词汇
    saveWordsFn(){
      let params = {
        type:this.typeRadio,
        key_words:this.inputValue
      }
      this.HttpClient.post('/admin/sensitiveWord/create',params).then(res =>{
        if(res.data.code == 200){
          this.$message.success(res.data.msg)
          this.addWordsDialog = false
          setTimeout(() => {
            this.getlistData()
          }, 500);
        }else{
          this.$message.warning(res.data.msg)
        }
      })
    },
    // 操作状态
    changeWordstatus(row){
      console.log(row)
      let params = {
        id:row.id,
        status:row.status==1?0:1
      }
      this.HttpClient.post('/admin/sensitiveWord/changeStatus',params).then(res => {
        console.log(res)
        if(res.data.code == 200){
          this.$message.success(res.data.msg)
          setTimeout(() => {
            this.getlistData()
          }, 500);
        }
      })
    },
    // 类型筛选
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 状态筛选
    filterStatusHandler(value, row, column){
      const property = column["property"];
      return row[property] === value;
    }
  }
};
</script>

<style lang="less">
.wordsManagement {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .wordsManagement_main::-webkit-scrollbar {
    display: none;
  }
  .wordsManagement_main {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;
    .el-icon-arrow-down:before {
      color: #fff;
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      border-bottom: 2px solid #f2f2f2;
      padding: 0 40px;
      font-size: 20px;
      color: #222;
    }

    .content {
      box-sizing: border-box;
      padding: 30px 40px;
      .content_header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .content_data {
          display: flex;
          align-items: center;
          height: 40px;
          margin-right: 30px;
          p {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            background: #15bafe;
            color: #fff;
            height: 100%;
          }
          span {
            box-sizing: border-box;
            border: 1px solid #dedede;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 40px;
          }
        }
      }

      /*表格*/
      .content_table {
        margin-top: 30px;
        box-sizing: border-box;
        .el-table--border::after,
        .el-table--group::after,
        .el-table::before {
          background: unset;
        }
        .el-table {
          border: none;
          border-left: 1px solid #ebeef5;
          thead {
            color: #fff;
            th,
            tr {
              background-color: #15bafe;
            }
          }
        }
        /*操作按钮*/
        .table_scope {
          padding: 0;
          .cell {
            line-height: unset;
            .scope_btm {
              display: flex;
              align-items: center;
              justify-content: space-around;
              .el-button {
                border: none;
                background: transparent;
              }
            }
          }
        }
        .el-pagination {
          // text-align: center;
          margin-top: 20px;
        }
      }
    }
  }

  /*修改弹窗*/
  .addWordsDialog {
    .el-dialog__body {
      padding-top: 10px;
      padding-bottom: 5px;
    }
    .addWordsDialog_title {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i {
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .addWordsDialog_box {
      .words {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        p {
          margin-right: 20px;
        }
        .el-input {
          flex: 1;
        }
      }
      .type {
        display: flex;
        p {
          margin-right: 20px;
        }
        .el-radio-group {
          flex: 1;
          .el-radio {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            margin: 0 0 10px 0;
            padding: 0;
            .el-radio__input {
              display: none;
            }
            .el-radio__label {
              padding: 0;
            }
          }

          .el-radio.is-checked {
            background: #15bafe;
            border-color: #15bafe;
            .el-radio__label {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
