webpackJsonp([121],{r49V:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),o=a.n(n),i=a("Dd8w"),s=a.n(i),r=a("exGp"),c=a.n(r),l={name:"UploadProtocolManagement",components:{BreadCrumb:a("ZPfm").a},data:function(){return{breadData:[{id:1,name:"页面",urls:"/index/page/Page",icon:"icon-home"},{id:2,name:"页面管理",urls:"/index/page/pageManagement/PageManagement",icon:"icon-home"},{id:3,name:"上传协议管理",urls:"/index/page/pageManagement/uploadProtocolManagement/UploadProtocolManagement",icon:"icon-home"}],protocolRadios:[{id:1,type:"active",name:"活动"},{id:2,type:"service",name:"服务"},{id:3,type:"product",name:"商品"},{id:4,type:"goods",name:"淘货"},{id:5,type:"video",name:"视频"},{id:6,type:"encyc",name:"百科"},{id:7,type:"article",name:"文章"},{id:8,type:"question",name:"问题"}],protocolRadio:"",isShowAgreementList:!1,agreementLists:[],protocolId:"",content:"",primaryInput:"",name:"",type:"",addDialog:!1,modifyDialog:!1}},methods:{choseType:function(){var t=this;this.isShowAgreementList=!0;var e=this.protocolRadios.filter(function(e){return e.id===t.protocolRadio})[0].type;this.getAgreementList(e)},getAgreementList:function(t){var e=this;this.HttpClient.post("/admin/agreement/getList",{type:t}).then(function(t){var a=t.data,n=(a.msg,a.data);n.length?e.agreementLists=n:e.agreementLists=[]})},handleSaveAdd:function(){var t=this,e=this.protocolRadios.filter(function(e){return e.id===t.protocolRadio})[0].type,a={name:+new Date,type:e,content:this.content};this.HttpClient.post("/admin/agreement/create",a).then(function(a){var n=a.data,o=n.code,i=n.msg;200===o?(t.$message.success(i),t.addDialog=!1,t.content="",setTimeout(function(){t.getAgreementList(e)},500)):t.$message.error(i)})},deleteProtocol:function(t){var e=this;this.HttpClient.post("/admin/agreement/destroy",{id:t}).then(function(a){var n=a.data,o=n.code,i=n.msg;200===o?(e.$message.success(i),e.agreementLists=e.agreementLists.filter(function(e){return e.id!==t})):e.$message.error(i)})},getAndUpdateProtocol:function(t,e){var a=this;return c()(o.a.mark(function n(){var i,r,c;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(i="/admin/agreement/edit",c=s()({},t,{id:a.protocolId}),"get"!==e){n.next=11;break}return n.next=5,a.HttpClient.get(i,c);case 5:return r=n.sent,n.next=8,r.data;case 8:return n.abrupt("return",n.sent);case 11:return n.next=13,a.HttpClient.post(i,c);case 13:return r=n.sent,n.next=16,r.data;case 16:return n.abrupt("return",n.sent);case 17:case"end":return n.stop()}},n,a)}))()},handleModifyProtocol:function(t){var e=this;this.protocolId=t,this.getAndUpdateProtocol({},"get").then(function(t){var a=t.code,n=t.msg,o=t.data,i=o.content,s=o.name,r=o.type;200===a?(e.modifyDialog=!0,e.primaryInput=i,e.name=s,e.type=r):e.$message.error(n)})},handleSaveModify:function(){var t=this,e={name:this.name,content:this.primaryInput,type:this.type};this.getAndUpdateProtocol(e).then(function(e){var a=e.code,n=e.msg;200===a?(t.$message.success(n),t.modifyDialog=!1,setTimeout(function(){t.getAgreementList(t.type)},500)):t.$message.error(n)})}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"uploadProtocolManagement"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"uploadProtocolManagement_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_header"},[a("p",{staticClass:"header_title"},[t._v("协议选择")]),t._v(" "),a("el-radio-group",{model:{value:t.protocolRadio,callback:function(e){t.protocolRadio=e},expression:"protocolRadio"}},t._l(t.protocolRadios,function(e){return a("el-radio",{key:e.id,attrs:{border:"",label:e.id},on:{change:t.choseType}},[t._v("\n            "+t._s(e.name)+"\n          ")])}))],1),t._v(" "),a("transition",{attrs:{name:"el-fade-in-linear"}},[t.isShowAgreementList?a("div",{staticClass:"content_box"},[a("el-button",{staticClass:"add_protocol",attrs:{type:"primary"},on:{click:function(e){t.addDialog=!0}}},[t._v("添加新协议")]),t._v(" "),a("div",{staticClass:"content_box_main"},t._l(t.agreementLists,function(e){return a("div",{key:e.id,staticClass:"main_list"},[a("div",{staticClass:"list_primary agreement-content",domProps:{innerHTML:t._s(e.content)},on:{click:function(a){t.handleModifyProtocol(e.id)}}}),t._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(a){t.deleteProtocol(e.id)}}},[t._v("删除")])],1)}))],1):t._e()])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"400px","custom-class":"addDialog",visible:t.addDialog},on:{"update:visible":function(e){t.addDialog=e}}},[a("span",{staticClass:"addDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jia-xianxingfangkuang"}),t._v("添加协议")]),t._v(" "),a("div",{staticClass:"addDialog_box"},[a("p",[t._v("添加新协议")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入协议内容"},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addDialog=!1}}},[t._v("关 闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveAdd}},[t._v("保 存")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"400px","custom-class":"modifyDialog",visible:t.modifyDialog},on:{"update:visible":function(e){t.modifyDialog=e}}},[a("span",{staticClass:"modifyDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-edit-square"}),t._v("修改")]),t._v(" "),a("div",{staticClass:"modifyDialog_box"},[a("p",[t._v("修改协议")]),t._v(" "),a("el-input",{attrs:{type:"textarea",rows:"10",placeholder:"请输入协议内容"},model:{value:t.primaryInput,callback:function(e){t.primaryInput=e},expression:"primaryInput"}})],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.modifyDialog=!1}}},[t._v("关 闭")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveModify}},[t._v("保 存")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("上传协议管理")])])}]};var p=a("VU/8")(l,d,!1,function(t){a("vfai")},null,null);e.default=p.exports},vfai:function(t,e){}});