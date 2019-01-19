<template>
  <div class="encyclopediaDistribution">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

    <div class="encyclopedia_main">
      <div class="encyclopedia_title">
        <div class="title">专业目录分配</div>
      </div>

      <div class="encyclopedia_header">
        <div class="encyclopedia_select">
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

        <div class="encyclopedia_search">
          <div>
            <el-input placeholder="标题搜索" v-model="searchObj.topicSearch" class="input-with-select">
              <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
      </div>

      <div class="encyclopedia_content">

        <el-table
          :data="tableData"
          :border="true">
          <el-table-column
            label="ID"
            align="center"
            show-overflow-tooltip
            width="80"
            prop="id"
            sortable>
          </el-table-column>
          <el-table-column
            label="百科标题"
            align="center"
            width="280"
            show-overflow-tooltip
            prop='title'>
          </el-table-column>

          <el-table-column
            label="所属板块"
            align="center"
            show-overflow-tooltip
            :filters="plateList"
            :filter-method="filterSecondary"
            width="140"
            prop="folder_name">
          </el-table-column>

          <el-table-column
            label="子类板块"
            align="center"
            :filters="childrenPlateList"
            :filter-method="filterSecondary"
            prop="menu_1_name"
            show-overflow-tooltip
            width="140">
          </el-table-column>

          <el-table-column
            label="是否分配"
            align="center"
            show-overflow-tooltip
            :filters="[{text: '已分配', value: '已分配'}, {text: '未分配', value: '未分配'}]"
            :filter-method="filterAssign"
            prop='menu.length'
            width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.menu.length > 0">已分配</span>
              <span v-if="scope.row.menu.length == 0">未分配</span>
            </template>
          </el-table-column>

          <el-table-column
            label="通过时间"
            align="center"
            width="170"
            show-overflow-tooltip
            prop="created_at"
            sortable>
          </el-table-column>

          <el-table-column
            label="一级目录"
            align="center"
            show-overflow-tooltip
            width="150"
            prop="firstMenu">
          </el-table-column>

          <el-table-column
            label="二级目录"
            align="center"
            show-overflow-tooltip
            width="150"
            prop="secondMenu">
          </el-table-column>

          <el-table-column
            label="三级目录"
            align="center"
            show-overflow-tooltip
            width="150"
            prop="thirdMenu">
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            min-width="200"
            class-name="encyclopedia_scope">
            <template slot-scope="scope">
              <div class="encyclopedia_btm">
                <el-button size="medium" type="text" @click="addModal(scope.row)">添加目录</el-button>
                <el-button size="medium" type="text" @click="viewModal(scope.row)">预览</el-button>
                <el-button size="medium" type="text" @click="allModal(scope.row)">所有目录</el-button>
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
            <el-radio-group v-model="sectorSelection">
              <el-radio @change="changeModel('menu', menu)" v-for="(menu,index) in menuList" :key="index" :label="menu">{{menu.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="box_list">
          <div class="box_list_title">一级目录：</div>
          <div class="box_list_main">
            <el-radio-group v-model="firstLevel">
              <el-radio @change="changeModel('firstMenu', firstMenu)"
                    v-for="(firstMenu,index) in firstMenuList" :key="index"
                    :label="firstMenu">{{firstMenu.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="box_list">
          <div class="box_list_title">二级目录：</div>
          <div class="box_list_main">
            <el-radio-group v-model="secondary">
              <el-radio @change="changeModel('secondMenu', secondMenu)"
                    v-for="(secondMenu,index) in secondMenuList" :key="index"
                    :label="secondMenu">{{secondMenu.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="box_list">
          <div class="box_list_title">三级目录：</div>
          <div class="box_list_main">
            <el-radio-group v-model="thirdLevel">
              <el-radio @change="changeModel('thirdMenu', thirdMenu)"
              v-for="(thirdMenu,index) in thirdMenuList" :key="index"
              :label="thirdMenu">{{thirdMenu.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDirectoryDialog = false">取 消</el-button>
        <el-button type="primary" @click="add">添 加</el-button>
      </span>
    </el-dialog>

    <!--所有目录弹窗-->
    <el-dialog
      width="800px"
      custom-class="allDirectoryDialog"
      :visible.sync="allDirectoryDialog">
      <span slot="title" class="allDirectoryDialog_title"><i class="iconfont icon-jia-xianxingfangkuang"></i>所有目录</span>
      <div class="allDirectoryDialog_box">
        <div class="box_list" v-for="item in allMenuList" :key="item">
          <div v-for="(childrenItem,index) in item" :key="index">
            <div class="box_list_title">{{childrenItem.name}}</div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allDirectoryDialog = false">关闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  import Tools from "@/utils/tools.js";
  let tools = new Tools();

  export default {
    name: "EncyclopediaDistribution",
    components: {
      BreadCrumb,
    },
    data(){
      return{
        // 面包屑
        breadData: [{
          id: 1,
          name: '百科',
          urls: '/index/encyclopedia/encyclopedia',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '专业目录分配',
          urls: '/index/encyclopedia/encyclopediaDistribution',
          icon: 'icon-home'
        }],

        // 表格
        tableData: [],
        total: 0, // 总数据条数
        pageSize: 25, // 每页显示条数
        currentPage: 1, // 当前页
        searchObj: {}, // 搜索对象

        addDirectoryDialog: false, // 添加目录弹窗
        sectorSelection:1,  // 学科板块

        allDirectoryDialog: false, // 所有目录弹窗
        carSelect:1,  // 汽车
        engineeringSelect:1,  // 电器工程
        controlSelect:1,  // 控制工程
        modifyObj: {}, // 操作对象
        firstLevel:null, // 一级目录
        secondary:null, // 二级目录
        thirdLevel:null, // 三级目录
        menuList: [], // 模块列表
        firstMenuList: [], // 一级目录
        secondMenuList: [], // 二级目录
        thirdMenuList: [], // 三级目录
        addObj: {
          menu_id: '', // 目录ID
          relation_id: '', // 对应行ID
          type: 1, // 专业目录对应1
          relation_type: 8, // 百科对应8
        }, // 添加目录时需要的对象
        plateList: [], // 所属板块过滤
        childrenPlateList: [], // 子版块过滤
        allMenuList: [], // 点击所有目录时显示的数据
      }
    },
    created() {
      this.getTableList(null);
    },
    methods:{
      // 添加
      addModal(modifyObj) {
        this.addDirectoryDialog = true;
        this.modifyObj = modifyObj;
        this.getModelList();
      },
      // 预览
      viewModal() {

      },
      // 所有目录
      allModal(modifyObj) {
        this.allDirectoryDialog = true;
        this.modifyObj = modifyObj;
        this.allMenuList = this.modifyObj.menu;
      },
      search() {
        this.getTableList(this.searchObj);
      },
      async add() {
        this.addObj.relation_id = this.modifyObj.encyclopedia_id;
        let res = await this.HttpClient.post('/admin/menuRelationship/create', this.addObj);
        tools.getApiMessage(res);
        if(res.data.code == '200') this.addDirectoryDialog = false;
        setTimeout(() => {
            this.search();
        }, 500);
      },
      async currentChange(page) {
        this.currentPage = page;
        this.search();
      },
      async changeModel(value, obj) {
        if(value === 'menu') {
          await this.getFirstMenuList();
        }else if(value === 'firstMenu') {
          await this.getSecondMenuList();
        }else if(value === 'secondMenu') {
          await this.getThirdMenuList();
        }
        this.addObj.menu_id = obj.menu_id;
      },
      async getTableList(param) {
        let params = {
          page: this.currentPage
        }
        if(param) {
          params['title'] = param.topicSearch;
          params['start_time'] = param.startTime;
          params['end_time'] = param.endTime;
        }
        let res = await this.HttpClient.post('/admin/encyclopedias/getListWithMajorMenu', params);
        this.total = res.data.data.total;
        let result = dealWithTable(res.data.data.data);
        this.tableData = result.table;
        this.plateList = result.plateList;
        this.childrenPlateList = result.childrenPlateList;
      },
      filterSecondary(value, row, column) {
        const property = column['property'];
        return row[property] == value;
      },
      filterAssign(value, row, column) {
        if(value == '未分配') {
          return row.menu.length < 1;
        }else if(value == '已分配') {
          return row.menu.length > 0;
        }
      },
      async getModelList() {
        let res = await this.HttpClient.post('/admin/menu/getList', {
            menu_type: 3
        });
        let result = dealWith(res.data.data);
        this.menuList = result.menuList;
        if(this.menuList[0]) {
            this.muneId = this.menuList[0].menu_id;
            this.pid = this.muneId;
        }
      },
      // 获取一级目录
      async getFirstMenuList() {
        let res = await this.HttpClient.post('/admin/menu/getOneChild', {menu_id: this.sectorSelection.menu_id, menu_type: 3});
        this.firstMenuList = res.data.data.child;
        // 二三级目录设为空
        this.secondMenuList = [];
        this.thirdMenuList = [];
        // 一二三级目录选中为空
        this.firstLevel = null;
        this.secondary = null;
        this.thirdLevel = null;
      },
      // // 获取二级目录
      async getSecondMenuList() {
          let res = await this.HttpClient.post('/admin/menu/getOneChild', {menu_id: this.firstLevel.menu_id, menu_type: 3});
          this.secondMenuList = res.data.data.child;
          // 三级目录设为空
          this.thirdMenuList = [];
          // 二三级目录选中为空
          this.secondary = null;
          this.thirdLevel = null;
      },
      // // 获取三级目录
      async getThirdMenuList() {
          let res = await this.HttpClient.post('/admin/menu/getOneChild', {menu_id: this.secondary.menu_id, menu_type: 3});
          this.thirdMenuList = res.data.data.child;
      }
    }
  }

// 列表数据处理
function dealWithTable(table) {
  // 所属板块列表
  let plateList = [];
  // 子版块列表
  let childrenPlateList = [];
  if(table && table.length > 0) {
    for(let j in table) {
      let menuList = table[j].menu;

      // 一二三级目录显示数据的处理
      if(menuList && menuList.length > 0) {
        let newList = menuList[menuList.length - 1];
        if(newList && newList.length > 0) {
          for(let i in newList) {
            if(newList[i].type == 1) {
              table[j]['firstMenu'] = newList[i].name;
            }else if(newList[i].type == 2) {
              table[j]['secondMenu'] = newList[i].name;
            }else if(newList[i].type == 3) {
              table[j]['thirdMenu'] = newList[i].name;
            }
          }
        }
      }

      let category = table[j].category;
      if(category) {
        if(category.folder_name) {
          table[j]['folder_name'] = category.folder_name;
          plateList.push(category.folder_name);
        }
        if(category.menu_1_name) {
          table[j]['menu_1_name'] = category.menu_1_name;
          childrenPlateList.push(category.menu_1_name);
        }
      }
    }
  } 

  plateList = [...new Set(plateList)];
  childrenPlateList = [...new Set(childrenPlateList)];
  for(let i in plateList) {
    plateList[i] = {
      text: plateList[i],
      value: plateList[i]
    }
  }
  for(let i in childrenPlateList) {
    childrenPlateList[i] = {
      text: childrenPlateList[i],
      value: childrenPlateList[i]
    }
  }
  return {
    table: table,
    plateList: plateList,
    childrenPlateList: childrenPlateList
  };
}

// 目录列表
function dealWith(modelList) {
    let menuList = [];
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
  .encyclopediaDistribution{
    .bread{
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

      /*头部*/
      .encyclopedia_header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30px 25px;

        .encyclopedia_select{
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
        .el-table{
          thead{
            color: #fff;
            th,tr{
              background-color: #15bafe;
            }
          }
        }

        /*操作按钮*/
        .encyclopedia_scope{
          padding: 0;
          .cell{
            line-height: unset;
            .encyclopedia_btm{
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
          .box_list_title{
            width: 90px;
            text-align: left;
            // color: #fff;
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
              min-width: 120px;
              padding: 0 6px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 5px;
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
            min-width: 120px;
            background-color: #15bafe;
            border-radius: 6px;
            line-height: 45px;
            vertical-align: middle;
            text-align: center;
            margin-left: 10px;
            padding: 0 6px;
            color: #fff;
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
              width: 120px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 5px;
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
