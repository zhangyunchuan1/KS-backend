<template>
    <div class="reptile_user">
        <!--面包屑-->
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
        <!--主体内容-->
        <div class="productReview_main">
            <!--标题-->
            <div class="title">
                <p>爬虫用户管理</p>
            </div>

            <div class="content">
                <div class="content_main">
                        <el-button type="primary" @click="accountDetailsDialog = true"><i class="el-icon-plus"></i>新增爬虫用户</el-button>
                    <div class="content_table">
                        <el-table
                                :data="tableData"
                                :border="true"
                                style="width:100%">
                            <el-table-column
                                    label="爬虫用户ID"
                                    align="center"
                                    width="120"
                                    prop="id"
                                    sortable>
                            </el-table-column>

                            <el-table-column
                                    label="用户昵称"
                                    align="center"
                                    width="200"
                                    show-overflow-tooltip
                                    prop="nickname">
                            </el-table-column>
                            
                            <el-table-column
                                    label="用户账户"
                                    align="center"
                                    width="130"
                                    prop="username"
                                    show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                                    label="用户类型"
                                    align="center"
                                    width="160"
                                    show-overflow-tooltip
                                    prop="type">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.type === 0">系统注册</span>
                                        <span v-if="scope.row.type === 1">个人注册</span>
                                        <span v-if="scope.row.type === 2">公司注册</span>
                                        <span v-if="scope.row.type === 3">普通商家</span>
                                    </template>
                            </el-table-column>
                            <el-table-column
                                    label="状态"
                                    align="center"
                                    width="120"
                                    show-overflow-tooltip
                                    prop="status">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.status === 0">已删除</span>
                                        <span v-if="scope.row.status === 1">正常</span>
                                        <span v-if="scope.row.status === 2">注销</span>
                                        <span v-if="scope.row.status === 3">禁用</span>
                                        <span v-if="scope.row.status === 4">待审核</span>
                                        <span v-if="scope.row.status === 5">驳回</span>
                                        <span v-if="scope.row.status === 6">未通过</span>
                                    </template>
                            </el-table-column>

                            <el-table-column
                                label="操作"
                                align="center"
                                min-width="150"
                                fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="primary" plain size="mini" v-if="scope.row.status === 3" @click="handleRecovery(scope.row.id)">恢复</el-button>
                                    <el-button type="primary" plain size="mini" v-if="scope.row.status === 1" @click="handleProhibit(scope.row.uid)">禁用</el-button>
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
        <!-- 新增爬虫用户弹窗 -->
        <el-dialog
            width="400px"
            custom-class="accountDetailsDialog"
            :visible.sync="accountDetailsDialog">
            <span slot="title" class="accountDetailsDialog_title">
                <i class="el-icon-plus"></i>新增用户
            </span>
            <div class="accountDetails_dialog_box">
                <div class="content_list">
                    <p>用户昵称</p>
                    <el-input v-model="nickname"></el-input>
                </div>
                <div class="content_list_avatar">
                    <p>用户头像</p>
                    <el-upload
                        class="avatar-uploader"
                        action="customize"
                        :show-file-list="false"
                        :auto-upload="true"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :http-request="defaultBehavior">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="content_list">
                    <p>用户账号</p>
                    <el-input v-model="username"></el-input>
                </div>
                <div class="content_list">
                    <p>用户密码</p>
                    <el-input v-model="password" type="password"></el-input>
                </div>
                <div class="content_list">
                    <p>用户类型</p>
                    <el-radio-group v-model="userType">
                        <el-radio-button label="1">普通商家</el-radio-button>
                        <el-radio-button label="2">专业商家</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="foot_btn">
                <el-button>取 消</el-button>
                <el-button type="primary" @click="handleAddUser">保 存</el-button>
            </div>
        </el-dialog>
        <!--禁用弹窗-->
        <el-dialog
        width="580px"
        custom-class="disableDialog"
        :visible.sync="disableDialog">
        <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>禁用</span>
        <div class="disableDialog_main">
            <div class="disableDialog_left">
                <div class="disable_dialog_box">
                    <div class="disable_dialog_left">理由：</div>
                    <div class="disable_dialog_right">
                    <el-input
                        type="textarea"
                        resize="none"
                        v-model="textarea"
                        :rows="4">
                    </el-input>
                    </div>
                </div>
                <div class="disable_dialog_box">
                    <div class="disable_dialog_left">类别：</div>
                    <div class="disable_dialog_right">
                        <el-radio border v-model="disableDialogRadio" v-for="(item,index) in examineList" :label="item" :key="index">{{item.name}}</el-radio>
                    </div>
                </div>
            </div>
            <div class="disableDialog_right">
                <p>上传截图：</p>
                <el-upload
                    class="screenshot-uploader"
                    action="customize"
                    :show-file-list="false"
                    :auto-upload="true"
                    :before-upload="beforeProhibitUpload"
                    :http-request="defaultBehavior">
                    <img v-if="prohibitImageUrl" :src="prohibitImageUrl" class="screenshot">
                    <i v-else class="el-icon-plus screenshot-uploader-icon"></i>
                </el-upload>
                <p>禁用天数：</p>
                <el-input type="number" v-model="disableDay"></el-input>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button >取 消</el-button>
            <el-button type="primary" @click="handleSureProhibit">确 定</el-button>
        </span>
        </el-dialog>
        <!--恢复弹窗-->
        <el-dialog
        width="400px"
        custom-class="restoreDialog"
        :visible.sync="restoreDialog">
        <span slot="title" class="restoreDialog_title"><i class="iconfont icon-huifu"></i>恢复</span>
        <div class="restore_dialog_box">
            <i class="iconfont icon-warning-circle"></i>
            <p>确认恢复吗？</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="restoreDialog = false">关 闭</el-button>
            <el-button type="primary" @click="handleSureRecovery">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/public/BreadCrumb';

    export default {
        name: "ReptileUser",
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
                    name: '爬虫用戶管理',
                    urls: '/index/market/marketProduct/MarketProduct',
                    icon: 'icon-home'
                }
                ],
                tableData:[],
                accountDetailsDialog:false,
                imageUrl:'',
                username:'',
                password:'',
                nickname:'',
                userType:'',
                disableDialog:false,
                examineList:[],  //禁用类别数组
                textarea:'',  //禁用理由
                disableDialogRadio:null,  //禁用类别
                prohibitImageUrl:'',  //禁用截图
                disableDay:null,  //禁用天数
                restoreDialog:false,
                userID:null,
                //分页
                total:null,
                currentPage:1
            }
        },
        mounted(){
            this.getSearchList();
        },
        methods:{
            //确认恢复
            handleSureRecovery(){
                this.HttpClient.post("/admin/reptileUser/updateStatus", {
                    id:this.userID,
                    status:1
                }).then(res => {
                    console.log(res);
                    if (res.data.code === 200) {
                        this.$message.success(res.data.msg);
                        setTimeout(() => {
                            this.getSearchList();
                        }, 500);
                        this.restoreDialog = false;
                    }
                })
            },
            //恢复
            handleRecovery(id){
                this.userID = id;
                this.restoreDialog = true;
            },
            //确定禁用
            handleSureProhibit(){
                console.log(this.textarea,this.disableDialogRadio,this.prohibitImageUrl);
                var str = "";
                this.examineList.forEach(e => {
                    if (e.review_id == this.disableDialogRadio.review_id) {
                    str = e.name;
                    }
                });
                let params = {
                    uid:this.userID,
                    content: this.textarea,
                    limit_day: this.disableDay,
                    review_id: this.disableDialogRadio.review_id,
                    review_name: str,
                    images: this.prohibitImageUrl
                };
                this.HttpClient.post("/admin/forbidden/create", params).then(res => {
                    console.log(res.data);
                    if (res.data.code === 200) {
                        this.$message.success("操作成功");
                        setTimeout(() => {
                            this.getSearchList();
                        }, 500);
                        this.disableDialog = false;
                    }
                });
            },
            //禁用
            handleProhibit(id){
                this.userID = id;
                this.disableDialog = true;
                this.getdisableData();
            },
            // 获取审核信息
            getdisableData() {
            this.HttpClient.post("/admin/webReview/getList", {
                type: "business"
            }).then(res => {
                if (res.data.code == 200) {
                this.examineList = res.data.data;
                console.log(this.examineList)
                }
            });
            },
            //确定新增爬虫用户
            handleAddUser(){
                console.log(this.username,this.password,this.nickname,this.userType);
                this.HttpClient.post("/admin/reptileUser/create", {
                    username:this.username,
                    password:this.password,
                    nickname:this.nickname,
                    avatar:this.imageUrl,
                    type:this.userType
                }).then(res => {
                    console.log(res);
                    if(res.data.code === 200){
                        this.$message.success(res.data.msg);
                        setTimeout(() => {
                            this.getSearchList();
                        }, 500);
                        this.accountDetailsDialog = false;
                        this.username = '';
                        this.password = '';
                        this.nickname = '';
                        this.imageUrl = '';
                        this.userType = '';
                    }else{
                        this.$message.warning(res.data.msg);
                    }
                })
            },
            //获取问题爬虫列表
            getSearchList(){
                this.HttpClient.post("/admin/reptileUser/lists", {
                    pagSize:15,
                    page:this.currentPage
                }).then(res => {
                    console.log(res);
                    this.tableData = res.data.data.data;
                    this.total = res.data.data.total;
                })
            },
            //分页
            currentChange(p){
                this.currentPage=p;
                this.getSearchList();
            },
            filterSecondary(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file,filelist) {
                if(this.Tools.pictureLimit(file)){
                    filelist = []; 
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
                        // that.addUserData.image_path = that.Urls.imageUrl+res.key;
                        }
                    })
                }else{
                    this.$message.warning('请上传下面格式图片：jpg/png/jpeg/tiff/tif。');
                }  
            },
            //上传截图
            beforeProhibitUpload(file,filelist){
                if(this.Tools.pictureLimit(file)){
                    filelist = []; 
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
                        that.prohibitImageUrl = that.Urls.imageUrl+res.key;
                        // that.addUserData.image_path = that.Urls.imageUrl+res.key;
                        }
                    })
                }else{
                    this.$message.warning('请上传下面格式图片：jpg/png/jpeg/tiff/tif。');
                }  
            },
            //用于覆盖element默认上传
            defaultBehavior(param){},
        },
    }
