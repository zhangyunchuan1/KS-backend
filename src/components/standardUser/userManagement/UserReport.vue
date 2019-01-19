<template>
  <div class="userReport">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="userReport_main">
      <!--标题-->
      <div class="title">
        <p>用户举报</p>
      </div>

      <div class="content">
        <div class="content_header">
          <div class="content_time">
            <el-date-picker
              v-model="searchTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleChangeTime($event)">
            </el-date-picker>
          </div>
        </div>

        <div class="content_table">
          <el-table
            :data="tableData"
            :border="true"
            ref="multipleTable"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange">

            <el-table-column
              type="selection"
              align="center"
              width="55">
            </el-table-column>

            <el-table-column
              label="ID"
              align="center"
              width="90"
              prop="id"
              sortable>
            </el-table-column>

            <el-table-column
              label="举报者昵称"
              align="center"
              width="120"
              show-overflow-tooltip
              prop="actual_name">
            </el-table-column>

            <el-table-column
              label="用户名"
              align="center"
              width="100"
              show-overflow-tooltip
              prop="username">
            </el-table-column>

            <el-table-column
              label="电话"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="phone">
            </el-table-column>

            <el-table-column
              label="举报原因"
              align="center"
              show-overflow-tooltip
              width="150"
              prop="review">
            </el-table-column>

            <el-table-column
              label="链接"
              align="center"
              width="170"
              prop="url"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              label="审核状态"
              align="center"
              width="120"
              prop="status"
              :filters="[{text: '已处理通过', value: 1}, {text: '未处理', value: 2}, {text: '已处理未通过', value: 3}, {text: '已删除', value: 0}]"
              :filter-method="filterHandler"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1">已处理通过</span>
                <span v-if="scope.row.status=== 2">未处理</span>
                <span v-if="scope.row.status=== 3">已处理未通过</span>
                <span v-if="scope.row.status=== 0">已删除</span>
              </template>
            </el-table-column>

            <el-table-column
              label="审核结论"
              align="center"
              show-overflow-tooltip
              width="250"
              prop="review_name">
            </el-table-column>

            <el-table-column
              label="举报时间"
              align="center"
              show-overflow-tooltip
              width="160"
              prop="created_at"
              sortable>
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              class-name="table_scope">
              <template slot-scope="scope">
                <div class="scope_btm">
                  <el-button size="medium" type="text" @click="handleReview(scope.row)">审核</el-button>
                  <el-button size="medium" type="text" @click="handledelete(scope.row)">删除</el-button>
                  <el-button size="medium" type="text" @click="handleSeePic(scope.row)">查看照片</el-button>
                </div>
              </template>
            </el-table-column>

          </el-table>
          <el-pagination
                  v-if="total"
                  layout="prev, pager, next"
                  :total="total"
                  :page-size="25"
                  @current-change="currentChange"
          ></el-pagination>
        </div>

      </div>
    </div>

    <!--查看明细弹窗-->
    <el-dialog
      width="400px"
      custom-class="reviewDialog"
      :visible.sync="reviewDialog">
      <span slot="title" class="reviewDialog_title"><i class="iconfont icon-shenhe"></i>审核</span>
      <div class="review_dialog_box">
        <p>审核结论：</p>
        <div class="content">
          <el-radio-group v-model="reviewRadio" @change="handleChangeReview($event)">
            <el-radio v-for="(item,index) in reviewList" :label="item.review_id" :key="index">{{item.name}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reviewDialog = false">关 闭</el-button>
        <el-button type="primary" @click="handleSaveReview">确 定</el-button>
      </span>
    </el-dialog>

    <!--查看图片弹窗-->
    <el-dialog
      width="400px"
      custom-class="viewImageDialog"
      :visible.sync="viewImageDialog">
      <span slot="title" class="viewImageDialog_title"><i class="iconfont icon-image"></i>查看图片</span>
      <div class="viewImage_dialog_box">
        <img :src="'http://cdn.kushualab.com/'+viewImage" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button>
          <a :href="'http://cdn.kushualab.com/'+viewImage+'?attname='" download="图片">下载</a>
        </el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
      <el-dialog :visible.sync="removeVisible" width="300px">
          <div slot="title" class="dialog_delete_head_title">
              <i class="delete_icon"></i>
              <span>删除</span>
          </div>
          <div class="box_delete">
              <img class="boolean_delete" src="../../../assets/image/warm.png" />
              <p>确定删除吗？</p>
          </div>
          <div slot="footer">
          <el-row class="row_e">
              <el-button class="btn_deletes" size="small" @click="removeVisible = false">取 消</el-button>
              <el-button type="primary" size="small"  class="btn_delete" @click="handleRemove">确 认</el-button>
          </el-row>
          </div>
      </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"

  export default {
    name: "UserReport",
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
            name: "用户账户",
            urls: "/index/standardUser/userManagement/UserManagement",
            icon: "icon-home"
          }, {
            id: 3,
            name: "用户举报",
            urls: "/index/standardUser/userManagement/UserReport",
            icon: "icon-home"
          }
        ],

        searchTime: '',  // 选择时间

        tableData:[],
        reviewList:null,  //审核类别

        multipleSelection: [],

        reviewDialog: false,
        reviewRadio: null,

        viewImageDialog: false,
        removeVisible:false,
        viewImage: '',

        currentObj:{},  //当前操作对象

        //分页
        total:null, 
        currentPage:1,
        
      }
    },
    mounted(){
      this.getReportList();
      this.getExamineList();
    },
    methods:{
      //切换时间搜索
      handleChangeTime(e){
        console.log(this.searchTime);
        this.getReportList();
      },
      //获取举报列表
      getReportList(){
        this.HttpClient.post('/admin/complains/lists',{
            size:25,
            page:this.currentPage,
            start_time:this.searchTime?this.searchTime[0]:'',
            end_time:this.searchTime?this.searchTime[1]:''
        })
        .then(res=>{
            console.log(res);
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
        })
      },
      //获取审核信息
      getExamineList(){
        this.HttpClient.post('/admin/webReview/getList',{
            type:'complains'
        })
        .then(res=>{
            console.log(res);
            this.reviewList = res.data.data;
        })
      },
      // 打开审核弹窗
      handleReview(i){
        this.currentObj = i;
        this.reviewDialog = true;
      },
      //选择审核信息
      handleChangeReview(e){
        console.log(e)
      },
      //提交审核
      handleSaveReview(){
        this.HttpClient.post('/admin/complains/changeStatus',{
            complain_id:this.currentObj.complain_id,
            status:3,
            review:this.reviewRadio
        })
        .then(res=>{
            console.log(res);
            if(res.data.code === 200){
              this.$message.success(res.data.msg);
              this.reviewRadio = '';
                setTimeout(() => {
                    this.getReportList();
                    this.reviewDialog = false;
                }, 500);
            }
        })
      },
      //查看照片
      handleSeePic(i){
        console.log(JSON.parse(i.attachment));
        this.viewImage = JSON.parse(i.attachment)[0].path;
        this.viewImageDialog = true;
      },
      //打开删除弹窗
      handledelete(i){
        console.log(i)
        this.currentObj = i;
        this.removeVisible = true;
      },
      //确认删除
      handleRemove(){
        this.HttpClient.post('/admin/complains/changeStatus',{
            complain_id:this.currentObj.complain_id,
            status:0
        })
        .then(res=>{
            console.log(res);
            if(res.data.code === 200){
              this.$message.success(res.data.msg);
                setTimeout(() => {
                    this.getReportList();
                    this.removeVisible = false;
                }, 500);
            }
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //分页
      currentChange(p) {
          this.currentPage = p;
          this.getReportList();
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  }
</script>

<style lang="less">
  .userReport {
    text-align: left;

    .bread {
      margin: 10px;
    }

    .userReport_main::-webkit-scrollbar {
      display: none;
    }

    .userReport_main {
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
      }
    }
  }


  /*审核弹窗*/
  .reviewDialog{
    .el-dialog__body{
      padding-top: 0;
      padding-bottom: 0;
    }
    .reviewDialog_title{
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i{
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .review_dialog_box{
      .content{
        .el-radio-group{
          width: 100%;
          margin-top: 10px;
          .el-radio{
            margin: 5px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            border: 1px solid #dedede;
            border-radius: 2px;
            .el-radio__input{
              display: none;
            }
            .el-radio__label{
              padding: 0;
            }
          }

          .el-radio.is-checked{
            background: #15bafe;
            border-color: #15bafe;
            .el-radio__label{
              color: #fff;
            }
          }

        }
      }
    }
  }

  /*查看图片弹窗*/
  .viewImageDialog{
    .el-dialog__body{
      padding-top: 0;
      padding-bottom: 0;
    }
    .viewImageDialog_title{
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i{
        margin-right: 10px;
        color: #15bafe;
        font-size: 18px;
      }
    }
    .viewImage_dialog_box{
      img{
        width: 100%;
      }
    }
    .dialog-footer{
      a{
        color: #606266;
        text-decoration: none;
      }
    }
  }
  .dialog_delete_head_title{
    height: 16px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    text-align: left;
    font-size: 15px;
  }
  .box_delete{
    text-align: center;
    font-size: 16px;
  }
</style>
