<template>
  <div class="productDistribution">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

    <div class="product_main">
      <div class="product_title">
        <div class="title">专业目录分配</div>
      </div>

      <div class="product_header">
        <div class="product_select">
          <div class="date_item">
            <p class="date_label">开始</p>
            <el-date-picker
              v-model="startTime"
              class="date_picker_1"
              type="date"
              size="mini"
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
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>

        <div class="product_search">
          <div>
            <el-input placeholder="标题搜索" v-model="topicSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
      </div>

      <div class="product_content">

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
            label="商品名称"
            align="center"
            width="320">
            <template slot-scope="scope">
              <p>{{ scope.row.productTitle}}</p>
            </template>
          </el-table-column>

          <el-table-column
            label="产品类型"
            align="center"
            :filters="[{text: '汽车', value: '汽车'}, {text: '摩托车', value: '摩托车'}]"
            :filter-method="filterSecondary"
            prop="plate"
            width="140">
          </el-table-column>

          <el-table-column
            label="是否分配"
            align="center"
            :filters="[{text: '已分配', value: '已分配'}, {text: '未分配', value: '未分配'}]"
            :filter-method="filterSecondary"
            prop='distribution'
            width="140">
          </el-table-column>

          <el-table-column
            label="通过时间"
            align="center"
            width="140"
            prop="time"
            sortable>
          </el-table-column>

          <el-table-column
            label="一级目录"
            align="center"
            width="140"
            prop="firstLevel">
          </el-table-column>

          <el-table-column
            label="二级目录"
            align="center"
            width="140"
            prop="doubleLevel">
          </el-table-column>

          <el-table-column
            label="三级目录"
            align="center"
            width="140"
            prop="thirdLevel">
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            class-name="product_scope">
            <template slot-scope="scope">
              <div class="product_btm">
                <div>添加目录</div>
                <div>预览</div>
                <div>所有目录</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
              <el-radio :label="1">汽车</el-radio>
              <el-radio :label="2">无人机</el-radio>
              <el-radio :label="3">控制工程</el-radio>
              <el-radio :label="4">摩托车</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="box_list">
          <div class="box_list_title">一级目录：</div>
          <div class="box_list_main">
            <el-radio-group v-model="firstLevel">
              <el-radio :label="1">机械部件</el-radio>
              <el-radio :label="2">连接和粘合技术</el-radio>
              <el-radio :label="3">车辆物理学</el-radio>
              <el-radio :label="4">内燃机</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="box_list">
          <div class="box_list_title">二级目录：</div>
          <div class="box_list_main">
            <el-radio-group v-model="secondary">
              <el-radio :label="1">润滑油</el-radio>
              <el-radio :label="2">燃油</el-radio>
              <el-radio :label="3">刹车油</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="box_list">
          <div class="box_list_title">三级目录：</div>
          <div class="box_list_main">
            <el-radio-group v-model="thirdLevel">
              <el-radio :label="1">发动机油</el-radio>
              <el-radio :label="2">变速箱油</el-radio>
              <el-radio :label="3">润滑油</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDirectoryDialog = false">取 消</el-button>
        <el-button type="primary">添 加</el-button>
      </span>
    </el-dialog>

    <!--所有目录弹窗-->
    <el-dialog
      width="800px"
      custom-class="allDirectoryDialog"
      :visible.sync="allDirectoryDialog">
      <span slot="title" class="allDirectoryDialog_title"><i class="iconfont icon-jia-xianxingfangkuang"></i>所有目录</span>
      <div class="allDirectoryDialog_box">
        <div class="box_list">
          <div class="box_list_title">汽车：</div>
          <div class="box_list_main">
            <el-radio-group v-model="carSelect">
              <el-radio :label="1">液体</el-radio>
              <el-radio :label="2">润滑油</el-radio>
              <el-radio :label="3">发动机油</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="box_list">
          <div class="box_list_title">电气工程：</div>
          <div class="box_list_main">
            <el-radio-group v-model="engineeringSelect">
              <el-radio :label="1">模电</el-radio>
              <el-radio :label="2">正弦</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="box_list">
          <div class="box_list_title">控制工程：</div>
          <div class="box_list_main">
            <el-radio-group v-model="controlSelect">
              <el-radio :label="1">反馈系统</el-radio>
              <el-radio :label="2">Unit Feedback</el-radio>
            </el-radio-group>
          </div>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allDirectoryDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';

  export default {
    name: "productDistribution",
    components: {
      BreadCrumb,
    },
    data(){
      return{
        // 面包屑
        breadData: [{
          id: 1,
          name: '商城',
          urls: '/index/mall/mall/Mall',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '商城商品',
          urls: '/index/mallProduct/MallProduct',
          icon: 'icon-home'
        }, {
          id: 3,
          name: '专业目录分配',
          urls: '/index/mallProduct/ProductDistribution',
          icon: 'icon-home'
        }],

        startTime:'',  //开始时间
        endTime:'',  //结束时间
        topicSearch:'', // 题目搜索

        // 表格
        tableData: [{
          id: '1',
          productTitle: 'DJI Mavic 2',
          plate:'汽车',
          distribution:'已分配',
          time:'2018.11.28',
          firstLevel:'液体',
          doubleLevel:'润滑油',
          thirdLevel:'有机润滑油',
        }, {
          id: '2',
          productTitle: '如何给汽车加油',
          plate:'汽车',
          distribution:'已分配',
          time:'2018.11.28',
          firstLevel:'液体',
          doubleLevel:'润滑油',
          thirdLevel:'有机润滑油',
        }],

        addDirectoryDialog: false, // 添加目录弹窗
        subject:1,  // 学科板块
        firstLevel:1,  // 一级目录
        secondary:1,  // 二级目录
        thirdLevel:1,  // 三级目录

        allDirectoryDialog: false, // 所有目录弹窗
        carSelect:1,  // 汽车
        engineeringSelect:1,  // 电器工程
        controlSelect:1,  // 控制工程
      }
    },

    methods:{
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
  .productDistribution{
    .bread{
      margin: 10px;
    }
    .product_main::-webkit-scrollbar {display:none}
    .product_main {
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;

      .product_title {
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
      .product_header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30px 25px;

        .product_select{
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
        .product_search{
          display: flex;
          align-items: center;
          >div{
            margin-left: 30px;
          }
        }
      }

      /*表格*/
      .product_content{
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
        .product_scope{
          padding: 0;
          .cell{
            line-height: unset;
            .product_btm{
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
