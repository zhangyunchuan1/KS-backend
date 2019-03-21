<template>
    <div class="uploading_main_item uploading_main_content">
        <div class="main_head">
            <i class="icon icon_content"></i>
            <span class="main_txt">内容描述</span>
            <span class="tip">(最多100字)</span>
        </div>
        <div id='edit'>
            <quill-editor
                    v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event,5000)">
            </quill-editor>
        </div>
    </div>
</template>

<script>

    import { quillEditor } from 'vue-quill-editor'
    import * as Quill from 'quill'  //引入编辑器

    //quill图片可拖拽改变大小
    import  ImageResize   from 'quill-image-resize-module';
    Quill.register('modules/imageResize', ImageResize);

    //quill图片可拖拽上传
    import { ImageDrop } from 'quill-image-drop-module';
    Quill.register('modules/imageDrop', ImageDrop);

    // 自定义字体大小
    let fontSize = ['10px', '12px', '14px', '16px', '18px', '20px'];
    let Size = Quill.import('attributors/style/size');
    Size.whitelist = fontSize;
    Quill.register(Size, true);

    var fonts = ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];
    var Font = Quill.import('formats/font');
    Font.whitelist = fonts; //将字体加入到白名单

    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    Quill.register('modules/ImageExtend', ImageExtend)

    var toolbarOptions = [
        [ 'italic', 'underline', 'strike','bold'],
        ['blockquote','code-block'],
        // [{'header':1},{'header':2}],
        [{'list':'ordered'},{'list':'bullet'}],
        [{'script':'sub'},{'script':'super'}],
        [{'indent':'-1'},{'indent':'+1'}],
        [{'direction':'rtl'}],
        [{'size':fontSize}],
        // [{'header':[1,2,3,4,5,6,false]}],
        [{'color':[]}],
        // [{'font':fonts}],
        [{'align':[]}],
        // ['clear'],
        ['image']
    ];

    export default {
        name: "uploadingMainContent",
        props:["neirData","description"],
        data(){
            return {
                word_num:null,//字数
                content:null,
                updateUrl:'',
                editorOption:{
                    modules:{
                        toolbar:{
                            container: toolbarOptions,
                            handlers: {
                                'image': function () {  // 劫持原来的图片点击按钮事件
                                    QuillWatch.emit(this.quill.id)
                                }
                            }
                        },
                        imageDrop:true,
                        imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'none',
                                color: 'white'
                            },
                            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                        },
                        ImageExtend: {
                            loading: true,
                            name: 'img',
                            size:1,
                            action: '',
                            response: (res) => {
                                return res.info
                            },
                            headers: (xhr) => {
                                // xhr.setRequestHeader('myHeader','myValue')
                            },  //设置请求头部
                            sizeError: () => {
                                this.$message.error('图片大小超过限制1M')
                            },  // 图片超过大小的回调
                            start: () => {},  //自定义开始上传触发事件
                            end: () => {},  //自定义上传结束触发的事件，无论成功或者失败
                            error: () => {},  //上传失败触发的事件
                            success: () => {},  //上传成功触发的事件
                            change: (xhr, formData) => {
                                // xhr.setRequestHeader('myHeader','myValue')
                                // formData.append('token', 'myToken')
                            } //每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
                        },
                    }
                },
                theme:'snow',
              localUrl: window.location.pathname,
              pathName: '/home/uploadingService'
            }
        },
        async created(){
            this.content = this.neirData;
            await this.handleGetText();
        },
        methods:{
            handleGetText() {
                this.$watch('neirData', function(newVal,oldVal) {
                this.content = newVal;
            })
            },
            /***********************************文档编辑器**********************************/
            onEditorBlur(){//失去焦点事件
              this.$emit('ArticleMainContent' ,this.content)
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(e,decimalNum){//内容改变事件
              console.log(this.content)
              var lengthcontent = this.content
              function removeHTMLTag(str) {
                var str;
                str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
                str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
                str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
                str = str.replace(/ /ig,'');//去掉
                return str;
              }
                console.log(removeHTMLTag(lengthcontent).length);
                this.word_num = removeHTMLTag(lengthcontent).length;
                this.$emit('getNum' ,this.word_num)
                e.quill.deleteText(decimalNum,1);//保留 strValue 的 前 decimalNum 位字符，
                this.$emit('Quescthon',this.content)
              if(this.localUrl === this.pathName){
                if(removeHTMLTag(lengthcontent).length<1001){
                  this.$store.dispatch('getServiceUploadData',{content: this.content}).then(res=>{
                    console.log(this.$store.state.serviceUpload.serviceUploadData)
                  });
                }else{
                  this.$message.error('字数超过限制');
                }
              }
            },

            // 显示宽度修改框
            _showWidthBox (event) {
                // 获取当前图片对象
                let currentImg = event.target;

                // 弹出宽度输入框
                this.$prompt('请输入宽度', '提示', {
                    inputValue: currentImg.width,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({value}) => {
                    // 赋值新宽度
                    currentImg.width = value
                }).catch(() => {})
            },
            // 监听图片点击
            _listenerImage () {
                // 获取DOM对象
                let editor = document.getElementsByClassName('ql-editor')[0]
                let img = editor.getElementsByTagName('img')

                // 非空验证
                if (img.length === 0) {
                    return
                }

                for (let i = 0; i < img.length; i++) {
                    let currentImg = img[i];
                    // 绑定且防止重复绑定
                    currentImg.removeEventListener('dblclick', this._showWidthBox, false);
                    currentImg.addEventListener('dblclick', this._showWidthBox, false)
                }
            },
        },
        watch:{
          description:function(){
            this.content = this.description
          }
        }
    }
</script>

<style scoped lang="less">
    .quill-editor{
        width:800px;
    }
  .main_head{
    .tip{
      margin-left: 10px;
      font-size: 12px;
      color: #808080;
    }
  }
</style>
