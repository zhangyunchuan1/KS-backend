<template>
  <div class="userAmount">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="userAmount_main">
      <!--标题-->
      <div class="title">
        <p>用户数量</p>
      </div>

      <div class="content">
        <div class="content_main">
          <!--图表-->
          <div class="content_chart">
            <div class="conditions">
              <div class="date_item">
                <p class="date_label">开始</p>
                <el-date-picker
                  v-model="startTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  placeholder="选择日期"
                  @change="handleChangeStartTime">
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
                  @change="handleChangeEndTime">
                </el-date-picker>
              </div>
              <!-- <el-select size="mini" class="select_type" v-model="userType" placeholder="全部" @change="handleChangeGender">
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
              <div class="userTotal">当前总用户数量 {{allUser.total}}</div>
            </div>
            <div class="shape_content">
              <div class="shape_header">
                <div class="shape_header_left">
                  <p class="left_title">注册数量统计</p>
                  <div class="time_range">
                    <span>{{startTimeChange}}</span>
                    <span>---</span>
                    <span>{{endTimeChange}}</span>
                  </div>
                </div>
                <div class="shape_header_right">
                  <div class="right_items">
                    <div class="point color1"></div>
                    <p>男占{{femalePercentage}}%</p>
                  </div>
                  <div class="right_items">
                    <div class="point color2"></div>
                    <p>女占{{malePercentage}}%</p>
                  </div>
                  <div class="right_items">
                    <div class="point color3"></div>
                    <p>保密占{{otherPercentage}}%</p>
                  </div>
                </div>
              </div>
              <div id="myChart" :style="{width:'100%',height: '400px'}"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- liushuya 2019-01-04 -->
      <!-- 用户登录数量 -->
       <div class="content">
        <div class="content_main">
          <!--图表-->
          <div class="content_chart">
            <div class="conditions">
              <div class="date_item">
                <p class="date_label">开始</p>
                <el-date-picker
                  v-model="startloginTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  placeholder="选择日期"
                  @change="handleChangeStartloginTime">
                </el-date-picker>
              </div>
              <div class="date_item">
                <p class="date_label">截止</p>
                <el-date-picker
                  v-model="endloginTime"
                  class="date_picker_1"
                  type="date"
                  size="mini"
                  placeholder="选择日期"
                  @change="handleChangeEndloginTime">
                </el-date-picker>
              </div>
              <el-select size="mini" class="select_type" v-model="userloginType" placeholder="全部" @change="handleloginChangeGender">
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="userTotal">今日登录用户数量： {{allloginUser.total}}</div>
            </div>
            <div class="shape_content">
              <div class="shape_header">
                <div class="shape_header_left">
                  <p class="left_title">登录数据统计</p>
                  <div class="time_range">
                    <span>{{startTimeloginChange}}</span>
                    <span>---</span>
                    <span>{{endTimeloginChange}}</span>
                  </div>
                </div>
                <div class="shape_header_right">
                  <div class="right_items">
                    <div class="point color1"></div>
                    <p>男占{{femaleloginPercentage}}%</p>
                  </div>
                  <div class="right_items">
                    <div class="point color2"></div>
                    <p>女占{{maleloginPercentage}}%</p>
                  </div>
                  <div class="right_items">
                    <div class="point color3"></div>
                    <p>保密占{{otherloginPercentage}}%</p>
                  </div>
                </div>
              </div>
              <div id="myloginChart" :style="{width:'100%',height: '400px'}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from "@/components/public/BreadCrumb"
  import echarts from 'echarts'

  export default {
    name: "UserAmount",
    components: {
      BreadCrumb
    },
    data() {
      return {
        // 面包屑
        breadData: [
          {
            id: 1,
            name: "用户管理",
            urls: "/index/standardUser/StandardUser",
            icon: "icon-home"
          }, {
            id: 2,
            name: "用户账户",
            urls: "/index/standardUser/userManagement/UserManagement",
            icon: "icon-home"
          }, {
            id: 3,
            name: "用户数量",
            urls: "/index/standardUser/userManagement/UserAmount",
            icon: "icon-home"
          }
        ],

        userOptions: [{
          value: 4,
          label: '全部'
        },{
          value: 1,
          label: '男'
        },{
          value: 2,
          label: '女'
        },{
          value: 3,
          label: '保密'
        }],

        startTime: '',
        endTime: '',
        startTimeChange:'',
        endTimeChange:'',
        startTimeloginChange:'',
        endTimeloginChange:'',
        userType: 4,
        userloginType:4,
        allUser:{},  //所有用户
        allloginUser:{},  //所有用户

        /** liushuya 2019-01-04 */
        startloginTime:'',
        endloginTime:'',


        //图标数据
        femaleData:[],
        maleData:[],
        otherData:[],
        days:[],  //表格天数

        /** liushuya 2019-01-04 */
        femaleloginData:[],
        maleloginData:[],
        otherloginData:[],
        dayslogin:[],  //表格天数

        //百分比
        femalePercentage:null,  //男百分比
        malePercentage:null,  //女百分比
        otherPercentage:null,  //保密百分比

        /** liushuya 2019-01-04 */
        femaleloginPercentage:null,  //男百分比
        maleloginPercentage:null,  //女百分比
        otherloginPercentage:null,  //保密百分比
      }
    },
    mounted() {
      let now = new Date();
      this.startTime = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+'01'+' '+'00:00';
      /** liushuya 2019-01-04 */
      this.startTimeChange = now.getFullYear()+'-'+(now.getMonth()<10?'0'+(now.getMonth()+1):now.getMonth()+1)+'-'+'01';
      // console.log(this.startTimeChange)
      this.endTime = new Date();
      var d = new Date(this.endTime);  
      /** liushuya 2019-01-04 */
      this.endTimeChange=d.getFullYear() + '-' + (now.getMonth()<10?'0'+(now.getMonth()+1):now.getMonth()+1) + '-' + (d.getDate()<10?'0'+d.getDate():d.getDate()); 
      // console.log(this.startTime)

      this.startloginTime = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+'01'+' '+'00:00';
      /** liushuya 2019-01-04 */
      this.startTimeloginChange = now.getFullYear()+'-'+(now.getMonth()<10?'0'+(now.getMonth()+1):now.getMonth()+1)+'-'+'01';
      // console.log(this.startTimeChange)
      this.endloginTime = new Date();
      // var d = new Date(this.endTime);  
      /** liushuya 2019-01-04 */
      this.endTimeloginChange=d.getFullYear() + '-' + (now.getMonth()<10?'0'+(now.getMonth()+1):now.getMonth()+1) + '-' + (d.getDate()<10?'0'+d.getDate():d.getDate()); 
      this.getData();
      this.getloginData();
      this.getAllUser();
      this.getAllloginUser();
    },

    methods: {
      //根据性别搜索
      handleChangeGender(){
        // console.log(this.userType);
        this.getData();
      },
      handleloginChangeGender(){
        this.getloginData();
      },
      //开始时间搜索
      handleChangeStartTime(){
        var d = new Date(this.startTime);  
        this.startTimeChange=d.getFullYear() + '-' + (d.getMonth()<10?'0'+(d.getMonth() + 1):d.getMonth() + 1) + '-' + (d.getDate()<10?'0'+d.getDate():d.getDate()); 
        this.getData();
      },
      //截止时间搜索
      handleChangeEndTime(){
        var d = new Date(this.endTime);  
        this.endTimeChange=d.getFullYear() + '-' + (d.getMonth()<10?'0'+(d.getMonth() + 1):d.getMonth() + 1) + '-' + (d.getDate()<10?'0'+d.getDate():d.getDate()); 
        this.getData();
      },

      /** liushuya 2018-01-04 */
      // 用户登录开始时间搜索
      handleChangeStartloginTime(){
        var d = new Date(this.startloginTime);  
        this.startTimeloginChange=d.getFullYear() + '-' + (d.getMonth()<10?'0'+(d.getMonth() + 1):d.getMonth() + 1) + '-' + (d.getDate()<10?'0'+d.getDate():d.getDate()); 
        this.getloginData();
      },
      //用户登录截止时间搜索
      handleChangeEndloginTime(){
        var d = new Date(this.endloginTime); 
        this.endTimeloginChange=d.getFullYear() + '-' + (d.getMonth()<10?'0'+(d.getMonth() + 1):d.getMonth() + 1) + '-' + (d.getDate()<10?'0'+d.getDate():d.getDate()); 
        this.getloginData();
      },
      
      getData(){
        this.femaleData = [],this.maleData = [],this.otherData = [];
        this.HttpClient.post('/admin/users/registerLists',{
            start_time:this.startTime,
            end_time:this.endTime,
            gender:this.userType
        })
        .then(res=>{
          console.log(res.data.data)
            // console.log(Object.keys(res.data.data));
            let days = [];
            for(let k in Object.keys(res.data.data)){
                days.push(parseInt(Object.keys(res.data.data)[k].charAt(Object.keys(res.data.data)[k].length - 2)+Object.keys(res.data.data)[k].charAt(Object.keys(res.data.data)[k].length - 1)))
            }
            // console.log(days);
            this.days = days;

            for(let i in res.data.data){
                this.femaleData.push(res.data.data[i].female);
                this.maleData.push(res.data.data[i].male);
                this.otherData.push(res.data.data[i].other);
            }
            this.drawLine();
        })
      },
      /** liushuya 2019-01-04 */
      getloginData(){
        this.femaleloginData = [],this.maleloginData = [],this.otherloginData = [];
        this.HttpClient.post('/admin/users/loginLists',{
            start_time:this.startloginTime,
            end_time:this.endloginTime,
            gender:this.userloginType
        })
        .then(res=>{
          console.log(res.data.data)
            // console.log(Object.keys(res.data.data));
            let days = [];
            for(let k in Object.keys(res.data.data)){
                days.push(parseInt(Object.keys(res.data.data)[k].charAt(Object.keys(res.data.data)[k].length - 2)+Object.keys(res.data.data)[k].charAt(Object.keys(res.data.data)[k].length - 1)))
            }
            // console.log(days);
            this.dayslogin = days;

            for(let i in res.data.data){
                this.femaleloginData.push(res.data.data[i].female);
                this.maleloginData.push(res.data.data[i].male);
                this.otherloginData.push(res.data.data[i].other);
            }
            console.log(this.femaleloginData)
            this.drawloginLine();
        })
      },
      //获取总的用户量
      getAllUser(){
        this.HttpClient.post('/admin/users/registerNow',{
        })
        .then(res=>{
            // console.log(res);
            this.allUser = res.data.data;
            this.femalePercentage = (res.data.data.female/res.data.data.total*100).toFixed(2);
            this.malePercentage = (res.data.data.male/res.data.data.total*100).toFixed(2);
            this.otherPercentage = (res.data.data.other/res.data.data.total*100).toFixed(2);
        })
      },
      /** liushuya 2019-01-04 */
      getAllloginUser(){
        this.HttpClient.post('/admin/users/loginNow',{
        })
        .then(res=>{
            console.log(res);
            this.allloginUser = res.data.data;
            this.femaleloginPercentage = (res.data.data.female/res.data.data.total*100).toFixed(2);
            this.maleloginPercentage = (res.data.data.male/res.data.data.total*100).toFixed(2);
            this.otherloginPercentage = (res.data.data.other/res.data.data.total*100).toFixed(2);
        })
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            // data: ['1', '2', '3', '4', '5', '6', '7','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
            data:this.days
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            itemStyle: {
              normal: {
                color: '#009efb',
                lineStyle: {
                  color: '#009efb'
                }
              }
            },
            name: '男',
            type: 'line',
            smooth: true,
            data: this.maleData
          },
            {
              itemStyle: {
                normal: {
                  color: '#55ce63',
                  lineStyle: {
                    color: '#55ce63'
                  }
                }
              },
              name: '女',
              type: 'line',
              smooth: true,
              data: this.femaleData
            },
            {
              itemStyle: {
                normal: {
                  color: '#ff7676',
                  lineStyle: {
                    color: '#ff7676'
                  }
                }
              },
              name: '保密',
              type: 'line',
              smooth: true,
              data: this.otherData
            }]
        });
      },
      /** liushuya 2019-01-04 */
      drawloginLine(){
        // 基于准备好的dom，初始化echarts实例
        let myloginChart = echarts.init(document.getElementById('myloginChart'))
        // 绘制图表
        myloginChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            // data: ['1', '2', '3', '4', '5', '6', '7','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
            data:this.dayslogin
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            itemStyle: {
              normal: {
                color: '#009efb',
                lineStyle: {
                  color: '#009efb'
                }
              }
            },
            name: '男',
            type: 'line',
            smooth: true,
            data: this.maleloginData
          },
            {
              itemStyle: {
                normal: {
                  color: '#55ce63',
                  lineStyle: {
                    color: '#55ce63'
                  }
                }
              },
              name: '女',
              type: 'line',
              smooth: true,
              data: this.femaleloginData
            },
            {
              itemStyle: {
                normal: {
                  color: '#ff7676',
                  lineStyle: {
                    color: '#ff7676'
                  }
                }
              },
              name: '保密',
              type: 'line',
              smooth: true,
              data: this.otherloginData
            }]
        });
      }
    }
  }
