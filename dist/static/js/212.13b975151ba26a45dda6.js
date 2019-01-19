webpackJsonp([212],{LzSR:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"CategoryManagement",components:{BreadCrumb:i("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl/FunctionControl",icon:"icon-home"},{id:2,name:"专业目录",urls:"/index/market/functionControl/professionalCatalog/ProfessionalCatalog",icon:"icon-home"},{id:3,name:"添加目录",urls:"/index/market/functionControl/professionalCatalog/AddDirectory",icon:"icon-home"}],customerType:2,modifyVisible:!1,inputa:null,inputb:null,plateRadio:null,primaryDirectoryRadio:null,subcategory:!1,plateList:[],firstLevelDirectory:[],pid:null,categoryName:null,controlObj:null}},mounted:function(){this.getCategorylist()},methods:{handleChangeUserType:function(t){console.log(t),this.getCategorylist(),this.subcategory=!1,this.firstLevelDirectory=[]},handleModify:function(t){console.log(t),this.controlObj=t,this.categoryName=t.name,this.modifyVisible=!0},handlePrimary:function(){var t=this;console.log(this.controlObj,this.categoryName),this.HttpClient.post("/admin/menu/edit",{id:this.controlObj.id,menu_type:4,name:this.categoryName,pid:this.controlObj.pid,type:this.controlObj.type}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.HttpClient.post("/admin/menu/getList",{menu_type:4,type:t.customerType}).then(function(e){if(console.log(e),200===e.data.code){for(var i in t.plateList=e.data.data,e.data.data)t.controlObj.pid===e.data.data[i].id&&(t.firstLevelDirectory=e.data.data[i].child);t.modifyVisible=!1}})},1e3))})},handleAddCategory:function(){var t=this;console.log(this.inputa),this.HttpClient.post("/admin/menu/create",{menu_type:4,name:this.inputa,pid:0,type:this.customerType}).then(function(e){console.log(e),200===e.data.code&&(t.inputa="",setTimeout(function(){t.getCategorylist()},1e3),t.subcategory=!1)})},getCategorylist:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:4,type:this.customerType}).then(function(e){console.log(e),t.plateList=e.data.data})},plateBtm:function(t){for(var e in this.firstLevelDirectory=[],console.log(t),this.pid=t,console.log(this.plateList),this.plateList)t===this.plateList[e].id&&void 0!==this.plateList[e].child&&(console.log(this.plateList[e].child),this.firstLevelDirectory=this.plateList[e].child);this.subcategory=!0},handleAddSubcategory:function(){var t=this;console.log(this.inputb,this.pid),this.HttpClient.post("/admin/menu/create",{menu_type:4,name:this.inputb,pid:this.pid,type:this.customerType}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),t.inputb="",setTimeout(function(){t.HttpClient.post("/admin/menu/getList",{menu_type:4,type:t.customerType}).then(function(e){if(console.log(e),200===e.data.code)for(var i in t.plateList=e.data.data,e.data.data)t.pid===e.data.data[i].id&&(t.firstLevelDirectory=e.data.data[i].child)})},1e3))})},handleProhibit:function(t){var e=this;console.log(t),this.HttpClient.post("/admin/menu/destroy",{menu_type:4,id:t}).then(function(t){console.log(t),200===t.data.code&&(e.$message.success(t.data.msg),setTimeout(function(){e.HttpClient.post("/admin/menu/getList",{menu_type:4,type:e.customerType}).then(function(t){if(console.log(t),200===t.data.code){for(var i in e.plateList=t.data.data,e.plateList)if(void 0!==e.plateList[i].child)for(var a in e.plateList[i].child)1===e.plateList[i].child[a].status?e.plateList[i].is_true=1:0===e.plateList[i].child[a].status&&(e.plateList[i].is_true=0);for(var o in t.data.data)e.pid===t.data.data[o].id&&(e.firstLevelDirectory=t.data.data[o].child)}})},1e3))})},handleRecovery:function(t){var e=this;console.log(t),this.HttpClient.post("/admin/menu/changeStatus",{menu_type:4,id:t,status:1}).then(function(t){console.log(t),200===t.data.code&&(e.$message.success(t.data.msg),setTimeout(function(){e.HttpClient.post("/admin/menu/getList",{menu_type:4,type:e.customerType}).then(function(t){if(console.log(t),200===t.data.code){for(var i in e.plateList=t.data.data,e.plateList)if(void 0!==e.plateList[i].child)for(var a in e.plateList[i].child)1===e.plateList[i].child[a].status?e.plateList[i].is_true=1:0===e.plateList[i].child[a].status&&(e.plateList[i].is_true=0);for(var o in t.data.data)e.pid===t.data.data[o].id&&(e.firstLevelDirectory=t.data.data[o].child)}})},1e3))})},primaryDirectoryBtm:function(t){console.log(t)},jiny:function(){console.log(1)},huif:function(){console.log(2)},xiug:function(){console.log(3)}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"CategoryManagement"},[i("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),i("div",{staticClass:"addDirectory_main"},[t._m(0),t._v(" "),i("div",{staticClass:"content"},[i("div",{staticClass:"customer_type"},[i("div",{staticClass:"customer_select"},[t._v("用户类型")]),t._v(" "),i("div",{staticClass:"select"},[i("el-radio-group",{on:{change:function(e){t.handleChangeUserType(e)}},model:{value:t.customerType,callback:function(e){t.customerType=e},expression:"customerType"}},[i("el-radio-button",{attrs:{label:2}},[t._v("用户")]),t._v(" "),i("el-radio-button",{attrs:{label:3}},[t._v("商家")])],1)],1)]),t._v(" "),i("div",{staticClass:"all_categories"},[i("div",{staticClass:"categories_top"},[i("div",{staticClass:"top_title"},[t._v("一级类别")]),t._v(" "),i("el-input",{attrs:{placeholder:"添加一级类别"},model:{value:t.inputa,callback:function(e){t.inputa=e},expression:"inputa"}}),t._v(" "),i("el-button",{staticClass:"add_btn",on:{click:t.handleAddCategory}},[t._v("+")])],1),t._v(" "),i("div",{staticClass:"categories_bottom"},[i("el-radio-group",{on:{change:function(e){t.plateBtm(e)}},model:{value:t.plateRadio,callback:function(e){t.plateRadio=e},expression:"plateRadio"}},t._l(t.plateList,function(e,a){return i("div",{key:a,staticClass:"plate_list"},[i("el-radio-button",{attrs:{label:e.id}},[t._v(t._s(e.name))]),t._v(" "),1===e.status?i("el-button",{attrs:{type:"warning"},on:{click:function(i){t.handleProhibit(e.id)}}},[t._v("禁用")]):t._e(),t._v(" "),0===e.status?i("el-button",{attrs:{type:"primary"},on:{click:function(i){t.handleRecovery(e.id)}}},[t._v("恢复")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"info"},on:{click:function(i){t.handleModify(e)}}},[t._v("修改")])],1)}))],1)]),t._v(" "),t.subcategory?i("div",{staticClass:"categories"},[i("div",{staticClass:"categories_top"},[i("div",{staticClass:"top_title"},[t._v("子类别")]),t._v(" "),i("el-input",{attrs:{placeholder:"添加子类别"},model:{value:t.inputb,callback:function(e){t.inputb=e},expression:"inputb"}}),t._v(" "),i("el-button",{staticClass:"add_btn",on:{click:t.handleAddSubcategory}},[t._v("+")])],1),t._v(" "),i("div",{staticClass:"categories_bottom"},[i("el-radio-group",{on:{change:function(e){t.primaryDirectoryBtm(e)}},model:{value:t.primaryDirectoryRadio,callback:function(e){t.primaryDirectoryRadio=e},expression:"primaryDirectoryRadio"}},t._l(t.firstLevelDirectory,function(e,a){return i("div",{key:a,staticClass:"plate_list"},[i("el-radio-button",{attrs:{label:e.id}},[t._v(t._s(e.name))]),t._v(" "),1===e.status?i("el-button",{attrs:{type:"warning"},on:{click:function(i){t.handleProhibit(e.id)}}},[t._v("禁用")]):t._e(),t._v(" "),0===e.status?i("el-button",{attrs:{type:"primary"},on:{click:function(i){t.handleRecovery(e.id)}}},[t._v("恢复")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"info"},on:{click:function(i){t.handleModify(e)}}},[t._v("修改")])],1)}))],1)]):t._e()])]),t._v(" "),i("el-dialog",{attrs:{visible:t.modifyVisible,width:"470px","custom-class":"RemarksDialog"},on:{"update:visible":function(e){t.modifyVisible=e}}},[i("span",{staticClass:"RemarksDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-edit-square"}),t._v("修改")]),t._v(" "),i("div",{staticClass:"RemarksDialog_main"},[i("p",[t._v("类别名称：")]),t._v(" "),i("el-input",{attrs:{placeholder:"输入类别名称"},model:{value:t.categoryName,callback:function(e){t.categoryName=e},expression:"categoryName"}})],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.modifyVisible=!1}}},[t._v("关 闭")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.handlePrimary}},[t._v("提 交")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("类别管理")])])}]};var s=i("VU/8")(a,o,!1,function(t){i("UgR8")},null,null);e.default=s.exports},UgR8:function(t,e){}});