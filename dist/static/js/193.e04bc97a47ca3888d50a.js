webpackJsonp([193],{fpOj:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"DirectoryManagement",components:{BreadCrumb:i("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl/FunctionControl",icon:"icon-home"},{id:2,name:"商城菜单管理",urls:"/index/market/functionControl/professionalCatalog/ProfessionalCatalog",icon:"icon-home"},{id:3,name:"目录管理",urls:"/index/market/functionControl/professionalCatalog/AddDirectory",icon:"icon-home"}],modifyVisible:!1,inputa:null,inputb:null,inputc:null,plateValue:null,plateRadio:null,primaryDirectoryRadio:null,threeDirectoryRadio:null,firstDirectory:!1,twoDirectory:!1,threeDirectory:!1,plateList:[],firstLevelDirectory:[],twoLevelDirectory:[],threeLevelDirectory:[],obj1:null,obj2:null,obj3:null,currentType:null,categoryName:null,controlObj:null}},mounted:function(){this.getPlateList()},methods:{handleModify:function(t){console.log(t),this.controlObj=t,this.categoryName=t.name,this.modifyVisible=!0},handlePrimary:function(){var t=this;console.log(this.controlObj,this.categoryName),this.HttpClient.post("/admin/menu/edit",{id:this.controlObj.id,menu_type:1,name:this.categoryName,pid:this.controlObj.pid,type:this.controlObj.type}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),t.categoryName="",setTimeout(function(){1===t.controlObj.type?t.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:t.obj1.menu_id}).then(function(e){console.log(e),t.firstLevelDirectory=e.data.data.child}):2===t.controlObj.type?t.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:t.obj2.menu_id}).then(function(e){console.log(e),t.twoLevelDirectory=e.data.data.child}):3===t.controlObj.type&&t.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:t.obj3.menu_id}).then(function(e){console.log(e),t.threeLevelDirectory=e.data.data.child}),t.modifyVisible=!1},1e3))})},getPlateList:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:1,type:0}).then(function(e){console.log(e),t.plateList=e.data.data})},handleChangePlate:function(t){var e=this;this.twoDirectory=!1,this.threeDirectory=!1,this.twoLevelDirectory=[],this.threeLevelDirectory=[],this.obj1=t,this.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:t.menu_id}).then(function(t){console.log(t),e.firstLevelDirectory=t.data.data.child})},plateBtm:function(t){var e=this;console.log(t),this.threeDirectory=!1,this.threeLevelDirectory=[],this.obj2=t,this.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:t.menu_id}).then(function(t){console.log(t),e.twoLevelDirectory=t.data.data.child,e.twoDirectory=!0})},primaryDirectoryBtmb:function(t){var e=this;console.log(t),this.obj3=t,this.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:t.menu_id}).then(function(t){console.log(t),e.threeLevelDirectory=t.data.data.child,e.threeDirectory=!0})},primaryDirectoryBtmc:function(t){console.log(t)},addList:function(t,e){var i=this;console.log(this.currentType,e),this.HttpClient.post("/admin/menu/create",{menu_type:1,name:t,pid:e,type:this.currentType}).then(function(t){console.log(t),200===t.data.code&&(i.$message.success(t.data.msg),i.inputa="",i.inputb="",i.inputc="",setTimeout(function(){1===i.currentType?i.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:i.obj1.menu_id}).then(function(t){console.log(t),i.firstLevelDirectory=t.data.data.child}):2===i.currentType?i.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:i.obj2.menu_id}).then(function(t){console.log(t),i.twoLevelDirectory=t.data.data.child}):3===i.currentType&&i.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:i.obj3.menu_id}).then(function(t){console.log(t),i.threeLevelDirectory=t.data.data.child})},1e3))})},handleAddCategory:function(){console.log(this.obj1.id,this.inputa),this.currentType=1,this.addList(this.inputa,this.obj1.id)},handleAddSubcategory:function(){console.log(this.obj2.id,this.inputb),this.currentType=2,this.addList(this.inputb,this.obj2.id)},handleAddTreeeSubcategory:function(){console.log(this.obj3.id,this.inputc),this.currentType=3,this.addList(this.inputc,this.obj3.id)},prohibitList:function(t,e){var i=this;this.HttpClient.post("/admin/menu/destroy",{menu_type:1,id:t.id}).then(function(t){console.log(t),200===t.data.code?(i.$message.success(t.data.msg),setTimeout(function(){1===e?i.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:i.obj1.menu_id}).then(function(t){console.log(t),i.firstLevelDirectory=t.data.data.child}):2===e?i.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:i.obj2.menu_id}).then(function(t){console.log(t),i.twoLevelDirectory=t.data.data.child}):3===e&&i.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:i.obj3.menu_id}).then(function(t){console.log(t),i.threeLevelDirectory=t.data.data.child})},1e3)):i.$message.error(t.data.msg)})},handleProhibit:function(t,e){console.log(t),this.prohibitList(t,e)},recoveryList:function(t,e){var i=this;this.HttpClient.post("/admin/menu/changeStatus",{menu_type:1,id:t.id,status:1}).then(function(t){console.log(t),200===t.data.code?(i.$message.success(t.data.msg),setTimeout(function(){1===e?i.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:i.obj1.menu_id}).then(function(t){console.log(t),i.firstLevelDirectory=t.data.data.child}):2===e?i.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:i.obj2.menu_id}).then(function(t){console.log(t),i.twoLevelDirectory=t.data.data.child}):3===e&&i.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:1,menu_id:i.obj3.menu_id}).then(function(t){console.log(t),i.threeLevelDirectory=t.data.data.child})},1e3)):i.$message.error(t.data.msg)})},handleRecovery:function(t,e){console.log(t),this.recoveryList(t,e)},jiny:function(){console.log(1)},huif:function(){console.log(2)},xiug:function(){console.log(3)}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"DirectoryManagement"},[i("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),i("div",{staticClass:"addDirectory_main"},[t._m(0),t._v(" "),i("div",{staticClass:"content"},[i("div",{staticClass:"select"},[i("el-radio-group",{on:{change:function(e){t.handleChangePlate(e)}},model:{value:t.plateValue,callback:function(e){t.plateValue=e},expression:"plateValue"}},t._l(t.plateList,function(e,n){return i("el-radio-button",{key:n,attrs:{label:e}},[t._v(t._s(e.name))])}))],1),t._v(" "),i("div",{staticClass:"all_categories"},[i("div",{staticClass:"categories_top"},[i("div",{staticClass:"top_title"},[t._v("一级目录")]),t._v(" "),i("el-input",{attrs:{placeholder:"添加一级目录"},model:{value:t.inputa,callback:function(e){t.inputa=e},expression:"inputa"}}),t._v(" "),i("el-button",{staticClass:"add_btn",on:{click:t.handleAddCategory}},[t._v("+")])],1),t._v(" "),i("div",{staticClass:"categories_bottom"},[i("el-radio-group",{on:{change:function(e){t.plateBtm(e)}},model:{value:t.plateRadio,callback:function(e){t.plateRadio=e},expression:"plateRadio"}},t._l(t.firstLevelDirectory,function(e,n){return i("div",{key:n,staticClass:"plate_list"},[i("el-radio-button",{attrs:{label:e}},[t._v(t._s(e.name))]),t._v(" "),1===e.status&&!1===e.has_child?i("el-button",{attrs:{type:"warning"},on:{click:function(i){t.handleProhibit(e,1)}}},[t._v("禁用")]):t._e(),t._v(" "),0===e.status&&!1===e.has_child?i("el-button",{attrs:{type:"primary"},on:{click:function(i){t.handleRecovery(e,1)}}},[t._v("恢复")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"info"},on:{click:function(i){t.handleModify(e)}}},[t._v("修改")])],1)}))],1)]),t._v(" "),t.twoDirectory?i("div",{staticClass:"categories"},[i("div",{staticClass:"categories_top"},[i("div",{staticClass:"top_title"},[t._v("二级目录")]),t._v(" "),i("el-input",{attrs:{placeholder:"添加二级目录"},model:{value:t.inputb,callback:function(e){t.inputb=e},expression:"inputb"}}),t._v(" "),i("el-button",{staticClass:"add_btn",on:{click:t.handleAddSubcategory}},[t._v("+")])],1),t._v(" "),i("div",{staticClass:"categories_bottom"},[i("el-radio-group",{on:{change:function(e){t.primaryDirectoryBtmb(e)}},model:{value:t.primaryDirectoryRadio,callback:function(e){t.primaryDirectoryRadio=e},expression:"primaryDirectoryRadio"}},t._l(t.twoLevelDirectory,function(e,n){return i("div",{key:n,staticClass:"plate_list"},[i("el-radio-button",{attrs:{label:e}},[t._v(t._s(e.name))]),t._v(" "),1===e.status&&!1===e.has_child?i("el-button",{attrs:{type:"warning"},on:{click:function(i){t.handleProhibit(e,2)}}},[t._v("禁用")]):t._e(),t._v(" "),0===e.status&&!1===e.has_child?i("el-button",{attrs:{type:"primary"},on:{click:function(i){t.handleRecovery(e,2)}}},[t._v("恢复")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"info"},on:{click:function(i){t.handleModify(e)}}},[t._v("修改")])],1)}))],1)]):t._e(),t._v(" "),t.threeDirectory?i("div",{staticClass:"categories"},[i("div",{staticClass:"categories_top"},[i("div",{staticClass:"top_title"},[t._v("三级目录")]),t._v(" "),i("el-input",{attrs:{placeholder:"添加三级目录"},model:{value:t.inputc,callback:function(e){t.inputc=e},expression:"inputc"}}),t._v(" "),i("el-button",{staticClass:"add_btn",on:{click:t.handleAddTreeeSubcategory}},[t._v("+")])],1),t._v(" "),i("div",{staticClass:"categories_bottom"},[i("el-radio-group",{on:{change:function(e){t.primaryDirectoryBtmc(e)}},model:{value:t.threeDirectoryRadio,callback:function(e){t.threeDirectoryRadio=e},expression:"threeDirectoryRadio"}},t._l(t.threeLevelDirectory,function(e,n){return i("div",{key:n,staticClass:"plate_list"},[i("el-radio-button",{attrs:{label:e}},[t._v(t._s(e.name))]),t._v(" "),1===e.status?i("el-button",{attrs:{type:"warning"},on:{click:function(i){t.handleProhibit(e,3)}}},[t._v("禁用")]):t._e(),t._v(" "),0===e.status?i("el-button",{attrs:{type:"primary"},on:{click:function(i){t.handleRecovery(e,3)}}},[t._v("恢复")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"info"},on:{click:function(i){t.handleModify(e)}}},[t._v("修改")])],1)}))],1)]):t._e()])]),t._v(" "),i("el-dialog",{attrs:{visible:t.modifyVisible,width:"470px","custom-class":"RemarksDialog"},on:{"update:visible":function(e){t.modifyVisible=e}}},[i("span",{staticClass:"RemarksDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-edit-square"}),t._v("备注")]),t._v(" "),i("div",{staticClass:"RemarksDialog_main"},[i("p",[t._v("类别名称：")]),t._v(" "),i("el-input",{attrs:{placeholder:"输入类别名称"},model:{value:t.categoryName,callback:function(e){t.categoryName=e},expression:"categoryName"}})],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.modifyVisible=!1}}},[t._v("关 闭")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.handlePrimary}},[t._v("提 交")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("目录管理")])])}]};var a=i("VU/8")(n,o,!1,function(t){i("kdJu")},null,null);e.default=a.exports},kdJu:function(t,e){}});