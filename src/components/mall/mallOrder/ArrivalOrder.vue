<template>
  <div class="arrivalOrder">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="arrivalOrder_main">
        <!--标题-->
        <div class="title">
          <p>到货订单</p>
        </div>
        
        <div class="content">
          <!--头部-->
          <div class="content_header">
            <div class="content_select">
              <div class="date_item">
                <p class="date_label">开始</p>
                <el-date-picker
                  v-model="searchObj.startTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  clearable
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="date_item">
                <p class="date_label">截止</p>
                <el-date-picker
                @change="search"
                  v-model="searchObj.endTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  clearable
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>

            <div class="content_search">
              <div>
                <el-cascader
                @change="search"
                  clearable
                  :options="cityList"
                  v-model="searchObj.city">
                </el-cascader>
              </div>
              <div>
                <el-input
                @change="search"
                  placeholder="订单ID"
                  clearable
                  v-model="searchObj.orderSearch"
                  class="input-with-select"
                  @keyup.enter.native="search">
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </div>
              <div>
                <el-input
                @change="search"
                  placeholder="商家名称"
                  clearable
                  v-model="searchObj.merchantNameSearch"
                  class="input-with-select"
                  @keyup.enter.native="search">
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </div>
              <div>
                <el-input
                @change="search"
                  placeholder="商品名称"
                  clearable
                  v-model="searchObj.commodityNameSearch"
                  class="input-with-select"
                  @keyup.enter.native="search">
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </div>
            </div>
          </div>
          <!--主体内容-->
          <div class="content_main">

            <div class="content_table" style="width:100%">
              <el-table
                :data="tableData"
                :border="true">
                <el-table-column
                  label="订单ID"
                  align="center"
                  width="150"
                  prop="order_no"
                  show-overflow-tooltip
                  sortable>
                </el-table-column>

                <el-table-column
                  label="商品名称"
                  align="center"
                  width="150"
                  show-overflow-tooltip
                  prop="title">
                </el-table-column>

                <el-table-column
                  label="商家名称"
                  align="center"
                  width="150"
                  show-overflow-tooltip
                  prop="company_name">
                </el-table-column>

                <el-table-column
                  label="订单时间"
                  align="center"
                  show-overflow-tooltip
                  width="180"
                  prop="created_at"
                  sortable>
                </el-table-column>

                <el-table-column
                  label="目的城市"
                  align="center"
                  show-overflow-tooltip
                  width="100"
                  prop="city_name">
                </el-table-column>

                <el-table-column
                  label="确认到货时间"
                  align="center"
                  show-overflow-tooltip
                  width="180"
                  prop="delivery_time"
                  sortable>
                  <template slot-scope="scope">
                    <span v-if="scope.row.delivery_time">
                      {{scope.row.delivery_time}}
                    </span>
                    <span class="sortout_color" v-else>
                      无
                    </span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="快递到达时间"
                  align="center"
                  width="180"
                  show-overflow-tooltip
                  prop="take_delivery_time"
                  sortable>
                  <template slot-scope="scope">
                    <span v-if="scope.row.take_delivery_time">
                      {{scope.row.take_delivery_time}}
                    </span>
                    <span class="sortout_color" v-else>
                      无
                    </span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="操作"
                  min-width="200"
                  align="center"
                  fixed="right"
                  class-name="mallReview_scope">
                  <template slot-scope="scope">
                    
                      <el-button type="primary" plain size="mini" @click="refundModal(scope.row)">退款</el-button>
                      <el-button type="primary" plain size="mini" @click="checkExpressModal(scope.row)">查看物流</el-button>
                      <el-button type="primary" plain size="mini" @click="orderDetailModal(scope.row)">订单详情</el-button>
                      <el-button type="primary" plain size="mini" @click="remarkModal(scope.row)">备注</el-button>
                      <el-button type="primary" plain size="mini" @click="buyerRemarks(scope.row.order_id)">买家备注</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="fenye">
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

    <!--退款弹窗-->
    <el-dialog
      :visible.sync="refundReasonDialog"
      width="470px"
      custom-class="refundReasonDialog">
      <span slot="title" class="refundReasonDialog_title"><i class="iconfont icon-refund"></i>退款</span>
      <div class="refundReasonDialog_main">
        <div class="main_content">
          <div class="content_list">
            <div class="title">订单状态：</div>
            <div class="list_box">{{order_status === 4?'已到货':'无'}}</div>
          </div>

          <div class="content_list">
            <div class="title">卖家余额：</div>
            <div class="list_box">{{balance}}</div>
          </div>

          <div class="content_list">
            <div class="title">退款理由：</div>
            <el-input
              type="textarea"
              placeholder="请输入退款理由..."
              :rows="4"
              resize="none"
              v-model="refundTextarea">
            </el-input>
          </div>

          <div class="content_list">
            <div class="title">退款金额：</div>
            <el-input v-model="refundMoney"></el-input>
          </div>

        </div>
      </div>

      <!--二次确认弹窗-->
      <el-dialog
        width="300px"
        :visible.sync="innerVisible"
        append-to-body>
        <div class="inner_box">
          <i class="iconfont icon-warning-circle"></i>
          <div>确认给用户退款吗？</div>
        </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSurerefuse">确 定</el-button>
          </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="refundReasonDialog = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">确 定</el-button>
      </span>
    </el-dialog>

    <!--查看物流弹窗-->
      <el-dialog
        :visible.sync="logisticsDialog"
        width="500px"
        custom-class="logisticsDialog">
        <span slot="title" class="logisticsDialog_title"><i class="iconfont icon-wuliuxinxi"></i>物流信息</span>
        <div class="logisticsDialog_main">
          <div class="title">物流公司：<p>{{expressObj.ShipperCode}}</p></div>
          <div class="title">物流编号：<p>{{expressObj.LogisticCode}}</p></div>
          <div class="main_content">
            <div class="logisticsList" v-for="track in expressObj.Traces" :key="track">
              <p>{{track.AcceptStation}}</p>
              <span>{{track.AcceptTime}}</span>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="logisticsDialog = false">关 闭</el-button>
        </span>
      </el-dialog>

    <!--订单详情弹窗-->
      <el-dialog
        :visible.sync="orderDetailsDialog"
        width="470px"
        custom-class="orderDetailsDialog">
        <span slot="title" class="orderDetailsDialog_title"><i class="iconfont icon-wenjian"></i>订单详情</span>
        <div class="orderDetailsDialog_main">
          <div class="main_content">
            <div class="content_list">
              <div class="content_title">商品ID：</div>
              <div class="content_box">
                <p>{{detailObj.id}}</p>
                <div class="content_table">
                  <div class="table_list">
                    <p>数量</p>
                    <span>{{detailObj.quantity}}</span>
                  </div>
                  <div class="table_list">
                    <p>单价</p>
                    <span>{{detailObj.price}}</span>
                  </div>
                  <div class="table_list">
                    <p>总价</p>
                    <span>{{detailObj.total_price}}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="content_list">
              <div class="content_title">姓名：</div>
              <div class="content_box">
                <p>{{detailObj.conducts}}</p>
              </div>
            </div>
            <div class="content_list">
              <div class="content_title">用户昵称：</div>
              <div class="content_box">
                <p>{{detailObj.nickname}}</p>
              </div>
            </div>
            <div class="content_list">
              <div class="content_title">用户ID：</div>
              <div class="content_box">
                <p>{{detailObj.user_id}}</p>
              </div>
            </div>

            <div class="content_list">
              <div class="content_title">电话：</div>
              <div class="content_box">
                <p>{{detailObj.telphone}}</p>
              </div>
            </div>

            <div class="content_list">
              <div class="content_title">收货地址：</div>
              <div class="content_box">
                <p>{{detailObj.province+' '+detailObj.city+' '+detailObj.area+' '+detailObj.detail}}</p>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="orderDetailsDialog = false">关 闭</el-button>
        </span>
      </el-dialog>

    <!--备注弹窗-->
    <el-dialog
      :visible.sync="RemarksDialog"
      width="470px"
      custom-class="RemarksDialog">
      <span slot="title" class="RemarksDialog_title"><i class="iconfont icon-edit-square"></i>备注</span>
      <div class="RemarksDialog_main">
        <div class="main_content">
          <div class="main_content_list">
            <div class="title">添加备注</div>
            <el-input
              type="textarea"
              :rows="4"
              resize="none"
              v-model="remarkStr">
            </el-input>
          </div>

          <div class="main_content_history">
            <div class="title">历史</div>
            <div class="history_box">
              <div class="history_list" v-for="(item, index) in remarkList" :key="index">
                <p class="userName">{{item.create_name}}<span>{{item.created_at}}</span></p>
                <p class="content">{{item.content}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RemarksDialog = false">关 闭</el-button>
        <el-button type="primary" @click="remark">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 买家备注弹窗 -->
    <el-dialog :visible.sync="buyerRemarkVisible" width="470px" custom-class="RemarksDialog">
      <span slot="title" class="RemarksDialog_title">
        <i class="el-icon-tickets"></i>买家备注
      </span>
      <div class="RemarksDialog_main">
        <div class="main_content">
          <div class="main_content_list">
            <div class="title">备注内容</div>
            <el-input type="textarea" :rows="4" resize="none" v-model="buyerRemarkStr" disabled></el-input>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import Tools from "@/utils/tools.js";
  let tools = new Tools();

  export default {
    name: "ArrivalOrder",
    components: {
      BreadCrumb,
    },
    data(){
      return{
        breadData: [{
          id: 1,
          name: '商城',
          urls: '/index/mall/mall/Mall',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '商城订单',
          urls: '/index/mallOrder/MallOrder',
          icon: 'icon-home'
        }, {
          id: 3,
          name: '到货订单',
          urls: '/index/mallOrder/ArrivalOrder',
          icon: 'icon-home'
        }],

        commodityNameSearch:'',  // 昵称搜索
        total: 0, // 总条数
        pageSize: 25, // 每页条数
        currentPage: 1, // 当前页
        tableData:[],
        refundReasonDialog: false,  // 退款弹窗
        order_ID:null,  //退款订单全局ID
        balance:0, //余额
        order_status:null,  //活动状态
        refundTextarea: '',
        refundMoney: '',
        innerVisible: false,
        logisticsDialog: false,  // 物流弹窗
        orderDetailsDialog: false, // 订单详情
        RemarksDialog: false,  // 备注弹窗
        RemarksTextarea: '',
        searchObj: {}, // 搜索对象
        modifyObj: {}, // 操作对象
        remarkStr: '', // 备注信息
        remarkList: [], // 备注列表
        detailObj: {}, // 订单详情
        expressObj: {}, // 物流信息对象
        cityList: [], // 城市列表
        buyerRemarkVisible:false,
        buyerRemarkStr:'',
      }
    },
    created() {
      this.getTableList(null);
      this.getCityList();
    },
    methods: {
      //查看买家备注
      buyerRemarks(id){
        this.HttpClient.post("/admin/marketOrder/orderLog", {order_id:id}).then(
          res => {
            console.log(res);
            if (res.data.code === 200) {
              this.buyerRemarkVisible = true;
              this.buyerRemarkStr = res.data.data.content;
            }else{
              this.$message.warning(res.data.msg);
            }
          }
        );
      },
      async getCityList() {
        let res = await this.HttpClient.get('/city/getAllCities');
        this.cityList = dealWithCity(res.data.data);
      },
      async getTableList(param) {
        console.log(param)
        let params = {
          page: this.currentPage
        }
        if(param) {
          params['start_time'] = param.startTime;
          params['end_time'] = param.endTime;
          params['order_id'] = param.orderSearch;
          params['company_name'] = param.merchantNameSearch;
          params['title'] = param.commodityNameSearch;
          params['city_id'] = param.city?param.city[1]:'';
        }
        let res = await this.HttpClient.post('/admin/marketOrder/receiveOrder', params);
        console.log(res.data.data)
        this.tableData = res.data.data.data;
        this.total = res.data.data.total;
      },
      async remark() {
        let res = await this.HttpClient.post('/admin/remarkLog/create', {content: this.remarkStr, source_id: this.modifyObj.order_id});
        tools.getApiMessage(res);
        if(res.data.code == '200'){
          this.RemarksDialog = false;
          this.search();
        } 
      },
      // 备注弹窗
      async remarkModal(modifyObj) {
        this.RemarksDialog = true;
        this.modifyObj = modifyObj;
        // 初始化备注信息
        this.remarkStr = '';
        let res = await this.HttpClient.post('/admin/remarkLog/lists', {source_id: this.modifyObj.order_id});
        this.remarkList = res.data.data;
      },
      // 订单详情
      async orderDetailModal(modifyObj) {
        this.modifyObj = modifyObj;
        this.orderDetailsDialog = true;
        // 初始化详情表格
        this.detailTable = [];
        let res = await this.HttpClient.post('/admin/marketOrder/detail', {id: this.modifyObj.id});
        if(res.data.code == 200) {
          this.detailObj = res.data.data;
        }
      },
      // 查看物流弹窗
      async checkExpressModal(modifyObj) {
        this.modifyObj = modifyObj;
        this.logisticsDialog = true;
        let res = await this.HttpClient.post('/web/user/getLogisticsInfo', {logisticcode: this.modifyObj.logistics_no});
        if(res.data.code == 200) this.expressObj = res.data.data;
      },
      // 退款弹窗
      refundModal(modifyObj) {
        this.refundReasonDialog = true;
        this.balance = modifyObj.sale_balance;
        this.order_status = modifyObj.status;
        this.order_ID = modifyObj.order_id
      },
      //最终确认退款
      handleSurerefuse(){
        this.HttpClient.post('/refund/admin',{
            order_id:this.order_ID,
            price:this.refundMoney,
            reason:this.refundTextarea,
            type:1
        })
        .then(res=>{
          console.log(res)
          if(res.data.code === 200){
            this.$message.success(res.data.msg);
            setTimeout(() => {
              this.getTableList(this.searchObj);
              this.refundReasonDialog = false;
              this.innerVisible = false;
              this.refundMoney = 0;
              this.refundTextarea = '';
            }, 1000);
          }else{
            this.$message.warning(res.data.msg);
          }
        })
      },
      search() {
        this.getTableList(this.searchObj);
      },
      async currentChange(page) {
        this.currentPage = page;
        this.search();
      },
    }
  }

// 城市列表转换为element对应数据格式
function dealWithCity(cityList) {
  if(cityList && cityList.length > 0) {
    for(let i in cityList) {
      cityList[i].value = cityList[i].id;
      cityList[i].label = cityList[i].name;
      if(cityList[i].child && cityList[i].child.length > 0) {
        cityList[i]['children'] = dealWithCity(cityList[i].child);
      }
    }
  }
  return cityList;
}
</script>

<style lang="less">
  .arrivalOrder{
    text-align: left;
    .bread{
      margin: 10px;
    }
    .arrivalOrder_main::-webkit-scrollbar {display:none}
    .arrivalOrder_main{
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
        box-sizing: border-box;
        padding: 20px 40px;

        /*头部*/
        .content_header{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 30px 0;

          .content_select{
            display: flex;
            .date_item{
              display: flex;
              border: 1px solid #dcdfe6;
              border-radius: 5px;
              margin-right: 20px;
              .el-input__inner{
                border: none !important;
              }
              .date_label{
                color: #808080;
                font-size: 12px;
                height: 28px;
                line-height: 28px;
                margin-left: 10px;
              }
              .date_picker_1{
                width: 140px;
              }
            }
          }

          /*搜索框*/
          .content_search{
            display: flex;
            width: 900px;
            align-items: center;
            >div{
              margin-left: 30px;
            }
          }
        }

        .content_main{
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
                }
              }
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
          .fenye{
            text-align: center;
          }
        }
      }
    }
  }

  /*退款弹窗*/
  .refundReasonDialog{
    .refundReasonDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
    }
    .refundReasonDialog_main{
      .main_content{
        box-sizing: border-box;
        .content_list:not(:last-child){
          margin-bottom: 15px;
        }
        .content_list{
          display: flex;
          align-items: flex-start;
          .title{
            min-width: 90px;
            padding: 10px 10px;
          }
          .list_box{
            height: 40px;
            text-align: center;
            border: 1px solid #dedede;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
          }
        }
      }
    }
  }
  .inner_box{
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

  /*查看物流弹窗*/
  .logisticsDialog{
    .el-dialog__body{
      padding-top: 0;
    }
    .logisticsDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
    }
    .logisticsDialog_main{
      .title{
        font-size: 14px;
        margin-bottom: 15px;
        p{
          height: 40px;
          line-height: 40px;
          border: 1px solid #dedede;
          border-radius: 4px;
          margin-top: 5px;
          text-align: center;
        }
      }
      .main_content{
        box-sizing: border-box;
        border: 1px solid #dedede;
        padding: 15px;
        height: 400px;
        overflow: auto;
        border-radius: 4px;
        .logisticsList{
          margin-bottom: 10px;
          p{
            margin-bottom: 5px;
          }
          p:before{
            content: '';
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #000;
            margin-right: 10px;
            position: relative;
            top: -2px;
          }

          span{
            display: inline-block;
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }

  /*订单详情弹窗*/
  .orderDetailsDialog{
    .orderDetailsDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
    }
    .orderDetailsDialog_main{
      .main_content{
        box-sizing: border-box;

        .content_list{
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;
          .content_title{
            margin-right: 10px;
            min-width: 70px;
            padding-top: 4px;
          }
          .content_box{
            >p{
              padding: 5px 30px;
              border: 1px solid #dedede;
              font-size: 14px;
              border-radius: 4px;
              min-width: 250px;
            }
            .content_table{
              display: flex;
              align-items: center;
              margin-top: 10px;
              .table_list{
                width: 100%;
                margin-right: -1px;
                p,span{
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                  border: 1px solid #dedede;
                  display: block;
                  padding: 0 20px;
                }
                p{
                  background: #15bafe;
                  color: #fff;
                  margin-bottom: -1px;
                }
              }
            }
          }
        }
      }
    }
  }

  /*备注弹窗*/
  .RemarksDialog{
    .el-dialog__body{
      padding-top: 0;
    }
    .RemarksDialog_title{
      display: flex;
      align-items: center;
      i{
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
    }
    .RemarksDialog_main{
      .main_content{
        box-sizing: border-box;
        .main_content_list{
          margin-bottom: 20px;
          .title{
            margin-bottom: 10px;
          }
        }
        .main_content_history{
          .title{
            margin-bottom: 10px;
            border-bottom: 1px solid #dedede;
            padding-bottom: 10px;
          }
          .history_box{
            box-sizing: border-box;
            padding: 20px 20px 20px 20px;
            height: 300px;
            overflow: auto;
            border: 1px solid #dedede;
            .history_list:not(:last-child){
              margin-bottom: 15px;
            }
            .history_list{
              .userName:before{
                content: '';
                width: 5px;
                height: 5px;
                display: inline-block;
                background: #15bafe;
                border-radius: 50%;
                margin-right: 15px;
              }
              .userName{
                margin-bottom: 10px;
                color: #222;
                span{
                  font-size: 12px;
                  color: #15bafe;
                  margin-left: 10px;
                }
              }
              .content{
                font-size: 12px;
                color: #666;
                padding-left: 20px;
              }
            }
          }
        }
      }
    }
  }

</style>
