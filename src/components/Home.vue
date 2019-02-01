<template>
    <div class="shouye">
        <p>
            <img src="../assets/image/home1.png" alt="">
            主页
        </p>
        <!-- 头部标题 -->
        <div class="hd">
            <img src="../assets/image/hd-logo.png" alt="">
            <span class="comp">酷耍电子商务</span>
            <span class="yous">大数据统计</span>
        </div>
        <!-- 饼状图 -->
       <div class="fa-disk">
            <div class="disk1">
                <Disk ids="main1" names="人数" :allnum="dataList.total_user" :incnum="dataList.total_user_increase"></Disk>
                <div class="numb">
                    <div class="left">
                        <div class="color1"></div>
                        <span>总人数</span>
                        <span class="number">{{dataList.total_user}}</span>
                        <span>人</span>
                    </div>
                    <div class="right">
                        <div class="color2"></div>
                        <span>增长人数</span>
                        <span class="number">{{dataList.total_user_increase}}</span>
                        <span>人</span>
                    </div>
                </div>
                <div class="bot">
                    <div>
                        <p class="p1">用户</p>
                        <p class="p2">USER</p>
                    </div>
                    <img src="../assets/image/user.png" alt="">
                </div>
            </div>
            <div class="disk2">
                <Disk ids="main2" names="公司" :allnum="dataList.total_company" :incnum="dataList.total_company_increase"></Disk>
                <div class="numb">
                    <div class="left">
                        <div class="color1"></div>
                        <span>总公司</span>
                        <span class="number">{{dataList.total_company}}</span>
                        <span>家</span>
                    </div>
                    <div class="right">
                        <div class="color2"></div>
                        <span>增长公司</span>
                        <span class="number">{{dataList.total_company_increase}}</span>
                        <span>家</span>
                    </div>
                </div>
                <div class="bot">
                    <div>
                        <p class="p1">公司</p>
                        <p class="p2">COMPANY</p>
                    </div>
                    <img src="../assets/image/company.png" alt="">
                </div>
            </div>
       </div>
       <!-- 商城统计 -->
       <div class="store">
           <div class="store-left">
               <img src="../assets/image/stor.png" alt="">
               <div class="til-mall">
                   <p class="til">商城</p>
                   <p class="mall">MALL</p>
               </div>
            </div>
            <!-- <div class="bar" v-for="(item,index) in mall" :key="index">
                <p>{{item.name}}</p>
                <div class="top">
                    <div class="increase" :style="{ width:((item.increase/item.all)*100).toFixed(2)+'%'}"></div>
                    <div class="total"></div>
                </div>
                <div class="bot1">
                    <div class="inc">
                        <div class="color1"></div>
                        <span class="sp1">增长数：</span>
                        <span class="sp2">{{item.increase}}</span>
                    </div>
                    <div class="tot">
                        <div class="color2"></div>
                        <span class="sp1">总数&nbsp;&nbsp;&nbsp;&nbsp;：</span>
                        <span class="sp3">{{item.all}}</span>
                    </div>
                </div>
            </div> -->
            <div class="bar" >
                <p>产品</p>
                <div class="top">
                    <div class="numm">
                        <div class="increase" :style="{ width:((dataList.product_total_increase/dataList.product_total)*100).toFixed(2)+'%'}"></div>
                    </div>
                    <div class="total"></div>
                </div>
                <div class="bot1">
                    <div class="inc">
                        <div class="color1"></div>
                        <span class="sp1">增长数：</span>
                        <span class="sp2">{{dataList.product_total_increase}}</span>
                    </div>
                    <div class="tot">
                        <div class="color2"></div>
                        <span class="sp1">总数&nbsp;&nbsp;&nbsp;&nbsp;：</span>
                        <span class="sp3">{{dataList.product_total}}</span>
                    </div>
                </div>
            </div>
            <div class="bar" >
                <p>销售</p>
                <div class="top">
                    <div class="numm">
                        <div class="increase" :style="{ width:((dataList.product_sale_increase/dataList.product_sale)*100).toFixed(2)+'%'}"></div>
                    </div>
                    <div class="total"></div>
                </div>
                <div class="bot1">
                    <div class="inc">
                        <div class="color1"></div>
                        <span class="sp1">增长数：</span>
                        <span class="sp2">{{dataList.product_sale_increase}}</span>
                    </div>
                    <div class="tot">
                        <div class="color2"></div>
                        <span class="sp1">总数&nbsp;&nbsp;&nbsp;&nbsp;：</span>
                        <span class="sp3">{{dataList.product_sale}}</span>
                    </div>
                </div>
            </div>
            <div class="bar" >
                <p>访客</p>
                <div class="top">
                    <div class="numm">
                        <div class="increase" :style="{ width:((dataList.product_view_increase/dataList.product_view)*100).toFixed(2)+'%'}"></div>
                    </div>
                    <div class="total"></div>
                </div>
                <div class="bot1">
                    <div class="inc">
                        <div class="color1"></div>
                        <span class="sp1">增长数：</span>
                        <span class="sp2">{{dataList.product_view_increase}}</span>
                    </div>
                    <div class="tot">
                        <div class="color2"></div>
                        <span class="sp1">总数&nbsp;&nbsp;&nbsp;&nbsp;：</span>
                        <span class="sp3">{{dataList.product_view}}</span>
                    </div>
                </div>
            </div>
            <div class="bar" >
                <p>销售商号</p>
                <div class="top">
                    <div class="numm">
                        <div class="increase" :style="{ width:((dataList.product_seller_increase/dataList.product_seller)*100).toFixed(2)+'%'}"></div>
                    </div>
                    <div class="total"></div>
                </div>
                <div class="bot1">
                    <div class="inc">
                        <div class="color1"></div>
                        <span class="sp1">增长数：</span>
                        <span class="sp2">{{dataList.product_seller_increase}}</span>
                    </div>
                    <div class="tot">
                        <div class="color2"></div>
                        <span class="sp1">总数&nbsp;&nbsp;&nbsp;&nbsp;：</span>
                        <span class="sp3">{{dataList.product_seller}}</span>
                    </div>
                </div>
            </div>
       </div>
       <!-- 淘货 -->
       <div class="store">
           <div class="store-left">
               <img src="../assets/image/car.png" alt="">
               <div class="til-mall">
                   <p class="til">淘货</p>
                   <p class="mall">GOODS</p>
               </div>
            </div>
            <!-- <div class="bar" v-for="(item,index) in taohuo" :key="index">
                <p>{{item.name}}</p>
                <div class="top">
                    <div class="increase" :style="{ width:increase2[index]+'%'}"></div>
                    <div class="total1"></div>
                </div>
                <div class="bot1">
                    <div class="inc">
                        <div class="color1"></div>
                        <span class="sp1">增长数：</span>
                        <span class="sp2">{{item.increase}}</span>
                    </div>
                    <div class="tot">
                        <div class="color22"></div>
                        <span class="sp1">总数&nbsp;&nbsp;&nbsp;&nbsp;：</span>
                        <span class="sp33">{{item.all}}</span>
                    </div>
                </div>
            </div> -->
            <div class="bar" >
                <p>参观者</p>
                <div class="top">
                    <div class="numm">
                        <div class="increase" :style="{ width:((dataList.goods_view_increase/dataList.goods_view)*100).toFixed(2)+'%'}"></div>
                    </div>
                    <div class="total1"></div>
                </div>
                <div class="bot1">
                    <div class="inc">
                        <div class="color1"></div>
                        <span class="sp1">增长数：</span>
                        <span class="sp2">{{dataList.goods_view_increase}}</span>
                    </div>
                    <div class="tot">
                        <div class="color22"></div>
                        <span class="sp1">总数&nbsp;&nbsp;&nbsp;&nbsp;：</span>
                        <span class="sp33">{{dataList.goods_view}}</span>
                    </div>
                </div>
            </div>
            <div class="bar" >
                <p>卖家</p>
                <div class="top">
                    <div class="numm">
                        <div class="increase" :style="{ width:((dataList.goods_seller_increase/dataList.goods_seller)*100).toFixed(2)+'%'}"></div>
                    </div>
                    <div class="total1"></div>
                </div>
                <div class="bot1">
                    <div class="inc">
                        <div class="color1"></div>
                        <span class="sp1">增长数：</span>
                        <span class="sp2">{{dataList.goods_seller_increase}}</span>
                    </div>
                    <div class="tot">
                        <div class="color22"></div>
                        <span class="sp1">总数&nbsp;&nbsp;&nbsp;&nbsp;：</span>
                        <span class="sp33">{{dataList.goods_seller}}</span>
                    </div>
                </div>
            </div>
            <div class="bar" >
                <p>产品</p>
                <div class="top">
                    <div class="numm">
                        <div class="increase" :style="{ width:((dataList.goods_total_increase/dataList.goods_total)*100).toFixed(2)+'%'}"></div>
                    </div>
                    <div class="total1"></div>
                </div>
                <div class="bot1">
                    <div class="inc">
                        <div class="color1"></div>
                        <span class="sp1">增长数：</span>
                        <span class="sp2">{{dataList.goods_total_increase}}</span>
                    </div>
                    <div class="tot">
                        <div class="color22"></div>
                        <span class="sp1">总数&nbsp;&nbsp;&nbsp;&nbsp;：</span>
                        <span class="sp33">{{dataList.goods_total}}</span>
                    </div>
                </div>
            </div>
            <div class="bar" >
                <p>销售数量</p>
                <div class="top">
                    <div class="numm">
                        <div class="increase" :style="{ width:((dataList.goods_sale_increase/dataList.goods_sale)*100).toFixed(2)+'%'}"></div>
                    </div>
                    <div class="total1"></div>
                </div>
                <div class="bot1">
                    <div class="inc">
                        <div class="color1"></div>
                        <span class="sp1">增长数：</span>
                        <span class="sp2">{{dataList.goods_sale_increase}}</span>
                    </div>
                    <div class="tot">
                        <div class="color22"></div>
                        <span class="sp1">总数&nbsp;&nbsp;&nbsp;&nbsp;：</span>
                        <span class="sp33">{{dataList.goods_sale}}</span>
                    </div>
                </div>
            </div>
       </div>
       <!-- 活动 & 服务-->
       <div class="act-serv">
           <!-- 活动 -->
           <div class="store">
                <div class="store-left">
                    <img src="../assets/image/car.png" alt="">
                    <div class="til-mall">
                        <p class="til">活动</p>
                        <p class="mall">ACTIVITY</p>
                    </div>
                </div>
                <div class="store-right fex" >
                    <!-- <div class="top" v-for="(item,index) in activity" :key="index">
                        <div class="top-top">
                            <span>{{item.name}}</span>
                            <div>
                                <span>总数：</span>
                                <span>{{item.all}}</span>
                                <span>增长数：</span>
                                <span class="sp1-4" :style="color(index)">{{item.increase}}</span>
                            </div>
                        </div>
                        <div class="act-color">
                            <div class="znumb" :style="run(index)"></div>
                        </div>
                    </div> -->
                    <div class="top">
                        <div class="top-top">
                            <span>数量</span>
                            <div>
                                <span>总数：</span>
                                <span>{{dataList.total_actives}}</span>
                                <span>增长数：</span>
                                <span class="sp2-4">{{dataList.total_actives_increase}}</span>
                            </div>
                        </div>
                        <div class="act-color">
                            <div class="wznmub" :style="'background: #55ce63'+';'+'width:'+((dataList.total_actives_increase/dataList.total_actives)*100).toFixed(2)+'%'"></div>
                        </div>
                    </div>
                    <div class="top">
                        <div class="top-top">
                            <span>网站访问量</span>
                            <div>
                                <span>总数：</span>
                                <span>{{dataList.total_actives}}</span>
                                <span>增长数：</span>
                                <span class="sp2-4">{{dataList.total_actives_increase}}</span>
                            </div>
                        </div>
                        <div class="act-color">
                            <div class="wznmub" :style="'background: #fc5573'+';'+'width:'+((dataList.total_actives_increase/dataList.total_actives)*100).toFixed(2)+'%'"></div>
                        </div>
                    </div>
                    <div class="top">
                        <div class="top-top">
                            <span>报名人数</span>
                            <div>
                                <span>总数：</span>
                                <span>{{dataList.total_actives}}</span>
                                <span>增长数：</span>
                                <span class="sp3-4">{{dataList.total_actives_increase}}</span>
                            </div>
                        </div>
                        <div class="act-color">
                            <div class="bmnumb" :style="'background: #846cf7'+';'+'width:'+((dataList.total_actives_increase/dataList.total_actives)*100).toFixed(2)+'%'"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 服务 -->
            <div class="serv">
                <div class="serv-top">
                    <div class="serv-til-mall">
                        <p class="til">服务</p>
                        <p class="mall">SERVICE</p>
                    </div>
                    <img src="../assets/image/serv.png" alt="">
                </div>
                <div class="meter">
                    <Meter :datas="sevdata"></Meter>
                </div>
                <div class="shul">
                    <div class="zong">
                        <span class="sp1">总数：</span>
                        <span class="zon-numb">{{dataList.total_services}}</span>
                    </div>
                    <div class="zenz">
                        <span class="sp1">增长数：</span>
                        <span class="zen-numb">{{dataList.total_services_increase}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 上传 -->
        <div class="update">
            <div class="store-left">
                <img src="../assets/image/car.png" alt="">
                <div class="til-mall">
                    <p class="til">上传</p>
                    <p class="mall">ACTIVITY</p>
                </div>
            </div>
            <div class="problem gl">
                <img src="../assets/image/lan.png" alt="">
                <p>问题</p>
                <p>
                    <span class="zn">总数：</span>
                    <span class="zs">{{dataList.total_questions}}</span>
                </p>
                <p>
                    <span class="zn">增加数：</span>
                    <span class="por-numb">{{dataList.total_questions_increase}}</span>
                </p>
            </div>
            <div class="video gl">
                <img src="../assets/image/lv.png" alt="">
                <p>视频</p>
                <p>
                    <span class="zn">总数：</span>
                    <span class="zs">{{dataList.total_videos}}</span>
                </p>
                <p>
                    <span class="zn">增加数：</span>
                    <span class="vid-numb">{{dataList.total_videos_increase}}</span>
                </p>
            </div>
            <div class="ency gl">
                <img src="../assets/image/hong.png" alt="">
                <p>百科</p>
                <p>
                    <span class="zn">总数：</span>
                    <span class="zs">{{dataList.total_encyc}}</span>
                </p>
                <p>
                    <span class="zn">增加数：</span>
                    <span class="enc-numb">{{dataList.total_encyc_increase}}</span>
                </p>
            </div>
            <div class="answer gl">
                <img src="../assets/image/huang.png" alt="">
                <p>答案</p>
                <p>
                    <span class="zn">总数：</span>
                    <span class="zs">{{dataList.total_answers}}</span>
                </p>
                <p>
                    <span class="zn">增加数：</span>
                    <span class="ans-numb">{{dataList.total_answers_increase}}</span>
                </p>
            </div>
            <div class="article gl">
                <img src="../assets/image/zhi.png" alt="">
                <p>文章数</p>
                <p>
                    <span class="zn">总数：</span>
                    <span class="zs">{{dataList.total_articles}}</span>
                </p>
                <p>
                    <span class="zn">增加数：</span>
                    <span class="art-numb">{{dataList.total_articles_increase}}</span>
                </p>
            </div>
        </div>
        <!-- 评论&客服&订阅-->
        <div class="pl-k-d">
            <!-- 评论 -->
            <div class="store">
                <div class="store-left">
                    <img src="../assets/image/shu.png" alt="">
                    <div class="til-mall pl">
                        <p class="til">评论</p>
                        <p class="mall">COMMENT</p>
                    </div>
                </div>
                <div class="store-right fex">
                    <!-- <div class="top" v-for="(item,index) in comment" :key="index">
                        <div class="top-top">
                            <span>{{item.name}}</span>
                            <div>
                                <span>总数：</span>
                                <span>15145</span>
                                <span>增长数：</span>
                                <span class="sp12-4" :style="color1(index)">{{item.increase}}</span>
                            </div>
                        </div>
                        <div class="act-color">
                            <div class="spumb" :style="run1(index)"></div>
                        </div>
                    </div> -->
                    <div class="top">
                        <div class="top-top">
                            <span>视频</span>
                            <div>
                                <span>总数：</span>
                                <span>{{dataList.answer_video_total}}</span>
                                <span>增长数：</span>
                                <span class="sp22-4" style="color: #745af2">{{dataList.answer_video_increase}}</span>
                            </div>
                        </div>
                        <div class="act-color">
                            <div class="wtnmub" :style="'background: #745af2'+';'+'width:'+((dataList.answer_video_increase/dataList.answer_video_total)*100).toFixed(2)+'%'"></div>
                        </div>
                    </div>
                    <div class="top">
                        <div class="top-top">
                            <span>问题</span>
                            <div>
                                <span>总数：</span>
                                <span>{{dataList.answer_question_total}}</span>
                                <span>增长数：</span>
                                <span class="sp22-4" style="color: #ffbc34">{{dataList.answer_question_increase}}</span>
                            </div>
                        </div>
                        <div class="act-color">
                            <div class="wtnmub" :style="'background: #ffbc34'+';'+'width:'+((dataList.answer_question_increase/dataList.answer_question_total)*100).toFixed(2)+'%'"></div>
                        </div>
                    </div>
                    <div class="top">
                        <div class="top-top">
                            <span>文章数量</span>
                            <div>
                                <span>总数：</span>
                                <span>{{dataList.answer_article_total}}</span>
                                <span>增长数：</span>
                                <span class="sp32-4" style="color: #11a0f8">{{dataList.answer_article_increase}}</span>
                            </div>
                        </div>
                        <div class="act-color">
                            <div class="wzanumb" :style="'background: #11a0f8'+';'+'width:'+((dataList.answer_article_increase/dataList.answer_article_total)*100).toFixed(2)+'%'"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 客服&订阅 -->
            <div class="custserv-subs">
                <!-- 客户服务 -->
                <div class="custserv">
                    <div class="serv-top">
                        <div class="serv-til-mall">
                            <p class="til">客户服务</p>
                            <p class="mall">CUSTMER SERVICE</p>
                        </div>
                        <img src="../assets/image/serv.png" alt="">
                    </div>
                    <div class="top-top">
                        <span>数字</span>
                        <div >
                            <span>总数：</span>
                            <span>{{dataList.customer}}</span>
                            <span>增长数：</span>
                            <span style="color: #15bafe;">{{dataList.customer_increase}}</span>
                        </div>
                    </div>
                </div>
                <!-- 订阅 -->
                <div class="subscribe">
                    <div class="serv-top">
                        <div class="serv-til-mall">
                            <p class="til">订阅</p>
                            <p class="mall">CUSTMER SERVICE</p>
                        </div>
                        <img src="../assets/image/serv.png" alt="">
                    </div>
                    <div class="top-top">
                        <span>数量</span>
                        <div >
                            <span>总数：</span>
                            <span>{{dataList.follow}}</span>
                            <span>增长数：</span>
                            <span style="color: #15bafe;">{{dataList.follow_increase}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 版本信息 -->
        <div class="edition">
            <p>版本信息</p>
            <p>1.05</p>
            <div class="box">
                <div class="title">服务器信息</div>
                <div class="small">
                    <div>服务器IP地址</div>
                    <div>192.168.1.1</div>
                </div>
                <div class="small">
                    <div>服务器域名</div>
                    <div>www.kushualab.com</div>
                </div>
                <div class="small">
                    <div>端口</div>
                    <div>80</div>
                </div>
                <div class="small">
                    <div>服务器IIS版本</div>
                    <div>Microsoft-IIS/6.0</div>
                </div>
                <div class="small">
                    <div>CPU总数</div>
                    <div>6</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Disk from '@/components/public/Disk'
    import Meter from '@/components/public/Meter'  //仪表盘组件
    // import Bar from '@/components/Bar'

    export default {
        name: "Home",
        data (){
            return {
                dataList:{},  //数据
                //商城数据
                // mall:[
                //     {name:"产品",increase:null,all:null},
                //     {name:"销售",increase:null,all:null},
                //     {name:"访客",increase:null,all:null},
                //     {name:"销售商号",increase:null,all:null}
                // ],
                // increase1 :[],   //控制商城进度条长度的数据
                //淘货数据
                // taohuo:[
                //     {name:"参观者",increase:100,all:500},
                //     {name:"卖家",increase:120,all:560},
                //     {name:"产品",increase:190,all:500},
                //     {name:"销售数量",increase:420,all:1000}
                // ],
                // increase2:[],  //控制淘货进度条的长度的数据
                //活动数据
                // activity:[
                //     {name:"数量",increase:null,all:null},
                //     {name:"网站访问量",increase:null,all:null},
                //     {name:"报名人数",increase:null,all:null},
                // ],
                // increase3:[],
                //服务数据
                sevdata:{
                        increase:null,
                        all:null
                    },
                //上传数据
                // updata:[
                //     {name:"问题",increase:100,all:500},
                //     {name:"视频",increase:100,all:500},
                //     {name:"百科",increase:100,all:500},
                //     {name:"答案",increase:100,all:500},
                //     {name:"文章数",increase:100,all:500},
                // ],
                //评论数据
                // comment:[
                //     {name:"视频",increase:100,all:500},
                //     {name:"问题",increase:200,all:560},
                //     {name:"文章数量",increase:400,all:500},
                // ],
                // increase4:[],
                // //客户服务数据
                // custserv:{
                //     increase:200,
                //     all:560
                // },
                // //订阅数据
                // subscribe:{
                //     increase:200,
                //     all:560
                // }
                    
            }
        },
        components:{
            Disk,
            // Bar
            Meter
        },
        mounted(){
            this.getData();
            //获取ip地址
            var curWwwPath = window.document.location.href;     //获取主机地址之后的目录，
            var pathName = window.document.location.pathname;     
            var pos = curWwwPath.indexOf(pathName); //获取主机地址，  
            var localhostPaht = curWwwPath.substring(0, pos); //获取带"/"的项目名，  
            var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);     
            var rootPath = localhostPaht + projectName;  
            console.log(rootPath)


            // for(var i = 0;i<this.mall.length;i++){
            //     this.increase1.push(this.mall[i].increase/this.mall[i].all*100);
            //     this.increase2.push(this.taohuo[i].increase/this.taohuo[i].all*100)
            // };
            // for(var i = 0;i<this.activity.length;i++){
            //    this.increase3.push(this.activity[i].increase/this.activity[i].all*100)
            //    this.increase4.push(this.comment[i].increase/this.comment[i].all*100)
            // };

            // this.increase = this.mall[0].increase/this.mall[0].all*100
            // // console.log(this.mall[0].increase/this.mall[0].all*100)
            // console.log(this.increase)
        }, 
        methods:{
            /**
             * 获取首页数据
             * author:ZhangYunChuan
             * time:2019/01/03
             */
            getData(){
                this.HttpClient.post('/admin/overAll',{})  
                .then(res=>{
                    console.log(res);
                    this.dataList = res.data.data;
                    this.sevdata.increase = res.data.data.total_services_increase;
                    this.sevdata.all = res.data.data.total_services;
                })
            },
            // color(index){
            //     // console.log(this.activity[index].name)
            //     if(this.activity[index].name === "数量"){
            //         return  "color: #55ce63";
            //     }else if(this.activity[index].name == "网站访问量"){
            //         return  "color: #fc5573";
            //     }else{
            //         return  "color: #846cf7";
            //     }
            // },
            // run(index){
            //     if(this.activity[index].name === "数量"){
            //         // console.log(this.increase3[index])
            //         return  "background: #55ce63"+";"+"width:"+((this.activity[index].increase/this.activity[index].all)*100).toFixed(2)+"%";
            //         // return  width=this.increase3[index]+%
            //     }else if(this.activity[index].name === "网站访问量"){
            //         return  "background: #fc5573"+";"+"width:"+((this.activity[index].increase/this.activity[index].all)*100).toFixed(2)+"%";
            //     }else{
            //         return  "background: #846cf7"+";"+"width:"+((this.activity[index].increase/this.activity[index].all)*100).toFixed(2)+"%";
            //     }
            // },
            // color1(index){
            //     console.log(this.comment[index].name)
            //     if(this.comment[index].name === "视频"){
            //         return  "color: #745af2";
            //     }else if(this.comment[index].name == "问题"){
            //         return  "color: #ffbc34";
            //     }else{
            //         return  "color: #11a0f8";
            //     }
            // },
            // run1(index){
            //     if(this.comment[index].name === "视频"){
            //         // console.log(this.increase3[index])
            //         return  "background: #745af2"+";"+"width:"+this.increase4[index]+"%";
            //         // return  width=this.increase3[index]+%
            //     }else if(this.comment[index].name === "问题"){
            //         return  "background: #ffbc34"+";"+"width:"+this.increase4[index]+"%";
            //     }else{
            //         return  "background: #11a0f8"+";"+"width:"+this.increase4[index]+"%";
            //     }
            // },
        }
    }
</script>

<style lang='less'>
    .shouye{min-width:1200px;margin: 0 10px;    height: calc(100vh - 90px);
      width: calc(100vw - 228px);
    >p{
        font-size: 14px;color: #969696;height: 50px;line-height: 50px;text-align: start;
        >img{width: 15px;height: 15px;}
    }
    
    .hd{width: 100%;height: 70px;text-align: start;background: #fff;line-height: 70px ;margin: 0 auto 20px auto; padding:0 35px;border-radius: 8px;box-shadow: 2px 2px 2px #e0e0e0;box-sizing: border-box;}
    .hd>img{margin:auto 0;}
    .comp{font-size: 24px;color: #222222;margin-left: 22px;}
    .yous{font-size: 18px;color: #cccccc;margin-left: 10px;}
    .fa-disk{display: flex;justify-content: space-between;}
    .disk1{background: #fff;width: 48.5%;height: 420px;border-radius: 8px;box-shadow: 2px 2px 2px #e0e0e0;}
    .disk2{background: #fff;width: 48.5%;height: 420px;border-radius: 8px;box-shadow: 2px 2px 2px #e0e0e0;}

    .color1{width: 11px;height: 11px;background: #15bafe;border-radius: 50%;margin-right: 7px;}
    .color2{width: 11px;height: 11px;background: #1e88e5;border-radius: 50%;margin-right: 7px;}
    .numb{margin: 0 18px;border-bottom: 1px solid #cccccc;display: flex;height: 45px;justify-content: space-between;}
    .left,.right{display: flex;align-items: center;}
    .number{color: #15bafe;margin: 0 12px 0 15px}
    span{line-height: 45px;font-size: 14px;color: #515151;}

    .bot{display: flex;justify-content: space-between;height: 100px;align-items: center;padding: 0 18px;}
    .p1{font-size: 24px;color: #222222;}
    .p2{font-size: 16px;color: #cccccc;margin-top: 12px;}

    /* 商城 */
    .store{background: #fff;border-radius: 8px;margin-top: 30px;display: flex;padding: 20px 0;justify-content: space-between;box-shadow: 2px 2px 2px #e0e0e0;}
    .store>div{border-right:1px solid #dcdcdc;}
    .store-left{width: 118px !important;}
    .til{font-size: 24px;color: #222222;}
    .mall{font-size: 16px;color: #cccccc;margin-top: 15px;}
    .til-mall{margin-top:30px;}
    .bar{width: 25%;height: 175px;padding: 7px 35px 0 35px;background: #fff;}
    .bar>p{height: 45px;text-align:start;line-height: 45px;font-size: 18px;color: #666666;}
    .numm{height: 11px;border-radius: 3px;border:0.5px solid #1e88e5}
    .increase{width: 100%;height: 11px;border-radius: 3px;background: #1e88e5;}   /* 商城增长数 */
    .bot1{height: 72px;}
    .inc{margin-top: 20px;height: 50%;display: flex;line-height: 36px;}
    .tot{height: 50%;display: flex;line-height: 36px;}
    .total{width: 100%;height: 11px;border-radius: 3px;background: #15bafe;margin-top: 6px;}  /* 商城总数 */
    .total1{width: 100%;height: 11px;border-radius: 3px;background: #55ce63;margin-top: 6px;}   /* 淘货总数 */
    .color1{width: 11px;height: 11px;background: #15bafe;border-radius: 50%;margin: auto 7px auto 0;}
    .color2{width: 11px;height: 11px;background: #1e88e5;border-radius: 50%;margin: auto 7px auto 0;}
    .color22{width: 11px;height: 11px;background: #55ce63;border-radius: 50%;margin: auto 7px auto 0;}
    .sp1{font-size: 12px;color: #222222;}
    .sp2{font-size: 12px;color: #26c6da;font-weight: bold;}
    .sp3{font-size: 12px;color: #1e88e5;font-weight: bold;}
    .sp33{font-size: 12px;color: #55ce63;font-weight: bold;}
    .act-serv{width: 100%;display: flex;justify-content: space-between;}
    .act-serv .store{width: 62.5%;}
    .serv{width: 34%; background: #fff;border-radius: 8px;margin-top: 30px;padding: 5px 0 20px 0;box-shadow: 2px 2px 2px #e0e0e0;}
    .serv-top{display: flex;justify-content: space-between;height: 80px;align-items: center;margin: 0 22px;border-bottom: 1px solid #dcdcdc;box-sizing: border-box;}
    .meter{width: 100%;}
    .meter>div{margin: 10px auto;}
    .shul{display: flex;padding: 0 17%;justify-content: space-between;}
    .zong .sp1{font-size: 14px;color: #a1a1a1;}
    .zenz .sp1{font-size: 14px;color: #a1a1a1;}
    .zon-numb{font-size: 16px;color: #46b982;font-weight: bold;}
    .zen-numb{font-size: 16px;color: #15bafe;font-weight: bold;}
    .act-serv .store .store-left .til-mall{margin-top: 105px;}
    .store-right{width: 100%;padding:  0 37px;}
    .top-top{display: flex;justify-content: space-between;}
    .top-top>span{margin-left: 15px;color: #666666;font-size: 16px;}
    .top-top>div:last-child{margin-right: 8px;}
    .top-top>div>span:nth-child(1){font-size: 14px;color: #999999;}
    .top-top>div>span:nth-child(2){margin-right: 25px;font-size: 16px;color: #222222;font-weight: bold;}
    .top-top>div>span:nth-child(3){font-size: 14px;color: #999999;}
    .act-color{width: 100%; height: 15px;background: #f2f2f2;border-radius: 5px;}
    .sp1-4{color: #55ce63;font-size: 16px;font-weight: bold;}
    .sp2-4{color: #fd8ea0;font-size: 16px;font-weight: bold;}
    .sp3-4{color: #846cf7;font-size: 16px;font-weight: bold;}
    .znumb{width: 50%;height: 15px; background: #55ce63;border-radius: 5px;}
    .wznmub{width: 75%;height: 15px; background: #fd8ea0;border-radius: 5px;}
    .bmnumb{width: 95%;height: 15px; background: #846cf7;border-radius: 5px;}
    .fex{display: flex;justify-content:space-between; flex-direction:column;padding: 20px;}
    /* 上传 */
    .update{background: #fff;border-radius: 8px;margin-top: 30px;display: flex;padding: 20px 0;justify-content: space-between;box-shadow: 2px 2px 2px #e0e0e0;}
    .update>div{border-right:1px solid #dcdcdc;width: 20%;}
    .gl>p:nth-child(2){font-size: 18px;color: #666666;margin-top:20px;}
    .gl>p{padding-left: 35px;text-align: start;height: 25px;}
    .zn{font-size: 14px;color: #999999;}
    .zs{font-size: 16px;color: #222222;font-weight: bold;}
    .por-numb{font-size: 16px;color: #009efb;font-weight: bold;}
    .vid-numb{font-size: 16px;color: #46b982;font-weight: bold;}
    .enc-numb{font-size: 16px;color: #fd8ea0;font-weight: bold;}
    .ans-numb{font-size: 16px;color: #fbc33b;font-weight: bold;}
    .art-numb{font-size: 16px;color: #8e79f8;font-weight: bold;}
    /* 评论 */
    .pl-k-d{width: 100%;display: flex;justify-content: space-between;}
    .pl-k-d .store{width: 62.5%;}
    .custserv-subs{width: 34%;}
    .sp12-4{color: #745af2;font-size: 16px;font-weight: bold;}
    .sp22-4{color: #ffbc34;font-size: 16px;font-weight: bold;}
    .sp32-4{color: #11a0f8;font-size: 16px;font-weight: bold;}
    .spumb{width: 50%;height: 15px; background: #745af2;border-radius: 5px;}
    .wtnmub{width: 75%;height: 15px; background: #ffbc34;border-radius: 5px;}
    .wzanumb{width: 95%;height: 15px; background: #11a0f8;border-radius: 5px;}
    .pl{margin-top: 100px;}
    /* 客户服务 */
    .custserv{width: 100%;background: #fff;border-radius: 8px;margin-top: 30px;padding: 5px 0 0 0;box-shadow: 2px 2px 2px #e0e0e0;}
    .custserv .top-top{padding: 0 22px;}
    .custserv .top-top>span{margin: 0;color: #222222;}
    .custserv .top-top>div>span:nth-child(1){font-size: 14px;color: #999999;}
    .custserv .top-top>div>span:nth-child(2){margin-right: 25px;font-size: 16px;color: #15bafe;font-weight: bold;}
    .custserv .top-top>div>span:nth-child(3){font-size: 14px;color: #999999;}
    .custserv .top-top>div:last-child{margin-right: 8px;font-size: 16px;font-weight: bold;}
    /* 订阅 */
    .subscribe {width: 100%;background: #fff;border-radius: 8px;margin-top: 30px;padding: 5px 0 0 0;box-shadow: 2px 2px 2px #e0e0e0;}
    /* 版本信息 */
    .edition{background: #fff;border-radius: 8px;margin-top: 30px;padding: 20px 22px;box-shadow: 2px 2px 2px #e0e0e0;}
    .edition>p{text-align: start;color: #222222;font-size: 18px;}
    .edition>p:nth-child(2){margin: 28px 0 20px 35px;}
    .box{width: 95%;margin: 0 auto;}
    .box>div:nth-child(1){height: 40px;border-bottom: 1px solid #cccccc;text-align: center;line-height: 40px;font-size: 16px;color: #474747;}
    .small{display: flex;justify-content: space-between;border-bottom: 1px solid #cccccc;height: 40px;}
    .small>div:nth-child(1){width: 28%;border-right: 1px solid #cccccc;text-align: center;line-height: 40px;color: #7e7e7e;font-size: 14px;}
    .small>div:nth-child(2){width: 72%;text-align: center;line-height: 40px;color: #7e7e7e;font-size: 14px;}
    }
</style>
