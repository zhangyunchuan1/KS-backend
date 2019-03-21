<template>
    <div class="user_login">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="productReview_main">
            <!--标题-->
            <div class="title">
                <p>用户登录统计</p>
            </div>

            <div class="content">
                <div class="content_main">
                    <div class="content_search">
                        <div class="encyclopedia_search">
                            <div class="content_select">
                                <!-- <el-select v-model="searchType" clearable placeholder="请选择搜索类型">
                                    <el-option
                                    v-for="item in typeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <div>
                                    <el-input placeholder="公司对外名称" clearable  class="input-with-select" @clear="">
                                        <el-button slot="append" icon="el-icon-search"></el-button>
                                    </el-input>
                                </div> -->
                                <el-input placeholder="请输入内容" v-model="inputValue" class="input-with-select" clearable @clear="handleSearch">
                                    <el-select v-model="searchType" slot="prepend" placeholder="请选择搜索方式">
                                        <el-option label="用户ID搜索" value="1"></el-option>
                                        <el-option label="用户昵称搜索" value="2"></el-option>
                                    </el-select>
                                    <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                                </el-input>
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
                                    width="200"
                                    prop="id">
                            </el-table-column>

                            <el-table-column
                                    label="用户昵称"
                                    align="center"
                                    show-overflow-tooltip
                                    width="300">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.nickname || '无'}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column
                                    label="登录类型"
                                    align="center"
                                    show-overflow-tooltip
                                    width="200">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.platform_type === 0">未知</span>
                                        <span v-if="scope.row.platform_type === 1">PC</span>
                                        <span v-if="scope.row.platform_type === 2">APP</span>
                                        <span v-if="scope.row.platform_type === 3">H5</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="登录时间"
                                    align="center"
                                    width="250"
                                    show-overflow-tooltip
                                    prop="created_at">
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
        name: "UserLogin",
        components: {
            BreadCrumb
        },
        data(){
            return{
                // 面包屑
                breadData: [
                {
                    id: 1,
                    name: "用户数据",
                    urls: "/index/data-gather",
                    icon: "icon-home"
                    },
                    {
                    id: 2,
                    name: "用户登录统计",
                    urls: "/index/dataGather/user-login",
                    icon: "icon-home"
                    }
                ],

                typeOptions:[{
                    value: '选项1',
                    label: '用户昵称'
                    }, {
                    value: '选项2',
                    label: '用户ID'
                },],
                searchType:'',
                // searchContent:'',//搜索内容
                tableData:null,
                inputValue:null,
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
            getTipsList(id,nickname){
                this.HttpClient.post('/admin/loginLog/list',{
                    id:id,
                    nickname:nickname,
                    pagSize:25,
                    page:this.currentPage
                })
                .then(res=>{
                    console.log(res)
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.total;
                })
            },
            handleSearch(){
                console.log('111111111111')
                if(this.searchType === '1'){
                    this.getTipsList(this.inputValue,null);
                }else if(this.searchType === '2'){
                    this.getTipsList(null,this.inputValue);
                }
            },
            //分页
            currentChange(p){
                this.currentPage=p;
                this.getTipsList();
            },
        },
    }
</script>

<style lang="less">
    .user_login{
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
                            .el-select .el-input {
                                width: 130px;
                            }
                            .input-with-select .el-input-group__prepend {
                                background-color: #fff;
                            }
                            // display: flex;
                            // .date_item{
                            // display: flex;
                            // border: 1px solid #dcdfe6;
                            // border-radius: 5px;
                            // margin-right: 20px;
                            // .date_label{
                            //     color: #808080;
                            //     font-size: 12px;
                            //     height: 40px;
                            //     line-height: 40px;
                            //     margin-left: 10px;
                            // }
                            // .el-input--mini {
                            //     .el-input__inner{
                            //         height: 40px;
                            //         line-height: 40px;
                            //         border: none !important;
                            //     }
                            // }
                            // .date_picker_1{
                            //     width: 140px;
                            // }
                            // }
                            // >div{
                            //    margin-right: 30px;
                            // }
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
                            margin-left: 200px;
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
