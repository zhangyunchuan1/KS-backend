webpackJsonp([122],{HAmo:function(t,e){},uq9C:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"ServiceStatus",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"服务",urls:"/index/service/service",icon:"icon-home"},{id:2,name:"服务状态",urls:"/index/service/serviceStatus",icon:"icon-home"}],options:[{value:"",label:"全部"},{value:"1",label:"正常"},{value:"2",label:"下架"},{value:"6",label:"已暂停"}],value:"",serviceName:null,refuseText:"",stopText:"",tableData:[],basicInfoDialog:!1,dialogImageUrl:"",dialogVisible:!1,textarea:"",previewDialog:!1,remarkDialog:!1,endDialog:!1,endTextarea:"",evaluateDialog:!1,obtainedDialog:!1,state:null,serviceTitle:null,remarkHistory:[{create_name:null,created_at:null,content:null}],serviceInfo:{content:null,images:[],menu:{folder_name:null,menu_1_name:null},city_name:null,address:null,promotee:null,telphone:null,admin_upload_images:[],admin_upload_protocol:[]},enlargePicture:!1,imgPath:null,serviceId:null,cityName:"",servicenameTitle:"",contentTableData:[],serviceContentID:"",currentPage:1,pageSize:25,total:0,currentcontentPage:1,pagecontentSize:10,totalcontent:0,deleteDialogVisible:!1,aid:""}},mounted:function(){this.getServiceList(this.state,this.serviceTitle)},methods:{currentChange:function(t){this.currentPage=t,this.getServiceList()},currentContentChange:function(t){this.currentcontentPage=t,this.getContentData()},handleViewinfo:function(t){console.log(t),this.evaluateDialog=!0,this.servicenameTitle=t.title,this.cityName=t.city_name,this.serviceContentID=t.service_id,this.getContentData()},getContentData:function(){var t=this,e={source_id:this.serviceContentID};this.HttpClient.post("/admin/answers/info",e).then(function(e){200===e.data.code&&(console.log(e.data.data),t.contentTableData=e.data.data.data,t.totalcontent=e.data.data.total)})},handledeletePreview:function(t){console.log(t),this.deleteDialogVisible=!0,this.aid=t.answer_id},sureDeleteContentFn:function(){var t=this;this.HttpClient.post("/admin/answers/changeStatus",{answer_id:this.aid,status:0}).then(function(e){console.log(e.data),200==e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getContentData(),t.deleteDialogVisible=!1},500))})},handleStop:function(t){this.endDialog=!0,this.serviceId=t},handleSureStopShelf:function(){var t=this;this.HttpClient.post("/admin/services/changeStatus",{service_id:this.serviceId,status:6,refuse:this.stopText}).then(function(e){200===e.data.code&&(t.$message.success(e.data.msg),t.endDialog=!1,setTimeout(function(){t.getServiceList()},350))})},handleRecovery:function(t){var e=this;this.HttpClient.post("/admin/services/changeStatus",{service_id:t,status:1}).then(function(t){200===t.data.code&&(e.$message.success(t.data.msg),setTimeout(function(){e.getServiceList()},350))})},handleEndService:function(t){this.serviceId=t,console.log(this.serviceId),this.endDialog=!0},handleSureEndService:function(){var t=this;this.HttpClient.post("/admin/services/changeStatus",{service_id:this.serviceId,status:2,refuse:this.endTextarea}).then(function(e){console.log(e),200===e.data.code?(t.$message.success(e.data.msg),setTimeout(function(){t.getServiceList()},350),t.endTextarea="",t.endDialog=!1):t.$message.error(e.data.msg)})},handleLowerShelf:function(t){this.serviceId=t,this.obtainedDialog=!0},handleSureLowerShelf:function(){var t=this;console.log(this.serviceId),this.HttpClient.post("/admin/services/changeStatus",{service_id:this.serviceId,status:2,refuse:this.refuseText}).then(function(e){console.log(e),200===e.data.code?(t.$message.success(e.data.msg),setTimeout(function(){t.getServiceList()},350),t.obtainedDialog=!1):t.$message.error(e.data.msg)})},handlePreview:function(t){window.open(this.Urls.frontUrl+"home/service-detail?id="+t)},handleOpenPic:function(t){this.imgPath=t,this.enlargePicture=!0},handleClosePic:function(){this.enlargePicture=!1},handleOpenInfo:function(t){this.getServiceInfo(t),this.basicInfoDialog=!0},getServiceInfo:function(t){var e=this;this.HttpClient.post("/admin/services/baseInfo",{id:t}).then(function(t){console.log(t),e.serviceInfo=t.data.data;for(var a=0;a<e.serviceInfo.admin_upload_images.length;a++){var i=e.serviceInfo.admin_upload_images[a];e.serviceInfo.admin_upload_images[a]=i}for(var s=0;s<e.serviceInfo.admin_upload_protocol.length;s++){var n=e.serviceInfo.admin_upload_protocol[s];e.serviceInfo.admin_upload_protocol[s]=n}})},handleAddRemark:function(){var t=this;this.HttpClient.post("/admin/remarkLog/create",{content:this.textarea,source_id:this.serviceId}).then(function(e){200===e.data.code?(t.$message.success(e.data.msg),setTimeout(function(){t.getrRemarkList(t.serviceId)},350),t.textarea=""):t.$message.error(e.data.msg)})},handleOpenRemark:function(t){this.serviceId=t,this.getrRemarkList(t),this.remarkDialog=!0},getrRemarkList:function(t){var e=this;this.HttpClient.post("/admin/remarkLog/lists",{source_id:t}).then(function(t){console.log(t),e.remarkHistory=t.data.data.reverse()})},handleRefresh:function(){window.location.reload()},handleServiceName:function(){console.log(this.state,this.serviceName),this.getServiceList(this.state,this.serviceName)},handleChangeStateSearch:function(t){this.state=t,this.getServiceList(this.state,this.serviceName)},getServiceList:function(t,e){var a=this;this.HttpClient.post("/admin/services/lists",{status:t,title:e}).then(function(t){console.log(t),a.tableData=t.data.data.data,a.total=t.data.data.total,200===t.data.code&&(a.state=null,a.serviceName=null)})},filterPlate:function(t,e,a){return e[a.property]===t},filterSecondary:function(t,e,a){return e[a.property]===t},handleRemove:function(t,e){console.log(t,e)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"serviceStatus"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"service_main"},[a("div",{staticClass:"service_title"},[a("div",{staticClass:"title"},[t._v("服务状态")]),t._v(" "),a("div",{staticClass:"refresh",on:{click:t.handleRefresh}},[a("i",{staticClass:"iconfont icon-shuaxin"}),t._v(" "),a("span",[t._v("刷新")])])]),t._v(" "),a("div",{staticClass:"service_header"},[a("div",{staticClass:"service_select"},[a("el-select",{attrs:{placeholder:"状态选择"},on:{change:function(e){t.handleChangeStateSearch(e)}},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("div",{staticClass:"service_search"},[a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"服务名称"},model:{value:t.serviceName,callback:function(e){t.serviceName=e},expression:"serviceName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.handleServiceName},slot:"append"})],1)],1)])]),t._v(" "),a("div",{staticClass:"service_content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{sortable:"",label:"服务ID",align:"center",width:"100",prop:"id"}}),t._v(" "),a("el-table-column",{attrs:{label:"服务名称","show-overflow-tooltip":"",align:"center",prop:"title",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{label:"城市",align:"center","show-overflow-tooltip":"",prop:"city_name",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{label:"公司对外名称",align:"center",prop:"company_name",width:"180","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.company_name?a("span",[t._v(t._s(e.row.company_name))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"价格",align:"center",width:"100",prop:"price",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"浏览人数",align:"center",width:"110",prop:"view_num",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"用户评价分数",align:"center",width:"130",prop:"score",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center",prop:"status",filters:[{text:"正常",value:1},{text:"已下架",value:2},{text:"已暂停",value:6}],"filter-method":t.filterSecondary,width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.status?a("span",{staticClass:"normal_color"},[t._v("正常")]):t._e(),t._v(" "),2===e.row.status?a("span",{staticClass:"sortout_color"},[t._v("已下架")]):t._e(),t._v(" "),6===e.row.status?a("span",{staticClass:"paused_color"},[t._v("已暂停")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"350",align:"center",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.handlePreview(e.row.service_id)}}},[t._v("预览服务")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.handleOpenInfo(e.row.id)}}},[t._v("基本信息")]),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.handleOpenRemark(e.row.id)}}},[t._v("添加备注")]),t._v(" "),2!==e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.handleLowerShelf(e.row.service_id)}}},[t._v("下架")]):t._e(),t._v(" "),6===e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.handleRecovery(e.row.service_id)}}},[t._v("恢复")]):t._e(),t._v(" "),1===e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.handleStop(e.row.service_id)}}},[t._v("暂停")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.handleViewinfo(e.row)}}},[t._v("查看评价")])]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.remarkDialog,width:"470px","custom-class":"remarkDialog"},on:{"update:visible":function(e){t.remarkDialog=e}}},[a("span",{staticClass:"remarkDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),a("div",{staticClass:"remarkDialog_main"},[a("div",{staticClass:"remarkTitle"},[t._v("内容")]),t._v(" "),a("div",{staticClass:"remarkInput"},[a("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入内容"},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}})],1),t._v(" "),a("div",{staticClass:"remarkTitle"},[t._v("历史")]),t._v(" "),a("div",{staticClass:"remarkHistory"},t._l(t.remarkHistory,function(e,i){return a("div",{key:i},[a("div",{staticClass:"remarkHistoryUser"},[a("i",{staticClass:"iconfont icon-dian"}),t._v(" "),a("p",[t._v(t._s(e.create_name))]),t._v(" "),a("span",[t._v(t._s(e.created_at))])]),t._v(" "),a("p",[t._v(t._s(e.content))])])}))]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.remarkDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleAddRemark}},[t._v("提 交")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.basicInfoDialog,width:"700px","custom-class":"basicInfoDialog"},on:{"update:visible":function(e){t.basicInfoDialog=e}}},[a("span",{staticClass:"basicInfoDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),a("div",{staticClass:"basicInfoDialog_main"},[a("div",{staticClass:"main_list"},[a("div",{staticClass:"main_list_input"},[a("p",[t._v("板块：")]),t._v(" "),a("div",[t._v(t._s(t.serviceInfo.menu.folder_name))])]),t._v(" "),a("div",{staticClass:"main_list_input"},[a("p",[t._v("二级目录：")]),t._v(" "),a("div",[t._v(t._s(t.serviceInfo.menu.menu_1_name))])])]),t._v(" "),a("div",{staticClass:"main_list"},[a("div",{staticClass:"main_list_input"},[a("p",[t._v("城市：")]),t._v(" "),a("div",[t._v(t._s(t.serviceInfo.city_name))])]),t._v(" "),a("div",{staticClass:"main_list_input"},[a("p",[t._v("详细地址：")]),t._v(" "),a("div",[t._v(t._s(t.serviceInfo.address))])])]),t._v(" "),a("div",{staticClass:"main_list"},[a("div",{staticClass:"main_list_input"},[a("p",[t._v("负责人：")]),t._v(" "),a("div",[t._v(t._s(t.serviceInfo.promotee))])]),t._v(" "),a("div",{staticClass:"main_list_input"},[a("p",[t._v("电话：")]),t._v(" "),a("div",[t._v(t._s(t.serviceInfo.telphone))])])]),t._v(" "),a("div",{staticClass:"preview"},[a("div",{staticClass:"down_load"},[a("div",{staticClass:"examine_contents"},[a("div",{staticClass:"examine_contain"},t._l(t.serviceInfo.admin_upload_protocol,function(e,i){return a("div",{key:i,staticClass:"examine_list"},[a("a",{staticClass:"examine_text",attrs:{href:e.url+"?attname="}},[a("p",{staticClass:"examine_down_p"},[t._v(t._s(i)+"."+t._s(" ")+t._s(e.name))]),t._v(" "),a("i",{staticClass:"icon_examine el-icon-download"})])])}))]),t._v(" "),a("div",{staticClass:"img_contents"},[a("div",{staticClass:"img_contain"},t._l(t.serviceInfo.admin_upload_images,function(e,i){return a("div",{key:i,class:i%3==2?"img_item2":"img_item1"},[a("a",{attrs:{href:e.url+"?attname="}},[a("img",{staticClass:"img_3",attrs:{src:e.url}}),t._v(" "),a("div",{staticClass:"modal_img"},[a("i",{staticClass:"el-icon-download modal_icon"})])])])}))])])])])]),t._v(" "),a("el-dialog",{attrs:{visible:t.endDialog,width:"470px","custom-class":"endDialog"},on:{"update:visible":function(e){t.endDialog=e}}},[a("span",{staticClass:"obtainedDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),a("div",{staticClass:"obtainedDialog_main"},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入暂停理由"},model:{value:t.stopText,callback:function(e){t.stopText=e},expression:"stopText"}})],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.endDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSureStopShelf}},[t._v("提 交")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.obtainedDialog,width:"470px","custom-class":"obtainedDialog"},on:{"update:visible":function(e){t.obtainedDialog=e}}},[a("span",{staticClass:"obtainedDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),a("div",{staticClass:"obtainedDialog_main"},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入下架理由"},model:{value:t.refuseText,callback:function(e){t.refuseText=e},expression:"refuseText"}})],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.obtainedDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSureLowerShelf}},[t._v("提 交")])],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.evaluateDialog,width:"1100px","custom-class":"obtainedDialog"},on:{"update:visible":function(e){t.evaluateDialog=e}}},[a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"alert-content"},[a("el-input",{attrs:{readonly:""},model:{value:t.servicenameTitle,callback:function(e){t.servicenameTitle=e},expression:"servicenameTitle"}})],1),t._v(" "),a("div",{staticClass:"alert-content"},[a("el-input",{attrs:{readonly:""},model:{value:t.cityName,callback:function(e){t.cityName=e},expression:"cityName"}})],1)]),t._v(" "),a("el-table",{staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:t.contentTableData,border:!0}},[a("el-table-column",{attrs:{sortable:"",label:"用户ID",align:"center",width:"100",prop:"id"}}),t._v(" "),a("el-table-column",{attrs:{label:"用户名称",align:"center",prop:"name",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{label:"评价内容",align:"center",prop:"content",width:"130"}}),t._v(" "),a("el-table-column",{attrs:{label:"图片",align:"center",prop:"company_name",width:"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{attrs:{src:t.Tools.handleImg(e.row.avatar),alt:""}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"打分",align:"center",width:"100",prop:"score",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"评论时间排列",align:"center",width:"160",prop:"created_at",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"service_scope"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"service_btm"},[a("el-button",{attrs:{type:"text"},on:{click:function(a){t.handledeletePreview(e.row)}}},[t._v("删除")])],1)]}}])})],1),t._v(" "),t.totalcontent?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.totalcontent,"page-size":t.pagecontentSize},on:{"current-change":t.currentContentChange}}):t._e()],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.deleteDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.deleteDialogVisible=e}}},[a("span",[t._v("确定删除吗？")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.deleteDialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.sureDeleteContentFn}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var n=a("VU/8")(i,s,!1,function(t){a("HAmo")},null,null);e.default=n.exports}});