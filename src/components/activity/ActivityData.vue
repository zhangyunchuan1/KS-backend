<template>
    <div class="activity-data">
        <div class="head">
            活动数据     
        </div>
        <div class="content">
            <div class="title">
                <p>活动数据</p>
                <p @click="handleRefresh">
                    <img src="../../assets/image/new.png" alt="">
                    <span>刷新</span>
                </p>
            </div>
            <div class="box">
                <!-- 活动总数据 -->
                <div class="act-all">
                    <div class="til">
                        <img src="../../assets/image/xin.png" alt="">
                        <span>活动总数&nbsp;&nbsp;{{activityTotal}}</span>
                    </div>
                    <div class="lei cl-lei">
                        <div class="shu" v-for="item in activityType" :key="item.id">{{item.name}}</div>
                    </div>
                    <div class="lei">
                        <div class="shu" v-for="item in activityType" :key="item.id">{{item.number}}</div>
                    </div>
                </div>
                <!-- 选择时间 -->
                <div class="slect">
                    <div class="riqi">
                        <div class="start">
                            <span>开始</span>
                            <el-date-picker
                                    v-model="startTime"
                                    class="inputdata"
                                    type="date"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期"
                                    @change="getActivityData">
                            </el-date-picker>
                        </div>
                        <div class="end">
                            <span>截止</span>
                            <el-date-picker
                                    v-model="endTime"
                                    class="inputdata"
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    @change="getActivityData"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </div>
                    <!-- 曲线图 -->
                    <div class="curve">
                        <div class="bt-title">
                            <div class="cur-left">
                                <p>活动数据曲线图</p>
                                <span>{{startTime.split(' ')[0]}}——{{endTime.split(' ')[0]}}</span>
                            </div>
                            <div class="cur-right">
                                <div>
                                    <div class="qiche"></div>
                                    <span>汽车</span>
                                </div>
                                <div>
                                    <div class="motoche"></div>
                                    <span>摩托车</span>
                                </div>
                                <div>
                                    <div class="wurenji"></div>
                                    <span>无人机</span>
                                </div>
                                <div>
                                    <div class="intelligent"></div>
                                    <span>智能设备</span>
                                </div>
                            </div>
                        </div>
                        <Curve :curveData="curveData" @sendTotal="getTotalData"></Curve>
                    </div>
                    <!-- 汽车数据 -->
                    <div class="car">
                        <div class="car-top">
                            <img src="../../assets/image/qiche.png" alt="">
                            <div class="jindu">
                                <div class="jindu-top">
                                    <span>汽车</span>
                                    <span>CAR</span>
                                </div>
                                <div class="color">
                                    <div></div>
                                </div>
                            </div>
                            <div class="baifb">
                                <p>{{carInfoPercent}}</p>
                                    <p style="font-size:16px">{{carInfoData}}</p>
                            </div>
                            <div class="car-info" @click="eject($event,1)">
                                <div>
                                    <span>汽车详情</span>
                                    <img  src="../../assets/image/yuanjtx.png" alt="" >
                                    <!-- <img  src="../../assets/image/yuanjt.png" alt="" class="rotate"> -->
                                </div>
                            </div>
                        </div>
                        <!-- 汽车分类 -->
                        <div v-if="showCar">
                            <div class="qc-category">
                                <div class="category" v-for="(item,index) in carTwoMenu" :key="index">
                                    <div class="category-top">
                                        <span>{{item.name}}</span>
                                        <span>{{item.number}}</span>
                                        <span>{{item.infoPercent}}%</span>
                                    </div>
                                    <div class="category-color">
                                        <div :style="{width:item.infoPercent+'%'}"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 摩托车数据 -->
                    <div class="car">
                        <div class="car-top">
                            <img src="../../assets/image/motuo.png" alt="">
                            <div class="jindu">
                                <div class="jindu-top">
                                    <span>摩托车</span>
                                    <span>MOTO</span>
                                </div>
                                <div class="color">
                                    <div></div>
                                </div>
                            </div>
                            <div class="baifb">
                                <p>{{motoInfoPercent}}</p>
                                    <p style="font-size:16px">{{motoInfoData}}</p>
                            </div>
                            <div class="car-info"  @click="eject($event,2)">
                                <div>
                                    <span>摩托车详情</span>
                                    <img  src="../../assets/image/yuanjtx.png" alt="" >
                                    <!-- <img  src="../../assets/image/yuanjt.png" alt="" class="rotate"> -->
                                </div>
                            </div>
                        </div>
                        <!-- 摩托车分类 -->
                        <div v-if="showMoto" class="qc-category" >
                            <div class="category" v-for="(item,index) in motoTwoMenu" :key="index">
                                <div class="category-top">
                                        <span>{{item.name}}</span>
                                        <span>{{item.number}}</span>
                                        <span>{{item.infoPercent}}%</span>
                                    </div>
                                    <div class="category-color">
                                        <div :style="{width:item.infoPercent+'%'}"></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <!-- 无人机 -->
                    <div class="car">
                        <div class="car-top">
                            <img src="../../assets/image/plan.png" alt="">
                            <div class="jindu">
                                <div class="jindu-top">
                                    <span>无人机</span>
                                    <span>UAV</span>
                                </div>
                                <div class="color">
                                    <div></div>
                                </div>
                            </div>
                            <div class="baifb">
                                <p>{{planInfoPercent}}</p>
                                <p style="font-size:16px">{{planInfoData}}</p>
                            </div>
                            <div class="car-info"  @click="eject($event,3)">
                                <div>
                                    <span>无人机详情</span>
                                    <img  src="../../assets/image/yuanjtx.png" alt="" >
                                    <!-- <img  src="../../assets/image/yuanjt.png" alt="" class="rotate"> -->
                                </div>
                            </div>
                        </div>
                        <!-- 无人机分类 -->
                        <div v-if="showPlan" class="qc-category" >
                            <div class="category" v-for="(item,index) in planTwoMenu" :key="index">
                                <div class="category-top">
                                        <span>{{item.name}}</span>
                                        <span>{{item.number}}</span>
                                        <span>{{item.infoPercent}}%</span>
                                    </div>
                                    <div class="category-color">
                                        <div :style="{width:item.infoPercent+'%'}"></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <!--智能设备-->
                    <div class="car">
                        <div class="car-top">
                            <img src="../../assets/image/plan.png" alt="">
                            <div class="jindu">
                                <div class="jindu-top">
                                    <span>智能设备</span>
                                    <span>SMART</span>
                                </div>
                                <div class="color">
                                    <div></div>
                                </div>
                            </div>
                            <div class="baifb">
                                <p>{{intInfoPercent}}</p>
                                <p style="font-size:16px">{{intInfoData}}</p>   
                            </div>
                            <div class="car-info"  @click="eject($event,4)">
                                <div>
                                    <span>无人机详情</span>
                                    <img  src="../../assets/image/yuanjtx.png" alt="" >
                                    <!-- <img  src="../../assets/image/yuanjt.png" alt="" class="rotate"> -->
                                </div>
                            </div>
                        </div>
                        <!-- 智能设备分类 -->
                        <div v-if="showInt" class="qc-category" >
                            <div class="category" v-for="(item,index) in intTwoMenu" :key="index">
                                <div class="category-top">
                                        <span>{{item.name}}</span>
                                        <span>{{item.number}}</span>
                                        <span>{{item.infoPercent}}%</span>
                                    </div>
                                    <div class="category-color">
                                        <div :style="{width:item.infoPercent+'%'}"></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--活动浏览量-->


        <div class="content">
            <div class="title">
                <p>活动数据</p>
                <p @click="handleRefresh">
                    <img src="../../assets/image/new.png" alt="">
                    <span>刷新</span>
                </p>
            </div>
            <div class="box">
                <!-- 活动总数据 -->
                <div class="act-all">
                    <div class="til">
                        <img src="../../assets/image/xin.png" alt="">
                        <span>活动总数&nbsp;&nbsp;{{activityTotal}}</span>
                    </div>
                    <div class="lei cl-lei">
                        <div class="shu" v-for="item in activityType" :key="item.id">{{item.name}}</div>
                    </div>
                    <div class="lei">
                        <div class="shu" v-for="item in activityType" :key="item.id">{{item.number}}</div>
                    </div>
                </div>
                <!-- 选择时间 -->
                <div class="slect">
                    <div class="riqi">
                        <div class="start">
                            <span>开始</span>
                            <el-date-picker
                                    v-model="startTime"
                                    class="inputdata"
                                    type="date"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期"
                                    @change="getActivityData">
                            </el-date-picker>
                        </div>
                        <div class="end">
                            <span>截止</span>
                            <el-date-picker
                                    v-model="endTime"
                                    class="inputdata"
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    @change="getActivityData"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </div>
                    <!-- 曲线图 -->
                    <div class="curve">
                        <div class="bt-title">
                            <div class="cur-left">
                                <p>活动数据曲线图</p>
                                <span>{{startTime.split(' ')[0]}}——{{endTime.split(' ')[0]}}</span>
                            </div>
                            <div class="cur-right">
                                <div>
                                    <div class="qiche"></div>
                                    <span>汽车</span>
                                </div>
                                <div>
                                    <div class="motoche"></div>
                                    <span>摩托车</span>
                                </div>
                                <div>
                                    <div class="wurenji"></div>
                                    <span>无人机</span>
                                </div>
                                <div>
                                    <div class="intelligent"></div>
                                    <span>智能设备</span>
                                </div>
                            </div>
                        </div>
                        <Curve :curveData="curveData" @sendTotal="getTotalData"></Curve>
                    </div>
                    <!-- 汽车数据 -->
                    <div class="car">
                        <div class="car-top">
                            <img src="../../assets/image/qiche.png" alt="">
                            <div class="jindu">
                                <div class="jindu-top">
                                    <span>汽车</span>
                                    <span>CAR</span>
                                </div>
                                <div class="color">
                                    <div></div>
                                </div>
                            </div>
                            <div class="baifb">
                                <p>{{carInfoPercent}}</p>
                                    <p style="font-size:16px">{{carInfoData}}</p>
                            </div>
                            <div class="car-info" @click="eject($event,1)">
                                <div>
                                    <span>汽车详情</span>
                                    <img  src="../../assets/image/yuanjtx.png" alt="" >
                                    <!-- <img  src="../../assets/image/yuanjt.png" alt="" class="rotate"> -->
                                </div>
                            </div>
                        </div>
                        <!-- 汽车分类 -->
                        <div v-if="showCar">
                            <div class="qc-category">
                                <div class="category" v-for="(item,index) in carTwoMenu" :key="index">
                                    <div class="category-top">
                                        <span>{{item.name}}</span>
                                        <span>{{item.number}}</span>
                                        <span>{{item.infoPercent}}%</span>
                                    </div>
                                    <div class="category-color">
                                        <div :style="{width:item.infoPercent+'%'}"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 摩托车数据 -->
                    <div class="car">
                        <div class="car-top">
                            <img src="../../assets/image/motuo.png" alt="">
                            <div class="jindu">
                                <div class="jindu-top">
                                    <span>摩托车</span>
                                    <span>MOTO</span>
                                </div>
                                <div class="color">
                                    <div></div>
                                </div>
                            </div>
                            <div class="baifb">
                                <p>{{motoInfoPercent}}</p>
                                    <p style="font-size:16px">{{motoInfoData}}</p>
                            </div>
                            <div class="car-info"  @click="eject($event,2)">
                                <div>
                                    <span>摩托车详情</span>
                                    <img  src="../../assets/image/yuanjtx.png" alt="" >
                                    <!-- <img  src="../../assets/image/yuanjt.png" alt="" class="rotate"> -->
                                </div>
                            </div>
                        </div>
                        <!-- 摩托车分类 -->
                        <div v-if="showMoto" class="qc-category" >
                            <div class="category" v-for="(item,index) in motoTwoMenu" :key="index">
                                <div class="category-top">
                                        <span>{{item.name}}</span>
                                        <span>{{item.number}}</span>
                                        <span>{{item.infoPercent}}%</span>
                                    </div>
                                    <div class="category-color">
                                        <div :style="{width:item.infoPercent+'%'}"></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <!-- 无人机 -->
                    <div class="car">
                        <div class="car-top">
                            <img src="../../assets/image/plan.png" alt="">
                            <div class="jindu">
                                <div class="jindu-top">
                                    <span>无人机</span>
                                    <span>UAV</span>
                                </div>
                                <div class="color">
                                    <div></div>
                                </div>
                            </div>
                            <div class="baifb">
                                <p>{{planInfoPercent}}</p>
                                <p style="font-size:16px">{{planInfoData}}</p>
                            </div>
                            <div class="car-info"  @click="eject($event,3)">
                                <div>
                                    <span>无人机详情</span>
                                    <img  src="../../assets/image/yuanjtx.png" alt="" >
                                    <!-- <img  src="../../assets/image/yuanjt.png" alt="" class="rotate"> -->
                                </div>
                            </div>
                        </div>
                        <!-- 无人机分类 -->
                        <div v-if="showPlan" class="qc-category" >
                            <div class="category" v-for="(item,index) in planTwoMenu" :key="index">
                                <div class="category-top">
                                        <span>{{item.name}}</span>
                                        <span>{{item.number}}</span>
                                        <span>{{item.infoPercent}}%</span>
                                    </div>
                                    <div class="category-color">
                                        <div :style="{width:item.infoPercent+'%'}"></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <!--智能设备-->
                    <div class="car">
                        <div class="car-top">
                            <img src="../../assets/image/plan.png" alt="">
                            <div class="jindu">
                                <div class="jindu-top">
                                    <span>智能设备</span>
                                    <span>SMART</span>
                                </div>
                                <div class="color">
                                    <div></div>
                                </div>
                            </div>
                            <div class="baifb">
                                <p>{{intInfoPercent}}</p>
                                <p style="font-size:16px">{{intInfoData}}</p>   
                            </div>
                            <div class="car-info"  @click="eject($event,4)">
                                <div>
                                    <span>无人机详情</span>
                                    <img  src="../../assets/image/yuanjtx.png" alt="" >
                                    <!-- <img  src="../../assets/image/yuanjt.png" alt="" class="rotate"> -->
                                </div>
                            </div>
                        </div>
                        <!-- 智能设备分类 -->
                        <div v-if="showInt" class="qc-category" >
                            <div class="category" v-for="(item,index) in intTwoMenu" :key="index">
                                <div class="category-top">
                                        <span>{{item.name}}</span>
                                        <span>{{item.number}}</span>
                                        <span>{{item.infoPercent}}%</span>
                                    </div>
                                    <div class="category-color">
                                        <div :style="{width:item.infoPercent+'%'}"></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Curve from '@/components/public/Curve'
