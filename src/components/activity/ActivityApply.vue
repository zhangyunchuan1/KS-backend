<template>
    <div class="activity_apply">
      <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
      <div class="content">
        <p class="title">新活动申请</p>
        <div class="content_contain">
          <div class="conditions">
            <el-select class="select_normal" clearable @change="plateChange" @clear="getApplyList" v-model="plateValue" placeholder="板块">
              <el-option label="全部" :value="null"></el-option>
              <el-option
                v-for="(item,index) in plateOptions"
                :key="index"
                :label="item.name"
                :value="index">
              </el-option>
            </el-select>
            <el-select class="select_normal" clearable @change="getApplyList" @clear="getApplyList" v-model="levelValue" placeholder="二级" v-if="plateValue!==''">
              <el-option
                v-for="item in levelOptions"
                :key="item.menu_id"
                :label="item.name"
                :value="item.menu_id">
              </el-option>
            </el-select>
            <el-select class="select_normal" clearable @change="getApplyList" @clear="getApplyList" v-model="statusValue" placeholder="状态">
              <el-option label="全部" :value="null"></el-option>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="tables">
            <el-table
              :data="tableData"
              :header-row-style="{height:'40px'}"
              :header-cell-style="{padding:0,background:'#15bafe',color:'white'}"
              :row-style="{height:'40px'}"
              :cell-style="{padding:0}"
              border
              :stripe="true"
              style="width: 100%">
              <el-table-column
                prop="id"
                align="center"
                label="ID"
                width="100">
              </el-table-column>
              <el-table-column
                label="活动名称"
                width="180"
                align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="row_activity">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="company_name"
                label="商家昵称"
                width="150"
                align="center"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="folder"
                label="板块"
                width="120"
                align="center"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="menu_name"
                label="二级"
                width="120"
                align="center"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="city_name"
                label="城市"
                width="100"
                align="center"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="状态"
                width="120"
                align="center"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span class="normal_color" v-if="scope.row.status===1">已通过</span>
                    <span class="audit_color" v-if="scope.row.status===2">待提交</span>
                    <span class="notpass_color" v-if="scope.row.status===3">被驳回</span>
                    <span class="cancel_color" v-if="scope.row.status===7">待审核</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="created_at"
                label="申请时间"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                min-width="250"
                align="center"
                >
                <template slot-scope="scope">
                  <el-button type="primary" plain size="mini" @click="basicButton(scope.row.id)">基本信息</el-button>
                  <el-button type="primary" plain size="mini" v-if="scope.row.status===3" @click="rejectButton(scope.row.id)">查看反馈</el-button>
                  <el-button type="primary" plain size="mini" @click="viewModal(scope.row.active_id)">预览活动</el-button>
                  <el-button type="primary" plain size="mini" v-if="scope.row.status===3 || scope.row.status===2" @click="examineButton(scope.row.active_id)">提交审核</el-button>
                  <el-button type="primary" plain size="mini" v-if="isShowDelete(scope.row.created_at) && scope.row.status===3" @click="deleteButton(scope.row.active_id)"> 删除</el-button>
                  <el-button type="primary" plain size="mini" @click="remarkButton(scope.row.active_id)">添加备注</el-button>
                  <el-button type="primary" plain size="mini" @click="checkMerchantButton(scope.row.company_id)">查看商家资质</el-button>
                </template>
              </el-table-column>
            </el-table>
              <el-pagination
                      v-if="total"
                      layout="prev, pager, next"
                      :total="total"
                      :page-size="pageSize"
                      @current-change="currentChange"
              ></el-pagination>
          </div>
        </div>
      </div>
      <!--提交审核-->
      <el-dialog :visible.sync="examineVisible" width="400px">
        <div slot="title" class="dialog_head_title">
          <i class="iconfont icon-geren examine_icon"></i>
          <span>提交审核</span>
        </div>
        <div class="examine_content">
          <el-upload
            class="up_safe"
            action="customize"
            :file-list="protocols"
            :auto-upload="true" 
            :on-preview="handlePreview"
            :http-request="defaultBehavior"
            :before-remove="beforeRemove"
            :before-upload="uploadProtocol"
            multiple
          >
            <div class="up_safe_header">
              <el-button size="small" class="btn_up" type="primary">点击上传</el-button>
              <p>上传格式:doc | docx | txt | xlsx | xls</p>
            </div>

          </el-upload>
          <div class="up_img">
            <p class="remark">上传相关图片，格式:png | jpg | jpeg | tiff | tif</p>
            <el-upload
              class="up_img_item"
              action="customize"
              list-type="picture-card"
              :file-list="images"
              
              :auto-upload="true" 
              :before-upload="uploadFile"
              :http-request="defaultBehavior"
              multiple>
              <i class="el-icon-plus icon_plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
        <div class="user_footer" slot="footer">
          <el-row>
            <el-button class="btn_foot" @click="examineVisible = false">取消</el-button>
            <el-button type="primary" class="btn_foot" @click="handleExamine">提交</el-button>
          </el-row>
        </div>
      </el-dialog>
      <!--添加备注-->
      <el-dialog :visible.sync="remarkVisible" width="400px">
        <div slot="title" class="dialog_delete_head_title">
          <i class="iconfont icon-edit-square delete_icon"></i>
          <span>添加备注</span>
        </div>
        <div class="remark_content">
          <p class="remark_p">内容</p>
          <el-input
            type="textarea"
            :rows="2"
            class="text_area"
            placeholder="商家的修改，取消，结束活动都将显示在历史里面"
            v-model="remark">
          </el-input>
          <p class="history_p">历史</p>
          <div class="h_content">
            <div class="history_item" v-for="(item,index) in historyData" :key="index">
              <div class="item_top">
                <div class="point"/>
                <p class="h_name">{{item.create_name}}</p>
                <p class="h_time">{{item.created_at}}</p>
              </div>
              <p class="h_message">{{item.content}}</p>
            </div>
          </div>
        </div>
        <div class="user_footer" slot="footer">
          <el-row class="row_e">
            <el-button class="btn_deletes" size="small" @click="remarkVisible = false">取消</el-button>
            <el-button type="primary" size="small"  class="btn_delete" @click="addRemark">提交</el-button>
          </el-row>
        </div>
      </el-dialog>
      <!--商家资质-->
      <el-dialog :visible.sync="merchantDialog" width="400px">
            <div slot="title" class="dialog_delete_head_title">
                <i class="iconfont icon-edit-square delete_icon"></i>
                <span>商家资质</span>
            </div>
            <div class="check_merchant">
                <p class="merchant_name">公司全称:&nbsp;&nbsp;{{merchantData.name}}</p>
                <p class="merchant_register_name">注册商标名称:&nbsp;&nbsp;{{merchantData.nickname}}</p>
                <p class="merchant_license">执照号:&nbsp;&nbsp;{{merchantData.license_num}}</p>
                <p class="merchant_legal_person">法人姓名:&nbsp;&nbsp;{{merchantData.legal_person}}</p>
                <p class="merchant_legal_id">法人身份证:&nbsp;&nbsp;{{merchantData.legal_idcard}}</p>
                <p class="merchant_register_address">注册地址:&nbsp;&nbsp;{{merchantData.address_register}}</p>
                <p class="merchant_practical_address">经营地址:&nbsp;&nbsp;{{merchantData.address_manage}}</p>
                <p class="merchant_duty_paragraph">公司税号:&nbsp;&nbsp;{{merchantData.duty}}</p>
                <div class="merchant_license_pic">
                    <p>执照照片</p>
                    <img :src="Tools.handleImg(merchantData.license)+'?imageView2/1/w/100/h/100'" alt="">
                </div>
                <div class="merchant_contact_way">
                    <p>联系方式</p>
                    <p class="merchant_contact_name">{{merchantData.contacts}}</p>
                    <p class="merchant_contact_tel">{{merchantData.telphone}}</p>
                </div>
            </div>
            <div class="user_footer" slot="footer">
                <el-row class="row_e">
                    <el-button class="btn_deletes" size="small" @click="merchantDialog = false">关闭</el-button>
                </el-row>
            </div>
        </el-dialog>
      <!--基本信息-->
      <el-dialog  :visible.sync="basicInformation" width="705px">
            <!--<div slot="title" class="dialog_head_title">-->
                <!--<i class=" el-icon-document examine_icon"></i>-->
                <!--<span>提交审核</span>-->
            <!--</div>-->
             <div slot="title" class="dialog_head_title ti-le">
                    <img src="../../assets/image/book.png" alt="">
                    <span>基本信息</span>
            </div>
            <div class="info">
                <div>
                    <div class="info-left">
                        <span>活动开始时间：</span>
                        <div>{{basicData.active_date_start?basicData.active_date_start.split(' ')[0]:''}}</div>
                    </div>
                    <div class="info-right">
                        <span>报名截止时间：</span>
                        <div>{{basicData.registration_deadline?basicData.registration_deadline.split(' ')[0]:''}}</div>
                    </div>
                </div>
                <div>
                    <div class="info-left">
                        <span>活动结束时间：</span>
                        <div>{{basicData.active_date_end?basicData.active_date_end.split(' ')[0]:''}}</div>
                    </div>
                    <div class="info-right">
                        
                    </div>
                </div>
                <div>
                    <div class="info-left">
                        <span>板块：</span>
                        <div>{{basicData.menu?basicData.menu.folder_name:''}}</div>
                    </div>
                    <div class="info-right">
                        <span>二级目录:</span>
                        <div>{{basicData.menu?basicData.menu.menu_1_name:''}}</div>
                    </div>
                </div>
                <div>
                    <div class="info-left">
                        <span>城市：</span>
                        <div>{{basicData.city_name}}</div>
                    </div>
                    <div class="info-right">
                        <span>活动负责人:</span>
                        <div>{{basicData.promotee}}</div>
                    </div>
                </div>
                <div class="p1">
                    <span>详细地址：</span>
                    <div>{{basicData.address}}</div>
                </div>
                <div>
                    <div class="info-left">
                        <span>电话：</span>
                        <div>{{basicData.telphone}}</div>
                    </div>
                    <div class="info-right">
                        <span>实际结束时间：</span>
                        <div>{{basicData.actual_end_time?basicData.actual_end_time.split(' ')[0]:'无'}}</div>
                    </div>
                </div>
            </div>
            <div class="act">
                <div>
                    <img src="../../assets/image/yuanx.png" alt="">
                </div>
                <div>
                    <img src="../../assets/image/fangda.png" alt="">
                    <img src="../../assets/image/yuanx.png" alt="">
                </div>
            </div>
            <div class="preview">
                <div>
                    <p v-if="!basicData.admin_upload_protocol">上传的安全协议</p>
                    <a v-for="item in basicData.admin_upload_protocol" :key="item.name" :href="item.path+'?attname='"><i class="el-icon-document" style="margin:0 10px 0 0;color: #bfbfbf;"></i>{{item.name}}</a>
                    <!-- <p v-for="item in basicData.admin_upload_images" :key="item.name" @click="checkImages(item.url)"><i class="el-icon-picture-outline" style="margin:0 10px 0 0;color: #bfbfbf;"></i>{{item.name}}</p> -->
                </div>
                <div class="attachments">
                    <p v-if="!basicData.admin_upload_images">上传的附件,图片为此公司现场图片，或者计划书等</p>
                    <div v-for="item in basicData.admin_upload_images" :key="item.name">
                      <!-- <p @click="isPic(item)">{{item.name}}</p> -->
                      <!-- <p v-if="isPic(item)" @click="checkImages(Tools.handleImg(item.path))"><i class="el-icon-picture-outline" style="margin:0 10px 0 0;color: #bfbfbf;"></i>{{item.name}}</p> -->
                      <p v-if="isPic(item)" @click="checkImages(item.url)"><i class="el-icon-picture-outline" style="margin:0 10px 0 0;color: #bfbfbf;"></i>{{item.name}}</p>
                      <a v-else :href="item.url+'?attname='"><i class="el-icon-document" style="margin:0 10px 0 0;color: #bfbfbf;"></i>{{item.name}}</a>
                    </div>
                </div>
            </div>
            <el-dialog :visible.sync="imagesVisible" append-to-body>
                <img width="100%" :src="imageUrl" alt="">
            </el-dialog>
        </el-dialog>
      <!--反馈框-->
      <el-dialog :visible.sync="rejectVisible" width="360px" custom-class="disableDialog">
            <span slot="title" class="disableDialog_title"><i class="iconfont icon-jinyong"></i>反馈</span>
            <div class="disable_dialog_box">
                <div class="disable_dialog_left">理由：</div>
                <div class="disable_dialog_right">
                    {{basicData.refuse}}
                </div>
            </div>
            <div class="disable_dialog_box">
                <div class="disable_dialog_left">类别：</div>
                <div class="disable_dialog_right">{{basicData.review_name}}</div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="rejectVisible = false">关闭</el-button>
        </span>
        </el-dialog>
      <!--删除框-->
      <delete-modal ref="delete" @doDelete="confirmDelete"></delete-modal>
    </div>
