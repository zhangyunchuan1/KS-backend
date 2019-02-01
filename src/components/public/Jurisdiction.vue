<template>
    <div class="menus">
      <div class="menu_left">
        <div class="left_content">
          <p class="left_title">现有菜单</p>
          <div v-for="(menu,index) in menu_list" :key="index">
              <menuTrees class="menu_trees" :child="menu.child" :depth="0" :name="menu.name" :id="menu.id" @ee="getMenu" :label="menu.folder_name" @qq="rr()" :addMenu="addMenu" ref="mychild"></menuTrees>
          </div> 
        </div>
      </div>
      <div class="menu_right">
        <p class="right_title">{{menu_name}}</p>
        <div class="item_contain" :style="menuVisible?{display:'block'}:{display:'none'}">
          <div class="jurisdiction_content">
            <!-- <el-checkbox class="all_check" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
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
</template>

<script>
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
  // (id === undefined)?false:true||   //添加权限判断105行
export default {
  name: "Jurisdiction",
  props:['addMenu'],
  components: {
    menuTrees: {
      name: 'tree-menu',
      template: `
            <div class="tree-menu">
              <div class="label-wrapper">
                <div :style="indent" class="parent_menu" style="display:flex;align-items:center;">
                <div class="menu_label">
                  <i @click="toggleChildren(id,label)" v-if="child" class="iconfont icon_left" :class="showChildren?'icon-jian-xianxingfangkuang':'icon-jia-xianxingfangkuang'"></i>
                  <span @click="handleSelect(id,label,child)" :style="depth===0?{background:'#1A67AB'}:depth===1?{background:'#1E86E5'}:depth===2?{background:'#4DACFE'}:{background:'#26C0D5'}" class="lbl_menu">{{ label }}</span>
                </div>
                  <i @click="addCurrentJur" class="iconfont icon-plus-square-fill icon_add" v-if="(child === undefined)?true:false"></i>
                </div>
              </div>
              <tree-menu
                v-if="showChildren"
                v-for="item in child"
                :child="item.child"
                :label="item.name"
                :depth="depth + 1"
                :key="item.id"
                :id="item.id"
                @ee="xx"
                v-on:qq="yy"
                :addMenu="addMenu"
                ref="mychild"
              >
              </tree-menu>
            </div>
          `,
      props: ['child', 'label', 'depth','id', 'addMenu'],
      data() {
        return {
          showChildren: false,
          menu_visible: false,
          menu_id: null,
          tab_index:null,
          menu_name: '',
          existingAuthority:null, //当前所选择的菜单下拥有的权限（还未添加当前权限）
          select_menuId:null,//当前选择的菜单id
          select_menuName:null,//当前选中菜单名称
        }
      },
      computed: {
        indent() {
          return {transform: `translate(${this.depth * 20}px)`}
        }
      },
      methods: {
        //添加当前权限
        addCurrentJur(){
          console.log(this.addMenu)
          console.log(this.existingAuthority)
          var id = this.addMenu.id;
          var ids = [];
          for(let i=0;i<this.existingAuthority.length;i++){
            ids.push(this.existingAuthority[i].id)
          }
          console.log(ids)
          if(ids.indexOf(id) != -1){  //判断当前菜单是否拥有权限。
            this.$message.error('当前菜单有此条权限，请勿重复添加')
          }else{
            this.HttpClient.post('/admin/menuPermission/create',{
                menu_id:this.select_menuId,
                permission_id:id
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 200){
                    this.$message.success('权限添加成功');
                    setTimeout(() => {
                      this.handleSelect(this.select_menuId,this.select_menuName);
                    }, 500);
                    
                }else{
                    this.$message.error(res.data.msg);
                }
            })
          }
        },
        // ffff(){
        //   console.log('我很聪明')
        // },
        //选中的菜单拥有的权限
        handleSelect(id,label,child){ //选中菜单，获取该菜单下的权限
          if(child === undefined){  //判断点击的菜单下是否有子菜单，若没有的话，选择该菜单，有的话请选择下一级菜单。
              console.log(id,label)
              this.select_menuName = label;//存储当前选中菜单的名称，以免添加成功后，重新赋值列表名称为undefined
              this.select_menuId = id;
              this.HttpClient.post('/admin/menuPermission/getAll',{
                menu_id:id
              })
              .then(res=>{        
                  console.log(res);
                  this.menu_name = label;
                  console.log(this.menu_name)
                  this.existingAuthority = res.data.data;
                  this.$store.dispatch('getSelectMenuInfo',{old_jur:this.existingAuthority,menu_name:this.select_menuName,id:id});  //将选中菜单权限、此菜单名、及菜单id 存入VUEX——select_menu
                  this.$emit('qq', this.existingAuthority);  //调取父组件函数RR，将选中菜单权限赋值给弹框右边列表
              })
          }else{
              // console.log('还有子菜单')
          }
          
        },
        toggleChildren(id,label) {
          this.showChildren = !this.showChildren;
          this.menu_visible = true;
          this.menu_id = id;
          this.tab_index = id;
          this.$emit('ee',{id:this.menu_id,menu_visible:this.menu_visible,menu_name:label});
          this.$store.dispatch('getMenuInfo',{id:this.menu_id,menu_visible:this.menu_visible}).then(res=>{
            /*console.log(333,this.$store.state.menu.menu)*/
          });
        },
        openMenuModal: function (id) {
          /*console.log(id)*/
          this.menu_visible = true;
          this.menu_id = id;
          this.tab_index = id;
          this.$emit('ee',{id:this.menu_id,menu_visible:this.menu_visible});
          this.$store.dispatch('getMenuInfo',{id:this.menu_id,menu_visible:this.menu_visible}).then(res=>{
            console.log(333,this.$store.state.menu.menu)
          });

          /*console.log(111,this.menu_visible,this.menu_id )*/
        },
        deleteMenu: function (id) {
          console.log(id)
        },
        editMenu: function (id) {
          console.log(id)
        },
        xx: function () {
          /*console.log(111,this.menu_id,this.menu_visible)*/
          this.$emit('ee',{id:this.menu_id,menu_visible:this.menu_visible,menu_name:this.menu_name});
        },
        yy:function(){ 
            this.$emit('qq',this.existingAuthority); 
          }
      }
    }
  },
  data () {
    return {
      show: false,
      typeTitle: '',
      index: 0,
      menuVisible: true,
      menu_id: null,
      menu_name: '您还未选取菜单',
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
      jurisdictionData:null,
      isIndeterminate: true,
      menu_list:[],
    }
  },
  mounted(){
    this.getMenulist();
    console.log(this.addMenu)
  },
  methods: {
    //取消勾选移除此菜单的该权限
    handleChange(id){
        console.log(id)
        console.log(this.$store.state.menu.select_menu.id)
        this.HttpClient.post('/admin/menuPermission/destroy',{
            menu_id:this.$store.state.menu.select_menu.id,
            permission_id:id
        })
        .then(res=>{
          console.log(res)
            if(res.data.code === 200){
                this.$message.success(res.data.msg)
                setTimeout(()=>{
                    console.log(this.$store.state.menu.select_menu)
                    this.$refs.mychild[0].handleSelect(this.$store.state.menu.select_menu.id,this.$store.state.menu.select_menu.menu_name);
                },350)
            }else{
                this.$message.error(res.data.msg+"请在该菜单的子菜单中删除该权限！")
            }
        })
    },
    //请求菜单列表
    getMenulist(){
        this.HttpClient.post('/admin/menu/getList',{})
        .then(res=>{
            console.log(res);
            this.menu_list = res.data.data;
            console.log(this.menu_list)
        })
    },
    getMenu: function (data) {
      /*console.log('data1',this.$store.state.menu.menu)*/
      setTimeout(()=>{
        let childrenData = this.$store.state.menu.menu;
        this.menuVisible = childrenData.menu_visible;
        this.menu_id = childrenData.id;
        this.menu_name = this.$store.state.menu.menu.menu_name;
        /*console.log('data2',this.menu_name)*/
        this.$emit('ee',{id:this.menu_id,menu_visible:this.menu_visible,checkedJurisdiction:this.checkedJurisdiction})
        /*console.log(childrenData,this.menu_id,this.menuVisible)*/
      })
    },
    handleCheckAllChange(val) {
      console.log(val)
      this.checkedJurisdiction = val ? this.jurisdictionData : [];
      console.log(this.checkedJurisdiction)
      this.isIndeterminate = false;
      this.$emit('ee',{id:this.menu_id,menu_visible:this.menu_visible,checkedJurisdiction:this.checkedJurisdiction})
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.jurisdictionData.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.jurisdictionData.length;
      this.$emit('ee',{id:this.menu_id,menu_visible:this.menu_visible,checkedJurisdiction:this.checkedJurisdiction})
    },
    rr(data){
      console.log(this.$store.state.menu)
      this.jurisdictionData = this.$store.state.menu.select_menu.old_jur;
      console.log(this.jurisdictionData)
      this.checkedJurisdiction = this.jurisdictionData;
      if(this.$store.state.menu.select_menu.id === undefined){
        this.menu_name = '您还未选取菜单'
      }else{
        this.menu_name = this.$store.state.menu.select_menu.menu_name+'菜单下的权限'
      }
    }
  }
}
</script>

<style scoped la lang="less">
.menus{
  display: flex;
  width: 100%;
  .menu_left{
    width: 50%;
    display: -webkit-box;
    .left_content{
      border: 1px solid #f2f2f2;
      width: 90%;
      display: block;
      .left_title{
        background: #409EFF;
        height: 28px;
        line-height: 28px;
        text-align: center;
        color: white;
      }
      .menu_trees{
        margin-top: 10px;
      }
    }

  }
  .menu_right{
    width: 50%;
    .right_title{
      background: #409EFF;
      height: 28px;
      line-height: 28px;
      text-align: center;
      color: white;
    }
    .item_contain{
      border: 1px solid #f2f2f2;
      padding: 20px;
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
        text-align: left;
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
}
</style>
<style>
  .tree-menu{
    display: table;
    cursor: pointer;
  }
  .menu_label{

  }
  .lbl_menu{
    color: white;
    padding: 2px 15px;
  }
  .label-wrapper{
    margin-bottom: 10px;
  }
  .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
</style>
