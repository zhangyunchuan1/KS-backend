webpackJsonp([169],{TqSt:function(e,t){},cXZY:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Xxa5"),o=a.n(i),n=a("gRE1"),l=a.n(n),s=a("exGp"),c=a.n(s),r=a("ZPfm"),d=a("+jNi"),u={name:"EncyclopediaManagement",components:{BreadCrumb:r.a,DeleteModal:d.a},data:function(){return{breadData:[{id:1,name:"百科",urls:"/index/encyclopedia/encyclopedia",icon:"icon-home"},{id:2,name:"百科管理",urls:"/index/encyclopedia/encyclopediaManagement",icon:"icon-home"}],headerSelect:"",headerOptions:[{status:0,text:"全部"},{status:1,text:"通过"},{status:2,text:"未通过"}],headerTypeSelect:"",headerTypeOptions:[{status:0,text:"全部"},{status:1,text:"个人用户"},{status:2,text:"专业商家"},{status:3,text:"普通商家"}],headerAuditSelect:"",headerAuditOptions:[{status:0,text:"全部"},{status:1,text:"已审核"},{status:2,text:"待审核"}],headerCategorySelect:"",headerCategoryOptions:[],startTime:"",endTime:"",userNameSearch:"",nickNameSearch:"",tableData:[],rejectList:[],id:"",currentPage:1,pageSize:25,total:0,approveDialog:!1,disableDialog:!1,textarea:"",rejectReason:"",rejectValue:null,averageWord:0}},methods:{rejectButton:function(e){this.id=e,this.disableDialog=!0,this.getRejectList()},agreeButton:function(e){this.id=e,this.approveDialog=!0},modifyButton:function(e,t){this.$router.push({path:"/index/encyclopedia/encyclopedia-modify",query:{id:e,aid:t}})},deleteButton:function(e){this.id=e,this.$refs.delete.deleteDialog=!0},disableBtm:function(){this.disableDialog=!1,console.log(this.rejectValue),this.changeStatus(3)},approveBtm:function(){this.approveDialog=!1,this.changeStatus(1)},confirmDelete:function(e){e&&this.changeStatus(0)},handleRemove:function(e,t){console.log(e,t)},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},renderEncyclopediaStatus:function(e,t){var a=this;t.column;return e("el-select",{props:{value:"通过状态",placeholder:"通过状态"},on:{input:function(e){console.log(e),a.headerSelect=e,a.getEncyclopediaList()}}},[this.headerOptions.map(function(t){return e("el-option",{props:{value:t.status,label:t.text}})})])},renderEncyclopediaAuditStatus:function(e,t){var a=this;t.column;return e("el-select",{props:{value:"审核状态",placeholder:"审核状态"},on:{input:function(e){console.log(e),a.headerAuditSelect=e,a.getAuditList()}}},[this.headerAuditOptions.map(function(t){return e("el-option",{props:{value:t.status,label:t.text}})})])},renderEncyclopediaType:function(e,t){var a=this;t.column;return e("el-select",{props:{value:"用户类别",placeholder:"用户类别"},on:{input:function(e){console.log(e),a.headerTypeSelect=e,a.getEncyclopediaList()}}},[this.headerTypeOptions.map(function(t){return e("el-option",{props:{value:t.status,label:t.text}})})])},renderEncyclopediaCategory:function(e,t){var a=this;t.column;return e("el-select",{props:{value:"所属板块",placeholder:"所属板块"},on:{input:function(e){console.log(e),a.headerCategorySelect=e,a.getEncyclopediaList()}}},[this.headerCategoryOptions.map(function(t){return e("el-option",{props:{value:t.menu_id,label:t.name}})})])},getEncyclopediaList:function(){var e=this,t={page:this.currentPage,size:this.pageSize};this.headerCategorySelect&&(t.cate_id=this.headerCategorySelect),""!==this.headerTypeSelect&&(t.user_type=this.headerTypeSelect),""!==this.headerSelect&&(t.pass_status=this.headerSelect),""!==this.headerAuditSelect&&(t.review_status=this.headerAuditSelect),this.userNameSearch&&(t.username=this.userNameSearch),this.nickNameSearch&&(t.nickname=this.nickNameSearch),this.startTime&&(t.start_time=this.startTime),this.endTime&&(t.end_time=this.endTime),this.HttpClient.post("/admin/encyclopedias/getList",t).then(function(t){console.log(t),200===t.data.code&&(e.tableData=t.data.data.data,e.total=t.data.data.total,e.averageWord=0,e.tableData.length>0&&e.tableData.map(function(t){e.averageWord+=Number(t.word_num)}))})},getRejectList:function(){var e=this;this.HttpClient.post("/admin/webReview/getList",{type:"upload"}).then(function(t){console.log(t),200===t.data.code&&(e.rejectList=t.data.data)})},changeStatus:function(e){var t=this,a={encyclopedia_id:this.id,status:e};3===e&&(a.refuse=this.rejectReason,a.review_id=this.rejectValue,this.rejectList.map(function(e){e.review_id===t.rejectValue&&(a.review_name=e.name)})),console.log(a),this.HttpClient.post("/admin/encyclopedias/changeStatus",a).then(function(e){console.log(e),200===e.data.code?(t.$message.success(e.data.msg),setTimeout(function(){t.getEncyclopediaList()},500)):t.$message.error(e.data.msg)})},currentChange:function(e){this.currentPage=e,this.getEncyclopediaList()}},beforeCreate:function(){var e=this;return c()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.HttpClient.post("/admin/menu/getList",{menu_type:2,type:0}).then(function(t){console.log(t),200===t.data.code&&(e.headerCategoryOptions=l()(t.data.data),e.headerCategoryOptions.unshift({name:"全部",menu_id:""}))});case 2:case"end":return t.stop()}},t,e)}))()},created:function(){this.getEncyclopediaList()}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"encyclopedia_management"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),a("div",{staticClass:"encyclopedia_main"},[e._m(0),e._v(" "),a("div",{staticClass:"encyclopedia_header"},[a("div",{staticClass:"encyclopedia_select"},[a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[e._v("开始")]),e._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",clearable:"",placeholder:"选择日期"},on:{change:e.getEncyclopediaList},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}})],1),e._v(" "),a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[e._v("截止")]),e._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini",clearable:"",placeholder:"选择日期"},on:{change:e.getEncyclopediaList},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}})],1)]),e._v(" "),a("div",{staticClass:"encyclopedia_search"},[a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"用户名搜索",clearable:""},on:{clear:e.getEncyclopediaList},nativeOn:{keyup:function(t){return"button"in t||13===t.keyCode?e.getEncyclopediaList(t):null}},model:{value:e.userNameSearch,callback:function(t){e.userNameSearch=t},expression:"userNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getEncyclopediaList},slot:"append"})],1)],1),e._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"昵称搜索",clearable:""},on:{clear:e.getEncyclopediaList},nativeOn:{keyup:function(t){return"button"in t||13===t.keyCode?e.getEncyclopediaList(t):null}},model:{value:e.nickNameSearch,callback:function(t){e.nickNameSearch=t},expression:"nickNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getEncyclopediaList},slot:"append"})],1)],1)])]),e._v(" "),a("div",{staticClass:"encyclopedia_content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:!0}},[a("el-table-column",{attrs:{label:"ID",align:"center",width:"80",prop:"id","show-overflow-tooltip":"",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"百科题目",align:"center",width:"180","show-overflow-tooltip":"",prop:"title"}}),e._v(" "),a("el-table-column",{attrs:{label:"昵称",align:"center",width:"130","show-overflow-tooltip":"",prop:"nickname"}}),e._v(" "),a("el-table-column",{attrs:{label:"用户名",align:"center",width:"120","show-overflow-tooltip":"",prop:"username"}}),e._v(" "),a("el-table-column",{attrs:{label:"字数",align:"center",width:"100","show-overflow-tooltip":"",prop:"word_num"}}),e._v(" "),a("el-table-column",{attrs:{label:"所属板块",align:"center","show-overflow-tooltip":"","render-header":e.renderEncyclopediaCategory,width:"125",prop:"category.folder_name"}}),e._v(" "),a("el-table-column",{attrs:{label:"子目录",align:"center",width:"125","show-overflow-tooltip":"",prop:"category.menu_1_name"}}),e._v(" "),a("el-table-column",{attrs:{label:"用户类别",align:"center","show-overflow-tooltip":"","render-header":e.renderEncyclopediaType,prop:"user_type",width:"125"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                        "+e._s(1===t.row.user_type?"个人用户":2===t.row.user_type?"专业商家":"普通商家")+"\n                    ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"发布时间",align:"center","show-overflow-tooltip":"",width:"160",prop:"created_at",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"通过状态",align:"center","show-overflow-tooltip":"","render-header":e.renderEncyclopediaStatus,width:"125"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",[a("i",{staticClass:"iconfont icon-dian"}),e._v("\n                            "+e._s(3===t.row.status||2===t.row.status?"未通过":"已通过")+"\n                        ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"审核状态",align:"center","show-overflow-tooltip":"","render-header":e.renderEncyclopediaAuditStatus,width:"125"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",[a("i",{staticClass:"iconfont icon-dian"}),e._v("\n                            "+e._s(2===t.row.status?"待审核":"已审核")+"\n                        ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"encyclopedia_scope"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"encyclopedia_btm"},[3!==t.row.status?a("div",{on:{click:function(a){e.rejectButton(t.row.encyclopedia_id)}}},[e._v("驳回")]):e._e(),e._v(" "),2===t.row.status||3===t.row.status?a("div",{on:{click:function(a){e.agreeButton(t.row.encyclopedia_id)}}},[e._v("批准")]):e._e(),e._v(" "),a("div",{on:{click:function(a){e.modifyButton(t.row.id,t.row.encyclopedia_id)}}},[e._v("修改")]),e._v(" "),a("div",{on:{click:function(a){e.deleteButton(t.row.encyclopedia_id)}}},[e._v("删除")]),e._v(" "),a("router-link",{attrs:{to:"http://frontend.kslab.com/home/baikeDetail?uid="+t.row.encyclopedia_id}},[e._v("查看")])],1)]}}])})],1),e._v(" "),e.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:e.total,"page-size":e.pageSize},on:{"current-change":e.currentChange}}):e._e()],1),e._v(" "),a("div",{staticClass:"bottom"},[a("div",[e._v("数量："+e._s(e.total))]),e._v(" "),a("div",[e._v("平均字数："+e._s(e.averageWord))])])]),e._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:e.disableDialog},on:{"update:visible":function(t){e.disableDialog=t}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),e._v("驳回")]),e._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[e._v("理由：")]),e._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",rows:4},model:{value:e.rejectReason,callback:function(t){e.rejectReason=t},expression:"rejectReason"}})],1)]),e._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[e._v("类别：")]),e._v(" "),a("div",{staticClass:"disable_dialog_right"},e._l(e.rejectList,function(t){return a("el-radio",{key:t.review_id,attrs:{border:"",label:t.review_id},model:{value:e.rejectValue,callback:function(t){e.rejectValue=t},expression:"rejectValue"}},[e._v(e._s(t.name))])}))]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.disableDialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.disableBtm}},[e._v("确 定")])],1)]),e._v(" "),a("el-dialog",{attrs:{visible:e.approveDialog,width:"470px","custom-class":"approveDialog"},on:{"update:visible":function(t){e.approveDialog=t}}},[a("span",{staticClass:"approveDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huaban4"})]),e._v(" "),a("div",{staticClass:"approveDialog_main"},[a("i",{staticClass:"iconfont icon-warning-circle"}),e._v(" "),a("div",{staticClass:"approveDialog_text"},[e._v("确认批准吗？")])]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.approveDialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.approveBtm}},[e._v("确 定")])],1)]),e._v(" "),a("DeleteModal",{ref:"delete",on:{doDelete:e.confirmDelete}})],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"encyclopedia_title"},[t("div",{staticClass:"title"},[this._v("百科管理")])])}]};var h=a("VU/8")(u,p,!1,function(e){a("TqSt")},null,null);t.default=h.exports}});