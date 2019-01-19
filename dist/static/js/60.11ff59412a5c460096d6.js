webpackJsonp([60],{EMXa:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"UserStatus",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"用户管理",urls:"/index/standardUser/StandardUser",icon:"icon-home"},{id:2,name:"用户账户",urls:"/index/standardUser/userManagement/UserManagement",icon:"icon-home"},{id:3,name:"用户状态",urls:"/index/standardUser/userManagement/UserStatus",icon:"icon-home"}],nickNameSearch:"",userNameSearch:"",tableData:[],currentObj:{},disableDialog:!1,textarea:null,disableDialogRadio:null,imageUrl:"",uploadImgUrl:"",examineList:[],forbiddenDays:null,restoreDialog:!1,viewImageDialog:!1,evidenceObj:{},total:null,currentPage:1}},mounted:function(){this.getUserStatusList()},methods:{getUserStatusList:function(){var t=this;this.HttpClient.post("/admin/forbidden/userLists",{size:25,page:this.currentPage,nickname:this.nickNameSearch,username:this.userNameSearch}).then(function(e){for(var a in console.log(e),t.tableData=e.data.data.data,t.total=e.data.data.total,t.tableData){var i=new Date(t.tableData[a].created_at),s=new Date(t.tableData[a].disable_end);t.tableData[a].surplusDay=parseInt((s-i)/864e5)}})},handleProhibit:function(t){console.log(t),this.currentObj=t,this.disableDialog=!0,this.getExamineList()},handleSaveProhibit:function(){var t=this;this.HttpClient.post("/admin/forbidden/create",{uid:this.currentObj.uid,content:this.textarea,limit_day:this.forbiddenDays,review_id:this.disableDialogRadio.review_id,review_name:this.disableDialogRadio.name,images:this.uploadImgUrl}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),t.textarea="",t.disableDialogRadio="",t.forbiddenDays="",t.imageUrl="",setTimeout(function(){t.getUserStatusList(),t.disableDialog=!1},500))}),this.restoreDialog=!1,this.disable=!0},getExamineList:function(){var t=this;this.HttpClient.post("/admin/webReview/getList",{type:"users"}).then(function(e){console.log(e),t.examineList=e.data.data})},handleRecovery:function(t){this.currentObj=t,this.restoreDialog=!0},handleSaveRecovery:function(){var t=this;this.HttpClient.post("/admin/forbidden/recovery",{uid:this.currentObj.uid}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getUserStatusList(),t.restoreDialog=!1},500))})},handleSeePic:function(t){var e=this;console.log(t),this.HttpClient.post("/admin/forbidden/imageInfo",{uid:t.uid}).then(function(t){console.log(t),e.evidenceObj=t.data.data,console.log(e.evidenceObj),e.evidenceObj.images=JSON.parse(e.evidenceObj.images),e.viewImageDialog=!0})},handleNickNameSearch:function(){this.getUserStatusList()},handleUserNameSearch:function(){this.getUserStatusList()},handleAvatarSuccess:function(t,e){this.imageUrl=URL.createObjectURL(e.raw)},beforeAvatarUpload:function(t){var e=this;this.HttpClient.form("/admin/uploadOneImage",{images:t}).then(function(t){console.log(t),200===t.data.code?(e.$message.success(t.data.msg),e.uploadImgUrl=t.data.path):e.$message.error(t.data.msg)})},currentChange:function(t){this.currentPage=t,this.getUserStatusList()}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"userStatus"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"userStatus_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_header"},[a("div",{staticClass:"content_header_search"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"昵称搜索"},model:{value:t.nickNameSearch,callback:function(e){t.nickNameSearch=e},expression:"nickNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleNickNameSearch},slot:"append"})],1),t._v(" "),a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"用户名搜索"},model:{value:t.userNameSearch,callback:function(e){t.userNameSearch=e},expression:"userNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleUserNameSearch},slot:"append"})],1)],1)]),t._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"ID",align:"center",width:"90",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"140","show-overflow-tooltip":"",prop:"nickname"}}),t._v(" "),a("el-table-column",{attrs:{label:"用户名",align:"center",width:"140","show-overflow-tooltip":"",prop:"username"}}),t._v(" "),a("el-table-column",{attrs:{label:"电话",align:"center","show-overflow-tooltip":"",width:"150",prop:"phone"}}),t._v(" "),a("el-table-column",{attrs:{label:"登陆状态",align:"center","show-overflow-tooltip":"",width:"150",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.status?a("span",[t._v("正常")]):t._e(),t._v(" "),3===e.row.status?a("span",[t._v("禁用")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"禁用次数",align:"center",width:"120",prop:"disable_num",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"剩余禁用时间（天）",align:"center",width:"200",prop:"surplusDay",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"禁用类别",align:"center","show-overflow-tooltip":"",width:"160",prop:"disable_name"}}),t._v(" "),a("el-table-column",{attrs:{label:"禁用理由",align:"center","show-overflow-tooltip":"",width:"160",prop:"disable_reason"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"table_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"scope_btm"},[1===e.row.status?a("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(a){t.handleProhibit(e.row)}}},[t._v("禁用")]):t._e(),t._v(" "),3===e.row.status?a("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(a){t.handleRecovery(e.row)}}},[t._v("恢复")]):t._e(),t._v(" "),3===e.row.status?a("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(a){t.handleSeePic(e.row)}}},[t._v("查看照片")]):t._e()],1)]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":25},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),a("el-dialog",{attrs:{width:"580px","custom-class":"disableDialog",visible:t.disableDialog},on:{"update:visible":function(e){t.disableDialog=e}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),t._v("禁用")]),t._v(" "),a("div",{staticClass:"disableDialog_main"},[a("div",{staticClass:"disableDialog_left"},[a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("理由：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",rows:4},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("类别：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},t._l(t.examineList,function(e,i){return a("el-radio",{key:i,attrs:{border:"",label:e},model:{value:t.disableDialogRadio,callback:function(e){t.disableDialogRadio=e},expression:"disableDialogRadio"}},[t._v(t._s(e.name))])}))]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("自定义：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"number",placeholder:"输入自定义禁用天数"},model:{value:t.forbiddenDays,callback:function(e){t.forbiddenDays=e},expression:"forbiddenDays"}})],1)])]),t._v(" "),a("div",{staticClass:"disableDialog_right"},[a("p",[t._v("上传截图：")]),t._v(" "),a("el-upload",{staticClass:"screenshot-uploader",attrs:{action:"http://test.kslab.com/api/article/null","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.imageUrl?a("img",{staticClass:"screenshot",attrs:{src:t.imageUrl}}):a("i",{staticClass:"el-icon-plus screenshot-uploader-icon"})])],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.disableDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveProhibit}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"400px","custom-class":"restoreDialog",visible:t.restoreDialog},on:{"update:visible":function(e){t.restoreDialog=e}}},[a("span",{staticClass:"restoreDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huifu"}),t._v("恢复")]),t._v(" "),a("div",{staticClass:"restore_dialog_box"},[a("i",{staticClass:"iconfont icon-warning-circle"}),t._v(" "),a("p",[t._v("确认恢复吗？")])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.restoreDialog=!1}}},[t._v("关 闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveRecovery}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"400px","custom-class":"viewImageDialog",visible:t.viewImageDialog},on:{"update:visible":function(e){t.viewImageDialog=e}}},[a("span",{staticClass:"viewImageDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-image"}),t._v("查看图片")]),t._v(" "),a("div",{staticClass:"viewImage_dialog_box"},[a("img",{attrs:{src:t.Tools.handleImg(t.evidenceObj.images),alt:""}}),t._v(" "),a("p",[a("span",[t._v(t._s(t.evidenceObj.username))]),t._v(" "),a("span",[t._v(t._s(t.evidenceObj.disable_end))])])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("用户状态")])])}]};var l=a("VU/8")(i,s,!1,function(t){a("bwap")},null,null);e.default=l.exports},bwap:function(t,e){}});