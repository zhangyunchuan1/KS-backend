<template>
    <div class="SearchRecord">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="productReview_main">
            <!--标题-->
            <div class="title">
                <p>关键词统计</p>
            </div>

            <div class="content">
                <div class="all_num">
                    <div class="all_num_li">
                        <div class="num_title">总关键词数量</div>
                        <div class="all_number">{{count}}</div>
                    </div>
                    <div class="all_num_li">
                        <div class="num_title">平均关键词字符数</div>
                        <div class="all_number">{{count}}</div>
                    </div>
                </div>
                <div class="content_main">
                    <div class="content_search">
                        <div class="encyclopedia_search">
                            <div class="content_select">
                                <div class="date_item">
                                    <p class="date_label">开始</p>
                                    <el-date-picker
                                    v-model="searchObj.startTime"
                                    class="date_picker_1"
                                    type="date"
                                    size="mini"
                                    clearable
                                    placeholder="选择日期"
                                    @change="handleChangeStartTime($event)">
                                    </el-date-picker>
                                </div>
                                <div class="date_item">
                                    <p class="date_label">截止</p>
                                    <el-date-picker
                                    v-model="searchObj.endTime"
                                    class="date_picker_1"
                                    type="date"
                                    size="mini"
                                    clearable
                                    placeholder="选择日期"
                                    @change="handleChangeEndTime($event)">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div>
                                <el-input
                                placeholder="搜索关键词"
                                clearable
                                v-model="searchObj.content"
                                class="input-with-select" 
                                @clear="handleSearchContent">
                                <el-button slot="append" icon="el-icon-search" @click="handleSearchContent"></el-button>
                                </el-input>
                            </div>
                        </div>

                    </div>

                    <div class="content_table">
                        <el-table
                                :data="tableData"
                                :border="true">
                            <el-table-column
                                    label="关键词"
                                    align="center"
                                    width="200"
                                    prop="name"
                                    show-overflow-tooltip
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="添加时间"
                                    align="center"
                                    width="160"
                                    prop="created_at"
                                    show-overflow-tooltip
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="类型"
                                    align="center"
                                    width="120"
                                    prop="type"
                                    show-overflow-tooltip
                                    sortable>
                                    <template slot-scope="scope">
                                        <span class="sortout_color" v-if="scope.row.type === null">无</span>
                                        <span v-if="scope.row.type === 1">文章</span>
                                        <span v-if="scope.row.type === 2">视频</span>
                                        <span v-if="scope.row.type === 3">百科</span>
                                        <span v-if="scope.row.type === 4">问题</span>
                                        <span v-if="scope.row.type === 5">活动</span>
                                        <span v-if="scope.row.type === 6">服务</span>
                                        <span v-if="scope.row.type === 7">淘货</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="内容标题"
                                    align="center"
                                    width="200"
                                    show-overflow-tooltip
                                    prop="title">
                            </el-table-column>

                            <el-table-column
                                    label="其他关键词"
                                    align="center"
                                    width="350"
                                    show-overflow-tooltip
                                    prop="other_tags">
                                    <template slot-scope="scope">
                                        <div class="other_tags">
                                            <el-tag type="success" v-for="(item,index) in scope.row.other_tags" :key="index">{{item}}</el-tag>
                                        </div>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="重复次数"
                                    align="center"
                                    width="180"
                                    prop="tag_num"
                                    show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                                    label="操作"
                                    fixed="right"
                                    min-width="300"
                                    align="center">
                                <template slot-scope="scope">
                                        <el-button type="primary" plain size="mini" @click="handlePreview(scope.row.relation_id,scope.row.type)">预览</el-button>
                                        <el-button type="primary" plain size="mini" @click="handleSeeTimeMap(scope.row.tag_id)">时间图</el-button>
                                        <el-button type="primary" plain size="mini" @click="handleSeeNeirTab(scope.row.name)">内容表</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                v-if="total"
                                layout="prev, pager, next"
                                :total="total"
                                :page-size="25"
                                @current-change="currentChange"
                        ></el-pagination>
                    </div>

                </div>
            </div>
        </div>
        <!-- 时间图弹窗 -->
        <el-dialog
            width="850px"
            custom-class="timeMapDialog"
            :visible.sync="timeMapDialog"
            center>
            <span slot="title" class="approveDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div>
                <el-date-picker
                    v-model="startTime"
                    type="month"
                    placeholder="选择开始月"
                    value-format="yyyy-MM"
                    @change="handleChangeTime">
                </el-date-picker>
                <el-date-picker
                    v-model="endTime"
                    type="month"
                    value-format="yyyy-MM"
                    placeholder="选择截止月"
                    @change="handleChangeTime">
                </el-date-picker>
            </div>
            
            <div>
                <div id="timeEchart" :style="{width:'800px',height: '400px'}"></div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="timeMapDialog = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 内容表格弹窗 -->
        <el-dialog
            width="1200px"
            custom-class="neirDialog"
            :visible.sync="neirDialog"
            center>
            <span slot="title" class="approveDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div>
                <el-table
                    :data="neirData"
                    :border="true">
                    <el-table-column
                        label="关键词"
                        align="center"
                        width="200"
                        prop="name"
                        show-overflow-tooltip
                        sortable>
                    </el-table-column>

                    <el-table-column
                        label="添加时间"
                        align="center"
                        width="160"
                        prop="created_at"
                        show-overflow-tooltip
                        sortable>
                    </el-table-column>

                    <el-table-column
                        label="类型"
                        align="center"
                        width="90"
                        prop="type"
                        show-overflow-tooltip
                        sortable>
                        <template slot-scope="scope">
                            <span class="sortout_color" v-if="scope.row.type === null">无</span>
                            <span v-if="scope.row.type === 1">文章</span>
                            <span v-if="scope.row.type === 2">视频</span>
                            <span v-if="scope.row.type === 3">百科</span>
                            <span v-if="scope.row.type === 4">问题</span>
                            <span v-if="scope.row.type === 5">活动</span>
                            <span v-if="scope.row.type === 6">服务</span>
                            <span v-if="scope.row.type === 7">淘货</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="内容标题"
                        align="center"
                        width="150"
                        show-overflow-tooltip
                        prop="title">
                    </el-table-column>

                    <el-table-column
                        label="其他关键词"
                        align="center"
                        width="350"
                        show-overflow-tooltip
                        prop="other_tags">
                        <template slot-scope="scope">
                            <div class="other_tags">
                                <el-tag type="success" v-for="(item,index) in scope.row.other_tags" :key="index">{{item}}</el-tag>
                            </div>
                        </template>
                    </el-table-column>


                    <el-table-column
                        label="操作"
                        fixed="right"
                        min-width="80"
                        align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" plain size="mini">预览</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="fenye">
                    <el-pagination
                        v-if="total"
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="25"
                        @current-change="currentChange"
                    ></el-pagination>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="neirDialog = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';
    import echarts from "echarts";

    export default {
        name: "keywordStatistics",
        components: {
            BreadCrumb
        },
        data(){
            return{
                // 面包屑
                breadData: [
                {
                    id: 1,
                    name: '用户行为分析',
                    urls: '/index/market/Market',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '搜索记录',
                    urls: '/index/market/marketProduct/MarketProduct',
                    icon: 'icon-home'
                }
                ],
                contentHeader:null,
                searchObj:{},
                SellerName:null,
                productName:null,
                tableData:null,
                count:null,  //总的搜索记录

                typeList:[],

                timeMapDialog:false,
                neirDialog:false,
                startTime:null,
                endTime:null,
                tagId:null,
                neirData:[],  //内容图数据
                //分页
                total:null,
                currentPage:1
            }
        },
        mounted(){
            this.getSearchList();
            
        },
        methods:{
            //前台预览
            handlePreview(id,type){
                if(type === 1){ //文章详情页
                    window.open(this.Urls.frontUrl+"home/articleDetails?id="+id);  
                }else if(type === 2){  //视频详情页
                    window.open(this.Urls.frontUrl+"home/videoDetail?video="+id);  
                }else if(type === 3){  //百科详情页
                    window.open(this.Urls.frontUrl+"home/encyclopedia-detail?uid="+id);  
                }else if(type === 4){  //问题详情页
                    window.open(this.Urls.frontUrl+"home/problemDetails?id="+id);  
                }else if(type === 5){  //活动详情页
                    window.open(this.Urls.frontUrl+"home/activity-detail?id="+id);  
                }else if(type === 6){  //服务详情页
                    window.open(this.Urls.frontUrl+"home/service-detail?id="+id);  
                }else if(type === 7){  //淘货详情页
                    window.open(this.Urls.frontUrl+"home/market-detail?id="+id);  
                }
                
            },
            handleChangeTime(){
                console.log(this.startTime,this.endTime);
                this.getTimeData(this.tagId);
            },
            /**
             * 查看时间图 
             * author:ZhangYunChuan
             * time:2019/1/25
             */
            handleSeeTimeMap(id){
                this.timeMapDialog = true;
                var myDate = new Date();
                this.endTime = myDate.getFullYear()+'-'+(this.completionMonth(Number(myDate.getMonth())+1));
                this.startTime =  Number(myDate.getFullYear()-1)+'-'+(this.completionMonth(Number(myDate.getMonth())+1));
                this.tagId = id;
                this.getTimeData(id);
                
            },
            //获取时间图数据
            getTimeData(id){
                this.HttpClient.post('/admin/behavior/tagTimeDiagram',{
                    start:this.startTime,
                    end:this.endTime,
                    tag_id:id,
                })
                .then(res=>{    
                    console.log(res);
                    if(res.data.code === 200){
                        let time = [],
                        data = [];
                        for( let k in res.data.data){
                            time.push(k);
                            data.push(res.data.data[k]);
                        }
                        console.log(time)
                        this.drawLine(time,data);
                    }
                })
            },
            drawLine(time,data){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('timeEchart'));
                // 绘制图表
                myChart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: time
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
                    data:data
                }]
                });
            },
            //查看内容表格
            handleSeeNeirTab(name){
                this.neirDialog = true;
                this.HttpClient.post('/admin/behavior/tagList',{
                    tag_name:name,
                    size:15,
                    page:1
                }).then(res=>{
                    console.log(res);
                    this.neirData = res.data.data.data;
                })
            },
            //内容搜索
            handleSearchContent(){
                console.log(this.searchObj.content);
                this.getSearchList();
            },
            //结束时间搜索
            handleChangeEndTime(e){
                console.log(this.searchObj.endTime);
                this.getSearchList();
            },
            //开始时间搜索
            handleChangeStartTime(e){
                console.log(this.searchObj.startTime);
                this.getSearchList();
            },
            //获取关键词列表
            getSearchList(){
                this.HttpClient.post('/admin/behavior/tagList',{
                    start_time:this.searchObj.startTime,
                    end_time:this.searchObj.endTime,
                    tag_name:this.searchObj.content,
                    size:15,
                    page:this.currentPage
                })
                .then(res=>{
                    console.log(res)
                    this.tableData = res.data.data.data;
                    let wordNum = 0;
                    this.tableData.forEach(item => {
                        let arr = item.name.split('');
                        arr.forEach(i => {
                            console.log(i)
                            if(this.Tools.isChinese(i)){  //是文字
                                wordNum = wordNum+3;
                            }else{                        //是数字或者字母
                                wordNum = wordNum+1;
                            }
                        });
                    });
                    console.log(wordNum)
                    
                    this.count = res.data.data.total;
                    this.total = res.data.data.total;
                })
            },
            //分页
            currentChange(p){
                this.currentPage=p;
                this.getSearchList();
                this.currentPage  = null;
            },
            filterSecondary(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            // 补全月份
            completionMonth(month){
                if(month < 10){
                    return '0'+month
                }else{
                    return month
                }
            },
        },
    }
