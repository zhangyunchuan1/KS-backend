<template>
    <div
        class="upload_poster"
        :style="{width:widthAdapt,height:heightAdapt}"
        @mouseenter.stop="getMousePosition"
        @click.stop="getMousePosition">
        <div :class="{'upload_poster_before':true,'hidden':images.length>0}">
            <div class="upload_poster_input">
                <input id="upload_poster" type="file" class="upload_poster_file" @change="imageSelected">
                <div class="upload_poster_box" @click="chooseImage"></div>
            </div>
            <div class="upload_poster_tips">
                <div class="upload_poster_icon">
                    <i class="icon icon-tianjiatupian"></i>
                    <p class="upload_poster_icon_txt">设置封面图</p>
                </div>
                <div class="upload_poster_tip">
                    <p class="upload_poster_tip_item">建议比例16:9，格式jpeg、png</p>
                    <p class="upload_poster_tip_item">文件大小不超过5MB，建议尺寸≧712x400</p>
                </div>
            </div>
        </div>
        <div :class="{'upload_poster_uploaded':true,'hidden':images.length<=0}">
            <img :src="previewImage" alt="">
            <div class="upload_poster_delete" @click="deletePoster">删除</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "upload-poster",
        props: {
            width: {
                type: String,
                default: () => ''
            },
            height: {
                type: String,
                default: () =>''
            },
            code: {
                type: String,
                default: () =>''
            },
            image:{
                type:Array,
                default: () =>[]
            },
            adapt:{
                type:Boolean,
                default: () =>false
            }
        },
        data(){
            return {
                images:[],// 已上传图片数组
                previewImage:'',// 已上传图片路径
                currentScreenWidth:document.body.clientWidth + 8,// 屏幕宽度
                widthInit:'',// 宽初始值
                heightInit:'',// 高初始值
                widthAdapt:'',// 宽适应值
                heightAdapt:'',// 高适应值
            }
        },
        computed:{
            theWidth: {
                get: function () {
                    return this.width ? this.width : '400px'
                },
                set:function(newValue){
                    this.widthAdapt=newValue
                }
            },
            theHeight:{
                get:function(){
                    return this.height?this.height:'225px'
                },
                set:function(newValue){
                    this.heightAdapt=newValue
                }
            },
            getCode(){
                return this.code?this.code:''
            }
        },
        methods:{
            /****
             *author AMZ
             *date 2019/1/24
             *function 触发图片上传框事件
             */
            chooseImage(){
                document.querySelector('#upload_poster').click()
            },
            /****
             *author AMZ
             *date 2019/1/24
             *function 图片选择事件
             */
            imageSelected(e){
                console.log(e);
                let file=e.target.files[0];
                if(file.size/1024/1024>5){
                    this.$message.warning('上传图片大小不得超过1M');
                    return false
                }
                const fileType = (file.name.split('.')[1]).toLowerCase();
                const fileTypeStr = 'jpg,png,jpeg,tiff,tif';
                if (fileTypeStr.indexOf(fileType) < 0) {
                    this.$message.warning('图片格式错误');
                    return false;
                }
                // 预览图片
                let that=this;
                let reader = new FileReader();
                reader.onload = (function (file) {
                    return function (e) {
                        let dataInfo = this.result;
                        // console.log(dataInfo);
                        that.previewImage=dataInfo
                    };
                })(e.target.files[0]);
                reader.readAsDataURL(e.target.files[0]);
                // 上传
                let observable = this.$observable(file);
                observable.subscribe({
                    next(res){
                        // console.log('next',res);
                        that.percent=res.total.percent;
                        // console.log(that.percent);
                    },
                    error(err){
                        that.$message.error('上传失败!');
                        console.log('error',err)
                    },
                    complete(res) {
                        // console.log('complete', res);
                        that.$message.success('上传成功!');
                        that.images.push({name:file.name,path:that.$imagePath + res.key});
                        that.previewImage=that.$imagePath + res.key
                        console.log(that.previewImage);
                        // console.log(that.images);
                    }
                })
                // this.HttpClient.form(this.$uploadPath,{file:file,token:this.$getQiNiuToken({saveKey:file.name})})
                //     .then(res=>{
                //         console.log(res);
                //         this.$message.success('上传成功!');
                //         this.images.push({name:file.name,path:this.$imagePath + res.data.key})
                //     })
                //     .catch(error=>{
                //         // console.log(error);
                //         this.$message.error('上传失败!')
                //     })
            },
            /****
             *author AMZ
             *date 2019/1/24
             *function 监听位置事件
             *@param event 目标事件
             */
            getMousePosition(event){
                this.$emit('mouseenter',event,this.getCode)
            },
            /****
             *author AMZ
             *date 2019/1/28
             *function 删除封面图
             */
            deletePoster(){
                this.images.length=0;
                this.previewImage='';
                this.$message.success('删除成功')
            }
        },
        created(){
            this.widthInit=this.theWidth;
            this.heightInit=this.theHeight;
            this.widthAdapt=this.theWidth;
            this.heightAdapt=this.theHeight;
        },
        mounted() {
            // console.log(this.currentScreenWidth);
            const _this = this;
            // console.log(window.onresize);
            window.addEventListener('resize',()=>{
                _this.currentScreenWidth = $(window).width();
                // console.log(_this.currentScreenWidth);
                _this.currentScreenWidth = _this.currentScreenWidth + 8;
                if(_this.adapt){
                    // console.log(_this.currentScreenWidth);
                    _this.theWidth=_this.currentScreenWidth>1200?_this.widthInit:parseInt(_this.widthInit)*0.8+'px';
                    _this.theHeight=_this.currentScreenWidth>1200?_this.heightInit:parseInt(_this.heightInit)*0.8+'px'
                }
                // console.log(222222222222222,_this.widthAdapt);
                // console.log(222222222222222,_this.heightAdapt);
            });
        },
        watch:{
            image:{
                handler(){
                    let arr=JSON.parse(JSON.stringify(this.image));
                    console.log('封面图组件传入的图片数组',arr)
                    this.images=[];
                    arr.map(item=>{
                        this.images.push({name:item.name,path:this.Tools.handleImg(item.path)})
                    });
                    if(this.images.length>0){
                        this.previewImage=this.images[0].path
                    }
                },
                deep:true,
                immediate:true
            }
        }
    }
