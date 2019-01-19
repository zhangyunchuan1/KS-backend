import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import MOTY from '@/components/MOTY'
// import List from '@/components/List'
const HomePage  = () => import ('@/components/Index')
// const Test  = () => import ('@/components/Test')
// const Test1  = () => import ('@/components/Test1')
// const Test2  = () => import ('@/components/Test2')
const BulletinBoard  = () => import ('@/components/BulletinBoard')  //公告栏
const Home  = () => import ('@/components/Home')
const Activity  = () => import ('@/components/activity/Activity')  // 活动
const ActivityApply  = () => import ('@/components/activity/ActivityApply')  // 活动申请
const ActivityExamineApprove  = () => import ('@/components/activity/ActivityExamineApprove')  // 活动审批
const ActivityData  = () => import ('@/components/activity/ActivityData')  // 活动数据
const ActivityTimeState  = () => import ('@/components/activity/ActivityTimeState')  // 定时活动状态
const ActivityLongTerm  = () => import ('@/components/activity/ActivityLongTerm')  // 长期定时状态
const System  = () => import ('@/components/system/System')
const SystemMenu  = () => import ('@/components/system/SystemMenu')
const SystemMenuJurisdiction  = () => import ('@/components/system/SystemMenuJurisdiction')
const Inside  = () => import ('@/components/inside/Inside')
const InsideJurisdiction  = () => import ('@/components/inside/InsideJurisdiction')
const InsideRole  = () => import ('@/components/inside/InsideRole')
const InsideUser  = () => import ('@/components/inside/InsideUser')
const InsideUserJurisdiction  = () => import ('@/components/inside/InsideUserJurisdiction')
// const InsideUserJurisdictionTwo  = () => import '@/components/inside/InsideUserJurisdictionTwo'
const InsideDepartment  = () => import ('@/components/inside/InsideDepartment')
const InsideJob  = () => import ('@/components/inside/InsideJob')
const ActivityTicketingManagement  = () => import ('@/components/activity/ActivityTicketingManagement')  // 票务管理
const ActivityModify  = () => import ('@/components/activity/ActivityModify')  // 活动修改
const ActivityEvaluate  = () => import ('@/components/activity/ActivityEvaluate')  // 查看评价
const ActivitySeeSignUp  = () => import ('@/components/activity/ActivitySeeSignUp')  // 查看报名
const ActivityScore  = () => import ('@/components/activity/ActivityScore')  // 活动评分
const ActivitySeeEvaluate  = () => import ('@/components/activity/ActivitySeeEvaluate')  //查看评价
const ToppingActivity  = () => import ('@/components/activity/ToppingActivity')  //查看评价

const Page  = () => import ('@/components/page/Page')  // 页面
const PageManagement  = () => import ('@/components/page/pageManagement/PageManagement')  // 网页管理
const UploadMenu  = () => import ('@/components/page/pageManagement/uploadMenu/UploadMenu') // 上传菜单
const PagePlateManagement  = () => import ('@/components/page/pageManagement/uploadMenu/PagePlateManagement')  //上传版块管理
const PageUploadEncyclopedias  = () => import ('@/components/page/pageManagement/uploadMenu/PageUploadEncyclopedias')  //上传百科
const PageUploadService  = () => import ('@/components/page/pageManagement/uploadMenu/PageUploadService')  //上传服务
const PageUploadActivity  = () => import ('@/components/page/pageManagement/uploadMenu/PageUploadActivity')  //上传活动
const PageUploadProblem  = () => import ('@/components/page/pageManagement/uploadMenu/PageUploadProblem')  //上传问题

const AuditManagement  = () => import ('@/components/page/pageManagement/auditManagement/AuditManagement')  // 审核失败类别管理
const CommentAuditManagement  = () => import ('@/components/page/pageManagement/auditManagement/CommentAuditManagement')  // 评论审核管理
const ReplyAuditManagement  = () => import ('@/components/page/pageManagement/auditManagement/ReplyAuditManagement')  // 回复审核管理
const BackstageServiceShielding  = () => import ('@/components/page/pageManagement/auditManagement/BackstageServiceShielding')  // 后台客服屏蔽
const UserAuditManagement  = () => import ('@/components/page/pageManagement/auditManagement/UserAuditManagement')  // 用户审核管理
const ReportAudit  = () => import ('@/components/page/pageManagement/auditManagement/ReportAudit')  // 举报审核
const RejectionReason  = () => import ('@/components/page/pageManagement/auditManagement/RejectionReason')  // 视频问题百科驳回理由
const MerchantManagement  = () => import ('@/components/page/pageManagement/auditManagement/MerchantManagement')  // 商家管理
const RejectionCategory  = () => import ('@/components/page/pageManagement/auditManagement/RejectionCategory')  // 活动、服务驳回类别

const UploadProtocolManagement  = () => import ('@/components/page/pageManagement/uploadProtocolManagement/UploadProtocolManagement')  // 上传协议管理

const UploadPrompt  = () => import ('@/components/page/pageManagement/uploadPrompt/UploadPrompt')  // 上传提示
const UploadProductPrompt  = () => import ('@/components/page/pageManagement/uploadPrompt/UploadProductPrompt')  // 上传商品提示
const UploadService  = () => import ('@/components/page/pageManagement/uploadPrompt/UploadService')  // 上传服务
const UploadActivity  = () => import ('@/components/page/pageManagement/uploadPrompt/UploadActivity')  // 上传活动
const UploadEncyclopedia  = () => import ('@/components/page/pageManagement/uploadPrompt/UploadEncyclopedia')  // 上传百科
const UploadArticle  = () => import ('@/components/page/pageManagement/uploadPrompt/UploadArticle')  // 上传文章
const UploadVideo  = () => import ('@/components/page/pageManagement/uploadPrompt/UploadVideo')  // 上传视频
const SubmitQuestions  = () => import ('@/components/page/pageManagement/uploadPrompt/SubmitQuestions')  // 提出问题

const ClassificationPageManagement  = () => import ('@/components/page/pageManagement/classificationPageManagement/ClassificationPageManagement')  // 百科问题分类页管理

const SensitiveWords  = () => import ('@/components/page/sensitiveWords/SensitiveWords')  // 敏感词管理
const WordsManagement  = () => import ('@/components/page/sensitiveWords/WordsManagement')  // 词汇管理
const TypeManagement  = () => import ('@/components/page/sensitiveWords/TypeManagement')  // 类型管理

const BuyerRights  = () => import ('@/components/page/buyerRights/BuyerRights')  // 售后权益
const Rights  = () => import ('@/components/page/buyerRights/Rights')  // 权益

const BusinessCentre  = () => import ('@/components/page/businessCentre/BusinessCentre')  // 商家页面提示

const Recruit  = () => import ('@/components/recruit/Recruit')  //招聘
const RecruitJobManagement  = () => import ('@/components/recruit/RecruitJobManagement')  //招聘》职位管理
const RecruitSocialRecruitment  = () => import ('@/components/recruit/RecruitSocialRecruitment')  //招聘》社会招聘
// const RecruitCampusRecruitment  = () => import '@/components/recruit/RecruitCampusRecruitment'  //招聘》校园招聘

const External  = () => import ('@/components/external/External')
const ExternalMenu  = () => import ('@/components/external/ExternalMenu')
const ExternalJurisdiction  = () => import ('@/components/external/ExternalJurisdiction')
const ExternalBusinessJurisdiction  = () => import ('@/components/external/ExternalBusinessJurisdiction')

const Article  = () => import ('@/components/article/Article')  //文章
const ArticleStatus  = () => import ('@/components/article/ArticleStatus')  //文章状态
const ArticleManagement  = () => import ('@/components/article/ArticleManagement')  //文章管理
const ArticleModify  = () => import ('@/components/article/ArticleModify')  //修改文章
const ArticleComment  = () => import ('@/components/article/ArticleComment')  //评论管理
const ArticleReply  = () => import ('@/components/article/ArticleReply') //回复管理
const ArticlePageview  = () => import ('@/components/article/ArticlePageview')  //回复管理
const ArticleBestAuthor  = () => import ('@/components/article/ArticleBestAuthor')  //回复管理
const LiveSharing  = () => import ('@/components/article/LiveSharing') //优文分享
const ArticleTags  = () => import ('@/components/article/ArticleTags') //文章小标题分配

