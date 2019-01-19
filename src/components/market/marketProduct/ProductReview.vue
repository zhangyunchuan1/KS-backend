<template>
    <div class="productReview">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="productReview_main">
            <!--标题-->
            <div class="title">
                <p>淘货商品审核</p>
            </div>

            <div class="content">
                <div class="content_header">
                    <el-radio-group v-model="contentHeader" @change="getAuditList">
                        <el-radio border :label="null">全部板块</el-radio>
                        <el-radio border :label="item.menu_id" v-for="item in typeList" :key="item.id">{{item.name}}</el-radio>
                    </el-radio-group>
                </div>

                <div class="content_main">
                    <div class="content_search">
                        <div class="encyclopedia_search">
                            <div>
                                <el-input
                                    placeholder="卖家名称搜索"
                                    v-model="SellerName"
                                    clearable
                                    class="input-with-select"
                                    @clear="getAuditList"
                                    @keyup.13.native="getAuditList">
                                    <el-button  slot="append" icon="el-icon-search" @click="getAuditList"></el-button>
                                </el-input>
                            </div>
                            <div>
                                <el-input
                                    placeholder="商品名称搜索"
                                    v-model="productName"
                                    clearable
                                    class="input-with-select"
                                    @clear="getAuditList"
                                    @keyup.13.native="getAuditList">
                                    <el-button  slot="append" icon="el-icon-search" @click="getAuditList"></el-button>
                                </el-input>
                            </div>
                        </div>
                    </div>

                    <div class="content_table">
                        <el-table
                                :data="tableData"
                                :border="true">
                            <el-table-column
                                    label="淘货ID"
                                    align="center"
                                    width="90"
                                    prop="id"
                                    show-overflow-tooltip
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="商品名称"
                                    align="center"
                                    width="150"
                                    show-overflow-tooltip
                                    prop="title">
                            </el-table-column>

                            <el-table-column
                                    label="卖家昵称"
                                    align="center"
                                    width="180"
                                    show-overflow-tooltip
                                    prop="nickname">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                                        <span v-else class="sortout_color">暂无</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="板块类型"
                                    align="center"
                                    width="100"
                                    show-overflow-tooltip
                                    prop="category_name">
                            </el-table-column>

                            <el-table-column
                                    label="城市"
                                    align="center"
                                    width="100"
                                    show-overflow-tooltip
                                    prop="city_name">
                            </el-table-column>

                            <el-table-column
                                    label="创建时间"
                                    align="center"
                                    width="180"
                                    prop="created_at"
                                    show-overflow-tooltip
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="通过状态"
                                    align="center"
                                    width="120"
                                    show-overflow-tooltip
                                    :render-header="renderProductStatus">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.status===1" class="normal_color">已通过</span>
                                        <span v-else class="notpass_color">未通过</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="审核状态"
                                    align="center"
                                    width="120"
                                    show-overflow-tooltip
                                    :render-header="renderProductAuditStatus">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.status===3" class="audit_color">待审核</span>
                                        <span v-else class="normal_color">已审核</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="操作"
                                    align="center"
                                    show-overflow-tooltip
                                    class-name="mallReview_scope">
                                <template slot-scope="scope">
                                    <div class="mallReview_btm">
                                        <el-button v-if="scope.row.status===3" @click="approveButton(scope.row.id)">批准</el-button>
                                        <el-button v-if="scope.row.status===3 || scope.row.status===1" @click="rejectButton(scope.row.id)">驳回</el-button>
                                        <el-button @click="updateButton(scope.row.id)">修改</el-button>
                                        <el-button @click="previewButton(scope.row.id)">预览</el-button>
                                        <el-button @click="deleteButton(scope.row.id)">删除</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                v-if="total"
                                layout="prev, pager, next"
                                :total="total"
                                :page-size="pageSize"
                                @current-change="currentChange"
                        ></el-pagination>
                    </div>

                </div>
            </div>
        </div>

        <!--确定批准弹窗-->
        <el-dialog
                :visible.sync="approveDialog"
                width="400px"
                custom-class="approveDialog">
            <span slot="title" class="approveDialog_title"><i class="iconfont icon-icon-test"></i>批准</span>
            <div class="approveDialog_main">
                <div class="main_content">
                    <i class="iconfont icon-warning-circle"></i>
                    <div>确定批准吗？</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="approveDialog = false">取 消</el-button>
        <el-button type="primary" @click="approveConfirm">确 定</el-button>
      </span>
        </el-dialog>

        <!--驳回弹窗-->
        <el-dialog
                width="470px"
                custom-class="disableDialog"
                :visible.sync="rejectDialog">
            <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>驳回</span>
            <div class="disable_dialog_box">
                <div class="disable_dialog_left">理由：</div>
                <div class="disable_dialog_right">
                    <el-input
                            v-model="rejectReason"
                            type="textarea"
                            resize="none"
                            :rows="4">
                    </el-input>
                </div>
            </div>
            <div class="disable_dialog_box">
                <div class="disable_dialog_left">类别：</div>
                <div class="disable_dialog_right">
                    <el-radio-group v-model="rejectValue">
                        <el-radio border :label="item.review_id" v-for="item in rejectList" :key="item.id">{{item.name}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="rejectDialog = false">取 消</el-button>
        <el-button type="primary" @click="rejectConfirm">确 定</el-button>
      </span>
        </el-dialog>

        <!--删除弹窗-->
        <delete-modal ref="delete" @doDelete="deleteConfirm"></delete-modal>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';
    import DeleteModal from '@/components/public/modalDelete';

    export default {
        name: "ProductReview",
        components: {
            BreadCrumb,
            DeleteModal
        },
        data(){
            return{
                // 面包屑
                breadData: [
                {
                    id: 1,
                    name: '淘货',
                    urls: '/index/market/Market',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '淘货商品',
                    urls: '/index/market/marketProduct/MarketProduct',
                    icon: 'icon-home'
                }, {
                    id: 3,
                    name: '淘货商品审核',
                    urls: '/index/market/marketProduct/ProductReview',
                    icon: 'icon-home'
                }
                ],

                headerSelect:'',// 商品通过状态选择值
                headerOptions:[
                    {status:0,text:'全部'},
                    {status:1,text:'通过'},
                    {status:2,text:'未通过'},
                ],// 商品通过状态选择列
                headerAuditSelect:'',// 商品审核状态选择值
                headerAuditOptions:[
                    {status:0,text:'全部'},
                    {status:1,text:'已审核'},
                    {status:2,text:'待审核'},
                ],// 商品审核状态选择列

                contentHeader: null,  // 默认值

                SellerName: '',
                productName: '',

                typeList:[],// 板块列表数据

                tableData:[],// 审核列表数据

                rejectDialog: false,  // 驳回弹窗
                rejectReason:'',// 驳回理由
                rejectValue:'',// 驳回类别
                rejectList:[],// 驳回类别列表

                approveDialog: false,  // 批准弹窗
                id:'',// 淘货id

                //分页
                currentPage:1,// 当前页
                pageSize:25,// 每页显示数量
                total:0,// 总记录数

            }
        },
        methods:{
            //获取审核列表
            getAuditList(){
                let parameters={
                    page:this.currentPage,
                    size:this.pageSize,
                };
                if(this.contentHeader){
                    parameters.folder_id=this.contentHeader
                }
                if(this.SellerName){
                    parameters.nickname=this.SellerName
                }
                if(this.productName){
                    parameters.title=this.productName
                }
                if(this.headerSelect){
                    parameters.pass_status=this.headerSelect
                }
                if(this.headerAuditSelect){
                    parameters.review_status=this.headerAuditSelect
                }
                this.HttpClient.post('/admin/marketGoods/lists',parameters)
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.tableData=res.data.data.data;
                            this.total=res.data.data.total;
                        }
                    })
            },
            //获取淘货板块列表
            async getTypeList(){
                await this.HttpClient.post('/admin/menu/getList',{menu_type:2,type:0,goods:true})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.typeList=Object.values(res.data.data);
                            // this.contentHeader=this.typeList[0].menu_id;
                        }
                    })
            },
            //改变淘货状态
            changeStatus(status){
                let parameters={
                    id:this.id,
                    status:status
                };
                if(status===4){
                    parameters.refuse=this.rejectReason;
                    parameters.review_id=this.rejectValue;
                    this.rejectList.map(item=>{
                        if(item.review_id===this.rejectValue){
                            parameters.review_name=item.name
                        }
                    })
                }
                this.HttpClient.post('/admin/marketGoods/changeStatus',parameters)
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            setTimeout(()=>{
                                this.getAuditList()
                            },500);
                            if(status===1){
                                this.approveDialog=false
                            }else if(status===4){
                                this.rejectDialog=false
                            }
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },

            /****操作****/
            //批准按钮
            approveButton(id){
                this.id=id;
                this.approveDialog=true
            },
            //驳回按钮
            rejectButton(id){
                this.id=id;
                this.rejectDialog=true;
                this.HttpClient.post('/admin/webReview/getList',{type:'business'})
                    .then(res=>{
                        if(res.data.code===200){
                            this.rejectList=res.data.data;
                        }
                    })
            },
            //修改按钮
            updateButton(id){
                this.$router.push({
                    path:'/index/market/marketProduct/product-modify',
                    query:{
                        id:id
                    }
                })
            },
            //预览按钮
            previewButton(id){
                this.$router.push({
                    path:'/index/market/marketProduct/product-preview',
                    query:{
                        id:id
                    }
                })
            },
            //删除按钮
            deleteButton(id){
                this.id=id;
                this.$refs.delete.deleteDialog=true;
            },
            //确认批准
            approveConfirm(){
                this.changeStatus(1)
            },
            //确认驳回
            rejectConfirm(){
                this.changeStatus(4)
            },
            //确认删除
            deleteConfirm(bool){
                if(bool){
                    this.changeStatus(0)
                }
            },

            //分页
            currentChange(p){
                this.currentPage=p;
                this.getAuditList()
            },

            /*******表头自定义筛选*******/
            //在渲染表头的时候，会调用此方法，h为createElement的缩写版  添加on.change事件即可
            //通过状态
            renderProductStatus(h, {column}) {
                return h('el-select',{
                    // 'v-model':this.headerSelect,
                    props:{
                        value:'通过状态',
                        placeholder:'通过状态',
                        // size:'mini'
                    },
                    on:{
                        input:value=>{
                            console.log(value);
                            this.headerSelect=value;
                            this.getAuditList()
                        }
                    }
                }, [
                    this.headerOptions.map(item=>{
                        return h('el-option',
                            {
                                props: {
                                    value: item.status,
                                    label: item.text
                                }
                            })
                    })

                ]);
            },
            //审核状态
            renderProductAuditStatus(h, {column}) {
                return h('el-select',{
                    // 'v-model':this.headerSelect,
                    props:{
                        value:'审核状态',
                        placeholder:'审核状态',
                        // size:'mini'
                    },
                    on:{
                        input:value=>{
                            console.log(value);
                            this.headerAuditSelect=value;
                            this.getAuditList()
                        }
                    }
                }, [
                    this.headerAuditOptions.map(item=>{
                        return h('el-option',
                            {
                                props: {
                                    value: item.status,
                                    label: item.text
                                }
                            })
                    })

                ]);
            },
        },
        async created(){
            await this.getTypeList();
            this.getAuditList()
        }
    }
