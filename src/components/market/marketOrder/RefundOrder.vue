<template>
    <div class="RefundOrder">
      <!--面包屑-->
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <!--主体内容-->
      <div class="refundOrder_main">
        <!--标题-->
        <div class="title">
          <p>退款订单</p>
        </div>

        <div class="mallReview_select">
          <el-radio-group v-model="mallReviewSelect">
            <el-radio border :label="null">全部</el-radio>
            <el-radio border v-for="(item,index) in plateList" @change="handleChengePlate($event)" :key="index" :label="item.menu_id">{{item.name}}</el-radio>
          </el-radio-group>
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
                  placeholder="选择日期"
                  @change="handleStartTime($event)">
                </el-date-picker>
              </div>
              <div class="date_item">
                <p class="date_label">截止</p>
                <el-date-picker
                  v-model="searchObj.endTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  clearable
                  placeholder="选择日期"
                  @change="handleEndTime($event)">
                </el-date-picker>
              </div>
            </div>

            <div class="content_search">
              <div>
                <el-input
                  placeholder="商家名称"
                  clearable
                  v-model="searchObj.company"
                  @change="handleSearchCompany"
                  class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="handleSearchCompany"></el-button>
                </el-input>
              </div>
              <div>
                <el-select v-model="searchObj.city" placeholder="请选择" @change="tt($event)">
                  <el-option label="全部" :value="null">
                  </el-option>
                  <el-option
                    v-for="item in cityList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div>
                <el-input
                  placeholder="商品名称"
                  clearable
                  v-model="searchObj.name"
                  @change="handleSearchName"
                  class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="handleSearchName"></el-button>
                </el-input>
              </div>
              <div>
                <el-input
                  placeholder="订单ID搜索"
                  clearable
                  v-model="searchObj.merchantSearch"
                  @change="handleSearchId"
                  class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="handleSearchId"></el-button>
                </el-input>
              </div>
            </div>
          </div>
          <!--主体内容-->
          <div class="content_main">

            <div class="content_table">
              <el-table
                :data="tableData"
                :border="true">
                <el-table-column
                  label="订单ID"
                  align="center"
                  width="150"
                  show-overflow-tooltip
                  prop="order_no"
                  sortable>
                </el-table-column>

                <el-table-column
                  label="商品名称"
                  show-overflow-tooltip
                  align="center"
                  width="120"
                  prop="title">
                </el-table-column>

                <el-table-column
                  label="卖家名称"
                  align="center"
                  width="200"
                  show-overflow-tooltip
                  prop="nickname">
                </el-table-column>

                <el-table-column
                  label="订单时间"
                  align="center"
                  width="200"
                  show-overflow-tooltip
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
                  label="退款时间"
                  align="center"
                  width="200"
                  show-overflow-tooltip
                  prop="refund_time"
                  sortable>
                </el-table-column>

                <el-table-column
                  label="实退金额"
                  align="center"
                  width="130"
                  show-overflow-tooltip
                  prop="refund_price"
                  sortable>
                </el-table-column>

                <el-table-column
                  label="操作"
                  align="center"
                  min-width="350"
                  fixed="right">
                  <template slot-scope="scope">
                      <el-button type="primary" plain size="mini" @click="checkProductionModal(scope.row)">查看商品</el-button>
                      <el-button type="primary" plain size="mini" @click="refundReasonModal(scope.row)">退款原因</el-button>
                      <el-button type="primary" plain size="mini" v-if="scope.row.logistics_no !== null" @click="checkExpressModal(scope.row)">查看物流</el-button>
                      <el-button type="primary" plain size="mini" @click="orderDetailModal(scope.row)">订单详情</el-button>
                      <el-button type="primary" plain size="mini" @click="remarkModal(scope.row)">备注</el-button>
                  </template>
                </el-table-column>
              </el-table>
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

      <!--退款原因弹窗-->
      <el-dialog
        :visible.sync="refundReasonDialog"
        width="470px"
        custom-class="refundReasonDialog">
        <span slot="title" class="refundReasonDialog_title"><i class="iconfont icon-refund"></i>退款原因</span>
        <div class="refundReasonDialog_main">
          <div class="title">退款理由：</div>
            <div class="main_content" v-html="RefundReason">
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="refundReasonDialog = false">关 闭</el-button>
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
            <div class="logisticsList" v-for="(track,index) in expressObj.Traces" :key="index">
              <span>{{track.AcceptTime}}</span>
              <p>{{track.AcceptStation}}</p>
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
                <p>{{commodityId}}</p>
                <div class="content_table">
                  <div class="table_list">
                    <p>数量</p>
                    <span>{{num}}</span>
                  </div>
                  <div class="table_list">
                    <p>单价</p>
                    <span>{{UnitPrice}}</span>
                  </div>
                  <div class="table_list">
                    <p>总价</p>
                    <span>{{totalPrice}}</span>
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
          <el-button type="primary" @click="handlePrimaryRemark">提 交</el-button>
        </span>
      </el-dialog>

      <!-- 买家备注 -->
    <el-dialog
      :visible.sync="buyerVisible"
      width="470px"
      custom-class="RemarksDialog">
      <span slot="title" class="RemarksDialog_title"><i class="iconfont icon-edit-square"></i>买家备注</span>
      <div class="RemarksDialog_main">
        <div class="main_content">
          <div class="main_content_list">
            <el-input
              type="textarea"
              :rows="4"
              resize="none"
              v-model="buyerRemark.content">
            </el-input>
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
    name: "RefundOrder",
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
          name: '退货订单',
          urls: '/index/mallOrder/RefundOrder',
          icon: 'icon-home'
        }],
        mallReviewSelect: null, // 单选框组
        plateList: [], // 模块列表
        modifyObj: {}, // 操作对象
        // startTime:'',  // 开始时间
        // endTime:'',  // 结束时间
        // userNameSearch:'',  // 用户名搜索
        // nickNameSearch:'',  // 昵称搜索
        total: 0, // 总条数
        pageSize: 25, // 每页条数
        currentPage: 1, // 当前页
        cityId:null,
        folderId:null,

        // 买家备注
        buyerVisible:false,
        buyerRemark:{},

        RefundReason:null,  //退款理由
        //详情
        commodityId:null,
        num:null,
        UnitPrice:null,
        totalPrice:null,
        name:null,
        telphone:null,
        detail:null,

        tableData:[],
        refundReasonDialog: false,  // 退款原因
        logisticsDialog: false,  // 物流弹窗
        orderDetailsDialog: false, // 订单详情
        RemarksDialog: false,  // 备注弹窗
        expressObj: {}, // 物流对象
        detailObj: {}, // 详情对象
        searchObj: {}, // 搜索对象
        remarkStr: '', // 备注信息
        remarkList: [], // 备注列表
        cityList: [], // 城市列表
        operationId:null,  //备注操作ID
      }
    },
    created() {
      this.getPalteList();
      this.getOrderList();
    },
    methods: {
        // 订单id搜索
        handleSearchId(){
            console.log(this.searchObj.merchantSearch)
            this.getOrderList();
        },
        // 商家名称
        handleSearchCompany(){
            console.log(this.searchObj.company)
            this.getOrderList();
        },
        //商品名称搜索
        handleSearchName(){
            console.log(this.searchObj.name)
            this.getOrderList();
        },
        // 买家备注
        handleBuyerRemark(row){
          console.log(row)
          this.HttpClient.post('/admin/marketOrder/orderLog',{order_id:row.order_id}).then(res => {
            if(res.data.code == 200){
              this.buyerRemark = res.data.data;
              this.buyerVisible = true;
              console.log(this.buyerRemark)
            }else{
              this.$message.warning(res.data.msg)
            }
          })
        },
        //选择城市
        tt(e){
            // console.log(e)
            console.log(this.searchObj.city)
            this.getOrderList();
        },
        //选择截止时间
        handleEndTime(){
            console.log(this.searchObj.endTime)
            this.getOrderList();
        },
        //选择开始时间
        handleStartTime(e){
            // console.log(this.searchObj.startTime)
            this.getOrderList();
        },
        //获取tab数据
        getOrderList(){
            this.HttpClient.post('/admin/marketOrder/refundOrderGoods',{
                start_time:this.searchObj.startTime,
                end_time:this.searchObj.endTime,
                nickname:this.searchObj.company,
                order_id:this.searchObj.merchantSearch,
                title:this.searchObj.name,
                city_id:this.searchObj.city,
                folder:this.folderId
            })
            .then(res=>{
                console.log(res)
                this.tableData = res.data.data.data;
                if(this.cityId === null){
                    this.getCityList();
                }
            })
        },
        // 取出城市列表
        getCityList(){
            let citys =[];
            for(let i=0;i<this.tableData.length;i++){
                citys.push({
                    value:this.tableData[i].city_id,
                    label:this.tableData[i].city_name
                })
            }
            console.log(citys)
            this.method1(citys);
        },
        //数组去除相同元素
        method1(arry){
            let arr=[];
            let arr2=[];
            // console.log(arry[0].value === arry[1].value)
            for(let i=0;i<arry.length;i++){
                if(arr.indexOf(arry[i].value) === -1){
                    arr.push(arry[i].value);
                    arr2.push(arry[i]);
                }
            }
            console.log(arr)   
            console.log(arr2)   
            this.cityList = arr2;    
            console.log(this.cityList)     
        },
        // 获取板块
        getPalteList(){
            this.HttpClient.post('/admin/menu/getList',{
                menu_type :2,
                type:0,
                goods:true
            })
            .then(res=>{
                console.log(res)
                this.plateList = res.data.data;
            })
        },
      
      handleChengePlate(e) {
            this.folderId = e;
            console.log(e)
            this.getOrderList();
      },
      //提交备注
      handlePrimaryRemark(){
          console.log(this.remarkStr)
          this.HttpClient.post('/admin/remarkLog/create',{
                content:this.remarkStr,
                source_id:this.operationId
          })
          .then(res=>{
              console.log(res)
              if(res.data.code === 200){
                  this.$message.success(res.data.msg)
                  setTimeout(() => {
                      this.getRemarkList(this.operationId);
                      this.remarkStr = '';
                  }, 500);
              }
          })
      },
      // 备注
      remarkModal(i){
          console.log(i)
          this.operationId = i.order_id;
          this.getRemarkList(i.order_id);
          this.RemarksDialog = true;
      },
      //获取备注
      getRemarkList(id){
          this.HttpClient.post('/admin/remarkLog/lists',{
              source_id:id
          })
          .then(res=>{
              console.log(res)
              this.remarkList = res.data.data.reverse();
          })
        },
      // 退款原因
      refundReasonModal(i){
          this.HttpClient.post('/admin/marketOrder/refundInfo', {order_id: i.order_id})
            .then(res => {
              const { code, data: {reason} } = res.data
              if (code === 200 && reason) {
                this.RefundReason = reason
              } else {
                this.RefundReason = ''
              }
            })
          this.refundReasonDialog = true;
        // this.modifyObj = modifyObj;
      },
      // 订单详情
        orderDetailModal(i) {
            console.log(i)
            this.HttpClient.post('/admin/marketOrder/detailGoods',{
                id:i.id
            })
            .then(res=>{
                console.log(res)
                // this.commodityId = res.data.data.id;
                // this.telphone = res.data.data.telphone;
                // this.detail = res.data.data.detail;
                // this.name = res.data.data.conducts;
                this.detailObj = res.data.data;
                this.num = res.data.data.quantity;
                this.UnitPrice = res.data.data.price;
                this.totalPrice = res.data.data.total_price;
            })
            this.orderDetailsDialog = true;
        
      },
      // 查看物流
      checkExpressModal(i) {
          console.log(i);
          this.HttpClient.post('/admin/getLogisticsInfo',{
                logisticcode:i.logistics_no,
                order_id:i.order_id,
                type:1
            })
            .then(res=>{
                console.log(res)
                this.expressObj.ShipperCode = res.data.data.ShipperName;
                this.expressObj.LogisticCode = res.data.data.LogisticCode;
                this.expressObj.Traces = res.data.data.Traces.reverse();
                console.log(this.expressObj)
                this.logisticsDialog = true;
            })
          
      },
      checkProductionModal(modifyObj) {
        // 跳转商品页
        window.open(this.Urls.frontUrl+"home/market-detail?id="+modifyObj.asin);
      },
      currentChange(page) {
          this.currentPage = page;
          this.search();
      },
    }
  }
