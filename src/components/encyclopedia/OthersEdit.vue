<template>
    <div class="othersEdit">
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="othersEdit_main">
            <!--标题-->
            <div class="title">
                <p>他人编辑</p>
            </div>

            <div class="othersEdit_content">

                <div class="survey_header">
                    <div class="survey_select">
                        <div class="date_item">
                            <p class="date_label">开始</p>
                            <el-date-picker
                                    v-model="startTime"
                                    class="date_picker_1"
                                    type="date"
                                    size="mini"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期"
                                    @change="getOthersList">
                            </el-date-picker>
                        </div>
                        <div class="date_item">
                            <p class="date_label">截止</p>
                            <el-date-picker
                                    v-model="endTime"
                                    class="date_picker_1"
                                    type="date"
                                    size="mini"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期"
                                    @change="getOthersList">
                            </el-date-picker>
                        </div>
                    </div>

                    <div class="survey_search">
                        <div>
                            <el-input placeholder="用户名搜索" clearable v-model="userNameSearch" class="input-with-select" @keyup.13.native="getOthersList" @clear="getOthersList">
                                <el-button slot="append" icon="el-icon-search" @click="getOthersList"></el-button>
                            </el-input>
                        </div>
                        <div>
                            <el-input placeholder="昵称搜索" clearable v-model="nickNameSearch" class="input-with-select" @keyup.13.native="getOthersList" @clear="getOthersList">
                                <el-button slot="append" icon="el-icon-search" @click="getOthersList"></el-button>
                            </el-input>
                        </div>
                    </div>
                </div>

                <div class="survey_content_box">

                    <el-table
                            :data="tableData"
                            :border="true">
                        <el-table-column
                                label="ID"
                                align="center"
                                width="80"
                                prop="id"
                                sortable>
                        </el-table-column>

                        <el-table-column
                                label="百科标题"
                                align="center"
                                show-overflow-tooltip
                                width="200"
                                prop="title">
                        </el-table-column>

                        <el-table-column
                                label="昵称"
                                align="center"
                                width="140"
                                show-overflow-tooltip
                                prop="nickname">
                        </el-table-column>

                        <el-table-column
                                label="用户名"
                                align="center"
                                show-overflow-tooltip
                                width="140"
                                prop="username">
                        </el-table-column>

                        <el-table-column
                                label="所属板块"
                                align="center"
                                show-overflow-tooltip
                                :render-header="renderEncyclopediaCategory"
                                width="120"
                                prop="category.folder_name">
                        </el-table-column>

                        <el-table-column
                                label="用户类别"
                                show-overflow-tooltip
                                align="center"
                                :render-header="renderEncyclopediaType"
                                width="120"
                                prop="user_type">
                            <template slot-scope="scope">
                                {{scope.row.user_type===1?'个人用户':scope.row.user_type===2?'专业商家':'普通商家'}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="创建时间"
                                align="center"
                                show-overflow-tooltip
                                width="110"
                                prop="created_at"
                                sortable>
                        </el-table-column>

                        <el-table-column
                                label="通过状态"
                                align="center"
                                show-overflow-tooltip
                                :render-header="renderEncyclopediaStatus"
                                width="120">
                            <template slot-scope="scope">
                                {{(scope.row.status===2 || scope.row.status===3)?'未通过':'已通过'}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="审核状态"
                                align="center"
                                show-overflow-tooltip
                                :render-header="renderEncyclopediaAuditStatus"
                                width="120"
                                prop="status">
                            <template slot-scope="scope">
                                {{scope.row.status===2?'待审核':'已审核'}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="操作"
                                align="center"
                                class-name="survey_scope">
                            <template slot-scope="scope">
                                <div class="survey_btm">
                                    <el-button @click="rejectButton(scope.row.encyclopedia_id)">驳回</el-button>
                                    <el-button @click="agreeButton(scope.row.encyclopedia_id)">批准</el-button>
                                    <el-button @click="deleteButton(scope.row.encyclopedia_id)">删除</el-button>
                                    <el-button @click="previewButton(scope.row.encyclopedia_id)">预览</el-button>
                                    <el-button @click="currentButton(scope.row.source_int_id)">当前百科</el-button>
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
                    <el-radio border v-model="rejectValue" :label="item.review_id" v-for="item in rejectList" :key="item.id">{{item.name}}</el-radio>
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
          <el-button type="primary" @click="agreeConfirm">确 定</el-button>
        </span>
        </el-dialog>

        <!--删除弹窗-->
        <DeleteModal ref="delete"></DeleteModal>

        <!--预览弹窗-->
        <el-dialog
                width="800px"
                custom-class="viewDialog"
                :visible.sync="viewDialog">
            <span slot="title" class="viewDialog_title"><i class="iconfont icon-chakan"></i>预览</span>
            <div class="view_dialog_box">
                <div class="encyclopediaData_content">
                    <div class="encyclopedia_content_item">
                        <div class="encyclopedia_title">标题</div>
                        <div class="encyclopedia_body">
                            <div class="encyclopedia_content">{{previewData.title}}</div>
                        </div>
                    </div>
                    <div class="encyclopedia_content_item">
                        <div class="encyclopedia_title">封面图片</div>
                        <div class="encyclopedia_body">
                            <div class="encyclopedia_content">
                                <!-- <img
                                    v-if="previewData.cover"
                                    :src="(previewData.cover.indexOf('http')!==-1?
                                previewData.cover+'?':
                                Tools.handleImg(previewData.cover)+(previewData.cover.indexOf('mp4')!==-1?'|':'?'))+
                                'imageView2/1/w/100/h/100'" alt=""> -->
                                <img v-if="previewData.cover" :src="previewData.cover" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="encyclopedia_content_item encyclopedia_content_items">
                        <div class="encyclopedia_title">简介</div>
                        <div class="encyclopedia_body">
                            <div class="encyclopedia_textarea">
                                <div class="encyclopedia_content">{{previewData.content?previewData.content:'无'}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="encyclopedia_content_item">
                        <div class="encyclopedia_title">一级目录</div>
                        <div class="encyclopedia_body">
                            <div class="encyclopedia_first_catalogue" v-for="(item,index) in firstCatalogue" :key="item.id">
                                <div class="encyclopedia_catalogue" :class="{'is_active':index===firstIndex}" @click="firstClick(item.id,index)">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="encyclopedia_content_item">
                        <div class="encyclopedia_title">一级目录内容</div>
                        <div class="encyclopedia_body">
                            <div class="encyclopedia_content" v-html="firstCatalogue?firstCatalogue[firstIndex].content:''"></div>
                        </div>
                    </div>
                    <div class="encyclopedia_content_item">
                        <div class="encyclopedia_title">二级目录</div>
                        <div class="encyclopedia_body">
                            <div class="encyclopedia_first_catalogue" v-for="(item,index) in secondCatalogue" :key="item.id">
                                <div class="encyclopedia_catalogue" :class="{'is_active':index===secondIndex}" @click="secondClick(index)">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="encyclopedia_content_item">
                        <div class="encyclopedia_title">二级目录内容</div>
                        <div class="encyclopedia_body">
                            <div class="encyclopedia_content" v-html="secondCatalogue?secondCatalogue[secondIndex].content:''"></div>
                        </div>
                    </div>
                    <div class="encyclopedia_content_item">
                        <div class="encyclopedia_title">标签</div>
                        <div class="encyclopedia_body">
                            <div class="encyclopedia_first_catalogue" v-for="item in previewData.label" :key="item.id">
                                <div class="encyclopedia_catalogue">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="encyclopedia_content_item">
                        <div class="encyclopedia_title">文献</div>
                        <div class="encyclopedia_body">
                            <div class="encyclopedia_first_catalogue" v-for="(item,index) in previewData.source" :key="item.source_id">
                                <div class="encyclopedia_catalogue" :class="{'is_active':index===sourceIndex}" @click="sourceClick(index)">
                                    {{item.source_name}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="encyclopedia_content_item">
                        <div class="encyclopedia_title">对应链接</div>
                        <div class="encyclopedia_body">
                            <div class="encyclopedia_content">{{previewData.source?previewData.source[sourceIndex].link:''}}</div>
                        </div>
                    </div>
                    <div class="encyclopedia_content_item">
                        <div class="encyclopedia_title">附件</div>
                        <div class="encyclopedia_body">
                            <div class="encyclopedia_content">
                                <p
                                        class="encyclopedia_attachment"
                                        v-for="(item,index) in previewData.attachment" :key="index"
                                        @click="previewPic(item.path,item.name)">
                                    <i class="iconfont icon-wenjian"></i>
                                    {{item.name}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <el-dialog
                        width="30%"
                        :visible.sync="viewDialogChildren"
                        append-to-body>
                    <div class="view_upload_bigImg">
                        <img :src="imageUrl" alt="">
                    </div>
                </el-dialog>

            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="viewDialog=false">关闭</el-button>
        </span>
        </el-dialog>

    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';
    import DeleteModal from '@/components/public/modalDelete'

    export default {
        name: "OthersEdit",
        components: {
            BreadCrumb,
            DeleteModal
        },
        data() {
            return {
                breadData: [{
                    id: 1,
                    name: '百科',
                    urls: '/index/encyclopedia/encyclopedia',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '他人编辑',
                    urls: '/index/encyclopedia/othersEdit',
                    icon: 'icon-home'
                }],

                startTime: '',  //开始时间
                endTime: '',  //结束时间
                userNameSearch: '', //用户名
                nickNameSearch: '',  //昵称搜索

                // 表格
                tableData: [],
                headerSelect:'',// 百科通过状态选择值
                headerOptions:[
                    {status:'',text:'全部'},
                    {status:0,text:'未通过'},
                    {status:1,text:'已通过'},
                ],// 百科通过状态选择列
                headerAuditSelect:'',// 百科审核状态选择值
                headerAuditOptions:[
                    {status:'',text:'全部'},
                    {status:0,text:'待审核'},
                    {status:1,text:'已审核'},
                ],// 百科审核状态选择列
                headerTypeSelect:'',// 百科用户类别选择值
                headerTypeOptions:[
                    {status:0,text:'全部'},
                    {status:1,text:'个人用户'},
                    {status:2,text:'专业商家'},
                    {status:3,text:'普通商家'},
                ],// 百科用户类别选择列
                headerCategorySelect:'',// 百科所属板块选择值
                headerCategoryOptions:[],// 百科所属板块列表


                approveDialog: false,  // 批准弹窗

                disableDialog: false, // 驳回弹窗
                rejectList: [],// 驳回类别列表
                rejectReason: '',// 驳回理由
                rejectValue: '',// 驳回类别

                viewDialog: false,  // 预览弹窗
                viewDialogChildren: false, //子弹窗

                id:'',// 百科id
                previewData:{},// 预览百科数据
                firstCatalogue:[{}],// 一级目录
                secondCatalogue:[{}],// 二级目录
                firstId:'',// 一级目录选中id
                firstIndex:0,// 一级目录选中下标
                secondIndex:0,// 二级目录选中下标
                sourceIndex:0,// 文献选中下标
                imageUrl:'',//图片地址

                currentPage:1,// 当前页
                pageSize:25,// 每页显示数量
                total:0,// 总记录数

            }
        },

        methods: {

            /**数据相关**/
            //获取百科列表
            getOthersList() {
                let parameters={
                    page:this.currentPage,
                    size:this.pageSize
                };
                if(this.headerCategorySelect){// 所属板块
                    parameters.cate_id=this.headerCategorySelect
                }
                if(this.headerTypeSelect!==''){// 用户类别
                    parameters.user_type=this.headerTypeSelect
                }
                if(this.headerSelect!==''){// 通过状态
                    parameters.clear_status=this.headerSelect
                }
                if(this.headerAuditSelect!==''){// 审核状态
                    parameters.auditing_status=this.headerAuditSelect
                }
                if(this.startTime){// 开始时间
                    parameters.start_time=this.startTime
                }
                if(this.endTime){// 结束时间
                    parameters.end_time=this.endTime
                }
                if(this.userNameSearch){// 用户名
                    parameters.username=this.userNameSearch
                }
                if(this.nickNameSearch){// 昵称
                    parameters.nickname=this.nickNameSearch
                }
                this.HttpClient.post('/admin/encyclopedias/otherLists',parameters)
                    .then(res => {
                        console.log(res);
                        if (res.data.code === 200) {
                            this.tableData = res.data.data.data;
                            this.total=res.data.data.total;
                        }
                    })
            },
            //获取驳回类别列表
            getRejectList() {
                this.HttpClient.post('/admin/webReview/getList', {type: 'upload'})
                    .then(res => {
                        console.log(res);
                        if (res.data.code === 200) {
                            this.rejectList = res.data.data
                        }
                    })
            },
            //百科状态改变
            changeStatus(status) {
                let parameters={
                    encyclopedia_id:this.id,
                    status:status,
                };
                if(status===3){
                    parameters.refuse=this.rejectReason;
                    parameters.review_id=this.rejectValue;
                }
                this.HttpClient.post('/admin/encyclopedias/changeStatus', parameters)
                    .then(res => {
                        console.log(res);
                        if(res.data.code===200){
                            setTimeout(() => {
                                this.getOthersList();
                                this.$message.success(res.data.msg);
                            }, 500);
                            if(status===1){
                                this.approveDialog=false;
                            }else if(status===3){
                                this.disableDialog = false;
                                this.rejectValue='';
                                this.rejectReason='';
                            }
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            //查看百科信息
            checkInfo(id){
                this.HttpClient.post('/admin/encyclopedias/getInfo',{id})
                    .then(res=>{
                        console.log(res)
                        if(res.data.code===200){
                            this.previewData=res.data.data;
                            this.previewData.cover = this.Tools.handleImg(JSON.parse(this.previewData.cover)[0].path);
                            // console.log(this.previewData);
                            this.firstCatalogue=Object.values(this.previewData.menu);
                            this.secondCatalogue=this.firstCatalogue[0].child
                        }
                    })
            },
            //驳回按钮
            rejectButton(id) {
                this.id=id;
                this.getRejectList();
                this.disableDialog = true;
            },
            //批准按钮
            agreeButton(id){
                this.id=id;
                this.approveDialog=true;
            },
            //删除按钮
            deleteButton(id){
                this.id=id;
                this.$refs.delete.deleteDialog=true;
            },
            //预览按钮
            previewButton(id){
                this.viewDialog=true;
                this.checkInfo(id)
            },
            //当前百科按钮
            currentButton(id){
                this.viewDialog=true;
                this.checkInfo(id)
            },
            // 驳回框确认按钮
            rejectConfirm() {
                this.changeStatus(3)
            },
            //批准框确认按钮
            agreeConfirm(){
                this.changeStatus(1)
            },
            //确认删除
            deleteConfirm(bool){
                if(bool){
                    this.changeStatus(0)
                }
            },
            //一级目录点击事件
            firstClick(id,index){
                this.firstId=id;
                this.firstIndex=index;
                this.secondCatalogue=this.firstCatalogue[index].child
            },
            //二级目录点击事件
            secondClick(index){
                this.secondIndex=index;
            },
            //文献点击事件
            sourceClick(index){
                this.sourceIndex=index;
            },
            //预览图片
            previewPic(url,name){
                if(name.indexOf('jpg')!==-1 || name.indexOf('png')!==-1){
                    this.viewDialogChildren=true;
                    this.imageUrl=url.indexOf('http')!==-1?url:this.Tools.handleImg(url)
                }
            },

            //分页
            currentChange(p){
                this.currentPage=p;
                this.getOthersList()
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
                            this.getOthersList()
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
                            this.getOthersList()
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
                            this.getOthersList()
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
                            this.getOthersList()
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
            this.getOthersList()
        }

    }
</script>

<style lang="less">
    .othersEdit{
        text-align: left;
        .bread{
            margin: 10px;
        }
      .othersEdit_main::-webkit-scrollbar {display:none}
        .othersEdit_main {
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

            /*主体内容*/
            .othersEdit_content{
                box-sizing: border-box;
                padding: 0 40px 40px;

                /*头部*/
                .survey_header{
                    box-sizing: border-box;
                    padding-bottom:30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .survey_select{
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
                    .survey_search{
                        display: flex;
                        align-items: center;
                        >div{
                            margin-left: 30px;
                        }
                    }
                }

                /*表格*/
                .survey_content_box {
                    box-sizing: border-box;
                    .el-table {
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
                            }
                        }
                    }
                    .el-pagination{
                        text-align:center;
                    }

                    /*操作按钮*/
                    .survey_scope {
                        padding: 0;
                        .cell {
                            line-height: unset;
                            .survey_btm {
                                display: flex;
                                align-items: center;
                                .el-button:not(:last-child) {
                                    border-right: 1px solid #ebeef5;
                                }
                                .el-button {
                                    min-height: 47px;
                                    height: 100%;
                                    flex: 1;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    cursor: pointer;
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

    /*预览弹窗*/
    .viewDialog{
        .viewDialog_title{
            display: flex;
            border-bottom: 1px solid #e8e8e8;
            padding-bottom: 10px;
            i{
                margin-right: 10px;
                font-size: 20px;
                color: #15bafe;
            }
        }
        .el-dialog__body{
            padding-top: 0;
        }
        .view_dialog_box{
            text-align: left;
            .encyclopediaData_content {
                text-align: left;
                padding: 0 40px;
                height: 600px;
                overflow-y:scroll;
                .encyclopedia_content_item{
                    display:flex;
                    flex-wrap:wrap;
                    align-items:center;
                    justify-content: flex-start;
                    margin-bottom:15px;

                    .encyclopedia_title{
                        width:120px;
                        height:40px;
                        color:#fff;
                        line-height:40px;
                        text-align:center;
                        margin-right:10px;
                        background:#15bafe;
                        border-radius:3px;
                    }
                    .encyclopedia_body{
                        width:500px;
                        display:flex;
                        align-items:center;
                        justify-content:flex-start;

                        .encyclopedia_first_catalogue{
                            display:flex;
                            align-items:center;
                            justify-content:flex-start;
                            margin-right:10px;

                            .encyclopedia_catalogue{
                                width:100px;
                                height:40px;
                                line-height:40px;
                                text-align:center;
                                border:1px solid #ccc;
                                box-sizing:border-box;
                                border-radius:3px;
                                cursor:pointer
                            }
                            .encyclopedia_catalogue:hover{
                                color:#15bafe;
                                border-color:#15bafe;
                            }
                            .encyclopedia_catalogue:active{
                                color:#fff;
                                border-color:#15bafe;
                                background:#15bafe;
                            }
                            .encyclopedia_catalogue.is_active{
                                color:#fff;
                                border-color:#15bafe;
                                background:#15bafe;
                            }
                        }
                        .encyclopedia_content{
                            width:500px;
                            min-height:40px;
                            line-height:40px;
                            box-sizing:border-box;
                            border:1px solid #ccc;
                            border-radius:3px;
                            padding:10px;
                            >img{
                                width: 450px;
                                height: 250px;
                            }
                            .encyclopedia_attachment{
                                cursor:pointer;
                            }
                        }
                    }
                }
                .encyclopedia_content_items{
                    .encyclopedia_body{
                        width:100%;
                        margin-top:15px;

                        .encyclopedia_textarea{
                            width:610px;
                        }
                    }
                }
            }
        }
    }

    /*查看大图*/
    .view_upload_bigImg{
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        img{
            width: 100%;
        }
    }

</style>
