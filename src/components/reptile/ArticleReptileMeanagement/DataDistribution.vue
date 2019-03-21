<template>
    <div class="article_data_distribution">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="productReview_main">
            <!--标题-->
            <div class="title">
                <p>数据分配</p>
            </div>

            <div class="content">
                <div class="content_main">
                    <div class="content_table">
                        <el-table
                                :data="tableData"
                                :border="true"
                                style="width:100%">
                            <el-table-column
                                    label="原站文章ID"
                                    align="center"
                                    width="70"
                                    prop="id"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="文章题目"
                                    align="center"
                                    width="150"
                                    show-overflow-tooltip
                                    prop="title">
                            </el-table-column>
                            <el-table-column
                                    label="点赞次数"
                                    align="center"
                                    width="110"
                                    prop="like_num"
                                    show-overflow-tooltip
                                    sortable>
                            </el-table-column>
                            <el-table-column
                                    label="关键词"
                                    align="center"
                                    width="150"
                                    prop="tags_name"
                                    show-overflow-tooltip>
                                    <template slot-scope="scope">
                                            <el-tag type="success" v-for="(item,index) in scope.row.tags_name" :key="index">{{item}}</el-tag>
                                    </template>
                            </el-table-column>
                            <el-table-column
                                    label="发布时间"
                                    align="center"
                                    width="160"
                                    prop="release_time"
                                    show-overflow-tooltip
                                    sortable>
                            </el-table-column>
                            <el-table-column
                                    label="站点"
                                    align="center"
                                    width="120"
                                    show-overflow-tooltip
                                    prop="url">
                            </el-table-column>
                            <!-- <el-table-column
                                    label="Tag"
                                    align="center"
                                    width="120"
                                    show-overflow-tooltip
                                    prop="user_id">
                            </el-table-column> -->
                            <el-table-column
                                    label="板块"
                                    align="center"
                                    width="120"
                                    show-overflow-tooltip
                                    prop="category_name">
                            </el-table-column>
                            <!-- <el-table-column
                                    label="二级目录"
                                    align="center"
                                    width="120"
                                    show-overflow-tooltip
                                    prop="user_id">
                            </el-table-column> -->

                            <el-table-column
                                    label="创建时间"
                                    align="center"
                                    width="160"
                                    show-overflow-tooltip
                                    prop="created_at"
                                    sortable>
                            </el-table-column>
                            
                            <el-table-column
                                    label="是否分配"
                                    align="center"
                                    width="100"
                                    show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span class="normal_color" v-if="scope.row.category_name !== null && scope.row.category_id !== null">已分配</span>
                                        <span class="sortout_color" v-if="scope.row.category_name === null && scope.row.category_id === null">未分配</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                label="操作"
                                align="center"
                                min-width="350"
                                fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="primary" plain size="mini" v-if="scope.row.category_name === null && scope.row.category_id === null" @click="handleDistribution(scope.row.id,2)">分配</el-button>
                                    <el-button type="primary" plain size="mini" v-if="scope.row.category_name !== null && scope.row.category_id !== null" @click="handleAgain(scope.row,1)">重新分配</el-button>
                                    <!-- <el-button type="primary" plain size="mini">分配用户</el-button> -->
                                    <!-- <el-button type="primary" plain size="mini" @click="handleOpenFront(scope.row.article_id)">预览文章</el-button> -->
                                    <el-button type="primary" plain size="mini" v-if="scope.row.category_name !== null && scope.row.category_id !== null && scope.row.is_release === 0" @click="handleRelease(scope.row.id)">发布</el-button>
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
        <!-- 修改手机弹窗 -->
        <el-dialog
        width="400px"
        title="分配"
        custom-class="user-option-dialog"
        :visible.sync="distributionDialog"
        >
        <div class="neir">
            <div class="neir_list">
                <div class="title">分配用户</div>
                <el-select v-model="userValue" placeholder="请选择爬虫用户">
                    <el-option
                    v-for="item in userList"
                    :key="item.uid"
                    :label="item.nickname"
                    :value="item.uid">
                    </el-option>
                </el-select>
            </div>
            <div class="neir_list">
                <div class="title">分配板块</div>
                <el-select v-model="plateValue" placeholder="请选择文章板块">
                    <el-option
                    v-for="item in plateList"
                    :key="item.menu_id"
                    :label="item.name"
                    :value="item.menu_id">
                    </el-option>
                </el-select>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="distributionDialog = false">取 消</el-button>
            <el-button size="small" type="primary" @click="handleSubmit">确 定</el-button>
        </span>
        </el-dialog>
        <!--发布弹窗-->
        <el-dialog
                width="470px"
                custom-class="approveDialog"
                :visible.sync="releaseDialog"
                center>
                <span slot="title" class="approveDialog_title"><i class="iconfont icon-huaban4"></i></span>
                <div class="approveDialog_box">
                <i class="iconfont icon-warning-circle"></i>
                <p>确定发布吗？</p>
                </div>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="releaseDialog = false">取 消</el-button>
                        <el-button type="primary" @click="confirmAgree">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';

    export default {
        name: "DataDistribution",
        components: {
            BreadCrumb
        },
        data(){
            return{
                // 面包屑
                breadData: [
                {
                    id: 1,
                    name: '文章爬虫管理',
                    urls: '/index/market/Market',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '数据分配',
                    urls: '/index/market/marketProduct/MarketProduct',
                    icon: 'icon-home'
                }
                ],
                tableData:null,
                distributionDialog:false,
                userList:[],  //用户列表
                plateList:[],  //板块列表
                userValue: '',
                plateValue:'',
                articleID:null,
                releaseDialog:false,  //发布弹窗
                dataType:null,  //分配类型  1分配  2重新分配
                //分页
                total:null,
                currentPage:1
            }
        },
        mounted(){
            this.getDataList();
        },
        methods:{
            //预览文章
            handleOpenFront(id){
                window.open(this.Urls.frontUrl+"home/articleDetails?id="+id);  
            },
            //确认发布
            confirmAgree(){
                this.HttpClient.post("/admin/reptile/release", {
                    id:this.articleID,
                }).then(res => {
                    console.log(res)
                    if(res.data.code === 200){
                        this.$message.success(res.data.msg);
                        setTimeout(() => {
                            this.getDataList();
                        }, 500);
                        this.releaseDialog = false;
                    }
                })
            },
            //发布
            handleRelease(id){
                this.articleID = id;
                this.releaseDialog = true;
            },
            //重新分配
            handleAgain(i,type){
                this.articleID = i.id;
                this.dataType = type;
                this.distributionDialog = true;
                this.userValue = i.created_id;
                this.plateValue = i.category_id
                this.getUserPlateList();
            },
            //提交分配
            handleSubmit(){
                this.HttpClient.post("/admin/reptile/updateInfo", {
                    id:this.articleID,
                    created_id:this.userValue,
                    category_id:this.plateValue,
                    type:this.dataType
                }).then(res => {
                    console.log(res)
                    if(res.data.code === 200){
                        this.$message.success(res.data.msg);
                        setTimeout(() => {
                            this.getDataList();
                        }, 500);
                        this.distributionDialog = false;
                        this.plateValue = '';
                        this.userValue = '';
                    }
                })
            },
            //分配
            handleDistribution(id,type){
                this.articleID = id;
                this.dataType = type;
                this.distributionDialog = true;
                this.getUserPlateList();
            },
            getUserPlateList(){
                this.HttpClient.get("/reptileUserList", {
                }).then(res => {
                    console.log(res);
                    if(res.data.code === 200){
                        this.userList = res.data.data;
                    }
                })
                this.HttpClient.post("/admin/menu/getList", {
                    menu_type:2,
                    type:6
                }).then(res => {
                    console.log(res);
                    if(res.data.code === 200){
                        this.plateList = res.data.data;
                    }
                })
            },
            //获取批准的文章爬虫列表
            getDataList(){
                this.HttpClient.post("/admin/reptile/getList", {
                        pasSize:15,
                        where:1,
                        page:this.currentPage
                }).then(res => {
                        console.log(res);
                        this.tableData = res.data.data[0].data;
                        this.total = res.data.data[0].total;
                })
            },
            //分页
            currentChange(p){
                this.currentPage=p;
                this.getDataList();
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
    .article_data_distribution{
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
    /*发布弹窗*/
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
    /* 弹窗*/  
    .user-option-dialog {
      .neir{
          .neir_list{
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
              .title{
                  width: 120px;
                  height: 40px;
                  background: #15bafe;
                  text-align: center;
                  line-height: 40px;
                  color:#fff;
              }
          }
      }
    }
</style>
