webpackJsonp([91],{"8sjZ":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"BusinessCentre",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"页面",urls:"/index/page/Page",icon:"icon-home"},{id:2,name:"商家页面提示",urls:"/index/page/businessCentre/BusinessCentre",icon:"icon-home"}],plateRadio:0,readonly:!0,modify:!0,textareaModify:!1,textarea:"",cancel:!1,tipsPlateList:[],currentObj:{}}},mounted:function(){this.getTipsPlateList()},methods:{handleSelect:function(t){this.textarea=t.content,this.currentObj=t},handleChangePlate:function(){console.log(this.plateRadio)},getTipsPlateList:function(){var t=this;this.HttpClient.post("/admin/tips/getlists",{type:"business_center"}).then(function(e){console.log(e),200===e.data.code&&(t.tipsPlateList=e.data.data,t.textarea=t.tipsPlateList[t.plateRadio].content,t.currentObj=t.tipsPlateList[t.plateRadio])})},modifyBtm:function(){var t=this;!0===this.readonly?(this.readonly=!1,this.modify=!1,this.cancel=!0,this.$refs.modifyInput.focus()):this.HttpClient.post("/admin/tips/edit",{id:this.currentObj.id,type:"business_center",name:this.currentObj.name,content:this.textarea}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getTipsPlateList()},500),t.readonly=!0,t.modify=!0,t.cancel=!1)})},cancelBtm:function(){this.readonly=!0,this.modify=!0,this.cancel=!1}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"businessCentre"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"businessCentre_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"plate_select"},[a("p",[t._v("板块选择")]),t._v(" "),a("el-radio-group",{on:{change:t.handleChangePlate},model:{value:t.plateRadio,callback:function(e){t.plateRadio=e},expression:"plateRadio"}},t._l(t.tipsPlateList,function(e,n){return a("el-radio",{key:n,attrs:{border:"",label:n},on:{change:function(a){t.handleSelect(e)}}},[t._v(t._s(e.name))])}))],1),t._v(" "),a("div",{staticClass:"buyerEquity_box"},[a("p",[t._v("商家页面提示：")]),t._v(" "),a("el-input",{ref:"modifyInput",attrs:{type:"textarea",rows:7,readonly:t.readonly,autosize:{minRows:5},placeholder:"输入页面提示"},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}})],1),t._v(" "),a("div",{staticClass:"buyerEquity_btm"},[t.cancel?a("el-button",{on:{click:t.cancelBtm}},[t._v("取 消")]):t._e(),t._v(" "),t.modify?a("el-button",{attrs:{type:"primary"},on:{click:t.modifyBtm}},[t._v("修 改")]):a("el-button",{attrs:{type:"success"},on:{click:t.modifyBtm}},[t._v("保 存")])],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("商家页面提示")])])}]};var s=a("VU/8")(n,i,!1,function(t){a("Fk3d")},null,null);e.default=s.exports},Fk3d:function(t,e){}});