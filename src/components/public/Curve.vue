<template>
  <div class="curve" id="curve" style="height: 400px">

  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: "Curve",
    props: ['curveData'],
    data() {
      return {}
    },
    mounted() {
      console.log(this.curveData);
      this.drawLine();

    },
    methods: {
      drawLine() {

          let days=(new Date(this.curveData.endTime).getTime()-new Date(this.curveData.startTime).getTime())/1000/60/60/24;
          let begin=new Date(this.curveData.startTime).getDate();
          let year=new Date(this.curveData.startTime).getFullYear();
          let yearb=new Date(this.curveData.endTime).getFullYear();
          let month=new Date(this.curveData.startTime).getMonth()+1;
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
          for(let i=0;i<days;i++){
              if(begin+i>monthDay){
                  dates.push(begin+i-monthDay)
              }else{
                  dates.push(begin+i)
              }
          }
                let car=[],
                motorcycle=[],
                plane=[],
                intelligent=[];
        // console.log((new Date(this.curveData.cuCar[2].created_at)).getFullYear() === year+1)
        for(let i=0;i<dates.length;i++){
            car[i] = 0;
            motorcycle[i] = 0;
            plane[i] = 0;
            intelligent[i] = 0;
            if(i===0){
                for(let k=0;k<this.curveData.cuCar.length;k++){     //提出汽车数据
                    if(year+1 === (new Date(this.curveData.cuCar[k].created_at)).getFullYear()){    
                        car[dates.length-1] = car[dates.length-1]+this.curveData.cuCar[k].actives
                    }else(
                        car[i] = car[i]+this.curveData.cuCar[k].actives
                    )
                }  
                for(let k=0;k<this.curveData.cuMotor.length;k++){     //提出摩托数据
                    if(year+1 === (new Date(this.curveData.cuMotor[k].created_at)).getFullYear()){    
                        motorcycle[dates.length-1] = motorcycle[dates.length-1]+this.curveData.cuMotor[k].actives
                    }else(
                        motorcycle[i] = motorcycle[i]+this.curveData.cuMotor[k].actives
                    )
                }  
                for(let k=0;k<this.curveData.cuPlan.length;k++){     //提出模型数据
                    if(year+1 === (new Date(this.curveData.cuPlan[k].created_at)).getFullYear()){    
                        plane[dates.length-1] = plane[dates.length-1]+this.curveData.cuPlan[k].actives
                    }else(
                        plane[i] = plane[i]+this.curveData.cuPlan[k].actives
                    )
                } 
                for(let k=0;k<this.curveData.cuIntelligent.length;k++){     //提出智能设备数据
                    if(year+1 === (new Date(this.curveData.cuIntelligent[k].created_at)).getFullYear()){    
                        intelligent[dates.length-1] = intelligent[dates.length-1]+this.curveData.cuIntelligent[k].actives
                    }else(
                        intelligent[i] = intelligent[i]+this.curveData.cuIntelligent[k].actives
                    )
                } 
            }else{
                for(let k=0;k<this.curveData.cuCar.length;k++){     //提出汽车数据
                    if(dates[i] === (new Date(this.curveData.cuCar[k].created_at)).getDate()){    
                        car[i] = car[i]+this.curveData.cuCar[k].actives;  
                    }else(
                        car[i] = car[i]
                    )
                }
                for(let k=0;k<this.curveData.cuMotor.length;k++){     //提出摩托数据
                    if(dates[i] === (new Date(this.curveData.cuMotor[k].created_at)).getDate()){    
                        motorcycle[i] = motorcycle[i]+this.curveData.cuMotor[k].actives;  
                    }else(
                        motorcycle[i] = motorcycle[i]
                    )
                }
                for(let k=0;k<this.curveData.cuPlan.length;k++){     //提出模型数据
                    if(dates[i] === (new Date(this.curveData.cuPlan[k].created_at)).getDate()){    
                        plane[i] = plane[i]+this.curveData.cuPlan[k].actives;  
                    }else(
                        plane[i] = plane[i]
                    )
                }
                for(let k=0;k<this.curveData.cuIntelligent.length;k++){     //提出智能设备数据
                    if(dates[i] === (new Date(this.curveData.cuIntelligent[k].created_at)).getDate()){    
                        intelligent[i] = intelligent[i]+this.curveData.cuIntelligent[k].actives;  
                    }else(
                        intelligent[i] = intelligent[i]
                    )
                }
            }
        }
        console.log(car,motorcycle,plane,intelligent);
        /*****************************************^zyc^*********************************************/
        //    console.log(dates)
        //   dates.map(date=> {
        //       let carNum = 0;
        //       let motorNum = 0;
        //       let planeNum = 0;
        //       let intelligentNum = 0;
        //       if(date<10){
        //           date='0'+date;
        //       }
        //       this.curveData.cuCar.map(item => {
        //           if (new Date(year + '-' + month + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime() ||
        //               new Date(year + '-' + (month + 1) + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime()) {
        //                 console.log(1);
        //               carNum += Number(item.actives);
        //           }
        //       });
        //       this.curveData.cuMotor.map(item => {
        //           if (new Date(year + '-' + month + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime() ||
        //               new Date(year + '-' + (month + 1) + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime()) {
        //                 console.log(2);
        //               motorNum += Number(item.actives);
        //           }
        //       });
        //       this.curveData.cuPlan.map(item => {
        //           if (new Date(year + '-' + month + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime() ||
        //               new Date(year + '-' + (month + 1) + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime()) {
        //                   console.log(3);
        //               planeNum += Number(item.actives);
        //           }
        //       });
        //       this.curveData.cuIntelligent.map(item => {
        //           if (new Date(year + '-' + month + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime() ||
        //               new Date(year + '-' + (month + 1) + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime()) {
        //                   console.log(4);
        //               intelligentNum += Number(item.actives);
        //           }
        //       });
        //       car.push(carNum);
        //       motorcycle.push(motorNum);
        //       plane.push(planeNum);
        //       intelligent.push(intelligentNum);
        //       console.log(carNum)
        //   });
        // this.dates.push(this.dates[this.dates.length-1]+1)
            // car = [1,2,3,4,5,6,7,7,8,9,5,8,8,5,2,8,6,6,5,7,5,9,2,7,1,7,1,7,5,7,8]
            var myChart = echarts.init(document.getElementById("curve"));
        myChart.setOption({
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
            name: "汽车",
            data: car,
            type: 'line',
            smooth: true
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
              name: "摩托车",
              data: motorcycle,
              type: 'line',
              smooth: true

            },
            {
              itemStyle: {
                normal: {
                  color: '#ff7676',
                  lineStyle: {
                    color: '#ff7676'
                  },
                }
              },
              name: "无人机",
              data: plane,
              type: 'line',
              smooth: true

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
                  name: "无人机",
                  data: intelligent,
                  type: 'line',
                  smooth: true

              }]
        });
        let totalData={
            car:this.sum(car),
            motor:this.sum(motorcycle),
            plane:this.sum(plane),
            intelligent:this.sum(intelligent),
        };
          console.log(totalData);
          this.$emit('sendTotal',totalData)
      },
      //数组求和
      sum(arr) {
          return eval(arr.join("+"));
      }
    },
    watch:{
        curveData:{
            handler(){
                console.log(this.curveData);
                this.drawLine()
            },
            deep:true,
            // immediate:true
        }
    }
  }
</script>

<style scoped>
  .curve {
    border: 0 ! important;
  }
</style>
