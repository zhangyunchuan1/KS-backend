webpackJsonp([23],{WOxj:function(t,e){},oJwQ:function(t,e){},"sA+W":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),i=a.n(s),n=a("exGp"),o=a.n(n),l=a("ZPfm"),r=a("QL8K"),d=a.n(r),c={name:"InsideUser",components:{BreadCrumb:l.a},data:function(){return{userVisible:!1,dialogImageUrl:"",search_name:"",departmentOptions:[],jobOptions:[],roleOption:[{id:1,name:"正常"},{id:3,name:"禁用"}],roleValue:"",imageUrl:"",breadData:[{id:1,name:"内部管理",urls:"/index",icon:"icon-home"},{id:2,name:"用户管理",urls:"/index/test",icon:"icon-home"}],tableData:[],addUserData:{username:"",nickname:"",email:"",password:"",department_id:"",department_name:"",position_id:"",position_name:"",image_path:""},source:1,serialnum:"",total:0,currentPage:1,pageSize:10,departmentSelect:[]}},methods:{handleAvatarSuccess:function(t,e){this.imageUrl=URL.createObjectURL(e.raw)},beforeAvatarUpload:function(t){var e=this,a="image/jpeg"===t.type,s=t.size/1024/1024<2;a||this.$message.error("上传头像图片只能是 JPG 格式!"),s||this.$message.error("上传头像图片大小不能超过 2MB!");var i=new FormData;return i.append("token",window.localStorage.token),i.append("images",t),i.append("serialnum",this.serialnum),this.$ajax.post(d.a.urls+d.a.api+"/admin/employee/uploadImg",i).then(function(t){console.log(t),200===t.data.code?(e.imageUrl=t.data.path,e.addUserData.image_path=t.data.path,e.$message.success(t.data.msg)):e.$message.error(t.data.msg)}),a&&s},showUserDialog:function(t){var e=this;return o()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.userVisible=!0,a.next=3,e.getDepartment();case 3:return a.next=5,e.getJob();case 5:1!==t?(console.log(t),e.source=2,e.addUserData.uid=t.uid,e.addUserData.username=t.username,e.addUserData.nickname=t.nickname,e.addUserData.email=t.email,e.addUserData.password="",e.addUserData.department_id=t.department_id,e.addUserData.department_name=t.department_name,e.addUserData.position_id=t.position_id,e.addUserData.position_name=t.position_name,e.addUserData.image_path=t.image_path,e.imageUrl=t.image_path):e.source=1;case 6:case"end":return a.stop()}},a,e)}))()},handleJumpToJurisdiction:function(t){console.log(t),this.$store.dispatch("getTabsInfo",{icon:"icon-home",id:30021,title:"用户角色分配",urls:"/index/inside/user-jurisdiction"}),this.$router.push({path:"/index/inside/user-jurisdiction",query:{info:t}})},cancelDialog:function(){this.userVisible=!1,this.valueEmpty()},getUserData:function(){var t=this;this.HttpClient.post("/admin/employee/index",{size:this.pageSize,page:this.currentPage,status:this.roleValue,nickname:this.search_name}).then(function(e){console.log(e);var a=e.data,s=a.code,i=a.data,n=a.msg;200===s?(t.tableData=i.data,t.total=i.total):t.$message.error(n)})},getDepartment:function(){var t=this;return o()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/department/getList").then(function(e){if(console.log(e),200===e.data.code)for(var a in t.departmentOptions=e.data.data,t.departmentOptions)t.departmentSelect.push({text:t.departmentOptions[a].name,value:t.departmentOptions[a].name})});case 2:case"end":return e.stop()}},e,t)}))()},getJob:function(){var t=this;return o()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/position/getList").then(function(e){console.log(e),200===e.data.code&&(t.jobOptions=e.data.data)});case 2:case"end":return e.stop()}},e,t)}))()},newUser:function(){var t=this;console.log(this.addUserData),console.log(this.source),1===this.source?this.HttpClient.post("/admin/employee/create",this.addUserData).then(function(e){console.log(e),200===e.data.code?(t.$message.success(e.data.msg),t.userVisible=!1,t.valueEmpty(),setTimeout(function(){t.getUserData()},500)):t.$message.error(e.data.msg)}):this.HttpClient.post("/admin/employee/edit",this.addUserData).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),t.userVisible=!1,t.valueEmpty(),setTimeout(function(){t.getUserData()},500))})},valueEmpty:function(){this.addUserData.username="",this.addUserData.nickname="",this.addUserData.email="",this.addUserData.password="",this.addUserData.department_id="",this.addUserData.department_name="",this.addUserData.position_id="",this.addUserData.position_name="",this.addUserData.image_path="",this.imageUrl=""},departmentChange:function(t){var e=this;console.log(t),this.departmentOptions.map(function(a){a.id===t&&(e.addUserData.department_name=a.name)})},jobChange:function(t){var e=this;console.log(t),this.jobOptions.map(function(a){a.id===t&&(e.addUserData.position_name=a.name)})},currentChange:function(t){this.currentChange=t,this.getUserData()},roleSearch:function(){this.getUserData()},nameSearch:function(){this.getUserData()},filterHandler:function(t,e,a){return e[a.property]===t}},created:function(){this.serialnum=this.Tools.GetNumber(),this.getUserData(),this.getDepartment()}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"insideUser"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"content"},[a("p",{staticClass:"title"},[t._v("用户管理")]),t._v(" "),a("div",{staticClass:"conditions"},[a("div",{staticClass:"condition"},[a("p",{staticClass:"role_total"},[t._v("当前共有"+t._s(t.total)+"个用户")]),t._v(" "),a("el-input",{staticClass:"select_normal",attrs:{placeholder:"姓名搜索",size:"mini",clearable:"","suffix-icon":"el-icon-search"},on:{change:t.nameSearch},nativeOn:{keyup:function(e){return"button"in e||13===e.keyCode?t.nameSearch(e):null}},model:{value:t.search_name,callback:function(e){t.search_name=e},expression:"search_name"}}),t._v(" "),a("el-select",{staticClass:"select_normal",attrs:{size:"mini",placeholder:"角色状态",clearable:""},on:{change:t.roleSearch},model:{value:t.roleValue,callback:function(e){t.roleValue=e},expression:"roleValue"}},t._l(t.roleOption,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-circle-plus-outline"},on:{click:function(e){t.showUserDialog(1)}}},[t._v("新增用户")])],1),t._v(" "),a("div",{staticClass:"tabs"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:!0,"header-row-style":{height:"40px"},"header-cell-style":{padding:0,background:"#15bafe",color:"white"},"row-style":{height:"40px"},"cell-style":{padding:0}}},[a("el-table-column",{attrs:{prop:"id",label:"用户ID",width:"100","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"姓名","min-width":"120","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"row_activity"},[t._v(t._s(e.row.username))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"work_number",label:"工号","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"department_name",label:"所属部门",width:"120",filters:t.departmentSelect,"filter-method":t.filterHandler,"show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"position_name",label:"职位",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"证件照",width:"120"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"id_photo",attrs:{src:t.row.image_path}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"role",label:"角色",width:"120","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.roles,function(e,s){return a("p",{key:s},[t._v(t._s(e.name))])})}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态",width:"120",prop:"status",filters:[{text:"正常",value:1},{text:"注销",value:2},{text:"禁用",value:3},{text:"待审核",value:4},{text:"已驳回 ",value:5},{text:"未通过",value:6}],"filter-method":t.filterHandler},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n              "+t._s(4===e.row.status?"待审核":3===e.row.status?"禁用":2===e.row.status?"注销":1===e.row.status?"正常":"删除")+"\n          ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"created_at",label:"创建时间",width:"180","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"240",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){t.showUserDialog(e.row)}}},[t._v("修改")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"text"}},[t._v("删除")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){t.handleJumpToJurisdiction(e.row)}}},[t._v("角色分配")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}})],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.userVisible,width:"400px"},on:{"update:visible":function(e){t.userVisible=e},close:t.cancelDialog}},[a("div",{staticClass:"dialog_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-account examine_icon"}),t._v(" "),a("span",[t._v("新增用户")])]),t._v(" "),a("div",{staticClass:"jurisdiction_content"},[a("div",{staticClass:"jurisdiction_content_item"},[a("label",{staticClass:"el_lbl"},[t._v("姓名:")]),t._v(" "),a("el-input",{staticClass:"el_input",attrs:{size:"mini"},model:{value:t.addUserData.username,callback:function(e){t.$set(t.addUserData,"username",e)},expression:"addUserData.username"}})],1),t._v(" "),a("div",{staticClass:"jurisdiction_content_item"},[a("label",{staticClass:"el_lbl"},[t._v("昵称:")]),t._v(" "),a("el-input",{staticClass:"el_input",attrs:{size:"mini"},model:{value:t.addUserData.nickname,callback:function(e){t.$set(t.addUserData,"nickname",e)},expression:"addUserData.nickname"}})],1),t._v(" "),a("div",{staticClass:"jurisdiction_content_item"},[a("label",{staticClass:"el_lbl"},[t._v("邮箱:")]),t._v(" "),a("el-input",{staticClass:"el_input",attrs:{size:"mini"},model:{value:t.addUserData.email,callback:function(e){t.$set(t.addUserData,"email",e)},expression:"addUserData.email"}})],1),t._v(" "),a("div",{staticClass:"jurisdiction_content_item"},[a("label",{staticClass:"el_lbl"},[t._v("密码:")]),t._v(" "),a("el-input",{staticClass:"el_input",attrs:{size:"mini"},model:{value:t.addUserData.password,callback:function(e){t.$set(t.addUserData,"password",e)},expression:"addUserData.password"}})],1),t._v(" "),a("div",{staticClass:"jurisdiction_content_item"},[a("label",{staticClass:"el_lbl"},[t._v("部门选择:")]),t._v(" "),a("el-select",{staticClass:"el_input",attrs:{size:"mini",placeholder:"选择部门"},on:{change:t.departmentChange},model:{value:t.addUserData.department_id,callback:function(e){t.$set(t.addUserData,"department_id",e)},expression:"addUserData.department_id"}},t._l(t.departmentOptions,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),a("div",{staticClass:"jurisdiction_content_item"},[a("label",{staticClass:"el_lbl"},[t._v("职位:")]),t._v(" "),a("el-select",{staticClass:"el_input",attrs:{size:"mini",placeholder:"选择职位"},on:{change:t.jobChange},model:{value:t.addUserData.position_id,callback:function(e){t.$set(t.addUserData,"position_id",e)},expression:"addUserData.position_id"}},t._l(t.jobOptions,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),a("div",{staticClass:"jurisdiction_content_item"},[a("label",{staticClass:"el_lbl"},[t._v("证件照:")]),t._v(" "),a("el-upload",{staticClass:"avatar-uploader up_img",attrs:{action:"https://jsonplaceholder.typicode.com/posts/","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)]),t._v(" "),a("div",{staticClass:"user_footer",attrs:{slot:"footer"},slot:"footer"},[a("el-row",{staticClass:"row_e"},[a("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:t.cancelDialog}},[t._v("取消")]),t._v(" "),a("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:t.newUser}},[t._v("保存")])],1)],1)])],1)},staticRenderFns:[]};var p=a("VU/8")(c,u,!1,function(t){a("WOxj"),a("oJwQ")},"data-v-4ad0c0d4",null);e.default=p.exports}});