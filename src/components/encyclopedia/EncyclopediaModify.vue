<template>
<div class="encyclopedia_modify">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="articleManagement_main">
        <div class="header">
          <div class="title">百科修改</div>
          <!-- <div class="refresh"><i class="iconfont icon-shuaxin"></i><span>刷新</span></div> -->
        </div>
        <div class="modify_content">
        <div class="upload_encyclopedia_body">
          <div class="upload_encyclopedia_tab_content">
            <div class="upload_encyclopedia_tab_item" :class="encyclopediaId?(step===1?'tab_1':step===2?'tab_11':'tab_11'):(step===1?'tab_1':step===2?'tab_11':'tab_11')">基本信息</div>
            <div class="upload_encyclopedia_tab_item" :class="encyclopediaId?(step===1?'tab_22':step===2?'tab_2':step===3?'tab_22':''):(step===1?'tab_222':step===2?'tab_2':step===3?'tab_22':'')">创建目录</div>
            <div class="upload_encyclopedia_tab_item" :class="encyclopediaId?(step===1?'tab_22':step===2?'tab_22':step===3?'tab_2':''):(step===1?'tab_222':step===2?'tab_222':step===3?'tab_2':'')">编辑百科</div>
          </div>
          <div class="upload_encyclopedia">
            <div class="upload_encyclopedia_main">
              <!-- <div class="upload_encyclopedia_header">
                上传百科
              </div> -->
              <!--百科上传第一步-->
              <div class="encyclopedia_step1" v-if="step === 1">
                <!--百科分类-->
                <div @mouseenter.stop="getMousePosition($event,'20263')"
                    @click.stop="getMousePosition($event,'20263')">
                  <upload-category
                      ref="uploadCategory"
                      :source="1" :id="encyclopediaId"
                      :child="true"
                      :selected="selectCategory"
                      @change="getCategoryId"
                      @returnTip="getChildTips">
                  </upload-category>
                </div>
                <!--封面图、标题、标签-->
                <div class="image_title_tag">
                  <upload-poster ref="uploadImage" :code="'20254'" @mouseenter="getMousePosition" :width="'320px'" :height="'225px'" :image="encyclopediaData.image"></upload-poster>
                  <div class="title_tag">
                    <!--标题-->
                    <div class="encyclopedia_title_content">
                      <div class="encyclopedia_title_name">
                        <span>*</span>
                        <p>标题</p>
                      </div>
                      <div @mouseenter.stop="getMousePosition($event,'20255')"
                          @click.stop="getMousePosition($event,'20255')">
                        <el-input
                          class="encyclopedia_title_input"
                          maxlength="20"
                          :disabled="!!encyclopediaId"
                          placeholder="请输入标题..."
                          v-model="encyclopediaData.title"
                          @input="checkTitle"
                        >
                        </el-input>
                      </div>
                      <p class="check_title">{{titleLength}}/20</p>
                    </div>
                    <!--标签-->
                    <div class="encyclopedia_tag">
                      <div class="encyclopedia_tag_name">
                        <span>*</span>
                        <p>标签</p>
                        <label>（最少1个标签，最多3个，每个标签2—8个字）</label>
                      </div>
                      <div @mouseenter.stop="getMousePosition($event,'20256')"
                          @click.stop="getMousePosition($event,'20256')">
                        <upload-tags ref="uploadTag" :tagList="encyclopediaData.label" class="up_tag"></upload-tags>
                      </div>
                    </div>
                  </div>
                </div>
                <!--百科简介-->
                <div class="encyclopedia_content">
                  <div class="encyclopedia_content_name">
                    <span>*</span>
                    <p>百科简介</p>
                    <label>（不超过200字）</label>
                  </div>
                  <div @mouseenter.stop="getMousePosition($event,'20257')"
                      @click.stop="getMousePosition($event,'20257')">
                    <el-input
                      class="encyclopedia_content_input"
                      resize="none"
                      maxlength="200"
                      placeholder="请填写跟全面的信息，让更多人找到你的视频吧！"
                      v-model="encyclopediaData.content"
                      @input="checkContent"
                      type="textarea">
                    </el-input>
                  </div>
                  <p class="check_content">{{contentLength}}/200</p>
                </div>
                <!--提交按钮-->
                <div class="upload_encyclopedia_footer">
                  <span class="upload_encyclopedia_submit upload_encyclopedia_footer_button" @click="handleNextStep">下一步</span>
                </div>
              </div>
              <!--百科上传第二步-->
              <div class="encyclopedia_step2" v-if="step === 2">
                <div class="encyclopedia_catalog">
                  <div class="encyclopedia_catalog_left">
                    <div class="encyclopedia_catalog_left_first_item" v-for="(item, index) in catalogList" :key="index">
                      <div class="encyclopedia_catalog_first_item" @mouseenter="handleFirstCatalogMouseEnter(item.id, index)" @mouseleave="handleFirstCatalogMouseLeave(item.id, index)">
                        <span class="encyclopedia_catalog_first_dot"></span>
                        <p class="encyclopedia_catalog_first_title" :class="firstCatalogId===item.id ? 'catalog_first_title_active' : ''" @click="handleSelectFirstCatalog(item.id)">{{item.name}}</p>
                        <i class="icon el-icon-close delete_icon" v-if="hoverFirstId===item.id && hoverFirstIndex === index && item.id !== currentFirstDeleteId" @click="handleDeleteCurrentFirstCatalog(index, item.id)"></i>
                        <p class="encyclopedia_catalog_first_delete" v-if="item.id === currentFirstDeleteId" @click="handleDeleteFirstCatalog(index, item.id)">确认</p>
                      </div>
                      <div class="encyclopedia_catalog_left_second_item" @mouseenter="handleSecondCatalogMouseEnter(itemS.id, indexS)" @mouseleave="handleSecondCatalogMouseLeave(itemS.id, indexS)" v-for="(itemS, indexS) in item.child" :key="indexS">
                        <span class="encyclopedia_catalog_second_dot"></span>
                        <p class="encyclopedia_catalog_second_title" :class="secondCatalogId===itemS.id ?'catalog_second_title_active':''" @click="handleSelectSecondCatalog(itemS.id)">{{itemS.name}}</p>
                        <i class="icon el-icon-close" :class="'delete_icon'" v-if="hoverSecondId===itemS.id && hoverSecondIndex === indexS && itemS.id !== currentSecondDeleteId" @click="handleDeleteCurrentSecondCatalog(index, item.id, indexS, itemS.id)"></i>
                        <p class="encyclopedia_catalog_second_delete" v-if="itemS.id === currentSecondDeleteId" @click="handleDeleteSecondCatalog(index, indexS)">确认</p>
                      </div>
                    </div>
                  </div>
                  <div class="encyclopedia_catalog_right">
                    <div class="encyclopedia_catalog_name">
                      <span>*</span>
                      <p>一级目录</p>
                      <label>（不超过15字）</label>
                    </div>
                    <div @mouseenter.stop="getMousePosition($event,'20258')"
                        @click.stop="getMousePosition($event,'20258')"
                        class="encyclopedia_input_catalog_content"
                        id="catalogFirst">
                      <el-input
                        class="catalog_input"
                        placeholder="按回车键Enter创建"
                        v-model="firstCatalogValue"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        maxlength="15"
                        @keyup.enter.native="handleAddFirstCatalog"
                      >
                      </el-input>
                      <i class="el-icon-plus" @click="handleAddFirstCatalog"></i>
                    </div>
                    <div class="encyclopedia_catalog_name">
                      <span>*</span>
                      <p>二级目录</p>
                      <label>（选填，不超过15字）</label>
                    </div>
                    <div @mouseenter.stop="getMousePosition($event,'20259')"
                        @click.stop="getMousePosition($event,'20259')"
                        class="encyclopedia_input_catalog_content"
                        id="catalogSecond">
                      <el-input
                        class="catalog_input"
                        placeholder="按回车键Enter创建"
                        v-model="secondCatalogValue"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        maxlength="15"
                        @keyup.enter.native="handleAddSecondCatalog"
                      >
                      </el-input>
                      <i class="el-icon-plus" @click="handleAddSecondCatalog"></i>
                    </div>
                  </div>
                </div>
                <!--提交按钮-->
                <div class="upload_encyclopedia_footer_2">
                  <span class="upload_encyclopedia_submit_2 upload_encyclopedia_footer_button_2" @click="handleNextStepTwo">下一步</span>
                </div>
              </div>
              <!--百科上传第三步-->
              <div class="encyclopedia_step3" v-if="step === 3">
                <div class="encyclopedia_edit">
                  <div class="encyclopedia_edit_catalog">
                    <div class="edit_catalog_item" v-for="(item, index) in catalogList" :key="index">
                      <div class="edit_catalog_item_first">
                        <span class="edit_catalog_item_first_dot" :class="item.id === selectFirstId ? 'edit_catalog_item_first_dot_active':''"></span>
                        <p class="edit_catalog_item_first_title" :class="item.id === selectFirstId ? 'edit_catalog_item_first_title_active':''" @click="handleFirstCatalogFocus(item.id, index)">{{item.name}}</p>
                      </div>
                      <div class="edit_catalog_item_second" v-for="(itemS, indexS) in item.child" :key="indexS">
                        <span class="edit_catalog_item_second_dot" v-if="!itemS.visible" :class="itemS.id === selectSecondId ? 'edit_catalog_item_second_dot_active':''"></span>
                        <i class="el-icon-check edit_true" v-if="itemS.visible"></i>
                        <p class="edit_catalog_item_second_title" :class="itemS.id === selectSecondId ? 'edit_catalog_item_second_title_active':''" @click="handleSecondCatalogFocus(item.id, index, itemS.id, indexS)">{{itemS.name}}</p>
                      </div>
                    </div>
                  </div>
                  <!--百科详情-->
                  <div class="encyclopedia_rich_text">
                    <div class="encyclopedia_description">
                      <div class="encyclopedia_description_name">
                        <span>*</span>
                        <p>百科详情</p>
                        <label>（最多800字，8张图片，每张≤5MB）</label>
                      </div>
                      <div @mouseenter.stop="getMousePosition($event,'20260')"
                          @click.stop="getMousePosition($event,'20260')">
                        <upload-rich-text ref="uploadRichText" :maxLength="800" class="up_rich_text"></upload-rich-text>
                      </div>
                    </div>
                    <div class="rich_text_button">
                      <div class="upload_encyclopedia_submit upload_encyclopedia_footer_button" @click="handleSaveRichText">保存</div>
                    </div>
                  </div>
                  <!--更多选项-->
                  <div class="encyclopedia_more_options">
                    <div class="encyclopedia_more_name" @click="handleShowFileAndPart">
                      <p>更多选项</p>
                      <i :class="attachmentVisible?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                      <label>选填——附件、使用的零件/软件</label>
                    </div>
                  </div>
                  <!--附件和零软件-->
                  <div class="file_part" :style="attachmentVisible?{height: (Number(currentFilePartHeight)+(partLength+1)*47)+'px'}:{height:0}">
                    <div class="encyclopedia_file_name">
                      <p>附件</p>
                      <label>（最多上传5个附件，每个最大10M）</label>
                    </div>
                    <div @mouseenter.stop="getMousePosition($event,'20262')"
                        @click.stop="getMousePosition($event,'20262')">
                      <upload-file ref="uploadFile" :attachmentList="encyclopediaData.attachment" class="up_file"></upload-file>
                    </div>
                    <div class="encyclopedia_part_name">
                      <p>参考文献</p>
                      <label>(最多添加50个，每个最多30个字)</label>
                    </div>
                    <div @mouseenter.stop="getMousePosition($event,'20261')"
                        @click.stop="getMousePosition($event,'20261')">
                      <upload-part ref="uploadPart" class="up_part" :part="encyclopediaData.source" @getPartLength="getPartLength"></upload-part>
                    </div>
                  </div>
                  <div class="encyclopedia_submit_button">
                    <div class="submit_button" @click="handleSubmitEncyclopedia">
                      <img src="/static/img/upload/up.png">
                      <p>发布百科</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--上传提示-->
            <!-- <upload-tips :tips="tips" :rule="rules" :top="marginTop"></upload-tips> -->
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
  import BreadCrumb from '@/components/public/BreadCrumb';
  export default {
    name: "EncyclopediaModify",
    components: {
      'upload-tips': () => import('@/components/public/upload-tips'),
      'upload-category': () => import('@/components/public/upload-category'),
      'upload-poster':() => import('@/components/public/upload-poster'),
      'upload-tags': () => import('@/components/public/upload-tags'),
      'upload-rich-text': () => import('@/components/public/uploadRichText'),
      'upload-file': () => import('@/components/public/uploadFile'),
      'upload-part': () => import('@/components/public/uploadPart'),
      BreadCrumb
    },
    data() {
      return {
        breadData: [{
          id: 1,
          name: '百科管理',
          urls: '/index/article/Article',
          icon: 'icon-home'
        }, {
          id: 2,
          name: '百科修改',
          urls: '/index/article/ArticleManagement',
          icon: 'icon-home'
        }],
        tips: '',//上传提示
        rules: [],// 上传规则数组
        marginTop: 0,// 提示框距离顶部位置
        tipsList: [],// 提示信息数组,
        encyclopediaId: '', // 百科id
        encyclopediaData: { // 百科数据
          category_id: '', // 分类id
          title: '', // 标题
          label: [], // 标签
          content: '', // 视频简介
          attachment: [], // 附件
          source: [], // 零件，软件
          image: [], // 封面图
        },
        selectCategory: {}, // 分类id对象
        titleLength: 0, // 标题长度
        contentLength: 0, // 简介长度
        step: 1, // 当前步骤
        catalogList: [], // 目录列表
        firstCatalogValue: '', // 一级输入框的值
        secondCatalogValue: '', // 二级输入框的值
        firstCatalogId: '', // 一级目录id
        secondCatalogId: '', // 二级目录id
        firstCatalogIndex: null, // 一级目录index
        secondCatalogIndex: null, // 二级目录index
        secondCatalogVisible: false, // 二级输入框显示
        deleteCatalogType: null, // 目录分类 1 一级目录  2 二级目录
        catalogIndex: [], // 删除目录下标存储
        currentFirstDeleteIndex: null, // 当前一级目录删除下标
        currentFirstDeleteId: '', // 当前一级目录删除id
        currentSecondDeleteIndex: null, // 当前二级目录删除下标
        currentSecondDeleteId: '', // 当前二级目录删除id
        hoverFirstIndex: null, // 鼠标移动到当前一级目录下标
        hoverFirstId: null, // 鼠标移动到当前一级目录id
        hoverSecondIndex: null, // 鼠标移动到当前二级目录下标
        hoverSecondId: null, // 鼠标移动到当前二级目录id
        selectFirstIndex: null, // 第三步选中一级菜单下标
        selectFirstId: null, // 第三步选中一级菜单id
        selectSecondIndex: null, // 第三步选中二级菜单下标
        selectSecondId: null, // 第三步选中二级菜单id
        attachmentVisible: false, // 附件、零软件显示
        currentFilePartHeight: '171', // 当前附件零软件的高度
        partLength: 0, // 零软件长度
        buttonVisible: true, // 按钮是否可按
      }
    },
    async created() {
      // await this.getUploadTips('upload_encyc').then(res => {
      //   this.tipsList = res
      // });
      // await this.getUploadRule('encyc').then(res => {
      //   this.rules = res
      // });
      if(this.$route.query.id) {
        this.encyclopediaId = this.$route.query.id;
        this.getEncyclopediaDetail(this.encyclopediaId);
      }
    },
    methods: {
      /****
       * 2019/2/15/015
       * author ZhengXuDong
       * function 获取右边提示框
       * @param event
       * @param code
       */
      getMousePosition(event, code){
          // if (document.readyState === "complete"){
          //     let e=event || window.event;
          //     let element=e.currentTarget;
          //     let actualTop = element.offsetTop;
          //     let current = element.offsetParent;

          //     while (current !== null){
          //         actualTop += current. offsetTop;
          //         current = current.offsetParent;
          //     }
          //     let height=document.querySelector('.upload_encyclopedia_main').offsetHeight,// 内容框宽度
          //         tipsHeight=document.querySelector('.upload_tips_box').offsetHeight,// 提示框高度
          //         headerHeight=document.querySelector('.header_box').offsetHeight;// 头部高度
          //     let productBody=document.querySelector('.upload_encyclopedia_body');
          //     let paddingTop=0;
          //     if (window.getComputedStyle) {
          //         paddingTop = parseInt(getComputedStyle(productBody, null).paddingTop)
          //     } else {
          //         paddingTop = parseInt(productBody.currentStyle.paddingTop);// 兼容IE
          //     }
          //     if(height>=tipsHeight+actualTop-paddingTop-headerHeight){
          //         this.marginTop=actualTop-paddingTop-headerHeight;
          //     }else{
          //         this.marginTop=height-tipsHeight
          //     }
          //     this.tips=this.tipsList[this.findElem(this.tipsList,'tips_code',code)].content
          // }
      },
      /*********************获取百科详细信息******************/
      // region
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 获取百科详细信息
       * @param id
       */
      getEncyclopediaDetail(id) {
        this.HttpClient.post('/admin/encyclopedias/info', {encyclopedia_id: id})
          .then(res =>{
            if(res.data.code === 200) {
              const catalog = res.data.arr;
              this.catalogList = [];
              catalog.map((item, index) =>{
                this.catalogList.push({
                  id: item.id,
                  name: item.name,
                  content:item.content,
                  visible:!!(item.content && item.content.length > 0)
                });
                if(item.child && item.child.length > 0) {
                  this.catalogList[index].child = [];
                  item.child.map((itemS, indexS) =>{
                    this.catalogList[index].child.push({
                      id: itemS.id,
                      name: itemS.name,
                      content: itemS.content,
                      visible: !!(itemS.content && itemS.content.length > 0)
                    })
                  })
                }
              });
              console.log(56565656, this.catalogList)
              const data = res.data.data;
              this.encyclopediaData = {
                category_id: data.category_id,
                title: data.title,
                content: data.content,
                label: data.label,
                source: data.source,
                integrity: data.integrity,
                image: data.cover ? data.cover : [],
                attachment: data.attachment,
              };
              this.titleLength = data.title.length;
              this.contentLength = data.content.length;
              this.attachmentVisible = true;
              this.selectCategory = {
                category: data.menu_first,
                child: data.menu_second
              };
              if(data.source && data.source.length > 0) {
                this.partLength = data.source.length;
              }
            }else {
              this.$message.error(res.data.msg);
            }
          })
      },
      // endregion
      /*********************第一步 基本信息*******************/
      // region
      /***********************字数检测*******************/
      /****
       * 2019/2/13/013
       * author ZhengXuDong
       * function 检查标题
       * @param value
       */
      checkTitle(value) {
        this.titleLength = value.length;
      },
      /****
       * 2019/2/13/013
       * author ZhengXuDong
       * function 检查百科简介字数
       * @param value
       */
      checkContent(value) {
        this.contentLength = value.length;
      },
      /****
       * 2019/2/13/013
       * author ZhengXuDong
       * function 获取版块儿回调
       * @param category
       * @param category1
       */
      getCategoryId(category, category1) {
        console.log(category, category1);
        this.encyclopediaData.category_id = category1 && category1.id ? category1.id : category && category.id ? category.id : '';
      },
        /****
         *author AMZ
         *date 2019/2/18
         *function 获取二级目录信息
         *@param tip 提示信息
         */
        getChildTips(tip){
            this.tips=tip
        },
      /****
       * 2019/2/13/013
       * author ZhengXuDong
       * function下一步
       * @param step
       */
      handleNextStep(step) {
        const data = {
          category_id: this.encyclopediaData.category_id,
          title: this.encyclopediaData.title,
          image: this.$refs.uploadImage.images,
          content: this.encyclopediaData.content,
          label: this.$refs.uploadTag.tagArr,
          integrity: 0,
          agreement_status: 1,
          word_num: this.contentLength,
        };
        if(data.label && data.label.length > 0) {
          data.integrity = data.label.length * 15;
        }
        console.log(5555555,data);
        if(this.buttonVisible) {
          this.buttonVisible = false;
          if(this.encyclopediaId) {
            delete data.agreement_status;
            data.encyclopedia_id = this.encyclopediaId;
            this.HttpClient.post('/admin/encyclopedias/edit', data)
              .then(res =>{
                if(res.data.code === 200) {
                  this.step = 2;
                  this.encyclopediaId = res.data.encyclopedia_id;
                  this.buttonVisible = true;
                }else {
                  this.$message.error(res.data.msg);
                  this.buttonVisible = true;
                }
              })
          }else {
            this.HttpClient.post('/encyclopedias/upload',data)
              .then(res =>{
                if(res.data.code === 200) {
                  this.step = 2;
                  this.encyclopediaId = res.data.encyclopedia_id;
                  this.buttonVisible = true;
                }else {
                  this.$message.error(res.data.msg);
                  this.buttonVisible = true;
                }
              });
          }
        }else {
          this.$message.warning('处理中...');
        }


      },
      // endregion

      /***********************第二步 创建目录*****************/
      // region
      /****
       * 2019/1/24/024
       * author ZhengXuDong
       * function 获取焦点
       * @param index
       */
      handleFocus(index) {
        if(index === 1) {
          const obj = document.getElementById('catalogFirst');
          obj.style.cssText = 'border-color: #1A97FF';
        }else if(index === 2) {
          const obj = document.getElementById('catalogSecond');
          obj.style.cssText = 'border-color: #1A97FF';
        }
      },
      /****
       * 2019/1/24/024
       * author ZhengXuDong
       * function 失去焦点
       */
      handleBlur(index) {
        if(index === 1) {
          const obj = document.getElementById('catalogFirst');
          obj.style.cssText = 'border-color: #E1E3E6';
        }else if(index === 2) {
          const obj = document.getElementById('catalogSecond');
          obj.style.cssText = 'border-color: #E1E3E6';
        }
      },
      /****
       * 2019/2/13/013
       * author ZhengXuDong
       * function 一级目录添加
       */
      handleAddFirstCatalog() {
        if(this.firstCatalogValue) {
          if(this.catalogList.length>=3) {
            this.$message.warning('一级目录最多只能添加三个目录')
          }else {
            this.catalogList.push({
              id: this.Tools.GetNumber(),
              name: this.firstCatalogValue
            });
          }
          this.firstCatalogValue = '';
          console.log(this.catalogList)
        }else {
          this.$message.warning('一级目录值不能为空')
        }
      },
      /****
       * 2019/2/13/013
       * author ZhengXuDong
       * function 二级目录添加
       */
      handleAddSecondCatalog() {
        if(this.firstCatalogId) {
          if(this.secondCatalogValue) {
            let index;
            this.catalogList.map((item, indexS) =>{
              if(item.id === this.firstCatalogId) {
                index = indexS;
              }
            });
            console.log(this.catalogList[index],this.catalogList[index]['child'],typeof this.catalogList[index]['child'])
            if(this.catalogList[index]['child'] === undefined) {
              this.catalogList[index]['child'] = [];
            }
            if(this.catalogList[index]['child'].length >= 3) {
              this.$message.error('二级目录最多只能添加三个目录')
            }else {
              this.catalogList[index]['child'].push({
                id: this.Tools.GetNumber(),
                name: this.secondCatalogValue,
                visible: false
              });
              this.$set(this.catalogList,index,this.catalogList[index]);
              this.secondCatalogValue = '';
            }

          }else {
            this.$message.warning('二级目录值不能为空')
          }
        }else {
          this.$message.warning('请选择一级目录列表')
        }
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 鼠标移动到一级目录删除按钮显示
       * @param id
       * @param index
       */
      handleFirstCatalogMouseEnter(id, index) {
        this.hoverFirstId = id;
        this.hoverFirstIndex = index;
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 鼠标离开一级目录
       * @param id
       * @param index
       */
      handleFirstCatalogMouseLeave(id, index) {
        this.hoverFirstId = '';
        this.hoverFirstIndex = null;
        this.currentFirstDeleteIndex = '';
        this.currentFirstDeleteId = '';
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 鼠标移动到二级目录删除按钮显示
       * @param id
       * @param index
       */
      handleSecondCatalogMouseEnter(id, index) {
        this.hoverSecondId = id;
        this.hoverSecondIndex = index;
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 鼠标离开二级目录
       * @param id
       * @param index
       */
      handleSecondCatalogMouseLeave(id, index) {
        this.hoverSecondId = '';
        this.hoverSecondIndex = null;
        this.currentSecondDeleteIndex = '';
        this.currentSecondDeleteId = '';
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 一级目录选择
       * @param id
       * @param name
       * @param index
       */
      handleSelectFirstCatalog(id, name, index) {
        this.firstCatalogId = id;
        /*this.firstCatalogIndex = index;
        this.secondCatalogIndex = null;
        this.secondCatalogVisible = true;*/
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 选择二级目录
       * @param id
       * @param name
       * @param index
       * @param parentName
       * @param parentIndex
       */
      handleSelectSecondCatalog(id, name, index, parentName, parentIndex) {
        this.secondCatalogId = id;
        /*this.firstCatalogIndex = parentIndex;
        this.secondCatalogIndex = index;
        this.secondCatalogVisible = true;*/
      },
      /****
       * 2019/2/13/013
       * author ZhengXuDong
       * function 删除一级目录
       * @param index
       * @param id
       */
      handleDeleteFirstCatalog(index, id) {
        // this.catalogIndex = [];
        // this.catalogIndex.push(index);
        this.deleteCatalogType = 1;
        this.catalogList.splice(index, 1);
        this.currentFirstDeleteIndex = null;
        this.currentFirstDeleteId = '';
        this.hoverFirstId = '';
        this.hoverFirstIndex = null;
        console.log(this.catalogList)
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 选中一级目录当前删除
       * @param index
       * @param id
       */
      handleDeleteCurrentFirstCatalog(index, id) {
        this.currentFirstDeleteIndex = index;
        this.currentFirstDeleteId = id;
        this.hoverFirstId = '';
        this.hoverFirstIndex = null;
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 选中二级目录当前删除
       * @param parentIndex
       * @param parentId
       * @param index
       * @param id
       */
      handleDeleteCurrentSecondCatalog(parentIndex, parentId, index, id) {
        this.currentSecondDeleteIndex = index;
        this.currentSecondDeleteId = id;
        this.hoverSecondId = '';
        this.hoverSecondIndex = null;
      },
      /****
       * 2019/2/13/013
       * author ZhengXuDong
       * function 二级目录删除
       * @param index 一级目录index
       * @param indexS 二级目录index
       */
      handleDeleteSecondCatalog(index, indexS) {
        /*this.catalogIndex = [];
        this.catalogIndex.push(index);
        this.catalogIndex.push(indexS);*/
        this.deleteCatalogType = 2;
        this.catalogList[index].child.splice(indexS, 1);
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 第二步提交
       */
      handleNextStepTwo() {
        if(this.catalogList.length > 0) {
          this.step = 3;
        }else {
          this.$message.warning('请添加目录');
        }
      },
      // endregion

      /***********************第三步 编辑百科*****************/

      // region
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 一级菜单选中
       * @param id
       * @param index
       */
      handleFirstCatalogFocus(id, index) {
        this.selectFirstId = id;
        this.selectFirstIndex = index;
        this.selectSecondId = '';
        this.selectSecondIndex = null;
        this.$refs.uploadRichText.content = this.catalogList[index].content;
          console.log(this.catalogList[index].content);
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 二级菜单选中
       * @param parentId
       * @param parentIndex
       * @param id
       * @param index
       */
      handleSecondCatalogFocus(parentId, parentIndex, id, index) {
        console.log(parentId, parentIndex, id, index);
        this.selectFirstId = parentId;
        this.selectFirstIndex = parentIndex;
        this.selectSecondId = id;
        this.selectSecondIndex = index;
        this.$refs.uploadRichText.content = this.catalogList[parentIndex].child[index].content;
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 保存百科详情
       */
      handleSaveRichText() {
        if(this.selectSecondId) {
          this.catalogList[this.selectFirstIndex].child[this.selectSecondIndex].content = this.$refs.uploadRichText.content;
          this.catalogList[this.selectFirstIndex].child[this.selectSecondIndex].visible = true;
          this.$refs.uploadRichText.content = '';
        }else if(this.selectFirstId){
            this.catalogList[this.selectFirstIndex].content = this.$refs.uploadRichText.content;
            this.catalogList[this.selectFirstIndex].visible = true;
            this.$refs.uploadRichText.content = '';
        }else {
          this.$message.warning('请选择二级目录，再添加详情');
        }
        console.log(this.catalogList)
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 显示或隐藏附件和零软件
       */
      handleShowFileAndPart() {
        this.attachmentVisible = !this.attachmentVisible;
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 回调part长度
       * @param value
       */
      getPartLength(value) {
        this.partLength = value;
      },
      /****
       * 2019/2/14/014
       * author ZhengXuDong
       * function 发布百科
       */
      handleSubmitEncyclopedia() {
        let len = 0;
        this.catalogList.map((item, index) =>{
          if(item.child && item.child.length > 0) {
            item.child.map((itemS, indexS) => {
              if(itemS.content) {
                len += this.Tools.removeTAG(itemS.content).length;
              }
            })
          }
        });
        const data = {
          attachment: this.$refs.uploadFile.fileList,
          catalog: this.catalogList,
          encyclopedia_id: this.encyclopediaId,
          integrity: len >= 600 ? 40 : 0,
          source: this.$refs.uploadPart.partList,
        };
        console.log(data);
        if(this.buttonVisible) {
          this.buttonVisible = false;
          this.HttpClient.post('/admin/encyclopedias/addCatalog', data)
            .then(res =>{
              if(res.data.code === 200) {
                this.$message.success(res.data.msg);
                this.buttonVisible = true;
                this.$router.go(-1);
              }else {
                this.$message.error(res.data.msg);
                this.buttonVisible = true;
              }
            })
        }else {
          this.$message.warning('处理中...');
        }

      },
      // endregion

    }
  }
</script>

<style scoped lang="less">
  @media screen and (max-width: 1200px) {
    .upload_encyclopedia {
      width: 960px;
      .upload_encyclopedia_main {
        width: 704px;
      }
    }
    .upload_encyclopedia_tab_content {
      width: 960px;
    }
  }
  @media screen and (min-width: 1200px) {
    .upload_encyclopedia {
      width: 1200px;
      .upload_encyclopedia_main {
        width: 880px;
      }
    }
    .upload_encyclopedia_tab_content {
      width: 1200px;
    }
  }

  .upload_encyclopedia_tab_content {
    margin: 0 auto 30px;
    display: flex;
    .upload_encyclopedia_tab_item {
      width: 94px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size:14px;
      font-family:MicrosoftYaHei-Bold sans-serif;
      letter-spacing: 1px;
      font-weight:bold;
    }
    .tab_1 {
      background:url("/static/img/upload/back1.png");
    }
    .tab_11 {
      background:url("/static/img/upload/back11.png");
      color: #969899;
    }
    .tab_111 {
      background:url("/static/img/upload/back111.png");
      color: #969899;
    }
    .tab_2 {
      background:url("/static/img/upload/back2.png");
    }
    .tab_22 {
      background:url("/static/img/upload/back22.png");
      color: #969899;
    }
    .tab_222 {
      background:url("/static/img/upload/back222.png");
      color: #969899;
    }
  }
  .encyclopedia_modify{
    .bread{
      margin: 10px;
    }
    .articleManagement_main::-webkit-scrollbar {display:none}
    .articleManagement_main{
      margin-left: 10px;
      margin-top: 10px;
      background: #fff;
      height: calc(100vh - 100px);
      width: calc(100vw - 240px);
      border-radius: 2px;
      overflow-y: auto;
      /*标题*/
      .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        border-bottom: 2px solid #f2f2f2;
        padding: 0 40px;
        .title{
          font-size: 20px;
          color: #222;
        }
        /*刷新*/
        .refresh{
          cursor: pointer;
          span{
            display: inline-block;
            margin-left: 10px;
          }
        }
      }
      /*問題修改主体*/
      .modify_content{
        padding: 0 40px;
  .upload_encyclopedia_body {
    padding: 20px 0 120px;
    background: #FAFBFC;
    font-family: MicrosoftYaHei sans-serif;

    .upload_encyclopedia {
      margin: 0 auto;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      .upload_encyclopedia_main {
        position: relative;
        background: #FFF;
        padding: 42px 20px 40px;
        border: 1px solid rgba(235, 240, 245, 1);
        box-shadow: 1px 2px 6px 0 rgba(21, 165, 255, 0.1);

        .upload_encyclopedia_header {
          position: absolute;
          top: -14px;
          left: 10px;
          width: 114px;
          height: 47px;
          color: #FFF;
          font-size: 18px;
          font-weight: bold;
          line-height: 40px;
          text-align: center;
          padding-right: 10px;
          background: url("/static/img/icon/upload_header.png") no-repeat left top;
        }

        /*第一步*/
        .encyclopedia_step1 {
          min-height: 784px;
          /*封面图、标题、标签*/
          .image_title_tag {
            display: flex;
            margin-top: 10px;
            .title_tag {
              flex: 1;
              margin-left: 20px;
              /*标题*/
              .encyclopedia_title_content {
                position: relative;
                .encyclopedia_title_name {
                  display: flex;
                  align-items: center;
                  span {
                    color: #FF4D4F;
                    margin-right: 10px;
                  }
                  p {
                    color: #323333;
                    font-size: 16px;
                    letter-spacing:1px;
                  }
                }
                .encyclopedia_title_input {
                  margin-top: 10px;
                  /deep/.el-input__inner {
                    border: 1px solid #E1E3E6 !important;
                    border-radius: 0 !important;
                    height: 36px !important;
                    line-height: 36px !important;
                    color: #646566;
                    font-size: 14px;
                    letter-spacing: 1px;
                    padding-right: 50px !important;
                    &:focus {
                      border: 1px solid #1A97FF !important;
                    }
                    &::placeholder {
                      font-size: 14px;
                      color: #C8CACC;
                      letter-spacing: 1px;
                    }
                  }
                }
                .check_title {
                  position: absolute;
                  top: 42px;
                  right: 10px;
                  color: #C8CACC;
                  letter-spacing: 2px;
                  font-size: 14px;
                }
              }

              /*标签*/
              .encyclopedia_tag {
                margin-top: 30px;
                .encyclopedia_tag_name {
                  display: flex;
                  align-items: center;
                  span {
                    color: #FF4D4F;
                    margin-right: 10px;
                  }
                  p {
                    color: #323333;
                    font-size: 16px;
                    letter-spacing:1px;
                  }
                  label {
                    color: #969899;
                    font-size:12px;
                  }
                }
                .up_tag {
                  margin-top: 10px;
                }
              }
            }
          }

          /*百科简介*/
          .encyclopedia_content {
            margin-top: 30px;
            position: relative;
            .encyclopedia_content_name {
              display: flex;
              align-items: center;
              span {
                color: #FF4D4F;
                margin-right: 10px;
              }
              p {
                color: #323333;
                font-size: 16px;
                letter-spacing:1px;
              }
              label {
                color: #969899;
                font-size:12px;
              }
            }

            .encyclopedia_content_input {
              margin-top: 10px;
              /deep/.el-textarea__inner {
                border: 1px solid #E1E3E6 !important;
                border-radius: 0 !important;
                height: 200px !important;
                color: #646566;
                font-size: 14px;
                letter-spacing: 1px;
                &:focus {
                  border: 1px solid #1A97FF !important;
                }
                &::placeholder {
                  font-size: 14px;
                  color: #C8CACC;
                  letter-spacing: 1px;
                }
              }
            }
            .check_content {
              position: absolute;
              bottom: 10px;
              right: 10px;
              color: #C8CACC;
              letter-spacing: 2px;
              font-size: 14px;
            }
          }

          /*底部按钮*/
          .upload_encyclopedia_footer {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 40px;

            .upload_encyclopedia_footer_button {
              color: #C8CACC;
              font-size: 16px;
              padding: 5px 23px;
              cursor: pointer;
              box-sizing: border-box;
            }

            .upload_encyclopedia_cancel {
              padding: 4px 22px;
              border: 1px solid rgba(225, 227, 230, 1);
            }

            .upload_encyclopedia_cancel:hover {
              color: #FFF;
              border: none;
              padding: 5px 23px;
              background: linear-gradient(90deg, rgba(0, 242, 254, 1) 0%, rgba(26, 148, 255, 1) 100%);
            }

            .upload_encyclopedia_submit {
              color: #FFF;
              margin-left: 28px;
              background: linear-gradient(90deg, rgba(0, 242, 254, 1) 0%, rgba(26, 148, 255, 1) 100%);
            }

            .upload_encyclopedia_submit:hover {
              background: linear-gradient(90deg, #018f99 0%, #0e5e99 100%);
            }
          }
        }

        /*第二步*/
        .encyclopedia_step2 {
          min-height: 765px;
          .encyclopedia_catalog {
            display: flex;
            margin-top: 20px;
            /*创建目录左边*/
            .encyclopedia_catalog_left {
              width: 320px;
              min-height: 360px;
              border-right: 1px solid #E1E3E6;
              .encyclopedia_catalog_left_first_item {
                margin-top: 30px;
                &:first-child {
                  margin-top: 0;
                }
                /*第一级目录*/
                .encyclopedia_catalog_first_item {
                  display: flex;
                  align-items: center;
                  position: relative;
                  cursor: pointer;
                  .encyclopedia_catalog_first_dot {
                    width:6px;
                    height:18px;
                    background:linear-gradient(212deg,rgba(0,240,254,1) 0%,rgba(26,151,255,1) 100%);
                    position: absolute;
                    left: -20px;
                  }
                  .encyclopedia_catalog_first_title {
                    flex: 1;
                    font-size:16px;
                    font-family:MicrosoftYaHei-Bold sans-serif;
                    font-weight:bold;
                    color:#C8CACC;
                    letter-spacing:1px;
                    text-align: left;
                  }
                  .catalog_first_title_active {
                    color: #323333 !important;
                  }
                  .delete_icon {
                    font-size: 12px;
                    color: #C8CACC;
                    margin-right: 20px;
                    &:hover {
                      background:linear-gradient(212deg,rgba(0,240,254,1) 0%,rgba(26,151,255,1) 100%);
                      -webkit-background-clip: text;
                      color: transparent;
                    }
                  }
                  .encyclopedia_catalog_first_delete {
                    font-size:12px;
                    font-family:MicrosoftYaHei sans-serif;
                    color:rgba(255,77,79,1);
                    letter-spacing: 1px;
                    margin-right: 20px;
                  }
                }
                /*第二级目录*/
                .encyclopedia_catalog_left_second_item {
                  display: flex;
                  align-items: center;
                  cursor: pointer;
                  margin-top: 5px;
                  .encyclopedia_catalog_second_dot {
                    width:4px;
                    height:4px;
                    border-radius: 50%;
                    margin-right: 10px;
                    background:linear-gradient(180deg,rgba(0,240,254,1) 0%,rgba(26,151,255,1) 100%);
                  }
                  .encyclopedia_catalog_second_title {
                    flex: 1;
                    font-size:14px;
                    font-family:MicrosoftYaHei sans-serif;
                    color:rgba(200,202,204,1);
                    text-align: left;
                  }
                  .catalog_second_title_active {
                    color: #323333 !important;
                  }
                  .delete_icon {
                    font-size: 12px;
                    color: #C8CACC;
                    margin-right: 20px;
                    &:hover {
                      background:linear-gradient(212deg,rgba(0,240,254,1) 0%,rgba(26,151,255,1) 100%);
                      -webkit-background-clip: text;
                      color: transparent;
                    }
                  }
                  .encyclopedia_catalog_second_delete {
                    font-size:12px;
                    font-family:MicrosoftYaHei sans-serif;
                    color:rgba(255,77,79,1);
                    letter-spacing: 1px;
                    margin-right: 20px;
                  }
                }
              }
            }
            /*创建目录右边*/
            .encyclopedia_catalog_right {
              flex: 1;
              margin-left: 20px;
              /*一级目录添加*/
              .encyclopedia_catalog_name {
                display: flex;
                align-items: center;
                &:nth-child(n+2) {
                  margin-top: 40px;
                }
                span {
                  color: #FF4D4F;
                  margin-right: 10px;
                }
                p {
                  color: #323333;
                  font-size: 16px;
                  letter-spacing:1px;
                  font-family:MicrosoftYaHei sans-serif;
                }
                label {
                  color: #969899;
                  font-size:12px;
                }
              }
              .encyclopedia_input_catalog_content {
                margin-top: 10px;
                display: flex;
                align-items: center;
                border: 1px solid #E1E3E6;
                height: 36px;
                &:focus {
                  border-color: #1A97FF;
                }
                .catalog_input {
                  flex: 1;
                  /deep/.el-input__inner {
                    border: none !important;
                    height: 34px !important;
                    line-height: 34px !important;
                    &::placeholder {
                      font-size:14px;
                      color: #C8CACC;
                      letter-spacing: 1px;
                    }
                  }
                }
                i {
                  font-size: 20px;
                  color: #C8CACC;
                  margin-right: 10px;
                  &:hover {
                    background:linear-gradient(360deg,rgba(0,242,254,1) 0%,rgba(26,148,255,1) 100%);
                    -webkit-background-clip: text;
                    color: transparent;
                    cursor: pointer;
                  }
                }
              }
            }
          }

          /*底部按钮*/
          .upload_encyclopedia_footer_2 {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 40px;

            .upload_encyclopedia_footer_button_2 {
              color: #C8CACC;
              font-size: 16px;
              padding: 5px 23px;
              cursor: pointer;
              box-sizing: border-box;
            }

            .upload_encyclopedia_submit_2 {
              color: #FFF;
              margin-left: 28px;
              background: linear-gradient(90deg, rgba(0, 242, 254, 1) 0%, rgba(26, 148, 255, 1) 100%);
            }

            .upload_encyclopedia_submit_2:hover {
              background: linear-gradient(90deg, #018f99 0%, #0e5e99 100%);
            }
          }
        }

        /*第三步*/
        .encyclopedia_step3 {
          min-height: 772px;
          .encyclopedia_edit {
            margin-top: 12px;
            /*目录结构*/
            .encyclopedia_edit_catalog {
              /*目录结构子项*/
              display: flex;
              justify-content: flex-start;
              width: 100%;
              .edit_catalog_item {
                width: 30%;
                margin-right: 5%;
                border-left: 1px solid #E1E3E6;
                &:first-child {
                  margin-left: -20px;
                  border-left: none;
                }
                &:last-child {
                  margin-right: 0;
                }
                /*一级目录*/
                .edit_catalog_item_first {
                  display: flex;
                  align-items: center;
                  .edit_catalog_item_first_dot {
                    width:6px;
                    height:18px;
                    background: #D8D8D8;
                  }
                  .edit_catalog_item_first_dot_active {
                    background:linear-gradient(212deg,rgba(0,240,254,1) 0%,rgba(26,151,255,1) 100%) !important;
                  }
                  .edit_catalog_item_first_title {
                    margin-left: 20px;
                    font-size:16px;
                    font-family:MicrosoftYaHei-Bold sans-serif;
                    font-weight:bold;
                    color:#C8CACC;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    cursor: pointer;
                  }
                  .edit_catalog_item_first_title_active {
                    color: #323333 !important;
                  }
                }
                /*二级目录*/
                .edit_catalog_item_second {
                  margin-left: 26px;
                  display: flex;
                  align-items: center;
                  margin-top: 5px;
                  .edit_catalog_item_second_dot {
                    width:4px;
                    height:4px;
                    background:rgba(200,202,204,1);
                    border-radius: 50%;
                  }
                  .edit_catalog_item_second_dot_active {
                    background:linear-gradient(212deg,rgba(0,240,254,1) 0%,rgba(26,151,255,1) 100%) !important;
                  }
                  .edit_true {
                    font-size: 12px;
                    background:linear-gradient(212deg,rgba(0,240,254,1) 0%,rgba(26,151,255,1) 100%);
                    -webkit-background-clip: text;
                    color: transparent;
                  }
                  .edit_catalog_item_second_title {
                    margin-left: 10px;
                    font-size:14px;
                    font-family:MicrosoftYaHei sans-serif;
                    color:#C8CACC;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    cursor: pointer;
                  }
                  .edit_catalog_item_second_title_active {
                    color: #323333 !important;
                  }
                }
              }
            }

            /*百科详情*/
            .encyclopedia_rich_text {
              .encyclopedia_description {
                margin-top: 30px;
                .encyclopedia_description_name {
                  display: flex;
                  align-items: center;
                  span {
                    color: #FF4D4F;
                    margin-right: 10px;
                  }
                  p {
                    color: #323333;
                    font-size: 16px;
                    letter-spacing:1px;
                  }
                  label {
                    color: #969899;
                    font-size:12px;
                  }
                }

                .up_rich_text {
                  margin-top: 10px;
                }
              }
              /*保存按钮*/
              .rich_text_button {
                display: flex;
                justify-content: flex-end;
                margin-top: 5px;
                margin-right: 60px;
                .upload_encyclopedia_footer_button {
                  font-size: 12px;
                  cursor: pointer;
                  box-sizing: border-box;
                  width: 52px;
                  height: 24px;
                  text-align: center;
                  line-height: 24px;
                }
                .upload_encyclopedia_submit {
                  color: #C8CACC;
                  border:1px solid rgba(225,227,230,1);
                  background: #fff;
                }

                .upload_encyclopedia_submit:hover {
                  color: #FFF;
                  background: linear-gradient(90deg, rgba(0, 242, 254, 1) 0%, rgba(26, 148, 255, 1) 100%);
                }
              }
            }

            /*更多选项*/
            .encyclopedia_more_options {
              font-family:MicrosoftYaHei sans-serif;
              margin-top: 35px;
              .encyclopedia_more_name {
                display: flex;
                align-items: center;
                border-bottom: 1px dashed #E1E3E6;
                padding-bottom: 7px;
                cursor: pointer;
                > p {
                  font-size:14px;
                  color:rgba(50,51,51,1);
                  letter-spacing:1px;
                }
                i {
                  color: #C8CCCC;
                  font-size: 12px;
                  margin: 0 10px;
                }
                label {
                  font-size:12px;
                  color:rgba(200,202,204,1);
                  cursor: pointer;
                }
              }
            }

            /*附件和零软件*/
            .file_part {
              transition: all .4s linear;
              overflow: hidden;

              /*附件*/
              .encyclopedia_file_name {
                display: flex;
                align-items: center;
                margin-top: 20px;
                p {
                  color: #323333;
                  font-size: 16px;
                  letter-spacing:1px;
                }
                label {
                  color: #969899;
                  font-size:12px;
                  cursor: pointer;
                }
              }
              .up_file {
                margin-top: 7px !important;
              }

              /*零件，软件*/
              .encyclopedia_part_name {
                display: flex;
                align-items: center;
                margin-top: 20px;
                p {
                  color: #323333;
                  font-size: 16px;
                  letter-spacing:1px;
                }
                label {
                  color: #969899;
                  font-size:12px;
                  cursor: pointer;
                }
              }
              .up_part {
                margin-top: 7px;
              }
            }

            /*发布按钮*/
            .encyclopedia_submit_button {
              display: flex;
              justify-content: center;
              margin-top: 40px;
              .submit_button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 120px;
                height: 36px;
                color: white;
                cursor: pointer;
                background:linear-gradient(212deg,rgba(0,240,254,1) 0%,rgba(26,151,255,1) 100%) !important;
                &:hover {
                  background: linear-gradient(90deg, #018f99 0%, #0e5e99 100%) !important;
                }
                img {
                  width: 20px;
                  height: 20px;
                }
                p {
                  font-size:16px;
                  font-family:MicrosoftYaHei-Bold sans-serif;
                  font-weight:bold;
                  color:rgba(255,255,255,1);
                  letter-spacing: 1px;
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
      }}}
</style>
