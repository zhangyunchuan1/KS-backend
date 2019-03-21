<template>
    <div class="MessagesPrompt">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="productReview_main">
            <!--标题-->
            <div class="title">
                <p>消息提示</p>
            </div>

            <div class="content">
                <div class="all_num">
                    <!-- <div class="num_title">总搜索次数</div>
                    <div class="all_number">123456</div> -->
                    <el-button type="primary" @click="handleAddTips">添  加</el-button>
                    <div class="num_title">收支提示</div>
                </div>
                <div class="content_main">
                    <div class="content_search">
                        <!-- <div class="encyclopedia_search">
                            <div>
                                <el-input
                                placeholder="内容搜索"
                                clearable
                                v-model="searchObj.content"
                                class="input-with-select">
                                <el-button slot="append" icon="el-icon-search" @click="handleSearchContent"></el-button>
                                </el-input>
                            </div>
                        </div> -->

                    </div>

                    <div class="content_table">
                        <el-table
                                :data="tableData"
                                :border="true">
                            <el-table-column
                                    label="ID"
                                    align="center"
                                    width="60"
                                    prop="id"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="类别"
                                    align="center"
                                    width="80"
                                    prop="cat1"
                                    show-overflow-tooltip
                                    :filters="categoryFilter"
                                    :filter-method="filterHandler">
                            </el-table-column>

                            <el-table-column
                                    label="子类别"
                                    align="center"
                                    width="120"
                                    prop="cat2"
                                    show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                                    label="摘要"
                                    align="center"
                                    width="150"
                                    show-overflow-tooltip
                                    prop="content.title">
                            </el-table-column>

                            <el-table-column
                                    label="信息"
                                    align="center"
                                    width="290"
                                    show-overflow-tooltip
                                    prop="content.info">
                            </el-table-column>

                            <el-table-column
                                    label="事件"
                                    align="center"
                                    width="220"
                                    prop="content.description"
                                    show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                                    label="备注"
                                    align="center"
                                    width="220"
                                    show-overflow-tooltip
                                    prop="content.remark">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.content.remark">{{scope.row.content.remark}}</span>
                                        <span v-else class="delete_color">暂无</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="颜色"
                                    align="center"
                                    width="80"
                                    sortable
                                    prop="content.color"
                                    show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                                    label="作用对象选择"
                                    align="center"
                                    width="150"
                                    sortable
                                    prop="content.for"
                                    show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                                    label="状态"
                                    align="center"
                                    width="80"
                                    sortable
                                    prop="status"
                                    show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.status === 1">正常</span>
                                        <span v-if="scope.row.status === 0" class="delete_color">删除</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="操作"
                                    align="center"
                                    class-name="mallReview_scope">
                                <template slot-scope="scope">
                                    <el-button
                                    @click="handleModify(scope.row)"
                                    type="text">
                                    修改
                                    </el-button>
                                    <el-button
                                     @click="handleDelete(scope.row.id)"
                                    type="text">
                                    删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                v-if="total"
                                layout="prev, pager, next"
                                :total="total"
                                :page-size="pageSize"
                                @current-change="currentChange"
                        ></el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!--添加目录弹窗-->
        <el-dialog 
          :visible.sync="addDirectoryDialog"
          width="750px"
          custom-class="addDirectoryDialog"
          :title="alertTitle">
          <span slot="title" class="addDirectoryDialog_title"><i class="iconfont icon-orderedlist"></i>添加新的消息</span>
          <div class="addDirectoryDialog_main">
            <div class="add_box">
              <div class="addbox_left">
                <div class="left_cat">
                    <span>类别</span>
                    <el-select v-model="valuea" placeholder="请选择" @change="handleChangeCategory($event)">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </div>
                <div class="left_cat">
                    <span>子类别</span>
                    <el-select v-model="valueb" placeholder="请选择" @change="handleChangeSubclass($event)">
                      <el-option
                        v-for="item in subclass"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </div>
                <div class="left_cat">
                  <span>摘要</span>
                  <el-input v-model="inputAbstract" placeholder="请输入内容"></el-input>
                </div>
                <div class="left_cat">
                  <span>信息</span>
                  <el-input v-model="inputInfo" placeholder="请输入内容"></el-input>
                </div>
                <div class="left_cat">
                  <span>占位符</span>
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                  <el-button class="add_btn" @click="handleAddTag">+</el-button>
                </div>
                <div class="placeho">
                    <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                    </el-tag>
                </div>
              </div>
              <div class="addbox_rigth">
                <div class="rigth_cat">
                  <span>事件</span>
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    :autosize="{ minRows: 4, maxRows: 4}"
                    v-model="description">
                  </el-input>
                </div>
                <div class="rigth_cat">
                  <span>备注</span>
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    :autosize="{ minRows: 4, maxRows: 4}"
                    v-model="remark">
                  </el-input>
                </div>
                <div class="rigth_radio">
                  <span>状态</span>
                  <el-radio-group v-model="colorRadio" @change="handleChangeColor($event)">
                    <el-radio border label="blue" >蓝色</el-radio>
                    <el-radio border label="green" >绿色</el-radio>
                    <el-radio border label="red" >红色</el-radio>
                  </el-radio-group>
                </div>
                <div class="rigth_radio">
                  <span>作用对象</span>
                  <el-radio-group v-model="targetRadio" @change="handleChangeTarget($event)">
                    <el-radio border label="商家" >商家</el-radio>
                    <el-radio border label="用户" >用户</el-radio>
                    <el-radio border label="公共" >公共</el-radio>
                  </el-radio-group>
                </div>
                <div class="rigth_cat">
                  <span>code</span>
                  <el-input v-model="inputCode" placeholder="请输入code" clearable></el-input>
                </div>
                <!-- <div class="grade infor">
                    <el-tag type="info">code</el-tag>
                    <el-input placeholder="请输入code" v-model="inputCode" clearable></el-input>
                </div> -->
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDirectoryDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleSaveDirectory">保 存</el-button>
          </div>
        </el-dialog>
        <!-- 删除弹窗 -->
        <el-dialog :visible.sync="deleteVisible" width="300px" custom-class="deletedilog">
            <div slot="title" class="dialog_delete_head_title">
                <i class="delete_icon"></i>
                <span>删除</span>
            </div>
            <div>
                <img class="boolean_delete" :src="warmImg"/> 
                <p>确定删除吗？</p>
            </div>
            <div slot="footer">
            <el-row class="row_e">
                <el-button class="btn_deletes" size="small" @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" size="small"  class="btn_delete" @click="handleSureDelete">确 定</el-button>
            </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';

    export default {
        name: "MessagesPrompt",
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
                alertTitle:null,
                options: [],  //大类
                subclass:[],  //子类
                //选择器绑定值
                valuea: '',  //选择的大类ID
                valueb: '',  //选择的子类ID

                inputAbstract:null,  //摘要
                inputInfo:null,     //信息
                input:null,  //占位符
                description:null,  //事件
                remark:null,  //备注
                colorRadio:null,  //选择的颜色
                targetRadio:null,  //选择作用的对象

                contentHeader:null,
                addDirectoryDialog:false,  //添加消息弹框
                searchObj:{},
                SellerName:null,
                productName:null,
                tableData:null,

                deleteVisible:false, //删除弹窗
                warmImg: require("../../../assets/image/warm.png"),
                deleteID:null, 

                categoryFilter:[],  //筛选类别

                typeList:[],  //原始类别数据
                
                //分页
                total:0,
                currentPage:1,// 当前页
                pageSize:25,// 每页显示数量

                dynamicTags:[],

                infoID: null,//当前信息ID
                inputCode:'',
            }
        },
        mounted(){
            this.getTipsList();
            this.getCategorylist();
        },
        methods:{
            //点击修改
            handleModify(i){
                console.log(i)
                this.alertTitle = "修改";
                this.infoID = i.id;
                this.valuea = i.content.parent;
                this.valueb = i.content.action;
                this.inputAbstract = i.content.title;
                this.inputInfo = i.content.info;
                this.dynamicTags = i.content.replace;
                this.description =  i.content.description;
                this.remark = i.content.remark;
                this.colorRadio = i.content.color;
                this.targetRadio = i.content.for;
                this.inputCode = i.name;
                console.log(i)
                this.addDirectoryDialog = true;
            },
            //点击添加提示
            handleAddTips(){
                this.alertTitle = "添加";
                this.infoID ='';
                this.valuea = '';
                this.valueb ='';
                this.inputAbstract = '';
                this.inputInfo = '';
                this.dynamicTags = [];
                this.description = '';
                this.remark = '';
                this.colorRadio = '';
                this.targetRadio = '';
                this.addDirectoryDialog = true;
            },
            //切换作用对象
            handleChangeTarget(e){
                console.log(e)
            },
            //选择颜色
            handleChangeColor(e){
                console.log(e)
            },
            //添加占位符
            handleAddTag(){
                this.dynamicTags.push(this.input);
                this.input = '';
            },
            //删除占位符
            handleClose(e){
                console.log(e)
                this.dynamicTags.splice(this.dynamicTags.indexOf(e), 1);
            },
            //选择子类
            handleChangeSubclass(e){
                console.log(e)
            },
            //切换大类别
            handleChangeCategory(e){
                console.log(e)
                this.valueb = null;
                this.subclass = [];
                for(let i in this.typeList){
                    if(e === this.typeList[i].name){
                        // this.subclass = this.typeList[i].child;
                        for(let t = 0;t<this.typeList[i].child.length;t++){
                            this.subclass.push({
                                value:this.typeList[i].child[t].name,
                                label:this.typeList[i].child[t].name,
                            })
                        }
                    }
                }
                console.log(this.subclass)
            },
            //内容搜索
            handleSearchContent(){
                console.log(this.searchObj.content);
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
            //获取类别
            getCategorylist(){
                this.HttpClient.post('/admin/menu/getList',{
                    menu_type:4,
                    type:0
                })
                .then(res=>{
                    console.log(res)
                    this.typeList = res.data.data;
                    for(let i in res.data.data){
                       this.options.push({
                           value:res.data.data[i].name,
                           label:res.data.data[i].name,
                       })
                       //筛选
                       this.categoryFilter.push({
                           value:res.data.data[i].name,
                           text:res.data.data[i].name,
                       })
                    }
                    console.log(this.options);
                    console.log(this.categoryFilter)
                })
            },
            //获取信息提示列表
            getTipsList(){
                this.HttpClient.post('/admin/templates/getList',{
                    type:3,
                    size:25,
                    page:this.currentPage,
                })
                .then(res=>{
                    console.log(res)
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.total;
                    for(let i in this.tableData){
                        this.tableData[i].cat1 = this.tableData[i].content.parent;
                        this.tableData[i].cat2 = this.tableData[i].content.action;
                    }
                })
            },
            handleSaveDirectory(){
                console.log(this.valuea,this.valueb,this.inputAbstract,this.dynamicTags,this.description,this.remark)
                let jsonData = {}
                    jsonData["parent"] = this.valuea;
                    jsonData["action"] = this.valueb;
                    jsonData["title"] = this.inputAbstract;
                    jsonData["info"] = this.inputInfo;
                    jsonData["color"] = this.colorRadio;
                    jsonData["description"] = this.description;
                    jsonData["remark"] = this.remark;
                    jsonData["for"] = this.targetRadio;
                    jsonData["replace"] = this.dynamicTags;
                    console.log(JSON.stringify(jsonData))
                if(this.alertTitle == "添加"){
                    let params = {
                        type: 3,
                        name: this.inputCode,
                        content: JSON.stringify(jsonData)
                    };
                    // 添加数据
                    this.HttpClient.post("/admin/templates/create", params).then(res => {
                        console.log(res)
                        if (res.data.code === 200) {
                            setTimeout(() => {
                            this.getTipsList();
                            },500)
                            this.addDirectoryDialog = false;
                        }
                    });
                }else if(this.alertTitle == "修改"){
                    let params = {
                        id: this.infoID,
                        type: 3,
                        name: this.inputCode,
                        content: JSON.stringify(jsonData)
                    };
                    // 修改数据
                    this.HttpClient.post("/admin/templates/edit", params).then(res => {
                        console.log(res)
                        if (res.data.code === 200) {
                            setTimeout(() => {
                            this.getTipsList();
                            },500)
                            this.addDirectoryDialog = false;
                        }
                    });
                }
            },
            /**
             * 打开删除弹窗
             * author:ZhangYunChuan
             * time:2019/1/4
             */
            //删除
            handleDelete(id){
                this.deleteVisible = true;
                this.deleteID = id;
            },
            /**
             * 确定删除 
             * author:ZhangYunChuan
             * time:2019/1/4
             */
            handleSureDelete(){
                this.HttpClient.post("/admin/templates/destroy", {
                    id:this.deleteID
                })
                .then(res => {
                        console.log(res)
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            setTimeout(() => {
                            this.getTipsList();
                            this.deleteVisible = false;
                            },500)
                        }
                });
            },
            //分页
            currentChange(p){
                this.currentPage=p;
                this.getTipsList();
            },
            /**
             * 类别筛选 
             * author:ZhangYunChuan
             * time:2019/1/4
             */
            filterHandler(value, row, column) {
                console.log(value)
            const property = column["property"];
            return row[property] === value;
            },
        },
    }
