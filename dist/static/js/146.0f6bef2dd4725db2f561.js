webpackJsonp([146],{"8blB":function(t,i){},UOQE:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=e("mvHQ"),a=e.n(o),s=e("//Fk"),n=e.n(s),l=(e("G0J2"),e("yPE/")),d=(e("PJh5"),e("AJTU")),c=e.n(d),r=e("37tQ"),m=e("GH0r");l.register("modules/imageResize",c.a),l.register("modules/imageDrop",r.a);var u=["10px","12px","14px","16px","18px","20px"],f=l.import("attributors/style/size");f.whitelist=u,l.register(f,!0);l.import("formats/font").whitelist=["SimSun","SimHei","Microsoft-YaHei","KaiTi","FangSong","Arial","Times-New-Roman","sans-serif"],l.register("modules/ImageExtend",m.a);var h=[["italic","underline","strike","bold"],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:u}],[{color:[]}],[{align:[]}],["image"]],v={name:"VideoModify",data:function(){var t=this;return{editorOption:{modules:{toolbar:{container:h,handlers:{image:function(t){t?document.querySelector("#xx input").click():this.quill.format("image",!1)}}},imageDrop:!0,imageResize:{displayStyles:{backgroundColor:"black",border:"none",color:"white"},modules:["Resize","DisplaySize","Toolbar"]},ImageExtend:{loading:!0,name:"img",size:1,action:"",response:function(t){return t.info},headers:function(t){},sizeError:function(){t.$message.error("图片大小超过限制1M")},start:function(){},end:function(){},error:function(){},success:function(){},change:function(t,i){}}}},contentUpData:{},content:"",id:"",imageUrl:"",tags:[],oldTags:[],name:"",tag_id:"",part:[],modifyVisible:!1,modifyObj:{},modifyIndex:null,modifyType:null,isCourse:null,image_path:"",teachingBtm:!1,fileList:[],modifyData:{},newName:"",modifyImgUrl:""}},created:function(){this.getVideoInfo(this.$route.query.id)},methods:{onEditorBlur:function(){},onEditorFocus:function(){},onEditorChange:function(t,i){console.log(this.content);var e=this.content;function o(t){return t=(t=(t=(t=t.replace(/<\/?[^>]*>/g,"")).replace(/[ | ]*\n/g,"\n")).replace(/\n[\s| | ]*\r/g,"\n")).replace(/ /gi,"")}console.log(o(e).length),t.quill.deleteText(i,1),this.$emit("Quescthon",this.content),console.log(this.content);var a=this.Tools.getEditorImageAndLength(this.content);this.editImageSize=a.imgArray.length,o(e).length<2e3?this.modifyData.description=this.content:this.$message.error("字数超过限制")},beforeContentUpload:function(t){var i=t.size/1024/1024<10,e=t.name.split(".")[1];if("jpg,png,jpeg,tiff,tif".indexOf(e)<0)return this.$message.error("图片类型只能为jpg,png,jpeg,tiff,tif"),!1;if(!i)return this.$message.error("上传图片大小不能超过 5MB!"),!1;var o=this,a=new FileReader;return a.readAsDataURL(t),new n.a(function(i,e){a.onload=function(){o.contentUpData.token=o.$getQiNiuToken({saveKey:t.name}),i(!0)}})},handleContentSuccess:function(t,i,e){console.log(t,i,e);var o=this.$refs.myQuillEditor.quill,a=o.getSelection().index;o.insertEmbed(a,"image",this.$imagePath+i.response.key),o.setSelection(a+1)},handleDeleteSource:function(t,i){var e=this;console.log(t),this.HttpClient.form("/admin/source/del",{tag_id:t.source_id,relation_id:this.$route.query.video_id}).then(function(t){console.log(t),200===t.data.code&&(e.$message.success(t.data.msg),e.modifyData.source.splice(i,1))})},handleDeleteTag:function(t,i){var e=this;console.log(t,this.$route.query.video_id,this.modifyData.label),this.HttpClient.form("/admin/tags/del",{tag_id:t.tag_id,relation_id:this.$route.query.video_id}).then(function(t){console.log(t),200===t.data.code&&(e.$message.success(t.data.msg),e.modifyData.label.splice(i,1))})},beforeUploadAttachment:function(t){var i=this;console.log(t),this.HttpClient.form("/admin/uploadOneFile",{files:t}).then(function(e){console.log(e),200===e.data.code&&(i.$message.success(e.data.msg),i.modifyData.attachment.push({name:t.name,path:e.data.path.substr(25),status:"success",uid:t.uid}))})},handleSaveAll:function(){var t=this;console.log(this.modifyData.cover),console.log(this.imageUrl),this.modifyData.cover[0].path!==this.imageUrl&&(this.modifyData.cover[0].path="http://cdn.kushualab.com/"+this.modifyData.cover[0].path);var i=[];for(var e in this.modifyData.attachment)i.push({name:this.modifyData.attachment[e].name,path:this.modifyData.attachment[e].path});this.modifyData.is_course?this.isCourse=1:this.isCourse=0,console.log(a()(this.modifyData.attachment)),this.HttpClient.post("/admin/videos/edit",{id:this.$route.query.id,title:this.modifyData.title,cover:this.modifyData.cover,is_course:this.isCourse,description:this.modifyData.description,attachment:i}).then(function(i){console.log(i),200===i.data.code?(t.$message.success(i.data.msg),setTimeout(function(){t.$router.go(-1)},500)):t.$router.go(-1)})},handleSaveName:function(){var t=this;console.log(this.modifyType,this.modifyObj),"a"===this.modifyType?this.HttpClient.form("/admin/tags/edit",{tag_id:this.modifyObj.tag_id,name:this.newName,relation_id:this.$route.query.video_id}).then(function(i){console.log(i),200===i.data.code&&(t.$message.success(i.data.msg),t.modifyData.label[t.modifyIndex].name=t.newName)}):"b"===this.modifyType?this.HttpClient.form("/admin/source/edit",{source_id:this.modifyObj.source_id,name:this.newName,relation_id:this.$route.query.video_id,type:3,link:this.modifyObj.link}).then(function(i){console.log(i),200===i.data.code&&(t.$message.success(i.data.msg),t.modifyData.source[t.modifyIndex].source_name=t.newName)}):"c"===this.modifyType&&this.HttpClient.form("/admin/source/edit",{source_id:this.modifyObj.source_id,name:this.modifyObj.name,relation_id:this.$route.query.video_id,type:3,link:this.newName}).then(function(i){console.log(i),200===i.data.code&&(t.$message.success(i.data.msg),t.modifyData.source[t.modifyIndex].link=t.newName)}),this.modifyVisible=!1},handleChangeCourse:function(){console.log(this.modifyData.is_course)},handleModify:function(t,i,e){console.log(t),this.modifyObj=t,this.modifyIndex=i,this.modifyType=e,"a"===e?(console.log("修改标签"),this.newName=t.name):"b"===e?(console.log("修改零件"),this.newName=t.source_name):"c"===e&&(console.log("修改地址"),this.newName=t.link),this.modifyVisible=!0},getVideoInfo:function(t){var i=this;this.HttpClient.post("/admin/videos/getInfo",{id:t}).then(function(t){console.log(t),i.modifyData=t.data.data,i.content=i.modifyData.description,console.log(i.modifyData.cover),console.log(i.modifyData.cover),i.imageUrl=i.Tools.handleImg(i.modifyData.cover[0].path),i.modifyData.attachment?console.log("chuli"):i.modifyData.attachment=[],i.isCourse=i.modifyData.is_course,1===i.modifyData.is_course?i.modifyData.is_course=!0:i.modifyData.is_course=!1})},handleAvatarSuccess:function(t,i){},beforeAvatarUpload:function(t){var i=this;console.log(t.name);var e="image/jpeg"===t.type,o=t.size/1024/1024<10;e?o?this.HttpClient.form("/admin/uploadOneImage",{images:t}).then(function(e){console.log(e),200===e.data.code&&(i.imageUrl=e.data.path,i.modifyData.cover=[],i.modifyData.cover.push({name:t.name,path:e.data.path}),i.$message.success(e.data.msg),i.modifyData.cover[0].name=t.name)}):this.$message.error("上传图片大小不能超过 5MB!"):this.$message.error("上传图片只能是 JPG 格式!")},handleRemove:function(t){for(var i in console.log(t),console.log(this.modifyData.attachment),this.modifyData.attachment)t.uid===this.modifyData.attachment[i].uid&&this.modifyData.attachment.splice(i,1);console.log(this.modifyData.attachment)},handlePreview:function(t){console.log(t)},handleExceed:function(t){},beforeRemove:function(t){return this.$confirm("确定移除 "+t.name+"？")},removeHTMLTag:function(t){return t.replace(/<(\/)?[^>].*?>/g,"")},handleCancelModify:function(){this.$router.go(-1)}}},g={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"videoModify"},[e("div",{staticClass:"videoModify_header"},[t._v(t._s(t.modifyData.title)+" - 修改")]),t._v(" "),e("div",{staticClass:"videoModify_main"},[e("div",{staticClass:"videoModify_List"},[e("div",{staticClass:"list_title"},[t._v("标题")]),t._v(" "),e("div",{staticClass:"list_input"},[e("el-input",{model:{value:t.modifyData.title,callback:function(i){t.$set(t.modifyData,"title",i)},expression:"modifyData.title"}})],1)]),t._v(" "),e("div",{staticClass:"videoModify_List"},[e("div",{staticClass:"list_title"},[t._v("封面图片")]),t._v(" "),e("div",{staticClass:"list_input list_upload"},[e("el-upload",{staticClass:"videoModify_uploader",attrs:{action:"","on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.imageUrl?e("img",{staticClass:"videoModify_img",attrs:{src:t.imageUrl}}):e("i",{staticClass:"el-icon-plus videoModify-icon"})]),t._v(" "),e("p",[t._v("(图片比例4:3，大小不超过1M)")])],1)]),t._v(" "),e("div",{staticClass:"videoModify_List"},[e("div",{staticClass:"list_title"},[t._v("视频详情")]),t._v(" "),e("div",{staticClass:"list_input list_textarea"},[e("el-upload",{staticClass:"avatar-uploader up_content",attrs:{id:"xx",action:t.$uploadPath,data:t.contentUpData,name:"file","show-file-list":!1,"on-success":t.handleContentSuccess,"before-upload":t.beforeContentUpload}}),t._v(" "),e("quill-editor",{ref:"myQuillEditor",attrs:{options:t.editorOption},on:{blur:function(i){t.onEditorBlur(i)},focus:function(i){t.onEditorFocus(i)},change:function(i){t.onEditorChange(i,5e3)}},model:{value:t.content,callback:function(i){t.content=i},expression:"content"}})],1)]),t._v(" "),e("div",{staticClass:"videoModify_List"},[e("div",{staticClass:"list_title"},[t._v("标签")]),t._v(" "),e("div",{staticClass:"list_input list_tags"},t._l(t.modifyData.label,function(i,o){return e("div",{key:o,staticClass:"tags"},[e("div",{on:{click:function(e){t.handleModify(i,o,"a")}}},[t._v(t._s(i.name))]),t._v(" "),e("p",[e("i",{staticClass:"iconfont icon-minus",on:{click:function(e){t.handleDeleteTag(i,o)}}})])])}))]),t._v(" "),e("div",{staticClass:"videoModify_List"},[e("div",{staticClass:"list_title list_title_margin"},[t._v("使用零件、软件")]),t._v(" "),e("div",{staticClass:"list_input list_tags_link"},t._l(t.modifyData.source,function(i,o){return e("div",{key:o,staticClass:"tags_link"},[e("div",{staticClass:"tags"},[e("div",{on:{click:function(e){t.handleModify(i,o,"b")}}},[t._v(t._s(i.source_name))])]),t._v(" "),e("div",{staticClass:"tags"},[e("div",{on:{click:function(e){t.handleModify(i,o,"c")}}},[t._v(t._s(i.link))]),t._v(" "),e("p",[e("i",{staticClass:"iconfont icon-minus",on:{click:function(e){t.handleDeleteSource(i,o)}}})])])])}))]),t._v(" "),e("div",{staticClass:"videoModify_List"},[e("div",{staticClass:"list_title"},[t._v("是否为教学视频")]),t._v(" "),e("div",{staticClass:"list_input list_switch"},[e("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:t.handleChangeCourse},model:{value:t.modifyData.is_course,callback:function(i){t.$set(t.modifyData,"is_course",i)},expression:"modifyData.is_course"}})],1)]),t._v(" "),e("div",{staticClass:"videoModify_List"},[e("div",{staticClass:"list_title"},[t._v("附件")]),t._v(" "),e("div",{staticClass:"list_input list_upload list_upload_txt"},[e("el-upload",{staticClass:"upload-demo",attrs:{action:"http://test.kslab.com/api/article/null","on-preview":t.handlePreview,"on-remove":t.handleRemove,"before-remove":t.beforeRemove,multiple:"","before-upload":t.beforeUploadAttachment,"on-exceed":t.handleExceed,"file-list":t.modifyData.attachment}},[e("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),e("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("不超过500kb")])],1)],1)])]),t._v(" "),e("div",{staticClass:"bottom"},[e("el-button",{on:{click:t.handleCancelModify}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveAll}},[t._v("保 存")])],1),t._v(" "),e("el-dialog",{attrs:{"custom-class":"modifyDialog",visible:t.modifyVisible,width:"400px"},on:{"update:visible":function(i){t.modifyVisible=i}}},[e("span",{staticClass:"modifyVisible_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-edit-square"}),t._v("修改\n    ")]),t._v(" "),e("div",{staticClass:"modifyVisible"},[e("p",[t._v("新名称/新链接：")]),t._v(" "),e("div",[e("el-input",{model:{value:t.newName,callback:function(i){t.newName=i},expression:"newName"}})],1)]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(i){t.modifyVisible=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.handleSaveName}},[t._v("保 存")])],1)])],1)},staticRenderFns:[]};var p=e("VU/8")(v,g,!1,function(t){e("8blB")},null,null);i.default=p.exports}});