</script>

<style lang="less">
    .SearchRecord{
        text-align: left;
        .bread{
            margin: 10px;
        }
      .productReview_main::-webkit-scrollbar {display:none}
        .productReview_main {
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

            .content{
                padding: 20px 40px;
                box-sizing: border-box;
                .all_num{
                    border-bottom: 1px solid #dedede;
                    // padding-bottom: 20px;
                    // margin-bottom: 10px;
                    // display: flex;
                    .all_num_li{
                        display: flex;
                        margin-bottom: 10px;
                        margin-right: 15px;
                        .num_title{
                            text-align: center;
                            padding: 0 20px;
                            height: 35px;
                            line-height: 35px;
                            border-radius: unset;
                            background: #15bafe;font-size: 14px;
                            color:#fff;
                        }
                        .all_number{
                            text-align: center;
                            margin-left: 20px;
                            padding: 0 20px;
                            height: 35px;
                            line-height: 35px;
                            border:1px solid #dedede;
                            
                        }
                    }
                    
                }
                .content_main{
                    /*搜索框*/
                    .encyclopedia_search{
                        display: flex;
                        justify-content: flex-start;
                        margin: 20px 0;
                        .content_select{
                            display: flex;
                            .date_item{
                            display: flex;
                            border: 1px solid #dcdfe6;
                            border-radius: 5px;
                            margin-right: 20px;
                            .date_label{
                                color: #808080;
                                font-size: 12px;
                                height: 40px;
                                line-height: 40px;
                                margin-left: 10px;
                            }
                            .el-input--mini {
                                .el-input__inner{
                                    height: 40px;
                                    line-height: 40px;
                                    border: none !important;
                                }
                            }
                            .date_picker_1{
                                width: 140px;
                            }
                            }
                        }
                        >div{
                            margin-right: 30px;
                        }
                    }

                    /*表格*/
                    .content_table {
                        box-sizing: border-box;
                        .el-table--border::after,
                        .el-table--group::after,
                        .el-table::before{
                            background: unset;
                        }
                        .el-table {
                            border: none;
                            border-left: 1px solid #ebeef5;
                            thead {
                                color: #fff;
                                th, tr {
                                    background-color: #15bafe;

                                    .el-input--suffix .el-input__inner{
                                        color:#fff;
                                        font-weight:900;
                                        border:none;
                                        padding:0;
                                        background:#15bafe;
                                    }
                                    .el-input__inner::placeholder{
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__inner::-webkit-input-placeholder{
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__inner::-moz-placeholder{  //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__inner:-ms-input-placeholder{  //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__suffix{
                                        right:-2px;
                                        .el-select__caret{
                                            color:#fff;
                                        }
                                        .el-input__icon{
                                            width:14px;
                                        }
                                    }
                                    .el-select{
                                        position:relative;
                                        top:2px;
                                    }
                                }
                            }
                            tbody{
                                .other_tags{
                                    .el-tag{
                                        margin-right: 5px;
                                    } 
                                }
                            }
                        }

                        .el-pagination{
                            text-align:center;
                        }

                        /*操作按钮*/
                        .mallReview_scope {
                            padding: 0;
                            .cell {
                                line-height: unset;
                                .mallReview_btm {
                                    display: flex;
                                    align-items: center;
                                    .el-button{
                                        border: none;
                                        background: transparent;
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
        // 时间图
        .timeMapDialog{
            .approveDialog_title{
                display: flex;
                align-items: center;
                i{
                    font-size: 24px;
                    color: #15bafe;
                }
            }
        }
        // 图表弹框
        .neirDialog{
            .approveDialog_title{
                display: flex;
                align-items: center;
                i{
                    font-size: 24px;
                    color: #15bafe;
                }
            }
            .el-table {
                            border: none;
                            border-left: 1px solid #ebeef5;
                            thead {
                                color: #fff;
                                th, tr {
                                    background-color: #15bafe;

                                    .el-input--suffix .el-input__inner{
                                        color:#fff;
                                        font-weight:900;
                                        border:none;
                                        padding:0;
                                        background:#15bafe;
                                    }
                                    .el-input__inner::placeholder{
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__inner::-webkit-input-placeholder{
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__inner::-moz-placeholder{  //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__inner:-ms-input-placeholder{  //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__suffix{
                                        right:-2px;
                                        .el-select__caret{
                                            color:#fff;
                                        }
                                        .el-input__icon{
                                            width:14px;
                                        }
                                    }
                                    .el-select{
                                        position:relative;
                                        top:2px;
                                    }
                                }
                            }
                        }
                        .fenye{
                            text-align: center;
                        }
        }
    }

</style>
