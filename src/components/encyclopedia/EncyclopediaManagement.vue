<template>
    <div class="encyclopedia_management">
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

        <div class="encyclopedia_main">
            <div class="encyclopedia_title">
                <div class="title">百科管理</div>
            </div>

            <div class="encyclopedia_header">
                <div class="encyclopedia_select">
                    <div class="date_item">
                        <p class="date_label">开始</p>
                        <el-date-picker
                                v-model="startTime"
                                class="date_picker_1"
                                type="date"
                                size="mini"
                                clearable
                                placeholder="选择日期"
                                @change="getEncyclopediaList">
                        </el-date-picker>
                    </div>
                    <div class="date_item">
                        <p class="date_label">截止</p>
                        <el-date-picker
                                v-model="endTime"
                                class="date_picker_1"
                                type="date"
                                size="mini"
                                clearable
                                placeholder="选择日期"
                                @change="getEncyclopediaList">
                        </el-date-picker>
                    </div>
                </div>

                <div class="encyclopedia_search">
                    <div>
                        <el-input
                                placeholder="用户名搜索"
                                clearable
                                v-model="userNameSearch"
                                class="input-with-select"
                                @keyup.13.native="getEncyclopediaList"
                                @clear="getEncyclopediaList">
                            <el-button slot="append" icon="el-icon-search" @click="getEncyclopediaList"></el-button>
                        </el-input>
                    </div>
                    <div>
                        <el-input
                                placeholder="昵称搜索"
                                clearable
                                v-model="nickNameSearch"
                                class="input-with-select"
                                @keyup.13.native="getEncyclopediaList"
                                @clear="getEncyclopediaList">
                            <el-button slot="append" icon="el-icon-search" @click="getEncyclopediaList"></el-button>
                        </el-input>
                    </div>
                </div>
            </div>

            <div class="encyclopedia_content">

                <el-table
                        :data="tableData"
                        :border="true"
                        style="width: 100%">
                    <el-table-column
                            label="ID"
                            align="center"
                            width="80"
                            prop="id"
                            show-overflow-tooltip
                            sortable>
                    </el-table-column>
                    <el-table-column
                            label="百科题目"
                            align="center"
                            width="180"
                            show-overflow-tooltip
                            prop="title">
                    </el-table-column>

                    <el-table-column
                            label="昵称"
                            align="center"
                            width="130"
                            show-overflow-tooltip
                            prop="nickname">
                    </el-table-column>

                    <el-table-column
                            label="用户名"
                            align="center"
                            width="120"
                            show-overflow-tooltip
                            prop="username">
                    </el-table-column>

                    <el-table-column
                            label="字数"
                            align="center"
                            width="100"
                            show-overflow-tooltip
                            prop="word_num">
                    </el-table-column>

                    <el-table-column
                            label="所属板块"
                            align="center"
                            show-overflow-tooltip
                            :render-header="renderEncyclopediaCategory"
                            width="125"
                            prop="category.folder_name">
                    </el-table-column>
                    
                    <el-table-column
                            label="子目录"
                            align="center"
                            width="125"
                            show-overflow-tooltip
                            prop="category.menu_1_name">
                    </el-table-column>

                    <el-table-column
                            label="用户类别"
                            align="center"
                            show-overflow-tooltip
                            :render-header="renderEncyclopediaType"
                            prop="user_type"
                            width="125">
                        <template slot-scope="scope">
                            {{scope.row.user_type===1?'个人用户':scope.row.user_type===2?'专业商家':'普通商家'}}
                        </template>
                    </el-table-column>


                    <el-table-column
                            label="发布时间"
                            align="center"
                            show-overflow-tooltip
                            width="160"
                            prop="created_at"
                            sortable>
                    </el-table-column>

                    <el-table-column
                            label="通过状态"
                            align="center"
                            show-overflow-tooltip
                            :render-header="renderEncyclopediaStatus"
                            width="125">
                        <template slot-scope="scope">
                            <p>
                                <i class="iconfont icon-dian"></i>
                                {{scope.row.status===3||scope.row.status===2?'未通过':'已通过'}}
                            </p>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="审核状态"
                            align="center"
                            show-overflow-tooltip
                            :render-header="renderEncyclopediaAuditStatus"
                            width="125">
                        <template slot-scope="scope">
                            <p>
                                <i class="iconfont icon-dian"></i>
                                {{scope.row.status===2?'待审核':'已审核'}}
                            </p>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            align="center"
                            class-name="encyclopedia_scope">
                        <template slot-scope="scope">
                            <div class="encyclopedia_btm">
                                <div v-if="scope.row.status!==3" @click="rejectButton(scope.row.encyclopedia_id)">驳回</div>
                                <div v-if="scope.row.status===2 || scope.row.status===3" @click="agreeButton(scope.row.encyclopedia_id)">批准</div>
                                <div @click="modifyButton(scope.row.id,scope.row.encyclopedia_id)">修改</div>
                                <div @click="deleteButton(scope.row.encyclopedia_id)">删除</div>
                                <router-link :to="'http://frontend.kslab.com/home/baikeDetail?uid='+scope.row.encyclopedia_id">查看</router-link>
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

            <div class="bottom">
                <div>数量：{{total}}</div>
                <div>平均字数：{{averageWord}}</div>
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
                            type="textarea"
                            resize="none"
                            :rows="4"
                            v-model="rejectReason">
                    </el-input>
                </div>
            </div>
            <div class="disable_dialog_box">
                <div class="disable_dialog_left">类别：</div>
                <div class="disable_dialog_right">
                    <el-radio border v-model="rejectValue" :label="item.review_id" v-for="item in rejectList" :key="item.review_id">{{item.name}}</el-radio>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialog = false">取 消</el-button>
        <el-button type="primary" @click="disableBtm">确 定</el-button>
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
          <el-button type="primary" @click="approveBtm">确 定</el-button>
        </span>
        </el-dialog>

        <!--删除弹窗-->
        <DeleteModal ref="delete" @doDelete="confirmDelete"></DeleteModal>

    </div>
