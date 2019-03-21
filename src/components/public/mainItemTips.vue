<template>
    <div class="main_item_tips">
        <div class="main_tips_title">标题</div>
        <ul class="main_item_tips_list">
            <li class="list_item">15字以内，推荐使用中文</li>
            <li class="list_item">15字以内，推荐使用中文</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "mainItemTips",
        data(){
            return {

            }
        },
        methods:{
            fixedEnd(id){
                $(window).scroll(function(){
                    var $describe=$("#"+id);
                    var $scrollTop=$(window).scrollTop();
                    var $mainTips=$(".mod_uploading .main_item_tips");
                    function getPoint(obj) { //获取某元素以浏览器左上角为原点的坐标
                        var t = obj.offsetTop; //获取该元素对应父容器的上边距
                        var l = obj.offsetLeft; //对应父容器的上边距
                        //判断是否有父容器，如果存在则累加其边距
                        while (obj = obj.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
                            t += obj.offsetTop; //叠加父容器的上边距
                            l += obj.offsetLeft; //叠加父容器的左边距
                        }
                        return t;
                    }
                    var top=getPoint($describe[0])-110;
                    if($scrollTop>100 && $scrollTop<top){
                        if($("body").width()<=1200){
                            $mainTips.css({"position":"fixed","top":"100px","left":"0%"}).removeClass("scroll");
                        }else{
                            $mainTips.css({"position":"fixed","top":"100px","right":"17.28%"})
                                .addClass("scroll");
                        }
                    }else if($scrollTop>top){
                        $mainTips.css({"position":"absolute","top":top+"px","right":"35px"}).removeClass("scroll");
                    }else{
                        $mainTips.css({"position":"absolute","top":"54px","right":"35px"}).removeClass("scroll");
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
