<template>
  <div class="wordmanagementBox">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>
    <div class="word_titlebox">
      <!-- 表格 -->
      <div class="major_table">
        <el-table :data="tableData" border style="width: 100%">
          <!-- 选择专业 -->
          <el-table-column prop="folder_name" label="专业名称" :render-header="renderEquiptype"></el-table-column>
          <el-table-column prop="m1_homoionym" label="一级目录">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.m1_name">{{scope.row.m1_name}}</el-tag>
              <el-tag
                type="info"
                v-for="(item,index) in scope.row.m1_homoionym"
                :key="index"
              >{{item}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="m1_img" label="图片">
            <template slot-scope="scope">
              <img :src="Tools.handleImg(scope.row.m1_img)" alt style="width: 50px">
            </template>
          </el-table-column>
          <el-table-column prop="m1_des" label="简介"></el-table-column>
          <el-table-column prop="m2_homoionym" label="二级目录">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.m2_name">{{scope.row.m2_name}}</el-tag>
              <el-tag
                type="info"
                v-for="(item,index) in scope.row.m2_homoionym"
                :key="index"
              >{{item}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="m2_img" label="图片">
            <template slot-scope="scope">
              <img :src="Tools.handleImg(scope.row.m2_img)" alt style="width: 50px">
            </template>
          </el-table-column>
          <el-table-column prop="m2_des" label="简介"></el-table-column>
          <el-table-column prop="m3_homoionym" label="三级目录">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.m3_name">{{scope.row.m3_name}}</el-tag>
              <el-tag
                type="info"
                v-for="(item,index) in scope.row.m3_homoionym"
                :key="index"
              >{{item}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="m3_img" label="图片">
            <template slot-scope="scope">
              <img :src="Tools.handleImg(scope.row.m3_img)" alt style="width: 50px">
            </template>
          </el-table-column>
          <el-table-column prop="m3_des" label="简介"></el-table-column>
          <el-table-column prop="created_at" label="创建时间"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.status === 1?'正常':'禁用'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row,item)"
                type="text"
                size="small"
                v-for="(item,index) in catalogText"
                :key="index"
              >{{item.text}}</el-button>
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
      <!-- 弹框 -->
      <div class="alertbox">
        <el-dialog :title="catalogTitle" :visible.sync="centerDialogVisible" width="30%" center>
          <div class="topbox">
            <!-- <el-tag type="success" v-if="mainWord" @change="handleModifyMainWord">{{mainWord}}</el-tag> -->
            <el-button type="success" size="small" v-if="mainWord" >{{mainWord}}</el-button>
            <el-button size="small" icon="el-icon-edit" @click="handleModifyMainWord"></el-button>
          </div>
          <div class="topbox">
            <el-tag
              type
              closable
              v-for="(item,index) in catalogData"
              :key="index"
              @close="handleClose(item)"
            >{{item}}</el-tag>
          </div>
          <div class="bottombox">
            <div class="bottomtitle">添加新的近义词</div>
            <el-input placeholder="请输入内容" v-model="newWord" clearable></el-input>
            <el-button type="primary" icon="el-icon-plus" @click="addNewwordFn"></el-button>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">关 闭</el-button>
          </span>
        </el-dialog>

        <!--修改目录弹窗-->
        <el-dialog
          :visible.sync="addDirectoryDialog"
          width="470px"
          custom-class="addDirectoryDialog">
          <span slot="title" class="addDirectoryDialog_title"><i class="iconfont icon-orderedlist"></i>修改主词汇</span>
          <div class="addDirectoryDialog_main">
            <div class="dialog_main_header">
              <p>目录名称：</p>
              <el-input placeholder="输入目录名称" v-model="CategoryName"></el-input>
            </div>
            <!-- <div class="dialog_images">
              <el-upload
                action="http://test.kslab.com/api/article/null"
                list-type="picture-card"
                :limit="1"
                :on-exceed="exceedinglimit"
                :file-list="fileList2"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeFileUpload">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div> -->
            <div class="dialog_textarea">
              <el-input
                type="textarea"
                :rows="4"
                resize="none"
                placeholder="请输入简介内容"
                v-model="textarea">
              </el-input>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDirectoryDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleSaveDirectory">保 存</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "ArticleTitle",
  components: {
    BreadCrumb
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "功能控制",
          urls: "/index/functionControl",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "专业目录",
          urls:
            "/index/functionControl/professionalCatalog/professional-catalog",
          icon: "icon-home"
        },
        {
          id: 3,
          name: "近义词管理",
          urls: "/index/functionControl/professionalCatalog/synonym-management",
          icon: "icon-home"
        }
      ],

      // 表格数据
      tableData: [],
      //   修改目录
      catalogText: [
        { type: 1, text: "修改一级目录" },
        { type: 2, text: "修改二级目录" },
        { type: 3, text: "修改三级目录" }
      ],
      // 修改目录的数据
      catalogData: [], //要修改的目录词汇
      addDirectoryDialog:false,  //修改主词汇弹框
      catalogTextID:null, //修改近义词的目录ID
      catalogTitle: "", //弹框标题
      centerDialogVisible: false, //控制弹框显示变量
      newWord: "", //新增的近义词
      typeSelect: "",
      majorType: [],
      mainWord: "", //弹框主词汇
      currentObj:'',  //当前操作对象  
      type:null,  //修改的几级目录
      dialogVisible:false,
      CategoryName:'',
      fileList2:[],
      dialogImageUrl:'',
      cndImgUrl:'',  //七牛云返回图片地址
      textarea:'',
      // 分页
      currentPage: 1, // 当前页
      pageSize: 25, // 每页显示数量
      total: 0, // 数据总条数
    };
  },
  mounted() {
    this.getlistDataFn();
    this.getMajorList()
  },
  methods: {
    /**
     *修改主词汇 
     * author:ZhangYunChuan
     * time:2019/1/4
     */
    handleModifyMainWord(){
      console.log(this.type,this.currentObj);
      this.CategoryName = '';
      this.textarea = '';
      this.fileList2 = [];
      if(this.type === 1){
        this.CategoryName = this.mainWord;
        this.textarea = this.currentObj.m1_des;
        // this.fileList2.push(
        //   {
        //     url:'http://cdn.kushualab.com/'+this.currentObj.m1_img
        //   });
      }else if(this.type === 2){
        this.CategoryName = this.mainWord;
        this.textarea = this.currentObj.m2_des;
        // this.fileList2.push(
        //   {
        //     url:'http://cdn.kushualab.com/'+this.currentObj.m2_img
        //   });
      }else if(this.type === 3){
        this.CategoryName = this.mainWord;
        this.textarea = this.currentObj.m3_des;
        // this.fileList2.push(
        //   {
        //     url:'http://cdn.kushualab.com/'+this.currentObj.m3_img
        //   });
      }
      this.addDirectoryDialog = true;
    },
    /**
     *目录图片上传 
     * author:ZhangYunChuan
     * time:2019/1/4
     */
    // beforeFileUpload(file,fileList){
    //     this.HttpClient.form("/admin/uploadOneImage",{
    //       images:file
    //     }).then(res => {
    //       console.log(res);
    //       this.cndImgUrl = res.data.path;
    //     })
    // },
    // handlePictureCardPreview(){},
    // exceedinglimit(){
    //   this.$message.warning('超过限制数量，请删除原来的图片。');
    // },
    // handleRemove(){},
    /**
     *保存目录修改 
     * author:ZhangYunChuan
     * time:2019/1/4
     */
    handleSaveDirectory(){
      console.log(this.CategoryName,this.cndImgUrl,this.textarea);
      if(this.type === 1){
        this.modifymenu(this.currentObj.m1_id,this.currentObj.folder_id,this.CategoryName,this.textarea,this.type);
      }else if(this.type === 2){
        this.modifymenu(this.currentObj.m2_id,this.currentObj.m1_id,this.CategoryName,this.textarea,this.type);
      }else if(this.type === 3){
        this.modifymenu(this.currentObj.m3_id,this.currentObj.m2_id,this.CategoryName,this.textarea,this.type);
      }
      
    },
    //修改目录
    modifymenu(id,pid,name,des,type){
      this.HttpClient.post("/admin/menu/edit",{
          menu_type:3,
          id:id,
          pid:pid,
          name:name,
          description:des,
          type:type
        }).then(res => {
          console.log(res);
          if(res.data.code === 200){
            this.mainWord = name;
             setTimeout(() => {
                this.getlistDataFn();
                this.addDirectoryDialog = false;
             }, 500);
          }
        })
    },
    // 获取专业名称列表
    getMajorList(){
      let params = {
        menu_type:3,
        type:0
      }
      this.HttpClient.post('/admin/menu/getList',params).then(res =>{
        var obj = res.data.data
        for(var e in obj){
          this.majorType.push(obj[e])
        }
      })
      // console.log(this.majorType)
    },
    //   获取近义词列表
    getlistDataFn() {
      let params = {
        size:this.pageSize,
        page:this.currentPage,
        m1_menu_id:this.typeSelect
      }
      this.HttpClient.post("/admin/major/getListWithHomoionym",params).then(res => {
        if (res.data.code === 200) {
          this.total = res.data.data.total
          this.tableData = res.data.data.data;
          console.log(this.tableData)
        }
      });
    },
    //   点击打开弹框
    handleClick(row, val) {
      this.type = val.type;
      console.log(row);
      this.currentObj = row;
      this.centerDialogVisible = true;
      // console.log(row);
      this.catalogTitle = val.text;
      if (val.type === 1) {
        if(row.m1_homoionym == null){
          this.catalogData = [];
        }else{
          this.catalogData = row.m1_homoionym; //一级目录词汇
        }
        this.catalogTextID = row.m1_id
        this.mainWord = row.m1_name;
      } else if (val.type === 2) {
        if(row.m2_homoionym == null){
          this.catalogData = [];
        }else{
          this.catalogData = row.m2_homoionym; //二级目录词汇
        }
        this.catalogTextID = row.m2_id
        this.mainWord = row.m2_name;
      } else if (val.type === 3) {
        if(row.m3_homoionym == null){
          this.catalogData = [];
        }else{
          this.catalogData = row.m3_homoionym; //三级目录词汇
        }
        this.catalogTextID = row.m3_id
        this.mainWord = row.m3_name;
      }
    },
    // 删除近义词
    handleClose(val) {
        let params = {
            id:this.catalogTextID,
            action:'del',
            name:val
        }
        this.operateFn(params)
    },
    // 调用修改目录接口
    operateFn(params){
      this.HttpClient.post('/admin/major/menuMajorChangeHomoionym',params).then(res => {
        if(res.data.code === 200){
          this.$message.success(res.data.msg)
          if(params.action == 'del'){
            this.catalogData.forEach((e,i) => {
              if(e == params.name){
                this.catalogData.splice(i,1)
              }
            })
          }else if(params.action == 'add'){
            this.catalogData.push(this.newWord)
          }
          setTimeout(()=>{
            this.getlistDataFn();
            this.newWord = ''
          },500)
        }
      })
    },
    // 添加新的近义词
    addNewwordFn() {
      // 获取新增近义词，调用新增近义词接口
      let params = {
            id:this.catalogTextID,
            action:'add',
            name:this.newWord
        }
      this.operateFn(params)
    },
    // 选择专业名称
    renderEquiptype(h, { column }) {
      return h(
        "el-select",
        {
          // 'v-model':this.headerSelect,
          props: {
            value: "专业名称",
            placeholder: "专业名称"
          },
          on: {
            input: value => {
              this.typeSelect = value;
              this.getlistDataFn()
              //   调用接口
            }
          }
        },
        [
          this.majorType.map(item => {
            return h("el-option", {
              props: {
                value: item.menu_id,
                label: item.name
              }
            });
          })
        ]
      );
    },
    // 分页
    currentChange(p) {
      this.currentPage = p;
      this.getlistDataFn();
    },
  }
};
</script>

