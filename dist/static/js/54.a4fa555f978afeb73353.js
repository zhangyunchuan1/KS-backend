webpackJsonp([54],{"2MA+":function(t,e){},Bxrb:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("G0J2");var i=n("yPE/"),o=(n("PJh5"),n("GH0r"),n("ZPfm")),a=["10px","12px","14px","16px","18px","20px"],s=i.import("attributors/style/size");s.whitelist=a,i.register(s,!0);i.import("formats/font").whitelist=["SimSun","SimHei","Microsoft-YaHei","KaiTi","FangSong","Arial","Times-New-Roman","sans-serif"];var c=[["italic","underline","strike","bold"],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:a}],[{color:[]}],[{align:[]}]],l={name:"UploadService",components:{BreadCrumb:o.a},data:function(){return{breadData:[{id:1,name:"页面",urls:"/index/page/Page",icon:"icon-home"},{id:2,name:"页面管理",urls:"/index/page/pageManagement/PageManagement",icon:"icon-home"},{id:3,name:"上传提示",urls:"/index/page/pageManagement/uploadPrompt/UploadPrompt",icon:"icon-home"},{id:4,name:"上传服务",urls:"/index/page/pageManagement/uploadPrompt/UploadService",icon:"icon-home"}],plateRadio:0,plateList:[],currentObj:{},editorOption:{modules:{toolbar:{container:c}}},contentUpData:{},content:""}},mounted:function(){this.getProductTips()},methods:{onEditorBlur:function(){},onEditorFocus:function(){},onEditorChange:function(t,e){console.log(this.content);var n,i=this.content;console.log((n=i,n=(n=(n=(n=n.replace(/<\/?[^>]*>/g,"")).replace(/[ | ]*\n/g,"\n")).replace(/\n[\s| | ]*\r/g,"\n")).replace(/ /gi,"")).length),t.quill.deleteText(e,1),this.$emit("Quescthon",this.content),console.log(this.content);var o=this.Tools.getEditorImageAndLength(this.content);this.editImageSize=o.imgArray.length,console.log(this.modifyData)},handleSelect:function(t){console.log(t),this.currentObj=t,this.content=t.content},handleChangePlate:function(){},handleSave:function(){var t=this;console.log(this.content),this.HttpClient.post("/admin/tips/edit",{id:this.currentObj.id,name:this.currentObj.name,content:this.content,type:"upload_service"}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getProductTips()},500))})},getProductTips:function(){var t=this;this.HttpClient.post("/admin/tips/getlists",{type:"upload_service"}).then(function(e){console.log(e),t.plateList=e.data.data,t.content=t.plateList[t.plateRadio].content,t.currentObj=t.plateList[t.plateRadio]})}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"uploadService"},[n("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),n("div",{staticClass:"uploadService_main"},[t._m(0),t._v(" "),n("div",{staticClass:"content"},[n("div",{staticClass:"content_header"},[n("p",[t._v("板块选择：")]),t._v(" "),n("el-radio-group",{on:{change:t.handleChangePlate},model:{value:t.plateRadio,callback:function(e){t.plateRadio=e},expression:"plateRadio"}},t._l(t.plateList,function(e,i){return n("el-radio",{key:i,attrs:{border:"",label:i},on:{change:function(n){t.handleSelect(e)}}},[t._v(t._s(e.name))])}))],1),t._v(" "),n("div",{staticClass:"content_box"},[n("div",{staticClass:"edit-box"},[n("quill-editor",{ref:"myQuillEditor",attrs:{options:t.editorOption},on:{blur:function(e){t.onEditorBlur(e)},focus:function(e){t.onEditorFocus(e)},change:function(e){t.onEditorChange(e,5e3)}},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)]),t._v(" "),n("div",{staticClass:"content_btm"},[n("el-button",{attrs:{type:"primary"},on:{click:t.handleSave}},[t._v("保 存")])],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("上传服务")])])}]};var d=n("VU/8")(l,r,!1,function(t){n("2MA+")},null,null);e.default=d.exports}});