webpackJsonp([243],{jMfY:function(t,e){},uLTm:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Xxa5"),s=a.n(i),n=a("exGp"),o=a.n(n),l=a("gRE1"),c=a.n(l),r=a("ZPfm"),d=a("+jNi"),u={name:"OthersEdit",components:{BreadCrumb:r.a,DeleteModal:d.a},data:function(){return{breadData:[{id:1,name:"百科",urls:"/index/encyclopedia/encyclopedia",icon:"icon-home"},{id:2,name:"他人编辑",urls:"/index/encyclopedia/othersEdit",icon:"icon-home"}],startTime:"",endTime:"",userNameSearch:"",nickNameSearch:"",tableData:[],headerSelect:"",headerOptions:[{status:"",text:"全部"},{status:0,text:"未通过"},{status:1,text:"已通过"}],headerAuditSelect:"",headerAuditOptions:[{status:"",text:"全部"},{status:0,text:"待审核"},{status:1,text:"已审核"}],headerTypeSelect:"",headerTypeOptions:[{status:0,text:"全部"},{status:1,text:"个人用户"},{status:2,text:"专业商家"},{status:3,text:"普通商家"}],headerCategorySelect:"",headerCategoryOptions:[],approveDialog:!1,disableDialog:!1,rejectList:[],rejectReason:"",rejectValue:{},viewDialog:!1,viewDialogChildren:!1,deleteDialog:!1,id:"",previewData:{},firstCatalogue:[{}],secondCatalogue:[{}],firstId:"",firstIndex:0,secondIndex:0,sourceIndex:0,imageUrl:"",currentPage:1,pageSize:25,total:0}},methods:{getOthersList:function(){var t=this,e={page:this.currentPage,size:this.pageSize};this.headerCategorySelect&&(e.cate_id=this.headerCategorySelect),""!==this.headerTypeSelect&&(e.user_type=this.headerTypeSelect),""!==this.headerSelect&&(e.clear_status=this.headerSelect),""!==this.headerAuditSelect&&(e.auditing_status=this.headerAuditSelect),this.startTime&&(e.start_time=this.startTime),this.endTime&&(e.end_time=this.endTime),this.userNameSearch&&(e.username=this.userNameSearch),this.nickNameSearch&&(e.nickname=this.nickNameSearch),this.HttpClient.post("/admin/encyclopedias/otherLists",e).then(function(e){console.log(e),200===e.data.code&&(t.tableData=e.data.data.data,t.total=e.data.data.total)})},getRejectList:function(){var t=this;this.HttpClient.post("/admin/webReview/getList",{type:"upload"}).then(function(e){console.log(e),200===e.data.code&&(t.rejectList=e.data.data)})},changeStatus:function(t){var e=this,a={encyclopedia_id:this.id,status:t};3===t&&(console.log(this.rejectValue),a.refuse=this.rejectReason,a.review_id=this.rejectValue.review_id,a.review_name=this.rejectValue.name),this.HttpClient.post("/admin/encyclopedias/changeStatus",a).then(function(a){console.log(a),200===a.data.code?(setTimeout(function(){e.getOthersList(),e.$message.success(a.data.msg)},500),1===t?e.approveDialog=!1:3===t?(e.disableDialog=!1,e.rejectValue="",e.rejectReason=""):0===t&&(e.deleteDialog=!1)):e.$message.error(a.data.msg)})},checkInfo:function(t){var e=this;this.HttpClient.post("/admin/encyclopedias/getInfo",{id:t}).then(function(t){console.log(t),200===t.data.code&&(e.previewData=t.data.data,e.previewData.cover=e.Tools.handleImg(e.previewData.cover[0].path),console.log(e.previewData),e.firstCatalogue=c()(e.previewData.menu),e.secondCatalogue=e.firstCatalogue[0].child)})},rejectButton:function(t){this.id=t,this.getRejectList(),this.disableDialog=!0},agreeButton:function(t){this.id=t,this.approveDialog=!0},deleteButton:function(t){this.id=t,this.deleteDialog=!0},previewButton:function(t){console.log(t),this.viewDialog=!0,this.checkInfo(t.id)},currentButton:function(t){alert("跳转前台页面")},rejectConfirm:function(){this.changeStatus(3)},agreeConfirm:function(){this.changeStatus(1)},deleteConfirm:function(t){console.log(t),t&&this.changeStatus(0)},firstClick:function(t,e){this.firstId=t,this.firstIndex=e,this.secondCatalogue=this.firstCatalogue[e].child},secondClick:function(t){this.secondIndex=t},sourceClick:function(t){this.sourceIndex=t},previewPic:function(t,e){-1===e.indexOf("jpg")&&-1===e.indexOf("png")||(this.viewDialogChildren=!0,this.imageUrl=-1!==t.indexOf("http")?t:this.Tools.handleImg(t))},currentChange:function(t){this.currentPage=t,this.getOthersList()},renderEncyclopediaStatus:function(t,e){var a=this;e.column;return t("el-select",{props:{value:"通过状态",placeholder:"通过状态"},on:{input:function(t){console.log(t),a.headerSelect=t,a.getOthersList()}}},[this.headerOptions.map(function(e){return t("el-option",{props:{value:e.status,label:e.text}})})])},renderEncyclopediaAuditStatus:function(t,e){var a=this;e.column;return t("el-select",{props:{value:"审核状态",placeholder:"审核状态"},on:{input:function(t){console.log(t),a.headerAuditSelect=t,a.getOthersList()}}},[this.headerAuditOptions.map(function(e){return t("el-option",{props:{value:e.status,label:e.text}})})])},renderEncyclopediaType:function(t,e){var a=this;e.column;return t("el-select",{props:{value:"用户类别",placeholder:"用户类别"},on:{input:function(t){console.log(t),a.headerTypeSelect=t,a.getOthersList()}}},[this.headerTypeOptions.map(function(e){return t("el-option",{props:{value:e.status,label:e.text}})})])},renderEncyclopediaCategory:function(t,e){var a=this;e.column;return t("el-select",{props:{value:"所属板块",placeholder:"所属板块"},on:{input:function(t){console.log(t),a.headerCategorySelect=t,a.getOthersList()}}},[this.headerCategoryOptions.map(function(e){return t("el-option",{props:{value:e.menu_id,label:e.name}})})])}},beforeCreate:function(){var t=this;return o()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/menu/getList",{menu_type:2,type:0}).then(function(e){console.log(e),200===e.data.code&&(t.headerCategoryOptions=c()(e.data.data),t.headerCategoryOptions.unshift({name:"全部",menu_id:""}))});case 2:case"end":return e.stop()}},e,t)}))()},created:function(){this.getOthersList()}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"othersEdit"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"othersEdit_main"},[t._m(0),t._v(" "),a("div",{staticClass:"othersEdit_content"},[a("div",{staticClass:"survey_header"},[a("div",{staticClass:"survey_select"},[a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("开始")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期"},on:{change:t.getOthersList},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}})],1),t._v(" "),a("div",{staticClass:"date_item"},[a("p",{staticClass:"date_label"},[t._v("截止")]),t._v(" "),a("el-date-picker",{staticClass:"date_picker_1",attrs:{type:"date",size:"mini","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期"},on:{change:t.getOthersList},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}})],1)]),t._v(" "),a("div",{staticClass:"survey_search"},[a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"用户名搜索",clearable:""},on:{clear:t.getOthersList},nativeOn:{keyup:function(e){return"button"in e||13===e.keyCode?t.getOthersList(e):null}},model:{value:t.userNameSearch,callback:function(e){t.userNameSearch=e},expression:"userNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getOthersList},slot:"append"})],1)],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"昵称搜索",clearable:""},on:{clear:t.getOthersList},nativeOn:{keyup:function(e){return"button"in e||13===e.keyCode?t.getOthersList(e):null}},model:{value:t.nickNameSearch,callback:function(e){t.nickNameSearch=e},expression:"nickNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getOthersList},slot:"append"})],1)],1)])]),t._v(" "),a("div",{staticClass:"survey_content_box"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"ID",align:"center",width:"80",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"百科标题",align:"center","show-overflow-tooltip":"",width:"200",prop:"title"}}),t._v(" "),a("el-table-column",{attrs:{label:"昵称",align:"center",width:"140","show-overflow-tooltip":"",prop:"nickname"}}),t._v(" "),a("el-table-column",{attrs:{label:"用户名",align:"center","show-overflow-tooltip":"",width:"140",prop:"username"}}),t._v(" "),a("el-table-column",{attrs:{label:"所属板块",align:"center","show-overflow-tooltip":"","render-header":t.renderEncyclopediaCategory,width:"120",prop:"category.folder_name"}}),t._v(" "),a("el-table-column",{attrs:{label:"用户类别","show-overflow-tooltip":"",align:"center","render-header":t.renderEncyclopediaType,width:"120",prop:"user_type"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                            "+t._s(1===e.row.user_type?"个人用户":2===e.row.user_type?"专业商家":"普通商家")+"\n                        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间",align:"center","show-overflow-tooltip":"",width:"110",prop:"created_at",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"通过状态",align:"center","show-overflow-tooltip":"","render-header":t.renderEncyclopediaStatus,width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                            "+t._s(2===e.row.status||3===e.row.status?"未通过":"已通过")+"\n                        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"审核状态",align:"center","show-overflow-tooltip":"","render-header":t.renderEncyclopediaAuditStatus,width:"120",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                            "+t._s(2===e.row.status?"待审核":"已审核")+"\n                        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"survey_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[2===e.row.status||1===e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.rejectButton(e.row.encyclopedia_id)}}},[t._v("驳回")]):t._e(),t._v(" "),2===e.row.status||3===e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.agreeButton(e.row.encyclopedia_id)}}},[t._v("批准")]):t._e(),t._v(" "),3===e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.deleteButton(e.row.encyclopedia_id)}}},[t._v("删除")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.previewButton(e.row)}}},[t._v("预览")]),t._v(" "),1!==e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.currentButton(e.row.source_int_id)}}},[t._v("当前百科")]):t._e()]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.disableDialog},on:{"update:visible":function(e){t.disableDialog=e}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),t._v("驳回")]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("理由：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",rows:4},model:{value:t.rejectReason,callback:function(e){t.rejectReason=e},expression:"rejectReason"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("类别：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},t._l(t.rejectList,function(e){return a("el-radio",{key:e.id,attrs:{border:"",label:e},model:{value:t.rejectValue,callback:function(e){t.rejectValue=e},expression:"rejectValue"}},[t._v(t._s(e.name))])}))]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.disableDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.rejectConfirm}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.approveDialog,width:"470px","custom-class":"approveDialog"},on:{"update:visible":function(e){t.approveDialog=e}}},[a("span",{staticClass:"approveDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),a("div",{staticClass:"approveDialog_main"},[a("i",{staticClass:"iconfont icon-warning-circle"}),t._v(" "),a("div",{staticClass:"approveDialog_text"},[t._v("确认批准吗？")])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.approveDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.agreeConfirm}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.deleteDialog,width:"470px","custom-class":"approveDialog"},on:{"update:visible":function(e){t.deleteDialog=e}}},[a("span",{staticClass:"approveDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),a("div",{staticClass:"approveDialog_main"},[a("i",{staticClass:"iconfont icon-warning-circle"}),t._v(" "),a("div",{staticClass:"approveDialog_text"},[t._v("确认删除吗？")])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.deleteDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.deleteConfirm}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{"min-width":"800px","custom-class":"viewDialog",visible:t.viewDialog},on:{"update:visible":function(e){t.viewDialog=e}}},[a("span",{staticClass:"viewDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-chakan"}),t._v("预览")]),t._v(" "),a("div",{staticClass:"view_dialog_box"},[a("div",{staticClass:"encyclopediaData_content"},[a("div",{staticClass:"encyclopedia_content_item"},[a("div",{staticClass:"encyclopedia_title"},[t._v("标题")]),t._v(" "),a("div",{staticClass:"encyclopedia_body"},[a("div",{staticClass:"encyclopedia_content"},[t._v(t._s(t.previewData.title))])])]),t._v(" "),a("div",{staticClass:"encyclopedia_content_item"},[a("div",{staticClass:"encyclopedia_title"},[t._v("封面图片")]),t._v(" "),a("div",{staticClass:"encyclopedia_body"},[a("div",{staticClass:"encyclopedia_content"},[t.previewData.cover?a("img",{attrs:{src:t.previewData.cover,alt:""}}):t._e()])])]),t._v(" "),a("div",{staticClass:"encyclopedia_content_item encyclopedia_content_items"},[a("div",{staticClass:"encyclopedia_title"},[t._v("简介")]),t._v(" "),a("div",{staticClass:"encyclopedia_body"},[a("div",{staticClass:"encyclopedia_textarea"},[a("div",{staticClass:"encyclopedia_content"},[t._v(t._s(t.previewData.content?t.previewData.content:"无"))])])])]),t._v(" "),a("div",{staticClass:"encyclopedia_content_item"},[a("div",{staticClass:"encyclopedia_title"},[t._v("一级目录")]),t._v(" "),a("div",{staticClass:"encyclopedia_body"},t._l(t.firstCatalogue,function(e,i){return a("div",{key:e.id,staticClass:"encyclopedia_first_catalogue"},[a("div",{staticClass:"encyclopedia_catalogue",class:{is_active:i===t.firstIndex},on:{click:function(a){t.firstClick(e.id,i)}}},[t._v("\n                                "+t._s(e.name)+"\n                            ")])])}))]),t._v(" "),a("div",{staticClass:"encyclopedia_content_item"},[a("div",{staticClass:"encyclopedia_title"},[t._v("一级目录内容")]),t._v(" "),a("div",{staticClass:"encyclopedia_body"},[a("div",{staticClass:"encyclopedia_content",domProps:{innerHTML:t._s(t.firstCatalogue?t.firstCatalogue[t.firstIndex].content:"")}})])]),t._v(" "),a("div",{staticClass:"encyclopedia_content_item"},[a("div",{staticClass:"encyclopedia_title"},[t._v("二级目录")]),t._v(" "),a("div",{staticClass:"encyclopedia_body"},t._l(t.secondCatalogue,function(e,i){return a("div",{key:e.id,staticClass:"encyclopedia_first_catalogue"},[a("div",{staticClass:"encyclopedia_catalogue",class:{is_active:i===t.secondIndex},on:{click:function(e){t.secondClick(i)}}},[t._v("\n                                "+t._s(e.name)+"\n                            ")])])}))]),t._v(" "),a("div",{staticClass:"encyclopedia_content_item"},[a("div",{staticClass:"encyclopedia_title"},[t._v("二级目录内容")]),t._v(" "),a("div",{staticClass:"encyclopedia_body"},[a("div",{staticClass:"encyclopedia_content",domProps:{innerHTML:t._s(t.secondCatalogue?t.secondCatalogue[t.secondIndex].content:"")}})])]),t._v(" "),a("div",{staticClass:"encyclopedia_content_item"},[a("div",{staticClass:"encyclopedia_title"},[t._v("标签")]),t._v(" "),a("div",{staticClass:"encyclopedia_body"},t._l(t.previewData.label,function(e){return a("div",{key:e.id,staticClass:"encyclopedia_first_catalogue"},[a("div",{staticClass:"encyclopedia_catalogue"},[t._v(t._s(e.name))])])}))]),t._v(" "),a("div",{staticClass:"encyclopedia_content_item"},[a("div",{staticClass:"encyclopedia_title"},[t._v("文献")]),t._v(" "),a("div",{staticClass:"encyclopedia_body"},t._l(t.previewData.source,function(e,i){return a("div",{key:e.source_id,staticClass:"encyclopedia_first_catalogue"},[a("div",{staticClass:"encyclopedia_catalogue",class:{is_active:i===t.sourceIndex},on:{click:function(e){t.sourceClick(i)}}},[t._v("\n                                "+t._s(e.source_name)+"\n                            ")])])}))]),t._v(" "),a("div",{staticClass:"encyclopedia_content_item"},[a("div",{staticClass:"encyclopedia_title"},[t._v("对应链接")]),t._v(" "),a("div",{staticClass:"encyclopedia_body"},[a("div",{staticClass:"encyclopedia_content"},[t._v(t._s(t.previewData.source?t.previewData.source[t.sourceIndex].link:""))])])]),t._v(" "),a("div",{staticClass:"encyclopedia_content_item"},[a("div",{staticClass:"encyclopedia_title"},[t._v("附件")]),t._v(" "),a("div",{staticClass:"encyclopedia_body"},[a("div",{staticClass:"encyclopedia_content"},t._l(t.previewData.attachment,function(e,i){return a("p",{key:i,staticClass:"encyclopedia_attachment",on:{click:function(a){t.previewPic(e.path,e.name)}}},[a("i",{staticClass:"iconfont icon-wenjian"}),t._v("\n                                "+t._s(e.name)+"\n                            ")])}))])])]),t._v(" "),a("el-dialog",{attrs:{width:"30%",visible:t.viewDialogChildren,"append-to-body":""},on:{"update:visible":function(e){t.viewDialogChildren=e}}},[a("div",{staticClass:"view_upload_bigImg"},[a("img",{attrs:{src:t.imageUrl,alt:""}})])])],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.viewDialog=!1}}},[t._v("关闭")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("他人编辑")])])}]};var v=a("VU/8")(u,p,!1,function(t){a("jMfY")},null,null);e.default=v.exports}});