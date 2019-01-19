<template>
    <div class="commentManagement">
      <!--面包屑-->
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <!--主体内容-->
      <div class="commentManagement_main">
        <!--标题-->
        <div class="title">
          <p>评论管理</p>
        </div>

        <div class="comment_content">
          <!--表格-->
          <div class="comment_table">
            <div class="table_title">
              <i class="iconfont icon-star"></i>评论总数 {{Comment.total}}
            </div>
            <div class="table_box">
              <div class="table_box_list" v-for="item in Comment.list" :key="item.id">
                <p>{{item.name}}</p>
                <p>{{item.total_count}}</p>
              </div>
            </div>
          </div>

          <div class="comment_header">
            <div class="comment_select">
              <div class="date_item">
                <p class="date_label">开始</p>
                <el-date-picker
                  v-model="searchObj.startTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="date_item">
                <p class="date_label">截止</p>
                <el-date-picker
                @change="search"
                  v-model="searchObj.endTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>

            <div class="comment_search">
              <div>
                <el-input placeholder="问题题目搜索" v-model="searchObj.topicSearch" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </div>
              <div>
                <el-input placeholder="用户名搜索" v-model="searchObj.userNameSearch" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </div>
              <div>
                <el-input placeholder="昵称搜索" v-model="searchObj.nickNameSearch" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </div>
            </div>
          </div>

          <div class="comment_content_box">

            <el-table
              :data="tableData"
              :border="true">
              <el-table-column
                label="ID"
                align="center"
                width="65"
                prop="id"
                sortable>
              </el-table-column>

              <el-table-column
                label="昵称"
                align="center"
                width="120"
                show-overflow-tooltip
                prop="nickname">
              </el-table-column>

              <el-table-column
                label="用户名"
                align="center"
                show-overflow-tooltip
                width="150"
                prop="actual_name">
              </el-table-column>

              <el-table-column
                label="问题题目"
                align="center"
                show-overflow-tooltip
                width="220"
                prop="source_title">
              </el-table-column>

              <el-table-column
                label="类别"
                align="center"
                width="80"
                prop="menu_name">
              </el-table-column>

              <el-table-column
                label="评论内容"
                align="center"
                show-overflow-tooltip
                prop="content">
              </el-table-column>

              <el-table-column
                label="禁用类别"
                align="center"
                show-overflow-tooltip
                :filters="rejectTypeList"
                :filter-method="filterSecondary"
                width="120"
                prop="review_name">
              </el-table-column>

              <el-table-column
                label="创建时间"
                align="center"
                width="150"
                show-overflow-tooltip
                prop="created_at"
                sortable>
              </el-table-column>

              <el-table-column
                label="通过状态"
                align="center"
                show-overflow-tooltip
                :filters="[{text: '已通过', value: '已通过'}, {text: '未通过', value: '未通过'}]"
                :filter-method="filterSecondary"
                prop="statusName"
                width="125">
                <template slot-scope="scope">
                  <el-tag><i class="iconfont icon-dian"></i>{{scope.row.statusName}}</el-tag>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                width="150"
                class-name="comment_scope">
                <template slot-scope="scope">
                  <div class="comment_btm">
                    <el-button size="medium " v-if="scope.row.status == 1" type="text" @click="rejectModal(scope.row)">禁用</el-button>
                    <el-button size="medium " type="text" @click="deleteModal(scope.row)">删除</el-button>
                    <el-button size="medium " type="text" @click="viewModal(scope.row)">预览</el-button>
                    <el-button size="medium " v-if="scope.row.status == 3" type="text" @click="renewModal(scope.row)">恢复</el-button>
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

      <!--禁用弹窗-->
      <el-dialog
        width="470px"
        custom-class="disableDialog"
        :visible.sync="disableDialog">
        <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>禁用</span>
        <div class="disable_dialog_box">
          <div class="disable_dialog_left">类别：</div>
          <div class="disable_dialog_right">
            <el-radio-group v-model="disableDialogRadio">
              <el-radio border v-for="reject in rejectList" :key="reject.review_id" :label="reject">{{reject.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="reject">确 定</el-button>
      </span>
      </el-dialog>

      <!--预览弹窗-->
      <el-dialog
        width="400px"
        custom-class="viewDialog"
        :visible.sync="viewDialog">
        <span slot="title" class="viewDialog_title"><i class="iconfont icon-chakan"></i>预览</span>
        <div class="view_dialog_box">
          <p>评论内容：</p>
          <div class="view_content">
            {{modifyObj.content}}
          </div>
        </div>
      </el-dialog>

      <!-- 删除弹窗 -->
      <el-dialog :visible.sync="removeVisible" width="300px">
          <div slot="title" class="dialog_delete_head_title">
              <i class="delete_icon"></i>
              <span>删除</span>
          </div>
          <div>
              <img class="boolean_delete" :src="warmImg"/>
              <p>确定删除吗？</p>
          </div>
          <div slot="footer">
          <el-row class="row_e">
              <el-button class="btn_deletes" size="small" @click="removeVisible = false">取消</el-button>
              <el-button type="primary" size="small"  class="btn_delete" @click="remove">提交</el-button>
          </el-row>
          </div>
      </el-dialog>

      <!-- 恢复弹窗 -->
      <el-dialog :visible.sync="renewVisible" width="300px">
          <div slot="title" class="dialog_delete_head_title">
              <i class="delete_icon"></i>
              <span>恢复</span>
          </div>
          <div>
              <img class="boolean_delete" :src="warmImg"/>
              <p>确定恢复吗？</p>
          </div>
          <div slot="footer">
          <el-row class="row_e">
              <el-button class="btn_deletes" size="small" @click="renewVisible = false">取消</el-button>
              <el-button type="primary" size="small"  class="btn_delete" @click="renew">提交</el-button>
          </el-row>
          </div>
      </el-dialog>

    </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import DeleteModal from '@/components/public/modalDelete';
  import Tools from "@/utils/tools.js";
  let tools = new Tools();

  export default {
    name: "CommentManagement",
    components: {
      BreadCrumb,
      DeleteModal
    },
    data(){
      return{
        breadData: [{
          id: 1,
          name: '问题',
          urls: '/index/question/question',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '评论管理',
          urls: '/index/question/commentManagement',
          icon: 'icon-home'
        }],
        warmImg: require("../../assets/image/warm.png"),

        searchObj: {}, // 搜索对象
        modifyObj: {},
        currentPage: 1,
        total: 0,
        pageSize: 25,

        // 表格
        tableData: [],
        rejectList: [], // 禁用列表
        renewVisible: false, // 恢复弹窗
        disableDialog: false, // 禁用弹窗
        disableDialogRadio: null,

        viewDialog:false, // 预览弹窗
        removeVisible: false, // 删除弹窗
        rejectTypeList: [], // 禁用类型列表
        typeList: [], // 筛选类型列表
        Comment: {
          total: 0, // 评论总数
          list: [] // 评论列表
        }, // 评论
      }
    },
    created() {
      this.getTableList(null);
      this.getCommentScore();
    },
    methods:{
      filterSecondary(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      search() {
        this.getTableList(this.searchObj);
      },
      async remove() {
        let res = await this.HttpClient.post('/admin/answers/changeStatus', {
          answer_id: this.modifyObj.answer_id,
          status: 0,
        });
        if(res.data.code == '200') this.removeVisible = false;
        tools.getApiMessage(res);
        setTimeout(() => {
          this.search()
        }, 500)
      },
      deleteModal(modifyObj) {
        this.modifyObj = modifyObj;
        this.removeVisible = true;
      },
      viewModal(modifyObj) {
        this.modifyObj = modifyObj;
        this.viewDialog = true;
      },
      renewModal(modifyObj) {
        this.modifyObj = modifyObj;
        this.renewVisible = true;
      },
      async renew() {
        let res = await this.HttpClient.post('/admin/answers/changeStatus', {
          answer_id: this.modifyObj.answer_id,
          status: 1
        });
        if(res.data.code == '200') this.renewVisible = false;
        tools.getApiMessage(res);
        setTimeout(() => {
          this.search()
        }, 500)
      },
      async reject() {
        let res = await this.HttpClient.post('/admin/answers/changeStatus', {
          answer_id: this.modifyObj.answer_id,
          status: 3,
          review_id: this.disableDialogRadio.review_id,
          review: this.disableDialogRadio.name
        });
        if(res.data.code == '200') this.disableDialog = false;
        tools.getApiMessage(res);
        setTimeout(() => {
          this.search()
        }, 500)
      },
      async rejectModal(modifyObj) {
        this.disableDialog = true;
        this.modifyObj = modifyObj;
        let res = await this.HttpClient.post('/admin/webReview/getList', {type: 'upload'});
        this.rejectList = res.data.data;
      },
      async currentChange(page) {
        this.currentPage = page;
        this.search();
      },
      async getTableList(param) {
        let params = {
          page: this.currentPage,
          type: 3
        }
        if(param) {
          params['start_time'] = param.startTime;
          params['end_time'] = param.endTime;
          params['source_title'] = param.topicSearch;
          params['actual_name'] = param.userNameSearch;
          params['user_name'] = param.nickNameSearch;
        }
        let res = await this.HttpClient.post('/admin/answers/getList', params);
        console.log(res)
        let result = dealWithTableData(res.data.data.data);
        this.tableData = result.tableData;
        this.rejectTypeList = result.rejectTypeList;
        this.typeList = result.typeList;
        this.total = res.data.data.total;
        console.log('reject:', this.rejectTypeList);
      },
      async getCommentScore() {
        let res = await this.HttpClient.post('/admin/answers/averageScore', {type: 'video'});
        this.Comment.list = res.data.data;
        this.Comment.total = totalComment(this.Comment.list);
      },
    }

  }

// 评论数据处理
function dealWithTableData(table) {
  let rejectTypeList = [];
  let typeList = [];
  for(let i in table) {
    table[i]['statusName'] = tools.dealWithStatus(table[i].status);
    if(table[i].review_name) {
      rejectTypeList.push(table[i].review_name);
    }
    if(table[i].menu_name) {
      typeList.push(table[i].menu_name);
    }
  }
  // 去重
  rejectTypeList = [...new Set(rejectTypeList)];
  typeList = [...new Set(typeList)];
  for(let i in rejectTypeList) {
    rejectTypeList[i] = {
      text: rejectTypeList[i],
      value: rejectTypeList[i]
    }
  }
  for(let i in typeList) {
    typeList[i] = {
      text: typeList[i],
      value: typeList[i]
    }
  }
  return {
    tableData: table,
    rejectTypeList: rejectTypeList,
    typeList: typeList
  };
}

// 总评论数
function totalComment(list) {
  let total = 0;
  if(list && list.length > 0) {
    for(let i in list) {
      if(list[i]) {
        total += parseInt(list[i].total_count);
      }
    }
  }
  return total;
}
</script>

<style lang="less">
  .commentManagement{
    .bread{
      margin: 10px;
    }
    .commentManagement_main::-webkit-scrollbar {display:none}

    .commentManagement_main {
      background: white;
      margin: 10px 10px 0 10px;
      height: calc(100vh - 150px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      padding-bottom: 50px;
      overflow-y: auto;

      /*标题*/
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 40px;
        margin-bottom: 30px;
        border-bottom: 1px solid #dedede;
      }

      .comment_content{
        text-align: left;
        padding: 0 40px;

        .comment_table{
          display: inline-block;
          .table_title{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            background: #15bafe;
            color: #fff;
            .iconfont{
              margin-right: 10px;
              position: relative;
              top: 2px;
            }
          }
          .table_box{
            display: flex;
            align-items: center;
            .table_box_list{
              min-width: 100px;
              p{
                border: 1px solid #dedede;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
              }
            }
          }
        }

        /*头部*/
        .comment_header{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 30px 0;

          .comment_select{
            display: flex;
            .date_item{
              display: flex;
              border: 1px solid #dcdfe6;
              border-radius: 5px;
              margin-right: 20px;
              .el-input__inner{
                border: none !important;
              }
              .date_label{
                color: #808080;
                font-size: 12px;
                height: 28px;
                line-height: 28px;
                margin-left: 10px;
              }
              .date_picker_1{
                width: 140px;
              }
            }
          }


          /*搜索框*/
          .comment_search{
            display: flex;
            align-items: center;
            >div{
              margin-left: 30px;
            }
          }
        }

        /*表格*/
        .comment_content_box{
          .el-table{
            thead{
              color: #fff;
              th,tr{
                background-color: #15bafe;
              }
            }
          }

          /*操作按钮*/
          .comment_scope{
            padding: 0;
            .cell{
              line-height: unset;
              .comment_btm{
                display: flex;
                align-items: center;
                div:not(:last-child){
                  border-right: 1px solid #ebeef5;
                }
                div{
                  min-height: 47px;
                  height: 100%;
                  flex: 1;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                }
              }
            }
          }
        }

      }

      /*底部数据*/
      .bottom{
        display: flex;
        align-items: center;
        padding-left: 40px;
        margin: 20px 0;
        div{
          background: #15bafe;
          color: #fff;
          padding: 10px 20px;
          margin-right: 20px;
          font-size: 14px;
        }
      }
    }

    /*禁用弹窗*/
    .disableDialog{
      .disableDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          font-size: 20px;
          color: #15bafe;
        }
      }
      .disable_dialog_box:not(:last-child){
        margin-bottom: 20px;
      }
      .disable_dialog_box{
        display: flex;
        align-items: flex-start;
        justify-content: center;
        /*单选框*/
        .disable_dialog_right{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          width: 275px;
          /*单选框样式*/
          .el-radio:nth-child(1){
            margin-top: 0;
          }
          .el-radio.is-checked{
            background: #15bafe;
            border-color: #15bafe;
            .el-radio__label{
              color: #fff;
            }
          }
          .el-radio{
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            width: 275px;
            margin: 10px auto;
            .el-radio__input{
              display: none;
            }
            .el-radio__label{
              padding: 0;
            }
          }
        }
      }
    }

    /*预览弹窗*/
    .viewDialog{
      .viewDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          font-size: 20px;
          color: #15bafe;
        }
      }
      .el-dialog__body{
        padding-top: 0;
      }
      .view_dialog_box{
        text-align: left;
        >p{
          font-size: 14px;
          color: #000;
          margin-bottom: 15px;
        }
        .view_content{
          height: 300px;
          overflow: auto;
          border: 1px solid #dedede;
          box-sizing: border-box;
          padding: 10px;
        }
      }
    }

  }
</style>
