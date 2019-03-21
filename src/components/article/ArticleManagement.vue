<template>
    <div class="articleManagement">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="articleManagement_main">
        <div class="header">
          <div class="title">文章管理</div>
          <div class="refresh"><i class="iconfont icon-shuaxin"></i><span>刷新</span></div>
        </div>

        <div class="articleManagement_content">

          <!--列表-->
          <div class="articleManagement_table">
            <form>
              <div class="content_header">
                <el-date-picker
                  v-model="contentTime"
                  type="daterange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="getArticleList">
                </el-date-picker>

                <div class="content_header_search">
                  <el-input placeholder="用户昵称" v-model="nickname" @keyup.13.native="getArticleList">
                    <el-button slot="append" icon="el-icon-search" @click="getArticleList"></el-button>
                  </el-input>
                  <el-input placeholder="名称" v-model="username" @keyup.13.native="getArticleList">
                    <el-button slot="append" icon="el-icon-search" @click="getArticleList"></el-button>
                  </el-input>
                </div>
              </div>

              <div class="content_table" >

                <el-table
                  :data="contentData"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="id"
                    sortable
                    width="80px"
                    align="center"
                    label="ID">
                  </el-table-column>
                  <el-table-column
                    prop="title"
                    width="150px"
                    show-overflow-tooltip
                    align="center"
                    label="文章标题">
                  </el-table-column>
                  <el-table-column
                    prop="nickname"
                    width="150px"
                    show-overflow-tooltip
                    align="center"
                    label="昵称">
                    <template slot-scope="scope">
                      <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                      <span v-else class="sortout_color">无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="word_num"
                    width="110px"
                    show-overflow-tooltip
                    align="center"
                    label="字数">
                    <template slot-scope="scope">
                      <span v-if="scope.row.word_num">{{scope.row.word_num}}</span>
                      <span v-else class="sortout_color">无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="cate_name"
                    width="150px"
                    show-overflow-tooltip
                    align="center"
                    label="所属板块"
                    :filters="[{ text: '汽车', value: '汽车'}, { text: '摩托', value: '摩托'}, { text: '模型', value: '模型'}, { text: '智能设备', value: '智能设备'}]"
                  :filter-method="filterHandler">
                  </el-table-column>
                  <el-table-column
                    prop="user_type"
                    width="120px"
                    show-overflow-tooltip
                    align="center"
                    label="用户类别"
                    :filters="[{ text: '专业商家', value: 2}, { text: '普通用户', value: 1}, { text: '普通商家', value: 3}]"
                    :filter-method="filterHandler">
                    <template slot-scope="scope">{{scope.row.user_type===2?'专业商家':scope.row.user_type===1?'普通用户':'普通商家'}}</template>
                  </el-table-column>
                  <el-table-column
                    prop="is_course"
                    width="120px"
                    show-overflow-tooltip
                    align="center"
                    label="文章类别"
                    :filters="[{ text: '教程', value: 1}, { text: '普通', value: 0}]"
                    :filter-method="filterHandler">
                    <template slot-scope="scope">{{scope.row.is_course===1?'教程':'普通'}}</template>
                  </el-table-column>
                  <el-table-column
                    prop="created_at"
                    width="160px"
                    show-overflow-tooltip
                    align="center"
                    sortable
                    label="创建时间">
                  </el-table-column>
                  <el-table-column
                    width="120px"
                    align="center"
                    show-overflow-tooltip
                    prop="status"
                    :filters="[{ text: '已通过', value: 1}, { text: '未通过', value: 3}]"
                    :filter-method="filterHandler"
                    label="通过状态">
                    <template slot-scope="scope">
                      <div :class="scope.row.status===1?'normal_color':'notpass_color'">{{scope.row.status===1?'已通过':'未通过'}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="120px"
                    show-overflow-tooltip
                    align="center"
                    prop="status"
                    :filters="[{ text: '待审核', value: 2}, { text: '已审核(已通过)', value:1 }, { text: '已审核(未通过)', value:3 }]"
                    :filter-method="filterHandler"
                    label="审核状态">
                      <template slot-scope="scope">
                          <div :class="scope.row.status===2?'audit_color':'wait_color'">{{scope.row.status===2?'待审核':'已审核'}}</div>
                      </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    fixed="right"
                    min-width="300"
                    align="center">
                    <template slot-scope="scope">
                      <el-button type="primary" plain size="mini" v-if="scope.row.status!==1" @click="agreeButton(scope.row.article_id)">批准</el-button>
                      <el-button type="primary" plain size="mini" v-if="scope.row.status!==3" @click="rejectButton(scope.row)">驳回</el-button>
                      <el-button type="primary" plain size="mini" v-if="scope.row.status!==1" @click="updateButton(scope.row.id,scope.row.article_id)">修改</el-button>
                      <el-button type="primary" plain size="mini" @click="handleOpenFront(scope.row.article_id)">预览</el-button>
                      <el-button type="primary" plain size="mini" v-if="scope.row.status===3 && Tools.getDateDiff(scope.row.created_at) > 10" @click="deleteButton(scope.row.article_id)">删除</el-button>
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
            </form>
          </div>
          <!-- <div class="tatistics">
            <div class="quantity_btm">数量：{{total}}</div>
            <div class="quantity_btm">平均字数：{{wordAverage}}</div>
          </div> -->
        </div>
      </div>

      <!--批准弹窗-->
      <el-dialog
        width="470px"
        custom-class="approveDialog"
        :visible.sync="approveDialog"
        center>
        <span slot="title" class="approveDialog_title"><i class="iconfont icon-huaban4"></i></span>
        <div class="approveDialog_box">
          <i class="iconfont icon-warning-circle"></i>
          <p>确定批准吗？</p>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="approveDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmAgree">确 定</el-button>
      </span>
      </el-dialog>

      <!--驳回弹窗-->
      <el-dialog
        width="470px"
        custom-class="disableDialog"
        :visible.sync="disableDialog">
        <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>驳回</span>
        <div class="disable_dialog_box">
          <div class="disable_dialog_left">理由：</div>
          <div class="disable_dialog_right">
            <el-input
              type="textarea"
              resize="none"
              :rows="4"
              v-model="rejectReason">
            </el-input>
          </div>
        </div>
        <div class="disable_dialog_box">
          <div class="disable_dialog_left">类别：</div>
          <div class="disable_dialog_right">
            <el-radio border v-model="disableDialogRadio" :label="item.review_id" v-for="(item,index) in disableDialogList" :key="index">{{item.name}}</el-radio>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmReject">确 定</el-button>
      </span>
      </el-dialog>

      <!--删除弹窗-->
      <ModalDelete ref="delete" @doDelete="confirmDelete"></ModalDelete>
    </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import ModalDelete from '@/components/public/modalDelete'

  export default {
    name: "ArticleManagement",
    components: {
      BreadCrumb,
      ModalDelete
    },
    data(){
      return{
        // 面包屑
        breadData: [{
          id: 1,
          name: '文章管理',
          urls: '/index/article/Article',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '文章管理',
          urls: '/index/article/ArticleManagement',
          icon: 'icon-home'
        }],
        userOptions: [{
          value: 1,
          label: '公司'
        },{
          value: 2,
          label: '普通用户'
        }],

        // 日期筛选
        contentTime:'',

        // 主体表格
        contentData: [],

        // 批准弹窗
        approveDialog: false,

        // 驳回弹窗
        disableDialog: false,
        rejectReason:'',// 驳回理由
        disableDialogRadio: '',  // 类别选择
        disableDialogList: '',  // 类别选择

        // 删除弹窗
        modalDelete: false,

        username:'',//搜索用户名
        nickname:'',//作者昵称
        currentPage:1,//当前页
        pageSize:25,//每页显示数量
        total:0,//总条数
        wordAverage:0,//平均字数
        id:'',//操作文章id
      }
    },
    methods: {
      handleOpenFront(id){
          window.open(this.Urls.frontUrl+"home/articleDetails?id="+id);  
      },
      formatter(row, column) {
        return row.address;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      tableRowClassName({row}){
          if(row.status===1){
              return 'success'
          }else if(row.status===2){
              return 'wait'
          }else if(row.status===3){
              return 'error'
          }
          return ''
      },

      //获取文章列表
      getArticleList(){
        let parameters={
            page:this.currentPage,size:this.pageSize
        };
        if(this.nickname){
            parameters.nickname=this.nickname
        }
        if(this.username){
            parameters.username=this.username;
        }
        if(this.contentTime.length>0){
            parameters.start_time=this.contentTime[0];
            parameters.end_time=this.contentTime[1];
        }
        this.HttpClient.post('/admin/article/getList',parameters)
            .then(res=>{
                console.log(res);
                if(res.data.code===200){
                    this.contentData=res.data.data.data;
                    this.total=res.data.data.total;
                    // let word=0;
                    // this.contentData.map(item => {
                    //     word += item.word_num;
                    // });
                    // this.wordAverage=word/this.total;
                }
            })
      },
      //获取文章总数及总字数
      getArticleWord(){
          this.HttpClient.post('/admin/article/getTotalAndAverageWord')
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.total=res.data.data.total;
                      this.wordAverage=res.data.data.total_word/res.data.data.total
                  }
              })
      },
      //修改按钮事件
      updateButton(id,aid){
          this.$router.push({
             path:'/index/article/article-modify',
             query:{
                id:id,
                articleId:aid
             }
          })
      },
      //批准按钮事件
      agreeButton(id){
          this.id=id;
          this.approveDialog=true;
      },
      //驳回按钮事件
      rejectButton(row){
        console.log(row)
          this.id=row.article_id;
          let parameters = {
            type:'upload'
          }
          this.HttpClient.post('/admin/webReview/getList',parameters).then(res =>{
            console.log(res.data)
            if(res.data.code === 200){
              this.disableDialogList = res.data.data;
            }
          })
          this.disableDialog=true;
      },
      //删除按钮事件
      deleteButton(id){
          this.id=id;
          this.$refs.delete.deleteDialog=true;
      },
      //删除/驳回/通过文章
      makeArticle(status){
          let parameters={
              article_id:this.id,
              status:status
          };
          console.log(this.disableDialogRadio);
          if(status===3){
              parameters.refuse=this.rejectReason;
              parameters.review_id=this.disableDialogRadio
          }
          this.HttpClient.post('/admin/article/changeStatus',parameters)
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.$message.success('操作成功');
                      setTimeout(()=>{
                          this.getArticleList()
                      },500);
                  }else{
                      this.$message.error('操作失败')
                  }
              })
      },
      //确认批准
      confirmAgree(){
          this.makeArticle(1);
          this.approveDialog=false;
      },
      //确认驳回
      confirmReject(){
          this.makeArticle(3);
          this.disableDialog=false;
      },
      //确认删除
      confirmDelete(){
          this.makeArticle(0)
      },
      //分页
      currentChange(p){
          this.currentPage=p;
          this.getArticleList()
      }
    },
    created(){
        this.getArticleList();
        this.getArticleWord()
    }

  }
