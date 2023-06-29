const routes = [
  {
    title: '登录',
    path: '/login',
    component: './login-page',
    layout: false,
  },
  {
    path: '/',
    component: '@/layouts/index',
    layout: false,
    routes: [
      {
        title: '首页',
        path: '/',
        redirect: '/home',
      },
      {
        title: '首页',
        path: '/home',
        component: './home-page',
        meta: {
          layout: 'empty',
        },
      },
    ],
  },
];

export default routes;
