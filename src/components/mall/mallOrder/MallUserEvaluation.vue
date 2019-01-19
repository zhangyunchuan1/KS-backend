<template>
    <div class="MallUserEvaluation">
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

        <div class="encyclopedia_main">
            <div class="encyclopedia_title">
            <div class="title">用户评价</div>
            </div>
            <div class="encyclopedia_box">
                <div class="encyclopedia_header">
                    <div class="encyclopedia_header_title">商场选择</div>
                    <el-radio-group v-model="sectorSelection">
                    <el-radio  v-for="(menu,index) in plateList" :key="index" :label="menu"
                    @change="handleChangeMenu(menu.menu_id)">{{menu.name}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="encyclopedia_table">
                <div class="encyclopedia_search">
                    <!-- <div>
                        <el-input placeholder="产品ID搜索" v-model="searchId" class="input-with-select" @input="searcha($event)">
                        <el-button  slot="append" icon="el-icon-search" @click="handleSearchId"></el-button>
                        </el-input>
                    </div> -->
                    <div>
                        <el-input placeholder="订单ID搜索" v-model="searchOrderId" class="input-with-select" @input="searchb($event)">
                        <el-button  slot="append" icon="el-icon-search" @click="handlesearchOrderId"></el-button>
                        </el-input>
                    </div>
                    <!-- <div>
                        <el-input placeholder="商品名称搜索" v-model="searchTitle" class="input-with-select" @input="searchc($event)">
                        <el-button  slot="append" icon="el-icon-search" @click="handleSearchTitle"></el-button>
                        </el-input>
                    </div> -->
                </div>
                <div class="encyclopedia_content">
                    <el-table
                        :data="tableData"
                        :border="true">
                        <el-table-column
                        label="用户昵称"
                        align="center"
                        width="150"
                        prop="nickname">
                        </el-table-column>
                        <el-table-column
                        label="订单ID"
                        align="center"
                        width="180"
                        prop="order_no">
                        </el-table-column>

                        <el-table-column
                        label="下单时间"
                        align="center"
                        width="160"
                        prop="created_at">
                        </el-table-column>

                        <el-table-column
                        label="到货时间"
                        align="center"
                        width="150"
                        prop="take_delivery_time">
                        </el-table-column>

                        <el-table-column
                        label="状态"
                        align="center"
                        width="130"

                        prop="status">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 1">正常</span>
                                <span v-if="scope.row.status === 3">禁用</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                        label="评价内容"
                        align="center"
                        width="280"
                        prop="content">
                        </el-table-column>

                        <el-table-column
                        label="打分"
                        align="center"
                        width="130"
                        prop="score"
                        sortable>
                        </el-table-column>

                        <el-table-column
                        label="操作"
                        align="center"
                        class-name="encyclopedia_scope">
                        <template slot-scope="scope">
                            <div class="encyclopedia_btm">
                                <el-button size="medium " type="text">查看商品</el-button>
                                <el-button size="medium " type="text" @click="handleOpenSeeComment(scope.row)">查看评论</el-button>
                                <el-button size="medium " type="text" v-if="scope.row.status === 1" @click="handleOpenProhibit(scope.row)">禁用</el-button>
                                <el-button size="medium " type="text" v-if="scope.row.status === 3" @click="handleOpenRecovery(scope.row)">恢复</el-button>
                            </div>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

      <!-- 分页 -->
      <div class="paging">
          <el-pagination
              background
              layout="prev, pager, next"
              :page-size="25"
              :total="total"
              @current-change="handleCurrentChange($event)">
          </el-pagination>
      </div>
      
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
              v-model="textarea"
              :rows="4">
            </el-input>
          </div>
        </div>
        <div class="disable_dialog_box">
          <div class="disable_dialog_left">类别：</div>
          <div class="disable_dialog_right">
            <el-radio border v-model="disableDialogRadio" v-for="(item,index) in reasonList" :label="item.id" :key="index" @change="tt(item)">{{item.name}}</el-radio>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSureReject">确 定</el-button>
      </span>
      </el-dialog>
      <!--删除弹窗-->
      <el-dialog
        width="470px"
        custom-class="deleteDialog"
        :visible.sync="deleteDialog"
        center>
        <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>
        <div class="deleteDialog_box">
          <i class="iconfont icon-warning-circle"></i>
          <p>确定恢复吗？</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleRecovery">确 定</el-button>
          </span>
      </el-dialog>
      <!--查看评价弹窗-->
      <el-dialog
        width="600px"
        custom-class="deleteDialog"
        :visible.sync="commentDialog"
        center>
        <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>
        <div>评论内容</div>
        <div :class="{'comment-contant':!more, 'comment-contant-more':more}" v-html="contant"></div>
        <div class="more-box">
            <span class="more" v-if="more === false" @click="handleSeeMore">查看更多</span>
            <span class="more" v-if="more === true" @click="handleSeeMore">收起</span>
        </div>
        <div>附件</div>
        <div class="img_contents">
            <div class="img_contain">
                <div v-for="(item,index) in attachmentList" :key="index" :class="index%3===2?'img_item2':'img_item1'">
                    <a :href="item+'?attname='">
                        <img class="img_3" :src="item">
                        <div class="modal_img">
                            <i class="el-icon-download modal_icon"></i>
                        </div>
                    </a>
                </div>
            </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';
    export default {
        name: "MallUserEvaluation",
        components: {
            BreadCrumb
        },
        data(){
            return {
                // 面包屑
                breadData: [{
                    id: 1,
                    name: '商城订单',
                    urls: '/index/mall/mallOrder/mall-order',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '用户评价',
                    urls: '/index/mall/mallOrder/mall-user-evaluation',
                    icon: 'icon-home'
                }],
                // 分页
                total:null,  //数据总条数

                sectorSelection: null,  // 学科板块选择
                plateList:[],  //板块列表

                disableDialog:false,  //禁用弹框
                deleteDialog:false,  //恢复
                commentDialog:false,  //评价弹窗
                rejectList:[],  //驳回类型
                disableDialogRadio:null,
                textarea:'',  //禁用理由
                tableData:[], 
                commentId:null,  //评论操作ID 
                reasonList:[],  //禁用类别

                //搜索
                // searchId:null,
                searchOrderId:null,
                folderId:null,
                

                contant:'',
                attachmentList:[],
                more:false,  //控制是否查看更多
            }
        },
        mounted(){
            this.getPlateList();
            this.getEvaluationList(null,null,null);
        },
        methods:{
            //打开查看评价弹窗
            handleOpenSeeComment(i){
                console.log(i)
                this.contant = i.content;
                if(i.attachment !== null){
                    this.attachmentList = JSON.parse(i.attachment).split(',');
                }
                console.log(this.attachmentList)
                this.more = false;
                this.commentDialog = true;
            },
            //打开恢复弹窗
            handleOpenRecovery(i){
                this.commentId = i.answer_id;
                this.deleteDialog = true;
            },
            //确定恢复
            handleRecovery(){
                this.HttpClient.post('/admin/answers/changeStatus',{
                    answer_id : this.commentId,
                    status: 1 
                })  
                .then(res=>{
                    console.log(res);
                    if(res.data.code === 200){
                        this.getEvaluationList(this.folderId,this.searchId,this.searchOrderId);
                        this.deleteDialog = false;
                    }
                })
                
            },
            //打开禁用弹窗
            handleOpenProhibit(i){
                console.log(i)
                this.HttpClient.post('/admin/webReview/getList',{
                    type : 'answers'
                })  
                .then(res=>{
                    console.log(res);
                    this.reasonList = res.data.data;
                })
                this.commentId = i.answer_id;
                this.disableDialog = true;
            },
            //确认禁用
            handleSureReject(){
                console.log(this.textarea)
                console.log(this.commentId)
                this.HttpClient.post('/admin/answers/changeStatus',{
                    answer_id : this.commentId,
                    status: 3 ,
                    review:this.textarea
                })  
                .then(res=>{
                    console.log(res);
                    if(res.data.code === 200){
                        this.getEvaluationList(this.folderId,this.searchId,this.searchOrderId);
                        this.disableDialog = false;
                    }
                })
                
            },
            //切换板块,获取该板块下的评价
            handleChangeMenu(id){
                console.log(id);
                this.folderId = id;
                this.getEvaluationList(id,null,null);
            },
            //获取板块列表
            getPlateList(){
                this.HttpClient.post('/admin/menu/getList',{
                    menu_type : 1
                })  
                .then(res=>{
                    console.log(res);
                    this.plateList = res.data.data;
                })
            },
            //获取评价列表
            getEvaluationList(folder_id,product_id,order_id){
                this.HttpClient.post('/admin/answers/getList',{
                    type:5,
                    folder_id:folder_id,
                    product_id:product_id,
                    order_no:order_id
                })  
                .then(res=>{
                    console.log(res);
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.total;
                    if(res.data.code ===200){
                        this.searchId = null;
                        this.searchOrderId = null;
                    }
                })
            },
            tt(e){
                console.log(e);
            },
            // 产品ID搜索
            // handleSearchId(){
            //     this.getEvaluationList(null,this.searchId,null);
            // },
             // 订单ID搜索
            handlesearchOrderId(){
                this.getEvaluationList(null,null,this.searchOrderId);
            },
            searcha(e){
                console.log(e)
            },
            searchb(e){
                console.log(e)
            },
            searchc(e){
                console.log(e)
            },
            //查看更多
            handleSeeMore(){
                this.more = !this.more;
                console.log(this.more)
            },
            handleCurrentChange(e){
                console.log(e)
                this.getEvaluationList()
            },
        }
    }
</script>

<style lang="less">
.dialog_delete_head_title{
    height: 16px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    text-align: left;
    font-size: 15px;
  }
.MallUserEvaluation {
    /*分页*/
    .paging{
        margin: 20px 0;
        text-align: center;
    }
    .bread {
        margin: 10px;
    }
  .encyclopedia_main::-webkit-scrollbar {display:none}
    .encyclopedia_main {
        margin-left: 10px;
        margin-top: 10px;
        background: #fff;
        height: calc(100vh - 100px);
        width: calc(100vw - 240px);
        border-radius: 2px;
      overflow-y: auto;

        .encyclopedia_title {
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
        .encyclopedia_box{
        padding: 0 40px;
        margin: 20px 0;
        /*目录选择*/
        .encyclopedia_header{
          display: flex;
          align-items: center;
          padding-bottom: 15px;
          border-bottom: 1px solid #dedede;
          margin-bottom: 20px;
            .encyclopedia_header_title{
                width: 120px;
                height: 40px;
                align-items: center;
                border: 1px solid #15bafe;
                line-height: 40px;
                background: #15bafe;
                color:#fff;
            }
          .el-radio-group{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
          }
          .el-radio.is-checked{
            background: #15bafe;
            border-color: #15bafe;
          }
          .el-radio__input.is-checked+.el-radio__label{
            color: #fff;
          }
          .el-radio{
            width: 120px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #dedede;
            margin: 10px;
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
    /*搜索框*/
    .encyclopedia_search{
        display: flex;
        justify-content: flex-end;
        padding: 0 40px;
        >div{
            margin-left: 30px;
        }
    }
    .encyclopedia_content{
        margin: 20px 0;
        padding: 0 40px;
        .el-table{
            thead{
              color: #fff;
              th,tr{
                background-color: #15bafe;
              }
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
    // 禁用弹窗
    .deleteDialog{
        .img_contents {
            height: 170px;
            // width: 330px;
            border: 1px solid #f2f2f2;
            border-radius: 3px;
            margin: 20px 0;
            .img_contain{
                margin: 0 10px;
                display: flex;
                flex-wrap: wrap;
                height: 160px;
                overflow-y: auto;
                width: calc(100% - 20px);
                .img_3{
                width: 100%;
                height: 100%;
                }
                .img_item1{
                width: 150px;
                margin-right: 5%;
                height: 150px;
                margin-top: 10px;
                }
                .img_item2{
                width: 30%;
                height: 150px;
                margin-top: 10px;
                }
                .modal_img{
                width: 100%;
                height: 150px;
                background: rgba(0,0,0,0.4);
                position: relative;
                margin-top: -152px;
                text-align: center;
                opacity: 0;
                .modal_icon{
                    position: relative;
                    font-size: 18px;
                    top: calc(50% - 12px);
                    color: white;
                }
                }
                .modal_img:hover{
                opacity: 1;
                }
            }
        }
        .comment-contant{
            border: 1px solid #bfbfbf;
            height: 80px;
            margin-top: 20px;  
        }
        .comment-contant-more{
            border: 1px solid #bfbfbf;
            height: 250px;
            overflow-y:scroll;
            margin-top: 20px;  
        }
        .more-box{
                text-align: right;
                .more{
                    color: #bfbfbf;
                    cursor: pointer;
                    color:#15bafe;
                }
            }
    .deleteDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
      }
    }
    .deleteDialog_box{
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
}
</style>

