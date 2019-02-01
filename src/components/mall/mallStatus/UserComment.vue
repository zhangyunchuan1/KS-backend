<template>
    <div class="userComment">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="userComment_main">
            <!--标题-->
            <div class="title">
                <p>用户评论</p>
            </div>

            <div class="content">
                <div class="content_header">
                    <div class="content_header_frequency">评论频率<span>{{rate.toFixed(2)}}</span></div>

                    <el-radio-group v-model="contentHeader" @change="getCommentList">
                        <el-radio border :label="null">全部板块</el-radio>
                        <el-radio border :label="item.menu_id" v-for="item in typeList" :key="item.id">{{item.name}}</el-radio>
                    </el-radio-group>
                </div>

                <div class="content_table">
                    <div class="content_table_header">
                        <div class="content_search">
                            <el-input
                                    placeholder="订单编号搜索"
                                    v-model="IDSearch"
                                    clearable
                                    class="input-with-select"
                                    @clear="getCommentList"
                                    @keyup.13.native="getCommentList">
                                <el-button slot="append" icon="el-icon-search" @click="getCommentList"></el-button>
                            </el-input>
                        </div>
                    </div>

                    <div class="table" style="width:90%">
                        <el-table
                                :data="tableData"
                                :border="true">
                            <el-table-column
                                    label="用户昵称"
                                    align="center"
                                    show-overflow-tooltip
                                    width="100"
                                    prop="nickname">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                                        <span v-else class="sortout_color">无</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="订单编号"
                                    align="center"
                                    show-overflow-tooltip
                                    width="120"
                                    prop="order_no"
                                    sortable>
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.order_no">{{scope.row.order_no}}</span>
                                        <span v-else class="sortout_color">无</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="下单时间"
                                    align="center"
                                    width="160"
                                    show-overflow-tooltip
                                    prop="created_at"
                                    sortable>
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
                                        <span v-else class="sortout_color">无</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="到货时间"
                                    align="center"
                                    width="160"
                                    show-overflow-tooltip
                                    prop="take_delivery_time"
                                    sortable>
                                <template slot-scope="scope">
                                    {{scope.row.take_delivery_time?scope.row.take_delivery_time:'无'}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="状态"
                                    align="center"
                                    width="80"
                                    show-overflow-tooltip
                                    prop="status">
                                <template slot-scope="scope">
                                    {{scope.row.status===1?'正常':'未通过'}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="打分"
                                    align="center"
                                    width="100"
                                    show-overflow-tooltip
                                    prop="score"
                                    sortable>
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.score">{{scope.row.score}}</span>
                                        <span v-else class="sortout_color">无</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="评价内容"
                                    align="center"
                                    show-overflow-tooltip
                                    width="300">
                                <template slot-scope="scope">
                                    <p v-html="scope.row.content"></p>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="操作"
                                    align="center"
                                    fixed="right"
                                    class-name="encyclopedia_scope">
                                <template slot-scope="scope">
                                    <div class="encyclopedia_btm">
                                        <el-button size="medium " type="text">查看商品</el-button>
                                        <el-button size="medium " type="text" @click="previewButton(scope.row.id)">查看评论</el-button>
                                        <el-button
                                                size="medium "
                                                type="text"
                                                @click="forbiddenButton(scope.row.answer_id)"
                                                v-if="scope.row.status===2 || scope.row.status===1">
                                            禁用
                                        </el-button>
                                        <el-button
                                                size="medium "
                                                type="text"
                                                @click="enabledButton(scope.row.answer_id)"
                                                v-if="scope.row.status!==1">启用</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>

                        <div class="pagination">
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
            </div>
        </div>

        <!--禁用弹窗-->
        <el-dialog
                width="470px"
                custom-class="disableDialog"
                :visible.sync="disableDialog">
            <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>禁用</span>
            <div class="disable_dialog_box">
                <div class="disable_dialog_left">理由：</div>
                <div class="disable_dialog_right">
                    <el-input
                            type="textarea"
                            resize="none"
                            v-model="rejectReason"
                            :rows="4">
                    </el-input>
                </div>
            </div>
            <div class="disable_dialog_box">
                <div class="disable_dialog_left">类别：</div>
                <div class="disable_dialog_right">
                    <el-radio-group v-model="rejectValue">
                        <el-radio border :label="item.review_id" v-for="item in rejectList" :key="item.id">{{item.name}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="forbiddenConfirm">确 定</el-button>
      </span>
        </el-dialog>

        <!--启用弹窗-->
        <el-dialog
                width="470px"
                custom-class="restoreDialog"
                :visible.sync="restoreDialog"
                center>
            <span slot="title" class="restoreDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div class="restoreDialog_box">
                <i class="iconfont icon-warning-circle"></i>
                <p>确定恢复吗？</p>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="restoreDialog = false">取 消</el-button>
        <el-button type="primary" @click="enabledConfirm">确 定</el-button>
      </span>
        </el-dialog>

        <!--评价弹窗-->
        <el-dialog
                width="470px"
                custom-class="evaluationDialog"
                :visible.sync="evaluationDialog"
                center>
            <span slot="title" class="evaluationDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div class="evaluationDialog_box">
                <p class="evaluation_title">评价内容：</p>
                <div class="evaluation_box" :class="{evaluationBox:evaluationBox}" v-html="commentInfo.content"></div>
                <div class="evaluationBtm" @click="evaluationBoxOpen">
                    <span v-if="evaluationBtm">查看更多</span>
                    <span v-else>收起</span>
                </div>
                <p class="annex_title">附件:</p>
                <div class="annex_box">
                    <img @click="previewImg(item.path)" v-for="item in commentInfo.attachment" :key="item.path" :src="Tools.handleImg(item.path)" alt="">
                </div>
            </div>

            <!--子弹窗-->
            <el-dialog
                    width="30%"
                    custom-class="evaluationChildren"
                    :visible.sync="innerVisible"
                    append-to-body>
                <img :src="imgUrl" alt="">
            </el-dialog>

            <span slot="footer" class="dialog-footer">
        <el-button @click="evaluationDialog = false">关 闭</el-button>
      </span>
        </el-dialog>

    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';

    export default {
        name: "UserComment",
        components: {
            BreadCrumb,
        },
        data(){
            return{
                breadData: [
                    {
                        id: 1,
                        name: '商城',
                        urls: '/index/mall/Mall',
                        icon: 'icon-home'
                    }, {
                        id: 2,
                        name: '销售情况',
                        urls: '/index/mall/mallStatus/MallStatus',
                        icon: 'icon-home'
                    }, {
                        id: 3,
                        name: '用户评论',
                        urls: '/index/mall/mallStatus/UserComment',
                        icon: 'icon-home'
                    }
                ],

                contentHeader: null,  // 板块选择
                typeList:[],// 板块列表数据

                IDSearch: '',  // 订单编号搜索

                rate:0,// 评论频率
                tableData:[],

                disableDialog: false,  // 禁用弹窗
                rejectList:[],// 禁用类别
                rejectReason:'',// 禁用理由
                rejectValue:'',  //禁用选项

                restoreDialog: false,  // 恢复弹窗

                evaluationDialog: false,  // 评价弹窗
                evaluationBox: false,
                evaluationBtm: true,

                innerVisible: false,  // 评论附件子弹窗
                commentInfo:{},// 评论信息
                imgUrl:'',//图片路径

                //分页
                currentPage:1,// 当前页
                pageSize:25,// 每页显示数量
                total:0,// 总记录数
            }
        },
        methods:{

            evaluationBoxOpen(){
                if(this.evaluationBtm == true){
                    this.evaluationBox = true;
                    this.evaluationBtm = false;
                }else {
                    this.evaluationBox = false;
                    this.evaluationBtm = true;
                }
            },
            //获取评论频率
            getCommentFrequency(){
                this.HttpClient.post('/admin/answers/rate',{type:2})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.rate=res.data.data.rate
                        }
                    })
            },
            //获取评论列表
            getCommentList(){
                let parameters={
                    page:this.currentPage,
                    size:this.pageSize,
                    type:5
                };
                if(this.IDSearch){
                    parameters.order_no=this.IDSearch
                }
                if(this.contentHeader){
                    parameters.folder_id=this.contentHeader
                }
                this.HttpClient.post('/admin/answers/getList',parameters)
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.tableData=res.data.data.data;
                            this.total=res.data.data.total
                        }
                    })
            },
            //评论状态改变
            changeStatus(status){
                let parameters={
                    answer_id:this.id,
                    status
                };
                if(status===3){
                    parameters.review=this.rejectReason;
                    parameters.review_id=this.rejectValue
                }
                this.HttpClient.post('/admin/answers/changeStatus',parameters)
                    .then(res=>{
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            if(status===1){
                                this.restoreDialog=false
                            }else if(status===3){
                                this.disableDialog=false;
                                this.rejectReason='';
                                this.rejectValue='';
                            }
                            setTimeout(()=>{
                                this.getCommentList()
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            //查看评价按钮
            previewButton(id){
                this.id=id;
                this.evaluationDialog=true;
                this.HttpClient.post('/admin/answers/preview',{id:id})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.commentInfo=res.data.data
                        }
                    })
            },
            //禁用按钮
            forbiddenButton(id){
                this.id=id;
                console.log(this.id);
                this.HttpClient.post('/admin/webReview/getList',{type:'answers'})
                    .then(res=>{
                        if(res.data.code===200){
                            this.rejectList=res.data.data;
                        }
                    });
                this.disableDialog=true
            },
            //启用按钮
            enabledButton(id){
                this.id=id;
                this.restoreDialog=true
            },
            //查看大图
            previewImg(url){
                this.innerVisible=true;
                this.imgUrl=this.Tools.handleImg(url)
            },
            //确认禁用
            forbiddenConfirm(){
                this.changeStatus(3)
            },
            //确认启用
            enabledConfirm(){
                this.changeStatus(1)
            },
            //获取商品板块列表
            async getTypeList(){
                await this.HttpClient.post('/admin/menu/getList',{menu_type:1})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.typeList=Object.values(res.data.data);
                            // this.contentHeader=this.typeList[0].menu_id;
                        }
                    })
            },

            //分页
            currentChange(p){
                this.currentPage=p;
                this.getCommentList()
            }
        },
        async created(){
            await this.getTypeList();
            this.getCommentFrequency();
            this.getCommentList();
        }
    }
