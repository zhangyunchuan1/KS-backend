<template>
    <div class="empty">
        <span class="empty_img" :style="'width:'+theWidth+';'+'height:'+theHeight+';'"></span>
        <p class="empty_txt">{{theTip}}</p>
    </div>
</template>

<script>
    export default {
        name: "empty",
        props:{
            tips:{
                type:String,
                default:()=>''
            },
            width:{
                type:String,
                default:()=>''
            },
            height:{
                type:String,
                default:()=>''
            }
        },
        data(){
            return {
                tip:'',// 为空提示
            }
        },
        computed:{
            theTip(){
                return this.tips?this.tips:'暂时没有数据噢~'
            },
            theWidth(){
                return this.width?this.width:'180px'
            },
            theHeight(){
                return this.height?this.height:'120px'
            }
        }
    }
</script>

<style scoped lang="less">
    .empty{

        .empty_img{
            width: 180px;
            height: 120px;
            margin: 0 auto;
            display:block;
            background: url(/static/img/load/data_load.png) center center no-repeat;
            background-size:contain;

        }
        .empty_txt{
            width:100%;
            color:#646566;
            font-size:16px;
            text-align:center;
            margin-top:20px;
        }
    }
</style>
