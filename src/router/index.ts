interface Page {
  path?: string
  icon?: string
  label?: string
  child?: Array<{
    path?: string
    label?: string
  }>
}

export const pages: Page[] = [
  {
    path: '/',
    icon: 'dashboard',
    label: '仪表盘',
  },
  {
    icon: 'user-circle',
    label: '信息管理',
    child: [
      {
        path: '/list',
        label: '用户列表',
      },
      {
        path: '/edit',
        label: '资源编辑',
      },
    ],
  },
]
