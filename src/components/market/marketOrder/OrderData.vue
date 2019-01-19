<template>
    <div class="orderData">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="orderData_main">
            <!--标题-->
            <div class="title">
                <p>订单数据统计</p>
                <p style="cursor:pointer;" @click="refresh">
                    <i class="iconfont icon-shuaxin"></i>
                    刷新
                </p>
            </div>

            <div class="content">
                <div class="data_header">
                    <div class="data_select">
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
                                    @change="getProductDataByDate"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </div>
                </div>

                <div class="shape_content">
                    <div class="shape_header">
                        <div class="shape_header_left">
                            <p class="left_title">订单数据统计</p>
                            <div class="time_range">
                                <span>{{startTime.split(' ')[0]}}</span>
                                <span>---</span>
                                <span>{{endTime.split(' ')[0]}}</span>
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


                <div class="content_dropdown">
                    <div class="category_box">
                        <div class="category_box_left">
                            <i class="iconfont icon-qiche"></i>
                            <div class="category_box_line">
                                <div class="category_line_main">
                                    <p>汽车 <span>{{carByDate.total>1000?(carByDate.total/1000).toFixed(2)+'K':carByDate.total}}</span></p>
                                    <el-progress :percentage="carByDate.percent" :show-text="false"></el-progress>
                                </div>
                                <div class="category_line_nmb">
                                    {{carByDate.percent}}%
                                </div>
                            </div>
                        </div>

                        <div class="category_box_btm">
                            汽车增长量：{{carGrowth}}
                        </div>
                    </div>
                    <!-- <el-collapse-transition>
                        <div class="category_content" v-if="categoryContent">
                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                        </div>
                    </el-collapse-transition> -->
                </div>
                <!-- 摩托车 -->
                <div class="content_dropdown">
                    <div class="category_box">
                        <div class="category_box_left">
                            <i class="iconfont icon-qiche"></i>
                            <div class="category_box_line">
                                <div class="category_line_main">
                                    <p>摩托车 <span>{{carByDate.total>1000?(carByDate.total/1000).toFixed(2)+'K':carByDate.total}}</span></p>
                                    <el-progress :percentage="carByDate.percent" :show-text="false"></el-progress>
                                </div>
                                <div class="category_line_nmb">
                                    {{carByDate.percent}}%
                                </div>
                            </div>
                        </div>

                        <div class="category_box_btm">
                            摩托增长量：{{motoGrowth}}
                        </div>
                    </div>
                    <!-- <el-collapse-transition>
                        <div class="category_content" v-if="motoContent">
                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                        </div>
                    </el-collapse-transition> -->
                </div>
                <!-- 无人机 -->
                <div class="content_dropdown">
                    <div class="category_box">
                        <div class="category_box_left">
                            <i class="iconfont icon-qiche"></i>
                            <div class="category_box_line">
                                <div class="category_line_main">
                                    <p>无人机 <span>{{carByDate.total>1000?(carByDate.total/1000).toFixed(2)+'K':carByDate.total}}</span></p>
                                    <el-progress :percentage="carByDate.percent" :show-text="false"></el-progress>
                                </div>
                                <div class="category_line_nmb">
                                    {{carByDate.percent}}%
                                </div>
                            </div>
                        </div>

                        <div class="category_box_btm" >
                            无人机增长量：{{UAVGrowth}}
                        </div>
                    </div>
                    <!-- <el-collapse-transition>
                        <div class="category_content" v-if="intelligenceContent">
                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                        </div>
                    </el-collapse-transition> -->
                </div>
                <!-- 智能设备 -->
                <div class="content_dropdown">
                    <div class="category_box">
                        <div class="category_box_left">
                            <i class="iconfont icon-qiche"></i>
                            <div class="category_box_line">
                                <div class="category_line_main">
                                    <p>智能设备 <span>{{carByDate.total>1000?(carByDate.total/1000).toFixed(2)+'K':carByDate.total}}</span></p>
                                    <el-progress :percentage="carByDate.percent" :show-text="false"></el-progress>
                                </div>
                                <div class="category_line_nmb">
                                    {{carByDate.percent}}%
                                </div>
                            </div>
                        </div>

                        <div class="category_box_btm">
                            智能设备增长量：{{intelligenceGrowth}}
                        </div>
                    </div>
                    <!-- <el-collapse-transition>
                        <div class="category_content" v-if="DIYContent">
                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                            <div class="category_list">
                                <div class="category_list_text">
                                    <p>改装</p>
                                    <p>80%</p>
                                </div>
                                <el-progress :percentage="80" :show-text="false"></el-progress>
                            </div>

                        </div>
                    </el-collapse-transition> -->
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';
    import echarts from 'echarts'
    import moment from 'moment'

    export default {
        inject:['reload'],
        name: "OrderData",
        components: {
            BreadCrumb,
        },
        data(){
            return{

                //时间选择范围限制
                pickerOptions: {
                    disabledDate: (time) => {
                        return ((time.getTime()-new Date(this.startTime).getTime())/1000/60/60/24)>31
                    }
                },

                // 面包屑
                breadData: [
                    {
                        id: 1,
                        name: '淘货',
                        urls: '/index/market/Market',
                        icon: 'icon-home'
                    }, {
                        id: 2,
                        name: '淘货订单',
                        urls: '/index/market/marketOrder/MarketProduct',
                        icon: 'icon-home'
                    }, {
                        id: 3,
                        name: '订单数据统计',
                        urls: '/index/market/marketOrder/OrderData',
                        icon: 'icon-home'
                    }
                ],

                startTime: '',  // 开始时间
                endTime: '',  //  结束时间

                //区间时间各板块时间增量
                carGrowth:null,
                motoGrowth:null,
                UAVGrowth:null,
                intelligenceGrowth:null,
                productTotal:0,// 商品总数
                carTotal:{},// 汽车商品总数
                motorTotal:{},// 摩托车商品总数
                planeTotal:{},// 无人机商品总是
                intelligentTotal:{},// 智能设备商品总数

                /**时间段内数据**/
                productDataByDate:[],// 某时间段内总数据
                carByDate:[],//汽车服务数据
                motorByDate:[],//摩托车服务数据
                planeByDate:[],//无人机服务数据
                intelligentByDate:[],//智能设备服务数据
                productTotalByDate:0,//某时间段内服务总记录数
            }
        },

        methods: {
            //刷新页面
            refresh(){
                this.reload();
            },
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
                dates.map(date=> {
                    console.log(date);
                    let carNum = 0;
                    let motorNum = 0;
                    let planeNum = 0;
                    let intelligentNum = 0;
                    if(date<10){
                        date='0'+date;
                    }
                    this.carByDate.map(item => {
                        // console.log(2222,item.created_at);
                        if (new Date(year + '-' + month + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime() ||
                            new Date(year + '-' + (month + 1) + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime()) {
                            carNum += Number(item.goods_order);
                        }
                    });
                    this.motorByDate.map(item => {
                        if (new Date(year + '-' + month + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime() ||
                            new Date(year + '-' + (month + 1) + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime()) {
                            motorNum += Number(item.goods_order);
                        }
                    });
                    this.planeByDate.map(item => {
                        if (new Date(year + '-' + month + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime() ||
                            new Date(year + '-' + (month + 1) + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime()) {
                            planeNum += Number(item.goods_order);
                        }
                    });
                    this.intelligentByDate.map(item => {
                        if (new Date(year + '-' + month + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime() ||
                            new Date(year + '-' + (month + 1) + '-' + date).getTime() === new Date(item.created_at.split(' ')[0]).getTime()) {
                            intelligentNum += Number(item.goods_order);
                        }
                    });
                    car.push(carNum);
                    motorcycle.push(motorNum);
                    plane.push(planeNum);
                    intelligent.push(intelligentNum);
                });
                //求和
                this.carByDate.total=eval(car.join('+'));
                this.motorByDate.total=eval(motorcycle.join('+'));
                this.planeByDate.total=eval(plane.join('+'));
                this.intelligentByDate.total=eval(intelligent.join('+'));
                this.productTotalByDate=this.carByDate.total+this.motorByDate.total+this.planeByDate.total+this.intelligentByDate.total;
                console.log(this.productTotalByDate,this.carByDate.total,this.motorByDate.total,this.planeByDate.total,this.intelligentByDate.total);
                if(this.productTotalByDate>0){
                    this.carByDate.percent=Number((this.carByDate.total/this.productTotalByDate*100).toFixed(2));
                    this.motorByDate.percent=Number((this.motorByDate.total/this.productTotalByDate*100).toFixed(2));
                    this.planeByDate.percent=Number((this.planeByDate.total/this.productTotalByDate*100).toFixed(2));
                    this.intelligentByDate.percent=Number((this.intelligentByDate.total/this.productTotalByDate*100).toFixed(2));
                }else{
                    this.carByDate.percent=0;
                    this.motorByDate.percent=0;
                    this.planeByDate.percent=0;
                    this.intelligentByDate.percent=0;
                }

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
                            name: "无人机",
                            data: intelligent,
                            type: 'line',
                            smooth: true

                        }]
                });
            },

            //获取某一时间段内商品数据
            getProductDataByDate(){
                this.HttpClient.post('/admin/marketAnalysis/oneField',{field:'goods_order',start_time:this.startTime,end_time:this.endTime})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.productDataByDate=res.data.data;
                            this.carByDate=[];
                            this.motorByDate=[];
                            this.planeByDate=[];
                            this.intelligentByDate=[];
                            res.data.data.map(item=>{
                                if(item.folder_type==='汽车'){
                                    this.carByDate.push(item);
                                }else if(item.folder_type==='摩托'){
                                    this.motorByDate.push(item);
                                }else if(item.folder_type==='无人机'){
                                    this.planeByDate.push(item);
                                }else if(item.folder_type==='智能设备'){
                                    this.intelligentByDate.push(item);
                                }
                            });
                            this.drawLine()
                            //计算选择时间区间内的各板块的增量
                            this.carGrowth = this.carByDate[this.carByDate.length-1].goods_order - this.carByDate[0].goods_order;
                            this.motoGrowth = this.motorByDate[this.motorByDate.length-1].goods_order - this.motorByDate[0].goods_order;
                            this.UAVGrowth = this.planeByDate[this.planeByDate.length-1].goods_order - this.planeByDate[0].goods_order;
                            this.intelligenceGrowth = this.intelligentByDate[this.intelligentByDate.length-1].goods_order - this.intelligentByDate[0].goods_order;
                            console.log(this.carGrowth)
                        }
                    })
            },
            //获取商品总量
            getProductGross(){
                this.HttpClient.post('/admin/marketAnalysis/oneField',{type:'product_sale'})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            res.data.data.map(item=>{
                                this.productTotal+=Number(item.product_order);
                                if(item.folder==='汽车'){
                                    this.carTotal=item
                                }else if(item.folder==='摩托车'){
                                    this.motorTotal=item
                                }else if(item.folder==='无人机'){
                                    this.planeTotal=item
                                }else if(item.folder==='智能设备'){
                                    this.intelligentTotal=item
                                }
                            })
                        }
                    })
            },
        },
        created(){
            this.endTime=moment().format('YYYY-MM-DD HH:mm:ss');
            this.startTime=moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss');
            this.getProductGross();
            this.getProductDataByDate()
        },

    }
