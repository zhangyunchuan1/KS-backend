<template>
  <div class="externalMenu">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <div class="header">
        <p class="title">菜单创建</p>
        <el-button @click="addVisible = true" type="primary" size="mini" icon="el-icon-circle-plus-outline">添加菜单</el-button>
      </div>
      <div class="contain">
        <p class="contain_title">商家登录活动</p>
        <div class="contain_content">
          <div class="contain_left">
            <p>查看修改简介</p>
            <p @click="selectVisible = true">添加权限</p>
          </div>
          <div class="contain_right">
            <div class="right_item" v-for="(item,index) in 20" :key="index">
              <p class="r_p1">停止报名</p>
              <p class="r_p2">Product/edit</p>
              <p class="r_p3">-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="addVisible" width="400px">
      <div slot="title" class="dialog_head_title">
        <i class="iconfont icon-edit-square examine_icon"></i>
        <span>添加菜单</span>
      </div>
      <div class="jurisdiction_content">
        <div class="jurisdiction_content_item">
          <label class="el_lbl">菜单名称:</label>
          <el-input class="el_input" size="mini"></el-input>
        </div>
        <div class="jurisdiction_content_item">
          <label class="el_lbl">菜单介绍:</label>
          <el-input placeholder="30字内介绍" class="el_input_text_area" type="textarea" :autosize="{ minRows: 3, maxRows: 3}"></el-input>
        </div>
      </div>
      <div class="user_footer" slot="footer">
        <el-row class="row_e">
          <el-button class="btn_deletes" size="small" @click="menuVisible = false">取消</el-button>
          <el-button type="primary" size="small"  class="btn_delete">保存</el-button>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="selectVisible" width="800px">
      <div slot="title" class="dialog_head_title">
        <i class="iconfont icon-edit-square examine_icon"></i>
        <span>选择权限</span>
      </div>
      <div class="select_content">
        <el-checkbox-group class="check_group" v-model="checkedJurisdiction" @change="handleCheckedChange">
          <el-checkbox v-for="item in jurisdictions" :label="item.id" :key="item.id">
            <div class="e_check">
              <p class="r_p1">{{item.name}}</p>
              <p class="r_p2">{{item.urls}}</p>
            </div>
            </el-checkbox>
        </el-checkbox-group>
      </div>
      <el-pagination
        class="pagination"
        background
        layout="pager"
        :total="100">
      </el-pagination>
      <!--<div class="user_footer" slot="footer">
        <el-row class="row_e">
          <el-button class="btn_deletes" size="small" @click="selectVisible = false">取消</el-button>
          <el-button type="primary" size="small"  class="btn_delete">保存</el-button>
        </el-row>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
  const c = [];
  for (let k=0;k<9;k++){
    c.push({
      id: k,
      name: '停止报名',
      urls: 'Product/edit'
    })
  }
  console.log(c);
import BreadCrumb from '@/components/public/BreadCrumb';
export default {
  name: "ExternalMenu",
  components: {
    BreadCrumb
  },
  data() {
    return {
      addVisible: false,
      selectVisible: false,
      breadData: [{
        id: 1,
        name: '外部管理',
        urls: '/index',
        icon: 'icon-home'
      }, {
        id: 2,
        name: '权限管理',
        urls: '/index/test',
        icon: 'icon-home'
      }],
      jurisdictions: c,
      checkedJurisdiction:[0,1]
    }
  },
  methods: {
    handleCheckedChange: function (value) {
      console.log(value)
    },
    //获取菜单列表
    getMenuList(){
        this.HttpClient.post('/admin/menu/getList',{menu_type:0})
            .then(res=>{
                console.log(res);
            })
    }
  },
  created(){
      this.getMenuList()
  }
}
</script>

<style scoped lang="less">
  .bread {
    margin: 10px;
  }
  .content::-webkit-scrollbar {display:none}
  .content {
    background: white;
    margin-left: 10px;
    margin-right: 10px;
    height: calc(100vh - 87px);
    width: calc(100vw - 221px);
    border-radius: 2px;
    overflow-y: auto;
  }
  .header{
    display: flex;
    height: 28px;
    line-height: 28px;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
  }
  .title{
    text-align: left;
    font-size: 14px;
    flex: 1;
  }
  .dialog_head_title{
    text-align: start;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
    .examine_icon{
      color: #15bafe;
    }
  }
  .jurisdiction_content{
    .jurisdiction_content_item{
      display: flex;
      line-height: 28px;
      margin-left: 20px;
      margin-bottom: 10px;
      .el_lbl{
        width: 60px;
      }
      .el_input{
        width: 240px;
        margin-left: 20px;
      }
      .el_input_text_area{
        width: 240px;
        margin-left: 20px;
      }
    }
  }
  .row_e{
    text-align: center;
    .btn_deletes{
      padding: 5px 15px;
      margin-right: 10px;
    }
    .btn_delete{
      padding: 5px 15px;
    }
  }
  .contain{
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    .contain_title{
      text-align: center;
      background: #15bafe;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: white;
    }
    .contain_content{
      border-left: 1px solid #f2f2f2;
      border-right: 1px solid #f2f2f2;
      border-bottom: 1px solid #f2f2f2;
      display: flex;
      height: 400px;
      overflow-y: auto;
      align-items: flex-start;
      .contain_left{
        min-width: 120px;
        font-size: 14px;
        text-align: center;
        /*height: -webkit-fill-available;*/
        color: #7d7d7d;
        border-right: 1px solid #f2f2f2;
        p{
          border-bottom: 1px solid #f2f2f2;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
        }
        p:hover{
          color: #15bafe;
        }
      }
      .contain_right{
        display: flex;
        flex-wrap: wrap;
        .right_item{
          display: flex;
          color: white;
          height: 28px;
          line-height: 28px;
          font-size: 12px;
          margin: 20px 0 0 20px;
          .r_p1{
            background: #15bafe;
            border-right: 1px solid white;
            padding: 0 10px;
          }
          .r_p2{
            background: #15bafe;
            padding: 0 10px;
          }
          .r_p3{
            background: #ff5858;
            padding: 0 10px;
          }
        }
      }
    }
  }
  .select_content{
    height: 200px;
    background: #FAFAFA;
    display: flex;
    flex-wrap: wrap;
    .check_group{
      display: flex;
      flex-wrap: wrap;
    }
    .e_check{
      display: flex;
      color: white;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      margin: 20px 0 0 0;
      .r_p1{
        background: #15bafe;
        border-right: 1px solid white;
        padding: 0 10px;
      }
      .r_p2{
        background: #15bafe;
        padding: 0 10px;
      }
      .r_p3{
        background: #ff5858;
        padding: 0 10px;
      }
    }
  }
  .pagination{
    padding: 10px 0;
  }
</style>
<style lang="less">
  .externalMenu{
    .el-dialog__body{
      padding: 0 20px !important;
    }
    .select_content{
      .el-checkbox{
        margin-left: 30px !important;
      }
    }
  }
</style>
