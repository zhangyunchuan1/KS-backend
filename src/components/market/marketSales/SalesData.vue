<template>
    <div class="salesData">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="salesData_main">
            <!--标题-->
            <div class="title">
                <p>销售情况</p>
            </div>

            <div class="content">
                <div class="content_header">
                    <el-radio-group v-model="contentHeader" @change="getSalesList">
                        <el-radio border :label="0">全部板块</el-radio>
                        <el-radio border :label="item.menu_id" v-for="item in typeList" :key="item.id">{{item.name}}</el-radio>
                    </el-radio-group>
                </div>

                <div class="content_table">
                    <div class="content_table_header">
                        <div class="content_search">
                            <el-input
                                placeholder="卖家昵称搜索"
                                v-model="userNameSearch"
                                clearable
                                class="input-with-select"
                                @clear="getSalesList"
                                @keyup.13.native="getSalesList">
                                <el-button slot="append" icon="el-icon-search" @click="getSalesList"></el-button>
                            </el-input>

                            <el-input
                                placeholder="商品名称搜索"
                                v-model="productNameSearch"
                                clearable
                                class="input-with-select"
                                @clear="getSalesList"
                                @keyup.13.native="getSalesList">
                                <el-button slot="append" icon="el-icon-search" @click="getSalesList"></el-button>
                            </el-input>
                        </div>
                    </div>

                    <div class="table">
                        <el-table
                                :data="tableData"
                                :border="true">
                            <el-table-column
                                    label="商品ID"
                                    align="center"
                                    width="90"
                                    show-overflow-tooltip
                                    prop="id"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="商品名称"
                                    align="center"
                                    show-overflow-tooltip
                                    width="200"
                                    prop="title">
                            </el-table-column>

                            <el-table-column
                                    label="卖家昵称"
                                    align="center"
                                    show-overflow-tooltip
                                    width="120"
                                    prop="nickname">
                            </el-table-column>

                            <el-table-column
                                    label="销量"
                                    align="center"
                                    width="120"
                                    prop="sell_num"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="平均售出时间（天）"
                                    align="center"
                                    width="180"
                                    prop="average_sale"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="总订单数"
                                    align="center"
                                    width="120"
                                    prop="order_num"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="用户打分"
                                    align="center"
                                    width="120"
                                    prop="score"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="单价"
                                    align="center"
                                    width="120"
                                    prop="price"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="评论数"
                                    align="center"
                                    width="130"
                                    prop="comment_num"
                                    sortable>
                                    <template slot-scope="scope">
                                        <span  v-if="scope.row.comment_num === null">无</span>
                                        <span  v-if="scope.row.comment_num !== null">{{scope.row.comment_num}}</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="状态"
                                    align="center"
                                    width="130">
                                    <template slot-scope="scope">
                                        {{scope.row.status===0?'删除':scope.row.status===1?'上架':scope.row.status===2?'下架':scope.row.status===3?'待审核':'未通过'}}
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="操作"
                                    align="center"
                                    class-name="encyclopedia_scope">
                                <template slot-scope="scope">
                                    <div class="encyclopedia_btm">
                                        <el-button size="medium " type="text" @click="viewGoods(scope.row)">查看商品</el-button>
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
    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';

    export default {
        name: "SalesData",
        components: {
            BreadCrumb,
        },
        data(){
            return{
                breadData: [
                    {
                        id: 1,
                        name: '淘货',
                        urls: '/index/market/Market',
                        icon: 'icon-home'
                    }, {
                        id: 2,
                        name: '销售情况',
                        urls: '/index/market/marketSales/MarketSales',
                        icon: 'icon-home'
                    }, {
                        id: 3,
                        name: '销售数据',
                        urls: '/index/market/marketSales/SalesData',
                        icon: 'icon-home'
                    }
                ],

                contentHeader: 0,  // 板块选择
                typeList:[],// 板块列表数据

                userNameSearch: '',  // 卖家昵称搜索
                productNameSearch: '',  // 商品名称搜索

                tableData:[],

                currentPage:1,// 当前页
                pageSize:25,// 每页显示数量
                total:0,// 总记录数

            }
        },
        methods:{
          // 查看商品
          viewGoods(row){
            console.log(row)
            window.open(this.Urls.frontUrl+"home/market-detail?id="+row.asin);
          },
            //获取淘货板块列表
            async getTypeList(){
                await this.HttpClient.post('/admin/menu/getList',{menu_type:2,type:0,goods:true})
                    .then(res=>{
                        // console.log(res);
                        if(res.data.code===200){
                            this.typeList=Object.values(res.data.data);
                            console.log(this.typeList)
                            // this.contentHeader=this.typeList[0].menu_id;
                        }
                    })
            },
            //获取销售情况列表
            getSalesList(){
                let parameters={
                    page:this.currentPage,
                    size:this.pageSize
                };
                if(this.userNameSearch){
                    parameters.nickname=this.userNameSearch
                }
                if(this.productNameSearch){
                    parameters.title=this.productNameSearch
                }
                if(this.contentHeader!==0){
                    parameters.folder=this.contentHeader
                }
                this.HttpClient.post('/admin/marketOrder/saleGoods',parameters)
                    .then(res=>{
                        if(res.data.code===200){
                            this.tableData=res.data.data.data;
                            this.total=res.data.data.total;
                            console.log(this.tableData);
                        }
                    })
            },

            //分页
            currentChange(p){
                this.currentPage=p;
                this.getSalesList()
            }
        },
        async created(){
            await this.getTypeList();
            this.getSalesList()
        }
    }
</script>

<style lang="less">
  .salesData {
    text-align: left;

    .bread {
      margin: 10px;
    }

    .salesData_main {
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

        .content_header {
          border-bottom: 1px solid #dedede;
          padding-bottom: 20px;
          margin-bottom: 20px;

          .el-radio-group {
            .el-radio {
              padding: 0 25px;
              text-align: center;
              line-height: 40px;
              // border-color: #606266;

              .el-radio__input {
                display: none;
              }

              .el-radio__label {
                padding: 0;
                color: #606266;
              }
            }

            .el-radio.is-checked {
              border-color: #15bafe;
              background: #15bafe;

              .el-radio__label {
                color: #fff;
              }
            }
          }
        }

        .content_table {
          .content_table_header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .content_search {
              display: flex;
              align-items: center;

              .el-input {
                width: 250px;
                margin-right: 30px;
              }
            }
          }

          .table {
            margin: 20px 0;

            .el-table {
              thead {
                color: #fff;

                th, tr {
                  background-color: #15bafe;
                }
              }
            }
          }

          .pagination {
            margin: 20px 0;
            text-align: center;
          }
        }
      }
    }
  }


</style>
