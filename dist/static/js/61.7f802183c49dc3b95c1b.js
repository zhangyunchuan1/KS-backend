webpackJsonp([61],{VClS:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o={name:"UploadVideo",components:{BreadCrumb:t("ZPfm").a},data:function(){return{breadData:[{id:1,name:"页面",urls:"/index/page/Page",icon:"icon-home"},{id:2,name:"页面管理",urls:"/index/page/pageManagement/PageManagement",icon:"icon-home"},{id:3,name:"上传提示",urls:"/index/page/pageManagement/uploadPrompt/UploadPrompt",icon:"icon-home"},{id:4,name:"上传视频",urls:"/index/page/pageManagement/uploadPrompt/UploadVideo",icon:"icon-home"}],plateRadio:""}},mounted:function(){var e=new(t("sYY+"))("#editor");e.customConfig.menus=["head","bold","fontSize","fontName","italic","underline","strikeThrough","foreColor","backColor","link","list","justify","quote","emoticon","image","table","video","code","undo","redo"],e.create()}},r={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"uploadVideo"},[t("BreadCrumb",{staticClass:"bread",attrs:{breadData:e.breadData}}),e._v(" "),t("div",{staticClass:"uploadVideo_main"},[e._m(0),e._v(" "),t("div",{staticClass:"content"},[t("div",{staticClass:"content_header"},[t("p",[e._v("板块选择：")]),e._v(" "),t("el-radio-group",{model:{value:e.plateRadio,callback:function(a){e.plateRadio=a},expression:"plateRadio"}},[t("el-radio",{attrs:{border:"",label:1}},[e._v("视频")]),e._v(" "),t("el-radio",{attrs:{border:"",label:2}},[e._v("封面图")]),e._v(" "),t("el-radio",{attrs:{border:"",label:3}},[e._v("标题")]),e._v(" "),t("el-radio",{attrs:{border:"",label:4}},[e._v("视频描述")]),e._v(" "),t("el-radio",{attrs:{border:"",label:5}},[e._v("关键字")]),e._v(" "),t("el-radio",{attrs:{border:"",label:6}},[e._v("是否为教程")]),e._v(" "),t("el-radio",{attrs:{border:"",label:7}},[e._v("附件")]),e._v(" "),t("el-radio",{attrs:{border:"",label:8}},[e._v("链接")]),e._v(" "),t("el-radio",{attrs:{border:"",label:9}},[e._v("零件、软件")])],1)],1),e._v(" "),e._m(1),e._v(" "),t("div",{staticClass:"content_btm"},[t("el-button",{attrs:{type:"primary"}},[e._v("保 存")])],1)])])],1)},staticRenderFns:[function(){var e=this.$createElement,a=this._self._c||e;return a("div",{staticClass:"title"},[a("p",[this._v("上传视频")])])},function(){var e=this.$createElement,a=this._self._c||e;return a("div",{staticClass:"content_box"},[a("div",{staticClass:"edit-box"},[a("div",{attrs:{id:"editor"}},[a("p")])])])}]};var i=t("VU/8")(o,r,!1,function(e){t("i/N4")},null,null);a.default=i.exports},"i/N4":function(e,a){}});