</script>

<style lang="less">
    .productReview{
        text-align: left;
        .bread{
            margin: 10px;
        }
      .productReview_main::-webkit-scrollbar {display:none}
        .productReview_main {
            margin-left: 10px;
            margin-top: 10px;
            background: #fff;
            height: calc(100vh - 100px);
            width: calc(100vw - 240px);
            border-radius: 2px;
          overflow-y: auto;

            .title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 70px;
                border-bottom: 2px solid #f2f2f2;
                padding: 0 40px;
                font-size: 20px;
                color: #222;
            }

            .content{
                padding: 20px 40px;
                box-sizing: border-box;
                .content_header{
                    border-bottom: 1px solid #dedede;
                    padding-bottom: 20px;
                    margin-bottom: 10px;
                    .el-radio{
                        text-align: center;
                        padding: 0 20px;
                        height: 35px;
                        line-height: 35px;
                        border-radius: unset;
                        .el-radio__input{
                            display: none;
                        }
                        .el-radio__label{
                            padding: 0;
                        }
                    }
                    .el-radio.is-checked{
                        border-color: #15bafe;
                        background: #15bafe;
                        .el-radio__label{
                            color: #fff;
                        }
                    }
                }

                .content_main{
                    /*搜索框*/
                    .encyclopedia_search{
                        display: flex;
                        justify-content: flex-start;
                        margin: 20px 0;
                        >div{
                            margin-right: 30px;
                        }
                    }

                    /*表格*/
                    .content_table {
                        box-sizing: border-box;
                        .el-table--border::after,
                        .el-table--group::after,
                        .el-table::before{
                            background: unset;
                        }
                        .el-table {
                            border: none;
                            border-left: 1px solid #ebeef5;
                            thead {
                                color: #fff;
                                th, tr {
                                    background-color: #15bafe;

                                    .el-input--suffix .el-input__inner{
                                        color:#fff;
                                        font-weight:900;
                                        border:none;
                                        padding:0;
                                        background:#15bafe;
                                    }
                                    .el-input__inner::placeholder{
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__inner::-webkit-input-placeholder{
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__inner::-moz-placeholder{  //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__inner:-ms-input-placeholder{  //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
                                        color:#fff!important;
                                        font-weight:900!important;
                                    }
                                    .el-input__suffix{
                                        right:-2px;
                                        .el-select__caret{
                                            color:#fff;
                                        }
                                        .el-input__icon{
                                            width:14px;
                                        }
                                    }
                                    .el-select{
                                        position:relative;
                                        top:2px;
                                    }
                                }
                            }
                        }
                        .el-pagination{
                            text-align:center;
                        }

                        /*操作按钮*/
                        .mallReview_scope {
                            padding: 0;
                            .cell {
                                line-height: unset;
                                .mallReview_btm {
                                    display: flex;
                                    align-items: center;
                                    .el-button{
                                        border: none;
                                        background: transparent;
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    }

    /*驳回弹窗*/
    .disableDialog{
        .disableDialog_title{
            display: flex;
            border-bottom: 1px solid #e8e8e8;
            padding-bottom: 10px;
            i{
                margin-right: 10px;
            }
        }
        .disable_dialog_box:not(:last-child){
            margin-bottom: 20px;
        }
        .disable_dialog_box{
            display: flex;
            align-items: flex-start;
            justify-content: center;
            /*单选框*/
            .disable_dialog_right{
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                width: 275px;
                /*单选框样式*/
                .el-radio:nth-child(1){
                    margin-top: 0;
                }
                .el-radio.is-checked{
                    background: #15bafe;
                    border-color: #15bafe;
                    .el-radio__label{
                        color: #fff;
                    }
                }
                .el-radio{
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 40px;
                    width: 275px;
                    margin: 10px auto;
                    .el-radio__input{
                        display: none;
                    }
                    .el-radio__label{
                        padding: 0;
                    }
                }
            }
        }
    }

    /*确认批准确认弹窗*/
    .approveDialog{
        .approveDialog_title{
            display: flex;
            align-items: center;
            i{
                font-size: 24px;
                color: #15bafe;
                margin-right: 15px;
            }
        }
        .approveDialog_main{
            .main_content{
                box-sizing: border-box;
                text-align: center;
                i{
                    font-size: 80px;
                    color: #15bafe;
                }
                p{
                    font-size: 14px;
                    color: #000;
                    margin-top: 20px;
                }
            }
        }
    }

</style>