const Service  = () => import ('@/components/service/Service')  //服务
const ServiceData  = () => import ('@/components/service/ServiceData')  //服务数据
const ServiceApplication  = () => import ('@/components/service/ServiceApplication')  //新服务申请
const ServiceApproval  = () => import ('@/components/service/ServiceApproval')  //服务审批
const ServiceStatus  = () => import ('@/components/service/ServiceStatus')  //服务状态
const ServiceEvaluation  = () => import ('@/components/service/ServiceEvaluation')  //服务状态

const Question  = () => import ('@/components/question/Question')  //问题
const QuestionData  = () => import ('@/components/question/QuestionData')  //问题状态
const QuestionManagement  = () => import ('@/components/question/QuestionManagement')  //问题管理
const QuestionPreview  = () => import ('@/components/question/QuestionPreview')  //问题预览
const QuestionModify  = () => import ('@/components/question/QuestionModify')  //问题修改
const QuestionDistribution  = () => import ('@/components/question/QuestionDistribution')  //目录分配
const QuestionContents  = () => import ('@/components/question/QuestionContents')  //目录分配情况
const AnswerManagement  = () => import ('@/components/question/AnswerManagement')  //回答管理
const CommentManagement  = () => import ('@/components/question/CommentManagement')  //评论管理
// const ReplyManagement  = () => import '@/components/question/ReplyManagement'  //回复管理

const Video  = () => import ('@/components/video/Video')  //视频
const VideoData  = () => import ('@/components/video/VideoData')  //视频状态
const VideoManagement  = () => import ('@/components/video/VideoManagement')  //视频管理
const VideoModify  = () => import ('@/components/video/VideoModify')  //视频管理
const VideoDistribution  = () => import ('@/components/video/VideoDistribution')  //专业目录分配
const VideoContents  = () => import ('@/components/video/VideoContents')  //目录分配情况
const VideoComment  = () => import ('@/components/video/VideoComment')  //评论管理
const VideoReply  = () => import ('@/components/video/VideoReply')  //回复管理
const VideoSurvey  = () => import ('@/components/video/VideoSurvey')  //视频调查
const VideoRanking  = () => import ('@/components/video/VideoRanking')  //用户排名
const VideoTags  = () => import ('@/components/video/VideoTags')  //视频小标题分配
const VideoSoftware  = () => import ('@/components/video/VideoSoftware')  //视频软件或零件
const VideoLiveSharing  = () => import ('@/components/video/LiveSharing') //精彩赛事

const Business  = () => import ('@/components/business/Business')  //企业
const BusinessConnection  = () => import ('@/components/business/BusinessConnection')  //企业关系

const Feedback  = () => import ('@/components/feedback/Feedback')  //提出意见
const FeedbackOpinion  = () => import ('@/components/feedback/FeedbackOpinion')  //意见反馈
const FeedbackOpinionType  = () => import ('@/components/feedback/FeedbackOpinionType')  //意见反馈
const FeedbackMailManagement  = () => import ('@/components/feedback/FeedbackMailManagement')  //意见反馈

const Encyclopedia  = () => import ('@/components/encyclopedia/Encyclopedia') //百科
const EncyclopediaData  = () => import ('@/components/encyclopedia/EncyclopediaData') //百科数据
const EncyclopediaManagement  = () => import ('@/components/encyclopedia/EncyclopediaManagement') //百科管理
const EncyclopediaModify  = () => import ('@/components/encyclopedia/EncyclopediaModify') //百科修改
const EncyclopediaDistribution  = () => import ('@/components/encyclopedia/EncyclopediaDistribution') //百科专业目录分配
const EncyclopediaContents  = () => import ('@/components/encyclopedia/EncyclopediaContents') //百科目录分配情况
const EncyclopediaSurvey  = () => import ('@/components/encyclopedia/EncyclopediaSurvey') //百科数据调查
const EncyclopediaRanking  = () => import ('@/components/encyclopedia/EncyclopediaRanking') //用户排名
const OthersEdit  = () => import ('@/components/encyclopedia/OthersEdit') //他人编辑

const Mall  = () => import ('@/components/mall/Mall') // 商城
const MallProduct  = () => import ('@/components/mall/mallProduct/MallProduct') // 商城商品
const MallData  = () => import ('@/components/mall/mallProduct/MallData') // 商城数据
const MallReview  = () => import ('@/components/mall/mallProduct/MallReview')// 商城审核
const ProductPreview  = () => import ('@/components/mall/mallProduct/ProductPreview') // 商品预览
const ProductModify  = () => import ('@/components/mall/mallProduct/ProductModify') // 商品修改
const MallDistribution  = () => import ('@/components/mall/mallProduct/MallDistribution') // 专业目录分配
const MallContents  = () => import ('@/components/mall/mallProduct/MallContents') // 目录分配情况
const VendorStatistics  = () => import ('@/components/mall/mallProduct/VendorStatistics') // 厂商统计

const MallOrder  = () => import ('@/components/mall/mallOrder/MallOrder') // 商城订单
const MallOrderData  = () => import ('@/components/mall/mallOrder/MallOrderData') // 商城订单
const NewOrderInquiry  = () => import ('@/components/mall/mallOrder/NewOrderInquiry') // 新订单查询
const RefundOrder  = () => import ('@/components/mall/mallOrder/RefundOrder') // 退款订单
const ArrivalOrder  = () => import ('@/components/mall/mallOrder/ArrivalOrder') // 到货订单
const PaymentSituation  = () => import ('@/components/mall/mallOrder/PaymentSituation') // 支付情况
const Sales  = () => import ('@/components/mall/mallOrder/Sales') // 销售情况
// const MallUserEvaluation  = () => import ('@/components/mall/mallOrder/MallUserEvaluation') // 用户评价

const MallService  = () => import ('@/components/mall/service/Service') // 客服
const NewInformation  = () => import ('@/components/mall/service/NewInformation') // 新信息
const DialogueManagement  = () => import ('@/components/mall/service/DialogueManagement') // 对话管理
const HistoricalDialogue  = () => import ('@/components/mall/service/HistoricalDialogue') // 历史对话
const NewTaskAll  = () => import ('@/components/mall/service/NewTaskAll') // 新任务-所有
const DialogueManagementSupervisor  = () => import ('@/components/mall/service/DialogueManagementSupervisor') // 对话管理-主管
const LossProcessing  = () => import ('@/components/mall/service/LossProcessing') // 账号密码丢失

const ShoppingStatistics  = () => import ('@/components/mall/shoppingStatistics/ShoppingStatistics') // 购物统计
const ShoppingCart  = () => import ('@/components/mall/shoppingStatistics/ShoppingCart') // 购物车
const ShoppingConversionRate  = () => import ('@/components/mall/shoppingStatistics/ConversionRate') // 购买转化率
const ShoppingSettleAccounts  = () => import ('@/components/mall/shoppingStatistics/SettleAccounts') // 结算
const RecipientInformation  = () => import ('@/components/mall/shoppingStatistics/RecipientInformation') // 收货人信息

const MallAdvert  = () => import ('@/components/mall/mallAdvert/MallAdvert') // 商城广告
const MallHeaderAdvert  = () => import ('@/components/mall/mallAdvert/HeaderAdvert') // 头部广告
const MallContentAdvert  = () => import ('@/components/mall/mallAdvert/ContentAdvert') // 中部广告

const MallStatus  = () => import ('@/components/mall/mallStatus/MallStatus') // 商品销售情况
const MallSituationData  = () => import ('@/components/mall/mallStatus/MallData') // 销售数据
const UserComment  = () => import ('@/components/mall/mallStatus/UserComment') // 用户评论
const SectorSales  = () => import ('@/components/mall/mallStatus/SectorSales') // 板块销售情况
const UserGroup  = () => import ('@/components/mall/mallStatus/UserGroup') // 用户群体数据