</script>

<style lang="less">
    .orderData{
        text-align: left;
        .bread{
            margin: 10px;
        }
      .orderData_main::-webkit-scrollbar {display:none}
        .orderData_main {
            margin-left: 10px;
            margin-top: 10px;
            background: #fff;
          overflow-y: auto;
          height: calc(100vh - 100px);
          width: calc(100vw - 240px);
            border-radius: 2px;

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

            .content{
                box-sizing: border-box;
                padding: 0 40px 40px 40px;

                .content_header{
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    margin: 15px 0;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #dedede;

                    .content_header_title{
                        background: #15bafe;
                        color: #f2f2f2;
                        padding: 0 10px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 35px;
                        margin-right: 20px;
                    }

                    .content_header_list{
                        display: flex;
                        align-items: center;
                        border: 1px solid #dedede;
                        box-sizing: border-box;
                        margin-right: 20px;
                        p{
                            height: 35px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 0 15px;
                        }
                        p:last-child{
                            border-left: 1px solid #dedede;
                        }
                    }

                }

                /*头部*/
                .data_header{
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .data_select{
                        display: flex;
                        .date_item{
                            display: flex;
                            border: 1px solid #dcdfe6;
                            border-radius: 5px;
                            margin-right: 20px;
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
                /*数据详情*/
                .content_dropdown{
                    margin-top: 30px;

                    .category_box{
                        display: flex;
                        align-items: center;
                        background: #fff;
                        height: 80px;
                        border: 1px solid #f2f2f2;
                        margin-top: 20px;
                        width: 710px;

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
</style>
