<template>
  <div class="mallReview">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="mallReview_main">
      <!--标题-->
      <div class="title">
        <p>新订单查询</p>
      </div>

      <div class="mallReview_select">
        <el-radio-group v-model="mallReviewSelect" @change="chengePlate">
          <el-radio border label>全部</el-radio>
          <el-radio
            border
            :label="item.menu_id"
            v-for="item in mallReviewList"
            :key="item.id"
          >{{item.name}}</el-radio>
        </el-radio-group>
        <!-- <el-radio-group v-model="mallReviewSelect">
            <el-radio border v-for="item in mallReviewList" @change="chengePlate" :key="item" :label="item">{{item}}</el-radio>
        </el-radio-group>-->
      </div>

      <div class="mallReview_header">
        <div class="mallReview_search">
          <div class="search_date">
            <el-date-picker
              @change="search"
              v-model="searchObj.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div>
            <el-cascader clearable :options="cityList" v-model="searchObj.city" @change="cityChangeFn"></el-cascader>
          </div>
          <div>
            <el-input
              placeholder="订单ID搜索"
              v-model="searchObj.merchantSearch"
              class="input-with-select"
            >
              <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div>
            <el-input placeholder="订单状态选择" v-model="searchObj.status" class="input-with-select">
              <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div>
            <el-input placeholder="商品名称搜索" v-model="searchObj.name" class="input-with-select">
              <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div>
            <el-input placeholder="公司名称搜索" v-model="searchObj.company" class="input-with-select">
              <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
      </div>

      <div class="mallReview_content_box" style="width: 80%">
        <el-table :data="tableData" :border="true" style="width: 100%">
          <el-table-column label="订单ID" align="center" width="100" prop="id" show-overflow-tooltip sortable></el-table-column>

          <el-table-column label="商品名称" align="center" width="160" prop="title" show-overflow-tooltip></el-table-column>

          <el-table-column label="公司名称" align="center" width="200" prop="company_name" show-overflow-tooltip></el-table-column>

          <el-table-column label="订单时间" align="center" width="200" sortable prop="created_at" show-overflow-tooltip></el-table-column>

          <el-table-column label="目的城市" align="center" width="120" prop="city_name" show-overflow-tooltip></el-table-column>

          <el-table-column
            label="订单状态"
            align="center"
            show-overflow-tooltip
            :filters="[{text: '未付款', value: 1}, {text: '已付款未发货', value: 2},{text: '已发货未收货', value: 3},{text: '已收货', value: 4},{text: '已打款', value: 5},{text: '失效', value: 7}]"
            :filter-method="filterSecondary"
            width="120"
            prop="status"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1" class="audit_color">未付款</span>
            <span v-if="scope.row.status == 2">已付款未发货</span>
            <span v-if="scope.row.status == 3">已发货未收货</span>
            <span v-if="scope.row.status == 4">已收货</span>
            <span v-if="scope.row.status == 5">已打款</span>
            <span v-if="scope.row.status == 7">失效</span>
            <!-- <span>{{scope.row.status == 1?'未付款':scope.row.status == 2?'已付款未发货':scope.row.status == 3?'已发货未收货':scope.row.status == 4?'已收货':scope.row.status == 5?'已打款':scope.row.status==7?'失效':''}}</span> -->
          </template>
          </el-table-column>

          <el-table-column label="操作" align="center" fixed="right" class-name="mallReview_scope">
            <template slot-scope="scope">
              <div class="mallReview_btm">
                <el-button size="medium " type="text" @click="checkProductionModal(scope.row)">查看商品</el-button>
                <el-button size="medium " type="text" @click="refundModal(scope.row)">退款</el-button>
                <el-button
                  size="medium "
                  type="text"
                  @click="checkExpressModal(scope.row)"
                  v-if="scope.row.status == 4"
                >查看物流</el-button>
                <el-button
                  size="medium "
                  type="text"
                  @click="addExpressModal(scope.row)"
                  v-if="scope.row.status == 2"
                >添加物流</el-button>
                <el-button size="medium " type="text" @click="businessInfoModal(scope.row)">商家信息</el-button>
                <el-button size="medium " type="text" @click="userInfoModal(scope.row)">用户信息</el-button>
                <el-button size="medium " type="text" @click="remarkModal(scope.row)">备注</el-button>
                <el-button size="medium " type="text" @click="orderDetailModal(scope.row)">订单详情</el-button>
              </div>
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

    <!--退款弹窗-->
    <el-dialog width="470px" custom-class="disableDialog" :visible.sync="refundVisible">
      <span slot="title" class="disableDialog_title">
        <i class="iconfont icon-jinyong"></i>退款
      </span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">退款原因：</div>
        <div class="disable_dialog_right">
          <el-input v-model="refunReason" type="textarea" resize="none" :rows="4"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refundVisible = false">取 消</el-button>
        <el-button type="primary" @click="refunFn">确 定</el-button>
      </span>
    </el-dialog>

    <!--物流信息弹窗-->
    <el-dialog width="470px" custom-class="disableDialog" :visible.sync="expressVisible">
      <span slot="title" class="disableDialog_title">
        <i class="iconfont icon-wuliuxinxi"></i>物流信息
      </span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">物流号：</div>
        <div class="disable_dialog_right" v-if="expressObj">
          <el-input type="textarea" resize="none" readonly :rows="1">{{expressObj.LogisticCode}}</el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">物流公司：</div>
        <div class="disable_dialog_right" v-if="expressObj">
          <el-input type="textarea" resize="none" readonly :rows="1">{{expressObj.ShipperCode}}</el-input>
        </div>
      </div>
      <div class="logisticsList" v-for="track in expressObj.Traces" :key="track">
        <p>{{track.AcceptStation}}</p>
        <span>{{track.AcceptTime}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="expressVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--添加物流弹窗-->
    <el-dialog width="470px" custom-class="disableDialog" :visible.sync="addExpressVisible">
      <span slot="title" class="disableDialog_title">
        <i class="iconfont icon-jinyong"></i>添加物流
      </span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">物流号：</div>
        <div class="disable_dialog_right">
          <el-input v-model="addExpressObj.number" type="textarea" resize="none" :rows="1"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">物流公司：</div>
        <div class="disable_dialog_right">
          <el-select v-model="addExpressObj.company" placeholder="请选择">
            <el-option
              v-for="item in addExpressCompany"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addExpressVisible = false">取 消</el-button>
        <el-button type="primary" @click="addExpress">确 定</el-button>
      </span>
    </el-dialog>

    <!--订单详情弹窗-->
    <el-dialog width="470px" custom-class="disableDialog" :visible.sync="detailVisible">
      <span slot="title" class="disableDialog_title">
        <i class="iconfont icon-jinyong"></i>订单详情
      </span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">商品ID：</div>
        <div class="disable_dialog_right">
          <el-input v-model="detailObj.product_id" type="textarea" resize="none" readonly :rows="1"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_detail">
          <el-table :data="detailTable" border style="width: 100%">
            <el-table-column prop="num" label="数量"></el-table-column>
            <el-table-column prop="totalPrice" label="总计"></el-table-column>
            <el-table-column prop="price" label="单价"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">姓名：</div>
        <div class="disable_dialog_right">
          <el-input v-model="detailObj.conducts" type="textarea" resize="none" readonly :rows="1"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">电话：</div>
        <div class="disable_dialog_right">
          <el-input v-model="detailObj.telphone" readonly type="textarea" resize="none" :rows="1"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">收货地址：</div>
        <div class="disable_dialog_right">
          <el-input v-model="detailObj.detail" readonly type="textarea" resize="none" :rows="1"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--用户身份确认弹窗-->
    <el-dialog width="470px" custom-class="disableDialog" :visible.sync="sureUserVisible">
      <span slot="title" class="disableDialog_title">
        <i class="iconfont icon-jinyong"></i>用户身份确认
      </span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">用户电话：</div>
        <div class="disable_dialog_right">
          <el-input type="textarea" resize="none" readonly :rows="1" v-model="userInfoObj.phone"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">用户账号：</div>
        <div class="disable_dialog_right">
          <el-input type="textarea" resize="none" readonly :rows="1" v-model="userInfoObj.username"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">身份证：</div>
        <div class="disable_dialog_right">
          <el-input type="textarea" resize="none" readonly :rows="1" v-model="userInfoObj.id_card"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">真实姓名：</div>
        <div class="disable_dialog_right">
          <el-input type="textarea" resize="none" readonly :rows="1" v-model="userInfoObj.actual_name"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">用户ID：</div>
        <div class="disable_dialog_right">
          <el-input type="textarea" resize="none" readonly :rows="2" v-model="modifyObj.created_id"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sureUserVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--商家身份确认弹窗-->
    <el-dialog width="470px" custom-class="disableDialog" :visible.sync="sureBusinessVisible">
      <span slot="title" class="disableDialog_title">
        <i class="iconfont icon-jinyong"></i>商家身份确认
      </span>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">商家电话：</div>
        <div class="disable_dialog_right">
          <el-input type="textarea" resize="none" readonly :rows="1" v-model="businessInfoObj.phone"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">商家账号：</div>
        <div class="disable_dialog_right">
          <el-input type="textarea" resize="none" readonly :rows="1" v-model="businessInfoObj.username"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">姓名：</div>
        <div class="disable_dialog_right">
          <el-input type="textarea" resize="none" readonly :rows="1" v-model="businessInfoObj.contacts"></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">工商全名：</div>
        <div class="disable_dialog_right">
          <el-input
            type="textarea"
            resize="none"
            readonly
            :rows="1"
             v-model="businessInfoObj.company_name"
          ></el-input>
        </div>
      </div>
      <div class="disable_dialog_box">
        <div class="disable_dialog_left">商家ID：</div>
        <div class="disable_dialog_right">
          <el-input type="textarea" resize="none" readonly :rows="1" v-model="modifyObj.id"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sureBusinessVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--备注弹窗-->
    <el-dialog :visible.sync="remarkVisible" width="470px" custom-class="RemarksDialog">
      <span slot="title" class="RemarksDialog_title">
        <i class="iconfont icon-edit-square"></i>备注
      </span>
      <div class="RemarksDialog_main">
        <div class="main_content">
          <div class="main_content_list">
            <div class="title">添加备注</div>
            <el-input type="textarea" :rows="4" resize="none" v-model="remarkStr"></el-input>
          </div>

          <div class="main_content_history">
            <div class="title">历史</div>
            <div class="history_box">
              <div class="history_list" v-for="item in remarkList" :key="item">
                <p class="userName">
                  {{item.create_name}}
                  <span>{{item.created_at}}</span>
                </p>
                <p class="content">{{item.content}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="remarkVisible = false">关 闭</el-button>
        <el-button type="primary" @click="remark">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import DeleteModal from "@/components/public/modalDelete";
import Tools from "@/utils/tools.js";
let tools = new Tools();

export default {
  name: "MallReview",
  components: {
    BreadCrumb,
    DeleteModal
  },
  data() {
    return {
      breadData: [
        {
          id: 1,
          name: "商城",
          urls: "/index/mall/mall/Mall",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "商城订单",
          urls: "/index/mallOrder/MallOrder",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "新订单查询",
          urls: "/index/mallOrder/NewOrderInquiry",
          icon: "icon-home"
        }
      ],

      mallReviewSelect: "", // 单选框组
      mallReviewList: [], // 模块列表
      searchObj: {}, // 搜索对象
      productSearch: "", //产品名称搜索
      total: 0, // 总条数
      pageSize: 25, // 每页条数
      currentPage: 1, // 当前页
      detailTable: [], // 订单详情数据
      detailObj: {}, // 订单详情对象
      tableData: [], // 表格
      expressObj: {}, // 物流对象
      modifyObj: {}, // 操作对象
      businessInfoObj: {}, // 商家信息对象
      userInfoObj: {}, // 用户信息对象
      refundVisible: false, // 退款弹窗
      expressVisible: false, // 物流信息弹窗
      disableSelect: null, // 单选框初始值
      addExpressVisible: false, // 添加物流信息弹窗
      detailVisible: false, // 订单详情弹窗
      sureUserVisible: false, // 用户身份确认
      sureBusinessVisible: false, // 商家身份确认
      remarkVisible: false, // 备注弹窗
      remarkStr: null,
      remarkList: [], // 备注列表
      cityList: [], // 城市列表
      addExpressObj: {}, // 添加物流对象
      refunReason: "", //退款原因
      companyValue:'',//物流公司
      addExpressCompany:[],//添加物流公司
    };
  },
  created() {
    this.getTableList(null);
    this.getCityList();
    this.getTypeList();
  },
  methods: {
    //获取板块列表
    getTypeList() {
      this.HttpClient.post("/admin/menu/getList", { menu_type: 1 }).then(
        res => {
          console.log(res);
          if (res.data.code === 200) {
            this.mallReviewList = Object.values(res.data.data);
          }
        }
      );
    },
    async getCityList() {
      let res = await this.HttpClient.get("/city/getAllCities");
      this.cityList = dealWithCity(res.data.data);
    },
    async getTableList(param) {
      let params = {
        page: this.currentPage,
        folder: this.mallReviewSelect,
      };
      if (param) {
        params["order_id"] = param.merchantSearch;
        params["admin_status"] = param.status;
        params["title"] = param.name;
        params["company_name"] = param.company;
        if (param.date && param.date.length > 0) {
          params["start_time"] = param.date[0];
          params["end_time"] = param.date[1];
        }
        if (param.city && param.city.length > 0) {
          params["city_id"] = param.city[param.city.length - 1];
        }
      }
      let res = await this.HttpClient.post(
        "/admin/marketOrder/newOrder",
        params
      );
      console.log(res.data.data);
      this.tableData = dealWithTable(res.data.data.data);
      this.total = res.data.data.total;
    },
    async addExpress() {
      let res = await this.HttpClient.post("/admin/createLogistics", {
        order_id: this.modifyObj.order_id,
        type: 2,
        carrier: this.addExpressObj.company,
        logistics_no: this.addExpressObj.number
      });
      tools.getApiMessage(res);
      if (res.data.code == "200") this.addExpressVisible = false;
    },
    search() {
      this.getTableList(this.searchObj);
    },
    // 城市搜索
    cityChangeFn(){
      this.getTableList(this.searchObj);
    },
    chengePlate(name) {
      console.log(this.mallReviewSelect);
      this.search();
    },
    async currentChange(page) {
      this.currentPage = page;
      this.search();
    },
    // 订单详情弹窗
    async orderDetailModal(modifyObj) {
      this.modifyObj = modifyObj;
      this.detailVisible = true;
      // 初始化详情表格
      this.detailTable = [];
      let res = await this.HttpClient.post("/admin/marketOrder/detail", {
        id: this.modifyObj.id
      });
      if (res.data.code == "200") {
        this.detailObj = res.data.data;
        console.log(res.data.data);
        this.detailTable = [
          {
            num: this.detailObj.quantity,
            totalPrice: this.detailObj.total_price,
            price: this.detailObj.price
          }
        ];
      }
    },
    // 备注弹窗
    async remarkModal(modifyObj) {
      this.modifyObj = modifyObj;
      this.remarkVisible = true;
      // 初始化备注信息
      this.remarkStr = "";
      let res = await this.HttpClient.post("/admin/remarkLog/lists", {
        source_id: this.modifyObj.order_id
      });
      this.remarkList = res.data.data;
    },
    async remark() {
      let res = await this.HttpClient.post("/admin/remarkLog/create", {
        content: this.remarkStr,
        source_id: this.modifyObj.order_id
      });
      tools.getApiMessage(res);
      if (res.data.code == "200") {
        this.remarkVisible = false;
        this.search();
      }
    },
    // 用户信息弹窗
    userInfoModal(modifyObj) {
      this.modifyObj = modifyObj;
      this.sureUserVisible = true;
      this.HttpClient.post("/admin/users/info", {
        uid: this.modifyObj.created_id
      }).then(res => {
        if (res.data.code == 200) this.userInfoObj = res.data.data;
      }); 
      // console.log(res.data.data);
      console.log(this.userInfoObj)
    },
    // 商家信息弹窗
    businessInfoModal(modifyObj) {
      this.modifyObj = modifyObj;
      // this.sureBusinessVisible = true;
      this.HttpClient.post("/admin/users/info", {
        uid: this.modifyObj.company_id
      }).then(res => {
        // console.log(res.data.data);
        if (res.data.code == 200) this.businessInfoObj = res.data.data;  
        this.sureBusinessVisible = true;  
        console.log(this.businessInfoObj)
      }); 
    },
    // 添加物流
    addExpressModal(modifyObj) {
      this.modifyObj = modifyObj;
      this.addExpressVisible = true;
      this.HttpClient.get("/logisticsList").then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          this.addExpressCompany = res.data.data;
        }
      });
    },
    // 查看物流弹窗
    async checkExpressModal(modifyObj) {
      this.modifyObj = modifyObj;
      this.expressVisible = true;
      let res = await this.HttpClient.post("/web/user/getLogisticsInfo", {
        logisticcode: this.modifyObj.logistics_no
      });
      if (res.data.code == "200") this.expressObj = res.data.data;
    },
    // 退款弹窗
    refundModal(modifyObj) {
      this.modifyObj = modifyObj;
      this.refundVisible = true;
    },
    // 确定退款
    refunFn() {
      console.log(this.modifyObj);
      let params = {
        order_id: this.modifyObj.order_id,
        price: this.modifyObj.price,
        reason: this.refunReason,
        type: 1
      };
      this.HttpClient.post("/refund/admin", params).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          console.log(res.data.data);
          this.refundVisible = false;
          this.refunReason = "";
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    // 商品查看弹窗
    checkProductionModal(modifyObj) {
      // 跳转到商城页面查看商品
      window.open(
        "http://frontend.kslab.com/home/productDetail?" + modifyObj.product_id,
        "_black"
      );
    },
    filterSecondary(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  }
};

// 表格数据处理
function dealWithTable(table) {
  if (table && table.length > 0) {
    for (let i in table) {
      if (table[i].status == "1" || table[i].status == "2") {
        table[i].state = "未发货";
      } else if (
        table[i].status == "4" ||
        table[i].status == "5" ||
        table[i].status == "6"
      ) {
        table[i].state = "已发货";
      }
    }
  }
  return table;
}

// 城市列表转换为element对应数据格式
function dealWithCity(cityList) {
  if (cityList && cityList.length > 0) {
    for (let i in cityList) {
      cityList[i].value = cityList[i].id;
      cityList[i].label = cityList[i].name;
      if (cityList[i].child && cityList[i].child.length > 0) {
        cityList[i]["children"] = dealWithCity(cityList[i].child);
      }
    }
  }
  return cityList;
}
</script>

<style lang="less">
.mallReview {
  text-align: left;
  .bread {
    margin: 10px;
  }
  .mallReview_main::-webkit-scrollbar {
    display: none;
  }
  .mallReview_main {
    background: white;
    margin: 10px 10px 0 10px;
    height: calc(100vh - 150px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    padding-bottom: 50px;
    overflow-y: auto;

    /*标题*/
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 40px;
      margin-bottom: 30px;
      border-bottom: 1px solid #dedede;
    }

    /*单选框组*/
    .mallReview_select {
      padding-bottom: 20px;
      margin: 0 40px 20px 40px;
      border-bottom: 1px solid #dedede;
      .el-radio.is-checked {
        background: #15bafe;
        border: none;
        .el-radio__label {
          color: #fff;
        }
      }
      .el-radio {
        padding: 0 20px;
        text-align: center;
        line-height: 30px;
        height: 30px;
        border-radius: unset;
        .el-radio__input {
          display: none;
        }
        .el-radio__label {
          padding: 0;
        }
      }
    }

    /*查看物流弹窗*/
    .logisticsDialog {
      .el-dialog__body {
        padding-top: 0;
      }
      .logisticsDialog_title {
        display: flex;
        align-items: center;
        i {
          font-size: 24px;
          color: #15bafe;
          margin-right: 15px;
        }
      }
      .logisticsDialog_main {
        .title {
          font-size: 14px;
          margin-bottom: 15px;
          p {
            height: 40px;
            line-height: 40px;
            border: 1px solid #dedede;
            border-radius: 4px;
            margin-top: 5px;
            text-align: center;
          }
        }
        .main_content {
          box-sizing: border-box;
          border: 1px solid #dedede;
          padding: 15px;
          height: 400px;
          overflow: auto;
          border-radius: 4px;
          .logisticsList {
            margin-bottom: 10px;
            p {
              margin-bottom: 5px;
            }
            p:before {
              content: "";
              display: inline-block;
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background: #000;
              margin-right: 10px;
              position: relative;
              top: -2px;
            }

            span {
              display: inline-block;
              font-size: 14px;
              color: #999;
            }
          }
        }
      }
    }

    /*头部*/
    .mallReview_header {
      box-sizing: border-box;
      padding: 0 40px 30px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      /*搜索框*/
      .mallReview_search {
        display: flex;
        align-items: center;
        > div {
          margin-right: 30px;
        }
        .el-input-group {
          line-height: normal;
          display: inline-table;
          width: 80%;
          border-collapse: separate;
          border-spacing: 0;
        }
        .search_date {
          display: inherit;
          .el-date-editor--daterange.el-input,
          .el-date-editor--daterange.el-input__inner,
          .el-date-editor--timerange.el-input,
          .el-date-editor--timerange.el-input__inner {
            width: 280px;
          }
        }
      }
    }

    /*表格*/
    .mallReview_content_box {
      box-sizing: border-box;
      padding: 0 40px;
      .el-table {
        thead {
          color: #fff;
          th,
          tr {
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
            .el-button {
              border: none;
              background: transparent;
            }
          }
        }
      }
    }
  }
}

/*弹窗*/
.disableDialog {
  .disableDialog_title {
    display: flex;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
    i {
      margin-right: 10px;
    }
  }
  .disable_dialog_box:not(:last-child) {
    margin-bottom: 20px;
  }
  .disable_dialog_box {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .disable_dialog_detail {
      margin-left: 40px;
    }
    .disable_dialog_left {
      width: 70px;
    }
    /*单选框*/
    .disable_dialog_right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 275px;
      /*单选框样式*/
      .el-radio:nth-child(1) {
        margin-top: 0;
      }
      .el-radio.is-checked {
        background: #15bafe;
        border-color: #15bafe;
        .el-radio__label {
          color: #fff;
        }
      }
      .el-radio {
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 275px;
        margin: 10px auto;
        .el-radio__input {
          display: none;
        }
        .el-radio__label {
          padding: 0;
        }
      }
    }
  }
  .logisticsList {
    width: 70%;
    margin-left: 45px;
    max-height: 400px;
    overflow-y: auto;
    padding: 10px 20px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-bottom: 10px;
    p {
      margin-bottom: 5px;
    }
    p:before {
      content: "";
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #000;
      margin-right: 10px;
      position: relative;
      top: -2px;
    }

    span {
      display: inline-block;
      font-size: 14px;
      color: #999;
    }
  }
}

/*备注弹窗*/
.RemarksDialog {
  .el-dialog__body {
    padding-top: 0;
  }
  .RemarksDialog_title {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      color: #15bafe;
      margin-right: 15px;
    }
  }
  .RemarksDialog_main {
    .main_content {
      box-sizing: border-box;
      .main_content_list {
        margin-bottom: 20px;
        .title {
          margin-bottom: 10px;
        }
      }
      .main_content_history {
        .title {
          margin-bottom: 10px;
          border-bottom: 1px solid #dedede;
          padding-bottom: 10px;
        }
        .history_box {
          box-sizing: border-box;
          padding: 20px 20px 20px 20px;
          height: 300px;
          overflow: auto;
          border: 1px solid #dedede;
          .history_list:not(:last-child) {
            margin-bottom: 15px;
          }
          .history_list {
            .userName:before {
              content: "";
              width: 5px;
              height: 5px;
              display: inline-block;
              background: #15bafe;
              border-radius: 50%;
              margin-right: 15px;
            }
            .userName {
              margin-bottom: 10px;
              color: #222;
              span {
                font-size: 12px;
                color: #15bafe;
                margin-left: 10px;
              }
            }
            .content {
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
