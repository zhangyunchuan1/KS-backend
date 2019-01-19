<template>
  <div class="usermarkGroup">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="userGroup_main">
      <!--标题-->
      <div class="title">
        <p>板块销售情况</p>
      </div>

      <div class="content">
        <div class="content_time">
          <div class="date_item">
            <el-select
              v-model="dateTypeSelect"
              placeholder="请选择"
              size="mini"
              @change="getSalesData"
            >
              <el-option
                v-for="item in dateType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-date-picker
              v-model="dateTime"
              class="date_picker_1"
              :type="dateTypeSelect"
              size="mini"
              :format="dateTypeSelect==='week'?'yyyy 第 WW 周':''"
              @change="getSalesData"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
          <!--<div class="date_item">-->
          <!--<p class="date_label">截止</p>-->
          <!--<el-date-picker-->
          <!--v-model="endTime"-->
          <!--class="date_picker_1"-->
          <!--type="date"-->
          <!--size="mini"-->
          <!--value-format="yyyy-MM-dd HH:mm:ss"-->
          <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
          <!--</div>-->
        </div>

        <div class="shape_content">
          <div class="shape_header">
            <div class="shape_header_left">
              <p class="left_title">用户群体数据曲线图</p>
              <div class="time_range">
                <span>{{startTime.split(' ')[0]}}</span>
                <span>---</span>
                <span>{{endTime.split(' ')[0]}}</span>
              </div>
            </div>
            <div class="shape_header_right">
              <div class="right_items" v-for="item in typeList" :key="item.id">
                <div class="point" :style="{background:item.color}"></div>
                <p>{{item.name}}占{{item.percent}}%</p>
              </div>
            </div>
          </div>
          <div id="myChart" :style="{width:'100%',height: '400px'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import echarts from "echarts";
import moment from "moment";

