<template>
  <div class="userHistory">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="userHistory_main">
      <!--标题-->
      <div class="title">
        <p>用户历史记录</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_header_search">
            <el-input placeholder="昵称搜索" v-model="nickNameSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleNickNameSearch"></el-button>
            </el-input>
            <el-input placeholder="ID搜索" v-model="idSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleIdSearch"></el-button>
            </el-input>
          </div>
        </div>

        <div class="content_table">
          <el-table
            :data="tableData"
            :border="true">
            <el-table-column
              label="用户ID"
              align="center"
              width="100"
              prop="user_id"
              sortable>
            </el-table-column>

            <el-table-column
              label="用户昵称"
              align="center"
              width="220"
              show-overflow-tooltip
              prop="nickname">
            </el-table-column>

            <el-table-column
              label="登陆状态"
              align="center"
              show-overflow-tooltip
              width="140"
              prop="status">
              <template slot-scope="scope">
                <span>{{scope.row.status == 0?'删除':scope.row.status == 1?'正常':scope.row.status == 2?'注销':scope.row.status == 3?'禁用':scope.row.status == 4?'待审核':scope.row.status == 5?'驳回':scope.row.status == 6?'审核未通过':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="类型"
              align="center"
              show-overflow-tooltip
              width="140"
              prop="type">
              <template slot-scope="scope">
                <span>{{scope.row.type == 0?'删除':scope.row.type == 1?'文章':scope.row.type == 2?'视频':scope.row.type == 3?'问题':scope.row.type == 4?'活动':scope.row.type == 5?'商品':scope.row.type == 6?'服务':scope.row.type == 7?'百科':scope.row.type == 8?'淘货':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="题目"
              align="center"
              width="300"
              prop="title"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              label="关键字"
              align="center"
              width="320"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="tags_list">
                  <p v-for="(item,index) in scope.row.tag" :key="index">{{item}}</p>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="浏览时间"
              align="center"
              width="180"
              prop="record_time"
              show-overflow-tooltip
              sortable>
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="viewSubjectCatalogue(scope.row)">学科目录</el-button>
                  <el-button size="medium" type="text">查看内容</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="total"
            layout="prev, pager, next"
            :total="total"
            :page-size="25"
            @current-change="currentChange($event)"
            >
          </el-pagination>
        </div>
        <!-- 查看学科目录弹框 -->
        <el-dialog
          title="查看学科目录"
          :visible.sync="centerDialogVisible"
          width="40%"
          center>
          <div class="allDirectoryDialog_box" v-for="(item,index) in subjectData" :key="index">
            <el-tag v-for="(e,i) in item" :key="i" style="margin-right:10px;">{{e.name}}</el-tag>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "UserHistory",
    components: {
      BreadCrumb
    },
    data() {
      return {
        // 面包屑
        breadData: [
          {
            id: 1,
            name: "用户管理",
            urls: "/index/standardUser/StandardUser",
            icon: "icon-home"
          }, {
            id: 2,
            name: "用户数据",
            urls: "/index/standardUser/userData/UserData",
            icon: "icon-home"
          }, {
            id: 3,
            name: "用户历史记录",
            urls: "/index/standardUser/userData/UserHistory",
            icon: "icon-home"
          }
        ],

        nickNameSearch: '',  // 昵称搜索
        idSearch: '',  // id搜索

        tableData: [],
        subjectData:[],
        //分页
        total:null,
        currentPage:1,

        centerDialogVisible:false,//查看学科目录弹框
      }
    },
    mounted(){
      this.getUserHistoryList();
    },
    methods:{
      // 查看学科目录
      viewSubjectCatalogue(row){
        console.log(row)
        this.centerDialogVisible = true;
        this.HttpClient.post('/admin/behavior/menuMajorInfo',{record_id:row.record_id}).then(res => {
          console.log(res)
          if(res.data.code === 200){
            this.subjectData = res.data.data;
          }
        })
      },
      //ID搜索
      handleIdSearch(){
          this.getUserHistoryList();
      },
      //用户昵称搜索
      handleNickNameSearch(){
          this.getUserHistoryList();
      },
      //获取用户历史列表
      getUserHistoryList(){
          this.HttpClient.post('/admin/behavior/userHistory',{
              page:this.currentPage,
              size:25,
              nickname:this.nickNameSearch,
              user_id:this.idSearch
          })
          .then(res=>{
              console.log(res);
              if(res.data.code === 200){
                  this.tableData = res.data.data.data;
                  for(let i in this.tableData){
                    let time = new Date(this.tableData[i].record_time);
                    this.tableData[i].record_time = this.formatDateTime(time);
                    // time.getFullYear()+' '+time.getMonth()+' '+time.getDate()+' '+
                    // this.tableData[i].record_time = new Date(this.tableData[i].record_time);
                  }
                  this.total = res.data.data.total;
              }
          })
      },
      currentChange(p){
          this.currentPage = p;
          this.getUserHistoryList();
      },
      formatDateTime(inputTime) {  
          var date = new Date(inputTime);
          var y = date.getFullYear();  
          var m = date.getMonth() + 1;  
          m = m < 10 ? ('0' + m) : m;  
          var d = date.getDate();  
          d = d < 10 ? ('0' + d) : d;  
          var h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          var minute = date.getMinutes();
          var second = date.getSeconds();
          minute = minute < 10 ? ('0' + minute) : minute;  
          second = second < 10 ? ('0' + second) : second; 
          return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
      }
    }
  }
</script>

<style lang="less">
  .userHistory{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .userHistory_main::-webkit-scrollbar {
      display: none;
    }
    .userHistory_main {
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;
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
          justify-content: space-between;
          .content_header_search {
            display: flex;
            align-items: center;
            .input-with-select {
              margin-right: 20px;
            }
          }
        }

        /*表格*/
        .content_table {
          margin-top: 30px;
          box-sizing: border-box;
          .el-table--border::after,
          .el-table--group::after,
          .el-table::before{
            background: unset;
          }
          .el-table {
            border: none;
            border-left: 1px solid #ebeef5;
            thead {
              color: #fff;
              th, tr {
                background-color: #15bafe;
              }
            }
          }

          .tags_list{
            display: flex;
            align-items: center;
            justify-content: space-around;
            p{
              border: 1px solid #dedede;
              padding: 3px 5px;
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
                .el-button{
                  border: none;
                  background: transparent;
                }
              }
            }
          }

          .el-pagination{
            text-align: center;
            margin-top: 20px;
          }
        }
        .allDirectoryDialog_box{
          display: flex;
          flex-wrap: nowrap;
          margin-bottom: 10px;
        }

      }
    }
  }
</style>
