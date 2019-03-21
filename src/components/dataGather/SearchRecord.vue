<template>
    <div class="SearchRecord">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="productReview_main">
            <!--标题-->
            <div class="title">
                <p>搜索记录</p>
            </div>

            <div class="content">
                <div class="all_num">
                    <div class="num_title">总搜索次数</div>
                    <div class="all_number">{{count}}</div>
                </div>
                <div class="content_main">
                    <div class="content_search">
                        <div class="encyclopedia_search">
                            <div class="content_select">
                                <div class="date_item">
                                    <p class="date_label">开始</p>
                                    <el-date-picker
                                    v-model="searchObj.startTime"
                                    class="date_picker_1"
                                    type="date"
                                    size="mini"
                                    value-format='yyyy-MM-dd HH:mm:ss'
                                    clearable
                                    placeholder="选择日期"
                                    @change="handleChangeStartTime($event)">
                                    </el-date-picker>
                                </div>
                                <div class="date_item">
                                    <p class="date_label">截止</p>
                                    <el-date-picker
                                    v-model="searchObj.endTime"
                                    class="date_picker_1"
                                    type="date"
                                    size="mini"
                                    value-format='yyyy-MM-dd HH:mm:ss'
                                    clearable
                                    placeholder="选择日期"
                                    @change="handleChangeEndTime($event)">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div>
                                <el-input
                                placeholder="内容搜索"
                                clearable
                                v-model="searchObj.content"
                                class="input-with-select">
                                <el-button slot="append" icon="el-icon-search" @click="handleSearchContent"></el-button>
                                </el-input>
                            </div>
                        </div>

                    </div>

                    <div class="content_table">
                        <el-table
                                :data="tableData"
                                :border="true">
                            <el-table-column
                                    label="输入内容"
                                    align="center"
                                    width="200"
                                    prop="keyword"
                                    show-overflow-tooltip
                                    sortable>
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.keyword">{{scope.row.keyword}}</span>
                                        <span v-else class="sortout_color">无</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="搜索时间"
                                    align="center"
                                    width="160"
                                    show-overflow-tooltip
                                    prop="search_time"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="浏览器"
                                    align="center"
                                    width="140"
                                    prop="browser_name"
                                    show-overflow-tooltip
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="浏览器版本"
                                    align="center"
                                    width="150"
                                    show-overflow-tooltip
                                    prop="browser_version">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.browser_version">{{scope.row.browser_version}}</span>
                                        <span v-else class="sortout_color">无</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="屏幕大小"
                                    align="center"
                                    width="150"
                                    show-overflow-tooltip
                                    prop="screen_size">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.screen_size">{{scope.row.screen_size}}</span>
                                        <span v-else class="sortout_color">无</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="设备类型"
                                    align="center"
                                    width="180"
                                    show-overflow-tooltip
                                    prop="agent_type">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.agent_type">{{scope.row.agent_type}}</span>
                                        <span v-else class="sortout_color">无</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="当前页面"
                                    align="center"
                                    width="180"
                                    show-overflow-tooltip
                                    prop="current_page">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.current_page">{{scope.row.current_page}}</span>
                                        <span v-else class="sortout_color">无</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="页面地址"
                                    align="center"
                                    width="180"
                                    sortable
                                    show-overflow-tooltip
                                    prop="current_url">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.current_url">{{scope.row.current_url}}</span>
                                        <span v-else class="sortout_color">无</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    min-width="200"
                                    label="操作"
                                    fixed="right"
                                    align="center">
                                <template slot-scope="scope">
                                    <div class="mallReview_btm">
                                        <el-button type="primary" plain size="mini" @click="handlePreview(scope.row.keyword)">查看搜索结果</el-button>
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
        name: "SearchRecord",
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
                    name: '搜索记录',
                    urls: '/index/market/marketProduct/MarketProduct',
                    icon: 'icon-home'
                }
                ],
                contentHeader:null,
                searchObj:{},
                SellerName:null,
                productName:null,
                tableData:null,
                count:null,  //总的搜索记录

                typeList:[],
                //分页
                total:null,
                currentPage:1
            }
        },
        mounted(){
            this.getSearchList();
        },
        methods:{
            //查看搜索結果
            handlePreview(keyWord){
                window.open(this.Urls.frontUrl+"home/searchIndex?keyword="+keyWord+"&current=0");  
            },
            //内容搜索
            handleSearchContent(){
                console.log(this.searchObj.content);
                this.getSearchList();
            },
            //结束时间搜索
            handleChangeEndTime(e){
                console.log(this.searchObj.endTime);
                this.getSearchList();
            },
            //开始时间搜索
            handleChangeStartTime(e){
                console.log(e);
                this.getSearchList();
            },
            //获取搜索记录列表
            getSearchList(){
                this.HttpClient.post('/admin/behavior/searchRecord',{
                    start_time:this.searchObj.startTime,
                    end_time:this.searchObj.endTime,
                    keyword:this.searchObj.content,
                    size:25,
                    page:this.currentPage
                })
                .then(res=>{
                    console.log(res)
                    this.tableData = res.data.data.lists.data;
                    this.count = res.data.data.count;
                    this.total = res.data.data.lists.total;
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
    .SearchRecord{
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
