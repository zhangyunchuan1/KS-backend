webpackJsonp([51],{"9Iud":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"AuthorityManagement",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"商家管理",urls:"/index/businessUser/BusinessUser",icon:"icon-home"},{id:2,name:"商家账户",urls:"/index/market/businessUser/businessAccount/BusinessAccount",icon:"icon-home"},{id:3,name:"权限管理",urls:"/index/market/businessUser/businessAccount/AuthorityManagement",icon:"icon-home"}],companyNameSearch:"",accountSearch:"",phoneNumberSearch:"",accountNameSearch:"",tableData:[],modifyContactDialog:!1,roleDialog:!1,roleRadio:2,modifyCompanyDialog:!1,modifyObj:{},contacts:null,telephone:null,total:null,currentPage:1}},mounted:function(){this.getBusinessLists()},methods:{handleCompanyNameSearch:function(){this.getBusinessLists()},handleAccountSearch:function(){this.getBusinessLists()},handlePhoneNumberSearch:function(){this.getBusinessLists()},handleAccountNameSearch:function(){this.getBusinessLists()},getBusinessLists:function(){var t=this;this.HttpClient.post("/admin/business/lists",{size:25,page:this.currentPage,company_name:this.companyNameSearch,user_name:this.accountSearch,phone:this.phoneNumberSearch,contacts:this.accountNameSearch}).then(function(e){t.tableData=e.data.data.data,t.total=e.data.data.total,t.companyNameSearch="",t.accountSearch="",t.phoneNumberSearch=""})},updateRole:function(t){this.modifyObj=t,this.roleDialog=!0},handleUpdateRole:function(){var t=this,e={uid:this.modifyObj.uid,type:this.roleRadio};this.HttpClient.post("/admin/business/updateType",e).then(function(e){var a=e.data,s=a.code,o=a.msg;200===s?(t.$message.success(o),t.roleDialog=!1,setTimeout(function(){t.getBusinessLists()},500)):t.$message.error(o)})},handleUpdateContacts:function(t){console.log(t),this.modifyObj=t,this.contacts=t.contacts,this.telephone=t.phone,this.modifyContactDialog=!0},handleSaveUpdate:function(){var t=this;this.HttpClient.post("/admin/business/updateContact",{uid:this.modifyObj.uid,contacts:this.contacts,telphone:this.telephone}).then(function(e){var a=e.data,s=a.code,o=a.msg;200===s?(t.$message.success(o),t.contacts="",t.telephone="",t.modifyContactDialog=!1,setTimeout(function(){t.getBusinessLists()},500)):t.$message.error(o)})},handleModifyInfo:function(t){var e=this;this.HttpClient.get("/admin/business/editProfile",{company_id:t}).then(function(t){console.log(t.data),e.modifyObj=t.data.data}),this.modifyCompanyDialog=!0},handleSaveInfo:function(){var t=this;console.log(this.modifyObj),this.HttpClient.post("/admin/business/editProfile",{company_id:this.modifyObj.company_id,nickname:this.modifyObj.name,register_logo:this.modifyObj.register_logo,license_num:this.modifyObj.license_num,legal_person:this.modifyObj.legal_person,legal_idcard:this.modifyObj.legal_idcard,address_register:this.modifyObj.address_register,address_manage:this.modifyObj.address_manage,duty:this.modifyObj.duty}).then(function(e){var a=e.data,s=a.code,o=a.msg;200===s?(t.$message.success(o),t.modifyCompanyDialog=!1,setTimeout(function(){t.getBusinessLists()},500)):t.$message.error(o)})},currentChange:function(t){this.currentPage=t,this.getBusinessLists()}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"authorityManagement"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"authorityManagement_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_header"},[a("div",{staticClass:"content_header_search"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"公司对外名称搜索"},model:{value:t.companyNameSearch,callback:function(e){t.companyNameSearch=e},expression:"companyNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleCompanyNameSearch},slot:"append"})],1),t._v(" "),a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"公司注册名称搜索"},model:{value:t.accountSearch,callback:function(e){t.accountSearch=e},expression:"accountSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleAccountSearch},slot:"append"})],1),t._v(" "),a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"手机搜索"},model:{value:t.phoneNumberSearch,callback:function(e){t.phoneNumberSearch=e},expression:"phoneNumberSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handlePhoneNumberSearch},slot:"append"})],1),t._v(" "),a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"联系人搜索"},model:{value:t.accountNameSearch,callback:function(e){t.accountNameSearch=e},expression:"accountNameSearch"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleAccountNameSearch},slot:"append"})],1)],1)]),t._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"商家ID",align:"center",width:"90",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"商家昵称",align:"center",width:"130","show-overflow-tooltip":"",prop:"username"}}),t._v(" "),a("el-table-column",{attrs:{label:"工商注册全称",align:"center","show-overflow-tooltip":"",width:"240",prop:"company_name"}}),t._v(" "),a("el-table-column",{attrs:{label:"电话",align:"center","show-overflow-tooltip":"",width:"150",prop:"phone"}}),t._v(" "),a("el-table-column",{attrs:{label:"登陆状态",align:"center",width:"130",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.status?a("span",[t._v("正常")]):t._e(),t._v(" "),3===e.row.status||5===e.row.status?a("span",[t._v("禁用")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"联系人姓名",align:"center",width:"140",prop:"contacts"}}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间",align:"center",width:"150","show-overflow-tooltip":"",prop:"created_at",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"mallReview_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"mallReview_btm"},[a("el-button",{on:{click:function(a){t.handleUpdateContacts(e.row)}}},[t._v("更新联系人")]),t._v(" "),a("el-button",{on:{click:function(a){t.handleModifyInfo(e.row.company_id)}}},[t._v("修改公司登记信息")]),t._v(" "),a("el-button",[t._v("查看公司简介")]),t._v(" "),a("el-button",{on:{click:function(a){t.updateRole(e.row)}}},[t._v("角色分配")])],1)]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":25},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),a("el-dialog",{attrs:{width:"280px","custom-class":"modifyContactDialog",visible:t.modifyContactDialog},on:{"update:visible":function(e){t.modifyContactDialog=e}}},[a("span",{staticClass:"modifyContactDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-edit-square"}),t._v("更新联系人")]),t._v(" "),a("div",{staticClass:"modifyContact_dialog_box"},[a("el-input",{attrs:{placeholder:"联系人姓名"},model:{value:t.contacts,callback:function(e){t.contacts=e},expression:"contacts"}}),t._v(" "),a("el-input",{attrs:{placeholder:"公司联系电话"},model:{value:t.telephone,callback:function(e){t.telephone=e},expression:"telephone"}})],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.modifyContactDialog=!1}}},[t._v("关 闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveUpdate}},[t._v("保 存")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"280px","custom-class":"roleDialog",visible:t.roleDialog},on:{"update:visible":function(e){t.roleDialog=e}}},[a("span",{staticClass:"roleDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-team"}),t._v("角色分配")]),t._v(" "),a("div",{staticClass:"role_dialog_box"},[a("el-radio-group",{model:{value:t.roleRadio,callback:function(e){t.roleRadio=e},expression:"roleRadio"}},[a("el-radio-button",{attrs:{label:2}},[t._v("专业商家")]),t._v(" "),a("el-radio-button",{attrs:{label:3}},[t._v("普通商家")])],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.roleDialog=!1}}},[t._v("关 闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleUpdateRole}},[t._v("保 存")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"700px","custom-class":"modifyCompany",visible:t.modifyCompanyDialog},on:{"update:visible":function(e){t.modifyCompanyDialog=e}}},[a("span",{staticClass:"modifyCompany_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-edit-square"}),t._v("修改公司登记信息")]),t._v(" "),a("div",{staticClass:"modifyCompany_box"},[a("div",{staticClass:"reviewList"},[a("span",[t._v("公司全称")]),t._v(" "),a("el-input",{attrs:{placeholder:"公司全称（无字数限制，无特殊字符）"},model:{value:t.modifyObj.name,callback:function(e){t.$set(t.modifyObj,"name",e)},expression:"modifyObj.name"}})],1),t._v(" "),a("div",{staticClass:"reviewList"},[a("span",[t._v("公司对外名字或者注册商标名称")]),t._v(" "),a("el-input",{attrs:{placeholder:"填写公司对外名字或者注册商标名称（汉字和英文加数字）"},model:{value:t.modifyObj.register_logo,callback:function(e){t.$set(t.modifyObj,"register_logo",e)},expression:"modifyObj.register_logo"}})],1),t._v(" "),a("div",{staticClass:"reviewList"},[a("span",[t._v("执照号")]),t._v(" "),a("el-input",{attrs:{placeholder:"执照号（数字和英文字母）"},model:{value:t.modifyObj.license_num,callback:function(e){t.$set(t.modifyObj,"license_num",e)},expression:"modifyObj.license_num"}})],1),t._v(" "),a("div",{staticClass:"reviewList"},[a("span",[t._v("公司法人姓名")]),t._v(" "),a("el-input",{attrs:{placeholder:"公司法人姓名（中英文）"},model:{value:t.modifyObj.legal_person,callback:function(e){t.$set(t.modifyObj,"legal_person",e)},expression:"modifyObj.legal_person"}})],1),t._v(" "),a("div",{staticClass:"reviewList"},[a("span",[t._v("法人身份证号")]),t._v(" "),a("el-input",{attrs:{placeholder:"法人身份证号（数字+英文）"},model:{value:t.modifyObj.legal_idcard,callback:function(e){t.$set(t.modifyObj,"legal_idcard",e)},expression:"modifyObj.legal_idcard"}})],1),t._v(" "),a("div",{staticClass:"reviewList"},[a("span",[t._v("公司注册地址")]),t._v(" "),a("el-input",{attrs:{placeholder:"公司注册地址"},model:{value:t.modifyObj.address_register,callback:function(e){t.$set(t.modifyObj,"address_register",e)},expression:"modifyObj.address_register"}})],1),t._v(" "),a("div",{staticClass:"reviewList"},[a("span",[t._v("公司经营地址")]),t._v(" "),a("el-input",{attrs:{placeholder:"公司经营地址"},model:{value:t.modifyObj.address_manage,callback:function(e){t.$set(t.modifyObj,"address_manage",e)},expression:"modifyObj.address_manage"}})],1),t._v(" "),a("div",{staticClass:"reviewList"},[a("span",[t._v("公司税号")]),t._v(" "),a("el-input",{attrs:{placeholder:"公司税号"},model:{value:t.modifyObj.duty,callback:function(e){t.$set(t.modifyObj,"duty",e)},expression:"modifyObj.duty"}})],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.modifyCompanyDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveInfo}},[t._v("保 存")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("权限管理")])])}]};var i=a("VU/8")(s,o,!1,function(t){a("s3EQ")},null,null);e.default=i.exports},s3EQ:function(t,e){}});