<template>
    <div class="Sales">
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

        <div class="encyclopedia_main">
            <div class="encyclopedia_title">
            <div class="title">销售情况</div>
            </div>
            <div class="encyclopedia_box">
                <div class="encyclopedia_header">
                    <div class="encyclopedia_header_title">商场选择</div>
                    <el-radio-group v-model="sectorSelection">
                    <el-radio  v-for="(menu,index) in plateList" :key="index" :label="menu"
                    @change="handleChangeMenu(menu.menu_id)">{{menu.name}}</el-radio>
                    </el-radio-group>
                </div>
                <!--一级目录-->
                <el-collapse-transition>
                <div class="content_list" v-if="primaryDirectory">
                    <div class="content_list_header">
                    <p>一级目录</p>
                    </div>
                    <div class="content_list_box">
                    <el-radio-group v-model="primaryDirectoryRadio" @change="primaryDirectoryBtm($event)">
                        <el-radio border v-for="(item,index) in firstLevelDirectory" :label="item.menu_id" :key="index">{{item.name}}</el-radio>
                    </el-radio-group>
                    </div>
                </div>
                </el-collapse-transition>
                <!--二级目录-->
                <el-collapse-transition>
                <div class="content_list" v-if="secondaryDirectory">
                    <div class="content_list_header">
                    <p>二级目录</p>
                    </div>
                    <div class="content_list_box">
                    <el-radio-group v-model="secondaryDirectoryRadio" @change="secondaryDirectoryBtm($event)">
                        <el-radio border v-for="(item,index) in twoLevelDirectory" :label="item.menu_id" :key="index">{{item.name}}</el-radio>
                    </el-radio-group>
                    </div>
                </div>
                </el-collapse-transition>
                <!--三级目录-->
                <el-collapse-transition>
                <div class="content_list" v-if="threelDirectory">
                    <div class="content_list_header">
                    <p>三级目录</p>
                    </div>
                    <div class="content_list_box">
                    <el-radio-group v-model="threelDirectoryRadio" @change="getSalesList">
                        <el-radio border v-for="(item,index) in threeLevelDirectory" :label="item.menu_id" :key="index">{{item.name}}</el-radio>
                    </el-radio-group>
                    </div>
                </div>
                </el-collapse-transition>
            </div>
            <div class="encyclopedia_table">
                <div class="encyclopedia_search">
                    <div> 
                        <el-input placeholder="产品ID搜索" v-model="searchProductId" clearable class="input-with-select" @input="searcha($event)">
                        <el-button  slot="append" icon="el-icon-search" @click="handleSearchProductId"></el-button>
                        </el-input>
                    </div>
                    <div>
                        <el-input placeholder="商家名称搜索" v-model="searchUserName" clearable class="input-with-select" @input="searchb($event)">
                        <el-button  slot="append" icon="el-icon-search" @click="handleSearchUserName"></el-button>
                        </el-input>
                    </div>
                    <div>
                        <el-input placeholder="商品名称搜索" v-model="searchTitle" clearable class="input-with-select" @input="searchc($event)">
                        <el-button  slot="append" icon="el-icon-search" @click="handleSearchProductTitle"></el-button>
                        </el-input>
                    </div>
                </div>
                <div class="encyclopedia_content" style="width:100%">
                    <el-table
                        :data="tableData"
                        :border="true">
                        <el-table-column
                        label="产品ID"
                        align="center"
                        width="90"
                        prop="id"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        label="商品名称"
                        align="center"
                        width="120"
                        show-overflow-tooltip
                        prop="title">
                        </el-table-column>

                        <el-table-column
                        label="公司名称（对外名字）"
                        align="center"
                        width="180"
                        show-overflow-tooltip
                        prop="nickname">
                        <template slot-scope="scope">
                            <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                            <span class="sortout_color" v-else>无</span>
                        </template>
                        </el-table-column>

                        <el-table-column
                        label="销量"
                        align="center"
                        width="90"
                        show-overflow-tooltip
                        prop="sell_num">
                        <template slot-scope="scope">
                            <span v-if="scope.row.sell_num">{{scope.row.sell_num}}</span>
                            <span class="sortout_color" v-else>无</span>
                        </template>
                        </el-table-column>

                        <el-table-column
                        label="平均售出时间（天）"
                        align="center"
                        width="160"
                        show-overflow-tooltip
                        prop="sell_day">
                        <template slot-scope="scope">
                            <span v-if="scope.row.sell_day">{{scope.row.sell_day}}</span>
                            <span class="sortout_color" v-else>无</span>
                        </template>
                        </el-table-column>

                        <el-table-column
                        label="总订单数"
                        align="center"
                        width="130"
                        show-overflow-tooltip
                        prop="order_num">
                        <template slot-scope="scope">
                            <span v-if="scope.row.order_num">{{scope.row.order_num}}</span>
                            <span class="sortout_color" v-else>无</span>
                        </template>
                        </el-table-column>

                        <el-table-column
                        label="用户打分"
                        align="center"
                        width="130"
                        show-overflow-tooltip
                        prop="score"
                        sortable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.score">{{scope.row.score}}</span>
                            <span class="sortout_color" v-else>无</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="单价"
                        align="center"
                        width="130"
                        show-overflow-tooltip
                        prop="price"
                        sortable>
                            <template slot-scope="scope">
                                <span v-if="scope.row.price">{{scope.row.price}}</span>
                                <span class="sortout_color" v-else>无</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="评论数"
                        align="center"
                        width="130"
                        show-overflow-tooltip
                        prop="comment_num"
                        sortable>
                        <template slot-scope="scope">
                                <span v-if="scope.row.comment_num">{{scope.row.comment_num}}</span>
                                <span class="sortout_color" v-else>无</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="状态"
                        align="center"
                        width="130"
                        show-overflow-tooltip
                        prop="status"
                        sortable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.status==1" class="normal_color">上架</span>
                            <span v-if="scope.row.status==2" class="sortout_color">下架</span>
                            <span v-if="scope.row.status==3" class="audit_color">待审核</span>
                            <span v-if="scope.row.status==0" class="delete_color">删除</span>
                        </template>
                        </el-table-column>

                        <el-table-column
                        label="操作"
                        align="center"
                        fixed="right"
                        class-name="encyclopedia_scope">
                        <template slot-scope="scope">
                            <div class="encyclopedia_btm">
                            <el-button size="medium " type="text">查看商品</el-button>
                            </div>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

      <!-- 分页 -->
      <div class="paging">
          <el-pagination
              background
              layout="prev, pager, next"
              :page-size="25"
              :total="total"
              @current-change="handleCurrentChange($event)">
          </el-pagination>
      </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';
    export default {
        name: "Sales",
        components: {
            BreadCrumb
        },
        data(){
            return {
                // 面包屑
                breadData: [{
                    id: 1,
                    name: '商城订单',
                    urls: '/index/mall/mallOrder/mall-order',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '销售情况',
                    urls: '/index/mall/mallOrder/sales',
                    icon: 'icon-home'
                }],
                // 分页
                total:null,  //数据总条数
                tableData:[],
                plateList:[],  //板块

                sectorSelection: null,  // 学科板块选择
                //查询条件
                searchProductId:null,
                searchUserName:null,
                searchTitle:null,

                primaryDirectory: false,
                primaryDirectoryRadio: null,  // 一级目录单选框
                secondaryDirectory: false,
                secondaryDirectoryRadio: null,  // 二级目录单选框
                threelDirectory: false,
                threelDirectoryRadio: null,  // 三级目录单选框

                firstLevelDirectory:[],  //一级目录
                twoLevelDirectory:[],  //二级目录
                threeLevelDirectory:[],  //三级目录
            }
        },
        mounted(){
            this.getPlateList();
            this.getSalesList();
        },
        methods:{
            //获取板块列表
            getPlateList(){
                this.HttpClient.post('/admin/menu/getList',{
                    menu_type : 1,
                    type:0
                })  
                .then(res=>{
                    console.log(res);
                    this.plateList = res.data.data;
                })
            },
            // 获取板块下一级目录
            getNextList(menu_id){
                this.HttpClient.post('/admin/menu/getOneChild',{
                    menu_type : 1,
                    menu_id :menu_id
                })
                .then(res=>{
                    console.log(res);
                    if(res.data.code === 200){
                        if(res.data.data.child.length > 0){
                            console.log(res.data.data.child)
                            if(res.data.data.child[0].description === '一级菜单'){
                                this.firstLevelDirectory = res.data.data.child;
                                // this.firstPid = res.data.data.child[0].pid;
                                // this.zeroMenuId = res.data.data.info.menu_id;
                            }else if(res.data.data.child[0].description === '二级菜单'){
                                this.twoLevelDirectory = res.data.data.child;
                                // this.twoPid = res.data.data.child[0].pid;
                                // this.firstMenuId = res.data.data.info.menu_id;
                            }else if(res.data.data.child[0].description === '三级菜单'){
                                this.threeLevelDirectory = res.data.data.child;
                                // this.threePid = res.data.data.child[0].pid;
                                // this.twoMenuId = res.data.data.info.menu_id;
                            }
                        }else{
                            if(res.data.data.info.type === 0){
                                this.firstLevelDirectory = [];
                                // this.firstPid = res.data.data.info.id;
                                // this.zeroMenuId = res.data.data.info.menu_id;
                            }else if(res.data.data.info.type === 1){
                                this.twoLevelDirectory = [];
                                // this.twoPid = res.data.data.info.id;
                                // this.firstMenuId = res.data.data.info.menu_id;
                            }else if(res.data.data.info.type === 2){
                                // this.twoMenuId = res.data.data.info.menu_id;
                                // this.threePid = res.data.data.info.id;
                                this.threeLevelDirectory = [];
                            }
                        }
                    }
                })
            },
            //获取销售情况列表
            getSalesList(){
                this.HttpClient.post('/admin/marketOrder/manufacturer',{
                    folder:this.sectorSelection?this.sectorSelection.menu_id:'',
                    menu_1:this.primaryDirectoryRadio,
                    menu_2:this.secondaryDirectoryRadio,
                    menu_3:this.threelDirectoryRadio,
                    category_id:this.searchProductId,
                    title:this.searchTitle,
                    nickname:this.searchUserName
                })  
                .then(res=>{
                    console.log(res);
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.total
                })
            },
            // 切换板块
            handleChangeMenu(id){
                console.log(id)
                console.log(this.sectorSelection)
                this.getNextList(id);
                this.primaryDirectory = true;
                this.secondaryDirectory = false;
                this.threelDirectory = false;
                this.primaryDirectoryRadio = null;
            },
            primaryDirectoryBtm(id){
                console.log(id)
                console.log(this.primaryDirectoryRadio)
                this.threeLevelDirectory = [];
                this.getNextList(id)
                this.secondaryDirectory = true;
                this.threelDirectory = false;
                this.secondaryDirectoryRadio = null;
            },
            secondaryDirectoryBtm(id){
                console.log(id)
                this.getNextList(id)
                this.threelDirectory = true;
                this.threelDirectoryRadio = null;
            },
            // 翻页
            handleCurrentChange(e){
                console.log(e)
            },
            //根据商品ID查询
            handleSearchProductId(e){
                this.getSalesList();
                console.log(e)
            },
            //根据商家名称查询
            handleSearchUserName(e){
                this.getSalesList();
                console.log(e)
            },
            //根据商品名称查询
            handleSearchProductTitle(e){
                this.getSalesList();
                console.log(e)
            },
            searcha(){
                this.getSalesList();
            },
            searchb(){
                this.getSalesList();
            },
            searchc(){
                this.getSalesList();
            },
        }
    }
