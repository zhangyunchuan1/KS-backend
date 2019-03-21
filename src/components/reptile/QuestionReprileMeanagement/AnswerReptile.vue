<template>
    <div class="answer_reptile">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="productReview_main">
            <!--标题-->
            <div class="title">
                <p>回答爬虫</p>
            </div>

            <div class="content">
                <div class="content_main">
                        <div class="content_header_search">
                                <el-input placeholder="输入问题ID搜索" v-model="titleSearch" @keyup.13.native="getSearchList">
                                        <el-button slot="append" icon="el-icon-search" @click="getSearchList"></el-button>
                                </el-input>
                        </div>
                    <div class="content_table">
                        <el-table
                                :data="tableData"
                                :border="true"
                                style="width:100%">
                            <el-table-column
                                    label="原站问题ID"
                                    align="center"
                                    width="120"
                                    prop="id"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="问题题目"
                                    align="center"
                                    width="200"
                                    show-overflow-tooltip
                                    prop="user_id">
                            </el-table-column>
                            
                            <el-table-column
                                    label="点赞次数"
                                    align="center"
                                    width="130"
                                    prop="user_id"
                                    show-overflow-tooltip
                                    sortable>
                            </el-table-column>
                            
                            <el-table-column
                                    label="回答时间"
                                    align="center"
                                    width="160"
                                    prop="user_id"
                                    show-overflow-tooltip
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="创建时间"
                                    align="center"
                                    width="160"
                                    show-overflow-tooltip
                                    prop="nickname"
                                    sortable>
                            </el-table-column>
                            <el-table-column
                                    label="审核状态"
                                    align="center"
                                    width="120"
                                    show-overflow-tooltip
                                    prop="nickname">
                            </el-table-column>

                            <el-table-column
                                    label="通过状态"
                                    align="center"
                                    width="120"
                                    show-overflow-tooltip
                                    prop="user_type">
                                    <template slot-scope="scope">
                                    </template>
                            </el-table-column>

                            <el-table-column
                                label="操作"
                                align="center"
                                min-width="350"
                                fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="primary" plain size="mini" @click="handlePreview(scope.row.id)">预览修改</el-button>
                                    <!-- <el-button type="primary" plain size="mini">回答预览</el-button> -->
                                    <el-button type="primary" plain size="mini" @click="handleApproval(scope.row.id)">批准</el-button>
                                    <el-button type="primary" plain size="mini" @click="handleReject(scope.row.id)">驳回</el-button>
                                    <el-button type="primary" plain size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                v-if="total"
                                layout="prev, pager, next"
                                :total="total"
                                :page-size="25"
                                @current-change="currentChange"
                        ></el-pagination>
                    </div>

                </div>
            </div>
        </div>
        <!-- 预览 -->
        <el-dialog :visible.sync="modifyDialog" min-width="1500px" custom-class="modifyDialog" :close-on-press-escape='false' :close-on-click-modal='false'>
                <span slot="title" class="approveDialog_title">
                        <i class="iconfont icon-huaban4"></i>
                </span>
                <div class="info_content">
                        <div class="info_content_left">
                                <div class="old_content">原回答内容</div>
                                <div class="content_old">
                                        <quill-editor
                                                v-model="answerInfo"
                                                ref="myQuillEditor"
                                                :options="editorOption"
                                                @focus="onEditorFocus($event)"
                                                @change="onEditorChange($event,5000)">
                                        </quill-editor>
                                </div>
                        </div>
                        <div class="info_content_right">
                                <div class="old_content">译回答内容</div>
                                <div class="content_old">
                                        <quill-editor
                                                v-model="new_answer"
                                                ref="myQuillEditor"
                                                :options="editorOption">
                                        </quill-editor>
                                </div>
                        </div>
                </div>
                <span slot="footer" class="dialog_footer">
                        <el-button @click="modifyDialog = false">取 消</el-button>
                        <el-button type="primary" @click="handleSubmit">提 交</el-button>
                </span>
        </el-dialog>
        <!--批准弹窗-->
        <el-dialog
                width="470px"
                custom-class="approveDialog"
                :visible.sync="approveDialog"
                center>
                <span slot="title" class="approveDialog_title"><i class="iconfont icon-huaban4"></i></span>
                <div class="approveDialog_box">
                <i class="iconfont icon-warning-circle"></i>
                <p>确定批准吗？</p>
                </div>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="approveDialog = false">取 消</el-button>
                        <el-button type="primary" @click="confirmAgree">确 定</el-button>
                </span>
        </el-dialog>
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
                <el-radio border v-model="disableDialogRadio" :label="item.review_id" v-for="(item,index) in disableDialogList" :key="index">{{item.name}}</el-radio>
            </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="disableDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleConfirmReject">确 定</el-button>
        </span>
        </el-dialog>
        <!--删除弹窗-->
        <el-dialog
                width="470px"
                custom-class="approveDialog"
                :visible.sync="deleteDialog"
                center>
                <span slot="title" class="approveDialog_title"><i class="iconfont icon-huaban4"></i></span>
                <div class="approveDialog_box">
                <i class="iconfont icon-warning-circle"></i>
                <p>确定删除吗？</p>
                </div>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="deleteDialog = false">取 消</el-button>
                        <el-button type="primary" @click="handleSureDelete">确 定</el-button>
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
        name: "AnswerReptile",
        components: {
            BreadCrumb
        },
        data(){
            return{
                // 面包屑
                breadData: [
                {
                    id: 1,
                    name: '爬虫管理',
                    urls: '/index/market/Market',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '问题爬虫',
                    urls: '/index/market/marketProduct/MarketProduct',
                    icon: 'icon-home'
                }
                ],
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
                tableData:[{id:1},{id:1}],
                titleSearch:null,
                modifyDialog:false,  //预览
                approveDialog:false,  //批准弹窗
                disableDialog:false,  //驳回弹窗
                deleteDialog:false,  //删除弹窗
                disableDialogList:'',
                rejectReason:'',
                answerInfo:'',
                new_answer:'',

                //分页
                total:null,
                currentPage:1
            }
        },
        mounted(){
            this.getSearchList();
        },
        methods:{
            handleSureDelete(){
                // this.HttpClient.post("/admin/reptile/updateStatus", {
                //         id:this.articleID,
                //         status:0
                //     }).then(res => {
                //         if(res.data.code === 200){
                //             this.$message.success(res.data.msg);
                //             setTimeout(() => {
                //                 this.getDataList();
                //             }, 500);
                //             this.deleteDialog = false;
                //         }
                //     })
            },
            handleConfirmReject(){
                    this.HttpClient.post("/admin/reptile/updateStatus", {
                        id:this.articleID,
                        refuse:this.rejectReason,
                        review_id:this.disableDialogRadio,
                        status:3
                    }).then(res => {
                        if(res.data.code === 200){
                            this.$message.success(res.data.msg);
                            setTimeout(() => {
                                this.getDataList();
                            }, 500);
                            this.disableDialog = false;
                        }
                    })
                },
            handleSubmit(){

            },
            confirmAgree(){
                        // this.HttpClient.post("/admin/reptile/updateStatus", {
                        //         id:this.articleID,
                        //         status:1
                        // }).then(res => {
                        //         if(res.data.code === 200){
                        //             this.$message.success(res.data.msg);
                        //                 setTimeout(() => {
                        //                         this.getDataList();
                        //                         this.approveDialog = false;
                        //                 }, 500);
                        //         }
                        // })
            },
            handleDelete(id){
                // this.articleID = id;
                this.deleteDialog = true;
            },
            handleReject(id){
                    this.disableDialogList = [];
                    this.disableDialogRadio = null,
                    this.rejectReason = '',
                    this.disableDialog = true;
                    this.getRejecttype();
                },
                handleApproval(id){
                console.log(id);
                this.approveDialog = true;
            },
            getRejecttype(){
                this.HttpClient.post('/admin/webReview/getList',{
                    type:'upload'
                }).then(res =>{
                    console.log(res)
                    if(res.data.code === 200){
                        this.disableDialogList = res.data.data;
                    }
                })
            },
            //打开预览弹窗
            handlePreview(id){
                this.modifyDialog = true;
            },
            //获取问题爬虫列表
            getSearchList(){
                
            },
            //分页
            currentChange(p){
                this.currentPage=p;
                this.getSearchList();
                this.currentPage  = null;
            },
            filterSecondary(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            onEditorFocus(e){ // 富文本获得焦点时的事件
                console.log(e); // 富文本获得焦点时的内容
                // e.enable(false); // 在获取焦点的时候禁用
                this.$message.warning('原文不可以编辑！');
            },
            onEditorChange(e, decimalNum) {//内容改变事件
                //this.content = event.html
                // console.log(this.content)
                let lengthcontent = this.articleInfo.content;
                function removeHTMLTag(str) {
                //var str;
                str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
                str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
                str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
                str = str.replace(/ /ig, '');//去掉
                return str;
                }
                // console.log(removeHTMLTag(lengthcontent).length)
                this.wordNum = removeHTMLTag(lengthcontent).length;
                e.quill.deleteText(decimalNum, 1);//保留 strValue 的 前 decimalNum 位字符，
                this.$emit('Quescthon', this.articleInfo.content)
                console.log(this.articleInfo.content);
                const data = this.Tools.getEditorImageAndLength(this.articleInfo.content);
                this.editImageSize = data.imgArray.length;
                console.log(this.modifyData)
                // if (removeHTMLTag(lengthcontent).length < 2000) {
                //   this.modifyData.description = this.content;
                // } else {
                //   this.$message.error('字数超过限制');
                // }
            },
        },
    }
