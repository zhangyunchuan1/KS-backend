webpackJsonp([234],{S4Kx:function(e,a){},geFW:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={name:"backstageServiceShielding",components:{BreadCrumb:t("ZPfm").a},data:function(){return{breadData:[{id:1,name:"页面",urls:"/index/page/Page",icon:"icon-home"},{id:2,name:"页面管理",urls:"/index/page/pageManagement/PageManagement",icon:"icon-home"},{id:3,name:"审核失败类别管理",urls:"/index/page/pageManagement/auditManagement/AuditManagement",icon:"icon-home"},{id:4,name:"后台客服屏蔽",urls:"/index/page/pageManagement/auditManagement/backstageServiceShielding",icon:"icon-home"}],valindex:null,modify:!0,readonly:!0,addnameValue:"",disableDays:null,listData:[]}},mounted:function(){this.getlistdata()},methods:{getlistdata:function(){var e=this;this.HttpClient.post("/admin/webReview/getList",{type:"customer"}).then(function(a){console.log(a.data),200==a.data.code&&(e.listData=a.data.data)})},modifyBtm:function(e){this.valindex=e},saveNameFn:function(e){var a=this;console.log(e);var t={id:e.id,name:e.name,limit_day:e.limit_day,type:"customer"};this.HttpClient.post("/admin/webReview/edit",t).then(function(e){console.log(e.data),200==e.data.code&&(a.$message.success(e.data.msg),a.valindex=null,setTimeout(function(){a.getlistdata()},500))})},addNameFn:function(){var e=this;console.log(this.addnameValue);var a={name:this.addnameValue,limit_day:this.disableDays,type:"customer"};this.HttpClient.post("/admin/webReview/create",a).then(function(a){console.log(a.data),200==a.data.code&&(e.$message.success(a.data.msg),e.addnameValue="",e.disableDays=null,setTimeout(function(){e.getlistdata()},500))})},deletenameFn:function(e){var a=this,t={id:e.id};this.HttpClient.post("/admin/webReview/destroy",t).then(function(e){200==e.data.code&&(a.$message.success(e.data.msg),setTimeout(function(){a.getlistdata()},500))})}}},i={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"backstageServiceShielding"},[t("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),t("div",{staticClass:"backstageServiceShielding_main"},[e._m(0),e._v(" "),t("div",{staticClass:"content"},[t("div",{staticClass:"content_add"},[t("el-input",{attrs:{placeholder:"输入新的类别"},model:{value:e.addnameValue,callback:function(a){e.addnameValue=a},expression:"addnameValue"}}),e._v(" "),t("div",{staticClass:"disableDays"},[t("el-input",{attrs:{placeholder:"禁用天数",type:"number",min:"0"},model:{value:e.disableDays,callback:function(a){e.disableDays=a},expression:"disableDays"}})],1),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.addNameFn}},[e._v("添加")])],1),e._v(" "),t("div",{staticClass:"content_box"},e._l(e.listData,function(a,n){return t("div",{key:n,staticClass:"box_list"},[e.valindex!==n?t("el-input",{attrs:{placeholder:"修改类别",readonly:e.readonly},model:{value:a.name,callback:function(t){e.$set(a,"name",t)},expression:"item.name"}}):t("el-input",{attrs:{placeholder:"修改类别",autofocus:""},model:{value:a.name,callback:function(t){e.$set(a,"name",t)},expression:"item.name"}}),e._v(" "),e.valindex!==n?t("div",{staticClass:"disableDays"},[t("el-input",{attrs:{placeholder:"禁用天数",readonly:e.readonly,type:"number",min:"0"},model:{value:a.limit_day,callback:function(t){e.$set(a,"limit_day",t)},expression:"item.limit_day"}})],1):t("div",{staticClass:"disableDays"},[t("el-input",{attrs:{placeholder:"禁用天数",autofocus:"",type:"number",min:"0"},model:{value:a.limit_day,callback:function(t){e.$set(a,"limit_day",t)},expression:"item.limit_day"}})],1),e._v(" "),t("el-button",{attrs:{type:"danger"},on:{click:function(t){e.deletenameFn(a)}}},[e._v("删除")]),e._v(" "),e.valindex!==n?t("el-button",{attrs:{type:"primary"},on:{click:function(a){e.modifyBtm(n)}}},[e._v("修改")]):t("el-button",{attrs:{type:"success"},on:{click:function(t){e.saveNameFn(a)}}},[e._v("保存")])],1)}))])])],1)},staticRenderFns:[function(){var e=this.$createElement,a=this._self._c||e;return a("div",{staticClass:"title"},[a("p",[this._v("后台客服屏蔽")])])}]};var s=t("VU/8")(n,i,!1,function(e){t("S4Kx")},null,null);a.default=s.exports}});