<template>
  <div class="DefiningAttributes">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="video_titlebox">
      <div class="videopage_title">
        <div class="title">定义数字区间属性</div>
      </div>
      <div class="productbox">
        <div class="product_header">
          <el-button type="primary" @click="addAttributeNameFn">添加</el-button>
        </div>
        <!-- 表格列表 -->
        <div class="product_header" style="width: 80%">
          <el-table :data="tableData" border>
            <el-table-column prop="name" align="center" label="属性"></el-table-column>
            <el-table-column prop="unit" align="center" label="单位"></el-table-column>
            <el-table-column prop="unit_cn" align="center" label="中文"></el-table-column>
            <el-table-column prop="status" align="center" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.status == 1?'启用':'禁用'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                >{{scope.row.status == 1?'禁用':'启用'}}</el-button>
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
        <!-- 添加弹框 -->
        <div class="product_header">
          <el-dialog title="添加" :visible.sync="centerDialogVisible" width="30%" center>
            <p>属性名称：</p>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
            <p>单位：只能为英文字母</p>
            <el-input placeholder="请输入内容" v-model="uniten" clearable @change="checkoutUniten"></el-input>
            <p>中文</p>
            <el-input placeholder="请输入内容" v-model="unitcn" clearable @change="checkoutUnitcn"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false;uniten = '';unitcn = '';value=''">取 消</el-button>
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
  name: "DefiningAttributes",
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
          name: "定义数字区间属性",
          urls: "/index/functionControl/mallManagement/defining-attributes",
          icon: "icon-home"
        }
      ],

      tableData: [], //全部属性数据
      centerDialogVisible: false, //是否显示添加弹框
      attributeName: "", //添加的属性名称

      //   弹框
      options: [], //属性名称数据
      value: "", //选中的属性名称
      uniten: "", //英文单位
      unitcn: "", //中文单位

      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0 // 数据总条数
    };
  },
  mounted() {
    this.getNumAttributes();
  },
  methods: {
    //   获取属性列表
    getNumAttributes() {
      let params = {
        size: this.pageSize,
        page: this.currentPage
      };
      this.HttpClient.post("/admin/numInterval/index", params).then(res => {
        // console.log(res.data.data);
        if (res.data.code == 200) {
          this.tableData = res.data.data.data;
          //   console.log(this.tableData);
          this.total = res.data.data.total;
        }
      });
    },
    // 获取属性名称
    getattributeName() {
      this.HttpClient.post("/admin/numInterval/getName").then(res => {
        // console.log(res.data.data);
        if (res.data.code == 200) {
          this.options = res.data.data;
        }
      });
    },
    // 添加数字区间属性
    addAttributeNameFn() {
      this.centerDialogVisible = true;
      this.getattributeName();
    },
    // 输入英文单位
    checkoutUniten() {
      var reg = /[a-zA-Z]+/;
      if (!reg.test(this.uniten)) {
        this.$message.warning("只允许输入英文");
        this.uniten = "";
        return;
      }
    },
    // 输入中文单位
    checkoutUnitcn() {
      var reg = /[\u4e00-\u9fa5]+/;
      if (!reg.test(this.unitcn)) {
        this.$message.warning("只允许输入中文");
        this.unitcn = "";
        return;
      }
    },
    // 操作禁用-启用
    handleClick(row) {
      // console.log(row)
      this.HttpClient.post("/admin/numInterval/changeStatus", {
        id: row.id,
        status: row.status == 1 ? 0 : 1
      }).then(res => {
        // console.log(res.data)
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getNumAttributes();
          }, 1000);
        }
      });
    },
    // 确定添加数字区间属性
    saveAttributeNameFn() {
      this.HttpClient.post("/admin/numInterval/create", {
        name: this.value,
        unit: this.uniten,
        unit_cn: this.unitcn
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getNumAttributes();
          }, 500);
          this.centerDialogVisible = false;
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getNumAttributes();
    }
  }
};
</script>

<style lang="less">
.DefiningAttributes {
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
            margin: 10px 0;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