<style lang='less'>
.wordmanagementBox {
  .bread {
    margin: 10px;
  }
  .word_titlebox {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;
    .major_table {
      margin: 20px 0 0 20px;
      .el-input__inner {
        border: none;
        padding: 0;
      }
      .el-input__suffix {
        right: 0;
      }
      .el-table th > .cell {
        text-align: center;
      }
      .el-tag {
        margin-bottom: 10px;
        font-size: 12px;
        white-space: normal;
        display: block;
        word-break: break-all;
        height: auto;
      }
      .el-button + .el-button {
        margin-left: 0;
      }
    }
    .alertbox {
      .topbox {
        .el-button{
          margin:5px;
        }
        .el-tag {
          margin: 5px;
        }
      }
      .bottombox {
        margin-top: 5px;
        display: flex;
        .bottomtitle {
          border: 1px solid #dedede;
          border-radius: 4px;
          line-height: 30px;
          height: 28px;
          text-align: center;
          width: 130px;
          background: rgb(21, 186, 254);
          color: #fff;
          margin: 0 0 0 5px;
        }
        .el-input {
          width: 30%;
          height: 30px;
          // margin: 5px 0 0 5px;
          .el-input__inner{
            height: 30px;
          }
        }
        .el-button{
          height: 30px;
          padding: 0 15px;
        }
      }
      // 修改主词汇弹框
      .addDirectoryDialog{
        .addDirectoryDialog_title{
          display: flex;
          align-items: center;
          color: #666;

          i{
            font-size: 24px;
            color: #15bafe;
            margin-right: 10px;
          }
        }
        .addDirectoryDialog_main{
          .dialog_main_header{
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            p{
              margin-right: 10px;
            }
            .el-input{
              flex: 1;
            }
          }
          .dialog_images{
            border: 1px solid #dedede;
            box-sizing: border-box;
            padding: 15px;
            margin-bottom: 30px;

            .el-upload--picture-card,
            .el-upload-list--picture-card .el-upload-list__item{
              width: 80px;
              height: 80px;
              line-height: 80px;
            }
          }
        }
      }
    }
  }
}
</style>
