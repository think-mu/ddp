export default [
  {
    id: 1,
    name: '企业情况',
    type: 2, //1为有子项菜单，2为无子项菜单项，3为子菜单
    url: '/main/detail/detail',
    sort: 2,
    children: null
  },
  {
    id: 2,
    name: '分级分类',
    type: 2,
    url: '/main/category',
    sort: 3,
    children: null
  },
  {
    id: 3,
    name: '监督抽查',
    type: 1,
    url: '/main/review',
    sort: 4,
    children: [
      {
        id: 39,
        url: '/main/review/daily',
        name: '日常检查',
        sort: 106,
        type: 2,
        children: null,
        parentId: 3
      },
      {
        id: 40,
        url: '/main/review/gps',
        name: '零售药店GSP跟踪检查',
        sort: 107,
        type: 2,
        children: null,
        parentId: 3
      },
      {
        id: 41,
        url: '/main/review/reason',
        name: '有因检查',
        sort: 108,
        type: 2,
        children: null,
        parentId: 3
      },
      {
        id: 42,
        url: '/main/review/flight',
        name: '飞行检查',
        sort: 109,
        type: 2,
        children: null,
        parentId: 3
      },
      {
        id: 43,
        url: '/main/review/manger',
        name: '协查管理',
        sort: 110,
        type: 2,
        children: null,
        parentId: 3
      }
    ]
  },
  {
    id: 4,
    name: '监督抽检',
    type: 1,
    url: '/main/check',
    sort: 5,
    children: [
      {
        id: 44,
        name: '核查处置',
        type: 2,
        url: '/main/check/handle',
        sort: 111,
        children: null,
        parentId: 4
      },
    ]
  },
  {
    id: 5,
    name: '监督执法',
    type: 2,
    url: '/main/enforce',
    sort: 6,
    children: null
  }
]
