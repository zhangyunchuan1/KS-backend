<template>
    <div class="FeedbackOpinion">
        <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

        <div class="feedback_main">
            <div class="feedback_title">
                <div class="title">意见反馈</div>
            </div>

            <div class="feedback_header">
                <div class="service_select">
                    <el-select size="mini" class="select_normal" clearable v-model="statusValue" placeholder="状态" @change="getFeedback">
                        <el-option
                                v-for="item in statusOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="feedback_content">

                <el-table
                        :data="opinionData"
                        :border="true"
                        style="width: 100%">
                    <el-table-column
                            label="ID"
                            align="center"
                            width="65"
                            prop="id"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            label="反馈类型"
                            align="center"
                            width="200">
                        <template slot-scope="scope">
                            <p>{{ scope.row.type_name || '无'}}</p>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="内容"
                            align="center"
                            width="280"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <p v-html="scope.row.content || '无'"></p>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="Email"
                            align="center"
                            prop="email"
                            width="180">
                    </el-table-column>

                    <el-table-column
                            label="反馈时间"
                            align="center"
                            width="180"
                            prop="created_at"
                            sortable>
                    </el-table-column>

                    <el-table-column
                            label="状态"
                            align="center"
                            width="130">
                        <template slot-scope="scope">
                            {{scope.row.status===0?'无需回复':scope.row.status===1?'待回复':'已回复'}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            align="center"
                            class-name="feedback_scope">
                        <template slot-scope="scope">
                            <div class="feedback_btm" v-if="scope.row.status===1">
                                <div @click="mailButton(scope.$index)">发邮件</div>
                                <div class="sortout_color" @click="replyButton(scope.row.opinions_id)">无需回复</div>
                            </div>
                            <div class="feedback_btm" v-else>
                                <div>暂无操作</div>
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

        <!--确认框-->
        <el-dialog
                width="470px"
                custom-class="confirmDialog"
                :visible.sync="confirmDialog"
                center>
            <span slot="title" class="confirmDialog_title"><i class="iconfont icon-huaban4"></i></span>
            <div class="confirmDialog_box">
                <i class="iconfont icon-warning-circle"></i>
                <p>确定无需回复吗？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="confirmDialog = false">取 消</el-button>
                    <el-button type="primary" @click="confirmOperation">确 定</el-button>
                </span>
        </el-dialog>

        <!--发邮件-->
        <el-dialog :visible.sync="mailVisible" width="800px" custom-class="mail_visible">
            <div slot="title" class="dialog_head_title">
                <i class="iconfont icon-faxian examine_icon"></i>
                <span>发邮件</span>
            </div>
            <div class="mail_content">
                <div class="mail_title">收件人</div>
                <div class="mail_body">
                    <div class="recipient_email">{{opinionData.length>0?opinionData[index].email:''}}</div>
                </div>
            </div>
            <div class="mail_content">
                <div class="mail_title">模块选择</div>
                <div class="mail_select">
                    <el-radio-group v-model="plateValue">
                        <el-radio-button label="意见反馈"></el-radio-button>
                        <el-radio-button label="商业推广"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="mail_content">
                <div class="mail_title">标题</div>
                <div class="mail_input">
                    <el-input v-model="mailTitle"></el-input>
                </div>
            </div>
            <div class="mail_content">
                <div class="mail_title">内容编辑</div>
                <div class="mail_edit">
                    <span class="mail_title_logo"><i class="iconfont icon-huaban4"></i></span>
                    
                    <div class="mail_edit_body">
                        <el-upload
                            id="xx"
                            class="avatar-uploader up_content"
                            :action="$uploadPath"
                            :data="contentUpData"
                            name="file"
                            :show-file-list="false"
                            :on-success="handleContentSuccess"
                            :before-upload="beforeContentUpload">
                        </el-upload>
                        <quill-editor
                            v-model="content"
                            :options="editorOption"
                            ref="myQuillEditor"
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event,5000)">
                        </quill-editor>
                        <!-- <quill-editor
                                v-model="mailContent"
                                ref="myQuillEditor"
                                :options="editorOption"
                                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                @change="onEditorChange($event)">
                        </quill-editor> -->
                    </div>
                </div>
            </div>
            <div class="user_footer" slot="footer">
                <el-row>
                    <el-button type="primary" class="btn_foot" @click="mailVisible = false">取消</el-button>
                    <el-button type="primary" class="btn_foot" @click="sendMessageFn(opinionData[index].email)">发送</el-button>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
