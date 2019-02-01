<template>
  <div class="RecruitJobManagement">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <p class="title">职位管理</p>
      <div class="content_contain">
        <div class="hd">
          <div class="right" @click="add()">
            <div class="ri-left">
              <img src="../../assets/image/tianjia.png" alt>
            </div>
            <div class="ri-right">创建职位</div>
          </div>
        </div>
        <div class="tables">
          <el-table
            :data="slist"
            border
            :stripe="true"
            :header-row-style="{height:'40px'}"
            :header-cell-style="{padding:0}"
            :row-style="{height:'40px'}"
            :cell-style="{padding:0}"
            style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="职位" width="250"></el-table-column>
            <el-table-column prop="province" label="城市" min-width="250"></el-table-column>
            <el-table-column prop="end_time" label="申请截止时间" width="200"></el-table-column>
            <el-table-column prop="limit" label="岗位空缺人数" width="200"></el-table-column>
            <el-table-column prop="current" label="当前申请人数" width="200"></el-table-column>
            <el-table-column prop="status" label="状态" width="145">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1" style="color:#15bafe">启用</span>
                <span v-if="scope.row.status === 0" style="color:red">禁用</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="250" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click="handleModify(scope.row)">编辑</el-button>
                <el-button
                  size="small"
                  type="text"
                  v-if="scope.row.status === 1"
                  @click="handleOpen(scope.row)"
                >禁用</el-button>
                <el-button
                  size="small"
                  type="text"
                  v-if="scope.row.status === 0"
                  @click="handleOpen(scope.row)"
                >启用</el-button>
                <el-button size="small" type="text" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 添加弹框 -->
    <el-dialog :visible.sync="addVisible" width="650px">
      <div slot="title" class="dialog_delete_head_title">
        <i class="iconfont icon-edit-square delete_icon"></i>
        <span>创建新职位</span>
      </div>
      <div class="neir">
        <p>职位名称</p>
        <el-input v-model="jobName" class="input"></el-input>
        <p>薪资待遇</p>
        <el-input v-model="salary" class="input"></el-input>
        <p>职位描述</p>
        <el-input type="textarea" v-model="jobDescription" placeholder="100字内介绍" class="textarea"></el-input>
        <p>岗位需求</p>
        <el-input type="textarea" v-model="jobDemand" placeholder="100字内介绍" class="textarea"></el-input>
        <div class="bott">
          <div class="bot-left">
            <div>
              <p>报名截止时间</p>
              <div class="end">
                <span>截止</span>
                <el-date-picker
                  class="inputdata"
                  v-model="endTime"
                  type="date"
                  placeholder="选择日期"
                  :change="dd()"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </div>
            </div>
            <div>
              <p>城市</p>
              <!-- <el-input v-model="city" class="input"></el-input> -->
              <!-- <el-cascader :options="cityData" v-model="city"></el-cascader> -->
              <el-select v-model="city" placeholder="请选择">
                <el-option
                  v-for="item in cityData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="bot-rigth">
            <p>空缺人数</p>
            <el-input v-model="limit" class="input"></el-input>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" @click="sure()">确定</el-button>
          <el-button>取消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 修改弹框 -->
    <el-dialog :visible.sync="modifyVisible" width="650px">
      <div slot="title" class="dialog_delete_head_title">
        <i class="iconfont icon-edit-square delete_icon"></i>
        <span>修改职位</span>
      </div>
      <div class="neir">
        <p>职位名称</p>
        <el-input v-model="jobName" class="input"></el-input>
        <p>薪资待遇</p>
        <el-input v-model="salary" class="input"></el-input>
        <p>职位描述</p>
        <el-input type="textarea" v-model="jobDescription" placeholder="100字内介绍" class="textarea"></el-input>
        <p>岗位需求</p>
        <el-input type="textarea" v-model="jobDemand" placeholder="100字内介绍" class="textarea"></el-input>
        <div class="bott">
          <div class="bot-left">
            <div>
              <p>报名截止时间</p>
              <div class="end">
                <span>截止</span>
                <el-date-picker
                  class="inputdata"
                  v-model="endTime"
                  type="date"
                  placeholder="选择日期"
                  :change="dd()"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </div>
            </div>
            <div>
              <p>城市</p>
              <el-input v-model="city" class="input"></el-input>
            </div>
          </div>
          <div class="bot-rigth">
            <p>空缺人数</p>
            <el-input v-model="limit" class="input"></el-input>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" @click="handleSave()">保存</el-button>
          <el-button>取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "../public/BreadCrumb";
