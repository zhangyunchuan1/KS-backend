/admin/question/getListByMajorMenuId<template>
    <div class="questionContents">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

      <div class="question_main">
        <div class="question_title">
          <div class="title">目录分配情况</div>
        </div>
         
         <!-- <div></div> -->
        <div class="question_box">
          <div class="question_header">
            <el-radio-group v-model="sectorSelection">
              <el-radio @change="changeModel('menu', menu)"
              v-for="menu in menuList" :key="menu.id" :label="menu.menu_id"
              >{{menu.name}}</el-radio>
            </el-radio-group>
          </div>

          <div class="question_content">
            <el-collapse-transition>
              <div class="question_list" v-show="viewFirstLevel">
                <div class="question_list_box">
                  <div class="question_list_title">一级目录</div>
                  <el-radio-group v-model="firstLevel">
                    <el-radio @change="changeModel('firstMenu', firstMenu)"
                    v-for="firstMenu in firstMenuList" :key="firstMenu.id"
                    :label="firstMenu.menu_id">{{firstMenu.name}}</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-collapse-transition>

            <el-collapse-transition>
              <div class="question_list" v-show="viewSecondary">
                <div class="question_list_box">
                  <div class="question_list_title">二级目录</div>
                  <el-radio-group v-model="secondary">
                    <el-radio @change="changeModel('secondMenu', secondMenu)"
                    v-for="secondMenu in secondMenuList" :key="secondMenu.id"
                    :label="secondMenu.menu_id">{{secondMenu.name}}</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-collapse-transition>

            <el-collapse-transition>
              <div class="question_list" v-show="viewThirdLevel">
                <div class="question_list_box">
                  <div class="question_list_title">三级目录</div>
                  <el-radio-group v-model="thirdLevel">
                    <el-radio @change="changeModel('secondMenu', threeMenu)"
                    v-for="threeMenu in threeMenuList" :key="threeMenu.id"
                     :label="threeMenu.menu_id">{{threeMenu.name}}</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-collapse-transition>

          </div>

        </div>

        <div class="question_table">

          <div class="question_header">
            <div class="question_left">
              <div class="question_list_num">
                当前目录下总数： {{total}}
              </div>
              <div class="question_left_time">

                <div class="date_item">
                  <p class="date_label">开始</p>
                  <el-date-picker
                    v-model="searchObj.startTime"
                    class="date_picker_1"
                    type="date"
                    size="mini"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                <div class="date_item">
                  <p class="date_label">截止</p>
                  <el-date-picker
                    v-model="searchObj.endTime"
                    class="date_picker_1"
                    type="date"
                    size="mini"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>

              </div>
            </div>
            <div class="question_search">
              <div>
                <el-input placeholder="问题题目搜索" v-model="searchObj.titleSearch" class="input-with-select">
                  <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>

              <div>
                <el-input placeholder="问题ID搜索" v-model="searchObj.idSearch" class="input-with-select">
                  <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </div>
          </div>

          <div class="question_content">

            <el-table
              :data="tableData"
              :border="true"
              >
              <el-table-column
                label="ID"
                align="center"
                width="65"
                prop="id"
                sortable>
              </el-table-column>
              <el-table-column
                label="问题题目"
                align="center"
                show-overflow-tooltip
                width="400"
                prop="title">
              </el-table-column>

              <el-table-column
                label="学科板块"
                align="center"
                width="110"
                show-overflow-tooltip
                prop="menu">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.menu" :key="index">
                    <span v-if="item.type===0">{{item.name}}</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                label="一级目录"
                align="center"
                width="200"
                show-overflow-tooltip
                prop="firstMenu">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.menu" :key="index">
                    <span v-if="item.type===1">{{item.name}}</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                label="二级目录"
                align="center"
                width="200"
                show-overflow-tooltip
                prop="secondMenu">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.menu" :key="index">
                    <span v-if="item.type===2">{{item.name}}</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                label="三级目录"
                align="center"
                width="200"
                show-overflow-tooltip
                prop="threeMenu">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.menu" :key="index">
                    <span v-if="item.type===3">{{item.name}}</span>
                  </div>
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
                label="操作"
                align="center"
                width="200"
                class-name="question_scope">
                <template slot-scope="scope">
                  <div class="question_btm">
                    <el-button size="medium " type="text" @click="removeModal(scope.row)">删除</el-button>
                    <el-button size="medium " type="text" @click="handlePreview(scope.row.question_id)">预览</el-button>
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

      </div>

      <!-- 删除弹窗 -->
      <el-dialog :visible.sync="removeVisible" width="300px">
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
              <el-button class="btn_deletes" size="small" @click="removeVisible = false">取消</el-button>
              <el-button type="primary" size="small"  class="btn_delete" @click="remove">提交</el-button>
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
    name: "QuestionContents",
    components: {
      BreadCrumb,
      DeleteModal
    },
    data(){
      return{
        // 面包屑
        breadData: [{
          id: 1,
          name: '问题',
          urls: '/index/question/question',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '目录分配情况',
          urls: '/index/question/questionContents',
          icon: 'icon-home'
        }],
        warmImg: require("../../assets/image/warm.png"),

        searchObj: {}, // 搜索对象
        modifyObj: {}, // 修改对象
        removeVisible: false, // 删除弹窗的判断条件

        currentPage:1,//当前页
        pageSize:25,//每页显示数量
        total: 0, // 目录总数

        sectorSelection: 1,  // 学科板块选择
        firstLevel:null, // 一级目录
        secondary:null, // 二级目录
        thirdLevel:null, // 三级目录

        menuList: [], // 模块列表
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

      }
    },
    created() {
      this.getTableList(null);
      this.getModelList();
    },
    methods:{
      //预览
      handlePreview(id){
        window.open(this.Urls.frontUrl+"home/problemDetails?id="+id);  
      },
      cloneContents(){
          this.viewFirstLevel = false;
          this.viewSecondary = false;
          this.viewThirdLevel = false;
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
      removeModal(modifyObj) {
        this.removeVisible = true;
        this.modifyObj = modifyObj;
        console.log(modifyObj);
        console.log('modifyObj:', this.modifyObj);
      },
      search() {
        this.getTableList(this.searchObj);
        console.log('searchObj:', this.searchObj);
      },
      async remove() {
        let res = await this.HttpClient.post('/admin/menuRelationship/destroy', {relation_id: this.modifyObj.question_id, menu_id: this.modifyObj.menu_id});
        console.log(res)
        tools.getApiMessage(res);
        setTimeout(() => {
          this.removeVisible = false;
          this.search();
        }, 500);
      },
      async currentChange(page) {
        this.currentPage = page;
        this.search();
      },
      async changeModel(value, obj) {
        if(value === 'menu') {
          this.viewFirstLevel = true;
          await this.getFirstMenuList();
        }else if(value === 'firstMenu') {
          this.viewSecondary = true;
          await this.getSecondMenuList();
        }else if(value === 'secondMenu') {
          this.viewThirdLevel = true;
          await this.getThreeMenuList();
        }
        this.getTableList({menu_id: obj.menu_id})
        console.log('sectorSelection:', this.sectorSelection);
      },
      async getTableList(param) {
        let params = {
          page: this.currentPage
        }
        if(param) {
          params['menu_id'] = param.menu_id;
          params['start_time'] = param.startTime;
          params['end_time'] = param.endTime;
          params['id'] = param.idSearch;
          params['title'] = param.titleSearch;
        }
        let res = await this.HttpClient.post('/admin/question/getListByMajorMenuId', params);
        console.log('res.data is:', res.data)
        if (res.data.code === 200) {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        }
        console.log('tableData:', this.tableData);

      },
      async getModelList() {
        let res = await this.HttpClient.post('/admin/menu/getList', {
            menu_type: 3
        });
        let result = dealWith(res.data.data);
        this.menuList = result.menuList;
        this.sectorSelection = this.menuList[0].id;
        if(this.menuList[0]) {
            this.muneId = this.menuList[0].menu_id;
            this.pid = this.muneId;
        }
      },
      // 获取一级目录
      async getFirstMenuList() {
        console.log(this.sectorSelection)
        let res = await this.HttpClient.post('/admin/menu/getOneChild', {menu_id: this.sectorSelection, menu_type: 3});
        console.log(res)
        this.firstMenuList = res.data.data.child;
        // 二三级目录设为空
        this.secondMenuList = [];
        this.threeMenuList = [];
        // 一二三级目录选中为空
        this.firstLevel = null;
        this.secondary = null;
        this.thirdLevel = null;
      },
      // // 获取二级目录
      async getSecondMenuList() {
          let res = await this.HttpClient.post('/admin/menu/getOneChild', {menu_id: this.firstLevel, menu_type: 3});
          console.log(res)
          this.secondMenuList = res.data.data.child;
          // 三级目录设为空
          this.threeMenuList = [];
          // 二三级目录选中为空
          this.secondary = null;
          this.thirdLevel = null;
      },
      // // 获取三级目录
      async getThreeMenuList() {
          let res = await this.HttpClient.post('/admin/menu/getOneChild', {menu_id: this.secondary, menu_type: 3});
          console.log(res)
          this.threeMenuList = res.data.data.child;
      }

    }
  }

