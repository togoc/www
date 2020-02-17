# 给路由切换添加效果
css的名字前缀即是`transition`的name值绑定

### 普通
标签
```
<transition name="fade" mode="out-in">
      <router-view></router-view>
</transition>
```
css
```
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(50px);
}
```
### v-for
tag属性确定由什么标签作为v-for列表的父标签
```
<transition-group name="list" tag="ul">
    <li v-for="(item) in todolist" :key="item.id" class="list-item">{{item.id}}</li>
</transition-group>
```
css
```
/** 插入过程 **/
.list-enter-active {
  transition: all 1s;
}
/** 移除过程 **/
.list-leave-active {
  transition: all 1s;
}
/*** 开始插入、移除结束的位置变化 ***/
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
```