const Market  = () => import ('@/components/market/Market') // 淘货
const MarketProduct  = () => import ('@/components/market/marketProduct/MarketProduct') // 淘货商品
const MarketProductData  = () => import ('@/components/market/marketProduct/ProductData') // 淘货商品数据
const MarketProductPreview  = () => import ('@/components/market/marketProduct/ProductPreview') // 淘货商品预览
const MarketProductModify  = () => import ('@/components/market/marketProduct/ProductModify')  // 淘货商品修改
const MarketProductReview  = () => import ('@/components/market/marketProduct/ProductReview') // 淘货商品审核

const MarketOrder  = () => import ('@/components/market/marketOrder/MarketOrder') // 淘货订单
const MarketOrderData  = () => import ('@/components/market/marketOrder/OrderData') // 淘货订单数据
const MarketNewOrder  = () => import ('@/components/market/marketOrder/NewOrder') // 新订单查询
const MarketRefundOrder  = () => import ('@/components/market/marketOrder/RefundOrder') // 退款订单
const MarketArrivalOrder  = () => import ('@/components/market/marketOrder/ArrivalOrder') // 到货订单
const MarketPaymentSituation  = () => import ('@/components/market/marketOrder/PaymentSituation'); // 支付情况

const MarketSales  = () => import ('@/components/market/marketSales/MarketSales') // 淘货销售情况
const MarketSalesData  = () => import ('@/components/market/marketSales/SalesData') // 销售数据
const MarketUserComment  = () => import ('@/components/market/marketSales/UserComment') // 用户评论
const MarketSectorSales  = () => import ('@/components/market/marketSales/SectorSales') // 板块销售情况
const MarketUserGroup  = () => import ('@/components/market/marketSales/UserGroup') // 用户群体数据

const FunctionControl  = () => import ('@/components/functionControl/FunctionControl') // 功能控制
const PlateTitleManagement  = () => import ('@/components/functionControl/plateTitleManagement/PlateTitleManagement') // 板块标题管理
const VideoTitle  = () => import ('@/components/functionControl/plateTitleManagement/VideoTitle') // 视频标题
const ArticleTitle  = () => import ('@/components/functionControl/plateTitleManagement/ArticleTitle') // 文章标题
const TitleData  = () => import ('@/components/functionControl/plateTitleManagement/TitleData') // 标题数据

const professionalCatalog  = () => import ('@/components/functionControl/professionalCatalog/ProfessionalCatalog') // 专业目录
const AddDirectory  = () => import ('@/components/functionControl/professionalCatalog/AddDirectory') // 添加目录
const DirectoryManagement  = () => import ('@/components/functionControl/professionalCatalog/DirectoryManagement') // 目录管理
const SynonymManagement  = () => import ('@/components/functionControl/professionalCatalog/SynonymManagement') // 近义词管理

const MessagesManagement  = () => import ('@/components/functionControl/messagesManagement/MessagesManagement') // 头部信息管理
const MessagesPrompt  = () => import ('@/components/functionControl/messagesManagement/MessagesPrompt') // 消息提示
const CategoryCreation  = () => import ('@/components/functionControl/messagesManagement/CategoryCreation') // 信息提示类别创建

const MessageBox  = () => import ('@/components/functionControl/messageBox/MessageBox') // 弹框内容管理
const MessageContentManagement  = () => import ('@/components/functionControl/messageBox/MessageContentManagement') // 弹框内容管理
const MessageContent  = () => import ('@/components/functionControl/messageBox/MessageContent') // 弹框内容

const IncomeControl  = () => import ('@/components/functionControl/incomeControl/IncomeControl') // 收支提示
const UserIncomePrompt  = () => import ('@/components/functionControl/incomeControl/UserIncomePrompt') // 用户收支提示
const MerchantRevenueTips  = () => import ('@/components/functionControl/incomeControl/MerchantRevenueTips') // 商家收支提示
const CategoryManagement  = () => import ('@/components/functionControl/incomeControl/CategoryManagement') // 类别管理

const MallManagement  = () => import ('@/components/functionControl/mallManagement/MallManagement') // 商城菜单管理
const MallDirectoryManagement  = () => import ('@/components/functionControl/mallManagement/DirectoryManagement') // 目录管理
const ProductCatalogAssignment  = () => import ('@/components/functionControl/mallManagement/ProductCatalogAssignment') // 产品目录分配
const NewProductType  = () => import ('@/components/functionControl/mallManagement/NewProductType') // 新增产品类型
const ModifyProductType  = () => import ('@/components/functionControl/mallManagement/ModifyProductType') // 修改产品类型
const ProductTypeList  = () => import ('@/components/functionControl/mallManagement/ProductTypeList') // 产品类型列表
const DeleteProductType  = () => import ('@/components/functionControl/mallManagement/DeleteProductType') // 删除产品类型
const SelectboxName  = () => import ('@/components/functionControl/mallManagement/SelectboxName') // 数字区间属性名称
const AttributeName  = () => import ('@/components/functionControl/mallManagement/AttributeName') // 数字区间属性名称
const DefiningAttributes  = () => import ('@/components/functionControl/mallManagement/DefiningAttributes') // 定义数字区间属性
const ModelManagement  = () => import ('@/components/functionControl/mallManagement/ModelManagement') // 适用车型管理
const VehicleManagement  = () => import ('@/components/functionControl/mallManagement/VehicleManagement') // 车辆管理列表
const AddVehicle  = () => import ('@/components/functionControl/mallManagement/AddVehicle') // 车辆添加

const DataGather  = () => import ('@/components/dataGather/dataGather') // 用户行为分析
const HeaderMessagePrompt  = () => import ('@/components/dataGather/HeaderMessagePrompt') // 头部消息提示
const AccessRecord  = () => import ('@/components/dataGather/AccessRecord') // 访问记录
const SearchRecord  = () => import ('@/components/dataGather/SearchRecord') // 搜索记录
const SearchRanking  = () => import ('@/components/dataGather/SearchRanking') // 搜索排行

const BusinessUser  = () => import ('@/components/businessUser/BusinessUser') // 商家管理
const BusinessAccount  = () => import ('@/components/businessUser/businessAccount/BusinessAccount') // 商家账户
const BusinessReview  = () => import ('@/components/businessUser/businessAccount/BusinessReview') // 商家资质审核
const AuthorityManagement  = () => import ('@/components/businessUser/businessAccount/AuthorityManagement') // 权限管理
const DisableBusiness  = () => import ('@/components/businessUser/businessAccount/DisableBusiness') // 禁用商家
const BusinessManagement  = () => import ('@/components/businessUser/businessAccount/BusinessManagement') // 商家账号管理

const MerchantData  = () => import ('@/components/businessUser/merchantData/MerchantData') // 商家数据
const MerchantUserEcology  = () => import ('@/components/businessUser/merchantData/UserEcology') // 用户生态
const MerchantConversation  = () => import ('@/components/businessUser/merchantData/MerchantConversation') // 商家对话
const MerchantFan  = () => import ('@/components/businessUser/merchantData/MerchantFan') // 商家的关注者
const BusinessIncome  = () => import ('@/components/businessUser/merchantData/BusinessIncome') // 商家的关注者

const StandardUser  = () => import ('@/components/standardUser/StandardUser') // 用户管理
const UserManagement  = () => import ('@/components/standardUser/userManagement/UserManagement') // 用户账户
const UserReport  = () => import ('@/components/standardUser/userManagement/UserReport') // 用户举报
const UserStatus  = () => import ('@/components/standardUser/userManagement/UserStatus') // 用户状态
const UserAmount  = () => import ('@/components/standardUser/userManagement/UserAmount') // 用户数量
const UserActivity  = () => import ('@/components/standardUser/userManagement/UserActivity') // 用户活跃度
const UserAccountManagement  = () => import ('@/components/standardUser/userManagement/UserAccountManagement') // 用户账号管理
const UserBindingManagement  = () => import ('@/components/standardUser/userManagement/UserBindingManagement') // 用户绑定管理

