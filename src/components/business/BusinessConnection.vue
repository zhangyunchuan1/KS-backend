<template>
    <div class="business_connection">
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

        <div class="business_main">
            <div class="business_title">
                <div class="title">企业关系</div>
            </div>

            <!-- <div class="business_header">
                <div class="business_search">
                    <div>
                        <el-input placeholder="公司名称搜索" v-model="companySearch" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </div>
            </div> -->

            <div class="business_content">

                <el-table
                        :data="companyData"
                        :border="true"
                        style="width: 100%">
                    <el-table-column
                            label="ID"
                            align="center"
                            width="65"
                            prop="id"
                            sortable>
                    </el-table-column>
                    <!-- <el-table-column
                            label="公司名称"
                            align="center"
                            width="280">
                        <template slot-scope="scope">
                            <p>{{ scope.row.company_name}}</p>
                        </template>
                    </el-table-column> -->

                    <el-table-column
                            label="联系人"
                            align="center"
                            width="110">
                        <template slot-scope="scope">
                            <p>{{ scope.row.name}}</p>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="企业电话"
                            align="center"
                            prop="phone"
                            width="180">
                    </el-table-column>

                    <el-table-column
                            label="状态"
                            align="center"
                            width="130"
                            prop="status"
                            :filters="[{ text: '不感兴趣', value: 0}, { text: '待联系', value:1 }, { text: '继续跟进', value:2 }, { text: '结束', value:4 }]"
                            :filter-method="filterHandler">
                            <template slot-scope="scope">
                                <span :class="scope.row.status===0?'cancel_color':scope.row.status===1?'audit_color':scope.row.status===2?'normal_color':'delete_color'">{{scope.row.status===0?'不感兴趣':scope.row.status===1?'待联系':scope.row.status===2?'继续跟进':'结束'}}</span>
                            </template>
                    </el-table-column>

                    <el-table-column
                            label="创建时间"
                            align="center"
                            width="180"
                            prop="created_at"
                            sortable>
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            align="center"
                            min-width="350"
                            fixed="right">
                        <template slot-scope="scope">
                            
                                <el-button type="primary" plain size="mini" v-if="scope.row.status===1" @click="continueButton(scope.row.business_id)">继续跟进</el-button>
                                <el-button type="primary" plain size="mini" v-if="scope.row.status===2 || scope.row.status===1" @click="interestButton(scope.row.business_id)">不感兴趣</el-button>
                                <el-button type="primary" plain size="mini" v-if="scope.row.status===2" @click="finishButton(scope.row.business_id)">结束</el-button>
                                <el-button type="primary" plain size="mini" @click="remarkButton(scope.row.business_id)">备注</el-button>
                                <el-button type="primary" plain size="mini" @click="accessoryButton(scope.row)">查看详情附件</el-button>
                            
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

        <!--添加备注-->
        <el-dialog
                :visible.sync="remarkVisible"
                width="470px"
                custom-class="remarkDialog">
            <span slot="title" class="remarkDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div class="remarkDialog_main">
                <div class="remarkTitle">内容</div>
                <div class="remarkInput">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="remark">
                    </el-input>
                </div>
                <div class="remarkTitle">历史</div>
                <div class="remarkHistory">
                    <div v-for="(item,index) in historyData" :key="index">
                        <div class="remarkHistoryUser"><i class="iconfont icon-dian"></i><p>{{item.create_name}}</p><span>{{item.created_at}}</span></div>
                        <p>{{item.content}}</p>
                    </div>
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
          <el-button @click="remarkVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRemark">提 交</el-button>
        </span>
        </el-dialog>

        <!--查看详情-->
        <el-dialog :visible.sync="accessoryVisible" width="600px">
            <div slot="title" class="dialog_head_title">
                <i class="iconfont icon-faxian examine_icon"></i>
                <span>查看详情</span>
            </div>
            <div class="examine_content">
                <quill-editor
                    v-model="attachmentInfo.content"
                    ref="myQuillEditor"
                    :options="editorOption">
                </quill-editor>
            </div>
            <div class="img_content">
                <div class="img_items" v-for="(item,index) in attachmentInfo.attachment" :key="index">
                    <img v-if="Tools.isPic(item.path)" :src="Tools.handleImg(item.path)" alt="" class="img">
                    <img v-else src="/static/img/icon/accessory_e.png" alt="" class="imgModle">
                    <a :href="Tools.handleImg(item.path)+'?attname='">
                        <div class="modal_img">
                            <i class="el-icon-download modal_icon"></i>
                        </div>
                    </a>
                </div>
            </div>
            <div class="user_footer" slot="footer">
                <el-row>
                    <el-button type="primary" class="btn_foot" @click="accessoryVisible = false">关闭</el-button>
                </el-row>
            </div>
        </el-dialog>
        
        <!--确认框-->
        <el-dialog
                width="470px"
                custom-class="confirmDialog"
                :visible.sync="confirmDialog"
                center>
                <span slot="title" class="confirmDialog_title"><i class="iconfont icon-huaban4"></i></span>
                <div class="confirmDialog_box">
                    <i class="iconfont icon-warning-circle"></i>
                    <p>确定{{status===0?'不感兴趣':status===2?'继续跟进':'结束'}}吗？</p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="confirmDialog = false">取 消</el-button>
                    <el-button type="primary" @click="confirmOperation">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>

    import BreadCrumb from '@/components/public/BreadCrumb';
    import {quillEditor} from 'vue-quill-editor'
    import * as Quill from 'quill'  //引入编辑器

    //quill图片可拖拽改变大小
    import ImageResize from 'quill-image-resize-module';

    Quill.register('modules/imageResize', ImageResize);

    //quill图片可拖拽上传
    import {ImageDrop} from 'quill-image-drop-module';

    Quill.register('modules/imageDrop', ImageDrop);
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    Quill.register('modules/ImageExtend', ImageExtend);

    var toolbarOptions = [
        ['italic', 'underline', 'strike', 'bold'],
        ['blockquote', 'code-block'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{'direction': 'rtl'}],
        [{'color': []}],
        [{'align': []}],
        ['image','link']
    ];
    export default {
        name: "Business-Connection",
        data(){
            return {
                // 面包屑
                breadData: [
                    {
                        id: 1,
                        name: '企业',
                        urls: '/index/question/question',
                        icon: 'icon-home'
                    }, {
                        id: 2,
                        name: '企业关系',
                        urls: '/index/question/questionContents',
                        icon: 'icon-home'
                    }
                ],
                content: null,//编辑器输入内容
                editorOption: {
                    modules: {
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                'image': function (value) {// 劫持原来的图片点击按钮事件
                                    console.log(value);
                                    if (value) {
                                        document.querySelector('#editorImg').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        },
                        imageDrop: true,
                        imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'none',
                                color: 'white'
                            },
                            modules: ['Resize', 'DisplaySize', 'Toolbar']
                        },
                        ImageExtend: {
                            loading: true,
                            name: 'img',
                            size: 1,
                            action: '',
                            response: (res) => {
                                return res.info
                            },
                            headers: (xhr) => {
                                // xhr.setRequestHeader('myHeader','myValue')
                            },  //设置请求头部
                            sizeError: () => {
                                this.$message.error('图片大小超过限制10M')
                            },  // 图片超过大小的回调
                            start: () => {
                            }, //this.ImgStart(),//() => {},  //自定义开始上传触发事件
                            end: () => {
                            },  //自定义上传结束触发的事件，无论成功或者失败
                            error: () => {
                            },  //上传失败触发的事件
                            success: () => {
                            },  //上传成功触发的事件
                            change: (xhr, formData) => {
                                // xhr.setRequestHeader('myHeader','myValue')
                                // formData.append('token', 'myToken')
                            } //每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
                        },
                    }
                },//富文本配置
                companySearch:'',// 公司名称搜索
                companyData:[{attachment:''}],// 公司数据列表
                remarkVisible:false,// 备注弹窗
                accessoryVisible:false,// 查看详情弹窗
                attachmentInfo:{},  //附件详情
                confirmDialog:false,// 确认弹窗
                remark:'',// 新增备注信息
                historyData:[],// 备注历史记录
                id:'',// 公司id
                status:null,// 状态值
                index:0,// 选中下标
                currentPage:1,// 当前页
                pageSize:25,// 每页显示数量
                total:0,// 总记录数
            }
        },
        components:{BreadCrumb},
        methods:{
            //获取合作企业列表
            getCompanyList(){
                let parameters={
                    page:this.currentPage,
                    size:this.pageSize
                };
                if(this.companySearch){
                    parameters.company_name=this.companySearch
                }
                this.HttpClient.post('/admin/cooperation/lists',parameters)
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.companyData=res.data.data.data;
                            this.total=res.data.data.total;

                        }
                    })
            },
            //获取备注列表
            getRemarkList(id){
                this.HttpClient.post('/admin/remarkLog/lists',{source_id:id})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.historyData=res.data.data;
                            // 在vm实例上通知
                            this.$set(this.historyData,this.historyData.length-1,this.historyData[this.historyData.length-1])
                        }else{
                            this.historyData=[];
                        }
                    })
            },
            //改变状态
            changeStatus(status){
                this.HttpClient.post('/admin/cooperation/changeStatus',{status,business_id:this.id})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            setTimeout(()=>{
                                this.getCompanyList()
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            //继续跟进
            continueButton(id){
                this.id=id;
                this.status=2;
                this.confirmDialog=true;
            },
            //不感兴趣按钮事件
            interestButton(id){
                this.id=id;
                this.status=0;
                this.confirmDialog=true;
            },
            //结束按钮事件
            finishButton(id){
                this.id=id;
                this.status=3;
                this.confirmDialog=true;
            },
            //添加备注
            addRemark(){
                this.HttpClient.post('/admin/remarkLog/create',{content:this.remark,source_id:this.id})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.remark='';
                            setTimeout(()=>{
                                this.getRemarkList(this.id)
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            //添加备注按钮事件
            remarkButton(id){
                this.id=id;
                this.remarkVisible=true;
                this.getRemarkList(id)
            },
            //查看详情
            accessoryButton(i){
                console.log(i);
                // this.index=index;
                this.attachmentInfo = i;
                this.accessoryVisible=true;
            },
            //确认操作
            confirmOperation(){
                this.confirmDialog=false;
                this.changeStatus(this.status)
            },
            //分页
            currentChange(p){
                this.currentPage=p;
                this.getCompanyList()
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
        },
        created(){
            this.getCompanyList()
        }
    }
</script>

<style lang="less">
    .business_connection{
        .bread {
            margin: 10px;
        }
      .business_main::-webkit-scrollbar {display:none}
        .business_main {
            margin-left: 10px;
            margin-top: 10px;
            background: #fff;
            height: calc(100vh - 100px);
            width: calc(100vw - 240px);
            border-radius: 2px;
          overflow-y: auto;

            .business_title {
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
            .business_header{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 30px 25px;

                .business_select{
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
                .business_search{
                    display: flex;
                    align-items: center;
                    >div{
                        margin-left: 30px;
                    }
                }
            }

            /*表格*/
            .business_content{
                padding: 0 30px;
                .el-table{
                    thead{
                        color: #fff;
                        th,tr{
                            background-color: #15bafe;
                        }
                    }
                    .el-icon-arrow-down{
                        font-size: 20px;
                        color:#fff;
                    }
                }

                /*操作按钮*/
                .business_scope{
                    padding: 0;
                    .cell{
                        line-height: unset;
                        .business_btm{
                            display: flex;
                            align-items: center;
                            div:not(:last-child){
                                border-right: 1px solid #ebeef5;
                            }
                            div{
                                min-height: 47px;
                                height: 100%;
                                flex: 1;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }

        /*备注弹窗*/
        .remarkDialog{
            .el-dialog__body{
                padding: 0 20px;
            }
            .remarkDialog_title{
                display: flex;
                align-items: center;
                padding-bottom: 10px;
                i{
                    font-size: 24px;
                    color: #15bafe;
                }
            }
            .remarkDialog_main{
                .remarkTitle{
                    text-align: left;
                    margin-bottom: 5px;
                }
                .remarkInput{
                    margin-bottom: 20px;
                }
                .remarkHistory{
                    max-height: 270px;
                    overflow: auto;
                    >div:not(:last-child){
                        margin-bottom: 15px;
                    }
                    .remarkHistoryUser{
                        display: flex;
                        align-items: center;
                        margin-bottom: 5px;
                        i{
                            color: #15bafe;
                            margin-right: 5px;
                        }
                        p{
                            font-size: 14px;
                            color: #222;
                            margin-right: 8px;
                        }
                        span{
                            font-size: 12px;
                            color: #15bafe;
                        }
                    }
                    .remarkHistoryUser~p{
                        text-align: left;
                        font-size: 12px;
                        color: #666;
                        padding-left: 20px;
                    }
                }


            }


        }

        /*查看详情弹窗*/
        .dialog_head_title{
            text-align: start;
            font-size: 14px;
            border-bottom: 1px solid #f2f2f2;
            padding-bottom: 10px;
        }
        .examine_icon{
            color: #15bafe;
        }
        .examine_content{
            height: 325px;
            width:100%;
            border: 1px solid #f2f2f2;
            
            .ql-container{
                min-height:260px;
                overflow-y: auto;
                .ql-editor{
                    height:260px;
                }
            }
            .examine_text{
                display: flex;
                justify-content: space-between;
                margin-left: 10px;
                margin-bottom: 10px;
                cursor: pointer;
                a{
                    text-decoration:none;
                    width: 100%;
                }
                .examine_down_p{
                    width: 250px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 12px;
                    color: #15bafe;
                }
                .icon_examine{
                    margin-right: 10px;
                    color: #404040;
                }
            }
            .examine_list{
                height: 100px;
                margin-top: 10px;
                overflow: auto;
            }
        }
        .img_content{
            height: 120px;
            border: 1px solid #f2f2f2;
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
            .img_items{
                height: 100px;
                width: 100px;
                margin: 5px;
                // overflow-y: auto;
                
                    .img{
                        width: 100px;
                        height: 100px;
                        margin: 5px;
                        box-shadow: 0px 0px 5px #bfbfbf;
                    }
                    .imgModle{
                        width: 50px;
                        height: 50px;
                        margin: 30px;
                    }
                // .img_item1{
                //     width: 17%;
                //     margin-left: 4%;
                //     margin-right: 4%;
                //     margin-top: 10px;
                //     .img{
                //         width: 100%;
                //         height: 60px;
                //     }
                // }
                .modal_img{
                    position: relative;
                    top: 31px;margin-top: -64px;
                    left: 5px;
                    width: 100%;
                    height: 25px;
                    background: rgba(101, 101, 101, 0.6);
                    color: #ffffff;
                    opacity: 0;
                }
                .modal_img:hover{
                    opacity: 1;
                }
                .modal_icon{
                    position: relative;
                    font-size: 18px;
                    top: 6%;
                }
            }
        }

        /*确认弹窗*/
        .confirmDialog{
            .confirmDialog_title{
                display: flex;
                align-items: center;
                i{
                    font-size: 24px;
                    color: #15bafe;
                }
            }
            .confirmDialog_box{
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
