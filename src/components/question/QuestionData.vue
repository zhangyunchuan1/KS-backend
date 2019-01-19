<template>
  <div class="questionData">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="questionData_main">
      <!--标题-->
      <div class="title">
        <p>问题数据</p>
      </div>

      <!--内容盒子-->
      <div class="questionData_content">
        <!--表格-->
        <div class="question_table">
          <div class="table_title">
            <i class="iconfont icon-star"></i>
            问题总数{{allQuestion}}
          </div>
          <div class="table_box">
            <div class="table_box_list">
              <p>汽车</p>
              <p>{{carQuestion}}</p>
            </div>
            <div class="table_box_list">
              <p>摩托车</p>
              <p>{{motoQuestion}}</p>
            </div>
            <div class="table_box_list">
              <p>无人机</p>
              <p>{{UAVQuestion}}</p>
            </div>
            <div class="table_box_list">
              <p>智能设备</p>
              <p>{{intelligentDeviceQuestion}}</p>
            </div>
          </div>
        </div>

        <div class="question_chart">
          <div class="conditions">
            <div class="date_item">
              <p class="date_label">开始</p>
              <el-date-picker
                v-model="startTime"
                class="date_picker_1"
                type="date"
                size="mini"
                placeholder="选择日期"
                @change="handleStartTime($event)"
              ></el-date-picker>
            </div>
            <div class="date_item">
              <p class="date_label">截止</p>
              <el-date-picker
                v-model="jsTime"
                class="date_picker_1"
                type="date"
                size="mini"
                placeholder="选择日期"
                @change="handleEndTime($event)"
              ></el-date-picker>
            </div>
            <el-select size="mini" class="select_type" v-model="userType" placeholder="全部">
              <el-option
                v-for="item in userOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="shape_content">
            <div class="shape_header">
              <div class="shape_header_left">
                <p class="left_title">问题数量曲线图</p>
                <div class="time_range">
                  <span>{{startTime}}</span>
                  <span>---</span>
                  <span>{{jsTime}}</span>
                </div>
              </div>
              <div class="shape_header_right">
                <div class="right_items">
                  <div class="point color1"></div>
                  <p>汽车占{{carProportion}}%</p>
                </div>
                <div class="right_items">
                  <div class="point color2"></div>
                  <p>摩托车占{{motoProportion}}%</p>
                </div>
                <div class="right_items">
                  <div class="point color3"></div>
                  <p>无人机占{{UAVProportion}}%</p>
                </div>
                <div class="right_items">
                  <div class="point color4"></div>
                  <p>智能设备占{{intelligentDeviceProportion}}%</p>
                </div>
              </div>
            </div>
            <div id="myChart" :style="{width:'100%',height: '400px'}"></div>
          </div>
        </div>

        <div class="question_pie">
          <div class="question_pie_title"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
import echarts from "echarts";

