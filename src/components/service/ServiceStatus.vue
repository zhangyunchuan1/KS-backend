<template>
  <div class="serviceStatus">
    <BreadCrumb class="bread" :breadData="breadData"></BreadCrumb>

    <div class="service_main">
      <div class="service_title">
        <div class="title">服务状态</div>
        <div class="refresh" @click="handleRefresh">
          <i class="iconfont icon-shuaxin"></i>
          <span>刷新</span>
        </div>
      </div>

      <div class="service_header">
        <div class="service_select">
          <el-select v-model="value" placeholder="状态选择" @change="handleChangeStateSearch($event)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div class="service_search">
          <div>
            <el-input placeholder="服务名称" v-model="serviceName" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleServiceName"></el-button>
            </el-input>
          </div>

          <!-- <div>
              <el-input placeholder="公司对外名称" v-model="companyName" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
          </div>-->
        </div>
      </div>

      <div class="service_content" style="width: 79%">
        <el-table :data="tableData" :border="true" style="width: 100%">
          <el-table-column sortable label="服务ID" align="center" width="100" prop="id"></el-table-column>
          <el-table-column label="服务名称" show-overflow-tooltip align="center" prop="title" width="120"></el-table-column>
          <el-table-column label="城市" align="center" show-overflow-tooltip prop="city_name" width="120"></el-table-column>
          <el-table-column label="公司对外名称" align="center" prop="company_name" width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.company_name">{{scope.row.company_name}}</span>
              <span v-else class="sortout_color">暂无</span>
            </template>
          </el-table-column>

          <el-table-column label="价格" align="center" width="100" prop="price" sortable></el-table-column>

          <el-table-column label="浏览人数" align="center" width="110" prop="view_num" sortable></el-table-column>

          <el-table-column label="用户评价分数" align="center" width="130" prop="score" sortable></el-table-column>

          <el-table-column
            label="状态"
            align="center"
            prop="status"
            :filters="[{text: '已删除', value:0 },{text: '正常', value:1 }, {text: '下架', value: 2}, {text: '待提交 ', value:3 },{text: '未通过', value: 4},{text: '待审核', value: 5},{text:'已暂停',value:6}]"
            :filter-method="filterSecondary"
            width="100"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status === 0" class="delete_color">已删除</span>
              <span v-if="scope.row.status === 1" class="normal_color">正常</span>
              <span v-if="scope.row.status === 2" class="sortout_color">已下架</span>
              <span v-if="scope.row.status === 3">待提交</span>
              <span v-if="scope.row.status === 4" class="notpass_color">未通过</span>
              <span v-if="scope.row.status === 5" class="audit_color">待审核</span>
              <span v-if="scope.row.status === 6" class="paused_color">已暂停</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" fixed="right" width="380px" class-name="service_scope">
            <template slot-scope="scope">
              <div class="service_btm">
                <div @click="handlePreview(scope.row.id)">预览服务</div>
                <div @click="handleOpenInfo(scope.row.id)">基本信息</div>
                <div @click="handleOpenRemark(scope.row.id)">添加备注</div>
                <div
                  style="color: red"
                  v-if="scope.row.status !== 2"
                  @click="handleLowerShelf(scope.row.service_id)"
                >下架</div>
                <!-- <div @click="handleEndService(scope.row.service_id)">结束服务</div> -->
                <div v-if="scope.row.status === 6" @click="handleRecovery(scope.row.service_id)" class="normal_color">恢复</div>
                <div v-if="scope.row.status === 1" @click="handleStop(scope.row.service_id)"  class="paused_color">暂停</div>
                <div @click="handleViewinfo(scope.row)">查看评价</div>
              </div>
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

    <!--备注弹窗-->
    <el-dialog :visible.sync="remarkDialog" width="470px" custom-class="remarkDialog">
      <span slot="title" class="remarkDialog_title">
        <i class="iconfont icon-huaban4"></i>
      </span>
      <div class="remarkDialog_main">
        <div class="remarkTitle">内容</div>
        <div class="remarkInput">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>
        <div class="remarkTitle">历史</div>
        <div class="remarkHistory">
          <div v-for="(item,index) in remarkHistory" :key="index">
            <div class="remarkHistoryUser">
              <i class="iconfont icon-dian"></i>
              <p>{{item.create_name}}</p>
              <span>{{item.created_at}}</span>
            </div>
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="remarkDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleAddRemark">提 交</el-button>
      </span>
    </el-dialog>

    <!--基本信息弹窗-->
    <el-dialog :visible.sync="basicInfoDialog" width="700px" custom-class="basicInfoDialog">
      <span slot="title" class="basicInfoDialog_title">
        <i class="iconfont icon-huaban4"></i>
      </span>
      <div class="basicInfoDialog_main">
        <div class="main_list">
          <div class="main_list_input">
            <p>板块：</p>
            <div>{{serviceInfo.menu.folder_name}}</div>
          </div>
          <div class="main_list_input">
            <p>二级目录：</p>
            <div>{{serviceInfo.menu.menu_1_name}}</div>
          </div>
        </div>

        <div class="main_list">
          <div class="main_list_input">
            <p>城市：</p>
            <div>{{serviceInfo.city_name}}</div>
          </div>
          <div class="main_list_input">
            <p>详细地址：</p>
            <div>{{serviceInfo.address}}</div>
          </div>
        </div>

        <div class="main_list">
          <div class="main_list_input">
            <p>负责人：</p>
            <div>{{serviceInfo.promotee}}</div>
          </div>
          <div class="main_list_input">
            <p>电话：</p>
            <div>{{serviceInfo.telphone}}</div>
          </div>
        </div>
        <div class="preview">
          <div class="down_load">
            <div class="examine_contents">
              <div class="examine_contain">
                <div
                  class="examine_list"
                  v-for="(item,index) in serviceInfo.admin_upload_protocol"
                  :key="index"
                >
                  <a class="examine_text" :href="item.url+'?attname='">
                    <p class="examine_down_p">{{index}}.{{' '}}{{item.name}}</p>
                    <i class="icon_examine el-icon-download"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="img_contents">
              <div class="img_contain">
                <div
                  v-for="(item,index) in serviceInfo.admin_upload_images"
                  :key="index"
                  :class="index%3===2?'img_item2':'img_item1'"
                >
                  <a :href="item.url+'?attname='">
                    <img class="img_3" :src="item.url">
                    <div class="modal_img">
                      <i class="el-icon-download modal_icon"></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="upload">
            <div class="protocol">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <div class="el-upload__text">上传的安全协议</div>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>

            <div class="annex">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <div class="el-upload__text">上传的附件<br />图片为此公司现场的图片，或者计划书等</div>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
        </div>-->
      </div>
    </el-dialog>
    <!-- 预览弹窗 -->
    <!-- <el-dialog
        :visible.sync="previewDialog"
        width="470px"
        custom-class="previewDialog">
        <span slot="title" class="remarkDialog_title"><i class="iconfont icon-huaban4"></i></span>
        <div class="remarkDialog_main">
          <p>内容</p>
          <div class="preview-content" v-html="serviceInfo.content"></div>
          <p>图片</p>
          <div class="preview-pics">
            <img v-for="(item,index) in serviceInfo.images" :key="index" :src="'http://cdn.kushualab.com/'+item.path" alt="" @click="handleOpenPic(item.path)">
          </div>
        </div>
        <div v-if="enlargePicture" class="enlarge-picture">
          <img :src="'http://cdn.kushualab.com/'+imgPath" alt="">
          <i class="el-icon-circle-close-outline" @click="handleClosePic"></i>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="previewDialog = false">关闭</el-button>
        </span>
    </el-dialog>-->
    <!--暂停服务弹窗-->
    <el-dialog :visible.sync="endDialog" width="470px" custom-class="endDialog">
      <span slot="title" class="obtainedDialog_title">
        <i class="iconfont icon-huaban4"></i>
      </span>
      <div class="obtainedDialog_main">
        <el-input type="textarea" :rows="2" placeholder="请输入暂停理由" v-model="stopText"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="endDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSureStopShelf">提 交</el-button>
      </span>
    </el-dialog>

    <!--下架弹窗-->
    <el-dialog :visible.sync="obtainedDialog" width="470px" custom-class="obtainedDialog">
      <span slot="title" class="obtainedDialog_title">
        <i class="iconfont icon-huaban4"></i>
      </span>
      <div class="obtainedDialog_main">
        <el-input type="textarea" :rows="2" placeholder="请输入下架理由" v-model="refuseText"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="obtainedDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSureLowerShelf">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 查看评价 -->
    <el-dialog :visible.sync="evaluateDialog" width="1100px" custom-class="obtainedDialog">
      <div style="display:flex;">
        <div class="alert-content">
          <el-input v-model="servicenameTitle" readonly></el-input>
        </div>
        <div class="alert-content">
          <el-input v-model="cityName" readonly></el-input>
        </div>
      </div>
      <el-table :data="contentTableData" :border="true" style="width: 100%;margin-bottom:20px;">
        <el-table-column sortable label="用户ID" align="center" width="100" prop="id"></el-table-column>
        <el-table-column label="用户名称" align="center" prop="name" width="120"></el-table-column>
        <el-table-column label="评价内容" align="center" prop="content" width="130"></el-table-column>
        <el-table-column label="图片" align="center" prop="company_name" width="240">
          <template slot-scope="scope">
            <img :src="Tools.handleImg(scope.row.avatar)" alt="">
          </template>
        </el-table-column>

        <el-table-column label="打分" align="center" width="100" prop="score" sortable></el-table-column>

        <el-table-column label="评论时间排列" align="center" width="160" prop="created_at" sortable></el-table-column>

        <el-table-column label="操作" align="center" class-name="service_scope">
          <template slot-scope="scope">
            <div class="service_btm">
              <el-button type="text"  @click="handledeletePreview(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="totalcontent"
        layout="prev, pager, next"
        :total="totalcontent"
        :page-size="pagecontentSize"
        @current-change="currentContentChange"
      ></el-pagination>
    </el-dialog>
    <!-- 删除评论 -->
    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="30%"
      center>
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureDeleteContentFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/public/BreadCrumb";
export default {
  name: "ServiceStatus",
  components: {
    BreadCrumb
  },
  data() {
    return {
      // 面包屑
      breadData: [
        {
          id: 1,
          name: "服务",
          urls: "/index/service/service",
          icon: "icon-home"
        },
        {
          id: 2,
          name: "服务状态",
          urls: "/index/service/serviceStatus",
          icon: "icon-home"
        }
      ],

      // 筛选下拉
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "已删除"
        },
        {
          value: "1",
          label: "正常"
        },
        {
          value: "2",
          label: "下架"
        },
        {
          value: "3",
          label: "待提交"
        },
        {
          value: "4",
          label: "未通过"
        },
        {
          value: "5",
          label: "待审核"
        }
      ],
      value: "",

      serviceName: null, // 搜索服务名称
      // companyName:'', // 搜索公司对外名称
      refuseText: "", //下架理由
      stopText: "", //暂停理由

      // 表格
      tableData: [],

      basicInfoDialog: false, // 基本信息弹窗
      dialogImageUrl: "",
      dialogVisible: false,

      textarea: "",

      previewDialog: false, //预览弹窗

      remarkDialog: false, // 备注信息弹窗

      endDialog: false, // 结束服务弹窗
      endTextarea: "",

      evaluateDialog: false, //查看评价弹窗

      obtainedDialog: false, // 下架弹窗
      state: null, //状态搜索暂存的状态值
      serviceTitle: null, //服务标题搜索暂存标题
      remarkHistory: [
        {
          create_name: null,
          created_at: null,
          content: null
        }
      ],
      serviceInfo: {
        //服务基本信息
        content: null,
        images: [],
        menu: {
          folder_name: null,
          menu_1_name: null
        },
        city_name: null,
        address: null,
        promotee: null,
        telphone: null,
        admin_upload_images: [],
        admin_upload_protocol: []
      },
      enlargePicture: false, //放大图片
      imgPath: null, //放大图片地址
      serviceId: null, //存储当前操作的服务id。点击操作时就会重新赋值。

      // 查看评价弹窗  liushuya 2019-01-08
      cityName: "",
      servicenameTitle: "",
      contentTableData: [],
      serviceContentID: "",

      // 分页
      currentPage: 1, //当前页
      pageSize: 25, //每页显示数量
      total: 0, //总记录数
      currentcontentPage: 1, //当前页
      pagecontentSize: 10, //每页显示数量
      totalcontent: 0, //总记录数

      deleteDialogVisible:false,//确定删除
      aid:'',//删除的评论answer_id
    };
  },
  mounted() {
    this.getServiceList(this.state, this.serviceTitle);
  },
  methods: {
    //分页
    currentChange(p) {
      this.currentPage = p;
      this.getServiceList();
    },
    //查看评价分页
    currentContentChange(p) {
      this.currentcontentPage = p;
      this.getContentData();
    },
    // 查看评价
    handleViewinfo(row) {
      console.log(row);
      this.evaluateDialog = true;
      this.servicenameTitle = row.title;
      this.cityName = row.city_name;
      this.serviceContentID = row.service_id;
      this.getContentData();
    },
    getContentData() {
      let params = {
        source_id: this.serviceContentID,
        page: this.currentcontentPage,
        size: this.pagecontentSize,
        order: ""
      };
      this.HttpClient.post("/admin/answers/info", params).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data);
          this.contentTableData = res.data.data.data;
          this.totalcontent = res.data.data.total;
        }
      });
    },
    // 删除服务评论
    handledeletePreview(row){
      console.log(row)
      this.deleteDialogVisible = true;
      this.aid = row.answer_id
      // this.sureDeleteContentFn(row.answer_id)
    },
    // 确定删除服务评论
    sureDeleteContentFn(){
      this.HttpClient.post('/admin/answers/changeStatus',{answer_id:this.aid,status:0}).then(res => {
        console.log(res.data)
        if(res.data.code == 200){
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getContentData();
            this.deleteDialogVisible = false;
          }, 500);
        }
      })
    },
    //暂停
    handleStop(id) {
      this.endDialog = true;
      this.serviceId = id;
    },
    // 确定暂停服务
    handleSureStopShelf() {
      this.HttpClient.post("/admin/services/changeStatus", {
        service_id: this.serviceId,
        status: 6,
        refuse: this.stopText
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          this.endDialog = false;
          setTimeout(() => {
            this.getServiceList();
          }, 350);
        }
      });
    },
    //恢复服务
    handleRecovery(id) {
      this.HttpClient.post("/admin/services/changeStatus", {
        service_id: id,
        status: 1
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getServiceList();
          }, 350);
        }
      });
    },
    //结束服务弹窗
    handleEndService(id) {
      this.serviceId = id;
      console.log(this.serviceId);
      this.endDialog = true;
    },
    //确定结束服务
    handleSureEndService() {
      this.HttpClient.post("/admin/services/changeStatus", {
        service_id: this.serviceId,
        status: 2,
        refuse: this.endTextarea
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getServiceList();
          }, 350);
          this.endTextarea = "";
          this.endDialog = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //打开下架弹窗
    handleLowerShelf(id) {
      this.serviceId = id;
      this.obtainedDialog = true;
    },
    //确定下架
    handleSureLowerShelf() {
      console.log(this.serviceId);
      this.HttpClient.post("/admin/services/changeStatus", {
        service_id: this.serviceId,
        status: 2,
        refuse: this.refuseText
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getServiceList();
          }, 350);
          this.obtainedDialog = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //打开预览弹窗
    handlePreview(id) {
      // console.log(id)
      // this.getServiceInfo(id);
      // this.previewDialog = true;
    },
    //图片放大
    handleOpenPic(path) {
      this.imgPath = path;
      this.enlargePicture = true;
    },
    //关闭图片放大
    handleClosePic() {
      this.enlargePicture = false;
    },
    //查看服务基本信息
    handleOpenInfo(id) {
      this.getServiceInfo(id);
      this.basicInfoDialog = true;
    },
    //获取服务基本信息
    getServiceInfo(id) {
      this.HttpClient.post("/admin/services/baseInfo", {
        id: id
      }).then(res => {
        console.log(res);
        this.serviceInfo = res.data.data;
        for (let i = 0; i < this.serviceInfo.admin_upload_images.length; i++) {
          let m = JSON.parse(this.serviceInfo.admin_upload_images[i]);
          this.serviceInfo.admin_upload_images[i] = m;
        }
        for (
          let i = 0;
          i < this.serviceInfo.admin_upload_protocol.length;
          i++
        ) {
          let n = JSON.parse(this.serviceInfo.admin_upload_protocol[i]);
          this.serviceInfo.admin_upload_protocol[i] = n;
        }
      });
    },
    //新增备注
    handleAddRemark() {
      this.HttpClient.post("/admin/remarkLog/create", {
        content: this.textarea,
        source_id: this.serviceId
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.getrRemarkList(this.serviceId);
          }, 350);
          this.textarea = "";
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //打开添加备注弹框
    handleOpenRemark(id) {
      this.serviceId = id; //存储活动ID，用于新增
      this.getrRemarkList(id);
      this.remarkDialog = true;
    },
    //获取备注信息
    getrRemarkList(id) {
      this.HttpClient.post("/admin/remarkLog/lists", {
        source_id: id
      }).then(res => {
        console.log(res);
        this.remarkHistory = res.data.data.reverse();
      });
    },
    //刷新页面
    handleRefresh() {
      window.location.reload();
    },
    //根据服务标题请求数据
    handleServiceName() {
      console.log(this.state, this.serviceName);
      this.getServiceList(this.state, this.serviceName);
    },
    //根据状态请求数据
    handleChangeStateSearch(e) {
      this.state = e;
      this.getServiceList(this.state, this.serviceName);
    },
    //请求服务列表数据
    getServiceList(state, serviceTitle) {
      this.HttpClient.post("/admin/services/lists", {
        status: state,
        title: serviceTitle
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.data;
        this.total = res.data.data.total;
        if (res.data.code === 200) {
          this.state = null;
          this.serviceName = null;
        }
      });
    },
    filterPlate(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterSecondary(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less">
.serviceStatus {
  .bread {
    margin: 10px;
  }
  .service_main::-webkit-scrollbar {
    display: none;
  }

  .service_main {
    margin-left: 10px;
    margin-top: 10px;
    background: #fff;
    height: calc(100vh - 100px);
    width: calc(100vw - 240px);
    border-radius: 2px;
    overflow-y: auto;

    .service_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      border-bottom: 2px solid #f2f2f2;
      padding: 0 40px;
      .title {
        font-size: 20px;
        color: #222;
      }
      /*刷新*/
      .refresh {
        cursor: pointer;
        span {
          display: inline-block;
          margin-left: 10px;
        }
      }
    }

    /*头部*/
    .service_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px 25px;

      /*搜索框*/
      .service_search {
        display: flex;
        align-items: center;
        > div {
          margin-left: 30px;
        }
      }
    }

    /*表格*/
    .service_content {
      padding: 0 30px;

      .el-table {
        thead {
          color: #fff;
          th,
          tr {
            background-color: #15bafe;
          }
        }
      }

      /*操作按钮*/
      .service_scope {
        padding: 0;
        .cell {
          line-height: unset;
          .service_btm {
            display: flex;
            align-items: center;
            div {
              min-height: 47px;
              height: 100%;
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  /*备注弹窗*/
  .remarkDialog {
    .el-dialog__body {
      padding: 0 20px;
    }
    .remarkDialog_title {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      i {
        font-size: 24px;
        color: #15bafe;
      }
    }
    .remarkDialog_main {
      .remarkTitle {
        text-align: left;
        margin-bottom: 5px;
      }
      .remarkInput {
        margin-bottom: 20px;
      }
      .remarkHistory {
        max-height: 270px;
        overflow: auto;
        > div:not(:last-child) {
          margin-bottom: 15px;
        }
        .remarkHistoryUser {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          i {
            color: #15bafe;
            margin-right: 5px;
          }
          p {
            font-size: 14px;
            color: #222;
            margin-right: 8px;
          }
          span {
            font-size: 12px;
            color: #15bafe;
          }
        }
        .remarkHistoryUser ~ p {
          text-align: left;
          font-size: 12px;
          color: #666;
          padding-left: 20px;
        }
      }
    }
  }

  /*基本信息弹窗*/
  .basicInfoDialog {
    .el-dialog__body {
      padding: 0 20px 30px 20px;
    }
    .basicInfoDialog_title {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      i {
        font-size: 24px;
        color: #15bafe;
      }
    }

    .basicInfoDialog_main {
      .main_list {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 15px 0;
        .main_list_input:not(:nth-child(1)) {
          margin-left: 50px;
        }
        .main_list_input {
          display: flex;
          align-items: center;
          flex: 1;
          color: #000;
          font-size: 14px;
          p {
            width: 90px;
            text-align: justify;
          }
          div {
            border: 1px solid #e6e6e6;
            padding: 10px 10px;
            min-height: 15px;
            flex: 1;
            text-align: center;
          }
        }
      }

      /*预览框*/
      .upload {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div:not(:nth-child(1)) {
          margin-left: 30px;
        }
        > div {
          padding: 5px 10px;
          min-height: 160px;
          flex: 1;
          border: 1px solid #dedede;
          text-align: left;

          .el-upload--picture-card {
            width: 80px;
            height: 80px;
            line-height: 80px;
          }
          .el-upload-list--picture-card .el-upload-list__item {
            width: 80px;
            height: 80px;
            line-height: 80px;
            margin: 0;
          }

          .el-upload__text {
            text-align: center;
          }

          .el-upload-list--picture-card .el-progress {
            width: 70px;
            .el-progress-circle {
              width: 70px !important;
              height: 70px !important;
            }
          }
        }
      }
    }
  }
  /*预览弹窗 yc*/
  .previewDialog {
    .el-dialog__body {
      padding: 0 20px;
    }
    .remarkDialog_title {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      i {
        font-size: 24px;
        color: #15bafe;
      }
    }
    .remarkDialog_main {
      p {
        text-align: left;
      }
      .preview-content {
        width: 100%;
        height: 100px;
        border: 1px solid #bfbfbf;
        margin: 15px 0;
      }
      .preview-pics {
        // display: flex;
        // justify-content: space-around;
        margin: 15px 0;
        border: 1px solid #bfbfbf;
        padding: 10px;
        overflow-y: scroll;
        img {
          width: 100px;
          height: 100px;
          margin-right: 10px;
        }
      }
    }
    .enlarge-picture {
      width: 600px;
      // height: 400px;
      z-index: 9999;
      position: absolute;
      top: 0%;
      left: 0%;
      padding: 10px;
      background: #bfbfbf;
      img {
        width: 550px;
        // height: 400px;
      }
      i {
        font-size: 22px;
      }
      i:hover {
        color: #fff;
        font-size: 22px;
      }
    }
  }
  /*结束服务弹窗*/
  .endDialog {
    .el-dialog__body {
      padding: 0 20px;
    }
    .endDialog_title {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      i {
        font-size: 24px;
        color: #15bafe;
      }
    }
    .endDialog_main {
      .endDialog_text {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 75px;
        border: 1px solid #dedede;
        margin-top: 10px;
        border-radius: 4px;
        font-size: 14px;
        color: #aaa;
      }
    }
  }

  /*下架弹窗*/
  .obtainedDialog {
    .el-dialog__body {
      padding: 0 20px;
    }
    .obtainedDialog_title {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      i {
        font-size: 24px;
        color: #15bafe;
      }
    }

    .obtainedDialog_main {
      text-align: center;
      i {
        margin-bottom: 20px;
        color: #15bafe;
        font-size: 80px;
      }
      p {
        margin: 10px 0;
        font-size: 14px;
        color: #222;
      }
    }
  }

  // 查看评价弹框
  .alert-content {
    display: flex;
    margin: 30px 10px 30px 0;
    width: 300px;
  }
  .el-table .cell{
    img{
        width: 50%;
        object-fit: cover;
    }
  }
}
// 基本信息下半部分
.down_load {
  margin-top: 10px;
  display: flex;
  .examine_contents {
    height: 120px;
    width: 320px;
    margin-right: 10px;
    border: 1px solid #f2f2f2;
    border-radius: 3px;
    .examine_contain {
      height: 100px;
      overflow-y: auto;
      margin-top: 10px;
    }
    .examine_list {
      margin-top: 10px;
      overflow: auto;
      .examine_text {
        display: flex;
        justify-content: space-between;
        margin-left: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        text-decoration: none;
        a {
          text-decoration: none;
          width: 100%;
        }
        .examine_down_p {
          width: 320px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          color: #15bafe;
          text-align: left;
        }
        .icon_examine {
          margin-right: 10px;
          color: #404040;
        }
      }
    }
  }
  .img_contents {
    height: 120px;
    width: 330px;
    border: 1px solid #f2f2f2;
    border-radius: 3px;
    .img_contain {
      margin: 0 10px;
      display: flex;
      flex-wrap: wrap;
      height: 100px;
      overflow-y: auto;
      width: calc(100% - 20px);
      .img_3 {
        width: 100%;
        height: 100%;
      }
      .img_item1 {
        width: 30%;
        margin-right: 5%;
        height: 64px;
        margin-top: 10px;
      }
      .img_item2 {
        width: 30%;
        height: 64px;
        margin-top: 10px;
      }
      .modal_img {
        width: 100%;
        height: 64px;
        background: rgba(0, 0, 0, 0.4);
        position: relative;
        margin-top: -67px;
        opacity: 0;
        .modal_icon {
          position: relative;
          font-size: 18px;
          top: calc(50% - 12px);
          color: white;
        }
      }
      .modal_img:hover {
        opacity: 1;
      }
    }
  }
}
</style>