</script>

<style lang="less">
    .answer_reptile{
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
                .all_num{
                    border-bottom: 1px solid #dedede;
                    padding-bottom: 20px;
                    margin-bottom: 10px;
                    display: flex;
                    .num_title{
                        text-align: center;
                        padding: 0 20px;
                        height: 35px;
                        line-height: 35px;
                        border-radius: unset;
                        background: #15bafe;font-size: 14px;
                        color:#fff;
                    }
                    .all_number{
                        text-align: center;
                        margin-left: 20px;
                        padding: 0 20px;
                        height: 35px;
                        line-height: 35px;
                        border:1px solid #dedede;
                        
                    }
                }
                .content_main{
                    /*搜索框*/
                    .content_header_search{
                        display: flex;
                        align-items: center;
                        margin-bottom: 15px;
                        .el-input{
                                width: 240px;
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
        .modifyDialog{
            min-width: 1200px;
        .approveDialog_title{
            display: flex;
            align-items: center;
            i{
                font-size: 24px;
                color: #15bafe;
                margin-right: 15px;
            }
        }
        .el-dialog__body{
                padding: 10px 20px;
                height: 400px;
                .info_content{
                        display: flex;
                        margin-bottom: 50px;
                        .info_content_left{
                                width: 50%;
                                height: 500px;
                                margin-right: 5px;
                                // border:1px solid #bfbfbf;                    
                                .original_text_title{
                                        display: flex;
                                        height: 40px;
                                        margin-bottom: 5px;
                                        .title_head{
                                                width: 151px;
                                                height: 100%;
                                                line-height: 40px;
                                                text-align: center;
                                                background: #15bafe;
                                                color:#fff;
                                        }
                                        .el-input{
                                                margin-left: 5px;
                                                width: 605px;
                                        } 
                                        
                                }
                                .original_text_img{
                                        display: flex;
                                        height: 151px;
                                        margin-bottom: 5px;
                                        .title_head{
                                                margin-right:5px;
                                                width: 115px;
                                                height: 40px;
                                                line-height: 40px;
                                                text-align: center;
                                                background: #15bafe;
                                                color:#fff;
                                        }
                                        .el-input{
                                                margin-left: 5px;
                                                width: 605px;
                                        }
                                        .fenimg{
                                            width: 250px;
                                            height: 150px;
                                            img{
                                                width: 250px;
                                                height: 150px;
                                            }
                                        }
                                        .avatar-uploader{
                                            .el-upload {
                                                border: 1px dashed #d9d9d9;
                                                border-radius: 6px;
                                                cursor: pointer;
                                                position: relative;
                                                overflow: hidden;
                                            }
                                            .el-upload:hover {
                                                border-color: #409EFF;
                                            }
                                            .avatar-uploader-icon {
                                                font-size: 28px;
                                                color: #8c939d;
                                                width: 250px;
                                                height: 150px;
                                                line-height: 150px;
                                                text-align: center;
                                            }
                                            .avatar {
                                                width: 250px;
                                                height: 150px;
                                                display: block;
                                            }
                                        } 
                                        
                                }
                                .old_content{
                                        margin-top: 5px;
                                        width: 115px;
                                        height: 40px;
                                        line-height: 40px;
                                        text-align: center;
                                        background: #15bafe;
                                        color:#fff;
                                }
                                .content_old{
                                        .ql-container{
                                                height: 295px;
                                                overflow-y: auto;

                                        }
                                }
                                .tags_box{
                                        display: flex;
                                        margin-bottom: 5px;
                                        .tag_title{
                                                height: 32px;
                                                width: 115px;
                                                line-height: 32px;
                                                text-align: center;
                                                background: #15bafe;
                                                color:#fff;
                                                margin-right: 5px;
                                        }
                                        
                                }
                        }
                        .info_content_right{
                                width: 50%;
                                height: 500px;
                                // border:1px solid #bfbfbf;
                                .original_text_title{
                                        display: flex;
                                        height: 40px;
                                        margin-bottom: 5px;
                                        .title_head{
                                                width: 151px;
                                                height: 100%;
                                                line-height: 40px;
                                                text-align: center;
                                                background: #15bafe;
                                                color:#fff;
                                        }
                                        .el-input{
                                                margin-left: 5px;
                                                width: 605px;
                                        }
                                }
                                .original_text_img{
                                        display: flex;
                                        height: 151px;
                                        margin-bottom: 5px;
                                        .title_head{
                                                margin-right:5px;
                                                width: 115px;
                                                height: 40px;
                                                line-height: 40px;
                                                text-align: center;
                                                background: #15bafe;
                                                color:#fff;
                                        }
                                        .el-input{
                                                margin-left: 5px;
                                                width: 605px;
                                        }
                                        .avatar-uploader{
                                            .el-upload {
                                                border: 1px dashed #d9d9d9;
                                                border-radius: 6px;
                                                cursor: pointer;
                                                position: relative;
                                                overflow: hidden;
                                            }
                                            .el-upload:hover {
                                                border-color: #409EFF;
                                            }
                                            .avatar-uploader-icon {
                                                font-size: 28px;
                                                color: #8c939d;
                                                width: 250px;
                                                height: 150px;
                                                line-height: 150px;
                                                text-align: center;
                                            }
                                            .avatar {
                                                width: 250px;
                                                height: 150px;
                                                display: block;
                                            }
                                        } 
                                        
                                }
                                .old_content{
                                        margin-top: 5px;
                                        width: 115px;
                                        height: 40px;
                                        line-height: 40px;
                                        text-align: center;
                                        background: #15bafe;
                                        color:#fff;
                                }
                                .content_old{
                                        .ql-container{
                                                height: 295px;
                                                overflow-y: auto;
                                        }
                                }
                                .tags_box{
                                        display: flex;
                                        margin-top: 5px;
                                        .tag_title{
                                                height: 32px;
                                                width: 115px;
                                                line-height: 32px;
                                                text-align: center;
                                                background: #15bafe;
                                                color:#fff;
                                                margin-right: 5px;
                                        }
                                        .tags{
                                              .el-tag + .el-tag {
                                                margin-left: 10px;
                                                }
                                                .button-new-tag {
                                                margin-left: 10px;
                                                height: 32px;
                                                line-height: 30px;
                                                padding-top: 0;
                                                padding-bottom: 0;
                                                }
                                                .input-new-tag {
                                                width: 90px;
                                                margin-left: 10px;
                                                vertical-align: bottom;
                                                }  
                                        }

                                }

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