</script>

<style lang="less">
  .userAmount{
    text-align: left;
    .bread {
      margin: 10px;
    }
    .userAmount_main::-webkit-scrollbar {
      display: none;
    }
    .userAmount_main {
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

        .content_header {
          display: flex;
          align-items: center;
        }
        .content_select{
          display: flex;
          align-items: center;
          margin-left: 20px;
          .el-select{
            width: 100px;
          }
          p{
            margin-left: 20px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 25px;
            background: #15bafe;
            color: #fff;
            border-radius: 2px;
          }
        }


        .content_main{
          .content_chart{
            width: 60%;
            .conditions{
              display: flex;
              margin-top: 20px;
              .date_item{
                display: flex;
                border: 1px solid #dcdfe6;
                border-radius: 5px;
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
              .select_type{
                width: 120px;
                margin-left: 20px;
              }
              .userTotal{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 28px;
                padding: 0 20px;
                background: #15bafe;
                color: #fff;
                border-radius: 3px;
                box-sizing: border-box;
                font-size: 14px;
                margin-left: 20px;
              }

            }
            .shape_content{
              min-width: 500px;
              border: 1px solid #f2f2f2;
              margin-top: 20px;
              padding-bottom: 20px;
              .shape_header{
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
                margin-left: 20px;
                .shape_header_left{
                  .left_title{
                    font-size: 16px;
                    font-weight: 600;
                    color: #404040;
                    text-align: left;
                  }
                  .time_range{
                    font-size: 12px;
                    color: #808080;
                    margin-top: 5px;
                  }
                }
                .shape_header_right{
                  display: flex;
                  .right_items{
                    display: flex;
                    align-items: center;
                    margin-right: 15px;
                    .point{
                      height: 8px;
                      width: 8px;
                      border-radius: 50%;
                      background: #15bafe;
                    }
                    p{
                      font-size: 13px;
                      margin-left: 5px;
                    }
                    .color1{background: #15bafe}
                    .color2{background: #55ce63}
                    .color3{background: #ff5858}
                    .color4{background: #FFB82E}
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
