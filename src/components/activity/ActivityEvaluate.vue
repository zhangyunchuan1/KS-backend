<template>
    <div class="activityEvaluate">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="content">
        <p class="title">评价</p>

        <div class="score_box">
          <div class="score_list">
            <div class="score_left">
              评分
            </div>
            <div class="score_right">
              <div class="score_right_text">
                <div>平均分</div>
                <div>汽车</div>
                <div>摩托车</div>
                <div>无人机</div>
                <div>智能设备</div>
              </div>
              <div class="score_right_text">
                <div>{{scoreObj.avarge_score}}</div>
                <div>{{scoreObj.car}}</div>
                <div>{{scoreObj.motorcycle}}</div>
                <div>{{scoreObj.plane}}</div>
                <div>{{scoreObj.device}}</div>
              </div>

            </div>
          </div>
          <div class="score_list">
            <div class="score_left">
              评论
            </div>
            <div class="score_right">
              <div class="score_right_text">
                <div>评论总数</div>
                <div>汽车</div>
                <div>摩托车</div>
                <div>无人机</div>
                <div>智能设备</div>
              </div>
              <div class="score_right_text">
                <div>{{commentObj.total}}</div>
                <div>{{commentObj.car}}</div>
                <div>{{commentObj.motorcycle}}</div>
                <div>{{commentObj.plane}}</div>
                <div>{{commentObj.device}}</div>
              </div>

            </div>
          </div>
        </div>
        <div>
          <div class="conditions">
            <!-- <el-input class="select_normal" v-model="searchObj.nickName" placeholder="昵称" size="mini"> </el-input> -->
            <el-input class="select_normal" v-model="nickName" clearable placeholder="昵称" size="mini" @change="handleNickNameSearch">
              <el-button slot="append" @click="handleNickNameSearch" icon="el-icon-search"></el-button>
            </el-input>
            <!-- <el-input class="select_normal" v-model="searchObj.useaName" placeholder="用户名" size="mini"> </el-input> -->
            <el-input class="select_normal" v-model="useaName" clearable placeholder="用户名" size="mini" @change="handleUseaNameSearch">
              <el-button slot="append" @click="handleUseaNameSearch" icon="el-icon-search"></el-button>
            </el-input>
            <!-- <el-input class="select_normal" v-model="type" placeholder="类别选择" size="mini"> </el-input>
            <el-input class="select_normal" v-model="forbiddenType" placeholder="禁用类别" size="mini"> </el-input> -->
            <el-date-picker
                class="date_normal"
                v-model="serchTime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handleSelectTime">
            </el-date-picker>
            <el-input class="select_normal" v-model="activityName" clearable placeholder="活动名称" size="mini" @change="handleActivityNameSearch">
              <el-button slot="append" @click="handleActivityNameSearch" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="tables">
            <el-table
              :data="tableData"
              border
              :stripe="true"
              style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
                align="center"
                show-overflow-tooltip
                width="50">
              </el-table-column>
              <el-table-column
                prop="nickname"
                label="昵称"
                 align="center"
                show-overflow-tooltip
                min-width="80">
              </el-table-column>
              <el-table-column
                prop="menu.folder_name"
                label="类别"
                 align="center"
                show-overflow-tooltip
                width="80">
              </el-table-column>
              <el-table-column
                prop="menu.menu_1_name"
                label="二级目录"
                 align="center"
                show-overflow-tooltip
                width="120">
              </el-table-column>
              <el-table-column
                prop="source_title"
                label="活动名称"
                 align="center"
                show-overflow-tooltip
                width="120">
              </el-table-column>
              <el-table-column
                prop="city_name"
                label="城市"
                 align="center"
                show-overflow-tooltip
                width="120">
              </el-table-column>
              <el-table-column
                prop="content"
                label="评论内容"
                 align="center"
                show-overflow-tooltip
                width="120">
              </el-table-column>
              <el-table-column
                prop="score"
                label="打分"
                 align="center"
                show-overflow-tooltip
                width="120">
              </el-table-column>
              <el-table-column
                label="是否有图片"
                 align="center"
                show-overflow-tooltip
                width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.attachment !== null">有</span>
                  <span v-if="scope.row.attachment === null">无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="review_name"
                label="禁用类别"
                 align="center"
                show-overflow-tooltip
                width="120">
              </el-table-column>
              <el-table-column
                prop="created_at"
                label="评论时间排列"
                 align="center"
                show-overflow-tooltip
                width="120">
              </el-table-column>
              <el-table-column
                label="通过状态"
                 align="center"
                show-overflow-tooltip
                width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 1">正常</span>
                  <span v-if="scope.row.status === 3">禁用</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="240"
                align="center"
                fixed="right">
                <template slot-scope="scope">
                  <div class="evaluate_btm">
                    <el-button size="small" type="text" v-if="scope.row.status === 1" @click="forbiddenModal(scope.row)">禁用</el-button>
                    <el-button size="small" type="text" @click="deleteModal(scope.row)">删除</el-button>
                    <el-button size="small" type="text" @click="viewModal(scope.row)">预览</el-button>
                    <el-button size="small" type="text" v-if="scope.row.status === 3" @click="renewModal(scope.row)">恢复</el-button>
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
        <!-- 删除弹窗 -->
        <el-dialog :visible.sync="deleteVisible" width="300px">
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
                <el-button class="btn_deletes" size="small" @click="deleteVisible = false">取消</el-button>
                <el-button type="primary" size="small"  class="btn_delete" @click="remove">提交</el-button>
            </el-row>
            </div>
        </el-dialog>
        <!--禁用框-->
        <!--驳回弹窗-->
        <el-dialog
          width="470px"
          custom-class="disableDialog"
          :visible.sync="forbiddenVisible">
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
              <el-radio-group v-model="auditCategoryRadio" @change="choseItem($event)">
                <el-radio border v-for="(item,index) in forbiddenList" :label="item.review_id" :key="index">{{item.name}}</el-radio>
              </el-radio-group>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="forbiddenVisible = false">取 消</el-button>
          <el-button type="primary" @click="forbidden">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 预览 -->
        <el-dialog :visible.sync="viewVisible" width="600px">
            <div slot="title" class="dialog_delete_head_title">
                <i class="delete_icon"></i>
                <span>预览</span>
            </div>
            <div>
                <el-form label-width="80px">
                    <el-form-item label="评论内容">
                        <el-input readonly v-model="commentContent"></el-input>
                    </el-form-item>
                    <el-form-item label="图片">
                        <div v-for="(pic,index) in imgList" :key="index" class="pic">
                            <img class="pic" :src="'http://cdn.kushualab.com/'+pic"/>
                        </div>
                    </el-form-item>
                </el-form>
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
    import BreadCrumb from "../public/BreadCrumb";
    export default {
      components: {BreadCrumb},
      data () {
        return {
            deleteVisible: false,
            forbiddenVisible: false,
            viewVisible: false,
            commentContent:'',  //预览评论内容
            imgList:[],  //预览图片
            renewVisible: false,
            viewObj: {},
            forbiddenKey: null,
            forbiddenList: [],  //禁用类别
            rejectReason:'', //禁用理由
            startDate: '',
            endDate: '',
            auditCategoryRadio: null,  //选中的禁用类别
            total: '',
            warmImg: require("../../assets/image/warm.png"),
            evaluateObj: {},
            nickName:null,  //昵称搜索
            useaName:null,  //用户名搜索
            activityName:null,  //活动名称搜索
            serchTime:[null,null],  //搜索时间
            currentPage:1,//当前页
            pageSize:25,//每页显示数量
            tableData:[],
            markTableData: [],
            scoreObj: {
                avarge_score: null,
                car: null,
                motorcycle: null,
                plane: null,
                device: null
            },
            commentObj: {
                total: null,
                car: null,
                motorcycle: null,
                plane: null,
                device: null
            },
            breadData: [{
            id: 1,
            name: '活动',
            urls: '/index',
            icon: 'icon-home'
          },{
            id: 2,
            name: '评价',
            urls: '/index/activity-evaluate',
            icon: 'icon-home'
          }],
        }
      },
      created() {
        this.init();
        this.getAuditCategory();
      },
      methods: {
        //时间搜索
        handleSelectTime(e){
          console.log(e)
            this.init();
        },
        // 用户昵称搜索
        handleNickNameSearch(){
            this.init();
        },
        //用户名搜索
        handleUseaNameSearch(){
            this.init();
        },
        // 活动名称搜索
        handleActivityNameSearch(){
            this.init();
        },
        //删除评论
        async remove() {
            let res = await this.HttpClient.post('/admin/answers/changeStatus', {answer_id: this.evaluateObj.answer_id, status: 0});
            if(res.data.code == 200){
                this.$message.success(res.data.msg);
                setTimeout(() => {
                    this.init();
                    this.deleteVisible = false;
                }, 500);
            }else {
                this.$message.error(res.data.msg);
            }
        },
        //确认禁用
        async forbidden() {
            console.log(this.auditCategoryRadio)
            let res = await this.HttpClient.post('/admin/answers/changeStatus', {
              answer_id: this.evaluateObj.answer_id, 
              status: 3, 
              review_id: this.auditCategoryRadio,
              review:this.rejectReason
            });
            console.log(res)
            if(res.data.code == 200){
                this.$message.success(res.data.msg);
                setTimeout(() => {
                    this.init();
                    this.forbiddenVisible = false;
                }, 500);
            }else {
                this.$message.error(res.data.msg);
            }
        },
        // 预览
        viewModal(i){
            console.log(i)
            this.commentContent = i.content;
            this.imgList = JSON.parse(i.attachment)
            this.viewVisible = true;
        }, 
        // 确定恢复
        async renew() {
            let res = await this.HttpClient.post('/admin/answers/changeStatus', {answer_id: this.evaluateObj.answer_id, status: 1});
            if(res.data.code == 200){
                this.$message.success(res.data.msg);
                setTimeout(() => {
                    this.init();
                    this.renewVisible = false;
                }, 500);
            }else {
                this.$message.error(res.data.msg);
            }
        },
        choseItem(e){
            console.log(this.auditCategoryRadio);
        },
        // 打开预览弹窗
        renewModal(i){
            console.log(i);
            this.evaluateObj = i;
            this.renewVisible = true; 
        },
        // 打开禁用弹窗
        forbiddenModal(i) {
            this.evaluateObj = i;
            this.forbiddenVisible = true;
        },
        // 打开删除弹窗
        deleteModal(i) {
            this.evaluateObj = i;
            this.deleteVisible = true;
        },
        // 分页
        async currentChange(page) {
            this.currentPage = page;
            this.init()
        },
        // 获取活动评论列表
        async init() {
            let params = {
                type: 4,
                page: this.currentPage,
                start_time:this.serchTime[0],
                end_time:this.serchTime[1],
                user_name:this.nickName,
                actual_name:this.useaName,
                source_title:this.activityName
            }
            let res = await this.HttpClient.post('/admin/answers/getList', params);
            console.log(res);
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
            let res1 = await this.HttpClient.post('/admin/answers/averageScore', {type: 'actives'});
            this.markTableData = res1.data.data;
            let score_average = 0;
            let comment_average = 0;
            for(let i in this.markTableData) {
                score_average += parseInt(this.markTableData[i].total_score);
                comment_average += parseInt(this.markTableData[i].total_count);
                if(this.markTableData[i].name === '汽车') {
                    this.scoreObj.car = this.markTableData[i].total_score;
                    this.commentObj.car = this.markTableData[i].total_count;
                }else if(this.markTableData[i].name === '摩托') {
                    this.scoreObj.motorcycle = this.markTableData[i].total_score;
                    this.commentObj.motorcycle = this.markTableData[i].total_count;
                }else if(this.markTableData[i].name === '无人机') {
                    this.scoreObj.plane = this.markTableData[i].total_score;
                    this.commentObj.plane = this.markTableData[i].total_count;
                }else if(this.markTableData[i].name === '智能设备') {
                    this.scoreObj.device = this.markTableData[i].total_score;
                    this.commentObj.device = this.markTableData[i].total_count;
                }
            }
          this.scoreObj.avarge_score = score_average / 4;
          this.commentObj.total = comment_average / 4;
          // let res2 = await this.HttpClient.post('/admin/webReview/getList', {type: 'answers'});
          // this.forbiddenList = res2.data.data;
          // this.forbiddenList = dealWith(this.forbiddenList).forbiddenList;
          // this.forbiddenDialogRadio = dealWith(this.forbiddenList).forbiddenDialogRadio;
        },
        // 获取禁用类别
        async getAuditCategory(){
          let res = await this.HttpClient.post('/admin/webReview/getList', {type: 'answers'});
          console.log(res);
          this.forbiddenList = res.data.data;
        },
      }
    }