export default {
  name: "questionData",
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "问题",
          urls: "/index/question/question",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "问题数据",
          urls: "/index/question/questionData",
          icon: "icon-home"
        }
      ],
      userOptions: [
        {
          value: 1,
          label: "公司"
        },
        {
          value: 2,
          label: "普通用户"
        }
      ],
      startTime:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        "01" +
        " " +
        "00:00:00",
      jsTime:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate() +
        " " +
        "00:00:00",
      //图表数据
      userType: "",
      carData: [], //汽车的数据
      motoData: [], //摩托车的数据
      UAVData: [], //无人机的数据
      intelligentDeviceData: [], //智能设备数据
      DIYData: [], //DIY的数据
      otherData: [], //其他的数据
      //选择时间后的各版块问题数
      selectCarNum: 0,
      selectMotoNum: 0,
      selectUAVNum: 0,
      selectIntelligentDeviceNum: 0,
      selectDIYNum: 0,
      selectOtherNum: 0,
      selectAllNum: 0,
      //百分百比
      carProportion: null, //汽车占比
      motoProportion: null, //摩托占比
      UAVProportion: null, //无人机占比
      intelligentDeviceProportion: null, //智能设备占比
      //头部
      carQuestion: 0, //汽车问题数
      motoQuestion: 0, //摩托问题数
      UAVQuestion: 0, //无人机问题数
      intelligentDeviceQuestion: 0, //智能设备问题数
      allQuestion: 0 //所有问题数
    };
  },
  components: {
    BreadCrumb
  },
  mounted() {
    //请求时间处理
    let endMonth = new Date().getMonth() + 1;
    if (endMonth < 10) {
      endMonth = "0" + endMonth;
      this.startTime =
        new Date().getFullYear() +
        "-" +
        endMonth +
        "-" +
        "01" +
        " " +
        "00:00:00";
    } else {
      endMonth = new Date().getMonth() + 1;
    }
    let endDate = new Date().getDate();
    if (endDate < 10) {
      endDate = "0" + endDate;
      this.jsTime =
        new Date().getFullYear() +
        "-" +
        endMonth +
        "-" +
        endDate +
        " " +
        "00:00:00";
    } else {
      endDate = new Date().getDate();
    }
    console.log(this.startTime);
    console.log(this.jsTime);
    this.getAllQuestionList();
    this.getQuestionList(this.startTime, this.jsTime);
  },

  methods: {
    // 问题总数
    getAllQuestionList() {
      let endMonth = new Date().getMonth() + 1;
      if (endMonth < 10) {
        endMonth = "0" + endMonth;
      } else {
        endMonth = new Date().getMonth() + 1;
      }
      let endDate = new Date().getDate();
      if (endDate < 10) {
        endDate = "0" + endDate;
      } else {
        endDate = new Date().getDate();
      }
      const data = {
        type: 2,
        begin: "2010-01-01 00:00:00",
        end:  `${new Date().getFullYear()} - ${endMonth} - ${endDate} 00:00:00}`
      }
      this.HttpClient.post("/admin/analysis/diagram", data).then(res => {
        console.log(res);
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].folder_type === "汽车") {
            this.carQuestion = this.carQuestion + res.data.data[i].questions;
          } else if (res.data.data[i].folder_type === "摩托") {
            this.motoQuestion = this.motoQuestion + res.data.data[i].questions;
          } else if (res.data.data[i].folder_type === "无人机") {
            this.UAVQuestion = this.UAVQuestion + res.data.data[i].questions;
          } else if (res.data.data[i].folder_type === "智能设备") {
            this.intelligentDeviceQuestion =
              this.intelligentDeviceQuestion + res.data.data[i].questions;
          } else if (res.data.data[i].folder_type === "DIY") {
            this.DIYQuestion =
              this.intelligentDeviceQuestion + res.data.data[i].questions;
          } else if (res.data.data[i].folder_type === "其他") {
            this.otherQuestion =
              this.intelligentDeviceQuestion + res.data.data[i].questions;
          }
          this.allQuestion =
            this.carQuestion +
            this.motoQuestion +
            this.UAVQuestion +
            this.intelligentDeviceQuestion +
            this.DIYQuestion +
            this.otherQuestion;
        }
      });
    },
    //请求问题数据
    getQuestionList(beginTime, endTime) {
      this.selectCarNum = 0;
      this.selectMotoNum = 0;
      this.selectUAVNum = 0;
      this.selectIntelligentDeviceNum = 0;
      (this.selectDIYNum = 0),
        (this.selectOtherNum = 0),
        (this.selectAllNum = 0);
      //百分百比
      this.carProportion = null; //汽车占比
      this.motoProportion = null; //摩托占比
      this.UAVProportion = null; //无人机占比
      this.intelligentDeviceProportion = null; //智能设备占比
      this.HttpClient.post("/admin/analysis/diagram", {
        type: 2,
        begin: beginTime,
        end: endTime
      }).then(res => {
        console.log(res);

        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].folder_type === "汽车") {
            this.carData.push(res.data.data[i].questions);
            this.selectCarNum = this.selectCarNum + res.data.data[i].questions;
          } else if (res.data.data[i].folder_type === "摩托") {
            this.motoData.push(res.data.data[i].questions);
            this.selectMotoNum =
              this.selectMotoNum + res.data.data[i].questions;
          } else if (res.data.data[i].folder_type === "无人机") {
            this.UAVData.push(res.data.data[i].questions);
            this.selectUAVNum = this.selectUAVNum + res.data.data[i].questions;
          } else if (res.data.data[i].folder_type === "智能设备") {
            this.intelligentDeviceData.push(res.data.data[i].questions);
            this.selectIntelligentDeviceNum =
              this.selectIntelligentDeviceNum + res.data.data[i].questions;
          } else if (res.data.data[i].folder_type === "DIY") {
            this.DIYData.push(res.data.data[i].questions);
            this.selectDIYNum = this.selectDIYNum + res.data.data[i].questions;
          } else if (res.data.data[i].folder_type === "其他") {
            this.otherData.push(res.data.data[i].questions);
            this.selectOtherNum =
              this.selectOtherNum + res.data.data[i].questions;
          }
        }
        // 总的数量
        this.selectAllNum =
          this.selectCarNum +
          this.selectMotoNum +
          this.selectUAVNum +
          this.selectIntelligentDeviceNum +
          this.selectDIYNum +
          this.selectOtherNum;
        console.log(
          this.selectAllNum,
          this.selectCarNum,
          this.selectMotoNum,
          this.selectUAVNum,
          this.selectIntelligentDeviceNum,
          this.selectDIYNum,
          this.selectOtherNum
        );
        if (this.selectAllNum === 0) {
          this.carProportion = 0;
          this.motoProportion = 0;
          this.UAVProportion = 0;
          this.intelligentDeviceProportion = 0;
        } else {
          //算出各个板块的问题数占的百分比
          console.log("；绒更好看几个款");
          this.carProportion = (
            (this.selectCarNum / this.selectAllNum) *
            100
          ).toFixed(2);
          this.motoProportion = (
            (this.selectMotoNum / this.selectAllNum) *
            100
          ).toFixed(2);
          this.UAVProportion = (
            (this.selectUAVNum / this.selectAllNum) *
            100
          ).toFixed(2);
          this.intelligentDeviceProportion = (
            (this.selectIntelligentDeviceNum / this.selectAllNum) *
            100
          ).toFixed(2);
          console.log(
            this.selectAllNum,
            this.carProportion,
            this.motoProportion,
            this.UAVProportion,
            this.intelligentDeviceProportion
          );
          // console.log(this.selectCarNum,this.selectMotoNum,this.selectUAVNum,this.selectIntelligentDeviceNum)
          this.drawLine();
          console.log(
            this.carData,
            this.motoData,
            this.UAVData,
            this.intelligentDeviceData
          );
        }
      });
    },
    //选择开始时间
    handleStartTime(e) {
      console.log(e);
      if (e) {
        // console.log(e.getFullYear()+"-"+e.getMonth()+"-"+e.getDate()+" "+"00:00:00");
        let Month = null,
          day = null;
        if (e.getMonth() < 10) {
          Month = "0" + (e.getMonth() + 1);
        } else {
          Month = e.getMonth() + 1;
        }
        if (e.getDate() < 10) {
          day = "0" + e.getDate();
        } else {
          day = e.getDate();
        }
        this.startTime =
          e.getFullYear() + "-" + Month + "-" + day + " " + "00:00:00";
        console.log(this.startTime, this.jsTime);
        this.getQuestionList(this.startTime, this.jsTime);
      }
    },
    //选择结束时间
    handleEndTime(e) {
      // console.log(e.getFullYear()+"-"+e.getMonth()+"-"+e.getDate()+" "+"00:00:00");
      if (e) {
        let Month = null,
          day = null;
        if (e.getMonth() < 10) {
          Month = "0" + (e.getMonth() + 1);
        } else {
          Month = e.getMonth() + 1;
        }
        if (e.getDate() < 10) {
          day = "0" + e.getDate();
        } else {
          day = e.getDate();
        }
        this.jsTime =
          e.getFullYear() + "-" + Month + "-" + day + " " + "00:00:00";
        console.log(this.startTime, this.jsTime);
        this.getQuestionList(this.startTime, this.jsTime);
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: "#15bafe",
                lineStyle: {
                  color: "#15bafe"
                }
              }
            },
            name: "汽车",
            type: "line",
            smooth: true,
            data: this.carData
          },
          {
            itemStyle: {
              normal: {
                color: "#55ce63",
                lineStyle: {
                  color: "#55ce63"
                }
              }
            },
            name: "摩托车",
            type: "line",
            smooth: true,
            data: this.motoData
          },
          {
            itemStyle: {
              normal: {
                color: "#ff5858",
                lineStyle: {
                  color: "#ff5858"
                }
              }
            },
            name: "无人机",
            type: "line",
            smooth: true,
            data: this.UAVData
          },
          {
            itemStyle: {
              normal: {
                color: "#FFB82E",
                lineStyle: {
                  color: "#FFB82E"
                }
              }
            },
            name: "智能设备",
            type: "line",
            smooth: true,
            data: this.intelligentDeviceData
          }
        ]
      });
    }
  }
};
</script>

<style lang="less">
.questionData {
  .bread {
    margin: 10px;
  }
  .questionData_main::-webkit-scrollbar {
    display: none;
  }
  .questionData_main {
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

    .questionData_content {
      text-align: left;
      padding: 0 40px;

      .question_table {
        display: inline-block;
        .table_title {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          background: #15bafe;
          color: #fff;
          .iconfont {
            margin-right: 10px;
            position: relative;
            top: 2px;
          }
        }
        .table_box {
          display: flex;
          align-items: center;
          .table_box_list {
            min-width: 100px;
            p {
              border: 1px solid #dedede;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 50px;
            }
          }
        }
      }

      .question_chart {
        .conditions {
          display: flex;
          margin-top: 20px;
          .date_item {
            display: flex;
            border: 1px solid #dcdfe6;
            border-radius: 5px;
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
    }
  }
}
</style>
