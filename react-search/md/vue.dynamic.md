# vue动态组件

类似插槽的作用, 添加 `keep-alive` 可以保证在切换组件时候, 避免反复重渲染导致的性能问题.

```
<template>
  <div>
    <button @click="handleComponnet(1)">组件1</button>
    <button @click="handleComponnet(2)">组件2</button>
    <button @click="handleComponnet(3)">组件3</button>
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>
</template>
<script>
import { Component1, Component2, Component3 } from "../components";
export default {
  data() {
    return {
      currentComponent: "Component1"
    };
  },
  components: {
    Component1,
    Component2,
    Component3
  },
  methods: {
    handleComponnet(id) {
      this.currentComponent = "Component" + id;
    }
  }
};
</script>
```