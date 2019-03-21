<template>
  <div class="Sales">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

    <div class="encyclopedia_main">
      <div class="encyclopedia_title">
        <div class="title">购物车</div>
      </div>
      <div class="encyclopedia_table">
        <div class="encyclopedia_search">
          <div>
            <el-input
              placeholder="账号搜索"
              clearable
              v-model="userName"
              class="input-with-select"
              @keyup.13.native="getShoppingCart"
              @clear="getShoppingCart"
            >
              <el-button slot="append" icon="el-icon-search" @click="getShoppingCart"></el-button>
            </el-input>
          </div>
        </div>
        <div class="encyclopedia_content" style="width:100%">
          <el-table :data="tableData" :border="true">
            <el-table-column label="用户ID" align="center" width="100" prop="id" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.id||'无'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户账号" align="center" width="180" prop="nickname" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.nickname||'无'}}</span>
              </template>
            </el-table-column>

            <el-table-column label="全部商品" align="center" width="580" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="product_list" v-if="scope.row.product.length !== 0">
                  <div
                    class="product_list_item"
                    v-for="(item,index) in scope.row.product.slice(0,6)"
                    :key="index"
                  >{{item.title.slice(0,6)}}</div>
                </div>
                <div class="product_list sortout_color" v-else>
                  暂无商品
                </div>
              </template>
            </el-table-column>

            <el-table-column label="商品个数" align="center" width="110" show-overflow-tooltip sortable prop="product_count"></el-table-column>

            <el-table-column label="购买总数" align="center" width="110" show-overflow-tooltip sortable prop="product_total"></el-table-column>

            <el-table-column label="总计价格" align="center" width="110" show-overflow-tooltip prop="product_price" sortable></el-table-column>

            <el-table-column 
                    label="操作"
                    fixed="right"
                    min-width="300"
                    align="center">
              <template slot-scope="scope">
                
                  <el-button
                    type="primary" plain size="mini"
                    @click="showProduct(scope.row.uid,scope.row.nickname)"
                  >商品列表</el-button>
                
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
              @current-change="currentChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--商品列表弹窗-->
    <el-dialog :visible.sync="productDialog" width="1000px" custom-class="product_dialog">
      <span slot="title" class="product_dialog_title">
        <span class="title_item">
          <i class="iconfont icon-orderedlist"></i>商品列表
        </span>
        <span class="title_item_name">
          <span class="title_name">用户账号 :</span>
          <span class="title_name_content">{{sourceName}}</span>
        </span>
      </span>
      <div class="product_dialog_main">
        <el-table :data="productList" :border="true">
          <el-table-column label="商品图片" align="center" width="80">
            <template slot-scope="scope">
              <img
                v-if="scope.row.show_picture && scope.row.show_picture.length>0"
                :src="Tools.handleImg(scope.row.show_picture[0].path)+'?imageView2/1/w/50/h/50'"
                alt
              >
              <span v-else class="sortout_color">暂无图片</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" align="center" width="100" show-overflow-tooltip prop="title">
            <template slot-scope='scope'>
              <span v-if="scope.row.title">{{scope.row.title}}</span>
              <span v-else class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column label="卖家昵称" align="center" width="100" show-overflow-tooltip prop="nickname">
            <template slot-scope='scope'>
              <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
              <span v-else class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column label="来源" align="center" width="60" show-overflow-tooltip prop="source">
            <template slot-scope='scope'>
              <span v-if="scope.row.source">{{scope.row.source}}</span>
              <span v-else class="sortout_color">无</span>
            </template>
          </el-table-column>
 
          <el-table-column label="商城" align="center" width="60" show-overflow-tooltip prop="folder_name">
            <template slot-scope='scope'>
              <span v-if="scope.row.folder_name">{{scope.row.folder_name}}</span>
              <span v-else class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column label="一级目录" align="center" width="100" show-overflow-tooltip prop="menu_1_name">
            <template slot-scope='scope'>
              <span v-if="scope.row.menu_1_name">{{scope.row.menu_1_name}}</span>
              <span v-else class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column label="二级目录" align="center" width="100" show-overflow-tooltip prop="menu_2_name">
            <template slot-scope='scope'>
              <span v-if="scope.row.menu_2_name">{{scope.row.menu_2_name}}</span>
              <span v-else class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column label="三级目录" align="center" width="100" show-overflow-tooltip prop="menu_3_name">
            <template slot-scope='scope'>
              <span v-if="scope.row.menu_3_name">{{scope.row.menu_3_name}}</span>
              <span v-else class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column label="单价" align="center" width="80" show-overflow-tooltip sortable prop="price">
            <template slot-scope='scope'>
              <span v-if="scope.row.price">{{scope.row.price}}</span>
              <span v-else class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column label="库存" align="center" width="80" show-overflow-tooltip prop="stock" sortable>
            <template slot-scope='scope'>
              <span v-if="scope.row.stock">{{scope.row.stock}}</span>
              <span v-else class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column label="购买数量" align="center" width="120" show-overflow-tooltip prop="quantity" sortable>
            <template slot-scope='scope'>
              <span v-if="scope.row.quantity">{{scope.row.quantity}}</span>
              <span v-else class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column label="小计" align="center" width="100" show-overflow-tooltip prop="total_price" sortable>
            <template slot-scope='scope'>
              <span v-if="scope.row.total_price">{{scope.row.total_price}}</span>
              <span v-else class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column label="添加时间" align="center" width="160" show-overflow-tooltip prop="created_at" sortable>
            <template slot-scope='scope'>
              <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
              <span v-else class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" fixed="right" min-width="160" class-name="encyclopedia_scope">
            <template slot-scope="scope">
              <div class="encyclopedia_btm">
                <el-button
                  size="medium "
                  type="text"
                  @click="deleteButton(scope.row.uid,scope.row.cart_id)"
                >删除</el-button>
                <el-button
                  size="medium "
                  type="text"
                  @click="remarkButton(scope.row)"
                >买家备注</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="totalProduct"
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="totalProduct"
          @current-change="ProductCurrentChange"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clearCart">清空购物车</el-button>
        <el-button @click="productDialog = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--删除确认框-->
    <delete-modal ref="delete" @doDelete="confirmDelete"></delete-modal>
    <!-- 买家备注 -->
    <el-dialog title="买家备注" :visible.sync="centerDialogVisible" width="30%" center>
        <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>
      <span>{{buyerContent.content}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import DeleteModal from "@/components/public/modalDelete";

export default {
  name: "ShoppingCart",
  components: {
    BreadCrumb,
    DeleteModal
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "购物统计",
          urls: "/index/mall/shoppingStatistics/shopping-statistics",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "购物车",
          urls: "/index/mall/shoppingStatistics/shopping-cart",
          icon: "icon-home"
        }
      ],
      // 分页
      currentPage: 1, // 当前页
      pageSize: 20, // 每页显示数量
      total: 0, // 数据总条数
      productCurrentPage: 1, // 商品列表当前页
      totalProduct: 0, // 总商品数

      tableData: [], // 购物车列表

      //查询条件
      userName: "", // 用户账号搜索

    //   买家备注
    centerDialogVisible:false,
    buyerContent:{},//买家备注

      productDialog: false, // 商品列表弹窗
      sourceName: "", // 用户名称
      productList: [], // 商品列表
      userId: "", // 用户id
      cartId: "", // 购物车id
      isClear: false // 是否清空购物车
    };
  },
  mounted() {
    this.getShoppingCart();
  },
  methods: {
    // 买家备注
    remarkButton(row) {
        this.HttpClient.get('/admin/marketShoppingCart/getUserRemark',{source_id:row.cart_id}).then(res => {
          // console.log(res.data)
          if(res.data.code == 200){
            this.centerDialogVisible = true;
            this.buyerContent = res.data.data
          }else{
            this.$message.warning(res.data.msg)
          }
        })
    },
    // 获取购物车列表
    getShoppingCart() {
      let parameters = {
        page: this.currentPage,
        size: this.pageSize
      };
      if (this.userName) {
        parameters.user_name = this.userName;
      }
      this.HttpClient.post("/admin/marketShoppingCart/index", parameters).then(
        res => {
          console.log(res);
          if (res.data.code === 200) {
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          }
        }
      );
    },
    //获取商品列表
    getProductList(id) {
      let parameters = {
        page: this.productCurrentPage,
        size: this.pageSize,
        uid: id
      };
      this.HttpClient.post(
        "/admin/marketShoppingCart/productList",
        parameters
      ).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.productList = res.data.data.data;
          this.totalProduct = res.data.data.total;
        }
      });
    },
    //商品列表按钮
    showProduct(id, name) {
      this.productDialog = true;
      this.sourceName = name;
      this.userId = id;
      this.getProductList(id);
    },
    //删除购物车商品
    deleteProductByCart(uid, cartId) {
      console.log(uid,cartId)
      this.HttpClient.delete("/admin/marketShoppingCart", {
        uid:uid,
        cart_id:cartId
      }).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            setTimeout(() => {
              this.getProductList(this.userId);
              this.getShoppingCart();
            });
          } else {
            this.$message.error(res.data.msg);
          }
        }
      );
    },
    //商品列表删除按钮
    deleteButton(uid, cid) {
      console.log(uid,cid)
      this.userId = uid;
      this.cartId = cid;
      this.isClear = false;
      this.$refs.delete.deleteDialog = true;
    },
    //清空购物车按钮
    clearCart() {
      this.isClear = true;
      this.$refs.delete.deleteDialog = true;
    },
    //确认删除
    confirmDelete() {
        if (this.isClear) {  //清空单个用户购物车
          this.deleteProductByCart(this.userId);
        } else {  //删除用户购物车单个商品
          console.log(this.userId,this.cartId)
          this.deleteProductByCart(this.userId, this.cartId);
        } 
    },

    // 翻页
    currentChange(p) {
      this.currentPage = p;
      this.getShoppingCart();
    },
    //商品列表翻页
    ProductCurrentChange(p) {
      this.productCurrentPage = p;
      this.getProductList(this.userId);
    }
  }
};
</script>

