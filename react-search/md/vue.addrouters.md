# 动态添加路由
可以用于判断是否登录, 是否有权限访问路由

```
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('name')
  if (token) {
    router.addRoutes([{
      path: '/add',
      component: AddRouter
    }])
  }
  next()
})
```