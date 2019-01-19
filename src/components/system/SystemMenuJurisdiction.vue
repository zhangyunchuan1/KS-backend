<template>
  <div class="systemMenuJurisdiction">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
      <div class="trees">
        <div class="tree_left">
          <div class="left_content">
            <!-- <menuTrees
              :children="treeData.children"
              :depth="0"
              :label="treeData.name"
              :id="treeData.id"
              @ee="getMenu"
            ></menuTrees> -->
            <div v-for="(menu,index) in menu_list" :key="index">
                <menuTrees :child="menu.child" :depth="0" :label="menu.folder_name" :id="menu.folder_id" :type="menu.type" :name="menu.name" :pid="menu.pid" :folder_id="menu.folder_id" :fd_name="menu.folder_name" @ee="getMenu" @qq="rr()"></menuTrees>
            </div>
          </div>

        </div>
        <div class="tree_right">
          <div class="item_contain" :style="menuVisible?{display:'block'}:{display:'none'}">
            <div class="jurisdiction_content">
              <!-- <p>当前菜单下权限：</p> -->
              <el-checkbox class="all_check" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group class="check_group" v-model="checkedJurisdiction" @change="handleCheckedCitiesChange">
                <el-checkbox class="check_item" v-for="item in jurisdictionData" :label="item" :key="item.id" @change="handleChange(item.id)">
                  <span class="check_lab">{{item.label}}<span class="line"></span>{{item.name}}</span>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  const jurisdictions = [{
    id: 1,
    name: '基本信息',
    description: '电视剧的方式开始看',
    method: 'system/basic',
    type: 1
  },{
    id: 2,
    name: '删除',
    description: '电视剧的方式开始看',
    method: 'system/basic',
    type: 1
  },{
    id: 3,
    name: '修改',
    description: '电视剧的方式开始看',
    method: 'system/basic',
    type: 1
  },{
    id: 4,
    name: '添加备注',
    description: '电视剧的方式开始看',
    method: 'system/basic',
    type: 1
  },{
    id: 5,
    name: '驳回',
    description: '电视剧的方式开始看',
    method: 'system/basic',
    type: 1
  },{
    id: 6,
    name: '基本信息',
    description: '电视剧的方式开始看',
    method: 'system/basic',
    type: 1
  },{
    id: 7,
    name: '删除',
    description: '电视剧的方式开始看',
    method: 'system/basic',
    type: 1
  },{
    id: 8,
    name: '修改',
    description: '电视剧的方式开始看',
    method: 'system/basic',
    type: 1
  },{
    id: 9,
    name: '添加备注',
    description: '电视剧的方式开始看',
    method: 'system/basic',
    type: 1
  },{
    id: 10,
    name: '驳回',
    description: '电视剧的方式开始看',
    method: 'system/basic',
    type: 1
  }];
  export default {
    name: "SystemMenuJurisdiction",
    components: {
      BreadCrumb,
      menuTrees: {
        name: 'tree-menu',
        template: `
            <div class="tree-menu">
              <div class="label-wrapper">
                <div :style="indent" class="parent_menu">
                <div class="menu_label">
                  <i v-if="child" class="iconfont icon_left" :class="showChildren?'icon-jian-xianxingfangkuang':'icon-jia-xianxingfangkuang'" @click="toggleChildren"></i>
                  
                  <span @click="handleSelect(id,type,pid,folder_id)" :style="(slect)?'color:#15bafe':''">{{label}}</span>
                </div>
                </div>
              </div>
              <tree-menu v-if="showChildren" v-for="item in child" :child="item.child" 
                :label="item.name" :depth="depth + 1" :key="item.id" :id="item.id" :type="item.type" :pid="item.pid" @ee="xx" :folder_id="folder_id" v-on:qq="yy">
              </tree-menu>
            </div>
          `,
        props: ['child', 'label', 'depth','id','type','name','pid','folder_id'],
        data() {
          return {
            showChildren: false,
            menu_visible: false,
            menu_id: null,
            menu_type:null,
            menu_pid:null,
            menu_folderId:null,
            slect:false,
            JurList:[],  //选中的菜单下拥有的权限列表
          }
        },
        computed: {
          indent() {
            return {transform: `translate(${this.depth * 20}px)`}
          }
        },
        methods: {
          handleSelect(id,type,pid,folder_id,name){
            this.$store.dispatch('getMenuInfo',{})
            console.log(name)
              if(pid === undefined){

              }else{
                  console.log(id,type,pid,folder_id)
                  //请求该列表列表下拥有的权限，并在所有权限中打钩；
                  this.getSelectJurList(id);
                  setTimeout(()=>{
                      console.log(this.JurList)
                      
                      this.menu_visible = true;
                      this.$emit('ee',this.menu_type);
                      this.$store.dispatch('getMenuInfo',{id:id,menu_visible:this.menu_visible,type:type,source:1,pid:pid,folder_id:folder_id,JurList:this.JurList}).then(res=>{});   
                      this.$emit('qq', this.JurList);
                      console.log(this.$store.state.menu)
                  },300)
                  
              }
              
          },
          getMenulist(){
              this.HttpClient.post('/admin/menu/getList',{})
              .then(res=>{
                  console.log(res);
              })
          },
          toggleChildren() {
            this.showChildren = !this.showChildren;
          },
          //请求选中菜单的权限
          getSelectJurList(menu_id){
              this.HttpClient.post('/admin/menuPermission/getAll',{
                menu_id:menu_id
              })
              .then(res=>{
                  console.log(res);
                  if(res.data.code === 200){
                      this.JurList = res.data.data;    
                  }
                  // console.log(this.jurList)
              })
          },
          xx: function () {
            this.$emit('ee',{id:this.menu_id,menu_visible:this.menu_visible,type:this.menu_type});
          },
          yy:function(){ 
            this.$emit('qq',this.JurList); 
          }
        }
      }
    },
    data() {
      return {
        menu_list:[],
        show: false,
        typeTitle: '',
        index: 0,
        menuVisible: false,
        menu_id: null,
        breadData: [{
          id: 1,
          name: '系统管理',
          urls: '/index',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '菜单权限',
          urls: '/index/test',
          icon: 'icon-home'
        }],
        treeData: {
          id: 0,
          name: 'root',
          children: [{
            id: 1,
            name: '菜单1',
            children: [{
              id: 11,
              name: '菜单11'
            }, {
              id: 12,
              name: '菜单12'
            }]
          }, {
            id: 2,
            name: '菜单2',
            children: [{
              id: 21,
              name: '菜单21'
            }, {
              id: 22,
              name: '菜单22'
            }]
          }],
        },
        checkAll: false,
        checkedJurisdiction: [],
        jurisdictionData: [],
        isIndeterminate: true,
      }
    },
    mounted(){
      this.getMenulist();
      this.getAllJurList();
    },
    methods:{
      //获取所有的权限列表
      getAllJurList(){
          this.HttpClient.post('/admin/permission/index',{})
          .then(res=>{
              console.log(res.data.data);
              this.jurisdictionData = res.data.data;
          })
      },
      //请求菜单列表
      getMenulist(){
          this.HttpClient.post('/admin/menu/getList',{})
          .then(res=>{
              console.log(res);
              this.menu_list = res.data.data;
          })
      },
      getMenu: function (data) {
        setTimeout(()=>{
          let childrenData = this.$store.state.menu.menu;
          this.menuVisible = childrenData.menu_visible;
          this.menu_id = childrenData.id;
          this.checkedJurisdiction = childrenData.JurList;
          console.log(childrenData,this.menu_id,this.menuVisible)
        })
      },
      //单选及时添加
      handleChange(id){
          console.log(id)
          //及时添加，value数组最后一项发送给后端。
          this.HttpClient.post('/admin/menuPermission/create',{
            menu_id:this.$store.state.menu.menu.id,
            permission_id:id
          })
          .then(res=>{
            console.log(res)
              if(res.data.code === 200){
                  this.$message.success(res.data.msg)
              }else if(res.data.code === 1188){ //此状态为已分配，再次点击改为取消分配。
                  this.HttpClient.post('/admin/menuPermission/destroy',{
                      menu_id:this.$store.state.menu.menu.id,
                      permission_id:id
                  })
                  .then(res=>{ 
                      console.log(res)
                      if(res.data.code === 200){
                        this.$message.success(res.data.msg)
                      }else{
                        this.$message.error(res.data.msg)
                      }
                  })
                }
            })
      },
      //全选
      handleCheckAllChange(val) {
        console.log(val)
        this.checkedJurisdiction = val ?  this.jurisdictionData: [];
        console.log(this.checkedJurisdiction)
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) { 
            console.log(value)
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.jurisdictionData.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.jurisdictionData.length;  
      },
      rr(data){
        console.log(this.$store.state.menu.menu.JurList)
        this.checkedJurisdiction = this.$store.state.menu.menu.JurList;
        this.checkedJurisdiction = this.oldList;
        console.log(this.checkedJurisdiction)
      }
    }
  }
