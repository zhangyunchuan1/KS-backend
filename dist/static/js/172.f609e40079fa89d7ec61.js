webpackJsonp([172],{Foxa:function(t,i){},nRqN:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("//Fk"),s=e.n(a),l=(e("G0J2"),e("yPE/")),n=(e("PJh5"),e("AJTU")),o=e.n(n),r=e("37tQ"),c=e("GH0r");l.register("modules/imageResize",o.a),l.register("modules/imageDrop",r.a);var d=["10px","12px","14px","16px","18px","20px"],g=l.import("attributors/style/size");g.whitelist=d,l.register(g,!0);l.import("formats/font").whitelist=["SimSun","SimHei","Microsoft-YaHei","KaiTi","FangSong","Arial","Times-New-Roman","sans-serif"],l.register("modules/ImageExtend",c.a);var u=[["italic","underline","strike","bold"],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:d}],[{color:[]}],[{align:[]}],["image"]],h={name:"ArticleModify",data:function(){var t=this;return{id:"",imageUrl:"",tags:[],name:"",tag_id:"",part:[],link:"",modifyVisible:!1,recoverDialog:!1,deIndex:null,IntegrityAttachment:null,IntegrityVideo:null,isSourse:null,articleData:{id:"",title:"",image:"",label:[],content:"",category_id:"",status:1},editorOption:{modules:{toolbar:{container:u,handlers:{image:function(t){t?document.querySelector("#xx input").click():this.quill.format("image",!1)}}},imageDrop:!0,imageResize:{displayStyles:{backgroundColor:"black",border:"none",color:"white"},modules:["Resize","DisplaySize","Toolbar"]},ImageExtend:{loading:!0,name:"img",size:1,action:"",response:function(t){return t.info},headers:function(t){},sizeError:function(){t.$message.error("图片大小超过限制1M")},start:function(){},end:function(){},error:function(){},success:function(){},change:function(t,i){}}}},contentUpData:{},content:""}},methods:{handleAvatarSuccess:function(t,i){this.imageUrl=URL.createObjectURL(i.raw)},beforeAvatarUpload:function(t){var i=this,e="image/jpeg"===t.type,a=t.size/1024;e||this.$message.error("上传图片只能是 JPG 格式!"),a||this.$message.error("上传图片大小不能超过 1MB!"),console.log(t),this.HttpClient.form("/admin/uploadOneImage",{images:t}).then(function(t){console.log(t.data),200===t.data.code&&(i.$message.success(t.data.msg),i.articleData.image=t.data.path.replace("http://cdn.kushualab.com/",""),console.log(i.articleData),setTimeout(function(){i.HttpClient.post("/admin/article/edit",i.articleData).then(function(t){console.log(t),200===t.data.code?i.$message.success(t.data.msg):i.$message.error(t.data.msg)})},500))})},getArticleDetails:function(){var t=this;this.HttpClient.post("/admin/article/getInfo",{id:this.$route.query.id}).then(function(i){console.log(i);var e=i.data,a=e.code,s=e.data;200===a&&(t.articleData.title=s.title,t.articleData.image=s.image_path,t.articleData.content=s.content,t.content=s.content,t.articleData.word_num=t.removeHTMLTag(s.content).length,t.articleData.integrity=s.integrity,t.articleData.category_id=s.category_id,t.articleData.label=s.label,t.IntegrityAttachment=s.attachment,t.IntegrityVideo=s.video,t.isSourse=s.is_course,t.part=s.source)})},updateButton:function(t){this.modifyVisible=!0,this.tag_id=t},updateTag:function(){var t=this;this.modifyVisible=!1,this.HttpClient.post("/admin/tags/edit",{relation_id:this.id,name:this.name,tag_id:this.tag_id}).then(function(i){console.log(i),200===i.data.code?(t.$message.success(i.data.msg),setTimeout(function(){t.getArticleDetails()},500)):t.$message.error(i.data.msg)})},deleteTags:function(t,i){this.recoverDialog=!0,this.deIndex=t},handleSureDelete:function(){console.log(this.deIndex),this.articleData.label.splice(this.deIndex,1),console.log(this.articleData.label),this.recoverDialog=!1},onEditorBlur:function(){},onEditorFocus:function(){},onEditorChange:function(t,i){console.log(this.content);var e=this.content;console.log(this.removeHTMLTag(e).length),this.articleData.word_num=this.removeHTMLTag(e).length,t.quill.deleteText(i,1),this.$emit("Quescthon",this.content),console.log(this.content);var a=this.Tools.getEditorImageAndLength(this.content);this.editImageSize=a.imgArray.length,console.log(this.modifyData)},beforeContentUpload:function(t){var i=t.size/1024/1024<10,e=t.name.split(".")[1];if("jpg,png,jpeg,tiff,tif".indexOf(e)<0)return this.$message.error("图片类型只能为jpg,png,jpeg,tiff,tif"),!1;if(!i)return this.$message.error("上传图片大小不能超过 5MB!"),!1;var a=this,l=new FileReader;return l.readAsDataURL(t),new s.a(function(i,e){l.onload=function(){a.contentUpData.token=a.$getQiNiuToken({saveKey:t.name}),i(!0)}})},handleContentSuccess:function(t,i,e){console.log(t,i,e);var a=this.$refs.myQuillEditor.quill,s=a.getSelection().index;a.insertEmbed(s,"image",this.$imagePath+i.response.key),a.setSelection(s+1)},updatePart:function(t){this.modifyVisible=!1},deletePart:function(){},submitArticle:function(){var t=this;console.log(this.articleData.label.length);for(var i=0;i<this.articleData.label.length;i++)this.articleData.label[i]=this.articleData.label[i].name;1===this.isSourse?(this.articleData.integrity=0,this.IntegrityAttachment&&(this.articleData.integrity=5),this.IntegrityVideo&&(this.articleData.integrity=this.articleData.integrity+20),this.articleData.word_num>400&&(this.articleData.integrity=this.articleData.integrity+15),1===this.articleData.label.length?this.articleData.integrity=this.articleData.integrity+20:2===this.articleData.label.length?this.articleData.integrity=this.articleData.integrity+40:3===this.articleData.label.length&&(this.articleData.integrity=this.articleData.integrity+60)):(this.articleData.integrity=0,this.IntegrityAttachment&&(this.articleData.integrity=5),this.IntegrityVideo&&(this.articleData.integrity=this.articleData.integrity+15),this.articleData.word_num>400&&(this.articleData.integrity=this.articleData.integrity+15),1===this.articleData.label.length?this.articleData.integrity=this.articleData.integrity+20:2===this.articleData.label.length?this.articleData.integrity=this.articleData.integrity+40:3===this.articleData.label.length&&(this.articleData.integrity=this.articleData.integrity+60)),console.log(this.articleData),this.HttpClient.post("/admin/article/edit",this.articleData).then(function(i){console.log(i),200===i.data.code?(t.$message.success(i.data.msg),setTimeout(function(){t.$router.go(-1)},500)):t.$message.error(i.data.msg)})},removeHTMLTag:function(t){return t=(t=(t=(t=t.replace(/<\/?[^>]*>/g,"")).replace(/[ | ]*\n/g,"\n")).replace(/\n[\s| | ]*\r/g,"\n")).replace(/ /gi,"")}},created:function(){this.articleData.id=this.$route.query.id,this.id=this.$route.query.articleId,console.log(this.id),this.getArticleDetails()}},m={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"articleModify"},[e("div",{staticClass:"articleModify_header"},[t._v(t._s(t.articleData.title)+" - 修改")]),t._v(" "),e("div",{staticClass:"articleModify_main"},[e("div",{staticClass:"articleModify_List"},[e("div",{staticClass:"list_title"},[t._v("标题")]),t._v(" "),e("div",{staticClass:"list_input"},[e("el-input",{model:{value:t.articleData.title,callback:function(i){t.$set(t.articleData,"title",i)},expression:"articleData.title"}})],1)]),t._v(" "),e("div",{staticClass:"articleModify_List"},[e("div",{staticClass:"list_title"},[t._v("封面图片")]),t._v(" "),e("div",{staticClass:"list_input list_upload"},[e("el-upload",{staticClass:"articleModify_uploader",attrs:{action:"/","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.articleData.image?e("img",{staticClass:"articleModify_img",attrs:{src:t.Tools.handleImg(t.articleData.image)}}):e("i",{staticClass:"el-icon-plus articleModify-icon"})]),t._v(" "),e("p",[t._v("(图片比例4:3，大小不超过1M)")])],1)]),t._v(" "),e("div",{staticClass:"articleModify_List"},[e("div",{staticClass:"list_title"},[t._v("详细内容")]),t._v(" "),e("div",{staticClass:"list_input list_textarea"},[e("div",{staticClass:"mail_edit"},[e("i",{staticClass:"iconfont icon-huaban4"}),t._v(" "),e("div",{staticClass:"mail_edit_body"},[e("el-upload",{staticClass:"avatar-uploader up_content",attrs:{id:"xx",action:t.$uploadPath,data:t.contentUpData,name:"file","show-file-list":!1,"on-success":t.handleContentSuccess,"before-upload":t.beforeContentUpload}}),t._v(" "),e("quill-editor",{ref:"myQuillEditor",attrs:{options:t.editorOption},on:{blur:function(i){t.onEditorBlur(i)},focus:function(i){t.onEditorFocus(i)},change:function(i){t.onEditorChange(i,5e3)}},model:{value:t.content,callback:function(i){t.content=i},expression:"content"}})],1)])])]),t._v(" "),e("div",{staticClass:"articleModify_List"},[e("div",{staticClass:"list_title"},[t._v("标签")]),t._v(" "),e("div",{staticClass:"list_input list_tags"},t._l(t.articleData.label,function(i,a){return e("div",{key:a,staticClass:"tags"},[e("div",{on:{click:function(e){t.updateButton(i.tag_id)}}},[t._v(t._s(i.name))]),t._v(" "),e("p",{on:{click:function(e){t.deleteTags(a,i.tag_id)}}},[e("i",{staticClass:"iconfont icon-minus"})])])}))])]),t._v(" "),e("el-dialog",{attrs:{"custom-class":"modifyDialog",visible:t.modifyVisible,width:"400px"},on:{"update:visible":function(i){t.modifyVisible=i}}},[e("span",{staticClass:"modifyVisible_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"iconfont icon-edit-square"}),t._v("修改\n    ")]),t._v(" "),e("div",{staticClass:"modifyVisible"},[e("p",[t._v("新名称：")]),t._v(" "),e("div",[e("el-input",{model:{value:t.name,callback:function(i){t.name=i},expression:"name"}})],1)]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(i){t.modifyVisible=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.updateTag}},[t._v("保 存")])],1)]),t._v(" "),e("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.recoverDialog},on:{"update:visible":function(i){t.recoverDialog=i}}},[e("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[e("i",{staticClass:"el-icon-delete"}),t._v("删除\n    ")]),t._v(" "),e("div",{staticClass:"disable_dialog_box"},[e("i",{staticClass:"iconfont icon-warning-circle"}),t._v(" "),e("p",[t._v("确定删除吗？")])]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(i){t.recoverDialog=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.handleSureDelete}},[t._v("确 定")])],1)]),t._v(" "),e("div",[e("el-button",{on:{click:function(i){t.$router.go(-1)}}},[t._v("取消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.submitArticle}},[t._v("修改")])],1)],1)},staticRenderFns:[]};var f=e("VU/8")(h,m,!1,function(t){e("Foxa")},null,null);i.default=f.exports}});