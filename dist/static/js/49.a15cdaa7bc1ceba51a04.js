webpackJsonp([49],{HC4y:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=t("Xxa5"),s=t.n(i),n=t("exGp"),o=t.n(n),r=t("ZPfm"),l=t("GKmE"),d=t("QL8K"),c=t.n(d),u={name:"UserAccountManagement",components:{BreadCrumb:r.a},data:function(){return{breadData:[{id:1,name:"用户管理",urls:"/index/standardUser/StandardUser",icon:"icon-home"},{id:2,name:"用户账户",urls:"/index/standardUser/userManagement/UserManagement",icon:"icon-home"},{id:3,name:"用户账号管理",urls:"/index/standardUser/userManagement/UserAccountManagement",icon:"icon-home"}],fullNameSearch:"",telephoneSearch:"",IdCardSearch:"",nickNameSearch:"",userNameSearch:"",tableData:[],phoneDialog:!1,passwordDialog:!1,verifiedDialog:!1,userInfoDialog:!1,oldPhone:"",new_phone:"",password:"",rePassword:"",id_card:"",actual_name:"",uid:"",gender:"",signature:"",id_card1:"",id_card2:"",avatar:"",uploadLoading1:!1,uploadLoading2:!1,uploadLoading3:!1,serial_number:"",qq:"",wechat:"",total:0,currentPage:1}},mounted:function(){this.initData()},methods:{initData:function(){var e=this,a={user_name:arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",nickname:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",id_card:arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",phone:arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",actual_name:arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",page:arguments.length>5&&void 0!==arguments[5]?arguments[5]:1};this.HttpClient.post("/admin/users/lists",a).then(function(a){if(200===a.data.code){var t=a.data.data,i=t.data,s=t.total,n=t.current_page;i&&(e.tableData=i,e.total=s,e.currentPage=n)}else e.$message.error(a.data.msg)})},handleCurrentChange:function(e){this.initData("","","","","",e)},formatGender:function(e,a,t,i){switch(t){case 1:return"男";case 2:return"女";case 3:return"保密";default:return}},formatLoginStatus:function(e,a,t,i){switch(t){case 0:return"删除";case 1:return"正常";case 2:return"注销";case 3:return"禁用";case 4:return"待审核";default:return}},showMsg:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"warning";this.$message({message:e,type:a})},showDialog:function(e,a){var t=this;this[a]=!0,this.uid=e.uid,this.oldPhone=e.phone,this.gender=e.gender+"",this.signature=e.signature,this.id_card=e.id_card,this.actual_name=e.actual_name,this.avatar=l.a.handleImg(e.avatar),console.log(this.avatar),"verifiedDialog"===a&&(this.uploadLoading1=!1,this.uploadLoading2=!1,this.HttpClient.post("/admin/users/verifyUserIdCard",{type:1,uid:this.uid}).then(function(e){var a=e.data,i=a.code,s=a.data.id_photo,n=a.serial_number;200===i&&(s&&s.length?(t.id_card1=""+c.a.imageUrl+s[0],t.id_card2=""+c.a.imageUrl+s[1],t.serial_number=n):(t.id_card1="",t.id_card2=""))})),"userInfoDialog"===a&&this.HttpClient.post("/admin/users/updateUserInfo",{type:1,uid:this.uid}).then(function(e){var a=e.data,i=a.code,s=a.data,n=s.weChat,o=s.qq;console.log(e.data),200===i&&(t.qq=o,t.wechat=n)})},hiddenDialog:function(e){this[e]=!1,this.resetData()},resetData:function(){this.uid="",this.oldPhone="",this.gender="",this.signature="",this.id_card="",this.actual_name="",this.avatar="",this.serial_number=""},updateItem:function(e,a,t){var i=this;this.HttpClient.post(e,a).then(function(e){200===e.data.code?(i[t]=!1,i.showMsg(e.data.msg,"success"),i.initData()):i.showMsg(e.data.msg,"error")})},modifyPhone:function(){if(!this.new_phone)return this.showMsg("请输入新的手机号码");var e=l.a.regPhone(this.new_phone);if(e)return this.showMsg(e,"error");var a={new_phone:this.new_phone,old_phone:this.oldPhone,uid:this.uid};this.updateItem("/admin/users/updatePhone",a,"phoneDialog")},modifyPassword:function(){if(!this.password)return this.showMsg("请输入密码");if(this.password!==this.rePassword)return this.showMsg("两次密码输入不一致");var e={password:this.password,conPassword:this.rePassword,uid:this.uid};this.updateItem("/admin/users/updatePassword",e,"passwordDialog")},handleVerified:function(){var e=this;if(!this.id_card1||!this.id_card2)return this.showMsg("请上传身份证正反面照片");if(!this.id_card)return this.showMsg("请输入身份证号码");if(!this.actual_name)return this.showMsg("请输入用户真实姓名");var a={type:2,uid:this.uid,id_card_num:this.id_card,name:this.actual_name,id_photo_front:this.id_card1,id_photo_back:this.id_card2};console.log(a),this.HttpClient.post("/admin/users/verifyUserIdCard",a).then(function(a){console.log(a.data),200===a.data.code?(e.$message.success(a.data.msg),e.verifiedDialog=!1):e.$message.warning(a.data.msg)})},handleUserInfo:function(){if(!this.avatar)return this.showMsg("请上传头像");if(!this.gender)return this.showMsg("请选择性别");if(!this.signature)return this.showMsg("请输入签名");var e={type:2,uid:this.uid,gender:this.gender,signature:this.signature};this.updateItem("/admin/users/updateUserInfo",e,"userInfoDialog")},beforeFileUpload:function(e,a){var t=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/admin/users/uploadIdCard";if(!("image/jpeg"===e.type))return this.showMsg("上传图片只能是 JPG 格式!","error");switch(a){case 1:this.uploadLoading1=!0;break;case 2:this.uploadLoading2=!0;break;default:return}var s={id_photo:e,type:a,serial_number:this.serial_number};this.HttpClient.form(i,s).then(function(e){var i=e.data,s=i.code,n=i.msg,o=i.path;if(t.uploadLoading1=!1,t.uploadLoading2=!1,200!==s)return t.showMsg(n,"error");switch(a){case 1:t.id_card1=o;break;case 2:t.id_card2=o}})},deletePicture:function(e){var a=this;return o()(s.a.mark(function t(){var i,n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.HttpClient.post("/admin/users/updateDelete",{serial_number:a.serial_number,path:e});case 2:return i=t.sent,t.next=5,i.data;case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}},t,a)}))()},beforeFileUpload1:function(e){var a=this;this.HttpClient.form("/admin/uploadOneImage",{images:e}).then(function(e){200===e.data.code&&(console.log(e.data.path),a.$message.success(e.data.msg),a.id_card1=e.data.path)})},beforeFileUpload2:function(e){var a=this;this.HttpClient.form("/admin/uploadOneImage",{images:e}).then(function(e){200===e.data.code&&(console.log(e.data.path),a.$message.success(e.data.msg),a.id_card2=e.data.path)})},beforeFileUploadAvatar:function(e){var a=this;if(!("image/jpeg"===e.type))return this.showMsg("上传图片只能是 JPG 格式!","error");console.log(e),this.HttpClient.form("/admin/uploadOneImage",{images:e}).then(function(e){if(200===e.data.code){var t={image:e.data.path,type:1,uid:a.uid};a.uploadLoading3=!0,a.HttpClient.form("/admin/users/updateAvatar",t).then(function(e){a.uploadLoading3=!1;var t=e.data,i=t.code,s=t.msg,n=t.avatar;if(200!==i)return a.showMsg(s,"error");a.avatar="http://cdn.kushualab.com/"+n})}})}}},h={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"userAccountManagement"},[t("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),t("div",{staticClass:"userAccountManagement_main"},[e._m(0),e._v(" "),t("div",{staticClass:"content"},[t("div",{staticClass:"content_header"},[t("div",{staticClass:"content_header_search"},[t("el-input",{staticClass:"input-with-select",attrs:{placeholder:"姓名搜索",clearable:""},on:{change:function(a){e.initData("","","","",e.fullNameSearch)}},model:{value:e.fullNameSearch,callback:function(a){e.fullNameSearch=a},expression:"fullNameSearch"}},[t("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(a){e.initData("","","","",e.fullNameSearch)}},slot:"append"})],1),e._v(" "),t("el-input",{staticClass:"input-with-select",attrs:{placeholder:"电话搜索",clearable:""},on:{change:function(a){e.initData("","","","",e.telephoneSearch)}},model:{value:e.telephoneSearch,callback:function(a){e.telephoneSearch=a},expression:"telephoneSearch"}},[t("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(a){e.initData("","","",e.telephoneSearch)}},slot:"append"})],1),e._v(" "),t("el-input",{staticClass:"input-with-select",attrs:{placeholder:"身份证号搜索",clearable:""},on:{change:function(a){e.initData("","","","",e.IdCardSearch)}},model:{value:e.IdCardSearch,callback:function(a){e.IdCardSearch=a},expression:"IdCardSearch"}},[t("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(a){e.initData("","",e.IdCardSearch)}},slot:"append"})],1),e._v(" "),t("el-input",{staticClass:"input-with-select",attrs:{placeholder:"昵称搜索",clearable:""},on:{change:function(a){e.initData("","","","",e.nickNameSearch)}},model:{value:e.nickNameSearch,callback:function(a){e.nickNameSearch=a},expression:"nickNameSearch"}},[t("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(a){e.initData("",e.nickNameSearch)}},slot:"append"})],1),e._v(" "),t("el-input",{staticClass:"input-with-select",attrs:{placeholder:"用户名搜索",clearable:""},on:{change:function(a){e.initData(e.userNameSearch)}},model:{value:e.userNameSearch,callback:function(a){e.userNameSearch=a},expression:"userNameSearch"}},[t("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(a){e.initData(e.userNameSearch)}},slot:"append"})],1)],1)]),e._v(" "),t("div",{staticClass:"content_table"},[t("el-table",{attrs:{data:e.tableData,border:!0}},[t("el-table-column",{attrs:{label:"ID",align:"center",width:"80",prop:"id",sortable:""}}),e._v(" "),t("el-table-column",{attrs:{label:"用户昵称",align:"center",width:"120","show-overflow-tooltip":"",prop:"nickname"}}),e._v(" "),t("el-table-column",{attrs:{label:"头像",align:"center",width:"100","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(a){return[a.row.avatar?t("div",{staticClass:"table_avatar"},[t("img",{attrs:{src:e.Tools.handleImg(a.row.avatar),alt:""}})]):t("div",{staticClass:"table_avatar"},[t("span",{staticClass:"sortout_color"},[e._v("暂无图片")])])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"用户名",align:"center","show-overflow-tooltip":"",width:"120",prop:"username"}}),e._v(" "),t("el-table-column",{attrs:{label:"电话",align:"center","show-overflow-tooltip":"",width:"120",prop:"phone"}}),e._v(" "),t("el-table-column",{attrs:{label:"登陆状态",align:"center",width:"120",prop:"status",formatter:e.formatLoginStatus,sortable:""}}),e._v(" "),t("el-table-column",{attrs:{label:"身份证号",align:"center",width:"170","show-overflow-tooltip":"",prop:"id_card"}}),e._v(" "),t("el-table-column",{attrs:{label:"姓名",align:"center","show-overflow-tooltip":"",width:"100",prop:"actual_name"}}),e._v(" "),t("el-table-column",{attrs:{label:"余额",align:"center","show-overflow-tooltip":"",width:"100",prop:"balance"}}),e._v(" "),t("el-table-column",{attrs:{label:"性别",align:"center","show-overflow-tooltip":"",width:"80",prop:"gender",formatter:e.formatGender}}),e._v(" "),t("el-table-column",{attrs:{label:"创建时间",align:"center","show-overflow-tooltip":"",width:"160",prop:"created_at"}}),e._v(" "),t("el-table-column",{attrs:{label:"操作",align:"center","min-width":"320",fixed:"right","class-name":"table_scope"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("div",{staticClass:"scope_btm"},[t("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(t){e.showDialog(a.row,"phoneDialog")}}},[e._v(" 修改手机 ")]),e._v(" "),t("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(t){e.showDialog(a.row,"passwordDialog")}}},[e._v(" 修改密码 ")]),e._v(" "),t("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(t){e.showDialog(a.row,"verifiedDialog")}}},[e._v("实名认证")]),e._v(" "),t("el-button",{attrs:{size:"medium",type:"text"},on:{click:function(t){e.showDialog(a.row,"userInfoDialog")}}},[e._v("修改基本信息")])],1)]}}])})],1),e._v(" "),t("el-pagination",{attrs:{layout:"prev, pager, next",total:e.total,"current-page":e.currentPage,"page-size":25},on:{"update:currentPage":function(a){e.currentPage=a},"current-change":e.handleCurrentChange}})],1)])]),e._v(" "),t("el-dialog",{attrs:{width:"400px",title:"修改手机号码","custom-class":"user-option-dialog",visible:e.phoneDialog},on:{"update:visible":function(a){e.phoneDialog=a}}},[t("el-input",{attrs:{placeholder:"现在的手机号码",readOnly:""},model:{value:e.oldPhone,callback:function(a){e.oldPhone=a},expression:"oldPhone"}}),e._v(" "),t("el-input",{attrs:{placeholder:"输入新的手机号码",clearable:""},model:{value:e.new_phone,callback:function(a){e.new_phone=a},expression:"new_phone"}}),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{size:"small"},on:{click:function(a){e.hiddenDialog("phoneDialog")}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.modifyPhone}},[e._v("确 定")])],1)],1),e._v(" "),t("el-dialog",{attrs:{width:"400px",title:"修改密码","custom-class":"user-option-dialog",visible:e.passwordDialog},on:{"update:visible":function(a){e.passwordDialog=a}}},[t("el-input",{attrs:{type:"password",placeholder:"新密码"},model:{value:e.password,callback:function(a){e.password=a},expression:"password"}}),e._v(" "),t("el-input",{attrs:{type:"password",placeholder:"重复新密码",clearable:""},model:{value:e.rePassword,callback:function(a){e.rePassword=a},expression:"rePassword"}}),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{size:"small"},on:{click:function(a){e.hiddenDialog("passwordDialog")}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.modifyPassword}},[e._v("确 定")])],1)],1),e._v(" "),t("el-dialog",{attrs:{width:"400px",title:"实名认证","custom-class":"user-option-dialog",visible:e.verifiedDialog},on:{"update:visible":function(a){e.verifiedDialog=a}}},[t("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.uploadLoading1,expression:"uploadLoading1"}],staticClass:"userManagement-upload",attrs:{action:"http://test.kslab.com/api/article/null","before-upload":e.beforeFileUpload1,"show-file-list":!1}},[e.id_card1?t("img",{staticClass:"preview-img",attrs:{src:e.id_card1}}):e._e(),e._v(" "),t("div",{staticClass:"el-upload__text"},[e._v("正面-样式展示")])]),e._v(" "),t("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.uploadLoading2,expression:"uploadLoading2"}],staticClass:"userManagement-upload",attrs:{action:"http://test.kslab.com/api/article/null","before-upload":e.beforeFileUpload2,"show-file-list":!1}},[e.id_card2?t("img",{staticClass:"preview-img",attrs:{src:e.id_card2}}):e._e(),e._v(" "),t("div",{staticClass:"el-upload__text"},[e._v("反面-样式展示")])]),e._v(" "),t("el-input",{attrs:{placeholder:"身份证号",clearable:""},model:{value:e.id_card,callback:function(a){e.id_card=a},expression:"id_card"}}),e._v(" "),t("el-input",{attrs:{placeholder:"姓名",clearable:""},model:{value:e.actual_name,callback:function(a){e.actual_name=a},expression:"actual_name"}}),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{size:"small"},on:{click:function(a){e.hiddenDialog("verifiedDialog")}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.handleVerified}},[e._v("确 定")])],1)],1),e._v(" "),t("el-dialog",{attrs:{width:"400px",title:"基本信息","custom-class":"user-option-dialog",visible:e.userInfoDialog},on:{"update:visible":function(a){e.userInfoDialog=a}}},[t("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.uploadLoading3,expression:"uploadLoading3"}],staticClass:"userManagement-upload upload-avatar",attrs:{action:"http://test.kslab.com/api/article/null","before-upload":e.beforeFileUploadAvatar,"show-file-list":!1}},[e.avatar?t("img",{staticClass:"preview-img",attrs:{src:e.avatar}}):e._e(),e._v(" "),t("div",{staticClass:"el-upload__text"},[e._v("头像")])]),e._v(" "),t("div",{staticClass:"item"},[e._v("\n      性别:\n      "),t("el-radio",{attrs:{label:"1"},model:{value:e.gender,callback:function(a){e.gender=a},expression:"gender"}},[e._v("男")]),e._v(" "),t("el-radio",{attrs:{label:"2"},model:{value:e.gender,callback:function(a){e.gender=a},expression:"gender"}},[e._v("女")]),e._v(" "),t("el-radio",{attrs:{label:"3"},model:{value:e.gender,callback:function(a){e.gender=a},expression:"gender"}},[e._v("保密")])],1),e._v(" "),t("div",{staticClass:"item"},[e._v("\n      签名: "),t("el-input",{staticClass:"sign",attrs:{placeholder:"输入你的个性签名"},model:{value:e.signature,callback:function(a){e.signature=a},expression:"signature"}})],1),e._v(" "),t("div",{staticClass:"item"},[e._v("\n      账号绑定:\n      "),e.qq?t("el-tag",{attrs:{type:"success"}},[e._v(e._s(e.qq))]):e._e(),e._v(" "),e.wechat?t("el-tag",{attrs:{type:"success"}},[e._v(e._s(e.wechat))]):e._e()],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{size:"small"},on:{click:function(a){e.hiddenDialog("userInfoDialog")}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.handleUserInfo}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[function(){var e=this.$createElement,a=this._self._c||e;return a("div",{staticClass:"title"},[a("p",[this._v("用户账号管理")])])}]};var p=t("VU/8")(u,h,!1,function(e){t("nm3G")},null,null);a.default=p.exports},nm3G:function(e,a){}});