</script>

<style lang="less" scoped>
  .activityEvaluate{
    .content{
      box-sizing: border-box;
      padding: 0 20px;
      .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        border-bottom: 2px solid #f2f2f2;
        padding: 0 40px;
        font-size: 20px;
        color: #222;
        margin-bottom: 20px;
      }
      .evaluate_btm{
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
  .disable_dialog_left{
    text-align: left;
    margin-left: 65px;
    margin-bottom: 10px;
  }
  .disable_dialog_right1 {
    margin-bottom: 10px;
    .el-button{
      width: 70%;
      background-color: #15bafe;
    }
  }
  .disable_dialog_right {
    margin-bottom: 10px;
    .el-button{
      width: 70%;
    }
  }
  .date_normal{
    height: 28px;
    width: 230px;
    margin-right: 10px;
    line-height: unset;
    /deep/.el-input__icon {
      text-align: center;
      line-height: unset;
    }
    /deep/.el-range-separator{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .mark {
      margin-left: 10px;
      margin-top: 50px;
      width: 601px;
  }
  /*表格*/
  // .comment_content_box{
  //   .el-table{
  //     thead{
  //       color: #fff;
  //       th,tr{
  //         background-color: #15bafe;
  //       }
  //     }
  //   }
    /*评分*/
      .score_box{
        .score_list{
          display: flex;
          align-items: center;
          height: 125px;
          margin-bottom: 20px;

          .score_left{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100px;
            background: #15bafe;
            color: #fff;
            font-size: 16px;
          }

          .score_right{
            flex: 1;
            height: 100%;

            .score_right_text{
              display: flex;
              align-items: center;
              height: 50%;
              div{
                box-sizing: border-box;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #dedede;
                width: 115px;
              }
            }

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
            /deep/.el-radio__label{
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
            /deep/.el-radio__input{
              display: none;
            }
            .el-radio__label{
              padding: 0;
            }
          }
        }
      }
    }
  .pic {
      width: 100px;
      height: 100px;
      display: inline-block;
  }
  .space_bottom {
    margin-bottom: 20px;
  }
  .form_layout {
    display: flex;
  }
  .search_length {
    width: 160px;
    margin-right: 10px;
  }
  .form_item {
    display: inline-block;
    margin-right: 30px;
    width: 42%;
  }
  .bread{
    margin: 10px;
  }
  .delete_icon{
    color: #15bafe;
    font-size: 18px;
    top: 1px;
    position: relative;
  }
  .boolean_delete{
    height: 30px;
    width: 30px;
  }
  .dialog_delete_head_title{
    height: 16px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    text-align: left;
    font-size: 15px;
  }
  .content::-webkit-scrollbar {display:none}
  .content{
    background: white;
    margin-left: 10px;
    margin-right: 10px;
    height: calc(100vh - 100px);
    width: calc(100vw - 221px);
    border-radius: 2px;
    overflow-y: auto;
  }
  .title{
    text-align: left;
    padding: 10px;
    padding-left: 20px;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
  }
  .conditions{
    display: flex;
    margin-left: 10px;
    margin-top: 20px;
  }
  .select_normal{
    width: 150px;
    margin-right: 10px;
  }
  .tables{
    margin: 20px 10px;
    /*表格头*/
          .el-table__header-wrapper{
            .is-group{
              tr:nth-child(1){
                background: #15bafe;
                th{
                  background: #15bafe;
                  .cell{
                    color: #fff;
                  }
                }
              }
            }
          }
  }
  .row_activity{
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dialog_head_title{
    height: 16px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    text-align: left;
    font-size: 15px;
  }
  .examine_icon{
    color: #15bafe;
  }
  .up_safe{
    height: 120px;
    border: 1px solid #f2f2f2;
  }
  .up_img{
    height: 130px;
    border: 1px solid #f2f2f2;
    margin-top: 10px;
    display: grid;
  }
  .remark{
    text-align: left;
    margin-left: 10px;
  }
  .row_e{
    text-align: center;
  }
  .btn_delete{
    padding: 5px 15px;
    margin-left: 30px;
  }
  .btn_deletes{
    padding: 5px 15px;
  }
  .el-table th>.cell{
    text-align: center;
  }
  .btns{
    width: 100%;
    margin-left: 0;
    margin-bottom: 10px;
  }
  .btns_s{
    width: 100%;
    margin-left: 0;
    margin-bottom: 10px;
    color: white;
    background: #409EFF;
  }
</style>
