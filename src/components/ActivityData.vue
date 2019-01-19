<template>
    <div class="activity-data">
        <div class="head">
            活动数据     
        </div>
        <div class="content">
            <div class="title">
                <p>活动数据</p>
                <p>
                    <img src="../assets/image/new.png" alt="">
                    <span>刷新</span>
                </p>
            </div>
            <div class="box">
                <!-- 活动总数据 -->
                <div class="act-all">
                    <div class="til">
                        <img src="../assets/image/xin.png" alt="">
                        <span>活动总数&nbsp;&nbsp;1532136</span>
                    </div>
                    <div class="lei cl-lei">
                        <div class="shu">汽车</div>
                        <div class="shu">摩托车</div>
                        <div>无人机</div>
                    </div>
                    <div class="lei">
                        <div class="shu">3546</div>
                        <div class="shu">2151</div>
                        <div>86479</div>
                    </div>
                </div>
                <!-- 选择时间 -->
                <div class="slect">
                    <div class="riqi">
                        <div class="start">
                            <span>开始</span>
                            <el-date-picker v-model="value1" type="date" placeholder="选择日期" :change="ddd()" ></el-date-picker>
                        </div>
                        <div class="end">
                            <span>截止</span>
                            <el-date-picker v-model="value2" type="date" placeholder="选择日期" :change="dd()" ></el-date-picker>
                        </div>
                        <div class="state">
                            <el-dropdown trigger="click" class="jz">
                                <span class="el-dropdown-link">
                                   {{name}}<i class="el-icon-arrow-right el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown" >
                                    <el-dropdown-item class="bg">全部</el-dropdown-item>
                                    <el-dropdown-item class="bg">未通过</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                    <!-- 曲线图 -->
                    <div class="curve">
                        <div class="bt-title">
                            <div class="cur-left">
                                <p>活动数据曲线图</p>
                                <span>{{time1}}——{{time2}}</span>
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
                            </div>
                        </div>
                        <Curve></Curve>
                    </div>
                    <!-- 汽车数据 -->
                    <div class="car">
                        <div class="car-top">
                            <img src="../assets/image/qiche.png" alt="">
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
                                <p>45%</p>
                            </div>
                            <div class="car-info" @click="eject($event)">
                                <div>
                                    <span>汽车详情</span>
                                    <img  src="../assets/image/yuanjtx.png" alt="" >
                                    <img  src="../assets/image/yuanjt.png" alt="" class="rotate">
                                </div>
                            </div>
                        </div>
                        <!-- 汽车分类 -->
                        <div class="qc-category rotate">
                            <div class="category">
                                <div class="category-top">
                                    <span>改装</span>
                                    <span>86%</span>
                                </div>
                                <div class="category-color">
                                    <div></div>
                                </div>
                            </div>
                            <div class="category">
                                <div class="category-top">
                                    <span>改装</span>
                                    <span>86%</span>
                                </div>
                                <div class="category-color">
                                    <div></div>
                                </div>
                            </div>
                            <div class="category">
                                <div class="category-top">
                                    <span>改装</span>
                                    <span>86%</span>
                                </div>
                                <div class="category-color">
                                    <div></div>
                                </div>
                            </div>
                            <div class="category">
                                <div class="category-top">
                                    <span>改装</span>
                                    <span>86%</span>
                                </div>
                                <div class="category-color">
                                    <div></div>
                                </div>
                            </div>
                            <div class="category">
                                <div class="category-top">
                                    <span>改装</span>
                                    <span>86%</span>
                                </div>
                                <div class="category-color">
                                    <div></div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <!-- 摩托车数据 -->
                    <div class="car">
                        <div class="car-top">
                            <img src="../assets/image/motuo.png" alt="">
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
                                <p>62%</p>
                            </div>
                            <div class="car-info"  @click="eject($event)">
                                <div>
                                    <span>摩托车详情</span>
                                    <img  src="../assets/image/yuanjtx.png" alt="" >
                                    <img  src="../assets/image/yuanjt.png" alt="" class="rotate">
                                </div>
                            </div>
                        </div>
                        <!-- 摩托车分类 -->
                        <div class="qc-category rotate" >
                            <div class="category">
                                <div class="category-top">
                                    <span>改装</span>
                                    <span>86%</span>
                                </div>
                                <div class="category-color">
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 无人机 -->
                    <div class="car">
                        <div class="car-top">
                            <img src="../assets/image/plan.png" alt="">
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
                                <p>27%</p>
                            </div>
                            <div class="car-info"  @click="eject($event)">
                                <div>
                                    <span>无人机详情</span>
                                    <img  src="../assets/image/yuanjtx.png" alt="" >
                                    <img  src="../assets/image/yuanjt.png" alt="" class="rotate">
                                </div>
                            </div>
                        </div>
                        <!-- 摩托车分类 -->
                        <div class="qc-category rotate" >
                            <div class="category">
                                <div class="category-top">
                                    <span>改装</span>
                                    <span>86%</span>
                                </div>
                                <div class="category-color">
                                    <div></div>
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
    export default {
        name: "ActivityData",
        components:{
            Curve
        },
        data (){
            return {
                value1:"",
                time1:"",
                value2:"",
                time2:"",
                name:"选择状态",
                show:true
                 
            }
        },
        mounted(){
            
        },
        methods:{
            ddd(){
                //转换时间格式
                var d = new Date(this.value1);  
                var time1=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); 
                // console.log(time1)
                this.time1 = time1
            },
            dd(){
                // 转换时间格式
                var d = new Date(this.value2);  
                var time2=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); 
                // console.log(time2)
                this.time2 = time2
            },
           eject(e){
                // console.log(e.currentTarget.children[0].children[1])
                // console.log(e.currentTarget.parentNode.parentNode.children[1])
               if(this.show){
                    this.show = false
                    e.currentTarget.parentNode.parentNode.children[1].classList.remove("rotate")
                    e.currentTarget.children[0].children[1].classList.add("rotate")
                    e.currentTarget.children[0].children[2].classList.remove("rotate")
               }else{
                    this.show = true
                    e.currentTarget.parentNode.parentNode.children[1].classList.add("rotate")
                    e.currentTarget.children[0].children[1].classList.remove("rotate")
                    e.currentTarget.children[0].children[2].classList.add("rotate")
               }
           }     
        }
    }
</script>

<style scoped>
    .activity-data{width: 100%;padding: 0 15px; box-sizing: border-box;}
    .head{height:50px ;width: 100%;text-align: start;line-height: 50px;color: #a0a0a0;font-size: 14px;}
    .content{background: #fff;border-radius: 8px;}
    .title{text-align: start;height: 70px;line-height: 70px;border-bottom: 2px solid #f2f2f2;padding:0 50px;display: flex;justify-content: space-between;color: #222222;}
    .box{width: 100%;padding: 33px 46px;box-sizing: border-box;}
    .act-all{width: 310px;height: 150px;border: 1px solid #e8e8e8;}
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
    .qc-category{width: 100%;height: 160px;border: 1px solid #e9f1f3;}
    .category{width: 25%;height: 80px;float: left;border-bottom: 1px solid #e9f1f3;border-right: 1px solid #e9f1f3;box-sizing: border-box;padding: 20px 33px;}
    .category-top{display: flex;justify-content: space-between;font-size: 18px;color: #222222;}
    .category-color{width: 100%;height: 4px;background: #f3f4f5;}
    .category-color>div{width: 80%;height: 4px;background: #15bafe;margin-top: 13px;}
    .rotate{display: none}
</style>
