<template>
  <div class="serviceData">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="serviceData_main">
      <!--标题-->
      <div class="title">
        <p>服务数据</p>
        <p>
          <i class="iconfont icon-shuaxin"></i>
          刷新
        </p>
      </div>

      <!--内容盒子-->
      <div class="serviceData_content">
        <!-- 服务数量 -->
        <div>
          <!--表格-->
          <div class="service_table">
            <div class="table_title">
              <i class="iconfont icon-star"></i>
              服务总数 {{serviceTotal}}
            </div>
            <div class="table_box">
              <div class="table_box_list" v-for="item in serviceData" :key="item.id">
                <p>{{item.name}}</p>
                <p>{{item.number}}</p>
              </div>
            </div>
          </div>
          <div>
          <div class="service_table">
            <div class="table_title">
              <i class="iconfont icon-star"></i>
              板块目录
            </div>
            <div class="table_box">
              <div class="table_box_list" v-for="item in floderData" :key="item.id">
                <p>
                  <el-radio-group v-model="folderID" size="small" @change="folderIDchange">
                    <el-radio :label="item.menu_id" border>{{item.name}}</el-radio>
                  </el-radio-group>
                </p>
                <p>{{item.services}}</p>
                <p>{{floderDatatotal==0?0:(item.services/floderDatatotal*100).toFixed(2)}}%</p>
              </div>
            </div>
          </div>
          </div>

          <div class="service_table servicemenu_table" v-if="folderID != ''">
            <div class="table_title table_titlebox">
              <i class="iconfont icon-star"></i>
              二级目录
            </div>
            <div class="table_box" v-if="nextmenuData.length !== 0">
              <div class="table_box_list" v-for="item in nextmenuData" :key="item.id">
                <p>
                  <el-radio :label="item.menu_id" border>{{item.name}}</el-radio>
                </p>
                <p>{{item.services}}</p>
                <p>{{nextmenuDatatotal==0?0:item.services/nextmenuDatatotal*100}}%</p>
              </div>
            </div>
            <div class="table_box" v-if="nextmenuData.length == 0">
              <div class="table_box_list">
                <p>暂无数据</p>
              </div>
            </div>
              
          </div>

          <!-- <div class="servicemenu_table">
            <el-radio-group v-model="folderID" size="small">
              <el-radio :label="item.menu_id" border v-for="(item,index) in floderData" :key="index">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
          <div class="servicemenu_table">
            <el-radio border  v-for="(item,index) in floderData" :key="index">{{item.services}}</el-radio>
          </div> -->

          <div class="service_chart">
            <div class="conditions">
              <div class="date_item">
                <p class="date_label">开始</p>
                <el-date-picker
                  v-model="startTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
              <div class="date_item">
                <p class="date_label">截止</p>
                <el-date-picker
                  v-model="endTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                  @change="getServiceDataByDate"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
              <!-- <el-select size="mini" class="select_type" v-model="userType" placeholder="状态选择">
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>-->
            </div>
            <div class="shape_content">
              <div class="shape_header">
                <div class="shape_header_left">
                  <p class="left_title">服务数量曲线图</p>
                  <div class="time_range">
                    <span>{{startTime.split(' ')[0]}}</span>
                    <span>---</span>
                    <span>{{endTime.split(' ')[0]}}</span>
                  </div>
                </div>
                <div class="shape_header_right">
                  <div class="right_items">
                    <div class="point color1"></div>
                    <p>汽车占{{carActivity.percent}}%</p>
                  </div>
                  <div class="right_items">
                    <div class="point color2"></div>
                    <p>摩托车占{{motorActivity.percent}}%</p>
                  </div>
                  <div class="right_items">
                    <div class="point color3"></div>
                    <p>无人机占{{planeActivity.percent}}%</p>
                  </div>
                  <div class="right_items">
                    <div class="point color4"></div>
                    <p>智能设备占{{intelligentActivity.percent}}%</p>
                  </div>
                </div>
              </div>
              <div id="myChart" :style="{width:'100%',height: '400px'}"></div>
            </div>
          </div>
        </div>
        <!-- 服务的浏览量 -->
        <div style="margin-top:20px">
          <!--表格-->
          <div class="service_table">
            <div class="table_title">
              <i class="iconfont icon-star"></i>
              服务浏览量总数 {{serviceviewTotal}}
            </div>
            <div class="table_box">
              <div class="table_box_list" v-for="item in serviceData" :key="item.id">
                <p>{{item.name}}</p>
                <p>{{item.numberview}}</p>
              </div>
            </div>
          </div>
          <div>
          <div class="service_table">
            <div class="table_title">
              <i class="iconfont icon-star"></i>
              板块目录
            </div>
            <div class="table_box">
              <div class="table_box_list" v-for="item in floderData" :key="item.id">
                <p>
                  <el-radio-group v-model="folderviewID" size="small" @change="folderviewIDchange">
                    <el-radio :label="item.menu_id" border>{{item.name}}</el-radio>
                  </el-radio-group>
                </p>
                <p>{{item.services_view}}</p>
                <p>{{floderviewDatatotal==0?0:(item.services_view/floderviewDatatotal*100).toFixed(2)}}%</p>
              </div>
            </div>
          <!-- </div> -->
          </div>
          </div>

          <div class="service_table servicemenu_table" v-if="folderviewID != ''">
            <div class="table_title table_titlebox">
              <i class="iconfont icon-star"></i>
              二级目录
            </div>
            <div class="table_box" v-if="nextmenuData.length !== 0">
              <div class="table_box_list" v-for="item in nextmenuData" :key="item.id">
                <p>
                  <el-radio :label="item.menu_id" border>{{item.name}}</el-radio>
                </p>
                <p>{{item.services_view}}</p>
                <p>{{nextmenuviewDatatotal==0?0:(item.services_view/nextmenuviewDatatotal*100).toFixed(2)}}%</p>
              </div>
            </div>
            <div class="table_box" v-if="nextmenuData.length == 0">
              <div class="table_box_list">
                <p>暂无数据</p>
              </div>
            </div>
              
          </div>

           <!-- <div class="service_table servicemenu_table">
            <div class="table_box">
              <div class="table_box_list" v-for="item in floderData" :key="item.id">
                <p>
                  <el-radio-group v-model="folderID" size="small" @change="folderIDchange">
                    <el-radio :label="item.menu_id" border>{{item.name}}</el-radio>
                  </el-radio-group>
                </p>
                <p>{{item.services}}</p>
                <p>{{floderDatatotal==0?0:item.services/floderDatatotal*100}}%</p>
              </div>
            </div>
          </div> -->

          <div class="service_chart">
            <div class="conditions">
              <div class="date_item">
                <p class="date_label">开始</p>
                <el-date-picker
                  v-model="startviewTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
              <div class="date_item">
                <p class="date_label">截止</p>
                <el-date-picker
                  v-model="endviewTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                  @change="getServiceDataviewByDate"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
              <!-- <el-select size="mini" class="select_type" v-model="userType" placeholder="状态选择">
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>-->
            </div>
            <div class="shape_content">
              <div class="shape_header">
                <div class="shape_header_left">
                  <p class="left_title">服务浏览量曲线图</p>
                  <div class="time_range">
                    <span>{{startviewTime.split(' ')[0]}}</span>
                    <span>---</span>
                    <span>{{endviewTime.split(' ')[0]}}</span>
                  </div>
                </div>
                <div class="shape_header_right">
                  <div class="right_items">
                    <div class="point color1"></div>
                    <p>汽车占{{carviewActivity.percent}}%</p>
                  </div>
                  <div class="right_items">
                    <div class="point color2"></div>
                    <p>摩托车占{{motorviewActivity.percent}}%</p>
                  </div>
                  <div class="right_items">
                    <div class="point color3"></div>
                    <p>无人机占{{planeviewActivity.percent}}%</p>
                  </div>
                  <div class="right_items">
                    <div class="point color4"></div>
                    <p>智能设备占{{intelligentviewActivity.percent}}%</p>
                  </div>
                </div>
              </div>
              <div id="myviewChart" :style="{width:'100%',height: '400px'}"></div>
            </div>
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
  name: "ServiceData",
  data() {
    return {
      folderID:'',//选中的板块ID
      floderData:[],
      nextmenuData:[],
      nextmenuDatatotal:0,
      floderDatatotal:0,
      // 浏览量
      folderviewID:'',//选中的板块ID
      // floderviewData:[],
      // nextmenuviewData:[],
      nextmenuviewDatatotal:0,
      floderviewDatatotal:0,
      //时间选择范围限制
      pickerOptions: {
        disabledDate: time => {
          // console.log(
          //   (time.getTime() - new Date(this.startTime).getTime()) /
          //     1000 /
          //     60 /
          //     60 /
          //     24
          // );
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
      /** liushuya 2019-01-07 */
      //时间选择范围限制
      pickerOptions: {
        disabledDate: time => {
        //  console .log(
        //     (time.getTime() - new Date(this.startviewTime).getTime()) /
        //       1000 /
        //       60 /
        //       60 /
        //       24
        //   );
          return (
            (time.getTime() - new Date(this.startviewTime).getTime()) /
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
          name: "服务",
          urls: "/index/service/Service",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "服务数据",
          urls: "/index/service/ServiceData",
          icon: "icon-home"
        }
      ],
      // userOptions: [
      // {
      //   value: 1,
      //   label: '全部'
      // },{
      //   value: 2,
      //   label: '未通过'
      // }
      // ],
      serviceValue: "", //服务数量板块
      serviceChangeData: [],
      carMenuID: "", //汽车ID
      motorMenuID: "", //摩托ID
      planeMenuID: "", //无人机ID
      intelligentMenuID: "", //智能设备ID

      startTime: "", //开始时间段
      endTime: "", //结束时间段
      /** liushuya 2019-01-07 */
      // 服务浏览量时间
      startviewTime: "", //开始时间段
      endviewTime: "", //结束时间段

      userType: "",

      categoryContent: false,
      serviceData: [], //服务数据
      serviceTotal: 0, //服务总记录数
      serviceviewTotal: 0, //服务浏览量总数
      serviceDataByDate: [], //某一时间段内服务数据
      carActivity: [], //汽车服务数据
      motorActivity: [], //摩托车服务数据
      planeActivity: [], //无人机服务数据
      intelligentActivity: [], //智能设备服务数据
      /** liushuya 2017-01-07 */
      carviewActivity: [], //汽车服务浏览量数据
      motorviewActivity: [], //摩托车服务浏览量数据
      planeviewActivity: [], //无人机服务浏览量数据
      intelligentviewActivity: [], //智能设备服务浏览量数据
      serviceTotalviewByDate: 0, //某时间段内服务浏览量总记录数

      serviceTotalByDate: 0 //某时间段内服务总记录数
    };
  },
  components: {
    BreadCrumb
  },

  methods: {
    folderIDchange(){
      this.floderMenuData(this.folderID)
    },
    folderviewIDchange(){
      this.floderMenuData(this.folderviewID)
    },
    floderMenuData(id){
      let params = {
        begin:this.startTime,
        end:this.endTime,
        type:6,
        folder_id:id
      }
      this.HttpClient.post('/admin/analysis/diagramWithMenu',params).then(res => {
        console.log(res.data)
        if(res.data.code === 200){
          console.log(res.data.data)
          if(this.folderID != '' || this.folderviewID != ''){
            this.nextmenuData = res.data.data;
            this.nextmenuData.forEach(item => {
              this.nextmenuDatatotal+=item.services;
              this.nextmenuviewDatatotal+=item.services_view;
            })
            console.log(this.nextmenuDatatotal)
          }else{
            this.floderData = res.data.data;
            this.floderData.forEach(item => {
              this.floderDatatotal+=item.services;
              this.floderviewDatatotal+=item.services_view;
            })
            console.log(this.floderviewDatatotal)
          }
          
        }else{
          if(this.folderID != '' || this.folderviewID != ''){
            this.nextmenuData = []
          }else{
            this.floderData = []
          }
        }
      })
    },
    serviceValueChange() {
      this.getServiceData();
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
        // console.log(this.carActivity);
        this.carActivity.map(item => {
          if (
            new Date(
              year + "-" + (month < 10 ? "0" + month : month) + "-" + date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date(
              (month >= 12
                ? year + 1 + "-01"
                : year + "-" + (month < 10 ? "0" + (month + 1) : month + 1)) +
                "-" +
                date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            // console.log(1);
            carNum += Number(item.services);
          }
        });
        this.motorActivity.map(item => {
          if (
            new Date(
              year + "-" + (month < 10 ? "0" + month : month) + "-" + date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date(
              (month >= 12
                ? year + 1 + "-01"
                : year + "-" + (month < 10 ? "0" + (month + 1) : month + 1)) +
                "-" +
                date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            motorNum += Number(item.services);
          }
        });
        this.planeActivity.map(item => {
          if (
            new Date(
              year + "-" + (month < 10 ? "0" + month : month) + "-" + date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date(
              (month >= 12
                ? year + 1 + "-01"
                : year + "-" + (month < 10 ? "0" + (month + 1) : month + 1)) +
                "-" +
                date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            planeNum += Number(item.services);
          }
        });
        this.intelligentActivity.map(item => {
          if (
            new Date(
              year + "-" + (month < 10 ? "0" + month : month) + "-" + date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date(
              (month >= 12
                ? year + 1 + "-01"
                : year + "-" + (month < 10 ? "0" + (month + 1) : month + 1)) +
                "-" +
                date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            intelligentNum += Number(item.services);
          }
        });
        car.push(carNum);
        motorcycle.push(motorNum);
        plane.push(planeNum);
        intelligent.push(intelligentNum);
      });
      // console.log(car);
      //求和
      this.carActivity.total = eval(car.join("+"));
      this.motorActivity.total = eval(motorcycle.join("+"));
      this.planeActivity.total = eval(plane.join("+"));
      this.intelligentActivity.total = eval(intelligent.join("+"));
      this.serviceTotalByDate =
        this.carActivity.total +
        this.motorActivity.total +
        this.planeActivity.total +
        this.intelligentActivity.total;
      this.carActivity.percent = Number(
        ((this.carActivity.total / this.serviceTotalByDate) * 100).toFixed(2)
      );
      this.motorActivity.percent = Number(
        ((this.motorActivity.total / this.serviceTotalByDate) * 100).toFixed(2)
      );
      this.planeActivity.percent = Number(
        ((this.planeActivity.total / this.serviceTotalByDate) * 100).toFixed(2)
      );
      this.intelligentActivity.percent = Number(
        (
          (this.intelligentActivity.total / this.serviceTotalByDate) *
          100
        ).toFixed(2)
      );

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
        series: [
          {
            itemStyle: {
              normal: {
                color: "#009efb",
                lineStyle: {
                  color: "#009efb"
                }
              }
            },
            name: "汽车",
            type: "line",
            smooth: true,
            data: car
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
            data: motorcycle
          },
          {
            itemStyle: {
              normal: {
                color: "#ff7676",
                lineStyle: {
                  color: "#ff7676"
                }
              }
            },
            name: "无人机",
            type: "line",
            smooth: true,
            data: plane
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
            data: intelligent,
            type: "line",
            smooth: true
          }
        ]
      });
    },
    //获取服务数据
    getServiceData() {
      this.HttpClient.post("/admin/analysis/numCache", {
        type: 6,
        folder_id: this.serviceValue
      }).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          this.serviceData = res.data.data;
          if (this.serviceValue != "") {
            this.serviceChangeData = res.data.data;
          }
          // console.log(this.serviceData);
          this.serviceData.map(item => {
            if (item.name == "汽车") {
              this.carMenuID = item.menu_id;
            } else if (item.name == "摩托") {
              this.motorMenuID = item.menu_id;
            } else if (item.name == "模型") {
              this.planeMenuID = item.menu_id;
            } else if (item.name == "智能设备") {
              this.intelligentMenuID = item.menu_id;
            }
            item.number = 0;
            item.numberview = 0;
            item.number += Number(item.analysis.company_services);
            item.number += Number(item.analysis.normal_services);
            item.number += Number(item.analysis.normal_company_services);
            item.numberview += Number(item.analysis.company_services_view);
            item.numberview += Number(item.analysis.normal_services_view);
            item.numberview += Number(
              item.analysis.normal_company_services_view
            );
            this.serviceTotal += item.number;
            this.serviceviewTotal += item.numberview;
          });
          // console.log(this.serviceTotal);
        }
      });
    },
    //获取某一时间段内服务数据
    getServiceDataByDate() {
      this.HttpClient.post("/admin/analysis/diagram", {
        type: 6,
        begin: this.startTime,
        end: this.endTime
      }).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          this.serviceDataByDate = res.data.data;
          this.carActivity = [];
          this.motorActivity = [];
          this.planeActivity = [];
          this.intelligentActivity = [];
          res.data.data.map(item => {
            if (item.folder_type === this.carMenuID) {
              this.carActivity.push(item);
            } else if (item.folder_type === this.motorMenuID) {
              this.motorActivity.push(item);
            } else if (item.folder_type === this.planeMenuID) {
              this.planeActivity.push(item);
            } else if (item.folder_type === this.intelligentMenuID) {
              this.intelligentActivity.push(item);
            }
          });
          this.drawLine();
        }
      });
    },

    /** liushuya 2019-01-07 */
    // 获取某段时间内服务浏览量数据
    getServiceDataviewByDate() {
      this.HttpClient.post("/admin/analysis/diagram", {
        type: 6,
        begin: this.startviewTime,
        end: this.endviewTime
      }).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          this.serviceDataByDate = res.data.data;
          this.carviewActivity = [];
          this.motorviewActivity = [];
          this.planeviewActivity = [];
          this.intelligentviewActivity = [];

          res.data.data.map(item => {
            if (item.folder_type === this.carMenuID) {
              this.carviewActivity.push(item);
            } else if (item.folder_type === this.motorMenuID) {
              this.motorviewActivity.push(item);
            } else if (item.folder_type === this.planeMenuID) {
              this.planeviewActivity.push(item);
            } else if (item.folder_type === this.intelligentMenuID) {
              this.intelligentviewActivity.push(item);
            }
          });
          this.drawviewLine();
        }
      });
    },
    //数据曲线绘制
    drawviewLine() {
      let days =
        (new Date(this.endviewTime).getTime() -
          new Date(this.startviewTime).getTime()) /
        1000 /
        60 /
        60 /
        24;
      let begin = new Date(this.startviewTime).getDate();
      let year = new Date(this.startviewTime).getFullYear();
      let month = new Date(this.startviewTime).getMonth() + 1;
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
      let carview = [],
        motorcycleview = [],
        planeview = [],
        intelligentview = [];
      dates.map(date => {
        let carviewNum = 0;
        let motorviewNum = 0;
        let planeviewNum = 0;
        let intelligentviewNum = 0;
        date = this.initFormat(date);
        // console.log(this.carviewActivity);
        this.carviewActivity.map(item => {
          if (
            new Date(
              year + "-" + (month < 10 ? "0" + month : month) + "-" + date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date(
              (month >= 12
                ? year + 1 + "-01"
                : year + "-" + (month < 10 ? "0" + (month + 1) : month + 1)) +
                "-" +
                date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            carviewNum += Number(item.services_view);
          }
        });
        this.motorviewActivity.map(item => {
          if (
            new Date(
              year + "-" + (month < 10 ? "0" + month : month) + "-" + date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date(
              (month >= 12
                ? year + 1 + "-01"
                : year + "-" + (month < 10 ? "0" + (month + 1) : month + 1)) +
                "-" +
                date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            motorviewNum += Number(item.services_view);
          }
        });
        this.planeviewActivity.map(item => {
          if (
            new Date(
              year + "-" + (month < 10 ? "0" + month : month) + "-" + date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date(
              (month >= 12
                ? year + 1 + "-01"
                : year + "-" + (month < 10 ? "0" + (month + 1) : month + 1)) +
                "-" +
                date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            planeviewNum += Number(item.services_view);
          }
        });
        this.intelligentviewActivity.map(item => {
          if (
            new Date(
              year + "-" + (month < 10 ? "0" + month : month) + "-" + date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date(
              (month >= 12
                ? year + 1 + "-01"
                : year + "-" + (month < 10 ? "0" + (month + 1) : month + 1)) +
                "-" +
                date
            ).getTime() === new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            intelligentviewNum += Number(item.services_view);
          }
        });
        // console.log(carviewNum);
        carview.push(carviewNum);
        motorcycleview.push(motorviewNum);
        planeview.push(planeviewNum);
        intelligentview.push(intelligentviewNum);
      });
      // console.log(carview);
      //求和
      this.carviewActivity.total = eval(carview.join("+"));
      this.motorviewActivity.total = eval(motorcycleview.join("+"));
      this.planeviewActivity.total = eval(planeview.join("+"));
      this.intelligentviewActivity.total = eval(intelligentview.join("+"));
      this.serviceTotalviewByDate =
        this.carviewActivity.total +
        this.motorviewActivity.total +
        this.planeviewActivity.total +
        this.intelligentviewActivity.total;
      this.carviewActivity.percent = Number(
        (
          (this.carviewActivity.total / this.serviceTotalviewByDate) *
          100
        ).toFixed(2)
      );
      this.motorviewActivity.percent = Number(
        (
          (this.motorviewActivity.total / this.serviceTotalviewByDate) *
          100
        ).toFixed(2)
      );
      this.planeviewActivity.percent = Number(
        (
          (this.planeviewActivity.total / this.serviceTotalviewByDate) *
          100
        ).toFixed(2)
      );
      this.intelligentviewActivity.percent = Number(
        (
          (this.intelligentviewActivity.total / this.serviceTotalviewByDate) *
          100
        ).toFixed(2)
      );

      // 基于准备好的dom，初始化echarts实例
      let myviewChart = echarts.init(document.getElementById("myviewChart"));
      // 绘制图表
      myviewChart.setOption({
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
        series: [
          {
            itemStyle: {
              normal: {
                color: "#009efb",
                lineStyle: {
                  color: "#009efb"
                }
              }
            },
            name: "汽车",
            type: "line",
            smooth: true,
            data: carview
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
            data: motorcycleview
          },
          {
            itemStyle: {
              normal: {
                color: "#ff7676",
                lineStyle: {
                  color: "#ff7676"
                }
              }
            },
            name: "无人机",
            type: "line",
            smooth: true,
            data: planeview
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
            data: intelligentview,
            type: "line",
            smooth: true
          }
        ]
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

    if (arr[1] == "01") {
      arr[0] = arr[0] - 1;
      arr[1] = "12";
    } else {
      arr[1] = arr[1] - 1;
    }
    // console.log(arr[1]);
    arr.join("-");
    this.startTime = arr.join("-");
    this.endTime = this.initDateValue(new Date());

    /** liushuya 2019-01-07 */
    this.startviewTime = arr.join("-");
    this.endviewTime = this.initDateValue(new Date());
    console.log(this.startTime);
    // console.log(this.endTime);
    this.floderMenuData();
    this.getServiceData();
    this.getServiceDataByDate();
    this.getServiceDataviewByDate();
  }
};
</script>

<style lang="less">
.serviceData {
  .bread {
    margin: 10px;
  }
  .serviceData_main::-webkit-scrollbar {
    display: none;
  }
  .el-radio__input {
    display: none;
  }
  .serviceData_main {
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

    .serviceData_content {
      text-align: left;
      padding: 0 40px;

      .service_table {
        display: inline-block;
        .el-radio.is-bordered{
          border: none;
        }
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
        .table_titlebox{
          width: 10%;
          margin-bottom: 20px;
          border-radius: 6px;
        }
        .table_box {
          display: flex;
          align-items: center;
          // overflow-x: scroll;
          flex-wrap: wrap;
          .table_box_list {
            min-width: 100px;
            margin-bottom: 10px;
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

      .servicemenu_table{
        margin-top: 20px;
        display: block;
      }

      .service_chart {
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

      /*分类*/
      .service_category {
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
