webpackJsonp([6],{"BRg+":function(t,a){},O82L:function(t,a){},TBGK:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplNThkY2RiNy1hZGU2LTM1NDQtOTM0YS03YmU1NzMzMDJiZmYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkQ4QUQ1NzBDM0FEMTFFOEI2MDVBMzA5RDE5RjVGQTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkQ4QUQ1NkZDM0FEMTFFOEI2MDVBMzA5RDE5RjVGQTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNjNDQTQ3MjZDQzJFODExQTVBODkyRTRBNjA4NTQ5QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDplNThkY2RiNy1hZGU2LTM1NDQtOTM0YS03YmU1NzMzMDJiZmYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6q2/NKAAABTElEQVR42qyT2yoFURzGZ5x22rYbxo0LJDdStJ+A4tItb+GGkjdQ3MjbKMkTOGS7IUoumNBo51T2jN/Kf9Xf2nPYbF/9Wudv1vpmLT/Yiz00CYH3rWMYhH0Y8X7qBuYhhBnpewgX/JqP0RqNLTX5FiKYgk1I1NgGnEI/jKr+dWNkJx7BJxzCinx9wtnRBQzDLsxBJ1TNQJeaVFV1H1ad3VjtmB2oduIa9cKb1M1x71QOViewrdo9tqKNSsrIcxZkqWQrHd4/Se/ImpZhTHJyM7J91/Ai7SajSMp7McvTu2RaTzPqhg84gOkCozN3vTbqE6PFX0RTTjPSeQwVGIRSxmlGz2pSUGD0BANZGZnr3oDzFjKqqTVNRhV4hFn9WzOU5GXUyMgrT3HazY7+cKFTMxpXgbeqijaqS8dlG0/t1RxtCa7aMDHvbvlLgAEAhB5Gswnb/jMAAAAASUVORK5CYII="},drcg:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("gRE1"),s=e.n(i),l={name:"ActivityExamineApprove",components:{BreadCrumb:e("ZPfm").a},data:function(){return{basicInfoDialog:!1,examineVisible:!1,remarkVisible:!1,rejectVisible:!1,rejectValue:null,rejectReason:"",plateValue:"",levelValue:null,activity_name:"",remark:"",tableData:[],breadData:[{id:1,name:"活动",urls:"/index",icon:"icon-home"},{id:2,name:"活动审批",urls:"/index/test",icon:"icon-home"}],plateOptions:[],levelOptions:[],historyData:[],rejectData:[],id:"",protocolData:{protocol:[],images:[]},basicData:{},imagesVisible:!1,imageUrl:"",currentPage:1,pageSize:25,total:0}},methods:{handlePersonal:function(t){window.open(this.Urls.frontUrl+"/home/activity-detail?id="+t)},checkImages:function(t){console.log(t),this.imageUrl=t,this.imagesVisible=!0},handleReject:function(t){this.rejectValue=t,console.log(t)},getApprove:function(){var t=this,a={page:this.currentPage,size:this.pageSize,status:7};this.activity_name&&(a.title=this.activity_name),this.levelValue&&(a.menu=this.levelValue),this.HttpClient.post("/admin/actives/listsWithMenu",a).then(function(a){console.log(a),200===a.data.code&&(t.tableData=a.data.data.data,t.total=a.data.data.total)})},getTypeList:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:2,type:4}).then(function(a){console.log(a),200===a.data.code&&(t.plateOptions=s()(a.data.data),console.log(t.plateOptions))})},getRemarkList:function(t){var a=this;this.HttpClient.post("/admin/remarkLog/lists",{source_id:t}).then(function(t){console.log(t),200===t.data.code?(a.historyData=t.data.data,a.$set(a.historyData,a.historyData.length-1,a.historyData[a.historyData.length-1])):a.historyData=[]})},getRejectList:function(){var t=this;this.HttpClient.post("/admin/webReview/getList",{type:"active"}).then(function(a){console.log(a),200===a.data.code&&(t.rejectData=a.data.data)})},addRemark:function(){var t=this;this.HttpClient.post("/admin/remarkLog/create",{content:this.remark,source_id:this.id}).then(function(a){console.log(a),200===a.data.code?(t.$message.success(a.data.msg),t.remark="",setTimeout(function(){t.getRemarkList(t.id)},500)):t.$message.error(a.data.msg)})},getProtocols:function(t){var a=this;this.HttpClient.post("/admin/actives/baseInfo",{id:t}).then(function(t){console.log(t),200===t.data.code?(a.protocolData.protocol=t.data.data.admin_upload_protocol,a.protocolData.images=t.data.data.admin_upload_images,console.log(a.protocolData)):(a.protocolData.protocol=[],a.protocolData.images=[])})},confirmReject:function(){var t=this;console.log(this.rejectValue),this.rejectValue&&this.HttpClient.post("/admin/actives/changeStatus",{status:3,refuse:this.rejectReason,active_id:this.id,review_id:this.rejectValue}).then(function(a){console.log(a),200===a.data.code?(t.$message.success(a.data.msg),t.rejectVisible=!1,setTimeout(function(){t.getApprove()},500)):t.$message.error(a.data.msg)})},agreeActivity:function(){var t=this;this.HttpClient.post("/admin/actives/changeStatus",{active_id:this.id,status:1}).then(function(a){console.log(a),200===a.data.code?(t.$message.success(a.data.msg),t.examineVisible=!1,setTimeout(function(){t.getApprove()},500)):t.$message.error(a.data.msg)})},basicButton:function(t){var a=this;this.basicInfoDialog=!0,this.HttpClient.post("/admin/actives/baseInfo",{id:t}).then(function(t){console.log(t),200===t.data.code&&(a.basicData=t.data.data)})},examineButton:function(t,a){this.examineVisible=!0,this.id=a,this.getProtocols(t)},rejectButton:function(t){this.id=t,this.rejectVisible=!0,this.getRejectList()},remarkButton:function(t){this.id=t,this.remarkVisible=!0,this.getRemarkList(t)},isPic:function(t){var a=t.path.indexOf("."),e=t.path.substring(a+1);return["jpg","jpeg","png","bmp"].indexOf(e)>-1&&(console.log("true"),!0)},currentChange:function(t){this.currentPage=t,this.getApprove()},plateChange:function(){""!==this.plateValue&&(this.levelOptions=this.plateOptions[this.plateValue].child)}},created:function(){this.getApprove(),this.getTypeList()}},n={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"activity_examine_approve"},[i("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),i("div",{staticClass:"content"},[i("p",{staticClass:"title"},[t._v("活动审批")]),t._v(" "),i("div",{staticClass:"content_contain"},[i("div",{staticClass:"conditions"},[i("el-select",{staticClass:"select_normal",attrs:{clearable:"",placeholder:"板块"},on:{change:t.plateChange},model:{value:t.plateValue,callback:function(a){t.plateValue=a},expression:"plateValue"}},t._l(t.plateOptions,function(t,a){return i("el-option",{key:a,attrs:{label:t.name,value:a}})})),t._v(" "),""!==t.plateValue?i("el-select",{staticClass:"select_normal",attrs:{clearable:"",placeholder:"二级"},on:{change:t.getApprove},model:{value:t.levelValue,callback:function(a){t.levelValue=a},expression:"levelValue"}},t._l(t.levelOptions,function(t){return i("el-option",{key:t.menu_id,attrs:{label:t.name,value:t.menu_id}})})):t._e(),t._v(" "),i("el-input",{staticClass:"select_normal",attrs:{placeholder:"活动名称",clearable:"","suffix-icon":"el-icon-search"},on:{change:t.getApprove,clear:t.getApprove},model:{value:t.activity_name,callback:function(a){t.activity_name=a},expression:"activity_name"}})],1),t._v(" "),i("div",{staticClass:"tables"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:!0,"header-row-style":{height:"40px"},"header-cell-style":{padding:0,background:"#15bafe",color:"white"},"row-style":{height:"40px"},"cell-style":{padding:0}}},[i("el-table-column",{attrs:{prop:"id",label:"ID","show-overflow-tooltip":"",width:"50"}}),t._v(" "),i("el-table-column",{attrs:{label:"活动名称","min-width":"200","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(a){return[i("span",{staticClass:"row_activity"},[t._v(t._s(a.row.title))])]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"company_name",label:"公司对外名称","show-overflow-tooltip":"",width:"200"}}),t._v(" "),i("el-table-column",{attrs:{prop:"folder","show-overflow-tooltip":"",label:"板块",width:"130"}}),t._v(" "),i("el-table-column",{attrs:{prop:"menu_name",label:"二级","show-overflow-tooltip":"",width:"350"}}),t._v(" "),i("el-table-column",{attrs:{prop:"city_name",label:"城市","show-overflow-tooltip":"",width:"120"}}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center",fixed:"right","min-width":"250"},scopedSlots:t._u([{key:"default",fn:function(a){return[i("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(e){t.handlePersonal(a.row.active_id)}}},[t._v("预览活动")]),t._v(" "),i("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(e){t.basicButton(a.row.id)}}},[t._v("基本信息")]),t._v(" "),i("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(e){t.examineButton(a.row.id,a.row.active_id)}}},[t._v("查看协议")]),t._v(" "),i("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(e){t.rejectButton(a.row.active_id)}}},[t._v("驳回")]),t._v(" "),i("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(e){t.remarkButton(a.row.active_id)}}},[t._v("添加备注")])]}}])})],1),t._v(" "),t.total?i("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),i("el-dialog",{attrs:{visible:t.basicInfoDialog,width:"705px"},on:{"update:visible":function(a){t.basicInfoDialog=a}}},[i("div",{staticClass:"dialog_head_title ti-le",attrs:{slot:"title"},slot:"title"},[i("img",{attrs:{src:e("TBGK"),alt:""}}),t._v(" "),i("span",[t._v("基本信息")])]),t._v(" "),i("div",{staticClass:"info"},[i("div",[i("div",{staticClass:"info-left"},[i("span",[t._v("活动开始时间：")]),t._v(" "),i("div",[t._v(t._s(t.basicData.active_date_start?t.basicData.active_date_start.split(" ")[0]:""))])]),t._v(" "),i("div",{staticClass:"info-right"},[i("span",[t._v("报名截止时间：")]),t._v(" "),i("div",[t._v(t._s(t.basicData.registration_deadline?t.basicData.registration_deadline.split(" ")[0]:""))])])]),t._v(" "),i("div",{staticClass:"p1"},[i("span",[t._v("活动结束时间：")]),t._v(" "),i("div",[t._v(t._s(t.basicData.active_date_end?t.basicData.active_date_end.split(" ")[0]:""))])]),t._v(" "),i("div",[i("div",{staticClass:"info-left"},[i("span",[t._v("板块：")]),t._v(" "),i("div",[t._v(t._s(t.basicData.menu?t.basicData.menu.folder_name:""))])]),t._v(" "),i("div",{staticClass:"info-right"},[i("span",[t._v("二级目录:")]),t._v(" "),i("div",[t._v(t._s(t.basicData.menu?t.basicData.menu.menu_1_name:""))])])]),t._v(" "),i("div",[i("div",{staticClass:"info-left"},[i("span",[t._v("城市：")]),t._v(" "),i("div",[t._v(t._s(t.basicData.city_name))])]),t._v(" "),i("div",{staticClass:"info-right"},[i("span",[t._v("活动负责人:")]),t._v(" "),i("div",[t._v(t._s(t.basicData.promotee))])])]),t._v(" "),i("div",{staticClass:"p1"},[i("span",[t._v("详细地址：")]),t._v(" "),i("div",[t._v(t._s(t.basicData.address))])]),t._v(" "),i("div",[i("div",{staticClass:"info-left"},[i("span",[t._v("电话：")]),t._v(" "),i("div",[t._v(t._s(t.basicData.telphone))])]),t._v(" "),i("div",{staticClass:"info-right"},[i("span",[t._v("实际结束时间：")]),t._v(" "),i("div",[t._v(t._s(t.basicData.actual_end_time?t.basicData.actual_end_time.split(" ")[0]:"无"))])])])]),t._v(" "),i("div",{staticClass:"act"},[i("div",[i("img",{attrs:{src:e("oDXe"),alt:""}})]),t._v(" "),i("div",[i("img",{attrs:{src:e("yIJ1"),alt:""}}),t._v(" "),i("img",{attrs:{src:e("oDXe"),alt:""}})])]),t._v(" "),i("div",{staticClass:"preview"},[i("div",[t.basicData.admin_upload_protocol?t._e():i("p",[t._v("上传的安全协议")]),t._v(" "),t._l(t.basicData.admin_upload_protocol,function(a){return i("a",{key:a.name,attrs:{href:a.path+"?attname="}},[i("i",{staticClass:"el-icon-document",staticStyle:{margin:"0 10px 0 0",color:"#bfbfbf"}}),t._v(t._s(a.name))])}),t._v(" "),t._l(t.basicData.admin_upload_images,function(a){return i("p",{key:a.name,on:{click:function(e){t.checkImages(a.url)}}},[i("i",{staticClass:"el-icon-picture-outline",staticStyle:{margin:"0 10px 0 0",color:"#bfbfbf"}}),t._v(t._s(a.name))])})],2),t._v(" "),i("div",{staticClass:"attachments"},[t.basicData.attachment?t._e():i("p",[t._v("上传的附件,图片为此公司现场图片，或者计划书等")]),t._v(" "),t._l(t.basicData.attachment,function(a){return i("div",{key:a.name},[t.isPic(a)?i("p",{on:{click:function(e){t.checkImages(t.Tools.handleImg(a.path))}}},[i("i",{staticClass:"el-icon-picture-outline",staticStyle:{margin:"0 10px 0 0",color:"#bfbfbf"}}),t._v(t._s(a.name))]):i("a",{attrs:{href:t.Urls.imageUrl+a.path+"?attname="}},[i("i",{staticClass:"el-icon-document",staticStyle:{margin:"0 10px 0 0",color:"#bfbfbf"}}),t._v(t._s(a.name))])])})],2)]),t._v(" "),i("el-dialog",{attrs:{visible:t.imagesVisible,"append-to-body":""},on:{"update:visible":function(a){t.imagesVisible=a}}},[i("img",{attrs:{width:"100%",src:t.imageUrl,alt:""}})])],1),t._v(" "),i("el-dialog",{attrs:{visible:t.examineVisible,width:"400px"},on:{"update:visible":function(a){t.examineVisible=a}}},[i("div",{staticClass:"dialog_head_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-faxian examine_icon"}),t._v(" "),i("span",[t._v("查看协议")])]),t._v(" "),i("div",{staticClass:"examine_content"},[i("div",{staticClass:"examine_list"},t._l(t.protocolData.protocol,function(a,e){return i("div",{key:e,staticClass:"examine_text"},[i("a",{staticClass:"examine_text",attrs:{href:a.path+"?attname="}},[i("p",{staticClass:"examine_down_p"},[t._v(t._s(e+1)+"."+t._s(" ")+t._s(a.name))]),t._v(" "),i("i",{staticClass:"icon_examine el-icon-download"})])])}))]),t._v(" "),i("div",{staticClass:"img_content"},[i("div",{staticClass:"img_items"},t._l(t.protocolData.images,function(a,e){return i("div",{key:e,class:e%3==0?"img_item1":"img_item"},[i("a",{attrs:{href:a.url+"?attname="}},[i("img",{staticClass:"img",attrs:{src:a.url}}),t._v(" "),i("div",{staticClass:"modal_img"},[i("i",{staticClass:"el-icon-download modal_icon"})])])])}))]),t._v(" "),i("div",{staticClass:"user_footer",attrs:{slot:"footer"},slot:"footer"},[i("el-row",[i("el-button",{staticClass:"btn_foot",attrs:{type:"primary"},on:{click:function(a){t.examineVisible=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{staticClass:"btn_foot",attrs:{type:"primary"},on:{click:t.agreeActivity}},[t._v("通过")])],1)],1)]),t._v(" "),i("el-dialog",{attrs:{visible:t.rejectVisible,width:"360px"},on:{"update:visible":function(a){t.rejectVisible=a}}},[i("div",{staticClass:"dialog_head_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-adduser examine_icon"}),t._v(" "),i("span",[t._v("驳回")])]),t._v(" "),i("div",{staticClass:"reject_content"},[i("p",{staticClass:"reject_p"},[t._v("驳回理由")]),t._v(" "),i("el-input",{staticClass:"reject_input",attrs:{clearable:"",size:"mini"},model:{value:t.rejectReason,callback:function(a){t.rejectReason=a},expression:"rejectReason"}}),t._v(" "),i("p",{staticClass:"reject_p1"},[t._v("驳回类别选择")]),t._v(" "),i("div",{staticClass:"btn_group"},t._l(t.rejectData,function(a){return i("el-button",{key:a.id,class:{btns_s:a.review_id===t.rejectValue,btns:a.review_id!==t.rejectValue},attrs:{size:"mini"},on:{click:function(e){t.handleReject(a.review_id)}}},[t._v("\n          "+t._s(a.name)+"\n        ")])}))],1),t._v(" "),i("div",{staticClass:"user_footer",attrs:{slot:"footer"},slot:"footer"},[i("el-row",{staticClass:"row_e"},[i("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(a){t.rejectVisible=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:t.confirmReject}},[t._v("提交")])],1)],1)]),t._v(" "),i("el-dialog",{attrs:{visible:t.remarkVisible,width:"400px"},on:{"update:visible":function(a){t.remarkVisible=a}}},[i("div",{staticClass:"dialog_head_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-edit-square examine_icon"}),t._v(" "),i("span",[t._v("添加备注")])]),t._v(" "),i("div",{staticClass:"remark_content"},[i("p",{staticClass:"remark_p"},[t._v("内容")]),t._v(" "),i("el-input",{staticClass:"text_area",attrs:{type:"textarea",rows:2,placeholder:"商家的修改，取消，结束活动都将显示在历史里面"},model:{value:t.remark,callback:function(a){t.remark=a},expression:"remark"}}),t._v(" "),i("p",{staticClass:"history_p"},[t._v("历史")]),t._v(" "),i("div",{staticClass:"h_content"},t._l(t.historyData,function(a,e){return i("div",{key:e,staticClass:"history_item"},[i("div",{staticClass:"item_top"},[i("div",{staticClass:"point"}),t._v(" "),i("p",{staticClass:"h_name"},[t._v(t._s(a.create_name))]),t._v(" "),i("p",{staticClass:"h_time"},[t._v(t._s(a.created_at))])]),t._v(" "),i("p",{staticClass:"h_message"},[t._v(t._s(a.content))])])}))],1),t._v(" "),i("div",{staticClass:"user_footer",attrs:{slot:"footer"},slot:"footer"},[i("el-row",{staticClass:"row_e"},[i("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:function(a){t.remarkVisible=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:t.addRemark}},[t._v("提交")])],1)],1)])],1)},staticRenderFns:[]};var o=e("VU/8")(l,n,!1,function(t){e("BRg+"),e("O82L")},"data-v-2c542e9a",null);a.default=o.exports}});