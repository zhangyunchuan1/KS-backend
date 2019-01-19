<template>
  <div class="VideoData">
    <!--面包屑-->
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <!--主体内容-->
    <div class="videodiaData_main">
      <!--标题-->
      <div class="title">
        <p>视频数据</p>
        <p>
          <i class="iconfont icon-shuaxin"></i>
          刷新
        </p>
      </div>

      <!--内容盒子-->
      <div class="videodiaData_content">
        <!--表格-->
        <div class="videodia_table">
          <div class="table_title">
            <i class="iconfont icon-star"></i>视频总数 {{videodiaTotal}}
          </div>
          <div class="table_box">
            <div class="table_box_list" v-for="item in videodiaData" :key="item.id">
              <p>{{item.name}}</p>
              <p>{{item.number}}</p>
            </div>
          </div>
        </div>

        <div class="videodia_chart">
          <div class="conditions">
            <div class="date_item">
              <p class="date_label">开始</p>
              <el-date-picker
                v-model="startTime"
                class="date_picker_1"
                type="date"
                size="mini"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期">
              </el-date-picker>
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
                @change="getvideodiaDataByDate"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
            <el-select size="mini" class="select_type" v-model="userType" placeholder="用户类别" @change="drawLine">
              <el-option
                v-for="item in userOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
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
    </div>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import echarts from 'echarts'

  export default {
    name: "VideoData",
    data(){
      return{

        //时间选择范围限制
        pickerOptions: {
          disabledDate: (time) => {
            // console.log((time.getTime() - new Date(this.startTime).getTime()) / 1000 / 60 / 60 / 24);
            return ((time.getTime()-new Date(this.startTime).getTime())/1000/60/60/24)>31
          }
        },

        // 面包屑
        breadData: [
          {
            id: 1,
            name: '视频',
            urls: '/index/video',
            icon: 'icon-home'
          }, {
            id: 2,
            name: '视频数据',
            urls: '/index/video/video-data',
            icon: 'icon-home'
          }
        ],
        userOptions: [
          {
            value: 0,
            label: '全部'
          },
          {
            value: 2,
            label: '公司'
          },{
            value: 1,
            label: '普通用户'
          }
        ],


        startTime: '',//开始时间段
        endTime: '',//结束时间段
        userType: 0,

        categoryContent:false,
        videodiaData:[],//视频数据
        videodiaTotal:0,//视频总记录数
        // videodiaTotalview:0,//视频总记录数
        videodiaDataByDate:[],//某一时间段内视频数据
        carActivity:[],//汽车视频数据
        motorActivity:[],//摩托车视频数据
        planeActivity:[],//无人机视频数据
        intelligentActivity:[],//智能设备视频数据
        videodiaTotalByDate:0,//某时间段内视频总记录数
      }
    },
    components:{
      BreadCrumb,
    },
    mounted() {
      this.drawLine();
    },

    methods: {
      //数据曲线绘制
      drawLine(){

        let days=(new Date(this.endTime).getTime()-new Date(this.startTime).getTime())/1000/60/60/24;
        let begin=new Date(this.startTime).getDate();
        let year=new Date(this.startTime).getFullYear();
        let month=new Date(this.startTime).getMonth()+1;
        let dates=[],
          monthDay=0;
        //获取起始时间月份天数
        switch(month) {
          case 1: monthDay = 31; break;
          case 2:
            if(year%400 === 0 || (year%4 === 0 && year%100 !== 0)) { monthDay = 29; }//判断是否闰年
            else { monthDay = 28; }
            break;
          case 3: monthDay = 31; break;
          case 4: monthDay = 30; break;
          case 5: monthDay = 31; break;
          case 6: monthDay = 30; break;
          case 7: monthDay = 31; break;
          case 8: monthDay = 31; break;
          case 9: monthDay = 30; break;
          case 10: monthDay = 31; break;
          case 11: monthDay = 30; break;
          case 12: monthDay = 31; break;
        }
        //横坐标
        for(let i=0;i<days;i++){
          if(begin+i>monthDay){
            dates.push(begin+i-monthDay)
          }else{
            dates.push(begin+i)
          }
        }
        console.log(this.carActivity)
        let car=[],
          motorcycle=[],
          plane=[],
          intelligent=[];
        dates.map(date=> {
          let carNum = 0,
            carNum1 = 0,
            carNum2 = 0;
            // carNum3 = 0;
          let motorNum = 0,
            motorNum1 = 0,
            motorNum2 = 0;
            // motorNum3 = 0;
          let planeNum = 0,
            planeNum1 = 0,
            planeNum2 = 0;
            // planeNum3 = 0;
          let intelligentNum = 0,
            intelligentNum1 = 0,
            intelligentNum2 = 0;
            // intelligentNum3 = 0;
          this.carActivity.map(item => {
            if (new Date(year + '-' + month + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime() ||
              new Date(year + '-' + (month + 1) + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime()) {
              carNum += Number(item.videos);
              //按用户类型搜索
              if(item.user_type===1){
                carNum1+=Number(item.videos)
              }else if(item.user_type===2){
                carNum2+=Number(item.videos)
              }
              // else if(item.user_type===3){
              //   carNum3+=Number(item.videos)
              // }
            }
          });
          this.motorActivity.map(item => {
            if (new Date(year + '-' + month + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime() ||
              new Date(year + '-' + (month + 1) + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime()) {
              motorNum += Number(item.videos); 
              //按用户类型搜索
              if(item.user_type===1){
                motorNum1+=Number(item.videos)
              }else if(item.user_type===2){
                motorNum2+=Number(item.videos)
              }
              // else if(item.user_type===3){
              //   motorNum3+=Number(item.videos)
              // }
            }
          });
          this.planeActivity.map(item => {
            if (new Date(year + '-' + month + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime() ||
              new Date(year + '-' + (month + 1) + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime()) {
              planeNum += Number(item.videos);
              //按用户类型搜索
              if(item.user_type===1){
                planeNum1+=Number(item.videos)
              }else if(item.user_type===2){
                planeNum2+=Number(item.videos)
              }
              // else if(item.user_type===3){
              //   planeNum3+=Number(item.videos)
              // }
            }
          });
          this.intelligentActivity.map(item => {
            if (new Date(year + '-' + month + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime() ||
              new Date(year + '-' + (month + 1) + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime()) {
              intelligentNum += Number(item.videos);
              //按用户类型搜索
              if(item.user_type===1){
                intelligentNum1+=Number(item.videos)
              }else if(item.user_type===2){
                intelligentNum2+=Number(item.videos)
              }
              // else if(item.user_type===3){
              //   intelligentNum3+=Number(item.videos)
              // }
            }
          });
          if(this.userType===1){
            car.push(carNum1);
            motorcycle.push(motorNum1);
            plane.push(planeNum1);
            intelligent.push(intelligentNum1);
          }else if(this.userType===2){
            car.push(carNum2);
            motorcycle.push(motorNum2);
            plane.push(planeNum2);
            intelligent.push(intelligentNum2);
          }
          // else if(this.userType===3){
          //   car.push(carNum3);
          //   motorcycle.push(motorNum3);
          //   plane.push(planeNum3);
          //   intelligent.push(intelligentNum3);
          // }
          else{
            car.push(carNum);
            motorcycle.push(motorNum);
            plane.push(planeNum);
            intelligent.push(intelligentNum);
          }
        });
        // console.log(car)
        //求和
        this.carActivity.total=eval(car.join('+'));
        this.motorActivity.total=eval(motorcycle.join('+'));
        this.planeActivity.total=eval(plane.join('+'));
        this.intelligentActivity.total=eval(intelligent.join('+'));
        this.videodiaTotalByDate=this.carActivity.total+this.motorActivity.total+this.planeActivity.total+this.intelligentActivity.total;
        this.carActivity.percent=Number((this.carActivity.total/this.videodiaTotalByDate*100).toFixed(2));
        this.motorActivity.percent=Number((this.motorActivity.total/this.videodiaTotalByDate*100).toFixed(2));
        this.planeActivity.percent=Number((this.planeActivity.total/this.videodiaTotalByDate*100).toFixed(2));
        this.intelligentActivity.percent=Number((this.intelligentActivity.total/this.videodiaTotalByDate*100).toFixed(2));

        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: dates
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
            name: '汽车',
            type: 'line',
            smooth: true,
            data: car
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
              name: '摩托车',
              type: 'line',
              smooth: true,
              data: motorcycle
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
              name: '无人机',
              type: 'line',
              smooth: true,
              data: plane
            },
            {
              itemStyle: {
                normal: {
                  color: '#FFB82E',
                  lineStyle: {
                    color: '#FFB82E'
                  }
                }
              },
              name: "智能设备",
              data: intelligent,
              type: 'line',
              smooth: true

            }]
        });
      },
      //获取视频数据
      getvideodiaData(){
        this.HttpClient.post('/admin/analysis/numCache',{type:3})
          .then(res=>{
            console.log(res);
            if(res.data.code===200){
              this.videodiaData=res.data.data;
              console.log(this.videodiaData);
              this.videodiaData.map(item=>{
                item.number=0;
                item.numberview = 0;
                item.number+=Number(item.analysis.company_videos);
                item.numberview+=Number(item.analysis.company_videos_view);
                item.number+=Number(item.analysis.normal_videos);
                item.numberview+=Number(item.analysis.normal_videos_view);
                this.videodiaTotal+=item.number
                // this.videodiaTotalview+=item.numberview
              })
            }
          })
      },
      //获取某一时间段内视频浏览量数据
      getvideodiaDataByDate(){
        this.HttpClient.post('/admin/analysis/diagram',{type:3,begin:this.startTime?this.startTime:'',end:this.endTime?this.endTime:''})
          .then(res=>{
            console.log(this.startTime)
            console.log(res);
            if(res.data.code===200){
              this.videodiaDataByDate=res.data.data;
              console.log(res.data.data)
              this.carActivity=[];
              this.motorActivity=[];
              this.planeActivity=[];
              this.intelligentActivity=[];
              res.data.data.map(item=>{
                if(item.folder_type==='汽车'){
                  this.carActivity.push(item);
                }else if(item.folder_type==='摩托'){
                  this.motorActivity.push(item);
                }else if(item.folder_type==='无人机'){
                  this.planeActivity.push(item);
                }else{
                  this.intelligentActivity.push(item);
                }
              });
              this.drawLine()
            }
          })
      },
      /*****初始化时间格式*****/
      initFormat(date){
        if(date<10){
          date='0'+date;
        }
        return date
      },
      initDateValue(date){
        let year=date.getFullYear(),
          month=date.getMonth()+1,
          day=date.getDate(),
          hour=date.getHours(),
          minutes=date.getMinutes(),
          second=date.getSeconds();
        month=this.initFormat(month);
        day=this.initFormat(day);
        hour=this.initFormat(hour);
        minutes=this.initFormat(minutes);
        second=this.initFormat(second);
        return year+'-'+month+'-'+day+' '+hour + ':' + minutes + ':' + second
      }
    },
    created(){
      let arr=this.initDateValue(new Date()).split('-');
      arr[1]=arr[1]-1;
      arr.join('-');
      this.startTime=arr.join('-');
      this.endTime=this.initDateValue(new Date());
      console.log(this.startTime);
      console.log(this.endTime);
      this.getvideodiaData();
      this.getvideodiaDataByDate()
    }
  }
</script>

<style lang="less">
  .VideoData{
    .bread{
      margin: 10px;
    }
    .videodiaData_main::-webkit-scrollbar {display:none}
    .videodiaData_main{
      background: white;
      margin: 10px 10px 0 10px;
      height: calc(100vh - 150px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      padding-bottom: 50px;
      overflow-y: auto;

      /*标题*/
      .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 40px;
        margin-bottom: 30px;
        border-bottom: 1px solid #dedede;
      }

      .videodiaData_content{
        text-align: left;
        padding: 0 40px;

        .videodia_table{
          display: inline-block;
          .table_title{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            background: #15bafe;
            color: #fff;
            .iconfont{
              margin-right: 10px;
              position: relative;
              top: 2px;
            }
          }
          .table_box{
            display: flex;
            align-items: center;
            .table_box_list{
              min-width: 100px;
              p{
                border: 1px solid #dedede;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
              }
            }
          }
        }

        .videodia_chart{

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

        /*分类*/
        .videodia_category{
          margin-top: 30px;

          .category_box{
            display: flex;
            align-items: center;
            background: #fff;
            height: 80px;
            border: 1px solid #f2f2f2;
            margin-top: 20px;
            width: 540px;

            /*进度条*/
            .category_box_left{
              display: flex;
              align-items: center;
              width: 360px;
              padding: 10px 20px;

              .icon-qiche{
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
              .category_box_line{
                width: 100%;
                display: flex;
                flex: 1;
                align-items: center;

                .category_line_main{
                  flex: 1;
                  p{
                    font-size: 19px;
                    color: #222;
                    margin-bottom: 10px;
                    span{
                      font-size: 16px;
                      color: #999;
                    }
                  }
                }
                .category_line_nmb{
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
            .category_box_btm{
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0 20px;
              height: 100%;
              cursor: pointer;
              border-left: 1px solid #f2f2f2;
              color: #666666;
              font-size: 16px;

              i{
                margin-left: 10px;
                font-size: 24px;
                color: #666666;
              }
            }
          }

          .category_content{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .category_list{
              width: 25%;
              border: 1px solid #f2f2f2;
              background: #fff;
              padding: 20px 40px;
              box-sizing: border-box;
              .category_list_text{
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