</script>

<style lang="less">
    .reptile_user{
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
                        margin-top: 15px;
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
        .accountDetailsDialog {
            .el-dialog__body {
            padding-top: 0;
            padding-bottom: 20px;
            .foot_btn{
                text-align: right;
                margin-top: 10px;
            }
            }
            .accountDetailsDialog_title {
            display: flex;
            border-bottom: 1px solid #e8e8e8;
            padding-bottom: 10px;
            i {
                margin-right: 10px;
                color: #15bafe;
                font-size: 18px;
            }
            }
            .accountDetails_dialog_box {
            .content_list {
                display: flex;
                align-items: center;
                height: 40px;
                text-align: center;
                margin-top: 10px;
                p {
                background: #15bafe;
                color: #fff;
                height: 100%;
                width: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 1;
                }
                .el-input{
                    width: 260px;
                }
                .el-radio-group{
                    margin-left: 15px;
                    margin-right: 50px;
                }
            }
            .content_list_avatar{
                    display: flex;
                    align-items: center;
                    height: 100px;
                    text-align: center;
                    margin-top: 10px;
                p {
                    background: #15bafe;
                    color: #fff;
                    height: 40px;
                    width: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .avatar-uploader{
                    margin-left: 20px;
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
                        width: 100px;
                        height: 100px;
                        line-height: 100px;
                        text-align: center;
                    }
                    .avatar {
                        width: 100px;
                        height: 100px;
                        display: block;
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
    /*驳回弹窗*/
    .disableDialog{
      .disableDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }

      .disableDialog_main{
        display: flex;
        align-items: flex-start;
        /*左侧内容*/
        .disableDialog_left{
          margin-right: 15px;
          .disable_dialog_box:not(:last-child){
            margin-bottom: 20px;
          }
          .disable_dialog_box{
            display: flex;
            align-items: flex-start;
            justify-content: center;
            .disable_dialog_left{
              min-width: 60px;
              text-align: right;
            }
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
                margin: 5px auto;
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

        /*右侧截图*/
        .disableDialog_right{
          height: 100%;
          .screenshot-uploader{
            margin-top: 10px;
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
            .screenshot-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 178px;
              height: 178px;
              line-height: 178px;
              text-align: center;
            }
            .screenshot {
              width: 178px;
              height: 178px;
              display: block;
            }
          }
          .el-input{
              margin-top: 10px;
              .el-input__inner{
                  padding-left: 15px;
              }
          }
        }
      }
    }
    .restoreDialog{
      .el-dialog__body{
        padding-top: 0;
        padding-bottom: 15px;
      }
      .restoreDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
          color: #15bafe;
          font-size: 18px;
        }
      }
      .restore_dialog_box{
        text-align: center;
        i{
          font-size: 90px;
          color: #15bafe;
        }
        p{
          margin-top: 15px;
        }
      }
      .dialog-footer{
        a{
          color: #606266;
          text-decoration: none;
        }
      }
    }
</style>
