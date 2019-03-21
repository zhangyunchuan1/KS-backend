/****
 *author AMZ
 *date 2019/1/17
 *function 上传提示
 */
<template>
    <div class="upload_tips">
        <div class="upload_tips_box" :style="{top:theTop}">
            <!--上传提示-->
            <div class="upload_tip">
                <div class="upload_tip_header">提示</div>
                <div class="upload_tip_content" v-html="tips" v-if="!!tips"></div>
                <div class="upload_tip_empty" v-else>
                    <empty-modal></empty-modal>
                </div>
            </div>
            <!--上传规则-->
            <div class="upload_rule">
                <div class="upload_rule_header">
                    <span class="upload_rule_rectangle"></span>
                    <span class="upload_rule_title">上传规则</span>
                </div>
                <div class="upload_rule_content">
                    <ul class="upload_rule_list">
                        <li class="upload_rule_list_item" v-for="(r,index) in rule" :key="index">
                            <span
                                    class="upload_rule_item_decoration"
                                    :style="{background:backgroundColor(index)}">
                            </span>
                            <span class="upload_rule_item_txt" v-html="r"></span>
                        </li>
                        <li class="upload_rule_list_empty" v-if="!(rule && rule.length>0)">
                            <empty-modal></empty-modal>
                        </li>
                    </ul>
                </div>
            </div>
            <!--其他信息-->
            <!-- <div class="upload_others">
                <p class="upload_others_protocol">
                    <a href="" class="upload_others_link">用户协议</a>
                    <span class="upload_others_txt">·</span>
                    <a href="" class="upload_others_link">酷耍内容政策</a>
                </p>
                <p class="upload_others_report">违法和不良信息举报：010-82716601</p>
                <p class="upload_others_licence">
                    <a href="" class="upload_others_link">网络文化经营许可证</a>
                </p>
                <p class="upload_others_relation">
                    <a href="" class="upload_others_link">联系我们</a>
                    <span class="upload_others_txt">&copy;2018 酷耍</span>
                </p>
            </div> -->
        </div>
    </div>
</template>

<script>

    import EmptyModal from '@/components/public/empty'

    export default {
        name: "upload-tips",
        props:['tips','rule','top'],
        components:{EmptyModal},
        data(){
            return{
                colorList:[
                    ['#99776B','#A6877C'],
                    ['#78909C','#86A4B3'],
                    ['#FFBF66','#FAAC3E'],
                    ['#FF8059','#FF8A65'],
                    ['#5666BF','#7786D9'],
                    ['#3C9FF0','#5CB3FA'],
                    ['#4DBFB4','#52CCC0']
                ],// 颜色数组
            }
        },
        methods:{
            /****
             *author AMZ
             *date 2019/1/17
             *function 上传规则列表装饰点背景颜色控制
             */
            backgroundColor(index){
                if(index<this.colorList.length){
                    return 'linear-gradient(180deg,'+this.colorList[index][0]+' 0%,'+this.colorList[index][1]+' 100%)'
                }else{
                    return 'linear-gradient(180deg,'+this.colorList[index-this.colorList.length][0]+' 0%,'+this.colorList[index-this.colorList.length][1]+' 100%)'
                }
            }
        },
        computed:{
            theTop(){
                return this.top?this.top + 'px':0
            },
        },
    }
</script>

<style scoped lang="less">
    .upload_tips{
        flex:1;
        margin-left:20px;
        position:relative;
        transition:all .3s;

        .upload_tips_box{
            position:absolute;
            top:0;
            left:0;
            transition:top .3s;

            //上传提示
            .upload_tip{
                width:100%;
                min-height:300px;
                background:#FFF;
                border:1px solid rgba(235,240,245,1);
                box-shadow:1px 2px 6px 0 rgba(21,165,255,0.1);

                .upload_tip_header{
                    width:100%;
                    height:32px;
                    color:#FFF;
                    font-size:16px;
                    line-height:32px;
                    padding-left:16px;
                    background:linear-gradient(225deg,rgba(0,242,254,1) 0%,rgba(26,148,255,1) 100%);
                    box-sizing: border-box
                }
                .upload_tip_content{
                    color:#646566;
                    font-size:14px;
                    padding:12px 16px 20px;
                }
                .upload_tip_empty{
                    height:266px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                }
            }
            //上传规则
            .upload_rule{
                width:100%;
                margin-top:10px;
                padding:12px 0 20px;
                background:#FFF;
                border:1px solid rgba(235,240,245,1);
                box-shadow:1px 2px 6px 0 rgba(21,165,255,0.1);

                .upload_rule_header{
                    display:flex;
                    align-items:center;
                    justify-content:flex-start;

                    .upload_rule_rectangle{
                        width:6px;
                        height:18px;
                        margin-right:10px;
                        background:linear-gradient(212deg,rgba(0,240,254,1) 0%,rgba(26,151,255,1) 100%);
                    }
                    .upload_rule_title{
                        color:#323333;
                        font-size:16px;
                        font-weight:bold;
                        letter-spacing:1px;
                    }
                }
                .upload_rule_content{
                    padding:20px 16px;

                    .upload_rule_list{

                        .upload_rule_list_item{
                            display:flex;
                            align-items:flex-start;
                            justify-content:flex-start;
                            color:#646566;
                            font-size:14px;
                            line-height:30px;

                            .upload_rule_item_decoration{
                                width:4px;
                                height:4px;
                                border-radius:50%;
                                margin-right:10px;
                                position:relative;
                                top:13px;
                                /*background:linear-gradient(180deg,rgba(0,240,254,1) 0%,rgba(26,151,255,1) 100%);*/
                            }
                            .upload_rule_item_txt{
                                flex:1;
                            }
                        }
                        .upload_rule_list_empty{
                            width:100%;
                            height:100%;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                        }
                    }
                }
            }
            //其他信息
            .upload_others{
                margin-top:10px;
                color:#969899;
                font-size:14px;
                line-height:30px;
                letter-spacing:1px;

                .upload_others_link{
                    color:#969899;
                }
                .upload_others_link:hover{
                    background:linear-gradient(113deg, rgba(0,240,254,1) 0%, rgba(26,151,255,1) 100%);
                    -webkit-background-clip:text;
                    -webkit-text-fill-color:transparent;
                }
            }
        }
    }
    @media screen and (max-width: 1200px) {
        .upload_tips {
            margin-left:16px;
        }
    }
</style>