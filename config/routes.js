 export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: '欢迎页面',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                authority: ['admin'],
              },
            ],
          },
          {
            name: '列表展示',
            icon: 'table',
            path: '/list',
            component: './ListTableList',
          },
          {
            name: '应用管理',
            icon: 'ApartmentOutlined',
            path: '/server',
            routes: [
              {
                path: '/server/list',
                name: '服务器列表',
                icon: 'CloudServerOutlined',
                component: './server/list',
              },
              {
                path: '/server/applicationList',
                name: '应用列表',
                icon: 'AppstoreOutlined',
                component: './Welcome',
              },
              {
                path: '/server/application/updateLog',
                name: '更新记录',
                icon: 'ExceptionOutlined',
                component: './Welcome',
              },
            ],
          },
          {
            name: '项目管理',
            icon: 'ProjectOutlined',
            path: '/project',
            routes: [
              {
                path: '/project/list',
                name: '项目列表',
                icon: 'ProfileOutlined',
                component: './project/list',
              },
              {
                path: '/project/detail',
                name: '项目详情',
                icon: '',
                component: './project/detail',
                hideInMenu: true,
              },
              {
                path: '/project/assemblyLine/detail',
                name: '流水线配置',
                icon: '',
                component: './assemblyLine/detail',
                hideInMenu: true,
              },
              {
                path: '/project/assemblyLine/logIndex',
                name: '流水线执行日志',
                icon: '',
                component: './assemblyLine/logIndex',
                hideInMenu: true,
              },
            ],
          },
          {
            name: 'MAVEN',
            icon: 'BankOutlined',
            path: '/mvn',
            routes: [
              {
                path: '/mvn/list',
                name: '私有库',
                icon: 'smile',
                component: './project/list',
              },
              {
                path: '/mvn/log',
                name: 'deploy记录',
                icon: 'smile',
                component: './project/list',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
