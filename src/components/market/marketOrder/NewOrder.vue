<template>
  <div class="newOrder">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="newOrder_main">
      <!--标题-->
      <div class="title">
        <p>新订单查询</p>
      </div>

      <div class="content">
        <div class="content_header">
          <el-radio-group v-model="contentHeader" @change="rr($event)">
            <el-radio border :label="null">全部</el-radio>
            <el-radio v-for="(item,index) in plateList" border :label="item.menu_id" :key="index">{{item.name}}</el-radio>  
          </el-radio-group>
        </div>

        <div class="content_main">

          <div class="data_header">
            <div class="data_select">
              <div class="date_item">
                <p class="date_label">开始</p>
                <el-date-picker
                  v-model="startTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  placeholder="选择日期"
                  @change="handleChangeStartTime($event)">
                </el-date-picker>
              </div>
              <div class="date_item">
                <p class="date_label">截止</p>
                <el-date-picker
                  v-model="endTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  placeholder="选择日期"
                  @change="handleChangeEndTime($event)">
                </el-date-picker>
              </div>
            </div>

            <div class="data_search">
              <div>
                <el-select v-model="city" clearable placeholder="请选择" @change="tt($event)">
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
                  placeholder="订单编号"
                  clearable
                  v-model="orderId"
                  class="input-with-select"
                  @input="searcha($event)"
                  @clear="getOrderList">
                  <el-button slot="append" icon="el-icon-search" @click="handleSearcha"></el-button>
                </el-input>
              </div>

              <!-- <div>
                <el-input
                  placeholder="商品名称"
                  clearable
                  v-model="productName"
                  class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div> -->

              <div>
                <el-input
                  placeholder="商品名称"
                  clearable
                  v-model="companyName"
                  class="input-with-select"
                  @input="searchb($event)"
                  @clear="getOrderList">
                  <el-button slot="append" icon="el-icon-search" @click="handleSearchb"></el-button>
                </el-input>
              </div>

            </div>

          </div>

          <div class="content_table">
            <el-table
              :data="tableData"
              :border="true">
              <el-table-column
                label="订单编号"
                align="center"
                width="160"
                prop="order_no"
                sortable
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.order_no">{{scope.row.order_no}}</span>
                  <span v-else class="sortout_color">暂无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="商品名称"
                align="center"
                width="150"
                prop="title"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.title">{{scope.row.title}}</span>
                  <span v-else class="sortout_color">暂无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="卖家昵称"
                align="center"
                width="180"
                prop="nickname"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                  <span v-else class="sortout_color">暂无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="订单时间"
                align="center"
                width="160"
                prop="created_at"
                sortable
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
                  <span v-else class="sortout_color">暂无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="目的城市"
                align="center"
                width="140"
                prop="city_name"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.city_name">{{scope.row.city_name}}</span>
                  <span v-else class="sortout_color">暂无</span>
                </template>
              </el-table-column>

              <el-table-column
                label="订单状态"
                align="center"
                width="120"
                prop="status"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span class="notpass_color" v-if="scope.row.status === 1||scope.row.status === 2">未发货</span>
                    <span class="normal_color" v-if="scope.row.status === 3">已发货</span>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                class-name="mallReview_scope">
                <template slot-scope="scope">
                  <div class="mallReview_btm">
                    <el-button type="primary" size="mini" plain>查看货品</el-button>
                    <el-button type="primary" size="mini" plain @click="handleRefund(scope.row)">退款</el-button>
                    <el-button type="primary" size="mini" plain v-if="scope.row.status === 3" @click="handleSeeLogistics(scope.row)">查看物流</el-button>
                    <el-button type="primary" size="mini" plain v-if="scope.row.status === 1||scope.row.status === 2" @click="handleAddLogistics(scope.row)">添加物流</el-button>
                    <el-button type="primary" size="mini" plain @click="handleSeeBusiness(scope.row)">卖家信息</el-button>
                    <el-button type="primary" size="mini" plain @click="handleSeeUser(scope.row)">用户信息</el-button>
                    <el-button type="primary" size="mini" plain @click="handleRemark(scope.row)">备注</el-button>
                    <el-button type="primary" size="mini" plain @click="handleSeeOrderInfo(scope.row)">订单详情</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              v-if="total"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>


    <!--退款弹窗-->
    <el-dialog
      width="470px"
      custom-class="disableDialog"
      :visible.sync="refundVisible">
      <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>退款</span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">退款原因：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="4"
            v-model="reason"
          >
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refundVisible = false">取 消</el-button>
        <el-button type="primary" @click="ensureFund">确 定</el-button>
      </span>
    </el-dialog>
    <!--物流信息弹窗-->
    <el-dialog
      width="470px"
      custom-class="disableDialog"
      :visible.sync="expressVisible">
      <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>物流信息</span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">物流号：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="logisticsN">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">物流公司：</div>
        <div class="disable_dialog_right">
          
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="company">
          </el-input>
        </div>
      </div>
      <div class="express-trace">
        <ul>
          <li v-for="(trace,index) in traces" :key="index">
            <time>{{trace.AcceptTime}}</time>
            <p>{{trace.AcceptStation}}</p>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="expressVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--添加物流弹窗-->
    <el-dialog
      width="470px"
      custom-class="disableDialog"
      :visible.sync="addExpressVisible">
      <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>添加物流</span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">物流号：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="logisticsId">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">物流公司：</div>
        <div class="disable_dialog_right">
          <el-select v-model="logisticsName" filterable placeholder="请选择">
            <el-option
              v-for="(item, index) in expressLists"
              :key="index"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addExpressVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSureAdd">确 定</el-button>
      </span>
    </el-dialog>

    <!--订单详情弹窗-->
    <el-dialog
      width="470px"
      custom-class="disableDialog"
      :visible.sync="detailVisible">
      <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>订单详情</span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">商品ID：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="commodityId">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_detail">
          <el-table
            :data="detailTable"
            border
            style="width: 100%">
            <el-table-column
              prop="quantity"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="total_price"
              label="总计">
            </el-table-column>
            <el-table-column
              prop="price"
              label="单价">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">姓名：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="ReceivingName">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">电话：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="phone">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">收货地址：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="Adrress">
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--用户身份确认弹窗-->
    <el-dialog
      width="470px"
      custom-class="disableDialog"
      :visible.sync="sureUserVisible">
      <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>用户身份确认</span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">用户电话：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="user.phone">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">用户账号：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="user.username">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">身份证：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="user.id_card">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">真实姓名：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="user.actual_name">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">用户ID：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="userId">
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sureUserVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--商家身份确认弹窗-->
    <el-dialog
      width="470px"
      custom-class="disableDialog"
      :visible.sync="sureBusinessVisible">
      <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>商家身份确认</span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">商家电话：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="seller.phone">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">商家账号：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="seller.username">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">身份证：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="seller.id_card">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">姓名：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="seller.actual_name">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">工商全名：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="sellerName">
          </el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">商家ID：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            :rows="1"
            v-model="sellerId">
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sureBusinessVisible = false">关 闭</el-button>
      </span>
    </el-dialog>


    <!--备注弹窗-->
    <el-dialog
      :visible.sync="remarkVisible"
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
              <div class="history_list" v-for="(item,index) in remarkList" :key="index">
                <p class="userName">{{item.create_name}}<span>{{item.created_at}}</span></p>
                <p class="content">{{item.content}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="remarkVisible = false">关 闭</el-button>
          <el-button type="primary" @click="handlePrimary">提 交</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';

  export default {
    name: "NewOrder",
    components: {
      BreadCrumb,
    },
    data() {
      return {
        // 面包屑
        breadData: [{
          id: 1,
          name: '淘货',
          urls: '/index/market/Market',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '淘货订单',
          urls: '/index/market/marketOrder/MarketProduct',
          icon: 'icon-home'
        }, {
          id: 3,
          name: '新订单查询',
          urls: '/index/market/marketOrder/newOrder',
          icon: 'icon-home'
        }],
        contentHeader: null,  // 单选框组
        //搜索
        startTime: null,  // 开始时间
        endTime: null,  // 结束时间
        orderId: null,  // 
        companyName: null,  // 卖家昵称
        cityId:null,
        folderId:null,
        expressLists: [],       // 快递公司列表
        cityList:[],
        city:null,

        tableData:[],
        plateList:[],  //板块

        refundVisible: false,  // 退款框
        reason: '',   // 退款原因

        detailTable: [], // 订单详情数据
        goodsData: {},      // 单个商品数据
        addExpressNumber: '',
        addExpressObCompany: '',


        approve: true,  // 批准按钮
        disable: false,  // 驳回按钮

        expressVisible: false, // 物流信息弹窗
        disableSelect: null,  // 单选框初始值
        addExpressVisible: false, // 添加物流信息弹窗
        detailVisible: false, // 订单详情弹窗
        sureUserVisible: false, // 用户身份确认
        sureBusinessVisible: false, // 商家身份确认
        remarkVisible: false, // 备注弹窗
        approveDialog: false,  // 批准弹窗
        logisticsN:null,
        company:null,
        ReceivingName:null, //收货人姓名
        phone:null,
        Adrress:null,
        commodityId:null,  //商品ID
        order_id: '',   // 订单全局id
        traces: [],     //  物流历史  
        //用户身份确认弹窗
        userId:null, //用户id
        user:{
          phone:null,
          username:null,
          id_card:null,
          actual_name:null,
        },

        //卖家信息
        sellerId:null,
        sellerName:null,
        seller:{
            actual_name:null,
            id_card:null,
            phone:null,
            username:null,
        },
        //  备注弹框
        remarkStr:null,
        remarkList:[],  //历史备注信息
        operationId:null,

        //添加物流
        orderInfo:null,  //订单信息
        logisticsId:null,
        logisticsName:null,

        // 分页
        pageSize:25,
        currentPage:1,
        total:0,
      }
    },
    mounted(){
      this.getOrderList();
      this.getPalteList();
      this.getExpressLists()
    },
    methods:{
      // 分页
      handleCurrentChange(p){
        this.currentPage = p;
        this.getOrderList();
      },
        // 用户退款
        handleRefund (row) {
          // 通过订单id获取订单详情
          const { id, order_id } = row
          this.getDetailGoods(id, order_id)
          this.refundVisible = true
        },
        // 获取快递公司列表
        getExpressLists () {
          this.HttpClient.get('/logisticsList')
            .then(res => {
              const { code, data } = res.data
              if (code === 200) {
                this.expressLists = data 
              }
            })
        },
        // 确认用户退款
        ensureFund () { 
          const data = {
            order_id: this.order_id,
            price: this.goodsData.price,
            reason: this.reason,
            type: 2
          }
          this.HttpClient.post('/refund/admin', data)
            .then(res => {
              const { code, msg } = res.data
              if (code === 200) {
                this.$message.success(msg)
                this.refundVisible = false
              } else {
                this.$message.error(msg)
              }
            })
        },
        // 获取订单详情(单纯的获取订单详情)
        async getDetailGoods (id, order_id) {
          let res = await this.HttpClient.post('/admin/marketOrder/detailGoods', { id })
          let data = await res.data
          // 订单全局id
          this.order_id = order_id
          if (data.code === 200 && data.data) {
            this.goodsData = data.data
          } else {
            this.goodsData = {}
          }
        },
        //提交备注
        handlePrimary(){
            this.HttpClient.post('/admin/remarkLog/create',{
                content:this.remarkStr,
                source_id:this.operationId
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success(res.data.msg)
                    this.remarkVisible = false
                    this.getRemarkList(this.operationId);
                }
            })
        },
        //查看备注
        handleRemark(i){
            console.log(i.order_id)
            this.operationId = i.order_id;
            this.getRemarkList(i.order_id);
            this.remarkVisible = true
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
        //订单详情
        handleSeeOrderInfo(e){
          console.log(e)
            this.HttpClient.post('/admin/marketOrder/detailGoods',{
                id:e.id
            })
            .then(res=>{
                console.log(res)
                this.commodityId = res.data.data.product_id;
                this.phone = res.data.data.telphone;
                this.Adrress = res.data.data.detail;
                this.ReceivingName = res.data.data.conducts;
                this.detailTable.push(res.data.data);
            })
            this.detailVisible = true;
        },
        //查看商家信息
        handleSeeBusiness(i){
            console.log(i)
            this.sellerId = i.uid;
            this.HttpClient.post('/admin/users/info',{
                uid:i.uid
            })
            .then(res=>{
                console.log(res);
                this.seller = res.data.data;
            })
            this.sureBusinessVisible = true;
        },
        //查看用户信息
        handleSeeUser(i){
            console.log(i)
            this.userId = i.created_id
            this.HttpClient.post('/admin/users/info',{
                uid:i.created_id
            })
            .then(res=>{
                console.log(res);
                this.user = res.data.data
            })
            this.sureUserVisible = true;
        },
        //添加物流
        handleAddLogistics(e){
            this.addExpressVisible = true;
            this.orderInfo = e;
        },
        //确认添加物流
        handleSureAdd(){
            this.HttpClient.post('/admin/createLogistics',{
                order_id:this.orderInfo.order_id,
                type:1,
                carrier:this.logisticsName,
                logistics_no:this.logisticsId
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.addExpressVisible = false;
                    this.getOrderList();
                }
            })
        },
        //查看物流
        handleSeeLogistics(e){
            console.log(e)
            this.HttpClient.post('/admin/getLogisticsInfo',{
                logisticcode:e.logistics_no
            })
            .then(res=>{
                // console.log(res)
                if(res.data.code === 200){
                    this.company = res.data.data.ShipperName
                    const { Traces } = res.data.data
                    if (Traces && Traces.length) {
                      this.traces = res.data.data.Traces.reverse()      // 物流历史
                    } else {
                      this.traces = []
                    }
                    this.expressVisible = true;
                } else {
                  this.$message.error(res.data.msg)
                }
            })
            this.logisticsN = e.logistics_no;
        },
        //订单id搜索
        handleSearcha(){
            this.companyName = null;
            this.getOrderList();
        },
        //卖家昵称搜索
        handleSearchb(){
            this.orderId = null;
            this.getOrderList();
        },
        searcha(e){
            console.log(e)
            this.orderId = e;
        },
        searchb(e){
            console.log(e)
            this.companyName = e;
            console.log(this.companyName)
        },
        rr(e){
            console.log(e);
            this.folderId = e;
            this.getOrderList();
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
        handleChangeStartTime(e){
            console.log(this.startTime);
            this.getOrderList();
        },
        handleChangeEndTime(e){
            console.log(this.endTime);
            this.getOrderList();
        },
        tt(e){
            console.log(e)
            this.cityId = e;
            this.getOrderList();
        },
        getOrderList(){
            this.HttpClient.post('/admin/marketOrder/newOrderGoods',{
                start_time:this.startTime,
                end_time:this.endTime,
                title:this.companyName,
                order_id:this.orderId,
                // title:this.title,
                city_id:this.cityId,
                folder:this.folderId,
                page:this.currentPage,
                size:this.pageSize
            })
            .then(res=>{
                console.log(res)
                this.tableData = res.data.data.data;
                this.total = res.data.data.total;
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
        }
        
    }
  }
</script>

<style lang="less">
  .newOrder{
    text-align: left;
    .bread{
      margin: 10px;
    }
    .newOrder_main::-webkit-scrollbar {display:none}
    .newOrder_main {
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

      .content {
        box-sizing: border-box;
        padding: 30px 40px;

        .content_header{
          border-bottom: 1px solid #dedede;
          padding-bottom: 20px;
          margin-bottom: 10px;
          .el-radio{
            text-align: center;
            padding: 0 20px;
            height: 35px;
            line-height: 35px;
            border-radius: unset;
            .el-radio__input{
              display: none;
            }
            .el-radio__label{
              padding: 0;
            }
          }
          .el-radio.is-checked{
            border-color: #15bafe;
            background: #15bafe;
            .el-radio__label{
              color: #fff;
            }
          }
        }

        /*头部*/
        .data_header{
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;

          .data_select{
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
          .data_search{
            display: flex;
            width: 900px;
            align-items: center;
            >div{
              margin-left: 30px;
            }
          }
        }


        /*表格*/
        .content_table {
          margin-top: 20px;
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
                  // background: #577ed6;
                }
              }
            }
          }
        }
      }
    }
  }


  /*弹窗*/
  .disableDialog{
    .disableDialog_title{
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 10px;
      i{
        font-size: 24px;
        color: #15bafe;
        margin-right: 15px;
      }
    }
    .disable_dialog_box:not(:last-child){
      margin-bottom: 20px;
    }
    .disable_dialog_box{
      display: flex;
      align-items: flex-start;
      justify-content: center;

      .disable_dialog_detail{
        margin-left: 40px;
      }
      .disable_dialog_left {
        width: 70px;
      }
      /*单选框*/
      .disable_dialog_right{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 275px;
        /*单选框样式*/
        .el-radio:nth-child(1){
          margin-top: 0;
        }
        .el-radio.is-checked{
          background: #15bafe;
          border-color: #15bafe;
          .el-radio__label{
            color: #fff;
          }
        }
        .el-radio{
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          width: 275px;
          margin: 10px auto;
          .el-radio__input{
            display: none;
          }
          .el-radio__label{
            padding: 0;
          }
        }
      }
    }
    .logisticsList{
      width: 70%;
      margin-left: 45px;
      max-height: 400px;
      overflow-y: auto;
      padding: 10px 20px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
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
  .express-trace {
    padding: 0 20px;
    border: 1px solid #dcdfe6;
    height: 300px;
    overflow: auto;
    ul {
      padding: 20px;
    }
    time {
      color: #15bafe;
    }
    p{
      color:#999;
    }
  }
</style>
