webpackJsonp([114],{F6vK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("ZPfm"),n=a("+jNi"),s={name:"FeedbackOpinionType",data:function(){return{breadData:[{id:1,name:"提出意见",urls:"/index/feedback/feedback",icon:"icon-home"},{id:2,name:"意见反馈类型",urls:"/index/feedback/feedback-opinion-type",icon:"icon-home"}],addVisible:!1,feedbackData:[],newName:"",id:""}},components:{BreadCrumb:i.a,DeleteModal:n.a},methods:{getFeedbackType:function(){var e=this;this.HttpClient.post("/admin/opinionsType/lists").then(function(t){console.log(t),200===t.data.code&&(e.feedbackData=t.data.data)})},addNewType:function(){var e=this;this.HttpClient.post("/admin/opinionsType/create",{name:this.newName}).then(function(t){console.log(t),200===t.data.code?(e.$message.success(t.data.msg),e.newName="",e.addVisible=!1,setTimeout(function(){e.getFeedbackType()},500)):e.$message.error(t.data.msg)})},deleteButton:function(e){this.id=e,this.$refs.delete.deleteDialog=!0},confirmDelete:function(e){var t=this;e&&this.HttpClient.post("/admin/opinionsType/destroy",{id:this.id}).then(function(e){console.log(e),200===e.data.code?(t.$message.success(e.data.msg),setTimeout(function(){t.getFeedbackType()},500)):t.$message.error(e.data.msg)})},addButton:function(){this.addVisible=!0}},created:function(){this.getFeedbackType()}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"FeedbackOpinionType"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),a("div",{staticClass:"feedback_main"},[e._m(0),e._v(" "),a("div",{staticClass:"feedback_header"},[a("div",[e._v("现有类型")]),e._v(" "),a("el-button",{on:{click:e.addButton}},[e._v("添加新类型")])],1),e._v(" "),a("div",{staticClass:"feedback_content"},[a("div",{staticClass:"feedback_type_list"},e._l(e.feedbackData,function(t){return a("div",{key:t.id,staticClass:"feedback_type"},[a("div",{staticClass:"feedback_type_name"},[e._v(e._s(t.name))]),e._v(" "),a("el-button",{staticClass:"feed_type_delete",attrs:{type:"danger"},on:{click:function(a){e.deleteButton(t.id)}}},[e._v("删除")])],1)}))])]),e._v(" "),a("el-dialog",{attrs:{visible:e.addVisible,width:"420px"},on:{"update:visible":function(t){e.addVisible=t}}},[a("div",{staticClass:"dialog_delete_head_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-edit-square delete_icon"}),e._v(" "),a("span",[e._v("新增")])]),e._v(" "),a("div",{staticClass:"modify"},[a("span",[e._v("名称：")]),e._v(" "),a("el-input",{attrs:{placeholder:"输入新名称"},nativeOn:{keyup:function(t){return"button"in t||13===t.keyCode?e.addNewType(t):null}},model:{value:e.newName,callback:function(t){e.newName=t},expression:"newName"}})],1),e._v(" "),a("div",{staticClass:"btn"},[a("el-button",{on:{click:function(t){e.addVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addNewType}},[e._v("保存")])],1)]),e._v(" "),a("delete-modal",{ref:"delete",on:{doDelete:e.confirmDelete}})],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"feedback_title"},[t("div",{staticClass:"title"},[this._v("意见反馈类型")])])}]};var o=a("VU/8")(s,d,!1,function(e){a("kHN2")},null,null);t.default=o.exports},kHN2:function(e,t){}});