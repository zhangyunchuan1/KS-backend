webpackJsonp([4],{"1YH7":function(e,t){},BRy5:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("ZPfm"),s={name:"Jurisdiction",props:["addMenu"],components:{menuTrees:{name:"tree-menu",template:'\n            <div class="tree-menu">\n              <div class="label-wrapper">\n                <div :style="indent" class="parent_menu" style="display:flex;align-items:center;">\n                <div class="menu_label">\n                  <i @click="toggleChildren(id,label)" v-if="child" class="iconfont icon_left" :class="showChildren?\'icon-jian-xianxingfangkuang\':\'icon-jia-xianxingfangkuang\'"></i>\n                  <span @click="handleSelect(id,label,child)" :style="depth===0?{background:\'#1A67AB\'}:depth===1?{background:\'#1E86E5\'}:depth===2?{background:\'#4DACFE\'}:{background:\'#26C0D5\'}" class="lbl_menu">{{ label }}/{{id}}</span>\n                </div>\n                  <i @click="addCurrentJur" class="iconfont icon-plus-square-fill icon_add" v-if="false"></i>\n                </div>\n              </div>\n              <tree-menu\n                v-if="showChildren"\n                v-for="item in child"\n                :child="item.child"\n                :label="item.name"\n                :depth="depth + 1"\n                :key="item.id"\n                :id="item.id"\n                @ee="xx"\n                v-on:qq="yy"\n                :addMenu="addMenu"\n                ref="mychild"\n              >\n              </tree-menu>\n            </div>\n          ',props:["child","label","depth","id","addMenu"],data:function(){return{showChildren:!1,menu_visible:!1,menu_id:null,tab_index:null,menu_name:"",existingAuthority:null,select_menuId:null,select_menuName:null}},computed:{indent:function(){return{transform:"translate("+20*this.depth+"px)"}}},methods:{addCurrentJur:function(){console.log(this.addMenu),console.log(this.existingAuthority)},handleSelect:function(e,t,i){var n=this;console.log(i),void 0===i&&(console.log(e,t),this.select_menuName=t,this.select_menuId=e,this.HttpClient.post("/admin/menuPermission/getAll",{menu_id:e}).then(function(i){console.log(i),n.menu_name=t,console.log(n.menu_name),n.existingAuthority=i.data.data,n.$store.dispatch("getSelectMenuInfo",{old_jur:n.existingAuthority,menu_name:n.select_menuName,id:e}),n.HttpClient.post("/admin/menuPermission/getAll",{menu_id:e,role_id:n.$store.state.menu.role_jur.id}).then(function(e){console.log(e);var t=n.$store.state.menu.role_jur.id;200===e.data.code&&(n.$store.dispatch("getSelectRoleMenuInfo",{id:t,curRoleMenuJur:e.data.data}).then(function(e){}),n.$emit("qq",n.existingAuthority))})}))},toggleChildren:function(e,t){this.showChildren=!this.showChildren,this.menu_visible=!0,this.menu_id=e,this.tab_index=e,this.$emit("ee",{id:this.menu_id,menu_visible:this.menu_visible,menu_name:t}),this.$store.dispatch("getMenuInfo",{id:this.menu_id,menu_visible:this.menu_visible}).then(function(e){})},openMenuModal:function(e){var t=this;this.menu_visible=!0,this.menu_id=e,this.tab_index=e,this.$emit("ee",{id:this.menu_id,menu_visible:this.menu_visible}),this.$store.dispatch("getMenuInfo",{id:this.menu_id,menu_visible:this.menu_visible}).then(function(e){console.log(333,t.$store.state.menu.menu)})},deleteMenu:function(e){console.log(e)},editMenu:function(e){console.log(e)},xx:function(){this.$emit("ee",{id:this.menu_id,menu_visible:this.menu_visible,menu_name:this.menu_name})},yy:function(){this.$emit("qq",this.existingAuthority)}}}},data:function(){return{show:!1,typeTitle:"",index:0,menuVisible:!0,menu_id:null,menu_name:"您还未选取菜单",treeData:{id:0,name:"root",children:[{id:1,name:"菜单1",children:[{id:11,name:"菜单11"},{id:12,name:"菜单12"}]},{id:2,name:"菜单2",children:[{id:21,name:"菜单21"},{id:22,name:"菜单22"}]}]},checkedJurisdiction:[],jurisdictionData:[],menu_list:[],jurVisible:!0}},mounted:function(){this.getMenulist(),console.log(this.addMenu)},methods:{handleChange:function(e,t){var i=this;console.log(e,t),console.log(this.$store.state.menu.role_jur.id),console.log(this.jurisdictionData,this.checkedJurisdiction),e?this.HttpClient.post("/admin/rolepermission/create",{role_id:this.$store.state.menu.role_jur.id,permission_id:t}).then(function(e){console.log(e),200===e.data.code&&i.$message.success(e.data.msg)}):this.HttpClient.post("/admin/rolepermission/destroy",{role_id:this.$store.state.menu.role_jur.id,permission_id:t}).then(function(e){console.log(e),200===e.data.code&&i.$message.success(e.data.msg)})},getMenulist:function(){var e=this;this.HttpClient.post("/admin/menu/getList",{}).then(function(t){console.log(t),e.menu_list=t.data.data,console.log(e.menu_list)})},getMenu:function(e){var t=this;setTimeout(function(){var e=t.$store.state.menu.menu;t.menuVisible=e.menu_visible,t.menu_id=e.id,t.menu_name=t.$store.state.menu.menu.menu_name,t.$emit("ee",{id:t.menu_id,menu_visible:t.menu_visible,checkedJurisdiction:t.checkedJurisdiction})})},handleCheckedCitiesChange:function(e){console.log("123456789"),console.log(e);var t=e.length;this.checkAll=t===this.jurisdictionData.length,this.$emit("ee",{id:this.menu_id,menu_visible:this.menu_visible,checkedJurisdiction:this.checkedJurisdiction})},rr:function(e){console.log(this.$store.state.menu.select_menu.old_jur,this.$store.state.menu.role_jur.curRoleMenuJur),this.jurisdictionData=this.$store.state.menu.select_menu.old_jur,this.checkedJurisdiction=this.$store.state.menu.role_jur.curRoleMenuJur,console.log(this.jurisdictionData,this.checkedJurisdiction),void 0===this.$store.state.menu.select_menu.id?this.menu_name="您还未选取菜单":this.menu_name=this.$store.state.menu.select_menu.menu_name+"菜单下的权限"}}},a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"menus"},[i("div",{staticClass:"menu_left"},[i("div",{staticClass:"left_content"},[i("p",{staticClass:"left_title"},[e._v("现有菜单")]),e._v(" "),e._l(e.menu_list,function(t,n){return i("div",{key:n},[i("menuTrees",{ref:"mychild",refInFor:!0,staticClass:"menu_trees",attrs:{child:t.child,depth:0,name:t.name,id:t.id,label:t.folder_name,addMenu:e.addMenu},on:{ee:e.getMenu,qq:function(t){e.rr()}}})],1)})],2)]),e._v(" "),i("div",{staticClass:"menu_right"},[i("p",{staticClass:"right_title"},[e._v(e._s(e.menu_name))]),e._v(" "),e.jurVisible?i("div",{staticClass:"item_contain"},[i("div",{staticClass:"jurisdiction_content"},[i("div",{staticStyle:{margin:"15px 0"}}),e._v(" "),i("el-checkbox-group",{staticClass:"check_group",on:{change:e.handleCheckedCitiesChange},model:{value:e.checkedJurisdiction,callback:function(t){e.checkedJurisdiction=t},expression:"checkedJurisdiction"}},e._l(e.jurisdictionData,function(t){return i("el-checkbox",{key:t.id,staticClass:"check_item",attrs:{label:t},on:{change:function(i){e.handleChange(i,t.id)}}},[i("span",{staticClass:"check_lab"},[e._v(e._s(t.label)+e._s(t.id)),i("span",{staticClass:"line"}),e._v(e._s(t.name))])])}))],1)]):e._e()])])},staticRenderFns:[]};var l=i("VU/8")(s,a,!1,function(e){i("HPd6"),i("bQ5g")},"data-v-4ea84328",null).exports,o={name:"InsideJurisdiction",components:{BreadCrumb:n.a,menuTrees:l},data:function(){return{roleId:"",newDepicscript:null,newNameClass:null,arrayValue:"",search_name:"",search_method:"",addVisible:!1,menuVisible:!1,menu_id:null,checkedJurisdiction:[],breadData:[{id:1,name:"内部管理",urls:"/index",icon:"icon-home"},{id:2,name:"权限管理",urls:"/index/test",icon:"icon-home"}],arrayOptions:[{value:1,label:"全部"},{value:2,label:"长期"}],tableData:[],source:!0,currentPage:1,pageSize:10,pageNum:0,total:0}},methods:{roleJur:function(e){console.log("角色ID_"+e),this.$store.dispatch("getSelectRoleMenuInfo",{id:e}).then(function(e){}),console.log(this.$store.state.menu.role_jur),this.menuVisible=!0},saveUserNew:function(){var e=this;this.source?this.HttpClient.post("/admin/role/create",{name:this.newNameClass,description:this.newDepicscript}).then(function(t){200===t.data.code?(e.$message({message:t.data.msg,type:"success"}),e.addVisible=!1,e.emptyValue(),setTimeout(function(){e.roleList()},500)):e.$message.error(t.data.msg)}):this.HttpClient.post("/admin/role/edit",{id:this.roleId,name:this.newNameClass,description:this.newDepicscript}).then(function(t){console.log(t),200===t.data.code?(e.$message.success(t.data.msg),e.addVisible=!1,e.emptyValue(),setTimeout(function(){e.roleList()},500)):e.$message.error(t.data.msg)})},roleList:function(){var e=this;this.HttpClient.post("/admin/role/index",{page:this.currentPage,size:this.pageSize}).then(function(t){console.log(t),200===t.data.code&&(e.tableData=t.data.data.data,e.total=t.data.data.total,e.pageNum=Math.ceil(t.data.data.total/e.pageSize))})},getMenuItem:function(e){console.log("data",e),this.menu_id=this.$store.state.menu.menu.id,this.checkedJurisdiction=e},handleSaveMenuJurisdiction:function(){console.log("保存：",this.menu_id,this.checkedJurisdiction),this.menuVisible=!1},addNewRole:function(){this.source=!0,this.addVisible=!0},updateRole:function(e){this.source=!1,this.addVisible=!0,this.newDepicscript=e.description,this.newNameClass=e.name,this.roleId=e.id},toggleUse:function(e,t){var i=this;e=1===e?0:1,this.HttpClient.post("/admin/role/changeStatus",{id:t,status:e}).then(function(e){console.log(e),200===e.data.code?(i.$message.success(e.data.msg),setTimeout(function(){i.roleList()},500)):i.$message.error(e.data.msg)})},emptyValue:function(){this.newDepicscript="",this.newNameClass=""},currentChange:function(e){this.currentPage=e,this.roleList()}},mounted:function(){this.roleList()},watch:{tableData:function(){}}},c={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"insideJurisdiction"},[i("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),i("div",{staticClass:"content"},[i("p",{staticClass:"title"},[e._v("角色管理")]),e._v(" "),i("div",{staticClass:"conditions"},[i("div",{staticClass:"condition"},[i("p",{staticClass:"role_total"},[e._v("当前共有"+e._s(e.total)+"个角色")]),e._v(" "),i("el-input",{staticClass:"select_normal",attrs:{placeholder:"角色名称",size:"mini","suffix-icon":"el-icon-search"},model:{value:e.search_name,callback:function(t){e.search_name=t},expression:"search_name"}}),e._v(" "),i("el-select",{staticClass:"select_normal",attrs:{size:"mini",placeholder:"角色状态"},model:{value:e.arrayValue,callback:function(t){e.arrayValue=t},expression:"arrayValue"}},e._l(e.arrayOptions,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),i("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-circle-plus-outline"},on:{click:e.addNewRole}},[e._v("新增角色")])],1),e._v(" "),i("div",{staticClass:"tabs"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:!0,"header-row-style":{height:"40px"},"header-cell-style":{padding:0,background:"#15bafe",color:"white"},"row-style":{height:"40px"},"cell-style":{padding:0}}},[i("el-table-column",{attrs:{prop:"id",label:"角色ID",width:"50","show-overflow-tooltip":""}}),e._v(" "),i("el-table-column",{attrs:{label:"角色名称",prop:"name","min-width":"150","show-overflow-tooltip":""}}),e._v(" "),i("el-table-column",{attrs:{prop:"description",label:"介绍","min-width":"200","show-overflow-tooltip":""}}),e._v(" "),i("el-table-column",{attrs:{prop:"status",label:"状态",width:"120","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(1===t.row.status?"启用":"禁用")+"\n          ")]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"created_at",label:"创建时间",width:"180","show-overflow-tooltip":""}}),e._v(" "),i("el-table-column",{attrs:{label:"操作",width:"240",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"small",type:"text"},on:{click:function(i){e.roleJur(t.row.id)}}},[e._v("角色权限")]),e._v(" "),i("el-button",{attrs:{size:"small",type:"text"},on:{click:function(i){e.toggleUse(t.row.status,t.row.id)}}},[e._v(e._s(1===t.row.status?"禁用":"启用"))]),e._v(" "),i("el-button",{attrs:{size:"small",type:"text"},on:{click:function(i){e.updateRole(t.row)}}},[e._v("角色编辑")])]}}])})],1),e._v(" "),e.pageNum?i("el-pagination",{attrs:{layout:"prev, pager, next","page-count":e.pageNum},on:{"current-change":e.currentChange}}):e._e()],1)]),e._v(" "),i("el-dialog",{attrs:{visible:e.addVisible,width:"400px"},on:{"update:visible":function(t){e.addVisible=t}}},[i("div",{staticClass:"dialog_head_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-edit-square examine_icon"}),e._v(" "),i("span",[e._v("新增角色")])]),e._v(" "),i("div",{staticClass:"jurisdiction_content"},[i("div",{staticClass:"jurisdiction_content_item"},[i("label",{staticClass:"el_lbl"},[e._v("角色名称:")]),e._v(" "),i("el-input",{staticClass:"el_input",attrs:{size:"mini"},model:{value:e.newNameClass,callback:function(t){e.newNameClass=t},expression:"newNameClass"}})],1),e._v(" "),i("div",{staticClass:"jurisdiction_content_item"},[i("label",{staticClass:"el_lbl"},[e._v("介绍:")]),e._v(" "),i("el-input",{staticClass:"el_input_text_area",attrs:{placeholder:"30字内介绍",type:"textarea",autosize:{minRows:3,maxRows:3}},model:{value:e.newDepicscript,callback:function(t){e.newDepicscript=t},expression:"newDepicscript"}})],1)]),e._v(" "),i("div",{staticClass:"user_footer",attrs:{slot:"footer"},slot:"footer"},[i("el-row",{staticClass:"row_e"},[i("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(t){e.addVisible=!1}}},[e._v("取消")]),e._v(" "),i("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:e.saveUserNew}},[e._v("保存")])],1)],1)]),e._v(" "),i("el-dialog",{attrs:{visible:e.menuVisible,width:"1000px"},on:{"update:visible":function(t){e.menuVisible=t}}},[i("div",{staticClass:"dialog_head_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-menu examine_icon"}),e._v(" "),i("span",[e._v("角色权限")])]),e._v(" "),i("div",{staticClass:"menu_content"},[i("menuTrees",{on:{ee:e.getMenuItem}})],1),e._v(" "),i("div",{staticClass:"user_footer",attrs:{slot:"footer"},slot:"footer"},[i("el-row",{staticClass:"row_e"},[i("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(t){e.menuVisible=!1}}},[e._v("取消")]),e._v(" "),i("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:e.handleSaveMenuJurisdiction}},[e._v("保存")])],1)],1)])],1)},staticRenderFns:[]};var u=i("VU/8")(o,c,!1,function(e){i("GT7J"),i("1YH7")},"data-v-4cf47395",null);t.default=u.exports},GT7J:function(e,t){},HPd6:function(e,t){},bQ5g:function(e,t){}});