</template>

<script>
    import BreadCrumb from "../public/BreadCrumb";
    import DeleteModal from "../public/modalDelete";
    export default {
      name: "ActivityApply",
      components: {BreadCrumb,DeleteModal},
      data () {
        return {
          examineVisible: false,
          remarkVisible: false,
          merchantDialog:false,//查看商家资质弹框
          basicInformation:false,//基本信息弹框
          rejectVisible:false,//查看反馈弹框
          imagesVisible:false,//图片查看框
          imageUrl:'',//图片路径
          remark: '',//添加备注内容
          warmImg: require("../../assets/image/warm.png"),
          breadData: [{
            id: 1,
            name: '活动',
            urls: '/index',
            icon: 'icon-home'
          },{
            id: 2,
            name: '新活动申请',
            urls: '/index/test',
            icon: 'icon-home'
          }],
          plateOptions: [],//类别列表
          levelOptions:[],//二级目录列表
          statusOptions: [
          {
            value: 1,
            label: '已通过'
          }, {
            value: 2,
            label: '待提交'
          }, {
            value: 3,
            label: '未通过'
          }, {
            value: 7,
            label: '待审核'
          }
          ],//状态列表
          merchantData:{},//公司信息
          plateValue: '',
          levelValue: null,
          statusValue: '',//状态选种植
          dialogImageUrl: '',
          dialogVisible: false,
          tableData:[],//表格数据
          historyData: [],//备注历史数据
          basicData:{},//基本信息数据
          id:'',//活动id
          currentPage:1,//当前页
          pageSize:25,//每页显示数量
          total:0,//总记录数
          protocols:[],//已上传协议
          images:[],//已上传附件、图片
        }
      },
      methods: {
        //预览活动
        viewModal(id){
          window.open(this.Urls.frontUrl+"home/activity-detail?id="+id);  
        },
        // //删除已上传
        // handleRemove(file, fileList) {
        //   console.log(file, fileList);
        //   this.images = fileList;
        // },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        // 已删除删除前
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // handlePictureCardPreview(file) {
        //   this.dialogImageUrl = file.url;
        //   this.dialogVisible = true;
        // },
        handleDelete: function () {
          this.deleteVisible = false;
        },
        //审核提交
        handleExamine(){
          console.log(this.images)
          this.HttpClient.post('/admin/protocol/create',{protocols:this.protocols,images:this.images,source_id:this.id,type:'actives'})
              .then(res=>{
                  console.log(res);
                  if(res.data.code===200){
                      this.examineVisible = false;
                      this.$message.success(res.data.msg);
                      setTimeout(()=>{
                          this.getApplyList()
                      },500)
                  }else{
                      this.$message.error(res.data.msg)
                  }
              })
        },
        //协议上传前
        uploadProtocol(file){
            console.log(file);
            let fileType = ['doc','docx','txt','xlsx','xls'];
            if(this.Tools.fileLimit(fileType,file.name)){
              let that = this;
              //七牛云上传
              let observable = this.$observable(file);
              observable.subscribe({
                next(res){
                  console.log('next',res);    
                },
                error(err){
                  that.$message.error('上传失败!');
                },
                complete(res) {
                  console.log('成功结果', res);
                  that.$message.success('上传成功!');
                  that.protocols.push({name:file.name,path:res.key});
                }
              })
              // this.HttpClient.form('/admin/uploadOneFile',{files:file})
              //   .then(res=>{
              //       console.log(res);
              //       if(res.data.code===200){
              //           this.$message.success(res.data.msg);
              //           this.protocols.push({name:file.name,path:res.data.path});
              //       }else{
              //           this.$message.error(res.data.msg)
              //       }
              //       console.log(this.protocols);
              //   })
            }else{
              this.$message.warning('请按规定格式上传！');
            }
            
        },
        //图片上传
          uploadFile(file){
              console.log(file);
              if(this.Tools.pictureLimit(file)){
                let that = this;
                //七牛云上传
                let observable = this.$observable(file);
                observable.subscribe({
                  next(res){
                    console.log('next',res);    
                  },
                  error(err){
                    that.$message.error('上传失败!');
                  },
                  complete(res) {
                    console.log('成功结果', res);
                    that.$message.success('上传成功!');
                    that.images.push({name:file.name,url:that.Urls.imageUrl+res.key});
                  }
                })
            }else{
              this.$message.warning('请上传下面格式图片：jpg/png/jpeg/tiff/tif。');
            }  
            //   let fileType = ['png','jpg'];
            //   if(this.Tools.fileLimit(fileType,file.name)){
            //     this.HttpClient.form('/admin/uploadOneImage',{images:file})
            //         .then(res=>{
            //             console.log(res);
            //             if(res.data.code===200){
            //                 this.$message.success(res.data.msg);
            //                 this.images.push({name:file.name,url:res.data.path});
            //             }else{
            //                 this.$message.error(res.data.msg)
            //             }
            //             console.log(this.images);
            //         })
            // }else{
            //   this.$message.warning('请按规定格式上传！');
            // }
          },

        /**********************数据相关*************************/
        //获取列表数据
        getApplyList(){
            let parameters={
                page:this.currentPage,
                size:this.pageSize,
                // status:2
            };
            if(this.statusValue!==''){
                parameters.status=this.statusValue
            }
            if(this.levelValue){
                parameters.menu=this.levelValue
            }
            console.log(this.statusValue);
            console.log(parameters);
            this.HttpClient.post('/admin/actives/listsWithMenu',parameters)
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.tableData=res.data.data.data;
                        this.total=res.data.data.total;
                    }
                })
        },
        //获取分类列表
        getTypeList(){
            this.HttpClient.post('/admin/menu/getList',{menu_type:2,type:4})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.plateOptions=Object.values(res.data.data);
                        console.log(this.plateOptions);
                    }
                })
        },
        //获取基本信息
        getBasicInfo(id){
            this.HttpClient.post('/admin/actives/baseInfo',{id:id})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.basicData=res.data.data;
                        console.log('lkkkkkkkk')
                        // if(this.basicData.admin_upload_images){
                        //     this.basicData.admin_upload_images.map((item,index)=>{
                        //         this.basicData.admin_upload_images[index]=JSON.parse(item)
                        //     });
                        // }
                        // if(this.basicData.admin_upload_protocol){
                        //     this.basicData.admin_upload_protocol.map((item,index)=>{
                        //         this.basicData.admin_upload_protocol[index]=JSON.parse(item)
                        //     });
                        // }
                        console.log(this.basicData);
                    }
                })
        },
        //获取备注列表
        getRemarkList(id){
            this.HttpClient.post('/admin/remarkLog/lists',{source_id:id})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.historyData=res.data.data;
                        // 在vm实例上通知
                        this.$set(this.historyData,this.historyData.length-1,this.historyData[this.historyData.length-1])
                    }else{
                        this.historyData=[];
                    }
                })
        },
        //分类选择搜索事件
        plateChange(){
            if(this.plateValue!==''){
                this.levelOptions=this.plateOptions[this.plateValue].child
            }
        },
        //添加备注
        addRemark(){
            this.HttpClient.post('/admin/remarkLog/create',{content:this.remark,source_id:this.id})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.$message.success(res.data.msg);
                        this.remark='';
                        setTimeout(()=>{
                            this.getRemarkList(this.id)
                        },500)
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
        },
        //基本信息按钮事件
        basicButton(id){
            this.id=id;
            this.basicInformation=true;
            this.getBasicInfo(id)
        },
        //查看反馈按钮事件
        rejectButton(id){
            this.rejectVisible=true;
            this.getBasicInfo(id)
        },
        //提交审核按钮事件
        examineButton(id){
            this.examineVisible=true;
            this.id=id;
        },
        //删除按钮显示条件
        isShowDelete(date){
            let newDate=new Date().getTime();
            return (newDate - new Date(date.split(' ')[0]).getTime()) / 1000 / 3600 / 24 > 10;
        },
        //删除按钮事件
        deleteButton(id){
            this.id=id;
            this.$refs.delete.deleteDialog=true;
        },
        //添加备注按钮事件
        remarkButton(id){
            this.id=id;
            this.remarkVisible=true;
            this.getRemarkList(id)
        },
        //查看商家资质按钮事件
        checkMerchantButton(id){
            this.merchantDialog=true;
            this.HttpClient.get('/admin/business/editProfile',{company_id:id})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.merchantData=res.data.data;
                        this.merchantData.license=this.merchantData.license[0].path
                    }
                })
        },
        //确认删除
        confirmDelete(){
            this.HttpClient.post('/admin/actives/changeStatus',{status:0,active_id:this.id})
                .then(res=>{
                    console.log(res);
                    if(res.data.code===200){
                        this.$message.success(res.data.msg);
                        setTimeout(()=>{
                            this.getApplyList()
                        },500)
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
        },
        //图片查看
        checkImages(url){
          console.log(url)
          this.imageUrl=url;
          this.imagesVisible=true;
        },
        //是否是图片
        isPic(i){
          console.log(i)
          let format = ["jpg", "jpeg", "png","bmp"];
          let invertedStr = i.url.split('').reverse().join('');  //字符串倒叙
          let index = invertedStr.indexOf(".");
          // console.log('.位置',index)
          // console.log('倒叙字符',invertedStr)
          let newStr = invertedStr.substring(0,index);
          let identification = newStr.split('').reverse().join('');
          console.log('最后取字符',identification)
          if(format.indexOf(identification) > -1){
            console.log('true')
            return true
          }else{
            return false
            console.log('false')
          }
        },
        //字符串倒叙
        // demo(str){
        //   var str2="";
        //   for(var i=0;i<str.length;i++){
        //   str2+=str.charAt(str.length-i-1);
        //   }
        //   console.log(str2)
        // },
        //分页
        currentChange(p){
            this.currentPage=p;
            this.getApplyList()
        },
        defaultBehavior(param){},
      },
      created(){
          this.getApplyList();
          this.getTypeList()
      }
    }
</script>

<style scoped lang="less">
// .activity_apply{
//   .bread{
//     margin: 10px;
//   }
//   .content::-webkit-scrollbar {display:none}
//   .content{
//     background: white;
//     margin-left: 10px;
//     margin-right: 10px;
//     height: calc(100vh - 87px);
//     width: calc(100vw - 221px);
//     border-radius: 2px;
//     overflow-y: auto;
//     .title{
//       text-align: left;
//       line-height: 70px;
//       padding-left: 30px;
//       font-size: 20px;
//       border-bottom: 1px solid #f2f2f2;
//     }
//     .content_contain{
//       padding-left: 30px;
//       .conditions{
//         display: flex;
//         margin-left: 10px;
//         margin-top: 20px;
//         .select_normal{
//           /* width: 100px; */
//           margin-right: 10px;
//         }
//       }
//     }
//     .tables{
//       margin: 20px 10px;
//       .row_activity{
//         width: 200px;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//       }
//     }
//   }
// }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  .bread{
    margin: 10px;
  }
  .content::-webkit-scrollbar {display:none}
  .content{
    background: white;
    margin-left: 10px;
    margin-right: 10px;
    height: calc(100vh - 87px);
    width: calc(100vw - 221px);
    border-radius: 2px;
    overflow-y: auto;
  }
  .title{
    text-align: left;
    line-height: 70px;
    padding-left: 30px;
    font-size: 20px;
    border-bottom: 1px solid #f2f2f2;
  }
  .content_contain{
    padding-left: 30px;
  }
  .conditions{
    display: flex;
    margin-left: 10px;
    margin-top: 20px;
  }
  .select_normal{
    /* width: 100px; */
    margin-right: 10px;
  }
  .tables{
    margin: 20px 10px;
  }
  .row_activity{
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dialog_head_title{
    height: 16px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    text-align: left;
    font-size: 15px;
  }
  /deep/.dialog_delete_head_title{
    height: 16px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    text-align: left;
    font-size: 15px;
  }
  .delete_icon{
    color: #15bafe;
    font-size: 18px;
    top: 1px;
    position: relative;
  }
  .examine_icon{
    color: #15bafe;
  }
  .up_safe{
    height: 120px;
    border: 1px solid #f2f2f2;
    overflow-y: auto;
  }
  .up_safe_header{
    display: flex;
    line-height: 24px;
    margin-top: 10px;
    position: relative;
    left: -10px;
  }
  .btn_up{
    padding: 5px 10px;
    margin-right: 20px;
  }
  .up_img{
    height: 215px;
    border: 1px solid #f2f2f2;
    margin-top: 10px;
    display: grid;
  }
  .remark{
    text-align: left;
    margin-left: 10px;
  }
  .up_img_header{
    display: flex;
    line-height: 24px;
    margin-top: 10px;
    position: absolute;
    left: 30px;
    width: 250px;
  }
  .up_img_item{
    /*width: 40px;
    height: 40px;*/
    display: -webkit-box;
    overflow-y: auto;
    height: 150px;
    margin-left: 10px;
    margin-top: 10px;
    margin-right: 10px;
    flex-wrap: wrap;
    /deep/.icon_plus{
      position: relative;
      bottom: 30px;
    }
  }
  
  .delete_content{

  }
  .boolean_delete{
    height: 30px;
    width: 30px;
  }
  .delete_content p{
    margin-top: 5px;
  }
  .row_e{
    text-align: center;
  }
  .btn_delete{
    padding: 5px 15px;
    margin-left: 30px;
  }
  .btn_deletes{
    padding: 5px 15px;
  }
  .remark_content{
    position: relative;
    top: -10px;
  }
  .remark_p{
    text-align: left;
  }
  .text_area{
    margin-top: 8px;
  }
  .history_p{
    text-align: left;
    margin-top: 8px;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
  }
  .h_content{
    margin-top: 10px;
    height: 200px;
    overflow-y: auto;
  }
  .history_item{
    display: block;
    text-align: left;
    margin-bottom: 20px;
  }
  .item_top{
    display: flex;
    height: 20px;
    line-height: 20px;
  }
  .point{
    width: 5px;
    height: 5px;
    border-radius: 2.5px;
    background: #15bafe;
    position: relative;
    top: 8px;
    margin-right: 8px;
  }
  .h_name{
    margin-right: 10px;
  }
  .h_time{
    color: #15bafe;
    font-size: 12px;
  }
  .h_message{
    margin-left: 15px;
  }

  /* 基本信息弹框 */
  .activity_apply .ti-le{text-align: start;border-bottom: 1px solid #e8e8e8;padding-bottom: 18px;display: flex;align-items: center;}
  .activity_apply .ti-le>img{margin-right: 6px;}
  .activity_apply .info>div{display: flex;justify-content: space-around;margin-top: 27px;}
  .activity_apply .info-left{display: flex;align-items: center;width: 46%;justify-content: space-between;}
  .activity_apply .info-left>span{text-align: left;}
  .activity_apply .info-right{display: flex;align-items: center;width: 46%;justify-content: space-between}
  .activity_apply .info-right>span{text-align: left;}
  .activity_apply .info-left>div{width: 210px;height: 35px;border: 1px solid #ededed;text-align: center;line-height: 35px}
  .activity_apply .info-right>div{width: 210px;height: 35px;border: 1px solid #ededed;text-align: center;line-height: 35px;}
  .activity_apply .p1{display: flex;align-items: center;}
  .activity_apply .p1>div{width: 540px;height: 35px;border: 1px solid #ededed;text-align: center;line-height: 35px}
  .activity_apply .act{display: flex;justify-content: space-between;margin-top: 25px;}
  .activity_apply .act>div{width: 320px;text-align: right;margin-right: 6px;}
  /* .activity_apply .preview{display: flex;justify-content: space-between;}
  .activity_apply .preview>div{width: 320px;height: 157px;border: 1px solid #ededed;margin-bottom: 35px;color: #aaaaaa;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;}
  .activity_apply .preview>div>p,.preview>div>a{width:100%;text-align:left;cursor:pointer;} */
  .activity_apply .el-dialog__header{padding: 8px 20px 10px !important;}
  .activity_apply .dialog_head_title{ height: 16px; border-bottom: 1px solid #cccccc;  padding-bottom: 10px; text-align: left; font-size: 15px; }
  .activity_apply .examine_icon{ color: #15bafe; }
  .activity_apply .tips{width: 318px;height: 60px;border: 1px solid #e8e8e8;padding: 10px 60px;box-sizing: border-box;font-size: 14px;color: #b7b7b7;margin-top: 17px;}
</style>
<style lang="less">
  .activity_apply{
    // 基本信息弹窗
    .preview{
      display: flex;
      justify-content: space-between;
        >div{width: 320px;
          height: 157px;
          border: 1px solid #ededed;
          margin-bottom: 35px;
          color: #aaaaaa;
          display:flex;
          flex-wrap:wrap;
          justify-content:space-between;
          align-items:center;
          box-sizing: border-box;
            >p,>a{
              width:280px;
              text-align:left;
              cursor:pointer;
              overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
              margin-left: 10px;
            }
        }
        .attachments{
              padding: 10px;
              display: flex;
              flex-direction: column;  
              align-items: flex-start;
              box-sizing: border-box;
              >div{
                  >p,>a{
                    width: 280px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
              }
        }
    }
    .el-table th>.cell{
      text-align: center;
    }
    
  .cell{
    button{
      margin: 5px 0;
    }
  }
    .el-upload-list{
      height: 85px;
      /*overflow: auto;*/
      width:300px;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .el-upload--picture-card{
      width: 90px;
      height: 90px;
    }
    /*.el-upload--picture-card i{
      position: relative;
      bottom: 30px;
    }*/
    .el-upload-list--picture-card .el-upload-list__item{
      width: 90px;
      height: 90px;
    }
    .el-dialog__body{
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .up_safe{
      .el-upload-list__item{
        text-align: left !important;
      }
    }

    .check_merchant{
      p{
        height:20px;
        padding-left: 10px;
        border:1px solid #ccc;
        text-align: left;
      }

      .merchant_license_pic{
        img{
          padding: 10px 0;
          width:200px;
          height:100px;
        }
      }
      .merchant_contact_way{
        p:first-child{
          text-align:left;
        }
      }
    }
    /*反馈弹窗*/
    .disableDialog{
      .disableDialog_title{
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        padding-bottom: 10px;
        i{
          margin-right: 10px;
        }
      }
      .disable_dialog_box:not(:last-child){
        margin-bottom: 20px;
      }
      .disable_dialog_box{
        display: flex;
        align-items: flex-start;
        justify-content: center;
        /*单选框*/
        .disable_dialog_right{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          width: 275px;
        }
      }
    }
  }

</style>
