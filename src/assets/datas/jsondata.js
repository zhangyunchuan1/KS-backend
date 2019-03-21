export default {
  menus: [{
    id: 1000,
    title: '主页',
    urls: '/index/home',
    icons: 'icon-home',
    children: [
      {
        id: 1001,
        title: '大数据统计',
        urls: '/index/home',
        icons: 'icon-shouye',
      },
      // {
    //   id: 1002,
    //   title: '上传',
    //   urls: '/index/test',
    //   icons: 'icon-shouye',
    //   children: [{
    //     id: 10021,
    //     title: '上传1',
    //     urls: '/index/test1',
    //     icons: 'icon-shouye',
    //   },{
    //     id: 10022,
    //     title: '上传2',
    //     urls: '/index/test2',
    //     icons: 'icon-shouye',
    //   }]
    // }
  ]
  }, {
    id: 2000,
    title: '菜单分类管理',
    urls: '/index/system',
    icons: 'icon-setting',
    children: [{
      id: 2001,
      title: '菜单管理',
      urls: '/index/system/menu',
      icons: 'icon-shouye',
    },
    // {
    //   id: 2002,
    //   title: '菜单列表',
    //   urls: '/index/system/menu-jurisdiction',
    //   icons: 'icon-shouye',
    // }
  ]
  }, {
    id: 3000,
    title: '内部管理',
    urls: '/index/inside',
    icons: 'icon-geren',
    children: [{
      id: 3001,
      title: '权限管理',
      urls: '/index/inside/jurisdiction',
      icons: 'icon-shouye',
    },{
      id: 3002,
      title: '角色管理',
      urls: '/index/inside/role',
      icons: 'icon-shouye',
    },{
      id: 3003,
      title: '用户管理',
      urls: '/index/inside/user',
      icons: 'icon-shouye',
    },{
      id: 3004,
      title: '部门管理',
      urls: '/index/inside/department',
      icons: 'icon-shouye',
    },{
      id: 3005,
      title: '职位管理',
      urls: '/index/inside/job',
      icons: 'icon-shouye',
    }]
  }, {
    id: 4000,
    title: '活动',
    urls: '/index/activity',
    icons: 'icon-fenlei',
    children: [{
      id: 4001,
      title: '活动数据',
      urls: '/index/activity/data',
      icons: 'icon-fenlei',
    },{
      id: 4002,
      title: '活动申请',
      urls: '/index/activity/apply',
      icons: 'icon-fenlei',
    },{
      id: 4003,
      title: '活动审批',
      urls: '/index/activity/examine-approve',
      icons: 'icon-fenlei',
    },{
      id: 4004,
      title: '活动状态',
      urls: '/index/activity/timed-active-state',
      icons: 'icon-fenlei',
    }
    // ,{
    //   id: 4005,
    //   title: '长期活动状态',
    //   urls: '/index/activity/long-term-activity',
    //   icons: 'icon-fenlei',
    // }
    ,{
      id: 4005,
      title: '票务管理',
      urls: '/index/activity/ticket-management',
      icons: 'icon-fenlei',
    },
    // {
    //   id: 4006,
    //   title: '查看报名',
    //   urls: '/index/activity/activity-seeSignUp',
    //   icons: 'icon-fenlei',
    // }
    {
      id: 4007,
      title: '活动被修改',
      urls: '/index/activity/activity-modify',
      icons: 'icon-fenlei',
    },{
      id: 4008,
      title: '评价',
      urls: '/index/activity/activity-evaluate',
      icons: 'icon-fenlei',
    },{
      id: 4009,
      title: '置顶活动',
      urls: '/index/activity/topping-activity',
      icons: 'icon-fenlei',
    }]
  },{
    id:5000,
    title:'页面',
    urls: '/index/page',
    icons: 'icon-faxian',
    children:[{
      id: 5001,
      title: '网页管理',
      urls: '/index/page/pageManagement/page-management',
      icons: 'icon-menu',
      children:[{
        id: 5011,
        title: '上传菜单',
        urls: '/index/page/pageManagement/uploadMenu/upload-menu',
        icons: 'icon-menu',
        children:[{
          id: 5111,
          title: '版块管理',
          urls: '/index/page/pageManagement/uploadMenu/page-plate-management',
          icons: 'icon-menu',
        },{
          id: 5112,
          title: '上传百科',
          urls: '/index/page/pageManagement/uploadMenu/page-upload-encyclopedias',
          icons: 'icon-menu',
        },{
          id: 5113,
          title: '上传服务',
          urls: '/index/page/pageManagement/uploadMenu/page-upload-service',
          icons: 'icon-menu',
        },{
          id: 5114,
          title: '上传活动',
          urls: '/index/page/pageManagement/uploadMenu/page-upload-activity',
          icons: 'icon-menu',
        },{
          id: 5115,
          title: '上传问题',
          urls: '/index/page/pageManagement/uploadMenu/page-upload-problem',
          icons: 'icon-menu',
        },{
          id: 5116,
          title: '上传淘货',
          urls: '/index/page/pageManagement/uploadMenu/page-upload-market',
          icons: 'icon-menu',
        },{
          id: 5117,
          title: '上传商品',
          urls: '/index/page/pageManagement/uploadMenu/page-upload-mall',
          icons: 'icon-menu',
        }]
      },{
        id: 5021,
        title: '审核失败类别管理',
        urls: '/index/page/pageManagement/auditManagement/audit-management',
        icons: 'icon-menu',
        children: [{
          id: 5121,
          title: '评论审核管理',
          urls: '/index/page/pageManagement/auditManagement/comment-audit-management',
          icons: 'icon-menu',
        },{
          id: 5122,
          title: '回复审核管理',
          urls: '/index/page/pageManagement/auditManagement/reply-audit-management',
          icons: 'icon-menu',
        },{
          id: 5123,
          title: '后台客服屏蔽',
          urls: '/index/page/pageManagement/auditManagement/backstage-service-shielding',
          icons: 'icon-menu',
        },{
          id: 5124,
          title: '用户审核管理',
          urls: '/index/page/pageManagement/auditManagement/user-audit-management',
          icons: 'icon-menu',
        },{
          id: 5125,
          title: '举报审核',
          urls: '/index/page/pageManagement/auditManagement/report-audit',
          icons: 'icon-menu',
        },{
          id: 5126,
          title: '视频问题百科驳回理由',
          urls: '/index/page/pageManagement/auditManagement/rejection-reason',
          icons: 'icon-menu',
        },{
          id: 5127,
          title: '商家管理',
          urls: '/index/page/pageManagement/auditManagement/merchant-management',
          icons: 'icon-menu',
        },{
          id: 5128,
          title: '活动服务驳回类别',
          urls: '/index/page/pageManagement/auditManagement/rejection-category',
          icons: 'icon-menu',
        }]
      },{
        id: 5031,
        title: '上传协议管理',
        urls: '/index/page/pageManagement/uploadProtocolManagement/upload-protocol-management',
        icons: 'icon-menu',
      },{
        id: 5041,
        title: '上传提示',
        urls: '/index/page/pageManagement/uploadPrompt/upload-prompt',
        icons: 'icon-menu',
        children: [{
          id: 5141,
          title: '上传商品提示',
          urls: '/index/page/pageManagement/uploadPrompt/upload-product-prompt',
          icons: 'icon-menu',
        },{
          id: 5142,
          title: '上传服务',
          urls: '/index/page/pageManagement/uploadPrompt/upload-service',
          icons: 'icon-menu',
        },{
          id: 5143,
          title: '上传活动',
          urls: '/index/page/pageManagement/uploadPrompt/upload-activity',
          icons: 'icon-menu',
        },{
          id: 5144,
          title: '上传百科',
          urls: '/index/page/pageManagement/uploadPrompt/upload-encyclopedia',
          icons: 'icon-menu',
        },{
          id: 5145,
          title: '上传文章',
          urls: '/index/page/pageManagement/uploadPrompt/upload-article',
          icons: 'icon-menu',
        },{
          id: 5146,
          title: '提出问题',
          urls: '/index/page/pageManagement/uploadPrompt/submit-questions',
          icons: 'icon-menu',
        }]
      }
      // ,
      // {
      //   id: 5051,
      //   title: '百科问题分类页管理',
      //   urls: '/index/page/pageManagement/classificationPageManagement/classification-page-management',
      //   icons: 'icon-menu',
      // }
    ]
    },{
      id: 5002,
      title: '敏感词管理',
      urls: '/index/page/sensitiveWords/sensitive-words',
      icons: 'icon-menu',
      children: [{
        id: 5201,
        title: '词汇管理',
        urls: '/index/page/sensitiveWords/words-management',
        icons: 'icon-menu',
      },{
        id: 5202,
        title: '类型管理',
        urls: '/index/page/sensitiveWords/type-management',
        icons: 'icon-menu',
      }]
    },{
      id: 5003,
      title: '售后权益',
      urls: '/index/page/buyerRights/buyer-rights',
      icons: 'icon-menu',
      children: [{
        id: 5301,
        title: '权益',
        urls: '/index/page/buyerRights/rights',
        icons: 'icon-menu',
      }]
    },{
      id: 5004,
      title: '商家页面提示',
      urls: '/index/page/businessCentre/business-centre',
      icons: 'icon-menu',
    }]
  },{
    id: 6000,
    title: '外部管理',
    urls: '/index/external',
    icons: 'icon-shop',
    children: [
    //   {
    //   id: 6001,
    //   title: '菜单创建',
    //   urls: '/index/external/menu',
    //   icons: 'icon-fenlei'
    // },
    {
      id: 6002,
      title: '页面权限分配',
      urls: '/index/external/jurisdiction',
      icons: 'icon-fenlei'
    },{
      id: 6003,
      title: '页面权限管理',
      urls: '/index/external/business-jurisdiction',
      icons: 'icon-fenlei'
    }]
  },{
    id: 7000,
    title: '文章管理',
    urls: '/index/article',
    icons: 'icon-wenzhang',
    children: [{
      id: 7001,
      title: '文章状态',
      urls: '/index/article/status',
      icons: 'icon-fenlei'
    },{
      id: 7002,
      title: '文章管理',
      urls: '/index/article/article-management',
      icons: 'icon-fenlei'
    },
    // {
    //   id: 7003,
    //   title: '文章修改',
    //   urls: '/index/article/article-modify',
    //   icons: 'icon-fenlei'
    // },
    {
      id: 7004,
      title: '评论管理',
      urls: '/index/article/comment',
      icons: 'icon-fenlei'
    },
    {
      id: 7005,
      title: '回复管理',
      urls: '/index/article/article-reply',
      icons: 'icon-fenlei'
    },
    {
      id: 7006,
      title: '文章浏览量统计',
      urls: '/index/article/article-pageview',
      icons: 'icon-fenlei'
    },{
      id: 7007,
      title: '最佳作者',
      urls: '/index/article/article-best-author',
      icons: 'icon-fenlei'
    },{
      id:7008,
      title:'优文分享',
      urls:'/index/article/live-sharing',
      icons:'icon-menu'
    },{
      id:7009,
      title:'文章小标题分配',
      urls:'/index/article/article-tags',
      icons:'icon-menu'
    }]
  },{
    id: 8000,
    title: '招聘',
    urls: '/index/recruit',
    icons: 'icon-zhaopin',
    children: [{
      id: 8001,
      title: '职位管理',
      urls: '/index/recruit/recruit-job-management',
      icons: 'icon-fenlei'
    },{
      id: 8002,
      title: '社会招聘',
      urls: '/index/recruit/recruit-social-recruitment',
      icons: 'icon-fenlei'
    },
    // {
    //   id: 8003,
    //   title: '校园招聘',
    //   urls: '/index/recruit/recruit-campus-recruitment',
    //   icons: 'icon-fenlei'
    // }
  ]
  },{
    id: 9000,
    title: '服务',
    urls: '/index/service',
    icons: 'icon-fuwu',
    children:[{
      id: 9001,
      title: '服务数据',
      urls: '/index/service/service-data',
      icons: 'icon-fenlei'
    },{
      id: 9002,
      title: '新服务申请',
      urls: '/index/service/service-application',
      icons: 'icon-fenlei'
      },{
      id: 9003,
      title: '服务审批',
      urls: '/index/service/service-approval',
      icons: 'icon-fenlei'
    },{
      id: 9004,
      title: '服务状态',
      urls: '/index/service/service-status',
      icons: 'icon-fenlei'
    },{
      id: 9005,
      title: '评价',
      urls: '/index/service/service-evaluation',
      icons: 'icon-fenlei'
    }]
  },{
    id: 10000,
    title: '问题',
    urls: '/index/question',
    icons: 'icon-wenti',
    children: [{
      id: 10001,
      title: '问题状态',
      urls: '/index/question/question-data',
      icons: 'icon-fenlei'
    },{
      id: 10002,
      title: '问题管理',
      urls: '/index/question/question-management',
      icons: 'icon-fenlei'
    },{
      id: 10004,
      title: '专业目录分配',
      urls: '/index/question/question-distribution',
      icons: 'icon-fenlei'
    },{
      id: 10005,
      title: '目录分配情况',
      urls: '/index/question/question-contents',
      icons: 'icon-fenlei'
    },{
      id: 10006,
      title: '回答管理',
      urls: '/index/question/answer-management',
      icons: 'icon-fenlei'
    },{
      id: 10007,
      title: '评论管理',
      urls: '/index/question/comment-management',
      icons: 'icon-fenlei'
    },
    // {
    //   id: 10008,
    //   title: '回复管理',
    //   urls: '/index/question/reply-management',
    //   icons: 'icon-fenlei'
    // }
  ]
  },{
    id:11000,
    title:'企业合作',
    urls:'/index/business',
    icons:'icon-hezuo',
    children:[
      {
        id:11001,
        title:'企业关系',
        urls:'/index/business/business-connection',
        icons:'icon-fenlei'
      }
    ]
  },{
    id:12000,
    title:'提出意见',
    urls:'/index/feedback',
    icons:'icon-yijian',
    children:[
      {
        id:12001,
        title:'意见反馈',
        urls:'/index/feedback/feedback-opinion',
        icons:'icon-fenlei'
      },
      {
        id:12002,
        title:'意见反馈类型',
        urls:'/index/feedback/feedback-opinion-type',
        icons:'icon-fenlei'
      },
      {
        id:12003,
        title:'邮件模板管理',
        urls:'/index/feedback/feedback-mail-management',
        icons:'icon-fenlei'
      }
    ]
  },{
    id:13000,
    title:'视频',
    urls:'/index/video',
    icons:'icon-shipin',
    children:[{
      id:13001,
      title:'视频状态',
      urls:'/index/video/video-data',
      icons:'icon-fenlei'
      },{
      id:13002,
      title:'视频管理',
      urls:'/index/video/video-management',
      icons:'icon-fenlei'
    },{
      id:13003,
      title:'视频修改',
      urls:'/index/video/video-modify',
      icons:'icon-fenlei'
    },{
      id:13004,
      title:'专业目录分配',
      urls:'/index/video/video-distribution',
      icons:'icon-fenlei'
    },{
      id:13005,
      title:'目录分配情况',
      urls:'/index/video/video-contents',
      icons:'icon-fenlei'
    },{
      id:13006,
      title:'评论管理',
      urls:'/index/video/video-comment',
      icons:'icon-fenlei'
    },{
      id:13007,
      title:'回复管理',
      urls:'/index/video/video-reply',
      icons:'icon-fenlei'
    },{
      id: 13009,
      title: '视频调查',
      urls: '/index/video/video-survey',
      icons: 'icon-fenlei'
    },{
      id: 13010,
      title: '用户排名',
      urls: '/index/video/video-ranking',
      icons: 'icon-fenlei'
    },{
      id: 13011,
      title: '视频小标题分配',
      urls: '/index/video/video-tags',
      icons: 'icon-fenlei'
    },{
      id: 13012,
      title: '视频零件或软件',
      urls: '/index/video/video-software',
      icons: 'icon-fenlei'
    },{
      id:13013,
      title:'直播分享',
      urls:'/index/video/live-sharing',
      icons:'icon-menu'
    }]
  },{
      id:14000,
      title:'百科',
      urls:'/index/encyclopedia',
      icons:'icon-baike',
      children:[{
          id:14001,
          title:'百科数据',
          urls:'/index/encyclopedia/encyclopedia-data',
          icons:'icon-menu'
      },{
          id:14002,
          title:'百科管理',
          urls:'/index/encyclopedia/encyclopedia-management',
          icons:'icon-menu'
      },{
          id:14003,
          title:'百科修改',
          urls:'/index/encyclopedia/encyclopedia-modify',
          icons:'icon-fenlei'
      },{
        id:14004,
        title:'专业目录分配',
        urls:'/index/encyclopedia/encyclopedia-distribution',
        icons:'icon-menu'
      },{
        id:14005,
        title:'目录分配情况',
        urls:'/index/encyclopedia/encyclopedia-contents',
        icons:'icon-menu'
      },{
        id:14006,
        title:'百科数据调查',
        urls:'/index/encyclopedia/encyclopedia-survey',
        icons:'icon-menu'
      },{
        id:14007,
        title:'用户排名',
        urls:'/index/encyclopedia/encyclopedia-ranking',
        icons:'icon-menu'
      },{
        id:14008,
        title:'他人编辑',
        urls:'/index/encyclopedia/others-edit',
        icons:'icon-menu'
      }]
  },{
    id:15000,
    title:'商城',
    urls:'/index/mall',
    icons:'icon-shangcheng',
    children:[{
      id:15001,
      title:'商城商品',
      urls:'/index/mall/mallProduct/mall-product',
      icons:'icon-menu',
      children:[{
        id:15101,
        title:'商品数据',
        urls:'/index/mall/mallProduct/mall-data',
        icons:'icon-menu',
      },{
        id:15102,
        title:'商品审核',
        urls:'/index/mall/mallProduct/mall-review',
        icons:'icon-menu',
      },
      // {
      //   id:15103,
      //   title:'商品预览',
      //   urls:'/index/mall/mallProduct/product-preview',
      //   icons:'icon-menu',
      // },{
      //   id:15104,
      //   title:'商品修改',
      //   urls:'/index/mall/mallProduct/product-modify',
      //   icons:'icon-menu',
      // },
      {
        id:15105,
        title:'专业目录分配',
        urls:'/index/mall/mallProduct/mall-distribution',
        icons:'icon-menu',
      },{
        id:15106,
        title:'专业目录分配情况',
        urls:'/index/mall/mallProduct/mall-contents',
        icons:'icon-menu',
      },{
        id:15107,
        title:'厂商统计',
        urls:'/index/mall/mallProduct/vendor-statistics',
        icons:'icon-menu',
      }]
    },{
      id:15002,
      title:'商城订单',
      urls:'/index/mall/mallOrder/mall-order',
      icons:'icon-menu',
      children:[{
        id:15201,
        title:'商城订单数据',
        urls:'/index/mall/mallOrder/mall-order-data',
        icons:'icon-menu',
      },{
        id:15202,
        title:'新订单查询',
        urls:'/index/mall/mallOrder/new-order-inquiry',
        icons:'icon-menu',
      },{
        id:15203,
        title:'退款订单',
        urls:'/index/mall/mallOrder/refund-order',
        icons:'icon-menu',
      },{
        id:15204,
        title:'到货订单',
        urls:'/index/mall/mallOrder/arrival-order',
        icons:'icon-menu',
      },{
        id:15205,
        title:'支付情况',
        urls:'/index/mall/mallOrder/payment-situation',
        icons:'icon-menu',
      },{
        id:15206,
        title:'销售情况',
        urls:'/index/mall/mallOrder/sales',
        icons:'icon-menu',
      },
      // {
      //   id:15207,
      //   title:'用户评价',
      //   urls:'/index/mall/mallOrder/mall-user-evaluation',
      //   icons:'icon-menu',
      // }
    ]
    },{
      id:15003,
      title:'客服',
      urls:'/index/mall/service/service',
      icons:'icon-menu',
      children:[{
        id:15301,
        title:'新信息',
        urls:'/index/mall/service/new-information',
        icons:'icon-menu',
      },{
        id:15302,
        title:'对话管理',
        urls:'/index/mall/service/dialogue-management',
        icons:'icon-menu',
      },{
        id:15303,
        title:'历史对话',
        urls:'/index/mall/service/historical-dialogue',
        icons:'icon-menu',
      },{
        id:15304,
        title:'新任务-所有',
        urls:'/index/mall/service/new-task-all',
        icons:'icon-menu',
      },{
        id:15305,
        title:'对话管理-主管',
        urls:'/index/mall/service/dialogue-management-supervisor',
        icons:'icon-menu',
      },{
        id:15306,
        title:'账号密码丢失',
        urls:'/index/mall/service/loss-processing',
        icons:'icon-menu',
      }]
    },{
      id:15004,
      title:'购物统计',
      urls:'/index/mall/shoppingStatistics/shopping-statistics',
      icons:'icon-menu',
      children:[{
        id: 15401,
        title: '购物车',
        urls: '/index/mall/shoppingStatistics/shopping-cart',
        icons: 'icon-menu',
      },{
        id: 15402,
        title: '购买转换率',
        urls: '/index/mall/shoppingStatistics/conversion-rate',
        icons: 'icon-menu',
      },{
        id: 15403,
        title: '结算',
        urls: '/index/mall/shoppingStatistics/settle-accounts',
        icons: 'icon-menu',
      },{
        id: 15404,
        title: '收货人信息',
        urls: '/index/mall/shoppingStatistics/recipient-information',
        icons: 'icon-menu',
      }]
    },{
      id:15005,
      title:'商城广告',
      urls:'/index/mall/mallAdvert/mall-advert',
      icons:'icon-menu',
      children:[{
        id: 15501,
        title: '头部广告',
        urls: '/index/mall/mallAdvert/header-advert',
        icons: 'icon-menu',
      },{
        id: 15502,
        title: '中部广告',
        urls: '/index/mall/mallAdvert/content-advert',
        icons: 'icon-menu',
      }]
    },{
        id:15006,
        title:'销售情况',
        urls:'/index.mall/mallStatus/mall-status',
        icons:'icon-menu',
        children:[{
            id:15601,
            title:'销售数据',
            urls:'/index/mall/mallStatus/mall-data',
            icons:'icon-menu'
        },{
            id:15602,
            title:'用户评论',
            urls:'/index/mall/mallStatus/user-comment',
            icons:'icon-menu'
        },{
            id:15603,
            title:'板块销售情况',
            urls:'/index/mall/mallStatus/sector-sales',
            icons:'icon-menu'
        },{
            id:15604,
            title:'用户群体数据',
            urls:'/index/mall/mallStatus/user-group',
            icons:'icon-menu'
        }]
    }]
  },{
    id:16000,
    title:'淘货',
    urls:'/index/mall',
    icons:'icon-taohuo',
    children:[{
      id:16001,
      title:'淘货商品',
      urls:'/index/market/marketProduct/market-product',
      icons:'icon-menu',
      children:[{
        id:16101,
        title:'淘货商品数据',
        urls:'/index/market/marketProduct/product-data',
        icons:'icon-menu',
      },{
        id:16102,
        title:'淘货商品审核',
        urls:'/index/market/marketProduct/product-review',
        icons:'icon-menu',
      },
      // {
      //   id:16103,
      //   title:'淘货商品预览',
      //   urls:'/index/market/marketProduct/product-preview',
      //   icons:'icon-menu',
      // },{
      //   id:16104,
      //   title:'淘货商品修改',
      //   urls:'/index/market/marketProduct/product-modify',
      //   icons:'icon-menu',
      // }
    ]
    },{
      id:16002,
      title:'淘货订单',
      urls:'/index/market/marketOrder/market-order',
      icons:'icon-menu',
      children:[{
        id:16201,
        title:'淘货订单数据',
        urls:'/index/market/marketOrder/order-data',
        icons:'icon-menu',
      },{
        id:16202,
        title:'新订单查询',
        urls:'/index/market/marketOrder/new-order',
        icons:'icon-menu',
      },{
        id:16203,
        title:'退款订单',
        urls:'/index/market/marketOrder/refund-order',
        icons:'icon-menu',
      },{
        id:16204,
        title:'到货订单',
        urls:'/index/market/marketOrder/arrival-order',
        icons:'icon-menu',
      },{
        id:16205,
        title:'支付情况',
        urls:'/index/market/marketOrder/payment-situation',
        icons:'icon-menu',
      }]
    },{
      id:16003,
      title:'销售情况',
      urls:'/index/market/marketSales/market-sales',
      icons:'icon-menu',
      children:[{
        id:16301,
        title:'销售数据',
        urls:'/index/market/marketSales/sales-data',
        icons:'icon-menu',
      },{
        id:16302,
        title:'用户评论',
        urls:'/index/market/marketSales/user-comment',
        icons:'icon-menu',
      },{
        id:16303,
        title:'板块销售情况',
        urls:'/index/market/marketSales/sector-sales',
        icons:'icon-menu',
      },{
        id:16304,
        title:'用户群体数据',
        urls:'/index/market/marketSales/user-group',
        icons:'icon-menu',
      }]
    }]
  },{ 
    id:17000,
    title:'功能控制',
    urls:'/index/functionControl',
    icons:'icon-duogongnengkongzhixitong',
    children:[{
      id: 17001,
      title: '板块标题管理',
      urls: '/index/functionControl/plateTitleManagement/plate-title-management',
      icons: 'icon-menu',
      children: [{
        id: 17101,
        title: '视频标题',
        urls: '/index/functionControl/plateTitleManagement/video-title',
        icons: 'icon-menu',
      },{
        id: 17102,
        title: '文章标题',
        urls: '/index/functionControl/plateTitleManagement/article-title',
        icons: 'icon-menu',
      },{
        id: 17103,
        title: '标题数据',
        urls: '/index/functionControl/plateTitleManagement/title-data',
        icons: 'icon-menu',
      }]
    },{
      id: 17002,
      title: '专业目录',
      urls: '/index/functionControl/professionalCatalog/professional-catalog',
      icons: 'icon-menu',
      children: [{
        id: 17201,
        title: '添加目录',
        urls: '/index/functionControl/professionalCatalog/add-directory',
        icons: 'icon-menu',
      },{
        id: 17202,
        title: '目录管理',
        urls: '/index/functionControl/professionalCatalog/directory-management',
        icons: 'icon-menu',
      },{
        id: 17203,
        title: '近义词管理',
        urls: '/index/functionControl/professionalCatalog/synonym-management',
        icons: 'icon-menu',
      }]
    },{
      id: 17003,
      title: '头部信息提示管理',
      urls: '/index/functionControl/messagesManagement/messages-management',
      icons: 'icon-menu',
      children: [{
        id: 17301,
        title: '信息提示',
        urls: '/index/functionControl/messagesManagement/messages-prompt',
        icons: 'icon-menu',
      },{
        id: 17302,
        title: '信息提示类别创建',
        urls: '/index/functionControl/messagesManagement/category-creation',
        icons: 'icon-menu',
      }]
    },{
      id: 17004,
      title: '弹框内容管理',
      urls: '/index/functionControl/messageBox/messages-box',
      icons: 'icon-menu',
      children: [{
        id: 17401,
        title: '弹框内容管理',
        urls: '/index/functionControl/messageBox/message-content-management',
        icons: 'icon-menu',
      },{
        id: 17402,
        title: '弹框内容',
        urls: '/index/functionControl/messageBox/message-content',
        icons: 'icon-menu',
      }]
    },{
      id: 17005,
      title: '收支管理',
      urls: '/index/functionControl/incomeControl/income-control',
      icons: 'icon-menu',
      children: [{
        id: 17501,
        title: '用户收支管理',
        urls: '/index/functionControl/incomeControl/user-income-prompt',
        icons: 'icon-menu',
      },{
        id: 17502,
        title: '商户收支管理',
        urls: '/index/functionControl/incomeControl/merchant-revenue-tips',
        icons: 'icon-menu',
      },{
        id: 17503,
        title: '类别管理',
        urls: '/index/functionControl/incomeControl/category-management',
        icons: 'icon-menu',
      }]
    },{
      id: 17006,
      title: '商城菜单管理',
      urls: '/index/functionControl/mallManagement/mall-management',
      icons: 'icon-menu',
      children: [{
        id: 17601,
        title: '目录管理',
        urls: '/index/functionControl/mallManagement/directory-management',
        icons: 'icon-menu',
      },{
        id: 17602,
        title: '产品目录分配',
        urls: '/index/functionControl/mallManagement/product-catalog-assignment',
        icons: 'icon-menu',
      },{
        id: 17603,
        title: '新增产品类型',
        urls: '/index/functionControl/mallManagement/new-product-type',
        icons: 'icon-menu',
      },{
        id: 17604,
        title: '修改产品类型',
        urls: '/index/functionControl/mallManagement/modify-product-type',
        icons: 'icon-menu',
      },{
        id: 17605,
        title: '产品类型列表',
        urls: '/index/functionControl/mallManagement/product-type-list',
        icons: 'icon-menu',
      },{
        id: 17606,
        title: '删除产品类型',
        urls: '/index/functionControl/mallManagement/delete-product-type',
        icons: 'icon-menu',
      },{
        id: 17607,
        title: '选择框名称',
        urls: '/index/functionControl/mallManagement/selectbox-name',
        icons: 'icon-menu',
      },{
        id: 17608,
        title: '数字区间属性名称',
        urls: '/index/functionControl/mallManagement/attribute-name',
        icons: 'icon-menu',
      },{
        id: 17609,
        title: '定义数字区间属性',
        urls: '/index/functionControl/mallManagement/defining-attributes',
        icons: 'icon-menu',
      },{
        id: 17610,
        title: '适用车型管理',
        urls: '/index/functionControl/mallManagement/model-management',
        icons: 'icon-menu',
      },{
        id: 17611,
        title: '车辆管理列表',
        urls: '/index/functionControl/mallManagement/vehicle-management',
        icons: 'icon-menu',
      },{
        id: 17612,
        title: '车辆添加',
        urls: '/index/functionControl/mallManagement/add-vehicle',
        icons: 'icon-menu',
      },{
        id: 17613,
        title: '产品类型解释',
        urls: '/index/functionControl/mallManagement/product-type-explain',
        icons: 'icon-menu',
      },]
    }]
  },{
    id:18000,
    title:'用户行为分析',
    urls:'/index/data-gather',
    icons:'icon-fenxi',
    children:[
      // {
      //   id:18001,
      //   title:'头部消息提示',
      //   urls:'/index/dataGather/header-message-prompt',
      //   icons:'icon-menu'
      // },
      {
        id:18002,
        title:'访问记录',
        urls:'/index/dataGather/access-record',
        icons:'icon-menu'
      },{
        id:18003,
        title:'搜索记录',
        urls:'/index/dataGather/search-record',
        icons:'icon-menu'
      },{
        id:18004,
        title:'搜索排行',
        urls:'/index/dataGather/search-ranking',
        icons:'icon-menu'
      },{
        id:18005,
        title:'头部消息队列',
        urls:'/index/dataGather/header-message-queue',
        icons:'icon-menu'
      },{
        id:18006,
        title:'电量燃料统计',
        urls:'/index/dataGather/electric-fuel-statistics',
        icons:'icon-menu'
      },{
        id:18007,
        title:'关键词统计',
        urls:'/index/dataGather/keyword-statistics',
        icons:'icon-menu'
      },{
        id:18008,
        title:'点赞记录',
        urls:'/index/dataGather/praise-record',
        icons:'icon-menu'
      },{
        id:18009,
        title:'推荐词目录',
        urls:'/index/dataGather/rec-words-catalogue',
        icons:'icon-menu'
      }
    ]},{
    id:19000,
    title:'商家管理',
    urls:'/index/business-user',
    icons:'icon-shop',
    children:[{
      id:19001,
      title:'商家账户',
      urls:'/index/businessUser/businessAccount/business-account',
      icons:'icon-menu',
      children:[{
        id:19101,
        title:'商家资质审核',
        urls:'/index/businessUser/businessAccount/business-review',
        icons:'icon-menu',
      },{
        id:19102,
        title:'权限管理',
        urls:'/index/businessUser/businessAccount/authority-management',
        icons:'icon-menu'
      },{
        id:19103,
        title:'禁用商家',
        urls:'/index/businessUser/businessAccount/disable-business',
        icons:'icon-menu'
      },{
        id:19104,
        title:'商家账号管理',
        urls:'/index/businessUser/businessAccount/business-management',
        icons:'icon-menu'
      }]
    },{
      id:19002,
      title:'商家数据',
      urls:'/index/businessUser/merchantData/merchant-data',
      icons:'icon-menu',
      children:[{
        id:19201,
        title:'用户生态',
        urls:'/index/businessUser/merchantData/user-ecology',
        icons:'icon-menu',
      },{
        id:19202,
        title:'商家对话',
        urls:'/index/businessUser/merchantData/merchant-conversation',
        icons:'icon-menu',
      },{
        id:19203,
        title:'商家的关注者',
        urls:'/index/businessUser/merchantData/merchant-fan',
        icons:'icon-menu',
      },{
        id:19204,
        title:'商家收入流水',
        urls:'/index/businessUser/merchantData/business-income',
        icons:'icon-menu',
      }]
    }]
  },{
    id:20000,
    title:'用户管理',
    urls:'/index/standard-user',
    icons:'icon-yonghuguanli',
    children:[{
      id: 20001,
      title: '用户账户',
      urls: '/index/standardUser/userManagement/user-management',
      icons: 'icon-menu',
      children: [{
        id: 20101,
        title: '用户举报',
        urls: '/index/standardUser/userManagement/user-report',
        icons: 'icon-menu',
      },{
        id: 20102,
        title: '用户状态',
        urls: '/index/standardUser/userManagement/user-status',
        icons: 'icon-menu',
      },
      {
        id: 20103,
        title: '用户账号管理',
        urls: '/index/standardUser/userManagement/user-account-management',
        icons: 'icon-menu',
      },{
        id: 20104,
        title: '用户绑定管理',
        urls: '/index/standardUser/userManagement/user-binding-management',
        icons: 'icon-menu',
      }]
    },{
      id: 20002,
      title: '用户数据',
      urls: '/index/standardUser/userData/user-data',
      icons: 'icon-menu',
      children: [{
        id: 20201,
        title: '用户生态',
        urls: '/index/standardUser/userData/user-ecology',
        icons: 'icon-menu',
      },
      {
        id: 20202,
        title: '用户对话历史',
        urls: '/index/standardUser/userData/user-conversation-history',
        icons: 'icon-menu',
      },{
        id: 20203,
        title: '用户关注',
        urls: '/index/standardUser/userData/user-attention',
        icons: 'icon-menu',
      },{
        id: 20204,
        title: '用户收支流水',
        urls: '/index/standardUser/userData/user-income',
        icons: 'icon-menu',
      },{
        id: 20205,
        title: '用户历史记录',
        urls: '/index/standardUser/userData/user-history',
        icons: 'icon-menu',
      },
      {
        id: 20206,
        title: '用户数量',
        urls: '/index/standardUser/userManagement/user-amount',
        icons: 'icon-menu',
      },{
        id: 20207,
        title: '用户活跃度',
        urls: '/index/standardUser/userManagement/user-activity',
        icons: 'icon-menu',
      },{
        id: 20208,
        title: '用户登录统计',
        urls: '/index/standardUser/userManagement/user-login',
        icons: 'icon-menu',
      },]
    }]
  },{
    id:21000,
    title:'现金管理',
    urls:'/index/cash-management',
    icons:'icon-baoxiangui',
    children: [{
      id: 21001,
      title: '用户管理',
      urls: '/index/cashManagement/userManagement/user-withdrawal',
      icons: 'icon-menu',
      children: [{
        id: 21101,
        title: '用户提现记录',
        urls: '/index/cashManagement/userManagement/cash-withdrawal-record',
        icons: 'icon-menu',
      },{
        id: 21102,
        title: '(待定)提现操作',
        urls: '/index/cashManagement/userManagement/cash-withdrawal-operation',
        icons: 'icon-menu',
      }]
    },{
      id: 21002,
      title: '商家管理',
      urls: '/index/cashManagement/businessWithdraw/business-withdraw',
      icons: 'icon-menu',
      children: [{
        id: 21201,
        title: '商家提现记录',
        urls: '/index/cashManagement/businessWithdraw/business-record',
        icons: 'icon-menu',
      },{
        id: 21302,
        title: '(待定)商家提现申请操作',
        urls: '/index/cashManagement/businessWithdraw/application-operation',
        icons: 'icon-menu',
      },{
        id: 21403,
        title: '(待定)商家提现审核',
        urls: '/index/cashManagement/businessWithdraw/withdrawal-review',
        icons: 'icon-menu',
      },{
        id: 21504,
        title: '提现密码修改',
        urls: '/index/cashManagement/businessWithdraw/change-password',
        icons: 'icon-menu',
      }]
    },{
      id: 21003,
      title: '系统账户',
      urls: '/index/cashManagement/systemFinance/system-finance',
      icons: 'icon-menu',
      children: [{
        id: 21301,
        title: '支付宝账户',
        urls: '/index/cashManagement/systemFinance/alipay-account',
        icons: 'icon-menu',
      },{
        id: 21402,
        title: '微信账户',
        urls: '/index/cashManagement/systemFinance/weChat-account',
        icons: 'icon-menu',
      },{
        id: 21503,
        title: '(待定)账户事件',
        urls: '/index/cashManagement/systemFinance/account-event',
        icons: 'icon-menu',
      }]
    }]
  },{
    id:22000,
    title:'酷圈',
    urls:'/index/cool-circle',
    icons:'icon-qichequanzi',
    children: [{
      id:22001,
      title:'酷圈管理',
      urls:'/index/coolCircle/cool-circle-management',
      icons:'icon-baoxiangui',
    },{
      id:22002,
      title:'酷圈评论管理',
      urls:'/index/coolCircle/cool-circle-review-management',
      icons:'icon-baoxiangui',
    }]
  },{
    id:23000,
    title:'爬虫管理',
    urls:'/index/reptile',
    icons:'icon-qichequanzi',
    children: [{
      id:23101,
      title:'爬虫用户管理',
      urls:'/index/reptile/reptile-user',
      icons:'icon-baoxiangui',
    },{
      id:23201,
      title:'问题爬虫管理',
      urls:'/index/reptile/questionReprileMeanagement/questionReprile-meanagement',
      icons:'icon-menu',
      children:[{
          id:23202,
          title:'问题爬虫',
          urls:'/index/reptile/questionReprileMeanagement/question-reptile',
          icons:'icon-baoxiangui',
        },
        {
          id:23203,
          title:'回答爬虫',
          urls:'/index/reptile/questionReprileMeanagement/answer-reptile',
          icons:'icon-baoxiangui',
        },{
          id:23204,
          title:'数据分配',
          urls:'/index/reptile/questionReprileMeanagement/data-distribution',
          icons:'icon-baoxiangui',
        }]
    },{
      id:23301,
      title:'文章爬虫管理',
      urls:'/index/reptile/articleReptileMeanagement/articleReptile_meanagement',
      icons:'icon-menu',
      children:[{
          id:23302,
          title:'文章爬虫',
          urls:'/index/reptile/articleReptileMeanagement/article_reptile',
          icons:'icon-baoxiangui',
        },
        {
          id:23303,
          title:'数据分配',
          urls:'/index/reptile/articleReptileMeanagement/data_distribution',
          icons:'icon-baoxiangui',
        }]
    }]
  }]
}
