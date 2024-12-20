## mobx-miniprogram-bindings

NPM：https://www.npmjs.com/package/mobx-miniprogram-bindings

1. 安装 `mobx-miniprogram` 和 `mobx-miniprogram-bindings` ：

```shell
npm install --save mobx-miniprogram mobx-miniprogram-bindings
```

2. 创建 MobX Store。

```js
// store.js
import { observable, action } from 'mobx-miniprogram';

export const store = observable({
  // 数据字段
  numA: 1,
  numB: 2,

  // 计算属性
  get sum() {
    return this.numA + this.numB;
  },

  // actions
  update: action(function () {
    const sum = this.sum;
    this.numA = this.numB;
    this.numB = sum;
  }),
});
```

3. 在 Component 构造器中使用：

```js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import { store } from './store';

Component({
  behaviors: [storeBindingsBehavior],
  data: {
    someData: '...',
  },
  storeBindings: {
    store,
    fields: {
      numA: () => store.numA,
      numB: (store) => store.numB,
      sum: 'sum',
    },
    actions: {
      buttonTap: 'update',
    },
  },
  methods: {
    myMethod() {
      this.data.sum; // 来自于 MobX store 的字段
    },
  },
});
```

4. 在 Page 构造器中使用：

如果小程序基础库版本在 2.9.2 以上，可以直接像上面 Component 构造器那样引入 behaviors 。

如果需要比较好的兼容性，可以使用下面这种方式（或者直接改用 Component 构造器来创建页面）。

```js
import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from './store';

Page({
  data: {
    someData: '...',
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store, // 传入store
      fields: ['numA', 'numB', 'sum'], // 需要什么数据都在此处声明
      actions: ['update'], // action在此声明，使用actions时 this.updateNum1即可触发action
    });
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
  myMethod() {
    this.data.sum; // 来自于 MobX store 的字段
  },
});
```

## 注意事项

### 延迟更新与立刻更新

为了提升性能，在 store 中的字段被更新后，并不会立刻同步更新到 `this.data` 上，而是等到下个 `wx.nextTick` 调用时才更新。（这样可以显著减少 setData 的调用次数。）

如果需要立刻更新，可以调用：

- `this.updateStoreBindings()` （在 **behavior 绑定** 中）
- `this.storeBindings.updateStoreBindings()` （在 **手工绑定** 中）

### 关于部分更新

如果只是更新对象中的一部分（子字段），是不会引发界面变化的！例如：

```js
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['someObject'],
  },
});
```

如果尝试在 `store` 中：

```js
this.someObject.someField = 'xxx';
```

这样是不会触发界面更新的。请考虑改成：

```js
this.someObject = Object.assign({}, this.someObject, { someField: 'xxx' });
```
