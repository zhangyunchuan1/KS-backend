<template>
  <div class="mallData">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="mallData_main">
      <!--标题-->
      <div class="title">
        <p>商城订单数据</p>
      </div>

      <div class="mallData_content">
        <!-- 板块选择 -->
        <div class="mallData_chart">
          <el-radio-group v-model="typeValue" size="small" @change="folderChange">
            <el-radio
              :label="item.menu_id"
              border
              v-for="(item,index) in typeList"
              :key="index"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </div>
        <div class="mallData_chart">
          <el-radio-group v-model="onetypeValue" size="small" @change="oneMenuChange">
            <el-radio
              :label="item.menu_id"
              border
              v-for="(item,index) in oneTypelist"
              :key="index"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </div>
        <div class="mallData_chart">
          <el-radio-group v-model="twotypeValue" size="small" @change="twoMenuChange">
            <el-radio
              :label="item.menu_id"
              border
              v-for="(item,index) in twoTypelist"
              :key="index"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </div>
        <div class="mallData_chart">
          <el-radio-group v-model="threetypeValue" size="small" @change="threeMenuChange">
            <el-radio
              :label="item.menu_id"
              border
              v-for="(item,index) in threeTypelist"
              :key="index"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </div>
        <div class="mallData_chart">
          <el-radio-group v-model="producttypeValue" size="small" @change="productMenuChange">
            <el-radio
              :label="item.id"
              border
              v-for="(item,index) in productTypelist"
              :key="index"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </div>
        <!--图表-->
        <div class="mallData_chart">
          <div class="conditions">
            <div class="date_item">
              <p class="date_label">时间起点</p>
              <el-date-picker
                v-model="startTime"
                class="date_picker_1"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                @change="getProductDataByDate"
              ></el-date-picker>
            </div>
            <div class="date_item">
              <p class="date_label">时间终点</p>
              <el-date-picker
                v-model="endTime"
                class="date_picker_1"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                @change="getProductDataByDate"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
            <!-- <el-button icon="el-icon-search">搜索</el-button> -->
          </div>
          <div class="shape_content">
            <div class="shape_header">
              <div class="shape_header_left">
                <p class="left_title">商品数量曲线图</p>
                <div class="time_range">
                  <span>{{startTime?startTime.split(' ')[0]:''}}</span>
                  <span>---</span>
                  <span>{{endTime?endTime.split(' ')[0]:''}}</span>
                </div>
              </div>
              <div class="shape_header_right">
                <div class="right_items">
                  <div class="point color1"></div>
                  <p>汽车占{{carByDate.percent}}%</p>
                </div>
                <div class="right_items">
                  <div class="point color2"></div>
                  <p>摩托车占{{motorByDate.percent}}%</p>
                </div>
                <div class="right_items">
                  <div class="point color3"></div>
                  <p>无人机占{{planeByDate.percent}}%</p>
                </div>
                <div class="right_items">
                  <div class="point color4"></div>
                  <p>智能设备占{{intelligentByDate.percent}}%</p>
                </div>
              </div>
            </div>
            <div id="myChart" :style="{width:'100%',height: '400px'}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import echarts from "echarts";

