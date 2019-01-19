<template>
  <div class="paymentmanagementBox">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="paymentbox">
      <div class="titlebox"> 
        <span>商家收支管理</span>
      </div>
      <div style="padding:20px;box-sizing:border-box">
      <div class="buttonbox">
        <el-button type="primary" @click="openAlertbox">添加</el-button>
      </div>
      <div class="tablebox">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="menu[0].name" label="类别"></el-table-column>
          <el-table-column prop="menu[1].name" label="子类别"></el-table-column>
          <el-table-column prop="content.description" label="事件" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="content.info" label="信息内容" show-overflow-tooltip></el-table-column>
          <el-table-column prop="content.for" label="发起对象"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.status === 1?'正常':'禁用'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="amendInfo(scope.row)" type="text" size="small">修改</el-button>
              <el-button type="text" size="small" @click="deleteInfo(scope.row)">删除</el-button>
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

    <!-- 添加弹框 -->
    <div class="alertbox">
      <el-dialog :title="alertTitle" :visible.sync="centerDialogVisible" width="30%" center>
        <!-- <span>需要注意的是内容是默认不居中的</span> -->
        <!-- <div class="leftbox"> -->
        <div class="grade">
          <el-tag type="info">类别</el-tag>
          <el-select v-model="value" placeholder="请选择" @change="changeOneModel">
            <el-option
              v-for="item in options"
              :key="item.menu_id"
              :label="item.name"
              :value="item.menu_id"
            ></el-option>
          </el-select>
        </div>
        <div class="grade">
          <el-tag type="info">子类别</el-tag>
          <el-select v-model="childValue" placeholder="请选择">
            <el-option
              v-for="item in childOptions"
              :key="item.menu_id"
              :label="item.name"
              :value="item.menu_id"
            ></el-option>
          </el-select>
        </div>
        <div class="grade">
          <el-input type="textarea" :rows="2" resize="none" placeholder="事件" v-model="textarea"></el-input>
        </div>
        <!-- </div> -->
        <div class="grade infor">
          <el-tag type="info">信息</el-tag>
          <el-input placeholder="请输入内容" v-model="inputValue" clearable></el-input>
        </div>
        <div class="grade infor">
          <el-tag type="info">定位符</el-tag>
          <el-input placeholder="请输入内容" v-model="positionValue" clearable></el-input>
          <el-button type="primary" icon="el-icon-plus" @click="addInformationFn"></el-button>
        </div>
        <el-card class="grade box-card">
          <el-tag
            v-for="tag in tags"
            :key="tag"
            :closable="alertTitle==='修改'?true:false"
            type
            @close="deleteInforFn(tag)"
          >{{tag}}</el-tag>
        </el-card>
        <div class="grade">
          <el-tag type="info">发起对象</el-tag>
          <el-radio-group v-model="selectVideotitle" size="small">
            <el-radio :label="item" v-for="(item,index) in menuList" :key="index" border>{{item}}</el-radio>
          </el-radio-group>
        </div>
        <!-- @close="deleteInforFn(tag)" -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false;tags=[]">取 消</el-button>
          <el-button type="primary" @click="sureAddinforFn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "MerchantRevenueTips",
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
          name: "收支管理",
          urls: "/index/functionControl/incomeControl/income-control",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "商家收支管理",
          urls: "/index/functionControl/incomeControl/merchant-revenue-tips",
          icon: "icon-home"
        }
      ],

      //  表格数据
      tableData: [],

      //   弹框
      alertTitle: "", //弹框标题
      centerDialogVisible: false,
      options: [], //下拉框内容
      value: "", //类别下拉框选中的内容
      childOptions: [], //子类别下拉框
      childValue: "", //子类别下拉框选中的内容
      tags: [], //显示在添加信息列表中的data
      inputValue: "", //添加的信息内容
      textarea: "", //添加的事件内容
      menuList: ["系统", "用户", "商家"], //发起对象list
      positionValue: "", //定位符
      selectVideotitle: "", //选中的发起对象
      infoID: null, //当前信息ID

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
    //   获取商家收支管理列表
    getlistData() {
      let params = {
        type: 6,
        size: this.pageSize,
        page: this.currentPage
      };
      this.HttpClient.post("/admin/templates/getList", params).then(res => {
        if (res.data.code === 200) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.data;
          console.log(res.data);
        }
      });
    },
    //   将定位符添加至文本框中
    addInformationFn() {
      this.tags.push(this.positionValue);
      this.positionValue = "";
      // console.log(this.tags);
    },
    // 打开添加/修改 弹框
    openAlertbox() {
      this.alertTitle = "添加";
      this.infoID = null;
      this.value = "";
      this.childValue = "";
      this.inputValue = "";
      this.tags = [];
      this.textarea = "";
      this.selectVideotitle = "";
      this.centerDialogVisible = true;
      let params = {
        menu_type: 4,
        type: 3
      };
      this.HttpClient.post("/admin/menu/getList", params).then(res => {
        // console.log(res.data)
        if (res.data.code == 200) {
          this.options = res.data.data;
        }
      });
    },
    // 类别目录
    changeOneModel() {
      this.childValue = "";
      for (var i in this.options) {
        if (this.value == this.options[i].menu_id) {
          this.childOptions = this.options[i].child;
          // console.log(this.childOptions)
        }
      }
    },
    //   点击添加弹框确定
    sureAddinforFn() {
      // 调取添加信息接口，res.data.code===200时
      this.centerDialogVisible = false;
      this.centerDialogVisible = false;
      var arr = {};
      arr["menu_1"] = this.value;
      arr["menu_2"] = this.childValue;
      arr["for"] = this.selectVideotitle;
      arr["info"] = this.inputValue;
      arr["description"] = this.textarea;
      arr["replace"] = this.tags;
      // console.log(arr)
      var timestamp = new Date().getTime();
      if (this.alertTitle == "修改") {
        let params = {
          id: this.infoID,
          type: 6,
          name: timestamp,
          content: JSON.stringify(arr)
        };
        // 修改数据
        this.HttpClient.post("/admin/templates/edit", params).then(res => {
          this.$message.success(res.data.msg);
          console.log(res.data);
          if (res.data.code === 200) {
            setTimeout(() => {
              this.getlistData();
            }, 500);
          }
        });
      } else if (this.alertTitle == "添加") {
        let params = {
          type: 6,
          name: timestamp,
          content: JSON.stringify(arr)
        };

        // 添加数据
        this.HttpClient.post("/admin/templates/create", params).then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            setTimeout(() => {
              this.getlistData();
            }, 500);
          }
        });
      }
    },
    // 操作修改
    amendInfo(row) {
      // console.log(row);
      this.alertTitle = "修改";
      this.infoID = row.id;
      this.centerDialogVisible = true;
      this.value = row.content.menu_1;
      this.childValue = row.content.menu_2;
      this.inputValue = row.content.info;
      this.tags = row.content.replace;
      this.textarea = row.content.description;
      this.selectVideotitle = row.content.for;
      let params = {
        menu_type: 4,
        type: 3
      };
      this.HttpClient.post("/admin/menu/getList", params).then(res => {
        if (res.data.code == 200) {
          this.options = res.data.data;
          for (var i in this.options) {
            if (this.value == this.options[i].menu_id) {
              this.childOptions = this.options[i].child;
            }
          }
        }
      });
    },
    // 操作删除
    deleteInfo(row) {
      let params = {
        id: row.id
      };
      this.HttpClient.post("/admin/templates/destroy", params).then(res => {
        // console.log(res.data)
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getlistData();
          }, 500);
        }
      });
    },
    // 删除定位符
    deleteInforFn(tag) {
      this.tags.forEach((item, index) => {
        if (tag == item) {
          this.tags.splice(index, 1);
        }
      });
      // console.log(this.tags)
    },

    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistData();
    }
  }
};
</script>

<style lang='less'>
.paymentmanagementBox {
  .bread {
    margin: 10px;
  }
  .paymentbox {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;
    .tablebox {
      .el-table th > .cell {
        text-align: center;
      }
    }
    .titlebox{
      text-align: left;
      border-bottom: 1px solid #dedede;
      padding: 20px;
    }
    .buttonbox {
      width: 70px;
      margin: 20px 0;
    }
  }
  .alertbox {
    .grade {
      margin-bottom: 10px;
      .el-radio-group {
        .el-radio.is-bordered.is-checked {
          background: #409eff;
        }
        .el-radio__input.is-checked + .el-radio__label {
          color: #fff;
        }
        .el-radio__input {
          display: none;
        }
        .el-radio__label {
          padding-left: 5px;
        }
      }
    }
    .infor {
      .el-input {
        width: 60%;
      }
    }
    .el-card {
      .el-tag {
        margin-right: 10px;
      }
    }
  }
}
</style>
