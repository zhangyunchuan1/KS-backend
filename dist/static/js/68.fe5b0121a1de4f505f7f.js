webpackJsonp([68],{"6saz":function(t,e){},v0ss:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("gRE1"),s=a.n(i),l=a("ZPfm"),n=a("+jNi"),o={name:"ServiceApproval",components:{BreadCrumb:l.a,ModalDelete:n.a},data:function(){return{breadData:[{id:1,name:"服务",urls:"/index/service/service",icon:"icon-home"},{id:2,name:"服务审批",urls:"/index/service/serviceApproval",icon:"icon-home"}],plateOptions:[],levelOptions:[],plateValue:"",levelValue:"",serviceName:"",companyName:"",imagesVisible:!1,imageUrl:"",tableData:[],disableDialog:!1,rejectValue:null,remarkDialog:!1,remark:"",basicInfoDialog:!1,examineVisible:!1,dialogImageUrl:"",dialogVisible:!1,currentPage:1,pageSize:25,total:0,basicData:{},rejectData:[],historyData:[],rejectReason:""}},methods:{handleRemove:function(t,e){console.log(t,e)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},getApprove:function(){var t=this,e={page:this.currentPage,size:this.pageSize,status:5};this.serviceName&&(e.title=this.serviceName),this.companyName&&(e.company_name=this.companyName),this.levelValue&&(e.menu=this.levelValue),this.HttpClient.post("/admin/services/listsWithMenu",e).then(function(e){console.log(e),200===e.data.code&&(t.tableData=e.data.data.data,t.total=e.data.data.total)})},getTypeList:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:2,type:3}).then(function(e){console.log(e),200===e.data.code&&(t.plateOptions=s()(e.data.data),console.log(t.plateOptions))})},getBasicInfo:function(t){var e=this;this.HttpClient.post("/admin/services/baseInfo",{id:t}).then(function(t){console.log(t),200===t.data.code&&(e.basicData=t.data.data)})},getRejectList:function(){var t=this;this.HttpClient.post("/admin/webReview/getList",{type:"active"}).then(function(e){console.log(e),200===e.data.code&&(t.rejectData=e.data.data)})},getRemarkList:function(t){var e=this;this.HttpClient.post("/admin/remarkLog/lists",{source_id:t}).then(function(t){console.log(t),200===t.data.code?(e.historyData=t.data.data,e.$set(e.historyData,e.historyData.length-1,e.historyData[e.historyData.length-1])):e.historyData=[]})},plateChange:function(){this.levelValue="",""!==this.plateValue&&(this.levelOptions=this.plateOptions[this.plateValue].child)},basicButton:function(t){this.basicInfoDialog=!0,this.getBasicInfo(t)},examineButton:function(t,e){this.examineVisible=!0,this.id=e,this.getBasicInfo(t)},rejectButton:function(t){this.id=t,this.disableDialog=!0,this.getRejectList()},remarkButton:function(t){this.id=t,this.remarkDialog=!0,this.getRemarkList(t)},agreeService:function(){var t=this;this.HttpClient.post("/admin/services/changeStatus",{service_id:this.id,status:1}).then(function(e){console.log(e),200===e.data.code?(t.$message.success(e.data.msg),t.examineVisible=!1,setTimeout(function(){t.getApprove()},500)):t.$message.error(e.data.msg)})},confirmReject:function(){var t=this;console.log(this.rejectValue),this.rejectValue&&this.HttpClient.post("/admin/services/changeStatus",{status:4,refuse:this.rejectReason,service_id:this.id,review_id:this.rejectValue}).then(function(e){console.log(e),200===e.data.code?(t.$message.success(e.data.msg),t.disableDialog=!1,setTimeout(function(){t.getApprove()},500)):t.$message.error(e.data.msg)})},addRemark:function(){var t=this;this.HttpClient.post("/admin/remarkLog/create",{content:this.remark,source_id:this.id}).then(function(e){console.log(e),200===e.data.code?(t.$message.success(e.data.msg),t.remark="",setTimeout(function(){t.getRemarkList(t.id)},500)):t.$message.error(e.data.msg)})},checkImages:function(t){this.imageUrl=t,this.imagesVisible=!0},currentChange:function(t){this.currentPage=t,this.getApprove()}},created:function(){this.getApprove(),this.getTypeList()}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"serviceApproval"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"service_main"},[t._m(0),t._v(" "),a("div",{staticClass:"service_header"},[a("div",{staticClass:"service_select"},[a("el-select",{staticClass:"select_normal",attrs:{clearable:"",placeholder:"板块"},on:{change:t.plateChange},model:{value:t.plateValue,callback:function(e){t.plateValue=e},expression:"plateValue"}},t._l(t.plateOptions,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:e}})})),t._v(" "),""!==t.plateValue?a("el-select",{staticClass:"select_normal",attrs:{clearable:"",placeholder:"二级"},on:{change:t.getApprove},model:{value:t.levelValue,callback:function(e){t.levelValue=e},expression:"levelValue"}},t._l(t.levelOptions,function(t){return a("el-option",{key:t.menu_id,attrs:{label:t.name,value:t.menu_id}})})):t._e()],1),t._v(" "),a("div",{staticClass:"service_search"},[a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"服务名称",clearable:""},on:{clear:t.getApprove},nativeOn:{keyup:function(e){return"button"in e||13===e.keyCode?t.getApprove(e):null}},model:{value:t.serviceName,callback:function(e){t.serviceName=e},expression:"serviceName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getApprove},slot:"append"})],1)],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"公司对外名称",clearable:""},on:{clear:t.getApprove},nativeOn:{keyup:function(e){return"button"in e||13===e.keyCode?t.getApprove(e):null}},model:{value:t.companyName,callback:function(e){t.companyName=e},expression:"companyName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getApprove},slot:"append"})],1)],1)])]),t._v(" "),a("div",{staticClass:"service_content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"ID",prop:"id",align:"center",width:"65",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"服务名称",align:"center","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(e.row.title))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"公司对外名称",align:"center",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(e.row.company_name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"价格",prop:"price",align:"center",width:"100",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"板块",align:"center","column-key":"date",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(e.row.folder))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"二级",align:"center",width:"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(e.row.menu_name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"城市",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(e.row.city_name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",fixed:"right","class-name":"service_scope",width:"400"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"service_btm"},[a("div",[t._v("预览服务")]),t._v(" "),a("div",{on:{click:function(a){t.basicButton(e.row.id)}}},[t._v("基本信息")]),t._v(" "),a("div",{on:{click:function(a){t.examineButton(e.row.id,e.row.service_id)}}},[t._v("查看协议")]),t._v(" "),a("div",{staticStyle:{color:"red"},on:{click:function(a){t.rejectButton(e.row.service_id)}}},[t._v("驳回")]),t._v(" "),a("div",{on:{click:function(a){t.remarkButton(e.row.service_id)}}},[t._v("添加备注")])])]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)]),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.disableDialog},on:{"update:visible":function(e){t.disableDialog=e}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),t._v("驳回")]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("理由：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",rows:4},model:{value:t.rejectReason,callback:function(e){t.rejectReason=e},expression:"rejectReason"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("类别：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},t._l(t.rejectData,function(e){return a("el-radio",{key:e.id,attrs:{border:"",label:e.review_id},model:{value:t.rejectValue,callback:function(e){t.rejectValue=e},expression:"rejectValue"}},[t._v(t._s(e.name))])}))]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.disableDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.confirmReject}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.remarkDialog,width:"470px","custom-class":"remarkDialog"},on:{"update:visible":function(e){t.remarkDialog=e}}},[a("span",{staticClass:"remarkDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),a("div",{staticClass:"remarkDialog_main"},[a("div",{staticClass:"remarkTitle"},[t._v("内容")]),t._v(" "),a("div",{staticClass:"remarkInput"},[a("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入内容"},model:{value:t.remark,callback:function(e){t.remark=e},expression:"remark"}})],1),t._v(" "),a("div",{staticClass:"remarkTitle"},[t._v("历史")]),t._v(" "),a("div",{staticClass:"remarkHistory"},t._l(t.historyData,function(e,i){return a("div",{key:i},[a("div",{staticClass:"remarkHistoryUser"},[a("i",{staticClass:"iconfont icon-dian"}),a("p",[t._v(t._s(e.name))]),a("span",[t._v(t._s(e.created_at))])]),t._v(" "),a("p",[t._v(t._s(e.content))])])}))]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.remarkDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addRemark}},[t._v("提 交")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.basicInfoDialog,width:"700px","custom-class":"basicInfoDialog"},on:{"update:visible":function(e){t.basicInfoDialog=e}}},[a("span",{staticClass:"basicInfoDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),a("div",{staticClass:"basicInfoDialog_main"},[a("div",{staticClass:"main_list"},[a("div",{staticClass:"main_list_input"},[a("p",[t._v("板块：")]),t._v(" "),a("div",[t._v(t._s(t.basicData.menu?t.basicData.menu.folder_name:""))])]),t._v(" "),a("div",{staticClass:"main_list_input"},[a("p",[t._v("二级目录：")]),t._v(" "),a("div",[t._v(t._s(t.basicData.menu?t.basicData.menu.menu_1_name:""))])])]),t._v(" "),a("div",{staticClass:"main_list"},[a("div",{staticClass:"main_list_input"},[a("p",[t._v("城市：")]),t._v(" "),a("div",[t._v(t._s(t.basicData.city_name))])]),t._v(" "),a("div",{staticClass:"main_list_input"},[a("p",[t._v("详细地址：")]),t._v(" "),a("div",[t._v(t._s(t.basicData.address))])])]),t._v(" "),a("div",{staticClass:"main_list"},[a("div",{staticClass:"main_list_input"},[a("p",[t._v("负责人：")]),t._v(" "),a("div",[t._v(t._s(t.basicData.promotee))])]),t._v(" "),a("div",{staticClass:"main_list_input"},[a("p",[t._v("电话：")]),t._v(" "),a("div",[t._v(t._s(t.basicData.telphone))])])]),t._v(" "),a("div",{staticClass:"upload"},[a("div",{staticClass:"protocol"},[t.basicData.admin_upload_protocol?t._e():a("div",{staticClass:"el-upload__text"},[t._v("上传的安全协议")]),t._v(" "),t._l(t.basicData.admin_upload_protocol,function(e){return a("a",{key:e.uid,attrs:{href:e.url+"?attname="}},[t._v(t._s(e.name))])})],2),t._v(" "),a("div",{staticClass:"annex"},[t.basicData.admin_upload_images?t._e():a("div",{staticClass:"el-upload__text"},[t._v("上传的附件"),a("br"),t._v("图片为此公司现场的图片，或者计划书等")]),t._v(" "),a("div",{staticClass:"el-upload__text"},t._l(t.basicData.admin_upload_images,function(e){return a("img",{key:e.uid,attrs:{src:e.url},on:{click:function(a){t.checkImages(e.url)}}})})),t._v(" "),a("el-dialog",{attrs:{visible:t.imagesVisible,"append-to-body":""},on:{"update:visible":function(e){t.imagesVisible=e}}},[a("img",{attrs:{width:"100%",src:t.imageUrl,alt:""}})])],1)])])]),t._v(" "),a("el-dialog",{attrs:{visible:t.examineVisible,width:"400px"},on:{"update:visible":function(e){t.examineVisible=e}}},[a("div",{staticClass:"dialog_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-faxian examine_icon"}),t._v(" "),a("span",[t._v("查看协议")])]),t._v(" "),a("div",{staticClass:"examine_content"},[a("div",{staticClass:"examine_list"},t._l(t.basicData.admin_upload_protocol,function(e,i){return a("div",{key:i,staticClass:"examine_text"},[a("a",{staticClass:"examine_text",attrs:{href:e.url+"?attname="}},[a("p",{staticClass:"examine_down_p"},[t._v(t._s(i+1)+"."+t._s(" ")+t._s(e.name))]),t._v(" "),a("i",{staticClass:"icon_examine el-icon-download"})])])}))]),t._v(" "),a("div",{staticClass:"img_content"},[a("div",{staticClass:"img_items"},t._l(t.basicData.admin_upload_images,function(e,i){return a("div",{key:i,class:i%3==0?"img_item1":"img_item"},[a("a",{attrs:{href:e.url+"?attname="}},[a("img",{staticClass:"img",attrs:{src:e.url+"?imageView2/1/w/60/h/60"}}),t._v(" "),a("div",{staticClass:"modal_img"},[a("i",{staticClass:"el-icon-download modal_icon"})])])])}))]),t._v(" "),a("div",{staticClass:"user_footer",attrs:{slot:"footer"},slot:"footer"},[a("el-row",[a("el-button",{staticClass:"btn_foot",attrs:{type:"primary"},on:{click:function(e){t.examineVisible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{staticClass:"btn_foot",attrs:{type:"primary"},on:{click:t.agreeService}},[t._v("通过")])],1)],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"service_title"},[e("div",{staticClass:"title"},[this._v("服务审批")]),this._v(" "),e("div",{staticClass:"refresh"},[e("i",{staticClass:"iconfont icon-shuaxin"}),e("span",[this._v("刷新")])])])}]};var r=a("VU/8")(o,c,!1,function(t){a("6saz")},null,null);e.default=r.exports}});