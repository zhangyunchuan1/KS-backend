<template>
    <div class="article_reptile">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="productReview_main">
            <!--标题-->
            <div class="title">
                <p>文章爬虫</p>
            </div>

            <div class="content">
                <div class="content_main">
                    <div class="content_table">
                        <el-table
                                :data="tableData"
                                :border="true"
                                style="width:100%">
                            <el-table-column
                                    label="原站文章ID"
                                    align="center"
                                    width="70"
                                    prop="id"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="文章题目"
                                    align="center"
                                    width="150"
                                    show-overflow-tooltip
                                    prop="title">
                            </el-table-column>
                            <el-table-column
                                    label="点赞次数"
                                    align="center"
                                    width="110"
                                    prop="like_num"
                                    show-overflow-tooltip
                                    sortable>
                            </el-table-column>
                            <el-table-column
                                    label="关键词"
                                    align="center"
                                    width="150"
                                    prop="tags_name"
                                    show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span v-if="!scope.row.tags_name">无</span>
                                        <div v-else>
                                            <el-tag type="success" v-for="(item,index) in scope.row.tags_name" :key="index">{{item}}</el-tag>
                                        </div>
                                    </template>
                            </el-table-column>
                            <el-table-column
                                    label="发布时间"
                                    align="center"
                                    width="160"
                                    prop="release_time"
                                    show-overflow-tooltip
                                    sortable>
                            </el-table-column>
                            <el-table-column
                                    label="站点"
                                    align="center"
                                    width="120"
                                    show-overflow-tooltip
                                    prop="url">
                            </el-table-column>
                            <el-table-column
                                    label="板块"
                                    align="center"
                                    width="120"
                                    show-overflow-tooltip
                                    prop="category_name">
                                    <template slot-scope="scope">
                                            <span v-if="scope.row.category_name !== null">{{scope.row.category_name}}</span>
                                            <span class="sortout_color" v-if="scope.row.category_name === null">未分配</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="创建时间"
                                    align="center"
                                    width="160"
                                    show-overflow-tooltip
                                    prop="created_at"
                                    sortable>
                            </el-table-column>
                            <el-table-column
                                    label="审核状态"
                                    align="center"
                                    width="100"
                                    show-overflow-tooltip
                                    prop="status">
                                    <template slot-scope="scope">
                                            <span class="normal_color" v-if="scope.row.status === 1 || scope.row.status === 3">已审核</span>
                                            <span class="sortout_color" v-if="scope.row.status === 2">待审核</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                    label="通过状态"
                                    align="center"
                                    width="100"
                                    show-overflow-tooltip
                                    prop="status">
                                    <template slot-scope="scope">
                                            <span class="normal_color" v-if="scope.row.status === 1">已通过</span>
                                            <span class="sortout_color" v-if="scope.row.status === 2 || scope.row.status === 3">未通过</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                label="操作"
                                align="center"
                                min-width="350"
                                fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="primary" plain size="mini" @click="handlePreview(scope.row.id)">预览修改</el-button>
                                    <el-button type="primary" plain size="mini" v-if="scope.row.status === 2 || scope.row.status === 3" @click="handleApproval(scope.row.id)">批准</el-button>
                                    <el-button type="primary" plain size="mini" v-if="scope.row.status === 1 || scope.row.status === 2" @click="handleReject(scope.row.id)">驳回</el-button>
                                    <el-button type="primary" plain size="mini" v-if="scope.row.status === 3" @click="handleDelete(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                v-if="total"
                                layout="prev, pager, next"
                                :total="total"
                                :page-size="15"
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
                                <div class="original_text_title">
                                        <div class="title_head">原文标题</div>
                                        <el-input v-model="articleInfo.title" show-overflow-tooltip disabled></el-input>
                                </div>
                                <div class="original_text_img">
                                        <div class="title_head">封面图片</div>
                                        <!-- <el-upload
                                            class="avatar-uploader"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :show-file-list="false"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload> -->
                                        <div class="fenimg">
                                            <img :src="articleInfo.image_path" alt="">
                                        </div>
                                </div>
                                <div class="tags_box">
                                        <div class="tag_title">关键词</div>
                                        <div class="tags">
                                                <el-tag v-for="tag in articleInfo.tags_name" :key="tag" style="margin-right:5px;">{{tag}}</el-tag>
                                        </div>
                                </div>
                                <div class="old_content">原文内容</div>
                                <div class="content_old">
                                        <quill-editor
                                                v-model="articleInfo.content"
                                                ref="myQuillEditor"
                                                :options="editorOption"
                                                @focus="onEditorFocus($event)"
                                                @change="onEditorChange($event,5000)">
                                        </quill-editor>
                                </div>
                        </div>
                        <div class="info_content_right">
                                <div class="original_text_title">
                                        <div class="title_head">译文标题</div>
                                        <el-input placeholder="请输入内容" v-model="translationTitle"></el-input>
                                </div>
                                <div class="original_text_img">
                                        <div class="title_head">封面图片</div>
                                        <el-upload
                                            class="avatar-uploader"
                                            action="customize"
                                            :show-file-list="false"
                                            :auto-upload="true" 
                                            :before-upload="beforeAvatarUpload"
                                            :http-request="defaultBehavior">
                                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                </div>
                                <div class="tags_box">
                                        <div class="tag_title">关键词</div>
                                        <div class="tags">
                                                <el-tag v-for="tag in newTags" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
                                                <el-input
                                                        class="input-new-tag"
                                                        v-if="inputVisible"
                                                        v-model="inputValue"
                                                        ref="saveTagInput"
                                                        size="small"
                                                        @keyup.enter.native="handleInputConfirm"
                                                        @blur="handleInputConfirm">
                                                </el-input>
                                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                                        </div>
                                </div>
                                <div class="old_content">译文内容</div>
                                <div class="content_old">
                                        <quill-editor
                                                v-model="new_content"
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
        name: "ArticleReptile",
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
                    name: '文章爬虫',
                    urls: '/index/market/marketProduct/MarketProduct',
                    icon: 'icon-home'
                }
                ],
                old_content:'',
                new_content:'',
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
                tableData:null,
                modifyDialog:false,
                approveDialog:false,
                articleInfo:{},
                newTags:[],  //译文标签
                translationTitle:'',  //译文标题
                inputVisible: false,
                inputValue: '',
                wordNum:0,
                imageUrl:'',
                disableDialog:false,
                rejectReason:'', //驳回理由
                disableDialogRadio:'',  //驳回类别
                disableDialogList:[],  //驳回类别数组
                deleteDialog:false,  
                //分页
                total:null,
                currentPage:1
            }
        },
        mounted(){
            this.getDataList();
        },
        methods:{
            //删除
            handleDelete(id){
                this.articleID = id;
                this.deleteDialog = true;
            },
            //确定删除
            handleSureDelete(){
                this.HttpClient.post("/admin/reptile/updateStatus", {
                        id:this.articleID,
                        status:0
                    }).then(res => {
                        if(res.data.code === 200){
                            this.$message.success(res.data.msg);
                            setTimeout(() => {
                                this.getDataList();
                            }, 500);
                            this.deleteDialog = false;
                        }
                    })
            },
            //提交修改
                handleSubmit(){
                    this.HttpClient.post("/admin/reptile/edit", {
                        translation_title:this.translationTitle,
                        translation_content:this.new_content,
                        article_id:this.articleInfo.article_id,
                        label:this.newTags,
                        word_num:this.wordNum,
                        integrity:80
                    }).then(res => {
                        console.log(res);
                        if(res.data.code === 200){
                            this.$message.success(res.data.msg);
                            setTimeout(() => {
                                this.getDataList();
                            }, 500);
                            this.modifyDialog = false;
                        }
                    })
                },
                //确认驳回
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
                //驳回
                handleReject(id){
                    this.articleID = id;
                    this.disableDialogList = [];
                    this.disableDialogRadio = null,
                    this.rejectReason = '',
                    this.disableDialog = true;
                    this.getRejecttype();
                },
                //批准
                handleApproval(id){
                    console.log(id);
                       this.articleID = id; 
                       this.approveDialog = true;
                },
                //确认批准
                confirmAgree(){
                        this.HttpClient.post("/admin/reptile/updateStatus", {
                                id:this.articleID,
                                status:1
                        }).then(res => {
                                if(res.data.code === 200){
                                    this.$message.success(res.data.msg);
                                        setTimeout(() => {
                                                this.getDataList();
                                                this.approveDialog = false;
                                        }, 500);
                                }
                        })
                },
                handleClose(tag) {
                        this.newTags.splice(this.newTags.indexOf(tag), 1);
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
                showInput() {
                        this.inputVisible = true;
                        this.$nextTick(_ => {
                        this.$refs.saveTagInput.$refs.input.focus();
                        });
                },

                handleInputConfirm() {
                        let inputValue = this.inputValue;
                        if (inputValue) {
                        this.newTags.push(inputValue);
                        }
                        this.inputVisible = false;
                        this.inputValue = '';
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
            //预览修改文章
            handlePreview(id){
                this.newTags = [];
                this.modifyDialog = true;
                this.HttpClient.post("/admin/reptile/info", {
                        id:id
                }).then(res => {
                        console.log(res);
                        if(res.data.code === 200){
                                this.articleInfo = res.data.data;
                                this.imageUrl = this.articleInfo.image_path;
                                this.translationTitle = this.articleInfo.translation_title;
                                this.new_content = this.articleInfo.translation_content;
                                if(this.articleInfo.tags_name === null){
                                    this.articleInfo.tags_name === [];
                                }else{
                                    this.articleInfo.tags_name.forEach(item => {
                                        this.newTags.push(item);
                                    });
                                }
                                console.log(this.articleInfo)
                                // this.HttpClient.post("/translation", {
                                //     content:this.articleInfo.content,
                                //     from:'en',
                                //     to:'zh'
                                // }).then(res => {
                                //     console.log('翻译文本',res);
                                //     this.new_content = res.data.data.translations[0].translatedText;
                                // })
                                
                        }
                        
                })
            },
            //获取文章爬虫列表
            getDataList(){
                this.HttpClient.post("/admin/reptile/getList", {
                        pasSize:15,
                        page:this.currentPage
                }).then(res => {
                        console.log(res.data.data);
                        this.tableData = res.data.data[0].data;
                        this.total = res.data.data[0].total;
                })
            },
            //分页
            currentChange(p){
                this.currentPage=p;
                this.getDataList();
            },
            filterSecondary(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            /***
             * 封面上传
             * author:ZhangYunChuan
             */
            beforeAvatarUpload(file) {
                console.log(file);
                if(this.Tools.pictureLimit(file)){
                let that = this;
                //七牛云上传
                let observable = this.$observable(file);
                observable.subscribe({
                    next(res){
                    console.log('next',res);    
                    },
                    error(err){
                    that.$message.error('上传失败!');
                    },
                    complete(res) {
                    console.log('成功结果', res);
                    that.$message.success('上传成功!');
                    that.imageUrl = that.Urls.imageUrl+res.key;
                    }
                })
                }else{
                this.$message.warning('请上传下面格式图片：jpg/png/jpeg/tiff/tif。');
                }  
            },
            defaultBehavior(param){},
        },
    }
</script>

<style lang="less">
    .article_reptile{
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
                    .encyclopedia_search{
                        display: flex;
                        justify-content: flex-start;
                        margin: 20px 0;
                        .content_select{
                            display: flex;
                            .date_item{
                            display: flex;
                            border: 1px solid #dcdfe6;
                            border-radius: 5px;
                            margin-right: 20px;
                            .date_label{
                                color: #808080;
                                font-size: 12px;
                                height: 40px;
                                line-height: 40px;
                                margin-left: 10px;
                            }
                            .el-input--mini {
                                .el-input__inner{
                                    height: 40px;
                                    line-height: 40px;
                                    border: none !important;
                                }
                            }
                            .date_picker_1{
                                width: 140px;
                            }
                            }
                        }
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
        // .modifyDialog {
        //         .approveDialog_title {
        //         display: flex;
        //         align-items: center;
        //         i {
        //              font-size: 24px;
        //              color: #15bafe;
        //         }
        //         }
        //         .approveDialog_main {
        //                 text-align: center;
        //         }
        // }
    }
    /*确认批准确认弹窗*/
    .modifyDialog{
            min-width: 1500px;
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
                height: 730px;
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
                                                width: 115px;
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
                                        height: 180px;
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
                                            width: 278px;
                                            height: 178px;
                                            img{
                                                width: 278px;
                                                height: 178px;
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
                                                width: 278px;
                                                height: 178px;
                                                line-height: 178px;
                                                text-align: center;
                                            }
                                            .avatar {
                                                width: 278px;
                                                height: 178px;
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
                                                height: 390px;
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
                                                width: 115px;
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
                                        height: 180px;
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
                                                width: 278px;
                                                height: 178px;
                                                line-height: 178px;
                                                text-align: center;
                                            }
                                            .avatar {
                                                width: 278px;
                                                height: 178px;
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
                                                height: 390px;
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
                .approveDialog_box{
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
</style>