// 表格的数据处理
function dealWithTable(table) {
  let newTable = [];
  if(table && table.length > 0) {
    for(let i in table) {
      let array = table[i];
      array['model'] = '';
      array['firstMenu'] = '';
      array['secondMenu'] = '';
      array['threeMenu'] = '';
      // 遍历目录
      if(array.menu && array.menu.length > 0) {
        for(let j in array.menu) {
          if(array.menu[j].type == '0') {
            array['model'] = array.menu[j].name;
          }else if(array.menu[j].type == '1') {
            if(array['firstMenu'] == ''){
              array['firstMenu'] = array.menu[j].name;
            }else {
              array['firstMenu'] += ',' +  array.menu[j].name;
            }
          }else if(array.menu[j].type == '2') {
            if(array['secondMenu'] == ''){
              array['secondMenu'] = array.menu[j].name;
            }else {
              array['secondMenu'] += ',' + array.menu[j].name;
            }
          }else if(array.menu[j].type == '3') {
            if(array['threeMenu'] == ''){
              array['threeMenu'] = array.menu[j].name;
            }else {
              array['threeMenu'] += ',' +  array.menu[j].name;
            }
          }
        }
      }
      newTable.push(array);
    }
  } else {
    newTable = []
  }
  return newTable;
}

// 目录列表
function dealWith(modelList) {
    let menuList = [{
      name: '全部',
      id: 0,
      menu_id: 0
    }];
    if(modelList) {
        for(let i in modelList) {
            if(modelList[i].type == '0') {
                menuList.push(modelList[i]);
            }
        }
    }
    return {
        menuList: menuList,
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
  .questionContents {
    .bread {
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

      .question_box{
        padding: 0 40px;
        margin: 20px 0;
        /*目录选择*/
        .question_header{
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

        .question_content{
          .question_list:nth-child(2){
            border-left-color: #4dacff;
            .question_list_title{
              background: #4dacff;
            }
            .el-radio.is-checked{
              background: #4dacff;
            }
          }

          .question_list:nth-child(3){
            border-left-color: #26c6da;
            .question_list_title{
              background: #26c6da;
            }
            .el-radio.is-checked{
              background: #26c6da;
            }
          }

          .question_list{
            border-bottom: 1px solid #dedede;
            padding-bottom: 15px;
            margin-bottom: 20px;
            .question_list_box{
              text-align: left;
              border-left: 3px solid #15bafe;
              border-radius: 4px;
              padding-top: 10px;
            }
            .question_list_title{
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

      .question_table {
        /*头部*/
        .question_header{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 30px 25px;

          .question_left{
            display: flex;
            align-items: center;
            .question_list_num{
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

            .question_left_time{
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
                justify-content: space-around;
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

    }
  }
</style>
