// app.js
import CustomPage from 'utils/CustomPage';
import updateManager from './utils/updateManager';

App({
  // 增强Page能力，小程序不支持prototype的形式拓展能力
  enhancePage() {
    const _page = Page;
    Page = (options) => CustomPage(_page, options);
  },

  onLaunch() {
    this.enhancePage();
  },

  onShow() {
    updateManager();
  },

  // app = getApp() app.globalData.userInfo
  globalData: {
    userInfo: null,
  },
});
