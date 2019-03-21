webpackJsonp([14],{AYJJ:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("Xxa5"),a=i.n(s),o=i("exGp"),l=i.n(o),n=i("ZPfm"),r=i("+jNi"),c={name:"InsideDepartment",components:{BreadCrumb:n.a,DeleteModal:r.a},data:function(){return{editVisible:!1,breadData:[{id:1,name:"内部管理",urls:"/index",icon:"icon-home"},{id:2,name:"职位管理",urls:"/index/test",icon:"icon-home"}],tableData:[],jobs:[],job:"",departValue:"",departOptions:[],id:"",jobName:"",jobDescription:"",jobExpect:"",jobNumber:"",endTime:"",price:"",province:"",isUpdate:!1,deleteId:""}},methods:{handleAddJob:function(){console.log(this.job)},closeDialog:function(){this.editVisible=!1,this.valueEmpty()},addNewJob:function(){this.isUpdate=!1,this.editVisible=!0,this.getDepartment()},getDepartment:function(){var t=this;this.HttpClient.post("/admin/department/getList").then(function(e){console.log(e),200===e.data.code&&(t.departOptions=e.data.data)})},updateJob:function(t){var e=this;return l()(a.a.mark(function i(){return a.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return e.isUpdate=!0,e.editVisible=!0,e.id=t,i.next=5,e.getDepartment();case 5:e.HttpClient.get("/admin/position/edit",{id:t}).then(function(t){console.log(t);var i=t.data,s=i.code,a=i.data;200===s&&(e.departValue=a.department_id,e.jobName=a.name,e.jobDescription=a.description,e.jobExpect=a.requirement,e.jobNumber=a.limit)});case 6:case"end":return i.stop()}},i,e)}))()},addJob:function(){var t=this;if(this.departValue&&this.jobName&&this.jobDescription&&this.jobExpect&&this.jobNumber){var e={department_id:this.departValue,name:this.jobName,description:this.jobDescription,requirement:this.jobExpect,limit:this.jobNumber};this.isUpdate?(e.id=this.id,this.HttpClient.post("/admin/position/edit",e).then(function(e){console.log(e),200===e.data.code?(t.$message.success(e.data.msg),t.valueEmpty(),t.editVisible=!1,setTimeout(function(){t.getJobList()},500)):t.$message.error(e.data.msg)})):(this.endTime&&(this.parameters.end_time=this.endTime),this.price&&(this.parameters.price=this.price),this.province&&(this.parameters.province=this.province),this.HttpClient.post("/admin/position/create",e).then(function(e){console.log(e),200===e.data.code?(t.editVisible=!1,t.$message.success(e.data.msg),t.valueEmpty(),setTimeout(function(){t.getJobList()},500)):t.$message.error(e.data.msg)}))}},deleteJob:function(t){this.deleteId=t,this.$refs.delete.deleteDialog=!0},deleteConfirm:function(t){var e=this;t&&this.HttpClient.post("/admin/position/destroy",{id:this.deleteId}).then(function(t){console.log(t),200===t.data.code?(e.$message.success(t.data.msg),setTimeout(function(){e.getJobList()},500)):e.$message.error(t.data.msg)})},getJobList:function(){var t=this;this.HttpClient.post("/admin/position/getList").then(function(e){console.log(e),200===e.data.code&&(t.tableData=e.data.data)})},valueEmpty:function(){this.departValue="",this.jobName="",this.jobDescription="",this.jobExpect="",this.jobNumber="",this.endTime="",this.price="",this.province=""}},created:function(){this.getJobList()}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"insideDepartment"},[i("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),i("div",{staticClass:"content"},[i("p",{staticClass:"title"},[t._v("职位管理")]),t._v(" "),i("div",{staticClass:"conditions"},[i("div",{staticClass:"condition"}),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-circle-plus-outline"},on:{click:t.addNewJob}},[t._v("新增职位\n      ")])],1),t._v(" "),i("div",{staticClass:"tabs"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:!0,"header-row-style":{height:"40px"},"header-cell-style":{padding:0,background:"#15bafe",color:"white"},"row-style":{height:"40px"},"cell-style":{padding:0}}},[i("el-table-column",{attrs:{prop:"id",label:"职位ID",width:"100","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{label:"职位名称",width:"150","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticClass:"row_activity"},[t._v(t._s(e.row.name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"所属部门",width:"200","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticClass:"row_activity"},[t._v(t._s(e.row.department_name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"description",label:"介绍","min-width":"200","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"created_at",label:"创建时间",width:"180","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{label:"操作",width:"240",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"small",type:"text"},on:{click:function(i){t.updateJob(e.row.id)}}},[t._v("修改")]),t._v(" "),i("el-button",{attrs:{size:"small",type:"text"},on:{click:function(i){t.deleteJob(e.row.id)}}},[t._v("删除")])]}}])})],1)],1)]),t._v(" "),i("el-dialog",{attrs:{visible:t.editVisible,width:"400px"},on:{"update:visible":function(e){t.editVisible=e},close:t.closeDialog}},[i("div",{staticClass:"dialog_head_title",attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"iconfont icon-edit-square examine_icon"}),t._v(" "),i("span",[t._v("创建职位")])]),t._v(" "),i("div",{staticClass:"jurisdiction_content"},[i("div",{staticClass:"jurisdiction_content_item"},[i("label",{staticClass:"el_lbl"},[t._v("选择部门:")]),t._v(" "),i("el-select",{staticClass:"el_input",attrs:{size:"mini",placeholder:"选择部门"},model:{value:t.departValue,callback:function(e){t.departValue=e},expression:"departValue"}},t._l(t.departOptions,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),i("div",{staticClass:"jurisdiction_content_item"},[i("label",{staticClass:"el_lbl"},[t._v("职位名称:")]),t._v(" "),i("el-input",{staticClass:"el_input",attrs:{size:"mini"},model:{value:t.jobName,callback:function(e){t.jobName=e},expression:"jobName"}})],1),t._v(" "),i("div",{staticClass:"jurisdiction_content_item"},[i("label",{staticClass:"el_lbl"},[t._v("职位描述:")]),t._v(" "),i("el-input",{staticClass:"el_input_text_area",attrs:{placeholder:"请输入职位描述",type:"textarea",autosize:{minRows:3,maxRows:3}},model:{value:t.jobDescription,callback:function(e){t.jobDescription=e},expression:"jobDescription"}})],1),t._v(" "),i("div",{staticClass:"jurisdiction_content_item"},[i("label",{staticClass:"el_lbl"},[t._v("职位要求:")]),t._v(" "),i("el-input",{staticClass:"el_input_text_area",attrs:{placeholder:"请输入职位要求",type:"textarea",autosize:{minRows:3,maxRows:3}},model:{value:t.jobExpect,callback:function(e){t.jobExpect=e},expression:"jobExpect"}})],1),t._v(" "),i("div",{staticClass:"jurisdiction_content_item"},[i("label",{staticClass:"el_lbl"},[t._v("所需人数:")]),t._v(" "),i("el-input",{staticClass:"el_input_text_area",attrs:{placeholder:"请输入职位所需人数",type:"text"},model:{value:t.jobNumber,callback:function(e){t.jobNumber=e},expression:"jobNumber"}})],1)]),t._v(" "),i("div",{staticClass:"user_footer",attrs:{slot:"footer"},slot:"footer"},[i("el-row",{staticClass:"row_e"},[i("el-button",{staticClass:"btn_deletes",attrs:{size:"small"},on:{click:t.closeDialog}},[t._v("取消")]),t._v(" "),i("el-button",{staticClass:"btn_delete",attrs:{type:"primary",size:"small"},on:{click:t.addJob}},[t._v("保存")])],1)],1)]),t._v(" "),i("delete-modal",{ref:"delete",on:{doDelete:t.deleteConfirm}})],1)},staticRenderFns:[]};var p=i("VU/8")(c,d,!1,function(t){i("VChr"),i("lHtI")},"data-v-de089e5c",null);e.default=p.exports},VChr:function(t,e){},lHtI:function(t,e){}});