export default {
  inject: ["reload"],
  name: "MallData",
  components: {
    BreadCrumb
  },
  data() {
    return {
      //时间选择范围限制
      pickerOptions: {
        disabledDate: time => {
          return (
            (time.getTime() - new Date(this.startTime).getTime()) /
              1000 /
              60 /
              60 /
              24 >
            31
          );
        }
      },

      // 面包屑
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
          name: "商品数据",
          urls: "/index/mallOrder/MallOrderData",
          icon: "icon-home"
        }
      ],

      startTime: "", //开始时间段
      endTime: "", //结束时间段
      userType: 0,

      // categoryContent: false,

      productTotal: 0, // 商品总数
      carTotal: {}, // 汽车商品总数
      motorTotal: {}, // 摩托车商品总数
      planeTotal: {}, // 无人机商品总是
      intelligentTotal: {}, // 智能设备商品总数

      /**时间段内数据**/
      productDataByDate: [], // 某时间段内总数据
      carByDate: [], //汽车服务数据
      motorByDate: [], //摩托车服务数据
      planeByDate: [], //无人机服务数据
      intelligentByDate: [], //智能设备服务数据
      productTotalByDate: 0, //某时间段内服务总记录数
      // 板块菜单列表
      typeValue: "", //默认选中的板块类别
      typeList: [], //类型列表
      oneTypelist: [],
      onetypeValue: "",
      twoTypelist: [],
      twotypeValue: "",
      threeTypelist: [],
      threetypeValue: "",
      producttypeValue: "",
      productTypelist: [],
      // 板块类型id
      typeID_1: "",
      typeID_2: "",
      typeID_3: "",
      typeID_4: ""
    };
  },
  methods: {
    // 获取板块列表
    getTypelist() {
      this.HttpClient.post("/shop/menu/getOneChild", {
        isFolder: true
      }).then(res => {
        if (res.data.code == 200) {
          this.typeList = res.data.data;
          console.log(this.typeList);
        }
      });
    },
    folderChange() {
      console.log(this.typeValue);
      this.oneTypelist = [];
      this.twoTypelist = [];
      this.threeTypelist = [];
      this.productTypelist = [];
      this.HttpClient.post("/shop/menu/getOneChild", {
        isFolder: 0,
        menu_id: this.typeValue
      }).then(res => {
        if (res.data.code == 200) {
          this.oneTypelist = res.data.data.child;
        }
      });
    },
    oneMenuChange() {
      this.twoTypelist = [];
      this.threeTypelist = [];
      this.productTypelist = [];
      this.HttpClient.post("/shop/menu/getOneChild", {
        isFolder: 0,
        menu_id: this.onetypeValue
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          this.twoTypelist = res.data.data.child;
        }
      });
    },
    twoMenuChange() {
      this.threeTypelist = [];
      this.productTypelist = [];
      this.HttpClient.post("/shop/menu/getOneChild", {
        isFolder: 0,
        menu_id: this.twotypeValue
      }).then(res => {
        if (res.data.code == 200) {
          this.threeTypelist = res.data.data.child;
        }
      });
    },
    threeMenuChange() {
      this.productTypelist = [];
      this.HttpClient.post("/shop/menu/getOneChild", {
        isFolder: 0,
        last_menu: this.threetypeValue
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          this.productTypelist = res.data.data;
        }
      });
    },
    productMenuChange() {
      console.log(this.producttypeValue);
      this.getProductDataByDate();
    },
    //刷新页面
    refresh() {
      this.reload();
    },
    arrDataFn(color,name,arrData) {
      // var color = "";
      // var name = "";
      // var arrData = [];
      var obj = {
        itemStyle: {
          normal: {
            color: color,
            lineStyle: {
              color: color
            }
          }
        },
        name: name,
        type: "line",
        smooth: true,
        data: arrData
      };
      return obj
    },
    //数据曲线绘制
    drawLine() {
      let days =
        (new Date(this.endTime).getTime() -
          new Date(this.startTime).getTime()) /
        1000 /
        60 /
        60 /
        24;
      let begin = new Date(this.startTime).getDate();
      let year = new Date(this.startTime).getFullYear();
      let month = new Date(this.startTime).getMonth() + 1;
      let dates = [],
        monthDay = 0;
      //获取起始时间月份天数
      switch (month) {
        case 1:
          monthDay = 31;
          break;
        case 2:
          if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
            monthDay = 29;
          } //判断是否闰年
          else {
            monthDay = 28;
          }
          break;
        case 3:
          monthDay = 31;
          break;
        case 4:
          monthDay = 30;
          break;
        case 5:
          monthDay = 31;
          break;
        case 6:
          monthDay = 30;
          break;
        case 7:
          monthDay = 31;
          break;
        case 8:
          monthDay = 31;
          break;
        case 9:
          monthDay = 30;
          break;
        case 10:
          monthDay = 31;
          break;
        case 11:
          monthDay = 30;
          break;
        case 12:
          monthDay = 31;
          break;
      }
      for (let i = 0; i < days; i++) {
        if (begin + i > monthDay) {
          dates.push(begin + i - monthDay);
        } else {
          dates.push(begin + i);
        }
      }
      let car = [],
        motorcycle = [],
        plane = [],
        intelligent = [];
      dates.map(date => {
        let carNum = 0;
        let motorNum = 0;
        let planeNum = 0;
        let intelligentNum = 0;
        date = this.initFormat(date);
        // if (month >= 12) {
        //   year += 1;
        //   month = "01";
        // }
        console.log(month)
        this.carByDate.map(item => {
          if (
            new Date(year + "-" + (month<10?'0' + month:month) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date((month>=12?year+1+'-01':year + "-" + (month<10?'0' + (month+1):month + 1)) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            carNum += parseInt(item.product_order);
          }
        });
        this.motorByDate.map(item => {
          if (
            new Date(year + "-" + (month<10?'0' + month:month) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date((month>=12?year+1+'-01':year + "-" + (month<10?'0' + (month+1):month + 1)) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            motorNum += Number(item.product_order);
          }
        });
        this.planeByDate.map(item => {
          if (
            new Date(year + "-" + (month<10?'0' + month:month) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date((month>=12?year+1+'-01':year + "-" + (month<10?'0' + (month+1):month + 1)) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            planeNum += Number(item.product_order);
          }
        });
        this.intelligentByDate.map(item => {
          if (
            new Date(year + "-" + (month<10?'0' + month:month) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date((month>=12?year+1+'-01':year + "-" + (month<10?'0' + (month+1):month + 1)) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            intelligentNum += Number(item.product_order);
          }
        });
        car.push(carNum);
        motorcycle.push(motorNum);
        plane.push(planeNum);
        intelligent.push(intelligentNum);
      });

      //求和
      this.carByDate.total = eval(car.join("+"));
      this.motorByDate.total = eval(motorcycle.join("+"));
      this.planeByDate.total = eval(plane.join("+"));
      this.intelligentByDate.total = eval(intelligent.join("+"));
      this.productTotalByDate =
        this.carByDate.total +
        this.motorByDate.total +
        this.planeByDate.total +
        this.intelligentByDate.total;
      this.carByDate.percent = Number(
        ((this.carByDate.total / this.productTotalByDate) * 100).toFixed(2)
      );
      this.motorByDate.percent = Number(
        ((this.motorByDate.total / this.productTotalByDate) * 100).toFixed(2)
      );
      this.planeByDate.percent = Number(
        ((this.planeByDate.total / this.productTotalByDate) * 100).toFixed(2)
      );
      this.intelligentByDate.percent = Number(
        (
          (this.intelligentByDate.total / this.productTotalByDate) *
          100
        ).toFixed(2)
      );

      var arr = [];
      // console.log(this.typeValue)
      if (this.typeValue == this.typeID_1) {
          arr.push(this.arrDataFn('#009efb','汽车',car))
        } else if (this.typeValue == this.typeID_2) {
          arr.push(this.arrDataFn('#55ce63','摩托车',motorcycle))
        } else if (this.typeValue == this.typeID_3) {
          arr.push(this.arrDataFn('#ff7676','无人机',plane))
        } else if (this.typeValue == this.typeID_4) {
          arr.push(this.arrDataFn('#FFB82E','智能设备',intelligent))
        } else if(this.typeValue == ''){
          arr.push(this.arrDataFn('#009efb','汽车',car))
          arr.push(this.arrDataFn('#55ce63','摩托车',motorcycle))
          arr.push(this.arrDataFn('#ff7676','无人机',plane))
          arr.push(this.arrDataFn('#FFB82E','智能设备',intelligent))
        }

      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: dates
        },
        yAxis: {
          type: "value"
        },
        series: arr
      });
    },
    //获取某一时间段内商品数据
    getProductDataByDate() {
      this.HttpClient.post("/admin/marketAnalysis/oneField", {
        field: "product_order",
        start_time: this.startTime,
        end_time: this.endTime,
        folder: this.typeValue,
        menu_1: this.onetypeValue,
        menu_2: this.twotypeValue,
        menu_3: this.threetypeValue,
        category_id: this.producttypeValue
      }).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data);
          this.productDataByDate = res.data.data;
          this.carByDate = [];
          this.motorByDate = [];
          this.planeByDate = [];
          this.intelligentByDate = [];
          res.data.data.map(item => {
            if (item.folder_id === "d8b40880-4f1b-441f-9e13-70cd4d940752") {
              this.typeID_1 = item.folder_id;
              this.carByDate.push(item);
            } else if (
              item.folder_id === "9531f0db-33a6-49d9-b631-9ba0f4073a35"
            ) {
              this.typeID_2 = item.folder_id;
              this.motorByDate.push(item);
            } else if (
              item.folder_id === "5d4454d9-5d00-4f40-bf12-b4d534c88dae"
            ) {
              this.typeID_3 = item.folder_id;
              this.planeByDate.push(item);
            } else if (
              item.folder_id === "95c2f607-7879-415b-bb1f-be7ee7e57f64"
            ) {
              this.typeID_4 = item.folder_id;
              this.intelligentByDate.push(item);
            }
          });
          console.log(this.carByDate);
          this.drawLine();
        }
      });
    },
    //获取商品总量
    getProductGross() {
      this.HttpClient.post("/admin/marketAnalysis/oneField", {
        type: "product_sale"
      }).then(res => {
        if (res.data.code === 200) {
          res.data.data.map(item => {
            this.productTotal += Number(item.product_order);
            if (item.folder === "汽车") {
              this.carTotal = item;
            } else if (item.folder === "摩托车") {
              this.motorTotal = item;
            } else if (item.folder === "无人机") {
              this.planeTotal = item;
            } else if (item.folder === "智能设备") {
              this.intelligentTotal = item;
            }
          });
        }
      });
    },

    /*****初始化时间格式*****/
    initFormat(date) {
      if (date < 10) {
        date = "0" + date;
      }
      return date;
    },
    initDateValue(date) {
      let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minutes = date.getMinutes(),
        second = date.getSeconds();
      month = this.initFormat(month);
      day = this.initFormat(day);
      hour = this.initFormat(hour);
      minutes = this.initFormat(minutes);
      second = this.initFormat(second);
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        second
      );
    }
  },
  created() {
    let arr = this.initDateValue(new Date()).split("-");
    // arr[1] = arr[1] - 1;
    console.log(arr[2])
    arr[2] = '01 00:00:00'
    arr.join("-");
    this.startTime = arr.join("-");
    this.endTime = this.initDateValue(new Date());
    console.log(this.startTime)
    console.log(this.endTime)
    this.getProductGross();
    this.getProductDataByDate();
    this.getTypelist();
  }
};
</script>