import echarts from 'echarts'
    export default {
        name: "ActivityData",
        components:{
            Curve
        },
        data (){
            return {

                //时间选择范围限制
                pickerOptions: {
                    disabledDate: (time) => {
                        // console.log((time.getTime() - new Date(this.startTime).getTime()) / 1000 / 60 / 60 / 24);
                        return ((time.getTime()-new Date(this.startTime).getTime())/1000/60/60/24)>31
                    }
                },

                startTime:'',
                endTime:'',
                name:"选择状态",
                // show:true,
                total:{
                    car:500,
                    moto:555,
                    plan:45,
                },
                curveData:{
                    cuCar:[37,12,23,34,23,45,12,13,24,53,12,32,65,12,34,22,12,34,21,33,12,23,43,45,12,52,12,33,31,12],
                    cuMotor:[23,41,23,31,33,34,12,9,45,32,52,43,21,10,32,42,23,55,22,44,66,12,32,43,53,21,9,43,23,8],
                    cuPlan:[21,23,34,54,17,18,29,20,38,47,25,10,29,45,32,45,21,63,23,43,9,33,20,12,34,26,39,57,23,35],
                    cuIntelligent:[],
                    startTime:'',
                    endTime:''
                },//曲线数据
                kuandu:80,
                carData:[
                    {
                        name:"改装", kuandu:40,
                    },
                    {
                        name:"试驾", kuandu:60,
                    },
                    {
                        name:"预约", kuandu:80,
                    }
                ],
                motoData:[
                    {
                        name:"改装",kuandu:40,
                    },
                    {
                        name:"试驾",kuandu:60,
                    },
                    {
                        name:"预约",kuandu:80
                    }
                ],
                planData:[
                    {
                        name:"改装",kuandu:40,
                    },
                    {
                        name:"试驾",kuandu:60,
                    },
                    {
                        name:"预约",kuandu:80
                    }
                ],

                activityType:[],//活动类型数组
                activityTotal:0,//总活动数
                carActivity:[],//汽车活动统计
                motorActivity:[],//摩托车活动统计
                planeActivity:[],//无人机活动统计
                intelligentActivity:[],//智能设备活动统计
                carTotalByDate:0,//汽车分类总数(时间段内)
                motorTotalByDate:0,//摩托车分类总数(时间段内)
                planeTotalByDate:0,//无人机分类总数(时间段内)
                intelligentTotalByDate:0,//智能设备分类总数(时间段内)
                totalByDate:0,//总活动数(时间段内)

                showCar:false,
                showMoto:false,
                showPlan:false,
                showInt:false,
                tip:true,
                
                
                // 详情目录zyc
                pate:[],
                carTwoMenu:[],  //汽车目录
                motoTwoMenu:[],  //摩托目录
                planTwoMenu:[],  //模型目录
                intTwoMenu:[],     //智能设备

                //详情数据
                carInfoData:null,
                motoInfoData:null,
                planInfoData:null,
                intInfoData:null,
                //详情百分比
                carInfoPercent:'',
                motoInfoPercent:'',
                planInfoPercent:'',
                intInfoPercent:'',
                //二级目录百分比

            }
        },
        mounted(){
            this.all = this.total.car+this.total.moto+this.total.plan;
            this.drawLine();
        },
        methods:{
           eject(e,n){
               if(this.tip){  //展开
                    // this.show = false;
                    // e.currentTarget.parentNode.parentNode.children[1].classList.remove("rotate");
                    // e.currentTarget.children[0].children[1].classList.add("rotate");
                    // e.currentTarget.children[0].children[2].classList.remove("rotate")
                    
                        this.HttpClient.post('/admin/analysis/numCache',{type:5,menu_type :4,folder_id:this.pate[n].menu_id})
                        .then(res=>{    
                            console.log(res);
                            if(n===1){
                                this.showCar = true;
                                this.carTwoMenu = res.data.data;
                                this.carTwoMenu.total = 0;
                                this.carTwoMenu.forEach(item => {
                                    item.number = JSON.parse(item.analysis.company_actives)+JSON.parse(item.analysis.normal_actives)+JSON.parse(item.analysis.normal_company_actives);
                                    
                                    this.carTwoMenu.total += item.number
                                });
                                console.log(this.carTwoMenu);
                                if(this.carTwoMenu.total !== 0){
                                    this.carTwoMenu.forEach(item => {  
                                        item.infoPercent = (item.number/this.carTwoMenu.total*100).toFixed(2);
                                    });
                                }else{
                                    this.carTwoMenu.forEach(item => {  
                                        item.infoPercent = 0;
                                    });
                                }
                            }else if(n===2){
                                this.showMoto = true;
                                this.motoTwoMenu = res.data.data;
                                this.motoTwoMenu.total = 0;
                                this.motoTwoMenu.forEach(item => {
                                    item.number = JSON.parse(item.analysis.company_actives)+JSON.parse(item.analysis.normal_actives)+JSON.parse(item.analysis.normal_company_actives);
                                });
                                console.log(this.motoTwoMenu)
                                if(this.motoTwoMenu.total !== 0){
                                    this.motoTwoMenu.forEach(item => {  
                                        item.infoPercent = (item.number/this.motoTwoMenu.total*100).toFixed(2);
                                    });
                                }else{
                                    this.motoTwoMenu.forEach(item => {  
                                        item.infoPercent = 0;
                                    });
                                }
                            }else if(n===3){
                                this.showPlan = true;
                                this.planTwoMenu = res.data.data;
                                this.planTwoMenu.total = 0;
                                this.planTwoMenu.forEach(item => {
                                    item.number = JSON.parse(item.analysis.company_actives)+JSON.parse(item.analysis.normal_actives)+JSON.parse(item.analysis.normal_company_actives);
                                });
                                console.log(this.planTwoMenu)
                                if(this.planTwoMenu.total !== 0){
                                    this.planTwoMenu.forEach(item => {  
                                        item.infoPercent = (item.number/this.planTwoMenu.total*100).toFixed(2);
                                    });
                                }else{
                                    this.planTwoMenu.forEach(item => {  
                                        item.infoPercent = 0;
                                    });
                                }
                            }else if(n===4){
                                this.showInt = true;
                                this.intTwoMenu = res.data.data;
                                this.intTwoMenu.total = 0;
                                this.intTwoMenu.forEach(item => {
                                    item.number = JSON.parse(item.analysis.company_actives)+JSON.parse(item.analysis.normal_actives)+JSON.parse(item.analysis.normal_company_actives);
                                });
                                console.log(this.intTwoMenu)
                                if(this.intTwoMenu.total !== 0){
                                    this.intTwoMenu.forEach(item => {  
                                        item.infoPercent = (item.number/this.intTwoMenu.total*100).toFixed(2);
                                    });
                                }else{
                                    this.intTwoMenu.forEach(item => {  
                                        item.infoPercent = 0;
                                    });
                                }
                            }
                            this.tip = false;
                        })
                    
               }else{  //关闭
                    if(n===1){
                        this.showCar = false;
                    }else if(n===2){
                        this.showMoto = false;
                    }else if(n===3){
                        this.showPlan = false;
                    }else if(n===4){
                        this.showInt = false;
                    }
                    this.tip = true;
                    // this.show = true;
                    // e.currentTarget.parentNode.parentNode.children[1].classList.add("rotate");
                    // e.currentTarget.children[0].children[1].classList.remove("rotate");
                    // e.currentTarget.children[0].children[2].classList.add("rotate")
               }
           },
            /**
             * 获取活动板块
             * author:ZhangYunChuan
             * 2019/01/03
             */
            getPlateList(){
                this.HttpClient.post('/admin/menu/getList',{type:4,menu_type :2})
                .then(res=>{    
                    console.log(res);
                    this.pate = res.data.data;
                    // this.carTwoMenu = res.data.data[1].child;
                    // this.motoTwoMenu = res.data.data[2].child;
                    // this.planTwoMenu = res.data.data[3].child;
                    // this.intTwoMenu = res.data.data[4].child;
                    if(res.data.code === 200){
                        this.getActivityData();
                    }
                })
            },
           /****************************数据相关********************************/
           getActivityData(){
                this.carInfoData = 0;
                this.motoInfoData = 0;
                this.planInfoData = 0;
                this.intInfoData = 0;
               this.HttpClient.post('/admin/analysis/diagram',{type:5,begin:this.startTime,end:this.endTime})
                   .then(res=>{
                       console.log(res);
                       if(res.data.code===200){
                            this.carActivity=[];
                            this.motorActivity=[];
                            this.planeActivity=[];
                            this.intelligentActivity=[];
                           res.data.data.map(item=>{
                               if(item.folder_type === this.pate[1].menu_id){  //汽车
                                   this.carActivity.push(item); 
                               }else if(item.folder_type===this.pate[2].menu_id){ //摩托
                                   this.motorActivity.push(item);
                               }else if(item.folder_type===this.pate[3].menu_id){  //模型
                                   this.planeActivity.push(item);
                               }else if(item.folder_type===this.pate[4].menu_id){  //智能设备   
                                   this.intelligentActivity.push(item);
                               }
                           });
                           //详情数据处理
                           console.log(this.carActivity)
                           this.carActivity.forEach(item => {  //汽车详情数据
                               this.carInfoData += item.actives;
                           });
                           console.log(this.carInfoData)
                           this.motorActivity.forEach(item => {  //摩托详情数据
                               this.motoInfoData += item.actives;
                           });
                           this.planeActivity.forEach(item => {  //模型详情数据
                               this.planInfoData += item.actives;
                           });
                           this.intelligentActivity.forEach(item => {  //智能设备详情数据
                               this.intInfoData += item.actives;
                           });
                            //详情百分比
                            let total = this.carInfoData+this.motoInfoData+this.planInfoData+this.intInfoData;
                            this.carInfoPercent = (this.carInfoData/total)*100+'%';
                            this.motoInfoPercent = (this.motoInfoData/total)*100+'%';
                            this.planInfoPercent = (this.planInfoData/total)*100+'%';
                            this.intInfoPercent = (this.intInfoData/total)*100+'%';
                            //传入图标数据
                            this.curveData.cuCar=this.carActivity;
                            this.curveData.cuMotor=this.motorActivity;
                            this.curveData.cuPlan=this.planeActivity;
                            this.curveData.cuIntelligent=this.intelligentActivity;
                            this.curveData.startTime=this.startTime;
                            this.curveData.endTime=this.endTime;
                       }
                   })
           },

           //获取分类活动总数
           getTotalData(total){
               console.log(total);
               this.carTotalByDate=total.car;
               this.motorTotalByDate=total.motor;
               this.planeTotalByDate=total.plane;
               this.intelligentTotalByDate=total.intelligent;
               this.totalByDate=total.car+total.motor+total.plane+total.intelligent
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
            },
            handleRefresh(){
                this.$router.go(0);
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
                    data: ['1', '2', '3', '4', '5', '6', '7','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    itemStyle: {
                    normal: {
                        color: '#15bafe',
                        lineStyle: {
                        color: '#15bafe'
                        }
                    }
                    },
                    name: '汽车',
                    type: 'line',
                    smooth: true,
                    data: this.carData
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
                    data: this.motoData
                    },
                    {
                    itemStyle: {
                        normal: {
                        color: '#ff5858',
                        lineStyle: {
                            color: '#ff5858'
                        }
                        }
                    },
                    name: '无人机',
                    type: 'line',
                    smooth: true,
                    data: this.UAVData
                    },{
                    itemStyle: {
                        normal: {
                        color: '#FFB82E',
                        lineStyle: {
                            color: '#FFB82E'
                        }
                        }
                    },
                    name: '智能设备',
                    type: 'line',
                    smooth: true,
                    data: this.intelligentDeviceData
                    }]
                });
            }
            
        },
        created(){
            let arr=this.initDateValue(new Date()).split('-');
            console.log(arr)
            // arr[1]=arr[1]-1;
            if(arr[1] === '01'){
                arr[1] = '12';
                arr[0] = JSON.parse(arr[0])-1
            }
            arr.join('-');
            this.startTime=arr.join('-');
            console.log(this.startTime)
            this.endTime=this.initDateValue(new Date());
            //获取活动类型统计数据
            this.HttpClient.post('/admin/analysis/numCache',{type:5})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.activityType=res.data.data;
                        this.activityType.map(item=>{
                            item.number=0;  //活动数量
                            item.viewNumber=0;  //活动浏览量
                            item.number+=Number(JSON.parse(item.analysis.company_actives)+JSON.parse(item.analysis.normal_actives)+JSON.parse(item.analysis.normal_company_actives));
                            item.viewNumber+=Number(JSON.parse(item.analysis.company_actives_view)+JSON.parse(item.analysis.normal_actives_view)+JSON.parse(item.analysis.normal_company_actives_view));
                            this.activityTotal+=item.number;
                            console.log(this.activityType)
                        })
                    }
                });
            
            this.getPlateList();
        }
    }
