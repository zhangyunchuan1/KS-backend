webpackJsonp([194],{"66nE":function(t,e){},yYuY:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Xxa5"),o=a.n(i),n=a("gRE1"),s=a.n(n),r=a("exGp"),l=a.n(r),c=a("ZPfm"),u=a("+jNi"),d={name:"ProductReview",components:{BreadCrumb:c.a,DeleteModal:u.a},data:function(){return{breadData:[{id:1,name:"淘货",urls:"/index/market/Market",icon:"icon-home"},{id:2,name:"淘货商品",urls:"/index/market/marketProduct/MarketProduct",icon:"icon-home"},{id:3,name:"淘货商品审核",urls:"/index/market/marketProduct/ProductReview",icon:"icon-home"}],headerSelect:"",headerOptions:[{status:0,text:"全部"},{status:1,text:"通过"},{status:2,text:"未通过"}],headerAuditSelect:"",headerAuditOptions:[{status:0,text:"全部"},{status:1,text:"已审核"},{status:2,text:"待审核"}],contentHeader:null,SellerName:"",productName:"",typeList:[],tableData:[],rejectDialog:!1,rejectReason:"",rejectValue:"",rejectList:[],approveDialog:!1,id:"",currentPage:1,pageSize:25,total:0}},methods:{getAuditList:function(){var t=this,e={page:this.currentPage,size:this.pageSize};this.contentHeader&&(e.folder_id=this.contentHeader),this.SellerName&&(e.nickname=this.SellerName),this.productName&&(e.title=this.productName),this.headerSelect&&(e.pass_status=this.headerSelect),this.headerAuditSelect&&(e.review_status=this.headerAuditSelect),this.HttpClient.post("/admin/marketGoods/lists",e).then(function(e){console.log(e),200===e.data.code&&(t.tableData=e.data.data.data,t.total=e.data.data.total)})},getTypeList:function(){var t=this;return l()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.HttpClient.post("/admin/menu/getList",{menu_type:2,type:0,goods:!0}).then(function(e){console.log(e),200===e.data.code&&(t.typeList=s()(e.data.data))});case 2:case"end":return e.stop()}},e,t)}))()},changeStatus:function(t){var e=this,a={id:this.id,status:t};4===t&&(a.refuse=this.rejectReason,a.review_id=this.rejectValue,this.rejectList.map(function(t){t.review_id===e.rejectValue&&(a.review_name=t.name)})),this.HttpClient.post("/admin/marketGoods/changeStatus",a).then(function(a){console.log(a),200===a.data.code?(e.$message.success(a.data.msg),setTimeout(function(){e.getAuditList()},500),1===t?e.approveDialog=!1:4===t&&(e.rejectDialog=!1)):e.$message.error(a.data.msg)})},approveButton:function(t){this.id=t,this.approveDialog=!0},rejectButton:function(t){var e=this;this.id=t,this.rejectDialog=!0,this.HttpClient.post("/admin/webReview/getList",{type:"business"}).then(function(t){200===t.data.code&&(e.rejectList=t.data.data)})},updateButton:function(t){this.$router.push({path:"/index/market/marketProduct/product-modify",query:{id:t}})},previewButton:function(t){this.$router.push({path:"/index/market/marketProduct/product-preview",query:{id:t}})},deleteButton:function(t,e){this.id=t,this.$refs.delete.deleteDialog=!0},approveConfirm:function(){this.changeStatus(1)},rejectConfirm:function(){this.changeStatus(4)},deleteConfirm:function(t){t&&this.changeStatus(0)},currentChange:function(t){this.currentPage=t,this.getAuditList()},renderProductStatus:function(t,e){var a=this;e.column;return t("el-select",{props:{value:"通过状态",placeholder:"通过状态"},on:{input:function(t){console.log(t),a.headerSelect=t,a.getAuditList()}}},[this.headerOptions.map(function(e){return t("el-option",{props:{value:e.status,label:e.text}})})])},renderProductAuditStatus:function(t,e){var a=this;e.column;return t("el-select",{props:{value:"审核状态",placeholder:"审核状态"},on:{input:function(t){console.log(t),a.headerAuditSelect=t,a.getAuditList()}}},[this.headerAuditOptions.map(function(e){return t("el-option",{props:{value:e.status,label:e.text}})})])}},created:function(){var t=this;return l()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getTypeList();case 2:t.getAuditList();case 3:case"end":return e.stop()}},e,t)}))()}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"productReview"},[a("BreadCrumb",{staticClass:"bread",attrs:{breadData:t.breadData}}),t._v(" "),a("div",{staticClass:"productReview_main"},[t._m(0),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content_header"},[a("el-radio-group",{on:{change:t.getAuditList},model:{value:t.contentHeader,callback:function(e){t.contentHeader=e},expression:"contentHeader"}},[a("el-radio",{attrs:{border:"",label:null}},[t._v("全部板块")]),t._v(" "),t._l(t.typeList,function(e){return a("el-radio",{key:e.id,attrs:{border:"",label:e.menu_id}},[t._v(t._s(e.name))])})],2)],1),t._v(" "),a("div",{staticClass:"content_main"},[a("div",{staticClass:"content_search"},[a("div",{staticClass:"encyclopedia_search"},[a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"卖家名称搜索",clearable:""},on:{clear:t.getAuditList},nativeOn:{keyup:function(e){return"button"in e||13===e.keyCode?t.getAuditList(e):null}},model:{value:t.SellerName,callback:function(e){t.SellerName=e},expression:"SellerName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getAuditList},slot:"append"})],1)],1),t._v(" "),a("div",[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"商品名称搜索",clearable:""},on:{clear:t.getAuditList},nativeOn:{keyup:function(e){return"button"in e||13===e.keyCode?t.getAuditList(e):null}},model:{value:t.productName,callback:function(e){t.productName=e},expression:"productName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getAuditList},slot:"append"})],1)],1)])]),t._v(" "),a("div",{staticClass:"content_table"},[a("el-table",{attrs:{data:t.tableData,border:!0}},[a("el-table-column",{attrs:{label:"淘货ID",align:"center",width:"90",prop:"id","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"商品名称",align:"center",width:"150","show-overflow-tooltip":"",prop:"title"}}),t._v(" "),a("el-table-column",{attrs:{label:"卖家昵称",align:"center",width:"180","show-overflow-tooltip":"",prop:"nickname"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.nickname?a("span",[t._v(t._s(e.row.nickname))]):a("span",{staticClass:"sortout_color"},[t._v("暂无")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"板块类型",align:"center",width:"100","show-overflow-tooltip":"",prop:"category_name"}}),t._v(" "),a("el-table-column",{attrs:{label:"城市",align:"center",width:"100","show-overflow-tooltip":"",prop:"city_name"}}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间",align:"center",width:"180",prop:"created_at","show-overflow-tooltip":"",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"通过状态",align:"center",width:"120","show-overflow-tooltip":"","render-header":t.renderProductStatus},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.status?a("span",{staticClass:"normal_color"},[t._v("已通过")]):a("span",{staticClass:"notpass_color"},[t._v("未通过")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"审核状态",align:"center",width:"120","show-overflow-tooltip":"","render-header":t.renderProductAuditStatus},scopedSlots:t._u([{key:"default",fn:function(e){return[3===e.row.status?a("span",{staticClass:"audit_color"},[t._v("待审核")]):a("span",{staticClass:"normal_color"},[t._v("已审核")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right","min-width":"400",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[3===e.row.status||4===e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.approveButton(e.row.id)}}},[t._v("批准")]):t._e(),t._v(" "),3===e.row.status||1===e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.rejectButton(e.row.id)}}},[t._v("驳回")]):t._e(),t._v(" "),4===e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.updateButton(e.row.id)}}},[t._v("修改")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.previewButton(e.row.id)}}},[t._v("预览")]),t._v(" "),t.Tools.getDateDiff(e.row.created_at)>10||4===e.row.status?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){t.deleteButton(e.row.id)}}},[t._v("删除")]):t._e()]}}])})],1),t._v(" "),t.total?a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"page-size":t.pageSize},on:{"current-change":t.currentChange}}):t._e()],1)])])]),t._v(" "),a("el-dialog",{attrs:{visible:t.approveDialog,width:"400px","custom-class":"approveDialog"},on:{"update:visible":function(e){t.approveDialog=e}}},[a("span",{staticClass:"approveDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-icon-test"}),t._v("批准")]),t._v(" "),a("div",{staticClass:"approveDialog_main"},[a("div",{staticClass:"main_content"},[a("i",{staticClass:"iconfont icon-warning-circle"}),t._v(" "),a("div",[t._v("确定批准吗？")])])]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.approveDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.approveConfirm}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{width:"470px","custom-class":"disableDialog",visible:t.rejectDialog},on:{"update:visible":function(e){t.rejectDialog=e}}},[a("span",{staticClass:"disableDialog_title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont icon-jinyong"}),t._v("驳回")]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("理由：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-input",{attrs:{type:"textarea",resize:"none",rows:4},model:{value:t.rejectReason,callback:function(e){t.rejectReason=e},expression:"rejectReason"}})],1)]),t._v(" "),a("div",{staticClass:"disable_dialog_box"},[a("div",{staticClass:"disable_dialog_left"},[t._v("类别：")]),t._v(" "),a("div",{staticClass:"disable_dialog_right"},[a("el-radio-group",{model:{value:t.rejectValue,callback:function(e){t.rejectValue=e},expression:"rejectValue"}},t._l(t.rejectList,function(e){return a("el-radio",{key:e.id,attrs:{border:"",label:e.review_id}},[t._v(t._s(e.name))])}))],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.rejectDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.rejectConfirm}},[t._v("确 定")])],1)]),t._v(" "),a("delete-modal",{ref:"delete",on:{doDelete:t.deleteConfirm}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("淘货商品审核")])])}]};var v=a("VU/8")(d,p,!1,function(t){a("66nE")},null,null);e.default=v.exports}});