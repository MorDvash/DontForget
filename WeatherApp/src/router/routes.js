const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/login-page',
    meta: {authNotRequired: false},
    children: [
      {
        name: 'weather',
        path: 'weather/:id',
        component: () => import('pages/Weather/WeatherPage.vue'),
        meta: {authNotRequired: false}
      },
      {
        name: 'setting',
        path: 'setting/:id',
        component: () => import('pages/Settings/Settings.vue'),
        meta: {authNotRequired: false}
      },
      {
        name: 'sky-check',
        path: 'sky-check/:id',
        component: () => import('pages/TodoList/SkyCheck.vue'),
        meta: {authNotRequired: false},
      },
      {
        name: 'task',
        path: 'sky-check/:id/tasks/:key',
        component: () => import('pages/TodoList/Tasks.vue'),
        meta: {authNotRequired: false}
      },
      {
        name:'Vacations',
        path: 'Vacations',
        component: () => import('pages/Vacations/VacationsPage.vue'),
        meta: {authNotRequired: false}
      },
      {
        name:'register',
        path: 'register-page',
        component: () => import('pages/Register/RegisterPage'),
        meta: {authNotRequired: true}
      },
      {
        name:'login',
        path: 'login-page',
        component: () => import('pages/Login/LoginPage'),
        meta: {authNotRequired: true}
      },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
