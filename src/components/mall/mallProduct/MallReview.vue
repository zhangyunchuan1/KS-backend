<template>
    <div class="mallReview">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="mallReview_main">
            <!--标题-->
            <div class="title">
                <p>商品审核</p>
            </div>

            <div class="mallReview_select">
                <el-radio-group v-model="mallReviewSelect" @change="typeChange">
                    <el-radio border :label="item.menu_id" v-for="item in typeList" :key="item.id">{{item.name}}</el-radio>
                </el-radio-group>
            </div>

            <div class="mallReview_header">
                <div class="mallReview_search">
                    <div>
                        <el-input placeholder="商家名称" clearable v-model="merchantSearch" class="input-with-select" @change="getAuditList" @keyup.13.native="getAuditList">
                            <el-button slot="append" icon="el-icon-search" @click="getAuditList"></el-button>
                        </el-input>
                    </div>
                    <div>
                        <el-input placeholder="产品名称" clearable v-model="productSearch" class="input-with-select" @change="getAuditList" @keyup.13.native="getAuditList">
                            <el-button slot="append" icon="el-icon-search" @click="getAuditList"></el-button>
                        </el-input>
                    </div>
                </div>
            </div>

            <div class="mallReview_content_box">

                <el-table
                        :data="tableData"
                        :border="true"
                        style="width: 100%">
                    <el-table-column
                            label="ID"
                            align="center"
                            width="70"
                            prop="id"
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
                            label="一级目录"
                            align="center"
                            :render-header="renderProductFirst"
                            width="110"
                            show-overflow-tooltip
                            prop="menu_1_name">
                    </el-table-column>

                    <el-table-column
                            label="二级目录"
                            align="center"
                            :render-header="renderProductSecond"
                            width="110"
                            show-overflow-tooltip
                            prop="menu_2_name">
                    </el-table-column>

                    <el-table-column
                            label="三级目录"
                            align="center"
                            :render-header="renderProductThird"
                            width="110"
                            show-overflow-tooltip
                            prop="menu_3_name">
                    </el-table-column>

                    <el-table-column
                            label="产品类型"
                            align="center"
                            :render-header="renderProductCatalogue"
                            width="110"
                            show-overflow-tooltip
                            prop="category">
                    </el-table-column>

                    <el-table-column
                            label="商家名称"
                            align="center"
                            width="110"
                            show-overflow-tooltip
                            prop="nickname">
                    </el-table-column>

                    <el-table-column
                            label="创建时间"
                            align="center"
                            width="180"
                            class-name="created_at"
                            prop="created_at"
                            sortable>
                    </el-table-column>

                    <el-table-column
                            label="通过状态"
                            align="center"
                            :render-header="renderProductStatus"
                            show-overflow-tooltip
                            width="110">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status===1" style="color:#15bafe">已通过</span>
                            <span v-if="scope.row.status!==1" style="color:red">未通过</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="审核状态"
                            align="center"
                            :render-header="renderProductAuditStatus"
                            show-overflow-tooltip
                            width="110">
                        <template slot-scope="scope">
                            {{scope.row.status===3?'待审核':'已审核'}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            align="center"
                            fixed="right"
                            class-name="mallReview_scope">
                        <template slot-scope="scope">
                            <div class="mallReview_btm" style="color:#15bafe">
                                <el-button v-if="scope.row.status !== 3 && scope.row.status!==1" @click="updateButton(scope.row.product_id)">修改</el-button>
                                <el-button v-if="scope.row.status === 3" @click="approveButton(scope.row.product_id)">批准</el-button>
                                <el-button class="notpass_color" v-if="scope.row.status === 1||scope.row.status === 3" @click="rejectButton(scope.row.product_id)">驳回</el-button>
                                <el-button @click="previewButton(scope.row.product_id)">预览</el-button>
                                <el-button class="delete_color" v-if="scope.row.status !== 3 && scope.row.status!==1" @click="deleteButton(scope.row.product_id)">删除</el-button>
                                <el-button @click="adaptButton(scope.row)" v-if="scope.row.folder_name === '汽车1' || scope.row.folder_name === '摩托车'">适应车型</el-button>
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

        <!--驳回弹窗-->
        <el-dialog
                width="470px"
                custom-class="disableDialog"
                :visible.sync="disableDialog">
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
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="rejectConfirm">确 定</el-button>
      </span>
        </el-dialog>

        <!--批准弹窗-->
        <el-dialog
                :visible.sync="approveDialog"
                width="470px"
                custom-class="approveDialog">
            <span slot="title" class="approveDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div class="approveDialog_main">
                <i class="iconfont icon-warning-circle"></i>
                <div class="approveDialog_text">确认批准吗？</div>
            </div>
            <span slot="footer" class="dialog-footer">
          <el-button @click="approveDialog = false">取 消</el-button>
          <el-button type="primary" @click="approveConfirm">确 定</el-button>
        </span>
        </el-dialog>

        <!--适应弹窗-->
        <el-dialog
                :visible.sync="adaptDialog"
                width="400px"
                custom-class="adaptDialog">
            <span slot="title" class="adaptDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div class="adaptDialog_main">
                <i class="iconfont icon-icon-test"></i>
                <div class="adaptDialog_text">该商品适用于全部车型</div>
            </div>
        </el-dialog>

        <!--品牌弹窗-->
        <el-dialog
                :visible.sync="brandDialog"
                width="600px"
                custom-class="brandDialog">
            <span slot="title" class="brandDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div class="brandDialog_main">
                <div class="brand_item">
                    <div class="brand_item_title">品牌选择</div>
                    <div class="brand_item_list">
                        <el-radio-group v-model="brandSelect" size="mini" @change="getBrandList(brandSelect,1)">
                            <el-radio :label="item.brand_id" border v-for="item in brandList" :key="item.brand_id">{{item.name}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="brand_item" v-if="brandSelect">
                    <div class="brand_item_title">系列</div>
                    <div class="brand_item_list">
                        <el-radio-group v-model="seriesSelect" size="mini" @change="getBrandList(seriesSelect,2)">
                            <el-radio :label="item.series_id" border v-for="item in seriesList" :key="item.series_id">{{item.name}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="brand_item" v-if="seriesSelect">
                    <div class="brand_item_title">配置</div>
                    <div class="brand_item_list">
                        <el-radio-group v-model="configSelect" size="mini" @change="getBrandList(configSelect,3)">
                            <el-radio :label="item.config_id" border v-for="item in configList" :key="item.config_id">{{item.name}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="brand_item" v-if="configSelect">
                    <div class="brand_item_title">年限</div>
                    <div class="brand_item_list">
                        <el-checkbox-group v-model="yearSelect" size="mini">
                            <el-checkbox :label="item.id" border v-for="item in yearList" :key="item.id">{{item.year}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="brand_add_button">
                    <el-button size="mini" :disabled="!configSelect" @click="addBrand">添加</el-button>
                </div>
                <div class="brand_item">
                    <div class="brand_item_title">现有车系</div>
                    <div class="brand_table">
                        <el-table
                                :data="brandData"
                                :border="true"
                                size="mini"
                                style="width: 100%">
                            <el-table-column
                                    label="车辆ID"
                                    align="center"
                                    width="90"
                                    prop="id"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="品牌"
                                    align="center"
                                    width="90"
                                    prop="brand_name">
                            </el-table-column>

                            <el-table-column
                                    label="系列"
                                    align="center"
                                    width="90"
                                    prop="series_name">
                            </el-table-column>

                            <el-table-column
                                    label="配置"
                                    align="center"
                                    width="90"
                                    prop="config_name">
                            </el-table-column>

                            <el-table-column
                                    label="年限"
                                    align="center"
                                    width="90"
                                    prop="year">
                            </el-table-column>

                            <el-table-column
                                    label="操作"
                                    align="center"
                                    class-name="mallReview_scope">
                                <template slot-scope="scope">
                                    <div class="mallReview_btm">
                                        <el-button size="mini" @click="deleteBrand(scope.row.id)">删除</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                v-if="brandTotal"
                                layout="prev, pager, next"
                                :total="brandTotal"
                                :page-size="brandPageSize"
                                @current-change="brandCurrentChange"
                        ></el-pagination>
                    </div>
                </div>
            </div>
        </el-dialog>

        <!--删除弹窗-->
        <DeleteModal ref="delete" @doDelete="deleteConfirm"></DeleteModal>
        <DeleteModal ref="deleteBrand" @doDelete="deleteBrandConfirm"></DeleteModal>

    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';
    import DeleteModal from '@/components/public/modalDelete'

    export default {
        name: "MallReview",
        components: {
            BreadCrumb,
            DeleteModal
        },
        data(){
            return{
                breadData: [
                {
                    id: 1,
                    name: '商城',
                    urls: '/index/mall/mall/Mall',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '商城商品',
                    urls: '/index/mallProduct/MallProduct',
                    icon: 'icon-home'
                }, {
                    id: 3,
                    name: '商品审核',
                    urls: '/index/mallProduct/MallReview',
                    icon: 'icon-home'
                }
                ],

                mallReviewSelect: '', // 单选框组

                merchantSearch:'', //商家名称搜索
                productSearch:'',  //产品名称搜索

                typeList:[],// 板块列表

                // 表格
                tableData: [],
                firstCatalogue:[],// 一级目录列表
                secondCatalogue:[],// 二级目录列表
                thirdCatalogue:[],// 三级目录列表
                productCatalogue:[],// 产品类型列表
                firstCategorySelect:'',//一级目录选种值
                secondCategorySelect:'',//二级目录选种值
                thirdCategorySelect:'',//三级目录选种值
                productCategorySelect:'',//产品类型选种值
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

                disableDialog: false,  // 驳回弹窗
                rejectReason:'',// 驳回理由
                rejectValue:'',// 驳回类别
                rejectList:[],// 驳回类别列表

                approveDialog: false,  // 批准弹窗
                adaptDialog:false,// 适应弹窗
                brandDialog:false,// 品牌弹窗
                brandSelect:'',// 品牌选中项
                brandList:[],// 品牌列表
                seriesSelect:'',// 系列选中项
                seriesList:[],// 系列列表
                yearSelect:[],// 年限选中项
                yearList:[],// 年限列表
                configSelect:'',// 配置选中项
                configList:[],// 配置列表
                brandData:[],// 现有车系列表
                brandCurrentPage:1,// 车系当前页
                brandPageSize:10,// 车系每页显示数量
                brandTotal:0,// 车系总记录数

                productId:'',// 商品id
                brandId:'',// 现有品牌id

                currentPage:1,// 当前页
                pageSize:25,// 每页显示数量
                total:0,// 总记录数
            }
        },

        methods:{
            /****数据相关****/
            //获取审核列表
            getAuditList(){
                let parameters={
                    page:this.currentPage,
                    size:this.pageSize,
                    folder:this.mallReviewSelect
                };
                if(this.firstCategorySelect!=''){// 一级目录
                    parameters.menu_1=this.firstCategorySelect
                }
                if(this.secondCategorySelect!=''){// 二级目录
                    parameters.menu_2=this.secondCategorySelect
                }
                if(this.thirdCategorySelect!=''){// 三级目录
                    parameters.menu_3=this.thirdCategorySelect
                }
                if(this.productCategorySelect!=''){// 产品类型
                    parameters.id=this.productCategorySelect
                }
                if(this.headerSelect!==''){// 通过状态
                    parameters.pass_status=this.headerSelect
                }
                if(this.headerAuditSelect!==''){// 审核状态
                    parameters.review_status=this.headerAuditSelect
                }
                if(this.productSearch){
                    parameters.title=this.productSearch
                }
                // console.log(parameters);
                this.HttpClient.post('/admin/marketProduct/getListsWithShopMenu',parameters)
                    .then(res=>{
                        // console.log(res);
                        if(res.data.code===200){
                            this.tableData=res.data.data.data;
                            console.log(this.tableData)
                            this.total=res.data.data.total;
                        }
                    })
            },
            //获取商城板块列表
            async getTypeList(){
                await this.HttpClient.post('/admin/menu/getList',{menu_type:1,type:1})
                    .then(res=>{
                        // console.log(res);
                        if(res.data.code===200){
                            this.typeList=Object.values(res.data.data);
                            this.mallReviewSelect=this.typeList[0].menu_id;
                            this.firstCatalogue=this.typeList[0].child;
                            this.secondCatalogue=this.firstCatalogue[0].child;
                            this.thirdCatalogue=this.secondCatalogue[0].child;
                            // this.productCatalogue=this.thirdCatalogue[0].child;
                            // this.firstCatalogue.unshift({name:'全部',menu_id:''});
                            // this.secondCatalogue.unshift({name:'全部',menu_id:''});
                            // this.thirdCatalogue.unshift({name:'全部',menu_id:''});
                            this.getClassify(this.thirdCatalogue[1].menu_id);
                            // console.log(this.secondCatalogue);
                            console.log(this.thirdCatalogue);
                        }
                    })
            },
            //获取产品类型列表
            getClassify(id){
                this.HttpClient.post('/shop/menu/getOneChild',{isFolder:0,menu_id:0,last_menu:id})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.productCatalogue=res.data.data;
                        }
                    })
            },
            //获取品牌列表
            getBrandList(id,type){
                let parameters={};
                if(type===0){// 获取品牌
                    parameters.menu_id=id
                }else if(type===1){// 获取系列
                    parameters.brand_id=id;
                }else if(type===2){// 获取配置
                    parameters.series_id=id
                }else{// 获取年限
                    parameters.config_id=id
                }
                this.HttpClient.get('/brands',parameters)
                    .then(res=>{
                        // console.log(res);
                        let {code,data} = res.data;
                        if(code===200){
                            if(type===0){// 获取品牌
                               this.brandList=data
                            }else if(type===1){// 获取系列
                                this.seriesList=data
                            }else if(type===2){// 获取配置
                                this.configList=data
                            }else{// 获取年限
                                this.yearList=data
                            }
                        }
                    })
            },
            //获取已选品牌列表
            getBrandSelectedList(){
                this.HttpClient.post('/admin/product/relationIndex',{page:this.brandCurrentPage,size:this.brandPageSize,product_id:this.productId})
                    .then(res=>{
                        // console.log(res);
                        if(res.data.code===200){
                            this.brandData=res.data.data.data;
                            this.brandTotal=res.data.data.total
                        }
                    })
            },
            //板块改变事件
            typeChange(){
                this.typeList.map(item=>{
                    if(item.menu_id===this.mallReviewSelect){
                        if(item.child){//是否存在一级目录
                            this.firstCatalogue=item.child;
                            if(this.firstCatalogue[0] && this.firstCatalogue[0].child){//是否存在二级目录
                                this.secondCatalogue=this.firstCatalogue[0].child;
                                if(this.secondCatalogue[0] && this.secondCatalogue[0].child){//是否存在三级目录
                                    this.thirdCatalogue=this.secondCatalogue[0].child;
                                }else{
                                    this.thirdCatalogue=[];
                                }
                            }else{
                                this.secondCatalogue=[];
                                this.thirdCatalogue=[];
                            }

                        }else{
                            this.firstCatalogue=[];
                            this.secondCatalogue=[];
                            this.thirdCatalogue=[];
                        }
                    }
                });
                this.getAuditList();
            },
            //商品状态改变
            changeStatus(id,status){
                let parameters={
                    product_id:id,
                    status
                };
                if(status===2){
                    parameters.refuse=this.rejectReason;
                    parameters.review_id=this.rejectValue;
                    this.rejectList.map(item=>{
                        if(item.review_id===this.rejectValue){
                            parameters.review_name=item.name
                        }
                    })
                }
                this.HttpClient.post('/admin/marketProduct/changeStatus',parameters)
                    .then(res=>{
                        // console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            setTimeout(() => {
                                this.getAuditList();
                            }, 500);
                            if(status===1){
                                this.approveDialog=false;
                            }else if(status===2){
                                this.disableDialog=false;
                            }
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },

            /****操作****/
            //修改按钮
            updateButton(id){
                this.$router.push({
                    path:'/index/mall/mallProduct/product-modify',
                    query:{
                        id:id
                    }
                })
            },
            //批准按钮
            approveButton(id){
                this.productId=id;
                this.approveDialog=true;
            },
            //驳回按钮
            rejectButton(id){
                this.productId=id;
                this.disableDialog=true;
                this.HttpClient.post('/admin/webReview/getList',{type:'business'})
                    .then(res=>{
                        if(res.data.code===200){
                            this.rejectList=res.data.data;
                        }
                    })
            },
            //预览按钮
            previewButton(id){
                this.$router.push({
                    path:'/index/mall/mallProduct/product-preview',
                    query:{
                        id:id
                    }
                })
            },
            //删除按钮
            deleteButton(id){
                this.productId=id;
                this.$refs.delete.deleteDialog=true;
            },
            //适应车型按钮
            adaptButton(row){
                console.log(row)
                if(row.suit===2){
                    this.productId=row.product_id;
                    this.brandDialog=true;
                    this.getBrandList(row.menu[0].menu_id,0);
                    this.getBrandSelectedList()
                }else{
                    this.adaptDialog=true;
                }
            },
            //驳回框确认按钮
            rejectConfirm(){
                this.changeStatus(this.productId,2);
            },
            //批准框确认按钮
            approveConfirm(){
                this.changeStatus(this.productId,1);
            },
            //删除框确认按钮
            deleteConfirm(){
                this.changeStatus(this.productId,0);
            },
            //添加品牌按钮
            addBrand(){
                let parameters={
                    product_id:this.productId,
                    action:'add',
                };
                if(this.yearSelect && this.yearSelect.length>0){
                    parameters.id=this.yearSelect
                }else{
                    this.configList.map(item=>{
                        if(item.config_id===this.configSelect){
                            parameters.id=item.id
                        }
                    })
                }
                this.HttpClient.post('/admin/marketProduct/addOrDelCarType',parameters)
                    .then(res=>{
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            setTimeout(()=>{
                                this.getBrandSelectedList()
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            //删除品牌按钮
            deleteBrand(id){
                this.brandId=id;
                this.$refs.deleteBrand.deleteDialog=true;
            },
            //确认删除品牌
            deleteBrandConfirm(bool){
                if(bool){
                    this.HttpClient.post('/admin/marketProduct/addOrDelCarType',{product_id:this.productId,action:'del',id:this.brandId})
                        .then(res=>{
                            if(res.data.code===200){
                                this.$message.success(res.data.msg);
                                setTimeout(()=>{
                                    this.getBrandSelectedList()
                                },500)
                            }else{
                                this.$message.error(res.data.msg)
                            }
                        })
                }
            },

            //分页
            currentChange(p){
                this.currentPage=p;
                this.getAuditList()
            },
            brandCurrentChange(p){
                this.brandCurrentPage=p;
                this.getBrandSelectedList()
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
                            // console.log(value);
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
                            // console.log(value);
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
            //一级目录
            renderProductFirst(h, {column}) {
                // this.secondCategorySelect = '';
                // this.thirdCatalogue = '';
                return h('el-select',{
                    // 'v-model':this.headerSelect,
                    props:{
                        value:'一级目录',
                        placeholder:'一级目录',
                    },
                    on:{
                        input:value=>{
                            // console.log(value);
                            this.firstCategorySelect=value;
                            this.secondCategorySelect = '';
                            this.getAuditList()
                        }
                    }
                }, [
                    this.firstCatalogue.map(item=>{
                        return h('el-option',
                            {
                                props: {
                                    value: item.menu_id,
                                    label: item.name
                                }
                            })
                    })

                ]);
                
            },
            //二级目录
            renderProductSecond(h, {column}) {
                // console.log(this.secondCatalogue);
                // this.firstCategorySelect = '';
                // this.thirdCategorySelect = '';
                return h('el-select',{
                    // 'v-model':this.headerSelect,
                    props:{
                        value:'二级目录',
                        placeholder:'二级目录',
                    },
                    on:{
                        input:value=>{
                            // console.log(value);
                            this.secondCategorySelect=value;
                            this.firstCategorySelect = '';
                            this.thirdCategorySelect = '';
                            this.getAuditList()
                        }
                    }
                }, [
                    this.secondCatalogue.map(item=>{
                        return h('el-option',
                            {
                                props: {
                                    value: item.menu_id,
                                    label: item.name
                                }
                            })
                    })

                ]);
            },
            //三级目录
            renderProductThird(h, {column}) {
                // console.log(this.thirdCatalogue);
                // this.firstCategorySelect = '';
                // this.secondCategorySelect = '';
                return h('el-select',{
                    // 'v-model':this.headerSelect,
                    props:{
                        value:'三级目录',
                        placeholder:'三级目录',
                    },
                    on:{
                        input:value=>{
                            // console.log(value);
                            this.thirdCategorySelect=value;
                            this.firstCategorySelect = '';
                            this.secondCategorySelect = '';
                            this.getAuditList()
                        }
                    }
                }, [
                    this.thirdCatalogue.map(item=>{
                        return h('el-option',
                            {
                                props: {
                                    value: item.menu_id,
                                    label: item.name
                                }
                            })
                    })

                ]);
            },
            //产品类型
            renderProductCatalogue(h, {column}) {
                // console.log(this.productCatalogue)
                return h('el-select',{
                    // 'v-model':this.headerSelect,
                    props:{
                        value:'产品类型',
                        placeholder:'产品类型',
                    },
                    on:{
                        input:value=>{
                            // console.log(value);
                            this.productCategorySelect=value;
                            
                            this.getAuditList()
                        }
                    }
                }, [
                    this.productCatalogue.map(item=>{
                        return h('el-option',
                            {
                                props: {
                                    value: item.id,
                                    label: item.name
                                }
                            })
                    })

                ]);
            },
        },
        async created(){
            await this.getTypeList();
            this.getAuditList();
        },
        watch:{
            //一级目录
            firstCategorySelect(){
                this.firstCatalogue.map(item=>{
                    if(item.menu_id===this.firrstCategorySelect){
                        console.log(this.thirdCatalogue)
                        this.secondCatalogue=item.child;
                        this.thirdCatalogue=this.secondCatalogue?this.secondCatalogue[0].child:[];
                        this.getClassify(this.thirdCatalogue[0].menu_id)
                    }
                })
            },
            //二级目录
            secondCategorySelect(){
                this.secondCatalogue.map(item=>{
                    if(item.menu_id===this.secondCategorySelect){
                        console.log(this.thirdCatalogue)
                        this.thirdCatalogue=item.child;
                        this.getClassify(this.thirdCatalogue[0].menu_id)
                    }
                })
            },
            //三级目录
            thirdCategorySelect(){
                this.getClassify(this.thirdCategorySelect)
            }
        }
    }
</script>

<style lang="less">
    .mallReview{
        text-align: left;
        .bread{
            margin: 10px;
        }
      .mallReview_main::-webkit-scrollbar {display:none}
        .mallReview_main {
            background: white;
            margin: 10px 10px 0 10px;
            height: calc(100vh - 150px);
            width: calc(100vw - 240px);
            border-radius: 2px;
            padding-bottom: 50px;
          overflow-y: auto;

            /*标题*/
            .title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px 40px;
                margin-bottom: 30px;
                border-bottom: 1px solid #dedede;
            }

            /*单选框组*/
            .mallReview_select{
                padding-bottom: 20px;
                margin: 0 40px 20px 40px;
                border-bottom: 1px solid #dedede;
                .el-radio.is-checked{
                    background: #15bafe;
                    border: none;
                    .el-radio__label{
                        color: #fff;
                    }
                }
                .el-radio{
                    padding: 0 20px;
                    text-align: center;
                    line-height: 30px;
                    height: 30px;
                    border-radius: unset;
                    .el-radio__input{
                        display: none;
                    }
                    .el-radio__label{
                        padding: 0;
                    }
                }
            }


            /*头部*/
            .mallReview_header{
                box-sizing: border-box;
                padding: 0 40px 30px 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                /*搜索框*/
                .mallReview_search{
                    display: flex;
                    align-items: center;
                    >div{
                        margin-right: 30px;
                    }
                }
            }

            /*表格*/
            .mallReview_content_box {
                box-sizing: border-box;
                padding: 0 40px;
                .el-table {
                    thead {
                        // color: #fff;
                        th, tr {
                            // background-color: #15bafe;
                            .el-input--suffix .el-input__inner{
                                // color:#fff;
                                font-size:12px;
                                font-weight:900;
                                border:none;
                                padding:0;
                                // background:#15bafe;
                            }
                            .el-input__inner::placeholder{
                                font-size:12px!important;
                                // color:#000!important;
                                font-weight:900!important;
                            }
                            .el-input__inner::-webkit-input-placeholder{
                                font-size:12px!important;
                                color:#fff!important;
                                font-weight:900!important;
                            }
                            .el-input__inner::-moz-placeholder{  //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
                                font-size:12px!important;
                                color:#fff!important;
                                font-weight:900!important;
                            }
                            .el-input__inner:-ms-input-placeholder{  //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
                                font-size:12px!important;
                                color:#fff!important;
                                font-weight:900!important;
                            }
                            .el-input__suffix{
                                right:-1px;
                                // .el-select__caret{
                                //     color:#fff;
                                // }
                                .el-input__icon{
                                    width:14px;
                                }
                            }
                            .el-select{
                                position:relative;
                                padding-left: 8px;
                                top:2px;
                            }
                        }
                    }
                    tbody{
                        .created_at{
                            .cell{
                                padding:0 15px;
                            }
                        }

                    }
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
                                padding:12px 10px;
                            }
                        }
                    }
                }

                //分页
                .el-pagination{
                    text-align:center;
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

    /*批准弹窗*/
    .approveDialog{
        .approveDialog_title{
            display: flex;
            align-items: center;
            i{
                font-size: 24px;
                color: #15bafe;
            }
        }
        .approveDialog_main{
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

    /*适应弹窗*/
    .adaptDialog{
        .el-dialog__body{
            padding-top: 0;
            padding-bottom: 50px;
        }
        .adaptDialog_title{
            display: flex;
            align-items: center;
            i{
                font-size: 24px;
                color: #15bafe;
            }
        }
        .adaptDialog_main{
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

    /*品牌弹窗*/
    .brandDialog{
        .el-dialog__header{
            padding-bottom:0;
            margin-bottom:10px;
            border-bottom:1px solid #ccc;
        }
        .el-dialog__body{
            padding-top: 0;
            padding-bottom: 50px;
            overflow-y: auto;
            height: calc(100vh - 150px);
        }
        .brandDialog_title{
            display: flex;
            align-items: center;
            i{
                font-size: 24px;
                color: #15bafe;
            }
        }
        .brandDialog_main{
            text-align: left;

            .brand_item{
                display:flex;
                flex-wrap:wrap;
                justify-content:flex-start;
                align-items:center;
                margin-bottom:15px;

                .brand_item_title{
                    width:80px;
                    height:28px;
                    line-height:28px;
                    color:#fff;
                    text-align:center;
                    background:#15bafe;
                }
                .brand_item_list{
                    display:flex;
                    flex-wrap:wrap;
                    align-items:center;
                    justify-content:space-between;
                    width:100%;
                    min-height:100px;
                    margin-top:10px;
                    padding:10px 10px;
                    border:1px solid #ccc;

                    .el-radio-group{
                        .el-radio__input{
                            display:none;
                        }
                        .el-radio__label{
                            padding-left:0;
                        }
                    }
                    .el-checkbox-group{
                        .el-checkbox__input{
                            display:none;
                        }
                        .el-checkbox__label{
                            padding-left:0;
                        }
                    }
                }
                .brand_table{
                    width:100%;
                    margin-top:10px;

                    .el-pagination{
                        text-align:center;
                    }
                }
            }
            .brand_add_button{
                display:flex;
                justify-content:flex-end;
            }
        }
    }

</style>