</script>

<style lang="less">
  .RefundOrder{
    text-align: left;
    .bread{
      margin: 10px;
    }
    .refundOrder_main::-webkit-scrollbar {display:none}

    .refundOrder_main{
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;

      /*单选框组*/
      .mallReview_select{
        padding-bottom: 20px;
        margin: 40px 40px 20px 40px;
        border-bottom: 1px solid #dedede;
        .el-radio.is-checked{
          background: #15bafe;
          border: none;
          .el-radio__label{
            color: #fff;
          }
        }
        .el-radio{
          padding: 0 20px;
          text-align: center;
          line-height: 30px;
          height: 30px;
          border-radius: unset;
          .el-radio__input{
            display: none;
          }
          .el-radio__label{
            padding: 0;
          }
        }
      }

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
              tbody{
                .cell{
                  .el-button{
                    margin-top: 2px;
                  }
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
                }
              }
            }
          }
        }
      }
    }
  }

  /*退款原因弹窗*/
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
      .title{
        font-size: 14px;
        margin-bottom: 15px;
      }
      .main_content{
        box-sizing: border-box;
        border: 1px solid #dedede;
        padding: 15px;
        font-size: 14px;
        color: #2f2f2f;
        height: 200px;
        overflow: auto;
      }
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
            color:#999;
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
            color: #15bafe;
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
