webpackJsonp([83],{gP6u:function(t,e){},jSwn:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("//Fk"),n=i.n(a),s=(i("G0J2"),i("yPE/")),o=(i("PJh5"),i("AJTU")),l=i.n(o),c=i("37tQ"),r=i("GH0r"),d=i("ZPfm"),u=i("+jNi");s.register("modules/imageResize",l.a),s.register("modules/imageDrop",c.a);var m=["10px","12px","14px","16px","18px","20px"],f=s.import("attributors/style/size");f.whitelist=m,s.register(f,!0);s.import("formats/font").whitelist=["SimSun","SimHei","Microsoft-YaHei","KaiTi","FangSong","Arial","Times-New-Roman","sans-serif"],s.register("modules/ImageExtend",r.a);var p=[["italic","underline","strike","bold"],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:m}],[{color:[]}],[{align:[]}],["image"]],g={name:"FeedbackMailManagement",data:function(){var t=this;return{breadData:[{id:1,name:"提出意见",urls:"/index/feedback/feedback",icon:"icon-home"},{id:2,name:"邮件管理模板",urls:"/index/feedback/feedback-mail-management",icon:"icon-home"}],editorOption:{modules:{toolbar:{container:p,handlers:{image:function(t){t?document.querySelector("#xx input").click():this.quill.format("image",!1)}}},imageDrop:!0,imageResize:{displayStyles:{backgroundColor:"black",border:"none",color:"white"},modules:["Resize","DisplaySize","Toolbar"]},ImageExtend:{loading:!0,name:"img",size:1,action:"",response:function(t){return t.info},headers:function(t){},sizeError:function(){t.$message.error("图片大小超过限制1M")},start:function(){},end:function(){},error:function(){},success:function(){},change:function(t,e){}}}},contentUpData:{},content:"",addVisible:!1,mailData:[],templateTitle:"",mailContent:""}},components:{BreadCrumb:d.a,DeleteModal:u.a},methods:{getMailList:function(){var t=this;this.HttpClient.post("/admin/templates/getList",{type:2}).then(function(e){console.log(e.data);var i=e.data,a=i.code,n=i.data.data;200===a&&(t.mailData=n)})},confirmDelete:function(t){var e=this;t&&this.HttpClient.post("/admin/templates/destroy",{id:this.id}).then(function(t){200===t.data.code?(e.$message.success(t.data.msg),setTimeout(function(){e.getMailList()},500)):e.$message.error(t.data.msg)})},saveTemplate:function(){var t=this;this.HttpClient.post("/admin/templates/create",{type:2,name:this.templateTitle,content:this.content}).then(function(e){console.log(e);var i=e.data,a=i.code,n=i.msg;200===a?(t.$message.success(n),t.addVisible=!1,t.templateTitle="",t.content="",setTimeout(function(){t.getMailList()},500)):t.$message.success(n)})},addButton:function(){this.addVisible=!0},deleteButton:function(t){this.id=t,this.$refs.delete.deleteDialog=!0},onEditorBlur:function(){},onEditorFocus:function(){},onEditorChange:function(t,e){console.log(this.content);var i,a=this.content;console.log((i=a,i=(i=(i=(i=i.replace(/<\/?[^>]*>/g,"")).replace(/[ | ]*\n/g,"\n")).replace(/\n[\s| | ]*\r/g,"\n")).replace(/ /gi,"")).length),t.quill.deleteText(e,1),this.$emit("Quescthon",this.content),console.log(this.content);var n=this.Tools.getEditorImageAndLength(this.content);this.editImageSize=n.imgArray.length,console.log(this.modifyData)},beforeContentUpload:function(t){var e=t.size/1024/1024<10,i=t.name.split(".")[1];if("jpg,png,jpeg,tiff,tif".indexOf(i)<0)return this.$message.error("图片类型只能为jpg,png,jpeg,tiff,tif"),!1;if(!e)return this.$message.error("上传图片大小不能超过 5MB!"),!1;var a=this,s=new FileReader;return s.readAsDataURL(t),new n.a(function(e,i){s.onload=function(){a.contentUpData.token=a.$getQiNiuToken({saveKey:t.name}),e(!0)}})},handleContentSuccess:function(t,e,i){console.log(t,e,i);var a=this.$refs.myQuillEditor.quill,n=a.getSelection().index;a.insertEmbed(n,"image",this.$imagePath+e.response.key),a.setSelection(n+1)}},created:function(){this.getMailList()}},v={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"feedback_connection"},[i("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),i("div",{staticClass:"feedback_main"},[t._m(0),t._v(" "),i("div",{staticClass:"feedback_header"},[i("div",[t._v("现有模板")]),t._v(" "),i("el-button",{on:{click:t.addButton}},[t._v("添加新模板")])],1),t._v(" "),i("div",{staticClass:"feedback_content"},[i("div",{staticClass:"feedback_type_list"},t._l(t.mailData,function(e){return i("div",{key:e.id,staticClass:"feedback_type"},[i("div",{staticClass:"feedback_type_name"},[t._v(t._s(e.name))]),t._v(" "),i("el-button",{attrs:{type:"danger"},on:{click:function(i){t.deleteButton(e.id)}}},[t._v("删除")])],1)})),t._v(" "),t.mailData.length<=0?i("div",[t._v("暂无模板")]):t._e()])]),t._v(" "),i("el-dialog",{attrs:{visible:t.addVisible,width:"800px","custom-class":"mail_visible"},on:{"update:visible":function(e){t.addVisible=e}}},[i("div",{staticClass:"dialog_head_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-faxian examine_icon"}),t._v(" "),i("span",[t._v("新模板")])]),t._v(" "),i("div",{staticClass:"mail_content"},[i("div",{staticClass:"mail_title"},[t._v("模板名称")]),t._v(" "),i("div",{staticClass:"mail_input"},[i("el-input",{model:{value:t.templateTitle,callback:function(e){t.templateTitle=e},expression:"templateTitle"}})],1)]),t._v(" "),i("div",{staticClass:"mail_content"},[i("div",{staticClass:"mail_title"},[t._v("内容编辑")]),t._v(" "),i("div",{staticClass:"mail_edit"},[i("i",{staticClass:"iconfont icon-huaban4"}),t._v(" "),i("div",{staticClass:"mail_edit_body"},[i("el-upload",{staticClass:"avatar-uploader up_content",attrs:{id:"xx",action:t.$uploadPath,data:t.contentUpData,name:"file","show-file-list":!1,"on-success":t.handleContentSuccess,"before-upload":t.beforeContentUpload}}),t._v(" "),i("quill-editor",{ref:"myQuillEditor",attrs:{options:t.editorOption},on:{blur:function(e){t.onEditorBlur(e)},focus:function(e){t.onEditorFocus(e)},change:function(e){t.onEditorChange(e,5e3)}},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)])]),t._v(" "),i("div",{staticClass:"user_footer",attrs:{slot:"footer"},slot:"footer"},[i("el-row",[i("el-button",{staticClass:"btn_foot",attrs:{type:"primary"},on:{click:function(e){t.addVisible=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{staticClass:"btn_foot",attrs:{type:"primary"},on:{click:t.saveTemplate}},[t._v("保存")])],1)],1)]),t._v(" "),i("delete-modal",{ref:"delete",on:{doDelete:t.confirmDelete}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"feedback_title"},[e("div",{staticClass:"title"},[this._v("邮件模板管理")])])}]};var _=i("VU/8")(g,v,!1,function(t){i("gP6u")},null,null);e.default=_.exports}});