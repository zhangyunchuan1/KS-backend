<template>
    <div class="uploading_main_item uploading_main_type">
        <div class="main_head">
            <i class="icon icon_type"></i>
            <span class="main_txt">类别</span>
        </div>
        <div class="main_type_list">
            <ul class="figure_list">
                <li class="list_item" :class="{active:activeIndex===index}" v-for="(typeItem,index) in typeList" :key="index" @change="isActive(index)">
                    <div class="type_list_content">
                        <div class="type_content_img_box"><i class="icon" :class="typeItem.images"></i></div>
                        <div class="type_content_txt">
                            <p class="content_txt_title">{{typeItem.name}}</p>
                            <p class="content_txt_type" :title="checkedValue" v-show="activeIndex===index">{{checkedValue.length>4?checkedValue.slice(0,4)+'...':checkedValue}}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="type_list_class">
                <div class="type_list_nav"  v-show="typeIndex===activeIndex" v-for="(typeItemList,typeIndex) in typeList" :key="typeIndex">
                    <ul class="list_nav_father">
                        <li class="nav_father_item" :class="{active:tmp.name===checkedValue && typeItemList.id===checkedType}" v-for="(tmp,index) in typeItemList.child" :key="index" @click="checkItem(typeItemList.id,tmp.name,tmp.id,index)">
                            <a href="javascript:;" class="list_nav_txt">{{tmp.name}}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="main_type_list_describe" id="main_type_list_describe">
            <div class="type_describe_title">
                <i class="icon icon_baike"></i>
                概括
            </div>
            <div class="type_describe_content">包括机械学、震动、声学、流体静力学、热力学及电子理论</div>
        </div>
    </div>
</template>

<script>

    import "@/assets/js/uploading.js"

    export default {
        name: "uploadingMainTypeDetail",
        data(){
            return {
                typeList:[],
                checkedType:'',
                checkedValue:'',
                activeIndex:0,
                activeTypeValue:{
                  stairneo:null,
                  stairtwo:null
                }
            }
        },
        methods:{
            isActive(index){
                this.activeIndex=index;
                this.checkedValue='';
            },
            checkItem(type,tmp,tmpId,index){
                this.checkedType=type;
                this.checkedValue=tmp;
                this.activeTypeValue.stairneo = type;
                this.activeTypeValue.stairtwo = tmpId;
                console.log(index)
                this.$emit("ActiveTypeValue",this.typeList[this.activeIndex].child[index].name)
            }
        },
        created(){
            this.HttpClient.get('/questions/category')
                .then(res=>{
                    if(res.data.code===200){
                        this.typeList=Object.values(res.data.data);
                        console.log(this.typeList)
                    }
                })
        },
        mounted(){
            console.log($('.content_txt_title').width());
        }
    }
</script>

<style scoped>

</style>
