webpackJsonp([190],{"+A/s":function(e,t){},"6a6X":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"rejectionReason",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"页面",urls:"/index/page/Page",icon:"icon-home"},{id:2,name:"页面管理",urls:"/index/page/pageManagement/PageManagement",icon:"icon-home"},{id:3,name:"审核失败类别管理",urls:"/index/page/pageManagement/auditManagement/AuditManagement",icon:"icon-home"},{id:4,name:"视频问题百科驳回理由",urls:"/index/page/pageManagement/auditManagement/rejectionReason",icon:"icon-home"}],valindex:null,modify:!0,readonly:!0,addnameValue:"",listData:[]}},mounted:function(){this.getlistdata()},methods:{getlistdata:function(){var e=this;this.HttpClient.post("/admin/webReview/getList",{type:"upload"}).then(function(t){console.log(t.data),200==t.data.code&&(e.listData=t.data.data)})},modifyBtm:function(e){this.valindex=e},saveNameFn:function(e){var t=this;console.log(e);var a={id:e.id,name:e.name,type:"upload"};this.HttpClient.post("/admin/webReview/edit",a).then(function(e){console.log(e.data),200==e.data.code&&(t.$message.success(e.data.msg),t.valindex=null,setTimeout(function(){t.getlistdata()},500))})},addNameFn:function(){var e=this;console.log(this.addnameValue);var t={name:this.addnameValue,type:"upload"};this.HttpClient.post("/admin/webReview/create",t).then(function(t){console.log(t.data),200==t.data.code&&(e.$message.success(t.data.msg),e.addnameValue="",setTimeout(function(){e.getlistdata()},500))})},deletenameFn:function(e){var t=this,a={id:e.id};this.HttpClient.post("/admin/webReview/destroy",a).then(function(e){200==e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getlistdata()},500))})}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"rejectionReason"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),a("div",{staticClass:"rejectionReason_main"},[e._m(0),e._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_add"},[a("el-input",{attrs:{placeholder:"输入新的类别"},model:{value:e.addnameValue,callback:function(t){e.addnameValue=t},expression:"addnameValue"}}),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addNameFn}},[e._v("添加")])],1),e._v(" "),a("div",{staticClass:"content_box"},e._l(e.listData,function(t,n){return a("div",{key:n,staticClass:"box_list"},[e.valindex!==n?a("el-input",{attrs:{placeholder:"修改类别",readonly:e.readonly},model:{value:t.name,callback:function(a){e.$set(t,"name",a)},expression:"item.name"}}):a("el-input",{attrs:{placeholder:"修改类别",autofocus:""},model:{value:t.name,callback:function(a){e.$set(t,"name",a)},expression:"item.name"}}),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(a){e.deletenameFn(t)}}},[e._v("删除")]),e._v(" "),e.valindex!==n?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.modifyBtm(n)}}},[e._v("修改")]):a("el-button",{attrs:{type:"success"},on:{click:function(a){e.saveNameFn(t)}}},[e._v("保存")])],1)}))])])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("p",[this._v("视频问题百科驳回理由")])])}]};var s=a("VU/8")(n,i,!1,function(e){a("+A/s")},null,null);t.default=s.exports}});