</script>

<style lang="less">
    .userComment{
        text-align: left;
        .bread {
            margin: 10px;
        }

        .userComment_main {
            margin-left: 10px;
            margin-top: 10px;
            background: #fff;
            width: calc(100vw - 240px);
            min-height: calc(100vh - 100px);
            border-radius: 2px;

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
                padding: 20px 40px;

                /*单选框组*/
                .content_header{
                    border-bottom: 1px solid #dedede;
                    padding-bottom: 20px;
                    margin-bottom: 20px;

                    .content_header_frequency{
                        display: inline-block;
                        padding: 0 30px;
                        margin-right: 30px;
                        background: #15bafe;
                        color: #fff;
                        height: 40px;
                        line-height: 40px;
                        span{
                            font-size: 18px;
                            font-weight: bold;
                            margin-left: 15px;
                        }
                    }
                    .el-radio-group{
                        .el-radio{
                            padding: 0 25px;
                            text-align: center;
                            line-height: 40px;
                            // border-color: #606266;
                            .el-radio__input{
                                display: none;
                            }
                            .el-radio__label{
                                padding: 0;
                                color: #606266;
                            }
                        }
                        .el-radio.is-checked{
                            border-color: #15bafe;
                            background: #15bafe;
                            .el-radio__label{
                                color: #fff;
                            }
                        }
                    }
                }

                .content_table{
                    .content_table_header{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .content_search{
                            display: flex;
                            align-items: center;

                            .el-input{
                                width: 250px;
                                margin-right: 30px;
                            }
                        }
                    }

                    .table{
                        margin: 20px 0;
                        .el-table{
                            thead{
                                color: #fff;
                                th,tr{
                                    background-color: #15bafe;
                                }
                            }
                        }
                        .encyclopedia_btm{
                            display: flex;
                            justify-content: space-around;
                        }
                    }

                    .pagination{
                        margin: 20px 0;
                        text-align: center;
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

    // 恢复弹窗
    .restoreDialog{
        .restoreDialog_title{
            display: flex;
            align-items: center;
            i{
                font-size: 24px;
                color: #15bafe;
            }
        }
        .restoreDialog_box{
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
        .el-dialog__footer{
            .el-button+.el-button{
                margin-left: 50px;
            }
        }
    }

    // 评价弹窗
    .evaluationDialog{
        text-align: left;
        .evaluationDialog_title{
            display: flex;
            align-items: center;
            i{
                font-size: 24px;
                color: #15bafe;
            }
        }
        .evaluationDialog_box{
            .evaluation_title,
            .annex_title{
                font-size: 14px;
                color: #222;
                margin-bottom: 10px;
            }
            .annex_title{
                margin-top: 10px;
            }

            .evaluation_box{
                max-height: 92px;
                text-align: justify;
                overflow: hidden;
                border: 1px solid #dedede;
                box-sizing: border-box;
                padding: 10px 15px;
                font-size: 14px;
                color: #999;
                transition: all .3s;
            }
            .evaluationBox{
                max-height: none !important;
            }
            .evaluationBtm{
                text-align: right;
                font-size: 12px;
                color: #222;
                margin: 5px 0;
            }

            .annex_box{
                height: 200px;
                overflow-x: auto;
                border: 1px solid #dedede;
                padding: 15px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                img{
                    height: 100%;
                    margin: 0 10px;
                }
            }
        }
        /*评论附件子弹窗*/
        .evaluationChildren{
            img{
                width: 100%;
            }
        }
    }

</style>
