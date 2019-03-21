<template>
    <div class="ElectricFuelStatistics">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="productReview_main">
            <!--标题-->
            <div class="title">
                <p>电量燃料统计</p>
            </div>

            <div class="content">
                <div class="content_main">
                    <div class="content_search">
                        <div class="encyclopedia_search">
                            <div class="content_select first_select">
                                <!-- <el-select v-model="searchType" clearable placeholder="请选择搜索类型">
                                    <el-option
                                    v-for="item in typeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input
                                    @change="getTipsList"
                                    placeholder="请输入内容搜索"
                                    v-model="searchContent"
                                    clearable>
                                </el-input>
                                <el-button icon="el-icon-search" @click="getTipsList"></el-button> -->
                                <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select" clearable>
                                    <el-select v-model="searchType" slot="prepend" placeholder="请选择搜索类型">
                                        <el-option
                                            v-for="item in typeOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-button slot="append" icon="el-icon-search" @click="getTipsList"></el-button>
                                </el-input>
                            </div>
                            <div class="content_select">
                                <el-select v-model="userType" clearable placeholder="请选择用户类型" @change="getTipsList">
                                    <el-option
                                    v-for="item in usertypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>

                    <div class="content_table">
                        <el-table
                                :data="tableData"
                                :border="true">
                            <el-table-column
                                    label="用户ID"
                                    align="center"
                                    show-overflow-tooltip
                                    width="140">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.user_id || '无'}}</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="用户昵称"
                                    align="center"
                                    show-overflow-tooltip
                                    width="140">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.nickname || '无'}}</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="用户类型"
                                    align="center"
                                    width="160"
                                    show-overflow-tooltip
                                    prop="user_type">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.user_type === 1">普通用户</span>
                                        <span v-if="scope.row.user_type === 2">专业商家</span>
                                        <span v-if="scope.row.user_type === 3">普通商家</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="事件"
                                    align="center"
                                    width="160"
                                    show-overflow-tooltip
                                    prop="action">
                            </el-table-column>

                            <el-table-column
                                    label="变化值"
                                    show-overflow-tooltip
                                    align="center"
                                    width="160"
                                    prop="amount">
                            </el-table-column>

                            <el-table-column
                                    label="当前值"
                                    align="center"
                                    width="300"
                                    show-overflow-tooltip
                                    prop="current">
                            </el-table-column>

                            <el-table-column
                                    label="发生时间"
                                    align="center"
                                    show-overflow-tooltip
                                    width="160"
                                    prop="created_at">
                            </el-table-column>

                            <el-table-column
                                    label="操作"
                                    align="center"
                                    class-name="mallReview_scope">
                                <template slot-scope="scope">
                                    <div class="mallReview_btm">
                                        <el-button @click="handleChangeFlag(scope.row)">历史记录</el-button>
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
        </div>

        <!--历史记录弹窗-->
        <el-dialog
                title="历史纪录"
                :visible.sync="approveDialog"
                width="600px"
                center
                custom-class="approveDialog">
                <div class="approveDialog_main" style="margin-bottom:5px;">
                     <span>用户id：{{historyLog.user_id}}</span>
                     <span>用户昵称：{{historyLog.nickname}}</span>
                     <span>用户类型：{{historyLog.user_type == 1?'普通用户':historyLog.user_type == 2?'专业商家':historyLog.user_type == 3?'普通商家':''}}</span>
                     <span>当前值：{{historyLog.current}}</span>
                </div>
                    <div class="approveDialog_main" style="text-align: center;">
                        <el-table
                                :data="historyData"
                                :border="true">
                            <el-table-column
                                    label="事件"
                                    align="center"
                                    width="160"
                                    show-overflow-tooltip
                                    prop="action">
                            </el-table-column>

                            <el-table-column
                                    label="变化值"
                                    show-overflow-tooltip
                                    align="center"
                                    width="100"
                                    prop="amount">
                            </el-table-column>

                            <el-table-column
                                    label="当前值"
                                    align="center"
                                    width="100"
                                    show-overflow-tooltip
                                    prop="current">
                            </el-table-column>

                            <el-table-column
                                    label="发生时间"
                                    align="center"
                                    show-overflow-tooltip
                                    width="189"
                                    prop="created_at">
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                v-if="historytotal"
                                layout="prev, pager, next"
                                :total="historytotal"
                                :page-size="10"
                                @current-change="currenthistoryChange"
                        ></el-pagination>
                    </div>
        </el-dialog>
        <!--确定删除弹窗-->
        <!-- <el-dialog
                :visible.sync="delateDialog"
                width="400px"
                custom-class="approveDialog">
                    <span slot="title" class="approveDialog_title"><i class="iconfont icon-icon-test"></i>删除</span>
                    <div class="approveDialog_main">
                        <div class="main_content">
                            <i class="iconfont icon-warning-circle"></i>
                            <div>确定删除此消息吗？</div>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                <el-button @click="delateDialog = false">取 消</el-button>
                <el-button type="primary" @click="handleSureDelete">确 定</el-button>
            </span>
        </el-dialog> -->

    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';

    export default {
        name: "ElectricFuelStatistics",
        components: {
            BreadCrumb
        },
        data(){
            return{
                // 面包屑
                breadData: [
                {
                    id: 1,
                    name: "用户行为分析",
                    urls: "/index/data-gather",
                    icon: "icon-home"
                    },
                    {
                    id: 2,
                    name: "电量燃料统计",
                    urls: "/index/dataGather/electric-fuel-statistics",
                    icon: "icon-home"
                    }
                ],

                typeOptions:[{
                    value: 1,
                    label: '用户昵称'
                    }, {
                    value: 2,
                    label: '用户ID'
                },],
                searchType:'',
                searchContent:'',//搜索内容
                userType:'',
                usertypeOptions:[{
                        value: 0,
                        label: '全部'
                    }, {
                        value: 1,
                        label: '用户'
                    },{
                        value: 2,
                        label: '商家'
                    },
                ],
                historyLog:{},
                historyData:[],

                currenthistoryPage:1,
                historytotal:0,

                approveDialog:false,
                delateDialog:false,
                contentHeader:null,
                searchObj:{},
                SellerName:null,
                productName:null,
                tableData:null,

                typeList:[],
                flag:null,

                total:null,
                currentPage:1, 

                // 操作ID
                Id:null,   //更改和删除存储的id
            }
        },
        mounted(){
            this.getTipsList();
        },
        methods:{
            getTipsList(){
                let params = {
                    user_type:this.userType,
                    size:25,
                    page:this.currentPage
                }
                if(this.searchType == 1){
                    params.nickname = this.searchContent;
                }else if(this.searchType == 2){
                    params.user_id = this.searchContent;
                }
                this.HttpClient.post('/admin/behavior/logElectricFuel',params)
                .then(res=>{
                    console.log(res)
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.total;
                })
            },
            //历史记录
            handleChangeFlag(row){
                console.log(row)
                this.approveDialog = true;
                this.historyLog = row;
                // this.historyLog
                this.gethisttoryData();
            },
            gethisttoryData(){
                 let params = {
                    uid:this.historyLog.uid,
                    size:10,
                    page:this.currenthistoryPage
                }
                this.HttpClient.post('/admin/behavior/logElectricFuel',params)
                .then(res=>{
                    console.log(res)
                    this.historyData = res.data.data.data;
                    this.historytotal = res.data.data.total;
                    console.log(this.historytotal)
                })
            },
            // 历史记录分页
            currenthistoryChange(p){
                this.currenthistoryPage=p;
                this.gethisttoryData();
            },
            // 分页
            currentChange(p){
                this.currentPage=p;
                this.getTipsList();
            },
        },
    }
