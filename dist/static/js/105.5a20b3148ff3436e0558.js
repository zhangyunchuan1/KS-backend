webpackJsonp([105],{"0FCN":function(t,e){},ArpU:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"DirectoryManagement",components:{BreadCrumb:i("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl/FunctionControl",icon:"icon-home"},{id:2,name:"专业目录",urls:"/index/market/functionControl/professionalCatalog/ProfessionalCatalog",icon:"icon-home"},{id:3,name:"目录管理",urls:"/index/market/functionControl/professionalCatalog/DirectoryManagement",icon:"icon-home"}],plateRadio:null,primaryDirectory:!1,primaryDirectoryRadio:null,secondaryDirectory:!1,secondaryDirectoryRadio:null,threelDirectory:!1,threelDirectoryRadio:null,obj0:null,obj1:null,obj2:null,obj3:null,plateList:[],firstLevelDirectory:[],twoLevelDirectory:[],threeLevelDirectory:[],zeroMenuId:null,firstMenuId:null,twoMenuId:null,editDirectoryDialog:!1,objNow:{},CategoryName:"",fileList:[],dialogVisible:!1,dialogImageUrl:"",textarea:"",inputValue:"",dynamicTags:[],inputVisible:!1}},mounted:function(){this.getMenuList()},methods:{enter:function(t,e){console.log("kkkk",t),this.$store.dispatch("getShowInfo",{isShow:!0,top:t.clientY-100,left:t.clientX+40,info:e})},leave:function(t){this.$store.dispatch("getShowInfo",{isShow:!1,top:t.clientY,left:t.clientX})},handleEdit:function(t){this.fileList=[],this.CategoryName="",this.dynamicTags=[],this.textarea="",console.log(t),this.objNow=t,this.CategoryName=t.name,this.textarea=t.description,this.editDirectoryDialog=!0,t.images&&this.fileList.push({name:"imgName",url:this.Tools.handleImg(t.images)}),t.homoionym&&(this.dynamicTags=t.homoionym.split(","))},handlePictureCardPreview:function(){},handleRemove:function(){console.log(this.fileList)},beforeFileUpload:function(t){var e=this;console.log(t);var i=new FormData;i.append("token",window.localStorage.token),i.append("images",t),this.$ajax.post("http://test.kslab.com/api/admin/uploadOneImage",i).then(function(i){console.log(i),200===i.data.code&&(e.fileList=[],e.dialogImageUrl=i.data.path,e.fileList.push({name:t.name,url:i.data.path}),console.log(e.fileList))})},handleSaveDirectory:function(){var t=this;console.log(this.CategoryName,this.dynamicTags,this.fileList,this.textarea);var e=[];this.fileList.length>0&&e.push({name:this.fileList[0].name,path:this.fileList[0].url});var i="";this.dynamicTags&&(i=this.dynamicTags.join(",")),console.log(i);var a={id:this.objNow.id,menu_type:3,name:this.CategoryName,description:this.textarea,images:e,pid:this.objNow.pid,type:this.objNow.type,homoionym:i};console.log(a),this.HttpClient.post("/admin/menu/edit",a).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getMenuList(),t.editDirectoryDialog=!1,t.fileList=[]},1e3))})},handleClose:function(t){this.dynamicTags.splice(this.dynamicTags.indexOf(t),1)},showInput:function(){var t=this;this.inputVisible=!0,this.$nextTick(function(e){t.$refs.saveTagInput.$refs.input.focus()})},handleInputConfirm:function(){var t=this.inputValue;t&&this.dynamicTags.push(t),console.log(this.dynamicTags),this.inputVisible=!1,this.inputValue=""},recoveryList:function(t){var e=this;this.HttpClient.post("/admin/menu/changeStatus",{menu_type:3,id:t.id,status:1}).then(function(i){console.log(i),200===i.data.code&&(e.$message.success(i.data.msg),setTimeout(function(){0===t.type?e.getMenuList():1===t.type?e.getNextList(e.zeroMenuId):2===t.type?e.getNextList(e.firstMenuId):3===t.type&&e.getNextList(e.twoMenuId)},1e3))})},handleRecovery:function(t){console.log(t),this.recoveryList(t)},handleProhibit:function(t){var e=this;console.log(t);0===t.type||(1===t.type?(console.log(this.zeroMenuId),this.zeroMenuId):2===t.type?(console.log(this.firstMenuId),this.firstMenuId):3===t.type&&(console.log(this.twoMenuId),this.twoMenuId)),this.HttpClient.post("/admin/menu/destroy",{id:t.id,menu_type:3}).then(function(i){console.log(i),200===i.data.code?(e.$message.success("禁用成功"),setTimeout(function(){0===t.type?e.getMenuList():1===t.type?e.getNextList(e.zeroMenuId):2===t.type?e.getNextList(e.firstMenuId):3===t.type&&e.getNextList(e.twoMenuId)},1e3)):e.$message.error(i.data.msg)})},getMenuList:function(t){var e=this;this.HttpClient.post("/admin/menu/getListWithDel",{menu_type:3,type:0}).then(function(t){console.log(t),e.plateList=t.data.data})},getNextList:function(t){var e=this;this.HttpClient.post("/admin/menu/getOneChildWithDel",{menu_type:3,menu_id:t}).then(function(t){console.log(t),200===t.data.code&&(t.data.data.child.length>0?1===t.data.data.child[0].type?(e.firstLevelDirectory=t.data.data.child,e.firstPid=t.data.data.child[0].pid,e.zeroMenuId=t.data.data.info.menu_id):2===t.data.data.child[0].type?(e.twoLevelDirectory=t.data.data.child,e.twoPid=t.data.data.child[0].pid,e.firstMenuId=t.data.data.info.menu_id):3===t.data.data.child[0].type&&(e.threeLevelDirectory=t.data.data.child,e.threePid=t.data.data.child[0].pid,e.twoMenuId=t.data.data.info.menu_id):0===t.data.data.info.type?(e.firstLevelDirectory=[],e.firstPid=t.data.data.info.id,e.zeroMenuId=t.data.data.info.menu_id):1===t.data.data.info.type?(e.twoLevelDirectory=[],e.twoPid=t.data.data.info.id,e.firstMenuId=t.data.data.info.menu_id):2===t.data.data.info.type&&(e.twoMenuId=t.data.data.info.menu_id,e.threePid=t.data.data.info.id,e.threeLevelDirectory=[]))})},plateBtm:function(t){console.log(t),this.obj0=t,this.getNextList(t.menu_id),this.primaryDirectory=!0,this.secondaryDirectory=!1,this.threelDirectory=!1,this.primaryDirectoryRadio=null},primaryDirectoryBtm:function(t){console.log(t),this.obj1=t,this.getNextList(t.menu_id),this.secondaryDirectory=!0,this.threelDirectory=!1,this.secondaryDirectoryRadio=null},secondaryDirectoryBtm:function(t){console.log(t),this.obj2=t,this.getNextList(t.menu_id),this.threelDirectory=!0,this.threelDirectoryRadio=null}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"directoryManagement"},[i("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),i("div",{staticClass:"directoryManagement_main"},[t._m(0),t._v(" "),i("div",{staticClass:"content"},[i("div",{staticClass:"content_plate"},[i("el-radio-group",{on:{change:function(e){t.plateBtm(e)}},model:{value:t.plateRadio,callback:function(e){t.plateRadio=e},expression:"plateRadio"}},t._l(t.plateList,function(e,a){return i("div",{key:a,staticClass:"plate_list"},[i("div",{staticClass:"info_frame",on:{mouseover:function(i){t.enter(i,e)},mouseout:function(e){t.leave(e)}}},[i("el-radio-button",{attrs:{label:e}},[t._v(t._s(e.name))])],1),t._v(" "),1===e.status?i("el-button",{staticClass:"qujiao",attrs:{type:"primary"},on:{click:function(i){t.handleProhibit(e)}}},[t._v("禁用")]):t._e(),t._v(" "),0===e.status?i("el-button",{staticClass:"qujiao",attrs:{type:"warning"},on:{click:function(i){t.handleRecovery(e)}}},[t._v("恢复")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"info",icon:"el-icon-edit",circle:""},on:{click:function(i){t.handleEdit(e)}}})],1)}))],1),t._v(" "),i("el-collapse-transition",[t.primaryDirectory?i("div",{staticClass:"directory"},[i("div",{staticClass:"directory_title"},[t._v("一级目录")]),t._v(" "),i("div",{staticClass:"directory_box"},[i("el-radio-group",{on:{change:function(e){t.primaryDirectoryBtm(e)}},model:{value:t.primaryDirectoryRadio,callback:function(e){t.primaryDirectoryRadio=e},expression:"primaryDirectoryRadio"}},t._l(t.firstLevelDirectory,function(e,a){return i("div",{key:a,staticClass:"plate_list"},[i("div",{staticClass:"info_frame",on:{mouseover:function(i){t.enter(i,e)},mouseout:function(e){t.leave(e)}}},[i("el-radio-button",{attrs:{label:e}},[t._v(t._s(e.name))])],1),t._v(" "),1===e.status?i("el-button",{staticClass:"qujiao",attrs:{type:"primary"},on:{click:function(i){t.handleProhibit(e)}}},[t._v("禁用")]):t._e(),t._v(" "),0===e.status?i("el-button",{staticClass:"qujiao",attrs:{type:"warning"},on:{click:function(i){t.handleRecovery(e)}}},[t._v("恢复")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"info",icon:"el-icon-edit",circle:""},on:{click:function(i){t.handleEdit(e)}}})],1)}))],1)]):t._e()]),t._v(" "),i("el-collapse-transition",[t.secondaryDirectory?i("div",{staticClass:"directory"},[i("div",{staticClass:"directory_title"},[t._v("二级目录")]),t._v(" "),i("div",{staticClass:"directory_box"},[i("el-radio-group",{on:{change:function(e){t.secondaryDirectoryBtm(e)}},model:{value:t.secondaryDirectoryRadio,callback:function(e){t.secondaryDirectoryRadio=e},expression:"secondaryDirectoryRadio"}},t._l(t.twoLevelDirectory,function(e,a){return i("div",{key:a,staticClass:"plate_list"},[i("div",{staticClass:"info_frame",on:{mouseover:function(i){t.enter(i,e)},mouseout:function(e){t.leave(e)}}},[i("el-radio-button",{attrs:{label:e}},[t._v(t._s(e.name))])],1),t._v(" "),1===e.status?i("el-button",{staticClass:"qujiao",attrs:{type:"primary"},on:{click:function(i){t.handleProhibit(e)}}},[t._v("禁用")]):t._e(),t._v(" "),0===e.status?i("el-button",{staticClass:"qujiao",attrs:{type:"warning"},on:{click:function(i){t.handleRecovery(e)}}},[t._v("恢复")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"info",icon:"el-icon-edit",circle:""},on:{click:function(i){t.handleEdit(e)}}})],1)}))],1)]):t._e()]),t._v(" "),i("el-collapse-transition",[t.threelDirectory?i("div",{staticClass:"directory"},[i("div",{staticClass:"directory_title"},[t._v("三级目录")]),t._v(" "),i("div",{staticClass:"directory_box"},[i("el-radio-group",{model:{value:t.threelDirectoryRadio,callback:function(e){t.threelDirectoryRadio=e},expression:"threelDirectoryRadio"}},t._l(t.threeLevelDirectory,function(e,a){return i("div",{key:a,staticClass:"plate_list"},[i("div",{staticClass:"info_frame",on:{mouseover:function(i){t.enter(i,e)},mouseout:function(e){t.leave(e)}}},[i("el-radio-button",{attrs:{label:e}},[t._v(t._s(e.name))])],1),t._v(" "),1===e.status?i("el-button",{staticClass:"qujiao",attrs:{type:"primary"},on:{click:function(i){t.handleProhibit(e)}}},[t._v("禁用")]):t._e(),t._v(" "),0===e.status?i("el-button",{staticClass:"qujiao",attrs:{type:"warning"},on:{click:function(i){t.handleRecovery(e)}}},[t._v("恢复")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"info",icon:"el-icon-edit",circle:""},on:{click:function(i){t.handleEdit(e)}}})],1)}))],1)]):t._e()])],1)]),t._v(" "),i("el-dialog",{attrs:{visible:t.editDirectoryDialog,width:"470px","custom-class":"addDirectoryDialog"},on:{"update:visible":function(e){t.editDirectoryDialog=e}}},[i("span",{staticClass:"addDirectoryDialog_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-orderedlist"}),t._v("修改目录")]),t._v(" "),i("div",{staticClass:"addDirectoryDialog_main"},[i("div",{staticClass:"dialog_main_header"},[i("p",[t._v("目录名称：")]),t._v(" "),i("el-input",{attrs:{placeholder:"输入目录名称"},model:{value:t.CategoryName,callback:function(e){t.CategoryName=e},expression:"CategoryName"}})],1),t._v(" "),i("div",{staticClass:"jinyi"},[i("p",[t._v("近义词：")]),t._v(" "),t._l(t.dynamicTags,function(e){return i("el-tag",{key:e},[t._v(t._s(e))])})],2),t._v(" "),i("div",{staticClass:"dialog_images"},[i("el-upload",{attrs:{action:"http://test.kslab.com/api/article/null","list-type":"picture-card",limit:1,"file-list":t.fileList,"on-preview":t.handlePictureCardPreview,"on-remove":t.handleRemove,"before-upload":t.beforeFileUpload}},[i("i",{staticClass:"el-icon-plus"})]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1),t._v(" "),i("div",{staticClass:"dialog_textarea"},[i("el-input",{attrs:{type:"textarea",rows:4,resize:"none",placeholder:"请输入简介内容"},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}})],1)]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.editDirectoryDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveDirectory}},[t._v("保 存")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("目录管理")])])}]};var n=i("VU/8")(a,o,!1,function(t){i("0FCN")},null,null);e.default=n.exports}});