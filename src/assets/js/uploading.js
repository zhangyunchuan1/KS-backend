$(function(){
    // /***************************标签添加事件**********************************/
    // // var $tagInput=$(".mod_uploading .uploading_main_tag .main_tag_input");
    // // var $tagList=$(".mod_uploading .uploading_main_tag .figure_list");
    // $(".mod_uploading .uploading_main_tag .icon_add_sm").click(function(){
    //     var $this=$(this);
    //     var $tagInput=$this.prev();
    //     var value=$tagInput.val();
    //     var $tagList=$this.next().find(".figure_list");
    //     if($tagList.children().length<3){
    //         if(value){
    //             var html="";
    //             html+="<li class='list_item'><i class='icon icon_delete'></i><span class='tag_view_txt'>"+value+"</span></li>";
    //             $tagList.append(html);
    //         }else{
    //             alert("请输入标签");
    //         }
    //     }
    // });

    // /***********************标签删除事件****************************************/
    // $(".mod_uploading .uploading_main_tag .figure_list").on("click",".list_item .icon_delete",function(){
    //    $(this).parent().remove();
    // });

    /**********************类别鼠标事件*************************/
    // $(".mod_uploading .main_type_list .figure_list").on("mouseenter",".list_item",function(){
    //     var $this=$(this);
    //     var index=$this.index();
    //     var $typeImg=$this.find(".type_content_img");
    //     $this.css({"borderColor":"#dfdfdf","boxShadow":"1px 1px 5px 1px #dfdfdf"})
    //         .siblings().css({"borderColor":"transparent","boxShadow":"none"});
    //     if(!$this.is(".active")){
    //         $this.addClass("active").siblings().removeClass("active");
    //     }
    //     $($this.parent().siblings().children()[index]).removeClass("none").siblings().addClass("none");
    // });
    // /*************************类别列表点击事件***********************************/
    // var $navFather=$(".mod_uploading .main_type_list .type_list_nav").children();
    // $navFather.on("click",".nav_father_item",function(){
    //     var $this=$(this);
    //     $this.parent().find(".active").removeClass("active");
    //     $this.find(".list_nav_slide").addClass("active");
    // });

    // /***********************提示信息***********************************/
    // $(window).scroll(function(){
    //     var $describe=$(".mod_uploading .mod_uploading_main .main_type_list_describe");
    //     $scrollTop=$(window).scrollTop();
    //     var $mainTips=$(".mod_uploading .main_item_tips");
    //     function getPoint(obj) { //获取某元素以浏览器左上角为原点的坐标
    //         var t = obj.offsetTop; //获取该元素对应父容器的上边距
    //         var l = obj.offsetLeft; //对应父容器的上边距
    //         //判断是否有父容器，如果存在则累加其边距
    //         while (obj = obj.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
    //             t += obj.offsetTop; //叠加父容器的上边距
    //             l += obj.offsetLeft; //叠加父容器的左边距
    //         }
    //         return t;
    //     }
    //     var top=getPoint($describe[0])-120;
    //     console.log(top);
    //     if($scrollTop>100 && $scrollTop<top){
    //         $mainTips.css({"position":"fixed","top":"100px","left":"58%","width":"20%"});
    //     }else if($scrollTop>top){
    //         $mainTips.css({"position":"absolute","top":top+"px","left":"63%","width":"32%"});
    //     }else{
    //         console.log(1);
    //         $mainTips.css({"position":"absolute","top":"113px","left":"63%","width":"32%"});
    //     }
    // });

    /***********************确认按钮***********************************/
    // var $uploadingConfirm=$(".mod_uploading .mod_uploading_confirm");
    // $uploadingConfirm.on("mouseenter","a",function(){
    //     var $this=$(this);
    //     $this.addClass("active").siblings().removeClass("active");
    // })

})