</script>

<style scoped lang="less">
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
  }

  .trees {
    display: flex;
    .tree_left{
      width: 50%;
      .left_content{
        border: 1px solid #f2f2f2;
        margin: 20px 10px;
        padding: 10px;
        min-height: 395px;
      }
    }
    .tree_right{
      width: 50%;
      .item_contain{
        border: 1px solid #f2f2f2;
        padding: 20px;
        max-width: 310px;
        margin-top: 20px;
        .items{
          display: flex;
          font-size: 13px;
          height: 28px;
          line-height: 28px;
          margin-bottom: 20px;
          .item_lb{
            width: 80px;
            text-align: left;
          }
          .item_input{
            width: 200px;
          }
        }
      }
    }
  }

  .tree-menu {
    .label-wrapper {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
      .has-children {
        cursor: pointer;
      }
    }
  }
  .jurisdiction_content{
    max-height: 400px;
    overflow-y: auto;
    .all_check{
      width: 100%;
      text-align: -webkit-left;
    }
    .check_group{
      .check_item{
        display: -webkit-box;
        margin-bottom: 15px;
        .check_lab{
          background: #409EFF;
          color: white;
          padding: 5px 10px;
          border-radius: 2px;
          .line{
            height: 10px;
            border-left: 1px solid #ffffff;
            margin: 0 10px;
          }
        }
      }
    }
  }
</style>
<style lang="less">
  .systemMenuJurisdiction{
    .parent_menu{
      display: flex;
    }
    .menu_label{
      cursor: pointer;
      margin-right: 10px;
    }
    .icon_add{
      color: #15bafe;
      position: relative;
      top: 1px;
    }
    .icon_delete{
      color: #15bafe;
      position: relative;
      top: 1px;
      margin-left: 10px;
    }
    .icon_left{
      color: #009afe;
    }
    .el-checkbox+.el-checkbox{
      margin-left: 0 !important;
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
          width: 200px;
          margin-left: 20px;
        }
        .el_input_text_area{
          width: 200px;
          margin-left: 20px;
        }
      }
    }
  }
</style>
