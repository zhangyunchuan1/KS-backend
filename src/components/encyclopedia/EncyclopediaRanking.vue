<template>
    <div class="encyclopediaRanking">
      <!--面包屑-->
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <!--主体内容-->
      <div class="encyclopediaRanking_main">
        <!--标题-->
        <div class="title">
          <p>用户排名</p>
        </div>

        <div class="ranking_content">
          <div class="ranking_header">
            <div class="ranking_search">
              <!-- <div>
                <el-select v-model="searchObj.userTypeSearch" clearable placeholder="请选择">
                  <el-option
                    v-for="item in userTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button @click="search" slot="append" icon="el-icon-search"></el-button> -->
                <!-- <el-input placeholder="用户类型搜索" v-model="searchObj.userTypeSearch" class="input-with-select">
                  <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
                </el-input> -->
              <!-- </div> -->
              <div>
                <el-input placeholder="用户ID搜索" v-model="searchObj.userIdSearch" class="input-with-select" clearable @clear="search">
                  <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <div>
                <el-input placeholder="昵称搜索" v-model="searchObj.nickNameSearch" class="input-with-select" clearable @clear="search">
                  <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </div>
          </div>

          <div class="ranking_content_box">

            <el-table
              :data="tableData"
              :border="true">
              <el-table-column
                label="ID"
                align="center"
                width="100"
                prop="user_id"
                sortable>
              </el-table-column>

              <el-table-column
                label="昵称"
                align="center"
                prop="nickname">
              </el-table-column>

              <el-table-column
                label="用户类型"
                align="center"
                :filters="[{text: '系统注册', value: '系统注册'}, {text: '个人注册', value: '个人注册'}, {text: '公司注册', value: '公司注册'}, {text: '普通商家', value: '普通商家'}]"
                :filter-method="filterSecondary"
                prop="userTypeName">
              </el-table-column>

              <el-table-column
                label="总浏览次数"
                align="center"
                prop="encyc_view"
                sortable>
              </el-table-column>

              <el-table-column
                label="总点赞次数"
                align="center"
                prop="encyc_like"
                sortable>
              </el-table-column>

              <el-table-column
                label="总讨论次数"
                align="center"
                prop="encyc_comment"
                sortable>
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                class-name="ranking_scope"
                width="130">
                <template slot-scope="scope">
                  <div class="ranking_btm">
                    <el-button size="medium " type="text" @click="dataModal(scope.row)">数据</el-button>
                    <el-button size="medium " type="text" @click="viewUser(scope.row)">查看用户</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>


      <!--数据弹窗-->
      <el-dialog
        width="400px"
        custom-class="dataDialog"
        :visible.sync="dataDialog">
        <span slot="title" class="dataDialog_title"><i class="iconfont icon-shuju"></i>数据</span>
        <div class="data_dialog_box">
          <div class="data_dialog_list">
            <p>总百科数</p>
            <span>{{modifyObj.encyc_total}}</span>
          </div>
          <div class="data_dialog_list">
            <p>平均浏览次数</p>
            <span>{{modifyObj.averageView}}</span>
          </div>
          <div class="data_dialog_list">
            <p>平均点赞次数</p>
            <span>{{modifyObj.averageLike}}</span>
          </div>
          <div class="data_dialog_list">
            <p>平均讨论次数</p>
            <span>{{modifyObj.averageComment}}</span>
          </div>
        </div>
      </el-dialog>

    </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import app from '../../../config/app.js';
  export default {
    name: "encyclopediaRanking",
    components: {
      BreadCrumb,
    },
    data(){
      return{
        breadData: [{
          id: 1,
          name: '百科',
          urls: '/index/encyclopedia/encyclopedia',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '用户排名',
          urls: '/index/encyclopedia/encyclopediaRanking',
          icon: 'icon-home'
        }],
        searchObj: {}, // 搜索对象
        modifyObj: {}, // 操作对象
        tableData: [], // 表格
        dataDialog: false,  // 数据弹窗
        pageSize: 25, // 每页显示条数
        total: 0, // 总条数
        currentPage: 1, // 当前页 
        userTypeList: [{
          value: 0,
          label: '系统注册'
        },{
          value: 1,
          label: '个人注册'
        },{
          value: 2,
          label: '公司注册'
        },{
          value: 3,
          label: '普通商家'
        }], // 用户类型列表
      }
    },
    created() {
      this.getTableList(null);
    },
    methods:{
      search() {
        this.getTableList(this.searchObj);
      },
      dataModal(modifyObj) {
        this.modifyObj = modifyObj;
        this.dataDialog = true;
      },
      viewUser(modifyObj) {
        window.open(app.urls + '/home/others/' + modifyObj.uid, '_blank');
      },
      async getTableList(param) {
        let params = {
          page: this.currentPage,
          type: 'encyc'
        }
        if(param) {
          params['nickname'] = param.nickNameSearch;
          params['user_type'] = param.userTypeSearch;
          params['user_id'] = param.userIdSearch;
        }
        let res = await this.HttpClient.post('/admin/users/ranking', params);
        this.tableData = dealWithTableData(res.data.data.data);
        console.log('tableData:', this.tableData);
      },
      filterSecondary(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
    }
  }

// 处理表格数据
function dealWithTableData(tableData) {
  if(tableData && tableData.length > 0) {
    for(let i in tableData) {
      if(tableData[i].encyc_total && tableData[i].encyc_total != 0) {
        tableData[i]['averageView'] = tableData[i].encyc_view / tableData[i].encyc_total;
        tableData[i]['averageLike'] = tableData[i].encyc_like / tableData[i].encyc_total;
        tableData[i]['averageComment'] = tableData[i].encyc_comment / tableData[i].encyc_total;
      }
      if(tableData[i].user_type == 0) {
        tableData[i]['userTypeName'] = '系统注册';
      }else if(tableData[i].user_type == 1) {
        tableData[i]['userTypeName'] = '个人注册';
      }else if(tableData[i].user_type == 2) {
        tableData[i]['userTypeName'] = '公司注册';
      }else if(tableData[i].user_type == 3) {
        tableData[i]['userTypeName'] = '普通商家';
      }
    }
  }
  return tableData;
}
</script>

<style lang="less">
  .encyclopediaRanking{
    .bread{
      margin: 10px;
    }
    .encyclopediaRanking_main::-webkit-scrollbar {display:none}
    .encyclopediaRanking_main {
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

      .ranking_content{
        box-sizing: border-box;
        padding: 0 40px;
        /*头部*/
        .ranking_header{
          box-sizing: border-box;
          padding-bottom:30px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          /*搜索框*/
          .ranking_search{
            display: flex;
            align-items: center;
            >div{
              margin-right: 30px;
            }
          }
        }

        /*表格*/
        .ranking_content_box {
          box-sizing: border-box;
          .el-table {
            thead {
              color: #fff;
              th, tr {
                background-color: #15bafe;
              }
            }
          }

          /*操作按钮*/
          .ranking_scope {
            padding: 0;
            .cell {
              line-height: unset;
              .ranking_btm {
                display: flex;
                align-items: center;
                div:not(:last-child) {
                  border-right: 1px solid #ebeef5;
                }
                div {
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

    }

    /*数据弹窗*/
    .dataDialog{
      .el-dialog__body{
        padding-top: 0;
      }
      .dataDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          font-size: 20px;
          color: #15bafe;
        }
      }
      .data_dialog_box{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        .data_dialog_list{
          width: 140px;
          margin: 10px;
          box-sizing: border-box;
          p{
            border: 1px solid #15bafe;
            padding: 10px 0;
            width: 100%;
            margin-bottom: 10px;
            background: #15bafe;
            color: #fff;
            border-radius: 5px;
          }
          span{
            margin-top: -1px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 80px;
            border: 1px solid #dedede;
          }
        }

      }
    }
  }
</style>
