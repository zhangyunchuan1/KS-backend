<template>
  <div class="questionDistributionc">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

    <div class="question_main">
      <div class="question_title">
        <div class="title">专业目录分配</div>
      </div>

      <div class="question_header">
        <div class="question_select">
          <div class="date_item">
            <p class="date_label">开始</p>
            <el-date-picker
              v-model="startTime"
              class="date_picker_1"
              type="date"
              size="mini"
              placeholder="选择日期"
              @change="handleStartTime">
            </el-date-picker>
          </div>
          <div class="date_item">
            <p class="date_label">截止</p>
            <el-date-picker
              v-model="endTime"
              class="date_picker_1"
              type="date"
              size="mini"
              placeholder="选择日期"
              @change="handleEndTime">
            </el-date-picker>
          </div>
        </div>

        <div class="question_search">
          <div>
            <el-input placeholder="题目搜索" v-model="topicSearch" class="input-with-select" @change="handleChangeTitle">
              <el-button slot="append" icon="el-icon-search" @click="handleTitleSearch"></el-button>
            </el-input>
          </div>
        </div>
      </div>

      <div class="question_content">

        <el-table
          :data="tableData"
          :border="true"
          style="width: 100%">
          <el-table-column
            label="ID"
            align="center"
            width="65"
            prop="id"
            sortable>
          </el-table-column>
          <el-table-column
            label="视频题目"
            align="center"
            prop="title"
            width="180"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="所属板块"
            align="center"
            width="110"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.category}}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column
            label="子类"
            align="center"
            :filters="[{text: '基本理论知识', value: '基本理论知识'}, {text: '发动机', value: '发动机'}]"
            :filter-method="filterSecondary"
            prop="menu.menu_1_name"
            width="180">
          </el-table-column> -->

          <el-table-column
            label="是否分配"
            align="center"
            :filters="[{text: '已分配', value: 1}, {text: '未分配', value: 0}]"
            :filter-method="filterSecondary"
            prop='menu.length'
            width="130"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.menu.length > 0">已分配</span>
              <span v-if="scope.row.menu.length == 0">未分配</span>
            </template>
          </el-table-column>

          <el-table-column
            label="通过时间"
            align="center"
            width="160"
            prop="created_at"
            sortable
            show-overflow-tooltip>
          </el-table-column>

          <el-table-column
            label="一级目录"
            align="center"
            width="130"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.menu_1}}</span>
              <span v-if="!scope.row.menu_1" class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column
            label="二级目录"
            align="center"
            width="130"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span >{{scope.row.menu_2}}</span>
              <span v-if="!scope.row.menu_2" class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column
            label="三级目录"
            align="center"
            width="130"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.menu_3}}</span>
              <span v-if="!scope.row.menu_3" class="sortout_color">无</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            class-name="question_scope">
            <template slot-scope="scope">
              <div class="question_btm">
                <div @click="handleOpenAddCatalog(scope.row.video_id)">添加目录</div>
                <div>预览</div>
                <div @click="handleOpenAll(scope.row.menu)">所有目录</div>
              </div>
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

    <!--添加目录弹窗-->
    <el-dialog
      width="800px"
      custom-class="addDirectoryDialog"
      :visible.sync="addDirectoryDialog">
      <span slot="title" class="addDirectoryDialog_title"><i class="iconfont icon-jia-xianxingfangkuang"></i>添加目录</span>
      <div class="addDirectoryDialog_box">
        <div class="box_list">
          <div class="box_list_title">学科板块：</div>
          <div class="box_list_main">
            <el-radio-group v-model="subject">
              <el-radio border v-model="disableDialogRadio" v-for="(item,index) in subjectData" :label="item.menu_id" :key="index" @change="tt(item)">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="box_list" >
          <div class="box_list_title">一级目录：</div>
          <div class="box_list_main">
            <el-radio-group v-model="firstLevel">
              <el-radio border v-model="disableDialogRadio1" v-for="(item,index) in oneCatalog" :label="item.menu_id" :key="index" @change="qq(item)">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="box_list" >
          <div class="box_list_title">二级目录：</div>
          <div class="box_list_main">
            <el-radio-group v-model="secondary">
              <el-radio border v-model="disableDialogRadio2" v-for="(item,index) in twoCatalog" :label="item.menu_id" :key="index" @change="qq(item)" >{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="box_list" >
          <div class="box_list_title">三级目录：</div>
          <div class="box_list_main">
            <el-radio-group v-model="thirdLevel">
              <el-radio border v-model="disableDialogRadio3" v-for="(item,index) in threeCatalog" :label="item.menu_id" :key="index" @change="qq(item)">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="box_list" >
          <div class="box_list_title" style="color:#000">四级目录：</div>
          <div class="box_list_main">
            <el-radio-group v-model="fourthLevel">
              <el-radio border v-model="disableDialogRadio4" v-for="(item,index) in fourCatalog" :label="item.menu_id" :key="index" @change="qq(item)">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDirectoryDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleAddCatalog">添 加</el-button>
      </span>
    </el-dialog>

    <!--所有目录弹窗-->
    <el-dialog
      width="800px"
      custom-class="allDirectoryDialog"
      :visible.sync="allDirectoryDialog">
      <span slot="title" class="allDirectoryDialog_title"><i class="iconfont icon-jia-xianxingfangkuang"></i>所有目录</span>
      <div class="allDirectoryDialog_box">
        <div class="box_list" v-for="(subject,index) in menu" :key="index">
          <div class="box_list_title" v-for="(item,index) in subject"  :key="index" v-if="item.type === 0">{{item.name}}:</div>
          <div class="box_list_main">
            <el-radio-group v-model="carSelect">
              <el-radio :label="1" v-for="(itema,index) in subject"  :key="index" v-if="itema.type === 1">{{itema.name}}</el-radio>
              <el-radio :label="2" v-for="(itemb,index) in subject"  :key="index" v-if="itemb.type === 2">{{itemb.name}}</el-radio>
              <el-radio :label="3" v-for="(itemc,index) in subject"  :key="index" v-if="itemc.type === 3">{{itemc.name}}</el-radio>
              <el-radio :label="4" v-for="(itemd,index) in subject"  :key="index" v-if="itemd.type === 4">{{itemd.name}}</el-radio>
              <!-- <el-radio :label="2">润滑油</el-radio>
              <el-radio :label="3">发动机油</el-radio> -->
            </el-radio-group>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allDirectoryDialog = false">关 闭</el-button>
        <!-- <el-button type="primary">确 定</el-button> -->
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';

  export default {
    name: "VideoDistribution",
    components: {
      BreadCrumb,
    },
    data(){
      return{
        // 面包屑
        breadData: [{
          id: 1,
          name: '视频',
          urls: '/index/video/video',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '专业目录分配',
          urls: '/index/video/videoDistribution',
          icon: 'icon-home'
        }],

        startTime:'',  //开始时间
        endTime:'',  //结束时间
        topicSearch:'', // 题目搜索
        disableDialogRadio:null,
        // 表格
        tableData: [],

        addDirectoryDialog: false, // 添加目录弹窗
        subject:1,  // 学科板块
        firstLevel:1,  // 一级目录
        secondary:1,  // 二级目录
        thirdLevel:1,  // 三级目录
        fourthLevel:1, // 四级目录

        allDirectoryDialog: false, // 所有目录弹窗
        carSelect:1,  // 汽车
        engineeringSelect:1,  // 电器工程
        controlSelect:1,  // 控制工程
        startTime:null,  //时间区间搜索，开始时间
        endTime:null,  //时间区间搜索，截止时间
        title:null,  //题目搜索，题目
        subjectData:[], //学科板块
        oneCatalog:[
          // {
          //   menu_id:null,
          //   name:null
          // }
        ], //一级目录
        twoCatalog:[
          // {
          //   menu_id:null,
          //   name:null
          // }
        ], //二级目录
        threeCatalog:[
          // {
          //   menu_id:null,
          //   name:null
          // }
        ], //三级目录
        fourCatalog:[], //四级目录
        fiveCatalog:[],  //5级目录
        disableDialogRadio1:null, 
        disableDialogRadio2:null,
        disableDialogRadio3:null,
        disableDialogRadio4:null,
        menuId:null, //添加是存储的menu_id
        videoId:null, //暂存要操作的问题ID
        menu:[],  // 所有目录
        addId:null,  //需要添加的菜单id

        pageSize: 25, // 每页显示条数
        total: 0, // 总条数
        currentPage: 1, // 当前页
      }
    },
    mounted(){
        this.getPassQuestionList(this.startTime,this.endTime,this.title);
    },
    methods:{
      //打开所有目录
      handleOpenAll(menu){
          console.log(menu)
          this.menu = menu;
          this.allDirectoryDialog = true;
      },
      //确认添加目录
      handleAddCatalog(){
        console.log(this.addId,this.videoId)
          this.HttpClient.post('/admin/menuRelationship/create',{
              menu_id:this.addId,
              relation_id:this.videoId,
              type:1,
              relation_type:2
          })  
          .then(res=>{
              console.log(res)
              if(res.data.code === 200){
                  this.$message.success(res.data.msg);
                  setTimeout(() => {
                      this.getPassQuestionList(this.startTime,this.endTime,this.title);
                      this.addDirectoryDialog = false;
                      console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
                  }, 800);
                  
              }else{
                  this.$message.error(res.data.msg);
              }
          })
      },
      //获取下一级目录
      qq(i){
          console.log(i)
          this.menuId = i.menu_id;
          if(i.type === 1){ //当切换一级目录的时候，就清空二级和三级目录
              this.twoCatalog = [];
              this.threeCatalog = [];
              this.fourCatalog = [];
          }
          if(i.type === 2){  //如果点击的是二级目录，就清空三级目录
              this.threeCatalog = [];
              this.fourCatalog = [];
          }
          if(i.type === 3){  //如果点击的是三级目录，就清空四级目录
              this.fourCatalog = [];
          }
          if(i.type === 4){  //如果点击的是三级目录，就清空四级目录
              console.log('点击了4及')
          }
          this.getNextCatalog(i.menu_id,i.type);
      },
      //选择学科板块后
      tt(i){
          this.oneCatalog = [];
          this.twoCatalog = [];
          this.threeCatalog = [];
          this.fourCatalog = [];
          console.log(i)
          this.getChildeCatalogList(i.menu_id);
      },
      //打开添加目录的的弹窗
      handleOpenAddCatalog(id){
          this.videoId = id;
          this.getSubjectCatalog();
          this.addDirectoryDialog = true;
      },
      //当获取到一级目录后获取下一级目录
      getNextCatalog(id,type){
          this.HttpClient.post('/admin/menu/getOneChild',{
              menu_id:id,
              menu_type:3
          })  
          .then(res=>{
              console.log(res)
              if(res.data.code === 200){
                  
                  if(type === 1){ //判断选择的是几级目录，如果是一级，那么这个请求的就是二级目录
                      this.twoCatalog = res.data.data.child;
                      this.addId = id;
                  }else if(type === 2){ 
                      this.addId = id;
                      this.threeCatalog = res.data.data.child;
                  }else if(type === 3){ 
                      this.addId = id;
                      this.fourCatalog = res.data.data.child;
                  }else if(type === 4){ 
                      this.addId = id;
                      this.fiveCatalog = res.data.data.child;
                  }
              }
          })
      },
      // 获取学科下的一级目录
      getChildeCatalogList(id){
          this.HttpClient.post('/admin/menu/getOneChild',{
              menu_id:id,
              menu_type:3
          })  
          .then(res=>{
              console.log(res)
              for(let i=0;i<res.data.data.child.length;i++){
                  if(res.data.data.child[i].type === 1){
                      this.oneCatalog.push(res.data.data.child[i]);
                  }else if(res.data.data.child[i].type === 2){
                      this.twoCatalog.push(res.data.data.child[i]);
                  }else if(res.data.data.child[i].type === 3){
                      this.threeCatalog.push(res.data.data.child[i]);
                  }
              }
              console.log(this.oneCatalog,this.twoCatalog,this.threeCatalog)
          })
      },
      // 获取学科板块
      getSubjectCatalog(){
          this.HttpClient.post('/admin/menu/getList',{
              menu_type:3
          })  
          .then(res=>{
              console.log(res)
              this.subjectData = res.data.data;
          })
      },
      //获取已审核通过的视频
      getPassQuestionList(startTime,endTime,title){
          this.HttpClient.post('/admin/videos/getListWithMajorMenu',{
              status:1,
              start_time:startTime,
              end_time:endTime,
              title:title,
              size:this.pageSize,
              page:this.currentPage
          })  
          .then(res=>{
              console.log(res)
              this.tableData = res.data.data.data; 
              this.total = res.data.data.total;
              for(let j=0;j<res.data.data.data.length;j++){
                  if(res.data.data.data[j].menu.length !== 0){
                      for(let m=0;m<res.data.data.data[j].menu[0].length;m++){
                        console.log(res.data.data.data[j].menu[0].length)
                        console.log(res.data.data.data[j].menu[0][m]);
                        let y = res.data.data.data[j].menu[0][m].type;
                        if(y == 0){
                            this.tableData[j].subject =  res.data.data.data[j].menu[0][m].name;
                        };
                        if(y == 1){
                            this.tableData[j].menu_1 = res.data.data.data[j].menu[0][m].name;
                        };
                        if(y == 2){
                            this.tableData[j].menu_2 = res.data.data.data[j].menu[0][m].name;
                        };if(y == 3){
                            this.tableData[j].menu_3 = res.data.data.data[j].menu[0][m].name;
                        };if(y == 4){
                            this.tableData[j].menu_4 = res.data.data.data[j].menu[0][m].name;
                        }
                    }
                  }  
              }
          })
      },
      // 分页
      currentChange(p){
        this.currentPage = p;
        this.getPassQuestionList();
      },
      //选择题目
      handleChangeTitle(){
          if(this.topicSearch === ''){
              this.title = null;
          }else{
              this.title = this.topicSearch;
          }
          this.title = this.topicSearch;
      },
      //题目搜索
      handleTitleSearch(){
          this.getPassQuestionList(this.startTime,this.endTime,this.title);
      },
      // 选择开始时间
      handleStartTime(e){
          this.getPassQuestionList(this.startTime,this.endTime,this.title);
      },
      // 选择截止时间
      handleEndTime(e){
          this.getPassQuestionList(this.startTime,this.endTime,this.title);
      },
      filterPlate(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      filterSecondary(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    }
  }
</script>

<style lang="less">
  .questionDistributionc{
    .bread{
      margin: 10px;
    }
    .question_main::-webkit-scrollbar {display:none}
    .question_main {
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;

      .question_title {
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

      /*头部*/
      .question_header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30px 25px;

        .question_select{
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


        /*搜索框*/
        .question_search{
          display: flex;
          align-items: center;
          >div{
            margin-left: 30px;
          }
        }
      }

      /*表格*/
      .question_content{
        padding: 0 30px;
        .el-table{
          thead{
            color: #fff;
            th,tr{
              background-color: #15bafe;
            }
          }
        }

        /*操作按钮*/
        .question_scope{
          padding: 0;
          .cell{
            line-height: unset;
            .question_btm{
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
      }
    }

    /*添加目录弹窗*/
    .addDirectoryDialog{
      .addDirectoryDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #15bafe;
          font-size: 20px;
        }
      }
      .addDirectoryDialog_box{
        .box_list{
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          border-bottom:1px solid  #dfdede;
          .box_list_title{
            width: 100px;
            height: 19px;
            text-align: left;
          }
          .box_list_main{
            // flex: 1;
            // display: flex;
            // width: 500px;
            // align-items: center;
            // flex-wrap: wrap;
            // text-align: left;
            // color:blue
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
              border: 1px solid #dedede;
              border-radius: 4px;
              width: auto;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 5px;
              padding: 0 10px;
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
    }

    /*所有目录弹窗*/
    .allDirectoryDialog{
      .allDirectoryDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #15bafe;
          font-size: 20px;
        }
      }
      .allDirectoryDialog_box{
        .box_list{
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          .box_list_title{
            width: 90px;
            text-align: left;
          }
          .box_list_main{
            flex: 1;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            text-align: left;
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
              border: 1px solid #dedede;
              border-radius: 4px;
              // width: 120px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 5px;
              padding: 0 10px;
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
    }

  }
</style>
