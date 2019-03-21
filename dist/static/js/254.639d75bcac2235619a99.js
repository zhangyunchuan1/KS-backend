webpackJsonp([254],{grT2:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"VideoTitle",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl",icon:"icon-home"},{id:2,name:"板块标题管理",urls:"/index/functionControl/plateTitleManagement/plate-title-management",icon:"icon-home"},{id:3,name:"视频标题",urls:"/index/functionControl/plateTitleManagement/video-title",icon:"icon-home"}],selectVideotitle:"",menuList:{},radio7:"1",addTypetitle:"",uploadeImgUrl:"",imageUrl:"",centerDialogVisible:!1,createDialogVisible:!1,changeName:"",listData:[],videoTitleId:""}},mounted:function(){this.getTypelist()},methods:{imageUpload:function(t){var e=this;console.log(t),this.HttpClient.form("/admin/uploadOneImage",{images:t}).then(function(t){console.log("res is:",t),200===t.data.code&&(e.$message.success(t.data.msg),e.imageUrl=t.data.path,e.uploadeImgUrl=t.data.path,e.isshowoldimg=!1)})},handleAvatarSuccess:function(){},getlistData:function(){var t=this;console.log(this.selectVideotitle);var e={type:this.selectVideotitle};this.HttpClient.post("/admin/videoTitle/getList",e).then(function(e){200===e.data.code&&e.data.data.length?t.listData=e.data.data:t.listData=[]})},getTypelist:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:2,type:7}).then(function(e){console.log(e.data),200===e.data.code&&(t.menuList=e.data.data,t.selectVideotitle=t.menuList[1].menu_id,t.getlistData())})},changeModel:function(t){this.selectVideotitle=t.menu_id,this.getlistData()},handleOpenCreate:function(){this.createDialogVisible=!0},addTypetitleFn:function(){var t=this,e={name:this.addTypetitle,type:this.selectVideotitle,icon:this.uploadeImgUrl};console.log(e),this.HttpClient.post("/admin/videoTitle/create",e).then(function(e){200===e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getlistData(),t.createDialogVisible=!1},500),t.addTypetitle="")})},changeNameFn:function(t){this.changeName=t.name,this.videoTitleId=t.id,this.imageUrl=t.icon,this.centerDialogVisible=!0},sureChangenameFn:function(){var t=this,e={id:this.videoTitleId,name:this.changeName,type:this.selectVideotitle,icon:this.imageUrl};this.HttpClient.post("/admin/videoTitle/edit",e).then(function(e){var a=e.data,i=a.code,s=a.msg;200===i&&(t.$message.success(s),t.centerDialogVisible=!1,t.changeName="",setTimeout(function(){t.getlistData()},500))})},deleteFn:function(t){var e=this,a={id:t.id};this.HttpClient.post("/admin/videoTitle/destroy",a).then(function(t){200===t.data.code&&(e.$message.success(t.data.msg),setTimeout(function(){e.getlistData()},500))})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"videoTitle"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"video_titlebox"},[t._m(0),t._v(" "),a("div",{staticClass:"videotitle_header"},[a("div",{staticClass:"choosetitle"},[t._v("板块选择")]),t._v(" "),a("el-radio-group",{attrs:{size:"small"},model:{value:t.selectVideotitle,callback:function(e){t.selectVideotitle=e},expression:"selectVideotitle"}},t._l(t.menuList,function(e,i){return a("el-radio",{key:i,attrs:{label:e.menu_id,border:""},on:{change:function(a){t.changeModel(e)}}},[t._v(t._s(e.name))])}))],1),t._v(" "),a("div",{staticClass:"ws-videotitle_header"},[a("el-radio",{attrs:{label:"1",border:""},model:{value:t.radio7,callback:function(e){t.radio7=e},expression:"radio7"}},[t._v("视频标题")]),t._v(" "),a("el-button",{staticStyle:{"margin-left":"15px"},attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.handleOpenCreate}})],1),t._v(" "),a("div",{staticClass:"videotitle_header videolist_box"},t._l(t.listData,function(e,i){return a("div",{key:i,staticClass:"onevideo"},[a("div",{staticClass:"title",on:{click:function(a){t.changeNameFn(e)}}},[t._v(t._s(e.name))]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.deleteFn(e)}}},[t._v("删除")])],1)})),t._v(" "),a("div",{staticClass:"alertbox"},[a("el-dialog",{attrs:{title:"修改",visible:t.centerDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.changeName,callback:function(e){t.changeName=e},expression:"changeName"}}),t._v(" "),a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.imageUpload}},[""!==!t.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):t.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.centerDialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.sureChangenameFn}},[t._v("保 存")])],1)],1)],1)]),t._v(" "),a("el-dialog",{attrs:{title:"新增",visible:t.createDialogVisible,width:"400px",left:""},on:{"update:visible":function(e){t.createDialogVisible=e}}},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.addTypetitle,callback:function(e){t.addTypetitle=e},expression:"addTypetitle"}}),t._v(" "),a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.imageUpload}},[""!==!t.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):t.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.createDialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addTypetitleFn}},[t._v("保 存")])],1)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"videopage_title"},[e("div",{staticClass:"title"},[this._v("视频标题")])])}]};var l=a("VU/8")(i,s,!1,function(t){a("rAuP")},null,null);e.default=l.exports},rAuP:function(t,e){}});