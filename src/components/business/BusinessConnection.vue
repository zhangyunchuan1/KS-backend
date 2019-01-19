<template>
    <div class="business_connection">
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

        <div class="business_main">
            <div class="business_title">
                <div class="title">企业关系</div>
            </div>

            <div class="business_header">
                <div class="business_search">
                    <div>
                        <el-input placeholder="公司名称搜索" v-model="companySearch" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </div>
            </div>

            <div class="business_content">

                <el-table
                        :data="companyData"
                        :border="true"
                        style="width: 100%">
                    <el-table-column
                            label="ID"
                            align="center"
                            width="65"
                            prop="id"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            label="公司名称"
                            align="center"
                            width="280">
                        <template slot-scope="scope">
                            <p>{{ scope.row.company_name}}</p>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="联系人"
                            align="center"
                            width="110">
                        <template slot-scope="scope">
                            <p>{{ scope.row.name}}</p>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="企业电话"
                            align="center"
                            prop="phone"
                            width="180">
                    </el-table-column>

                    <el-table-column
                            label="状态"
                            align="center"
                            width="130">
                            <template slot-scope="scope">
                                {{scope.row.status===0?'不感兴趣':scope.row.status===1?'待联系':scope.row.status===2?'继续跟进':'结束'}}
                            </template>
                    </el-table-column>

                    <el-table-column
                            label="创建时间"
                            align="center"
                            width="180"
                            prop="created_at"
                            sortable>
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            align="center"
                            class-name="business_scope">
                        <template slot-scope="scope">
                            <div class="business_btm">
                                <div v-if="scope.row.status===1" @click="continueButton(scope.row.business_id)">继续跟进</div>
                                <div v-if="scope.row.status===2 || scope.row.status===1" @click="interestButton(scope.row.business_id)">不感兴趣</div>
                                <div v-if="scope.row.status===2" @click="finishButton(scope.row.business_id)">结束</div>
                                <div @click="remarkButton(scope.row.business_id)">备注</div>
                                <div @click="accessoryButton(scope.$index)">查看详情附件</div>
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

        <!--添加备注-->
        <el-dialog
                :visible.sync="remarkVisible"
                width="470px"
                custom-class="remarkDialog">
            <span slot="title" class="remarkDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div class="remarkDialog_main">
                <div class="remarkTitle">内容</div>
                <div class="remarkInput">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="remark">
                    </el-input>
                </div>
                <div class="remarkTitle">历史</div>
                <div class="remarkHistory">
                    <div v-for="(item,index) in historyData" :key="index">
                        <div class="remarkHistoryUser"><i class="iconfont icon-dian"></i><p>{{item.create_name}}</p><span>{{item.created_at}}</span></div>
                        <p>{{item.content}}</p>
                    </div>
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
          <el-button @click="remarkVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRemark">提 交</el-button>
        </span>
        </el-dialog>

        <!--查看详情-->
        <el-dialog :visible.sync="accessoryVisible" width="400px">
            <div slot="title" class="dialog_head_title">
                <i class="iconfont icon-faxian examine_icon"></i>
                <span>查看详情</span>
            </div>
            <div class="examine_content">
                <div class="examine_list">
                    <div class="examine_text" v-html="companyData[index].content"></div>
                </div>
            </div>
            <div class="img_content">
                <div class="img_items">
                    <a :href="Tools.handleImg(item)+'?attname='" v-for="(item,i) in companyData[index].attachment" :key="i" :class="i%3===0?'img_item1':'img_item'">
                        <img :src="Tools.handleImg(item)+'?imageView2/1/w/60/h/60'" alt="" class="img">
                        <div class="modal_img">
                            <i class="el-icon-download modal_icon"></i>
                        </div>
                    </a>
                </div>
            </div>
            <div class="user_footer" slot="footer">
                <el-row>
                    <el-button type="primary" class="btn_foot" @click="accessoryVisible = false">关闭</el-button>
                </el-row>
            </div>
        </el-dialog>
        
        <!--确认框-->
        <el-dialog
                width="470px"
                custom-class="confirmDialog"
                :visible.sync="confirmDialog"
                center>
                <span slot="title" class="confirmDialog_title"><i class="iconfont icon-huaban4"></i></span>
                <div class="confirmDialog_box">
                    <i class="iconfont icon-warning-circle"></i>
                    <p>确定{{status===0?'不感兴趣':status===2?'继续跟进':'结束'}}吗？</p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="confirmDialog = false">取 消</el-button>
                    <el-button type="primary" @click="confirmOperation">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>

    import BreadCrumb from '@/components/public/BreadCrumb';

    export default {
        name: "Business-Connection",
        data(){
            return {
                // 面包屑
                breadData: [
                    {
                        id: 1,
                        name: '企业',
                        urls: '/index/question/question',
                        icon: 'icon-home'
                    }, {
                        id: 2,
                        name: '企业关系',
                        urls: '/index/question/questionContents',
                        icon: 'icon-home'
                    }
                ],
                companySearch:'',// 公司名称搜索
                companyData:[{attachment:''}],// 公司数据列表
                remarkVisible:false,// 备注弹窗
                accessoryVisible:false,// 查看详情弹窗
                confirmDialog:false,// 确认弹窗
                remark:'',// 新增备注信息
                historyData:[],// 备注历史记录
                id:'',// 公司id
                status:null,// 状态值
                index:0,// 选中下标
                currentPage:1,// 当前页
                pageSize:25,// 每页显示数量
                total:0,// 总记录数
            }
        },
        components:{BreadCrumb},
        methods:{
            //获取合作企业列表
            getCompanyList(){
                let parameters={
                    page:this.currentPage,
                    size:this.pageSize
                };
                if(this.companySearch){
                    parameters.company_name=this.companySearch
                }
                this.HttpClient.post('/admin/cooperation/lists',parameters)
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.companyData=res.data.data.data;
                            this.total=res.data.data.total;

                        }
                    })
            },
            //获取备注列表
            getRemarkList(id){
                this.HttpClient.post('/admin/remarkLog/lists',{source_id:id})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.historyData=res.data.data;
                            // 在vm实例上通知
                            this.$set(this.historyData,this.historyData.length-1,this.historyData[this.historyData.length-1])
                        }else{
                            this.historyData=[];
                        }
                    })
            },
            //改变状态
            changeStatus(status){
                this.HttpClient.post('/admin/cooperation/changeStatus',{status,business_id:this.id})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            setTimeout(()=>{
                                this.getCompanyList()
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            //继续跟进
            continueButton(id){
                this.id=id;
                this.status=2;
                this.confirmDialog=true;
            },
            //不感兴趣按钮事件
            interestButton(id){
                this.id=id;
                this.status=0;
                this.confirmDialog=true;
            },
            //结束按钮事件
            finishButton(id){
                this.id=id;
                this.status=3;
                this.confirmDialog=true;
            },
            //添加备注
            addRemark(){
                this.HttpClient.post('/admin/remarkLog/create',{content:this.remark,source_id:this.id})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.remark='';
                            setTimeout(()=>{
                                this.getRemarkList(this.id)
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            //添加备注按钮事件
            remarkButton(id){
                this.id=id;
                this.remarkVisible=true;
                this.getRemarkList(id)
            },
            //查看详情
            accessoryButton(index){
                console.log(index);
                this.index=index;
                this.accessoryVisible=true;
            },
            //确认操作
            confirmOperation(){
                this.confirmDialog=false;
                this.changeStatus(this.status)
            },
            //分页
            currentChange(p){
                this.currentPage=p;
                this.getCompanyList()
            }
        },
        created(){
            this.getCompanyList()
        }
    }
</script>

<style lang="less">
    .business_connection{
        .bread {
            margin: 10px;
        }
      .business_main::-webkit-scrollbar {display:none}
        .business_main {
            margin-left: 10px;
            margin-top: 10px;
            background: #fff;
            height: calc(100vh - 100px);
            width: calc(100vw - 240px);
            border-radius: 2px;
          overflow-y: auto;

            .business_title {
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

            /*头部*/
            .business_header{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 30px 25px;

                .business_select{
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
                .business_search{
                    display: flex;
                    align-items: center;
                    >div{
                        margin-left: 30px;
                    }
                }
            }

            /*表格*/
            .business_content{
                padding: 0 30px;
                .el-table{
                    thead{
                        color: #fff;
                        th,tr{
                            background-color: #15bafe;
                        }
                    }
                }

                /*操作按钮*/
                .business_scope{
                    padding: 0;
                    .cell{
                        line-height: unset;
                        .business_btm{
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

        /*备注弹窗*/
        .remarkDialog{
            .el-dialog__body{
                padding: 0 20px;
            }
            .remarkDialog_title{
                display: flex;
                align-items: center;
                padding-bottom: 10px;
                i{
                    font-size: 24px;
                    color: #15bafe;
                }
            }
            .remarkDialog_main{
                .remarkTitle{
                    text-align: left;
                    margin-bottom: 5px;
                }
                .remarkInput{
                    margin-bottom: 20px;
                }
                .remarkHistory{
                    max-height: 270px;
                    overflow: auto;
                    >div:not(:last-child){
                        margin-bottom: 15px;
                    }
                    .remarkHistoryUser{
                        display: flex;
                        align-items: center;
                        margin-bottom: 5px;
                        i{
                            color: #15bafe;
                            margin-right: 5px;
                        }
                        p{
                            font-size: 14px;
                            color: #222;
                            margin-right: 8px;
                        }
                        span{
                            font-size: 12px;
                            color: #15bafe;
                        }
                    }
                    .remarkHistoryUser~p{
                        text-align: left;
                        font-size: 12px;
                        color: #666;
                        padding-left: 20px;
                    }
                }


            }


        }

        /*查看详情弹窗*/
        .dialog_head_title{
            text-align: start;
            font-size: 14px;
            border-bottom: 1px solid #f2f2f2;
            padding-bottom: 10px;
        }
        .examine_icon{
            color: #15bafe;
        }
        .examine_content{
            height: 120px;
            border: 1px solid #f2f2f2;
            .examine_text{
                display: flex;
                justify-content: space-between;
                margin-left: 10px;
                margin-bottom: 10px;
                cursor: pointer;
                a{
                    text-decoration:none;
                    width: 100%;
                }
                .examine_down_p{
                    width: 250px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 12px;
                    color: #15bafe;
                }
                .icon_examine{
                    margin-right: 10px;
                    color: #404040;
                }
            }
            .examine_list{
                height: 100px;
                margin-top: 10px;
                overflow: auto;
            }
        }
        .img_content{
            height: 120px;
            border: 1px solid #f2f2f2;
            margin-top: 10px;
            .img_items{
                display: flex;
                flex-wrap: wrap;
                height: 100px;
                overflow-y: auto;
                .img_item{
                    width: 17%;
                    margin-right: 4%;
                    margin-top: 10px;
                    .img{
                        width: 100%;
                        height: 60px;
                    }
                }
                .img_item1{
                    width: 17%;
                    margin-left: 4%;
                    margin-right: 4%;
                    margin-top: 10px;
                    .img{
                        width: 100%;
                        height: 60px;
                    }
                }
                .modal_img{
                    position: relative;
                    top: 0;margin-top: -64px;
                    left: 0;
                    width: 100%;
                    height: 60px;
                    background: rgba(101, 101, 101, 0.6);
                    color: #ffffff;
                    opacity: 0;
                }
                .modal_img:hover{
                    opacity: 1;
                }
                .modal_icon{
                    position: relative;
                    font-size: 18px;
                    top: 50% - 9px;
                }
            }
        }

        /*确认弹窗*/
        .confirmDialog{
            .confirmDialog_title{
                display: flex;
                align-items: center;
                i{
                    font-size: 24px;
                    color: #15bafe;
                }
            }
            .confirmDialog_box{
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