export default {
  name: "SectorSales",
  components: {
    BreadCrumb
  },
  data() {
    return {
      breadData: [
        {
          id: 1,
          name: "淘货",
          urls: "/index/market/Market",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "销售情况",
          urls: "/index/market/marketSales/MarketSales",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "板块销售情况",
          urls: "/index/market/marketSales/SectorSales",
          icon: "icon-home"
        }
      ],

      dateType: [
        { value: "week", label: "周" },
        { value: "month", label: "月" },
        { value: "year", label: "年" }
      ], // 时间周期
      dateTypeSelect: "week", // 时间周期选择值
      typeList: [], // 类型列表
      dateTime: "", // 时间选择值
      startTime: "", // 开始时间
      endTime: "", // 截止时间
      saleData: [], // 销售数据
      typeData: {} // 类型分类数据
    };
  },

  methods: {
    //绘制数据曲线
    drawLine() {
      let dates = [],
        dateList = [],
        total = 0;
      this.typeList.map(item => {
        item.data = [];
      });
      if (this.dateTypeSelect === "week") {
        dates = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        let yearMonth = moment(this.startTime).format("YYYY-MM"),
          day = moment(this.startTime).date();
        for (let i = 0; i < dates.length; i++) {
          let d = i + day;
          if (d < 10) {
            d = "0" + d;
          }
          dateList.push(yearMonth + "-" + d);
        }

        dateList.map(item => {
          this.typeList.map(type => {
            type.total = 0;
            this.saleData.map(tmp => {
              if (
                tmp.folder_type === type.name &&
                item === tmp.created_at.split(" ")[0]
              ) {
                type.total += tmp.goods_sale;
              }
            });
            type.data.push(type.total);
            total += type.total;
          });
        });
      } else if (this.dateTypeSelect === "month") {
        for (let i = 1; i <= moment(this.endTime).date(); i++) {
          dates.push(i);
        }
        let yearMonth = moment(this.startTime).format("YYYY-MM");
        dates.map(item => {
          if (item < 10) {
            item = "0" + item;
          }
          this.typeList.map(type => {
            type.total = 0;
            this.saleData.map(tmp => {
              if (
                tmp.folder_type === type.name &&
                yearMonth + "-" + item === tmp.created_at.split(" ")[0]
              ) {
                type.total += tmp.goods_sale;
              }
            });
            type.data.push(type.total);
            total += type.total;
          });
        });
      } else {
        dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let year = moment(this.startTime).year();
        dates.map(item => {
          let date = year + "-" + item;
          this.typeList.map(type => {
            type.total = 0;
            this.saleData.map(tmp => {
              if (
                tmp.folder_type === type.name &&
                date === moment(tmp.created_at).format("YYYY-MM")
              ) {
                type.total += tmp.goods_sale;
              }
            });
            type.data.push(type.total);
            total += type.total;
          });
        });
      }
      console.log(total);
      // 图标曲线数据
      let series = [];
      this.typeList.map((item, index) => {
        let seriesItem = {
          itemStyle: {
            normal: {
              color: item.color,
              lineStyle: {
                color: item.color
              }
            }
          },
          name: item.name,
          type: "line",
          smooth: true,
          data: item.data
        };
        series.push(seriesItem);

        //板块占比
        if (total === 0) {
          item.percent = 0;
        } else {
          item.percent = (eval(item.data.join("+")) / total) * 100;
          if (item.percent.toString().indexOf(".") !== -1) {
            item.percent = item.percent.toFixed(2);
          }
        }
        this.$set(this.typeList, index, this.typeList[index]);
      });

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
        series: series
      });
    },
    //获取板块列表
    async getTypeList() {
      await this.HttpClient.post("/admin/menu/getList", {
        menu_type: 2,
        goods: true
      }).then(res => {
        if (res.data.code === 200) {
          this.typeList = Object.values(res.data.data);
        }
      });
    },
    //获取销售数据
    getSalesData() {
      if (this.dateTypeSelect === "week") {
        this.getCurrWeekDays(this.dateTime);
      } else if (this.dateTypeSelect === "month") {
        this.getCurrMonthDays(this.dateTime);
      } else {
        this.getCurrYearDays(this.dateTime);
      }
      this.HttpClient.post("/admin/marketAnalysis/oneField", {
        field: "goods_sale",
        start_time: this.startTime,
        end_time: this.endTime
      }).then(res => {
        if (res.data.code === 200) {
          this.saleData = res.data.data;
          console.log(this.saleData);
          this.drawLine();
        }
      });
    },

    // 获取当前周的开始结束时间
    getCurrWeekDays(d) {
      if (d) {
        let weekOfDay = parseInt(moment(d).format("d")); // 计算今天是这周第几天 周日为一周中的第一天
        this.startTime =
          moment(d)
            .subtract(weekOfDay, "days")
            .format("YYYY-MM-DD") + " 00:00:00"; // 周日日期
        this.endTime =
          moment(d)
            .add(7 - weekOfDay - 1, "days")
            .format("YYYY-MM-DD") + " 23:59:59"; // 周六日期
      } else {
        let weekOfDay = parseInt(moment().format("d")); // 计算今天是这周第几天 周日为一周中的第一天
        this.startTime =
          moment()
            .subtract(weekOfDay, "days")
            .format("YYYY-MM-DD") + " 00:00:00"; // 周日日期
        this.endTime =
          moment()
            .add(7 - weekOfDay - 1, "days")
            .format("YYYY-MM-DD") + " 23:59:59"; // 周六日期
        this.dateTime = moment().format("YYYY-MM-DD");
      }
    },
    // 获取当前月的开始结束时间
    getCurrMonthDays(d) {
      let start =
        moment(d)
          .add("month", 0)
          .format("YYYY-MM") + "-01";
      let end = moment(start)
        .add("month", 1)
        .add("days", -1)
        .format("YYYY-MM-DD");
      this.startTime = start + " 00:00:00";
      this.endTime = end + " 23:59:59";
    },
    //获取当前年开始结束日期
    getCurrYearDays(d) {
      let start = moment(d).year() + "-" + "01" + "-" + "01";
      let end = moment(d).year() + "-" + 12 + "-" + 31;
      this.startTime = start + " 00:00:00";
      this.endTime = end + " 23:59:59";
    }
  },

  async created() {
    await this.getTypeList();
    this.getSalesData();
  }
};
</script>

<style lang="less">
.usermarkGroup {
  text-align: left;
  overflow-y: auto;

  .bread {
    margin: 10px;
  }

  .userGroup_main::-webkit-scrollbar {
    display: none;
  }

  .userGroup_main {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    width: calc(100vw - 240px);
    height: calc(100vh - 100px);
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
      padding: 20px 40px;

      /*筛选时间*/
      .content_time {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .date_item {
          display: flex;
          border: 1px solid #dcdfe6;
          border-radius: 5px;
          margin-right: 20px;
          .el-select {
            width: 60px;
          }
          .el-input__inner {
            border: none !important;
          }
          .date_label {
            color: #808080;
            font-size: 12px;
            height: 28px;
            line-height: 28px;
            margin-left: 10px;
          }
          .date_picker_1 {
            width: 140px;
          }
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
  }
}
</style>
