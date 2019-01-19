<template>
    <div class="Sales">
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

        <div class="settle_main">
            <div class="settle_title">
            <div class="title">结算</div>
            </div>
            <div class="settle_table" style="width:80%">
                <div class="settle_search">
                    <div>
                        <el-input placeholder="用户昵称搜索" v-model="searchObj.searchProductId" class="input-with-select">
                        <el-button  slot="append" icon="el-icon-search" @click="search"></el-button>
                        </el-input>
                    </div>
                </div>
                <div class="settle_content">
                    <el-table
                        :data="tableData"
                        :border="true">
                        <el-table-column
                        label="用户ID"
                        align="center"
                        width="100"
                        show-overflow-tooltip
                        prop="id"
                        sortable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.id">{{scope.row.id}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="用户昵称"
                        align="center"
                        width="230"
                        show-overflow-tooltip
                        prop="nickname">
                        <template slot-scope="scope">
                            <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                        </el-table-column>

                        <el-table-column
                        label="创建时间"
                        align="center"
                        width="200"
                        sortable
                        show-overflow-tooltip
                        prop="created_at">
                        <template slot-scope="scope">
                            <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                        </el-table-column>

                        <el-table-column
                        label="应付总额"
                        align="center"
                        width="160"
                        sortable
                        show-overflow-tooltip
                        prop="total_price">
                        <template slot-scope="scope">
                            <span v-if="scope.row.total_price">{{scope.row.total_price}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                        </el-table-column>

                        <el-table-column
                        label="购买商品数量"
                        align="center"
                        width="200"
                        sortable
                        show-overflow-tooltip
                        prop="total_quantity">
                        <template slot-scope="scope">
                            <span v-if="scope.row.total_quantity">{{scope.row.total_quantity}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                        </el-table-column>

                        <el-table-column
                        label="购买商品类别数量"
                        align="center"
                        width="230"
                        sortable
                        show-overflow-tooltip
                        prop="product_count">
                        <template slot-scope="scope">
                            <span v-if="scope.row.product_count">{{scope.row.product_count}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                        </el-table-column>

                        <el-table-column
                        label="操作"
                        align="center"
                        fixed="right"
                        class-name="settle_scope">
                        <template slot-scope="scope">
                            <div class="settle_btm">
                                <el-button size="medium " type="text" @click="productListModal(scope.row)">商品列表</el-button>
                            </div>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
          <!-- 分页 -->
          <div class="paging">
            <el-pagination
              v-if="total"
              layout="prev, pager, next"
              :total="total"
              :page-size="pageSize"
              @current-change="currentChange"
            ></el-pagination>
          </div>
        </div>



      <!--查看商品弹窗-->
        <el-dialog
                :visible.sync="productDialog"
                width="1100px"
                custom-class="product_dialog">
            <div slot="title" class="product_dialog_title"><i class="iconfont icon-orderedlist"></i>
                <span>商品列表</span>
                <div>
                    <span class="product_account">用户账号</span>
                    <span class="product_user">{{modifyObj.nickname}}</span>
                </div>
            </div>
            <div class="product_dialog_main">
                <el-table
                        :data="productList"
                        :border="true">
                    <el-table-column
                            label="商品图片"
                            align="center"
                            width="80"
                            show-overflow-tooltip
                            >
                        <template slot-scope="scope">
                            <img v-if="scope.row.show_picture && scope.row.show_picture.length > 0" :src="Tools.handleImg(scope.row.show_picture[0].path) + '?imageView2/1/w/50/h/50'">
                            <span v-else class="sortout_color">暂无图片</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="商品名称"
                            align="center"
                            width="100"
                            show-overflow-tooltip
                            prop="title">
                            <template slot-scope="scope">
                            <span v-if="scope.row.title">{{scope.row.title}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="卖家昵称"
                            align="center"
                            prop="nickname"
                            show-overflow-tooltip
                            width="120">
                            <template slot-scope="scope">
                            <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="来源"
                            align="center"
                            show-overflow-tooltip
                            width="80"
                            prop="source">
                            <template slot-scope="scope">
                            <span v-if="scope.row.source">{{scope.row.source}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="单价"
                            align="center"
                            show-overflow-tooltip
                            width="100"
                            sortable
                            prop="price">
                            <template slot-scope="scope">
                            <span v-if="scope.row.price">{{scope.row.price}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="库存"
                            align="center"
                            width="100"
                            show-overflow-tooltip
                            prop="stock"
                            sortable>
                            <template slot-scope="scope">
                            <span v-if="scope.row.stock">{{scope.row.stock}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="购买数量"
                            align="center"
                            width="120"
                            show-overflow-tooltip
                            prop="quantity"
                            sortable>
                            <template slot-scope="scope">
                            <span v-if="scope.row.quantity">{{scope.row.quantity}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="小计"
                            align="center"
                            width="100"
                            show-overflow-tooltip
                            prop="total_price"
                            sortable>
                            <template slot-scope="scope">
                            <span v-if="scope.row.total_price">{{scope.row.total_price}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="添加时间"
                            align="center"
                            show-overflow-tooltip
                            width="160"
                            prop="created_at"
                            sortable>
                            <template slot-scope="scope">
                            <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
                            <span v-else class="sortout_color">无</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            align="center"
                            fixed="right"
                            class-name="encyclopedia_scope">
                        <template slot-scope="scope">
                            <div class="encyclopedia_btm">
                                <el-button size="medium " type="text" @click="removeModal(scope.row)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="clearModal">清空购物车</el-button>
                <el-button @click="productDialog = false">关 闭</el-button>
            </span>
        </el-dialog>

        <!--删除弹窗-->
        <el-dialog
            width="470px"
            custom-class="deleteDialog"
            :visible.sync="deleteDialog"
            center>
            <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div class="deleteDialog_box">
            <i class="iconfont icon-warning-circle"></i>
            <p>确定删除吗？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary" @click="remove">确 定</el-button>
            </span>
        </el-dialog>

        <!--清空弹窗-->
        <el-dialog
            width="470px"
            custom-class="deleteDialog"
            :visible.sync="clearDialog"
            center>
            <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div class="deleteDialog_box">
            <i class="iconfont icon-warning-circle"></i>
            <p>确定清空购物车吗？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clearDialog = false">取 消</el-button>
                <el-button type="primary" @click="clear">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';
    import Tools from "@/utils/tools.js";
    let tools = new Tools();

    export default {
        name: "ShoppingCart",
        components: {
            BreadCrumb
        },
        data(){
            return {
                // 面包屑
                breadData: [{
                    id: 1,
                    name: '购物统计',
                    urls: '/index/mall/shoppingStatistics/shopping-statistics',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '结算',
                    urls: '/index/mall/shoppingStatistics/settle-accounts',
                    icon: 'icon-home'
                }],
                // 分页
                total:null,  //数据总条
                tableData:[],
                total: 0, // 总条数
                pageSize: 25, // 每页条数
                currentPage: 1, // 当前页
                searchObj: {}, // 搜索对象
                productDialog: false, // 商品列表弹窗
                modifyObj: {}, // 操作对象
                productList: [], // 产品列表
                projectObj: {}, // 操作的商品列表对象
                deleteDialog: false, // 删除弹窗
                clearDialog: false, // 清空购物车弹窗
            }
        },
        created(){
            this.getTableList(null);
        },
        methods:{
            //获取板块列表
            async getTableList(param){
                let params = {
                    menu_type : 1,
                    page: this.currentPage,
                    size: this.pageSize,
                }
                if(param) {
                    params['user_name'] = param.searchProductId;
                }
                let res = await this.HttpClient.post('/admin/marketShoppingCart/settlement', params);  
                this.tableData = res.data.data.data;
            },
            productListModal(modifyObj) {
                this.productDialog = true;
                this.modifyObj = modifyObj;
                this.getProductTableList();
            },
            async getProductTableList() {
                let res = await this.HttpClient.post('/admin/marketShoppingCart/productList', {
                    uid: this.modifyObj.uid
                });
                this.productList = res.data.data.data;
            },
            async remove() {
                let res = await this.HttpClient.delete('/admin/marketShoppingCart', {
                    uid: this.modifyObj.uid,
                    cart_id: this.projectObj.cart_id
                });
                tools.getApiMessage(res);
                if(res.data.code == '200') this.deleteDialog = false; setTimeout(() => {
                    this.getProductTableList();
                }, 500);
                
            },
            async clear() {
                let res = await this.HttpClient.delete('/admin/marketShoppingCart', {
                    uid: this.modifyObj.uid
                });
                if(res.data.code == '200') this.clearDialog = false;
                this.getProductTableList();
            },
            removeModal(projectObj) {
                this.deleteDialog = true;
                this.projectObj = projectObj;
            },
            clearModal() {
                this.clearDialog = true;
            },
            search(){
                this.getTableList(this.searchObj);
            },
            async currentChange(page) {
                this.currentPage = page;
                this.search();
            },
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
  .settle_main::-webkit-scrollbar {display:none}
    .settle_main {
        margin-left: 10px;
        margin-top: 10px;
        background: #fff;
        height: calc(100vh - 110px);
        width: calc(100vw - 240px);
        border-radius: 2px;
      overflow-y: auto;

        .settle_title {
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
        .settle_box{
        padding: 0 40px;
        margin: 20px 0;
        /*目录选择*/
        .settle_header{
          display: flex;
          align-items: center;
          padding-bottom: 15px;
          border-bottom: 1px solid #dedede;
          margin-bottom: 20px;
            .settle_header_title{
                width: 120px;
                height: 40px;
                align-items: center;
                border: 1px solid #60f133;
                line-height: 40px;
                background: #60f133;
                color:#fff;
            }
          .el-radio-group{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
          }
          .el-radio.is-checked{
            background: #15bafe;
            border-color: #15bafe;
          }
          .el-radio__input.is-checked+.el-radio__label{
            color: #fff;
          }
          .el-radio{
            width: 120px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #dedede;
            margin: 10px;
            .el-radio__input{
              display: none;
            }
            .el-radio__label{
              padding: 0;
            }
          }
        }
      }

      .settle_table {
          /*搜索框*/
        .settle_search{
            display: flex;
            justify-content: flex-end;
            padding: 30px 40px;
            >div{
                margin-left: 30px;
            }
        }
        .settle_content{
            margin: 20px 0;
            padding: 0 40px;
            .el-table{
                thead{
                color: #fff;
                th,tr{
                    background-color: #15bafe;
                }
                }
            }
        }
      }
      
    }

    // 删除弹窗
    .deleteDialog{
        .img_contents {
            height: 170px;
            // width: 330px;
            border: 1px solid #f2f2f2;
            border-radius: 3px;
            margin: 20px 0;
            .img_contain{
                margin: 0 10px;
                display: flex;
                flex-wrap: wrap;
                height: 160px;
                overflow-y: auto;
                width: calc(100% - 20px);
                .img_3{
                width: 100%;
                height: 100%;
                }
                .img_item1{
                width: 150px;
                margin-right: 5%;
                height: 150px;
                margin-top: 10px;
                }
                .img_item2{
                width: 30%;
                height: 150px;
                margin-top: 10px;
                }
                .modal_img{
                width: 100%;
                height: 150px;
                background: rgba(0,0,0,0.4);
                position: relative;
                margin-top: -152px;
                text-align: center;
                opacity: 0;
                .modal_icon{
                    position: relative;
                    font-size: 18px;
                    top: calc(50% - 12px);
                    color: white;
                }
                }
                .modal_img:hover{
                opacity: 1;
                }
            }
        }
        .comment-contant{
            border: 1px solid #bfbfbf;
            height: 80px;
            margin-top: 20px;  
        }
        .comment-contant-more{
            border: 1px solid #bfbfbf;
            height: 250px;
            overflow-y:scroll;
            margin-top: 20px;  
        }
        .more-box{
                text-align: right;
                .more{
                    color: #bfbfbf;
                    cursor: pointer;
                    color:#15bafe;
                }
            }
    
        .deleteDialog_title{
        display: flex;
        align-items: center;
        i{
            font-size: 24px;
            color: #15bafe;
        }
        }
        .deleteDialog_box{
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

    .product_dialog{
        .el-dialog__body{
            padding-top: 20px;
            border-top:1px solid #ccc;
        }
        .product_dialog_title{
            display: flex;
            align-items: center;
            i{
                font-size: 24px;
                color: #15bafe;
                margin-right: 15px;
            }
            .product_account {
                margin-left: 700px;
                border: 1px solid #15bafe;
                background-color: #15bafe;
                border-radius: 4px;
                padding: 5px;
            }
            .product_user {
                border-radius: 4px;
                margin-left: 10px;
                border: 1px solid #ccc;
                padding: 5px 15px;
            }
        }
        .product_dialog_main{

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
</style>

