<template>
  <div class="messagecontentBox">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="messagebox">
      <div class="titlebox"> 
        <span>弹框内容</span>
      </div>
      <div style="padding:20px;box-sizing:border-box">
      <div class="buttonbox">
        <el-button type="primary" @click="addalertBoxFn">添加</el-button>
      </div>
      <div class="tablebox">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="menu[0].name" label="一级目录"></el-table-column>
          <el-table-column prop="menu[1].name" label="二级目录"></el-table-column>
          <el-table-column prop="menu[2].name" label="三级目录"></el-table-column>
          <el-table-column prop="content.info" label="信息" show-overflow-tooltip></el-table-column>
          <el-table-column prop="content.description" label="事件"></el-table-column>
          <el-table-column prop="content.remark" label="备注" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="name" label="Code"></el-table-column> -->
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.status === 1?'正常':'禁用'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="amendInfo(scope.row)">修改</el-button>
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

    <!-- 添加/修改 弹框 -->
    <div class="alertbox">
      <el-dialog :title="alertTitle" :visible.sync="centerDialogVisible" width="30%" center>
        <!-- <span>需要注意的是内容是默认不居中的</span> -->
        <div class="leftbox">
          <div class="grade">
            <el-tag type="info">一级</el-tag>
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
            <el-tag type="info">二级</el-tag>
            <el-select v-model="Twovalue" placeholder="请选择" @change="changeTwoModel">
              <el-option
                v-for="item in Twooptions"
                :key="item.menu_id"
                :label="item.name"
                :value="item.menu_id"
              ></el-option>
            </el-select>
          </div>
          <div class="grade">
            <el-tag type="info">三级</el-tag>
            <el-select v-model="Threevalue" placeholder="请选择">
              <el-option
                v-for="item in Threeoptions"
                :key="item.menu_id"
                :label="item.name"
                :value="item.menu_id"
              ></el-option>
            </el-select>
          </div>
          <div class="grade infor">
            <el-tag type="info">信息</el-tag>
            <el-input placeholder="请输入内容" v-model="inputValue" clearable></el-input>
            <!-- <el-button type="primary" icon="el-icon-plus" @click="addInformationFn"></el-button> -->
          </div>
          <div class="grade infor">
            <el-tag type="info">定位符</el-tag>
            <el-input placeholder="请输入内容" v-model="positionValue" clearable></el-input>
            <el-button type="primary" icon="el-icon-plus" @click="addInformationFn"></el-button>
          </div>
          <el-card class="box-card">
            <el-tag
              v-for="tag in tags"
              :key="tag"
              closable
              type="tag.type"
              @close="deleteInforFn(tag)"
            >{{tag}}</el-tag>
          </el-card>
        </div>
        <div class="leftbox rightbox">
          <div class="grade">
            <div class="thingTitle">事件</div>
            <!-- <el-tag type="info">事件</el-tag> -->
            <el-input
              type="textarea"
              :rows="2"
              resize="none"
              placeholder="请输入内容"
              v-model="textarea"
            ></el-input>
          </div>
          <!-- <div class="grade infor rightinfor">
            <el-tag type="info">Code</el-tag>
            <el-input placeholder="请输入内容" v-model="codeValue" clearable></el-input>
          </div>-->
          <div class="grade rightinfor">
            <el-input
              type="textarea"
              :rows="6"
              resize="none"
              placeholder="备注"
              v-model="otherTextarea"
            ></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMenulistFn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "MessageContent",
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
          name: "弹框内容管理",
          urls: "/index/functionControl/messageBox/message-box",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "弹框内容",
          urls: "/index/functionControl/messageBox/message-content",
          icon: "icon-home"
        }
      ],

      //  表格数据
      tableData: [],

      // 添加弹框的下拉框
      alertTitle: "",
      centerDialogVisible: false, //控制添加弹框显示变量
      options: [], //一级下拉框内容
      value: "", //一级下拉框选中的内容
      Twooptions: [], //二级下拉框内容
      Twovalue: "", //二级下拉框选中的内容
      Threeoptions: [], //三级下拉框内容
      Threevalue: "", //三级下拉框选中的内容
      tags: [], //显示在信息列表中的data
      inputValue: "", //添加的信息内容
      textarea: "", //添加的事件内容
      otherTextarea: "", //添加的备注内容
      positionValue: "", //定位符
      infoID: null,//当前信息ID
      // codeValue:'',//code

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
    //   获取弹框内容列表
    getlistData() {
      let params = {
        type: 4,
        size:this.pageSize,
        page:this.currentPage
      };
      this.HttpClient.post("/admin/templates/getList", params).then(res => {
        if (res.data.code === 200) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.data;
          // console.log(this.tableData);
        }
      });
    },
    // 点开弹窗时获取目录列表
    addalertBoxFn() {
      this.alertTitle = "添加";
      this.infoID = null;;
      this.value = '';
      this.Twovalue = '';
      this.Threevalue = '';
      this.inputValue = '';
      this.tags = [];
      this.textarea = '';
      this.otherTextarea = '';
      this.centerDialogVisible = true;
      let params = {
        menu_type: 4,
        type: 1
      };
      this.HttpClient.post("/admin/menu/getList", params).then(res => {
        if (res.data.code == 200) {
          this.options = res.data.data;
        }
      });
    },
    // 点击确定
    addMenulistFn() {
      this.centerDialogVisible = false;
      var arr = {};
      arr["menu_1"] = this.value;
      arr["menu_2"] = this.Twovalue;
      arr["menu_3"] = this.Threevalue;
      arr["info"] = this.inputValue;
      arr["description"] = this.textarea;
      arr["remark"] = this.otherTextarea;
      arr["replace"] = this.tags;
      var timestamp = new Date().getTime();
      if (this.alertTitle == "修改") {
        let params = {
          id: this.infoID,
          type: 4,
          name: timestamp,
          content: JSON.stringify(arr)
        };
        // 修改数据
        this.HttpClient.post("/admin/templates/edit", params).then(res => {
          // console.log(res.data);
          if (res.data.code === 200) {
            setTimeout(() => {
              this.getlistData();
            },500)
          }
        });
      } else if (this.alertTitle == "添加") {
        let params = {
          type: 4,
          name: timestamp,
          content: JSON.stringify(arr)
        };

        // 添加数据
        this.HttpClient.post("/admin/templates/create", params).then(res => {
          // console.log(res.data)
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            setTimeout(() => {
              this.getlistData();
            },500)
          }
        });
      }
    },
    // 一级目录
    changeOneModel() {
      this.Twovalue = "";
      this.Threevalue = "";
      for (var i in this.options) {
        if (this.value == this.options[i].menu_id) {
          this.Twooptions = this.options[i].child;
        }
      }
    },
    // 二级目录
    changeTwoModel() {
      this.Threevalue = "";
      for (var i in this.Twooptions) {
        if (this.Twovalue == this.Twooptions[i].menu_id) {
          this.Threeoptions = this.Twooptions[i].child;
        }
      }
    },
    //   添加信息
    addInformationFn() {
      console.log(this.inputValue);
      this.tags.push(this.positionValue);
      //   this.inputValue = ''
    },
    //   删除添加的信息
    deleteInforFn(val) {
      console.log(val);
      this.tags.forEach((item, index) => {
        if (item == val) {
          this.tags.splice(index, 1);
        }
      });
    },
    // 操作修改
    amendInfo(row) {
      console.log(row);
      this.alertTitle = "修改";
      this.infoID = row.id;
      this.centerDialogVisible = true;
      this.value = row.content.menu_1;
      this.Twovalue = row.content.menu_2;
      this.Threevalue = row.content.menu_3;
      this.inputValue = row.content.info;
      this.tags = row.content.replace;
      this.textarea = row.content.description;
      this.otherTextarea = row.content.remark;
      let params = {
        menu_type: 4,
        type: 1
      };
      this.HttpClient.post("/admin/menu/getList", params).then(res => {
        if (res.data.code == 200) {
          this.options = res.data.data;
          for (var i in this.options) {
            if (this.value == this.options[i].menu_id) {
              this.Twooptions = this.options[i].child;
              for (var i in this.Twooptions) {
                if (this.Twovalue == this.Twooptions[i].menu_id) {
                  this.Threeoptions = this.Twooptions[i].child;
                }
              }
            }
          }
        }
      });
    },
    // 操作删除
    deleteInfo(row){
      let params = {
        id:row.id
      }
      this.HttpClient.post('/admin/templates/destroy',params).then(res => {
        // console.log(res.data)
        if(res.data.code === 200){
          setTimeout(() => {
            this.getlistData()
          },500)
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

<style lang='less'>
.messagecontentBox {
  .bread {
    margin: 10px;
  }
  .messagebox {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;
    .titlebox{
      text-align: left;
      border-bottom: 1px solid #dedede;
      padding: 20px;
    }
    .buttonbox {
      width: 70px;
      margin: 20px 0;
    }
    .tablebox {
      .el-table th > .cell {
        text-align: center;
      }
    }
  }
  .alertbox {
    .el-dialog__body {
      display: flex;
      justify-content: space-between;
    }
    .leftbox {
      flex: 2;
      .infor {
        .el-input {
          width: 68.5%;
          padding-top: 3px;
        }
        .el-input__inner {
          height: 34px;
        }
        .el-button {
          padding: 8px 6px;
        }
      }
      .box-card {
        .el-tag {
          margin-right: 5px;
        }
      }
      .grade {
        margin-bottom: 5px;
        .el-select {
          width: 180px;
          .el-input__inner {
            height: 34px;
          }
        }
      }
      .addinforbox {
        width: 228px;
        height: 100px;
        border: 1px solid #dedede;
        border-radius: 4px;
      }
    }
    .rightbox {
      .grade {
        display: flex;
        .el-textarea {
          width: 80%;
        }
        .thingTitle {
          width: 50px;
          height: 30px;
          border: 1px solid #dedede;
          border-radius: 4px;
          line-height: 30px;
          text-align: center;
          margin-right: 5px;
        }
      }
      .rightinfor {
        .el-input {
          width: 80%;
          padding: 0;
          margin-left: 5px;
        }
        .el-textarea {
          margin: 10px;
        }
      }
    }
  }
}
</style>
