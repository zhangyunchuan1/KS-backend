webpackJsonp([95],{"+Y5p":function(t,e){},f4kE:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"AddDirectory",components:{BreadCrumb:i("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl/FunctionControl",icon:"icon-home"},{id:2,name:"专业目录",urls:"/index/market/functionControl/professionalCatalog/ProfessionalCatalog",icon:"icon-home"},{id:3,name:"添加目录",urls:"/index/market/functionControl/professionalCatalog/AddDirectory",icon:"icon-home"}],plateRadio:null,primaryDirectory:!1,primaryDirectoryRadio:null,secondaryDirectory:!1,secondaryDirectoryRadio:null,threelDirectory:!1,threelDirectoryRadio:null,addCategoryDialog:!1,addDirectoryDialog:!1,dialogImageUrl:"",dialogVisible:!1,textarea:null,plateList:[],firstLevelDirectory:[],twoLevelDirectory:[],threeLevelDirectory:[],firstPid:null,twoPid:null,threePid:null,zeroMenuId:null,firstMenuId:null,twoMenuId:null,type:null,imgUrl:null,fileList:[],fileList2:[],CategoryName:null}},mounted:function(){this.getMenuList()},methods:{handleSaveDirectory:function(){var t=this,e=null;console.log(this.firstPid,this.type),1===this.type?(console.log(this.zeroMenuId),e=this.firstPid):2===this.type?(console.log(this.firstMenuId),e=this.twoPid):3===this.type&&(console.log(this.twoMenuId),e=this.threePid),this.HttpClient.post("/admin/menu/create",{menu_type:3,pid:e,type:this.type,name:this.CategoryName,description:this.textarea,images:this.imgUrl}).then(function(e){console.log(e),200===e.data.code&&(t.imgUrl=null,t.CategoryName=null,t.textarea=null,1===t.type?(t.twoLevelDirectory=[],t.threeLevelDirectory=[],t.secondaryDirectory=!1,t.threelDirectory=!1,t.primaryDirectoryRadio=null,t.secondaryDirectoryRadio=null,t.threelDirectoryRadio=null,setTimeout(function(){t.getNextList(t.zeroMenuId),t.addDirectoryDialog=!1},1e3)):2===t.type?(t.threeLevelDirectory=[],t.threelDirectory=!1,t.secondaryDirectoryRadio=null,t.threelDirectoryRadio=null,setTimeout(function(){t.getNextList(t.firstMenuId),t.addDirectoryDialog=!1},1e3)):3===t.type&&(t.threelDirectoryRadio=null,setTimeout(function(){t.getNextList(t.twoMenuId),t.addDirectoryDialog=!1},1e3)))})},handleSaveCategory:function(){var t=this;console.log(this.CategoryName,this.textarea,this.imgUrl),this.HttpClient.post("/admin/menu/create",{menu_type:3,pid:0,type:0,name:this.CategoryName,description:this.textarea,images:this.imgUrl}).then(function(e){console.log(e),200===e.data.code&&(t.imgUrl=null,t.CategoryName=null,t.textarea=null,t.firstLevelDirectory=[],t.twoLevelDirectory=[],t.threeLevelDirectory=[],t.primaryDirectory=!1,t.secondaryDirectory=!1,t.threelDirectory=!1,t.primaryDirectoryRadio=null,t.getMenuList(),t.addCategoryDialog=!1)})},beforeFileUpload:function(t,e){var i=this;console.log(t,this.fileList);var a=new FormData;a.append("token",window.localStorage.token),a.append("images",t),this.$ajax.post("http://test.kslab.com/api/admin/uploadOneImage",a).then(function(t){console.log(t),200===t.data.code&&(i.imgUrl=t.data.path)})},handleAddCategory:function(t,e){console.log(t,e),this.addCategoryDialog=!0},handleAddDirectory:function(t){console.log(t),this.type=t,1===t?console.log(this.firstPid):2===t?console.log(this.twoPid):3===t&&console.log(this.threePid),this.addDirectoryDialog=!0},getMenuList:function(t){var e=this;this.HttpClient.post("/admin/menu/getList",{menu_type:3,type:0}).then(function(t){console.log(t),e.plateList=t.data.data})},getNextList:function(t){var e=this;this.HttpClient.post("/admin/menu/getOneChild",{menu_type:3,menu_id:t}).then(function(t){console.log(t),200===t.data.code&&(t.data.data.child.length>0?1===t.data.data.child[0].type?(e.firstLevelDirectory=t.data.data.child,e.firstPid=t.data.data.child[0].pid,e.zeroMenuId=t.data.data.info.menu_id):2===t.data.data.child[0].type?(e.twoLevelDirectory=t.data.data.child,e.twoPid=t.data.data.child[0].pid,e.firstMenuId=t.data.data.info.menu_id):3===t.data.data.child[0].type&&(e.threeLevelDirectory=t.data.data.child,e.threePid=t.data.data.child[0].pid,e.twoMenuId=t.data.data.info.menu_id):0===t.data.data.info.type?(e.firstLevelDirectory=[],e.firstPid=t.data.data.info.id,e.zeroMenuId=t.data.data.info.menu_id):1===t.data.data.info.type?(e.twoLevelDirectory=[],e.twoPid=t.data.data.info.id,e.firstMenuId=t.data.data.info.menu_id):2===t.data.data.info.type&&(e.twoMenuId=t.data.data.info.menu_id,e.threePid=t.data.data.info.id,e.threeLevelDirectory=[]))})},plateBtm:function(t){console.log(t),this.twoLevelDirectory=[],this.threeLevelDirectory=[],this.getNextList(t),this.primaryDirectory=!0,this.secondaryDirectory=!1,this.threelDirectory=!1,this.primaryDirectoryRadio=null},primaryDirectoryBtm:function(t){console.log(t),this.threeLevelDirectory=[],this.getNextList(t),this.secondaryDirectory=!0,this.threelDirectory=!1,this.secondaryDirectoryRadio=null},secondaryDirectoryBtm:function(t){console.log(t),this.getNextList(t),this.threelDirectory=!0,this.threelDirectoryRadio=null},handleRemove:function(t,e){console.log(t,e)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"addDirectory"},[i("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),i("div",{staticClass:"addDirectory_main"},[t._m(0),t._v(" "),i("div",{staticClass:"content"},[i("div",{staticClass:"content_plate"},[i("p",[i("el-button",{staticClass:"addDirectory_btm",attrs:{type:"primary"},on:{click:function(e){t.handleAddCategory(0,0)}}},[t._v("添加类别")])],1),t._v(" "),i("el-radio-group",{on:{change:function(e){t.plateBtm(e)}},model:{value:t.plateRadio,callback:function(e){t.plateRadio=e},expression:"plateRadio"}},t._l(t.plateList,function(e,a){return i("el-radio",{key:a,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])}))],1),t._v(" "),i("el-collapse-transition",[t.primaryDirectory?i("div",{staticClass:"content_list"},[i("div",{staticClass:"content_list_header"},[i("p",[t._v("一级目录")]),t._v(" "),i("el-button",{on:{click:function(e){t.handleAddDirectory(1)}}},[t._v("添加")])],1),t._v(" "),i("div",{staticClass:"content_list_box"},[i("el-radio-group",{on:{change:function(e){t.primaryDirectoryBtm(e)}},model:{value:t.primaryDirectoryRadio,callback:function(e){t.primaryDirectoryRadio=e},expression:"primaryDirectoryRadio"}},t._l(t.firstLevelDirectory,function(e,a){return i("el-radio",{key:a,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])}))],1)]):t._e()]),t._v(" "),i("el-collapse-transition",[t.secondaryDirectory?i("div",{staticClass:"content_list"},[i("div",{staticClass:"content_list_header"},[i("p",[t._v("二级目录")]),t._v(" "),i("el-button",{on:{click:function(e){t.handleAddDirectory(2)}}},[t._v("添加")])],1),t._v(" "),i("div",{staticClass:"content_list_box"},[i("el-radio-group",{on:{change:function(e){t.secondaryDirectoryBtm(e)}},model:{value:t.secondaryDirectoryRadio,callback:function(e){t.secondaryDirectoryRadio=e},expression:"secondaryDirectoryRadio"}},t._l(t.twoLevelDirectory,function(e,a){return i("el-radio",{key:a,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])}))],1)]):t._e()]),t._v(" "),i("el-collapse-transition",[t.threelDirectory?i("div",{staticClass:"content_list"},[i("div",{staticClass:"content_list_header"},[i("p",[t._v("三级目录")]),t._v(" "),i("el-button",{on:{click:function(e){t.handleAddDirectory(3)}}},[t._v("添加")])],1),t._v(" "),i("div",{staticClass:"content_list_box"},[i("el-radio-group",{model:{value:t.threelDirectoryRadio,callback:function(e){t.threelDirectoryRadio=e},expression:"threelDirectoryRadio"}},t._l(t.threeLevelDirectory,function(e,a){return i("el-radio",{key:a,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])}))],1)]):t._e()])],1)]),t._v(" "),i("el-dialog",{attrs:{visible:t.addCategoryDialog,width:"470px","custom-class":"addDirectoryDialog"},on:{"update:visible":function(e){t.addCategoryDialog=e}}},[i("span",{staticClass:"addDirectoryDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-orderedlist"}),t._v("添加类别")]),t._v(" "),i("div",{staticClass:"addDirectoryDialog_main"},[i("div",{staticClass:"dialog_main_header"},[i("p",[t._v("类别名称：")]),t._v(" "),i("el-input",{attrs:{placeholder:"输入类别名称"},model:{value:t.CategoryName,callback:function(e){t.CategoryName=e},expression:"CategoryName"}})],1),t._v(" "),i("div",{staticClass:"dialog_images"},[i("el-upload",{attrs:{action:"http://test.kslab.com/api/article/null","list-type":"picture-card",limit:1,"file-list":t.fileList,"on-preview":t.handlePictureCardPreview,"on-remove":t.handleRemove,"before-upload":t.beforeFileUpload}},[i("i",{staticClass:"el-icon-plus"})]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1),t._v(" "),i("div",{staticClass:"dialog_textarea"},[i("el-input",{attrs:{type:"textarea",rows:4,resize:"none",placeholder:"请输入简介内容"},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}})],1)]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.addCategoryDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveCategory}},[t._v("保 存")])],1)]),t._v(" "),i("el-dialog",{attrs:{visible:t.addDirectoryDialog,width:"470px","custom-class":"addDirectoryDialog"},on:{"update:visible":function(e){t.addDirectoryDialog=e}}},[i("span",{staticClass:"addDirectoryDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-orderedlist"}),t._v("添加目录")]),t._v(" "),i("div",{staticClass:"addDirectoryDialog_main"},[i("div",{staticClass:"dialog_main_header"},[i("p",[t._v("目录名称：")]),t._v(" "),i("el-input",{attrs:{placeholder:"输入目录名称"},model:{value:t.CategoryName,callback:function(e){t.CategoryName=e},expression:"CategoryName"}})],1),t._v(" "),i("div",{staticClass:"dialog_images"},[i("el-upload",{attrs:{action:"http://test.kslab.com/api/article/null","list-type":"picture-card",limit:1,"file-list":t.fileList2,"on-preview":t.handlePictureCardPreview,"on-remove":t.handleRemove,"before-upload":t.beforeFileUpload}},[i("i",{staticClass:"el-icon-plus"})]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1),t._v(" "),i("div",{staticClass:"dialog_textarea"},[i("el-input",{attrs:{type:"textarea",rows:4,resize:"none",placeholder:"请输入简介内容"},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}})],1)]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.addDirectoryDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveDirectory}},[t._v("保 存")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("添加目录")])])}]};var r=i("VU/8")(a,o,!1,function(t){i("+Y5p")},null,null);e.default=r.exports}});