</script>

<style scoped lang='less'>

  .activity-data::-webkit-scrollbar {display:none}
  .activity-data{width: 100%;padding: 0 15px; box-sizing: border-box;height: calc(100vh - 60px);overflow-y: auto;
  .head{height:50px ;width: 100%;text-align: start;line-height: 50px;color: #a0a0a0;font-size: 14px;}
  .content{background: #fff;border-radius: 8px;}
  .title{text-align: start;height: 70px;line-height: 70px;border-bottom: 2px solid #f2f2f2;padding:0 50px;display: flex;justify-content: space-between;color: #222222;}
  .box{width: 100%;padding: 33px 46px;box-sizing: border-box;}
  .act-all{width: 500px;height: 150px;border: 1px solid #e8e8e8;}
  .til{width: 100%;height: 40px;background: #15bafe;text-align: center;line-height: 40px;color: #fff;}
  .lei{width: 100%;height: 55px;display: flex;}
  .cl-lei{border-bottom:1px solid #e8e8e8;}
  .shu{border-right: 1px solid #e8e8e8;}
  .lei>div{width: 33.3333%;height: 100%;text-align: center;line-height: 53px;}
  input{outline: none !important;}
  .riqi{display: flex;margin-top: 40px;}
  .start{height: 40px;width: 190px; border:1px solid #999999;display: flex;justify-content: space-between;border-radius: 5px;}
  .start>span{margin: auto;color: #666666;font-size: 14px;}
  .el-date-editor.el-input, .el-date-editor.el-input__inner{width: 135px !important;}
  .el-input--small .el-input__inner{height: 40px !important;}
  .el-input__inner{ height: 40px !important;border-radius: 0 ! important;}
  .end{height: 40px;width: 190px; border:1px solid #999999;display: flex;justify-content: space-between;border-radius: 5px;margin-left: 15px;}
  .end>span{margin: auto;color: #666666;font-size: 14px;}
  .state{width: 135px;height: 40px;border:1px solid #7d7d7d;line-height: 40px;border-radius: 4px;margin-left: 15px;}
  .jz{margin: auto;}
  .bg{padding: 0 ;margin: 0 20px;border-bottom: 1px solid #dcdcdc;}
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{color: #66b1ff;background-color: #fff;}
  /* 活动曲线板块 */
  .curve{border: 1px solid #e9f1f3;margin-top: 25px;}
  .bt-title{display: flex;justify-content: space-between;padding: 0 80px;box-sizing: border-box;margin-top: 25px;}
  .cur-right{display: flex;}
  .cur-right>div{display: flex;align-items: center;}
  .cur-right>div>div{width: 8px;height: 8px;;border-radius: 50%;margin-right: 7px;margin-left: 30px;}
  .qiche{background: #009efb;}
  .motoche{background: #55ce63;}
  .wurenji{background: #ff7676;}
  .intelligent{background: #FFB82E;}
  .cur-left>p{font-size: 21px;color: #222222;text-align: start;margin-bottom: 12px;}
  .cur-left>span{font-size: 14px;color: #999999;}
  /* 汽车 */
  .car{margin-top: 10px;width: 100%;}
  .car-top{width: 550px;height: 110px;border: 1px solid #e9f1f3;display: flex;align-items: center;justify-content: space-around;}
  .car-top>img{width: 58px;height: 58px;}
  .car-info{height: 90px;width: 150px;border-left: 1px solid #f3f4f5;text-align: center;display: flex;align-items: center;justify-content:center;}
  .car-info>div{display: flex;align-items: center;color: #666666;font-size: 16px;}
  .car-info>div>img{width: 20px;height: 20px;margin-left: 9px;}
  .color{width: 143px;height: 8px;background: #f3f4f5;}
  .color>div{width: 50%;height: 100%; background: #009efb;margin-top: 18px;}
  .jindu-top{text-align: start;}
  .jindu-top>span:nth-child(1){font-size: 19px;color: #222222;}
  .jindu-top>span:nth-child(2){font-size: 16px;color: #999999;}
  .baifb{font-size: 32px;}
  .qc-category{display:flex;flex-wrap:wrap; width: 100%;border: 1px solid #e9f1f3;}
  .category{width: 399px;height: 80px;border-bottom: 1px solid #e9f1f3;border-right: 1px solid #e9f1f3;box-sizing: border-box;padding: 20px 33px;}
  .category-top{display: flex;justify-content: space-between;font-size: 18px;color: #222222;}
  .category-color{width: 100%;height: 4px;background: #f3f4f5;}
  .category-color>div{width: 80%;height: 4px;background: #15bafe;margin-top: 13px;}
//   .rotate{display: none}
  }
</style>
<style lang="less">
.inputdata{
    .el-input__inner{
        border: none;
    }
}


</style>

