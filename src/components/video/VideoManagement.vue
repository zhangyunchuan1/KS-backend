<template>
    <div class="videoManagement">
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

        <div class="video_main">
            <div class="video_title">
                <div class="title">视频管理</div>
            </div>

            <div class="video_header">
                <div class="video_select">
                    <div class="date_item">
                        <p class="date_label">开始</p>
                        <el-date-picker
                                v-model="startTime"
                                class="date_picker_1"
                                type="date"
                                size="mini"
                                placeholder="选择日期"
                                @change="handleStartTime">
                        </el-date-picker>
                    </div>
                    <div class="date_item">
                        <p class="date_label">截止</p>
                        <el-date-picker
                                v-model="endTime"
                                class="date_picker_1"
                                type="date"
                                size="mini"
                                placeholder="选择日期"
                                @change="handleEndTime">
                        </el-date-picker>
                    </div>
                </div>

                <div class="video_search">
                    <div>
                        <el-input placeholder="用户名搜索" v-model="searchUserName" class="input-with-select" clearable @clear="getVideoList" @input="search1($event)">
                            <el-button slot="append" icon="el-icon-search" @click="handleSearchUserName"></el-button>
                        </el-input>
                    </div>
                    <div>
                        <el-input placeholder="昵称搜索" v-model="searchNickName" class="input-with-select" clearable @clear="getVideoList" @input="search2($event)">
                            <el-button slot="append" icon="el-icon-search" @click="handleSearchNickName"></el-button>
                        </el-input>
                    </div>
                </div>
            </div>

            <div class="video_content">

                <el-table
                        :data="tableData"
                        :border="true"
                        style="width: 100%">
                    <el-table-column
                            label="ID"
                            align="center"
                            width="65"
                            prop="id"
                            sortable
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            label="视频标题"
                            align="center"
                            width="160"
                            prop="title"
                            show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                            label="昵称"
                            align="center"
                            width="100"
                            prop="nickname"
                            show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                            label="用户名"
                            align="center"
                            width="120"
                            prop="username"
                            show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                            label="长度(分钟)"
                            align="center"
                            width="100"
                            prop="video_length"
                            show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                            label="所属板块"
                            align="center"
                            :filters="[{text: '汽车', value: '汽车'}, {text: '摩托车', value: '摩托车'}, {text: '无人机', value: '无人机'}, {text: '智能设备', value: '智能设备'}]"
                            :filter-method="filterSecondary"
                            width="120"
                            prop="category_name"
                            show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                            label="用户类别"
                            align="center"
                            :filters="[{text: '个人', value: 1}, {text: '专业商家', value: 2}, {text: '普通商家', value: 3}]"
                            :filter-method="filterSecondary"
                            prop="user_type"
                            width="125"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="scope.row.user_type === 1">个人</span>
                            <span v-if="scope.row.user_type === 2">专业商家</span>
                            <span v-if="scope.row.user_type === 3">普通商家</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="视频类别"
                            align="center"
                            :filters="[{text: '普通视频', value:0}, {text: '教程视频', value:1}]"
                            :filter-method="filterSecondary"
                            prop="is_course"
                            width="125"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="scope.row.is_course === 0">普通视频</span>
                            <span v-if="scope.row.is_course === 1">教程视频</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="发布时间"
                            align="center"
                            width="160"
                            prop="created_at"
                            sortable
                            show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                            label="通过状态"
                            align="center"
                            :filters="[{text: '已通过', value: 1}, {text: '未通过，已审核', value: 3}, {text: '未通过，待审核', value: 2}]"
                            :filter-method="filterSecondary"
                            width="100"
                            prop="status"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="scope.row.status === 1">已通过</span>
                            <span v-if="scope.row.status === 3||scope.row.status === 2">未通过</span>
                            <!-- <span v-if="scope.row.status === 0">已删除</span> -->
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="审核状态"
                            align="center"
                            :filters="[{text: '已审核', value: 1}, {text: '待审核', value: 2}, {text: '已审核，未通过', value: 3}]"
                            :filter-method="filterSecondary"
                            width="125"
                            prop="status"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="scope.row.status === 1||scope.row.status === 3">已审核</span>
                            <span v-if="scope.row.status === 2">待审核</span>
                            <span v-if="scope.row.status === 0">已删除</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            align="center"
                            class-name="video_scope"
                            fixed="right">
                        <template slot-scope="scope">
                            <el-button type="primary" plain size="mini" v-if="scope.row.status === 1||scope.row.status === 2" @click="handleOpenReject(scope.row.video_id)">驳回</el-button>
                            <el-button type="primary" plain size="mini" v-if="scope.row.status === 2||scope.row.status === 3" @click="handleOpenApprove(scope.row.video_id)">批准</el-button>
                            <el-button type="primary" plain size="mini" @click="handleOpenModify(scope.row.video_id,scope.row.id)">修改</el-button>
                            <el-button type="primary" plain size="mini" v-if="scope.row.status === 3" @click="handleOpendelete(scope.row.video_id)">删除</el-button>
                            <el-button type="primary" plain size="mini">查看</el-button>
                            <!-- <div class="video_btm">
                                <div v-if="scope.row.status === 1||scope.row.status === 2" @click="handleOpenReject(scope.row.video_id)">驳回</div>
                                <div v-if="scope.row.status === 2||scope.row.status === 3" @click="handleOpenApprove(scope.row.video_id)">批准</div>
                                <div @click="handleOpenModify(scope.row.video_id,scope.row.id)">修改</div>
                                <div v-if="scope.row.status === 3" @click="handleOpendelete(scope.row.video_id)">删除</div>
                                <div>查看</div>
                            </div> -->
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
                            type="textarea"
                            resize="none"
                            :rows="4"
                            v-model="textarea"
                            @input="listen($event)">
                    </el-input>
                </div>
            </div>
            <div class="disable_dialog_box">
                <div class="disable_dialog_left">类别：</div>
                <div class="disable_dialog_right">
                    <el-radio border v-model="disableDialogRadio" v-for="(item,index) in rejectList" :key="index" :label="item.id" @change="handleSelectReject(item)">{{item.name}}</el-radio>
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
        <el-dialog
                width="470px"
                custom-class="deleteDialog"
                :visible.sync="deleteDialog"
                center>
            <span slot="title" class="deleteDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div class="deleteDialog_box">
                <i class="iconfont icon-warning-circle ibg"></i>
                <p>确定删除吗？</p>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleDelete">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 修改 -->
        <el-dialog :visible.sync="modifyVisible" width="750px" class="frame">
          <div slot="title" class="dialog_delete_head_title">
            <i class="iconfont icon-menu delete_icon"></i>
            <span>修改</span>
          </div>
          <div class="basic_content">
            <div class="modifyTitle">
                <span class="til">标题：</span>
                <el-input v-model="editData.title" placeholder="请输入内容"></el-input>
            </div>
            <div class="lunbo">
                <span class="lunbotil">封面图片：</span>
                <div class="imglist">
                    <el-upload
                        class="avatar-uploader"
                        action="http://test.kslab.com/api/article/null"
                        :show-file-list="false"
                        >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>
            <div class="introduce">
                <span class="inttil">视频详情：</span>
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="editData.description"></el-input>
            </div>
            <!-- <div class="introduce">
                <span class="inttil">活动内容：</span>
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="editData.content"></el-input>
            </div> -->
            <div class="label">
              <span class="babeltil">标签：</span>
                <!-- <div class="babelsmall">
                    <span class="babeltil">标签：</span>
                    <div class="add">
                        <el-input size="small" placeholder="请输入标签名" v-model="tagName"></el-input>
                        <i class="el-icon-plus addi" @click="addTags"></i>
                    </div>
                </div>
                <div class="labellist">
                    <div class="item" v-for="(item,index) in tags" :key="index">
                        <div class="names">{{item.name}}</div>
                        <div class="deletei" style="width:20%;line-height:30px">
                            <i class="el-icon-delete" style="margin:auto;" @click="deleteTags(index)"></i>
                        </div>
                    </div>
                </div>      -->
                <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>
            <div class="label">
                <span class="babeltil">使用零件、软件：</span>
                <div class="tag_tag" v-for="(tag,index) in dynamicTags" :key="index">
                    <el-tag
                      :key="tag"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                      {{tag}}
                    </el-tag>
                    <el-input></el-input>
                </div>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>
            <div class="modifyTitle">
                <span class="til">是否为教程：</span>
                <el-radio-group v-model="courseRadio">
                  <el-radio border :label="1" >是</el-radio>
                  <el-radio border :label="2" >否</el-radio>
                </el-radio-group>
            </div>
            <div class="fujian">
                <span>附件:</span>
                <el-upload
                    class="upload-demo"
                    action="http://test.kslab.com/api/article/null"
                    
                    >
                    <el-button class="btnup" size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip ">只能上传word/ppt文件，且不超过5M</div>
                </el-upload>
            </div>
            <div class="btn3">
                <el-button size="small">取消</el-button>
                <el-button type="primary" size="small" @click="handleSaveModify">保存</el-button>
            </div>
          </div>
          <div class="user_footer" slot="footer">

          </div>
        </el-dialog>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb'

    export default {
        name: "VideoManagement",
        components: {
            BreadCrumb
        },
        data(){
            return{
                // 面包屑
                breadData: [{
                    id: 1,
                    name: '视频',
                    urls: '/index/video/video',
                    icon: 'icon-home'
                }, {
                    id: 2,
                    name: '视频管理',
                    urls: '/index/video/videoManagement',
                    icon: 'icon-home'
                }],

                startTime:null,  //开始时间
                endTime:null,  //结束时间
                topicSearch:'', // 题目搜索
                userNameSearch:'',  // 用户名搜索
                nickNameSearch:'',  // 昵称搜索

                // 表格
                tableData: [],

                editData:{},  //修改数据
                imageUrl:null,
                tagName:null,  //输入标签
                tags:['1','2','3'],  //标签数组
                dialogVisibleg:false, 
                courseRadio:null, //是否为教程

                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: '',

                approve:true,  // 批准
                approveDialog: false,  // 批准弹窗
                deleteDialog:false,  //删除弹框
                disableDialog: false, // 驳回弹窗
                modifyVisible:false,  //修改弹窗
                textarea:'',
                disableDialogRadio: null,
                searchNickName:null,  //昵称搜索
                searchUserName:null,  //用户名搜索
                rejectList:[],  //驳回理由
                selectReject:null, //选择的驳回理由
                videoId:null,  //当前操作的视频ID
                currentPage:1,// 当前页
                pageSize:25,// 每页显示数量
                total:0,// 总记录数
            }
        },
        mounted(){
            console.log(11111111)
            this.getVideoList();
            this.getRejectList();
        },
        methods:{
            //添加标签
            addTags(){},
            // 删除标签
            deleteTags(){},
            // 保存修改
            handleSaveModify(){},
            // 打开修改弹窗
            handleOpenModify(video_id,id){
                console.log(video_id,id)
                // this.modifyVisible = true;
                this.$router.push({
                    path:'/index/video/video-modify',
                    query:{
                        video_id:video_id,
                        id:id
                    }
              })
            },
            listen(e){
                console.log(this.textarea);
            },
            //打开删除弹框
            handleOpendelete(id){
                this.videoId = id;
                this.deleteDialog = true;
            },
            //确认删除
            handleDelete(){
                console.log(this.videoId);
                this.HttpClient.post('/admin/videos/changeStatus',{
                    video_id:this.videoId,
                    status:0
                })
                    .then(res=>{
                        console.log(res);
                        if(res.data.code === 200){
                            this.$message.success(res.data.msg);
                            setTimeout(() => {
                                this.getVideoList();
                            }, 400);
                            this.deleteDialog = false;
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
            },
            //选择驳回理由
            handleSelectReject(i){
                this.selectReject = i;
                console.log(this.selectReject)
            },
            //获取驳回理由
            getRejectList(){
                this.HttpClient.post('/admin/webReview/getList',{
                    type:'upload'
                })
                    .then(res=>{
                        console.log(res);
                        this.rejectList = res.data.data;
                    })
            },
            //获取视频列表
            getVideoList(startTime,endTime,nickname,username){
                this.HttpClient.post('/admin/videos/getList',{
                    page:this.currentPage,
                    size:this.pageSize,
                    start_time:this.startTime,
                    end_time:this.endTime,
                    nickname:this.searchNickName,
                    username:this.searchUserName
                })
                    .then(res=>{
                        console.log(res)
                        this.tableData = res.data.data.data;
                        this.tableData.forEach(item => {
                            item.video_length = Math.ceil(item.video_length/60)
                        });
                        this.total=res.data.data.total
                    })
            },
            //用户名称搜索
            handleSearchUserName(){
                console.log(this.searchUserName);
                this.getVideoList();
            },
            //昵称搜索
            handleSearchNickName(){
                console.log(this.searchNickName)
                this.getVideoList();
            },
            // 选择开始时间
            handleStartTime(e){
                let Month = null,day = null;
                if(e.getMonth()+1<10){
                    Month = '0'+(e.getMonth()+1);
                }else{
                    Month = e.getMonth()+1;
                }
                if(e.getDate()<10){
                    day = '0'+e.getDate();
                }else{
                    day = e.getDate();
                }
                this.startTime = e.getFullYear()+"-"+Month+"-"+day+" "+"00:00:00";
                console.log(this.startTime,this.endTime);
                this.getVideoList();
            },
            // 选择结束时间
            handleEndTime(e){
                console.log(e)
                let Month = null,day = null;
                if(e.getMonth()+1<10){
                    Month = '0'+(e.getMonth()+1);
                }else{
                    Month = e.getMonth()+1;
                }
                if(e.getDate()<10){
                    day = '0'+e.getDate();
                }else{
                    day = e.getDate();
                }
                this.endTime = e.getFullYear()+"-"+Month+"-"+day+" "+"00:00:00";
                console.log(this.startTime,this.endTime)
                this.getVideoList();
            },
            //设置用户名搜索赋值
            search1(e){
                console.log(this.searchUserName)
                if(this.userNameSearch === ''){
                    this.userNameSearch = null;
                }
            },
            //设置昵称搜索赋值
            search2(e){
                console.log(this.searchNickName)
                if(this.nickNameSearch === ''){
                    this.nickNameSearch = null;
                }
            },
            //打开批准弹窗
            handleOpenApprove(id){
              this.approveDialog = true;
              this.videoId = id;
            },
            //打开驳回弹窗
            handleOpenReject(id){
              this.disableDialog = true;
              this.videoId = id;
            },
            // 驳回框确认按钮
            disableBtm(){
                console.log(this.textarea,this.selectReject)
                this.HttpClient.post('/admin/videos/changeStatus',{
                    video_id:this.videoId,
                    status:3,
                    refuse:this.textarea,
                    review_id:this.selectReject.review_id,
                    review_name:this.selectReject.name,
                })
                    .then(res=>{
                        console.log(res);
                        if(res.data.code === 200){
                            this.$message.success(res.data.msg);
                            setTimeout(() => {
                                this.getVideoList();
                            }, 350);
                            this.disableDialog = false;
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
            },
            // 批准框确认按钮
            approveBtm(){
                console.log(this.textarea,this.selectReject)
                this.HttpClient.post('/admin/videos/changeStatus',{
                    video_id:this.videoId,
                    status:1
                })
                    .then(res=>{
                        console.log(res);
                        if(res.data.code === 200){
                            this.$message.success(res.data.msg);
                            setTimeout(() => {
                                this.getVideoList();
                            }, 400);
                            this.approveDialog = false;
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
            },
            //分页
            currentChange(p){
                this.currentPage=p;
                this.getVideoList()
            },

            filterPlate(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            filterSecondary(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },



            handleClose(tag) {
              this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
                this.dynamicTags.push(inputValue);
              }
              this.inputVisible = false;
              this.inputValue = '';
            }
        }
    }
</script>

<style lang="less">
    .videoManagement{
        .bread{
            margin: 10px;
        }
        .video_main::-webkit-scrollbar {display:none}
        .video_main {
            margin-left: 10px;
            margin-top: 10px;
            background: #fff;
            height: calc(100vh - 100px);
            width: calc(100vw - 240px);
            border-radius: 2px;
            overflow-y: auto;

            .video_title {
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
            .video_header{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 30px 25px;

                .video_select{
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
                .video_search{
                    display: flex;
                    align-items: center;
                    >div{
                        margin-left: 30px;
                    }
                }
            }

            /*表格*/
            .video_content{
                padding: 0 30px;
                i{
                    font-size: 20px;
                    color:#fff;
                }
                .el-table{
                    thead{
                        color: #fff;
                        th,tr{
                            background-color: #15bafe;
                        }
                    }
                }

                /*操作按钮*/
                .video_scope{
                    padding: 0;
                    .cell{
                        line-height: unset;
                        .video_btm{
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
    /*修改*/
      .dialog_delete_head_title{
        height: 16px;
        border-bottom: 1px solid #cccccc;
        padding-bottom: 10px;
        text-align: left;
        font-size: 15px;
      }
      .delete_icon{
        color: #15bafe;
        font-size: 18px;
        top: 1px;
        position: relative;
      }
      .modifyTitle{
          display: flex;
          align-items: center;
          margin-top: 15px;
          .til{
              width: 105px;
              text-align: left;
          }
      }
      .introduce{
          display: flex;
          align-items: center;
          margin-top: 15px;
          .inttil{
              width: 105px;
              text-align: left;
          }
      }
      .lunbo{
          text-align: left;
          margin-top: 15px;
          .imglist{
              margin-top: 15px;
              .avatar-uploader{
              .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                box-sizing: border-box;
              }
              .el-upload:hover {
                border-color: #409EFF;
              }
              .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 710px;
                height: 180px;
                line-height: 178px;
                text-align: center;
              }
              .avatar {
                width: 180px;
                height: 180px;
                display: block;
              }
            }
          }
      }
      .label{
          text-align: left;
          margin-top: 15px;
            // .babelsmall{
            //     display: flex;
            //     .add{
            //         position: relative;
            //         .addi{
            //             position: absolute;
            //             top: 15%;
            //             right: 5px;
            //             font-size: 20px;
            //         }
            //         .addi:hover{
            //             position: absolute;
            //             top: 15%;
            //             right: 5px;
            //             font-size: 20px;
            //             background: #15bafe;
            //             color:#fff;
            //         }
            //     }
            // }
            // .labellist{
            //     display: flex;
            //     margin: 15px 0;
            //     .item{
            //         display: flex;
            //         margin-right: 10px;
            //         height: 30px;
            //         border: 1px solid #bfbfbf;
            //         .names{
            //             width: 100%;
            //             line-height: 30px;
            //             padding:0 10px;
            //         }
            //         .deletei:hover{
            //             background: #15bafe;
            //             color:#fff;
            //         }
            //     }
            // }
            .tag_tag{
              display: flex;
              margin-top: 10px;
              .el-input{
                width: 410px;
                height: 32px;
                margin-left: 15px;
                .el-input__inner{
                  height: 32px;
                }
              }
            }
            .el-tag + .el-tag {
              margin-left: 10px;
            }
            .button-new-tag {
              margin-top: 10px;
              height: 32px;
              line-height: 30px;
              padding-top: 0;
              padding-bottom: 0;
            }
            .input-new-tag {
              width: 90px;
              margin-top: 10px;
              vertical-align: bottom;
            }
      }
      .fujian{
          text-align: left;
          .upload-demo{
              position: relative;
                .btnup{
                    position: absolute;
                    top: -15px;
                    left: 42px;
                }
          }
      }
      .btn3{
          text-align: right;
      }
      .deleteDialog_box{
            text-align: center;
            .ibg{
                font-size: 90px;
                color: #15bafe;
            }
      }
    }
</style>