const UserData  = () => import ('@/components/standardUser/userData/UserData') // 用户数据
const UserEcology  = () => import ('@/components/standardUser/userData/UserEcology') // 用户生态
const UserConversationHistory  = () => import ('@/components/standardUser/userData/UserConversationHistory') // 用户对话历史
const UserAttention  = () => import ('@/components/standardUser/userData/UserAttention') // 用户关注
const UserIncome  = () => import ('@/components/standardUser/userData/UserIncome') // 用户收入流水
const UserHistory  = () => import ('@/components/standardUser/userData/UserHistory') // 用户历史记录

const CashManagement  = () => import ('@/components/cashManagement/CashManagement') // 现金管理
const UserWithdrawal  = () => import ('@/components/cashManagement/userManagement/UserWithdrawal') // 用户管理
const CashWithdrawalRecord  = () => import ('@/components/cashManagement/userManagement/CashWithdrawalRecord') // 用户提现记录
const CashWithdrawalOperation  = () => import ('@/components/cashManagement/userManagement/CashWithdrawalOperation') // 提现操作

const BusinessWithdraw  = () => import ('@/components/cashManagement/businessWithdraw/BusinessWithdraw') // 商家管理
const BusinessRecord  = () => import ('@/components/cashManagement/businessWithdraw/BusinessRecord') // 商家提现记录
const ApplicationOperation  = () => import ('@/components/cashManagement/businessWithdraw/ApplicationOperation') // 商家提现申请操作
const WithdrawalReview  = () => import ('@/components/cashManagement/businessWithdraw/WithdrawalReview') // 商家提现审核
const BusinessChangePassword  = () => import ('@/components/cashManagement/businessWithdraw/ChangePassword') // 提现密码修改

const SystemFinance  = () => import ('@/components/cashManagement/systemFinance/SystemFinance') // 系统账户
const AlipayAccount  = () => import ('@/components/cashManagement/systemFinance/AlipayAccount') // 支付宝账户
const WeChatAccount  = () => import ('@/components/cashManagement/systemFinance/WeChatAccount') // 微信账户
const AccountEvent  = () => import ('@/components/cashManagement/systemFinance/AccountEvent') // 账户事件

const CoolCircle  = () => import ('@/components/coolCircle/CoolCircle') // 酷圈
const CoolCircleManagement  = () => import ('@/components/coolCircle/CoolCircleManagement') // 酷圈管理
const CoolCircleReviewManagement  = () => import ('@/components/coolCircle/CoolCircleReviewManagement') // 酷圈评论管理

