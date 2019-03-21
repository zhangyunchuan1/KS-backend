<template>
    <div class="RecWordsCatalogue">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="productReview_main">
            <!--标题-->
            <div class="title">
                <p>关键词目录</p>
            </div>

            <div class="content">
                <div class="content_main">
                    <div class="content_table">
                        <el-table
                                :data="tableData"
                                :border="true"
                                style="width:72%">
                            <el-table-column
                                    label="推荐词ID"
                                    align="center"
                                    width="200"
                                    prop="user_id"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="词汇"
                                    align="center"
                                    width="350"
                                    show-overflow-tooltip
                                    prop="nickname">
                            </el-table-column>

                            <el-table-column
                                    label="状态"
                                    align="center"
                                    width="250"
                                    show-overflow-tooltip
                                    prop="user_type">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.user_type === 0">系统注册</span>
                                        <span v-if="scope.row.user_type === 1">个人注册</span>
                                        <span v-if="scope.row.user_type === 2">公司注册</span>
                                        <span v-if="scope.row.user_type === 3">普通商家</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                label="操作"
                                align="center"
                                min-width="350"
                                fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="primary" plain size="mini">恢复</el-button>
                                    <el-button type="primary" plain size="mini">删除</el-button>
                                    <el-button type="primary" plain size="mini">禁用</el-button>
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
        name: "RecWordsCatalogue",
        components: {
            BreadCrumb
        },
        data(){
            return{
                // 面包屑
                breadData: [
                {
                    id: 1,
                    name: '用户行为分析',
                    urls: '/index/market/Market',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '点赞记录',
                    urls: '/index/market/marketProduct/MarketProduct',
                    icon: 'icon-home'
                }
                ],
                tableData:null,
                
                //分页
                total:null,
                currentPage:1
            }
        },
        mounted(){
            this.getSearchList();
        },
        methods:{
            //获取点赞记录列表
            getSearchList(){
                this.HttpClient.post('/admin/behavior/votesCount',{
                    size:25,
                    page:this.currentPage
                })
                .then(res=>{
                    console.log(res);
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.total;
                })
            },
            //分页
            currentChange(p){
                this.currentPage=p;
                this.getSearchList();
                this.currentPage  = null;
            },
            filterSecondary(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
        },
    }
</script>

<style lang="less">
    .RecWordsCatalogue{
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
                .all_num{
                    border-bottom: 1px solid #dedede;
                    padding-bottom: 20px;
                    margin-bottom: 10px;
                    display: flex;
                    .num_title{
                        text-align: center;
                        padding: 0 20px;
                        height: 35px;
                        line-height: 35px;
                        border-radius: unset;
                        background: #15bafe;font-size: 14px;
                        color:#fff;
                    }
                    .all_number{
                        text-align: center;
                        margin-left: 20px;
                        padding: 0 20px;
                        height: 35px;
                        line-height: 35px;
                        border:1px solid #dedede;
                        
                    }
                }
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