<style lang="less">
.dialog_delete_head_title {
  height: 16px;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
  text-align: left;
  font-size: 15px;
}
.Sales {
  /*分页*/
  .paging {
    margin: 20px 0;
    text-align: center;
  }
  .bread {
    margin: 10px;
  }
  .encyclopedia_main::-webkit-scrollbar {
    display: none;
  }
  .encyclopedia_main {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
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
    .encyclopedia_table {
      padding-top: 20px;

      /*搜索框*/
      .encyclopedia_search {
        display: flex;
        justify-content: flex-start;
        padding: 0 40px;
      }
      .encyclopedia_content {
        margin: 20px 0;
        padding: 0 40px;
        .el-table {
          thead {
            color: #fff;
            th,
            tr {
              background-color: #15bafe;
            }
          }
          tbody {
            tr {
              .cell {
                .product_list {
                  width: 100%;
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  justify-content: flex-start;
                  overflow: hidden;

                  .product_list_item {
                    // width: 118px;
                    border-radius: 5px;
                    padding: 0 10px;
                    margin-top: 5px;
                    height: 40px;
                    line-height: 40px;
                    color: #fff;
                    background: #15bafe;
                    overflow: hidden;
                    box-sizing: border-box;
                    margin-right: 10px;
                  }
                  .product_list_item:last-child {
                    margin-right: 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  /*商品列表弹窗*/
  .product_dialog {
    .el-dialog__body {
      padding-top: 20px;
      border-top: 1px solid #ccc;
    }
    .product_dialog_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 40px;
      .title_item {
        vertical-align: middle;
        i {
          font-size: 24px;
          color: #15bafe;
          margin-right: 15px;
          vertical-align: middle;
        }
      }
      .title_item_name {
        vertical-align: middle;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .title_name {
          padding: 5px 10px;
          color: #fff;
          background: #15bafe;
          box-sizing: border-box;
        }
        .title_name_content {
          margin-left: 10px;
          padding: 4px 10px;
          border: 1px solid #15bafe;
          box-sizing: border-box;
        }
      }
    }
    .product_dialog_main {
      .el-table {
        thead {
          color: #fff;
          th,
          tr {
            background-color: #15bafe;
          }
        }
        tbody {
          tr {
            .cell {
              img {
                width: 50px;
                height: 50px;
              }
              .product_list {
                width: 100%;
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                justify-content: flex-start;
                overflow: hidden;

                .product_list_item {
                  width: 118px;
                  height: 40px;
                  line-height: 40px;
                  color: #fff;
                  background: #15bafe;
                  overflow: hidden;
                  box-sizing: border-box;
                  margin-right: 10px;
                }
                .product_list_item:last-child {
                  margin-right: 0;
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