/*************富文本**************/
// region
  import {quillEditor} from 'vue-quill-editor'
  import * as Quill from 'quill'  //引入编辑器
  import moment from 'moment'

  //quill图片可拖拽改变大小
  import ImageResize from 'quill-image-resize-module';

  Quill.register('modules/imageResize', ImageResize);

  //quill图片可拖拽上传
  import {ImageDrop} from 'quill-image-drop-module';

  Quill.register('modules/imageDrop', ImageDrop);

  // 自定义字体大小
  let fontSize = ['10px', '12px', '14px', '16px', '18px', '20px'];
  let Size = Quill.import('attributors/style/size');
  Size.whitelist = fontSize;
  Quill.register(Size, true);

  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif'];
  var Font = Quill.import('formats/font');
  Font.whitelist = fonts; //将字体加入到白名单

  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

  Quill.register('modules/ImageExtend', ImageExtend)

  var toolbarOptions = [
    ['italic', 'underline', 'strike', 'bold'],
    ['blockquote', 'code-block'],
    // [{'header':1},{'header':2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],
    [{'size': fontSize}],
    // [{'header':[1,2,3,4,5,6,false]}],
    [{'color': []}],
    // [{'font':fonts}],
    [{'align': []}],
    // ['clear'],
    ['image']
  ];
  //endregion
  /*************************************/


    import BreadCrumb from '@/components/public/BreadCrumb';

    export default {
        name: "FeedbackOpinion",
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
                        name: '意见反馈',
                        urls: '/index/feedback/feedback-opinion',
                        icon: 'icon-home'
                    }
                ],// 面包屑
                statusOptions:[
                    {id:0,name:'无需回复'},
                    {id:1,name:'待回复'},
                    {id:2,name:'已回复'},
                ],// 状态列表
                // editorOption: {
                //     modules: {
                //         toolbar: [
                //             ['bold', 'italic', 'underline', 'strike'],
                //             ['blockquote', 'code-block']
                //         ]
                //     }
                // },// 富文本工具栏
                /*********************************************************/
      editorOption:{ // 富文本编辑器配置
          modules:{
            toolbar:{
              container: toolbarOptions,
              handlers: {
                'image': function (value) {  // 劫持原来的图片点击按钮事件
                  if (value) {
                    document.querySelector('#xx input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            },
            imageDrop:true,
            imageResize: {
              displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
              },
              modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
            },
            ImageExtend: {
              loading: true,
              name: 'img',
              size:1,
              action: '',
              response: (res) => {
                return res.info
              },
              headers: (xhr) => {
                // xhr.setRequestHeader('myHeader','myValue')
              },  //设置请求头部
              sizeError: () => {
                this.$message.error('图片大小超过限制1M')
              },  // 图片超过大小的回调
              start: () => {},  //自定义开始上传触发事件
              end: () => {},  //自定义上传结束触发的事件，无论成功或者失败
              error: () => {},  //上传失败触发的事件
              success: () => {},  //上传成功触发的事件
              change: (xhr, formData) => {
                // xhr.setRequestHeader('myHeader','myValue')
                // formData.append('token', 'myToken')
              } //每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
            },
          }
        },
        contentUpData: {}, // 上传参数
        content: '', // 富文本编辑内容
      /**********************************************************************************************/
                confirmDialog:false,// 确认弹窗
                mailVisible:false,// 发邮件弹窗
                statusValue:'',// 状态选中值
                plateValue:'',// 板块选中值
                mailTemplate:[],//邮件模板列表
                mailTitle:'',// 邮件标题
                mailContent:'',//邮件内容
                opinionData:[],// 意见数据列表
                id:'',// 意见id
                index:0,// 当前意见下标
                status:null,// 意见状态
                currentPage:1,// 当前页
                pageSize:25,// 每页显示数量
                total:0,// 总记录数
            }
        },
        components:{
            BreadCrumb
        },
        methods:{
             // /**************************文档编辑器*******************/
    //   // region

      /**编辑器**/
      onEditorBlur() {//失去焦点事件
      },
      onEditorFocus() {//获得焦点事件
      },
      onEditorChange(e, decimalNum) {//内容改变事件
        //this.content = event.html
        console.log(this.content)
        let lengthcontent = this.content;
        function removeHTMLTag(str) {
          //var str;
          str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
          str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
          str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
          str = str.replace(/ /ig, '');//去掉
          return str;
        }
        console.log(removeHTMLTag(lengthcontent).length)
        e.quill.deleteText(decimalNum, 1);//保留 strValue 的 前 decimalNum 位字符，
        this.$emit('Quescthon', this.content)
        console.log(this.content);
        const data = this.Tools.getEditorImageAndLength(this.content);
        this.editImageSize = data.imgArray.length;
        console.log(this.modifyData)
        // if (removeHTMLTag(lengthcontent).length < 2000) {
        //   this.modifyData.description = this.content;
        // } else {
        //   this.$message.error('字数超过限制');
        // }
      },
      /****
       * 2019/1/4/004
       * author ZhengXuDong
       * function 富文本上传
       * @param file
       */
      beforeContentUpload(file) {
        // console.log(this.editImageSize)
        // if(this.editImageSize >= 8) {
        //   this.$message.error('图片不能超过8张');
        //   return false;
        // }
        const sizeLimit = file.size / 1024 / 1024 < 10;
        const fileType = file.name.split('.')[1];
        const fileTypeStr = 'jpg,png,jpeg,tiff,tif';
        if(fileTypeStr.indexOf(fileType) < 0) {
          this.$message.error('图片类型只能为'+ fileTypeStr);
          return false;
        }
        if (!sizeLimit) {
          this.$message.error('上传图片大小不能超过 5MB!');
          return false;
        }
        let self = this;
        let render = new FileReader();
        render.readAsDataURL(file);
        return new Promise((resolve,reject) =>{
          render.onload = function () {
            self.contentUpData.token = self.$getQiNiuToken({saveKey:file.name});
            resolve(true)
          };
        });
      },
      /****
       * 2019/1/4/004
       * author ZhengXuDong
       * function 上传描述图片成功,将图片链接加入到文档中
       * @param res
       * @param file
       * @param fileList
       */
      handleContentSuccess(res, file, fileList) {
        console.log(res, file, fileList)
        let quill = this.$refs.myQuillEditor.quill;
        let length = quill.getSelection().index;
        quill.insertEmbed(length, 'image', this.$imagePath + file.response.key)
        quill.setSelection(length + 1)
      },
      // endregion
            //获取反馈列表
            getFeedback(){
                let parameters={
                    page:this.currentPage,
                    size:this.pageSize
                };
                if(this.statusValue!==''){
                    parameters.status=this.statusValue
                }
                this.HttpClient.post('/admin/opinions/lists',parameters)
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.opinionData=res.data.data.data;
                            this.total=res.data.data.total
                        }
                    })
            },
            //反馈状态改变
            changeStatus(status){
                this.HttpClient.post('/admin/opinions/changeStatus',{status,opinions_id:this.id})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            setTimeout(()=>{
                                this.getFeedback()
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            //发邮件按钮事件
            mailButton(index){
                this.mailVisible=true;
                this.index=index;
                this.HttpClient.post('/admin/templates/getList',{type:2})
                    .then(res=>{
                        if(res.data.code===200){
                            this.mailTemplate=res.data.data;
                        }
                    })
            },
            //无需回复按钮事件
            replyButton(id){
                this.id=id;
                this.status=0;
                this.confirmDialog=true;
            },
            //发邮件点击发送
            sendMessageFn(email){
                console.log(this.content)
                let params = {
                    email:email,
                    content:this.content,
                    type:'html'
                }
                this.HttpClient.post('/admin/positionApply/sendEmail',params).then(res => {
                    console.log(res.data)
                    if (code === 200) {
                        this.$message.success(msg)
                        this.mailVisible = false;
                        this.templateTitle = ''
                        this.mailContent = ''
                        setTimeout(() => {
                        this.getMailList()
                        }, 500)
                    } else {
                        this.$message.success(msg)
                    }
                })
                // this.mailVisible = false
            },
            //确认操作
            confirmOperation(){
                this.confirmDialog=false;
                this.changeStatus(this.status)
            },
            //分页
            currentChange(p){
                this.currentPage=p;
                this.getFeedback()
            },
            /*************富文本***************/
            // onEditorBlur() {//失去焦点事件
            // },
            // onEditorFocus() {//获得焦点事件
            // },
            // onEditorChange(event) {//内容改变事件
            //     // this.commentFont = event.html
            // },
        },
        computed:{
            editor(){
                console.log(this.$refs.myQuillEditor.quill);
                return this.$refs.myQuillEditor.quill
            }
        },
        mounted () {
          this.getFeedback()
        }
    }
</script>

<style lang="less">
    .FeedbackOpinion {
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
                justify-content: space-between;
                padding: 30px 25px;

                .feedback_select{
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
                .feedback_search{
                    display: flex;
                    align-items: center;
                    >div{
                        margin-left: 30px;
                    }
                }
            }

            /*表格*/
            .feedback_content{
                padding: 0 30px;
                .el-table{
                    thead{
                        color: #fff;
                        th,tr{
                            background-color: #15bafe;
                        }
                    }
                }

                /*操作按钮*/
                .feedback_scope{
                    padding: 0;
                    .cell{
                        line-height: unset;
                        .feedback_btm{
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

        /*发邮件弹窗*/
        .mail_visible{
            .dialog_head_title{
                text-align: start;
                font-size: 14px;
                border-bottom: 1px solid #f2f2f2;
                padding-bottom: 10px;
            }
            .mail_content{
                display:flex;
                flex-wrap:wrap;
                align-items:center;
                justify-content: flex-start;
                text-align:center;
                margin-bottom:15px;

                .mail_title{
                    width:15%;
                    height:40px;
                    line-height:40px;
                    color:#fff;
                    background:#15bafe;
                    margin-right:10px;
                }
                .mail_body{
                    width:80%;
                    height:40px;
                    line-height:40px;
                    border:1px solid #15bafe;
                    border-radius:3px;
                    box-sizing:border-box;
                }
                .mail_select{
                    width:80%;
                    height:40px;
                    display:flex;
                    justify-content:flex-start;
                    .el-radio-button__orig-radio:checked+.el-radio-button__inner{
                        background-color:#15bafe;
                        border-color:#15bafe;
                    }
                }
                .mail_input{
                    width:80%;
                    .el-input__inner:focus{
                        border-color:#15bafe;
                    }
                }
                .mail_edit{
                    position:relative;
                    width:100%;
                    min-height:231px;
                    margin-top:15px;
                    border:1px solid #ccc;
                    text-align:left;
                    .mail_title_logo{
                        display: flex;
                        align-items: center;
                        position: relative;
                        top: 5px;
                        padding-left: 10px;
                        .icon-huaban4{
                        margin:5px 0 0 5px;
                        font-size:20px;
                        color:#15bafe;
                    }
                    }
                
                    .mail_edit_body{
                        // margin-top:15px;
                        // height:192px;

                        //富文本
                        .ql-toolbar.ql-snow{
                            border-left:none;
                            border-right:none;
                        }
                        .ql-container.ql-snow{
                            border-left:none;
                            border-right:none;
                            border-bottom:none;
                            height:150px;
                        }
                    }
                    .mail_basic_info{
                        position:absolute;
                        bottom:0;
                        left:0;
                        width:50%;
                        display:flex;
                        flex-wrap:wrap;
                        align-items:center;
                        justify-content:flex-start;

                        .basic_info_item{
                            color:#fff;
                            font-size:14px;
                            background:#15bafe;
                            padding:5px 10px;
                            border:1px solid #ccc;
                            box-sizing:border-box;
                        }
                        .basic_info_item:first-child{
                            width:60%;
                        }
                        .basic_info_item:nth-child(2){
                            width:40%;
                            padding:6.5px 10px;
                        }
                        .basic_info_item:nth-child(3){
                            width:70%;
                        }
                        .basic_info_item:last-child{
                            width:30%;
                        }
                    }
                }
            }
        }
    }
</style>
