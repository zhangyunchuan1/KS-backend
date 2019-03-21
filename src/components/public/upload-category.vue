<template>
    <div class="upload_category">
        <div class="category_image">
            <i :class="['icon',categoryIcon]" v-if="categoryIcon"></i>
            <img :src="Tools.handleImg(categoryImg)+'?imageView2/1/w/24/h/24'" alt="" v-else-if="categoryImg">
            <div class="category_image_none" v-else></div>
        </div>
        <!--板块-->
        <el-select
                v-model="categorySelected"
                :disabled="!!getSourceId"
                placeholder="选择类别"
                popper-class="upload_category_item"
                @change="getSourceId?'':selectType()">
            <el-option
                    v-for="item in categoryList"
                    :key="item.menu_id"
                    :label="item.name"
                    :value="item.menu_id">
                    <div class="upload_category_slot" @mouseenter="categoryHover=item.menu_id" @mouseleave="categoryHover=null">
                        <span class="upload_category_img">
                            <i :class="['icon',item.icon]" v-if="item.icon"></i>
                            <img :src="categoryHover===item.menu_id?Tools.handleImg(item.images):Tools.handleImg(item.images_beforehover)" alt="" v-else>
                        </span>
                        <span class="upload_category_txt">{{ item.name }}</span>
                    </div>
            </el-option>
        </el-select>
        <!--一级目录-->
        <el-select
                v-if="isShowChild"
                v-model="childSelected"
                :disabled="!!getSourceId"
                placeholder="请选择"
                popper-class="upload_category_item upload_category_child"
                @change="getSourceId?'':selectChild()">
            <el-option
                    v-for="item in categoryChild"
                    :key="item.menu_id"
                    :label="item.name"
                    :value="item.menu_id">
                <!--<span class="upload_category_img"><img :src="Tools.handleImg(item.icon)" alt=""></span>-->
                <span class="upload_category_txt" @mouseenter="getChildTips(item.menu_id)">{{ item.name }}</span>
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        name: "upload-category",
        props:['id','source','child','selected'],
        data(){
            return {
                sourceId:'',// 来源id(判断是否为修改)
                categoryIcon:'',// 类别icon
                categoryImg:'',// 类别图片
                categoryList:[],// 类别列表
                categorySelected:'',// 类别选中
                categoryChild:[],// 一级目录
                childSelected:'',// 一级目录选中
                category:{},// 选中类别数组
                children:{},// 选中一级目录数组
                categoryHover:null,// 类别鼠标悬浮
            }
        },
        methods:{
            async getCategoryList() {
                if(this.source && Number(this.source)===8){
                    this.HttpClient.post('/shop/menu/getOneChild', {isFolder: true})
                        .then(res => {
                            console.log('文章板块列表',res)
                            if (res.data.code === 200) {
                                this.categoryList = res.data.data;
                                console.log(this.categoryList);
                            }
                        })
                }else{
                    await this.HttpClient.post('/category/list',{type:Number(this.source),level:1})
                        .then(res=>{
                            console.log('文章板块列表',res);
                            if(res.data.code===200){
                                this.categoryList=res.data.data
                            }
                        })
                }
            },
            /****
             *author AMZ
             *date 2019/1/19
             *function 类别选择事件
             */
            selectType(){
                let id=this.categorySelected;
                this.category.id=id;
                this.categoryList.map(item=>{
                    if(item.menu_id===id){
                        this.categoryIcon=item.icon;
                        this.categoryImg=item.images;
                        this.category.name=item.name;
                        // this.getFirstTypeList(id,item.name,1)
                    }
                });
                if(this.isShowChild){
                    this.childSelected='';
                    this.HttpClient.post('/category/list',{type:Number(this.source),level:2,menu_id:id})
                        .then(res=>{
                            console.log(res);
                            if(res.data.code===200){
                                this.categoryChild=res.data.data
                            }
                        })
                }else{
                    //返回已选类别
                    this.$emit('change',this.category)
                }
            },
            /****
             *author AMZ
             *date 2019/1/19
             *function 一级目录选择事件
             */
            selectChild(){
                this.children.id=this.childSelected;
                this.categoryChild.map(item=>{
                    if(this.childSelected===item.menu_id){
                        this.children.name=item.name
                    }
                });
                this.$emit('change',this.category,this.children)
            },
            /****
             *author AMZ
             *date 2019/2/18
             *function 二级目录鼠标悬停事件
             *@param id 目录id
             */
            getChildTips(id){
                let tip='';
                this.HttpClient.get('/category/info',{menu_id:id})
                    .then(res=>{
                        // console.log(res);
                        if(res.data.code===200){
                            if(res.data.data){
                                tip=res.data.data.upload_tips
                            }
                        }
                        this.$emit('returnTip',tip)
                    });
            },
        },
        computed:{
            /****
             *author AMZ
             *date 2019/1/19
             *function 获取来源id
             */
            getSourceId(){
                return this.id?this.id:''
            },
            /****
             *author AMZ
             *date 2019/1/19
             *function 是否显示一级目录
             */
             isShowChild(){
                return !!this.child
             }
        },
        async created(){
            this.sourceId=this.getSourceId;
            await this.getCategoryList();
        },
        watch:{
            selected:{
                async handler(){
                    if(this.selected && Object.values(this.selected).length>0){
                        this.categorySelected=this.selected.category;
                        if(this.categorySelected){
                            await this.getCategoryList();
                            // console.log(this.categoryList);
                            let item=this.Tools.findElem(this.categoryList,'menu_id',this.categorySelected);
                            if(item!==-1){
                                this.categoryIcon=this.categoryList[item].icon;
                                this.categoryImg=this.categoryList[item].images;
                            }
                        }
                        if(this.isShowChild){
                            this.HttpClient.post('/category/list',{type:Number(this.source),level:2,menu_id:this.categorySelected})
                                .then(res=>{
                                    console.log(res);
                                    if(res.data.code===200){
                                        this.categoryChild=res.data.data;
                                        this.childSelected=this.selected.child;
                                        console.log(this.categoryChild);
                                    }
                                })
                        }
                    }
                },
                deep:true,
                immediate:true
            },
        }
    }
</script>

<style scoped lang="less">
    .upload_category{
        display:flex;
        align-items:center;
        justify-content:flex-start;
        position:relative;

        .category_image{
            position:absolute;
            top:0;
            left:20px;
            width:24px;
            height:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            z-index:1;

            img{

            }
            .category_image_none{
                width:24px;
                height:24px;
                border:1px dashed #C8CACC;
                border-radius:50%;
                background:#F7FAFC;
            }
        }
        /deep/.el-select{
            .el-input__inner{
                width:200px;
                height:36px;
                border-radius:0;
                line-height:36px;
                padding-left:54px;
            }
            .el-input__inner:hover,.el-input__inner:focus{
                border-color:#1A97FF;
            }
            .el-input__icon{
                line-height:36px;
            }
        }
        /deep/.el-select+.el-select{
            margin-left:10px;

            .el-input__inner{
                padding-left:14px;
            }
        }
    }
    /*板块选择框*/
    .upload_category_item{
        .el-select-dropdown__item{
            display:flex;
            align-items:center;
            justify-content:space-between;

            .upload_category_slot{
                width:100%;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:flex-start;

                .upload_category_img{
                    width:35px;
                    overflow:hidden;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    margin-right:10px;

                    img{
                        width:24px;
                    }
                }
                .upload_category_txt{
                    width:100%;
                }
            }
        }
    }
</style>