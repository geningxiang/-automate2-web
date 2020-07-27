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
                path: '/server/containerList',
                name: '应用列表',
                icon: 'AppstoreOutlined',
                component: './server/ContainerList',
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
            routes: [
              {
                path: '/project/list',
                name: '项目列表',
                icon: 'ProfileOutlined',
                component: './project/list',
              },
              {
                path: '/product/list',
                name: '产物列表',
                icon: 'ProfileOutlined',
                component: './product/list',
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
