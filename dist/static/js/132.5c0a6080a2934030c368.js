webpackJsonp([132],{"6PuJ":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("mvHQ"),n=a.n(i),l={name:"MerchantRevenueTips",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl",icon:"icon-home"},{id:2,name:"收支管理",urls:"/index/functionControl/incomeControl/income-control",icon:"icon-home"},{id:3,name:"商家收支管理",urls:"/index/functionControl/incomeControl/merchant-revenue-tips",icon:"icon-home"}],tableData:[],alertTitle:"",centerDialogVisible:!1,options:[],value:"",childOptions:[],childValue:"",tags:[],inputValue:"",textarea:"",menuList:["系统","用户","商家"],positionValue:"",selectVideotitle:"",infoID:null,currentPage:1,pageSize:25,total:0}},mounted:function(){this.getlistData()},methods:{getlistData:function(){var t=this,e={type:6,size:this.pageSize,page:this.currentPage};this.HttpClient.post("/admin/templates/getList",e).then(function(e){200===e.data.code&&(t.total=e.data.data.total,t.tableData=e.data.data.data,console.log(e.data))})},addInformationFn:function(){this.tags.push(this.positionValue),this.positionValue=""},openAlertbox:function(){var t=this;this.alertTitle="添加",this.infoID=null,this.value="",this.childValue="",this.inputValue="",this.tags=[],this.textarea="",this.selectVideotitle="",this.centerDialogVisible=!0;this.HttpClient.post("/admin/menu/getList",{menu_type:4,type:3}).then(function(e){200==e.data.code&&(t.options=e.data.data)})},changeOneModel:function(){for(var t in this.childValue="",this.options)this.value==this.options[t].menu_id&&(this.childOptions=this.options[t].child)},sureAddinforFn:function(){var t=this;this.centerDialogVisible=!1,this.centerDialogVisible=!1;var e={};e.menu_1=this.value,e.menu_2=this.childValue,e.for=this.selectVideotitle,e.info=this.inputValue,e.description=this.textarea,e.replace=this.tags;var a=(new Date).getTime();if("修改"==this.alertTitle){var i={id:this.infoID,type:6,name:a,content:n()(e)};this.HttpClient.post("/admin/templates/edit",i).then(function(e){t.$message.success(e.data.msg),console.log(e.data),200===e.data.code&&setTimeout(function(){t.getlistData()},500)})}else if("添加"==this.alertTitle){var l={type:6,name:a,content:n()(e)};this.HttpClient.post("/admin/templates/create",l).then(function(e){console.log(e.data),200===e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getlistData()},500))})}},amendInfo:function(t){var e=this;this.alertTitle="修改",this.infoID=t.id,this.centerDialogVisible=!0,this.value=t.content.menu_1,this.childValue=t.content.menu_2,this.inputValue=t.content.info,this.tags=t.content.replace,this.textarea=t.content.description,this.selectVideotitle=t.content.for;this.HttpClient.post("/admin/menu/getList",{menu_type:4,type:3}).then(function(t){if(200==t.data.code)for(var a in e.options=t.data.data,e.options)e.value==e.options[a].menu_id&&(e.childOptions=e.options[a].child)})},deleteInfo:function(t){var e=this,a={id:t.id};this.HttpClient.post("/admin/templates/destroy",a).then(function(t){200===t.data.code&&(e.$message.success(t.data.msg),setTimeout(function(){e.getlistData()},500))})},deleteInforFn:function(t){var e=this;this.tags.forEach(function(a,i){t==a&&e.tags.splice(i,1)})},currentChange:function(t){this.currentPage=t,this.getlistData()}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"paymentmanagementBox"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"paymentbox"},[t._m(0),t._v(" "),a("div",{staticStyle:{padding:"20px","box-sizing":"border-box"}},[a("div",{staticClass:"buttonbox"},[a("el-button",{attrs:{type:"primary"},on:{click:t.openAlertbox}},[t._v("添加")])],1),t._v(" "),a("div",{staticClass:"tablebox"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"menu[0].name",label:"类别"}}),t._v(" "),a("el-table-column",{attrs:{prop:"menu[1].name",label:"子类别"}}),t._v(" "),a("el-table-column",{attrs:{prop:"content.description",label:"事件",width:"220","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"content.info",label:"信息内容","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"content.for",label:"发起对象"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(1===e.row.status?"正常":"禁用"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.amendInfo(e.row)}}},[t._v("修改")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.deleteInfo(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])]),t._v(" "),a("div",{staticClass:"alertbox"},[a("el-dialog",{attrs:{title:t.alertTitle,visible:t.centerDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[a("div",{staticClass:"grade"},[a("el-tag",{attrs:{type:"info"}},[t._v("类别")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.changeOneModel},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,function(t){return a("el-option",{key:t.menu_id,attrs:{label:t.name,value:t.menu_id}})}))],1),t._v(" "),a("div",{staticClass:"grade"},[a("el-tag",{attrs:{type:"info"}},[t._v("子类别")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.childValue,callback:function(e){t.childValue=e},expression:"childValue"}},t._l(t.childOptions,function(t){return a("el-option",{key:t.menu_id,attrs:{label:t.name,value:t.menu_id}})}))],1),t._v(" "),a("div",{staticClass:"grade"},[a("el-input",{attrs:{type:"textarea",rows:2,resize:"none",placeholder:"事件"},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}})],1),t._v(" "),a("div",{staticClass:"grade infor"},[a("el-tag",{attrs:{type:"info"}},[t._v("信息")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}})],1),t._v(" "),a("div",{staticClass:"grade infor"},[a("el-tag",{attrs:{type:"info"}},[t._v("定位符")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.positionValue,callback:function(e){t.positionValue=e},expression:"positionValue"}}),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.addInformationFn}})],1),t._v(" "),a("el-card",{staticClass:"grade box-card"},t._l(t.tags,function(e){return a("el-tag",{key:e,attrs:{closable:"修改"===t.alertTitle,type:""},on:{close:function(a){t.deleteInforFn(e)}}},[t._v(t._s(e))])})),t._v(" "),a("div",{staticClass:"grade"},[a("el-tag",{attrs:{type:"info"}},[t._v("发起对象")]),t._v(" "),a("el-radio-group",{attrs:{size:"small"},model:{value:t.selectVideotitle,callback:function(e){t.selectVideotitle=e},expression:"selectVideotitle"}},t._l(t.menuList,function(e,i){return a("el-radio",{key:i,attrs:{label:e,border:""}},[t._v(t._s(e))])}))],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.centerDialogVisible=!1,t.tags=[]}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.sureAddinforFn}},[t._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"titlebox"},[e("span",[this._v("商家收支管理")])])}]};var s=a("VU/8")(l,o,!1,function(t){a("bwfp")},null,null);e.default=s.exports},bwfp:function(t,e){}});