<template>
  <div class="systemMenu">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="content">
        <div class="menu_head">
            <el-button type="primary" size="mini" @click="addTitle()">添加标题</el-button>
            <el-input size="mini" style="width: 200px" v-model="title"></el-input>
        </div>
      <div class="trees">
          <div class="tree_left">
              <div v-for="(menu,index) in menu_list" :key="index">
                <menuTrees :child="menu.child" :depth="0" :label="menu.folder_name" :id="menu.folder_id" :type="menu.type" :name="menu.name" :pid="menu.pid" :folder_id="menu.folder_id" @ee="getMenu" @pp="getMenulist"></menuTrees>
              </div>
          </div>
          <!-- <div class="tree_right">
              <div class="item_contain" :style="menuVisible?{display:'block'}:{display:'none'}">
                  <div class="items">
                      <label class="item_lb">菜单名称:</label>
                      <el-input class="item_input" placeholder="请输入菜单名称" size="mini" v-model="menuName"></el-input>
                  </div>
                  <div class="items">
                      <label class="item_lb">路径:</label>
                      <el-input class="item_input" size="mini" placeholder="请输入路径 如:/index/activity" v-model="menuUrl"></el-input>
                  </div>
                  <div class="items">
                      <label class="item_lb">图标:</label>
                      <el-input class="item_input" size="mini" placeholder="请输入图标 如: icon-plus-square-fill" v-model="menuIcon"></el-input>
                  </div>
                  <el-row>
                      <el-button size="mini" @click="menuVisible = false">取消</el-button>
                      <el-button size="mini" type="primary" @click="submit">提交</el-button>
                  </el-row>
              </div>
          </div> -->
      </div>
    </div>
    <el-dialog :visible.sync="menuVisible" width="400px">
      <div slot="title" class="dialog_head_title">
        <i class="iconfont icon-edit-square examine_icon"></i>
        <span>添加/修改菜单</span>
      </div>
      <div class="item_contain">
          <div class="items">
              <label class="item_lb">菜单名称:</label>
              <el-input class="item_input" placeholder="请输入菜单名称" size="mini" v-model="menuName"></el-input>
          </div>
          <div class="items">
              <label class="item_lb">路径:</label>
              <el-input class="item_input" size="mini" placeholder="请输入路径 如:/index/activity" v-model="menuUrl"></el-input>
          </div>
          <div class="items">
              <label class="item_lb">图标:</label>
              <el-input class="item_input" size="mini" placeholder="请输入图标 如: icon-plus-square-fill" v-model="menuIcon"></el-input>
          </div>
      </div>
      <div class="user_footer" slot="footer">
        <el-row class="row_e">
          <el-button class="btn_deletes" size="small" @click="menuVisible = false">取消</el-button>
          <el-button type="primary" size="small" class="btn_delete" @click="submit">保存</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';

  export default {
    name: "SystemMenu",
    components: {
      BreadCrumb,
      menuTrees: {
        name: 'tree-menu',
        template: `
            <div class="tree-menu">
              <div class="label-wrapper">
                <div :style="indent" class="parent_menu">
                <div class="menu_label"  @click="toggleChildren">
                  <i v-if="child" class="iconfont icon_left" :class="showChildren?'icon-jian-xianxingfangkuang':'icon-jia-xianxingfangkuang'"></i>
                  <el-button size="mini" v-if="type === undefined" type="primary">{{ label }}</el-button>
                  <el-button size="mini" v-if="type === 1" type="primary" plain>{{ label }}</el-button>
                  <el-button size="mini" v-if="type === 2" type="info" plain>{{ label }}</el-button>
                </div>  
                  <el-button size="mini" type="primary" icon="el-icon-plus" circle @click="openMenuModal(id,type,pid,folder_id)"></el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="deleteMenu(id,type)"></el-button>
                  <el-button v-if="type !== undefined" size="mini" type="info" icon="el-icon-edit" circle @click="editMenu(id,type,pid,folder_id)"></el-button>
                </div>
              </div>
              <div class="xjez">
                <tree-menu v-if="showChildren" v-for="item in child" :child="item.child" 
                  :label="item.name" :depth="depth + 1" :key="item.id" :id="item.id" :type="item.type" :pid="item.pid" @ee="xx" :folder_id="folder_id" @pp="ppp">
                </tree-menu>
              </div>
              <el-dialog
                width="470px"
                custom-class="deleteDialog"
                :visible.sync="deleteDialog"
                center>
                <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>
                <div class="deleteDialog_box">
                  <i class="iconfont icon-warning-circle"></i>
                  <p>确定删除 " {{ label }} " 吗？</p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteDialog = false">取 消</el-button>
                    <el-button type="primary" @click="handleSureDelete">确 定</el-button>
                  </span>
              </el-dialog>
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
            deleteDialog:false,
            //删除的id与type
            deId:null,
            deType:null,
          }
        },
        computed: {
          indent() {
            return {transform: `translate(${this.depth * 20}px)`}
          }
        },
        methods: {
          consColor(type){
            console.log(type);
          },
          ppp(){
            this.$emit('pp');
          },
          toggleChildren() {
            this.showChildren = !this.showChildren;
          },
          //点击加号添加菜单
          openMenuModal: function (id,type,pid,folder_id) {
              console.log(id,type,pid,folder_id)
              this.menu_visible = true;
              this.menu_id = id;
              this.menu_type = type;
              this.menu_pid = pid;
              this.menu_folderId = folder_id;
              console.log(this.menu_type+"级数")
              this.$emit('ee',this.menu_type);
              this.$store.dispatch('getMenuInfo',{id:this.menu_id,menu_visible:this.menu_visible,type:this.menu_type,source:1,pid:this.menu_pid,folder_id:this.menu_folderId}).then(res=>{         
              });    
          },
          //点击删除菜单
          deleteMenu: function (id,type){
            this.deleteDialog = true;
            console.log(id,type);
            this.deId = id;
            if(type){
              this.deType = null;
            }else{
              this.deType = type;
            }
          },
          //确定删除菜单
          handleSureDelete(){
            //首先判断是删除菜单文件夹，还是菜单（菜单文件夹的type值为undefined）
            if(this.deType === undefined){
              // console.log("我是菜单文件夹")
              this.HttpClient.post('/admin/folder/destroy',{
                  id:this.deId
              })
              .then(res=>{
                  if(res.data.code === 200){
                    this.$message.success(res.data.msg)
                    setTimeout(() => {
                        this.$emit('pp');
                    }, 500);
                  }else{
                    this.$message.error(res.data.msg)
                  }
              })
            }else{
              // console.log("我是菜单")
              this.HttpClient.post('/admin/menu/destroy',{
                  id:this.deId,
                  // menu_type:0   
              })
              .then(res=>{
                  console.log(res);
                  if(res.data.code === 200){
                    this.$message.success(res.data.msg)
                    setTimeout(() => {
                        this.$emit('pp');
                    }, 500);
                  }else{
                    this.$message.error(res.data.msg)
                  }
              })
            }
          },
          //点击修改菜单
          editMenu: function (id,type,pid,folder_id){
            if(pid === undefined){
                this.$message.success('菜单文件夹不能修改')
            }else{
                console.log('修改菜单')
                console.log(id,type,pid,folder_id)
                this.menu_visible = true;
                this.menu_id = id;
                this.menu_type = type;
                this.menu_pid = pid;
                this.menu_folderId = folder_id;
                console.log(this.menu_pid+'父级ID')
                this.$emit('ee',this.menu_type);
                this.$store.dispatch('getMenuInfo',{id:this.menu_id,menu_visible:this.menu_visible,type:this.menu_type,source:2,pid:this.menu_pid,folder_id:this.menu_folderId}).then(res=>{});
            }
            
          },
          xx: function () {
            this.$emit('ee',{id:this.menu_id,menu_visible:this.menu_visible,type:this.menu_type});
          }
        }
      }
    },
    data() {
      return {
        menu_list:[],
        menuIcon:'',
        menuUrl:'',
        menuName:'',
        list:[],
        title:'',
        show: false,
        typeTitle: '',
        index: 0,
        menuVisible: false,
        menu_id: null,
        menu_type: null,
        pid:null,
        breadData: [{
          id: 1,
          name: '系统管理',
          urls: '/index',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '菜单管理',
          urls: '/index/test',
          icon: 'icon-home'
        }],
        treeData: {},
        editVisible:false,
      }
    },
    mounted(){
        this.getMenulist();
    },
    methods:{
      // fushijian(){
      //     console.log('11111111111111111111111111111111111111')
      // },
      //请求菜单列表
      getMenulist(){
          this.HttpClient.post('/admin/menu/getList',{})
          .then(res=>{
              console.log(res);
              this.menu_list = res.data.data;
              for(let i=0;i<this.menu_list;i++){
                this.menu_list[i].push(fd_id = res.data.data[i].folder_id);
              }
              // this.treeData = res.data.data[0]
          })
      },
      //点击添加板块文件夹
      addTitle(){
          // console.log(this.title)
          this.HttpClient.post('/admin/folder/create',{
            name:this.title
          })
          .then(res=>{
              console.log(res);
              if(res.data.code === 200){
                this.$message.success(res.data.msg);
                setTimeout(()=>{
                    this.getMenulist();
                    this.title = '';
                },500)
                
              }else{
                this.$message.error(res.data.msg)
              }
          })
      },
      getMenu(data) {
        setTimeout(()=>{
          let childrenData = this.$store.state.menu.menu;
          this.menuVisible = childrenData.menu_visible;
          this.menu_id = childrenData.id;
          this.menu_type = childrenData.type;
          console.log(childrenData,this.menu_id,this.menu_type,this.menuVisible+'信息')
        })
      },
      //提交新建或者修改的菜单
      submit(){
        // console.log(this.$store.state.menu.menu.source)
        let source = this.$store.state.menu.menu.source;
        let id = this.$store.state.menu.menu.id;
        let type = this.$store.state.menu.menu.type;
        let pid = this.$store.state.menu.menu.pid;
        // let fd_id = this.$store.state.menu.menu.folder_id;
        console.log(this.$store.state.menu)
        //公用一个弹框，需要先判断是新建还是修改，用source标记，值为1是新建，否则为修改
        if(source == 1){
          console.log('这是新建菜单')
          //先判断，menu_type是否为null,是的话就是新建一级菜单，如果不是就是menu——type+1级菜单
          if(this.menu_type == null){
              this.menu_type = 1;
              this.pid = 0;
          }else{
              this.menu_type = this.menu_type+1;
              this.pid = this.$store.state.menu.menu.id
          }
          console.log(this.menu_type+'/'+this.pid+'/'+this.$store.state.menu.menu.folder_id)
          //如果点击加号为2，则为1级ID  如果不为2，那么在对象中找到ID为当前下的type,然后在加一

          this.HttpClient.post('/admin/menu/create',{
              menu_type:0, //默认值为0
              name:this.menuName,
              url:this.menuUrl,
              // icon:menuIcon,
              pid:this.pid,
              type:this.menu_type,
              folder_id:this.$store.state.menu.menu.folder_id
          })
          .then(res=>{
              console.log(res);
              if(res.data.code === 200){
                  //提交成功后隐藏弹框并刷新列表
                  setTimeout(() => {
                      this.getMenulist();
                      this.menuVisible = false;
                  }, 300);
                  
              }else{
                  this.$message.error(res.data.msg)
              }
          })
        }else{
            console.log('这是修改菜单')
            if(type == 1){
              this.pid = 0;
            }else{
              this.pid = pid
            }
            this.HttpClient.post('/admin/menu/edit',{
                type:type, 
                id:id,   
                name:this.menuName,  
                url:this.menuUrl,  
                // icon:"",
                pid:pid,
          })
          .then(res=>{
              console.log(res)
              if(res.data.code === 200){
                  this.$message.success(res.data.msg)
                  setTimeout(() => {
                      this.getMenulist();
                      this.menuVisible = false;
                  }, 500);
              }else{

              }
          })
        }       
      },
    }
  }
</script>

<style scoped lang="less">
.systemMenu{
  .bread {
    margin: 10px;
  }
.menu_head{
  text-align: -webkit-left;
  margin-bottom: 10px;
  padding-top: 20px;
  margin-left: 10px;
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
    margin-left: 10px;
    .tree_left{
      width: 50%;
      font-size: 18px;
    }
    .tree_right{
      width: 50%;
      .item_contain{
        border: 1px solid #f2f2f2;
        padding: 20px;
        max-width: 310px;
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
    .deleteDialog{
      .deleteDialog_title{
        display: flex;
        align-items: center;
        i{
          font-size: 24px;
          color: #15bafe;
        }
      }
      .deleteDialog_box{
        text-align: center;
        i{
          font-size: 80px;
          color: #15bafe;
        }
        p{
          font-size: 14px;
          color: #000;
          margin-top: 20px;
        }
      }
    }
    .label-wrapper {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
      .has-children {
        cursor: pointer;
      }
    }
  }
  .dialog_head_title {
    text-align: start;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
    .examine_icon {
      color: #15bafe;
    }
  }
  .item_contain{
        border: 1px solid #f2f2f2;
        padding: 20px;
        max-width: 310px;
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
</style>
<style lang="less">
  .systemMenu{  
    .parent_menu{
      display: flex;
      margin:10px 0;
      .samllMini{
        width: 30px;
        height: 20px;
      }
      .xjez{
        margin-left: 30px;
      }
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
  }

</style>
