<template>
    <div class="uploading_main_item uploading_main_file">
        <div class="main_head">
            <i class="icon icon_accessory"></i>
            <span class="main_txt">附件</span>
            <span class="main_txt_describe">(选填，最多5个，每个最大5MB)</span>
        </div>
        <el-upload
                drag
                multiple
                class="main_file_upload"
                :action="$uploadPath"
                :data="updata"
                :file-list="urlfile"
                list-type="picture-card"
                :limit="5"
                :on-preview="handleFileCardPreview"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :on-change="handleChange"
                :on-success="handleSuccess"
                :on-error="handleError"
                :before-upload="beforeFileUpload"
                :before-remove="beforeImageRemove">
            <div class="uploading_tips" @dragover.prevent="onDragover" @dragleave="dragLeave">
                <i class="el-icon-plus" v-show="!dragOver"></i>
                <div class="el-upload__text" v-show="!dragOver">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__txt" v-show="dragOver && !dragDone">松开文件上传</div>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>


    export default {
        name: "uploadingMainFile",
        props:['http','attachments','compile','info'],
        data(){
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                ImgFlag: false,
                imageUpData: {}, // 附件上传参数
                imageRelFileList: [], // 存储真实的文件路径数组
                beforeImageFileList:[],// 上传之后，删除之前的fileList
                dragOver:false,
                dragDone:false,
                updata:{
                    token:window.sessionStorage.token
                },
                dataNuberm:Number(new Date()),
                urlfile:[],//附件展示列表
                source_id:'',//商品id
                type:1,//商品编辑，上传标识(1：上传,2：编辑)
                // serial_number:'',//商品批次号
                source:'',//来源页面
            }
        },
        methods:{
            /************************************附件上传**********************************/
            /****
             *modification AMZ
             *date 2019/1/8
             *function 图片删除
             */
            handleRemove(file, fileList) {
                console.log(file);
                console.log(this.urlfile);
                // if(this.$route.query.id) {
                //     this.HttpClient.post('/updateDelete', {path: file.url})
                //         .then(res =>{
                //             let index=null;
                //             this.urlfile.map((item,i)=>{
                //                 if(item.url===file.url){
                //                     index=i
                //                 }
                //             });
                //             if(res.data.code===200){
                //                 this.$message.success(res.data.msg);
                //                 this.urlfile.splice(index,1);
                //                 if(fileList.length<=0){
                //                     this.dragOver=false;
                //                 }
                //             }else{
                //                 this.$message.error('删除失败，请重试！');
                //                 fileList.splice(index,0,file)
                //             }
                //         })
                // }else {
                //     this.HttpClient.post('/services/destroyFile',{url:file.url})
                //         .then((res) => {
                //             console.log(res);
                //             let index=null;
                //             this.urlfile.map((item,i)=>{
                //                 if(item.url===file.url){
                //                     index=i
                //                 }
                //             });
                //             if(res.data.code===200){
                //                 this.$message.success(res.data.msg);
                //                 this.urlfile.splice(index,1);
                //                 if(fileList.length<=0){
                //                     this.dragOver=false;
                //                 }
                //             }else{
                //                 this.$message.error('删除失败，请重试！');
                //                 fileList.splice(index,0,file)
                //             }
                //         });
                // }

            },
            handleFileCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleChange(file,fileList){
                if(fileList.length>0){
                    this.dragOver=true;
                    this.dragDone=true;
                }else{
                    this.dragOver=false;
                    this.dragDone=false;
                }
            },
            /****
             *modification AMZ
             *date 2019/1/8
             *function 附件上传前
             */
            beforeFileUpload(file){
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {
                    this.$message.error('上传文件大小不能超过5M!');
                    return false;
                }
                let self = this;
                let render = new FileReader();
                render.readAsDataURL(file);
                return new Promise((resolve,reject) =>{
                    render.onload = function () {
                        self.updata.token = self.$getQiNiuToken({saveKey:file.name});
                        resolve(true)
                    };
                });
                // var _this = this;
                // if(this.source==='question'){
                //     console.log(this.serial_number);
                //     var questionFromData = new FormData();
                //     questionFromData.append('images',file);
                //     questionFromData.append('token',window.localStorage.token);
                //     questionFromData.append('serialnum',this.serial_number);
                //     this.$ajax.post(this.request.axiosPort+this.request.axiosApi+'questions/upload',questionFromData)
                //         .then(res=>{
                //             console.log(res);
                //             if(res.data.code===200){
                //                 this.$message.success(res.data.msg);
                //                 this.urlfile.push({url:res.data.path});
                //                 this.$emit('uploadMinFile',1)
                //             }else{
                //                 this.$message.error('上传失败，请重试！')
                //             }
                //
                //         });
                //     return false;
                // }
                // if(this.$route.query.videoData){
                //     var videoFromData = new FormData()
                //     videoFromData.append('attachment',file)
                //     videoFromData.append('token',window.localStorage.token)
                //     videoFromData.append('serial_number',this.$route.query.videoData)
                //     console.log(videoFromData)
                //     this.$ajax.post(this.request.axiosPort+this.request.axiosApi+'videos/upload/attachment',videoFromData)
                //         .then((res) => {
                //             this.urlfile.push({url:res.data.path})
                //             console.log(this.urlfile)
                //         })
                // }else if(this.$route.query.articleid){
                //     var videoFromData = new FormData()
                //     videoFromData.append('attachment',file)
                //     videoFromData.append('token',window.localStorage.token)
                //     videoFromData.append('serial_number',this.$route.query.articleid)
                //     console.log(videoFromData)
                //     this.$ajax.post(this.request.axiosPort+this.request.axiosApi+'article/uploadattachment',videoFromData)
                //         .then((res) => {
                //             console.log(res)
                //             this.urlfile.push({url:res.data.path})
                //             console.log(this.urlfile)
                //             // res.data.path
                //         })
                // }
                // else{
                //     this.videoSum = Number(new Date())
                //     var uploading_File = new FormData();
                //     uploading_File.append('attachment',file)
                //     uploading_File.append('token',window.localStorage.token)
                //     uploading_File.append('serial_number',this.dataNuberm)
                //     // console.log(this.$store.state.RouterVuex)
                //     if(this.$store.state.RouterVuex == '/home/uploadingEncyclopedia'){
                //         this.$ajax.post(this.request.axiosPort+this.request.axiosApi+'encyclopedias/uploadattachment',uploading_File)
                //             .then((res) => {
                //                 this.urlfile.push({url:res.data.path});
                //                 this.$emit('uploadingEncy',res.data.path)
                //             })
                //     }
                //     else if(this.$store.state.RouterVuex == '/home/uploadingArticle'){
                //         this.$ajax.post(this.request.axiosPort+this.request.axiosApi+'article/uploadattachment',uploading_File)
                //             .then((res)=>{
                //                 console.log(res);
                //                 // this.Fileattachment = res.data.path
                //                 this.urlfile.push({url:res.data.path});
                //                 console.log(this.dataNuberm);
                //                 this.$emit('uploadMinFile',this.dataNuberm)
                //             })
                //     }
                //     else if(this.$store.state.RouterVuex == '/home/uploadingVideo'){
                //         this.$ajax.post(this.request.axiosPort+this.request.axiosApi+'videos/upload/attachment',uploading_File)
                //             .then((res)=>{
                //                 console.log(this.attachments);
                //                 console.log(res);
                //                 // this.Fileattachment = res.data.path
                //                 this.urlfile.push({url:res.data.path});
                //                 this.$emit('uploadMinFile',this.dataNuberm)
                //             })
                //     }else{
                //         uploading_File.append('type',this.type);
                //         uploading_File.append('id',this.source_id);
                //         uploading_File.append('serial_number',this.serial_number);
                //         this.$ajax.post(this.request.axiosPort+this.request.axiosApi+'products/uploadAttachment',uploading_File)
                //             .then((res)=>{
                //                 console.log(res);
                //                 // this.Fileattachment = res.data.path;
                //                 this.urlfile.push({url:res.data.path})
                //                 // this.$emit('uploadMinFile',this.dataNuberm)
                //             })
                //     }
                // }
            },
            /****
             *modification AMZ
             *date 2019/1/8
             *function 附件上传成功
             */
            handleSuccess(response, file, fileList){
                this.$message.success('上传成功!');
                this.urlfile = fileList;
                this.imageRelFileList.push({
                    name: file.name,
                    path: this.$imagePath + file.response.key
                });
                this.beforeImageFileList = fileList;
                this.dialogImageUrl = this.$imagePath + file.response.key;
                this.$emit('uploadMinFile',this.imageRelFileList);
                console.log(this.imageRelFileList);
            },
            handleError(err, file, fileList){
                this.$message.error('上传失败！');
                console.log(file);
            },
            /****
             *author AMZ
             *date 2019/1/8
             *function 图片删除前
             */
            beforeImageRemove(file, fileList) {
                let self = this;
                if(file.status === 'success') {
                    let index = this.beforeImageFileList.map(item => item.name).indexOf(file.name);
                    let urls = this.imageRelFileList[index].path;
                    console.log(urls);
                    if (this.source_id) {
                        this.$message.success('删除成功!');
                        this.imageRelFileList.splice(index, 1);
                        this.$emit('uploadMinFile',this.imageRelFileList);
                        if(this.imageRelFileList.length<=0){
                            this.dragOver=false;
                            this.dragDone=false
                        }
                    } else {
                        return new Promise((resolve, reject) =>{
                            self.HttpClient.post('/services/destroyFile', {url: urls}).then(res => {
                                if (res.data.code === 200) {
                                    this.$message.success(res.data.msg);
                                    self.imageRelFileList.splice(index, 1);
                                    self.$emit('uploadMinFile',this.imageRelFileList);
                                    if(self.imageRelFileList.length<=0){
                                        self.dragOver=false;
                                        self.dragDone=false
                                    }
                                    resolve(true)
                                } else {
                                    self.$message.error('删除失败');
                                    resolve(false)
                                }
                            });
                        });
                    }
                }
            },
            onDragover(){
                this.dragOver=true;
            },
            dragLeave(){
                this.dragOver=false;
            }
        },
        created(){
            // this.source=this.info.source;
            // this.serial_number=this.info.serial_number;
        },
        watch:{
            compile: {
                handler() {
                    if (this.compile && this.compile.length > 0) {
                        console.log(this.compile);
                        this.urlfile = this.compile;
                        this.compile.map(item => {
                            this.imageRelFileList.push({name: item.name, path:item.url})
                        });
                        this.beforeImageFileList = this.urlfile
                    } else {
                        this.urlfile = []
                    }
                    if (this.urlfile.length > 0) {
                        this.dragOver = true;
                        this.dragDone = true;
                    }
                    console.log(this.compile);
                    // for(var i=0;i<this.compile;i++){
                    //   console.log(this.compile[i].path)
                    //
                    // }
                    // console.log(this.compile[0].path)
                    // console.log(this.urlfile)
                },
                deep:true
            },
            info:{
                handler(){
                    if(this.info){
                        this.type=this.info.type;
                        this.source_id=this.info.source_id;
                        this.source=this.info.source
                    }
                },
                deep:true,
                immediate: true
            }
        }
    }
</script>

<style scoped>
    .uploading_main_file .icon{
        width:20px;
        height:20px;
        vertical-align:middle;
    }
    .uploading_main_file .main_txt{
        font-size:16px;
        font-weight:800;
    }
    .uploading_main_file .main_head{
        margin-bottom:7px;
    }
</style>
