<template>
    <div class="Sales">
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

        <div class="encyclopedia_main">
            <div class="encyclopedia_title">
                <div class="title">购买转化率</div>
            </div>
            <div class="encyclopedia_table">
                <div class="encyclopedia_search">
                    <div>
                        <el-input
                                placeholder="商品名称搜索"
                                clearable
                                v-model="productTitle"
                                class="input-with-select"
                                @keyup.13.native="getProductList"
                                @clear="getProductList">
                            <el-button  slot="append" icon="el-icon-search" @click="getProductList"></el-button>
                        </el-input>
                    </div>
                    <div>
                        <el-input
                                placeholder="商家昵称搜索"
                                clearable
                                v-model="merchantName"
                                class="input-with-select"
                                @keyup.13.native="getProductList"
                                @clear="getProductList">
                            <el-button  slot="append" icon="el-icon-search" @click="getProductList"></el-button>
                        </el-input>
                    </div>
                </div>
                <div class="encyclopedia_content" style="width:90%">
                    <el-table
                            :data="tableData"
                            :border="true">
                        <el-table-column
                                label="商品图片"
                                align="center"
                                width="100">
                            <template slot-scope="scope">
                                <img
                                    v-if="scope.row.show_picture && scope.row.show_picture.length>0"
                                    :src="Tools.handleImg(scope.row.show_picture[0].path)+'?imageView2/1/w/50/h/50'"
                                    alt="">
                                    <span v-else class="sortout_color">暂无图片</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="商品名称"
                                align="center"
                                width="200"
                                show-overflow-tooltip
                                prop="title">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.title">{{scope.row.title}}</span>
                                    <span class="sortout_color" v-else>无</span>
                                </template>
                        </el-table-column>

                        <el-table-column
                                label="商家昵称"
                                align="center"
                                width="200"
                                show-overflow-tooltip
                                prop="nickname">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                                    <span class="sortout_color" v-else>无</span>
                                </template>
                        </el-table-column>

                        <el-table-column
                                label="单价"
                                align="center"
                                width="100"
                                sortable
                                show-overflow-tooltip
                                prop="price">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.price">{{scope.row.price}}</span>
                                    <span class="sortout_color" v-else>无</span>
                                </template>
                        </el-table-column>

                        <el-table-column
                                label="库存"
                                align="center"
                                width="100"
                                prop="stock"
                                show-overflow-tooltip
                                sortable>
                                <template slot-scope="scope">
                                    <span v-if="scope.row.stock">{{scope.row.stock}}</span>
                                    <span class="sortout_color" v-else>无</span>
                                </template>
                        </el-table-column>

                        <el-table-column
                                label="所有购物车总数量"
                                align="center"
                                width="160"
                                prop="carts_count"
                                show-overflow-tooltip
                                sortable>
                                <template slot-scope="scope">
                                    <span v-if="scope.row.carts_count">{{scope.row.carts_count}}</span>
                                    <span class="sortout_color" v-else>无</span>
                                </template>
                        </el-table-column>

                        <el-table-column
                                label="卖出数量"
                                align="center"
                                width="120"
                                prop="sell_num"
                                show-overflow-tooltip
                                sortable>
                                <template slot-scope="scope">
                                    <span v-if="scope.row.sell_num">{{scope.row.sell_num}}</span>
                                    <span class="sortout_color" v-else>无</span>
                                </template>
                        </el-table-column>

                        <el-table-column
                                label="转化率"
                                align="center"
                                width="100"
                                prop="conversion"
                                show-overflow-tooltip
                                sortable>
                                <!-- <template slot-scope="scope">
                                    <span>{{scope.row.conversion.toFixed(2)}}</span>
                                </template> -->
                                <template slot-scope="scope">
                                    <span v-if="scope.row.conversion">{{scope.row.conversion.toFixed(2)}}</span>
                                    <span class="sortout_color" v-else>无</span>
                                </template>
                        </el-table-column>

                        <el-table-column
                                label="评分"
                                align="center"
                                width="100"
                                show-overflow-tooltip
                                prop="score"
                                sortable>
                                <template slot-scope="scope">
                                    <span v-if="scope.row.score">{{scope.row.score}}</span>
                                    <span class="sortout_color" v-else>无</span>
                                </template>
                        </el-table-column>

                        <el-table-column
                                label="操作"
                                align="center"
                                fixed="right"
                                class-name="encyclopedia_scope">
                            <template slot-scope="scope">
                                <div class="encyclopedia_btm">
                                    <el-button size="medium " type="text" @click="sendMessageFn(scope.row)">发送提醒</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <div class="paging" v-if="total">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                :page-size="pageSize"
                                :total="total"
                                @current-change="currentChange">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import BreadCrumb from '@/components/public/BreadCrumb';

    export default {
        name: "ConversionRate",
        components: {
            BreadCrumb
        },
        data(){
            return {
                // 面包屑
                breadData: [
                    {
                        id: 1,
                        name: '购物统计',
                        urls: '/index/mall/shoppingStatistics/shopping-statistics',
                        icon: 'icon-home'
                    }, {
                        id: 2,
                        name: '购买转化率',
                        urls: '/index/mall/shoppingStatistics/conversion-rate',
                        icon: 'icon-home'
                    }
                ],
                // 分页
                currentPage:1,// 当前页
                pageSize:25,// 每页显示数量
                total:0,  // 数据总条数

                tableData:[],// 购物车列表

                productTitle:'',// 商品名称
                merchantName:'',// 商家昵称
            }
        },
        methods:{
            //获取商品列表
            getProductList(){
                let parameters={
                    page:this.currentPage,
                    size:this.pageSize
                };
                if(this.productTitle){
                    parameters.title=this.productTitle
                }
                if(this.merchantName){
                    parameters.nickname=this.merchantName
                }
                this.HttpClient.post('/admin/marketShoppingCart/conversion',parameters)
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.tableData=res.data.data.lists;
                            this.total=res.data.data.total
                        }
                    })
            },

            // 发送提醒
            sendMessageFn(row){
                console.log(row)
                this.HttpClient.post('/admin/marketShoppingCart/sendMsgForProducts',{created_id:row.created_id,content:'请修改商品信息'}).then(res => {
                    if(res.data.code === 200){
                        this.$message.success(res.data.msg)
                    }
                })
            },

            //分页
            currentChange(p){
                this.currentPage=p;
                this.getProductList()
            }
        },
        created(){
            this.getProductList()
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
    .Sales {
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
            min-height: calc(100vh - 100px);
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
            .encyclopedia_table{
                padding-top:20px;

                /*搜索框*/
                .encyclopedia_search{
                    display: flex;
                    justify-content: flex-start;
                    padding: 0 40px;

                    >div{
                        margin-right:15px;
                    }
                    >div:last-child{
                        margin-right:0;
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
                        tbody{
                            tr{
                                .cell{

                                    .product_list{
                                        width:100%;
                                        display:flex;
                                        flex-wrap:nowrap;
                                        align-items:center;
                                        justify-content:flex-start;
                                        overflow:hidden;

                                        .product_list_item{
                                            width:118px;
                                            height:40px;
                                            line-height:40px;
                                            color:#fff;
                                            background:#15bafe;
                                            overflow:hidden;
                                            box-sizing:border-box;
                                            margin-right:10px;
                                        }
                                        .product_list_item:last-child{
                                            margin-right:0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


    }
</style>
