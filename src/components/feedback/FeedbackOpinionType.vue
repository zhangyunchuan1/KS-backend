<template>
    <div class="FeedbackOpinionType">
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

        <div class="feedback_main">
            <div class="feedback_title">
                <div class="title">意见反馈类型</div>
            </div>

            <div class="feedback_header">
                <div>现有类型</div>
                <el-button @click="addButton">添加新类型</el-button>
            </div>

            <div class="feedback_content">
                <div class="feedback_type_list">
                    <div class="feedback_type" v-for="item in feedbackData" :key="item.id">
                        <div class="feedback_type_name">{{item.name}}</div>
                        <el-button type="danger" class="feed_type_delete" @click="deleteButton(item.id)">删除</el-button>
                    </div>
                </div>
            </div>
        </div>

        <!--新增反馈类型-->
        <el-dialog :visible.sync="addVisible" width="420px">
            <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-edit-square delete_icon"></i>
                <span>新增</span>
            </div>
            <div class="modify">
                <span>名称：</span>
                <el-input placeholder="输入新名称" v-model="newName" @keyup.13.native="addNewType"></el-input>
            </div>
            <div class="btn">
                <el-button @click="addVisible=false">取消</el-button>
                <el-button type="primary" @click="addNewType">保存</el-button>
            </div>
        </el-dialog>

        <!--删除确认框-->
        <delete-modal ref="delete" @doDelete="confirmDelete"></delete-modal>
    </div>
</template>

<script>

    import BreadCrumb from '@/components/public/BreadCrumb';
    import DeleteModal from '@/components/public/modalDelete';

    export default {
        name: "FeedbackOpinionType",
        data(){
            return {
                breadData: [
                    {
                        id: 1,
                        name: '提出意见',
                        urls: '/index/feedback/feedback',
                        icon: 'icon-home'
                    }, {
                        id: 2,
                        name: '意见反馈类型',
                        urls: '/index/feedback/feedback-opinion-type',
                        icon: 'icon-home'
                    }
                ],// 面包屑
                addVisible:false,// 新增弹窗
                feedbackData:[],// 反馈列表
                newName:'',// 新增类型名称
                id:'',//反馈类型id
            }
        },
        components:{
            BreadCrumb,
            DeleteModal
        },
        methods:{
            //获取意见反馈类型
            getFeedbackType(){
                this.HttpClient.post('/admin/opinionsType/lists')
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.feedbackData=res.data.data;
                        }
                    })
            },
            //新增反馈类型
            addNewType(){
                this.HttpClient.post('/admin/opinionsType/create',{name:this.newName})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.newName='';
                            this.addVisible=false;
                            setTimeout(()=>{
                                this.getFeedbackType();
                            },500)
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
            },
            //删除按钮事件
            deleteButton(id){
                this.id=id;
                this.$refs.delete.deleteDialog=true;
            },
            //确认删除
            confirmDelete(bool){
                if(bool){
                    this.HttpClient.post('/admin/opinionsType/destroy',{id:this.id})
                        .then(res=>{
                            console.log(res);
                            if(res.data.code===200){
                                this.$message.success(res.data.msg);
                                setTimeout(()=>{
                                    this.getFeedbackType()
                                },500)
                            }else{
                                this.$message.error(res.data.msg)
                            }
                        })
                }

            },
            //新增类型按钮事件
            addButton(){
                this.addVisible=true;
            },

        },
        created(){
            this.getFeedbackType()
        }
    }
</script>

<style lang="less">
    .FeedbackOpinionType {
        .bread {
            margin: 10px;
        }
      .feedback_main::-webkit-scrollbar {display:none}
        .feedback_main {
            margin-left: 10px;
            margin-top: 10px;
            background: #fff;
            height: calc(100vh - 100px);
            width: calc(100vw - 240px);
            border-radius: 2px;
          overflow-y: auto;

            .feedback_title {
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
            .feedback_header{
                display: flex;
                align-items: center;
                padding: 30px 25px;
                .el-button{
                    margin-left: 20px;
                }
            }

            .feedback_content{
                padding:0px 0 30px 30px;
                // border:1px solid #ccc;
                min-height:250px;
                .feedback_type_list{
                    display:flex;
                    flex-wrap:wrap;
                    align-items:center;
                    justify-content:flex-start;

                    .feedback_type{
                        width:150px;
                        display:flex;
                        justify-content:flex-start;
                        font-size:14px;
                        margin-right:15px;
                        margin-bottom:10px;

                        .feedback_type_name{
                            width:80%;
                            line-height:40px;
                            border:1px solid #dedede;
                            // color:#fff;
                            // background:#15bafe;
                            /*padding:5px 10px;*/
                            border-top-left-radius:3px;
                            border-bottom-left-radius:3px;
                            box-sizing:border-box;
                        }
                        .el-button{
                            color:#fff;
                            // background:#f55959;
                            padding:12px 8px;
                            // border:1px solid #f55959;
                            border-top-left-radius:0;
                            border-bottom-left-radius:0;
                        }
                        .el-button:active{
                            border-color:#15bafe;
                        }
                    }
                }
            }
        }

        /**新增弹窗**/
        .dialog_delete_head_title{
            height: 16px;
            border-bottom: 1px solid #cccccc;
            padding-bottom: 10px;
            text-align: left;
            font-size: 15px;
            color: #a2a2a2;
        }
        .delete_icon{
            color: #15bafe;
            font-size: 18px;
            top: 1px;
            position: relative;
        }
        .btn{
            display: flex;
            justify-content:flex-end;
            margin-top: 30px;
            margin-bottom: 10px;
        }
        .modify{
            .el-input{
                width: 245px;
                .el-input__inner{
                    height: 30px;
                    border-radius: 0;
                }
            }
        }
    }
</style>
