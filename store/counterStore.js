// store.js
import { observable, action } from 'mobx-miniprogram';

// 创建 store 时可以采用任何 mobx 的接口风格
// 这里以传统的 observable 风格为例

export const counterStore = observable({
  // 数据字段
  count: 100,

  // 计算属性
  get doublecount() {
    return this.count * 2;
  },

  // actions
  setCount: action(function (val) {
    this.count = val || 0;
  }),
});

// onload
// this.storeBindings = this.$storeBindings(this, {
//   store: counterStore,
//   fields: ['count', 'doublecount'],
//   actions: ['setCount'],
// });