export default {
  name: "RecruitJobManagement",
  components: { BreadCrumb },
  data: function() {
    return {
      value2: "",
      addVisible: false,
      modifyVisible: false,
      breadData: [
        {
          id: 1,
          name: "招聘",
          urls: "/index",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "职位管理",
          urls: "/index/RecruitJobManagement",
          icon: "icon-home"
        }
      ],
      status_wen: "来得及福利费",
      slist: [], //视图数组
      searchlist: [], //search功能的实现，searchlist为在输入框下方展示的可能要搜索的词语，ss数组则保存过滤后的数据，当循环完毕后，设置调用setSlist方法修改slist数组
      ss: [], //搜索后选出来的数据
      selectedlist: {}, //取出的需要修改的数据
      selected: "",
      list: [],
      //新创建职位的数据
      jobName: "",
      salary: "",
      jobDescription: "",
      jobDemand:'', //岗位需求
      endTime: "",
      city: "",
      limit: "",
      time: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      code: "",
      poindex: null, //点击修改职位，存储修改的职位的index
      jobId: null, //职位ID
      cityData: [] //城市数据
    };
  },
  mounted() {
    this.getJobList();
  },
  methods: {
    // 请求职位列表
    getJobList() {
      this.HttpClient.post("/web/position/getList", {}).then(res => {
        console.log(res);
        this.slist = res.data.data;
      });
    },
    dd() {
      // 转换时间格式
      var d = new Date(this.endTime);
      var time1 =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      // console.log(time2)
      this.time = time1 + " 00:00:00";
    },
    //赋值渲染列表
    setSlist(arr) {
      this.slist = JSON.parse(JSON.stringify(arr));
    },
    //添加职位
    add() {
      this.addVisible = true;
      // console.log(this.list)
      this.jobName = "";
      this.salary = "";
      this.jobDescription = "";
      this.endTime = "";
      this.city = "";
      this.limit = "";
      this.HttpClient.get("/city/getAllCities").then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.cityData = res.data.data;
          // res.data.data.forEach(item => {
          //   item.child.forEach(e => {
          //     this.cityData.push(e);
          //   });
          // });
        }
      });
    },
    //保存添加的职位
    sure() {
      this.addVisible = false;
      //发送新创建的职位
      this.HttpClient.post("/web/position/create", {
        name: this.jobName,
        description: this.jobDescription,
        requirement: this.jobDemand,
        limit: this.limit,
        end_time: this.time,
        price: this.salary,
        province: this.city
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            setTimeout(() => {
              this.getJobList();
            }, 500);
          }
        })
        .catch(e => {
          this.$message.error(res.data.msg);
        });
    },
    //删除职位
    handleDelete(row) {
      //先删除后台数据，当后台数据删除成功后方可删除视图数据
      this.HttpClient.post("/web/position/destroy", {
        id: row.id
      })
        .then(res => {
          console.log(res.data);
          this.code = res.data.code;
          if (this.code == 200) {
            this.$message.success(res.data.msg);
            setTimeout(() => {
              this.getJobList();
            }, 500);
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(e => {
          console.log("请求失败");
        });
    },
    //禁用或启用
    handleOpen(row) {
      console.log(row)
      //   var id = this.list[index].id; //存储的职位ID
      if (row.status == 1) {
        this.HttpClient.post("/web/position/changeStatus", {
          // token: this.token,
          id: row.id
        })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              setTimeout(() => {
                this.getJobList();
              }, 500);
            }
            // this.HttpClient
            //   .post("/admin/position/getList", {
            //     // token: this.token
            //   })
            //   .then(res => {
            //     console.log(res.data.data);
            //     this.list = res.data.data;
            //     this.setSlist(this.list);
            //   })
            //   .catch(e => {
            //     console.log("请求失败" + e);
            //   });
          })
          .catch(e => {
            console.log("请求失败");
          });
      } else {
        this.HttpClient.post("/admin/position/changeStatus", {
          // token: this.token,
          id: row.id
        })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              setTimeout(() => {
                this.getJobList();
              }, 500);
            }
            // this.HttpClient
            //   .post("/admin/position/getList", {
            //     // token: this.token
            //   })
            //   .then(res => {
            //     console.log(res.data.data);
            //     this.list = res.data.data;
            //     this.setSlist(this.list);
            //   })
            //   .catch(e => {
            //     console.log("请求失败" + e);
            //   });
          })
          .catch(e => {
            console.log("请求失败");
          });
      }
    },
    //编辑修改职位
    handleModify(i) {
      console.log(i);
      this.poindex = i.department_id; //存储修改的职位的index，用于保存修改的操作
      this.jobId = i.id;
      this.jobName = i.name;
      this.salary = i.price;
      this.jobDescription = i.description;
      this.jobDemand = i.requirement;
      this.endTime = i.end_time;
      this.city = i.province;
      this.limit = i.limit;
      this.modifyVisible = true;
    },
    //保存修改
    handleSave() {
      this.HttpClient.post("/web/position/edit", {
        id: this.jobId,
        name: this.jobName,
        description: this.jobDescription,
        requirement: this.jobDemand,
        end_time:this.endTime,
        price:this.salary,
        limit: this.limit,
        province:this.city
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          this.getJobList();
          this.modifyVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
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
.title {
  text-align: left;
  padding: 20px;
  padding-left: 50px;
  font-size: 18px;
  border-bottom: 1px solid #f2f2f2;
}
.content_contain {
  padding: 30px 55px;
  box-sizing: border-box;
}
.hd {
  display: flex;
  justify-content: flex-end;
}
.right {
  width: 150px;
  height: 35px;
  border: 1px solid #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
}
.ri-left {
  background: #15bafe;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ri-right {
  background: #15bafe;
  width: 74%;
  color: #fff;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
}
.tables {
  margin-top: 25px;
}
/* 弹框 */
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
.input {
  width: 80%;
}
.end {
  height: 40px;
  width: 190px;
  border: 1px solid #999999;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
}
.end > span {
  margin: auto;
  color: #666666;
  font-size: 14px;
}
.bott {
  display: flex;
}
.bott > div {
  width: 50%;
}
p {
  text-align: left;
  font-size: 14px;
  margin: 15px 0;
}
.neir {
  text-align: left;
}
.btn {
  margin: 15px 0;
  text-align: right;
}
</style>
<style lang="less">
.RecruitJobManagement {
  .inputdata {
    .el-input__inner {
      border: none;
    }
  }
  .tables {
    .el-table th > .cell {
      text-align: center;
    }
  }
  .end {
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 145px;
    }
  }
}
</style>
