webpackJsonp([141],{ejiK:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("+jNi"),a=(i("7+uW"),{name:"ProductModify",components:{DeleteModal:o.a},data:function(){return{dialogImageUrl:"",dialogVisible:!1,videoUrl:"",videoDialogVisible:!1,modifyVisible:!1,editorOption:{modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"]]}},brandRadio:2,checkList:["方形","三角形"],voltage:"50",length:"0.5",rotatingSpeed:"0.5",productInfo:{},picture:[],attachment:[],updateInfo:{product_id:this.$route.query.id,title:"",video:[{name:"",path:""}],asin:"",description:"",show_picture:[],attachment:[]},tags:[],tagId:"",newTagName:"",property:[],properties:[],uploadProperties:[]}},methods:{handleRemove:function(t,e){var i=this;console.log(t,e),this.updateInfo.show_picture.map(function(e,o){e.url===t.url&&i.updateInfo.show_picture.splice(o,1)}),console.log(e),this.picture=e,console.log(this.picture)},imageUpload:function(t){var e=this;this.HttpClient.form("/admin/uploadOneImage",{images:t}).then(function(i){200===i.data.code&&(e.$message.success(i.data.msg),e.picture.push({name:t.name,url:i.data.path,path:i.data.path.slice(25)}))})},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},handleAvatarSuccess:function(t,e){this.videoUrl=URL.createObjectURL(e.raw)},videoUpload:function(t){var e=this;console.log(t);var i="video/mp4"===t.type;return i||this.$message.error("上传视频只能是 MP4 格式!"),this.HttpClient.form("/admin/uploadOneVideo",{video:t}).then(function(i){console.log(i),200===i.data.code?(e.$message.success(i.data.msg),e.videoUrl=i.data.path,e.updateInfo.video||(e.updateInfo.video=[],e.updateInfo.video.push({path:i.data.path,name:t.name})),console.log(e.updateInfo.video)):e.$message.error(i.data.msg)}),i},listHandleRemove:function(t,e){var i=this;console.log(t,e),this.attachment.map(function(e,o){e.url===t.url&&i.attachment.splice(o,1)}),console.log(this.attachment)},listHandlePreview:function(t){console.log(t)},fileUpload:function(t){var e=this;this.HttpClient.form("/admin/uploadOneFile",{files:t}).then(function(i){200===i.data.code?(e.$message.success(i.data.msg),e.attachment.push({name:t.name,path:i.data.path}),console.log(e.attachment)):e.$message.error(i.data.msg)})},updateTag:function(t){this.tagId=t,this.modifyVisible=!0},deleteButton:function(t){this.tagId=t,this.$refs.delete.deleteDialog=!0},updateTagConfirm:function(){this.tags[this.tagId]=this.newTagName,this.modifyVisible=!1},deleteConfirm:function(){console.log(this.tagId),this.tags.splice(this.tagId,1),console.log(this.tags)},getProductInfo:function(){var t=this;this.HttpClient.get("/admin/marketProduct/edit",{product_id:this.$route.query.id}).then(function(e){if(console.log(e),200===e.data.code){var i=e.data.data,o=i.title,a=i.video,s=i.asin,l=i.description,n=i.show_picture,r=i.attachment,d=i.tags,c=i.cate_property,u=i.map_property;if(t.productInfo=e.data.data,t.updateInfo.asin=s,t.updateInfo.title=o,t.updateInfo.description=l,t.updateInfo.stock=e.data.data.stock,t.updateInfo.price=e.data.data.price,t.updateInfo.category_id=e.data.data.category_id,a?(t.videoUrl=t.Tools.handleImg(a[0].path),t.updateInfo.video[0].name=e.data.data.video[0].name,t.updateInfo.video[0].path=t.Tools.handleImg(a[0].path),console.log(t.videoUrl)):t.updateInfo.video=a,n){for(var p in n)n[p].url="http://cdn.kushualab.com/"+n[p].path;t.picture=n,console.log(t.updateInfo.show_picture)}r&&(t.attachment=r),console.log(t.attachment),console.log(d),t.property=c,console.log(t.property),t.property.map(function(e){1===e.rule?e.radioSelect="":2===e.rule?e.checkList=[]:3===e.rule?e.intValue=null:e.floatValue=null;var i=[];u.map(function(t){t.property_id===e.property_id&&(1===e.rule?(e.radioSelect=t.value_id,i=[e.radioSelect]):2===e.rule?(e.checkList.push(t.value_id),console.log(e.checkList),i=e.checkList):3===e.rule?(e.intValue=t.property_value,e.property_unit=t.property_unit,i=[e.intValue,e.values]):(e.floatValue=t.property_value,e.property_unit=t.property_unit,i=[e.floatValue,e.values]),console.log(i))}),t.properties.length>0?t.properties.map(function(o,a){o.id===e.property_id?i.length>0?o.val=i:t.properties.splice(a,1):i.length>0&&t.properties.push({id:e.property_id,val:i})}):i.length>0&&t.properties.push({id:e.property_id,val:i})}),console.log(t.property),console.log(t.properties),console.log(t.updateInfo.video)}})},updateProperty:function(t,e,i){var o=this;console.log(t,e,i),this.$set(this.property,t,this.property[t]);var a=e.property_id,s=(e.category_id,e.rule),l=[];1===s?e.radioSelect&&(l=[e.radioSelect]):2===s?(l=e.checkList,console.log(e.checkList)):3===s?e.intValue&&(l=[e.intValue,e.values]):(console.log("值",i),e.floatValue&&(l=[e.floatValue,e.values])),console.log(l),this.properties.length>0?this.properties.map(function(t,e){t.id===a?l.length>0?t.val=l:o.properties.splice(e,1):l.length>0&&o.properties.push({id:a,val:l})}):l.length>0&&this.properties.push({id:a,val:l});for(var n=[],r=this.properties.length,d=0;d<r;d++){for(var c=d+1;c<r;c++)this.properties[d].id===this.properties[c].id&&(c=++d);n.push(this.properties[d])}this.properties=n,console.log(this.properties)},updateProduct:function(){var t=this;console.log(this.updateInfo.show_picture,this.picture,this.attachment);var e=[];for(var i in this.picture)e.push({name:this.picture[i].name,path:this.picture[i].path});if(this.updateInfo.show_picture=e,this.updateInfo.tags=this.tags,console.log(e,this.updateInfo),this.attachment)for(var o in this.attachment)this.updateInfo.attachment.push({name:this.attachment[o].name,path:this.attachment[o].path});this.properties.length>0&&(this.updateInfo.properties=this.properties),this.updateInfo.integrity=95,console.log(this.updateInfo),this.HttpClient.post("/admin/marketProduct/edit",this.updateInfo).then(function(e){200===e.data.code?(t.$message.success(e.data.msg),setTimeout(function(){t.getProductInfo()},500)):t.$message.error(e.data.msg)})},onEditorBlur:function(){},onEditorFocus:function(){},onEditorChange:function(t){}},created:function(){this.getProductInfo()}}),s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"productModify"},[i("div",{staticClass:"productModify_main"},[t._m(0),t._v(" "),i("div",{staticClass:"productModify_content"},[i("div",{staticClass:"productModify_list"},[i("div",{staticClass:"list_title"},[t._v("商品名称")]),t._v(" "),i("el-input",{staticClass:"list_main",model:{value:t.updateInfo.title,callback:function(e){t.$set(t.updateInfo,"title",e)},expression:"updateInfo.title"}})],1),t._v(" "),i("div",{staticClass:"productModify_list richText"},[i("div",{staticClass:"list_title"},[t._v("商品详情")]),t._v(" "),i("quill-editor",{ref:"myQuillEditor",attrs:{options:t.editorOption},on:{blur:function(e){t.onEditorBlur(e)},focus:function(e){t.onEditorFocus(e)},change:function(e){t.onEditorChange(e)}},model:{value:t.updateInfo.description,callback:function(e){t.$set(t.updateInfo,"description",e)},expression:"updateInfo.description"}})],1),t._v(" "),i("div",{staticClass:"productModify_list"},[i("div",{staticClass:"list_title"},[t._v("轮播图")]),t._v(" "),i("div",{staticClass:"list_uploadImg"},[i("el-upload",{attrs:{action:"/","list-type":"picture-card","before-upload":t.imageUpload,"on-preview":t.handlePictureCardPreview,"file-list":t.picture,"on-remove":t.handleRemove}},[i("i",{staticClass:"el-icon-plus"})]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1)]),t._v(" "),i("div",{staticClass:"productModify_list"},[i("div",{staticClass:"list_title"},[t._v("视频")]),t._v(" "),i("div",{staticClass:"list_uploadVideo"},[i("el-upload",{staticClass:"video-uploader",attrs:{action:"/","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.videoUpload}},[t.videoUrl?i("video",{staticClass:"videoView",attrs:{controls:"",src:t.videoUrl}}):i("i",{staticClass:"el-icon-plus video-uploader-icon"})])],1)]),t._v(" "),i("div",{staticClass:"productModify_list"},[i("div",{staticClass:"list_title"},[t._v("附件")]),t._v(" "),i("div",{staticClass:"list_uploadList"},[i("el-upload",{staticClass:"upload-demo",attrs:{action:"/","before-upload":t.fileUpload,"on-preview":t.listHandlePreview,"on-remove":t.listHandleRemove,"file-list":t.attachment,"list-type":"picture"}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1)],1)]),t._v(" "),i("div",{staticClass:"productModify_list"},[i("div",{staticClass:"list_title"},[t._v("产品属性")]),t._v(" "),i("div",{staticClass:"list_attributes"},t._l(t.property,function(e,o){return i("div",{key:e.id,staticClass:"attributes_box"},[i("div",{staticClass:"big_box"},[i("div",{staticClass:"attributes_title"},[t._v(t._s(e.property_name))]),t._v(" "),i("div",{staticClass:"small_box2"},[1===e.selective?i("span",[t._v("选填")]):i("span",[t._v("必填")])]),t._v(" "),i("div",{staticClass:"small_box1"},[2===e.rule?i("span",[t._v("多选")]):1===e.rule?i("span",[t._v("单选")]):i("span",[t._v("单位："+t._s(e.property_unit))])])]),t._v(" "),1===e.rule?i("div",[i("el-radio-group",{staticClass:"brandList",on:{change:function(i){t.updateProperty(o,e,i)}},model:{value:e.radioSelect,callback:function(i){t.$set(e,"radioSelect",i)},expression:"item.radioSelect"}},t._l(e.values,function(e){return i("el-radio",{key:e.value_id,attrs:{border:"",label:e.value_id}},[t._v(t._s(e.value))])}))],1):2===e.rule?i("div",[i("el-checkbox-group",{on:{change:function(i){t.updateProperty(o,e)}},model:{value:e.checkList,callback:function(i){t.$set(e,"checkList",i)},expression:"item.checkList"}},t._l(e.values,function(e){return i("el-checkbox",{key:e.pc_id,attrs:{border:"",label:e.value_id}},[t._v(t._s(e.value))])}))],1):3===e.rule?i("div",[i("el-input",{on:{change:function(i){t.updateProperty(o,e)}},model:{value:e.intValue,callback:function(i){t.$set(e,"intValue",i)},expression:"item.intValue"}}),t._v(" "),i("span",[t._v(t._s(e.values))])],1):i("div",[i("el-input",{on:{change:function(i){t.updateProperty(o,e)}},model:{value:e.floatValue,callback:function(i){t.$set(e,"floatValue",i)},expression:"item.floatValue"}})],1)])}))])]),t._v(" "),i("div",{staticClass:"cloneProductModify_box"},[i("el-button",{staticClass:"cloneProductModify",on:{click:function(e){t.$router.go(-1)}}},[t._v("关闭")]),t._v(" "),i("el-button",{staticClass:"cloneProductModify",attrs:{type:"primary"},on:{click:t.updateProduct}},[t._v("保存")])],1)]),t._v(" "),i("el-dialog",{attrs:{"custom-class":"modifyDialog",visible:t.modifyVisible,width:"400px"},on:{"update:visible":function(e){t.modifyVisible=e}}},[i("span",{staticClass:"modifyVisible_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-edit-square"}),t._v("修改")]),t._v(" "),i("div",{staticClass:"modifyVisible"},[i("p",[t._v("新标签名称：")]),t._v(" "),i("div",[i("el-input",{model:{value:t.newTagName,callback:function(e){t.newTagName=e},expression:"newTagName"}})],1)]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.modifyVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.updateTagConfirm}},[t._v("保 存")])],1)]),t._v(" "),i("delete-modal",{ref:"delete",on:{doDelete:t.deleteConfirm}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("商品修改")])])}]};var l=i("VU/8")(a,s,!1,function(t){i("iGqA")},null,null);e.default=l.exports},iGqA:function(t,e){}});