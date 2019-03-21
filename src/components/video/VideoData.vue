<template>
  <div>
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <p class="title">视频状态</p>
      <!-- 视频数量 -->
      <div style="padding:0 20px;">
        <table class="table" border="1" cellspacing="0" cellpadding="0">
          <thead>
            <th class="my_th" :colspan="videoNum.length">
              <span>
                <i class="iconfont icon-star"></i>
                视频总数
              </span>
              {{videoTotal}}
            </th>
          </thead>
          <tbody>
            <tr class="tr1">
              <td v-for="item in videoNum" :key="item.id">{{item.name}}</td>
            </tr>
            <tr class="tr2">
              <td v-for="item in videoNum" :key="item.id">{{item.number}}</td>
            </tr>
          </tbody>
        </table>
        
        <div>
          <div class="conditions">
            <div class="date_item">
              <p class="date_label">开始</p>
              <el-date-picker
                v-model="startTime"
                class="date_picker_1"
                type="date"
                size="mini"
                :clearable='false'
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                @change="getDataByDate"
              ></el-date-picker>
            </div>
            <div class="date_item">
              <p class="date_label">截止</p>
              <el-date-picker
                v-model="endTime"
                class="date_picker_1"
                type="date"
                size="mini"
                :clearable='false'
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="getDataByDate"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
            <el-select
              size="mini"
              class="select_type"
              clearable
              v-model="userType"
              placeholder="全部"
              @change="drawLine"
            >
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
                <p class="left_title">视频数量曲线图</p>
                <div class="time_range">
                  <span>{{startTime.split(' ')[0]}}</span>
                  <span>---</span>
                  <span>{{endTime.split(' ')[0]}}</span>
                </div>
              </div>
              <div class="shape_header_right">
                <div class="right_items">
                  <div class="point color1"></div>
                  <p>汽车占{{totalByDate?((car.normal+car.business)/totalByDate*100).toFixed(2):0}}%</p>
                </div>
                <div class="right_items">
                  <div class="point color2"></div>
                  <p>摩托车占{{totalByDate?((motorcycle.normal+motorcycle.business)/totalByDate*100).toFixed(2):0}}%</p>
                </div>
                <div class="right_items">
                  <div class="point color3"></div>
                  <p>模型占{{totalByDate?((plane.normal+plane.business)/totalByDate*100).toFixed(2):0}}%</p>
                </div>
                <div class="right_items">
                  <div class="point color4"></div>
                  <p>智能设备占{{totalByDate?((intelligent.normal+intelligent.business)/totalByDate*100).toFixed(2):0}}%</p>
                </div>
              </div>
            </div>
            <div id="myChart" :style="{width:'980px',height: '400px'}"></div>
          </div>
        </div>
      </div>


      <!-- liushuya  2019-01-04 -->
      <!-- 视频浏览量 -->
      <div style="padding:0 20px;">
        <table class="table" border="1" cellspacing="0" cellpadding="0">
          <thead>
            <th class="my_th" :colspan="videoNum.length">
              <span>
                <i class="iconfont icon-star"></i>
                视频浏览量
              </span>
              {{videoviewTotal}}
            </th>
          </thead>
          <tbody>
            <tr class="tr1">
              <td v-for="item in videoNum" :key="item.id">{{item.name}}</td>
            </tr>
            <tr class="tr2">
              <td v-for="item in videoNum" :key="item.id">{{item.numberview}}</td>
            </tr>
          </tbody>
        </table>
        
        <div>
          <div class="conditions">
            <div class="date_item">
              <p class="date_label">开始</p>
              <el-date-picker
                v-model="startviewTime"
                class="date_picker_1"
                type="date"
                size="mini"
                :clearable='false'
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                @change="getviewDataByDate"
              ></el-date-picker>
            </div>
            <div class="date_item">
              <p class="date_label">截止</p>
              <el-date-picker
                v-model="endviewTime"
                class="date_picker_1"
                type="date"
                size="mini"
                :clearable='false'
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="getviewDataByDate"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
            <el-select
              size="mini"
              class="select_type"
              clearable
              v-model="userviewType"
              placeholder="全部"
              @change="drawviewLine"
            >
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
                <p class="left_title">视频浏览量曲线图</p>
                <div class="time_range">
                  <span>{{startviewTime.split(' ')[0]}}</span>
                  <span>---</span>
                  <span>{{endviewTime.split(' ')[0]}}</span>
                </div>
              </div>
              <div class="shape_header_right">
                <div class="right_items">
                  <div class="point color1"></div>
                  <p>汽车占{{totalByDateview?((carview.normal+carview.business)/totalByDateview*100).toFixed(2):0}}%</p>
                </div>
                <div class="right_items">
                  <div class="point color2"></div>
                  <p>摩托车占{{totalByDateview?((motorcycleview.normal+motorcycleview.business)/totalByDateview*100).toFixed(2):0}}%</p>
                </div>
                <div class="right_items">
                  <div class="point color3"></div>
                  <p>模型占{{totalByDateview?((planeview.normal+planeview.business)/totalByDateview*100).toFixed(2):0}}%</p>
                </div>
                <div class="right_items">
                  <div class="point color4"></div>
                  <p>智能设备占{{totalByDateview?((intelligentview.normal+intelligentview.business)/totalByDateview*100).toFixed(2):0}}%</p>
                </div>
              </div>
            </div>
            <div id="myviewChart" :style="{width:'980px',height: '400px'}"></div>
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
  name: "videoStatus",
  components: {
    BreadCrumb
  },
  data() {
    return {
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

      startTime: "",
      startviewTime:'',
      endTime: "",
      endviewTime:'',
      userType: "",
      userviewType:'',
      breadData: [
        {
          id: 1,
          name: "视频管理",
          urls: "/index/video",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "视频状态",
          urls: "/index/video/video-data",
          icon: "icon-home"
        }
      ],
      userOptions: [
        {
          value: 1,
          label: "个人用户"
        },
        {
          value: 2,
          label: "专业商家"
        },
        {
          value: 3,
          label: "普通商家"
        }
      ],
      videoNum: [], //视频类型数组
      videoTotal: 0, //视频总数
      videoviewTotal:0,//视频浏览量总数
      videoDate: [], //视频数据统计
      videoviewDate:[],//视频浏览量
      car: { normal: 0, business: 0 }, //汽车视频统计
      motorcycle: { normal: 0, business: 0 }, //摩托视频统计
      plane: { normal: 0, business: 0 }, //无人机视频统计
      intelligent: { normal: 0, business: 0 }, //智能设备视频统计
      // 浏览量
      carview: { normal: 0, business: 0 }, //汽车视频统计
      motorcycleview: { normal: 0, business: 0 }, //摩托视频统计
      planeview: { normal: 0, business: 0 }, //无人机视频统计
      intelligentview: { normal: 0, business: 0 }, //智能设备视频统计
      totalByDate: 0, //某时间段内视频总数
      totalByDateview:0,//某段时间内视频浏览量总数
      carvideo: [], //汽车视频统计
      motorvideo: [], //摩托视频统计
      planevideo: [], //无人机视频统计
      intelligentvideo: [], //智能设备视频统计
      // 浏览量
      carviewvideo: [], //汽车视频统计
      motorviewvideo: [], //摩托视频统计
      planeviewvideo: [], //无人机视频统计
      intelligentviewvideo: [], //智能设备视频统计

      carMenuID: "", //汽车ID
      motorMenuID: "", //摩托ID
      planeMenuID: "", //无人机ID
      intelligentMenuID: "", //智能设备ID
    };
  },
  methods: {
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
        let carNum = 0,
          carNum1 = 0,
          carNum2 = 0,
          carNum3 = 0;
          // let carNumview = 0,
          // carNumview1 = 0,
          // carNumview2 = 0,
          // carNumview3 = 0;
        
          let motorNum = 0,
          motorNum1 = 0,
          motorNum2 = 0,
          motorNum3 = 0;
          // let motorNumview = 0,
          // motorNumview1 = 0,
          // motorNumview2 = 0,
          // motorNumview3 = 0;

        let planeNum = 0,
          planeNum1 = 0,
          planeNum2 = 0,
          planeNum3 = 0;

        let intelligentNum = 0,
          intelligentNum1 = 0,
          intelligentNum2 = 0,
          intelligentNum3 = 0;
        date = this.initFormat(date);
        this.carvideo.map(item => {
          if (
            new Date(year + "-" + (month<10?'0' + month:month) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date((month>=12?year+1+'-01':year + "-" + (month<10?'0' + (month+1):month + 1)) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            carNum += Number(item.videos);
            //按用户类型搜索
            if (item.user_type === 1) {
              carNum1 += Number(item.videos);
            } else if (item.user_type === 2) {
              carNum2 += Number(item.videos);
            } else if (item.user_type === 3) {
              carNum3 += Number(item.videos);
            }
          }
        });
        this.motorvideo.map(item => {
          if (
            new Date(year + "-" + (month<10?'0' + month:month) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date((month>=12?year+1+'-01':year + "-" + (month<10?'0' + (month+1):month + 1)) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            motorNum += Number(item.videos);
            //按用户类型搜索
            if (item.user_type === 1) {
              motorNum1 += Number(item.videos);
            } else if (item.user_type === 2) {
              motorNum2 += Number(item.videos);
            } else if (item.user_type === 3) {
              motorNum3 += Number(item.videos);
            }
          }
        });
        this.planevideo.map(item => {
          if (
            new Date(year + "-" + (month<10?'0' + month:month) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date((month>=12?year+1+'-01':year + "-" + (month<10?'0' + (month+1):month + 1)) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            planeNum += Number(item.videos);
            //按用户类型搜索
            if (item.user_type === 1) {
              planeNum1 += Number(item.videos);
            } else if (item.user_type === 2) {
              planeNum2 += Number(item.videos);
            } else if (item.user_type === 3) {
              planeNum3 += Number(item.videos);
            }
          }
        });
        this.intelligentvideo.map(item => {
          if (
            new Date(year + "-" + (month<10?'0' + month:month) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date((month>=12?year+1+'-01':year + "-" + (month<10?'0' + (month+1):month + 1)) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            intelligentNum += Number(item.videos);
            //按用户类型搜索
            if (item.user_type === 1) {
              intelligentNum1 += Number(item.videos);
            } else if (item.user_type === 2) {
              intelligentNum2 += Number(item.videos);
            } else if (item.user_type === 3) {
              intelligentNum3 += Number(item.videos);
            }
          }
        });
        if (this.userType === 1) {
          car.push(carNum1);
          motorcycle.push(motorNum1);
          plane.push(planeNum1);
          intelligent.push(intelligentNum1);
        } else if (this.userType === 2) {
          car.push(carNum2);
          motorcycle.push(motorNum2);
          plane.push(planeNum2);
          intelligent.push(intelligentNum2);
        } else if (this.userType === 3) {
          car.push(carNum3);
          motorcycle.push(motorNum3);
          plane.push(planeNum3);
          intelligent.push(intelligentNum3);
        } else if (this.userType === '') {
          car.push(carNum);
          motorcycle.push(motorNum);
          plane.push(planeNum);
          intelligent.push(intelligentNum);
        }
      });
      // console.log(this.carvideo);
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
            type: "line",
            smooth: true,
            data: intelligent
          }
        ]
      });

    },

    //按时间段获取统计数据
    getDataByDate() {
      this.HttpClient.post("/admin/analysis/diagram", {
        type: 3,
        begin: this.startTime,
        end: this.endTime
      }).then(res => {
        if (res.data.code === 200) {
          this.videoDate = res.data.data;
          // console.log(this.videoDate)
          this.totalByDate = 0;
          this.car.normal = 0;
          this.car.business = 0;
          this.motorcycle.normal = 0;
          this.motorcycle.business = 0;
          this.plane.normal = 0;
          this.plane.business = 0;
          this.intelligent.normal = 0;
          this.intelligent.business = 0;
          this.carvideo = [];
          this.motorvideo = [];
          this.planevideo = [];
          this.intelligentvideo = [];
          this.videoDate.map(item => {
            if (item.folder_type === this.carMenuID) {
              this.carvideo.push(item);
              if (item.user_type === 1) {
                this.car.normal += Number(item.videos);
                this.totalByDate += Number(item.videos);
              } else {
                this.car.business += Number(item.videos);
                this.totalByDate += Number(item.videos);
              }
            } else if (item.folder_type === this.motorMenuID) {
              this.motorvideo.push(item);
              if (item.user_type === 1) {
                this.motorcycle.normal += Number(item.videos);
                this.totalByDate += Number(item.videos);
              } else {
                this.motorcycle.business += Number(item.videos);
                this.totalByDate += Number(item.videos);
              }
            } else if (item.folder_type === this.planeMenuID) {
              this.planevideo.push(item);
              if (item.user_type === 1) {
                this.plane.normal += Number(item.videos);
                this.totalByDate += Number(item.videos);
              } else {
                this.plane.business += Number(item.videos);
                this.totalByDate += Number(item.videos);
              }
            } else if (item.folder_type === this.intelligentMenuID) {
              this.intelligentvideo.push(item);
              if (item.user_type === 1) {
                this.intelligent.normal += Number(item.videos);
                this.totalByDate += Number(item.videos);
              } else {
                this.intelligent.business += Number(item.videos);
                this.totalByDate += Number(item.videos);
              }
            }
          });
          // console.log(this.car)
          this.drawLine();
        }
      });
    },
    /** liushuya  2019-01-04 */
    //按时间段获取统计浏览量数据
    getviewDataByDate() {
      // console.log(this.startviewTime)
      // console.log(this.endviewTime)
      this.HttpClient.post("/admin/analysis/diagram", {
        type: 3,
        begin: this.startviewTime,
        end: this.endviewTime
      }).then(res => {
        if (res.data.code === 200) {
          this.videoviewDate = res.data.data;
          console.log(this.videoviewDate)
          this.totalByDateview = 0;
          this.carview.normal = 0;
          this.carview.business = 0;
          this.motorcycleview.normal = 0;
          this.motorcycleview.business = 0;
          this.planeview.normal = 0;
          this.planeview.business = 0;
          this.intelligentview.normal = 0;
          this.intelligentview.business = 0;
          this.carviewvideo = [];
          this.motorviewvideo = [];
          this.planeviewvideo = [];
          this.intelligentviewvideo = [];
          this.videoviewDate.map(item => {
            if (item.folder_type === this.carMenuID) {
              this.carviewvideo.push(item);
              if (item.user_type === 1) {
                this.carview.normal += Number(item.videos_view);
                this.totalByDateview +=Number(item.videos_view)
              } else {
                this.carview.business += Number(item.videos_view);
                this.totalByDateview +=Number(item.videos_view)
              }
            } else if (item.folder_type === this.motorMenuID) {
              this.motorviewvideo.push(item);
              if (item.user_type === 1) {
                this.motorcycleview.normal += Number(item.videos_view);
                this.totalByDateview +=Number(item.videos_view)
              } else {
                this.motorcycleview.business += Number(item.videos_view);
                this.totalByDateview +=Number(item.videos_view)
              }
            } else if (item.folder_type === this.planeMenuID) {
              this.planeviewvideo.push(item);
              if (item.user_type === 1) {
                this.planeview.normal += Number(item.videos_view);
                this.totalByDateview +=Number(item.videos_view)
              } else {
                this.planeview.business += Number(item.videos_view);
                this.totalByDateview +=Number(item.videos_view)
              }
            } else if (item.folder_type === this.intelligentMenuID) {
              this.intelligentviewvideo.push(item);
              if (item.user_type === 1) {
                this.intelligentview.normal += Number(item.videos_view);
                this.totalByDateview +=Number(item.videos_view)
              } else {
                this.intelligentview.business += Number(item.videos_view);
                this.totalByDateview +=Number(item.videos_view)
              }
            }
          });
          // console.log(this.car)
          this.drawviewLine();
        }
      });
    },
    /** liushuya  2019-01-04 */
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
        
      // console.log(this.carviewvideo)
      dates.map(date => {
          let carNumview = 0,
          carNumview1 = 0,
          carNumview2 = 0,
          carNumview3 = 0;
        
          let motorNumview = 0,
          motorNumview1 = 0,
          motorNumview2 = 0,
          motorNumview3 = 0;

          let planeNumview = 0,
          planeNumview1 = 0,
          planeNumview2 = 0,
          planeNumview3 = 0;

          let intelligentNumview = 0,
          intelligentNumview1 = 0,
          intelligentNumview2 = 0,
          intelligentNumview3 = 0;
        date = this.initFormat(date);
        
        this.carviewvideo.map(item => {
          if (
            new Date(year + "-" + (month<10?'0' + month:month) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date((month>=12?year+1+'-01':year + "-" + (month<10?'0' + (month+1):month + 1)) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            // console.log(item)
            carNumview += Number(item.videos_view);
            //按用户类型搜索
            if (item.user_type === 1) {
              carNumview1 += Number(item.videos_view);
            } else if (item.user_type === 2) {
              carNumview2 += Number(item.videos_view);
            } else if (item.user_type === 3) {
              carNumview3 += Number(item.videos_view);
            }
          }
        });
        this.motorviewvideo.map(item => {
          if (
            new Date(year + "-" + (month<10?'0' + month:month) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date((month>=12?year+1+'-01':year + "-" + (month<10?'0' + (month+1):month + 1)) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            motorNumview += Number(item.videos_view);
            //按用户类型搜索
            if (item.user_type === 1) {
              motorNumview1 += Number(item.videos_view);
            } else if (item.user_type === 2) {
              motorNumview2 += Number(item.videos_view);
            } else if (item.user_type === 3) {
              motorNumview3 += Number(item.videos_view);
            }
          }
        });
        this.planeviewvideo.map(item => {
          if (
            new Date(year + "-" + (month<10?'0' + month:month) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date((month>=12?year+1+'-01':year + "-" + (month<10?'0' + (month+1):month + 1)) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            planeNumview += Number(item.videos_view);
            //按用户类型搜索
            if (item.user_type === 1) {
              planeNumview1 += Number(item.videos_view);
            } else if (item.user_type === 2) {
              planeNumview2 += Number(item.videos_view);
            } else if (item.user_type === 3) {
              planeNumview3 += Number(item.videos_view);
            }
          }
        });
        this.intelligentviewvideo.map(item => {
          if (
            new Date(year + "-" + (month<10?'0' + month:month) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime() ||
            new Date((month>=12?year+1+'-01':year + "-" + (month<10?'0' + (month+1):month + 1)) + "-" + date).getTime() ===
              new Date(item.created_at.split(" ")[0]).getTime()
          ) {
            intelligentNumview += Number(item.videos_view);
            //按用户类型搜索
            if (item.user_type === 1) {
              intelligentNumview1 += Number(item.videos_view);
            } else if (item.user_type === 2) {
              intelligentNumview2 += Number(item.videos_view);
            } else if (item.user_type === 3) {
              intelligentNumview3 += Number(item.videos_view);
            }
          }
        });
        // console.log(carNumview)
        if (this.userviewType === 1) {
          carview.push(carNumview1);
          motorcycleview.push(motorNumview1);
          planeview.push(planeNumview1);
          intelligentview.push(intelligentNumview1);
        } else if (this.userviewType === 2) {
          carview.push(carNumview2);
          motorcycleview.push(motorNumview2);
          planeview.push(planeNumview2);
          intelligentview.push(intelligentNumview2);
        } else if (this.userviewType === 3) {
          carview.push(carNumview3);
          motorcycleview.push(motorNumview3);
          planeview.push(planeNumview3);
          intelligentview.push(intelligentNumview3);
        } else if (this.userviewType === '') {
          carview.push(carNumview);
          motorcycleview.push(motorNumview);
          planeview.push(planeNumview);
          intelligentview.push(intelligentNumview);
        }
      });
      // console.log(carview);
      // console.log(motorcycleview);
      // console.log(planeview);
      // console.log(intelligentview);
      // console.log(this.carvideo);

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
            type: "line",
            smooth: true,
            data: intelligentview
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
    console.log('1111111111111111111111111111111111111111111111111111')
    let arr = this.initDateValue(new Date()).split("-");
    if (arr[1] == "01") {
      arr[0] = arr[0] - 1;
      arr[1] = "12";
    } else {
      arr[1] = arr[1] - 1;
    }
    arr.join("-");
    this.startTime = arr.join("-");
    this.startTime  = this.initDateValue(new Date(this.startTime));
    this.endTime = this.initDateValue(new Date());
    /** liushuya  2019-01-04 */
    let arrview = this.initDateValue(new Date()).split("-");
    if (arrview[1] == "01") {
      arrview[0] = arrview[0] - 1;
      arrview[1] = "12";
    } else {
      arrview[1] = arrview[1] - 1;
    }
    arrview.join("-");
    this.startviewTime = arrview.join("-");
    this.startviewTime  = this.initDateValue(new Date(this.startviewTime));
    this.endviewTime = this.initDateValue(new Date());
    // console.log(this.startTime);
    // console.log(this.endTime);
    console.log('2222222222222222222222222222222222222222222222222222')
    this.HttpClient.post("/admin/analysis/numCache", { type: 3 }).then(res => {
      // console.log(res);
      if (res.data.code === 200) {
        this.videoNum = res.data.data;
        console.log(res.data.data)
        this.videoNum.map(item => {
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
          item.number += Number(item.analysis.company_videos);
          item.number += Number(item.analysis.normal_videos);
          item.numberview = 0;
          item.numberview += Number(item.analysis.company_videos_view);
          item.numberview += Number(item.analysis.normal_videos_view);
          this.videoTotal += item.number;
          this.videoviewTotal += item.numberview;
        });
      }
    });
    console.log('33333333333333333333333333333333333333333333333333')
    this.getDataByDate();
    console.log('4444444444444444444444444444444444444444444444444444')
    this.getviewDataByDate();
    console.log('5555555555555555555555555555555555555555555555555555')
  }
};
</script>

<style scoped lang="less">
.bread {
  margin: 10px;
}
.content::-webkit-scrollbar {
  display: none;
}
.content {
  background: white;
  margin-left: 10px;
  margin-right: 10px;
  height: calc(100vh - 100px);
  width: calc(100vw - 240px);
  border-radius: 2px;
  overflow-y: auto;
  .title {
    text-align: left;
    line-height: 70px;
    padding: 0 40px;
    font-size: 20px;
    border-bottom: 1px solid #f2f2f2;
  }
  table,
  table tr table tr td {
    border: 1px solid #f2f2f2;
  }
  th {
    border: 1px solid #15bafe;
  }
  td {
    line-height: 55px;
    text-align: center;
    width: 100px;
    height: 55px;
  }
  .table {
    text-align: center;
    border-collapse: collapse;
    margin-top: 20px;
    margin-left: 20px;
    .my_th {
      height: 40px;
      line-height: 40px;
      background: #15bafe;
      color: white;
      font-size: 14px;
      span {
        margin-right: 10px;
        i {
          margin-right: 5px;
        }
      }
    }
    .tr1 {
      color: #808080;
      font-size: 14px;
    }
    .tr2 {
      color: #404040;
      font-size: 15px;
      font-weight: 600;
    }
  }
  .conditions {
    display: flex;
    margin-top: 20px;
    .date_item {
      display: flex;
      border: 1px solid #dcdfe6;
      margin-left: 20px;
      border-radius: 5px;
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
    margin-left: 20px;
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
</style>
<style lang="less">
.date_item {
  .el-input__inner {
    border: none !important;
  }
}
</style>