const Login  = () => import ('@/components/login/Login')  // 登陆页

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/login'
    }, {
    // 登陆页
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/index',
      name: 'HomePage',
      component: HomePage,
      children: [
      //   {
      //   path: '/index/test',
      //   name: 'Test',
      //   component: Test
      // }
      // ,{
      //   path: '/index/test1',
      //   name: 'Test1',
      //   component: Test1
      // }
      // ,{
      //   path: '/index/test2',
      //   name: 'Test2',
      //   component: Test2
      // },
      {
        path: '/index/bulletin-board',
        name: 'BulletinBoard',
        component: BulletinBoard
      },{
        path: '/index/home',
        name: 'Home',
        component: Home
      },{  // 活动
        path: '/index/activity',
        name: 'Activity',
        component: Activity,
        children: [{  // 活动申请
          path: '/index/activity/apply',
          name: 'ActivityApply',
          component: ActivityApply
        },{  // 活动审批
          path: '/index/activity/examine-approve',
          name: 'ActivityExamineApprove',
          component: ActivityExamineApprove
        },{  // 活动数据
          path: '/index/activity/data',
          name: 'ActivityData',
          component: ActivityData
        },{  // 定时活动状态
          path: '/index/activity/timed-active-state',
          name: 'ActivityTimeState',
          component: ActivityTimeState
        },{  // 长期定时状态
          path: '/index/activity/long-term-activity',
          name: 'ActivityLongTerm',
          component: ActivityLongTerm
        },{  // 票务管理
          path: '/index/activity/ticket-management',
          name: 'ActivityTicketingManagement',
          component: ActivityTicketingManagement
        },{  // 查看报名
          path: '/index/activity/activity-seeSignUp',
          name: 'ActivitySeeSignUp',
          component: ActivitySeeSignUp
        },{  // 修改活动
          path: '/index/activity/activity-modify',
          name: 'ActivityModify',
          component: ActivityModify
        },{  // 活动评分
          path: '/index/activity/activity-score',
          name: 'ActivityScore',
          component: ActivityScore
        },{
          path: '/index/activity/activity-see-evaluate',
          name: 'ActivitySeeEvaluate',
          component: ActivitySeeEvaluate
        },{  // 活动评价
          path: '/index/activity/activity-evaluate',
          name: 'ActivityEvaluate',
          component: ActivityEvaluate
        },{  // 置顶活动
          path: '/index/activity/topping-activity',
          name: 'ToppingActivity',
          component: ToppingActivity
        }]
      },{
        path: '/index/system',
        name: 'System',
        component: System,
        children: [{
          path: '/index/system/menu',
          name: 'SystemMenu',
          component: SystemMenu
        },{
          path: '/index/system/menu-jurisdiction',
          name: 'SystemMenuJurisdiction',
          component: SystemMenuJurisdiction
        }]
      },{
        path: '/index/inside',
        name: 'Inside',
        component: Inside,
        children: [{
          path: '/index/inside/jurisdiction',
          name: 'InsideJurisdiction',
          component: InsideJurisdiction,
        },{
          path: '/index/inside/role',
          name: 'InsideRole',
          component: InsideRole,
        },{
          path: '/index/inside/user',
          name: 'InsideUser',
          component: InsideUser,
        },{
          path: '/index/inside/user-jurisdiction',
          name: 'InsideUserJurisdiction',
          component: InsideUserJurisdiction,
        },
        // {
        //     // path: '/index/inside/user-jurisdictionTwo',
        //     // name: 'InsideUserJurisdictionTwo',
        //     // component: InsideUserJurisdictionTwo,
        // },
        {
          path: '/index/inside/department',
          name: 'InsideDepartment',
          component: InsideDepartment,
        },{
          path: '/index/inside/job',
          name: 'InsideJob',
          component: InsideJob,
        }]
      },{  // 页面
        path: '/index/page',
        name: 'Page',
        component: Page,
        children:[{  // 网页管理
          path: '/index/page/pageManagement/page-management',
          name: 'PageManagement',
          component: PageManagement,
          children:[{  // 上传菜单
            path: '/index/page/pageManagement/uploadMenu/upload-menu',
            name: 'UploadMenu',
            component: UploadMenu,
            children:[{  //板块管理
              path: '/index/page/pageManagement/uploadMenu/page-plate-management',
              name: 'PagePlateManagement',
              component: PagePlateManagement
            },{
              //上传百科
              path: '/index/page/pageManagement/uploadMenu/page-upload-encyclopedias',
              name: 'PageUploadEncyclopedias',
              component: PageUploadEncyclopedias,
            },{
              //上传服务
              path: '/index/page/pageManagement/uploadMenu/page-upload-service',
              name: 'PageUploadService',
              component: PageUploadService,
            },{
              //上传活动
              path: '/index/page/pageManagement/uploadMenu/page-upload-activity',
              name: 'PageUploadActivity',
              component: PageUploadActivity
            },{
              //上传问题
              path: '/index/page/pageManagement/uploadMenu/page-upload-problem',
              name: 'PageUploadProblem',
              component: PageUploadProblem
            }]
          },{  // 审核失败类别管理
            path: '/index/page/pageManagement/auditManagement/audit-management',
            name: 'AuditManagement',
            component: AuditManagement,
            children: [{  // 评论审核管理
              path: '/index/page/pageManagement/auditManagement/comment-audit-management',
              name: 'CommentAuditManagement',
              component: CommentAuditManagement,
            },{  // 回复审核管理
              path: '/index/page/pageManagement/auditManagement/reply-audit-management',
              name: 'ReplyAuditManagement',
              component: ReplyAuditManagement,
            },{  // 后台客服屏蔽
              path: '/index/page/pageManagement/auditManagement/backstage-service-shielding',
              name: 'BackstageServiceShielding',
              component: BackstageServiceShielding,
            },{  // 用户审核管理
              path: '/index/page/pageManagement/auditManagement/user-audit-management',
              name: 'UserAuditManagement',
              component: UserAuditManagement,
            },{  // 举报审核
              path: '/index/page/pageManagement/auditManagement/report-audit',
              name: 'ReportAudit',
              component: ReportAudit,
            },{  // 视频问题百科驳回理由
              path: '/index/page/pageManagement/auditManagement/rejection-reason',
              name: 'RejectionReason',
              component: RejectionReason,
            },{  // 商家管理
              path: '/index/page/pageManagement/auditManagement/merchant-management',
              name: 'MerchantManagement',
              component: MerchantManagement,
            },{  // 活动、服务驳回类别
              path: '/index/page/pageManagement/auditManagement/rejection-category',
              name: 'RejectionCategory',
              component: RejectionCategory,
            }]
          },{  // 上传协议管理
            path: '/index/page/pageManagement/uploadProtocolManagement/upload-protocol-management',
            name: 'UploadProtocolManagement',
            component: UploadProtocolManagement,
          },{  // 上传提示
            path: '/index/page/pageManagement/uploadPrompt/upload-prompt',
            name: 'UploadPrompt',
            component: UploadPrompt,
            children: [{  // 上传商品提示
              path: '/index/page/pageManagement/uploadPrompt/upload-product-prompt',
              name: 'UploadProductPrompt',
              component: UploadProductPrompt,
            },{  // 上传服务
              path: '/index/page/pageManagement/uploadPrompt/upload-service',
              name: 'UploadService',
              component: UploadService,
            },{  // 上传活动
              path: '/index/page/pageManagement/uploadPrompt/upload-activity',
              name: 'UploadActivity',
              component: UploadActivity,
            },{  // 上传百科
              path: '/index/page/pageManagement/uploadPrompt/upload-encyclopedia',
              name: 'UploadEncyclopedia',
              component: UploadEncyclopedia,
            },{  // 上传文章
              path: '/index/page/pageManagement/uploadPrompt/upload-article',
              name: 'UploadArticle',
              component: UploadArticle,
            },{  // 上传视频
              path: '/index/page/pageManagement/uploadPrompt/upload-video',
              name: 'UploadVideo',
              component: UploadVideo,
            },{  // 提出问题
              path: '/index/page/pageManagement/uploadPrompt/submit-questions',
              name: 'SubmitQuestions',
              component: SubmitQuestions,
            }]
          },{  // 百科问题分类页管理
            path: '/index/page/pageManagement/classificationPageManagement/classification-page-management',
            name: 'ClassificationPageManagement',
            component: ClassificationPageManagement,
          }]
        },{  // 敏感词
          path: '/index/page/sensitiveWords/sensitive-words',
          name: 'SensitiveWords',
          component: SensitiveWords,
          children: [{  // 词汇管理
            path: '/index/page/sensitiveWords/words-management',
            name: 'WordsManagement',
            component: WordsManagement,
          },{  // 类型管理
            path: '/index/page/sensitiveWords/type-management',
            name: 'TypeManagement',
            component: TypeManagement,
          }]
        },{  // 售后权益
          path: '/index/page/buyerRights/buyer-rights',
          name: 'BuyerRights',
          component: BuyerRights,
          children: [{  // 权益
            path: '/index/page/buyerRights/rights',
            name: 'Rights',
            component: Rights,
          }]
        },{  // 商家页面提示
          path: '/index/page/businessCentre/business-centre',
          name: 'BusinessCentre',
          component: BusinessCentre,
        }]
      },{
        path: '/index/external',
        name: 'External',
        component: External,
        children: [{
          path: '/index/external/menu',
          name: 'ExternalMenu',
          component: ExternalMenu
        },{
          path: '/index/external/jurisdiction',
          name: 'ExternalJurisdiction',
          component: ExternalJurisdiction
        },{
          path: '/index/external/business-jurisdiction',
          name: 'ExternalBusinessJurisdiction',
          component: ExternalBusinessJurisdiction
        }]
      },{
        // 文章管理
        path: '/index/article',
        name: 'Article',
        component: Article,
        children: [{
          //文章状态
          path: '/index/article/status',
          name: 'ArticleStatus',
          component: ArticleStatus
        },{
          //文章管理
          path: '/index/article/article-management',
          name: 'ArticleManagement',
          component: ArticleManagement
        },{
          //修改文章
          path: '/index/article/article-modify',
          name: 'ArticleModify',
          component: ArticleModify
        },{
          //评论管理
          path: '/index/article/comment',
          name: 'ArticleComment',
          component: ArticleComment
        },{
          //评论管理
          path: '/index/article/article-reply',
          name: 'ArticleReply',
          component: ArticleReply
        },{
          //文章浏览量统计
          path: '/index/article/article-pageview',
          name: 'ArticlePageview',
          component: ArticlePageview
        },{
          //文章浏览量统计
          path: '/index/article/article-best-author',
          name: 'ArticleBestAuthor',
          component: ArticleBestAuthor
        },{  // 优文分享
          path:'/index/article/live-sharing',
          name:'LiveSharing',
          component:LiveSharing
        },{  // 文章小标题分配
          path:'/index/article/article-tags',
          name:'ArticleTags',
          component:ArticleTags
        }]
      },{
        path:'/index/recruit',     //招聘
        name:Recruit,
        component: Recruit,
        children: [{   //增加招聘职位
          path: '/index/recruit/recruit-job-management',
          name: 'RecruitJobManagement',
          component: RecruitJobManagement
        },{            //社会招聘
          path: '/index/recruit/recruit-social-recruitment',
          name: 'RecruitSocialRecruitment',
          component: RecruitSocialRecruitment
        },
        // {            //校园招聘
        //   path: '/index/recruit/recruit-campus-recruitment',
        //   name: 'RecruitCampusRecruitment',
        //   component: RecruitCampusRecruitment
        // }
      ]
      },{
        path:'/index/service', //服务
        name:'Service',
        component: Service,
        children: [{   //服务数据
          path: '/index/service/service-data',
          name: 'ServiceData',
          component: ServiceData
        },{   //新服务申请
          path: '/index/service/service-application',
          name: 'ServiceApplication',
          component: ServiceApplication
        },{   //服务审批
          path: '/index/service/service-approval',
          name: 'ServiceApproval',
          component: ServiceApproval
        },{   //服务状态
          path: '/index/service/service-status',
          name: 'ServiceStatus',
          component: ServiceStatus
        },{   //评价
          path: '/index/service/service-evaluation',
          name: 'ServiceEvaluation',
          component: ServiceEvaluation
        }]
      },{
        path:'/index/question', //问题
        name:'Question',
        component: Question,
        children: [{  //问题状态
          path: '/index/question/question-data',
          name: 'QuestionData',
          component: QuestionData,
        },{  //问题管理
          path: '/index/question/question-management',
          name: 'QuestionManagement',
          component: QuestionManagement,
        },{  //问题修改
          path: '/index/question/question-modify',
          name: 'QuestionModify',
          component: QuestionModify,
        },{  //问题预览
          path: '/index/question/question-preview',
          name: 'QuestionPreview',
          component: QuestionPreview,
        },{  //目录分配
          path: '/index/question/question-distribution',
          name: 'QuestionDistribution',
          component: QuestionDistribution,
        },{  //目录分配情况
          path: '/index/question/question-contents',
          name: 'QuestionContents',
          component: QuestionContents,
        },{  //回答管理
          path: '/index/question/answer-management',
          name: 'AnswerManagement',
          component: AnswerManagement,
        },{  //评论管理
          path: '/index/question/comment-management',
          name: 'CommentManagement',
          component: CommentManagement,
        },
        // {  //回复管理
        //   path: '/index/question/reply-management',
        //   name: 'ReplyManagement',
        //   component: ReplyManagement,
        // }
      ]
      },{
        path:'/index/video', //视频
        name: 'Video',
        component: Video,
        children:[{// 视频状态
          path: '/index/video/video-data',
          name: 'VideoData',
          component: VideoData,
        },{// 视频管理
          path: '/index/video/video-management',
          name: 'VideoManagement',
          component: VideoManagement,
        },{// 视频修改
          path: '/index/video/video-modify',
          name: 'VideoModify',
          component: VideoModify,
        },{// 专业目录分配
          path: '/index/video/video-distribution',
          name: 'VideoDistribution',
          component: VideoDistribution,
        },{// 目录分配情况
          path: '/index/video/video-contents',
          name: 'VideoContents',
          component: VideoContents,
        },{// 评论管理
          path: '/index/video/video-comment',
          name: 'VideoComment',
          component: VideoComment,
        },
        {// 回复管理
          path: '/index/video/video-reply',
          name: 'VideoReply',
          component: VideoReply,
        },
        {// 视频调查
          path: '/index/video/video-survey',
          name: 'VideoSurvey',
          component: VideoSurvey,
        },{// 用户排名
          path: '/index/video/video-ranking',
          name: 'VideoRanking',
          component: VideoRanking,
        },{// 视频小标题分配
          path: '/index/video/video-tags',
          name: 'VideoTags',
          component: VideoTags,
        },{// 视频零件或软件
          path: '/index/video/video-software',
          name: 'VideoSoftware',
          component: VideoSoftware,
        },{  // 精彩赛事
          path:'/index/video/live-sharing',
          name:'VideoLiveSharing',
          component:VideoLiveSharing
        }]
      },{
        path:'/index/business',// 企业
        name:'Business',
        component:Business,
        children:[{//企业关系
          path:'/index/business/business-connection',
          name:'BusinessConnection',
          component:BusinessConnection,
        }]
      },{
          path:'/index/feedback',// 提出意见
          name:'Feedback',
          component:Feedback,
          children:[{//意见反馈
              path:'/index/feedback/feedback-opinion',
              name:'FeedbackOpinion',
              component:FeedbackOpinion,
          },{//意见反馈类型
              path:'/index/feedback/feedback-opinion-type',
              name:'FeedbackOpinionType',
              component:FeedbackOpinionType,
          },{
              path:'/index/feedback/feedback-mail-management',
              name:'FeedbackMailManagement',
              component:FeedbackMailManagement
          }]
      },{
          path:'/index/encyclopedia',// 百科
          name:'Encyclopedia',
          component:Encyclopedia,
          children:[{// 百科数据
              path:'/index/encyclopedia/encyclopedia-data',
              name:'EncyclopediaData',
              component:EncyclopediaData
          },{  // 百科管理
              path:'/index/encyclopedia/encyclopedia-management',
              name:'EncyclopediaManagement',
              component:EncyclopediaManagement
          },{// 百科修改
              path:'/index/encyclopedia/encyclopedia-modify',
              name:'EncyclopediaModify',
              component:EncyclopediaModify
          },{  // 百科专业目录分配
            path:'/index/encyclopedia/encyclopedia-distribution',
            name:'EncyclopediaDistribution',
            component:EncyclopediaDistribution
          },{  // 百科目录分配情况
            path:'/index/encyclopedia/encyclopedia-contents',
            name:'EncyclopediaContents',
            component:EncyclopediaContents
          },{  // 百科数据调查
            path:'/index/encyclopedia/encyclopedia-survey',
            name:'EncyclopediaSurvey',
            component:EncyclopediaSurvey
          },{  // 用户排名
            path:'/index/encyclopedia/encyclopedia-ranking',
            name:'EncyclopediaRanking',
            component:EncyclopediaRanking
          },{  // 他人编辑
            path:'/index/encyclopedia/others-edit',
            name:'OthersEdit',
            component:OthersEdit
          }]
      },{
        path:'/index/mall',// 商城
        name:'Mall',
        component:Mall,
        children:[{// 商城商品
          path:'/index/mall/mallProduct/mall-product',
          name:'MallProduct',
          component:MallProduct,
          children:[{  // 商品数据
            path:'/index/mall/mallProduct/mall-data',
            name:'MallData',
            component:MallData,
          },{  // 商品审核
            path:'/index/mall/mallProduct/mall-review',
            name:'MallReview',
            component:MallReview,
          },{  // 商品预览
            path:'/index/mall/mallProduct/product-preview',
            name:'ProductPreview',
            component:ProductPreview,
          },{  // 商品修改
            path:'/index/mall/mallProduct/product-modify',
            name:'ProductModify',
            component:ProductModify,
          },{  // 专业目录分配
            path:'/index/mall/mallProduct/mall-distribution',
            name:'MallDistribution',
            component:MallDistribution,
          },{  // 目录分配情况
            path:'/index/mall/mallProduct/mall-contents',
            name:'MallContents',
            component:MallContents,
          },{  // 厂商统计
            path:'/index/mall/mallProduct/vendor-statistics',
            name:'VendorStatistics',
            component:VendorStatistics,
          }]
        },{ // 商城订单
          path:'/index/mall/mallOrder/mall-order',
          name:'MallOrder',
          component:MallOrder,
          children:[{  // 订单数据
            path:'/index/mall/mallOrder/mall-order-data',
            name:'MallOrderData',
            component:MallOrderData,
          },{  // 新订单查询
            path:'/index/mall/mallOrder/new-order-inquiry',
            name:'NewOrderInquiry',
            component:NewOrderInquiry,
          },{  // 退款订单
            path:'/index/mall/mallOrder/refund-order',
            name:'RefundOrder',
            component:RefundOrder,
          },{  // 到货订单
            path:'/index/mall/mallOrder/arrival-order',
            name:'ArrivalOrder',
            component:ArrivalOrder,
          },{  // 支付情况
            path:'/index/mall/mallOrder/payment-situation',
            name:'PaymentSituation',
            component:PaymentSituation,
          },{  // 销售情况
            path:'/index/mall/mallOrder/sales',
            name:'Sales',
            component:Sales,
          },
          // {  // 用户评价
          //   path:'/index/mall/mallOrder/mall-user-evaluation',
          //   name:'MallUserEvaluation',
          //   component:MallUserEvaluation,
          // }
        ]
        },{  // 客服
          path:'/index/mall/service/Service',
          name:'MallService',
          component:MallService,
          children:[{  // 新信息
            path:'/index/mall/service/new-information',
            name:'NewInformation',
            component:NewInformation,
          },{  // 对话管理
            path:'/index/mall/service/dialogue-management',
            name:'DialogueManagement',
            component:DialogueManagement,
          },{  // 历史对话
            path:'/index/mall/service/historical-dialogue',
            name:'HistoricalDialogue',
            component:HistoricalDialogue,
          },{  // 新任务-所有
            path:'/index/mall/service/new-task-all',
            name:'NewTaskAll',
            component:NewTaskAll,
          },{  // 对话管理-主管
            path:'/index/mall/service/dialogue-management-supervisor',
            name:'DialogueManagementSupervisor',
            component:DialogueManagementSupervisor,
          },{  // 对话管理-主管
            path:'/index/mall/service/loss-processing',
            name:'LossProcessing',
            component:LossProcessing,
          }]
        },{  // 购物统计
          path:'/index/mall/shoppingStatistics/shopping-statistics',
          name:'ShoppingStatistics',
          component:ShoppingStatistics,
          children:[{  // 购物车
            path: '/index/mall/shoppingStatistics/shopping-cart',
            name: 'ShoppingCart',
            component: ShoppingCart,
          },{  // 购买转化率
            path: '/index/mall/shoppingStatistics/conversion-rate',
            name: 'ShoppingConversionRate',
            component: ShoppingConversionRate,
          },{  // 结算
            path: '/index/mall/shoppingStatistics/settle-accounts',
            name: 'ShoppingSettleAccounts',
            component: ShoppingSettleAccounts,
          },{  // 收货人信息
            path: '/index/mall/shoppingStatistics/recipient-information',
            name: 'RecipientInformation',
            component: RecipientInformation,
          }]
        },{  // 商城广告
          path:'/index/mall/mallAdvert/mall-advert',
          name:'MallAdvert',
          component:MallAdvert,
          children:[{  // 头部广告
            path: '/index/mall/mallAdvert/header-advert',
            name: 'MallHeaderAdvert',
            component: MallHeaderAdvert,
          },{  // 中部广告
            path: '/index/mall/mallAdvert/content-advert',
            name: 'MallContentAdvert',
            component: MallContentAdvert,
          }]
        },{// 销售情况
            path:'/index/mall/mallStatus/mall-status',
            name:'MallStatus',
            component:MallStatus,
            children:[{// 销售数据
                path:'/index/mall/mallStatus/mall-data',
                name:'MallData',
                component:MallSituationData
            },{// 用户评论
                path:'/index/mall/mallStatus/user-comment',
                name:'UserComment',
                component:UserComment
            },{// 板块销售情况
                path:'/index/mall/mallStatus/sector-sales',
                name:'SectorSales',
                component:SectorSales
            },{// 用户群体数据
                path:'/index/mall/mallStatus/user-group',
                name:'UserGroup',
                component:UserGroup
            }]
        }]
      },{// 淘货
        path:'/index/market',
        name:'Market',
        component:Market,
        children:[{// 淘货商品
          path:'/index/market/marketProduct/market-product',
          name:'MarketProduct',
          component:MarketProduct,
          children:[{// 淘货商品数据
            path:'/index/market/marketProduct/product-data',
            name:'MarketProductData',
            component:MarketProductData
          },{// 淘货商品审核
            path:'/index/market/marketProduct/product-review',
            name:'MarketProductReview',
            component:MarketProductReview
          },{// 淘货商品预览
            path:'/index/market/marketProduct/product-preview',
            name:'MarketProductPreview',
            component:MarketProductPreview
          },{// 淘货商品修改
            path:'/index/market/marketProduct/product-modify',
            name:'MarketProductModify',
            component:MarketProductModify
          }]
        },{  // 淘货订单
          path:'/index/market/marketOrder/market-order',
          name:'MarketOrder',
          component:MarketOrder,
          children:[{// 淘货商品数据
            path:'/index/market/marketOrder/order-data',
            name:'MarketOrderData',
            component:MarketOrderData
          },{// 新订单查询
            path:'/index/market/marketOrder/new-order',
            name:'MarketNewOrder',
            component:MarketNewOrder
          },{// 退款订单
            path:'/index/market/marketOrder/refund-order',
            name:'MarketRefundOrder',
            component:MarketRefundOrder
          },{// 到货订单
            path:'/index/market/marketOrder/arrival-order',
            name:'MarketArrivalOrder',
            component:MarketArrivalOrder
          },{// 支付情况
            path:'/index/market/marketOrder/payment-situation',
            name:'MarketPaymentSituation',
            component:MarketPaymentSituation
          }]
        },{  // 淘货销售情况
          path:'/index/market/marketSales/market-sales',
          name:'MarketSales',
          component:MarketSales,
          children:[{// 销售数据
            path:'/index/market/marketSales/sales-data',
            name:'MarketSalesData',
            component:MarketSalesData
          },{// 用户评论
            path:'/index/market/marketSales/user-comment',
            name:'MarketUserComment',
            component:MarketUserComment
          },{// 板块销售情况
            path:'/index/market/marketSales/sector-sales',
            name:'MarketSectorSales',
            component:MarketSectorSales
          },{// 用户群体数据
            path:'/index/market/marketSales/user-group',
            name:'MarketUserGroup',
            component:MarketUserGroup
          }]
        }]
      },{  // 功能控制
        path:'/index/functionControl',
        name:'FunctionControl',
        component:FunctionControl,
        children:[{// 板块标题管理
          path: '/index/functionControl/plateTitleManagement/plate-title-management',
          name: 'PlateTitleManagement',
          component: PlateTitleManagement,
          children: [{// 视频标题
            path: '/index/functionControl/plateTitleManagement/video-title',
            name: 'VideoTitle',
            component: VideoTitle
          },{// 文章标题
            path: '/index/functionControl/plateTitleManagement/article-title',
            name: 'ArticleTitle',
            component: ArticleTitle
          },{// 标题数据
            path: '/index/functionControl/plateTitleManagement/title-data',
            name: 'TitleData',
            component: TitleData
          }]
        },{  // 专业目录
          path: '/index/functionControl/professionalCatalog/professional-catalog',
          name: 'professionalCatalog',
          component: professionalCatalog,
          children: [{// 添加目录
            path: '/index/functionControl/professionalCatalog/add-directory',
            name: 'AddDirectory',
            component: AddDirectory
          },{// 目录管理
            path: '/index/functionControl/professionalCatalog/directory-management',
            name: 'DirectoryManagement',
            component: DirectoryManagement
          },{// 近义词管理
            path: '/index/functionControl/professionalCatalog/synonym-management',
            name: 'SynonymManagement',
            component: SynonymManagement
          }]
        },{  // 头部消息管理
          path: '/index/functionControl/messagesManagement/messages-management',
          name: 'MessagesManagement',
          component: MessagesManagement,
          children: [{// 消息提示
            path: '/index/functionControl/messagesManagement/messages-prompt',
            name: 'MessagesPrompt',
            component: MessagesPrompt
          },{// 消息提示类别创建
            path: '/index/functionControl/messagesManagement/category-creation',
            name: 'CategoryCreation',
            component: CategoryCreation
          }]
        },{  // 弹窗内容管理
          path: '/index/functionControl/messageBox/message-box',
          name: 'MessageBox',
          component: MessageBox,
          children: [{// 弹窗内容管理
            path: '/index/functionControl/messageBox/message-content-management',
            name: 'messageContentManagement',
            component: MessageContentManagement
          },{// 弹窗内容
            path: '/index/functionControl/messageBox/message-content',
            name: 'messageContent',
            component: MessageContent
          }]
        },{  // 收支管理
          path: '/index/functionControl/incomeControl/income-control',
          name: 'IncomeControl',
          component: IncomeControl,
          children: [{// 用户收支管理
            path: '/index/functionControl/incomeControl/user-income-prompt',
            name: 'UserIncomePrompt',
            component: UserIncomePrompt
          },{// 商家收支管理
            path: '/index/functionControl/incomeControl/merchant-revenue-tips',
            name: 'MerchantRevenueTips',
            component: MerchantRevenueTips
          },{// 类别管理
            path: '/index/functionControl/incomeControl/category-management',
            name: 'CategoryManagement',
            component: CategoryManagement
          }]
        },{  // 商城菜单管理
          path: '/index/functionControl/mallManagement/mall-management',
          name: 'MallManagement',
          component: MallManagement,
          children: [{// 目录管理
            path: '/index/functionControl/mallManagement/directory-management',
            name: 'MallDirectoryManagement',
            component: MallDirectoryManagement
          },{// 产品目录分配
            path: '/index/functionControl/mallManagement/product-catalog-assignment',
            name: 'ProductCatalogAssignment',
            component: ProductCatalogAssignment
          },{// 新增产品类型
            path: '/index/functionControl/mallManagement/new-product-type',
            name: 'NewProductType',
            component: NewProductType
          },{// 修改产品类型
            path: '/index/functionControl/mallManagement/modify-product-type',
            name: 'ModifyProductType',
            component: ModifyProductType
          },{// 产品类型列表
            path: '/index/functionControl/mallManagement/product-type-list',
            name: 'ProductTypeList',
            component: ProductTypeList
          },{// 删除产品类型
            path: '/index/functionControl/mallManagement/delete-product-type',
            name: 'DeleteProductType',
            component: DeleteProductType
          },{// 选择框名称
            path: '/index/functionControl/mallManagement/selectbox-name',
            name:'SelectboxName',
            component: SelectboxName
          },{// 数字区间属性名称
            path: '/index/functionControl/mallManagement/attribute-name',
            name: 'AttributeName',
            component: AttributeName
          },{// 定义数字区间属性
            path: '/index/functionControl/mallManagement/defining-attributes',
            name: 'DefiningAttributes',
            component: DefiningAttributes
          },{// 适用车型管理
            path: '/index/functionControl/mallManagement/model-management',
            name: 'ModelManagement',
            component: ModelManagement
          },{// 车辆管理列表
            path: '/index/functionControl/mallManagement/vehicle-management',
            name: 'VehicleManagement',
            component: VehicleManagement
          },{// 车辆添加
            path: '/index/functionControl/mallManagement/add-vehicle',
            name: 'AddVehicle',
            component: AddVehicle
          }]
        }]
      },{ //用户行为分析数据
        path:'/index/data-gather',
        name:'DataGather',
        component:DataGather,
        children:[{ //头部消息提示
          path:'/index/dataGather/header-message-prompt',
          name:'HeaderMessagePrompt',
          component:HeaderMessagePrompt
        },{ //访问记录
          path:'/index/dataGather/access-record',
          name:'AccessRecord',
          component:AccessRecord
        },{  //搜索记录
          path:'/index/dataGather/search-record',
          name:'SearchRecord',
          component:SearchRecord
        },{ //搜索排行
          path:'/index/dataGather/search-ranking',
          name:'SearchRanking',
          component:SearchRanking
        }]
      },{ // 商家管理
        path:'/index/business-user',
        name:'BusinessUser',
        component:BusinessUser,
        children:[{ // 商家账户
          path:'/index/businessUser/businessAccount/business-account',
          name:'BusinessAccount',
          component:BusinessAccount,
          children:[{  // 商家资质审核
            path:'/index/businessUser/businessAccount/business-review',
            name:'BusinessReview',
            component:BusinessReview,
          },{ // 权限管理
            path:'/index/businessUser/businessAccount/authority-management',
            name:'AuthorityManagement',
            component:AuthorityManagement
          },{  // 禁用商家
            path:'/index/businessUser/businessAccount/disable-business',
            name:'DisableBusiness',
            component:DisableBusiness
          },{ // 商家账号管理
            path:'/index/businessUser/businessAccount/business-management',
            name:'BusinessManagement',
            component:BusinessManagement
          }]
        },{  // 商家数据
          path:'/index/businessUser/merchantData/merchant-data',
          name:'MerchantData',
          component:MerchantData,
          children:[{  // 用户生态
            path:'/index/businessUser/merchantData/user-ecology',
            name:'MerchantUserEcology',
            component:MerchantUserEcology,
          },{  // 商家对话
            path:'/index/businessUser/merchantData/merchant-conversation',
            name:'MerchantConversation',
            component:MerchantConversation,
          },{  // 商家的关注者
            path:'/index/businessUser/merchantData/merchant-fan',
            name:'MerchantFan',
            component:MerchantFan,
          },{  // 商家收入流水
            path:'/index/businessUser/merchantData/business-income',
            name:'BusinessIncome',
            component:BusinessIncome,
          }]
        }]
      }, { // 用户管理
        path: '/index/standard-user',
        name: 'StandardUser',
        component: StandardUser,
        children: [{ // 用户账户
          path: '/index/standardUser/userManagement/user-management',
          name: 'UserManagement',
          component: UserManagement,
          children: [{  // 用户举报
            path: '/index/standardUser/userManagement/user-report',
            name: 'UserReport',
            component: UserReport,
          },{  // 用户状态
            path: '/index/standardUser/userManagement/user-status',
            name: 'UserStatus',
            component: UserStatus,
          },{  // 用户数量
            path: '/index/standardUser/userManagement/user-amount',
            name: 'UserAmount',
            component: UserAmount,
          },{  // 用户活跃度
            path: '/index/standardUser/userManagement/user-activity',
            name: 'UserActivity',
            component: UserActivity,
          },{  // 用户账号管理
            path: '/index/standardUser/userManagement/user-account-management',
            name: 'UserAccountManagement',
            component: UserAccountManagement,
          },{  // 用户绑定管理
            path: '/index/standardUser/userManagement/user-binding-management',
            name: 'UserBindingManagement',
            component: UserBindingManagement,
          }]
        }, { // 用户数据
          path: '/index/standardUser/userData/user-data',
          name: 'UserData',
          component: UserData,
          children: [{  // 用户生态
            path: '/index/standardUser/userData/user-ecology',
            name: 'UserEcology',
            component: UserEcology,
          },{  // 用户对话历史
            path: '/index/standardUser/userData/user-conversation-history',
            name: 'UserConversationHistory',
            component: UserConversationHistory,
          },{  // 用户关注
            path: '/index/standardUser/userData/user-attention',
            name: 'UserAttention',
            component: UserAttention,
          },{  // 用户收支流水
            path: '/index/standardUser/userData/user-income',
            name: 'UserIncome',
            component: UserIncome,
          },{  // 用户历史记录
            path: '/index/standardUser/userData/user-history',
            name: 'UserHistory',
            component: UserHistory,
          }]
        }]
      },{  // 现金管理
        path: '/index/cash-management',
        name: 'CashManagement',
        component: CashManagement,
        children: [{  // 用户管理
          path: '/index/cashManagement/userManagement/user-withdrawal',
          name: 'UserWithdrawal',
          component: UserWithdrawal,
          children: [{  // 用户提现记录
            path: '/index/cashManagement/userManagement/cash-withdrawal-record',
            name: 'CashWithdrawalRecord',
            component: CashWithdrawalRecord,
          },{  // 提现操作 (待定)
            path: '/index/cashManagement/userManagement/cash-withdrawal-operation',
            name: 'CashWithdrawalOperation',
            component: CashWithdrawalOperation,
          }]
        },{  // 商家管理
          path: '/index/cashManagement/businessWithdraw/business-withdraw',
          name: 'BusinessWithdraw',
          component: BusinessWithdraw,
          children: [{  // 商家提现记录
            path: '/index/cashManagement/businessWithdraw/business-record',
            name: 'BusinessRecord',
            component: BusinessRecord,
          },{  // 商家提现申请操作 (待定)
            path: '/index/cashManagement/businessWithdraw/application-operation',
            name: 'ApplicationOperation',
            component: ApplicationOperation,
          },{  // 商家提现审核 (待定)
            path: '/index/cashManagement/businessWithdraw/withdrawal-review',
            name: 'WithdrawalReview',
            component: WithdrawalReview,
          },{  // 提现密码修改
            path: '/index/cashManagement/businessWithdraw/change-password',
            name: 'BusinessChangePassword',
            component: BusinessChangePassword,
          }]
        },{  // 系统账户
          path: '/index/cashManagement/systemFinance/system-finance',
          name: 'SystemFinance',
          component: SystemFinance,
          children: [{  // 支付宝账户
            path: '/index/cashManagement/systemFinance/alipay-account',
            name: 'AlipayAccount',
            component: AlipayAccount,
          },{  // 微信账户
            path: '/index/cashManagement/systemFinance/weChat-account',
            name: 'WeChatAccount',
            component: WeChatAccount,
          },{  // 账户事件 (待定)
            path: '/index/cashManagement/systemFinance/account-event',
            name: 'AccountEvent',
            component: AccountEvent,
          }]
        }]
      },{  // 酷圈
        path: '/index/cool-circle',
        name: 'CoolCircle',
        component: CoolCircle,
        children: [{  // 酷圈管理
          path: '/index/coolCircle/cool-circle-management',
          name: 'CoolCircleManagement',
          component: CoolCircleManagement,
        },{  // 酷圈评论管理
          path: '/index/coolCircle/cool-circle-review-management',
          name: 'CoolCircleReviewManagement',
          component: CoolCircleReviewManagement,
        }]
      }
    ]}
  ]
})
