<template>
    <div class="productModify">
        <!--主体内容-->
        <div class="productModify_main">
            <!--标题-->
            <div class="title">
                <p>商品修改</p>
            </div>

            <div class="productModify_content">
                <div class="productModify_list">
                    <div class="list_title">商品名称</div>
                    <el-input class="list_main" v-model="updateInfo.title"></el-input>
                </div>

                <div class="productModify_list">
                    <div class="list_title">标签</div>
                    <div class="list_tags" v-for="(item,index) in tags" :key="index">
                        <p @click="updateTag(index)">{{item}}</p>
                        <span @click="deleteButton(index)"></span>
                    </div>
                </div>

                <div class="productModify_list richText">
                    <div class="list_title">商品详情</div>
                    <!-- <el-input type="textarea" resize="none" class="list_textarea" v-model="updateInfo.description"></el-input> -->
                    <quill-editor
                        v-model="updateInfo.description"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                </div>

                <div class="productModify_list">
                    <div class="list_title">轮播图</div>
                    <div class="list_uploadImg">
                        <el-upload
                                action="/"
                                list-type="picture-card"
                                :before-upload="imageUpload"
                                :on-preview="handlePictureCardPreview"
                                :file-list="picture"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div>

                <div class="productModify_list">
                    <div class="list_title">视频</div>
                    <div class="list_uploadVideo">
                        <el-upload
                                class="video-uploader"
                                action="/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="videoUpload">
                            <video controls v-if="videoUrl" :src="videoUrl" class="videoView"></video>
                            <i v-else class="el-icon-plus video-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>

                <div class="productModify_list">
                    <div class="list_title">附件</div>
                    <div class="list_uploadList">
                        <el-upload
                                class="upload-demo"
                                action="/"
                                :before-upload="fileUpload"
                                :on-preview="listHandlePreview"
                                :on-remove="listHandleRemove"
                                :file-list="attachment"
                                list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </div>


                <div class="productModify_list">
                    <div class="list_title">产品属性</div>
                    <div class="list_attributes">
                        <div class="attributes_box" v-for="(item,index) in property" :key="item.id">
                            <div class="attributes_title">{{item.property_name}}</div>
                            <div v-if="item.rule===1">
                                <el-radio-group
                                        v-model="item.radioSelect"
                                        class="brandList"
                                        @change="updateProperty(index,item)">
                                    <el-radio border :label="tmp.pc_id" v-for="tmp in item.values" :key="tmp.pc_id">{{tmp.value}}</el-radio>
                                </el-radio-group>
                            </div>
                            <div v-else-if="item.rule===2">
                                <el-checkbox-group
                                        v-model="item.checkList"
                                        @change="updateProperty(index,item)">
                                    <el-checkbox border :label="tmp.pc_id" v-for="tmp in item.values" :key="tmp.pc_id">{{tmp.value}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div v-else-if="item.rule===3">
                                <el-input
                                        v-model="item.intValue"
                                        @change="updateProperty(index,item)">
                                </el-input>
                                <span>{{item.values}}</span>
                                <!--<el-select v-model="item.unit" placeholder="请选择单位" @change="updateProperty(index,item)">-->
                                    <!--<el-option-->
                                            <!--v-for="tmp in item.values"-->
                                            <!--:key="tmp.pc_id"-->
                                            <!--:label="tmp.value"-->
                                            <!--:value="tmp.pc_id">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            </div>
                            <div v-else>
                                <el-input
                                        v-model="item.floatValue"
                                        @change="updateProperty(index,item.property_id,item.category_id,item.floatValue)">
                                </el-input>
                            </div>
                        </div>

                        <!--<div class="attributes_box">-->
                            <!--<div class="attributes_title">最大电压（V）</div>-->
                            <!--<el-input v-model="voltage"></el-input>-->
                        <!--</div>-->

                        <!--<div class="attributes_box">-->
                            <!--<div class="attributes_title">长度（mm）</div>-->
                            <!--<el-input v-model="length"></el-input>-->
                        <!--</div>-->

                        <!--<div class="attributes_box">-->
                            <!--<div class="attributes_title">转速（RPM）</div>-->
                            <!--<el-input v-model="rotatingSpeed"></el-input>-->
                        <!--</div>-->

                    </div>
                </div>


            </div>

            <div class="cloneProductModify_box">
                <el-button class="cloneProductModify" @click="$router.go(-1)">关闭</el-button>
                <el-button type="primary" class="cloneProductModify" @click="updateProduct">保存</el-button>
            </div>

        </div>

        <!--标签修改弹窗-->
        <el-dialog
                custom-class="modifyDialog"
                :visible.sync="modifyVisible"
                width="400px">
            <span slot="title" class="modifyVisible_title"><i class="iconfont icon-edit-square"></i>修改</span>
            <div class="modifyVisible">
                <p>新标签名称：</p>
                <div>
                    <el-input v-model="newTagName"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
          <el-button @click="modifyVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateTagConfirm">保 存</el-button>
        </span>
        </el-dialog>

        <!--删除弹窗-->
        <delete-modal ref="delete" @doDelete="deleteConfirm"></delete-modal>
    </div>
</template>

<script>

    import DeleteModal from '@/components/public/modalDelete'
    import * as Vue from "vue";

    export default {
        name: "ProductModify",
        components:{
            DeleteModal
        },
        data(){
            return{
                // 轮播图上传
                dialogImageUrl: '',
                dialogVisible: false,

                // 视频上传
                videoUrl: '',
                videoDialogVisible: false,

                modifyVisible:false,// 标签修改弹窗
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block']
                        ]
                    }
                },// 富文本工具栏


                // 属性单选框组默认值
                brandRadio: 2,

                // 多选框组
                checkList:['方形','三角形'],

                voltage: '50',
                length: '0.5',
                rotatingSpeed: '0.5',

                productInfo:{},// 商品信息
                picture:[],   //上传显示图片
                attachment:[],
                updateInfo:{
                    product_id:this.$route.query.id,
                    title:'',
                    video:[
                        {
                            name:'',
                            path:''
                        }
                    ],
                    asin:'',
                    description:'',
                    show_picture:[],
                    attachment:[]
                },// 商品更新信息
                tags:[],// 标签
                tagId:'',// 标签id
                newTagName:'',// 新标签名
                property:[],// 属性列表
                properties:[],// 属性值列表
                // value:'',

            }
        },
        methods: {
            //图片删除
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.updateInfo.show_picture.map((item,index)=>{
                    if(item.url===file.url){
                        this.updateInfo.show_picture.splice(index,1)
                    }
                });
                console.log(fileList);
                this.picture = fileList;
                console.log(this.picture);
            },
            //图片上传
            imageUpload(file){
                this.HttpClient.form('/admin/uploadOneImage',{images:file})
                    .then(res=>{
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.picture.push({name:file.name,url:res.data.path,path:res.data.path.slice(25)});
                        }
                    })
            },
            //图片查看大图
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            handleAvatarSuccess(res, file) {
                this.videoUrl = URL.createObjectURL(file.raw);
            },
            //视频上传
            videoUpload(file) {
                console.log(file)
                const isVIDEO = file.type === 'video/mp4';

                if (!isVIDEO) {
                    this.$message.error('上传视频只能是 MP4 格式!');
                }
                this.HttpClient.form('/admin/uploadOneVideo',{video:file})
                    .then(res=>{
                        console.log(res)
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.videoUrl=res.data.path;
                            this.updateInfo.video[0].path = res.data.path;
                            this.updateInfo.video[0].name = file.name 
                            console.log(this.updateInfo.video)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    });
                return isVIDEO;
            },

            //附件删除
            listHandleRemove(file, fileList) {
                console.log(file, fileList);
                this.attachment.map((item,index)=>{
                    if(item.url===file.url){
                        this.attachment.splice(index,1)
                    }
                });
                // this.updateInfo.attachment = this.attachment;
                console.log(this.attachment);
            },
            //附件预览
            listHandlePreview(file) {
                console.log(file);
            },
            //附件上传
            fileUpload(file){
                this.HttpClient.form('/admin/uploadOneFile',{files:file})
                    .then(res=>{
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.attachment.push({name:file.name,url:res.data.path});
                            console.log(this.attachment);
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            //标签单击事件
            updateTag(index){
                this.tagId=index;
                this.modifyVisible=true;
            },
            //标签删除按钮
            deleteButton(index){
                this.tagId=index;
                this.$refs.delete.deleteDialog=true;
            },
            //确认修改标签
            updateTagConfirm(){
                this.tags[this.tagId] = this.newTagName;
                this.modifyVisible=false;
                // this.HttpClient.post('/admin/tags/edit',{relation_id:this.$route.query.id,name:this.newTagName,tag_id:this.tagId})
                //     .then(res=>{
                //         if(res.data.code===200){
                //             this.$message.success(res.data.msg);
                //             this.modifyVisible=false;
                //             this.tags.map(item=>{
                //                 if(item.tag_id===this.tagId){
                //                     item.name=this.newTagName
                //                 }
                //             })
                //         }else{
                //             this.$message.error(res.data.msg)
                //         }
                //     })
            },
            //确认删除标签
            deleteConfirm(){
                console.log(this.tagId)
                this.tags.splice(this.tagId,1);
                console.log(this.tags);
                // this.HttpClient.post('/admin/tags/del',{tag_id:this.tagId,relation_id:this.$route.query.id})
                //     .then(res=>{
                //         if(res.data.code===200){
                //             this.$message.success(res.data.msg);
                //             this.tags.map((item,index)=>{
                //                 if(item.tag_id===this.tagId){
                //                     this.tags.splice(index,1)
                //                 }
                //             })
                //         }else{
                //             this.$message.error(res.data.msg)
                //         }
                //     })
            },

            //获取商品信息
            getProductInfo(){
                this.HttpClient.get('/admin/marketProduct/edit',{product_id:this.$route.query.id})
                    .then(res=>{
                        console.log(res);
                        if(res.data.code===200){
                            let {title,video,asin,description,show_picture,attachment,tags,cate_property,map_property} = res.data.data;
                            this.productInfo=res.data.data;
                            this.updateInfo.asin=asin;
                            this.updateInfo.title=title;
                            this.updateInfo.description=description;
                            this.updateInfo.stock = res.data.data.stock;
                            this.updateInfo.price = res.data.data.price;
                            if(video){
                                this.videoUrl=this.Tools.handleImg(video[0].path);
                                this.updateInfo.video[0].name=res.data.data.video[0].name;
                                this.updateInfo.video[0].path=this.Tools.handleImg(video[0].path);
                                console.log(this.videoUrl)
                            }else{
                                this.updateInfo.video = video;
                            }
                            if(show_picture){
                                for(let i in show_picture){
                                    show_picture[i].url = 'http://cdn.kushualab.com/' + show_picture[i].path;
                                }
                                this.picture = show_picture;
                                console.log(this.updateInfo.show_picture)
                            }
                            if(attachment){
                                this.attachment=attachment;
                            }
                            console.log(this.attachment)
                            console.log(tags)
                            this.tags=tags;
                            for(let i=0;i<this.tags.length;i++){
                                this.tags[i] = this.tags[i].name;
                            }
                            this.property=cate_property;
                            this.property.map(item=>{
                                if(item.rule===1){
                                    item.radioSelect=''
                                }else if(item.rule===2){
                                    item.checkList=[]
                                }else if(item.rule===3){
                                    item.intValue=null;
                                }else{
                                    item.floatValue=null;
                                }
                                let value=[];
                                map_property.map(tmp=>{
                                    if(tmp.property_id===item.property_id){
                                        if(item.rule===1){
                                            item.radioSelect=tmp.pc_id;
                                            value=[item.radioSelect]
                                        }else if(item.rule===2){
                                            item.checkList.push(tmp.pc_id);
                                            value=item.checkList
                                        }else if(item.rule===3){
                                            item.intValue=tmp.property_value;
                                            value=[item.intValue,item.values]
                                        }else{
                                            item.floatValue=tmp.property_value;
                                            value=[item.floatValue,item.values]
                                        }

                                        console.log(value);
                                    }
                                });
                                if(this.properties.length>0){
                                    this.properties.map((tmp,i)=>{
                                        if(tmp.id===item.property_id){
                                            if(value.length>0){
                                                tmp.val=value
                                            }else{
                                                this.properties.splice(i,1)
                                            }
                                        }else{
                                            if(value.length>0){
                                                this.properties.push({id:item.property_id,val:value})
                                            }
                                        }
                                    });
                                }else{
                                    if(value.length>0){
                                        this.properties.push({id:item.property_id,val:value})
                                    }
                                }
                            });
                            console.log(this.properties);
                            console.log(this.updateInfo.video);
                        }
                    })
            },
            //属性视图更新
            updateProperty(index,item){
                this.$set(this.property,index,this.property[index]);
                let {property_id,category_id,rule} = item;
                let value=[];
                if(rule===1){
                    if(item.radioSelect){
                        value=[item.radioSelect]
                    }
                }else if(rule===2){
                    value=item.checkList
                }else if(rule===3){
                    if(item.intValue){
                        value=[item.intValue,item.values]
                    }
                }else{
                    if(item.floatValue){
                        value=[item.floatValue,item.values]
                    }
                }
                console.log(value);
                if(this.properties.length>0){
                    this.properties.map((tmp,i)=>{
                        if(tmp.id===property_id){
                            if(value.length>0){
                                tmp.val=value
                            }else{
                                this.properties.splice(i,1)
                            }
                        }else{
                            if(value.length>0){
                                this.properties.push({id:property_id,val:value})
                            }
                        }
                    });
                }else{
                    if(value.length>0){
                        this.properties.push({id:property_id,val:value})
                    }
                }
                let arr = [];
                let l = this.properties.length;
                for(let i = 0; i < l; i++) {
                    for(let j = i + 1; j < l; j++){
                        if (this.properties[i].id === this.properties[j].id){
                            i++;
                            j = i;
                        }
                    }
                    arr.push(this.properties[i]);
                }
                this.properties=arr;
                console.log(this.properties);
                if(this.properties.length>0){
                    let parameters={
                        product_id:this.$route.query.id,
                        category_id:category_id,
                        properties:this.properties
                    };
                    this.HttpClient.post('/admin/marketProduct/editProperty',parameters)
                        .then(res=>{
                            console.log(res);
                            if(res.data.code===200){
                                this.$message.success(res.data.msg)
                            }else{
                                this.$message.error(res.data.msg)
                            }
                        })
                }
            },
            //上传修改
            updateProduct(){
                console.log(this.updateInfo.show_picture,this.picture,this.attachment);
                let arr = [];
                for(let i in this.picture){
                    arr.push({
                        name:this.picture[i].name,
                        path:this.picture[i].path
                    })
                }
                this.updateInfo.image = arr;
                this.updateInfo.tags = this.tags;
                console.log(arr,this.updateInfo)
                // this.updateInfo.attachment = null;
                if(this.attachment){
                    for(let i in this.attachment){
                        this.updateInfo.attachment.push({
                            name:this.attachment[i].name,
                            path:this.attachment[i].url
                        })
                    }
                }
                this.HttpClient.post('/admin/marketProduct/edit',this.updateInfo)
                    .then(res=>{
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            setTimeout(()=>{
                                this.getProductInfo();
                                $router.go(-1);
                            },500)
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
            },
             /*************富文本***************/
            onEditorBlur() {//失去焦点事件
            },
            onEditorFocus() {//获得焦点事件
            },
            onEditorChange(event) {//内容改变事件
            },

        },
        created(){
            this.getProductInfo()
        }
    }
</script>

<style lang="less">
    .productModify::-webkit-scrollbar {display:none}
    .productModify{
        text-align: left;
        background: white;
        margin: 10px 10px 0 10px;
        height: calc(100vh - 70px);
        width: calc(100vw - 240px);
        border-radius: 2px;
        box-sizing: border-box;
        padding: 20px 40px;
        overflow-y: auto;

        .title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 0;
            margin-bottom: 30px;
            border-bottom: 1px solid #dedede;
        }
        .productModify_content{
            .richText{
                height: 192px;
                .quill-editor{
                    width: 750px;
                    border: 1px solid #bfbfbf;
                }
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
            .productModify_list{
                display: flex;
                align-items: flex-start;
                margin: 20px 0;

                .list_title{
                    width: 120px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: #15bafe;
                    color: #fff;
                    margin-right: 20px;
                }

                .list_main{
                    width: 500px;
                }

                /*标签*/
                .list_tags{
                    display: flex;
                    align-items: center;
                    height: 40px;
                    margin-right: 30px;
                    flex-wrap: wrap;
                    color: #666;
                    font-size: 14px;
                    p{
                        height: 100%;
                        padding: 0 20px;
                        box-sizing: border-box;
                        border: 1px solid #dedede;
                        margin-right: -1px;
                        line-height: 40px;
                        cursor:pointer;
                    }
                    p:hover{
                        color:#15bafe;
                        border-color:#15bafe;
                    }
                    p:active{
                        border-color:#ccc;
                    }
                    span{
                        background: red;
                        width: 40px;
                        height: 40px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor:pointer;
                        border:1px solid red;
                        box-sizing:border-box;
                    }
                    span:before{
                        content: '';
                        width: 60%;
                        height: 4px;
                        background: #fff;
                    }
                    span:active{
                        border:1px solid #ccc;
                    }
                }

                /*文本域*/
                .list_textarea{
                    width: 700px;
                    box-sizing: border-box;
                    .el-textarea__inner{
                        height: 200px;
                        border-radius: unset;
                    }
                }

                /*轮播*/
                .list_uploadImg{
                    box-sizing: border-box;
                    padding: 10px;
                    border: 1px dashed #dedede;
                    width: 700px;
                    overflow: auto;
                }

                /*视频*/
                .list_uploadVideo{
                    width: 700px;
                    .el-upload{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        video{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }


                .video-uploader .el-upload {
                    height:400px;
                    border: 1px dashed #d9d9d9;
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }
                .video-uploader .el-upload:hover {
                    border-color: #409EFF;
                }
                .video-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 178px;
                    height: 178px;
                    line-height: 178px;
                    text-align: center;
                }

                /*附件*/
                .list_uploadList{
                    box-sizing: border-box;
                    padding: 15px;
                    border: 1px solid #dedede;
                    width: 700px;
                }

                /*属性*/
                .list_attributes{
                    box-sizing: border-box;
                    padding: 10px;
                    border: 1px solid #dedede;
                    width: 700px;
                    overflow: auto;

                    .attributes_box:not(:last-child){
                        margin-bottom: 20px;
                    }

                    .attributes_box{

                        .attributes_title{
                            width: 120px;
                            height: 35px;
                            line-height: 35px;
                            text-align: center;
                            background: #15bafe;
                            color: #fff;
                            margin-bottom: 10px;
                        }

                        .el-radio__input,
                        .el-checkbox__input{
                            display: none;
                        }

                        .el-input{
                            width: 200px;
                        }

                        span{
                            font-size:14px;
                            color:#606266;
                        }
                    }
                }
            }

            .productModify_box{
                display: flex;
                align-items: center;
            }
        }
        .cloneProductModify_box{
            display: flex;
            justify-content: center;
            .cloneProductModify{
                margin-left: 20px;
            }
        }

        /*标签修改弹窗*/
        .modifyDialog{
            .modifyVisible_title{
                display: flex;
                border-bottom: 1px solid #e8e8e8;
                padding-bottom: 10px;
                i{
                    margin-right: 10px;
                }
            }
            .modifyVisible{
                display: flex;
                align-items: center;
            }
        }
    }
</style>
