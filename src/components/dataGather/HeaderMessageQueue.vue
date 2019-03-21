<template>
    <div class="HeaderMessagePrompt">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="productReview_main">
            <!--标题-->
            <div class="title">
                <p>头部消息队列</p>
            </div>

            <div class="content">
                <div class="content_main">
                    <div class="content_search">
                        <div class="encyclopedia_search">
                            <div class="content_select">
                                <el-input
                                    placeholder="用户ID搜索"
                                    clearable
                                    v-model="SearchID"
                                    class="input-with-select" 
                                    @clear="getlistData">
                                    <el-button slot="append" icon="el-icon-search" @click="getlistData"></el-button>
                                </el-input>
                            </div>
                            <div class="block">
                                <el-date-picker
                                v-model="value6"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @change="handleChangeTime">
                                </el-date-picker>
                            </div>
                            <!-- <div class="content_select">
                                <el-select v-model="valueStatus" clearable placeholder="请选择状态" @change="changeStatus">
                                    <el-option
                                    v-for="item in Statusoptions"
                                    :key="item.value"
                                    :label="item.label" 
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="content_select">
                                <el-select v-model="valueRead" clearable placeholder="是否阅读选择" @change="changeRead">
                                    <el-option
                                    v-for="item in Readoptions"
                                    :key="item.value"
                                    :label="item.label" 
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div> -->
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
                                    width="100"
                                    prop="user_id">
                            </el-table-column>

                            <el-table-column
                                    label="用户昵称"
                                    align="center"
                                    width="160"
                                    show-overflow-tooltip
                                    prop="nickname">
                            </el-table-column>

                            <el-table-column
                                    label="类别"
                                    align="center"
                                    width="100"
                                    show-overflow-tooltip
                                    prop="category">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.category === 1">注册</span>
                                        <span v-if="scope.row.category === 2">订单</span>
                                        <span v-if="scope.row.category === 3">修改密码</span>
                                        <span v-if="scope.row.category === 4">配送</span>
                                        <span v-if="scope.row.category === 5">点赞</span>
                                        <span v-if="scope.row.category === 6">收入</span>
                                        <span v-if="scope.row.category === 7">退款</span>
                                        <span v-if="scope.row.category === 8">审核</span>
                                        <span v-if="scope.row.category === 9">评价</span>
                                        <span v-if="scope.row.category === 10">电量</span>
                                        <span v-if="scope.row.category === 11">百科</span>
                                        <span v-if="scope.row.category === 12">活动</span>
                                        <span v-if="scope.row.category === 13">待评价</span>
                                        <span v-if="scope.row.category === 14">燃料</span>
                                        <span v-if="scope.row.category === 15">提现</span>
                                        <span v-if="scope.row.category === 16">评论</span>
                                        <!-- <span v-else>无</span> -->
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="摘要"
                                    show-overflow-tooltip
                                    align="center"
                                    width="160">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.content.title || '无'}}</span> 
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="信息"
                                    align="center"
                                    width="250"
                                    show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.content.info || '无'}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column
                                    label="颜色"
                                    align="center"
                                    width="100"
                                    show-overflow-tooltip
                                    >
                                    <template slot-scope="scope">
                                        <span>{{scope.row.content.color || '无'}}</span> 
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="是否阅读"
                                    align="center"
                                    prop="flag"
                                    show-overflow-tooltip
                                    :filters="[{text:'未读',value:0},{text:'已读',value:1}]"
                                    :filter-method="filterSecondary"
                                    width="160">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.flag === 0" class="sortout_color">未读</span>
                                        <span v-if="scope.row.flag === 1">已读</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="状态"   
                                    align="center"
                                    show-overflow-tooltip
                                    width="120"
                                    :filters="[{text:'删除',value:0},{text:'正常',value:1}]"
                                    :filter-method="filterSecondary"
                                    prop="status">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.status === 0" class="sortout_color">删除</span>
                                        <span v-if="scope.row.status === 1">正常</span>
                                        <span v-if="scope.row.status === 2">失败</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="发送时间"
                                    align="center"
                                    show-overflow-tooltip
                                    width="180"
                                    prop="created_at"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="阅读时间"
                                    align="center"
                                    show-overflow-tooltip
                                    width="180"
                                    prop="updated_at">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.updated_at">{{scope.row.updated_at}}</span>
                                        <span v-else class="sortout_color">无</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="操作"
                                    align="center"
                                    fixed="right"
                                    class-name="mallReview_scope">
                                <template slot-scope="scope">
                                    <div class="mallReview_btm">
                                        <el-button type="text" v-if="scope.row.status === 0" @click="RecoverFn(scope.row)">恢复</el-button>
                                        <el-button type="text" v-if="scope.row.status === 1" @click="deleteFn(scope.row)">删除</el-button>
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

    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';

    export default {
        name: "HeaderMessagePrompt",
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
                    name: "头部消息队列",
                    urls: "/index/dataGather/header-message-queue",
                    icon: "icon-home"
                    }
                ],
                // 状态
                Statusoptions: [{
                    value: '',
                    label: '全部'
                    }, {
                    value: 0,
                    label: '删除'
                    }, {
                    value: 1,
                    label: '正常'
                    }],
                valueStatus: '',
                // 阅读
                Readoptions: [{
                    value: '',
                    label: '全部'
                    }, {
                    value: 1,
                    label: '已读'
                    }, {
                    value: 0,
                    label: '未读'
                    }],
                valueRead: '',
                SearchID:'',//用户ID搜索
                // approveDialog:false,
                // delateDialog:false,
                // contentHeader:null,
                // searchObj:{},
                // SellerName:null,
                // productName:null,
                tableData:null,
                value6:[],

                // typeList:[],
                // flag:null,

                total:null,
                currentPage:1, 
                pageSize:25,

                // 操作ID
                Id:null,   //更改和删除存储的id
            }
        },
        mounted(){
            this.getlistData();
        },
        methods:{
            handleChangeTime(){
                console.log(this.value6)
                this.getlistData();
            },
            filterSecondary(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            // 分页
            currentChange(p){
                this.currentPage = p;
                this.getlistData();
            },
            // 状态改变
            changeStatus(){
                this.getlistData();
            },
            // 阅读状态改变
            changeRead(){
                this.getlistData();
            },
            // 恢复
            RecoverFn(row){
                console.log(row)
                this.changeStatusFn(row,1)
            },
            // 删除
            deleteFn(row){
                this.changeStatusFn(row,0)
            },
            // 改变状态接口
            changeStatusFn(row,status){
                let params = {
                    message_id:row.message_id,
                    status:status
                }
                this.HttpClient.post('/admin/messages/updateStatus',params).then(res => {
                    console.log(res.data)
                    if(res.data.code == 200){
                        this.$message.success(res.data.msg);
                        setTimeout(() => {
                            this.getlistData()
                        }, 500);
                    }
                })
            },
            getlistData(){
                let params = {
                    size:this.pagSize,
                    page:this.currentPage,
                    user_id:this.SearchID,
                    date_start:this.value6[0],
                    date_end:this.value6[1]
                }
                this.HttpClient.post('/admin/messages/list',params).then(res => {
                    if(res.data.code === 200){
                        console.log(res)
                       this.tableData = res.data.data.data;
                       this.total = res.data.data.to;
                    //    console.log(res.data.data) 
                    }
                })
            },
            // getlistData(){
            //     let params = {
            //         pagSize:this.pagSize,
            //         page:this.currentPage,
            //         orderBy:'desc',
            //         order:'',
            //         status:this.valueStatus,
            //         flag:this.valueRead,
            //         uid:this.SearchID
            //     }
            //     this.HttpClient.post('/admin/messages/list',params).then(res => {
            //         if(res.data.code === 200){
            //            this.tableData = res.data.data.data;
            //            this.total = res.data.data.to;
            //            console.log(res.data.data) 
            //         }
            //     })
            // },
        },
    }
</script>

<style lang="less">
    .HeaderMessagePrompt{
        text-align: left;
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
