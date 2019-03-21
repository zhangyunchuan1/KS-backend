<template>
    <div class="upload_tags">
        <div class="upload_tag_input">
            <input type="text" class="input" v-model="tagName" placeholder="按回车键Enter创建标签" @keyup.13="addTag">
            <div class="add_icon" @click="addTag">
                <span class="add_icon_vertical"></span>
                <span class="add_icon_level"></span>
            </div>
        </div>
        <div class="upload_tags_list" v-if="tags && tags.length>0">
            <div
                class="upload_tags_item"
                v-for="(tag,index) in tags"
                :key="index"
                :style="{'background':'linear-gradient(180deg,'+tag.color[0]+' 0%,'+tag.color[1]+' 100%)'}"
                :title="tag.name">
                <span class="upload_tag_txt">{{tag.name}}</span>
                <div class="upload_tag_delete" @click="tagDelete(index,tag.color)">
                    <div class="upload_delete_txt">删除</div>
                    <div class="upload_delete_rectangle"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "upload-tags",
        props:{
            tagList:{
                type:Array,
                default:()=>[]
            }
        },
        data(){
            return {
                tagName:'',// 标签名称
                tags:[],// 标签数组
                colors:[
                    ['#99776B','#A6877C'],
                    ['#78909C','#86A4B3'],
                    ['#FFBF66','#FAAC3E'],
                    ['#FF8059','#FF8A65'],
                    ['#5666BF','#7786D9'],
                    ['#3C9FF0','#5CB3FA'],
                    ['#4DBFB4','#52CCC0']
                ],// 颜色数组
                tagArr:[],// 已添加标签
            }
        },
        methods:{
            /****
             *author AMZ
             *date 2019/1/24
             *function 添加标签
             */
            addTag(){
                let total=this.colors.length;
                let num=parseInt(Math.random()*total);
                console.log(this.tags);
                if(this.tags.length<3){
                    let length=this.count_word(this.tagName);
                    if(length<=8 && length>=2){
                        this.tags.push({name:this.tagName,color:this.colors[num]});
                        this.tagArr.push(this.tagName);
                        this.tagName='';
                        this.colors.splice(num,1);
                    }else{
                        this.$message.warning('关键词的长度不正确')
                    }
                }else{
                    this.$message.warning('最多添加三个关键词')
                }
                // console.log(this.tags.length);
            },
            /****
             *author AMZ
             *date 2019/1/24
             *function 删除标签
             *@param index 当前标签下标
             *@param color 当前标签颜色
             */
            tagDelete(index,color){
                this.tags.splice(index,1);
                this.tagArr.splice(index,1);
                this.colors.push(color);
            },
            /****
             *author AMZ
             *date 2019/3/4
             *function 字数统计
             */
            count_word(string) {
                let r1 = new RegExp('[\u3000-\u4DFF]','g'),
                r2 = new RegExp('[\u4E00-\u9FFF]','g'),
                r3 = new RegExp('[\u0E00-\u0E7F]','g');
                string = string.replace(r1,' {PNK} ');
                string = string.replace(r2,' {CJK} ');
                string = string.replace(r3,' {THI} ');
                //string = string.replace(/(<([^>]+)>)/ig,”") ;
                string = string.replace(/(\(|\)|\*|\||\+|\”|\’|_|;|:|,|\.|\?)/ig," ") ;
                string = string.replace(/\s+/ig," ");
                //string = string.replace(/_+/ig," ");
                var a = string.split(/[\s+|\\|\/]/g);
                var count = 0;
                var pnkCounter = 0;
                var thiCounter = 0;
                for (var i=0;i<a.length;i++){
                    if (a[i]=='{PNK}'){
                        pnkCounter++;
                    }else if(a[i]=='{THI}'){
                        thiCounter++;
                    }else if (a[i].length>0){
                        count++;
                    }
                }
                count += Math.ceil(pnkCounter/3) + Math.ceil(thiCounter/4);
                return count;
            }
        },
        watch:{
            tagList:{
                handler(newVal){
                    this.tags=[];
                    this.tagArr=JSON.parse(JSON.stringify(newVal));
                    this.tagArr.map(item=>{
                        let total=this.colors.length;
                        let num=parseInt(Math.random()*total);
                        this.tags.push({name:item,color:this.colors[num]});
                        this.colors.splice(num,1);
                    })
                },
                deep:true,
                immediate: true
            }
        }
    }
</script>

<style scoped lang="less">
    .upload_tags{
        width:100%;

        .upload_tag_input{
            width:100%;
            position:relative;

            .input{
                width:100%;
                height:36px;
                color:#646566;
                box-sizing:border-box;
                padding:0 40px 0 10px;
                border:1px solid #E1E3E6;
            }
            .input:hover,.input:focus{
                border-color:#1A97FF;
            }
            /*placeholder样式*/
            .input::-webkit-input-placeholder { /* WebKit browsers */
                color:#C8CACC;
            }
            .input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                color:#C8CACC;
            }
            .input::-moz-placeholder { /* Mozilla Firefox 19+ */
                color:#C8CACC;
            }
            .input:-ms-input-placeholder { /* Internet Explorer 10+ */
                color:#C8CACC;
            }
            /*添加icon*/
            .add_icon{
                width:20px;
                height:20px;
                cursor:pointer;
                position:absolute;
                top:8px;
                right:10px;

                .add_icon_vertical{
                    width:2px;
                    height:100%;
                    background:#C8CACC;
                    position:absolute;
                    top:0;
                    left:9px;
                }
                .add_icon_level{
                    width:100%;
                    height:2px;
                    background:#C8CACC;
                    position:absolute;
                    top:9px;
                    left:0;
                }

            }
            .add_icon:hover{
                .add_icon_vertical{
                    background:linear-gradient(180deg,rgba(0,242,254,1) 0%,rgba(26,148,255,1) 100%);
                }
                .add_icon_level{
                    background:linear-gradient(0deg,rgba(0,242,254,1) 0%,rgba(26,148,255,1) 100%);
                }
            }
        }
        /*已添加标签列表*/
        .upload_tags_list{
            display:flex;
            align-items:center;
            justify-content:flex-start;
            margin-top:12px;

            .upload_tags_item{
                width:100px;
                height:32px;
                color:#FFF;
                font-size:14px;
                line-height:32px;
                text-align:center;
                margin-left:10px;
                position:relative;
                padding:0 5px;
                word-break:break-all;
                word-wrap:break-word;

                .upload_tag_delete{
                    display:none;
                    width:100%;
                    height:100%;
                    color:#323333;
                    font-size:12px;
                    cursor:pointer;
                    position:absolute;
                    top:0;
                    left:0;
                    background:#FFF;

                    .upload_delete_rectangle{
                        width:100%;
                        height:4px;
                        background:linear-gradient(270deg,rgba(60,159,240,1) 0%,rgba(92,179,250,1) 100%)
                    }
                }
            }
            .upload_tags_item:first-child{
                margin-left:0;
            }
            .upload_tags_item:hover{
                box-shadow:1px 1px 2px 0 rgba(21,165,255,0.1);
                border:1px solid rgba(235,240,245,1);

                .upload_tag_delete{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:flex-start;

                    .upload_delete_txt{
                        flex:1;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                    }
                }
            }
        }
    }
</style>