<template>
  <div class="RecruitCampusRecruitment">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <div class="title">
        <p>校园招聘</p>
        <p>
          <img src="../../assets/image/new.png" alt>
          <span>刷新</span>
        </p>
      </div>
      <div class="content_contain">
        <div class="choice">
          <div class="choice-left">
            <el-select v-model="value" placeholder="时间排列">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value" placeholder="学校选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value" placeholder="状态选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value" placeholder="教育程度">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value" placeholder="应聘职位">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="choice-right">
            <el-select v-model="value" placeholder="按综合得分">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value" placeholder="按专业能力">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="tables">
          <el-table
            :data="tableData"
            border
            :stripe="true"
            :header-row-style="{height:'40px'}"
            :header-cell-style="{padding:0}"
            :row-style="{height:'40px'}"
            :cell-style="{padding:0}"
            style="width: 100%"
          >
            <el-table-column label="选择" width="50">
              <template slot-scope="scope">
                <el-checkbox></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" width="70"></el-table-column>
            <el-table-column prop="name" label="姓名" width="130"></el-table-column>
            <el-table-column prop="email" label="Email" width="200"></el-table-column>
            <el-table-column prop="school" label="学校" width="150"></el-table-column>
            <el-table-column prop="educationalLevel" label="教育程度" width="80"></el-table-column>
            <el-table-column prop="major" label="专业" width="150"></el-table-column>
            <el-table-column prop="job" label="应聘职位" width="200"></el-table-column>
            <el-table-column prop="applyTime" label="申请时间" width="150"></el-table-column>
            <el-table-column prop="requirement" label="特殊要求" width="80"></el-table-column>
            <el-table-column prop="state" label="状态" width="60"></el-table-column>
            <el-table-column label="操作" width="250" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click="seeVisible = true">联系方式</el-button>
                <el-button size="small" type="text">简历</el-button>
                <el-button size="small" type="text" @click="operationVisible = true">操作</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 查看联系方式 -->
    <el-dialog :visible.sync="seeVisible" width="470px">
      <div slot="title" class="dialog_delete_head_title">
        <i class="iconfont icon-edit-square delete_icon"></i>
        <span>联系方式：</span>
      </div>
      <div class="dlog">
        <p class="info">电话：</p>
        <div class="info-neir">110110110110</div>
        <p class="info">邮箱：</p>
        <div class="info-neir">666@666.com</div>
        <div class="btn">
          <el-button type="primary">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 操作 -->
    <el-dialog :visible.sync="operationVisible" width="335px">
      <div slot="title" class="dialog_delete_head_title">
        <i class="iconfont icon-edit-square delete_icon"></i>
        <span>操作：</span>
      </div>
      <div class="dlog">
        <div class="pass">通过</div>
        <div class="nopass">拒绝</div>
        <div class="interview">邀请面试</div>
        <div class="btn">
          <el-button type="primary">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "../public/BreadCrumb";
export default {
  name: "RecruitCampusRecruitment",
  components: { BreadCrumb },
  data: function() {
    return {
      seeVisible: false,
      operationVisible: false,
      breadData: [
        {
          id: 1,
          name: "招聘",
          urls: "/index",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "校园招聘",
          urls: "/index/RecruitCampusRecruitment",
          icon: "icon-home"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      tableData: [
        {
          id: 1,
          name: "诸葛牛逼",
          email: "666@666.com",
          school: "社会大学",
          educationalLevel: "博士后",
          major: "挖煤",
          job: "前端工程师",
          applyTime: "2018/10/18",
          requirement: "长得帅",
          state: "拒绝"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
.bread {
  margin: 10px;
}
.content::-webkit-scrollbar {
  display: none;
}
.content {
  background: white;
  margin-left: 10px;
  margin-right: 10px;
  height: calc(100vh - 100px);
  width: calc(100vw - 221px);
  border-radius: 2px;
  overflow-y: auto;
}
.content_contain {
  padding: 30px 55px;
  box-sizing: border-box;
}
.title {
  text-align: start;
  height: 70px;
  line-height: 70px;
  border-bottom: 2px solid #f2f2f2;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  color: #222222;
}
.choice {
  display: flex;
  justify-content: space-between;
}
.choice-left {
  display: flex;
}
.choice-right {
  display: flex;
}
.tables {
  margin-top: 20px;
}
.dialog_delete_head_title {
  height: 16px;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
  text-align: left;
  font-size: 15px;
  color: #a2a2a2;
}
.delete_icon {
  color: #15bafe;
  font-size: 18px;
  top: 1px;
  position: relative;
}
.info-neir {
  height: 35px;
  width: 410px;
  border: 1px solid #bfbfbf;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 14px;
  text-align: left;
  line-height: 35px;
}
.dlog {
  text-align: center;
}
.dlog > p {
  margin: 15px 0;
  text-align: left;
}
.btn {
  margin-top: 15px;
}
.pass {
  margin: 20px auto 0 auto;
  width: 185px;
  height: 35px;
  background: #4cd01a;
  /* margin-top: 20px; */
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  line-height: 35px;
}
.nopass {
  margin: 20px auto 0 auto;
  width: 185px;
  height: 35px;
  background: #f95452;
  margin-top: 20px;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  line-height: 35px;
}
.interview {
  margin: 20px auto 0 auto;
  width: 185px;
  height: 35px;
  background: #15bafe;
  margin-top: 20px;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  line-height: 35px;
}
</style>
<style lang="less">
.RecruitCampusRecruitment {
  .el-table th > .cell {
    text-align: center;
  }
  .el-table th {
    background-color: #15bafe;
  }
  .el-table thead {
    color: #fff;
  }
  .choice {
    .el-select {
      margin-right: 12px;
      .el-input {
        width: 120px;
        .el-input__inner {
          height: 30px;
          border-radius: 0;
        }
        .el-input__suffix {
          .el-input__suffix-inner {
            .el-input__icon {
              line-height: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
