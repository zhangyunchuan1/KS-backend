webpackJsonp([89],{dM5m:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"DefiningAttributes",components:{BreadCrumb:n("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl",icon:"icon-home"},{id:2,name:"商城菜单管理",urls:"/index/functionControl/mallManagement/mall-management",icon:"icon-home"},{id:3,name:"定义数字区间属性",urls:"/index/functionControl/mallManagement/defining-attributes",icon:"icon-home"}],tableData:[],centerDialogVisible:!1,attributeName:"",options:[],value:"",uniten:"",unitcn:"",modifyDialogVisible:!1,amendInfo:{},currentPage:1,pageSize:25,total:0}},mounted:function(){this.getNumAttributes()},methods:{getNumAttributes:function(){var t=this,e={size:this.pageSize,page:this.currentPage};this.HttpClient.post("/admin/numInterval/index",e).then(function(e){200==e.data.code&&(t.tableData=e.data.data.data,t.total=e.data.data.total)})},getattributeName:function(){var t=this;this.HttpClient.post("/admin/numInterval/getName").then(function(e){200==e.data.code&&(t.options=e.data.data)})},addAttributeNameFn:function(){this.centerDialogVisible=!0,this.getattributeName()},checkoutUniten:function(){if(!/[a-zA-Z]+/.test(this.uniten))return this.$message.warning("只允许输入英文"),void(this.uniten="")},checkoutUnitcn:function(){if(!/[\u4e00-\u9fa5]+/.test(this.unitcn))return this.$message.warning("只允许输入中文"),void(this.unitcn="")},handleClick:function(t){var e=this;this.HttpClient.post("/admin/numInterval/changeStatus",{id:t.id,status:1==t.status?0:1}).then(function(t){200==t.data.code&&(e.$message.success(t.data.msg),setTimeout(function(){e.getNumAttributes()},1e3))})},saveAttributeNameFn:function(){var t=this;this.HttpClient.post("/admin/numInterval/create",{name:this.value,unit:this.uniten,unit_cn:this.unitcn}).then(function(e){200==e.data.code?(t.$message.success(e.data.msg),setTimeout(function(){t.getNumAttributes()},500),t.centerDialogVisible=!1):t.$message.warning(e.data.msg)})},sureAttributeNameFn:function(){var t=this,e={id:this.amendInfo.id,unit:this.amendInfo.unit,unit_cn:this.amendInfo.unit_cn};this.HttpClient.post("/admin/numInterval/edit",e).then(function(e){200===e.data.code&&(t.$message.success(e.data.msg),t.modifyDialogVisible=!1,setTimeout(function(){t.getNumAttributes()},500))})},amendClick:function(t){this.modifyDialogVisible=!0,this.amendInfo=t,console.log(this.amendInfo)},currentChange:function(t){this.currentPage=t,this.getNumAttributes()}}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"DefiningAttributes"},[n("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),n("div",{staticClass:"video_titlebox"},[t._m(0),t._v(" "),n("div",{staticClass:"productbox"},[n("div",{staticClass:"product_header"},[n("el-button",{attrs:{type:"primary"},on:{click:t.addAttributeNameFn}},[t._v("添加")])],1),t._v(" "),n("div",{staticClass:"product_header",staticStyle:{width:"100%"}},[n("el-table",{attrs:{data:t.tableData,border:""}},[n("el-table-column",{attrs:{prop:"name",align:"center",label:"属性"}}),t._v(" "),n("el-table-column",{attrs:{prop:"unit",align:"center",label:"单位"}}),t._v(" "),n("el-table-column",{attrs:{prop:"unit_cn",align:"center",label:"中文"}}),t._v(" "),n("el-table-column",{attrs:{prop:"status",align:"center",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(1==e.row.status?"启用":"禁用"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(n){t.handleClick(e.row)}}},[t._v(t._s(1==e.row.status?"禁用":"启用"))]),t._v(" "),n("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(n){t.amendClick(e.row)}}},[t._v("修改")])]}}])})],1)],1),t._v(" "),n("div",{staticClass:"block"},[t.total?n("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1),t._v(" "),n("div",{staticClass:"product_header"},[n("el-dialog",{attrs:{title:"添加",visible:t.centerDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[n("p",[t._v("属性名称：")]),t._v(" "),n("el-select",{attrs:{placeholder:"请选择"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.name}})})),t._v(" "),n("p",[t._v("单位：只能为英文字母")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入内容",clearable:""},on:{change:t.checkoutUniten},model:{value:t.uniten,callback:function(e){t.uniten=e},expression:"uniten"}}),t._v(" "),n("p",[t._v("中文")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入内容",clearable:""},on:{change:t.checkoutUnitcn},model:{value:t.unitcn,callback:function(e){t.unitcn=e},expression:"unitcn"}}),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.centerDialogVisible=!1,t.uniten="",t.unitcn="",t.value=""}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.saveAttributeNameFn}},[t._v("确 定")])],1)],1)],1),t._v(" "),n("div",{staticClass:"product_header"},[n("el-dialog",{attrs:{title:"修改",visible:t.modifyDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.modifyDialogVisible=e}}},[n("p",[t._v("属性名称：")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入内容",disabled:!0},model:{value:t.amendInfo.name,callback:function(e){t.$set(t.amendInfo,"name",e)},expression:"amendInfo.name"}}),t._v(" "),n("p",[t._v("单位：只能为英文字母")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.amendInfo.unit,callback:function(e){t.$set(t.amendInfo,"unit",e)},expression:"amendInfo.unit"}}),t._v(" "),n("p",[t._v("中文")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.amendInfo.unit_cn,callback:function(e){t.$set(t.amendInfo,"unit_cn",e)},expression:"amendInfo.unit_cn"}}),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.modifyDialogVisible=!1,t.amendInfo.unit="",t.amendInfo.unit_cn="",t.amendInfo.name=""}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.sureAttributeNameFn}},[t._v("确 定")])],1)],1)],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"videopage_title"},[e("div",{staticClass:"title"},[this._v("定义数字区间属性")])])}]};var l=n("VU/8")(a,i,!1,function(t){n("lIyP")},null,null);e.default=l.exports},lIyP:function(t,e){}});