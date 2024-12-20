import { behavior as computedBehavior } from 'miniprogram-computed';
import { createStoreBindings } from 'mobx-miniprogram-bindings';

/**
 * 小程序Page增强函数
 * @param {*} oPage 小程序Page
 * @param {*} options Page配置
 */
const CustomPage = (_page, options) => {
  return _page(
    Object.assign({}, options, {
      behaviors: [computedBehavior].concat(options.behaviors || []),

      $storeBindings(ctx, storeBindings) {
        const bindings = createStoreBindings(ctx, storeBindings);
        bindings.updateStoreBindings();
        return bindings;
      },

      onLoad(query) {
        options.onLoad && options.onLoad.call(this, query);
      },

      onUnload() {
        // const app = getApp()
        this.storeBindings && this.storeBindings.destroyStoreBindings();
        options.onUnload && options.onUnload.call(this);
      },
    }),
  );
};

export default CustomPage;