</script>

<style lang="less">
    .MessagesPrompt{
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
                    padding-bottom: 20px;
                    margin-bottom: 10px;
                    display: flex;
                    justify-content: space-between;
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
                .content_main{
                    /*搜索框*/
                    .encyclopedia_search{
                        display: flex;
                        justify-content: flex-end;
                        margin: 20px 0;
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
        /*添加消息弹窗*/
      .addDirectoryDialog{
        .addDirectoryDialog_title{
          display: flex;
          align-items: center;
          color: #666;

          i{
            font-size: 24px;
            color: #15bafe;
            margin-right: 10px;
          }
        }
        .addDirectoryDialog_main{
          .add_box{
            display: flex;
            justify-content: space-between;
            .addbox_left{
              width: 48.5%;
              // border: 1px solid #bfbfbf;
              .left_cat{
                display: flex;
                margin-bottom: 20px;
                >span{
                  width: 60px;;
                  display: block;
                  height: 40px;
                  background: #15bafe;
                  text-align: center;
                  line-height: 40px;
                  color: #fff;
                  border-radius: 4px;
                  margin-right: 10px;
                }
                .el-input{
                  width: 210px;
                }
                .add_btn{
                  margin-left: 10px;
                }
              }
                .placeho{
                    border:1px solid #bfbfbf;
                    padding: 20px 10px;
                    .el-tag + .el-tag {
                        margin: 5px 10px;
                    }
                }
                
                
            //   .add_info{
            //     border: 1px solid #bfbfbf;
            //     padding: 20px;
            //     display: flex;
            //     >span{
            //       display: block;
            //       background: #15bafe;
            //       height: 30px;
            //       padding: 0 10px;
            //       color:#fff;
            //       margin-right: 10px;
            //       line-height: 30px;
            //     }
            //   }
            }
            .addbox_rigth{
              width: 48.5%;
              // border: 1px solid #bfbfbf;
              .rigth_cat{
                display: flex;
                margin-bottom: 10px;  
                .el-textarea{
                  width: 270px;
                }
                >span{
                  width: 60px;;
                  display: block;
                  height: 40px;
                  background: #15bafe;
                  text-align: center;
                  line-height: 40px;
                  color: #fff;
                  border-radius: 4px;
                  margin-right: 10px;
                }
              }
              .rigth_radio{
                display: flex;
                margin-bottom: 10px;
                >span{
                  width: 60px;;
                  display: block;
                  height: 40px;
                  background: #15bafe;
                  text-align: center;
                  line-height: 40px;
                  color: #fff;
                  border-radius: 4px;
                  margin-right: 10px;
                }
                .el-radio-group{
                  height: 40px;
                  line-height: 40px;
                  .el-radio{
                    height: 100%;
                    line-height: 40px;
                    padding: 0 15px;
                    .el-radio__input{
                      display: none;
                    }
                    .el-radio__label{
                      padding: 0;
                    }
                  }
                  .el-radio.is-checked{
                    background: #15fe56;
                    color: #fff;
                    border-color: #15fe56;
                    .el-radio__label{
                      color: #fff;
                    }
                  }
                }
              }
              .grade {
                margin-bottom: 10px;
                .el-textarea{
                    margin-top: 10px;
                }
                .el-radio-group {
                    .el-radio.is-bordered.is-checked {
                    background: #409eff;
                    }
                    .el-radio__input.is-checked + .el-radio__label {
                    color: #fff;
                    }
                    .el-radio__input {
                    display: none;
                    }
                    .el-radio__label {
                    padding-left: 5px;
                    }
                }
                }
                .infor {
                    .el-input {
                        width: 60%;
                    }
                }
            }
          }
          
        }
      }
        /*删除弹窗*/
        .deletedilog{
            .el-dialog__body{
                text-align: center;
            }
            .dialog_delete_head_title{
                height: 16px;
                border-bottom: 1px solid #cccccc;
                padding-bottom: 10px;
                text-align: left;
                font-size: 15px;
            }
        }
        
    }

</style>
