<template>
    <div class="encyclopediaContents">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

      <div class="encyclopedia_main">
        <div class="encyclopedia_title">
          <div class="title">专业目录分配情况</div>
        </div>

        <div class="encyclopedia_box">
          <div class="encyclopedia_header">
            <el-radio-group v-model="sectorSelection">
              <el-radio  v-for="(menu,index) in menuList" :key="index" :label="menu"
              @change="handleChangeMenu(menu)">{{menu.name}}</el-radio>
            </el-radio-group>
          </div>

          <div class="encyclopedia_content">
            <el-collapse-transition>
              <div class="encyclopedia_list" v-if="viewFirstLevel">
                <div class="encyclopedia_list_box">
                  <div class="encyclopedia_list_title">一级目录</div>
                  <span style="color:#bfbfbf;margin-left:100px" v-if="firstMenuList.length === 0">暂无目录</span>
                  <el-radio-group v-model="firstLevel">
                    <el-radio  v-for="(firstMenu,index) in firstMenuList" :key="index"
                    :label="firstMenu" @change="handleChangeMenu(firstMenu)">{{firstMenu.name}}</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-collapse-transition>

            <el-collapse-transition>
              <div class="encyclopedia_list" v-if="viewSecondary">
                <div class="encyclopedia_list_box">
                  <div class="encyclopedia_list_title">二级目录</div>
                  <span style="color:#bfbfbf;margin-left:100px" v-if="secondMenuList.length === 0">暂无目录</span>
                  <el-radio-group v-model="secondary">
                    <el-radio v-for="secondMenu in secondMenuList" :key="secondMenu.id"
                    :label="secondMenu" @change="handleChangeMenu(secondMenu)">{{secondMenu.name}}</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-collapse-transition>

            <el-collapse-transition>
              <div class="encyclopedia_list" v-if="viewThirdLevel">
                <div class="encyclopedia_list_box">
                  <div class="encyclopedia_list_title">三级目录</div>
                  <span style="color:#bfbfbf;margin-left:100px" v-if="threeMenuList.length === 0">暂无目录</span>
                  <el-radio-group v-model="thirdLevel">
                    <el-radio v-for="threeMenu in threeMenuList" :key="threeMenu.id"
                     :label="threeMenu" @change="handleChangeMenu(threeMenu)">{{threeMenu.name}}</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-collapse-transition>

          </div>

        </div>

        <div class="encyclopedia_table">

          <div class="encyclopedia_header">
            <div class="encyclopedia_left">
              <div class="encyclopedia_list_num">
                当前目录下总数： {{total}}
              </div>
              <div class="encyclopedia_left_time">

                <div class="date_item">
                  <p class="date_label">开始</p>
                  <el-date-picker
                    v-model="searchStartTime"
                    class="date_picker_1"
                    type="date"
                    placeholder="选择日期"
                    @change="handleSeachStartTime($event)">
                  </el-date-picker>
                </div>
                <div class="date_item">
                  <p class="date_label">截止</p>
                  <el-date-picker
                    v-model="searchEndTime"
                    class="date_picker_1"
                    type="date"
                    placeholder="选择日期"
                    @change="handleSeachEndTime($event)">
                  </el-date-picker>
                </div>

              </div>
            </div>
            <div class="encyclopedia_search">
              <div>
                <el-input placeholder="商家名称搜索" v-model="searchUserName" class="input-with-select" @input="searcha($event)">
                  <el-button  slot="append" icon="el-icon-search" @click="handleSearchUserName"></el-button>
                </el-input>
              </div>
              <div>
                <el-input placeholder="商品名称搜索" v-model="searchTitle" class="input-with-select" @input="searchb($event)">
                  <el-button  slot="append" icon="el-icon-search" @click="handleSearchTitle"></el-button>
                </el-input>
              </div>
              <div>
                <el-input placeholder="产品ID搜索" v-model="searchTradeId" class="input-with-select" @input="searchc($event)">
                  <el-button  slot="append" icon="el-icon-search" @click="handleSearchTradeId"></el-button>
                </el-input>
              </div>
            </div>
          </div>

          <div class="encyclopedia_content">

            <el-table
              :data="tableData"
              :border="true"
              >
              <el-table-column
                label="产品ID"
                align="center"
                width="100"
                prop="id"
                sortable>
              </el-table-column>
              <el-table-column
                label="商品名称"
                align="center"
                width="170"
                show-overflow-tooltip
                prop="title">
              </el-table-column>

              <el-table-column
                label="学科板块"
                align="center"
                width="100"
                show-overflow-tooltip
                prop="subject">
              </el-table-column>

              <el-table-column
                label="一级专业目录"
                align="center"
                width="150"
                show-overflow-tooltip
                prop="menu_1">
                <template slot-scope="scope">
                  <span>{{scope.row.menu_1||'无'}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="二级专业目录"
                align="center"
                width="150"
                show-overflow-tooltip
                prop="menu_2">
                <template slot-scope="scope">
                  <span>{{scope.row.menu_2||'无'}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="三级专业目录"
                align="center"
                width="150"
                show-overflow-tooltip
                prop="menu_3">
                <template slot-scope="scope">
                  <span>{{scope.row.menu_3||'无'}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="产品类型"
                align="center"
                width="120"
                show-overflow-tooltip
                prop="thirdMenu">
                <template slot-scope="scope">
                  <span>{{scope.row.thirdMenu||'无'}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="商家名称"
                align="center"
                width="130"
                show-overflow-tooltip
                prop="nickname">
                <template slot-scope="scope">
                  <span>{{scope.row.nickname||'无'}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="分配时间"
                align="center"
                width="160"
                show-overflow-tooltip
                prop="created_at"
                sortable>
              </el-table-column>

              <el-table-column
                label="目录状态"
                align="center"
                width="80"
                show-overflow-tooltip
                prop="status">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 1">正常</span>
                  <span v-if="scope.row.status === 0">禁用</span>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                fixed="right"
                min-width="150">
                <template slot-scope="scope">      
                    <el-button type="primary" plain size="mini" @click="deleteFn(scope.row)">删除</el-button>
                    <el-button type="primary" plain size="mini" @click="handlePreview">预览</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
                      v-if="total"
                      layout="prev, pager, next"
                      :total="total"
                      :page-size="pageSize"
                      
              ></el-pagination>
          </div>

        </div>

      </div>

      <!-- 删除弹窗 -->
      <el-dialog :visible.sync="removeVisible" width="300px">
          <div slot="title" class="dialog_delete_head_title">
              <i class="delete_icon"></i>
              <span>删除</span>
          </div>
          <div>
              <img class="boolean_delete" :src="warmImg"/>
              <p>确定删除此商品的专业目录吗？</p>
          </div>
          <div slot="footer">
          <el-row class="row_e">
              <el-button class="btn_deletes" size="small" @click="removeVisible = false">取 消</el-button>
              <el-button type="primary" size="small"  class="btn_delete" @click="handleSuerDelete">确 认</el-button>
          </el-row>
          </div>
      </el-dialog>


    </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import DeleteModal from '@/components/public/modalDelete'
  import Tools from "@/utils/tools.js";
  let tools = new Tools();

  export default {
    name: "MallContents",
    components: {
      BreadCrumb,
      DeleteModal
    },
    data(){
      return{
        // 面包屑
        breadData: [{
          id: 1,
          name: '商城',
          urls: '/index/encyclopedia/encyclopedia',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '目录分配情况',
          urls: '/index/mall/mallProduct/mall-contents',
          icon: 'icon-home'
        }],
        warmImg: require("../../../assets/image/warm.png"),

        modifyObj: {}, // 删除对象
        removeVisible: false, // 删除弹窗的判断条件

        currentPage:1,//当前页
        pageSize:25,//每页显示数量
        total: 0, // 目录总数

        sectorSelection: null,  // 学科板块选择
        firstLevel:null, // 一级目录
        secondary:null, // 二级目录
        thirdLevel:null, // 三级目录

        menuList: [{
          name:'全部',
          menu_id:0
        }], // 模块列表
        firstMenuList: [], // 一级目录
        secondMenuList: [], // 二级目录
        threeMenuList: [], // 三级目录

        muneIdObj: {
            muneId: '',
            id: 0
        }, // 选中的模块ID
        firstMuneIdObj: {
            firstMuneId: '',
            id: 0
        }, // 选中的一级目录ID
        secondMuneIdObj: {
            secondMuneId: '',
            id: 0
        }, // 选中的二级目录ID
        threeMuneIdObj: {
            threeMuneId: '',
            id: 0
        }, // 选中的三级目录ID

        viewFirstLevel:false,  // 一级目录
        viewSecondary:false,  //二级目录
        viewThirdLevel:false,  //三级目录

        // 表格
        tableData: [],
        menuID:'',


        //搜索条件
        
        searchUserName:null,  //商家名称搜索
        searchTitle:null,  //产品名称搜索
        searchTradeId:null,  //产品id搜索
        searchStartTime:null,
        searchEndTime:null,
        searchMenuId:null,  //选择目录搜索
        
        // 分页
        currentPage:1,  //当前页
        total:null,
      }
    },
    created() {
      this.getMallList();
      this.getMenuList();
    },
    methods:{
      //产品id搜索
      handleSearchTradeId(){
          this.getMallList();
      },
      //商品id搜索
      handleSearchTitle(){
          this.getMallList();
      },
      //商家名称搜索
      handleSearchUserName(){
          this.getMallList();
      },
      //时间搜索
      handleSeachStartTime(e){
          // console.log(this.searchStartTime)
          this.getMallList();
      },
      handleSeachEndTime(e){
          // console.log(this.searchEndTime)
          this.getMallList();
      },
      //切换板块
      handleChangeMenu(i){
          if(i.type === 0){
              this.firstMenuList = [];
              this.secondMenuList = [];
              this.viewSecondary = false;
              this.threeMenuList = [];
              this.viewThirdLevel = false;
          }else if(i.type === 1){
              this.searchMenuId = i.menu_id;
              this.getMallList();
              this.secondMenuList = [];
              this.threeMenuList = [];
              this.viewThirdLevel = false;
          }else if(i.type === 2){
              this.searchMenuId = i.menu_id;
              this.getMallList();
              this.threeMenuList = [];
          }else if(i.type === 3){
              this.searchMenuId = i.menu_id;
              this.getMallList();
          }
          // console.log(i)
          this.getNextList(i.menu_id,i.type);
      },
      // 获取下一级列表
      getNextList(id,type){
          this.HttpClient.post('/admin/menu/getOneChild',{
              menu_id:id,
              menu_type:3
          })  
          .then(res=>{
              // console.log(res)
              if(res.data.code === 200){
                  if(type === 0){
                      this.firstMenuList  = res.data.data.child;
                      this.viewFirstLevel = true;
                  }else if(type === 1){
                      this.secondMenuList  = res.data.data.child;
                      this.viewSecondary = true;
                  }else if(type === 2){
                      this.threeMenuList  = res.data.data.child;
                      this.viewThirdLevel = true;
                  }
              }
          })
      },
      //获取头部板块列表
      getMenuList(){
          this.HttpClient.post('/admin/menu/getList',{
              menu_type:3
          })  
          .then(res=>{
              // console.log(res)
              this.menuList = res.data.data;
          })
      },
      //获取列表数据
      getMallList(){
          let params = {
              id:this.searchTradeId,
              nickname:this.searchUserName,
              title:this.searchTitle,
              start_time:this.searchStartTime,
              end_time:this.searchEndTime,
              menu_id:this.searchMenuId,
              page:this.currentPage,
              size:25
          };
          this.HttpClient.post('/admin/marketProduct/getListByMajorMenuId',params)  
          .then(res=>{
              console.log(res)
              this.tableData = res.data.data.data;
              this.total = res.data.data.total;
              for(let j=0;j<this.tableData.length;j++){
                  if(this.tableData[j].menu.length > 0){
                      for(let i=0;i<res.data.data.data.length;i++){
                          this.tableData[j].subject =  res.data.data.data[j].menu[0].name;
                          this.tableData[j].menu_1 =  res.data.data.data[j].menu[1].name;
                          if(res.data.data.data[j].menu[2] !== undefined){
                              this.tableData[j].menu_2 =  res.data.data.data[j].menu[2].name;
                          }
                          if(res.data.data.data[j].menu[3] !== undefined){
                               this.tableData[j].menu_3 =  res.data.data.data[j].menu[3].name;
                          } 
                      }
                  }
              }
              
              // this.sectorSelection = this.tableData[0];
              this.total = res.data.data.total;
          })
      },
      searcha(e){
          this.searchUserName = e;
      },
      searchb(e){
          this.searchTitle = e;
      },
      searchc(e){
          this.searchTradeId = e;
      },
      // 改变当前页
      handleCurrentChange(e){
          // console.log(e);
          this.currentPage = e;
          this.getMallList();
      },
      cloneContents(){
          this.viewFirstLevel = false;
          this.viewSecondary = false;
          this.viewThirdLevel = false;
      },
      /***
       *删除
       *author:ZhangYunChuan
       *time:2019/01/03
       */
      deleteFn(i){
        // console.log(i)
          this.menuID = i.menu_id;
          this.modifyObj = i;
          this.removeVisible = true;
      },
      /***
       *确认删除
       *author:ZhangYunChuan
       *time:2019/01/03
       */
      handleSuerDelete(){
        let params = {
          menu_id:this.menuID
        }
        this.HttpClient.post('/admin/menuRelationship/destroy',params).then(res =>{
          // console.log(res.data)
          if(res.data.code === 200){
            this.$message.success(res.data.msg);
            this.removeVisible = false;
            setTimeout(() => {
              this.getMallList();
            }, 500);
          }
        })
          // console.log(this.modifyObj);
          // let arr = [];
          // for(let i in this.modifyObj.menu){
          //   arr.push(this.modifyObj.menu[i].id)
          // }
          // console.log(arr);
          // this.HttpClient.post('/admin/marketProduct/getListByMajorMenuId',{
          //    id:arr,
          //    product_id:this.modifyObj.product_id,
          //    action:'del'
          //  })  
          // .then(res=>{
          //     console.log(res);
          // })
      },
      //预览
      handlePreview(){
        this.$message.warning('此功能跳转前台页面，暂未开放！');
      },
      filterPlate(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      filterSecondary(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      removeModal(modifyObj) {
        this.removeVisible = true;
        this.modifyObj = modifyObj;
        // console.log('modifyObj:', this.modifyObj);
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
  .encyclopediaContents {
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

        .encyclopedia_content{
          
          .encyclopedia_list:nth-child(2){
            border-left-color: #4dacff;
            .encyclopedia_list_title{
              background: #4dacff;
            }
            .el-radio.is-checked{
              background: #4dacff;
            }
          }

          .encyclopedia_list:nth-child(3){
            border-left-color: #26c6da;
            .encyclopedia_list_title{
              background: #26c6da;
            }
            .el-radio.is-checked{
              background: #26c6da;
            }
          }

          .encyclopedia_list{
            border-bottom: 1px solid #dedede;
            padding-bottom: 15px;
            margin-bottom: 20px;
            .encyclopedia_list_box{
              text-align: left;
              border-left: 3px solid #15bafe;
              border-radius: 4px;
              padding-top: 10px;
            }
            .encyclopedia_list_title{
              display: inline-block;
              width: 120px;
              height: 35px;
              line-height: 35px;
              text-align: center;
              background: #15bafe;
              color: #fff;
              border-radius: 4px;
              margin-left: 10px;
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
              box-sizing: border-box;
              min-width: 120px;
              padding: 0 20px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px solid #dedede;
              border-radius: 4px;
              margin: 10px;
              .el-radio__input{
                display: none;
              }
              .el-radio__label{
                padding: 0;
              }
            }
          }
        }

      }

      .encyclopedia_table {
        /*头部*/
        .encyclopedia_header{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 30px 25px;

          .encyclopedia_left{
            display: flex;
            align-items: center;
            .encyclopedia_list_num{
              display: flex;
              background: #15bafe;
              color: #fff;
              justify-content: center;
              align-items: center;
              height: 35px;
              padding: 0 15px;
              margin-right: 20px;
              font-size: 14px;
            }

            .encyclopedia_left_time{
              display: flex;
              align-items: center;
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
                  line-height: 40px;
                  margin-left: 10px;
                }
                .date_picker_1{
                  width: 140px;
                }
              }

            }
          }

          /*搜索框*/
          .encyclopedia_search{
            display: flex;
            align-items: center;
            >div{
              margin-left: 30px;
            }
          }
        }

        /*表格*/
        .encyclopedia_content{
          padding: 0 30px;
          width: 85%;
          // .el-table{
            // thead{
            //   color: #fff;
            //   th,tr{
            //     background-color: #15bafe;
            //   }
            // }
          // }

          /*操作按钮*/
          .encyclopedia_scope{
            padding: 0;
            .cell{
              line-height: unset;
              .encyclopedia_btm{
                display: flex;
                align-items: center;
                div:not(:last-child){
                  border-right: 1px solid #ebeef5;
                }
                div{
                  min-height: 47px;
                  height: 100%;
                  flex: 1;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                }
              }
            }
          }
          .el-table {
                    thead {
                        color: #fff;
                        th, tr {
                            background-color: #15bafe;
                            .el-input--suffix .el-input__inner{
                                color:#fff;
                                font-size:12px;
                                font-weight:900;
                                border:none;
                                padding:0;
                                background:#15bafe;
                            }
                            .el-input__inner::placeholder{
                                font-size:12px!important;
                                // color:#000!important;
                                font-weight:900!important;
                            }
                            .el-input__inner::-webkit-input-placeholder{
                                font-size:12px!important;
                                color:#fff!important;
                                font-weight:900!important;
                            }
                            .el-input__inner::-moz-placeholder{  //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
                                font-size:12px!important;
                                color:#fff!important;
                                font-weight:900!important;
                            }
                            .el-input__inner:-ms-input-placeholder{  //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
                                font-size:12px!important;
                                color:#fff!important;
                                font-weight:900!important;
                            }
                            .el-input__suffix{
                                right:-1px;
                                // .el-select__caret{
                                //     color:#fff;
                                // }
                                .el-input__icon{
                                    width:14px;
                                    color:#fff;
                                    font-size: 14px;
                                }
                            }
                            .el-select{
                                position:relative;
                                padding-left: 8px;
                                top:2px;
                            }
                        }
                    }
                    tbody{
                        .created_at{
                            .cell{
                                padding:0 15px;
                            }
                        }

                    }
                }
        }
      }

    }
  }
</style>