</script>

<style lang="less">
    .ElectricFuelStatistics{
        text-align: left;
        .approveDialog_main{
            span{
                margin-right: 10px;
            }
        }
        .bread{
            margin: 10px;
        }
      .productReview_main::-webkit-scrollbar {display:none}
        .productReview_main {
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

            .content{
                padding: 20px 40px;
                box-sizing: border-box;
                // .content_header{
                //     border-bottom: 1px solid #dedede;
                //     padding-bottom: 20px;
                //     margin-bottom: 10px;
                //     .el-radio{
                //         text-align: center;
                //         padding: 0 20px;
                //         height: 35px;
                //         line-height: 35px;
                //         border-radius: unset;
                //         .el-radio__input{
                //             display: none;
                //         }
                //         .el-radio__label{
                //             padding: 0;
                //         }
                //     }
                //     .el-radio.is-checked{
                //         border-color: #15bafe;
                //         background: #15bafe;
                //         .el-radio__label{
                //             color: #fff;
                //         }
                //     }
                // }

                .content_main{
                    /*搜索框*/
                    .encyclopedia_search{
                        display: flex;
                        justify-content: flex-start;
                        margin: 20px 0;
                        .content_select{
                            display: flex;
                            .el-select{
                                width: 250px !important;
                                margin-right: 10px;
                            }
                            .date_item{
                            display: flex;
                            border: 1px solid #dcdfe6;
                            border-radius: 5px;
                            margin-right: 20px;
                            .date_label{
                                color: #808080;
                                font-size: 12px;
                                height: 40px;
                                line-height: 40px;
                                margin-left: 10px;
                            }
                            .el-input--mini {
                                .el-input__inner{
                                    height: 40px;
                                    line-height: 40px;
                                    border: none !important;
                                }
                            }
                            .date_picker_1{
                                width: 140px;
                            }
                            }
                        }
                        /deep/.first_select{
                            /deep/.el-select{
                                width: 150px !important ;
                            }
                            /deep/.el-input__inner{
                                width: 290px;
                            }
                        }
                        >div{
                            margin-right: 30px;
                        }
                    }

                    /*表格*/
                    .content_table {
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

                                    .el-input--suffix .el-input__inner{
                                        color:#fff;
                                        font-weight:900;
                                        border:none;
                                        padding:0;
                                        background:#15bafe;
                                    }
                                    .el-input__inner::placeholder{
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__inner::-webkit-input-placeholder{
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__inner::-moz-placeholder{  //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__inner:-ms-input-placeholder{  //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__suffix{
                                        right:-2px;
                                        .el-select__caret{
                                            color:#fff;
                                        }
                                        .el-input__icon{
                                            width:14px;
                                        }
                                    }
                                    .el-select{
                                        position:relative;
                                        top:2px;
                                    }
                                }
                            }
                        }
                        .el-pagination{
                            text-align:center;
                        }

                        /*操作按钮*/
                        .mallReview_scope {
                            padding: 0;
                            .cell {
                                line-height: unset;
                                .mallReview_btm {
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
                    }
                }

            }
        }
    }
    /*确认批准确认弹窗*/
    .approveDialog{
        .approveDialog_title{
            display: flex;
            align-items: center;
            i{
                font-size: 24px;
                color: #15bafe;
                margin-right: 15px;
            }
        }
        .approveDialog_main{
            .main_content{
                box-sizing: border-box;
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
