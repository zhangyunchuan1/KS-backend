webpackJsonp([27],{"4fwB":function(e,t){},SZVN:function(e,t){},m0EJ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("Xxa5"),s=n.n(i),l=n("exGp"),o=n.n(l),a={name:"SystemMenu",components:{BreadCrumb:n("ZPfm").a,menuTrees:{name:"tree-menu",template:'\n          <div class="tree-menu">\n            <div class="label-wrapper">\n              <div :style="indent" class="parent_menu">\n              <div class="menu_label"  @click="toggleChildren">\n                <i v-if="child" class="iconfont icon_left" :class="showChildren?\'icon-jian-xianxingfangkuang\':\'icon-jia-xianxingfangkuang\'"></i>\n                <el-button size="mini" v-if="type === undefined" type="primary">{{ label }}</el-button>\n                <el-button size="mini" v-if="type === 1" type="primary" plain>{{ label }}</el-button>\n                <el-button size="mini" v-if="type === 2" type="info" plain>{{ label }}</el-button>\n              </div>  \n                <el-tooltip class="item" effect="dark" content="添加子目录" placement="top">\n                  <el-button size="mini" type="primary" icon="el-icon-plus" circle @click="openMenuModal(id,type,pid,folder_id)"></el-button>\n                </el-tooltip>\n                <el-tooltip class="item" effect="dark" content="禁用" placement="top">\n                  <el-button v-if="type !== undefined && currentStauts === 1" size="mini" type="danger" icon="el-icon-close" circle @click="deleteMenu(id,type,status)"></el-button>\n                </el-tooltip>\n                <el-tooltip class="item" effect="dark" content="恢复" placement="top">\n                  <el-button v-if="type !== undefined && currentStauts === 0" size="mini" type="success" icon="el-icon-check" circle @click="recoveryMenu(id,type,status)"></el-button>\n                </el-tooltip>\n                <el-tooltip class="item" effect="dark" content="修改" placement="top">\n                  <el-button v-if="type !== undefined" size="mini" type="info" icon="el-icon-edit" circle @click="editMenu(id,type,pid,folder_id)"></el-button>\n                </el-tooltip>\n              </div>\n            </div>\n            <div class="xjez">\n              <tree-menu v-if="showChildren" v-for="item in child" :child="item.child" \n                :label="item.name" :depth="depth + 1" :key="item.id" :id="item.id" :type="item.type" :pid="item.pid" @ee="xx" :folder_id="folder_id" :status="item.status" @pp="ppp" @transmitMenuInfo="transmitMenuInfo">\n              </tree-menu>\n            </div>\n            <el-dialog\n              width="470px"\n              custom-class="deleteDialog"\n              :visible.sync="deleteDialog"\n              center>\n              <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>\n              <div class="deleteDialog_box" >\n                <i class="iconfont icon-warning-circle"></i>\n                <p>确定禁用 " {{ label }} " 吗？</p>\n              </div>\n              <span slot="footer" class="dialog-footer">\n                  <el-button @click="deleteDialog = false">取 消</el-button>\n                  <el-button type="primary" @click="handleSureDelete">确 定</el-button>\n                </span>\n            </el-dialog>\n            <el-dialog\n              width="470px"\n              custom-class="deleteDialog"\n              :visible.sync="recoveryDialog"\n              center>\n              <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>\n              <div class="deleteDialog_box">\n                <i class="iconfont icon-warning-circle"></i>\n                <p>确定恢复 " {{ label }} " 吗？</p>\n              </div>\n              <span slot="footer" class="dialog-footer">\n                  <el-button @click="recoveryDialog = false">取 消</el-button>\n                  <el-button type="primary" @click="handleSureRecovery">确 定</el-button>\n                </span>\n            </el-dialog>\n          </div>\n        ',props:["child","label","depth","id","type","name","pid","folder_id","status"],data:function(){return{showChildren:!1,menu_visible:!1,menu_id:null,menu_type:null,menu_pid:null,menu_folderId:null,deleteDialog:!1,recoveryDialog:!1,deId:null,deType:null,currentStauts:null}},created:function(){this.currentStauts=this.status},computed:{indent:function(){return{transform:"translate("+20*this.depth+"px)"}}},methods:{consColor:function(e){console.log(e)},ppp:function(){this.$emit("pp")},toggleChildren:function(){this.showChildren=!this.showChildren},openMenuModal:function(e,t,n,i){console.log(e,t,n,i),this.menu_visible=!0,this.menu_id=e,this.menu_type=t,this.menu_pid=n,this.menu_folderId=i,console.log(this.menu_type+"级数"),this.$emit("ee",this.menu_type),this.$store.dispatch("getMenuInfo",{id:this.menu_id,menu_visible:this.menu_visible,type:this.menu_type,source:1,pid:this.menu_pid,folder_id:this.menu_folderId}).then(function(e){})},deleteMenu:function(e,t,n){this.deleteDialog=!0,console.log(e,t,n),this.deId=e},handleSureDelete:function(){var e=this;console.log(this.deId),this.HttpClient.post("/admin/menu/changeStatus",{menu_type:0,id:this.deId,status:0}).then(function(t){console.log(t),200===t.data.code?(e.deleteDialog=!1,e.$message.success("禁用成功！"),e.currentStauts=0):e.$message.error("禁用失败！")})},recoveryMenu:function(e,t,n){this.recoveryDialog=!0,console.log(e,t,n),this.deId=e},handleSureRecovery:function(){var e=this;console.log(this.deId),this.HttpClient.post("/admin/menu/changeStatus",{menu_type:0,id:this.deId,status:1}).then(function(t){console.log(t),200===t.data.code?(e.recoveryDialog=!1,e.$message.success("恢复成功！"),e.currentStauts=1):e.$message.error("恢复失败！")})},editMenu:function(e,t,n,i){var l=this;return o()(s.a.mark(function o(){var a;return s.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(a={},void 0!==n){s.next=5;break}l.$message.success("菜单文件夹不能修改"),s.next=19;break;case 5:return s.next=7,l.HttpClient.get("/admin/menu/edit",{menu_type:0,id:e}).then(function(e){console.log(e),a=e.data.data});case 7:console.log(a),l.$emit("transmitMenuInfo",a),console.log("修改菜单"),console.log(e,t,n,i),l.menu_visible=!0,l.menu_id=e,l.menu_type=t,l.menu_pid=n,l.menu_folderId=i,console.log(l.menu_pid+"父级ID"),l.$emit("ee",l.menu_type),l.$store.dispatch("getMenuInfo",{id:l.menu_id,menu_visible:l.menu_visible,type:l.menu_type,source:2,pid:l.menu_pid,folder_id:l.menu_folderId}).then(function(e){});case 19:case"end":return s.stop()}},o,l)}))()},xx:function(){this.$emit("ee",{id:this.menu_id,menu_visible:this.menu_visible,type:this.menu_type})},transmitMenuInfo:function(e){console.log("qqqqqqqqqqq",e),this.$emit("transmitMenuInfo",e)}}}},data:function(){return{menu_list:[],menuIcon:"",menuUrl:"",menuName:"",list:[],title:"",show:!1,typeTitle:"",index:0,menuVisible:!1,menu_id:null,menu_type:null,pid:null,breadData:[{id:1,name:"系统管理",urls:"/index",icon:"icon-home"},{id:2,name:"菜单管理",urls:"/index/test",icon:"icon-home"}],treeData:{},editVisible:!1,editMenuInfo:{}}},mounted:function(){this.getMenulist()},methods:{getMenulist:function(){var e=this;this.HttpClient.post("/admin/menu/getListWithDel",{}).then(function(t){console.log(t),e.menu_list=t.data.data;for(var n=0;n<e.menu_list;n++)e.menu_list[n].push(fd_id=t.data.data[n].folder_id)})},addTitle:function(){var e=this;this.HttpClient.post("/admin/folder/create",{name:this.title}).then(function(t){console.log(t),200===t.data.code?(e.$message.success(t.data.msg),setTimeout(function(){e.getMenulist(),e.title=""},500)):e.$message.error(t.data.msg)})},getMenu:function(e){var t=this;console.log(e),setTimeout(function(){var e=t.$store.state.menu.menu;t.menuVisible=e.menu_visible,t.menu_id=e.id,t.menu_type=e.type,console.log(e,t.menu_id,t.menu_type,t.menuVisible+"信息")})},submit:function(){var e=this,t=this.$store.state.menu.menu.source,n=this.$store.state.menu.menu.id,i=this.$store.state.menu.menu.type,s=this.$store.state.menu.menu.pid;console.log(this.$store.state.menu),1==t?(console.log("这是新建菜单"),null==this.menu_type?(this.menu_type=1,this.pid=0):(this.menu_type=this.menu_type+1,this.pid=this.$store.state.menu.menu.id),console.log(this.menu_type+"/"+this.pid+"/"+this.$store.state.menu.menu.folder_id),this.HttpClient.post("/admin/menu/create",{menu_type:0,name:this.menuName,url:this.menuUrl,pid:this.pid,type:this.menu_type,folder_id:this.$store.state.menu.menu.folder_id}).then(function(t){console.log(t),200===t.data.code?setTimeout(function(){e.getMenulist(),e.menuVisible=!1},300):e.$message.error(t.data.msg)})):(console.log("这是修改菜单"),this.pid=1==i?0:s,this.HttpClient.post("/admin/menu/edit",{type:i,id:n,name:this.menuName,url:this.menuUrl,pid:s}).then(function(t){console.log(t),200===t.data.code&&(e.$message.success(t.data.msg),setTimeout(function(){e.getMenulist(),e.menuVisible=!1},500))}))},transmitMenuInfo:function(e){console.log("iiiiiii",e),this.menuName=e.name,this.menuUrl=e.url,this.menuIcon=e.icon}}},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"systemMenu"},[n("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),n("div",{staticClass:"content"},[n("div",{staticClass:"menu_head"},[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.addTitle()}}},[e._v("添加标题")]),e._v(" "),n("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini"},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}})],1),e._v(" "),n("div",{staticClass:"trees"},[n("div",{staticClass:"tree_left"},e._l(e.menu_list,function(t,i){return n("div",{key:i},[n("menuTrees",{attrs:{child:t.child,depth:0,label:t.folder_name,id:t.folder_id,type:t.type,name:t.name,pid:t.pid,folder_id:t.folder_id},on:{ee:e.getMenu,pp:e.getMenulist,transmitMenuInfo:e.transmitMenuInfo}})],1)}))])]),e._v(" "),n("el-dialog",{attrs:{visible:e.menuVisible,width:"400px"},on:{"update:visible":function(t){e.menuVisible=t}}},[n("div",{staticClass:"dialog_head_title",attrs:{slot:"title"},slot:"title"},[n("i",{staticClass:"iconfont icon-edit-square examine_icon"}),e._v(" "),n("span",[e._v("添加/修改菜单")])]),e._v(" "),n("div",{staticClass:"item_contain"},[n("div",{staticClass:"items"},[n("label",{staticClass:"item_lb"},[e._v("菜单名称:")]),e._v(" "),n("el-input",{staticClass:"item_input",attrs:{placeholder:"请输入菜单名称",size:"mini"},model:{value:e.menuName,callback:function(t){e.menuName=t},expression:"menuName"}})],1),e._v(" "),n("div",{staticClass:"items"},[n("label",{staticClass:"item_lb"},[e._v("路径:")]),e._v(" "),n("el-input",{staticClass:"item_input",attrs:{size:"mini",placeholder:"请输入路径 如:/index/activity"},model:{value:e.menuUrl,callback:function(t){e.menuUrl=t},expression:"menuUrl"}})],1),e._v(" "),n("div",{staticClass:"items"},[n("label",{staticClass:"item_lb"},[e._v("图标:")]),e._v(" "),n("el-input",{staticClass:"item_input",attrs:{size:"mini",placeholder:"请输入图标 如: icon-plus-square-fill"},model:{value:e.menuIcon,callback:function(t){e.menuIcon=t},expression:"menuIcon"}})],1)]),e._v(" "),n("div",{staticClass:"user_footer",attrs:{slot:"footer"},slot:"footer"},[n("el-row",{staticClass:"row_e"},[n("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(t){e.menuVisible=!1}}},[e._v("取消")]),e._v(" "),n("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:e.submit}},[e._v("保存")])],1)],1)])],1)},staticRenderFns:[]};var c=n("VU/8")(a,u,!1,function(e){n("4fwB"),n("SZVN")},"data-v-50227845",null);t.default=c.exports}});