webpackJsonp([163],{"/Sb6":function(t,e){},"5IzB":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"ArticleTitle",components:{BreadCrumb:i("ZPfm").a},data:function(){return{breadData:[{id:1,name:"功能控制",urls:"/index/functionControl",icon:"icon-home"},{id:2,name:"板块标题管理",urls:"/index/functionControl/plateTitleManagement/plate-title-management",icon:"icon-home"},{id:3,name:"文章标题",urls:"/index/functionControl/plateTitleManagement/article-title",icon:"icon-home"}],selectVideotitle:"",menuList:{},radio7:"1",addTypetitle:"",centerDialogVisible:!1,changeName:"",listData:[],articleTitleId:""}},mounted:function(){this.getTypelist()},methods:{getlistData:function(){var t=this,e={type:this.selectVideotitle};this.HttpClient.post("/admin/articleTitle/getList",e).then(function(e){200===e.data.code&&e.data.data.length?t.listData=e.data.data:t.listData=[]})},getTypelist:function(){var t=this;this.HttpClient.post("/admin/menu/getList",{menu_type:2,type:6}).then(function(e){200===e.data.code&&(t.menuList=e.data.data,t.selectVideotitle=t.menuList[1].menu_id,t.getlistData())})},changeModel:function(t){this.selectVideotitle=t.menu_id,this.getlistData()},addTypetitleFn:function(){var t=this,e={name:this.addTypetitle,type:this.selectVideotitle};this.HttpClient.post("/admin/articleTitle/create",e).then(function(e){200===e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getlistData()},500))})},changeNameFn:function(t,e){this.changeName=e,this.articleTitleId=t,this.centerDialogVisible=!0},sureChangenameFn:function(){var t=this,e={id:this.articleTitleId,name:this.changeName,type:this.selectVideotitle};this.HttpClient.post("/admin/articleTitle/edit",e).then(function(e){var i=e.data,a=i.code,n=i.msg;200===a&&(t.$message.success(n),t.centerDialogVisible=!1,t.changeName="",setTimeout(function(){t.getlistData()},500))})},deleteFn:function(t){var e=this,i={id:t.id};this.HttpClient.post("/admin/articleTitle/destroy",i).then(function(t){200===t.data.code&&(e.$message.success(t.data.msg),setTimeout(function(){e.getlistData()},500))})}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"articleTitle"},[i("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),i("div",{staticClass:"video_titlebox"},[t._m(0),t._v(" "),i("div",{staticClass:"videotitle_header"},[i("div",{staticClass:"choosetitle"},[t._v("板块选择")]),t._v(" "),i("el-radio-group",{attrs:{size:"small"},model:{value:t.selectVideotitle,callback:function(e){t.selectVideotitle=e},expression:"selectVideotitle"}},t._l(t.menuList,function(e,a){return i("el-radio",{key:a,attrs:{label:e.menu_id,border:""},on:{change:function(i){t.changeModel(e)}}},[t._v(t._s(e.name))])}))],1),t._v(" "),i("div",{staticClass:"videotitle_header"},[i("el-radio",{attrs:{label:"1",border:""},model:{value:t.radio7,callback:function(e){t.radio7=e},expression:"radio7"}},[t._v("文章标题")]),t._v(" "),i("div",{staticClass:"addcontent"},[i("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.addTypetitle,callback:function(e){t.addTypetitle=e},expression:"addTypetitle"}}),t._v(" "),i("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.addTypetitleFn}})],1)],1),t._v(" "),i("div",{staticClass:"videotitle_header videolist_box"},t._l(t.listData,function(e,a){return i("div",{key:a,staticClass:"onevideo"},[i("div",{staticClass:"title",on:{click:function(i){t.changeNameFn(e.id,e.name)}}},[t._v(t._s(e.name))]),t._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:function(i){t.deleteFn(e)}}},[t._v("删除")])],1)})),t._v(" "),i("div",{staticClass:"alertbox"},[i("el-dialog",{attrs:{title:"修改",visible:t.centerDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[i("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.changeName,callback:function(e){t.changeName=e},expression:"changeName"}}),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.centerDialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.sureChangenameFn}},[t._v("保 存")])],1)],1)],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"videopage_title"},[e("div",{staticClass:"title"},[this._v("文章标题")])])}]};var l=i("VU/8")(a,n,!1,function(t){i("/Sb6")},null,null);e.default=l.exports}});