</script>

<style lang="less">
  .articleManagement{
    .bread{
      margin: 10px;
    }
    .articleManagement_main::-webkit-scrollbar {display:none}
    .articleManagement_main{
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;
      /*标题*/
      .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        border-bottom: 2px solid #f2f2f2;
        padding: 0 40px;
        .title{
          font-size: 20px;
          color: #222;
        }
        /*刷新*/
        .refresh{
          cursor: pointer;
          span{
            display: inline-block;
            margin-left: 10px;
          }
        }
      }
      /*文章管理主体*/
      .articleManagement_content{
        padding: 0 40px;
        /*列表*/
        .articleManagement_table{
          margin-top: 40px;
          /*头部筛选*/
          .content_header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .el-range-editor{
              // width: 350px;
            }
            /*搜索框*/
            .content_header_search{
              display: flex;
              align-items: center;
              .el-input:last-child{
                margin-left: 20px;
              }
            }
          }
        }
      }

      /*底部统计*/
      .tatistics{
        display: flex;
        align-items: center;
        margin: 20px 0;
        /*数量框*/
        .quantity_btm{
          background: #15bafe;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          padding: 0 15px;
          height: 40px;
          margin-right: 20px;
          font-size: 14px;
        }
      }
    }

    /*批准弹窗*/
    .approveDialog{
      .approveDialog_title{
        display: flex;
        align-items: center;
        i{
          font-size: 24px;
          color: #15bafe;
        }
      }
      .approveDialog_box{
        text-align: center;
        i{
          font-size: 80px;
          color: #15bafe;
        }
        p{
          font-size: 14px;
          color: #000;
          margin-top: 20px;
        }
      }
    }

    /*驳回弹窗*/
    .disableDialog{
      .disableDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
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
    .content_table{
      margin-top: 20px;
      .el-table{
        th{
            background-color: #15bafe;
            color:#fff;
        }
        .el-icon-arrow-down{
          font-size: 20px;
          color:#fff;
        }
      }
    }
  }
</style>