</script>

<style lang="less">
.dialog_delete_head_title{
    height: 16px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    text-align: left;
    font-size: 15px;
  }
.Sales {
    /*分页*/
    .paging{
        margin: 20px 0;
        text-align: center;
    }
    .bread {
        margin: 10px;
    }
  .encyclopedia_main::-webkit-scrollbar {display:none}
    .encyclopedia_main {
        margin-left: 10px;
        margin-top: 10px;
        background: #fff;
        height: calc(100vh - 100px);
        width: calc(100vw - 240px);
        border-radius: 2px;
      overflow-y: auto;

        .encyclopedia_title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 70px;
            border-bottom: 2px solid #f2f2f2;
            padding: 0 40px;
            .title {
                font-size: 20px;
                color: #222;
            }
        }
        .encyclopedia_box{
        padding: 0 40px;
        margin: 20px 0;
        /*目录选择*/
        .encyclopedia_header{
          display: flex;
          align-items: center;
          padding-bottom: 15px;
          border-bottom: 1px solid #dedede;
          margin-bottom: 20px;
            .encyclopedia_header_title{
                width: 120px;
                height: 40px;
                align-items: center;
                border: 1px solid #15bafe;
                line-height: 40px;
                background: #15bafe;
                color:#fff;
            }
          .el-radio-group{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
          }
          .el-radio.is-checked{
            background: #15bafe;
            border-color: #15bafe;
          }
          .el-radio__input.is-checked+.el-radio__label{
            color: #fff;
          }
          .el-radio{
            width: 120px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #dedede;
            margin: 10px;
            .el-radio__input{
              display: none;
            }
            .el-radio__label{
              padding: 0;
            }
          }
        }
        /*目录*/
        .content_list{
          margin-bottom: 40px;
          border-bottom: 1px solid #dedede;
          padding-bottom: 40px;
          .content_list_header{
            display: flex;
            align-items: center;
            margin-bottom: 15px;

            p{
              height: 40px;
              line-height: 40px;
              padding: 0 20px;
              background: #15bafe;
              color: #fff;
              margin-right: 30px;
            }
            .el-input{
              width: 200px;
              margin-right: 10px;
            }
          }
          .content_list_box{
              display: flex;
            .el-radio-group{
              height: 40px;
              line-height: 40px;
              .el-radio{
                height: 100%;
                line-height: 40px;
                padding: 0 20px;
                .el-radio__input{
                  display: none;
                }
                .el-radio__label{
                  padding: 0;
                }
              }
              .el-radio.is-checked{
                background: #15bafe;
                color: #fff;
                border-color: #15bafe;
                .el-radio__label{
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
    /*搜索框*/
    .encyclopedia_search{
        display: flex;
        justify-content: flex-end;
        padding: 0 40px;
        >div{
            margin-left: 30px;
        }
    }
    .encyclopedia_content{
        margin: 20px 0;
        padding: 0 40px;
        .el-table{
            thead{
              color: #fff;
              th,tr{
                background-color: #15bafe;
              }
            }
          }
    }
}
</style>