</template>

<script>

    import BreadCrumb from '@/components/public/BreadCrumb';
    import DeleteModal from '@/components/public/modalDelete'

    export default {
        name: "EncyclopediaManagement",
        components: {
            BreadCrumb,
            DeleteModal
        },
        data(){
            return {
                // 面包屑
                breadData: [{
                    id: 1,
                    name: '百科',
                    urls: '/index/encyclopedia/encyclopedia',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '百科管理',
                    urls: '/index/encyclopedia/encyclopediaManagement',
                    icon: 'icon-home'
                }],
                headerSelect:'',// 百科状态选择值
                headerOptions:[
                    {status:0,text:'全部'},
                    {status:1,text:'通过'},
                    {status:2,text:'未通过'},
                ],// 百科状态选择列
                headerTypeSelect:'',// 百科用户类别选择值
                headerTypeOptions:[
                    {status:0,text:'全部'},
                    {status:1,text:'个人用户'},
                    {status:2,text:'专业商家'},
                    {status:3,text:'普通商家'},
                ],// 百科用户类别选择列
                headerAuditSelect:'',// 商品审核状态选择值
                headerAuditOptions:[
                    {status:0,text:'全部'},
                    {status:1,text:'已审核'},
                    {status:2,text:'待审核'},
                ],// 商品审核状态选择列
                headerCategorySelect:'',// 百科所属板块选择值
                headerCategoryOptions:[],// 百科所属板块列表

                startTime:'',  // 开始时间
                endTime:'',  // 结束时间
                userNameSearch:'',  // 用户名搜索
                nickNameSearch:'',  // 昵称搜索

                // 表格
                tableData: [],
                rejectList:[],// 驳回类别列表
                id:'',// 百科id
                currentPage:1,// 当前页
                pageSize:25,// 每页显示数量
                total:0,// 总记录数


                approveDialog: false,  // 批准弹窗

                disableDialog: false, // 驳回弹窗
                textarea:'',
                rejectReason:'',// 驳回理由
                rejectValue: null,// 驳回类别
                averageWord:0,// 平均字数
            }
        },
        methods:{
            // 驳回按钮
            rejectButton(id){
                this.id=id;
                this.disableDialog = true;
                this.getRejectList()
            },
            // 批准按钮
            agreeButton(id){
                this.id=id;
                this.approveDialog = true;
            },
            //修改按钮
            modifyButton(id,aid){
                this.$router.push({
                    path:'/index/encyclopedia/encyclopedia-modify',
                    query:{
                        id:id,
                        aid:aid
                    }
                })
            },
            //删除按钮
            deleteButton(id){
                this.id=id;
                this.$refs.delete.deleteDialog=true
            },
            // 驳回框确认按钮
            disableBtm(){
                this.disableDialog = false;
                console.log(this.rejectValue);
                this.changeStatus(3)
            },
            // 批准框确认按钮
            approveBtm(){
                this.approveDialog = false;
                this.changeStatus(1)
            },
            //确认删除
            confirmDelete(bool){
                if(bool){
                    this.changeStatus(0)
                }
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            /*******表头自定义筛选*******/
            //在渲染表头的时候，会调用此方法，h为createElement的缩写版  添加on.change事件即可
            //通过状态
            renderEncyclopediaStatus(h, {column}) {
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
                            this.getEncyclopediaList()
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
            renderEncyclopediaAuditStatus(h, {column}) {
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
            //用户类别
            renderEncyclopediaType(h, {column}) {
                return h('el-select',{
                    // 'v-model':this.headerSelect,
                    props:{
                        value:'用户类别',
                        placeholder:'用户类别',
                    },
                    on:{
                        input:value=>{
                            console.log(value);
                            this.headerTypeSelect=value;
                            this.getEncyclopediaList()
                        }
                    }
                }, [
                    this.headerTypeOptions.map(item=>{
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
            //所属板块
            renderEncyclopediaCategory(h, {column}) {
                return h('el-select',{
                    // 'v-model':this.headerSelect,
                    props:{
                        value:'所属板块',
                        placeholder:'所属板块',
                    },
                    on:{
                        input:value=>{
                            console.log(value);
                            this.headerCategorySelect=value;
                            this.getEncyclopediaList()
                        }
                    }
                }, [
                    this.headerCategoryOptions.map(item=>{
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
            /**********************数据相关***********************/
            // 获取百科列表数据
            getEncyclopediaList(){
                let parameters={
                    page:this.currentPage,
                    size:this.pageSize
                };
                if(this.headerCategorySelect){
                    parameters.cate_id=this.headerCategorySelect
                }
                if(this.headerTypeSelect!==''){
                    parameters.user_type=this.headerTypeSelect
                }
                if(this.headerSelect!==''){// 通过状态
                    parameters.pass_status=this.headerSelect
                }
                if(this.headerAuditSelect!==''){// 审核状态
                    parameters.review_status=this.headerAuditSelect
                }
                if(this.userNameSearch){
                    parameters.username=this.userNameSearch
                }
                if(this.nickNameSearch){
                    parameters.nickname=this.nickNameSearch
                }
                if(this.startTime){
                    parameters.start_time=this.startTime
                }
                if(this.endTime){
                    parameters.end_time=this.endTime
                }
                this.HttpClient.post('/admin/encyclopedias/getList',parameters)
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.tableData=res.data.data.data;
                            this.total=res.data.data.total;
                            this.averageWord=0;
                            if(this.tableData.length>0){
                                this.tableData.map(item=>{
                                    this.averageWord+=Number(item.word_num)
                                })
                            }

                        }
                    })
            },
            //获取驳回类别列表
            getRejectList(){
                this.HttpClient.post('/admin/webReview/getList',{type:'upload'})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.rejectList=res.data.data
                        }
                    })
            },
            //百科状态改变
            changeStatus(status){
                let parameters={
                    encyclopedia_id:this.id,
                    status:status,
                };
                if(status===3){
                    parameters.refuse=this.rejectReason;
                    parameters.review_id=this.rejectValue;
                    this.rejectList.map(item=>{
                        if(item.review_id===this.rejectValue){
                            parameters.review_name=item.name
                        }
                    })
                }
                console.log(parameters);
                this.HttpClient.post('/admin/encyclopedias/changeStatus',parameters)
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            setTimeout(()=>{
                                this.getEncyclopediaList()
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            //分页
            currentChange(p){
                this.currentPage=p;
                this.getEncyclopediaList()
            }
        },
        async beforeCreate(){
            await this.HttpClient.post('/admin/menu/getList',{menu_type:2,type:0})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.headerCategoryOptions=Object.values(res.data.data);
                        this.headerCategoryOptions.unshift({name:'全部',menu_id:''})
                    }
                })
        },
        created(){
            this.getEncyclopediaList();
        }
    }
</script>

<style lang="less">
    .encyclopedia_management{
        .bread{
            margin: 10px;
        }
      .encyclopedia_main::-webkit-scrollbar {display:none}
        .encyclopedia_main {
            margin-left: 10px;
            margin-top: 10px;
            background: #fff;
            height: calc(100vh - 100px);
            width: calc(100vw - 240px);
            border-radius: 2px;
          overflow-y: auto;

            .encyclopedia_title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 70px;
                border-bottom: 2px solid #f2f2f2;
                padding: 0 40px;
                .title {
                    font-size: 20px;
                    color: #222;
                }
            }

            /*头部*/
            .encyclopedia_header{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 30px 25px;

                .encyclopedia_select{
                    display: flex;
                    .date_item{
                        display: flex;
                        border: 1px solid #dcdfe6;
                        border-radius: 5px;
                        margin-right: 20px;
                        .el-input__inner{
                            border: none !important;
                        }
                        .date_label{
                            color: #808080;
                            font-size: 12px;
                            height: 28px;
                            line-height: 28px;
                            margin-left: 10px;
                        }
                        .date_picker_1{
                            width: 140px;
                        }
                    }
                }


                /*搜索框*/
                .encyclopedia_search{
                    display: flex;
                    align-items: center;
                    >div{
                        margin-left: 30px;
                    }
                }
            }

            /*表格*/
            .encyclopedia_content{
                padding: 0 30px;
                .el-table{
                    thead{
                        color: #fff;
                        th,tr{
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

                /*操作按钮*/
                .encyclopedia_scope{
                    padding: 0;
                    .cell{
                        line-height: unset;
                        .encyclopedia_btm{
                            display: flex;
                            align-items: center;
                            div:not(:last-child){
                                border-right: 1px solid #ebeef5;
                            }
                            div,a{
                                min-height: 47px;
                                height: 100%;
                                flex: 1;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                cursor: pointer;
                            }
                            a{
                                color:#606266;
                                text-decoration:none;
                            }
                        }
                    }
                }
            }

            /*底部统计*/
            .bottom{
                display: flex;
                align-items: center;
                padding-left: 30px;
                margin: 20px 0;
                div{
                    background: #15bafe;
                    color: #fff;
                    padding: 10px 20px;
                    margin-right: 20px;
                    font-size: 14px;
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

    }
</style>
