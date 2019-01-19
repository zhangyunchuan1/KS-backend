<template>
  <div class="AttributeName">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="video_titlebox">
      <div class="videopage_title">
        <div class="title">数字区间属性名称</div>
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
  name: "AttributeName",
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
          name: "数字区间属性名称",
          urls: "/index/functionControl/mallManagement/attribute-name",
          icon: "icon-home"
        }
      ],

      tableData: [], //全部属性数据
      centerDialogVisible: false, //是否显示添加弹框
      attributeName: "" //添加的属性名称
    };
  },
  mounted() {
    this.getNumname();
  },
  methods: {
    getNumname() {
      this.HttpClient.post("/admin/numInterval/getName").then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
        //   console.log(this.tableData);
        }
      });
    },
    // 添加属性名称
    addAttributeNameFn() {
      this.centerDialogVisible = true;
    },
    // 确定添加属性名称
    saveAttributeNameFn() {
      this.HttpClient.post("/admin/numInterval/addName", {
        name: this.attributeName
      }).then(res => {
        // console.log(res.data);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
              this.getNumname()
          }, 500);
          this.centerDialogVisible = false;
        }else{
          this.$message.warning(res.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="less">
.AttributeName {
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