<style lang="less">
.mallData {
  .bread {
    margin: 10px;
  }
  .mallData_main::-webkit-scrollbar {
    display: none;
  }
  .mallData_main {
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

    .mallData_content {
      text-align: left;
      padding: 0 40px;

      /*数据统计*/
      .mallData_table {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        border-bottom: 1px solid #d6d6d6;
        padding-bottom: 20px;
        margin-bottom: 20px;

        .table_header {
          height: 40px;
          padding: 0 20px;
          background: #15bafe;
          color: #fff;
          margin-right: 20px;
          line-height: 40px;
        }
        .table_list {
          display: flex;
          align-items: center;
          height: 40px;
          border: 1px solid #dedede;
          line-height: 40px;
          box-sizing: border-box;
          font-size: 14px;
          color: #999;
          margin: 10px;
          div {
            height: 100%;
            padding: 0 20px;
          }
          p {
            height: 100%;
            padding: 0 20px;
            border-left: 1px solid #dedede;
          }
        }
      }

      /*图表*/
      .mallData_chart {
        margin-top: 10px;
        .el-radio__input {
          display: none;
        }
        .conditions {
          display: flex;
          margin-top: 20px;
          .date_item {
            display: flex;
            border: 1px solid #dcdfe6;
            border-radius: 5px;
            margin-right: 20px;
            .el-input__inner {
              border: none !important;
            }
            .date_label {
              color: #808080;
              font-size: 12px;
              height: 40px;
              line-height: 40px;
              margin-left: 10px;
            }
            .date_picker_1 {
              width: 140px;
            }
          }
          .select_type {
            width: 120px;
            margin-left: 20px;
          }
        }
        .shape_content {
          min-width: 500px;
          border: 1px solid #f2f2f2;
          margin-top: 20px;
          padding-bottom: 20px;
          .shape_header {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            margin-left: 20px;
            .shape_header_left {
              .left_title {
                font-size: 16px;
                font-weight: 600;
                color: #404040;
                text-align: left;
              }
              .time_range {
                font-size: 12px;
                color: #808080;
                margin-top: 5px;
              }
            }
            .shape_header_right {
              display: flex;
              .right_items {
                display: flex;
                align-items: center;
                margin-right: 15px;
                .point {
                  height: 8px;
                  width: 8px;
                  border-radius: 50%;
                  background: #15bafe;
                }
                p {
                  font-size: 13px;
                  margin-left: 5px;
                }
                .color1 {
                  background: #15bafe;
                }
                .color2 {
                  background: #55ce63;
                }
                .color3 {
                  background: #ff5858;
                }
                .color4 {
                  background: #ffb82e;
                }
              }
            }
          }
        }
      }

      /*数据详情*/
      .mallData_category {
        margin-top: 30px;

        .category_box {
          display: flex;
          align-items: center;
          background: #fff;
          height: 80px;
          border: 1px solid #f2f2f2;
          margin-top: 20px;
          width: 540px;

          /*进度条*/
          .category_box_left {
            display: flex;
            align-items: center;
            width: 360px;
            padding: 10px 20px;

            .icon-qiche {
              font-size: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 60px;
              height: 60px;
              border-radius: 50%;
              background: #15bafe;
              color: #fff;
              margin-right: 20px;
            }
            .category_box_line {
              width: 100%;
              display: flex;
              flex: 1;
              align-items: center;

              .category_line_main {
                flex: 1;
                p {
                  font-size: 19px;
                  color: #222;
                  margin-bottom: 10px;
                  span {
                    font-size: 16px;
                    color: #999;
                  }
                }
              }
              .category_line_nmb {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100px;
                font-size: 32px;
                color: #2f323e;
              }
            }
          }

          /*按钮*/
          .category_box_btm {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
            height: 100%;
            cursor: pointer;
            border-left: 1px solid #f2f2f2;
            color: #666666;
            font-size: 16px;

            i {
              margin-left: 10px;
              font-size: 24px;
              color: #666666;
            }
          }
        }

        .category_content {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .category_list {
            width: 25%;
            border: 1px solid #f2f2f2;
            background: #fff;
            padding: 20px 40px;
            box-sizing: border-box;
            .category_list_text {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
