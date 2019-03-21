webpackJsonp([100],{"4UoL":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"businessReview",components:{BreadCrumb:i("ZPfm").a},data:function(){return{breadData:[{id:1,name:"商家管理",urls:"/index/businessUser/BusinessUser",icon:"icon-home"},{id:2,name:"商家账户",urls:"/index/market/businessUser/businessAccount/BusinessAccount",icon:"icon-home"},{id:3,name:"商家资质审核",urls:"/index/market/businessUser/businessAccount/BusinessReview",icon:"icon-home"}],companyNameSearch:"",accountSearch:"",phoneNumberSearch:"",contactsSearch:"",tableData:[],approval:!0,turnDown:!1,modifyQualification:!1,viewLicenseDialog:!1,viewLicenseImage:"",currentObj:null,modifyLicenseDialog:!1,imageUrl:"",uploadImgUrl:"",reviewDialog:!1,reviewObj:{},turnDownDialog:!1,textarea:"",turnDownDialogRadio:null,rejectList:[],modifyQualificationDialog:!1,modifyObj:{},total:null,currentPage:1,input1:!1,input2:!1}},mounted:function(){this.getBusinessLists()},methods:{getBusinessLists:function(){var t=this;this.HttpClient.post("/admin/business/lists",{size:25,page:this.currentPage,company_name:this.companyNameSearch,user_name:this.accountSearch,phone:this.phoneNumberSearch,contacts:this.contactsSearch}).then(function(e){console.log(e),t.tableData=e.data.data.data,t.total=e.data.data.total,t.companyNameSearch="",t.accountSearch="",t.phoneNumberSearch=""})},handleCompanyNameSearch:function(){this.getBusinessLists()},handleAccountSearch:function(){this.getBusinessLists()},handlePhoneNumberSearch:function(){this.getBusinessLists()},handleAccountNameSearch:function(){this.getBusinessLists()},handleSeeLicense:function(t){this.viewLicenseImage=t,this.viewLicenseDialog=!0},handleModifyLicense:function(t){this.currentObj=t,this.modifyLicenseDialog=!0},handleExamine:function(t){var e=this;this.currentObj=t,this.HttpClient.get("/admin/business/editProfile",{company_id:t.company_id}).then(function(t){console.log(t),e.reviewObj=t.data.data}),this.reviewDialog=!0},reviewBtm:function(){var t=this;this.HttpClient.post("/admin/business/changeStatus",{uid:this.currentObj.uid,status:1}).then(function(e){200===e.data.code?(t.$message.success(e.data.msg),setTimeout(function(){t.getBusinessLists(),t.modifyLicenseDialog=!1,t.reviewDialog=!1},500)):t.$message.error(e.data.msg)}),this.approval=!1,this.turnDown=!0},handleModifyQualification:function(t){var e=this;this.HttpClient.get("/admin/business/editProfile",{company_id:t}).then(function(t){console.log(t),e.modifyObj=t.data.data}),this.modifyQualificationDialog=!0},handleSaveModify:function(){var t=this;this.HttpClient.post("/admin/business/editProfile",{company_id:this.modifyObj.company_id,name:this.modifyObj.name,nickname:this.modifyObj.register_logo,license_num:this.modifyObj.license_num,legal_person:this.modifyObj.legal_person,legal_idcard:this.modifyObj.legal_idcard,address_register:this.modifyObj.address_register,address_manage:this.modifyObj.address_manage,duty:this.modifyObj.duty,contacts:this.modifyObj.contacts,telphone:this.modifyObj.telphone}).then(function(e){var i=e.data,a=i.code,s=i.msg;200===a?(t.$message.success(s),t.modifyQualificationDialog=!1,setTimeout(function(){t.getBusinessLists()},500)):t.$message.error(s)})},handleReject:function(t){var e=this;this.currentObj=t,console.log(t),this.HttpClient.post("/admin/webReview/getList",{type:"business"}).then(function(t){console.log(t),e.rejectList=t.data.data}),this.turnDownDialog=!0},turnDownBtm:function(){var t=this;console.log(this.textarea,this.turnDownDialogRadio),this.HttpClient.post("/admin/business/changeStatus",{uid:this.currentObj.uid,status:5,disable_reason:this.textarea,disable_id:this.turnDownDialogRadio}).then(function(e){console.log(e),setTimeout(function(){t.getBusinessLists()},500)}),this.turnDownDialog=!1,this.modifyQualification=!1},handleAvatarSuccess:function(t,e){this.imageUrl=URL.createObjectURL(e.raw)},beforeAvatarUpload:function(t,e){var i=this;console.log(t,e),this.HttpClient.form("/admin/uploadOneImage",{images:t}).then(function(t){console.log(t),200===t.data.code?(i.$message.success(t.data.msg),i.uploadImgUrl=t.data.path):i.$message.error(t.data.msg)})},handleSaveLicense:function(){var t=this;this.HttpClient.form("/admin/business/updateLicense",{uid:this.currentObj.uid,license:this.uploadImgUrl}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),t.uploadImgUrl="",t.currentObj=null,t.modifyLicenseDialog=!1,setTimeout(function(){t.getBusinessLists()},500))})},currentChange:function(t){this.currentPage=t,this.getBusinessLists()},inputCheck1:function(t){new RegExp("[\\u4E00-\\u9FFF]+","g").test(t)?this.input1=!0:this.input1=!1},inputCheck2:function(t){new RegExp("[\\u4E00-\\u9FFF]+","g").test(t)?this.input2=!0:this.input2=!1}}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"businessReview"},[i("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),i("div",{staticClass:"businessReview_main"},[t._m(0),t._v(" "),i("div",{staticClass:"content"},[i("div",{staticClass:"content_header"},[i("div",{staticClass:"content_header_search"},[i("el-input",{staticClass:"input-with-select",attrs:{placeholder:"公司名称搜索"},model:{value:t.companyNameSearch,callback:function(e){t.companyNameSearch=e},expression:"companyNameSearch"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleCompanyNameSearch},slot:"append"})],1),t._v(" "),i("el-input",{staticClass:"input-with-select",attrs:{placeholder:"账号搜索"},model:{value:t.accountSearch,callback:function(e){t.accountSearch=e},expression:"accountSearch"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleAccountSearch},slot:"append"})],1),t._v(" "),i("el-input",{staticClass:"input-with-select",attrs:{placeholder:"手机搜索"},model:{value:t.phoneNumberSearch,callback:function(e){t.phoneNumberSearch=e},expression:"phoneNumberSearch"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handlePhoneNumberSearch},slot:"append"})],1),t._v(" "),i("el-input",{staticClass:"input-with-select",attrs:{placeholder:"联系人姓名搜索"},model:{value:t.contactsSearch,callback:function(e){t.contactsSearch=e},expression:"contactsSearch"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleAccountNameSearch},slot:"append"})],1)],1)]),t._v(" "),i("div",{staticClass:"content_table"},[i("el-table",{attrs:{data:t.tableData,border:!0}},[i("el-table-column",{attrs:{label:"商家ID",align:"center",width:"90",prop:"id",sortable:""}}),t._v(" "),i("el-table-column",{attrs:{label:"公司全称",align:"center","show-overflow-tooltip":"",width:"230",prop:"company_name"}}),t._v(" "),i("el-table-column",{attrs:{label:"账号",align:"center","show-overflow-tooltip":"",width:"180",prop:"username"}}),t._v(" "),i("el-table-column",{attrs:{label:"联系人名称",align:"center",width:"120","show-overflow-tooltip":"",prop:"contacts"}}),t._v(" "),i("el-table-column",{attrs:{label:"联系电话",align:"center","show-overflow-tooltip":"",width:"140",prop:"phone"}}),t._v(" "),i("el-table-column",{attrs:{label:"申请时间",align:"center",width:"160","show-overflow-tooltip":"",prop:"created_at",sortable:""}}),t._v(" "),i("el-table-column",{attrs:{label:"通过状态",align:"center",width:"130",prop:"status","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.status?i("span",{staticClass:"normal_color"},[t._v("已通过")]):t._e(),t._v(" "),6===e.row.status||3===e.row.status||5===e.row.status||4===e.row.status?i("span",{staticClass:"notpass_color"},[t._v("未通过")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"审核状态",align:"center",width:"130",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return[4!==e.row.status?i("span",{staticClass:"top_color"},[t._v("已审核")]):t._e(),t._v(" "),4===e.row.status?i("span",{staticClass:"audit_color"},[t._v("未审核")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center","class-name":"mallReview_scope","min-width":"415",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"mallReview_btm"},[i("el-button",{attrs:{type:"primary",size:"mini",plain:""},on:{click:function(i){t.handleSeeLicense(e.row.license)}}},[t._v("查看执照")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini",plain:""},on:{click:function(i){t.handleModifyLicense(e.row)}}},[t._v("修改执照")]),t._v(" "),6===e.row.status||3===e.row.status||5===e.row.status||4===e.row.status?i("el-button",{attrs:{type:"primary",size:"mini",plain:""},on:{click:function(i){t.handleExamine(e.row)}}},[t._v("审核")]):t._e(),t._v(" "),1===e.row.status||4===e.row.status?i("el-button",{attrs:{type:"primary",size:"mini",plain:""},on:{click:function(i){t.handleReject(e.row)}}},[t._v("驳回")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini",plain:""},on:{click:function(i){t.handleModifyQualification(e.row.company_id)}}},[t._v("修改资质")])],1)]}}])})],1),t._v(" "),t.total?i("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":25},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),i("el-dialog",{attrs:{width:"470px","custom-class":"viewLicenseDialog",visible:t.viewLicenseDialog},on:{"update:visible":function(e){t.viewLicenseDialog=e}}},[i("span",{staticClass:"viewLicenseDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-chakan"}),t._v("查看执照")]),t._v(" "),i("div",{staticClass:"viewLicense_dialog_box"},[i("img",{attrs:{src:"http://cdn.kushualab.com/"+t.viewLicenseImage,alt:""}})]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.viewLicenseDialog=!1}}},[t._v("关 闭")])],1)]),t._v(" "),i("el-dialog",{attrs:{width:"470px","custom-class":"modifyLicenseDialog",visible:t.modifyLicenseDialog},on:{"update:visible":function(e){t.modifyLicenseDialog=e}}},[i("span",{staticClass:"modifyLicenseDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-edit-square"}),t._v("修改执照")]),t._v(" "),i("div",{staticClass:"modifyLicense_dialog_box"},[i("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://test.kslab.com/api/article/null","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.imageUrl?i("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):i("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveLicense}},[t._v("保 存")])],1)]),t._v(" "),i("el-dialog",{attrs:{width:"700px","custom-class":"reviewDialog",visible:t.reviewDialog},on:{"update:visible":function(e){t.reviewDialog=e}}},[i("span",{staticClass:"reviewDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-shenhe"}),t._v("审核")]),t._v(" "),i("div",{staticClass:"review_dialog_box"},[i("div",{staticClass:"reviewList"},[i("span",[t._v("公司全称")]),t._v(" "),i("p",[t._v(t._s(t.reviewObj.name))])]),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("公司对外名字或者注册商标名称")]),t._v(" "),i("p",[t._v(t._s(t.reviewObj.register_logo))])]),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("执照号")]),t._v(" "),i("p",[t._v(t._s(t.reviewObj.license_num))])]),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("公司法人姓名")]),t._v(" "),i("p",[t._v(t._s(t.reviewObj.legal_person))])]),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("法人身份证号")]),t._v(" "),i("p",[t._v(t._s(t.reviewObj.legal_idcard))])]),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("公司注册地址")]),t._v(" "),i("p",[t._v(t._s(t.reviewObj.address_register))])]),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("公司经营地址")]),t._v(" "),i("p",[t._v(t._s(t.reviewObj.address_manage))])]),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("公司税号")]),t._v(" "),i("p",[t._v(t._s(t.reviewObj.duty))])])]),t._v(" "),i("div",{staticClass:"contactInformation"},[i("div",{staticClass:"title"},[t._v("联系方式")]),t._v(" "),i("div",{staticClass:"contactInformation_main"},[i("p",[t._v(t._s(t.reviewObj.contacts))]),t._v(" "),i("p",[t._v(t._s(t.reviewObj.telphone))])])]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.reviewDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.reviewBtm}},[t._v("通 过")])],1)]),t._v(" "),i("el-dialog",{attrs:{width:"470px","custom-class":"turnDownDialog",visible:t.turnDownDialog},on:{"update:visible":function(e){t.turnDownDialog=e}}},[i("span",{staticClass:"turnDownDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-jinyong"}),t._v("驳回")]),t._v(" "),i("div",{staticClass:"turnDown_dialog_box"},[i("div",{staticClass:"turnDown_dialog_left"},[t._v("理由：")]),t._v(" "),i("div",{staticClass:"turnDown_dialog_right"},[i("el-input",{attrs:{type:"textarea",resize:"none",rows:4},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}})],1)]),t._v(" "),i("div",{staticClass:"turnDown_dialog_box"},[i("div",{staticClass:"turnDown_dialog_left"},[t._v("类别：")]),t._v(" "),i("div",{staticClass:"turnDown_dialog_right"},t._l(t.rejectList,function(e,a){return i("el-radio",{key:a,attrs:{border:"",label:e.review_id},model:{value:t.turnDownDialogRadio,callback:function(e){t.turnDownDialogRadio=e},expression:"turnDownDialogRadio"}},[t._v(t._s(e.name))])}))]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.turnDownDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.turnDownBtm}},[t._v("确 定")])],1)]),t._v(" "),i("el-dialog",{attrs:{width:"700px","custom-class":"modifyQualification",visible:t.modifyQualificationDialog},on:{"update:visible":function(e){t.modifyQualificationDialog=e}}},[i("span",{staticClass:"modifyQualification_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-edit-square"}),t._v("修改资质")]),t._v(" "),i("div",{staticClass:"modifyQualification_box"},[i("div",{staticClass:"reviewList"},[i("span",[t._v("公司全称")]),t._v(" "),i("el-input",{attrs:{placeholder:"公司全称（无字数限制，无特殊字符）"},model:{value:t.modifyObj.name,callback:function(e){t.$set(t.modifyObj,"name",e)},expression:"modifyObj.name"}})],1),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("公司对外名字或者注册商标名称")]),t._v(" "),i("el-input",{attrs:{placeholder:"填写公司对外名字或者注册商标名称（汉字和英文加数字）"},model:{value:t.modifyObj.nickname,callback:function(e){t.$set(t.modifyObj,"nickname",e)},expression:"modifyObj.nickname"}})],1),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("执照号")]),t._v(" "),i("el-input",{attrs:{placeholder:"执照号（数字和英文字母,不能输入中文）"},on:{blur:function(e){t.inputCheck1(t.modifyObj.license_num)}},model:{value:t.modifyObj.license_num,callback:function(e){t.$set(t.modifyObj,"license_num",e)},expression:"modifyObj.license_num"}}),t._v(" "),t.input1?i("p",{staticStyle:{color:"red","font-size":"12px","text-align":"right"}},[t._v("*执照号不能含有中文！")]):t._e()],1),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("公司法人姓名")]),t._v(" "),i("el-input",{attrs:{placeholder:"公司法人姓名（中英文）"},model:{value:t.modifyObj.legal_person,callback:function(e){t.$set(t.modifyObj,"legal_person",e)},expression:"modifyObj.legal_person"}})],1),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("法人身份证号")]),t._v(" "),i("el-input",{attrs:{placeholder:"法人身份证号（数字+英文）"},model:{value:t.modifyObj.legal_idcard,callback:function(e){t.$set(t.modifyObj,"legal_idcard",e)},expression:"modifyObj.legal_idcard"}})],1),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("公司注册地址")]),t._v(" "),i("el-input",{attrs:{placeholder:"公司注册地址"},model:{value:t.modifyObj.address_register,callback:function(e){t.$set(t.modifyObj,"address_register",e)},expression:"modifyObj.address_register"}})],1),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("公司经营地址")]),t._v(" "),i("el-input",{attrs:{placeholder:"公司经营地址"},model:{value:t.modifyObj.address_manage,callback:function(e){t.$set(t.modifyObj,"address_manage",e)},expression:"modifyObj.address_manage"}})],1),t._v(" "),i("div",{staticClass:"reviewList"},[i("span",[t._v("公司税号")]),t._v(" "),i("el-input",{attrs:{placeholder:"公司税号（不能输入中文）"},on:{blur:function(e){t.inputCheck2(t.modifyObj.duty)}},model:{value:t.modifyObj.duty,callback:function(e){t.$set(t.modifyObj,"duty",e)},expression:"modifyObj.duty"}}),t._v(" "),t.input2?i("p",{staticStyle:{color:"red","font-size":"12px","text-align":"right"}},[t._v("*公司税号不能含有中文！")]):t._e()],1)]),t._v(" "),i("div",{staticClass:"contactInformation"},[i("div",{staticClass:"title"},[t._v("联系方式")]),t._v(" "),i("div",{staticClass:"contactInformation_main"},[i("el-input",{attrs:{placeholder:"联系人姓名"},model:{value:t.modifyObj.contacts,callback:function(e){t.$set(t.modifyObj,"contacts",e)},expression:"modifyObj.contacts"}}),t._v(" "),i("el-input",{attrs:{placeholder:"联系电话"},model:{value:t.modifyObj.telphone,callback:function(e){t.$set(t.modifyObj,"telphone",e)},expression:"modifyObj.telphone"}})],1)]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.modifyQualificationDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveModify}},[t._v("保 存")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("商家资质审核")])])}]};var n=i("VU/8")(a,s,!1,function(t){i("skXC")},null,null);e.default=n.exports},skXC:function(t,e){}});