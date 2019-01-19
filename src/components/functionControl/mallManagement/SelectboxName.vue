<template>
  <div class="SelectboxName">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="video_titlebox">
      <div class="videopage_title">
        <div class="title">选择框名称</div>
      </div>
      <div class="productbox">
        <div class="product_header">
          <el-button type="primary" @click="addAttributeNameFn">添加</el-button>
        </div>
        <!-- 表格列表 -->
        <div class="product_header">
          <table border="1" style="border-collapse: collapse">
            <tr>
              <th>全部属性</th>
            </tr>
            <tr>
              <td>
                <el-tag v-for="(item,index) in tableData" :key="index">{{item.name}}</el-tag>
              </td>
            </tr>
          </table>
        </div>
        <div class="product_header">
          <el-pagination
              v-if="total"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
        </div>
        <!-- 添加弹框 -->
        <div class="product_header">
          <el-dialog title="添加" :visible.sync="centerDialogVisible" width="30%" center>
            <p>属性名称：</p>
            <el-input placeholder="请输入内容" v-model="attributeName" clearable></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false;attributeName = ''">取 消</el-button>
              <el-button type="primary" @click="saveAttributeNameFn">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "SelectboxName",
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
          name: "选择框名称",
          urls: "/index/functionControl/mallManagement/selectbox-name",
          icon: "icon-home"
        }
      ],

      tableData: [], //全部属性数据
      centerDialogVisible: false, //是否显示添加弹框
      attributeName: "", //添加的属性名称

      // 分页
        total:0,
        currentPage:1,
        pageSize:25,
    };
  },
  mounted() {
    this.getNumname();
  },
  methods: {
    getNumname() {
      this.HttpClient.get("/admin/selectBox").then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
          console.log(res.data);
        }
      });
    },
    // 添加属性名称
    addAttributeNameFn() {
      this.centerDialogVisible = true;
    },
    // 确定添加属性名称
    saveAttributeNameFn() {
      this.HttpClient.post("/admin/selectBox", {
        name: this.attributeName
      }).then(res => {
        // console.log(res.data);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
              this.getNumname()
          }, 500);
          this.centerDialogVisible = false;
        }
      });
    },
    // 分页
      handleCurrentChange(p){
        this.currentPage = p;
        this.getTableData()
      },
  }
};
</script>

<style lang="less">
.SelectboxName {
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
        table {
          tr {
            th,
            td {
              padding: 10px;
              text-align: left;
              .el-tag {
                margin: 0 10px 0 0;
              }
            }
          }
        }
        .el-dialog__body {
          p {
            margin-bottom: 10px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
