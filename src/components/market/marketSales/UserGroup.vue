<template>
  <div class="sectorSales">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="sectorSales_main">
      <!--标题-->
      <div class="title">
        <p>用户群体数据</p>
      </div>

      <div class="content">
        <div class="content_header">
          <el-radio-group v-model="contentHeader" @change="getProvince">
            <el-radio border :label="0">全部</el-radio>
            <el-radio
              border
              :label="item.menu_id"
              v-for="item in typeList"
              :key="item.id"
            >{{item.name}}</el-radio>
          </el-radio-group>

          <div class="content_time">
            <div class="date_item">
              <el-select
                v-model="dateTypeSelect"
                placeholder="请选择"
                size="mini"
                @change="getProvince"
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
                @change="getProvince"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
          </div>
        </div>

        <div class="content_charts">
          <div class="charts_left">
            <div :style="{height:'462px',width:'100%'}" ref="myEchart" id="myEchart"></div>
          </div>

          <div class="charts_right">
            <div class="shape_content">
              <div class="shape_header">
                <div class="shape_header_left">
                  <p class="left_title">用户群体数据 - {{cityName}}</p>
                  <div class="time_range">
                    <span>{{startTime.split(' ')[0]}}</span>
                    <span>---</span>
                    <span>{{endTime.split(' ')[0]}}</span>
                  </div>
                </div>
                <div class="shape_header_right">
                  <div class="right_items" v-for="item in typeData" :key="item.menu_id">
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
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import moment from "moment";
import echarts from "echarts";
import "echarts/map/js/china.js";

export default {
  name: "UserGroup",
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
          name: "用户群体数据",
          urls: "/index/market/marketSales/UserGroup",
          icon: "icon-home"
        }
      ],

      typeList: [], // 类型列表
      contentHeader: 0,
      dateTypeSelect: "week", // 时间周期选择值
      dateType: [
        { value: "week", label: "周" },
        { value: "month", label: "月" },
        { value: "year", label: "年" }
      ], // 时间周期
      dateTime: "", // 时间选择值
      startTime: "", // 开始时间
      endTime: "", // 截止时间
      province: [], // 省份数据
      cityId: "", // 城市id,
      cityName: "", // 城市名称
      saleData: [], // 销售数据
      typeData: [] // 折线图类型标识
    };
  },

  methods: {
    //绘制中国地图
    drawMap() {
      // this.province.map(item=>{
      //     if(item.id===32){
      //     console.log(item)
      //         item.selected=true;
      //         // item.value=100
      //     }
      // });
      // console.log(this.province);
      let myChart = echarts.init(document.getElementById("myEchart")); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      myChart.setOption({
        // 进行相关配置
        backgroundColor: "rgba(204,204,204,.2)",
        tooltip: {}, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: false,
          min: 0,
          max: 100,
          text: ["High", "Low"],
          realtime: true,
          calculable: true,
          color: ["orangered", "yellow", "lightskyblue"] //上色范围
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          roam: true,
          selectedMode: "single",
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: "rgba(0,0,0,0.4)"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)" //区块的边框颜色
              // color:'#15bafe',// 地图背景颜色
              // areaStyle:{color:'#f60'}
            },
            emphasis: {
              //鼠标hover样式
              areaColor: "#fff",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo" // 对应上方配置
          },
          {
            name: "销售数据", // 浮动框的标题
            type: "map",
            geoIndex: 0,
            data: this.province
          }
        ]
      });

      //点击事件
      myChart.on("click", param => {
        // console.log(param.data.id);
        // console.log(param);
        this.cityId = param.data.id;
        this.cityName = param.data.name;
        myChart.dispatchAction({
          type: "geoSelect",
          name: this.cityName
        });
        this.getSalesByCity();
      });
    },
    //数据曲线绘制
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
        console.log(this.typeList)
        dateList.map(item => {
          this.typeList.map(type => {
            type.total = 0;
            // console.log(this.saleData)
            this.saleData.map(tmp => {
              if (
                tmp.category_id === type.menu_id &&
                item === tmp.created_at.split(" ")[0]
              ) {
                type.total += tmp.num;
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
                tmp.category_id === type.menu_id &&
                yearMonth + "-" + item === tmp.created_at.split(" ")[0]
              ) {
                type.total += tmp.num;
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
                tmp.category_id === type.menu_id &&
                date === moment(tmp.created_at).format("YYYY-MM")
              ) {
                type.total += tmp.num;
              }
            });
            type.data.push(type.total);
            total += type.total;
          });
        });
      }
      // console.log(total);
      // 图标曲线数据
      let series = [];
      this.typeData = [];
      console.log(this.typeList)
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
        if (this.contentHeader === item.menu_id) {
          series.push(seriesItem);
          this.typeData.push(item);
        } else if (this.contentHeader === 0) {
          series.push(seriesItem);
          this.typeData.push(item);
        }
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
      console.log(series);

      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      myChart.clear();
      //绘制图表
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
          // console.log(this.typeList);
        }
      });
    },
    //获取省份数据
    async getProvince() {
      if (this.dateTypeSelect === "week") {
        this.getCurrWeekDays(this.dateTime);
      } else if (this.dateTypeSelect === "month") {
        this.getCurrMonthDays(this.dateTime);
      } else {
        this.getCurrYearDays(this.dateTime);
      }
      let parameters = {
        type: 2,
        start_time: this.startTime,
        end_time: this.endTime
      };
      if (this.contentHeader !== 0) {
        parameters.menu_id = this.contentHeader;
      }
      await this.HttpClient.post(
        "/admin/address/orderDistributionMap",
        parameters
      ).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          this.province = res.data.data;
          this.drawMap();
          console.log(this.province);
        }
      });
    },
    //获取城市销售数据
    getSalesByCity() {
      if (this.dateTypeSelect === "week") {
        this.getCurrWeekDays(this.dateTime);
      } else if (this.dateTypeSelect === "month") {
        this.getCurrMonthDays(this.dateTime);
      } else {
        this.getCurrYearDays(this.dateTime);
      }
      let parameters = {
        city_id: this.cityId,
        type: "goods",
        start_time: this.startTime,
        end_time: this.endTime
      };
      if (this.contentHeader !== 0) {
        parameters.category_id = this.contentHeader;
      }
      this.HttpClient.post("/admin/address/orderCity", parameters).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          console.log(res.data.data);
          this.saleData = res.data.data;
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
      // console.log(this.startTime, this.endTime);
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
      // console.log(start, end);
    }
  },
  async mounted() {
    await this.getTypeList();
    await this.getProvince();
    this.cityId = 32;
    this.cityName = "重庆";
    this.getSalesByCity();
    let myChart = echarts.init(document.getElementById("myEchart"));
    myChart.dispatchAction({
      type: "geoSelect",
      name: "重庆"
    });
  }
};
</script>

<style lang="less">
.sectorSales {
  text-align: left;
  overflow-y: auto;

  .bread {
    margin: 10px;
  }
  .sectorSales_main::-webkit-scrollbar {
    display: none;
  }

  .sectorSales_main {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    width: calc(100vw - 240px);
    height: calc(100vh - 110px);
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
            border-color: #606266;
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
        .content_time {
          margin-top: 20px;
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
      }

      .content_charts {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        /*左侧图表*/
        .charts_left {
          flex: 1;
        }

        /*右侧图表*/
        .charts_right {
          box-sizing: border-box;
          flex: 1;
          border: 1px solid #dedede;
          margin-left: 100px;

          .shape_content {
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
                width: 47%;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-end;
                .right_items {
                  width: 45%;
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
  }
}
</style>
