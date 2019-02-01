<template>
  <div class="systemMenuJurisdiction">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <div class="tabs">
        <el-table
            :data="tableData"
            border
            :stripe="true"
            :header-row-style="{height:'40px'}"
            :header-cell-style="{padding:0,background:'#15bafe',color:'white'}"
            :row-style="{height:'40px'}"
            :cell-style="{padding:0}"
            style="width: 100%">
            <el-table-column
              prop="title"
              label="标题"
              width="100"
              align="center"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="一级菜单"
              prop="firstMenuName"
              align="center"
              min-width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="description"
              label="路径"
              align="center"
              min-width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="description"
              label="一级菜单图标"
              align="center"
              min-width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="二级菜单"
              prop="secondMenuName"
              align="center"
              min-width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="description"
              label="路径"
              align="center"
              min-width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="description"
              label="二级菜单图标"
              align="center"
              min-width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="300"
              align="center"
              fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" @click="roleJur(scope.row.id)">角色权限</el-button>
                <el-button type="primary" plain size="mini" @click="toggleUse(scope.row.status,scope.row.id)">{{scope.row.status===1?'禁用':'启用'}}</el-button>
                <el-button type="primary" plain size="mini" @click="updateRole(scope.row)">角色编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
            <el-pagination
                    v-if="pageNum"
                    layout="prev, pager, next"
                    :page-count="pageNum"
                    @current-change="currentChange"
            ></el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  
  export default {
    name: "SystemMenuJurisdiction",
    components: {
      BreadCrumb
    },
    data() {
      return {
        breadData: [{
          id: 1,
          name: '内部管理',
          urls: '/index',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '菜单列表',
          urls: '/index/test',
          icon: 'icon-home'
        }],
        tableData:[],
        titles:[],  //板块列表
        firstMenuList:[],  //一级菜单列表
        secondMenuList:[],  //二级菜单列表
      }
    },
    mounted(){
      this.getMenuList();
    },
    methods:{
        // 获取菜单列表
        getMenuList(){
          this.HttpClient.post('/admin/menu/getListWithDel',{})
          .then((res) => {
            console.log(res);
            for(let i in res.data.data){
              this.titles.push({
                title:res.data.data[i].folder_name
              })
              // if(res.data.data[i].child){
              //   for(let j in res.data.data[i].child){
              //     this.tableData[i]['firstMenuName'] = res.data.data[i].child[j].name;
              //     if(res.data.data[i].child[j].child){
              //       for(let k in res.data.data[i].child[j].child){
              //         this.tableData[i]['secondMenuName'] = res.data.data[i].child[j].child[k].name;
              //       }
              //     }
              //   }
              // }
            }
            console.log(this.titles);
            
          })
        },
    }
  }
</script>
<style lang="less">
.systemMenuJurisdiction{
    .bread {
    margin: 10px;
  }
  .menu_head{
    text-align: -webkit-left;
    margin-bottom: 10px;
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
    .tabs{
      margin: 20px 10px;
    }
  }
}
</style>