</script>

<style scoped lang="less">
    .upload_poster{
        border:1px dashed #C8CACC;

        .upload_poster_before{
            width:100%;
            height:100%;
            position:relative;

            .upload_poster_input{
                width:100%;
                height:100%;
                z-index:10;
                position:absolute;
                top:0;
                left:0;
                opacity:0;

                .upload_poster_file{
                    display:none;
                }
                .upload_poster_box{
                    width:100%;
                    height:100%;
                }
            }
            .upload_poster_tips{
                width:100%;
                height:100%;
                display:flex;
                flex-wrap:wrap;
                align-items:center;
                justify-content:center;

                .upload_poster_icon{
                    text-align:center;

                    .icon-tianjiatupian{
                        color:#D4D7D9;
                        font-size:54px;
                    }
                    .upload_poster_icon_txt{
                        color:#646566;
                        font-size:16px;
                    }
                }
                .upload_poster_tip{
                    width:100%;

                    .upload_poster_tip_item{
                        color:#C8CACC;
                        font-size:12px;
                        text-align:center;
                    }
                }
            }
        }
        .upload_poster_before:hover{
            .upload_poster_tips{
                .upload_poster_icon{
                    .icon-tianjiatupian{
                        background:linear-gradient(113deg, rgba(0,240,254,1) 0%, rgba(26,151,255,1) 100%);
                        -webkit-background-clip:text;
                        -webkit-text-fill-color:transparent;
                    }
                }
            }
        }
        .upload_poster_uploaded{
            width:100%;
            height:100%;
            position:relative;

            img{
                width:100%;
                height:100%;
                object-fit:cover;
            }
            .upload_poster_delete{
                display:none;
                position:absolute;
                left:0;
                bottom:0;
                width:100%;
                height:20px;
                cursor:pointer;
                color:#FFF;
                font-size:12px;
                line-height:20px;
                text-align:center;
                letter-spacing:1px;
                background:rgba(0,0,0,.5);
            }
        }
        .upload_poster_uploaded:hover{

            .upload_poster_delete{
                display:block;
            }
        }
        .hidden {
            display: none;
        }
    }
</style>
