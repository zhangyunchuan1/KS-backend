webpackJsonp([138],{"1/fs":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("//Fk"),o=e.n(n),s=(e("G0J2"),e("yPE/")),a=(e("PJh5"),e("AJTU")),l=e.n(a),c=e("37tQ"),r=e("GH0r");s.register("modules/imageResize",l.a),s.register("modules/imageDrop",c.a);var d=["10px","12px","14px","16px","18px","20px"],u=s.import("attributors/style/size");u.whitelist=d,s.register(u,!0);s.import("formats/font").whitelist=["SimSun","SimHei","Microsoft-YaHei","KaiTi","FangSong","Arial","Times-New-Roman","sans-serif"],s.register("modules/ImageExtend",r.a);var f=[["italic","underline","strike","bold"],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:d}],[{color:[]}],[{align:[]}],["image"]],m={name:"questionModify",data:function(){var t=this;return{editorOption:{modules:{toolbar:{container:f,handlers:{image:function(t){t?document.querySelector("#xx input").click():this.quill.format("image",!1)}}},imageDrop:!0,imageResize:{displayStyles:{backgroundColor:"black",border:"none",color:"white"},modules:["Resize","DisplaySize","Toolbar"]},ImageExtend:{loading:!0,name:"img",size:1,action:"",response:function(t){return t.info},headers:function(t){},sizeError:function(){t.$message.error("图片大小超过限制1M")},start:function(){},end:function(){},error:function(){},success:function(){},change:function(t,i){}}}},contentUpData:{},content:"",id:"",imageUrl:"",tags:[],name:"",tag_id:"",part:[],modifyVisible:!1,articleData:{},newname:"",labelInfo:{},title:"",modifylinkVisible:!1}},mounted:function(){this.getlistData()},methods:{onEditorBlur:function(){},onEditorFocus:function(){},onEditorChange:function(t,i){console.log(this.content);var e=this.content;function n(t){return t=(t=(t=(t=t.replace(/<\/?[^>]*>/g,"")).replace(/[ | ]*\n/g,"\n")).replace(/\n[\s| | ]*\r/g,"\n")).replace(/ /gi,"")}console.log(n(e).length),t.quill.deleteText(i,1),this.$emit("Quescthon",this.content),console.log(this.content);var o=this.Tools.getEditorImageAndLength(this.content);this.editImageSize=o.imgArray.length,n(e).length<2e3?this.articleData.content=this.content:this.$message.error("字数超过限制")},beforeContentUpload:function(t){var i=t.size/1024/1024<10,e=t.name.split(".")[1];if("jpg,png,jpeg,tiff,tif".indexOf(e)<0)return this.$message.error("图片类型只能为jpg,png,jpeg,tiff,tif"),!1;if(!i)return this.$message.error("上传图片大小不能超过 5MB!"),!1;var n=this,s=new FileReader;return s.readAsDataURL(t),new o.a(function(i,e){s.onload=function(){n.contentUpData.token=n.$getQiNiuToken({saveKey:t.name}),i(!0)}})},handleContentSuccess:function(t,i,e){console.log(t,i,e);var n=this.$refs.myQuillEditor.quill,o=n.getSelection().index;n.insertEmbed(o,"image",this.$imagePath+i.response.key),n.setSelection(o+1)},getlistData:function(){var t=this;this.HttpClient.post("/admin/question/getInfo",{id:this.$route.query.id}).then(function(i){console.log(t.$route.query.id),200==i.data.code&&(console.log(i.data),t.articleData=i.data.data,t.title=t.articleData.title,t.content=i.data.data.content)})},modifyInfo:function(t){this.labelInfo=t,this.modifyVisible=!0,this.newname=t.name},modifylinkInfo:function(t){console.log(t),this.labelInfo=t,this.newname=t.link,this.modifylinkVisible=!0},deleteTag:function(t){var i=this,e={relation_id:this.articleData.question_id,tag_id:t.tag_id};this.HttpClient.post("/admin/tags/del",e).then(function(t){console.log(t.data),200==t.data.code&&(i.$message.success(t.data.msg),i.modifyVisible=!1,setTimeout(function(){i.getlistData()},500))})},deleteLink:function(t){var i=this;console.log(t);var e={relation_id:this.articleData.question_id,tag_id:t.source_id};this.HttpClient.post("/admin/source/del",e).then(function(t){console.log(t.data),200==t.data.code&&(i.$message.success(t.data.msg),i.modifyVisible=!1,setTimeout(function(){i.getlistData()},500))})},saveModifyFn:function(){var t=this;console.log(this.articleData.question_id),console.log(this.newname);var i={relation_id:this.articleData.question_id,name:this.newname,tag_id:this.labelInfo.tag_id};this.HttpClient.post("/admin/tags/edit",i).then(function(i){console.log(i.data),200==i.data.code&&(t.$message.success(i.data.msg),t.modifyVisible=!1,setTimeout(function(){t.getlistData()},500))})},saveModifylinkFn:function(){var t=this;console.log(this.labelInfo),console.log(this.newname);var i={name:this.labelInfo.source_name,relation_id:this.articleData.question_id,source_id:this.labelInfo.source_id,type:4,link:this.newname};this.HttpClient.post("/admin/source/edit",i).then(function(i){console.log(i.data),200==i.data.code&&(t.$message.success(i.data.msg),t.modifylinkVisible=!1,setTimeout(function(){t.getlistData()},500))})},modifyTitleContent:function(){var t=this,i={id:this.articleData.id,title:this.articleData.title,content:this.articleData.content};console.log(this.editorContent),console.log(i),this.HttpClient.post("/admin/question/edit",i).then(function(i){console.log(i.data),200==i.data.code&&(t.$message.success(i.data.msg),setTimeout(function(){t.getlistData()},500))})},handleAvatarSuccess:function(t,i){this.imageUrl=URL.createObjectURL(i.raw)},beforeAvatarUpload:function(t){var i="image/jpeg"===t.type,e=t.size/1024;return i||this.$message.error("上传图片只能是 JPG 格式!"),e||this.$message.error("上传图片大小不能超过 1MB!"),i&&e}}},g={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"questionModify"},[e("div",{staticClass:"questionModify_header"},[t._v(t._s(t.title)+" - 修改")]),t._v(" "),e("div",{staticClass:"questionModify_main"},[e("div",{staticClass:"questionModify_List"},[e("div",{staticClass:"list_title"},[t._v("标题")]),t._v(" "),e("div",{staticClass:"list_input"},[e("el-input",{model:{value:t.articleData.title,callback:function(i){t.$set(t.articleData,"title",i)},expression:"articleData.title"}})],1)]),t._v(" "),e("div",{staticClass:"questionModify_List"},[e("div",{staticClass:"list_title"},[t._v("详细内容")]),t._v(" "),e("div",{staticClass:"list_input list_textarea"},[e("div",{staticClass:"edit-box"},[e("el-upload",{staticClass:"avatar-uploader up_content",attrs:{id:"xx",action:t.$uploadPath,data:t.contentUpData,name:"file","show-file-list":!1,"on-success":t.handleContentSuccess,"before-upload":t.beforeContentUpload}}),t._v(" "),e("quill-editor",{ref:"myQuillEditor",attrs:{options:t.editorOption},on:{blur:function(i){t.onEditorBlur(i)},focus:function(i){t.onEditorFocus(i)},change:function(i){t.onEditorChange(i,5e3)}},model:{value:t.content,callback:function(i){t.content=i},expression:"content"}})],1)])]),t._v(" "),e("div",{staticClass:"questionModify_List"},[e("div",{staticClass:"list_title"},[t._v("标签")]),t._v(" "),e("div",{staticClass:"list_input list_tags"},t._l(t.articleData.label,function(i,n){return e("div",{key:n,staticClass:"tags"},[e("div",{on:{click:function(e){t.modifyInfo(i)}}},[t._v(t._s(i.name))]),t._v(" "),e("p",{on:{click:function(e){t.deleteTag(i)}}},[e("i",{staticClass:"iconfont icon-minus"})])])}))])]),t._v(" "),e("el-dialog",{attrs:{"custom-class":"modifyDialog",visible:t.modifyVisible,width:"400px"},on:{"update:visible":function(i){t.modifyVisible=i}}},[e("span",{staticClass:"modifyVisible_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-edit-square"}),t._v("修改\n    ")]),t._v(" "),e("div",{staticClass:"modifyVisible"},[e("p",[t._v("新名称：")]),t._v(" "),e("div",[e("el-input",{model:{value:t.newname,callback:function(i){t.newname=i},expression:"newname"}})],1)]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(i){t.modifyVisible=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.saveModifyFn}},[t._v("保 存")])],1)]),t._v(" "),e("el-dialog",{attrs:{"custom-class":"modifyDialog",visible:t.modifylinkVisible,width:"400px"},on:{"update:visible":function(i){t.modifylinkVisible=i}}},[e("span",{staticClass:"modifyVisible_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-edit-square"}),t._v("修改\n    ")]),t._v(" "),e("div",{staticClass:"modifyVisible"},[e("p",[t._v("新名称：")]),t._v(" "),e("div",[e("el-input",{model:{value:t.newname,callback:function(i){t.newname=i},expression:"newname"}})],1)]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(i){t.modifylinkVisible=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.saveModifylinkFn}},[t._v("保 存")])],1)]),t._v(" "),e("div",{staticClass:"questionModify_btm"},[e("el-button",[t._v("取消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.modifyTitleContent}},[t._v("修改")])],1)],1)},staticRenderFns:[]};var v=e("VU/8")(m,g,!1,function(t){e("FaAG")},null,null);i.default=v.exports},FaAG:function(t,i){}});