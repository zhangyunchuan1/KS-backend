webpackJsonp([17],{"4eUG":function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"ActivitySeeSignUp",components:{BreadCrumb:l("ZPfm").a},data:function(){return{state:0,input22:0,input21:0,verificationCode:"",ticNumber:null,realName:"习大大",idnumber:"54153216658545148",userId:"251561",businessPhone:"18996657240",textarea:"",deleteDialog:!1,remark:"",warmImg:l("GvV1"),breadData:[{id:1,name:"活动状态",urls:"/index",icon:"icon-home"},{id:2,name:"查看评价",urls:"/index/activity-modify",icon:"icon-home"}],cityOptions:[{value:1,label:"全部"},{value:2,label:"长期"},{value:3,label:"定时"}],typeOptions:[{value:1,label:"全部"},{value:2,label:"汽车"},{value:3,label:"摩托"},{value:4,label:"无人机"}],levelOptions:[{value:1,label:"全部"},{value:2,label:"改装"}],typeValue:null,dialogImageUrl:"",dialogVisible:!1,tableData:[],title:"",city_name:"",deleteId:null,total:null,currentPage:1}},created:function(){console.log(this.$route.query.id),this.getApplicantList(this.$route.query.id)},methods:{handleOpenDelete:function(t){console.log(t),this.deleteId=t,this.deleteDialog=!0},getApplicantList:function(t){var e=this;this.HttpClient.post("/admin/answers/getList",{type:4,active_id:t,size:25,page:this.currentPage}).then(function(t){console.log(t),e.tableData=t.data.data.data,e.total=t.data.data.total,e.title=t.data.data.data[0].source_title,e.city_name=t.data.data.data[0].city_name;for(var l=0;l<e.tableData.length;l++)e.tableData[l].attachment=JSON.parse(t.data.data.data[l].attachment);console.log(e.tableData),console.log(e.title,e.city_name)})},handleDelete:function(){var t=this;this.HttpClient.post("/admin/answers/changeStatus",{answer_id:this.deleteId,status:0}).then(function(e){console.log(e),200===e.data.code&&(t.$message.success(e.data.msg),setTimeout(function(){t.getApplicantList()},500),t.deleteVisible=!1)})},currentChange:function(t){this.currentPage=t,this.getApplicantList()}}},n={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"seepingj"},[l("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),l("div",{staticClass:"content"},[l("p",{staticClass:"title"},[t._v("查看评价")]),t._v(" "),l("div",{staticClass:"content_contain"},[l("div",{staticClass:"conditions"},[l("div",{staticClass:"activityname"},[t._v(t._s(t.title))]),t._v(" "),l("div",[t._v("玩出酷耍生命力，挑战720度回转寿司")]),t._v(" "),l("div",[t._v(t._s(t.city_name))])]),t._v(" "),l("div",{staticClass:"tables"},[l("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:!0}},[l("el-table-column",{attrs:{prop:"id",label:"用户ID",width:"100"}}),t._v(" "),l("el-table-column",{attrs:{label:"联系人","min-width":"100",prop:"pollinfo.conducts"},scopedSlots:t._u([{key:"default",fn:function(e){return[null===e.row.pollinfo.conducts?l("span",[t._v("无")]):t._e(),t._v(" "),null!==e.row.pollinfo.conducts?l("span",[t._v(t._s(e.row.pollinfo.conducts))]):t._e()]}}])}),t._v(" "),l("el-table-column",{attrs:{prop:"pollinfo.telphone",label:"联系电话",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[null===e.row.pollinfo.telphone?l("span",[t._v("无")]):t._e(),t._v(" "),null!==e.row.pollinfo.telphone?l("span",[t._v(t._s(e.row.pollinfo.telphone))]):t._e()]}}])}),t._v(" "),l("el-table-column",{attrs:{prop:"pollinfo.quantity",label:"购买票数",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[null===e.row.pollinfo.quantity?l("span",[t._v("无")]):t._e(),t._v(" "),null!==e.row.pollinfo.quantity?l("span",[t._v(t._s(e.row.pollinfo.quantity))]):t._e()]}}])}),t._v(" "),l("el-table-column",{attrs:{prop:"pollinfo.use_num",label:"已使用票数",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[null===e.row.pollinfo.use_num?l("span",[t._v("无")]):t._e(),t._v(" "),null!==e.row.pollinfo.use_num?l("span",[t._v(t._s(e.row.pollinfo.use_num))]):t._e()]}}])}),t._v(" "),l("el-table-column",{attrs:{prop:"pollinfo.refund_num",label:"退票数",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[null===e.row.pollinfo.refund_num?l("span",[t._v("无")]):t._e(),t._v(" "),null!==e.row.pollinfo.refund_num?l("span",[t._v(t._s(e.row.pollinfo.refund_num))]):t._e()]}}])}),t._v(" "),l("el-table-column",{attrs:{prop:"content",label:"评价内容",width:"250"}}),t._v(" "),l("el-table-column",{attrs:{prop:"attachment",label:"图片",width:"120"},scopedSlots:t._u([{key:"default",fn:function(t){return[l("img",{staticStyle:{width:"100px"},attrs:{src:t.row.attachment,alt:""}})]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"打分",width:"120",prop:"score"}}),t._v(" "),l("el-table-column",{attrs:{prop:"created_at",label:"评论时间",width:"120"}}),t._v(" "),l("el-table-column",{attrs:{label:"操作",width:"240",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-button",{attrs:{size:"small",type:"text"},on:{click:function(l){t.handleOpenDelete(e.row.answer_id)}}},[t._v("删除")])]}}])})],1)],1)])]),t._v(" "),t.total?l("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":25},on:{"current-change":t.currentChange}}):t._e(),t._v(" "),l("el-dialog",{attrs:{width:"470px","custom-class":"deleteDialog",visible:t.deleteDialog,center:""},on:{"update:visible":function(e){t.deleteDialog=e}}},[l("span",{staticClass:"deleteDialog_title",attrs:{slot:"title"},slot:"title"},[l("i",{staticClass:"iconfont icon-huaban4"})]),t._v(" "),l("div",{staticClass:"deleteDialog_box"},[l("i",{staticClass:"iconfont icon-warning-circle"}),t._v(" "),l("p",[t._v("确定删除吗？")])]),t._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(e){t.deleteDialog=!1}}},[t._v("取 消")]),t._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:t.handleDelete}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var o=l("VU/8")(a,n,!1,function(t){l("mXJR"),l("nWaw")},"data-v-763d3fc4",null);e.default=o.exports},mXJR:function(t,e){},nWaw:function(t,e){}});